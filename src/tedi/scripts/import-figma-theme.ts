/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();
program
  .name('import-figma-theme')
  .description('Import base variables (primitives) — semantic vars are aliases only')
  .requiredOption('--theme <name>', 'Theme name for output folder/class (e.g. rit, muis, tedi)')
  .requiredOption('--file-key <key>', 'Figma file key')
  .requiredOption('--token <token>', 'Figma personal access token')
  .option('--output-dir <dir>', 'Output directory', 'src/variables')
  .option('--verbose', 'Show detailed logging', false)
  .version('1.0.0')
  .allowExcessArguments(false);

program.parse(process.argv);

const opts = program.opts();

const THEME_INPUT = opts.theme.trim().toLowerCase();
const FIGMA_FILE_KEY = opts.fileKey;
const FIGMA_VARIABLE_TOKEN = opts.token;
const OUTPUT_DIR = path.resolve(process.cwd(), opts.outputDir);

const BASE_COLLECTIONS = new Set(['Bitweb', 'Bitweb base colors', 'Bitweb dimensions']);

const THEME_FOLDER = THEME_INPUT.replace(/\s+/g, '-');
const THEME_SUFFIX = THEME_INPUT.replace(/\s+/g, '-');

function kebab(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function pxToRem(value: number, base = 16): string {
  const rem = value / base;
  return rem === Math.floor(rem) ? `${rem}rem` : `${rem.toFixed(4).replace(/\.?0+$/, '')}rem`;
}

function getUnit(collectionName: string): 'px' | 'rem' | null {
  const l = collectionName.toLowerCase();
  if (l.includes('dimension') || l.includes('container')) return 'px';
  if (l.includes('font')) return 'rem';
  return null;
}

function shouldConvertBaseToRem(varName: string): boolean {
  const lower = varName.toLowerCase();
  if (lower.includes('weight')) return false;
  if (lower.includes('opacity')) return false;
  if (lower.includes('z-index')) return false;
  if (lower.includes('flex')) return false;
  if (lower.includes('line-height')) return true;

  return (
    lower.includes('space') ||
    lower.includes('spacing') ||
    lower.includes('radius') ||
    lower.includes('border') ||
    lower.includes('size') ||
    lower.includes('gap') ||
    lower.includes('dimension') ||
    lower.includes('height') ||
    lower.includes('width')
  );
}

function resolveValue(
  raw: any,
  aliasMap: Record<string, string>,
  unit: 'px' | 'rem' | null,
  varName = '',
  varId?: string
): string | null {
  if (!raw) return null;

  if (raw.type === 'VARIABLE_ALIAS') {
    if (raw.id === varId) {
      return null;
    }

    const target = aliasMap[raw.id];
    return target ? `var(${target})` : null;
  }

  if ('r' in raw) {
    const v = raw.value ?? raw;
    const { r, g, b, a = 1 } = v;
    const [rr, gg, bb] = [r, g, b].map((c: number) => Math.round(c * 255));
    return a === 1 ? `rgb(${rr}, ${gg}, ${bb})` : `rgba(${rr}, ${gg}, ${bb}, ${a})`;
  }

  const value = raw.value ?? raw;

  // NUMBER
  if (typeof value === 'number') {
    const lowerName = varName.toLowerCase();

    if (lowerName.includes('weight')) return value.toString();
    if (shouldConvertBaseToRem(varName)) return pxToRem(value);

    if (unit === 'px' || lowerName.includes('radius') || lowerName.includes('border')) {
      return `${Math.round(value * 100) / 100}px`;
    }

    if (unit === 'rem') return pxToRem(value);

    return value.toString();
  }

  return String(value);
}

async function fetchFigmaVariables() {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': FIGMA_VARIABLE_TOKEN } });
  if (!res.ok) throw new Error(`Figma API error ${res.status} – ${res.statusText}`);
  return await res.json();
}

function collectionToType(name: string): string {
  const lower = name.toLowerCase();

  if (lower.includes('color')) return 'colors';
  if (lower.includes('dimension')) return 'dimensions';
  if (lower.includes('spacing')) return 'spacing';
  if (lower.includes('typography') || lower.includes('font')) return 'typography';

  return kebab(name.replace(/^bitweb/i, '').trim()) || 'core';
}

interface FigmaCollection {
  name: string;
  modes: { modeId: string; name: string }[];
  variableIds: string[];
  defaultModeId?: string;
}

async function run() {
  console.log(`→ Importing base primitives for theme folder: ${THEME_FOLDER}`);
  console.log(`→ Output: ${OUTPUT_DIR}/themes/${THEME_FOLDER}`);
  console.log('');

  const data = await fetchFigmaVariables();
  const variables = data.meta.variables as Record<string, any>;
  const collections = data.meta.variableCollections as Record<string, FigmaCollection>;

  const aliasMap: Record<string, string> = {};
  for (const id in variables) {
    aliasMap[id] = `--${kebab(variables[id].name)}`;
  }

  let filesWritten = 0;

  for (const coll of Object.values(collections)) {
    if (!BASE_COLLECTIONS.has(coll.name.trim())) continue;

    const unit = getUnit(coll.name);
    const modeId = coll.defaultModeId ?? coll.modes[0]?.modeId;

    if (!modeId) {
      console.warn(`No default mode for base collection: ${coll.name}`);
      continue;
    }

    console.log(`  Processing base collection "${coll.name}" (mode ID: ${modeId})`);

    const lines: string[] = [];

    for (const varId of coll.variableIds) {
      const v = variables[varId];
      if (!v) continue;

      let raw = v.valuesByMode?.[modeId];

      if (raw === undefined && coll.defaultModeId && coll.defaultModeId !== modeId) {
        raw = v.valuesByMode?.[coll.defaultModeId];
      }

      if (raw === undefined) {
        continue;
      }

      const resolved = resolveValue(raw, aliasMap, unit, v.name, varId);
      if (!resolved) continue;

      lines.push(`  ${aliasMap[varId]}: ${resolved};`);
    }

    if (lines.length === 0) {
      console.log('    → No values found in this base collection');
      continue;
    }

    lines.sort((a, b) => a.trim().split(':')[0].localeCompare(b.trim().split(':')[0]));

    const type = collectionToType(coll.name);
    const fileName = `_base-${type}__${THEME_SUFFIX}.scss`;
    const dir = path.join(OUTPUT_DIR, 'themes', THEME_FOLDER);

    const css = `:root, .tedi-theme--${THEME_SUFFIX} {\n${lines.join('\n')}\n}\n`;

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, fileName), css);

    console.log(`  → Wrote ${lines.length} base variables to ${fileName}`);
    filesWritten++;
  }

  console.log('');
  if (filesWritten > 0) {
    console.log(
      `✓ Successfully wrote base primitives for "${THEME_INPUT}" (${filesWritten} file${filesWritten === 1 ? '' : 's'})`
    );
    console.log(`  Location: ${path.join(OUTPUT_DIR, 'themes', THEME_FOLDER)}`);
    console.log('  Semantic variables should be pure aliases — no need to export them.');
  } else {
    console.warn('No base variables were written. Check:');
    console.warn('  • Collection names match ("Bitweb base colors", "Bitweb dimensions")');
    console.warn('  • Base collections have values in their default mode');
  }
}

run().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
