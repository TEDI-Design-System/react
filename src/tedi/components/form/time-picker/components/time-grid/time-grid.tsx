import cn from 'classnames';
import { useId } from 'react';

import Button from '../../../../buttons/button/button';
import { Col, ColSize, Row } from '../../../../layout/grid';
import ChoiceGroup from '../../../choice-group/choice-group';
import styles from '../../time-picker.module.scss';

export interface TimeGridProps {
  /**
   * Times in HH:mm format
   */
  times: string[];
  /**
   * Selected value
   */
  value?: string;
  /**
   * Selection handler
   */
  onSelect: (time: string) => void;
  /**
   * Grid column width
   */
  colWidth?: ColSize;
  /**
   * Display mode
   */
  variant?: 'buttons' | 'radio';
  /*
   * Additional CSS class name for custom styling
   */
  className?: string;
}

export const TimeGrid: React.FC<TimeGridProps> = ({
  times,
  value,
  onSelect,
  className,
  colWidth = 4,
  variant = 'buttons',
}) => {
  const reactId = useId();

  if (variant === 'radio') {
    return (
      <div className={cn(styles['tedi-time-picker__grid'], className)}>
        <ChoiceGroup
          id={`time-picker-group-${reactId}`}
          label="Pick time"
          inputType="radio"
          name={`time-grid-${reactId}`}
          value={value}
          onChange={(val) => onSelect(val as string)}
          items={times.map((time) => ({
            id: `time-${time}`,
            label: time,
            value: time,
            colProps: { width: colWidth },
          }))}
          direction="row"
          variant="card"
          showIndicator
          color="secondary"
          hideLabel
        />
      </div>
    );
  }

  return (
    <div className={cn(styles['tedi-time-picker__grid'], className)}>
      <Row gutter={2}>
        {times.map((time) => (
          <Col width={colWidth} key={time}>
            <Button
              noStyle
              className={cn(styles['tedi-time-picker__grid-item'], {
                [styles['tedi-time-picker__grid-item--selected']]: time === value,
              })}
              onClick={() => onSelect(time)}
            >
              {time}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};
