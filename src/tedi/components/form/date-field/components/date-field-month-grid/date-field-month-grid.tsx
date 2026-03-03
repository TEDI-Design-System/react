import classNames from 'classnames';

import { useLabels } from '../../../../../providers/label-provider';
import { Text } from '../../../../base/typography/text/text';
import Button from '../../../../buttons/button/button';
import { Col, Row } from '../../../../layout/grid';
import styles from '../../date-field.module.scss';

export interface MonthGridProps {
  /*
   * Current month being displayed in the calendar.
   */
  currentMonth: Date;
  /*
   * Callback when a month is selected from the grid. Receives a Date object with the selected month and current year.
   */
  onSelectMonth: (date: Date) => void;
  /*
   * Callback for navigating to a different month in the grid. Receives a Date object with the target month and current year.
   */
  onNavigate: (date: Date) => void;
}

export const MonthGrid = ({ currentMonth, onSelectMonth, onNavigate }: MonthGridProps) => {
  const { getLabel } = useLabels();
  const year = currentMonth.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  return (
    <div className={classNames(styles['tedi-date-field__picker-grid-container'])}>
      <div className={classNames(styles['tedi-date-field__picker-grid-header'])}>
        <Button
          type="button"
          onClick={() => onNavigate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          aria-label={getLabel('pickers.previousMonth')}
          icon="arrow_back"
          visualType="neutral"
        >
          <Text modifiers="capitalize-first">{getLabel('pickers.previousMonth')}</Text>
        </Button>

        <Text modifiers="capitalize-first">
          {currentMonth.toLocaleString('et-EE', { month: 'short' })} {year}
        </Text>

        <Button
          type="button"
          onClick={() => onNavigate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          aria-label={getLabel('pickers.nextMonth')}
          icon="arrow_forward"
          visualType="neutral"
        >
          {getLabel('pickers.nextMonth')}
        </Button>
      </div>

      <div className={classNames(styles['tedi-date-field__picker-grid'])}>
        <Row gutter={2}>
          {months.map((date) => (
            <Col key={date.getMonth()} width={4}>
              <Button
                noStyle
                onClick={() => onSelectMonth(date)}
                className={classNames(styles['tedi-date-field__grid-button'])}
                aria-current="true"
              >
                <Text modifiers="capitalize-first">{date.toLocaleString('et-EE', { month: 'short' })}</Text>
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
