#!/usr/bin/env node
// Builds every file of the TEDI Design System artifact from this repo: the browser bundle
// and stylesheet from dist/, tokens.json refreshed against the build, per-component types
// and docs, and a live preview per component compiled from its stories. Writes the files
// under <out>/project/ at their artifact paths plus <out>/publish-plan.json, the batches
// for the Artifact tool's `files` (root = <out>). See .design-sync/NOTES.md for the run.
//
//   node .design-sync/artifact/build.mjs --out <dir> --tokens <tokens.json> [--seed] [--with-binaries] [--release]
//
// --tokens:  the artifact's current project/tokens.json (defaults to seed/tokens.json).
// --seed:    first publish into an empty system: adds the cover, preview-theme.js, the
//            React library and the fonts to the plan, and writes the index to publish last.
// --release: the TEDI-Design-System/claude-design-system tree: everything --seed writes,
//            plus release.json and the README / AGENTS.md (from release/) that tell people
//            and Claude how to publish it; no build-only reports.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

import { refreshTokens, tokenNames, tokensCss } from './tokens.mjs';
import { createTypeReader, typesEntry } from './types.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const SEED_DIR = path.join(HERE, 'seed');
const NAMESPACE = 'Tedi';
const MAX_FILES = 250;
const MAX_BYTES = 14 * 1024 * 1024;
const PACKAGE_URL = 'https://www.npmjs.com/package/@tedi-design-system/react';
const SOURCE_URL = 'https://github.com/TEDI-Design-System/react';
const STORYBOOK_URL = 'https://storybook.tedi.ee/react/rc';
const FIGMA_URL = 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/';

const { values: opts } = parseArgs({
  options: {
    out: { type: 'string' },
    tokens: { type: 'string', default: path.join(SEED_DIR, 'tokens.json') },
    seed: { type: 'boolean', default: false },
    'with-binaries': { type: 'boolean', default: false },
    release: { type: 'boolean', default: false },
  },
});
if (!opts.out) throw new Error('--out <dir> is required');
if (opts.release) opts.seed = true;
const OUT = path.resolve(opts.out);
const P = path.join(OUT, 'project');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, '.design-sync/config.json'), 'utf8'));
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

function write(file, data) {
  const target = path.join(P, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data);
}

// The bundle is inlined into pages by consumers, so it must not end a <script> early.
function scriptSafe(code, file) {
  const safe = code.replaceAll('</script', '<\\/script').replaceAll('<!--', '\\x3C!--');
  if (safe !== code) console.warn(`  ${file}: escaped </script or <!-- literals`);
  return safe;
}

function libraryVersion() {
  const heading = /^#+ \[?(\d+\.\d+\.\d+[^\]\s]*)/m.exec(fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8'));
  return heading ? heading[1] : '0.0.0';
}

// --- components -------------------------------------------------------------------------

function barrelExports() {
  const code = fs.readFileSync(path.join(ROOT, 'dist/tedi.es.js'), 'utf8');
  const list = /export\s*\{([^}]*)\};?\s*$/.exec(code);
  return new Set(
    list[1]
      .split(',')
      .map((s) =>
        s
          .trim()
          .split(/\s+as\s+/)
          .pop()
      )
      .filter(Boolean)
  );
}

function discoverComponents(exported) {
  const byName = new Map();
  for (const file of fs.globSync('src/tedi/**/*.stories.tsx', { cwd: ROOT }).sort()) {
    const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const title = /title:\s*['"]([^'"]+)['"]/.exec(source)?.[1];
    if (!title) continue;
    const segments = title.split('/');
    const name = segments.at(-1).replace(/\s+/g, '');
    if (!exported.has(name) || cfg.titleMap?.[name] === null || byName.has(name)) continue;
    const override = cfg.overrides?.[name] ?? {};
    const skip = new Set(override.skip ?? []);
    const stories = [...source.matchAll(/^export const (\w+)\b/gm)]
      .map((m) => m[1])
      .filter((key) => !skip.has(storyId(title, key)) && !skip.has(key));
    byName.set(name, {
      name,
      title,
      group: segments.at(-2).replace(/\s+/g, '').toLowerCase(),
      stories,
      storiesFile: file,
      source,
      cardMode: override.cardMode ?? 'grid',
      primaryStory: override.primaryStory ?? '',
      viewport: override.viewport,
    });
  }
  return [...byName.values()];
}

