import { parseBarrel, extractStatus, mergeManifest } from './manifest.js';

const BARREL = [
  "export * from './components/buttons/button/button';",
  "export * from './components/base/typography/text/text';",
  "export { Foo } from './components/form/foo/foo';",
  "// a comment",
].join('\n');

describe('parseBarrel', () => {
  const rows = parseBarrel(BARREL);
  it('derives category from the first path segment after components', () => {
    expect(rows.find((r) => r.sourcePath.endsWith('button/button')).category).toBe('buttons');
    expect(rows.find((r) => r.sourcePath.includes('typography')).category).toBe('base');
  });
  it('records the source path for every export line', () => {
    expect(rows).toHaveLength(3);
    expect(rows[0].sourcePath).toBe('src/tedi/components/buttons/button/button');
  });
});

describe('extractStatus', () => {
  it('pulls status badge names from a stories meta block', () => {
    const src = "parameters: { status: { type: [{ name: 'breakpointSupport', url: 'x' }] } }";
    expect(extractStatus(src)).toEqual(['breakpointSupport']);
  });
  it('returns [] when no status is declared', () => {
    expect(extractStatus('parameters: { controls: {} }')).toEqual([]);
  });
});

describe('mergeManifest', () => {
  it('preserves human fields and refreshes derived fields', () => {
    const existing = [
      { id: 'buttons/button', name: 'Button', description: 'hand-written', keyProps: ['visualType'], category: 'buttons', status: [] },
    ];
    const fresh = [
      { id: 'buttons/button', category: 'buttons', sourcePath: 'src/tedi/components/buttons/button/button', status: ['breakpointSupport'] },
      { id: 'form/foo', category: 'form', sourcePath: 'src/tedi/components/form/foo/foo', status: [] },
    ];
    const merged = mergeManifest(existing, fresh);
    const btn = merged.find((c) => c.id === 'buttons/button');
    expect(btn.description).toBe('hand-written'); // preserved
    expect(btn.keyProps).toEqual(['visualType']); // preserved
    expect(btn.status).toEqual(['breakpointSupport']); // refreshed
    const foo = merged.find((c) => c.id === 'form/foo');
    expect(foo.description).toBeNull(); // new component gets null skeleton
    expect(foo.name).toBeNull();
  });
});
