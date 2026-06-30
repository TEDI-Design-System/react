import type { DateRange, Matcher } from 'react-day-picker';

/**
 * Floating-ui offset (in px) between the trigger input and the popover.
 * Shared by `DateField` and `DateTimeField` so the popovers sit at the
 * same distance from their triggers.
 */
export const CALENDAR_POPOVER_OFFSET = 4;

/**
 * Floating-ui shift / size middleware padding (in px) — keeps the popover
 * away from the viewport edges by this amount when the size middleware
 * caps its `maxWidth`.
 */
export const CALENDAR_POPOVER_PADDING = 8;

export type SelectedValueLike = Date | Date[] | DateRange | undefined;

const isDateRange = (val: SelectedValueLike): val is DateRange =>
  !!val && !Array.isArray(val) && !(val instanceof Date) && 'from' in val;

/**
 * Range-selection click resolver. react-day-picker's default `addToRange`
 * keeps a completed `{ from, to }` range and only moves one of its ends when
 * the user clicks again — so after picking a start and an end, clicking a new
 * start instead drags the existing end. That surprises users who expect a
 * fresh click to begin a new range.
 *
 * This normalises that: once a range is complete, the next click starts over
 * with `from` set to the clicked day and `to` cleared. While the range is
 * still being built (or empty), DayPicker's own result is passed through.
 *
 * @param computed - the range react-day-picker derived from the click
 * @param previous - the range that was selected before this click
 * @param clickedDay - the day the user just clicked
 */
export const resolveRangeSelection = (
  computed: SelectedValueLike,
  previous: SelectedValueLike,
  clickedDay: Date | undefined
): DateRange | undefined => {
  if (clickedDay && isDateRange(previous) && previous.from && previous.to) {
    return { from: clickedDay, to: undefined };
  }
  return isDateRange(computed) ? computed : undefined;
};

/**
 * Resolves the month the calendar should start on for any selection
 * shape. Used by both `DateField` (single / multiple / range Date(s)) and
 * `DateTimeField` (single Date or `{from, to}` range). For arrays the
 * earliest date wins; for ranges the `from` (or `to` if `from` is unset)
 * wins. Falls back to the explicit `fallback` and finally `new Date()`.
 */
export const getInitialMonth = (val: SelectedValueLike, fallback?: Date): Date => {
  if (val instanceof Date) return val;
  if (Array.isArray(val) && val.length > 0) {
    return [...val].sort((a, b) => a.getTime() - b.getTime())[0];
  }
  if (val && typeof val === 'object' && 'from' in val && val.from instanceof Date) return val.from;
  if (val && typeof val === 'object' && 'to' in val && val.to instanceof Date) return val.to;
  return fallback ?? new Date();
};

/**
 * Configuration for the `buildDisabledMatchers` helper. All fields are
 * forwarded as-is to react-day-picker. `shouldDisableMonth` /
 * `shouldDisableYear` are predicates passed to `DayPicker.disabled` to
 * disable a date when its month / year is "off limits".
 */
export interface DisabledMatcherInputs {
  disabled?: Matcher | Matcher[];
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  shouldDisableMonth?: (date: Date) => boolean;
  shouldDisableYear?: (date: Date) => boolean;
}

/**
 * Composes a flat `Matcher[]` array from the date-field-style constraint
 * props. Returns an empty array when nothing is set, which lets the
 * caller pass `matchers.length ? matchers : undefined` straight through.
 */
export const buildDisabledMatchers = (inputs: DisabledMatcherInputs): Matcher[] => {
  const matchers: Matcher[] = [];

  if (inputs.disabled) {
    if (Array.isArray(inputs.disabled)) matchers.push(...inputs.disabled);
    else matchers.push(inputs.disabled);
  }
  if (inputs.minDate) matchers.push({ before: inputs.minDate });
  if (inputs.maxDate) matchers.push({ after: inputs.maxDate });
  if (inputs.disablePast) matchers.push({ before: new Date() });
  if (inputs.disableFuture) matchers.push({ after: new Date() });
  if (inputs.shouldDisableMonth) matchers.push((d: Date) => inputs.shouldDisableMonth?.(d) ?? false);
  if (inputs.shouldDisableYear) matchers.push((d: Date) => inputs.shouldDisableYear?.(d) ?? false);

  return matchers;
};

/**
 * Field order + literal separators extracted from a locale's date format,
 * derived via `Intl.DateTimeFormat.formatToParts`. Used by parsers in
 * `DateField` (date-only) and `DateTimeField` (date + " HH:mm") to build
 * a regex that round-trips the displayed value in any locale.
 */
export interface LocaleDateParts {
  fieldOrder: ('day' | 'month' | 'year')[];
  separators: string[];
}

/**
 * Extract the date-portion field order and literal separators from a
 * `dateFormatter`. The reference date `Dec 31, 2099` is used because all
 * three components are unambiguously two-digit (day, month) / four-digit
 * (year) values, so each `formatToParts` entry is unambiguous.
 */
export const getLocaleDateParts = (dateFormatter: Intl.DateTimeFormat): LocaleDateParts => {
  const ref = new Date(2099, 11, 31);
  const parts = dateFormatter.formatToParts(ref);

  const fieldOrder: ('day' | 'month' | 'year')[] = [];
  const separators: string[] = [];
  for (const part of parts) {
    if (part.type === 'day' || part.type === 'month' || part.type === 'year') {
      fieldOrder.push(part.type);
    } else if (part.type === 'literal' && fieldOrder.length > 0 && separators.length < 2) {
      separators.push(part.value);
    }
  }
  return { fieldOrder, separators };
};

/**
 * Build the date-portion of a parsing regex from the locale's field
 * order and separators. Caller appends time / range separators as needed
 * — DateField uses `^${datePart}$`, DateTimeField uses `^${datePart}\s+(\d{2}):(\d{2})$`.
 */
export const buildDateRegexSource = ({ fieldOrder, separators }: LocaleDateParts): string => {
  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return fieldOrder
    .map((field, i) => {
      const digits = field === 'year' ? '\\d{4}' : '\\d{2}';
      const sep = i > 0 ? escapeRegex(separators[i - 1] ?? '') : '';
      return `${sep}(${digits})`;
    })
    .join('');
};
