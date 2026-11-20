import { execFileSync } from 'child_process';
import path from 'path';

// jsdom does not evaluate media queries, so the queries are checked on the compiled stylesheet. The sass CLI runs in a
// child process, because the sass library does not work inside Jest's jsdom environment.
const root = path.resolve(__dirname, '../../../../..');
const css = execFileSync(
  path.join(root, 'node_modules/.bin/sass'),
  [
    '--quiet',
    '--no-source-map',
    `--load-path=${path.join(root, 'node_modules')}`,
    path.resolve(__dirname, 'pagination.module.scss'),
  ],
  { encoding: 'utf8' }
);

// The query that wraps a rule with this selector.
const queryOf = (selector: string): string | undefined =>
  new RegExp(`@media ([^{]+) \\{\\s*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\{`).exec(css)?.[1];

describe('Pagination styles', () => {
  it('shows the wide and the compact picker at complementary widths, with no gap at the boundary', () => {
    expect(queryOf('.tedi-pagination .tedi-pagination__wide-only')).toBe('not all and (min-width: 48rem)');
    expect(queryOf('.tedi-pagination .tedi-pagination__compact-only')).toBe('(min-width: 48rem)');
  });

  it('hides a slot below the breakpoint it is given, with the exact complement of a min-width query', () => {
    expect(queryOf('.tedi-pagination--no-page-size--below-lg .tedi-pagination__slot-end')).toBe(
      'not all and (min-width: 62rem)'
    );
    expect(queryOf('.tedi-pagination--no-results--below-sm .tedi-pagination__slot-start')).toBe(
      'not all and (min-width: 36rem)'
    );
  });

  it('switches the no-pager grid below the lower of `md` and the breakpoint', () => {
    expect(queryOf('.tedi-pagination.tedi-pagination--no-pager--below-sm')).toBe('not all and (min-width: 36rem)');
    expect(queryOf('.tedi-pagination.tedi-pagination--no-pager--below-xl')).toBe('not all and (min-width: 48rem)');
  });

  it('never uses a max-width media query, which would leave a gap next to a min-width one', () => {
    expect(css).not.toMatch(/@media[^{]*max-width/);
  });
});
