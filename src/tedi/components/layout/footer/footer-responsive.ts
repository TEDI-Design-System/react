import { Breakpoint, breakpoints, BreakpointSupport } from '../../../helpers';

/**
 * Breakpoints a layout can switch at. `xs` is left out because nothing is below it.
 * Matches `$breakpoint-names` in `styles/_breakpoint-classes.scss`.
 */
export const RESPONSIVE_BREAKPOINTS: Breakpoint[] = breakpoints.filter((bp) => bp !== 'xs');

/**
 * Values of one responsive prop in mobile-first order: the plain prop is the `xs` value and the
 * `sm`/`md`/... keys add the values that apply from that breakpoint up.
 */
export const getResponsiveValues = <T extends object, K extends keyof T>(
  props: BreakpointSupport<T>,
  key: K,
  defaultValue?: T[K]
): [Breakpoint, NonNullable<T[K]>][] => {
  const entries: [Breakpoint, NonNullable<T[K]>][] = [];
  const base = props[key] ?? defaultValue;
  if (base !== undefined && base !== null) entries.push(['xs', base as NonNullable<T[K]>]);

  RESPONSIVE_BREAKPOINTS.forEach((bp) => {
    const value = (props[bp as Exclude<Breakpoint, 'xs'>] as Partial<T> | undefined)?.[key];
    if (value !== undefined && value !== null) entries.push([bp, value as NonNullable<T[K]>]);
  });

  return entries;
};

/**
 * The value that applies at every breakpoint. The values are mobile-first, so a breakpoint without its own keeps
 * the previous one (`undefined` before the first).
 */
export const getValuePerBreakpoint = <V>(entries: [Breakpoint, V][]): [Breakpoint, V | undefined][] => {
  let current: V | undefined;

  return breakpoints.map((bp) => {
    current = entries.find(([entryBp]) => entryBp === bp)?.[1] ?? current;
    return [bp, current];
  });
};

/**
 * The breakpoints where `isOn` changes for the value that applies there, with the new state. Together with the
 * state it starts in (`startsOn`), that is all CSS needs to switch something on and off.
 */
export const getSwitchPoints = <V>(
  entries: [Breakpoint, V][],
  isOn: (value: V | undefined) => boolean,
  startsOn = false
): [Breakpoint, boolean][] => {
  const points: [Breakpoint, boolean][] = [];
  let state = startsOn;

  getValuePerBreakpoint(entries).forEach(([bp, value]) => {
    if (isOn(value) !== state) {
      state = !state;
      points.push([bp, state]);
    }
  });

  return points;
};

/**
 * CSS-module class names for a responsive prop: `<prefix>-<value>` for the base value and
 * `<prefix>-<value>-from-<breakpoint>` for each breakpoint override (see `from-modifiers`).
 */
export const getResponsiveClassNames = (
  styles: Record<string, string>,
  prefix: string,
  entries: [Breakpoint, string][]
): string[] =>
  entries.map(([bp, value]) => styles[bp === 'xs' ? `${prefix}-${value}` : `${prefix}-${value}-from-${bp}`]);
