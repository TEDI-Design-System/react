import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseBarrel } from './manifest.js';

const root = resolve(__dirname, '..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));

// Token data is no longer generated or committed here — it ships with
// @tedi-design-system/core, generated there from Figma, so there is nothing for
// this repo to drift against. What remains is the component manifest, which is
// genuinely derived from this repo's barrel.
describe('generated design-docs data is current', () => {
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
