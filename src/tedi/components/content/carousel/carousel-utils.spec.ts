import { normalizeBreakpointInput, resolveBreakpointValue } from './carousel-utils';

describe('carousel-utils', () => {
  describe('normalizeBreakpointInput', () => {
    it('wraps a plain value as { xs }', () => {
      expect(normalizeBreakpointInput(2)).toEqual({ xs: 2 });
    });

    it('passes a breakpoint object through unchanged', () => {
      const input = { xs: 1, md: 2.5, xl: 4 };
      expect(normalizeBreakpointInput(input)).toBe(input);
    });
  });

  describe('resolveBreakpointValue', () => {
    const input = { xs: 1, md: 2, xl: 4 };

    it('returns the value at the current breakpoint when defined', () => {
      expect(resolveBreakpointValue(input, 'xl')).toBe(4);
      expect(resolveBreakpointValue(input, 'md')).toBe(2);
    });

    it('falls back to the nearest smaller defined breakpoint', () => {
      expect(resolveBreakpointValue(input, 'lg')).toBe(2);
      expect(resolveBreakpointValue(input, 'xxl')).toBe(4);
    });

    it('falls back to xs below the first defined breakpoint', () => {
      expect(resolveBreakpointValue(input, 'sm')).toBe(1);
      expect(resolveBreakpointValue({ xs: 7 }, 'xxl')).toBe(7);
    });
  });
});
