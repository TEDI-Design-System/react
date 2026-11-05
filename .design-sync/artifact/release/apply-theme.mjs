#!/usr/bin/env node
// Applies a theme exported by the TEDI Variables Exporter Figma plugin to this repository's
// `project/` files, in place, so the published design system renders with the theme:
//
//   node apply-theme.mjs <export folder> [--strict]
//
// The export is the plugin's unzipped ZIP: `_*.css` files whose rules are scoped to
// `.tedi-theme--<theme>` (light) and `.tedi-theme--<theme>-dark`, some inside `@media`.
//
// - `project/tokens.css` gets every declaration appended, with the theme selectors rewritten
//   so the theme is always on (light) and follows the page's dark mode. The selectors are
//   more specific than the defaults in `components/bundle.css`, as the theme file comes after
//   TEDI's CSS in an app.
// - `project/tokens.json` gets the new values of the colour tokens it lists, so the page's
//   token views show the theme, and `meta.theme` records which export was applied.
// - `project/README.md` gets a note after its first paragraph.
//
// It changes files in place: restore them with `git checkout -- project` after publishing.
// Names TEDI doesn't define and references to nothing are reported; `--strict` makes them
// errors.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const dir = args.find((a) => !a.startsWith('--'));
if (!dir) fail('usage: node apply-theme.mjs <export folder> [--strict]');

const REPO = path.dirname(fileURLToPath(import.meta.url));
const P = path.join(REPO, 'project');
const tokensPath = path.join(P, 'tokens.json');
const cssPath = path.join(P, 'tokens.css');
const readmePath = path.join(P, 'README.md');

function fail(message) {
  console.error(message);
  process.exit(1);
}

// --- read the export ----------------------------------------------------------------------

const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith('_') && f.endsWith('.css'))
  .sort();
if (!files.length) fail(`${dir}: no _*.css files; pass the folder the plugin's ZIP was unzipped into`);

// Declarations as { media, scheme, name, value }, in file order (later wins, as in a browser).
const decls = [];
const themes = new Set();
const hash = crypto.createHash('sha256');
for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8');
  hash.update(file).update('\0').update(text).update('\0');
  parse(text.replace(/\/\*[\s\S]*?\*\//g, ''), file);
}

function parse(text, file) {
  const stack = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') {
      stack.push(text.slice(start, i).trim());
      start = i + 1;
    } else if (ch === '}' || ch === ';') {
      const body = text.slice(start, i).trim();
      start = i + 1;
      if (body) declaration(body, stack, file);
      if (ch === '}') stack.pop();
    }
  }
  if (stack.length) fail(`${file}: unbalanced braces`);
}

function declaration(body, stack, file) {
  const m = body.match(/^--([\w-]+)\s*:\s*([\s\S]+)$/);
  if (!m) fail(`${file}: unexpected "${body.slice(0, 60)}"`);
  // `.tedi-theme--<theme>`, `.tedi-theme--<theme>-dark`, or both (scheme-independent tokens).
  const selector = stack.at(-1) ?? '';
  const classes = selector.split(',').map((s) => s.trim().match(/^\.tedi-theme--([\w-]+)$/)?.[1]);
  if (!classes.length || classes.some((c) => !c)) fail(`${file}: unexpected selector "${selector}"`);
  const media = stack.slice(0, -1).map((s) => s.replace(/^@media\s*/, ''));
  if (stack.slice(0, -1).some((s) => !s.startsWith('@media'))) fail(`${file}: unexpected nesting "${stack}"`);
  for (const c of classes) themes.add(c.endsWith('-dark') ? c.slice(0, -5) : c);
  // Light rules are always on and dark ones override them, so a rule naming both is a light one.
  const dark = classes.every((c) => c.endsWith('-dark'));
  decls.push({ media: media.join(' and '), scheme: dark ? 'dark' : 'default', name: m[1], value: m[2].trim() });
}

