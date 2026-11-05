#!/usr/bin/env node
// Renders the built artifact the way the Design System page does (tokens.css, bundle.css,
// the React library and bundle.js preloaded into each preview) and checks it.
//
//   node .design-sync/artifact/check.mjs --out <dir> [--components A,B] [--compare] [--max-stories 6] [--theme dark]
//
// Without --compare: renders every component card and reports script errors and cards
// that render nothing. With --compare: for each story, screenshots the reference Storybook
// (.design-sync/sb-reference) and the preview side by side into <out>/check/<Name>.png
// for grading; the raw pairs are kept under <out>/check/raw/.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const { values: opts } = parseArgs({
  options: {
    out: { type: 'string' },
    components: { type: 'string' },
    compare: { type: 'boolean', default: false },
    'max-stories': { type: 'string', default: '6' },
    theme: { type: 'string', default: 'default' },
  },
});
const OUT = path.resolve(opts.out);
const PROJECT = path.join(OUT, 'project');
const STORYBOOK = path.join(ROOT, '.design-sync/sb-reference');
const SHOTS = path.join(OUT, 'check');
const TYPES = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

// What the Design System page preloads into every preview frame.
const preload = (theme) =>
  `<script>document.documentElement.setAttribute('data-theme',${JSON.stringify(theme)})</script>` +
  '<link rel="stylesheet" href="/project/tokens.css"><link rel="stylesheet" href="/project/components/bundle.css">' +
  '<script src="/project/components/lib/react.js"></script><script src="/project/components/lib/react-dom.js"></script>' +
  '<script src="/project/components/bundle.js"></script>';

// Storybook loads static files from root paths (/fonts/...), so each side gets its own server.
function serve(base, inject) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://local');
    let file = path.join(base, decodeURIComponent(url.pathname));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!file.startsWith(base) || !fs.existsSync(file)) return res.writeHead(404).end();
    let body = fs.readFileSync(file);
    if (inject && file.endsWith('preview.html')) {
      body = body.toString().replace('<head>', `<head>${preload(url.searchParams.get('theme') ?? 'default')}`);
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' }).end(body);
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

const components = (
  opts.components?.split(',') ??
  fs
    .readdirSync(path.join(PROJECT, 'components'))
    .filter((n) => fs.existsSync(path.join(PROJECT, 'components', n, `${n}.d.ts`)))
).sort();

async function renderCheck(browser, port) {
  const problems = [];
  for (const name of components) {
    const page = await browser.newPage({ viewport: { width: 916, height: 700 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`http://localhost:${port}/project/components/${name}/preview.html?theme=${opts.theme}`);
    await page.waitForTimeout(800);
    const state = await page.evaluate(() => ({
      warnings: [...document.querySelectorAll('body *')]
        .filter((el) => el.childElementCount === 0 && el.textContent.startsWith('⚠'))
        .map((el) => el.textContent),
      height: document.body.scrollHeight,
      text: document.body.innerText.trim().length,
      media: document.querySelectorAll('img,svg,canvas,input,button,select,textarea').length,
    }));
    const empty = state.text === 0 && state.media === 0;
    if (errors.length || state.warnings.length || empty) {
      problems.push({
        name,
        errors: [...new Set(errors)].slice(0, 3),
        warnings: [...new Set(state.warnings)].slice(0, 3),
        empty,
      });
    }
    await page.close();
  }
  console.log(`render check: ${components.length - problems.length}/${components.length} cards clean`);
  for (const p of problems)
    console.log(
      `  ${p.name}: ${[...p.errors, ...p.warnings, p.empty ? 'renders nothing' : ''].filter(Boolean).join(' | ')}`
    );
  return problems.length === 0;
}

async function compare(browser, port, storybookPort) {
  const index = JSON.parse(fs.readFileSync(path.join(STORYBOOK, 'index.json'), 'utf8')).entries;
  const stories = Object.values(index).filter((e) => e.type === 'story');
  const cards = JSON.parse(fs.readFileSync(path.join(OUT, 'stories.json'), 'utf8'));
  fs.mkdirSync(path.join(SHOTS, 'raw'), { recursive: true });
  for (const name of components) {
    const card = cards[name];
    const entries = card.stories
      .map((key) => stories.find((e) => e.title === card.title && e.exportName === key))
      .filter(Boolean)
      .slice(0, Number(opts['max-stories']));
    const rows = [];
    for (const entry of entries) {
      const pair = {};
      for (const [side, url] of [
        [
          'storybook',
          `http://localhost:${storybookPort}/iframe.html?id=${entry.id}&viewMode=story&globals=theme:${opts.theme}`,
        ],
        [
          'preview',
          `http://localhost:${port}/project/components/${name}/preview.html?story=${entry.exportName}&theme=${opts.theme}`,
        ],
      ]) {
        const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
        await page.goto(url);
        await page.waitForTimeout(side === 'storybook' ? 1500 : 800);
        const file = path.join(SHOTS, 'raw', `${name}--${entry.exportName}--${side}.png`);
        await page.screenshot({ path: file });
        pair[side] = path.relative(SHOTS, file);
        await page.close();
      }
      rows.push({ story: entry.name, ...pair });
    }
    const sheet = await browser.newPage({ viewport: { width: 1840, height: 400 } });
    await sheet.setContent(
      `<body style="margin:0;font:14px system-ui"><h2 style="margin:12px">${name}: Storybook (left) vs preview (right)</h2>` +
        rows
          .map(
            (r) =>
              `<h3 style="margin:12px">${r.story}</h3><div style="display:flex;gap:16px;padding:0 12px">` +
              `<img style="width:900px;border:1px solid #ccc" src="http://localhost:${port}/check/${r.storybook}">` +
              `<img style="width:900px;border:1px solid #ccc" src="http://localhost:${port}/check/${r.preview}"></div>`
          )
          .join('') +
        '</body>'
    );
    await sheet.waitForTimeout(300);
    await sheet.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
    await sheet.close();
    console.log(`  ${name}: ${rows.length} stories -> ${path.relative(ROOT, path.join(SHOTS, `${name}.png`))}`);
  }
}

const artifact = await serve(OUT, true);
const storybook = await serve(STORYBOOK, false);
const browser = await chromium.launch();
try {
  const clean = await renderCheck(browser, artifact.address().port);
  if (opts.compare) await compare(browser, artifact.address().port, storybook.address().port);
  if (!clean) process.exitCode = 1;
} finally {
  await browser.close();
  artifact.close();
  storybook.close();
}
