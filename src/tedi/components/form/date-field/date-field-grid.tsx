import classNames from 'classnames';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import styles from './date-field.module.scss';

interface PickerGridItem<T> {
  key: React.Key;
  value: T;
  label: React.ReactNode;
  isSelected?: boolean;
}

interface PickerGridProps<T> {
  headerLabel: React.ReactNode;
  prevAriaLabel: string;
  nextAriaLabel: string;
  onPrev: () => void;
  onNext: () => void;
  items: PickerGridItem<T>[];
  onSelect: (value: T) => void;
}

export const PickerGrid = <T,>({
  headerLabel,
  prevAriaLabel,
  nextAriaLabel,
  onPrev,
  onNext,
  items,
  onSelect,
}: PickerGridProps<T>) => {
  return (
    <div className={classNames(styles['tedi-date-field__picker-grid-container'])}>
      <div className={classNames(styles['tedi-date-field__picker-grid-header'])}>
        <Button type="button" onClick={onPrev} aria-label={prevAriaLabel} icon="arrow_back" visualType="neutral">
          <Text modifiers="capitalize-first">{prevAriaLabel}</Text>
        </Button>

        <Text modifiers="capitalize-first">{headerLabel}</Text>

        <Button type="button" onClick={onNext} aria-label={nextAriaLabel} icon="arrow_forward" visualType="neutral">
          {nextAriaLabel}
        </Button>
      </div>

      <div className={classNames(styles['tedi-date-field__picker-grid'])}>
        <Row gutter={2}>
          {items.map((item) => (
            <Col key={item.key} width={4}>
              <Button
                noStyle
                onClick={() => onSelect(item.value)}
                className={classNames(styles['tedi-date-field__grid-button'], {
                  [styles['tedi-date-field__grid-button--selected']]: item.isSelected,
                })}
                aria-pressed={item.isSelected}
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
