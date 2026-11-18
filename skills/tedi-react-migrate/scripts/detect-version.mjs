#!/usr/bin/env node
// Which TEDI version does the project use, and which did it use before?
// Usage: node detect-version.mjs [projectDir]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import config from './config.mjs';
import { parseArgs, rangeMinimum, printJson, LOCKFILES, lockedVersion } from './lib.mjs';

const args = parseArgs();
const dir = resolve(args._[0] ?? process.cwd());
const pkg = config.pkg;
const read = (f) => (existsSync(join(dir, f)) ? readFileSync(join(dir, f), 'utf8') : null);
const git = (gitArgs, cwd = dir) => {
  try {
    return execFileSync('git', gitArgs, {
      cwd,
      encoding: 'utf8',
      maxBuffer: 256 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
};

const result = { package: pkg, from: null, source: null };

// 1. package.json range
const pj = read('package.json');
if (!pj) {
  printJson({ ...result, error: `no package.json in ${dir}` });
  process.exit(1);
}
const manifest = JSON.parse(pj);
const depOf = (name) =>
  manifest.dependencies?.[name] ?? manifest.devDependencies?.[name] ?? manifest.peerDependencies?.[name] ?? null;
const range = depOf(pkg);
result.packageJsonRange = range;
result.coreRange = depOf(config.corePkg);

// 2. lockfile: the project's own folder, else the closest one above it (a workspace root).
let lock = null;
for (let d = dir; ; d = dirname(d)) {
  const file = LOCKFILES.find((f) => existsSync(join(d, f)));
  if (file) {
    lock = {
      file,
      dir: d,
      importer: relative(d, dir).split(sep).join('/') || '.',
    };
    break;
  }
  if (dirname(d) === d || existsSync(join(d, '.git'))) break;
}
const lockedAt = (text, name = pkg) => (text == null ? null : lockedVersion(lock.file, text, name, lock.importer));
if (lock) {
  const text = readFileSync(join(lock.dir, lock.file), 'utf8');
  result.lockfile = relative(dir, join(lock.dir, lock.file)) || lock.file;
  result.lockfileVersion = lockedAt(text);
  result.coreLockfileVersion = lockedAt(text, config.corePkg);
}

// 3. node_modules (the project's own, else hoisted to the workspace root)
const installedOf = (name) => {
  for (const d of [dir, lock?.dir].filter(Boolean)) {
    const f = join(d, 'node_modules', name, 'package.json');
    if (existsSync(f)) return JSON.parse(readFileSync(f, 'utf8')).version;
  }
  return null;
};
result.installedVersion = installedOf(pkg);
result.coreInstalledVersion = installedOf(config.corePkg);
// The core version the project resolves today: the baseline for core's own release notes and diff.
result.coreVersion = result.coreLockfileVersion ?? result.coreInstalledVersion ?? null;

// 4. History: every commit that changed the resolved version (exact versions, from the lockfile),
// and a bump that is installed but not committed yet.
result.history = null;
if (lock && git(['rev-parse', '--is-inside-work-tree'], lock.dir)) {
  const lockPath = `./${lock.file}`;
  const at = (rev) => lockedAt(git(['show', `${rev}:${lockPath}`], lock.dir));
  const committed = at('HEAD');
  if (committed && result.lockfileVersion && committed !== result.lockfileVersion) {
    result.uncommittedBump = {
      before: committed,
      after: result.lockfileVersion,
    };
  }
  const log = git(['log', '-n', '40', '--format=%h %ad %s', '--date=short', '--', lock.file], lock.dir) ?? '';
  result.history = [];
  for (const line of log.split('\n').filter(Boolean)) {
    const [commit, date, ...subject] = line.split(' ');
    const after = at(commit);
    const before = at(`${commit}^`);
    if (after && before !== after)
      result.history.push({
        commit,
        date,
        subject: subject.join(' '),
        before,
        after,
      });
  }
}

result.from = result.lockfileVersion ?? result.installedVersion ?? rangeMinimum(range);
result.source = result.lockfileVersion
  ? `lockfile (${result.lockfile})`
  : result.installedVersion
  ? 'node_modules'
  : result.from
  ? 'package.json range minimum (estimate)'
  : null;
if (!range) result.error = `${pkg} is not a dependency of ${dir}/package.json`;
else if (!result.from)
  result.error = `cannot read an exact version from "${range}" without a lockfile or node_modules; ask the developer`;
if (result.lockfileVersion && result.installedVersion && result.lockfileVersion !== result.installedVersion) {
  result.warning = "lockfile and node_modules disagree; run the package manager's install first";
}
printJson(result);
