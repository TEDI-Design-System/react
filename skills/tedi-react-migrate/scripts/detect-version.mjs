#!/usr/bin/env node
// Which TEDI version does the project use, and which did it use before?
// Usage: node detect-version.mjs [projectDir]
import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import config from './config.mjs';
import {
  parseArgs,
  rangeMinimum,
  printJson,
  LOCKFILES,
  lockedVersion,
  isExactVersion,
  yarnEntry,
  yarnDependencyRange,
  bunLockedVersion,
} from './lib.mjs';

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

const pj = read('package.json');
if (!pj) {
  printJson({ ...result, error: `no package.json in ${dir}` });
  process.exit(1);
}
const manifest = JSON.parse(pj);
// npm precedence: an optionalDependencies entry overrides the same key in dependencies.
const depIn = (m, name) =>
  m?.optionalDependencies?.[name] ??
  m?.dependencies?.[name] ??
  m?.devDependencies?.[name] ??
  m?.peerDependencies?.[name] ??
  null;
const depOf = (name) => depIn(manifest, name);
const range = depOf(pkg);
result.packageJsonRange = range;
result.coreRange = depOf(config.corePkg);

// The lockfile is in the project's own folder, or above it in a workspace root (a folder with
// pnpm-workspace.yaml or a package.json `workspaces` field). An unrelated lockfile higher up is ignored.
const isWorkspaceRoot = (d) => {
  if (existsSync(join(d, 'pnpm-workspace.yaml'))) return true;
  try {
    return Boolean(JSON.parse(readFileSync(join(d, 'package.json'), 'utf8')).workspaces);
  } catch {
    return false;
  }
};
// With several lockfiles in one folder (a leftover from switching managers), the `packageManager` field
// decides; without it the first one is used and a warning names the others.
const MANAGER_LOCKFILE = {
  npm: 'package-lock.json',
  pnpm: 'pnpm-lock.yaml',
  yarn: 'yarn.lock',
  bun: 'bun.lock',
};
const managerOf = (d) => {
  try {
    const field = JSON.parse(readFileSync(join(d, 'package.json'), 'utf8')).packageManager;
    return MANAGER_LOCKFILE[String(field).split('@')[0]] ?? null;
  } catch {
    return null;
  }
};
let lock = null;
for (let d = dir; ; d = dirname(d)) {
  const found = LOCKFILES.filter((f) => existsSync(join(d, f)));
  const preferred = managerOf(d) ?? managerOf(dir);
  const file = found.includes(preferred) ? preferred : found[0];
  if (file && (d === dir || isWorkspaceRoot(d))) {
    if (found.length > 1 && file !== preferred)
      result.lockfileWarning = `several lockfiles (${found.join(
        ', '
      )}) and no packageManager field; read ${file}. Ask which package manager the project uses.`;
    lock = {
      file,
      dir: d,
      importer: relative(d, dir).split(sep).join('/') || '.',
    };
    break;
  }
  if (dirname(d) === d || existsSync(join(d, '.git'))) break;
}
// `man` is the package.json of the same revision as `text`: yarn entries are keyed by its ranges.
const lockedAt = (text, name = pkg, man = manifest, range = depIn(man, name)) =>
  text == null
    ? null
    : lockedVersion(lock.file, text, name, lock.importer, range, lock.importer === '.' ? null : manifest.name);