// Storybook's id for a story: kebab-cased title, `--`, kebab-cased export name.
function storyId(title, exportName) {
  const kebab = (s) =>
    s
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[^A-Za-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  return `${kebab(title)}--${kebab(exportName)}`;
}

// --- bundle ------------------------------------------------------------------------------

const REACT_GLOBALS = {
  react: 'module.exports = window.React;',
  'react-dom': 'module.exports = window.ReactDOM;',
  'react-dom/client': 'module.exports = window.ReactDOM;',
  // The page's React is a UMD build with no jsx runtime; createElement takes the same props.
  'react/jsx-runtime':
    'var R = window.React; function jsx(type, props, key) { return R.createElement(type, key === undefined ? props : Object.assign({}, props, { key: key })); }' +
    'module.exports = { jsx: jsx, jsxs: jsx, jsxDEV: jsx, Fragment: R.Fragment };',
};
REACT_GLOBALS['react/jsx-dev-runtime'] = REACT_GLOBALS['react/jsx-runtime'];

const reactGlobalsPlugin = {
  name: 'react-globals',
  setup(build) {
    build.onResolve({ filter: /^react(-dom)?(\/(client|jsx-runtime|jsx-dev-runtime))?$/ }, (args) => ({
      path: args.path,
      namespace: 'react-global',
    }));
    build.onLoad({ filter: /.*/, namespace: 'react-global' }, (args) => ({
      contents: REACT_GLOBALS[args.path],
      loader: 'js',
    }));
  },
};

const DEFINE = {
  'process.env.NODE_ENV': '"production"',
  'process.env': '{}',
  'import.meta.env': '{}',
};

async function buildBundle(components) {
  const result = await esbuild.build({
    entryPoints: [path.join(ROOT, 'dist/tedi.es.js')],
    bundle: true,
    format: 'iife',
    globalName: NAMESPACE,
    minify: true,
    write: false,
    define: DEFINE,
    loader: { '.css': 'empty' },
    plugins: [reactGlobalsPlugin],
    logLevel: 'warning',
    // dist marks itself side-effect free; its bare imports of vendored helpers are dropped on purpose.
    logOverride: { 'ignored-bare-import': 'silent' },
  });
  const header = { format: 4, namespace: NAMESPACE, components: components.map((c) => ({ name: c.name })) };
  const code = `/* @ds-bundle: ${JSON.stringify(header)} */\n${scriptSafe(result.outputFiles[0].text, 'bundle.js')}`;
  write('components/bundle.js', code);
  return code;
}

// Sub-components hang off the component (`Accordion.Item`): read them from the real bundle.
function compoundsOf(bundleCode, components) {
  const require = createRequire(path.join(ROOT, 'package.json'));
  const window = { React: require('react'), ReactDOM: require('react-dom') };
  const context = vm.createContext({ window, console, setTimeout, clearTimeout, navigator: {} });
  try {
    vm.runInContext(`${bundleCode}\nwindow.${NAMESPACE} = ${NAMESPACE};`, context);
  } catch (error) {
    console.warn(`  compounds: bundle did not evaluate outside a browser (${error.message}); none listed`);
    return new Map();
  }
  const ns = window[NAMESPACE];
  return new Map(
    components.map((c) => {
      const value = ns[c.name];
      const parts =
        value && (typeof value === 'object' || typeof value === 'function')
          ? Object.keys(value).filter((k) => /^[A-Z]/.test(k) && value[k] && typeof value[k] !== 'string')
          : [];
      return [c.name, parts];
    })
  );
}

async function buildReactLibrary() {
  const result = await esbuild.build({
    stdin: {
      contents:
        "window.React = require('react');" +
        "window.ReactDOM = Object.assign({}, require('react-dom'), require('react-dom/client'));",
      resolveDir: ROOT,
    },
    bundle: true,
    format: 'iife',
    minify: true,
    write: false,
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning',
  });
  write('components/lib/react.js', scriptSafe(result.outputFiles[0].text, 'react.js'));
  write('components/lib/react-dom.js', '/* merged into react.js */\n');
}

// --- styles, fonts, tokens -----------------------------------------------------------------

function buildStyles(tokens) {
  const fontsDir = path.join(ROOT, 'dist/fonts');
  const fonts = new Set(fs.readdirSync(fontsDir));
  // Font files and their licence travel; a .md would become a brand-book section on the page.
  for (const f of fonts) if (!f.endsWith('.md')) fs.cpSync(path.join(fontsDir, f), path.join(P, 'fonts', f));

  const owned = tokenNames(tokens);
  let css = fs.readFileSync(path.join(ROOT, 'dist/index.css'), 'utf8');
  // tokens.css (compiled from tokens.json) is the one source for the tokens it declares.
  css = css.replace(/(:root|:host|\.tedi-theme--dark)\{([^{}]*)\}/g, (_, selector, body) => {
    const keep = body.split(';').filter((d) => d.trim() && !owned.has(d.split(':')[0].trim().replace(/^--/, '')));
    return `${selector}{${keep.join(';')}}`;
  });
  css = css.replaceAll('.tedi-theme--dark{', '.tedi-theme--dark,[data-theme="dark"]{');
  // Fonts sit beside components/, and @font-face for files the package doesn't ship is dead.
  css = css.replace(/@font-face\{[^}]*\}/g, (face) => {
    const file = /url\(["']?\.?\/?fonts\/([^"')]+)["']?\)/.exec(face)?.[1];
    return file && !fonts.has(file) ? '' : face.replace(/url\((["']?)\.?\/?fonts\//g, 'url($1../fonts/');
  });
  if (/<\/style/i.test(css)) throw new Error('bundle.css contains </style');
  write('components/bundle.css', css);
}

// Timestamps come from the source commit, not the clock: one commit builds byte-identical files.
function source() {
  const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
  const branch = process.env.DESIGN_SYNC_BRANCH ?? git('rev-parse', '--abbrev-ref', 'HEAD');
  const date = new Date(git('log', '-1', '--format=%cI')).toISOString().replace(/\.\d+Z$/, 'Z');
  return { commit: git('rev-parse', 'HEAD'), ref: `${branch}@${git('rev-parse', '--short', 'HEAD')}`, date };
}

function buildTokens(css, version) {
  const current = JSON.parse(fs.readFileSync(opts.tokens, 'utf8'));
  const { tokens, report } = refreshTokens(current, css);
  // Provenance the page shows and a re-sync reports (the type's from-code.md, step 8).
  tokens.meta = {
    source: 'github',
    repo: 'TEDI-Design-System/react',
    ref: source().ref,
    package: '.',
    version,
    synced: source().date.slice(0, 10),
  };
  write('tokens.json', JSON.stringify(tokens, null, 2) + '\n');
  write('tokens.css', tokensCss(tokens));
  return { tokens, report };
}

// --- previews ------------------------------------------------------------------------------

// What a story-imported module exports, read from its declaration file in dist.
function declaredValueExports(dtsFile, seen = new Set()) {
  if (seen.has(dtsFile) || !fs.existsSync(dtsFile)) return null;
  seen.add(dtsFile);
  const text = fs.readFileSync(dtsFile, 'utf8');
  const values = new Set();
  const types = new Set(
    [...text.matchAll(/^(?:export\s+)?(?:declare\s+)?(?:interface|type)\s+(\w+)/gm)].map((m) => m[1])
  );
  for (const m of text.matchAll(/^export\s+declare\s+(?:const|let|var|function|class|enum|abstract class)\s+(\w+)/gm))
    values.add(m[1]);
  if (/^export\s+default\b/m.test(text)) values.add('default');
  for (const m of text.matchAll(/^export\s+(type\s+)?\{([^}]*)\}(?:\s+from\s+['"]([^'"]+)['"])?/gm)) {
    if (m[1]) continue;
    for (const spec of m[2].split(',')) {
      const [local, exportedAs] = spec
        .trim()
        .replace(/^type\s+/, '\0')
        .split(/\s+as\s+/);
      if (!local || local.startsWith('\0')) continue;
      if (!m[3] && types.has(local)) continue;
      values.add(exportedAs ?? local);
    }
  }
  for (const m of text.matchAll(/^export\s+\*\s+from\s+['"]([^'"]+)['"]/gm)) {
    const target = path.resolve(path.dirname(dtsFile), m[1]);
    const nested = declaredValueExports(
      fs.existsSync(`${target}.d.ts`) ? `${target}.d.ts` : path.join(target, 'index.d.ts'),
      seen
    );
    if (nested === null) return null;
    for (const v of nested) values.add(v);
  }
  return values;
}

// Story imports of the library's own modules resolve to the shipped bundle (window.Tedi),
// so previews render the real components and share their React contexts. Fixtures and
// helpers that the bundle doesn't export are compiled from source.
function shimTarget(file, exported) {
  const relative = path.relative(path.join(ROOT, 'src'), file);
  if (relative.startsWith('..') || /\.stor(y|ies)\.[jt]sx?$/.test(file)) return null;
  const values = declaredValueExports(path.join(ROOT, 'dist/src', relative.replace(/\.[jt]sx?$/, '.d.ts')));
  if (values === null) return null;
  // A default export is the component the file is named after: textfield.tsx -> TextField.
  const base = path.basename(file).replace(/\.[jt]sx?$/, '');
  const stem = (base === 'index' ? path.basename(path.dirname(file)) : base).replace(/[-_.]/g, '').toLowerCase();
  const defaultName = [...exported].find((name) => name.toLowerCase() === stem) ?? null;
  for (const v of values) if (!(v === 'default' ? defaultName : exported.has(v))) return null;
  return defaultName ?? path.basename(file);
}

const PREVIEW_API_STUB = `
var R = function () { return window.React; };
var noop = function () {};
var channel = { on: noop, off: noop, once: noop, emit: noop, removeListener: noop };
module.exports = {
  addons: { register: noop, add: noop, getChannel: function () { return channel; }, setConfig: noop, getConfig: function () { return {}; } },
  useGlobals: function () { var s = R().useState(GLOBAL_DEFAULTS); return [s[0], function (n) { s[1](Object.assign({}, s[0], n)); }]; },
  useArgs: function () { return [{}, noop, noop]; },
  useParameter: noop,
  useChannel: function () { return noop; },
  useState: function () { return R().useState.apply(null, arguments); },
  useEffect: function () { return R().useEffect.apply(null, arguments); },
  useMemo: function () { return R().useMemo.apply(null, arguments); },
  useCallback: function () { return R().useCallback.apply(null, arguments); },
  useRef: function () { return R().useRef.apply(null, arguments); },
  useReducer: function () { return R().useReducer.apply(null, arguments); },
};`;

// fn(), action(), expect, userEvent ... evaluate to harmless callables; a default import
// renders its children, so addon components used as JSX don't break the story.
const STORYBOOK_STUB = `
var inert = new Proxy(function () {}, {
  get: function (t, k) { if (k === 'then') return undefined; if (k === 'prototype') return t.prototype; if (k === Symbol.toPrimitive || k === 'toString' || k === 'valueOf') return function () { return ''; }; return inert; },
  apply: function () { return inert; },
  construct: function () { return {}; },
});
var named = {};
'fn action actions expect userEvent within waitFor screen fireEvent spyOn'.split(' ').forEach(function (k) { named[k] = inert; });
var passthrough = function (p) { return p && p.children !== undefined ? p.children : null; };
Object.assign(passthrough, named);
module.exports = new Proxy(passthrough, { get: function (t, k) { if (k === 'then' || k === '__esModule') return undefined; if (k === 'prototype') return t.prototype; return k in named ? named[k] : inert; } });`;

const NEXT_LINK_STUB =
  "var R = window.React; module.exports = function Link(p) { var a = Object.assign({}, p); delete a.passHref; delete a.prefetch; delete a.replace; delete a.scroll; delete a.shallow; return R.createElement('a', a, p.children); };";

// CSS-module class -> the hashed name the library build gave it (`tedi-btn` -> `tedi-btn-1a2b3c4d`).
let classMap = null;
function hashedClasses() {
  if (classMap) return classMap;
  classMap = {};
  const css = fs.readFileSync(path.join(ROOT, 'dist/index.css'), 'utf8');
  for (const m of css.matchAll(/\.((-?[_a-zA-Z][\w-]*?)-[0-9a-f]{8})(?![\w-])/g)) classMap[m[2]] ??= m[1];
  return classMap;
}

function previewPlugin(exported, globalDefaults, unstyled) {
  return {
    name: 'tedi-preview',
    setup(build) {
      // CSS modules resolve to the hashed class names bundle.css already ships, so a story
      // that borrows a component's class (to force a state) gets the real one. A library
      // component compiled from source is still a problem (it should be the bundle's): record it.
      build.onResolve({ filter: /\.module\.s?css$/ }, (args) => {
        const importer = rel(args.importer);
        if (importer.startsWith('src/tedi/components/') && !/\.stor(y|ies)\./.test(importer)) unstyled.add(importer);
        return { path: args.path, namespace: 'css-module' };
      });
      build.onLoad({ filter: /.*/, namespace: 'css-module' }, () => ({
        contents: `module.exports = ${JSON.stringify(hashedClasses())};`,
        loader: 'js',
      }));
      build.onResolve({ filter: /^(storybook|@storybook)\// }, (args) => ({
        path: args.path,
        namespace: /preview-api|manager-api|client-api/.test(args.path) ? 'sb-hooks' : 'sb-inert',
      }));
      build.onResolve({ filter: /^next\/link$/ }, () => ({ path: 'next/link', namespace: 'next-link' }));
      build.onResolve({ filter: /^\.\.?\// }, async (args) => {
        if (args.pluginData?.inner || args.importer.includes('/node_modules/')) return undefined;
        const resolved = await build.resolve(args.path, {
          resolveDir: args.resolveDir,
          kind: args.kind,
          pluginData: { inner: true },
        });
        if (resolved.errors.length) return undefined;
        const name = shimTarget(resolved.path, exported);
        return name ? { path: resolved.path, namespace: 'tedi', pluginData: { name } } : undefined;
      });
      build.onResolve({ filter: /^tedi-namespace$/ }, () => ({ path: 'tedi-namespace', namespace: 'tedi-namespace' }));
      build.onLoad({ filter: /.*/, namespace: 'tedi-namespace' }, () => ({
        contents: `module.exports = window.${NAMESPACE};`,
        loader: 'js',
      }));
      build.onLoad({ filter: /.*/, namespace: 'tedi' }, (args) => ({
        contents: `export * from 'tedi-namespace'; const ns = window.${NAMESPACE}; export default ns[${JSON.stringify(
          args.pluginData.name
        )}] ?? ns;`,
        loader: 'js',
      }));
      build.onLoad({ filter: /.*/, namespace: 'sb-hooks' }, () => ({
        contents: `var GLOBAL_DEFAULTS = ${JSON.stringify(globalDefaults)};${PREVIEW_API_STUB}`,
        loader: 'js',
      }));
      build.onLoad({ filter: /.*/, namespace: 'sb-inert' }, () => ({ contents: STORYBOOK_STUB, loader: 'js' }));
      build.onLoad({ filter: /.*/, namespace: 'next-link' }, () => ({ contents: NEXT_LINK_STUB, loader: 'js' }));
    },
  };
}

// Theme default and named backgrounds, as .storybook/preview.tsx declares them.
function storybookGlobals() {
  const preview = fs.readFileSync(path.join(ROOT, '.storybook/preview.tsx'), 'utf8');
  const theme = /theme:\s*\{[^}]*defaultValue:\s*'([^']+)'/s.exec(preview)?.[1] ?? 'default';
  const options = /backgrounds:\s*\{\s*options:\s*\{([\s\S]*?)\n\s{6}\}/.exec(preview)?.[1] ?? '';
  const backgrounds = Object.fromEntries(
    [...options.matchAll(/(\w+):\s*\{\s*name:\s*'[^']*',\s*value:\s*'([^']+)'/g)].map((m) => [m[1], m[2]])
  );
  return { globalDefaults: { theme }, backgrounds };
}

// Stories reference .storybook staticDirs files by name ('tehik_logo.png'); the artifact
// has no such files, so those string literals become data URIs.
function inlinePublicAssets(code) {
  const dir = path.join(ROOT, 'public');
  const types = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
  for (const file of fs.readdirSync(dir)) {
    const type = types[path.extname(file).toLowerCase()];
    if (!type) continue;
    const pattern = new RegExp(`(["'\`])/?${file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
    if (!pattern.test(code)) continue;
    const uri = `data:${type};base64,${fs.readFileSync(path.join(dir, file)).toString('base64')}`;
    code = code.replace(pattern, (_, quote) => `${quote}${uri}${quote}`);
  }
  return code;
}

// Cards whose stories pulled a library component in from source: it renders without its
// CSS-module styles. Such a card renders and passes the render check, but looks wrong.
const unstyledCards = [];

async function buildPreview(component, exported, globals) {
  const composePath = path.join(HERE, 'compose.tsx');
  const unstyled = new Set();
  const lines = [
    `import * as S from ${JSON.stringify(path.join(ROOT, component.storiesFile))};`,
    `import { compose } from ${JSON.stringify(composePath)};`,
    `const G = ${JSON.stringify(globals.globalDefaults)};`,
    `const B = ${JSON.stringify(globals.backgrounds)};`,
    ...component.stories.map((key) => `export const ${key} = compose(S, ${JSON.stringify(key)}, G, B);`),
  ];
  const result = await esbuild.build({
    stdin: { contents: lines.join('\n'), resolveDir: ROOT, loader: 'tsx', sourcefile: `${component.name}.preview.tsx` },
    bundle: true,
    format: 'iife',
    globalName: '__dsPreview',
    write: false,
    jsx: 'automatic',
    define: DEFINE,
    loader: {
      '.js': 'jsx',
      '.css': 'empty',
      '.scss': 'empty',
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.jpeg': 'dataurl',
      '.gif': 'dataurl',
      '.webp': 'dataurl',
      '.svg': 'dataurl',
      '.woff2': 'dataurl',
      '.md': 'text',
      '.mdx': 'empty',
    },
    plugins: [reactGlobalsPlugin, previewPlugin(exported, globals.globalDefaults, unstyled)],
    logLevel: 'silent',
  });
  if (unstyled.size) {
    console.warn(`  ${component.name}: compiled from source without their styles: ${[...unstyled].join(', ')}`);
    unstyledCards.push(component.name);
  }
  write(
    `_preview/${component.name}.js`,
    scriptSafe(inlinePublicAssets(result.outputFiles[0].text), `_preview/${component.name}.js`)
  );
}

function providerTree(node, inner) {
  if (!node) return inner;
  const props = JSON.stringify(node.props ?? {});
  return `h(window.${NAMESPACE}.${node.component},${props},${providerTree(node.inner, inner)})`;
}

function previewHtml(component) {
  const [width, height] = (
    component.viewport ??
    (component.cardMode === 'single' ? '900x700' : component.cardMode === 'column' ? '916x700' : '')
  ).split('x');
  const size = height ? ` height=${height} width=${width}` : '';
  const mount = providerTree(cfg.provider, 'h(window.__dsPreview[key])');
  return `<!-- @dsCard group="${component.group}"${size} -->
<!doctype html>
<html><head><meta charset="utf-8">
  <script src="../preview-theme.js"></script>
  <style>
    body{margin:0;padding:24px;background:var(--general-surface-primary)}
    .ds-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;align-items:start}
    .ds-grid.ds-col{grid-template-columns:1fr}
    .ds-cell{border:1px solid var(--general-border-primary);border-radius:8px;padding:12px;min-width:0;overflow:hidden;transform:translateZ(0)}
    .ds-cell>h4{margin:0 0 8px;font:600 12px system-ui;color:var(--general-text-tertiary);text-transform:uppercase;letter-spacing:.04em}
    .ds-single{transform:translateZ(0)}
  </style>
</head><body>
  <div class="ds-grid" id="g"></div>
  <script src="../../_preview/${component.name}.js"></script>
  <script>
    // One cell per story; ?story=<Export> renders just that story (used for grading).
    var h=React.createElement, g=document.getElementById('g');
    var E=Object.keys(window.__dsPreview||{}).filter(function(k){return typeof window.__dsPreview[k]==='function'&&/^[A-Z]/.test(k)});
    var MODE=${JSON.stringify(component.cardMode)}, PRIMARY=${JSON.stringify(component.primaryStory)};
    var q=null; try{q=new URLSearchParams(location.search).get('story')}catch(e){}
    if(MODE==='column'){g.className+=' ds-col'; var i0=E.indexOf(PRIMARY); if(i0>0){E.splice(i0,1);E.unshift(PRIMARY)}}
    function mount(id,key){try{ReactDOM.createRoot(document.getElementById(id)).render(${mount})}catch(e){document.getElementById(id).textContent='⚠ '+(e&&e.message||e)}}
    var pick=null;
    if(q){pick=E.filter(function(k){return k.toLowerCase()===q.toLowerCase()})[0]||null}
    else if(MODE==='single'&&E.length){pick=E.indexOf(PRIMARY)>=0?PRIMARY:E[0]}
    if(q&&!pick){g.textContent='⚠ no story named '+q}
    else if(pick){
      var s=document.createElement('div'); s.className='ds-single'; s.id='r0';
      if(!q)document.body.style.padding='0';
      g.parentNode.replaceChild(s,g); mount('r0',pick);
    } else {
      E.forEach(function(key,i){
        var cell=document.createElement('section'); cell.className='ds-cell';
        cell.innerHTML='<h4>'+key+'</h4><div id="r'+i+'"></div>'; g.appendChild(cell); mount('r'+i,key);
      });
      if(!E.length){g.textContent='⚠ no stories'}
    }
  </script>
</body></html>
`;
}

// --- docs ----------------------------------------------------------------------------------

const humanize = (key) => key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/_/g, ' ');

// The source of one `export const <key> ...` block, up to the next top-level statement.
function storySource(source, key, maxLines = 40) {
  const start = source.search(new RegExp(`^export const ${key}\\b`, 'm'));
  if (start < 0) return null;
  const rest = source.slice(start);
  const next = rest.slice(1).search(/^(export |const |type |function |interface )/m);
  const lines = (next < 0 ? rest : rest.slice(0, next + 1)).trimEnd().split('\n');
  return lines.length > maxLines ? [...lines.slice(0, maxLines), '// …'].join('\n') : lines.join('\n');
}

function related(component, components) {
  const names = new Set(components.map((c) => c.name));
  const imported = new Set();
  for (const m of component.source.matchAll(/^import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+['"]\.{1,2}\//gm)) {
    for (const spec of m[1].split(',')) {
      const name = spec.trim().split(/\s+as\s+/)[0];
      if (names.has(name) && name !== component.name) imported.add(name);
    }
  }
  return [...imported];
}

function componentReadme(component, types, compounds, components) {
  const doc = path.join(ROOT, '.design-sync/docs', `${component.name}.md`);
  const parts = [
    `${component.name} from @tedi-design-system/react. Use via \`window.${NAMESPACE}.${component.name}\` ` +
      '(the bundle is `components/bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md: ' +
      'components read theme and i18n from that context).',
    '',
  ];
  if (fs.existsSync(doc)) parts.push(fs.readFileSync(doc, 'utf8').trim(), '');
  else if (compounds.length)
    parts.push(`Sub-components: ${compounds.map((c) => `\`${component.name}.${c}\``).join(', ')}.`, '');
  parts.push(`Variants (see \`preview.html\`): ${component.stories.map(humanize).join(', ')}.`, '');
  parts.push('## Props', '', '```ts', types.trim(), '```', '', '## Examples', '');
  for (const key of component.stories.slice(0, 6)) {
    const src = storySource(component.source, key);
    if (src) parts.push(`### ${humanize(key)}`, '', '```tsx', src, '```', '');
  }
  parts.push(`Full story source: \`${component.storiesFile}\`.`, '');
  const rel = related(component, components);
  if (rel.length) parts.push('## Related', '', rel.map((n) => `\`${n}\``).join(', '), '');
  return parts.join('\n');
}

// conventions.md is prose no script can rewrite, so every name it mentions is checked
// against this build: components and their sub-components, `Component.prop`, type names,
// imports from the package, CSS custom properties, utility classes, and the props listed in
// tables with a "Components" column. `cfg.conventionsIgnore` lists names it mentions on
// purpose although they don't exist ("there is no `Toast` component").
function checkConventions(components, compounds, exported) {
  const text = fs.readFileSync(path.join(ROOT, cfg.readmeHeader), 'utf8');
  const ignore = new Set(cfg.conventionsIgnore ?? []);
  const css = `${fs.readFileSync(path.join(P, 'components/bundle.css'), 'utf8')}\n${fs.readFileSync(
    path.join(P, 'tokens.css'),
    'utf8'
  )}`;
  const cssVars = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]));
  const classes = new Set([...css.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]));
  const dts = fs
    .globSync('dist/src/tedi/**/*.d.ts', { cwd: ROOT })
    .map((f) => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]);
  const allDts = dts.map(([, t]) => t).join('\n');
  const byName = new Map(components.map((c) => [c.name, c]));
  const dirText = (name) => {
    const c = byName.get(name);
    if (!c) return '';
    const dir = `dist/${path.dirname(c.storiesFile)}/`;
    return dts
      .filter(([f]) => f.startsWith(dir))
      .map(([, t]) => t)
      .join('\n');
  };
  // The generated <Name>.d.ts lists props inherited from other library modules too.
  const ownTypes = (name) => {
    const file = path.join(P, 'components', name, `${name}.d.ts`);
    return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  };
  const hasProp = (name, prop) => new RegExp(`\\b${prop}\\??:`).test(`${ownTypes(name)}\n${dirText(name)}`);
  const isType = (name) => new RegExp(`\\b(interface|type|enum|class)\\s+${name}\\b`).test(allDts);
  const problems = new Set();
  const flag = (what) => {
    if (!ignore.has(what.split(' ')[0])) problems.add(what);
  };
  const checkName = (raw) => {
    const name = raw.replace(/[(<].*$/, '');
    const [base, member] = name.split('.');
    if (!member) {
      if (!exported.has(base) && !isType(base)) flag(`${base} (not exported and not a type)`);
    } else if (/^[A-Z]/.test(member)) {
      if (!(compounds.get(base) ?? []).includes(member)) flag(`${name} (no such sub-component)`);
    } else if (!exported.has(base) || !hasProp(base, member)) {
      flag(`${name} (no such prop)`);
    }
  };

  for (const m of text.matchAll(/`([A-Z][A-Za-z0-9]*(?:\.[A-Za-z][A-Za-z0-9]*)?)`/g)) checkName(m[1]);
  for (const m of text.matchAll(/<([A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?)[\s/>]/g)) checkName(m[1]);
  for (const m of text.matchAll(/import\s*\{([^}]*)\}\s*from\s*'@tedi-design-system\/react\/tedi'/g)) {
    for (const n of m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean))
      if (!exported.has(n)) flag(`${n} (not exported)`);
  }
  for (const m of text.matchAll(/`--([\w-]+?)(\*?)`/g)) {
    const known = m[2] ? [...cssVars].some((v) => v.startsWith(m[1])) : cssVars.has(m[1]);
    if (!known) flag(`--${m[1]}${m[2]} (no such custom property)`);
  }
  const checkClass = (cls) => {
    const prefix = cls.endsWith('*') ? cls.slice(0, -1) : null;
    if (prefix ? ![...classes].some((c) => c.startsWith(prefix)) : !classes.has(cls)) flag(`${cls} (no such class)`);
  };
  for (const m of text.matchAll(/className="([^"]+)"/g)) m[1].split(/\s+/).forEach(checkClass);

  // Tables: a "Real names" column lists classes; a "Components" column lists components that
  // all have the props named in the row's "Name" column.
  let header = null;
  for (const line of text.split('\n')) {
    if (!line.startsWith('|')) {
      header = null;
      continue;
    }
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
    if (!header) {
      header = cells;
      continue;
    }
    if (/^-+$/.test(cells[0].replace(/:/g, ''))) continue;
    const col = (title) => cells[header.indexOf(title)] ?? '';
    const ticks = (cell) => [...cell.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
    if (header.includes('Real names')) ticks(col('Real names')).forEach(checkClass);
    if (header.includes('Components') && header.includes('Name')) {
      const props = ticks(col('Name'));
      for (const comp of ticks(col('Components'))) {
        const base = comp.split('.')[0];
        for (const prop of props) if (!hasProp(base, prop)) flag(`${comp}.${prop} (no such prop)`);
      }
    }
  }
  return [...problems];
}

