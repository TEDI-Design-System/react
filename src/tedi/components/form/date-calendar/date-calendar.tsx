import classNames from 'classnames';
import React from 'react';
import { DateRange, DayPicker, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { UnknownType } from 'src/tedi/types/commonTypes';

import { CalendarView, DateFieldMode } from '../date-field/date-field';
import { CalendarHeader } from './components/date-calendar-header/date-calendar-header';
import { MonthGrid } from './components/date-calendar-month-grid/date-calendar-month-grid';
import { YearGrid } from './components/date-calendar-year-grid/date-calendar-year-grid';
import styles from './date-calendar.module.scss';

export interface DateCalendarProps extends Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'> {
  /**
   * Current view of the calendar. Can be `'days'`, `'months'`, or `'years'`.
   * Controls which calendar grid is displayed.
   */
  view: CalendarView;
  /**
   * The intended calendar view mode. Determines if the calendar initially opens in `'days'`, `'months'`, or `'years'` view.
   */
  calendarView: CalendarView;
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
  setView: (view: CalendarView) => void;
  /**
   * Selection mode of the calendar. Can be `'single'`, `'multiple'`, or `'range'`.
   */
  mode: DateFieldMode;
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
  locale: Locale;
  /**
   * Whether to display days from the previous and next months in the current month grid.
   * Default is `true`.
   */
  showOutsideDays: boolean;
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
   * Optional additional CSS class for the calendar container.
   */
  className?: string;
}

export const DateCalendar = ({
  view,
  calendarView,
  currentMonth,
  setCurrentMonth,
  setView,
  mode = 'single',
  value,
  locale,
  showOutsideDays,
  disabledMatchers,
  required,
  availableDays,
  footer,
  monthYearSelectGrid,
  handleSelect,
  applyValue,
  className,
  ...dayPickerProps
}: DateCalendarProps) => {
  return (
    <div className={styles['tedi-date-calendar']}>
      {(view === 'years' || calendarView === 'years') && (
        <YearGrid
          currentMonth={currentMonth}
          onNavigate={setCurrentMonth}
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
          disabled={disabledMatchers?.length ? disabledMatchers : undefined}
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
            root: classNames(styles['tedi-date-calendar'], className),
            month_caption: styles['tedi-date-calendar__caption'],
            head: styles['tedi-date-calendar__head'],
            row: styles['tedi-date-calendar__row'],
            day: styles['tedi-date-calendar__day'],
            selected: styles['tedi-date-calendar__day--selected'],
            weekday: styles['tedi-date-calendar__weekday'],
            outside: styles['tedi-date-calendar__outside-days'],
            range_start: styles['tedi-date-calendar__range-start'],
            range_middle: styles['tedi-date-calendar__range-middle'],
            range_end: styles['tedi-date-calendar__range-end'],
            today: styles['tedi-date-calendar__today'],
            disabled: styles['tedi-date-calendar__disabled'],
            month: styles['tedi-date-calendar__month'],
            months: styles['tedi-date-calendar__months-container'],
            footer: styles['tedi-date-calendar__footer'],
            week_number: styles['tedi-date-calendar__week-number'],
          }}
          modifiers={{
            available:
              availableDays instanceof Function
                ? availableDays
                : (d) => availableDays?.some((day) => day.toDateString() === d.toDateString()) ?? false,
          }}
          modifiersClassNames={{ available: styles['tedi-date-calendar__available-day'] }}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};
