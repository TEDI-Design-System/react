import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { dateMatchModifiers, DateRange, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../helpers';
import { UnknownType } from '../../../types/commonTypes';
import { Calendar } from '../../content/calendar/calendar';
import MultiValueField, { MultiValueFieldProps } from '../multi-value-field/multi-value-field';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './date-field.module.scss';
import {
  buildDateRegexSource,
  CALENDAR_POPOVER_OFFSET,
  CALENDAR_POPOVER_PADDING,
  getLocaleDateParts,
} from './date-field-helpers';

export type DateFieldMode = 'single' | 'multiple' | 'range';
export type CalendarView = 'days' | 'months' | 'years';
export type DateFieldCalendarTrigger = 'input' | 'button';
type DateTextFieldProps = Omit<TextFieldProps, 'label' | 'id'>;
type DateMultiValueFieldProps = Omit<MultiValueFieldProps, 'label' | 'id'>;

/**
 * Subset of DateField props that can be overridden per breakpoint via the
 * `BreakpointSupport` API (e.g. `<DateField useNativePicker md={{ useNativePicker: false }} />`).
 */
type DateFieldBreakpointProps = {
  /**
   * Whether the calendar popover is interactive.
   * @default true
   */
  enableCalendar?: boolean;
  /**
   * What opens the calendar — only the icon (`'button'`) or anywhere in the input (`'input'`).
   * @default button
   */
  calendarTrigger?: DateFieldCalendarTrigger;
  /**
   * Swap the custom calendar for the browser's native `<input type="date">`.
   * Only applies to `mode='single'`.
   * @default false
   */
  useNativePicker?: boolean;
  /**
   * Number of months shown side-by-side. On mobile (`< md`) values > 1 are
   * automatically clamped to 1 — the popover would otherwise be unscrollable
   * on a phone viewport.
   */
  numberOfMonths?: number;
};

export interface DateFieldProps
  extends BreakpointSupport<DateFieldBreakpointProps>,
    Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect' | 'numberOfMonths'> {
  /**
   * Unique identifier for the date field.
   */
  id: string;
  /**
   * Field label. Required for accessibility.
   */
  label: string;
  /**
   * Determines the selection mode of the calendar.
   * - `'single'` (default) – only one date can be selected. The `selected` prop should be a `Date` object or `undefined`.
   * - `'multiple'` – multiple individual dates can be selected. The `selected` prop should be an array of `Date` objects.
   * - `'range'` – a continuous date range can be selected. The `selected` prop should be an object with `from` and optional `to` properties, both being `Date` objects.
   *
   * @default single
   */
  mode?: DateFieldMode;
  /**
   * The currently selected date(s). The expected type depends on the `mode`:
   * - For `mode="single"`, this should be a `Date` object or `undefined`.
   * - For `mode="multiple"`, this should be an array of `Date` objects.
   * - For `mode="range"`, this should be an object with a `from` property (a `Date` object) and an optional `to` property (also a `Date` object).
   */
  selected?: Date | Date[] | DateRange | undefined;
  /**
   * Callback fired when the user selects a date or date range. The exact parameters depend on the `mode`:
   * - For `mode="single"`, the callback receives the selected `Date` object (or `undefined` if cleared).
   * - For `mode="multiple"`, the callback receives an array of selected `Date` objects.
   * - For `mode="range"`, the callback receives an object with `from` and optional `to` properties, both being `Date` objects (or `undefined` if cleared).
   */
  onSelect?: OnSelectHandler<Date | Date[] | DateRange | undefined>;
  /**
   * Disable specific dates. Accepts the same matchers as React DayPicker's `disabled` prop.
   */
  disabled?: Matcher | Matcher[];
  /**
   * Input placeholder text when no date is selected.
   */
  placeholder?: string;
  /**
   * Additional class name(s) to apply to the component container.
   */
  className?: string;
  /**
   * Custom date formatting function. Receives the selected date(s) and should return a string for display in the input field.
   * If not provided, a default formatter will be used that formats dates as "dd.MM.yyyy" in the "et-EE" locale.
   */
  formatDate?: (date: Date | Date[] | DateRange | undefined) => string;
  /**
   * Show days from adjacent months in the calendar view. Default is `true`.
   *
   * @default true
   */
  showOutsideDays?: boolean;
  /**
   * Custom date parsing function for user input. Receives the input string and should return a `Date`, an array of `Date`s, a `DateRange`, or `undefined` if the input is invalid or cleared.
   * If not provided, the component will not allow manual input and will rely solely on the calendar picker for date selection.
   */
  parseDate?: (value: string) => Date | Date[] | DateRange | undefined;
  /**
   * Initial month to display when the calendar is opened. If not provided, defaults to the month of the currently selected date or the current month if no date is selected.
   */
  initialMonth?: Date;
  /**
   * When `true`, the date field is marked as required, and the calendar will enforce that a date is selected before allowing the user to close it. Default is `false`.
   *
   * @default false
   */
  required?: boolean;
  /**
   * How the month/year selector in the calendar header is rendered.
   * Forwarded to the internal `Calendar` / `CalendarHeader`.
   * - `'dropdown'` (default) — each picker is a `<Select>` dropdown.
   * - `'grid'` — each picker opens a full grid of options.
   * @default dropdown
   */
  monthYearSelectType?: 'dropdown' | 'grid';
  /**
   * **Selection granularity** — controls the level at which a click finalises
   * the date selection rather than drilling further into days. Use a coarser
   * level when the consumer only needs to pick a year or a month.
   * - `'years'` — clicking a year selects Jan 1 of that year and closes; the
   *   calendar opens on the year grid.
   * - `'months'` — clicking a month selects the first day of that month; the
   *   calendar opens on the month grid.
   * - `'days'` (default) — full day-level selection; the calendar opens on
   *   the day grid as usual.
   *
   * Distinct from the *currently visible* grid — that's managed internally
   * and flips as the user navigates between year / month / day. This prop
   * is the lowest level the user can drill down to before a click commits.
   * @default 'days'
   */
  selectionLevel?: CalendarView;
  /**
   * The locale object for the calendar, used by React DayPicker. Defaults to Estonian locale.
   */
  locale?: Locale;
  /**
   * The locale code string used for date formatting. Defaults to 'et-EE'.
   */
  localeCode?: string;
  /**
   * When `true`, the calendar popover will automatically close after a date is selected. Default behavior is to close on select only in 'single' mode.
   * You can override this behavior by explicitly setting this prop to `true` or `false`.
   *
   * @default depends on mode (true for 'single', false for 'multiple' and 'range')
   */
  closeOnSelect?: boolean;
  /**
   * Custom footer content to display at the bottom of the calendar popover. Can be used to add action buttons or additional information.
   * The footer will be rendered inside the calendar popover, below the calendar grid.
   */
  footer?: React.ReactNode;
  /**
   * Initial value for uncontrolled usage
   */
  defaultValue?: Date | Date[] | DateRange;
  /**
   * Minimum selectable date. Dates before this will be disabled.
   * If you want to disable past dates, you can also use the `disablePast` boolean prop.
   */
  minDate?: Date;
  /**
   * Maximum selectable date. Dates after this will be disabled.
   * If you want to disable future dates, you can also use the `disableFuture` boolean prop.
   */
  maxDate?: Date;
  /**
   * Disable all past dates. Dates before the current date will be disabled.
   */
  disablePast?: boolean;
  /**
   * Disable all future dates. Dates after the current date will be disabled.
   */
  disableFuture?: boolean;
  /**
   * Disable specific months dynamically. Receives a month `Date` object and should return `true` if that month should be disabled.
   */
  shouldDisableMonth?: (month: Date) => boolean;
  /**
   * Disable specific years dynamically. Receives a year `Date` object and should return `true` if that year should be disabled.
   */
  shouldDisableYear?: (year: Date) => boolean;
  /**
   * When `true`, the input field will be read-only, preventing manual text input. The calendar can still be opened and used for date selection.
   * This is useful when you want to allow date selection only through the calendar picker and not allow users to type in dates manually.
   *
   * @default false
   */
  readOnly?: boolean;
  /**
   * Specify available days. Can be an array of `Date` objects or a function that receives a date and returns `true` if that date is available.
   * This is useful for highlighting specific dates as available while keeping other dates enabled.
   */
  availableDays?: Date[] | ((date: Date) => boolean);
  /**
   * Props to pass down to the underlying TextField (in 'single' mode) or MultiValueField (in 'multiple' mode). This allows for additional customization of the input field, such as adding custom styles, attributes, or event handlers.
   */
  inputProps?: DateTextFieldProps | DateMultiValueFieldProps;
}

