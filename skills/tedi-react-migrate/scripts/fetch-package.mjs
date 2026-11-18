#!/usr/bin/env node
// Unpack a published library version (text files only) so it can be read before installing:
// type declarations, bundles with the translations/labels, styles.
// Usage: node fetch-package.mjs --version <version> [--project <dir>]
// Writes .tedi-migrate/cache/packages/<library>@<version>/ and prints the path.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import config from './config.mjs';
import { parseArgs, fail, npmMetadata, packageFiles, writeFiles, ensureWorkDir, printJson } from './lib.mjs';

const args = parseArgs();
const version = args.version;
if (!version) fail('--version is required');
const project = args.project ?? process.cwd();

const dir = join(ensureWorkDir(project), 'cache', 'packages', `${config.library}@${version}`);
if (!existsSync(dir)) {
  const meta = await npmMetadata(config.pkg);
  const files = await packageFiles(
    meta,
    version,
    (name) => /\.(d\.ts|mjs|js|cjs|json|css|scss|md)$/.test(name) && !/^external\//.test(name)
  );
  writeFiles(dir, files);
}
printJson({ package: config.pkg, version, dir });
