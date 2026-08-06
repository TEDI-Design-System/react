#!/usr/bin/env node
/**
 * Accessibility report + gate for the Storybook test-runner.
 *
 * Usage: node a11y-report.mjs <junit.xml> <run.log> <outFile> [changedFiles] [indexJson]
 *
 * Sections:
 *  - Blocking: violations in components changed by this PR — these FAIL the job.
 *  - Pre-existing: violations in components NOT changed by this PR — warn only.
 *  - Known issues: stories marked `a11y.test: 'todo'` — warn only.
 *
 * When <changedFiles> + <indexJson> are provided, only violations in changed
 * components block (diff-scoped gate). Without them, every violation blocks.
 *
 * Exit code: 1 if there are blocking violations OR the JUnit is missing
 * (fail-closed on infra errors); otherwise 0.
 */
import fs from 'fs';
import path from 'path';

const [, , junitPath, logPath, outFile, changedPath, indexPath] = process.argv;
const OUT = outFile ?? 'a11y-report/summary.md';

const stripAnsi = (s) => s.replace(/\x1b?\[[0-9;]*m/g, '');
const unescapeXml = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#10;/g, '\n')
    .replace(/&#13;/g, '\r')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');

const storybookBase = process.env.STORYBOOK_BASE_URL?.replace(/\/+$/, '');
const sanitize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const storyLink = (component, story) => {
  if (!storybookBase) return story;
  return `[${story}](${storybookBase}/?path=/story/${sanitize(component)}--${sanitize(
    story
  )}&addonPanel=storybook/a11y/panel)`;
};

// --- diff scoping: map story title -> source dir, flag changed components ---
let changedFiles = null;
if (changedPath && fs.existsSync(changedPath)) {
  changedFiles = fs
    .readFileSync(changedPath, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}
const titleToDir = new Map();
const idxFile = indexPath ?? 'dist/storybook-static/index.json';
if (fs.existsSync(idxFile)) {
  const idx = JSON.parse(fs.readFileSync(idxFile, 'utf8'));
  for (const e of Object.values(idx.entries || idx.stories || {})) {
    if (e.title && e.importPath) {
      titleToDir.set(e.title, e.importPath.replace(/^\.\//, '').replace(/\/[^/]*$/, ''));
    }
  }
}
const scoped = changedFiles !== null && titleToDir.size > 0;
const isChanged = (component) => {
  if (!scoped) return true; // no diff info → enforce everything
  const dir = titleToDir.get(component);
  if (!dir) return true; // unknown mapping → be safe, treat as changed
  return changedFiles.some((f) => f === dir || f.startsWith(dir + '/'));
};

// --- parse JUnit failures (rules from the axe docs URL) ---
const readFailures = () => {
  const byComp = new Map(); // component -> { rules: Map, stories: Set }
  if (!fs.existsSync(junitPath)) return null;
  const xml = fs.readFileSync(junitPath, 'utf8');
  const suiteRe = /<testsuite\b[^>]*\bname="([^"]*)"[^>]*\bfailures="(\d+)"[^>]*>([\s\S]*?)<\/testsuite>/g;
  for (const [, name, failStr, body] of xml.matchAll(suiteRe)) {
    if (Number(failStr) === 0) continue;
    const component = unescapeXml(name);
    const caseRe = /<testcase\b[^>]*\bname="([^"]*)"[^>]*>([\s\S]*?)<\/testcase>/g;
    for (const [, caseName, caseBody] of body.matchAll(caseRe)) {
      const fail = caseBody.match(/<failure\b[^>]*>([\s\S]*?)<\/failure>/);
      if (!fail) continue;
      const text = stripAnsi(unescapeXml(fail[1]));
      const rules = new Set();
      for (const [, id] of text.matchAll(/dequeuniversity\.com\/rules\/axe\/[\d.]+\/([a-z0-9-]+)/g)) rules.add(id);
      if (!rules.size) for (const [, id] of text.matchAll(/\(([a-z][a-z0-9-]{2,})\)/g)) rules.add(id);
      if (!rules.size) rules.add('unknown');
      let story = unescapeXml(caseName);
      if (story.startsWith(component + ' ')) story = story.slice(component.length + 1);
      story = story.replace(/\s+smoke-test$/, '').trim();
      if (!byComp.has(component)) byComp.set(component, { rules: new Map(), stories: new Set() });
      const e = byComp.get(component);
      e.stories.add(story);
      for (const r of rules) e.rules.set(r, (e.rules.get(r) ?? 0) + 1);
    }
  }
  return byComp;
};

// --- parse the run log for `a11y.test: 'todo'` warnings ---
const readTodos = () => {
  const todos = new Map(); // component -> Map<story, count>
  if (!logPath || !fs.existsSync(logPath)) return todos;
  const lines = stripAnsi(fs.readFileSync(logPath, 'utf8')).split('\n');
  const titleRe = /((?:TEDI-Ready|Community)\/\S[^>]*?)\s+>\s+(.+?)\s*$/i;
  const warnRe = /Found\s+(\d+)\s+a11y violations,\s+run the test with 'a11y: \{ test: 'error' \}'/;
  let last = null;
  for (const raw of lines) {
    const line = raw.replace(/^\[A11Y\]\s?/, '').trim();
    if (line.includes('http') || line.startsWith('Click')) continue;
    const t = line.match(titleRe);
    if (t) {
      last = { component: t[1].trim(), story: t[2].trim() };
      continue;
    }
    const w = line.match(warnRe);
    if (w && last) {
      if (!todos.has(last.component)) todos.set(last.component, new Map());
      todos.get(last.component).set(last.story, Number(w[1]));
      last = null;
    }
  }
  return todos;
};

const failures = readFailures();
if (failures === null) {
  const md =
    '## ♿ Accessibility — ⚠️ report unavailable\n\nNo JUnit output was produced; the test run likely failed before completing.\n';
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, md);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  console.error(md);
  process.exit(1); // fail closed
}

