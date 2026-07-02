import classNames from 'classnames';
import React from 'react';
import { DateRange, DayButton, DayPicker, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import { CalendarView, DateFieldMode } from '../../form/date-field/date-field';
import { StatusIndicator, StatusIndicatorType } from '../../tags/status-indicator';
import styles from './calendar.module.scss';
import { CalendarHeader } from './components/calendar-header/calendar-header';
import { MonthGrid } from './components/calendar-month-grid/calendar-month-grid';
import { YearGrid } from './components/calendar-year-grid/calendar-year-grid';

export interface DayStatus {
  /**
   * Status type driving the indicator colour. Maps to `StatusIndicator`'s `type`.
   */
  type: StatusIndicatorType;
  /**
   * Accessible label for the status. Appended to the day button's `aria-label`
   * so screen readers announce the date together with its status — required
   * because the indicator dot itself is decorative (`aria-hidden`).
   */
  label: string;
}

/**
 * Resolves a `DayStatus` for a given day, or `null`/`undefined` for no status.
 */
export type DayStatusFn = (date: Date) => DayStatus | null | undefined;

export interface CalendarProps extends Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'> {
  /**
   * Current view of the calendar. Can be `'days'`, `'months'`, or `'years'`.
   * Controls which calendar grid is displayed.
   */
  view?: CalendarView;
  /**
   * **Selection granularity** — controls the level at which a click finalises
   * the selection rather than drilling down to the next sub-grid:
   * - `'years'` — clicking a year selects Jan 1 of that year and closes; the
   *   calendar starts on the year grid.
   * - `'months'` — clicking a month selects the first day of that month; the
   *   calendar starts on the month grid.
   * - `'days'` (default) — full day-level selection; the calendar starts on
   *   the day grid.
   *
   * Distinct from `view` / `setView`, which control the *currently visible*
   * grid — those flip as the user navigates between year / month / day.
   * `selectionLevel` is the lowest level the user can drill down to before
   * a click commits the selection.
   * @default days
   */
  selectionLevel?: CalendarView;
  /**
   * The month currently displayed in the calendar. Used to render the correct month grid.
   */
  currentMonth: Date;
  /**
   * Callback to update the `currentMonth` when navigating months/years.
   */
  setCurrentMonth: (date: Date) => void;
  /**
   * Callback to update the current `view` (days, months, years) when the user switches calendar levels.
   */
  setView?: (view: CalendarView) => void;
  /**
   * Selection mode of the calendar. Can be `'single'`, `'multiple'`, or `'range'`.
   */
  mode?: DateFieldMode;
  /**
   * The currently selected value(s).
   * - Single mode: `Date | undefined`
   * - Multiple mode: `Date[]`
   * - Range mode: `DateRange` (object with `from` and optional `to`)
   */
  value: Date | Date[] | DateRange | undefined;
  /**
   * Locale object for formatting and translating calendar labels (from `react-day-picker`).
   */
  locale?: Locale;
  /**
   * The locale code string used for date formatting. Defaults to 'et-EE'.
   */
  localeCode?: string;
  /**
   * Whether to display days from the previous and next months in the current month grid.
   * Default is `true`.
   */
  showOutsideDays?: boolean;
  /**
   * Array of `Matcher`s or functions to disable specific dates. Used to prevent selection of certain days.
   */
  disabledMatchers?: Matcher[];
  /**
   * If `true`, a value must be selected before the calendar allows closing.
   */
  required?: boolean;
  /**
   * Array of available dates or a function to dynamically mark dates as available.
   * Highlights selectable days without disabling other days.
   */
  availableDays?: Date[] | ((date: Date) => boolean);
  /**
   * Array of unavailable dates or a function to dynamically mark dates as unavailable.
   * Used for styling and optionally disabling specific days.
   */
  unavailableDays?: Date[] | ((date: Date) => boolean);
  /**
   * Optional footer element to render below the calendar grid, e.g., for action buttons.
   */
  footer?: React.ReactNode;
  /**
   * How the month/year selector in the calendar header is rendered.
   * Forwarded to the internal `CalendarHeader`.
   * - `'dropdown'` (default) — each picker is a `<Select>` dropdown.
   * - `'grid'` — each picker opens a full grid of options.
   * - `'static'` — the month/year is a plain, non-clickable label; only the
   *   prev/next navigation buttons can change the month. Use to disable
   *   month/year selection.
   * @default dropdown
   */
  monthYearSelectType?: 'dropdown' | 'grid' | 'static';
  /**
   * Optional per-day status. Called for each rendered day; return a
   * `{ type, label }` to overlay a `StatusIndicator` dot on that day (the
   * `label` is folded into the day's `aria-label`), or `null` / `undefined` for
   * no status.
   */
  dayStatus?: DayStatusFn;
  /**
   * Callback fired when a date or date range is selected. Receives the selected value, day, modifiers, and event.
   */
  handleSelect: OnSelectHandler<Date | Date[] | DateRange | undefined>;
  /**
   * Callback to apply a selected date from month/year selection or programmatically.
   */
  applyValue: (date: Date) => void;
  /**
   * Show or hide previous/next navigation buttons in calendar header.
   * Default is `true`.
   */
  showNavigation?: boolean;
  /**
   * Optional additional CSS class for the calendar container.
   */
  className?: string;
  /**
   * Whether to render the surrounding card (border, background, radius).
   * Set to `false` when embedding inside a parent that already provides its
   * own surface — e.g. inside `DatePickerModal`, or alongside a calendar in
   * `DateTimeField`. The inner gradient masks and column separators are
   * preserved either way.
   * @default true
   */
  bordered?: boolean;
  /**
   * Let the calendar grow to fill the width of its container instead of using a
   * fixed width. The seven columns distribute evenly and each cell keeps a
   * square aspect ratio, so the day rows and the weekday row scale vertically
   * with the width. The selected day fills its cell; the "today" ring stays a
   * fixed size, centred. Wrap the calendar in a sized container to control how
   * large it scales.
   * @default false
   */
  fullWidth?: boolean;
}

