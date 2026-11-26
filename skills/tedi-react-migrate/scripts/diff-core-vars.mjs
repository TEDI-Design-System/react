#!/usr/bin/env node
// What changed in core's CSS custom properties and SCSS variables between two versions,
// and which of the project's own declarations are affected.
// Usage: node diff-core-vars.mjs --lib-from <library version> --lib-to <library version> [--project <dir>] [--full]
//    or: node diff-core-vars.mjs --from <core version> --to <core version> [--project <dir>]
import { relative } from 'node:path';

import config from './config.mjs';
import { compareDeclarations, declarations } from './core-vars.mjs';
import {
  coreVersionOf,
  fail,
  isExactVersion,
  npmMetadata,
  packageFiles,
  parseArgs,
  printJson,
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
const coreFiles = (version) => packageFiles(core, version, (n) => /\.s?css$/.test(n) && !/^icons\//.test(n));
const before = declarations(await coreFiles(from));
const after = declarations(await coreFiles(to));
const { removed, added, removedOnly, renamedCandidates, changed } = compareDeclarations(before, after);
const candidatesFor = new Map(renamedCandidates.map((r) => [r.from, r.candidates]));

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