// README.md, the page's overview: a generated intro, the hand-written conventions
// (.design-sync/conventions.md, checked by checkConventions), then generated sections for
// what a release changes on its own: components, deprecations, versions, files.
function systemReadme(components, compounds, deprecated, tokens, version, core) {
  const conventions = fs.readFileSync(path.join(ROOT, cfg.readmeHeader), 'utf8').trim();
  const byGroup = new Map();
  for (const c of components) byGroup.set(c.group, [...(byGroup.get(c.group) ?? []), c]);
  const counts = Object.entries(tokens)
    .filter(([, v]) => v && Array.isArray(v.tokens))
    .map(([family, v]) => `${family} ${v.tokens.length}`);
  const lines = [
    `TEDI is the Estonian health-and-social-services design system. This is \`@tedi-design-system/react\` ${version} ` +
      `(core ${core}): ${components.length} TEDI-Ready components, the real compiled code, on \`window.${NAMESPACE}\`. ` +
      'Build with these components and tokens; each component has its own README under `components/<Name>/`.',
    '',
    conventions,
    '',
    '## Components',
    '',
  ];
  for (const [group, list] of byGroup) {
    const names = list.map((c) => {
      const parts = compounds.get(c.name) ?? [];
      return `\`${c.name}\`${parts.length ? ` (${parts.map((p) => `\`.${p}\``).join(', ')})` : ''}`;
    });
    lines.push(`**${group}**: ${names.join(', ')}`, '');
  }
  if (deprecated.length) {
    lines.push('## Deprecated', '', 'Still exported, but use the replacement in new designs:', '');
    for (const d of deprecated) lines.push(`- \`${d.name}\`: ${d.text}`);
    lines.push('');
  }
  lines.push(
    '## Reference',
    '',
    '| | |',
    '|---|---|',
    `| Package | [\`@tedi-design-system/react\`](${PACKAGE_URL}) ${version}, the \`/tedi\` entry (\`/community\` is not included) |`,
    `| Tokens | \`@tedi-design-system/core\` ${core}: ${counts.join(
      ', '
    )}; component-level tokens are in \`components/bundle.css\` |`,
    `| Source | ${SOURCE_URL} |`,
    `| Storybook | ${STORYBOOK_URL} (for people: it is client-rendered, so fetching it returns an empty page) |`,
    `| Figma | ${FIGMA_URL} |`,
    '',
    'Files: `components/bundle.js` (the library; line 1 is a `@ds-bundle` header), `components/bundle.css`, ' +
      '`tokens.css` / `tokens.json`, `components/index.d.ts` (all props), ' +
      '`components/<Name>/` (`README.md`, `<Name>.d.ts`, `preview.html`), `components/lib/` (React 18.3.1).',
    '',
    'Loading it in your own page, after React 18:',
    '',
    '```html',
    '<link rel="stylesheet" href="tokens.css">',
    '<link rel="stylesheet" href="components/bundle.css">',
    '<script src="components/bundle.js"></script>',
    '```',
    '',
    "Mount into a dedicated child node, not the host page's own React root, inside the providers from **Start here**.",
    ''
  );
  return lines.join('\n');
}

