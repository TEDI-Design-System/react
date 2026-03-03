import classNames from 'classnames';

import { useLabels } from '../../../../../providers/label-provider';
import { Text } from '../../../../base/typography/text/text';
import Button from '../../../../buttons/button/button';
import { Col, Row } from '../../../../layout/grid';
import styles from '../../date-field.module.scss';

export interface YearGridProps {
  /*
   * Current month being displayed in the calendar. Year will be extracted from this.
   */
  currentMonth: Date;
  /*
   * Callback when a year is selected from the grid. Receives a Date object with the selected year and current month.
   */
  onYearChange: (date: Date) => void;
  /*
   * Callback for navigating to a different year range in the grid. Receives a Date object with the target year and current month.
   */
  onBackToMonths: () => void;
}

export const YearGrid = ({ currentMonth, onYearChange, onBackToMonths }: YearGridProps) => {
  const { getLabel } = useLabels();
  const currentYear = currentMonth.getFullYear();
  const startYear = Math.floor(currentYear / 12) * 12;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <div className={classNames(styles['tedi-date-field__picker-grid-container'])}>
      <div className={classNames(styles['tedi-date-field__picker-grid-header'])}>
        <Button
          type="button"
          onClick={() => onYearChange(new Date(startYear - 12, 0))}
          aria-label={getLabel('pickers.previousYear')}
          icon="arrow_back"
          visualType="neutral"
        >
          <Text modifiers="capitalize-first">{getLabel('pickers.previousYear')}</Text>
        </Button>

        <Text modifiers="capitalize-first">
          {startYear} – {startYear + 11}
        </Text>

        <Button
          type="button"
          onClick={() => onYearChange(new Date(startYear + 12, 0))}
          aria-label={getLabel('pickers.nextYear')}
          icon="arrow_forward"
          visualType="neutral"
        >
          {getLabel('pickers.nextYear')}
        </Button>
      </div>

      <div className={classNames(styles['tedi-date-field__picker-grid'])}>
        <Row gutter={2}>
          {years.map((year) => (
            <Col key={year} width={4}>
              <Button
                noStyle
                onClick={() => {
                  onYearChange(new Date(year, currentMonth.getMonth()));
                  onBackToMonths();
                }}
                className={classNames(styles['tedi-date-field__grid-button'])}
                aria-current="true"
              >
                {year}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
