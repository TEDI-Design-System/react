import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../helpers';
import { UnknownType } from '../../../types/commonTypes';
import { Button } from '../../buttons/button/button';
import { Calendar } from '../../content/calendar/calendar';
import { CalendarView } from '../date-field/date-field';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import { TimePicker } from '../time-picker/time-picker';
import styles from './date-time-field.module.scss';

const POPUP_OFFSET = 4;
const POPUP_PADDING = 8;

export type DateTimeFieldStep = 'date' | 'time';
export type DateTimeFieldLayout = 'side-by-side' | 'multi-step';
export type DateTimeFieldMode = 'single' | 'range';

/**
 * Range value shape for `mode='range'`. Each side carries both a date and
 * a time component — the `from` / `to` `Date` objects include the time
 * picked from the corresponding time picker in the popover.
 */
export interface DateTimeRange {
  from?: Date;
  to?: Date;
}

export type DateTimeFieldValue = Date | DateTimeRange;

/**
 * Per-breakpoint overridable props. Each can be set on the component
 * directly (applies at all breakpoints) or via the `xs / sm / md / lg /
 * xl / xxl` keys to override at a specific breakpoint — typical use is
 * `useNativePicker` on mobile + custom popover on desktop, or
 * `layout='multi-step'` on mobile + `'side-by-side'` on desktop.
 */
type DateTimeFieldBreakpointProps = {
  /**
   * When `true`, renders an `<input type="datetime-local">` and skips the
   * custom popover entirely — the browser's built-in date/time picker is
   * shown when the calendar icon is clicked. Useful on mobile where the
   * native picker is the platform-idiomatic UX. Has no effect when
   * `mode='range'` (native datetime-local has no range counterpart).
   * @default false
   */
  useNativePicker?: boolean;
  /**
   * Layout of the date-and-time popover. See `DateTimeFieldLayout`.
   * @default 'side-by-side'
   */
  layout?: DateTimeFieldLayout;
  /**
   * Predefined time slots, each in `"HH:mm"` format. When provided, the
   * time step renders a grid of slots instead of the scroll-wheel picker.
   */
  availableTimes?: string[];
  /**
   * Layout variant for the time grid when `availableTimes` is set.
   * Defaults differ per layout: `'button'` for `side-by-side`, `'radio'`
   * for `multi-step`.
   */
  timeGridVariant?: 'button' | 'radio';
  /**
   * How the month/year selector in the calendar header is rendered.
   * @default 'dropdown'
   */
  monthYearSelectType?: 'dropdown' | 'grid';
  /**
   * Show days from adjacent months in the calendar grid.
   * @default true
   */
  showOutsideDays?: boolean;
  /**
   * Heading rendered above the time picker in the side-by-side layout.
   * @default 'Time'
   */
  timeHeading?: React.ReactNode;
};

