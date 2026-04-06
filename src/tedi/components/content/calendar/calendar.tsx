import classNames from 'classnames';
import React from 'react';
import { DateRange, DayPicker, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';
import { UnknownType } from 'src/tedi/types/commonTypes';

import { CalendarView, DateFieldMode } from '../../form/date-field/date-field';
import styles from './calendar.module.scss';
import { CalendarHeader } from './components/calendar-header/calendar-header';
import { MonthGrid } from './components/calendar-month-grid/calendar-month-grid';
import { YearGrid } from './components/calendar-year-grid/calendar-year-grid';

export interface CalendarProps extends Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'> {
  /**
   * Current view of the calendar. Can be `'days'`, `'months'`, or `'years'`.
   * Controls which calendar grid is displayed.
   */
  view?: CalendarView;
  /**
   * The intended calendar view mode. Determines if the calendar initially opens in `'days'`, `'months'`, or `'years'` view.
   */
  calendarView?: CalendarView;
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
   * If `true`, the month/year selection in the calendar header will be displayed as a grid instead of a dropdown.
   */
  monthYearSelectGrid?: boolean;
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
}

export const Calendar = ({
  view = 'days',
  calendarView = 'days',
  currentMonth,
  setCurrentMonth,
  setView = () => 'days',
  mode = 'single',
  value,
  locale = et,
  showOutsideDays = true,
  disabledMatchers,
  required,
  availableDays,
  unavailableDays,
  footer,
  monthYearSelectGrid,
  handleSelect,
  applyValue,
  showNavigation = true,
  className,
  ...dayPickerProps
}: CalendarProps) => {
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

  return (
    <div className={styles['tedi-calendar__wrapper']}>
      {(view === 'years' || calendarView === 'years') && (
        <YearGrid
          currentMonth={currentMonth}
          onNavigate={setCurrentMonth}
          showNavigation={showNavigation}
          onSelectYear={(date) => {
            setCurrentMonth(date);

            if (calendarView === 'years') {
              applyValue(new Date(date.getFullYear(), 0, 1));
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
          showNavigation={showNavigation}
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
          disabled={computedDisabled.length ? computedDisabled : undefined}
          required={required}
          components={{
            MonthCaption: (props) => (
              <CalendarHeader
                {...props}
                monthYearSelectGrid={monthYearSelectGrid}
                onOpenMonthGrid={() => setView('months')}
                onOpenYearGrid={() => setView('years')}
                showNavigation={showNavigation}
              />
            ),
            Nav: () => <></>,
          }}
          footer={footer}
          classNames={{
            root: classNames(styles['tedi-calendar'], className),
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
