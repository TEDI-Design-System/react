import assert from 'node:assert/strict';
import { join } from 'node:path';
import { describe, test } from 'node:test';

import { config, SCRIPTS } from './helpers.mjs';

const {
  bunLockedVersion,
  compareVersions,
  isExactVersion,
  isPrerelease,
  lockedVersion,
  rangeMinimum,
  yarnDependencyRange,
  yarnEntry,
} = await import(join(SCRIPTS, 'lib.mjs'));
const pkg = config.pkg;
const core = config.corePkg;

describe('versions', () => {
  test('compareVersions orders release candidates numerically and before the release', () => {
    const sorted = ['10.0.0', '10.0.0-rc.10', '9.4.0', '10.0.0-rc.9'].sort(compareVersions);
    assert.deepEqual(sorted, ['9.4.0', '10.0.0-rc.9', '10.0.0-rc.10', '10.0.0']);
  });

  test('isPrerelease and isExactVersion', () => {
    assert.equal(isPrerelease('10.0.0-rc.1'), true);
    assert.equal(isPrerelease('10.0.0'), false);
    assert.equal(isExactVersion('10.0.0-rc.1'), true);
    assert.equal(isExactVersion('^10.0.0'), false);
    assert.equal(isExactVersion(true), false);
    assert.equal(isExactVersion('../../x'), false);
  });

  test('rangeMinimum reads one exact, ^, ~ or >= version and nothing else', () => {
    assert.equal(rangeMinimum('^9.4.0'), '9.4.0');
    assert.equal(rangeMinimum('~8.7.0'), '8.7.0');
    assert.equal(rangeMinimum('9.4.0'), '9.4.0');
    assert.equal(rangeMinimum('>=10.0.0-rc.3'), '10.0.0-rc.3');
    assert.equal(rangeMinimum('^8.0.0 || ^9.0.0'), null);
    assert.equal(rangeMinimum('latest'), null);
    assert.equal(rangeMinimum('9.x'), null);
  });
});

describe('lockedVersion: npm', () => {
  test("reads the project's copy from package-lock.json v3", () => {
    const lock = JSON.stringify({
      packages: {
        '': {},
        [`node_modules/${pkg}`]: { version: '9.4.0' },
        [`node_modules/other/node_modules/${pkg}`]: { version: '8.7.0' },
      },
    });
    assert.equal(lockedVersion('package-lock.json', lock, pkg), '9.4.0');
  });

  test("prefers a workspace's own copy over the hoisted one", () => {
    const lock = JSON.stringify({
      packages: {
        [`node_modules/${pkg}`]: { version: '9.4.0' },
        [`apps/web/node_modules/${pkg}`]: { version: '8.7.0' },
      },
    });
    assert.equal(lockedVersion('package-lock.json', lock, pkg, 'apps/web'), '8.7.0');
    assert.equal(lockedVersion('package-lock.json', lock, pkg, 'apps/admin'), '9.4.0');
  });

  test('reads a lockfile v1 `dependencies` map', () => {
    const lock = JSON.stringify({
      dependencies: { [pkg]: { version: '7.0.0' } },
    });
    assert.equal(lockedVersion('package-lock.json', lock, pkg), '7.0.0');
  });

  test('returns null for an unreadable lockfile', () => {
    assert.equal(lockedVersion('package-lock.json', '{ not json', pkg), null);
  });
});

// Other package managers: regression cases for what the scripts already read. Anything they can't read
// comes back null and the skill asks the developer.
describe('lockedVersion: other package managers', () => {
  test("pnpm 9 reads the importer's dependency, not other resolved copies", () => {
    const lock = [
      "lockfileVersion: '9.0'",
      '',
      'importers:',
      '',
      '  .:',
      '    dependencies:',
      `      '${pkg}':`,
      '        specifier: ^9.4.0',
      '        version: 9.4.0(react@18.3.1)',
      '',
      'packages:',
      '',
      `  '${pkg}@8.7.0':`,
      '    resolution: {integrity: sha512-x}',
      '',
    ].join('\n');
    assert.equal(lockedVersion('pnpm-lock.yaml', lock, pkg), '9.4.0');
  });

  const yarnClassic = [
    '# yarn lockfile v1',
    '',
    `"${pkg}@9.4.0":`,
    '  version "9.4.0"',
    '  dependencies:',
    `    "${core}" "6.12.0"`,
    '',
    `"${pkg}@~8.7.0":`,
    '  version "8.7.0"',
    '',
  ].join('\n');

  test('yarn picks the entry that matches the package.json range', () => {
    assert.equal(lockedVersion('yarn.lock', yarnClassic, pkg, '.', '~8.7.0'), '8.7.0');
    assert.equal(lockedVersion('yarn.lock', yarnClassic, pkg, '.', '9.4.0'), '9.4.0');
  });

  test('yarn with several copies and no matching range is unresolved (null)', () => {
    assert.equal(lockedVersion('yarn.lock', yarnClassic, pkg, '.', '^9.0.0'), null);
  });

  test('yarn berry selectors and dependency ranges', () => {
    const berry = [
      '__metadata:',
      '  version: 8',
      '',
      `"${pkg}@npm:^9.0.0":`,
      '  version: 9.4.0',
      `  resolution: "${pkg}@npm:9.4.0"`,
      '  dependencies:',
      `    "${core}": "npm:6.12.0"`,
      '',
    ].join('\n');
    const entry = yarnEntry(berry, pkg, '^9.0.0');
    assert.equal(entry.version, '9.4.0');
    assert.equal(yarnDependencyRange(entry, core), '6.12.0');
  });

  test('bun reads the top-level copy and a nested copy by key', () => {
    const lock = `{
      "lockfileVersion": 1,
      "workspaces": { "": { "name": "app" }, },
      "packages": {
        "${core}": ["${core}@6.13.0", "", {}, "sha512-x"],
        "${pkg}": ["${pkg}@9.0.0", "", {}, "sha512-x"],
        "${pkg}/${core}": ["${core}@6.12.0", "", {}, "sha512-x"],
      },
    }`;
    assert.equal(lockedVersion('bun.lock', lock, pkg), '9.0.0');
    assert.equal(lockedVersion('bun.lock', lock, core), '6.13.0');
    assert.equal(bunLockedVersion(lock, [`${pkg}/${core}`]), '6.12.0');
    assert.equal(bunLockedVersion(lock, ['missing']), null);
  });
});
