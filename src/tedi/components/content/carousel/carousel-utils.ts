import { Breakpoint, breakpoints } from '../../../helpers/hooks/use-breakpoint';

export type BreakpointObject<T> = {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
};

/**
 * A value that is either fixed or varies per breakpoint, e.g. `2` or
 * `{ xs: 1, md: 2.5, xl: 4 }`.
 */
export type BreakpointInput<T> = T | BreakpointObject<T>;

/**
 * Normalizes a `BreakpointInput` into a `BreakpointObject`. A breakpoint-shaped
 * object — one that has at least one breakpoint key (`xs`/`sm`/`md`/…) — is returned
 * as-is; any other value (including a plain object that isn't breakpoint-shaped) is
 * wrapped as the base `xs` value.
 */
export const normalizeBreakpointInput = <T>(input: BreakpointInput<T>): BreakpointObject<T> =>
  typeof input === 'object' && input !== null && breakpoints.some((bp) => bp in (input as object))
    ? (input as BreakpointObject<T>)
    : ({ xs: input } as BreakpointObject<T>);

/**
 * Resolves the value for the current breakpoint: the largest breakpoint that is
 * defined and not above the current one, falling back to `xs`.
 */
export const resolveBreakpointValue = <T>(input: BreakpointObject<T>, current: Breakpoint): T => {
  const currentIndex = breakpoints.indexOf(current);

  for (let i = currentIndex; i >= 0; i--) {
    const value = input[breakpoints[i]];
    if (value !== undefined) {
      return value;
    }
  }

  return input.xs;
};