export const Calendar = ({
  view = 'days',
  selectionLevel = 'days',
  currentMonth,
  setCurrentMonth,
  setView = () => 'days',
  mode = 'single',
  value,
  locale = et,
  localeCode = 'et-EE',
  showOutsideDays = true,
  disabledMatchers,
  required,
  availableDays,
  unavailableDays,
  footer,
  monthYearSelectType,
  dayStatus,
  handleSelect,
  applyValue,
  showNavigation = true,
  className,
  bordered = true,
  fullWidth = false,
  ...dayPickerProps
}: CalendarProps) => {
  const borderlessClass = !bordered ? styles['tedi-calendar--borderless'] : undefined;
  const fullWidthClass = fullWidth ? styles['tedi-calendar--full-width'] : undefined;
  const containerClassName = classNames(borderlessClass, fullWidthClass, className);
  const isAvailable = (date: Date) => {
    if (!availableDays) return true;

    if (Array.isArray(availableDays)) {
      return availableDays.some((d) => d.toDateString() === date.toDateString());
    }

    return availableDays(date);
  };

  const isUnavailable = (date: Date) => {
    if (!unavailableDays) return false;

    if (Array.isArray(unavailableDays)) {
      return unavailableDays.some((d) => d.toDateString() === date.toDateString());
    }

    return unavailableDays(date);
  };

  const computedDisabled: Matcher[] = [
    ...(disabledMatchers ?? []),
    ...(availableDays ? [(date: Date) => !isAvailable(date)] : []),
    ...(unavailableDays ? [(date: Date) => isUnavailable(date)] : []),
  ];

  // DayPicker's `selected` is a discriminated union keyed off `mode`. Package
  // the two props as a type-narrowed pair and spread them together so the
  // correct overload is picked without a cast.
  const selectionProps = (():
    | { mode: 'single'; selected: Date | undefined }
    | { mode: 'multiple'; selected: Date[] | undefined }
    | { mode: 'range'; selected: DateRange | undefined } => {
    switch (mode) {
      case 'multiple':
        return { mode: 'multiple', selected: Array.isArray(value) ? value : undefined };
      case 'range':
        return {
          mode: 'range',
          selected: value && !Array.isArray(value) && !(value instanceof Date) ? value : undefined,
        };
      default:
        return { mode: 'single', selected: value instanceof Date ? value : undefined };
    }
  })();

  return (
    <div className={styles['tedi-calendar__wrapper']}>
      {view === 'years' && (
        <YearGrid
          currentMonth={currentMonth}
          onNavigate={setCurrentMonth}
          showNavigation={showNavigation}
          onSelectYear={(date) => {
            setCurrentMonth(date);

            if (selectionLevel === 'years') {
              applyValue(new Date(date.getFullYear(), 0, 1));
            } else {
              setView('months');
            }
          }}
          className={containerClassName}
        />
      )}

      {view === 'months' && (
        <MonthGrid
          currentMonth={currentMonth}
          onNavigate={setCurrentMonth}
          showNavigation={showNavigation}
          localeCode={localeCode}
          onSelectMonth={(date) => {
            setCurrentMonth(date);

            if (selectionLevel === 'months') {
              applyValue(date);
            } else {
              setView('days');
            }
          }}
          className={containerClassName}
        />
      )}

      {view === 'days' && (
        <DayPicker
          {...dayPickerProps}
          {...selectionProps}
          locale={locale}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          showOutsideDays={showOutsideDays}
          disabled={computedDisabled.length ? computedDisabled : undefined}
          required={required}
          components={{
            MonthCaption: (props) => (
              <CalendarHeader
                {...props}
                monthYearSelectType={monthYearSelectType}
                onOpenMonthGrid={() => setView('months')}
                onOpenYearGrid={() => setView('years')}
                showNavigation={showNavigation}
                localeCode={localeCode}
                disabledMatchers={computedDisabled.length ? computedDisabled : undefined}
              />
            ),
            Nav: () => <></>,
            ...(dayStatus
              ? {
                  DayButton: (dayButtonProps) => {
                    const status = dayStatus(dayButtonProps.day.date);

                    if (!status) {
                      return <DayButton {...dayButtonProps} />;
                    }

                    const ariaLabel = [dayButtonProps['aria-label'], status.label].filter(Boolean).join(', ');

                    return (
                      <DayButton {...dayButtonProps} aria-label={ariaLabel}>
                        {dayButtonProps.children}
                        <StatusIndicator
                          type={status.type}
                          size="sm"
                          hasBorder
                          className={styles['tedi-calendar__day-status']}
                        />
                      </DayButton>
                    );
                  },
                }
              : {}),
            ...(fullWidth
              ? {
                  Weekday: ({ children, ...weekdayProps }) => (
                    <th {...weekdayProps}>
                      <span className={styles['tedi-calendar__weekday-inner']}>{children}</span>
                    </th>
                  ),
                }
              : {}),
          }}
          footer={footer}
          classNames={{
            root: classNames(styles['tedi-calendar'], borderlessClass, fullWidthClass, className),
            month_caption: styles['tedi-calendar__caption'],
            head: styles['tedi-calendar__head'],
            row: styles['tedi-calendar__row'],
            day: styles['tedi-calendar__day'],
            selected: styles['tedi-calendar__day--selected'],
            weekday: styles['tedi-calendar__weekday'],
            outside: styles['tedi-calendar__outside-days'],
            range_start: styles['tedi-calendar__range-start'],
            range_middle: styles['tedi-calendar__range-middle'],
            range_end: styles['tedi-calendar__range-end'],
            today: styles['tedi-calendar__today'],
            disabled: styles['tedi-calendar__disabled'],
            month: styles['tedi-calendar__month'],
            months: styles['tedi-calendar__months-container'],
            footer: styles['tedi-calendar__footer'],
            week_number: styles['tedi-calendar__week-number'],
          }}
          modifiers={{
            available: (date) => (availableDays ? isAvailable(date) : false),
            unavailable: (date) => (unavailableDays ? isUnavailable(date) : false),
          }}
          modifiersClassNames={{
            available: styles['tedi-calendar__available-day'],
            unavailable: styles['tedi-calendar__unavailable-day'],
          }}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

Calendar.displayName = 'Calendar';
