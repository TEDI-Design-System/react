import cn from 'classnames';
import { useEffect, useId, useRef } from 'react';

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
  /**
   * Whether to render the surrounding card chrome (border, background, radius).
   * @default true
   */
  bordered?: boolean;
}

export const TimeGrid: React.FC<TimeGridProps> = ({
  times,
  value,
  onSelect,
  className,
  colWidth = 4,
  variant = 'button',
  bordered = true,
}) => {
  const timeGridId = useId();
  const { getLabel } = useLabels();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) return;
    const root = rootRef.current;
    if (!root) return;

    const safeValue = CSS.escape(value);
    const target = root.querySelector<HTMLElement>(
      `input[type="radio"][value="${safeValue}"], button[data-time="${safeValue}"]`
    );
    target?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRadioKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (variant !== 'radio') return;
    const root = rootRef.current;
    if (!root) return;

    const radios = Array.from(root.querySelectorAll<HTMLInputElement>('input[type="radio"]:not([disabled])'));
    if (radios.length === 0) return;

    const currentIndex = radios.findIndex((r) => r === document.activeElement);
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = currentIndex < 0 || currentIndex === radios.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = currentIndex <= 0 ? radios.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = radios.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    radios[nextIndex]?.focus();
  };

  const rootClassName = cn(
    styles['tedi-time-picker__grid'],
    { [styles['tedi-time-picker__grid--borderless']]: !bordered },
    className
  );

  if (variant === 'radio') {
    return (
      <div ref={rootRef} className={rootClassName} onKeyDown={handleRadioKeyDown}>
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
    <div ref={rootRef} className={rootClassName}>
      <Row gutter={2}>
        {times.map((time) => (
          <Col width={colWidth} key={time}>
            <Button
              noStyle
              data-time={time}
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
