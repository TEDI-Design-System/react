import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { run } from './helpers.mjs';

// Argument checks run before any network access.
describe('script arguments', () => {
  for (const [script, args, message] of [
    ['fetch-package.mjs', ['--version'], /--version must be an exact version/],
    ['fetch-package.mjs', ['--version', '../../x'], /--version must be an exact version/],
    ['fetch-package.mjs', ['--version', '9.4.0', '--project', '/no/such/dir'], /does not exist/],
    ['resolve-target.mjs', ['--from', '^9.0.0'], /exact version/],
    ['fetch-releases.mjs', ['--from', '9.0.0', '--to', 'latest'], /exact version/],
    ['diff-core-vars.mjs', ['--from', '6.12.0', '--to', '^6'], /exact version/],
  ])
    test(`${script} ${args.join(' ')}`, () => {
      const { status, stderr } = run(script, args);
      assert.equal(status, 1);
      assert.match(stderr, message);
    });
});
