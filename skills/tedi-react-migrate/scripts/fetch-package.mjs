#!/usr/bin/env node
// Unpack a published library version (text files only) so it can be read before installing:
// type declarations, bundles with the translations/labels, styles.
// Usage: node fetch-package.mjs --version <version> [--project <dir>]
// Writes .tedi-migrate/cache/packages/<library>@<version>/ and prints the path.
import { existsSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import config from './config.mjs';
import { parseArgs, fail, npmMetadata, packageFiles, writeFiles, ensureWorkDir, printJson } from './lib.mjs';

const args = parseArgs();
const version = args.version;
if (!version) fail('--version is required');
const project = args.project ?? process.cwd();

const dir = join(ensureWorkDir(project), 'cache', 'packages', `${config.library}@${version}`);
// A cache entry exists only once complete: extract into a staging folder, then rename it into place.
if (!existsSync(dir)) {
  const meta = await npmMetadata(config.pkg);
  const files = await packageFiles(
    meta,
    version,
    (name) => /\.(d\.ts|mjs|js|cjs|json|css|scss|md)$/.test(name) && !/^external\//.test(name)
  );
  const staging = `${dir}.partial-${process.pid}-${Date.now()}`;
  try {
    writeFiles(staging, files);
    renameSync(staging, dir);
  } catch (error) {
    rmSync(staging, { recursive: true, force: true });
    // Another run finished the same version first.
    if (!existsSync(dir)) fail(`could not unpack ${version}: ${error.message}`);
  }
}
printJson({ package: config.pkg, version, dir });