const blocking = new Map();
const preexisting = new Map();
for (const [component, data] of failures) (isChanged(component) ? blocking : preexisting).set(component, data);
const todos = readTodos();

const compTable = (map) => {
  const rows = ['| Component | Rules | Stories |', '|---|---|---|'];
  for (const [component, { rules, stories }] of [...map.entries()].sort()) {
    const r = [...rules.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([k, c]) => `\`${k}\`${c > 1 ? ` ×${c}` : ''}`)
      .join(', ');
    rows.push(`| ${component} | ${r} | ${stories.size} |`);
  }
  return rows.join('\n');
};
const storyDetails = (map, summary) => {
  const out = [`<details><summary>${summary}</summary>\n`];
  for (const [component, { stories }] of [...map.entries()].sort())
    out.push(
      `- **${component}** — ${[...stories]
        .sort()
        .map((s) => storyLink(component, s))
        .join(', ')}`
    );
  return out.join('\n') + '\n</details>';
};

const blockingStories = [...blocking.values()].reduce((n, d) => n + d.stories.size, 0);
const out = [];

if (blockingStories === 0) {
  out.push('## ♿ Accessibility — ✅ no blocking violations');
  out.push('');
  out.push(
    scoped
      ? 'No accessibility violations in the components changed by this PR.'
      : 'All TEDI-Ready stories pass automated axe checks.'
  );
} else {
  out.push(
    `## ♿ Accessibility — ❌ ${blockingStories} blocking violation${
      blockingStories === 1 ? '' : 's'
    } in changed component${blocking.size === 1 ? '' : 's'}`
  );
  out.push('');
  out.push(
    "These are in components this PR changed and must be fixed (or marked `parameters: { a11y: { test: 'todo' } }` with justification)."
  );
  out.push('');
  out.push(compTable(blocking));
  out.push('');
  out.push(storyDetails(blocking, 'Failing stories'));
}

if (preexisting.size > 0) {
  const n = [...preexisting.values()].reduce((a, d) => a + d.stories.size, 0);
  out.push('');
  out.push(`### ⚠️ Pre-existing — ${n} violation${n === 1 ? '' : 's'} in components not changed here (warn only)`);
  out.push('');
  out.push(compTable(preexisting));
  out.push('');
  out.push(storyDetails(preexisting, 'Stories'));
}

if (todos.size > 0) {
  const n = [...todos.values()].reduce((a, m) => a + m.size, 0);
  out.push('');
  out.push(`### 🔕 Known issues — ${n} ${n === 1 ? 'story' : 'stories'} marked \`todo\` (warn only)`);
  out.push('');
  out.push('<details><summary>Stories</summary>\n');
  for (const [component, stories] of [...todos.entries()].sort())
    out.push(
      `- **${component}** — ${[...stories.keys()]
        .sort()
        .map((s) => storyLink(component, s))
        .join(', ')}`
    );
  out.push('\n</details>');
}

const md = out.join('\n') + '\n';
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, md);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
console.log(md);

process.exit(blockingStories > 0 ? 1 : 0);