if (themes.size !== 1) fail(`expected one theme, found: ${[...themes].join(', ')}`);
const theme = [...themes][0];
const sha = hash.digest('hex').slice(0, 12);

// --- check the repository is untouched ------------------------------------------------------

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
if (tokens.meta?.theme)
  fail(`project/ already carries the "${tokens.meta.theme.name}" theme; restore it first: git checkout -- project`);

// --- report what doesn't fit --------------------------------------------------------------

// Names TEDI defines: tokens.json plus every custom property bundle.css declares.
const bundle = fs.readFileSync(path.join(P, 'components', 'bundle.css'), 'utf8');
const tedi = new Set(bundle.match(/--[\w-]+(?=\s*:)/g).map((n) => n.slice(2)));
const colorTokens = new Map(tokens.color.tokens.map((t) => [t.name, t]));
for (const fam of Object.values(tokens)) for (const t of fam?.tokens ?? []) tedi.add(t.name);

const exported = new Set(decls.map((d) => d.name));
const unknown = [...exported].filter((n) => !tedi.has(n)).sort();
const refs = new Set(decls.flatMap((d) => [...d.value.matchAll(/var\(--([\w-]+)/g)].map((m) => m[1])));
const dangling = [...refs].filter((n) => !tedi.has(n) && !exported.has(n)).sort();

// --- tokens.css: the export, always on --------------------------------------------------------

// :root:root beats bundle.css's `.tedi-theme--default,:root` and `.tedi-theme--dark,[data-theme="dark"]`.
const SELECTOR = {
  default: ':root:root',
  dark: ':root:root[data-theme="dark"], :root:root.tedi-theme--dark',
};
const groups = new Map();
for (const d of decls) {
  const key = `${d.media}\0${d.scheme}`;
  if (!groups.has(key)) groups.set(key, new Map());
  groups.get(key).set(d.name, d.value);
}
// Unconditional rules first, then each media query; light before dark within each.
const order = [...groups.keys()].sort((a, b) => {
  const [ma, sa] = a.split('\0');
  const [mb, sb] = b.split('\0');
  return (ma !== '') - (mb !== '') || ma.localeCompare(mb) || (sa === 'dark') - (sb === 'dark');
});
let css = `\n/* Theme "${theme}": the TEDI Variables Exporter's export (sha256 ${sha}), applied by apply-theme.mjs */\n`;
for (const key of order) {
  const [media, scheme] = key.split('\0');
  const lines = [...groups.get(key)].map(([n, v]) => `--${n}: ${v};`);
  const indent = media ? '    ' : '  ';
  const rule = `${SELECTOR[scheme]} {\n${lines.map((l) => indent + l).join('\n')}\n${media ? '  ' : ''}}`;
  css += media ? `@media ${media} {\n  ${rule}\n}\n` : `${rule}\n`;
}

// --- tokens.json: colour values the page shows ------------------------------------------------

// The export's values per scheme, unconditional rules only (tokens.json has no breakpoints).
const values = { default: new Map(), dark: new Map() };
for (const d of decls) if (!d.media) values[d.scheme].set(d.name, d.value);

// A value tokens.json accepts: an alias of a colour token it lists, or a literal colour.
// Other references are followed through the export (dark falls back to light, as in an app
// where only the theme's light rule declares the name).
function tokenValue(value, scheme, depth = 0) {
  const ref = value.match(/^var\(--([\w-]+)\)$/);
  if (!ref) return /^(#|rgba?\(|hsla?\()/.test(value) ? value : null;
  if (colorTokens.has(ref[1])) return `{${ref[1]}}`;
  const next = values[scheme].get(ref[1]) ?? values.default.get(ref[1]);
  return next && depth < 10 ? tokenValue(next, scheme, depth + 1) : null;
}

let changed = 0;
const unconverted = [];
for (const [name, token] of colorTokens) {
  const set = {};
  for (const scheme of ['default', 'dark']) {
    const raw = values[scheme].get(name);
    if (raw === undefined) continue;
    const v = tokenValue(raw, scheme);
    if (v) set[scheme] = v;
    else unconverted.push(`${name} (${scheme}): ${raw}`);
  }
  if (!Object.keys(set).length) continue;
  const before = typeof token.value === 'string' ? { default: token.value } : { ...token.value };
  const after = { ...before, ...set };
  if (after.dark === undefined) after.dark = before.default;
  token.value = after;
  changed++;
}
tokens.meta = { ...tokens.meta, theme: { name: theme, source: 'TEDI Variables Exporter (Figma)', sha256: sha, files } };

// --- contrast: text on the primary surface, in both schemes -----------------------------------

function resolve(name, scheme, depth = 0) {
  const raw =
    values[scheme].get(name) ??
    values.default.get(name) ??
    (() => {
      const t = colorTokens.get(name);
      if (!t) return null;
      return typeof t.value === 'string' ? t.value : t.value[scheme] ?? t.value.default;
    })();
  if (!raw || depth > 10) return null;
  const ref = raw.match(/^var\(--([\w-]+)\)$/) ?? raw.match(/^\{([\w.-]+)\}$/);
  return ref ? resolve(ref[1], scheme, depth + 1) : raw;
}
function rgb(value) {
  if (!value) return null;
  let m = value.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    const h = m[1].length <= 4 ? [...m[1]].map((c) => c + c).join('') : m[1];
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  m = value.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  return m ? m.slice(1, 4).map(Number) : null;
}
function luminance([r, g, b]) {
  const c = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
}
const lowContrast = [];
for (const scheme of ['default', 'dark']) {
  const bg = rgb(resolve('general-surface-primary', scheme));
  if (!bg) continue;
  for (const text of ['general-text-primary', 'general-text-secondary', 'general-text-brand', 'general-text-danger']) {
    if (!exported.has(text) && !exported.has('general-surface-primary')) continue;
    const fg = rgb(resolve(text, scheme));
    if (!fg) continue;
    const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
    const ratio = (a + 0.05) / (b + 0.05);
    if (ratio < 4.5) lowContrast.push(`${text} on general-surface-primary (${scheme}): ${ratio.toFixed(2)}:1`);
  }
}

// --- write -----------------------------------------------------------------------------

fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2) + '\n');
fs.appendFileSync(cssPath, css);
const readme = fs.readFileSync(readmePath, 'utf8');
const cut = readme.indexOf('\n\n');
const note =
  `\n\n**Theme: \`${theme}\`.** This system carries an organisation theme exported from Figma: its ` +
  `colours, dimensions and type replace TEDI's defaults in \`tokens.css\`, so previews and designs ` +
  `render with it whatever \`theme\` you pass. In code for an app it is ` +
  `\`<ThemeProvider theme="${theme}">\` (\`"${theme}-dark"\` for dark) with the theme's CSS loaded ` +
  `after TEDI's: where this README says \`theme\` is \`"default"\` or \`"dark"\`, use those instead. ` +
  `Prop names and components are unchanged.`;
fs.writeFileSync(readmePath, readme.slice(0, cut) + note + readme.slice(cut));

console.log(`theme "${theme}" (sha256 ${sha}) from ${files.length} files: ${decls.length} declarations`);
console.log(`tokens.json: ${changed} of ${colorTokens.size} colour tokens updated`);
const report = (title, list) => list.length && console.log(`${title} (${list.length}):\n  ${list.join('\n  ')}`);
report('not TEDI names (applied, but nothing in TEDI reads them unless the export does)', unknown);
report('references to names neither TEDI nor the export defines (render as nothing)', dangling);
report('colour values tokens.json cannot show (the CSS still applies them)', unconverted);
report('text contrast below 4.5:1', lowContrast);
if (strict && (unknown.length || dangling.length)) process.exit(1);
