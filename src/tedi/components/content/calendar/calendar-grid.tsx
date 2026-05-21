import classNames from 'classnames';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import styles from './calendar.module.scss';

export interface CalendarGridItem<T> {
  key: React.Key;
  value: T;
  label: React.ReactNode;
  isSelected?: boolean;
}

export interface CalendarGridProps<T> {
  headerLabel: React.ReactNode;
  prevAriaLabel: string;
  nextAriaLabel: string;
  onPrev: () => void;
  onNext: () => void;
  items: CalendarGridItem<T>[];
  onSelect: (value: T) => void;
  showNavigation?: boolean;
  className?: string;
}

export const CalendarGrid = <T,>({
  headerLabel,
  prevAriaLabel,
  nextAriaLabel,
  onPrev,
  onNext,
  items,
  onSelect,
  showNavigation,
  className,
}: CalendarGridProps<T>) => {
  return (
    <div
      className={classNames(styles['tedi-calendar__picker-grid-container'], className)}
      data-testid="tedi-picker-grid-container"
    >
      <div
        className={classNames(styles['tedi-calendar__picker-grid-header'], {
          [styles['tedi-calendar__picker--no-navigation']]: !showNavigation,
        })}
      >
        {showNavigation && (
          <Button type="button" onClick={onPrev} aria-label={prevAriaLabel} icon="arrow_back" visualType="neutral">
            <Text modifiers="capitalize-first">{prevAriaLabel}</Text>
          </Button>
        )}

        <Text modifiers="capitalize-first">{headerLabel}</Text>

        {showNavigation && (
          <Button type="button" onClick={onNext} aria-label={nextAriaLabel} icon="arrow_forward" visualType="neutral">
            <Text modifiers="capitalize-first">{nextAriaLabel}</Text>
          </Button>
        )}
      </div>

      <div className={classNames(styles['tedi-calendar__picker-grid'])}>
        <Row gutter={2}>
          {items.map((item) => (
            <Col key={item.key} width={4}>
              <Button
                onClick={() => onSelect(item.value)}
                className={classNames(styles['tedi-calendar__grid-button'], {
                  [styles['tedi-calendar__grid-button--selected']]: item.isSelected,
                })}
                aria-pressed={item.isSelected}
                data-testid="tedi-calendar-grid-cell"
                noStyle
              >
                {item.label}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

CalendarGrid.displayName = 'CalendarGrid';
