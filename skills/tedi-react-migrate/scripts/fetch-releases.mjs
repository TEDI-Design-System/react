#!/usr/bin/env node
// Download the release notes between two versions, flag the ones with migration content and point at
// the sections that mention what the project uses.
// Usage: node fetch-releases.mjs --from <version> --to <version> [--project <dir>] [--stable-only]
//                                [--core-from <core version> --core-to <core version>]
// Writes .tedi-migrate/cache/releases/<tag>.md and index.json, prints a summary.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import config from './config.mjs';
import {
  parseArgs,
  projectArg,
  walkProject,
  fail,
  githubReleases,
  parseVersion,
  compareVersions,
  isExactVersion,
  ensureWorkDir,
  printJson,
} from './lib.mjs';

const args = parseArgs();
const { from, to } = args;
if (!from || !to) fail('--from and --to are required');
for (const key of ['from', 'to', 'core-from', 'core-to'])
  if (args[key] !== undefined && !isExactVersion(args[key]))
    fail(`--${key} must be an exact version such as 9.4.0, got "${args[key]}"`);
if (compareVersions(from, to) > 0) fail(`--from ${from} is newer than --to ${to}`);
if (Boolean(args['core-from']) !== Boolean(args['core-to'])) fail('--core-from and --core-to go together');
const project = projectArg(args, process.cwd());

