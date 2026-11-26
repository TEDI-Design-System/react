// Shared helpers. Zero dependencies, Node >= 20.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { gunzipSync } from 'node:zlib';

export function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [key, inline] = a.slice(2).split('=', 2);
      if (inline !== undefined) args[key] = inline;
      else if (argv[i + 1] && !argv[i + 1].startsWith('--')) args[key] = argv[++i];
      else args[key] = true;
    } else args._.push(a);
  }
  return args;
}

export function fail(message) {
  process.stderr.write(`error: ${message}\n`);
  process.exit(1);
}

// ---------- semver (enough for x.y.z and x.y.z-tag.n) ----------

export function parseVersion(v) {
  const m = String(v)
    .trim()
    .match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?/);
  if (!m) return null;
  return {
    raw: m[0].replace(/^v/, ''),
    nums: [Number(m[1]), Number(m[2]), Number(m[3])],
    pre: m[4] ? m[4].split('.').map((p) => (/^\d+$/.test(p) ? Number(p) : p)) : [],
  };
}

export function compareVersions(a, b) {
  const x = typeof a === 'string' ? parseVersion(a) : a;
  const y = typeof b === 'string' ? parseVersion(b) : b;
  for (let i = 0; i < 3; i++) if (x.nums[i] !== y.nums[i]) return x.nums[i] - y.nums[i];
  if (!x.pre.length && !y.pre.length) return 0;
  if (!x.pre.length) return 1;
  if (!y.pre.length) return -1;
  for (let i = 0; i < Math.max(x.pre.length, y.pre.length); i++) {
    const p = x.pre[i];
    const q = y.pre[i];
    if (p === undefined) return -1;
    if (q === undefined) return 1;
    if (p === q) continue;
    if (typeof p === 'number' && typeof q === 'number') return p - q;
    if (typeof p === 'number') return -1;
    if (typeof q === 'number') return 1;
    return p < q ? -1 : 1;
  }
  return 0;
}

export const isPrerelease = (v) => parseVersion(v)?.pre.length > 0;

/**
 * Lowest version a package.json range allows: "^9.0.0" -> "9.0.0". Only for one exact, ^, ~ or >=
 * version; null for anything else (`||`, `<`, `>`, hyphen ranges, x/* wildcards, tags, URLs).
 */
export function rangeMinimum(range) {
  const m = String(range)
    .trim()
    .match(/^(?:[\^~]|>=|=)?\s*v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/);
  return m ? m[1] : null;
}

/** An exact version ("9.4.0", "10.0.0-rc.3"), not a range. */
export const isExactVersion = (v) => /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(String(v));

// ---------- lockfiles ----------

export const LOCKFILES = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lock'];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

// pnpm appends peer suffixes: "9.4.0_@x+core@20.0.0", "9.4.0(@x/core@20.0.0)".
const exact = (v) => v?.match(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?/)?.[0] ?? null;

/**
 * The yarn.lock entry (classic or berry) that `range`, the project's specifier, resolves to:
 * `{ version, body }`. Without a matching selector it is the only entry, or null when several copies
 * make it ambiguous.
 */
export function yarnEntry(rawText, pkg, range = null) {
  const text = rawText.replace(/\r\n?/g, '\n');
  const header = new RegExp(`^"?(${escapeRe(pkg)}@[^\\n]*):\\n((?:[ \\t]+[^\\n]*(?:\\n|$))*)`, 'gm');
  const entries = [...text.matchAll(header)].map((m) => ({
    specs: m[1].split(/,\s*/).map((s) => s.replace(/^"|"$/g, '')),
    version: exact(m[2].match(/^[ \t]+version:?[ \t]+"?([^"\n]+)"?/m)?.[1]),
    body: m[2],
  }));
  const r = range?.replace(/^npm:/, '');
  const match = r && entries.find((e) => e.specs.some((s) => s === `${pkg}@${r}` || s === `${pkg}@npm:${r}`));
  return match || (entries.length === 1 ? entries[0] : null);
}

/** The range a yarn.lock entry lists for a dependency: classic `"dep" "1.0.0"`, berry `dep: "npm:1.0.0"`. */
export const yarnDependencyRange = (entry, dep) =>
  entry?.body.match(new RegExp(`^[ \\t]+"?${escapeRe(dep)}"?:?[ \\t]+"?([^"\\n]+)"?`, 'm'))?.[1].replace(/^npm:/, '') ??
  null;

