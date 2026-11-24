import { readFileSync } from 'fs';
import path from 'path';

import { BreakpointSupport } from '../../../helpers';
import {
  getResponsiveClassNames,
  getResponsiveValues,
  getSwitchPoints,
  getValuePerBreakpoint,
  RESPONSIVE_BREAKPOINTS,
} from './footer-responsive';

type Props = { align?: 'start' | 'end' };

describe('footer-responsive', () => {
  it('lists every breakpoint except xs', () => {
    expect(RESPONSIVE_BREAKPOINTS).toEqual(['sm', 'md', 'lg', 'xl', 'xxl']);
  });

  it('matches the breakpoints the stylesheet generates classes for', () => {
    const scss = readFileSync(path.resolve(__dirname, '../../../styles/_breakpoint-classes.scss'), 'utf8');
    const names = /\$breakpoint-names:\s*\(([^)]*)\)/
      .exec(scss)?.[1]
      .split(',')
      .map((name) => name.trim());

    expect(names).toEqual(RESPONSIVE_BREAKPOINTS);
  });

  describe('getResponsiveValues', () => {
    it('returns the plain prop as xs and breakpoint overrides mobile-first', () => {
      const props: BreakpointSupport<Props> = { align: 'end', lg: { align: 'start' }, sm: { align: 'end' } };
      expect(getResponsiveValues<Props, 'align'>(props, 'align')).toEqual([
        ['xs', 'end'],
        ['sm', 'end'],
        ['lg', 'start'],
      ]);
    });

    it('uses the default as the xs value when the plain prop is not set', () => {
      expect(getResponsiveValues<Props, 'align'>({ md: { align: 'end' } }, 'align', 'start')).toEqual([
        ['xs', 'start'],
        ['md', 'end'],
      ]);
    });

    it('returns nothing when the prop is not set anywhere and has no default', () => {
      expect(getResponsiveValues<Props, 'align'>({}, 'align')).toEqual([]);
    });
  });

  describe('getValuePerBreakpoint', () => {
    it('keeps the previous value where a breakpoint has none, and nothing before the first', () => {
      expect(
        getValuePerBreakpoint<number>([
          ['md', 3],
          ['xl', 4],
        ])
      ).toEqual([
        ['xs', undefined],
        ['sm', undefined],
        ['md', 3],
        ['lg', 3],
        ['xl', 4],
        ['xxl', 4],
      ]);
    });
  });

  describe('getSwitchPoints', () => {
    const isPositive = (value = 0) => value > 0;

    it('lists where the state changes, starting off', () => {
      expect(
        getSwitchPoints<number>(
          [
            ['xs', 3],
            ['md', 0],
            ['xl', 2],
          ],
          isPositive
        )
      ).toEqual([
        ['xs', true],
        ['md', false],
        ['xl', true],
      ]);
    });

    it('lists nothing when the state never changes', () => {
      expect(getSwitchPoints<number>([], isPositive)).toEqual([]);
      expect(
        getSwitchPoints<number>(
          [
            ['sm', 2],
            ['lg', 5],
          ],
          isPositive,
          true
        )
      ).toEqual([
        ['xs', false],
        ['sm', true],
      ]);
    });
  });

  describe('getResponsiveClassNames', () => {
    const styles = {
      'x-start': 'x-start',
      'x-end-from-md': 'x-end-from-md',
    };

    it('maps the base value to a plain class and overrides to from-<breakpoint> classes', () => {
      expect(
        getResponsiveClassNames(styles, 'x', [
          ['xs', 'start'],
          ['md', 'end'],
        ])
      ).toEqual(['x-start', 'x-end-from-md']);
    });
  });
});
