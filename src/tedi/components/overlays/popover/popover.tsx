import { OffsetOptions } from '@floating-ui/react';

import Overlay, { OverlayOpenWith, OverlayProps } from '../overlay/overlay';
import { PopoverContent } from './popover-content';
import { PopoverContext } from './popover-context';
import { PopoverTrigger } from './popover-trigger';

const ARROW_WIDTH = 34 as const;
const ARROW_HEIGHT = 17 as const;
const ARROW_PADDING_BORDERED = 12 as const;
const ARROW_PADDING_DEFAULT = 4 as const;
const GAP = 3 as const;

/** A number or `{ mainAxis, crossAxis, alignmentAxis }` — `OffsetOptions` minus its function variant. */
type OffsetValue = Exclude<OffsetOptions, (...args: never[]) => unknown>;

const addToMainAxis = (value: OffsetValue, extra: number): OffsetValue =>
  typeof value === 'number' ? value + extra : { ...value, mainAxis: (value.mainAxis ?? 0) + extra };

/**
 * Adds the arrow's height to the gap, whatever form `offset` takes.
 * @internal
 */
export const addArrowGap = (offset: OffsetOptions, arrowHeight: number): OffsetOptions => {
  if (arrowHeight === 0) return offset;
  if (typeof offset === 'function') return (state) => addToMainAxis(offset(state), arrowHeight);
  return addToMainAxis(offset, arrowHeight);
};

export interface PopoverProps extends Omit<OverlayProps, 'arrowDimensions' | 'openWith' | 'offset' | 'arrowPadding'> {
  /**
   * Adds correct event listeners that change the open state.
   * @default click
   */
  openWith?: OverlayOpenWith;
  /**
   * Gap in px between the trigger and the popover. When `withArrow` is `true`, the arrow's
   * height (17px) is added on top, so the value is the visible gap with or without the arrow.
   * Also accepts Floating UI's `{ mainAxis, crossAxis, alignmentAxis }` object or a function.
   * @default 3
   */
  offset?: OffsetOptions;
  /**
   * Show the arrow pointing to the trigger.
   * @default true
   */
  withArrow?: boolean;
  /**
   * If true, popover renders with an illustrative border on the arrow side
   * and extra arrow padding so the arrow's shoulders stay clear of the
   * rounded corner on `-start` / `-end` placements.
   * @default false
   */
  withBorder?: boolean;
}

export const Popover = (props: PopoverProps) => {
  const { openWith = 'click', withBorder = false, withArrow = true, offset = GAP, ...rest } = props;

  return (
    <PopoverContext.Provider value={{ withBorder, withArrow }}>
      <Overlay
        {...rest}
        arrowDimensions={withArrow ? { width: ARROW_WIDTH, height: ARROW_HEIGHT } : undefined}
        offset={addArrowGap(offset, withArrow ? ARROW_HEIGHT : 0)}
        arrowPadding={withBorder ? ARROW_PADDING_BORDERED : ARROW_PADDING_DEFAULT}
        openWith={openWith}
        role="dialog"
      />
    </PopoverContext.Provider>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
export default Popover;
