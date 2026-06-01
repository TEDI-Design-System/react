import { debounce } from 'lodash-es';
import { useLayoutEffect, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/**
 * @param defaultServerBreakpoint - Default breakpoint for SSR, the hook returns this breakpoint in the SSR.
 * @returns User's current breakpoint
 */
export const useBreakpoint = (defaultServerBreakpoint: Breakpoint = 'xs'): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(defaultServerBreakpoint);

  useLayoutEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      if (window.matchMedia('(min-width: 87.5rem)').matches) {
        return 'xxl';
      } else if (window.matchMedia('(min-width: 75rem)').matches) {
        return 'xl';
      } else if (window.matchMedia('(min-width: 62rem)').matches) {
        return 'lg';
      } else if (window.matchMedia('(min-width: 48rem)').matches) {
        return 'md';
      } else if (window.matchMedia('(min-width: 36rem)').matches) {
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
