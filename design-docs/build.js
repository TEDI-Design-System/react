import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';
import { parseBarrel, extractStatus, mergeManifest } from './manifest.js';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const coreTokens = resolve(repoRoot, 'node_modules/@tedi-design-system/core/tokens.json');

// Tokens are core's data, generated there from Figma and published with the
// stylesheet they describe — this repo only reads them. Two tiers, `base` and
// `semantic`, exactly as Figma models them: never re-derive tiers from name
// prefixes, that invents distinctions the design system does not make.
export function readCoreTokens() {
  if (!existsSync(coreTokens)) {
    throw new Error(
      'Missing node_modules/@tedi-design-system/core/tokens.json.\n' +
        'Design tokens now come straight from core (generated from Figma by its ' +
        'variable-exporter). Upgrade @tedi-design-system/core to a version that ships ' +
        'tokens.json, then re-run `npm run design:build`.'
    );
  }
  return JSON.parse(readFileSync(coreTokens, 'utf8'));
}

// The table is a deliberately curated subset of the semantic tier: the role
// tokens an application author writes in their own CSS. The rest of the semantic
// tier is component-scoped (`button-*`, `card-*`, …) and is consumed by the
// components themselves, so listing it here would bury the useful rows.
const ROLE_PREFIXES = ['general-', 'form-'];

const manifestPath = resolve(repoRoot, 'component.manifest.json');

export function generateManifest() {
  const barrelSrc = readFileSync(resolve(repoRoot, 'src/tedi/index.ts'), 'utf8');
  const fresh = parseBarrel(barrelSrc).map((row) => {
    const dir = resolve(repoRoot, row.sourcePath, '..');
    const base = basename(row.sourcePath);
    const storyFile = resolve(dir, `${base}.stories.tsx`);
    const status = existsSync(storyFile) ? extractStatus(readFileSync(storyFile, 'utf8')) : [];
    return { ...row, status };
  });
  const existing = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')).components ?? [] : [];
  return { import: '@tedi-design-system/react/tedi', components: mergeManifest(existing, fresh) };
}

const designMdPath = resolve(repoRoot, 'DESIGN.md');

export function renderTokenTable(tokens) {
  const semantic = tokens.themes?.default?.semantic ?? {};
  const rows = Object.entries(semantic)
    .filter(([name]) => ROLE_PREFIXES.some((prefix) => name.startsWith(prefix)))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, token]) => `| \`${name}\` | \`${token.resolved}\` |`)
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
  const manifest = generateManifest();
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`component.manifest.json written (${manifest.components.length} components)`);

  const tokens = readCoreTokens();
  const table = renderTokenTable(tokens);
  const rowCount = table.split('\n').length - 2;
  const semanticCount = Object.keys(tokens.themes?.default?.semantic ?? {}).length;

  if (existsSync(designMdPath)) {
    const md = readFileSync(designMdPath, 'utf8');
    writeFileSync(designMdPath, injectTokenTable(md, table), 'utf8');
    console.log(`DESIGN.md token table injected (${rowCount} role tokens of ${semanticCount} semantic)`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
