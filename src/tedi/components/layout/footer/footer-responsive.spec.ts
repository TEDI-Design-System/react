import { BreakpointSupport } from '../../../helpers';
import { getResponsiveClassNames, getResponsiveValues, RESPONSIVE_BREAKPOINTS } from './footer-responsive';

type Props = { align?: 'start' | 'end' };

describe('footer-responsive', () => {
  it('lists every breakpoint except xs', () => {
    expect(RESPONSIVE_BREAKPOINTS).toEqual(['sm', 'md', 'lg', 'xl', 'xxl']);
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
