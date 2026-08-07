import cn from 'classnames';
import { useEffect, useId, useRef } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { ColProps, ColSize } from '../../../../layout/grid';
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
   * Display mode. Both variants render the same `ChoiceGroup` card radio
   * underneath — the only difference is the leading radio indicator:
   *
   * - `'button'` (default) — card with the label only, no dot.
   * - `'radio'` — card with the radio dot before the label.
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
    const target = root.querySelector<HTMLElement>(`input[type="radio"][value="${value}"]`);
    target?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('input[type="radio"]:not([disabled])'));
    if (items.length === 0) return;

    const currentIndex = items.findIndex((el) => el === document.activeElement);
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = currentIndex < 0 || currentIndex === items.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    items[nextIndex]?.focus();
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

  return (
    <div ref={rootRef} className={rootClassName} onKeyDown={handleKeyDown}>
      <ChoiceGroup
        id={`time-picker-group-${timeGridId}`}
        label={getLabel('timePicker.pickTime')}
        inputType="radio"
        name={`time-grid-${timeGridId}`}
        value={value}
        onChange={(val) => onSelect(val as string)}
        items={times.map((time) => ({
          id: `time-${timeGridId}-${time}`,
          label: variant === 'button' ? <span className={styles['tedi-time-picker__slot-label']}>{time}</span> : time,
          value: time,
          colProps: resolvedColProps,
        }))}
        direction="row"
        variant="card"
        showIndicator={variant === 'radio'}
        color="secondary"
        hideLabel
      />
    </div>
  );
};

TimeGrid.displayName = 'TimeGrid';
