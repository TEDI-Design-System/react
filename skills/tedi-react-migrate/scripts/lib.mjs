// Shared helpers. Zero dependencies, Node >= 20.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
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

/** Lowest version a package.json range allows: "^9.0.0" -> "9.0.0". */
export function rangeMinimum(range) {
  const m = String(range).match(/(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)/);
  return m ? m[1] : null;
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
  return range ? { range, min: rangeMinimum(range) } : null;
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
    const out = execFileSync(
      'gh',
      [
        'api',
        '--paginate',
        `repos/${repo}/releases?per_page=100`,
        '--jq',
        '.[] | {tag_name, name, body, prerelease, published_at, html_url}',
      ],
      { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
    );
    return out
      .split('\n')
      .filter(Boolean)
      .map((l) => JSON.parse(l));
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
  for (let off = 0; off + 512 <= tar.length; ) {
    const header = tar.subarray(off, off + 512);
    if (header.every((b) => b === 0)) break;
    const str = (a, b) => header.subarray(a, b).toString('utf8').replace(/\0.*$/s, '');
    const prefix = str(345, 500);
    const name = (prefix ? `${prefix}/` : '') + str(0, 100);
    const size = parseInt(str(124, 136).trim() || '0', 8);
    const type = String.fromCharCode(header[156] || 48);
    const start = off + 512;
    const path = name.replace(/^package\//, '');
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
  for (const f of files) {
    const target = join(root, f.name);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, f.text);
  }
}

export function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}