// npm and bun nest a copy the library needs under the library when the hoisted one differs. Only the
// library copy the project uses counts: a workspace's own copy when it has one, else the root's.
const nestedCoreAt = (text) => {
  if (text == null) return null;
  if (lock.file === 'bun.lock') {
    const own = lock.importer !== '.' && manifest.name && `${manifest.name}/${pkg}`;
    const lib = own && bunLockedVersion(text, [own]) ? own : pkg;
    return bunLockedVersion(text, [`${lib}/${config.corePkg}`]);
  }
  if (lock.file !== 'package-lock.json') return null;
  try {
    const base = lock.importer === '.' ? '' : `${lock.importer}/`;
    const packages = JSON.parse(text).packages ?? {};
    const lib = packages[`${base}node_modules/${pkg}`] ? `${base}node_modules/${pkg}` : `node_modules/${pkg}`;
    return packages[`${lib}/node_modules/${config.corePkg}`]?.version ?? null;
  } catch {
    return null;
  }
};
// Core as the library's own entry resolves it, when core is not a direct dependency: yarn.lock lists the
// library's core range under its entry, npm and bun may nest a copy under the library.
const coreAt = (text, man = manifest) => {
  if (text == null) return null;
  if (depIn(man, config.corePkg)) return lockedAt(text, config.corePkg, man);
  if (lock.file === 'yarn.lock') {
    const via = yarnDependencyRange(yarnEntry(text, pkg, depIn(man, pkg)), config.corePkg);
    return lockedAt(text, config.corePkg, man, via);
  }
  return nestedCoreAt(text) ?? lockedAt(text, config.corePkg, man);
};
if (lock) {
  const text = readFileSync(join(lock.dir, lock.file), 'utf8');
  result.lockfile = relative(dir, join(lock.dir, lock.file)) || lock.file;
  result.lockfileVersion = lockedAt(text);
  result.coreLockfileVersion = coreAt(text);
  if (!result.lockfileVersion && range)
    result.warning = `${result.lockfile} lists no version of ${pkg} for this project; check the lockfile or run the install`;
}