export const DateField = React.forwardRef<TextFieldForwardRef, DateFieldProps>((props, ref) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    useNativePicker = false,
    enableCalendar = true,
    calendarTrigger = 'button',
    numberOfMonths,
  } = getCurrentBreakpointProps<DateFieldBreakpointProps>(props);

  const {
    id,
    mode = 'single',
    label,
    selected,
    onSelect,
    disabled,
    placeholder,
    className,
    formatDate,
    required,
    showOutsideDays = true,
    parseDate,
    monthYearSelectType,
    selectionLevel = 'days',
    locale = et,
    localeCode = 'et-EE',
    initialMonth,
    closeOnSelect,
    footer,
    defaultValue,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    shouldDisableMonth,
    shouldDisableYear,
    readOnly,
    availableDays,
    inputProps,
    useNativePicker: _useNativePicker,
    enableCalendar: _enableCalendar,
    calendarTrigger: _calendarTrigger,
    numberOfMonths: _numberOfMonths,
    defaultServerBreakpoint: _defaultServerBreakpoint,
    sm: _sm,
    md: _md,
    lg: _lg,
    xl: _xl,
    xxl: _xxl,
    ...dayPickerProps
  } = props;

  // Native `<input type="date">` is only meaningful for a single Date — it
  // can't express ranges or multi-selection.
  const shouldUseNativePicker = useNativePicker && mode === 'single';

  const breakpoint = useBreakpoint(props.defaultServerBreakpoint);
  const isMobile = isBreakpointBelow(breakpoint, 'md');
  // Multi-month calendars are unwieldy on phones — the popover gets tall,
  // wraps to a vertical stack, and any focus-into-view (react-day-picker
  // moving focus to a day on tap) yanks the scroll back to the top. Force
  // a single month below `md`; users navigate with the month nav buttons.
  const effectiveNumberOfMonths =
    isMobile && typeof numberOfMonths === 'number' && numberOfMonths > 1 ? 1 : numberOfMonths;

  const [internalValue, setInternalValue] = useState<Date | Date[] | DateRange | undefined>(selected ?? defaultValue);

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<CalendarView>(selectionLevel);
  const [inputValue, setInputValue] = useState('');

  const isControlled = selected !== undefined;
  const value = isControlled ? selected : internalValue;

  const textFieldRef = React.useRef<TextFieldForwardRef | null>(null);

  const setTextFieldRef = React.useCallback(
    (node: TextFieldForwardRef | null) => {
      textFieldRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const toIsoDate = (d?: Date): string => {
    if (!d) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const nativeValue = shouldUseNativePicker && value instanceof Date ? toIsoDate(value) : '';

  const getInitialMonth = useCallback((val: Date | Date[] | DateRange | undefined, fallback?: Date): Date => {
    if (val instanceof Date) return val;

    if (Array.isArray(val) && val.length > 0) {
      return [...val].sort((a, b) => a.getTime() - b.getTime())[0];
    }

    if (val && typeof val === 'object' && 'from' in val && val.from instanceof Date) return val.from;
    if (val && typeof val === 'object' && 'to' in val && val.to instanceof Date) return val.to;

    return fallback ?? new Date();
  }, []);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => getInitialMonth(value, initialMonth));

  useEffect(() => {
    if (!open) {
      setCurrentMonth(getInitialMonth(value, initialMonth));
    }
  }, [value, initialMonth, open, getInitialMonth]);

  useEffect(() => {
    if (open) {
      setView(selectionLevel);
    }
  }, [open, selectionLevel]);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(selected);
    }
  }, [selected, isControlled]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(localeCode, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    [localeCode]
  );

  const defaultFormatter = useCallback(
    (date?: Date | Date[] | DateRange): string => {
      if (!date) return '';
      if (date instanceof Date) return dateFormatter.format(date);
      if (Array.isArray(date)) return date.map((d) => dateFormatter.format(d)).join(', ');
      if (date.from) {
        const from = dateFormatter.format(date.from);
        return date.to ? `${from} – ${dateFormatter.format(date.to)}` : from;
      }
      return '';
    },
    [dateFormatter]
  );

  const shouldCloseOnSelect = closeOnSelect ?? mode === 'single';

  const formattedDatesWithIds =
    mode === 'multiple' && Array.isArray(value)
      ? value.map((d, index) => ({
          id: index,
          label: formatDate ? formatDate(d) : defaultFormatter(d),
          date: d,
        }))
      : [];

  const disabledMatchers = useMemo<Matcher[]>(() => {
    const matchers: Matcher[] = [];

    if (disabled) {
      if (Array.isArray(disabled)) matchers.push(...disabled);
      else matchers.push(disabled);
    }
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disablePast) matchers.push({ before: new Date() });
    if (disableFuture) matchers.push({ after: new Date() });
    if (shouldDisableMonth) matchers.push((date: Date) => shouldDisableMonth(date));
    if (shouldDisableYear) matchers.push((date: Date) => shouldDisableYear(date));

    return matchers;
  }, [disabled, minDate, maxDate, disablePast, disableFuture, shouldDisableMonth, shouldDisableYear]);

  const isDateDisabled = useCallback(
    (date: Date): boolean => dateMatchModifiers(date, disabledMatchers),
    [disabledMatchers]
  );

  const handleSelect: OnSelectHandler<Date | Date[] | DateRange | undefined> = (date, selectedDay, modifiers, e) => {
    if (!isControlled) setInternalValue(date);
    onSelect?.(date, selectedDay, modifiers, e);

    if (date) {
      const formatted = formatDate ? formatDate(date) : defaultFormatter(date);
      setInputValue(formatted);
    } else {
      setInputValue('');
    }

    if (shouldCloseOnSelect) setOpen(false);
  };

  const applyValue = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!isControlled) setInternalValue(date);
    onSelect?.(date, date as UnknownType, {}, {} as UnknownType);

    const formatted = formatDate ? formatDate(date) : defaultFormatter(date);
    setInputValue(formatted);

    if (shouldCloseOnSelect) setOpen(false);
  };

  const defaultParseDate = useMemo(() => {
    const localeParts = getLocaleDateParts(dateFormatter);
    const regex = new RegExp(`^${buildDateRegexSource(localeParts)}$`);
    const { fieldOrder } = localeParts;

    return (value: string): Date | undefined => {
      const match = value.match(regex);
      if (!match) return undefined;

      const values: Partial<Record<'day' | 'month' | 'year', number>> = {};
      fieldOrder.forEach((field, i) => {
        values[field] = Number(match[i + 1]);
      });

      const { day, month, year } = values;
      if (day === undefined || month === undefined || year === undefined) return undefined;

      const date = new Date(year, month - 1, day);
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

  const handleInputChange = (val: string) => {
    setInputValue(val);

    const parser = parseDate ?? (mode === 'single' ? defaultParseDate : () => undefined);
    const parsed = parser(val);

    const isValidForMode =
      (mode === 'single' && parsed instanceof Date) ||
      (mode === 'multiple' && Array.isArray(parsed)) ||
      (mode === 'range' && !!parsed && !Array.isArray(parsed) && 'from' in parsed);

    if (!isValidForMode) return;

    if (parsed instanceof Date && isDateDisabled(parsed)) {
      return;
    }

    if (!isControlled) setInternalValue(parsed);
    onSelect?.(parsed, parsed as Date, {}, {} as UnknownType);

    if (parsed instanceof Date) setCurrentMonth(parsed);

    if (shouldCloseOnSelect) setOpen(false);
  };

  useEffect(() => {
    if (isControlled) {
      const formatted = formatDate ? formatDate(value) : defaultFormatter(value);
      setInputValue(formatted);
    }
  }, [value, isControlled, formatDate, defaultFormatter]);

  useEffect(() => {
    if (!isControlled && defaultValue) {
      const formatted = formatDate ? formatDate(defaultValue) : defaultFormatter(defaultValue);
      setInputValue(formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: calendarTrigger === 'input' ? 'bottom-start' : 'bottom-end',
    middleware: [
      offset(CALENDAR_POPOVER_OFFSET),
      flip(),
      shift({ padding: CALENDAR_POPOVER_PADDING }),
      size({
        padding: CALENDAR_POPOVER_PADDING,
        apply({ availableWidth, elements }) {
          const el = elements.floating;
          el.style.width = 'max-content';
          el.style.maxWidth = '';
          const naturalWidth = el.getBoundingClientRect().width;

          if (naturalWidth > availableWidth) {
            el.style.width = 'min-content';
            el.style.maxWidth = `${availableWidth}px`;
          } else {
            el.style.width = '';
            el.style.maxWidth = '';
          }
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { refs, context, x, y, strategy } = floating;
  const click = useClick(context);
  const interactions = useInteractions([
    ...(enableCalendar && !shouldUseNativePicker && calendarTrigger === 'input' ? [click] : []),
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
  ]);

  const openNativePicker = () => {
    const input = textFieldRef.current?.input as HTMLInputElement | undefined;
    if (!input) return;
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
        return;
      } catch {
        // showPicker() throws InvalidStateError on inputs whose type isn't
        // date / time / etc. Fall through to focus.
      }
    }
    input.focus();
  };

  const handleNativeInputChange = (val: string) => {
    if (!val) {
      if (!isControlled) setInternalValue(undefined);
      onSelect?.(undefined as UnknownType, undefined as UnknownType, {}, {} as UnknownType);
      return;
    }
    const [y, m, d] = val.split('-').map(Number);
    if (!y || !m || !d) return;
    const parsed = new Date(y, m - 1, d);
    if (Number.isNaN(parsed.getTime())) return;
    if (!isControlled) setInternalValue(parsed);
    onSelect?.(parsed, parsed as UnknownType, {}, {} as UnknownType);
  };

  return (
    <>
      <div
        className={cn(styles['tedi-date-field__container'], className)}
        {...interactions.getReferenceProps()}
        ref={refs.setReference}
      >
        {mode === 'multiple' ? (
          <MultiValueField
            {...(inputProps as MultiValueFieldProps)}
            id={id}
            label={label}
            values={formattedDatesWithIds.map((item) => item.label)}
            icon="calendar_today"
            onIconClick={() => enableCalendar && setOpen((prev) => !prev)}
            iconButtonProps={enableCalendar ? { 'aria-expanded': open, 'aria-haspopup': 'dialog' } : undefined}
            isClearable
            required={required}
            onChange={(newLabels) => {
              if (!Array.isArray(value)) return;

              const newDates = formattedDatesWithIds
                .filter((item) => newLabels.includes(item.label))
                .map((item) => item.date);

              if (!isControlled) setInternalValue(newDates);
              onSelect?.(newDates, {} as UnknownType, {}, {} as UnknownType);
            }}
            className={cn(styles['tedi-date-field__textfield'], {
              [styles['tedi-date-field__icon--disabled']]: !enableCalendar || readOnly,
            })}
          />
        ) : (
          <TextField
            {...(inputProps as TextFieldProps)}
            ref={setTextFieldRef}
            id={id}
            label={label}
            readOnly={readOnly}
            value={shouldUseNativePicker ? nativeValue : inputValue}
            placeholder={placeholder}
            icon="calendar_today"
            isClearable
            onIconClick={() => {
              if (!enableCalendar) return;
              if (shouldUseNativePicker) {
                openNativePicker();
              } else {
                setOpen((prev) => !prev);
              }
            }}
            iconButtonProps={
              enableCalendar && !shouldUseNativePicker
                ? { 'aria-expanded': open, 'aria-haspopup': 'dialog' }
                : undefined
            }
            onChange={(val) => (shouldUseNativePicker ? handleNativeInputChange(val) : handleInputChange(val))}
            required={required}
            className={cn(styles['tedi-date-field__textfield'], {
              [styles['tedi-date-field__textfield--disabled']]: inputProps?.disabled,
              [styles['tedi-date-field__icon--disabled']]: !enableCalendar || readOnly,
            })}
            input={{
              ...((inputProps as TextFieldProps)?.input as UnknownType),
              ...(shouldUseNativePicker && { type: 'date' }),
              ...(enableCalendar && !shouldUseNativePicker && calendarTrigger === 'input'
                ? { 'aria-haspopup': 'dialog', 'aria-expanded': open }
                : {}),
            }}
          />
        )}
      </div>

      {enableCalendar && !shouldUseNativePicker && (
        <FloatingPortal>
          {open && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                ref={refs.setFloating}
                {...interactions.getFloatingProps({
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                })}
              >
                <Calendar
                  {...dayPickerProps}
                  numberOfMonths={effectiveNumberOfMonths}
                  view={view}
                  selectionLevel={selectionLevel}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  setView={setView}
                  mode={mode}
                  value={value}
                  locale={locale}
                  localeCode={localeCode}
                  showOutsideDays={showOutsideDays}
                  disabledMatchers={disabledMatchers}
                  required={required}
                  availableDays={availableDays}
                  footer={footer}
                  monthYearSelectType={monthYearSelectType}
                  handleSelect={handleSelect}
                  applyValue={applyValue}
                  className={styles['tedi-date-field__calendar']}
                />
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      )}
    </>
  );
});

DateField.displayName = 'DateField';
