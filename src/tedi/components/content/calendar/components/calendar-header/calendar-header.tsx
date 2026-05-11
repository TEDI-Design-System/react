import classNames from 'classnames';
import { MonthCaptionProps, useNavigation } from 'react-day-picker';

import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
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
}

export function CalendarHeader({
  calendarMonth,
  monthYearSelectType = 'dropdown',
  onOpenMonthGrid,
  onOpenYearGrid,
  showNavigation = true,
  localeCode,
}: CalendarHeaderProps) {
  const isGridSelect = monthYearSelectType === 'grid';
  const { getLabel } = useLabels();
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const displayMonth = calendarMonth.date;
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(2025, i, 1).toLocaleString(localeCode, { month: 'long' })
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

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

      {isGridSelect ? (
        <>
          <Button noStyle className={styles['tedi-calendar__month-year-selector']} onClick={onOpenMonthGrid}>
            {displayMonth.toLocaleString(localeCode, { month: 'long' })}
            <Icon name="arrow_drop_down" color="tertiary" className={styles['tedi-calendar__month-year-caret']} />
          </Button>
          <Button noStyle className={styles['tedi-calendar__month-year-selector']} onClick={onOpenYearGrid}>
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
                  active={displayMonth.getMonth() === monthIndex}
                  onClick={() => goToMonth(new Date(displayMonth.getFullYear(), monthIndex))}
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