// --- plan ----------------------------------------------------------------------------------

function contentType(file) {
  return /\.(d\.ts|jsx)$/.test(file) ? 'text/plain' : null;
}

function publishPlan() {
  const binary = (file) => file.endsWith('.woff2') || file.startsWith('components/lib/');
  const seedOnly = new Set(['components/preview-theme.js', 'components/Cover/preview.html']);
  const files = fs
    .globSync('**/*', { cwd: P, withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => path.relative(P, path.join(d.parentPath, d.name)).split(path.sep).join('/'))
    .filter((f) => f !== 'design-system.json')
    .filter((f) => opts.seed || opts['with-binaries'] || !binary(f))
    .filter((f) => opts.seed || !seedOnly.has(f))
    .sort();
  const batches = [];
  let batch = {};
  let size = 0;
  for (const f of files) {
    const bytes = fs.statSync(path.join(P, f)).size;
    if (Object.keys(batch).length && (Object.keys(batch).length >= MAX_FILES || size + bytes > MAX_BYTES)) {
      batches.push(batch);
      batch = {};
      size = 0;
    }
    const type = contentType(f);
    batch[`project/${f}`] = type ? { from: `project/${f}`, contentType: type } : `project/${f}`;
    size += bytes;
  }
  batches.push(batch);
  // Each publish call needs one file as `file_path`: the batch's first README, else its first
  // file that needs no contentType. The rest go in `files`.
  const calls = batches.map((b) => {
    const plain = Object.keys(b).filter((k) => typeof b[k] === 'string');
    const main = plain.find((k) => k.endsWith('/README.md')) ?? plain[0];
    const { [main]: _, ...rest } = b;
    return { file_path: main, files: rest };
  });
  fs.writeFileSync(path.join(OUT, 'publish-plan.json'), JSON.stringify(calls, null, 1));
  return { files: files.length, batches: batches.length };
}

// --- run -----------------------------------------------------------------------------------

async function main() {
  fs.rmSync(P, { recursive: true, force: true });
  const version = libraryVersion();
  const exported = barrelExports();
  const components = discoverComponents(exported);
  console.log(`${components.length} components, @tedi-design-system/react ${version}`);

  const bundle = await buildBundle(components);
  const compounds = compoundsOf(bundle, components);
  const { tokens, report } = buildTokens(fs.readFileSync(path.join(ROOT, 'dist/index.css'), 'utf8'), version);
  buildStyles(tokens);

  const readTypes = createTypeReader(typesEntry(ROOT));
  const index = [
    `// ${NAMESPACE} (@tedi-design-system/react@${version}): component prop types, one section per component.\n`,
  ];
  const globals = storybookGlobals();
  const failed = [];
  for (const c of components) {
    const types = readTypes(c.name, c.storiesFile, version);
    write(`components/${c.name}/${c.name}.d.ts`, types);
    index.push(`// ---- ${c.name} (components/${c.name}/${c.name}.d.ts) ----\n${types}`);
    write(`components/${c.name}/README.md`, componentReadme(c, types, compounds.get(c.name) ?? [], components));
    write(`components/${c.name}/preview.html`, previewHtml(c));
    try {
      await buildPreview(c, exported, globals);
    } catch (error) {
      failed.push(c.name);
      console.error(
        `  ${c.name}: preview failed to compile\n${(error.errors ?? [error])
          .map((e) => `    ${e.text ?? e.message}`)
          .join('\n')}`
      );
    }
  }
  write('components/index.d.ts', index.join('\n'));
  const core = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'node_modules/@tedi-design-system/core/package.json'), 'utf8')
  ).version;
  const deprecated = readTypes.deprecated(components.map((c) => c.name));
  write('README.md', systemReadme(components, compounds, deprecated, tokens, version, core));
  const stale = checkConventions(components, compounds, exported);
  await buildReactLibrary();
  for (const f of ['components/preview-theme.js', 'components/Cover/preview.html']) {
    fs.cpSync(path.join(SEED_DIR, f), path.join(P, f));
  }
  if (opts.seed) {
    const index = JSON.parse(fs.readFileSync(path.join(SEED_DIR, 'design-system.json'), 'utf8'));
    index.createdOnFiles.at = source().date;
    write('design-system.json', JSON.stringify(index, null, 2) + '\n');
  }

  const plan = publishPlan();
  if (opts.release) {
    const release = {
      version,
      core,
      components: components.length,
      // The paths under project/ a complete publish leaves: the plan's files plus the index.
      projectFiles: plan.files + 1,
      commit: source().commit,
      built: source().date,
    };
    fs.writeFileSync(path.join(OUT, 'release.json'), JSON.stringify(release, null, 2) + '\n');
    // Copied as they are: release.json carries the version, so these don't change per release.
    for (const f of fs.readdirSync(path.join(HERE, 'release'))) {
      fs.copyFileSync(path.join(HERE, 'release', f), path.join(OUT, f));
    }
  } else {
    fs.writeFileSync(path.join(OUT, 'tokens-report.json'), JSON.stringify(report, null, 1));
    // For check.mjs --compare: each card's stories, and the Storybook title they come from.
    fs.writeFileSync(
      path.join(OUT, 'stories.json'),
      JSON.stringify(
        Object.fromEntries(components.map((c) => [c.name, { title: c.title, stories: c.stories }])),
        null,
        1
      )
    );
  }
  console.log(
    `tokens: ${report.changed.length} changed, ${report.added.length} added, ${report.notInBuild.length} not in the build`
  );
  for (const c of report.changed)
    console.log(`  changed ${c.name}: ${JSON.stringify(c.from)} -> ${JSON.stringify(c.to)}`);
  for (const n of report.added) console.log(`  added ${n} (usage note TODO)`);
  for (const n of report.notInBuild) console.log(`  not in the build: ${n}`);
  console.log(`plan: ${plan.files} files in ${plan.batches} batch(es) -> ${rel(path.join(OUT, 'publish-plan.json'))}`);
  if (failed.length) {
    console.error(`previews failed: ${failed.join(', ')}`);
    process.exitCode = 1;
  }
  if (unstyledCards.length && opts.release) {
    console.error(`release blocked: unstyled components in ${unstyledCards.join(', ')} (see the warnings above)`);
    process.exitCode = 1;
  }
  if (stale.length) {
    const where = `${cfg.readmeHeader} names what this build doesn't have; update it (or cfg.conventionsIgnore):`;
    (opts.release ? console.error : console.warn)(`${opts.release ? 'release blocked: ' : ''}${where}`);
    for (const s of stale) (opts.release ? console.error : console.warn)(`  ${s}`);
    if (opts.release) process.exitCode = 1;
  }
}

await main();
