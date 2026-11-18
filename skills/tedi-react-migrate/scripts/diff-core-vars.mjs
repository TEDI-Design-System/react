#!/usr/bin/env node
// What changed in core's CSS custom properties and SCSS variables between two versions,
// and which of the project's own declarations are affected.
// Usage: node diff-core-vars.mjs --lib-from <library version> --lib-to <library version> [--project <dir>] [--full]
//    or: node diff-core-vars.mjs --from <core version> --to <core version> [--project <dir>]
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import config from './config.mjs';
import { parseArgs, fail, npmMetadata, coreVersionOf, packageFiles, printJson } from './lib.mjs';

const args = parseArgs();
let { from, to } = args;
if (args['lib-from'] || args['lib-to']) {
  const lib = await npmMetadata(config.pkg);
  from = coreVersionOf(lib, args['lib-from'])?.min;
  to = coreVersionOf(lib, args['lib-to'])?.min;
  if (!from || !to) fail('could not read the core dependency of those library versions');
}
if (!from || !to) fail('--from/--to (core versions) or --lib-from/--lib-to (library versions) are required');

const core = await npmMetadata(config.corePkg);
const CSS_DECL = /(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]+);/g;
const SCSS_DECL = /^\s*(\$[A-Za-z0-9_-]+)\s*:\s*([^;{}]+);/gm;
const norm = (v) => v.trim().replace(/\s+/g, ' ');

async function declarations(version) {
  const files = await packageFiles(core, version, (n) => /\.s?css$/.test(n) && !/^icons\//.test(n));
  const vars = new Map(); // name -> { kind, values:Set }
  for (const { name, text } of files) {
    const add = (n, kind, value) => {
      if (!vars.has(n)) vars.set(n, { kind, values: new Set(), files: new Set() });
      vars.get(n).values.add(norm(value));
      vars.get(n).files.add(name);
    };
    for (const m of text.matchAll(CSS_DECL)) add(m[1], 'css', m[2]);
    for (const m of text.matchAll(SCSS_DECL)) add(m[1], 'scss', m[2]);
  }
  return vars;
}

const before = await declarations(from);
const after = await declarations(to);
const removed = [...before.keys()].filter((n) => !after.has(n));
const added = [...after.keys()].filter((n) => !before.has(n));
const sameSet = (a, b) => a.size === b.size && [...a].every((v) => b.has(v));
const changed = [...before.keys()]
  .filter((n) => after.has(n) && !sameSet(before.get(n).values, after.get(n).values))
  .map((n) => ({
    name: n,
    before: [...before.get(n).values],
    after: [...after.get(n).values],
  }));

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

// The project's own declarations and reads of custom properties.
let project = null;
if (args.project) {
  const root = args.project;
  const SKIP = /^(node_modules|dist|build|coverage|\.git|\.angular|\.next|\.tedi-migrate)$/;
  const uses = new Map(); // name -> [{ file, line, kind: "sets"|"reads" }]
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (SKIP.test(entry)) continue;
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(s?css|less|html|tsx?|jsx?|vue)$/.test(entry)) {
        readFileSync(path, 'utf8')
          .split('\n')
          .forEach((text, i) => {
            const record = (name, kind) => {
              if (!uses.has(name)) uses.set(name, []);
              uses.get(name).push({ file: `${relative(root, path)}:${i + 1}`, kind });
            };
            for (const m of text.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) record(m[1], 'sets');
            for (const m of text.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) record(m[1], 'reads');
            for (const m of text.matchAll(/(\$[A-Za-z0-9_-]+)/g))
              if (before.has(m[1]) || after.has(m[1])) record(m[1], 'reads');
          });
      }
    }
  };
  walk(root);
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
    "project: 'not-in-core' lists custom properties the project sets that core <to> does not declare. Most are the project's own; one that looks like a TEDI token (component or semantic name) is a stale override from an older core and has no effect.",
  ],
});
