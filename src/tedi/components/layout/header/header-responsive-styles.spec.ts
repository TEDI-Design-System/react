import { execFileSync } from 'child_process';
import path from 'path';

// jsdom does not evaluate media queries, so the queries are checked on the compiled stylesheet. The sass CLI runs in a
// child process, because the sass library does not work inside Jest's jsdom environment.
const root = path.resolve(__dirname, '../../../../..');
const compile = (file: string): string =>
  execFileSync(
    path.join(root, 'node_modules/.bin/sass'),
    ['--quiet', '--no-source-map', `--load-path=${path.join(root, 'node_modules')}`, path.resolve(__dirname, file)],
    { encoding: 'utf8' }
  );

describe('Header responsive styles', () => {
  describe('variant visibility', () => {
    const css = compile('header-responsive-variants.module.scss');
    const queries = Array.from(css.matchAll(/@media ([^{]+) \{/g), (match) => match[1]);

    it('has one query per breakpoint', () => {
      expect(queries).toHaveLength(6);
    });

    it('covers every width exactly once, with no gap or overlap at the boundaries', () => {
      const [below, ...ranges] = queries;
      const from = ranges.pop();
      const bounds = ranges.map((query) => /\(([\d.]+rem) <= width < ([\d.]+rem)\)/.exec(query)?.slice(1));

      expect(below).toBe('not all and (min-width: 36rem)');
      expect(from).toBe('(min-width: 87.5rem)');
      expect(bounds).toEqual([
        ['36rem', '48rem'],
        ['48rem', '62rem'],
        ['62rem', '75rem'],
        ['75rem', '87.5rem'],
      ]);
    });

    it('never uses a max-width, which would leave a gap', () => {
      expect(css).not.toMatch(/max-width/);
    });
  });

  describe('language selector', () => {
    const css = compile('components/header-language/header-language.module.scss');

    it('switches at the exact opposite of the min-width queries', () => {
      expect(css).toContain('@media not all and (min-width: 48rem)');
      expect(css).toContain('@media not all and (min-width: 62rem)');
      expect(css).not.toMatch(/max-width/);
    });

    it('keeps the hidden label on one line', () => {
      expect(css).toMatch(/\.tedi-header-language__label \{[^}]*white-space: nowrap;/);
    });
  });
});
