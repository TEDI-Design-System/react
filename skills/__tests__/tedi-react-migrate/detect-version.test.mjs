import assert from 'node:assert/strict';
import { mkdirSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { describe, test } from 'node:test';

import { commit, config, initRepo, npmLock, project, run, write } from './helpers.mjs';

const pkg = config.pkg;
const core = config.corePkg;
const detect = (root) => run('detect-version.mjs', [root]).json;
const app = (range = '^9.0.0', extra = {}) => ({
  name: 'app',
  dependencies: { [pkg]: range, ...extra },
});
// A lockfile where core comes in through the library, hoisted to the top level.
const lockWith = (lib, coreVersion, nested = {}) =>
  npmLock({
    [`node_modules/${pkg}`]: { version: lib },
    [`node_modules/${core}`]: { version: coreVersion },
    ...nested,
  });
const installed = (root, path, version) => write(root, { [join(path, 'package.json')]: { version } });

describe('detect-version: npm', () => {
  test('reads the library and its core from package-lock.json', () => {
    const root = project({
      'package.json': app(),
      'package-lock.json': lockWith('9.4.0', '6.12.0'),
    });
    const out = detect(root);
    assert.equal(out.from, '9.4.0');
    assert.equal(out.source, 'lockfile (package-lock.json)');
    assert.equal(out.coreRange, null);
    assert.equal(out.coreVersion, '6.12.0');
  });

  test('a core copy nested under the library wins over the hoisted one', () => {
    const root = project({
      'package.json': app(),
      'package-lock.json': lockWith('9.4.0', '6.13.0', {
        [`node_modules/${pkg}/node_modules/${core}`]: { version: '6.12.0' },
      }),
    });
    assert.equal(detect(root).coreVersion, '6.12.0');
  });

  test('core as a direct dependency is reported through coreRange', () => {
    const root = project({
      'package.json': app('^9.0.0', { [core]: '^6.12.0' }),
      'package-lock.json': lockWith('9.4.0', '6.13.0'),
    });
    const out = detect(root);
    assert.equal(out.coreRange, '^6.12.0');
    assert.equal(out.coreVersion, '6.13.0');
  });

  test('without a lockfile, node_modules decides; core resolves from the library', () => {
    const root = project({ 'package.json': app() });
    installed(root, `node_modules/${pkg}`, '9.4.0');
    installed(root, `node_modules/${core}`, '6.13.0');
    installed(root, `node_modules/${pkg}/node_modules/${core}`, '6.12.0');
    const out = detect(root);
    assert.equal(out.from, '9.4.0');
    assert.equal(out.source, 'node_modules');
    assert.equal(out.coreInstalledVersion, '6.12.0');
  });

  test("core resolves from the library's real folder (a symlinked store)", () => {
    const root = project({ 'package.json': app() });
    // pnpm-style: the library is a link into a store folder that holds its dependencies as siblings.
    const store = join(root, 'node_modules/.store/lib/node_modules');
    installed(root, `node_modules/.store/lib/node_modules/${pkg}`, '9.4.0');
    installed(root, `node_modules/.store/lib/node_modules/${core}`, '6.12.0');
    installed(root, `node_modules/${core}`, '6.13.0');
    mkdirSync(join(root, 'node_modules', pkg, '..'), { recursive: true });
    symlinkSync(join(store, pkg), join(root, 'node_modules', pkg), 'dir');
    assert.equal(detect(root).coreInstalledVersion, '6.12.0');
  });

  test('lockfile and node_modules disagreeing is a warning', () => {
    const root = project({
      'package.json': app(),
      'package-lock.json': lockWith('9.4.0', '6.12.0'),
    });
    installed(root, `node_modules/${pkg}`, '9.3.0');
    assert.match(detect(root).warning, /disagree/);
  });

  test('with only a package.json range there is no `from`: the skill asks', () => {
    const root = project({ 'package.json': app('^9.0.0') });
    const out = detect(root);
    assert.equal(out.from, null);
    assert.equal(out.source, null);
    assert.match(out.error, /ask the developer/);
  });

  test('a project without the library is an error', () => {
    const root = project({ 'package.json': { name: 'app' } });
    assert.match(detect(root).error, /is not a dependency/);
  });

  test('a workspace reads the lockfile at the workspace root', () => {
    const root = project({
      'package.json': { name: 'root', workspaces: ['apps/*'] },
      'apps/web/package.json': app(),
      'package-lock.json': npmLock({
        [`node_modules/${pkg}`]: { version: '9.4.0' },
        [`apps/web/node_modules/${pkg}`]: { version: '8.7.0' },
        [`node_modules/${core}`]: { version: '6.12.0' },
      }),
    });
    const out = detect(join(root, 'apps/web'));
    assert.equal(out.from, '8.7.0');
    assert.equal(out.lockfile, '../../package-lock.json');
  });
});

describe('detect-version: git history (npm)', () => {
  test('lists each commit that changed the locked version, with core', () => {
    const root = project({
      'package.json': app('^8.0.0'),
      'package-lock.json': lockWith('8.7.0', '6.11.3'),
    });
    initRepo(root);
    commit(root, 'add tedi');
    write(root, { 'README.md': 'unrelated\n' });
    commit(root, 'docs');
    write(root, {
      'package.json': app('^9.0.0'),
      'package-lock.json': lockWith('9.4.0', '6.12.0'),
    });
    commit(root, 'bump tedi');
    const { history, uncommittedBump } = detect(root);
    assert.equal(uncommittedBump, undefined);
    assert.deepEqual(
      history.map(({ subject, before, after, coreBefore, coreAfter }) => ({
        subject,
        before,
        after,
        coreBefore,
        coreAfter,
      })),
      [
        {
          subject: 'bump tedi',
          before: '8.7.0',
          after: '9.4.0',
          coreBefore: '6.11.3',
          coreAfter: '6.12.0',
        },
        {
          subject: 'add tedi',
          before: null,
          after: '8.7.0',
          coreBefore: null,
          coreAfter: '6.11.3',
        },
      ]
    );
  });

  test('an installed but uncommitted bump is reported', () => {
    const root = project({
      'package.json': app('^8.0.0'),
      'package-lock.json': lockWith('8.7.0', '6.11.3'),
    });
    initRepo(root);
    commit(root, 'add tedi');
    write(root, { 'package-lock.json': lockWith('9.4.0', '6.12.0') });
    assert.deepEqual(detect(root).uncommittedBump, {
      before: '8.7.0',
      after: '9.4.0',
      coreBefore: '6.11.3',
      coreAfter: '6.12.0',
    });
  });
});

// Regression cases for what the other package managers already support. Anything else comes back null
// and the skill asks the developer.
describe('detect-version: other package managers', () => {
  const yarnLock = [
    '# yarn lockfile v1',
    '',
    `"${pkg}@9.4.0":`,
    '  version "9.4.0"',
    '  dependencies:',
    `    "${core}" "6.12.0"`,
    '',
    `"${pkg}@~8.7.0":`,
    '  version "8.7.0"',
    '  dependencies:',
    `    "${core}" "6.11.3"`,
    '',
    `"${core}@6.11.3":`,
    '  version "6.11.3"',
    '',
    `"${core}@6.12.0":`,
    '  version "6.12.0"',
    '',
  ].join('\n');

  test('yarn: switching to a range the lockfile already lists is in history', () => {
    const root = project({ 'package.json': app('~8.7.0'), 'yarn.lock': yarnLock });
    initRepo(root);
    commit(root, 'on 8.7');
    write(root, { 'package.json': app('9.4.0') });
    assert.equal(detect(root).uncommittedBump.before, '8.7.0');
    commit(root, 'switch to 9.4');
    const [latest] = detect(root).history;
    assert.equal(latest.subject, 'switch to 9.4');
    assert.equal(latest.before, '8.7.0');
    assert.equal(latest.after, '9.4.0');
    assert.equal(latest.coreBefore, '6.11.3');
    assert.equal(latest.coreAfter, '6.12.0');
  });

  test("yarn Plug'n'Play: the installed version comes from the PnP API", () => {
    const root = project({ 'package.json': app('~8.7.0'), 'yarn.lock': yarnLock });
    // A minimal stand-in for Yarn's generated .pnp.cjs runtime API.
    write(root, {
      '.pnp.cjs': `const deps = {
        "app@workspace:.": [["${pkg}", "virtual:abc#npm:8.7.0"]],
        "${pkg}@virtual:abc#npm:8.7.0": [["${core}", "npm:6.11.3"]],
      };
      module.exports = {
        findPackageLocator: () => ({ name: "app", reference: "workspace:." }),
        getPackageInformation: ({ name, reference }) => ({
          packageDependencies: new Map(deps[name + "@" + reference] ?? []),
        }),
      };`,
    });
    const out = detect(root);
    assert.equal(out.installedVersion, '8.7.0');
    assert.equal(out.coreInstalledVersion, '6.11.3');
  });

  test('bun: core nested under the library wins over the top-level copy', () => {
    const root = project({
      'package.json': app('9.0.0'),
      'bun.lock': `{
        "lockfileVersion": 1,
        "workspaces": { "": { "name": "app" }, },
        "packages": {
          "${core}": ["${core}@6.13.0", "", {}, "sha512-x"],
          "${pkg}": ["${pkg}@9.0.0", "", {}, "sha512-x"],
          "${pkg}/${core}": ["${core}@6.12.0", "", {}, "sha512-x"],
        },
      }`,
    });
    const out = detect(root);
    assert.equal(out.from, '9.0.0');
    assert.equal(out.coreVersion, '6.12.0');
  });
});
