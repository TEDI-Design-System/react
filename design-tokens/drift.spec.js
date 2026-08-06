import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildTokens } from './lib/css-tokens.js';
import { parseBarrel } from './lib/manifest.js';

const root = resolve(__dirname, '..');
const coreDir = resolve(root, 'node_modules/@tedi-design-system/core');
const read = (p) => JSON.parse(readFileSync(resolve(__dirname, p), 'utf8'));

// Inline (not imported from build.js) to avoid pulling import.meta into Jest.
function freshTokens() {
  const version = JSON.parse(readFileSync(resolve(coreDir, 'package.json'), 'utf8')).version;
  const css = readFileSync(resolve(coreDir, 'index.css'), 'utf8');
  return buildTokens(css, { version });
}

describe('generated design-docs data is current', () => {
  it('tokens.json matches a fresh generation from installed core', () => {
    expect(read('tokens.json')).toEqual(freshTokens());
  });

  it('manifest lists exactly the current tedi barrel components (ids + categories)', () => {
    const committed = read('component.manifest.json').components;
    const barrel = parseBarrel(readFileSync(resolve(root, 'src/tedi/index.ts'), 'utf8'));
    const committedIds = committed.map((c) => c.id).sort();
    const barrelIds = barrel.map((r) => r.id).sort();
    expect(committedIds).toEqual(barrelIds);
    for (const c of committed) {
      expect(c.category).toBe(barrel.find((r) => r.id === c.id).category);
    }
  });
});
