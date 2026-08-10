import * as React from 'react';

/**
 * DateTimeField — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/date-time-field/date-time-field.stories.tsx).
 */
export interface DateTimeFieldProps {
  /** Unique identifier for the input field. */
  id: string;
  /** Field label. Required for accessibility. */
  label: string;
  /** Placeholder shown in the input when no value is selected. */
  placeholder?: string;
  /** Additional class on the container. */
  className?: string;
  /** Selection mode. - `'single'` (default) — one combined `Date` value. - `'range'` — pair of `from` / `to` `Date` values, each carrying their own time. Renders a 2-month calendar and two time pickers (one for `from`, one for `to`) stacked underneath. */
  mode?: "single" | "range";
  /** Controlled value. Type depends on `mode`: - `mode='single'` → `Date | undefined` - `mode='range'` → `DateTimeRange | undefined` (`{ from, to }`) */
  value?: Date | DateTimeRange;
  /** Initial value for uncontrolled usage. Ignored when `value` is provided. */
  defaultValue?: Date | DateTimeRange;
  /** Fires whenever the user picks a date or a time. The argument shape matches `mode`: `Date | undefined` for `'single'`, `DateTimeRange | undefined` for `'range'`. */
  onChange?: (value: DateTimeFieldValue | undefined) => void;
  /** Marks the field as required. */
  required?: boolean;
  /** When `true`, the input is read-only — typing is disabled, but the picker can still be opened. */
  readOnly?: boolean;
  /** Disables the input and the picker. */
  disabled?: boolean;
  /** Minimum selectable date. Dates before this are disabled in the calendar. */
  minDate?: Date;
  /** Maximum selectable date. Dates after this are disabled in the calendar. */
  maxDate?: Date;
  /** Disables every date strictly before today. */
  disablePast?: boolean;
  /** Disables every date strictly after today. */
  disableFuture?: boolean;
  /** Disable specific dates via react-day-picker matchers. Layered on top of the `minDate` / `maxDate` / `disablePast` / `disableFuture` shortcuts — use this for free-form matchers like "every Sunday" or "specific blacklisted dates". Mirrors the `disabledMatchers` prop on `DateField`. */
  disabledMatchers?: boolean | ((date: Date) => boolean) | Date | Date[] | DateRange | DateBefore | DateAfter | DateInterval | DayOfWeek | Matcher[];
  /** Step interval (minutes) for the time-wheel picker. Ignored when `availableTimes` is set. */
  stepMinutes?: number;
  /** Initial month displayed when the calendar opens. Defaults to the month of the current value, or the current month if no value. */
  initialMonth?: Date;
  /** Locale object used by react-day-picker for the calendar grid. */
  locale?: DayPickerLocale;
  /** Locale code used for the displayed date format. */
  localeCode?: string;
  /** Label of the "Select time" footer button under the calendar in the multi-step layout. Falls back to the localised `dateTimeField.selectTime` label. */
  selectTimeLabel?: string;
  /** Label of the "Back" link shown above the time picker in the multi-step layout. Falls back to the localised `dateTimeField.back` label. */
  backLabel?: string;
  /** Lowest calendar drill-down level the user can pick from before the value commits. `'days'` (default) requires drilling all the way down to a day; `'months'` commits as soon as a month is picked; `'years'` commits on year selection. Only meaningful when `monthYearSelectType='grid'`. */
  selectionLevel?: "days" | "months" | "years";
  /** Forwarded to the underlying `TextField`. `id`, `label`, `value`, and `onChange` are owned by `DateTimeField`. */
  inputProps?: Omit<TextFieldProps, "label" | "value" | "id" | "onChange">;
  /** Error message rendered below the input when the user types a date that fails the disable matchers (`disablePast`, `disableFuture`, `minDate`, `maxDate`, `disabledMatchers`). Falls back to the localised `dateField.disabledDateError` label. */
  disabledDateErrorMessage?: string;
  /** When `true`, renders an `<input type="datetime-local">` and skips the custom popover entirely — the browser's built-in date/time picker is shown when the calendar icon is clicked. Has no effect when `mode='range'` (native datetime-local has no range counterpart). */
  useNativePicker?: boolean;
  /** Layout of the date-and-time popover. `mode='range'` always uses `'side-by-side'` regardless of this value — the range UI needs the calendar and both `from` / `to` time pickers visible at once. */
  layout?: "side-by-side" | "multi-step";
  /** Predefined time slots, each in `"HH:mm"` format. When provided, the time step renders a grid of slots instead of the scroll-wheel picker. Accepts either: - a static array — the same slot list for every date, - or a function `(date: Date) => string[]` evaluated per render with the currently-selected date. Use the function form when slots depend on the picked date (e.g. clinic appointments where Tuesdays differ from Wednesdays). In `mode='range'` the function is called twice: once with `rangeValue.from` for the `from` time picker, once with `rangeValue.to` for the `to` time picker. When no date is picked yet the function is called with today's date as a fallback. Returning an empty array currently falls back to the wheel picker — if you need a dedicated "no times available" UX, render it from the consumer side via `onChange` / `value` state for now. */
  availableTimes?: string[] | ((date: Date) => string[]);
  /** Layout variant for the time grid when `availableTimes` is set. Defaults differ per layout: `'button'` for `side-by-side`, `'radio'` for `multi-step`. */
  timeGridVariant?: "button" | "radio";
  /** How the month/year selector in the calendar header is rendered. */
  monthYearSelectType?: "dropdown" | "grid";
  /** Show days from adjacent months in the calendar grid. */
  showOutsideDays?: boolean;
  /** Heading rendered above the time picker in the side-by-side layout. Falls back to the localised `dateTimeField.timeHeading` label. */
  timeHeading?: React.ReactNode;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<DateTimeFieldBreakpointProps>;
  md?: Partial<DateTimeFieldBreakpointProps>;
  lg?: Partial<DateTimeFieldBreakpointProps>;
  xl?: Partial<DateTimeFieldBreakpointProps>;
  xxl?: Partial<DateTimeFieldBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type DateTimeFieldValue = Date | DateTimeRange;

interface DateTimeRange {
    from?: Date;
    to?: Date;
}

export declare const DateTimeField: React.ComponentType<DateTimeFieldProps>;
