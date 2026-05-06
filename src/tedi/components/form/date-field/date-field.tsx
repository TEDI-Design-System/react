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
import { DateRange, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import { UnknownType } from '../../../types/commonTypes';
import { Calendar } from '../../content/calendar/calendar';
import MultiValueField, { MultiValueFieldProps } from '../multi-value-field/multi-value-field';
import TextField, { TextFieldProps } from '../textfield/textfield';
import styles from './date-field.module.scss';

const CALENDAR_OFFSET = 4;
const CALENDAR_PADDING = 8;

export type DateFieldMode = 'single' | 'multiple' | 'range';
export type CalendarView = 'days' | 'months' | 'years';
export type DateFieldCalendarTrigger = 'input' | 'button';
type DateTextFieldProps = Omit<TextFieldProps, 'label' | 'id'>;
type DateMultiValueFieldProps = Omit<MultiValueFieldProps, 'label' | 'id'>;

export interface DateFieldProps extends Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'> {
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
   * Determines how the calendar popover is opened:
   * - `'button'` (default): The calendar opens when the user clicks the calendar icon button.
   * - `'input'`: The calendar opens when the user clicks anywhere on the input field, including the calendar icon.
   *
   * @default button
   */
  calendarTrigger?: DateFieldCalendarTrigger;
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
  /**
   * Enables or disables the calendar popover for the date field.
   *
   * - When `true` (default), the calendar is active, allowing the user to select dates from the calendar.
   * - When `false`, the calendar is hidden and only manual input is possible.
   *
   * @default true
   */
  enableCalendar?: boolean;
}

export const DateField: React.FC<DateFieldProps> = ({
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
  calendarTrigger = 'button',
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
  enableCalendar = true,
  ...dayPickerProps
}) => {
  const [internalValue, setInternalValue] = useState<Date | Date[] | DateRange | undefined>(selected ?? defaultValue);

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<CalendarView>(selectionLevel);
  const [inputValue, setInputValue] = useState('');

  const isControlled = selected !== undefined;
  const value = isControlled ? selected : internalValue;

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

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      let disabledList: Matcher[] = [];

      if (disabled) {
        disabledList = Array.isArray(disabled) ? disabled : [disabled];
      }
      if (minDate) disabledList.push({ before: minDate });
      if (maxDate) disabledList.push({ after: maxDate });
      if (disablePast) disabledList.push({ before: new Date() });
      if (disableFuture) disabledList.push({ after: new Date() });
      if (shouldDisableMonth) disabledList.push((d: Date) => shouldDisableMonth(d));
      if (shouldDisableYear) disabledList.push((d: Date) => shouldDisableYear(d));

      return disabledList.some((matcher) => {
        if (typeof matcher === 'function') return matcher(date);
        if (matcher instanceof Date) return matcher.getTime() === date.getTime();
        return false;
      });
    },
    [disabled, minDate, maxDate, disablePast, disableFuture, shouldDisableMonth, shouldDisableYear]
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

  const defaultParseDate = (value: string): Date | undefined => {
    const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return undefined;

    const [, dd, mm, yyyy] = match;
    const day = Number(dd);
    const month = Number(mm) - 1;
    const year = Number(yyyy);
    const date = new Date(year, month, day);

    if (isNaN(date.getTime()) || date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
      return undefined;
    }
    return date;
  };

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
      offset(CALENDAR_OFFSET),
      flip(),
      shift({ padding: CALENDAR_PADDING }),
      size({
        padding: CALENDAR_PADDING,
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
    ...(enableCalendar && calendarTrigger === 'input' ? [click] : []),
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
  ]);

  const disabledMatchers: Matcher[] = [];

  if (disabled) {
    if (Array.isArray(disabled)) {
      disabledMatchers.push(...disabled);
    } else {
      disabledMatchers.push(disabled);
    }
  }

  if (minDate) disabledMatchers.push({ before: minDate });
  if (maxDate) disabledMatchers.push({ after: maxDate });
  if (disablePast) disabledMatchers.push({ before: new Date() });
  if (disableFuture) disabledMatchers.push({ after: new Date() });

  if (shouldDisableMonth) disabledMatchers.push((date: Date) => shouldDisableMonth(date));
  if (shouldDisableYear) disabledMatchers.push((date: Date) => shouldDisableYear(date));

  return (
    <>
      <div
        className={cn(styles['tedi-date-field__container'], className)}
        {...interactions.getReferenceProps()}
        aria-haspopup="dialog"
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
            aria-expanded={enableCalendar ? open : undefined}
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
            id={id}
            label={label}
            readOnly={readOnly}
            value={inputValue}
            placeholder={placeholder}
            icon="calendar_today"
            isClearable
            onIconClick={() => enableCalendar && setOpen((prev) => !prev)}
            aria-expanded={enableCalendar ? open : undefined}
            onChange={(val) => handleInputChange(val)}
            required={required}
            className={cn(styles['tedi-date-field__textfield'], {
              [styles['tedi-date-field__textfield--disabled']]: inputProps?.disabled,
              [styles['tedi-date-field__icon--disabled']]: !enableCalendar || readOnly,
            })}
          />
        )}
      </div>

      {enableCalendar && (
        <FloatingPortal>
          {open && (
            <FloatingFocusManager context={context} modal={false}>
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
};

DateField.displayName = 'DateField';