// bun.lock is JSONC with trailing commas. `packages[pkg]` is the top-level copy; nested copies are keyed
// "<dependent>/<pkg>", e.g. "@tedi-design-system/react/@tedi-design-system/core".
const parseBunLock = (text) => JSON.parse(text.replace(/,(\s*[}\]])/g, '$1'));
const bunEntryVersion = (lock, keys) => {
  for (const key of keys.filter(Boolean)) {
    const entry = lock.packages?.[key]?.[0];
    if (entry) return exact(entry.slice(entry.lastIndexOf('@') + 1));
  }
  return null;
};
/** The version of the first of `keys` (bun.lock package keys) that the lockfile lists. */
export function bunLockedVersion(rawText, keys) {
  try {
    return bunEntryVersion(parseBunLock(rawText.replace(/\r\n?/g, '\n')), keys);
  } catch {
    return null;
  }
}

/**
 * The version of `pkg` that a lockfile resolves for one project. `importer` is the project's path
 * relative to the lockfile ("." for the lockfile's own folder); npm and pnpm workspaces key by it.
 * `range` is the project's package.json specifier; yarn entries are keyed by it. `workspace` is the
 * project's package name; bun keys a workspace's own copy "<workspace>/<pkg>".
 */
export function lockedVersion(file, rawText, pkg, importer = '.', range = null, workspace = null) {
  const text = rawText.replace(/\r\n?/g, '\n');
  const escaped = escapeRe(pkg);
  try {
    if (file === 'package-lock.json') {
      const lock = JSON.parse(text);
      const base = importer === '.' ? '' : `${importer}/`;
      return (
        lock.packages?.[`${base}node_modules/${pkg}`]?.version ??
        lock.packages?.[`node_modules/${pkg}`]?.version ??
        lock.dependencies?.[pkg]?.version ??
        null
      );
    }
    if (file === 'pnpm-lock.yaml') {
      // pnpm 6+: importers.<path>.<deps>.<pkg>.version. A lockfile without `importers:` has the same
      // shape at the top level. Never the `packages:` keys: those list every resolved copy.
      const lines = text.split('\n');
      const start = lines.indexOf('importers:');
      let block = lines;
      let indent = '';
      if (start >= 0) {
        const key = new RegExp(`^  ['"]?${escapeRe(importer)}['"]?:\\s*$`);
        const at = lines.findIndex((l, i) => i > start && key.test(l));
        if (at < 0) return null;
        const end = lines.findIndex((l, i) => i > at && /^ {0,2}\S/.test(l));
        block = lines.slice(at + 1, end < 0 ? undefined : end);
        indent = '    ';
      } else {
        const end = lines.findIndex((l) => /^packages:/.test(l));
        if (end >= 0) block = lines.slice(0, end);
      }
      // Only entries under a dependency section: `specifiers:` and `overrides:` hold ranges.
      const section = new RegExp(`^${indent}(dependencies|devDependencies|optionalDependencies):\\s*$`);
      const otherSection = new RegExp(`^${indent}\\S`);
      const name = new RegExp(`^${indent}  ['"]?${escaped}['"]?:\\s*(.*)$`);
      let inDeps = false;
      for (let i = 0; i < block.length; i++) {
        if (section.test(block[i])) {
          inDeps = true;
          continue;
        }
        if (otherSection.test(block[i])) {
          inDeps = false;
          continue;
        }
        const m = inDeps && block[i].match(name);
        if (!m) continue;
        if (m[1]) {
          // lockfile 5.x: "pkg: 1.2.3_peer"
          const v = exact(m[1].replace(/^['"]/, ''));
          if (v) return v;
          continue;
        }
        for (let j = i + 1; j < block.length; j++) {
          if (!block[j].startsWith(`${indent}    `)) break;
          const v = block[j].match(/^\s+version:\s*['"]?([^'"\s]+)/);
          if (v && exact(v[1])) return exact(v[1]);
        }
      }
      return null;
    }
    if (file === 'yarn.lock') return yarnEntry(text, pkg, range)?.version ?? null;
    if (file === 'bun.lock') {
      const lock = parseBunLock(text);
      const name = importer === '.' ? null : lock.workspaces?.[importer]?.name ?? workspace;
      return bunEntryVersion(lock, [name && `${name}/${pkg}`, pkg]);
    }
  } catch {
    return null;
  }
  return null;
}

// ---------- network ----------

export async function npmMetadata(pkg) {
  const res = await fetch(`https://registry.npmjs.org/${pkg.replace('/', '%2F')}`);
  if (!res.ok) fail(`npm registry returned ${res.status} for ${pkg}`);
  return res.json();
}

export function coreVersionOf(meta, version) {
  const m = meta.versions?.[version];
  if (!m) return null;
  const range = m.dependencies?.['@tedi-design-system/core'] ?? m.peerDependencies?.['@tedi-design-system/core'];
  // `min` is only the version the project resolves when the range is an exact pin.
  return range ? { range, min: rangeMinimum(range), exact: isExactVersion(range) } : null;
}

function hasGh() {
  try {
    execFileSync('gh', ['auth', 'status'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/** All releases of a GitHub repo, newest first. Uses gh when logged in, else the public REST API. */
export async function githubReleases(repo) {
  if (hasGh()) {
    try {
      const out = execFileSync(
        'gh',
        [
          'api',
          '--paginate',
          `repos/${repo}/releases?per_page=100`,
          '--jq',
          '.[] | {tag_name, name, body, prerelease, published_at, html_url}',
        ],
        {
          encoding: 'utf8',
          maxBuffer: 256 * 1024 * 1024,
          stdio: ['ignore', 'pipe', 'ignore'],
        }
      );
      return out
        .split('\n')
        .filter(Boolean)
        .map((l) => JSON.parse(l));
    } catch {
      process.stderr.write('warning: gh api failed, falling back to the public GitHub API\n');
    }
  }
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'tedi-migrate-skill',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const releases = [];
  let url = `https://api.github.com/repos/${repo}/releases?per_page=100`;
  while (url) {
    const res = await fetch(url, { headers });
    if (!res.ok)
      fail(
        `GitHub API returned ${res.status} for ${url}${
          token ? '' : ' (set GITHUB_TOKEN or log in with gh to raise the rate limit)'
        }`
      );
    releases.push(...(await res.json()));
    url = res.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
  }
  return releases;
}

// ---------- files ----------

const SKIP_DIRS =
  /^(node_modules|dist|build|coverage|out|tmp|\.git|\.angular|\.next|\.nx|\.cache|\.tedi-migrate|storybook-static)$/;

/**
 * Calls `onFile(path, name)` for every regular file under `root` whose name matches `include`. Build
 * output and dependencies are skipped. Symbolic links are not followed (a link back up the tree would
 * loop, a dangling one would throw), and unreadable folders are skipped.
 */
export function walkProject(root, include, onFile) {
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const dirent of entries) {
      if (SKIP_DIRS.test(dirent.name)) continue;
      const path = join(dir, dirent.name);
      if (dirent.isDirectory()) walk(path);
      else if (dirent.isFile() && include.test(dirent.name)) {
        let text;
        try {
          text = readFileSync(path, 'utf8');
        } catch {
          continue;
        }
        onFile(path, dirent.name, text);
      }
    }
  };
  walk(root);
}

/** `--project <dir>` as a checked string, or `fallback` when the flag is absent. */
export function projectArg(args, fallback) {
  const p = args.project;
  if (p === undefined) return fallback;
  if (typeof p !== 'string') fail('--project needs a folder');
  if (!existsSync(p)) fail(`--project ${p} does not exist`);
  return p;
}

export function ensureWorkDir(projectDir) {
  const dir = join(projectDir, '.tedi-migrate');
  mkdirSync(join(dir, 'cache'), { recursive: true });
  const ignore = join(dir, '.gitignore');
  if (!existsSync(ignore)) writeFileSync(ignore, 'cache/\n');
  return dir;
}

/** Files of a published package version: [{ name, text }] (path without the leading "package/"). */
export async function packageFiles(meta, version, filter = () => true) {
  const tarball = meta.versions?.[version]?.dist?.tarball;
  if (!tarball) fail(`${meta.name}@${version} is not published`);
  const res = await fetch(tarball);
  if (!res.ok) fail(`download failed for ${tarball}`);
  const tar = gunzipSync(Buffer.from(await res.arrayBuffer()));
  const files = [];
  let paxPath = null; // a pax "path" record names the next entry only
  for (let off = 0; off + 512 <= tar.length; ) {
    const header = tar.subarray(off, off + 512);
    if (header.every((b) => b === 0)) break;
    const str = (a, b) => header.subarray(a, b).toString('utf8').replace(/\0.*$/s, '');
    const prefix = str(345, 500);
    const name = (prefix ? `${prefix}/` : '') + str(0, 100);
    const size = parseInt(str(124, 136).trim() || '0', 8);
    const type = String.fromCharCode(header[156] || 48);
    const start = off + 512;
    if (type === 'x') {
      const records = tar.subarray(start, start + size).toString('utf8');
      paxPath = records.match(/^\d+ path=(.*)$/m)?.[1] ?? null;
      off = start + Math.ceil(size / 512) * 512;
      continue;
    }
    const path = (paxPath ?? name).replace(/^package\//, '');
    paxPath = null;
    if ((type === '0' || type === '\0') && filter(path)) {
      files.push({
        name: path,
        text: tar.subarray(start, start + size).toString('utf8'),
      });
    }
    off = start + Math.ceil(size / 512) * 512;
  }
  return files;
}

export function writeFiles(root, files) {
  const base = resolve(root);
  for (const f of files) {
    const target = resolve(base, f.name);
    if (!target.startsWith(base + sep)) throw new Error(`archive entry escapes the cache: ${f.name}`);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, f.text);
  }
}

export function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}
