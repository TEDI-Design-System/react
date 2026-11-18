#!/usr/bin/env node
// Which version to migrate to, and what it requires.
// Usage: node resolve-target.mjs --from <version> [--channel stable|rc|auto] [--version <exact>] [--project <dir>]
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import config from './config.mjs';
import {
  parseArgs,
  fail,
  projectArg,
  npmMetadata,
  compareVersions,
  isPrerelease,
  isExactVersion,
  coreVersionOf,
  printJson,
} from './lib.mjs';

const args = parseArgs();
const from = args.from;
if (!from) fail('--from <version> is required (from detect-version.mjs)');
if (!isExactVersion(from))
  fail(
    `--from must be an exact version such as 9.4.0, got "${from}"; take it from the lockfile (detect-version history) or ask the developer`
  );
const channel = args.channel ?? 'auto';
if (!['auto', 'stable', 'rc'].includes(channel)) fail(`--channel must be stable, rc or auto, got "${channel}"`);

const meta = await npmMetadata(config.pkg);
const tags = meta['dist-tags'] ?? {};
let target = args.version;
let rcUnavailable = false;
if (!target) {
  const wantRc = channel === 'rc' || (channel === 'auto' && isPrerelease(from));
  const rcNewer = Boolean(tags.rc && compareVersions(tags.rc, tags.latest) > 0);
  target = wantRc && rcNewer ? tags.rc : tags.latest;
  rcUnavailable = channel === 'rc' && !rcNewer;
}
if (!meta.versions[target]) fail(`${config.pkg}@${target} is not published`);
if (!meta.versions[from]) process.stderr.write(`warning: ${from} is not a published version of ${config.pkg}\n`);

const inRange = Object.keys(meta.versions)
  .filter((v) => compareVersions(v, from) > 0 && compareVersions(v, target) <= 0)
  .sort(compareVersions);

const t = meta.versions[target];

// Required peers of the target that the project's package.json doesn't list.
const projectFile = join(projectArg(args, process.cwd()), 'package.json');
let missingPeers = null;
if (existsSync(projectFile)) {
  const p = JSON.parse(readFileSync(projectFile, 'utf8'));
  const listed = {
    ...p.dependencies,
    ...p.optionalDependencies,
    ...p.devDependencies,
    ...p.peerDependencies,
  };
  const optional = t.peerDependenciesMeta ?? {};
  missingPeers = Object.keys(t.peerDependencies ?? {}).filter((n) => !listed[n] && !optional[n]?.optional);
}
printJson({
  package: config.pkg,
  from,
  to: target,
  distTags: tags,
  channel: isPrerelease(target) ? 'rc' : 'stable',
  ...(rcUnavailable && {
    warning: `--channel rc was requested but no rc is newer than latest (${tags.latest}); the target is the stable release`,
  }),
  upToDate: compareVersions(from, target) >= 0,
  versionsInRange: inRange.length,
  majorsCrossed: [...new Set(inRange.map((v) => Number(v.split('.')[0])))].filter(
    (m) => m > Number(from.split('.')[0])
  ),
  core: { from: coreVersionOf(meta, from), to: coreVersionOf(meta, target) },
  targetPeerDependencies: t.peerDependencies ?? {},
  requiredPeersNotInPackageJson: missingPeers,
  newerRc: tags.rc && compareVersions(tags.rc, target) > 0 ? tags.rc : null,
});
