import {
  extractAllRuleBodies,
  parseDeclarations,
  resolveValue,
  tierOf,
  buildTokens,
} from './css-tokens.js';

// Minified fixture mirroring core: primitives + semantic in :root, dark override in .tedi-theme--dark
const CSS =
  ':root{--tedi-blue-600: rgb(0 90 163);--tedi-neutral-850: rgb(21 25 38);' +
  '--tedi-primary-600: var(--tedi-blue-600);--tedi-radius-02-default: 0.25rem}' +
  ':root{--general-text-primary: var(--tedi-neutral-850);' +
  '--button-main-primary-background-default: var(--tedi-primary-600)}' +
  '.tedi-theme--dark{--general-text-primary: var(--tedi-blue-600)}' +
  '@media(min-width: 36rem){.x{--not-a-token: 1}}';

describe('extractAllRuleBodies', () => {
  it('returns every :root body, not just the first', () => {
    expect(extractAllRuleBodies(CSS, ':root')).toHaveLength(2);
  });
  it('returns the dark theme body', () => {
    expect(extractAllRuleBodies(CSS, '.tedi-theme--dark')[0]).toContain('--general-text-primary');
  });
});

describe('parseDeclarations', () => {
  it('parses custom properties, ignoring parens-internal semicolons', () => {
    const map = parseDeclarations('--a: var(--b);--c: rgb(0 90 163)');
    expect(map.get('--a')).toBe('var(--b)');
    expect(map.get('--c')).toBe('rgb(0 90 163)');
  });
});

describe('resolveValue', () => {
  const map = new Map([
    ['--tedi-blue-600', 'rgb(0 90 163)'],
    ['--tedi-primary-600', 'var(--tedi-blue-600)'],
    ['--button-x', 'var(--tedi-primary-600)'],
  ]);
  it('returns literals unchanged', () => {
    expect(resolveValue('rgb(0 90 163)', map)).toBe('rgb(0 90 163)');
  });
  it('follows multi-hop var() chains to a literal', () => {
    expect(resolveValue('var(--button-x)', map)).toBe('rgb(0 90 163)');
  });
  it('returns the reference when it cannot resolve (visible, not dropped)', () => {
    expect(resolveValue('var(--missing)', map)).toBe('var(--missing)');
  });
});

describe('tierOf', () => {
  it('classifies --tedi-* as primitive', () => expect(tierOf('--tedi-blue-600')).toBe('primitive'));
  it('classifies --general-*/--form-* as semantic', () => {
    expect(tierOf('--general-text-primary')).toBe('semantic');
    expect(tierOf('--form-general-background-disabled')).toBe('semantic');
  });
  it('classifies component-prefixed as component', () =>
    expect(tierOf('--button-main-primary-background-default')).toBe('component'));
});

describe('buildTokens', () => {
  const out = buildTokens(CSS, { version: '6.4.3' });
  it('records the version and both themes', () => {
    expect(out.version).toBe('6.4.3');
    expect(Object.keys(out.themes)).toEqual(['default', 'dark']);
  });
  it('resolves semantic tokens to literals in the default theme', () => {
    expect(out.themes.default.semantic['general-text-primary'].resolved).toBe('rgb(21 25 38)');
  });
  it('keeps the raw var() reference alongside the resolved literal', () => {
    expect(out.themes.default.component['button-main-primary-background-default'].value).toBe(
      'var(--tedi-primary-600)'
    );
    expect(out.themes.default.component['button-main-primary-background-default'].resolved).toBe(
      'rgb(0 90 163)'
    );
  });
  it('emits dark as the override subset only', () => {
    expect(Object.keys(out.themes.dark.semantic)).toEqual(['general-text-primary']);
    expect(out.themes.dark.semantic['general-text-primary'].resolved).toBe('rgb(0 90 163)');
  });
  it('excludes declarations outside :root / theme selectors', () => {
    const all = JSON.stringify(out);
    expect(all).not.toContain('not-a-token');
  });
});
