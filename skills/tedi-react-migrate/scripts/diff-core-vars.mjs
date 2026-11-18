#!/usr/bin/env node
// What changed in core's CSS custom properties and SCSS variables between two versions,
// and which of the project's own declarations are affected.
// Usage: node diff-core-vars.mjs --lib-from <library version> --lib-to <library version> [--project <dir>] [--full]
//    or: node diff-core-vars.mjs --from <core version> --to <core version> [--project <dir>]
import { relative } from 'node:path';
import config from './config.mjs';
import {
  parseArgs,
  fail,
  npmMetadata,
  coreVersionOf,
  packageFiles,
  printJson,
  isExactVersion,
  projectArg,
  walkProject,
} from './lib.mjs';

const args = parseArgs();
let { from, to } = args;
const projectRoot = projectArg(args, null);
const libMode = args['lib-from'] !== undefined || args['lib-to'] !== undefined;
if (libMode && (from !== undefined || to !== undefined))
  fail('pass either --from/--to (core versions) or --lib-from/--lib-to, not both');
for (const key of ['from', 'to', 'lib-from', 'lib-to'])
  if (args[key] !== undefined && !isExactVersion(args[key]))
    fail(`--${key} must be an exact version such as 6.12.0, got "${args[key]}"`);
if (libMode) {
  const lib = await npmMetadata(config.pkg);
  from = coreVersionOf(lib, args['lib-from'])?.min;
  to = coreVersionOf(lib, args['lib-to'])?.min;
  if (!from || !to) fail('could not read the core dependency of those library versions');
}
if (!from || !to) fail('--from/--to (core versions) or --lib-from/--lib-to (library versions) are required');

const core = await npmMetadata(config.corePkg);
const norm = (v) => v.trim().replace(/\s+/g, ' ');

/**
 * Declarations of a stylesheet with their context (enclosing selectors and at-rules), so a token whose
 * light and dark defaults swap still counts as changed. A declaration ends at `;` or at the `}` that
 * closes its block (core ships minified CSS). Strings, parentheses and SCSS `#{}` are skipped over.
 * Comments are dropped as they are met, so comment markers inside strings stay text; `//` is a
 * comment only in SCSS, and not inside `url(...)`.
 */
function scan(text, onDecl, scss) {
  const src = text;
  const stack = [];
  let buf = '';
  let paren = 0;
  let urlParen = 0; // paren depth of an open url(...), 0 when none
  let quote = null;
  const flush = () => {
    const m = buf.match(/^\s*((?:--|\$)[A-Za-z0-9_-]+)\s*:\s*([\s\S]+?)\s*$/);
    if (m) onDecl(m[1], m[2], stack.join(' > '));
    buf = '';
  };
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') buf += c + (src[++i] ?? '');
      else {
        if (c === quote) quote = null;
        buf += c;
      }
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      i = end < 0 ? src.length : end + 1;
      continue;
    }
    if (scss && !urlParen && c === '/' && src[i + 1] === '/') {
      const end = src.indexOf('\n', i);
      i = end < 0 ? src.length : end - 1;
      continue;
    }
    if (c === '"' || c === "'") quote = c;
    else if (c === '(') {
      paren++;
      if (!urlParen && /url\s*$/i.test(buf)) urlParen = paren;
    } else if (c === ')') {
      if (urlParen === paren) urlParen = 0;
      paren = Math.max(0, paren - 1);
    } else if (c === '#' && src[i + 1] === '{') {
      const end = src.indexOf('}', i);
      buf += src.slice(i, end < 0 ? undefined : end + 1);
      i = end < 0 ? src.length : end;
      continue;
    } else if (!paren && c === ';') {
      flush();
      continue;
    } else if (!paren && c === '{') {
      stack.push(norm(buf));
      buf = '';
      continue;
    } else if (!paren && c === '}') {
      flush();
      stack.pop();
      continue;
    }
    buf += c;
  }
  flush();
}

