import cn from 'classnames';
import React, { JSX, ReactNode, useRef, useState } from 'react';

import { Button, Icon, useLabels } from '../../../../tedi';
import styles from './split-pane.module.scss';

type PaneSide = 'first' | 'second';
type PaneEdge = 'top' | 'right' | 'bottom' | 'left';
type SplitPaneDirection = 'horizontal' | 'vertical';

export interface SplitPaneProps {
  /** Content of the first (left in horizontal, top in vertical) pane. */
  first: ReactNode;
  /** Content of the second (right in horizontal, bottom in vertical) pane. */
  second: ReactNode;
  /** Layout axis: `horizontal` places panes side by side, `vertical` stacks them. */
  direction: SplitPaneDirection;
  /** Draws an accent ring around the given pane to mark it as active. */
  highlightedSide?: PaneSide;
  /** When provided, renders a close button on the divider. */
  onClose?: () => void;
  /**
   * Initial size of the first pane as a percentage of the container, clamped to 20–80.
   * @default 50
   */
  initialRatio?: number;
  /** Called with the final ratio (%) when a drag or keyboard adjustment event ends. */
  onRatioChange?: (ratio: number) => void;
}

const MIN_RATIO = 20;
const MAX_RATIO = 80;
const KEYBOARD_STEP = 2;

const clampRatio = (value: number): number => Math.max(MIN_RATIO, Math.min(MAX_RATIO, value));

const getOmittedEdge = (isHorizontal: boolean, side: PaneSide): PaneEdge => {
  if (isHorizontal) {
    return side === 'first' ? 'right' : 'left';
  }

  return side === 'first' ? 'bottom' : 'top';
};

interface SplitPaneRingProps {
  direction: SplitPaneDirection;
  side: PaneSide;
}

const SplitPaneRing = ({ direction, side }: SplitPaneRingProps): JSX.Element => {
  const omittedEdge = getOmittedEdge(direction === 'horizontal', side);

  return (
    <div
      data-testid="active-pane-ring"
      aria-hidden
      className={cn(styles['tedi-split-pane__ring'], styles[`tedi-split-pane__ring--omit-${omittedEdge}`])}
    />
  );
};

export const SplitPane = (props: SplitPaneProps): JSX.Element => {
  const { first, second, direction, highlightedSide, onClose, initialRatio = 50, onRatioChange } = props;
  const { getLabel } = useLabels();

  const [ratio, setRatio] = useState<number>(() => clampRatio(initialRatio));
  const ratioRef = useRef<number>(ratio);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHorizontal = direction === 'horizontal';

  const applyRatio = (next: number): void => {
    const clamped = clampRatio(next);
    ratioRef.current = clamped;
    setRatio(clamped);
  };

  const updateRatioFromPoint = (x: number, y: number): void => {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const raw = isHorizontal ? ((x - rect.left) / rect.width) * 100 : ((y - rect.top) / rect.height) * 100;

    applyRatio(raw);
  };

  const commitRatio = (): void => {
    onRatioChange?.(ratioRef.current);
  };

  const startDrag = (): void => {
    const onMouseMove = (event: MouseEvent): void => updateRatioFromPoint(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent): void => {
      const touch = event.touches[0];
      if (touch) {
        updateRatioFromPoint(touch.clientX, touch.clientY);
      }
    };
    const onEnd = (): void => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onEnd);
      commitRatio();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onEnd);
  };

  const handleMouseDown = (event: React.MouseEvent): void => {
    event.preventDefault();
    startDrag();
  };

  const handleTouchStart = (): void => {
    startDrag();
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    const decreaseKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const increaseKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    let next: number | null = null;
    if (event.key === decreaseKey) {
      next = ratioRef.current - KEYBOARD_STEP;
    } else if (event.key === increaseKey) {
      next = ratioRef.current + KEYBOARD_STEP;
    } else if (event.key === 'Home') {
      next = MIN_RATIO;
    } else if (event.key === 'End') {
      next = MAX_RATIO;
    }

    if (next === null) {
      return;
    }

    event.preventDefault();
    applyRatio(next);
    commitRatio();
  };

  return (
    <div
      ref={containerRef}
      data-testid="split-pane"
      className={cn(styles['tedi-split-pane'], styles[`tedi-split-pane--${direction}`])}
    >
      <div data-testid="split-pane-first" className={styles['tedi-split-pane__pane']} style={{ flexGrow: ratio }}>
        {first}
        {highlightedSide === 'first' && <SplitPaneRing direction={direction} side="first" />}
      </div>

      <div
        role="separator"
        tabIndex={0}
        aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
        aria-valuemin={MIN_RATIO}
        aria-valuemax={MAX_RATIO}
        aria-valuenow={Math.round(ratio)}
        aria-label={getLabel('splitPaneResize')}
        data-testid="split-pane-divider"
        className={styles['tedi-split-pane__divider']}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
      >
        <span data-testid="split-pane-handle" aria-hidden className={styles['tedi-split-pane__handle']}>
          <Icon name={isHorizontal ? 'code' : 'unfold_more'} size={18} />
        </span>

        {onClose && (
          <Button
            data-testid="split-pane-close"
            visualType="secondary"
            icon="close"
            className={styles['tedi-split-pane__close']}
            onClick={onClose}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {getLabel('close')}
          </Button>
        )}
      </div>

      <div
        data-testid="split-pane-second"
        className={styles['tedi-split-pane__pane']}
        style={{ flexGrow: 100 - ratio }}
      >
        {second}
        {highlightedSide === 'second' && <SplitPaneRing direction={direction} side="second" />}
      </div>
    </div>
  );
};

SplitPane.displayName = 'SplitPane';

export default SplitPane;
