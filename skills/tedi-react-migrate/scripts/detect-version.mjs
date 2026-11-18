#!/usr/bin/env node
// Which TEDI version does the project use, and which did it use before?
// Usage: node detect-version.mjs [projectDir]
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import config from './config.mjs';
import { parseArgs, rangeMinimum, printJson } from './lib.mjs';

const args = parseArgs();
const dir = args._[0] ?? process.cwd();
const pkg = config.pkg;
const read = (f) => (existsSync(join(dir, f)) ? readFileSync(join(dir, f), 'utf8') : null);
const escaped = pkg.replace(/[/.]/g, '\\$&');

const result = { package: pkg, from: null, source: null };

// 1. package.json range
const pj = read('package.json');
if (!pj) {
  printJson({ ...result, error: `no package.json in ${dir}` });
  process.exit(1);
}
const manifest = JSON.parse(pj);
const range =
  manifest.dependencies?.[pkg] ?? manifest.devDependencies?.[pkg] ?? manifest.peerDependencies?.[pkg] ?? null;
result.packageJsonRange = range;
result.coreRange = manifest.dependencies?.[config.corePkg] ?? manifest.devDependencies?.[config.corePkg] ?? null;

// 2. lockfile
const locks = {
  'package-lock.json': (t) => JSON.parse(t).packages?.[`node_modules/${pkg}`]?.version,
  'pnpm-lock.yaml': (t) => t.match(new RegExp(`${escaped}@(\\d+\\.\\d+\\.\\d+[^:('"\\s]*)`))?.[1],
  'yarn.lock': (t) => t.match(new RegExp(`"?${escaped}@[^\\n]*:\\n\\s+version:?\\s+"?([^"\\n]+)"?`))?.[1],
  'bun.lock': (t) => t.match(new RegExp(`${escaped}@(\\d+\\.\\d+\\.\\d+[^"'\\s,\\]]*)`))?.[1],
};
for (const [file, extract] of Object.entries(locks)) {
  const text = read(file);
  if (!text) continue;
  result.lockfile = file;
  try {
    result.lockfileVersion = extract(text) ?? null;
  } catch {
    result.lockfileVersion = null;
  }
  break;
}

// 3. node_modules
const installed = read(join('node_modules', pkg, 'package.json'));
result.installedVersion = installed ? JSON.parse(installed).version : null;

// 4. git history of package.json: every change of the range
result.history = [];
try {
  const log = execFileSync('git', ['log', '--format=__COMMIT %h %ad %s', '--date=short', '-p', '--', 'package.json'], {
    cwd: dir,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  let current = null;
  const line = new RegExp(`^([-+])(?![-+]).*"${escaped}"\\s*:\\s*"([^"]+)"`);
  for (const l of log.split('\n')) {
    if (l.startsWith('__COMMIT ')) {
      const [, hash, date, ...subject] = l.split(' ');
      current = { commit: hash, date, subject: subject.join(' ') };
      continue;
    }
    const m = l.match(line);
    if (!m || !current) continue;
    current[m[1] === '-' ? 'before' : 'after'] = m[2];
    if (current.after && !result.history.includes(current)) result.history.push(current);
  }
} catch {
  result.history = null; // not a git repo
}

result.from = result.lockfileVersion ?? result.installedVersion ?? rangeMinimum(range);
result.source = result.lockfileVersion
  ? `lockfile (${result.lockfile})`
  : result.installedVersion
  ? 'node_modules'
  : range
  ? 'package.json range minimum'
  : null;
if (!range) result.error = `${pkg} is not a dependency of ${dir}/package.json`;
if (result.lockfileVersion && result.installedVersion && result.lockfileVersion !== result.installedVersion) {
  result.warning = "lockfile and node_modules disagree; run the package manager's install first";
}
printJson(result);