async function declarations(version) {
  const files = await packageFiles(core, version, (n) => /\.s?css$/.test(n) && !/^icons\//.test(n));
  // name -> { kind, values: Set, byContext: Map<context, Set<value>>, files: Set }
  const vars = new Map();
  for (const { name, text } of files) {
    scan(
      text,
      (n, value, context) => {
        const kind = n.startsWith('$') ? 'scss' : 'css';
        if (kind === 'scss' && context) return; // only top-level SCSS variables are API
        if (!vars.has(n))
          vars.set(n, {
            kind,
            values: new Set(),
            byContext: new Map(),
            files: new Set(),
          });
        const v = vars.get(n);
        v.values.add(norm(value));
        if (!v.byContext.has(context)) v.byContext.set(context, new Set());
        v.byContext.get(context).add(norm(value));
        v.files.add(name);
      },
      name.endsWith('.scss')
    );
  }
  return vars;
}

const before = await declarations(from);
const after = await declarations(to);
const removed = [...before.keys()].filter((n) => !after.has(n));
const added = [...after.keys()].filter((n) => !before.has(n));
const sameSet = (a, b) => a.size === b.size && [...a].every((v) => b.has(v));
// Compare per context where both versions declare the token in the same context. The contexts only one
// side has (an added or dropped theme override, or a selector core rewrote, such as `:root` becoming
// `:root,:host`) are compared by their pooled values, so a rewritten selector alone is not a change.
const differs = (a, b) => {
  const shared = [...a.byContext.keys()].filter((c) => b.byContext.has(c));
  if (!shared.length) return !sameSet(a.values, b.values);
  if (shared.some((c) => !sameSet(a.byContext.get(c), b.byContext.get(c)))) return true;
  const rest = (v) =>
    new Set([...v.byContext].filter(([c]) => !shared.includes(c)).flatMap(([, values]) => [...values]));
  return !sameSet(rest(a), rest(b));
};
const describe = (v) =>
  [...v.byContext.values()].some((values) => !sameSet(values, v.values))
    ? Object.fromEntries([...v.byContext].map(([c, values]) => [c || '(top)', [...values]]))
    : [...v.values];

// Rename candidates for each removed name: by name first (core 6 added the --tedi- prefix to base
// tokens; later releases renamed active/inactive to selected/unselected, split tokens into -default /
// state variants, spelled out -bg), then by identical value.
const NAME_RULES = [
  ['prefix --tedi-', (n) => n.replace(/^--(?!tedi-)/, '--tedi-')],
  ['inactive -> unselected', (n) => n.replace(/-inactive(?=-|$)/, '-unselected')],
  ['active -> selected', (n) => n.replace(/-active(?=-|$)/, '-selected')],
  ['bg -> background', (n) => n.replace(/-bg(?=-|$)/, '-background')],
  ['toggl -> toggle', (n) => n.replace(/-toggl-/, '-toggle-')],
];
const addedSet = new Set(added);
const addedByValue = new Map();
for (const n of added)
  for (const v of after.get(n).values) {
    const key = `${after.get(n).kind}|${v}`;
    addedByValue.set(key, [...(addedByValue.get(key) ?? []), n]);
  }
const candidatesOf = (n) => {
  const out = [];
  for (const [basis, rule] of NAME_RULES) {
    const c = rule(n);
    if (c !== n && addedSet.has(c)) out.push({ to: c, basis });
  }
  const split = added.filter((a) => a.startsWith(`${n}-`));
  if (split.length && split.length <= 6) for (const c of split) out.push({ to: c, basis: 'split into variants' });
  if (!out.length) {
    const byValue = new Set();
    for (const v of before.get(n).values)
      for (const c of addedByValue.get(`${before.get(n).kind}|${v}`) ?? []) byValue.add(c);
    if (byValue.size && byValue.size <= 5) for (const c of byValue) out.push({ to: c, basis: 'same value' });
  }
  return out;
};
const renamedCandidates = [];
const removedOnly = [];
for (const n of removed) {
  const candidates = candidatesOf(n);
  if (candidates.length) renamedCandidates.push({ from: n, candidates });
  else removedOnly.push({ name: n, kind: before.get(n).kind });
}
const candidatesFor = new Map(renamedCandidates.map((r) => [r.from, r.candidates]));

// A default that only follows a renamed reference (`var(--primary-600)` → `var(--tedi-primary-600)`)
// has not changed: map the old values through the unambiguous renames before comparing.
const renameTo = new Map(
  renamedCandidates.filter((r) => r.candidates.length === 1).map((r) => [r.from, r.candidates[0].to])
);
const renamed = (value) =>
  value.replace(/var\(\s*(--[A-Za-z0-9_-]+)/g, (m, n) => (renameTo.has(n) ? `var(${renameTo.get(n)}` : m));
const withRenames = (v) => ({
  ...v,
  values: new Set([...v.values].map(renamed)),
  byContext: new Map([...v.byContext].map(([c, values]) => [c, new Set([...values].map(renamed))])),
});
const changed = [...before.keys()]
  .filter((n) => after.has(n) && differs(withRenames(before.get(n)), after.get(n)))
  .map((n) => ({
    name: n,
    before: describe(before.get(n)),
    after: describe(after.get(n)),
  }));

// The project's own declarations and reads of custom properties.
let project = null;
if (projectRoot) {
  const root = projectRoot;
  const uses = new Map(); // name -> [{ file, line, kind: "sets"|"reads" }]
  walkProject(root, /\.(s?css|less|html|tsx?|jsx?|vue)$/, (path, _, file) =>
    file.split('\n').forEach((text, i) => {
      const record = (name, kind) => {
        if (!uses.has(name)) uses.set(name, []);
        uses.get(name).push({ file: `${relative(root, path)}:${i + 1}`, kind });
      };
      // A declaration, not a BEM modifier before a pseudo-class (`.card--active:hover`).
      for (const m of text.matchAll(/(?<![\w-])(--[A-Za-z0-9_-]+)\s*:/g)) record(m[1], 'sets');
      for (const m of text.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) record(m[1], 'reads');
      for (const m of text.matchAll(/(\$[A-Za-z0-9_-]+)/g))
        if (before.has(m[1]) || after.has(m[1])) record(m[1], 'reads');
    })
  );
  const status = (n) => {
    if (candidatesFor.has(n)) return 'renamed-candidate';
    if (removed.includes(n)) return 'removed';
    if (changed.some((c) => c.name === n)) return 'default-changed';
    if (!after.has(n) && !before.has(n)) return 'not-in-core';
    return null;
  };
  project = [...uses.entries()]
    .map(([name, where]) => {
      const change = changed.find((c) => c.name === name);
      return {
        name,
        status: status(name),
        where,
        ...(candidatesFor.has(name) && { candidates: candidatesFor.get(name) }),
        ...(change && { before: change.before, after: change.after }),
      };
    })
    .filter((u) => u.status)
    .filter((u) => u.status !== 'not-in-core' || u.where.some((w) => w.kind === 'sets'));
}

const full = !project || args.full;
printJson({
  core: { from, to },
  summary: {
    removed: removed.length,
    added: added.length,
    changedValue: changed.length,
    renamedCandidates: renamedCandidates.length,
    ...(project && { projectAffected: project.length }),
  },
  project,
  ...(full
    ? {
        renamedCandidates,
        removed: removedOnly,
        changedValue: changed,
        added: added.map((n) => ({ name: n, kind: after.get(n).kind })),
      }
    : {
        lists: 'omitted with --project; add --full for every removed, added and changed token',
      }),
  notes: [
    "Candidates are guesses (by name pattern, else by identical value); confirm each against the core release notes (fetch-releases --core-from/--core-to) and the library's TEDI Core Migration Guide sections. Documented renames win.",
    "project: 'not-in-core' lists custom properties the project sets that neither compared core version declares. Most are the project's own. Absence from core does not make one unused: the library's own component styles and the project may read it. Check the target library styles and the project's reads before calling an override stale.",
    ...(args['lib-from']
      ? [
          "core versions came from the library's declared core ranges (their minimum). Unless both are exact pins this is an estimate: pass --from <the project's core version> --to <core after the install> instead.",
        ]
      : []),
  ],
});
