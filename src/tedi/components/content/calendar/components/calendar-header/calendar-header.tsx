import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { dateMatchModifiers, Matcher, MonthCaptionProps, useNavigation } from 'react-day-picker';

import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import { Text } from '../../../../base/typography/text/text';
import Button from '../../../../buttons/button/button';
import { Dropdown } from '../../../../overlays/dropdown';
import styles from './calendar-header.module.scss';

export interface CalendarHeaderProps extends Pick<MonthCaptionProps, 'calendarMonth'> {
  /**
   * How the month/year selector in the calendar header is rendered.
   * - `'dropdown'` (default) — each picker is a `<Select>` dropdown.
   * - `'grid'` — each picker opens a full grid of options.
   * @default 'dropdown'
   */
  monthYearSelectType?: 'dropdown' | 'grid';
  /*
   * Callback for opening month selection grid. Only used if `monthYearSelectType` is `'grid'`.
   */
  onOpenMonthGrid?: () => void;
  /*
   * Callback for opening year selection grid. Only used if `monthYearSelectType` is `'grid'`.
   */
  onOpenYearGrid?: () => void;
  /**
   * Show or hide previous/next navigation buttons in calendar header.
   * Default is `true`.
   */
  showNavigation?: boolean;
  /**
   * Locale code string used for date formatting (e.g., `'et-EE'`). Defaults to the runtime locale when omitted.
   */
  localeCode?: string;
  /**
   * Same matcher list passed to DayPicker's `disabled` prop. When provided, the
   * month / year dropdown items are disabled if **every** day in that month
   * (or year) is disabled by the matchers — so users can't jump to a range
   * that has no selectable dates.
   */
  disabledMatchers?: Matcher[];
}

export function CalendarHeader({
  calendarMonth,
  monthYearSelectType = 'dropdown',
  onOpenMonthGrid,
  onOpenYearGrid,
  showNavigation = true,
  localeCode,
  disabledMatchers,
}: CalendarHeaderProps) {
  const isGridSelect = monthYearSelectType === 'grid';
  const { getLabel } = useLabels();
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const displayMonth = calendarMonth.date;
  const displayYear = displayMonth.getFullYear();
  const displayMonthIndex = displayMonth.getMonth();
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(displayYear, i, 1).toLocaleString(localeCode, { month: 'long' })
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const isRangeFullyDisabled = useCallback(
    (start: Date, end: Date): boolean => {
      if (!disabledMatchers?.length) return false;
      const cursor = new Date(start);
      while (cursor <= end) {
        if (!dateMatchModifiers(cursor, disabledMatchers)) return false;
        cursor.setDate(cursor.getDate() + 1);
      }
      return true;
    },
    [disabledMatchers]
  );

  const disabledMonths = useMemo(() => {
    if (!disabledMatchers?.length) return new Set<number>();
    const result = new Set<number>();
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const start = new Date(displayYear, monthIndex, 1);
      const end = new Date(displayYear, monthIndex + 1, 0);
      if (isRangeFullyDisabled(start, end)) result.add(monthIndex);
    }
    return result;
  }, [disabledMatchers, displayYear, isRangeFullyDisabled]);

  const disabledYears = useMemo(() => {
    if (!disabledMatchers?.length) return new Set<number>();
    const result = new Set<number>();
    for (const year of years) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);
      if (isRangeFullyDisabled(start, end)) result.add(year);
    }
    return result;
  }, [disabledMatchers, years, isRangeFullyDisabled]);

  return (
    <div
      className={classNames(styles['tedi-calendar__header'], {
        [styles['tedi-calendar__no-navigation']]: !showNavigation,
      })}
    >
      {showNavigation && (
        <Button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          aria-label={getLabel('pickers.previousMonth')}
          icon="arrow_back"
          visualType="neutral"
        >
          {getLabel('pickers.previousMonth')}
        </Button>
      )}

      {!showNavigation ? (
        <div className={styles['tedi-calendar__month-year-label']}>
          <Text>{displayMonth.toLocaleString(localeCode, { month: 'long' })}</Text>
          <Text>{displayYear}</Text>
        </div>
      ) : isGridSelect ? (
        <>
          <Button
            noStyle
            className={styles['tedi-calendar__month-year-selector']}
            onClick={onOpenMonthGrid}
            data-testid="tedi-calendar-month-trigger"
          >
            {displayMonth.toLocaleString(localeCode, { month: 'long' })}
            <Icon name="arrow_drop_down" color="tertiary" className={styles['tedi-calendar__month-year-caret']} />
          </Button>
          <Button
            noStyle
            className={styles['tedi-calendar__month-year-selector']}
            onClick={onOpenYearGrid}
            data-testid="tedi-calendar-year-trigger"
          >
            {displayMonth.getFullYear()}
            <Icon name="arrow_drop_down" color="tertiary" className={styles['tedi-calendar__month-year-caret']} />
          </Button>
        </>
      ) : (
        <>
          <Dropdown
            className={classNames(styles['tedi-calendar__month-year-dropdown'], {
              [styles['tedi-calendar__picker-grid-dropdown']]: isGridSelect,
            })}
            width="auto"
            defaultActiveIndex={displayMonthIndex}
          >
            <Dropdown.Trigger>
              <Button noStyle className={styles['tedi-calendar__month-year-selector']}>
                {displayMonth.toLocaleString(localeCode, { month: 'long' })}
                <Icon
                  name="arrow_drop_down"
                  color="tertiary"
                  className={styles['tedi-calendar__month-year-caret']}
                  data-testid="tedi-icon-arrow_drop_down"
                />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {months.map((monthLabel, monthIndex) => (
                <Dropdown.Item
                  key={monthLabel}
                  index={monthIndex}
                  active={displayMonthIndex === monthIndex}
                  disabled={disabledMonths.has(monthIndex)}
                  onClick={() => goToMonth(new Date(displayYear, monthIndex))}
                >
                  {monthLabel}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>

          <Dropdown
            className={classNames(styles['tedi-calendar__month-year-dropdown'], {
              [styles['tedi-calendar__picker-grid-dropdown']]: isGridSelect,
            })}
            width="auto"
            // Year list spans `currentYear ± 10`. When the visible year sits
            // outside that window we omit the default so the dropdown opens
            // at the top instead of trying to focus a non-existent index.
            defaultActiveIndex={years.indexOf(displayYear) === -1 ? undefined : years.indexOf(displayYear)}
          >
            <Dropdown.Trigger>
              <Button noStyle className={styles['tedi-calendar__month-year-selector']}>
                {displayMonth.getFullYear()}
                <Icon
                  name="arrow_drop_down"
                  color="tertiary"
                  className={styles['tedi-calendar__month-year-caret']}
                  data-testid="tedi-icon-arrow_drop_down"
                />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {years.map((year, yearIndex) => (
                <Dropdown.Item
                  key={year}
                  index={yearIndex}
                  active={displayYear === year}
                  disabled={disabledYears.has(year)}
                  onClick={() => goToMonth(new Date(year, displayMonthIndex))}
                >
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </>
      )}

      {showNavigation && (
        <Button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          visualType="neutral"
          aria-label={getLabel('pickers.nextMonth')}
          icon="arrow_forward"
        >
          {getLabel('pickers.nextMonth')}
        </Button>
      )}
    </div>
  );
}
