import { debounce } from 'lodash-es';
import { useLayoutEffect, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/**
 * Minimum viewport width (as a CSS length string) at which each TEDI breakpoint
 * activates. `xs` starts at 0 — i.e. anything below `sm`. Used by `useBreakpoint`
 * for `matchMedia` checks and by other components (e.g. `HorizontalNav`) that
 * need to translate a breakpoint name into a pixel/rem width.
 */
export const BREAKPOINT_WIDTHS: Record<Breakpoint, string> = {
  xs: '0',
  sm: '36rem',
  md: '48rem',
  lg: '62rem',
  xl: '75rem',
  xxl: '87.5rem',
};

/**
 * @param defaultServerBreakpoint - Default breakpoint for SSR, the hook returns this breakpoint in the SSR.
 * @returns User's current breakpoint
 */
export const useBreakpoint = (defaultServerBreakpoint: Breakpoint = 'xs'): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(defaultServerBreakpoint);

  useLayoutEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.xxl})`).matches) {
        return 'xxl';
      } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.xl})`).matches) {
        return 'xl';
      } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.lg})`).matches) {
        return 'lg';
      } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.md})`).matches) {
        return 'md';
      } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.sm})`).matches) {
        return 'sm';
      } else {
        return 'xs';
      }
    };

    const resizeEvent = debounce((): void => {
      setBreakpoint(getBreakpoint());
    }, 20);

    // Set the initial breakpoint on the client
    setBreakpoint(getBreakpoint());

    window.addEventListener('resize', resizeEvent);
    return () => {
      resizeEvent.cancel();
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return breakpoint;
};

export const isBreakpointBelow = (current: Breakpoint | null, target: Breakpoint): boolean => {
  if (!current) return false;
  return breakpoints.indexOf(current) < breakpoints.indexOf(target);
};

export default useBreakpoint;
