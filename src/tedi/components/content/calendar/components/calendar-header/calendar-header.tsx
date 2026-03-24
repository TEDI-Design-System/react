import classNames from 'classnames';
import { MonthCaptionProps, useNavigation } from 'react-day-picker';

import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import Button from '../../../../buttons/button/button';
import { Dropdown } from '../../../../overlays/dropdown';
import styles from './calendar-header.module.scss';

export interface CalendarHeaderProps extends Pick<MonthCaptionProps, 'calendarMonth'> {
  /**
   * Show month/year selection as grid instead of dropdowns.
   * Default is `false` (dropdowns).
   */
  monthYearSelectGrid?: boolean;
  /*
   * Callback for opening month selection grid. Only used if `monthYearSelectGrid` is `true`.
   */
  onOpenMonthGrid?: () => void;
  /*
   * Callback for opening year selection grid. Only used if `monthYearSelectGrid` is `true`.
   */
  onOpenYearGrid?: () => void;
}

export function CalendarHeader({
  calendarMonth,
  monthYearSelectGrid,
  onOpenMonthGrid,
  onOpenYearGrid,
}: CalendarHeaderProps) {
  const { getLabel } = useLabels();
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const displayMonth = calendarMonth.date;
  const months = Array.from({ length: 12 }, (_, i) => new Date(2025, i, 1).toLocaleString('et-EE', { month: 'long' }));
  const years = Array.from({ length: 10 }, (_, i) => 2021 + i);

  return (
    <div className={styles['tedi-date-calendar__header']}>
      <Button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        aria-label={getLabel('pickers.previousMonth')}
        icon="arrow_back"
        visualType="neutral"
      >
        {getLabel('pickers.previousMonth')}
      </Button>

      {monthYearSelectGrid ? (
        <>
          <Button noStyle className={styles['tedi-date-calendar__month-year-selector']} onClick={onOpenMonthGrid}>
            {displayMonth.toLocaleString('et-EE', { month: 'long' })}
            <Icon name="arrow_drop_down" color="tertiary" className={styles['tedi-date-calendar__month-year-caret']} />
          </Button>
          <Button noStyle className={styles['tedi-date-calendar__month-year-selector']} onClick={onOpenYearGrid}>
            {displayMonth.getFullYear()}
            <Icon name="arrow_drop_down" color="tertiary" className={styles['tedi-date-calendar__month-year-caret']} />
          </Button>
        </>
      ) : (
        <>
          <Dropdown
            className={classNames(
              styles['tedi-date-calendar__month-year-dropdown'],
              monthYearSelectGrid ? styles['tedi-date-calendar__picker-grid-dropdown'] : undefined
            )}
            width="auto"
          >
            <Dropdown.Trigger>
              <Button noStyle className={styles['tedi-date-calendar__month-year-selector']}>
                {displayMonth.toLocaleString('et-EE', { month: 'long' })}{' '}
                <Icon
                  name="arrow_drop_down"
                  color="tertiary"
                  className={styles['tedi-date-calendar__month-year-caret']}
                />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {months.map((monthLabel, monthIndex) => (
                <Dropdown.Item
                  key={monthLabel}
                  index={monthIndex}
                  active={displayMonth.getMonth() === monthIndex}
                  onClick={() => goToMonth(new Date(displayMonth.getFullYear(), monthIndex))}
                >
                  {monthLabel}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>

          <Dropdown
            className={classNames(
              styles['tedi-date-calendar__month-year-dropdown'],
              monthYearSelectGrid ? styles['tedi-date-calendar__picker-grid-dropdown'] : undefined
            )}
            width="auto"
          >
            <Dropdown.Trigger>
              <Button noStyle className={styles['tedi-date-calendar__month-year-selector']}>
                {displayMonth.getFullYear()}{' '}
                <Icon
                  name="arrow_drop_down"
                  color="tertiary"
                  className={styles['tedi-date-calendar__month-year-caret']}
                />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {years.map((year) => (
                <Dropdown.Item
                  key={year}
                  active={displayMonth.getFullYear() === year}
                  onClick={() => goToMonth(new Date(year, displayMonth.getMonth()))}
                >
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </>
      )}

      <Button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        visualType="neutral"
        aria-label={getLabel('pickers.nextMonth')}
        icon="arrow_forward"
      >
        {getLabel('pickers.nextMonth')}
      </Button>
    </div>
  );
}
