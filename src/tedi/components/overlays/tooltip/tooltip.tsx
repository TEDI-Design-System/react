import { OffsetOptions } from '@floating-ui/react';

import Overlay, { OverlayOpenWith, OverlayProps } from '../overlay/overlay';
import { TooltipContent } from './tooltip-content';
import { TooltipTrigger } from './tooltip-trigger';

const ARROW_HEIGHT = 7 as const;
const ARROW_WIDTH = 14 as const;

export interface TooltipProps
  extends Omit<OverlayProps, 'arrowDimensions' | 'openWith' | 'offset' | 'dismissible' | 'scrollLock'> {
  /**
   * Adds correct event listeners that change the open state.
   * @default hover
   */
  openWith?: OverlayOpenWith;
  /**
   * Offset of content.
   * @default GAP + ARROW_HEIGHT (3px + 7px)
   */
  offset?: OffsetOptions;
}

export const Tooltip = (props: TooltipProps) => {
  const { openWith = 'hover', focusManager, ...rest } = props;

  return (
    <Overlay
      arrowDimensions={{
        width: ARROW_WIDTH,
        height: ARROW_HEIGHT,
      }}
      openWith={openWith}
      role="tooltip"
      focusManager={{
        modal: false,
        order: ['reference', 'content'],
        // Tooltips are non-interactive (just descriptive text), so the focus
        // manager must not move focus on open or close. `initialFocus: -1`
        // skips the programmatic `.focus()` on the trigger when the tooltip
        // mounts — that programmatic focus is what the browser's
        // `:focus-visible` heuristic was upgrading to a "keyboard-style" ring,
        // leaving the trigger painted with the focus border after a plain
        // hover or mouse click.
        initialFocus: -1,
        returnFocus: false,
        ...focusManager,
      }}
      {...rest}
    />
  );
};

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
export default Tooltip;
