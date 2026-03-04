import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DateRange, DayPicker, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import { useLabels } from '../../../providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import MultiValueField, { MultiValueFieldProps } from '../multi-value-field/multi-value-field';
import TextField, { TextFieldProps } from '../textfield/textfield';
import { CalendarHeader } from './components/date-field-header/date-field-header';
import { MonthGrid } from './components/date-field-month-grid/date-field-month-grid';
import { YearGrid } from './components/date-field-year-grid/date-field-year-grid';
import styles from './date-field.module.scss';

export type DateFieldMode = 'single' | 'multiple' | 'range';
export type CalendarView = 'days' | 'months' | 'years';
export type DateFieldOpenBehavior = 'input' | 'button';
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
  /*
   * Determines the selection mode of the calendar.
   * - `'single'` (default) – only one date can be selected. The `selected` prop should be a `Date` object or `undefined`.
   * - `'multiple'` – multiple individual dates can be selected. The `selected` prop should be an array of `Date` objects.
   * - `'range'` – a continuous date range can be selected. The `selected` prop should be an object with `from` and optional `to` properties, both being `Date` objects.
   *
   * @default single
   */
  mode?: DateFieldMode;
  /*
   * The currently selected date(s). The expected type depends on the `mode`:
   * - For `mode="single"`, this should be a `Date` object or `undefined`.
   * - For `mode="multiple"`, this should be an array of `Date` objects.
   * - For `mode="range"`, this should be an object with a `from` property (a `Date` object) and an optional `to` property (also a `Date` object).
   */
  selected?: Date | Date[] | DateRange | undefined;
  /*
   * Callback fired when the user selects a date or date range. The exact parameters depend on the `mode`:
   * - For `mode="single"`, the callback receives the selected `Date` object (or `undefined` if cleared).
   * - For `mode="multiple"`, the callback receives an array of selected `Date` objects.
   * - For `mode="range"`, the callback receives an object with `from` and optional `to` properties, both being `Date` objects (or `undefined` if cleared).
   */
  onSelect?: OnSelectHandler<Date | Date[] | DateRange | undefined>;
  /*
   * Disable specific dates. Accepts the same matchers as React DayPicker's `disabled` prop.
   */
  disabled?: Matcher | Matcher[];
  /*
   * Input placeholder text when no date is selected.
   */
  placeholder?: string;
  /*
   * Additional class name(s) to apply to the component container.
   */
  className?: string;
  /*
   * Custom date formatting function. Receives the selected date(s) and should return a string for display in the input field.
   * If not provided, a default formatter will be used that formats dates as "dd.MM.yyyy" in the "et-EE" locale.
   */
  formatDate?: (date: Date | Date[] | DateRange | undefined) => string;
  /*
   * Show days from adjacent months in the calendar view. Default is `true`.
   *
   * @default true
   */
  showOutsideDays?: boolean;
  /*
   * Determines how the calendar popover is opened:
   * - `'button'` (default): The calendar opens when the user clicks the calendar icon button.
   * - `'input'`: The calendar opens when the user clicks anywhere on the input field, including the calendar icon.
   *
   * @default button
   */
  openBehavior?: DateFieldOpenBehavior;
  /*
   * Custom date parsing function for user input. Receives the input string and should return a `Date`, an array of `Date`s, a `DateRange`, or `undefined` if the input is invalid or cleared.
   * If not provided, the component will not allow manual input and will rely solely on the calendar picker for date selection.
   */
  parseDate?: (value: string) => Date | Date[] | DateRange | undefined;
  /*
   * Initial month to display when the calendar is opened. If not provided, defaults to the month of the currently selected date or the current month if no date is selected.
   */
  initialMonth?: Date;
  /*
   * When `true`, the date field is marked as required, and the calendar will enforce that a date is selected before allowing the user to close it. Default is `false`.
   *
   * @default false
   */
  required?: boolean;
  /*
   * When `true`, the month and year selection in the calendar header will be displayed as grids instead of dropdowns. Default is `false`.
   *
   * @default false
   */
  monthYearSelectGrid?: boolean;
  /*
   * The initial view to show when the calendar is opened. Can be one of:
   * - `'days'` (default) – shows the calendar with days view
   *  - `'months'` – shows the month selection grid (if `monthYearSelectGrid` is `true`) or dropdown
   * - `'years'` – shows the year selection grid (if `monthYearSelectGrid` is `true`) or dropdown
   * @default 'days'
   */
  calendarView?: CalendarView;
  /*
   * The locale object for the calendar, used by React DayPicker. Defaults to Estonian locale.
   */
  locale?: Locale;
  /*
   * The locale code string used for date formatting. Defaults to 'et-EE'.
   */
  localeCode?: string;
  /*
   * When `true`, the calendar popover will automatically close after a date is selected. Default behavior is to close on select only in 'single' mode.
   * You can override this behavior by explicitly setting this prop to `true` or `false`.
   *
   * @default depends on mode (true for 'single', false for 'multiple' and 'range')
   */
  closeOnSelect?: boolean;
  /*
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
  /*
   * Maximum selectable date. Dates after this will be disabled.
   * If you want to disable future dates, you can also use the `disableFuture` boolean prop.
   */
  maxDate?: Date;
  /**
   * Disable all past dates. Dates before the current date will be disabled.
   */
  disablePast?: boolean;
  /*
   * Disable all future dates. Dates after the current date will be disabled.
   */
  disableFuture?: boolean;
  /*
   * Disable specific months dynamically. Receives a month `Date` object and should return `true` if that month should be disabled.
   */
  shouldDisableMonth?: (month: Date) => boolean;
  /*
   * Disable specific years dynamically. Receives a year `Date` object and should return `true` if that year should be disabled.
   */
  shouldDisableYear?: (year: Date) => boolean;
  /*
   * When `true`, the input field will be read-only, preventing manual text input. The calendar can still be opened and used for date selection.
   * This is useful when you want to allow date selection only through the calendar picker and not allow users to type in dates manually.
   *
   * @default false
   */
  readOnly?: boolean;
  /*
   * Specify available days. Can be an array of `Date` objects or a function that receives a date and returns `true` if that date is available.
   * This is useful for highlighting specific dates as available while keeping other dates enabled.
   */
  availableDays?: Date[] | ((date: Date) => boolean);
  /*
   * Props to pass down to the underlying TextField (in 'single' mode) or MultiValueField (in 'multiple' mode). This allows for additional customization of the input field, such as adding custom styles, attributes, or event handlers.
   */
  inputProps?: DateTextFieldProps | DateMultiValueFieldProps;
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
  openBehavior = 'button',
  showOutsideDays = true,
  parseDate,
  monthYearSelectGrid,
  calendarView = 'days',
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
  ...dayPickerProps
}) => {
  const { getLabel } = useLabels();
  const [internalValue, setInternalValue] = useState<Date | Date[] | DateRange | undefined>(selected ?? defaultValue);

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<CalendarView>(calendarView);
  const [inputValue, setInputValue] = useState('');

  const isControlled = selected !== undefined;
  const value = isControlled ? selected : internalValue;

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (value instanceof Date) return value;
    if (initialMonth) return initialMonth;
    return new Date();
  });

  useEffect(() => {
    if (open) {
      setView(calendarView);
    }
  }, [open, calendarView]);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(selected);
    }
  }, [selected, isControlled]);

  const dateFormatter = useMemo(() => {
    if (calendarView === 'years') {
      return new Intl.DateTimeFormat(localeCode, {
        year: 'numeric',
      });
    }

    if (calendarView === 'months') {
      return new Intl.DateTimeFormat(localeCode, {
        month: '2-digit',
        year: 'numeric',
      });
    }

    return new Intl.DateTimeFormat(localeCode, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, [localeCode, calendarView]);

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-end',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { refs, context, x, y, strategy } = floating;
  const click = useClick(context);
  const interactions = useInteractions([
    ...(openBehavior === 'input' ? [click] : []),
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
  ]);

  const shouldCloseOnSelect = closeOnSelect ?? mode === 'single';

  const handleSelect: OnSelectHandler<Date | Date[] | DateRange | undefined> = (date, selectedDay, modifiers, e) => {
    if (!isControlled) setInternalValue(date);
    onSelect?.(date, selectedDay, modifiers, e);
    if (shouldCloseOnSelect) setOpen(false);
  };

  const defaultFormatter = (date?: Date | Date[] | DateRange): string => {
    if (!date) return '';

    if (date instanceof Date) return dateFormatter.format(date);
    if (Array.isArray(date)) return date.map((d) => dateFormatter.format(d)).join(', ');
    if (date.from) {
      const from = dateFormatter.format(date.from);
      return date.to ? `${from} – ${dateFormatter.format(date.to)}` : from;
    }

    return '';
  };

  const applyValue = (date: Date) => {
    if (!isControlled) setInternalValue(date);
    onSelect?.(date, date as UnknownType, {}, {} as UnknownType);
    if (shouldCloseOnSelect) setOpen(false);
  };

  const formattedDates =
    mode === 'multiple' && Array.isArray(value)
      ? value.map((d) => (formatDate ? formatDate(d) : defaultFormatter(d)))
      : [];

  const handleInputChange = (val: string) => {
    setInputValue(val);

    if (!parseDate) return;

    const parsed = parseDate(val);
    if (!parsed) return;

    if (!isControlled) setInternalValue(parsed);
    onSelect?.(parsed, parsed as Date, {}, {} as UnknownType);

    if (parsed instanceof Date) setCurrentMonth(parsed);
    if (shouldCloseOnSelect) setOpen(false);
  };

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
        ref={refs.setReference}
        className={cn(styles['tedi-date-field__container'], className)}
        {...interactions.getReferenceProps()}
        aria-haspopup="dialog"
      >
        {mode === 'multiple' ? (
          <MultiValueField
            {...(inputProps as MultiValueFieldProps)}
            id={id}
            label={label}
            values={formattedDates}
            placeholder={placeholder}
            icon="calendar_today"
            onIconClick={() => setOpen(true)}
            isClearable
            required={required}
            onChange={(newValues) => {
              if (!Array.isArray(value)) return;
              const newDates = value.filter((d) =>
                newValues.includes(formatDate ? formatDate(d) : defaultFormatter(d))
              );
              if (!isControlled) setInternalValue(newDates);
              onSelect?.(newDates, {} as UnknownType, {}, {} as UnknownType);
            }}
            className={cn(styles['tedi-date-field__textfield'], styles['tedi-date-field__multivalue'])}
          />
        ) : (
          <TextField
            {...(inputProps as TextFieldProps)}
            id={id}
            label={label}
            readOnly={readOnly ?? !parseDate}
            value={inputValue || (formatDate ? formatDate(value) : defaultFormatter(value))}
            placeholder={placeholder}
            icon="calendar_today"
            isClearable
            onIconClick={() => setOpen(true)}
            aria-expanded={open}
            onChange={(val) => handleInputChange(val)}
            required={required}
            className={cn(styles['tedi-date-field__textfield'], {
              [styles['tedi-date-field__textfield--disabled']]: inputProps?.disabled,
            })}
          />
        )}
      </div>

      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              role="dialog"
              aria-labelledby="datepicker-input"
              {...interactions.getFloatingProps({
                style: { position: strategy, top: y ?? 0, left: x ?? 0 },
              })}
            >
              <div aria-live="polite" className="sr-only">
                {view === 'years' && getLabel('pickers.yearSelection')}
                {view === 'months' && getLabel('pickers.monthSelection')}
              </div>

              {(view === 'years' || calendarView === 'years') && (
                <YearGrid
                  currentMonth={currentMonth}
                  onNavigate={setCurrentMonth}
                  onSelectYear={(date) => {
                    setCurrentMonth(date);

                    if (calendarView === 'years') {
                      const normalized = new Date(date.getFullYear(), 0, 1);
                      applyValue(normalized);
                    } else {
                      setView('months');
                    }
                  }}
                />
              )}

              {(view === 'months' || calendarView === 'months') && (
                <MonthGrid
                  currentMonth={currentMonth}
                  onNavigate={setCurrentMonth}
                  onSelectMonth={(date) => {
                    setCurrentMonth(date);

                    if (calendarView === 'months') {
                      applyValue(date);
                    } else {
                      setView('days');
                    }
                  }}
                />
              )}

              {view === 'days' && (
                <DayPicker
                  {...dayPickerProps}
                  mode={mode}
                  selected={value as UnknownType}
                  locale={locale}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  showOutsideDays={showOutsideDays}
                  disabled={disabledMatchers.length > 0 ? disabledMatchers : undefined}
                  required={required}
                  components={{
                    MonthCaption: (props) => (
                      <CalendarHeader
                        {...props}
                        monthYearSelectGrid={monthYearSelectGrid}
                        onOpenMonthGrid={() => setView('months')}
                        onOpenYearGrid={() => setView('years')}
                      />
                    ),
                    Nav: () => <></>,
                  }}
                  footer={footer}
                  classNames={{
                    root: styles['tedi-date-field__calendar'],
                    month_caption: styles['tedi-date-field__caption'],
                    head: styles['tedi-date-field__head'],
                    row: styles['tedi-date-field__row'],
                    day: styles['tedi-date-field__day'],
                    selected: styles['tedi-date-field__day--selected'],
                    weekday: styles['tedi-date-field__weekday'],
                    outside: styles['tedi-date-field__outside-days'],
                    range_start: styles['tedi-date-field__range-start'],
                    range_middle: styles['tedi-date-field__range-middle'],
                    range_end: styles['tedi-date-field__range-end'],
                    today: styles['tedi-date-field__today'],
                    disabled: styles['tedi-date-field__disabled'],
                    month: styles['tedi-date-field__month'],
                    months: styles['tedi-date-field__months-container'],
                    footer: styles['tedi-date-field__footer'],
                    week_number: styles['tedi-date-field__week-number'],
                  }}
                  modifiers={{
                    available:
                      availableDays instanceof Function
                        ? availableDays
                        : (d) => availableDays?.some((day) => day.toDateString() === d.toDateString()) ?? false,
                  }}
                  modifiersClassNames={{
                    available: styles['tedi-date-field__available-day'],
                  }}
                  onSelect={handleSelect}
                />
              )}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};

export { DateField as DatePicker };