// Patterns from references/release-notes-formats.md. Any heading level, any case.
const FLAGS = {
  breaking: /^#{1,6}\s*breaking changes?\b|^\*\*breaking\b/im,
  guide: /^#{1,6}\s.*\bmigrat|^#\s*migrating\b/im,
  deprecation: /^#{1,6}\s.*deprecat|\bremoved from the (code|documentation)\b/im,
  core: /tedi core migration guide|legacy colou?r tokens|@tedi-design-system\/core\b.*\b(bumped|upgraded)|\b(upgrade|bump|update)[sd]? (tedi )?core\b|\bcore (to|from) \d+\.\d+/i,
  renames: /^\|\s*`?--[a-z0-9-]+`?\s*\|\s*`?--[a-z0-9-]+/im,
  beforeAfter: /^\*\*before\b|^#{1,6}\s+before\b/im,
  actionRequired: /action required/i,
  releaseNotes: /^#{1,6}\s*release notes\b/im,
};
const NO_ACTION = /no action required|opt-in, non-breaking/i;

// ---------- what the project uses ----------

const terms = new Set();
const pkgRe = config.pkg.replace(/[/.-]/g, (c) => `\\${c}`);
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// `import { A, type B as C } from`, `import type { … } from` and `export { … } from`.
const IMPORT = new RegExp(`(?:import|export)\\s*(?:type\\s*)?\\{([^}]+)\\}\\s*from\\s*["']${pkgRe}[^"']*["']`, 'g');
const NAMESPACE_IMPORT = new RegExp(
  `import\\s*(?:type\\s*)?\\*\\s*as\\s+([A-Za-z_$][\\w$]*)\\s*from\\s*["']${pkgRe}[^"']*["']`,
  'g'
);
const scanFile = (_path, entry, text) => {
  if (entry === 'package-lock.json') return;
  for (const m of text.matchAll(IMPORT))
    for (const name of m[1].replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, '').split(','))
      terms.add(
        name
          .trim()
          .replace(/^type\s+/, '')
          .split(/\s+as\s+/)[0]
      );
  for (const [, ns] of text.matchAll(NAMESPACE_IMPORT))
    for (const m of text.matchAll(
      // Not `\b`: an alias may start with `$` (`[$tedi.PaginationComponent]`).
      new RegExp(`(?<![\\w$])${escape(ns)}\\.([A-Za-z_$][\\w$]*)`, 'g')
    ))
      terms.add(m[1]);
  // Element and attribute selectors (<tedi-alert>, <label tedi-label>) and BEM blocks.
  for (const m of text.matchAll(/(?<![\w-])(tedi-[a-z]+(?:-[a-z]+)*)/g))
    if (!/^tedi-(design-system|migrate)$/.test(m[1])) terms.add(m[1]);
  for (const m of text.matchAll(/\b(tedi[A-Z][A-Za-z]+)\b/g)) terms.add(m[1]);
  for (const m of text.matchAll(/["'`]([a-z][a-z0-9-]*(?:\.[a-z0-9-]+)+)["'`]\s*:/g)) terms.add(m[1]);
  // A custom property declaration, not a BEM modifier before a pseudo-class (`.card--active:hover`).
  for (const m of text.matchAll(/(?<![\w-])(--[A-Za-z0-9_-]+)\s*:/g)) terms.add(m[1]);
  for (const m of text.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) terms.add(m[1]);
};
if (args.project) walkProject(project, /\.(tsx?|jsx?|html|s?css|less|json)$/, scanFile);
terms.delete('');
const termList = [...terms];
const termRes = termList.map((t) => [t, new RegExp(`(^|[^A-Za-z0-9_.-])${escape(t)}(?![A-Za-z0-9_-])`)]);
// Component names in prose ("Closing button", "**carousel:**"), from imports and selectors. Matched
// against section leads only, where notes name the component a section is about.
const names = new Set();
for (const t of termList) {
  const words = /^[A-Z]/.test(t)
    ? t.replace(/(Component|Directive|Module|Service|Pipe|Props)$/, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    : t.startsWith('tedi-')
    ? t.slice(5).replace(/-/g, ' ')
    : '';
  if (words.length > 2) names.add(words.toLowerCase());
}
const nameRes = [...names].map((n) => [
  n,
  // Whole names only: `table` must not match `table-of-contents`, nor `button` `closing-button`.
  new RegExp(`(?<![\\w-])${n.split(' ').map(escape).join('[\\s-]?')}s?(?![\\w-])`, 'i'),
]);

/** Sections of a release body (headings, bold leads, bullet leads) that mention a project term. */
function relevantSections(body) {
  if (!termList.length) return [];
  const sections = [];
  let current = { heading: '(top)', lines: [] };
  for (const line of body.split('\n')) {
    const lead =
      line.match(/^#{1,6}\s+(.*)/)?.[1] ??
      line.match(/^\*\*([^*]{2,80})\*\*/)?.[1] ??
      line.match(/^\*\s+\*\*([^*]{2,80})\*\*/)?.[1];
    if (lead) {
      sections.push(current);
      current = { heading: lead.trim().slice(0, 100), lines: [] };
    }
    current.lines.push(line);
  }
  sections.push(current);
  return sections
    .map((s) => {
      const text = s.lines.join('\n');
      return {
        heading: s.heading,
        terms: [
          ...termRes.filter(([, re]) => re.test(text)).map(([t]) => t),
          ...nameRes.filter(([, re]) => re.test(s.heading)).map(([n]) => n),
        ],
      };
    })
    .filter((s) => s.terms.length);
}

// ---------- releases ----------

const outDir = join(ensureWorkDir(project), 'cache', 'releases');
mkdirSync(outDir, { recursive: true });

async function collect(repo, prefix, lo, hi) {
  const all = (await githubReleases(repo)).filter((r) => r.tag_name.startsWith(prefix));
  const byTag = new Map(all.map((r) => [r.tag_name, r]));
  const versionOf = (tag) => tag.slice(prefix.length);
  const selected = new Map();
  for (const r of all) {
    const v = parseVersion(versionOf(r.tag_name));
    if (!v) continue;
    if (compareVersions(v, lo) <= 0 || compareVersions(v, hi) > 0) continue;
    if (args['stable-only'] && v.pre.length) continue;
    selected.set(r.tag_name, { release: r, linked: false });
  }
  // Stable notes link migration guides that live on older rc releases (deprecation tables). Older links
  // are kept even below `lo`; a link past the target is not, nor an rc with --stable-only.
  const linkRe = new RegExp(`releases/tag/(${escape(prefix)}[0-9][^)\\s"'#>]*)`, 'g');
  // A live Map iterator also visits releases added during the loop, so links are followed past the
  // first hop (7.1.0 → 7.1.0-rc.20 → 6.5.0-rc.18) until nothing new is linked.
  for (const { release } of selected.values()) {
    for (const m of (release.body ?? '').matchAll(linkRe)) {
      const tag = m[1];
      if (selected.has(tag) || !byTag.has(tag)) continue;
      const v = parseVersion(versionOf(tag));
      if (!v || compareVersions(v, hi) > 0) continue;
      if (args['stable-only'] && v.pre.length) continue;
      selected.set(tag, { release: byTag.get(tag), linked: true });
    }
  }
  return [...selected.values()]
    .sort((a, b) => compareVersions(versionOf(a.release.tag_name), versionOf(b.release.tag_name)))
    .map(({ release, linked }) => {
      const body = (release.body ?? '').replace(/\r\n/g, '\n');
      const file = join(outDir, `${release.tag_name}.md`);
      writeFileSync(file, `<!-- ${release.html_url} -->\n${body}\n`);
      return {
        tag: release.tag_name,
        version: versionOf(release.tag_name),
        prerelease: release.prerelease,
        published: release.published_at?.slice(0, 10),
        url: release.html_url,
        file,
        bytes: body.length,
        linked,
        flags: Object.entries(FLAGS)
          .filter(([k]) => k !== 'renames' || repo === config.coreRepo)
          .filter(([, re]) => re.test(body))
          .map(([k]) => k),
        hasNoActionSections: NO_ACTION.test(body),
        issues: [...new Set([...body.matchAll(/\/issues\/(\d+)/g)].map((m) => Number(m[1])))],
        relevant: relevantSections(body),
      };
    });
}

const index = await collect(config.repo, config.tagPrefix, from, to);
const coreFrom = args['core-from'];
const coreTo = args['core-to'];
const core =
  coreFrom && coreTo && coreFrom !== coreTo
    ? await collect(config.coreRepo, config.coreTagPrefix, coreFrom, coreTo)
    : [];
writeFileSync(join(outDir, 'index.json'), JSON.stringify({ library: index, core }, null, 2));

const line = (r) =>
  `${r.tag}  [${r.flags.join(', ')}]${r.linked ? '  (linked)' : ''}` +
  (r.relevant.length ? `  mentions: ${[...new Set(r.relevant.flatMap((s) => s.terms))].join(', ')}` : '');
const flagged = index.filter((r) => r.flags.length);
printJson({
  repo: config.repo,
  from,
  to,
  releases: index.length,
  withMigrationContent: flagged.length,
  linkedOutsideRange: index.filter((r) => r.linked).map((r) => r.tag),
  index: join(outDir, 'index.json'),
  projectTerms: args.project ? termList.length : 'pass --project to find the sections that matter',
  readThese: flagged.map(line),
  core: core.length
    ? {
        repo: config.coreRepo,
        from: coreFrom,
        to: coreTo,
        releases: core.length,
        readThese: core.filter((r) => r.flags.length || r.relevant.length).map(line),
      }
    : 'pass --core-from/--core-to when core changes',
  notes: [
    "Each index entry's `relevant` lists the sections (heading or bold lead) that mention something the project uses: its imports from the library, tedi-* selectors and directives, label/translation keys it overrides, and custom properties it sets or reads; or its heading names a component the project uses. Read those sections, and the whole Migration guide of their release, in full; skim every other release in the range by its headings, flagged or not.",
  ],
});