export interface DateTimeFieldProps extends BreakpointSupport<DateTimeFieldBreakpointProps> {
  /**
   * Unique identifier for the input field.
   */
  id: string;
  /**
   * Field label. Required for accessibility.
   */
  label: string;
  /**
   * Placeholder shown in the input when no value is selected.
   */
  placeholder?: string;
  /**
   * Additional class on the container.
   */
  className?: string;
  /**
   * Selection mode.
   * - `'single'` (default) — one combined `Date` value.
   * - `'range'` — pair of `from` / `to` `Date` values, each carrying their
   *   own time. Renders a 2-month calendar and two time pickers (one for
   *   `from`, one for `to`) stacked underneath.
   * @default 'single'
   */
  mode?: DateTimeFieldMode;
  /**
   * Controlled value. Type depends on `mode`:
   * - `mode='single'` → `Date | undefined`
   * - `mode='range'` → `DateTimeRange | undefined` (`{ from, to }`)
   */
  value?: DateTimeFieldValue;
  /**
   * Initial value for uncontrolled usage. Ignored when `value` is provided.
   */
  defaultValue?: DateTimeFieldValue;
  /**
   * Fires whenever the user picks a date or a time. The argument shape
   * matches `mode`: `Date | undefined` for `'single'`,
   * `DateTimeRange | undefined` for `'range'`.
   */
  onChange?: (value: DateTimeFieldValue | undefined) => void;
  /**
   * Marks the field as required.
   * @default false
   */
  required?: boolean;
  /**
   * When `true`, the input is read-only — typing is disabled, but the
   * picker can still be opened.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Disables the input and the picker.
   * @default false
   */
  disabled?: boolean;
  /**
   * Minimum selectable date. Dates before this are disabled in the calendar.
   */
  minDate?: Date;
  /**
   * Maximum selectable date. Dates after this are disabled in the calendar.
   */
  maxDate?: Date;
  /**
   * Disables every date strictly before today.
   */
  disablePast?: boolean;
  /**
   * Disables every date strictly after today.
   */
  disableFuture?: boolean;
  /**
   * Step interval (minutes) for the time-wheel picker. Ignored when
   * `availableTimes` is set.
   * @default 15
   */
  stepMinutes?: number;
  /**
   * Initial month displayed when the calendar opens. Defaults to the
   * month of the current value, or the current month if no value.
   */
  initialMonth?: Date;
  /**
   * Locale object used by react-day-picker for the calendar grid.
   * @default Estonian
   */
  locale?: Locale;
  /**
   * Locale code used for the displayed date format.
   * @default 'et-EE'
   */
  localeCode?: string;
  /**
   * Label of the "Select time" footer button under the calendar.
   * @default 'Select time'
   */
  selectTimeLabel?: string;
  /**
   * Label of the "Back" link shown above the time picker.
   * @default 'Back'
   */
  backLabel?: string;
  /**
   * Forwarded to the underlying `TextField`. `id`, `label`, `value`, and
   * `onChange` are owned by `DateTimeField`.
   */
  inputProps?: Omit<TextFieldProps, 'id' | 'label' | 'value' | 'onChange'>;
}

const pad = (n: number) => String(n).padStart(2, '0');

