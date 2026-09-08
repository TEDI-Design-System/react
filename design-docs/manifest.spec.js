import { parseBarrel, extractStatus, mergeManifest } from './manifest.js';
import { renderTokenTable, tokenFamilies } from './tokens.js';

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

describe('token families', () => {
  const tokens = {
    themes: {
      default: {
        semantic: {
          'general-text-primary': { value: 'var(--tedi-neutral-900)', resolved: 'rgb(21 25 38)' },
          'general-text-brand': { value: 'var(--tedi-primary-600)', resolved: 'rgb(0 90 163)' },
          'general-surface-primary': { value: '#fff', resolved: 'rgb(255 255 255)' },
          'form-field-padding-x-lg': { value: '1rem', resolved: '1rem' },
          'button-primary-background': { value: '#000', resolved: 'rgb(0 0 0)' },
        },
      },
    },
  };

  it('groups role tokens into families and ignores component-scoped tiers', () => {
    const families = tokenFamilies(tokens);
    expect([...families.keys()]).toEqual(['form-field', 'general-surface', 'general-text']);
    expect(families.get('general-text')).toEqual(['general-text-brand', 'general-text-primary']);
  });

  it('never emits resolved token values, so the doc cannot teach a literal', () => {
    const table = renderTokenTable(tokens);
    expect(table).toContain('`general-text-*`');
    expect(table).not.toContain('rgb(');
    expect(table).not.toContain('#fff');
  });
});
