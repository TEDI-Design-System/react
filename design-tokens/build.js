import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { buildTokens } from './lib/css-tokens.js';
import { parseBarrel, extractStatus, mergeManifest } from './lib/manifest.js';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const corePkg = resolve(repoRoot, 'node_modules/@tedi-design-system/core/package.json');
const coreCss = resolve(repoRoot, 'node_modules/@tedi-design-system/core/index.css');

export function generateTokens() {
  const version = JSON.parse(readFileSync(corePkg, 'utf8')).version;
  const css = readFileSync(coreCss, 'utf8');
  return buildTokens(css, { version });
}

const manifestPath = resolve(here, 'component.manifest.json');

export function generateManifest() {
  const barrelSrc = readFileSync(resolve(repoRoot, 'src/tedi/index.ts'), 'utf8');
  const fresh = parseBarrel(barrelSrc).map((row) => {
    const dir = resolve(repoRoot, row.sourcePath, '..');
    const base = basename(row.sourcePath);
    const storyFile = resolve(dir, `${base}.stories.tsx`);
    const status = existsSync(storyFile) ? extractStatus(readFileSync(storyFile, 'utf8')) : [];
    return { ...row, status };
  });
  const existing = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8')).components ?? []
    : [];
  return { import: '@tedi-design-system/react/tedi', components: mergeManifest(existing, fresh) };
}

const designMdPath = resolve(repoRoot, 'DESIGN.md');

export function renderTokenTable(tokens) {
  const rows = Object.entries(tokens.themes.default.semantic)
    .map(([name, t]) => `| \`${name}\` | \`${t.resolved}\` |`)
    .join('\n');
  return `| Semantic token | Default value |\n| --- | --- |\n${rows}`;
}

export function injectTokenTable(md, table) {
  return md.replace(
    /<!-- tokens:start -->[\s\S]*?<!-- tokens:end -->/,
    `<!-- tokens:start -->\n${table}\n<!-- tokens:end -->`
  );
}

function main() {
  const tokens = generateTokens();
  writeFileSync(
    resolve(here, 'tokens.json'),
    JSON.stringify(tokens, null, 2) + '\n',
    'utf8'
  );
  const counts = Object.fromEntries(
    Object.entries(tokens.themes.default).map(([tier, o]) => [tier, Object.keys(o).length])
  );
  console.log(`tokens.json written (core ${tokens.version})`, counts);

  const manifest = generateManifest();
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`component.manifest.json written (${manifest.components.length} components)`);

  if (existsSync(designMdPath)) {
    const md = readFileSync(designMdPath, 'utf8');
    writeFileSync(designMdPath, injectTokenTable(md, renderTokenTable(tokens)), 'utf8');
    console.log('DESIGN.md token table injected');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