const getTimeOf = (d: Date | undefined): string => {
  if (!d) return '00:00';
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const combineDateTime = (date: Date, time: string): Date => {
  const [hStr, mStr] = time.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  const result = new Date(date);
  result.setHours(Number.isFinite(h) ? h : 0, Number.isFinite(m) ? m : 0, 0, 0);
  return result;
};

const isDate = (val: unknown): val is Date => val instanceof Date;

// Format a Date as the value `<input type="datetime-local">` expects:
// "YYYY-MM-DDTHH:mm" (local timezone, no seconds/offset).
const formatNativeValue = (d: Date | undefined): string => {
  if (!d) return '';
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Parse the string a native datetime-local input emits. Browsers send
// either "YYYY-MM-DDTHH:mm" or "YYYY-MM-DDTHH:mm:ss"; both round-trip
// through the Date constructor in the user's local timezone.
const parseNativeValue = (input: string): Date | undefined => {
  if (!input) return undefined;
  const date = new Date(input);
  return isNaN(date.getTime()) ? undefined : date;
};

// Coerce the loose `Date | DateTimeRange | undefined` value union into a
// guaranteed `DateTimeRange` shape. When the consumer is using `single` mode
// but happens to pass nothing / a Date, we fall back to `{}` here.
const asRange = (val: DateTimeFieldValue | undefined): DateTimeRange => {
  if (!val || isDate(val)) return {};
  return val;
};

const asSingle = (val: DateTimeFieldValue | undefined): Date | undefined => (isDate(val) ? val : undefined);

export const DateTimeField: React.FC<DateTimeFieldProps> = (props) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  // Mobile detection for range mode: a 2-month calendar (~640px wide)
  // doesn't fit on most phones, so we collapse to a single visible month
  // below the `md` breakpoint and let the user navigate between months
  // with the calendar's existing < / > arrows.
  const breakpoint = useBreakpoint(props.defaultServerBreakpoint);
  const isMobile = isBreakpointBelow(breakpoint, 'md');
  const {
    layout = 'side-by-side',
    useNativePicker = false,
    monthYearSelectType = 'dropdown',
    timeGridVariant,
    showOutsideDays = true,
    availableTimes,
    timeHeading = 'Time',
  } = getCurrentBreakpointProps<DateTimeFieldBreakpointProps>(props);

  const {
    id,
    label,
    placeholder,
    className,
    value,
    defaultValue,
    onChange,
    required,
    readOnly,
    disabled,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    stepMinutes = 15,
    initialMonth,
    locale = et,
    localeCode = 'et-EE',
    selectTimeLabel = 'Select time',
    backLabel = 'Back',
    mode = 'single',
    inputProps,
  } = props;

  const isRange = mode === 'range';
  // Native datetime-local doesn't support ranges, so even if the consumer
  // requests it for range mode we silently fall back to the custom popover
  // (which does support ranges). Keep `useNative` separate so the rest of
  // the component can branch on the resolved-and-validated value.
  const useNative = useNativePicker && !isRange;
  // Range mode forces side-by-side layout regardless of `layout` — the
  // multi-step affordance only makes sense for a single date+time.
  const effectiveLayout: DateTimeFieldLayout = isRange ? 'side-by-side' : layout;
  // The grid variants in the Figma differ per layout: side-by-side uses
  // plain buttons, multi-step uses radio cards. Keep the prop overridable
  // but pick a sensible default per layout when the consumer doesn't care.
  const resolvedGridVariant: 'button' | 'radio' =
    timeGridVariant ?? (effectiveLayout === 'multi-step' ? 'radio' : 'button');
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<DateTimeFieldValue | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;
  const rangeValue = isRange ? asRange(currentValue) : ({} as DateTimeRange);
  const singleValue = isRange ? undefined : asSingle(currentValue);

  const [open, setOpen] = useState(false);
  // Multi-step popover: 'date' shows the calendar with a "Select time" footer;
  // 'time' shows a back-link + TimePicker. Resets to 'date' on close so
  // reopening always starts at the calendar.
  const [step, setStep] = useState<DateTimeFieldStep>('date');
  const [view, setView] = useState<CalendarView>('days');
  // Pivot date that anchors the calendar's currently visible month — for
  // range it follows the `from` date, for single it follows the value.
  const monthAnchor = isRange ? rangeValue.from : singleValue;
  const [currentMonth, setCurrentMonth] = useState<Date>(() => monthAnchor ?? initialMonth ?? new Date());

  useEffect(() => {
    if (!open) {
      setStep('date');
      setView('days');
      setCurrentMonth(monthAnchor ?? initialMonth ?? new Date());
    }
    // monthAnchor changes whenever currentValue changes; keep the deps
    // explicit so this still re-fires on unrelated value updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentValue, initialMonth]);

  // Pull controlled value updates into the internal mirror so the displayed
  // input text re-formats whenever the parent changes the date.
  useEffect(() => {
    if (isControlled) setInternalValue(value);
  }, [isControlled, value]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(localeCode, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    [localeCode]
  );

  // Short-year formatter for the multi-step time-step header — matches the
  // Figma reference which shows "01.09.25" (2-digit year) next to the back
  // link, not the full 4-digit year used in the input value.
  const shortDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(localeCode, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }),
    [localeCode]
  );

  const formatSingle = useCallback(
    (d: Date | undefined): string => {
      if (!d) return '';
      return `${dateFormatter.format(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    },
    [dateFormatter]
  );

  const formatValue = useCallback(
    (val: DateTimeFieldValue | undefined): string => {
      if (!val) return '';
      if (isDate(val)) return formatSingle(val);
      const from = formatSingle(val.from);
      const to = formatSingle(val.to);
      if (!from && !to) return '';
      if (!to) return from;
      if (!from) return to;
      return `${from} – ${to}`;
    },
    [formatSingle]
  );

  // Locale-aware parser: derive the date portion from the same Intl
  // formatter used for display, then require " HH:mm" after it. This way the
  // field round-trips correctly in any locale (et-EE: dd.MM.yyyy HH:mm,
  // en-US: MM/dd/yyyy HH:mm, etc.).
  const parseDateTimeText = useMemo(() => {
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

    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const datePart = fieldOrder
      .map((field, i) => {
        const digits = field === 'year' ? '\\d{4}' : '\\d{2}';
        const sep = i > 0 ? escapeRegex(separators[i - 1] ?? '') : '';
        return `${sep}(${digits})`;
      })
      .join('');
    const regex = new RegExp(`^${datePart}\\s+(\\d{2}):(\\d{2})$`);

    return (input: string): Date | undefined => {
      const match = input.trim().match(regex);
      if (!match) return undefined;

      const values: Partial<Record<'day' | 'month' | 'year', number>> = {};
      fieldOrder.forEach((field, i) => {
        values[field] = Number(match[i + 1]);
      });
      const hour = Number(match[fieldOrder.length + 1]);
      const minute = Number(match[fieldOrder.length + 2]);

      const { day, month, year } = values;
      if (day === undefined || month === undefined || year === undefined) return undefined;
      if (hour > 23 || minute > 59) return undefined;

      const date = new Date(year, month - 1, day, hour, minute, 0, 0);
      if (
        isNaN(date.getTime()) ||
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return undefined;
      }
      return date;
    };
  }, [dateFormatter]);

  const [inputText, setInputText] = useState<string>(() => formatValue(currentValue));

  useEffect(() => {
    setInputText(formatValue(currentValue));
  }, [currentValue, formatValue]);

  // The TextField itself owns the helper / aria-describedby plumbing when
  // a `helper` is forwarded via `inputProps`, so we don't need a parallel
  // ID here.

  // Floating UI — single popover whose content swaps based on `step`. We
  // intentionally don't wire up `useClick` so clicking the trigger doesn't
  // open the menu; opening is handled exclusively via the calendar icon
  // (matching DateField's default behaviour).
  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-end',
    middleware: [
      offset(POPUP_OFFSET),
      flip(),
      shift({ padding: POPUP_PADDING }),
      // Cap the popover to the available viewport width so the
      // side-by-side layout (calendar ~312px + time picker ~192px) doesn't
      // overflow on small screens. Combined with the mobile-stacking SCSS
      // below `md`, the calendar and time picker stack vertically when
      // there isn't enough horizontal space.
      size({
        padding: POPUP_PADDING,
        apply({ availableWidth, elements }) {
          elements.floating.style.maxWidth = `${availableWidth}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const { refs, context, x, y, strategy } = floating;
  const interactions = useInteractions([useDismiss(context), useRole(context, { role: 'dialog' })]);

  const textFieldRef = React.useRef<TextFieldForwardRef | null>(null);

  useEffect(() => {
    if (textFieldRef.current?.inner) {
      refs.setReference(textFieldRef.current.inner);
    }
  }, [refs]);

  const updateValue = (next: DateTimeFieldValue | undefined) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setInputText(formatValue(next));
  };

  // Calendar-side select: commit the date portion immediately so the field
  // updates in real time, but keep the popover open so the user can advance
  // to the time step via the footer button.
  const handleCalendarSelect: OnSelectHandler<Date | Date[] | DateRange | undefined> = (selected) => {
    if (isRange) {
      // react-day-picker's `mode='range'` callback hands back a DateRange.
      const range = selected as DateRange | undefined;
      if (!range || (!range.from && !range.to)) {
        updateValue(undefined);
        return;
      }
      const fromTime = getTimeOf(rangeValue.from);
      const toTime = getTimeOf(rangeValue.to);
      const next: DateTimeRange = {};
      if (range.from) next.from = combineDateTime(range.from, fromTime);
      if (range.to) next.to = combineDateTime(range.to, toTime);
      updateValue(next);
      return;
    }
    if (selected instanceof Date) {
      updateValue(combineDateTime(selected, getTimeOf(singleValue)));
    } else if (selected === undefined) {
      updateValue(undefined);
    }
  };

  const handleApplyValue = (date: Date) => {
    if (isRange) {
      // Month/year-grid taps in range mode update the `from` date and keep
      // the existing time. Switching to a new from-month also clears `to`
      // because the existing range may no longer be valid.
      updateValue({ from: combineDateTime(date, getTimeOf(rangeValue.from)) });
      return;
    }
    updateValue(combineDateTime(date, getTimeOf(singleValue)));
  };

  const handleTimeSelect = (time: string) => {
    const baseDate = singleValue ?? new Date();
    updateValue(combineDateTime(baseDate, time));
    // Auto-close only in multi-step + discrete-slot mode where picking a
    // time is the user's final action. In side-by-side they may still want
    // to change the date afterwards, so the popover stays open.
    if (effectiveLayout === 'multi-step' && availableTimes) setOpen(false);
  };

  const handleRangeTimeSelect = (kind: 'from' | 'to') => (time: string) => {
    const baseDate = rangeValue[kind] ?? rangeValue.from ?? new Date();
    updateValue({ ...rangeValue, [kind]: combineDateTime(baseDate, time) });
  };

  const handleInputChange = (newText: string) => {
    setInputText(newText);

    if (newText === '') {
      updateValue(undefined);
      return;
    }

    // Native datetime-local emits ISO-local strings ("YYYY-MM-DDTHH:mm")
    // — parse those directly and skip the locale-formatted parser.
    if (useNative) {
      const parsed = parseNativeValue(newText);
      if (!parsed) return;
      updateValue(parsed);
      setCurrentMonth(parsed);
      return;
    }

    // Range parsing isn't supported — the displayed value
    // ("dd.MM.yyyy HH:mm – dd.MM.yyyy HH:mm") is intentionally
    // picker-driven only. Skip the single-mode parser here.
    if (isRange) return;

    const parsed = parseDateTimeText(newText);
    if (!parsed) return;

    updateValue(parsed);
    setCurrentMonth(parsed);
  };

  // Open the browser's native datetime-local picker (Chrome/Edge/Safari)
  // via `showPicker()`, falling back to focusing the input on browsers
  // without that API. Same pattern as TimeField's native trigger.
  const openNativePicker = () => {
    const input = textFieldRef.current?.input as HTMLInputElement | undefined;
    if (!input) return;
    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }
    input.focus();
  };

  const handleIconClick = () => {
    if (readOnly || disabled) return;
    if (useNative) {
      openNativePicker();
      return;
    }
    setOpen((prev) => !prev);
  };

  const disabledMatchers: Matcher[] = [];
  if (minDate) disabledMatchers.push({ before: minDate });
  if (maxDate) disabledMatchers.push({ after: maxDate });
  if (disablePast) disabledMatchers.push({ before: new Date() });
  if (disableFuture) disabledMatchers.push({ after: new Date() });

  // The "Select time" footer link belongs to the multi-step layout — it's
  // the affordance that swaps the popover's content from calendar to time
  // picker. In side-by-side the time picker is already visible alongside,
  // so no footer link is needed.
  //
  // The wrapping div centers the button horizontally; the calendar's own
  // `__footer` class already supplies the `border-top` separator and the
  // surrounding padding (see `calendar.module.scss`), so we don't add
  // another one here.
  const calendarFooter =
    effectiveLayout === 'multi-step' ? (
      <div className={styles['tedi-date-time-field__select-time-wrapper']}>
        <Button type="button" visualType="link" iconLeft="schedule" onClick={() => setStep('time')}>
          {selectTimeLabel}
        </Button>
      </div>
    ) : undefined;

  const calendarElement = (
    <Calendar
      view={view}
      setView={setView}
      selectionLevel="days"
      currentMonth={currentMonth}
      setCurrentMonth={setCurrentMonth}
      mode={isRange ? 'range' : 'single'}
      // Cast: react-day-picker's `DateRange` requires `from`, but the
      // user might land here mid-pick with neither side set yet — Calendar
      // tolerates `{}` at runtime. Cast keeps the prop happy without
      // forcing a synthetic `from: undefined as Date` upstream.
      value={isRange ? (rangeValue as DateRange) : singleValue}
      // Range mode shows two months side-by-side natively in
      // react-day-picker, matching the Figma "Range" frames. On mobile
      // (below `md`) we collapse to a single visible month so the
      // popover doesn't have to be wider than the device — the user
      // navigates between months with the calendar's < / > arrows.
      numberOfMonths={isRange && !isMobile ? 2 : 1}
      locale={locale}
      localeCode={localeCode}
      showOutsideDays={showOutsideDays}
      monthYearSelectType={monthYearSelectType}
      disabledMatchers={disabledMatchers.length ? disabledMatchers : undefined}
      required={required}
      handleSelect={handleCalendarSelect}
      applyValue={handleApplyValue}
      footer={calendarFooter}
      className={cn(
        styles['tedi-date-time-field__calendar'],
        effectiveLayout === 'side-by-side' && styles['tedi-date-time-field__calendar--split']
      )}
    />
  );

  // Render mode is wheel when no `availableTimes` are provided (TimePicker
  // falls back to TimeWheel internally) — used to apply a wheel-only
  // stretch class so the wheel fills the popover in multi-step without
  // also stretching the grid (which would blow up the radio-card slots).
  const isWheelMode = !availableTimes || availableTimes.length === 0;

  const timePickerElement = (
    <TimePicker
      value={getTimeOf(singleValue)}
      stepMinutes={stepMinutes}
      availableTimes={availableTimes}
      gridVariant={resolvedGridVariant}
      onChange={handleTimeSelect}
      className={cn(styles['tedi-date-time-field__time-picker'], {
        [styles['tedi-date-time-field__time-picker--wheel']]: isWheelMode,
      })}
    />
  );

  // For range mode we render two separate TimePicker instances bound to
  // the `from` and `to` halves of the range. Factory keeps the markup DRY.
  const renderRangeTimePicker = (kind: 'from' | 'to') => (
    <TimePicker
      value={getTimeOf(rangeValue[kind])}
      stepMinutes={stepMinutes}
      availableTimes={availableTimes}
      gridVariant={resolvedGridVariant}
      onChange={handleRangeTimeSelect(kind)}
      className={cn(styles['tedi-date-time-field__time-picker'], {
        [styles['tedi-date-time-field__time-picker--wheel']]: isWheelMode,
      })}
    />
  );

  const textFieldProps: TextFieldProps = {
    ...(inputProps as TextFieldProps),
    id,
    label,
    // Native picker takes precedence: the input value must follow the
    // datetime-local ISO format ("YYYY-MM-DDTHH:mm") for the browser's
    // built-in picker to recognise it; the locale-formatted text is only
    // used by the custom popover path.
    value: useNative ? formatNativeValue(singleValue) : inputText,
    placeholder,
    readOnly: readOnly || (!useNative && !!availableTimes && !!currentValue),
    icon: 'calendar_today',
    isClearable: true,
    required,
    disabled,
    onIconClick: handleIconClick,
    onChange: handleInputChange,
    className: cn(styles['tedi-date-time-field__textfield'], inputProps?.className, {
      [styles['tedi-date-time-field__icon--disabled']]: disabled || readOnly,
    }),
    input: {
      ...(inputProps?.input as UnknownType),
      type: useNative ? 'datetime-local' : 'text',
      'aria-expanded': useNative ? undefined : open,
    },
  };

  return (
    <>
      <div className={cn(styles['tedi-date-time-field__container'], className)} aria-haspopup="dialog">
        <TextField ref={textFieldRef} {...textFieldProps} />
      </div>

      {/*
        When useNativePicker is on, the browser's built-in datetime-local
        picker is the entire UI — skip the custom popover so we don't
        double-render two pickers stacked on top of each other.
      */}
      {!useNative && (
        <FloatingPortal>
          {open && !disabled && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                ref={refs.setFloating}
                className={styles['tedi-date-time-field__popup']}
                {...interactions.getFloatingProps({
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                })}
              >
                {isRange ? (
                  // Range layout: 2-month calendar on top, two time pickers
                  // (from / to) stacked below in a single popover card.
                  // Matches the Figma "Range" frames (node 42943:146342).
                  <div className={styles['tedi-date-time-field__range']}>
                    {calendarElement}
                    <div className={styles['tedi-date-time-field__range-separator']} aria-hidden="true">
                      <div className={styles['tedi-date-time-field__range-separator-line']} />
                    </div>
                    <div className={styles['tedi-date-time-field__range-times']}>
                      <div className={styles['tedi-date-time-field__range-time']}>
                        <div className={styles['tedi-date-time-field__split-time-header']}>
                          <span className={styles['tedi-date-time-field__split-heading']}>{timeHeading}</span>
                        </div>
                        <div className={styles['tedi-date-time-field__split-time-body']}>
                          {renderRangeTimePicker('from')}
                        </div>
                      </div>
                      <div className={styles['tedi-date-time-field__range-time']}>
                        <div className={styles['tedi-date-time-field__split-time-header']}>
                          <span className={styles['tedi-date-time-field__split-heading']}>{timeHeading}</span>
                        </div>
                        <div className={styles['tedi-date-time-field__split-time-body']}>
                          {renderRangeTimePicker('to')}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : effectiveLayout === 'side-by-side' ? (
                  // Calendar + TimePicker share a single card. The Calendar's
                  // own border / radius / shadow are stripped via the
                  // `--split` modifier so the unified popover surface is what
                  // the user sees. The vertical separator is a 1px line with
                  // top/bottom padding equal to the card padding (matching
                  // the Figma "Separator vertical" frame), not a full-height
                  // border-left, so the line ends short of the card edges.
                  <div className={styles['tedi-date-time-field__split']}>
                    {calendarElement}
                    <div className={styles['tedi-date-time-field__split-separator']} aria-hidden="true">
                      <div className={styles['tedi-date-time-field__split-separator-line']} />
                    </div>
                    <div className={styles['tedi-date-time-field__split-time']}>
                      <div className={styles['tedi-date-time-field__split-time-header']}>
                        <span className={styles['tedi-date-time-field__split-heading']}>{timeHeading}</span>
                      </div>
                      <div className={styles['tedi-date-time-field__split-time-body']}>{timePickerElement}</div>
                    </div>
                  </div>
                ) : step === 'date' ? (
                  calendarElement
                ) : (
                  // Multi-step time popover: a single bordered card with two
                  // sections — header (back link on the left, selected date on
                  // the right) and body (the time picker). The inner
                  // TimePicker's own border / padding / shadow are stripped
                  // via the nested `__time-picker` rule in SCSS so the card
                  // surface comes from `__time-step` alone (no double card).
                  <div className={styles['tedi-date-time-field__time-step']}>
                    <header className={styles['tedi-date-time-field__time-header']}>
                      <Button type="button" visualType="link" iconLeft="arrow_back" onClick={() => setStep('date')}>
                        {backLabel}
                      </Button>
                      {/*
                      Always show the date the time pick will be associated
                      with. If the user hasn't explicitly picked a date,
                      `handleTimeSelect` falls back to `new Date()` (today)
                      when committing — so the header mirrors that fallback
                      and shows today's date as the implied selection
                      instead of being empty (previously it stayed blank
                      until the user backed out, picked a date, and came
                      back, even though the eventual commit would still use
                      today).
                    */}
                      <span className={styles['tedi-date-time-field__time-date']}>
                        {shortDateFormatter.format(singleValue ?? new Date())}
                      </span>
                    </header>
                    <div className={styles['tedi-date-time-field__time-body']}>{timePickerElement}</div>
                  </div>
                )}
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      )}
    </>
  );
};

DateTimeField.displayName = 'DateTimeField';

export default DateTimeField;
