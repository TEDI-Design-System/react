import cn from 'classnames';
import { useEffect, useId, useRef } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import Button from '../../../../buttons/button/button';
import { Col, ColProps, ColSize, Row } from '../../../../layout/grid';
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
   * Grid column width per time slot. Accepts either:
   *
   * - a single `ColSize` (1–12 or `'auto'`) applied at every breakpoint, or
   * - a breakpoint object (`{ xs?, sm?, md?, lg?, xl?, xxl? }`) for responsive
   *   layouts.
   *
   * Default is `{ xs: 6, md: 4 }` — 2 slots per row on phones (where 33%
   * is too narrow for the radio card's intrinsic content width and would
   * otherwise wrap one-per-row), 3 slots per row from `md` up.
   */
  colWidth?: ColSize | Pick<ColProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>;
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
  colWidth = { xs: 6, md: 4 },
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
    const target = root.querySelector<HTMLElement>(
      `input[type="radio"][value="${value}"], button[data-time="${value}"]`
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
    {
      [styles['tedi-time-picker__grid--borderless']]: !bordered,
    },
    className
  );

  const resolvedColProps: Pick<ColProps, 'width' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'> =
    typeof colWidth === 'object' ? colWidth : { width: colWidth };

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
            colProps: resolvedColProps,
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
          <Col {...resolvedColProps} key={time}>
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
