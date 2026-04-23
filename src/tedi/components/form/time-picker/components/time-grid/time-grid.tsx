import cn from 'classnames';
import { useId } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
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
  variant?: 'button' | 'radio';
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
  variant = 'button',
}) => {
  const timeGridId = useId();
  const { getLabel } = useLabels();

  if (variant === 'radio') {
    return (
      <div className={cn(styles['tedi-time-picker__grid'], className)}>
        <ChoiceGroup
          id={`time-picker-group-${timeGridId}`}
          label={getLabel('timePicker.pickTime')}
          inputType="radio"
          name={`time-grid-${timeGridId}`}
          value={value}
          onChange={(val) => onSelect(val as string)}
          items={times.map((time) => ({
            id: `time-${timeGridId}-${time}`,
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

TimeGrid.displayName = 'TimeGrid';