// Yarn Plug'n'Play installs without node_modules; its runtime API says which copy the project resolves.
// It sits in the project's folder or a workspace root above it.
const pnp = (() => {
  for (let d = dir; ; d = dirname(d)) {
    for (const f of ['.pnp.cjs', '.pnp.js'])
      if (existsSync(join(d, f))) {
        try {
          return createRequire(import.meta.url)(join(d, f));
        } catch {
          return null;
        }
      }
    if (dirname(d) === d || existsSync(join(d, '.git'))) return null;
  }
})();
// `names` is a dependency chain from the project: [pkg], or [pkg, core] for the library's own core.
const pnpVersionOf = (names) => {
  try {
    let locator = pnp.findPackageLocator(join(realpathSync(dir), '/'));
    for (const name of names) {
      const ref = pnp.getPackageInformation(locator)?.packageDependencies.get(name);
      if (ref == null) return null;
      // An alias is [name, reference]; a peer-dependent copy is "virtual:<hash>#npm:<version>".
      locator = Array.isArray(ref) ? { name: ref[0], reference: ref[1] } : { name, reference: ref };
    }
    return locator.reference.match(/npm:(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/)?.[1] ?? null;
  } catch {
    return null;
  }
};
// node_modules: the project's own, else hoisted to the workspace root; with PnP, the PnP API. The rest
// of the chain is looked up under the copy of the first package that the project uses, not another one.
const installedOf = (...names) => {
  const path = names.flatMap((n, i) => (i ? ['node_modules', n] : [n]));
  for (const d of [dir, lock?.dir].filter(Boolean)) {
    if (!existsSync(join(d, 'node_modules', names[0], 'package.json'))) continue;
    const f = join(d, 'node_modules', ...path, 'package.json');
    return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')).version : null;
  }
  return pnp ? pnpVersionOf(names) : null;
};
result.installedVersion = installedOf(pkg);
result.coreInstalledVersion =
  (result.coreRange ? null : installedOf(pkg, config.corePkg)) ?? installedOf(config.corePkg);
// The core version the project resolves today: the baseline for core's own release notes and diff.
// Core comes in through the library, so the project's importer entry often doesn't list it (pnpm's
// isolated node_modules doesn't either); then the library's core dependency decides, if it is a pin.
result.coreVersion = result.coreLockfileVersion ?? result.coreInstalledVersion ?? null;
const libVersion = result.lockfileVersion ?? result.installedVersion;
if (!result.coreVersion && !result.coreRange && libVersion) {
  try {
    const res = await fetch(`https://registry.npmjs.org/${pkg.replace('/', '%2F')}/${libVersion}`);
    const core = res.ok ? (await res.json()).dependencies?.[config.corePkg] : null;
    if (isExactVersion(core)) {
      result.coreVersion = core;
      result.coreVersionSource = `${pkg}@${libVersion} pins ${config.corePkg}`;
    }
  } catch {
    // offline: leave coreVersion null; SKILL.md falls back to resolve-target's core.from
  }
}

// Every commit that changed the locked version (exact versions, along the first-parent line), and a
// bump that is installed but not committed yet.
const HISTORY_LIMIT = 500;
const UNRESOLVED = `the lockfile lists several copies of ${pkg} and none matches that revision's package.json range; ask the developer`;
result.history = null;
if (lock && git(['rev-parse', '--is-inside-work-tree'], lock.dir)) {
  const lockPath = `./${lock.file}`;
  // Library and core versions from one lockfile revision, so a historical `from` gets its own core.
  // The project's package.json in the same revision: its ranges pick the yarn entries.
  const manifestPath = `./${relative(lock.dir, join(dir, 'package.json')).split(sep).join('/')}`;
  const manifestAt = (rev) => {
    try {
      return JSON.parse(git(['show', `${rev}:${manifestPath}`], lock.dir));
    } catch {
      return null;
    }
  };
  const lockAt = (rev) => git(['show', `${rev}:${lockPath}`], lock.dir);
  const at = (rev) => {
    const text = lockAt(rev);
    const man = manifestAt(rev);
    const lib = lockedAt(text, pkg, man);
    // Listed, but no entry matches that revision's range (several copies): unknown, not absent.
    const unresolved = !lib && Boolean(text?.includes(`${pkg}@`));
    // Core is read only for the revisions that are reported; the lockfile is read again for it then.
    return { lib, unresolved, core: () => coreAt(lockAt(rev), man) };
  };
  const committed = at('HEAD');
  // yarn.lock entries are keyed by the package.json range: switching to a range the lockfile already
  // lists changes only package.json.
  const historyPaths = [lock.file, ...(lock.file === 'yarn.lock' ? [manifestPath] : [])];
  const lockChanged = git(['diff', '--quiet', 'HEAD', '--', ...historyPaths], lock.dir) === null;
  if (
    result.lockfileVersion &&
    (committed.lib ? committed.lib !== result.lockfileVersion : committed.unresolved && lockChanged)
  ) {
    result.uncommittedBump = {
      before: committed.lib,
      after: result.lockfileVersion,
      coreBefore: committed.core(),
      coreAfter: result.coreLockfileVersion,
      ...(committed.unresolved && { unresolved: UNRESOLVED }),
    };
  }
  const log =
    git(
      [
        'log',
        '--first-parent',
        '-n',
        String(HISTORY_LIMIT + 1),
        '--format=%h %ad %s',
        '--date=short',
        '--',
        ...historyPaths,
      ],
      lock.dir
    ) ?? '';
  const commits = log.split('\n').filter(Boolean);
  if (commits.length > HISTORY_LIMIT) {
    commits.length = HISTORY_LIMIT;
    result.historyTruncated = true;
  }
  // The state before a listed commit is the state of the next older listed commit.
  const versions = commits.map((line) => at(line.split(' ')[0]));
  // In a shallow clone the oldest listed commit may have no parent here: its `before` is unknown, not
  // "added".
  const shallow = git(['rev-parse', '--is-shallow-repository'], lock.dir)?.trim() === 'true';
  if (shallow) result.historyShallow = true;
  result.history = [];
  for (const [i, line] of commits.entries()) {
    const [commit, date, ...subject] = line.split(' ');
    const after = versions[i];
    const oldest = i + 1 === commits.length;
    if (oldest && shallow && !git(['rev-parse', '--verify', '--quiet', `${commit}^`], lock.dir)) continue;
    const before = oldest ? at(`${commit}^`) : versions[i + 1];
    if (after.lib && before.lib !== after.lib)
      result.history.push({
        commit,
        date,
        subject: subject.join(' '),
        before: before.lib,
        after: after.lib,
        coreBefore: before.core(),
        coreAfter: after.core(),
        ...(before.unresolved && { unresolved: UNRESOLVED }),
      });
  }
}

result.from = result.lockfileVersion ?? result.installedVersion ?? rangeMinimum(range);
result.source = result.lockfileVersion
  ? `lockfile (${result.lockfile})`
  : result.installedVersion
  ? pnp
    ? "Yarn Plug'n'Play"
    : 'node_modules'
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
