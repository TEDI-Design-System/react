import classNames from 'classnames';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import styles from './calendar.module.scss';

export interface PickerGridItem<T> {
  key: React.Key;
  value: T;
  label: React.ReactNode;
  isSelected?: boolean;
}

export interface PickerGridProps<T> {
  headerLabel: React.ReactNode;
  prevAriaLabel: string;
  nextAriaLabel: string;
  onPrev: () => void;
  onNext: () => void;
  items: PickerGridItem<T>[];
  onSelect: (value: T) => void;
  showNavigation?: boolean;
  className?: string;
}

export const PickerGrid = <T,>({
  headerLabel,
  prevAriaLabel,
  nextAriaLabel,
  onPrev,
  onNext,
  items,
  onSelect,
  showNavigation,
  className,
}: PickerGridProps<T>) => {
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
            {nextAriaLabel}
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
