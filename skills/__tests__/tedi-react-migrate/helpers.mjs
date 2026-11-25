import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after } from 'node:test';
import { fileURLToPath } from 'node:url';

export const SCRIPTS = fileURLToPath(new URL('../../tedi-react-migrate/scripts/', import.meta.url));
export const { default: config } = await import(join(SCRIPTS, 'config.mjs'));

const dirs = [];
after(() => dirs.forEach((d) => rmSync(d, { recursive: true, force: true })));

/** A temporary project folder with the given files (objects are written as JSON). */
export function project(files = {}) {
  const root = mkdtempSync(join(tmpdir(), 'tedi-migrate-'));
  dirs.push(root);
  write(root, files);
  return root;
}

export function write(root, files) {
  for (const [path, content] of Object.entries(files)) {
    const file = join(root, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`);
  }
}

const GIT_ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: 'test',
  GIT_AUTHOR_EMAIL: 'test@example.com',
  GIT_COMMITTER_NAME: 'test',
  GIT_COMMITTER_EMAIL: 'test@example.com',
  // The developer's own git config (commit signing, hooks) must not affect the fixtures.
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_NOSYSTEM: '1',
};
export const git = (root, ...args) => execFileSync('git', args, { cwd: root, env: GIT_ENV, encoding: 'utf8' });
export function commit(root, message) {
  git(root, 'add', '-A');
  git(root, 'commit', '-q', '-m', message);
}
export const initRepo = (root) => git(root, 'init', '-q');

/** Runs a script and returns `{ status, json, stderr }`. */
export function run(script, args = []) {
  const res = spawnSync(process.execPath, [join(SCRIPTS, script), ...args], {
    encoding: 'utf8',
  });
  let json = null;
  try {
    json = JSON.parse(res.stdout);
  } catch {
    // not JSON: a failure message on stderr
  }
  return { status: res.status, json, stderr: res.stderr };
}

/** package-lock.json v3 with the given `packages` entries. */
export const npmLock = (packages) => ({
  name: 'app',
  lockfileVersion: 3,
  requires: true,
  packages: { '': { name: 'app' }, ...packages },
});
