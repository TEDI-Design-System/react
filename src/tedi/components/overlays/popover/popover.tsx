import { OffsetOptions } from '@floating-ui/react';

import Overlay, { OverlayOpenWith, OverlayProps } from '../overlay/overlay';
import { PopoverContent } from './popover-content';
import { PopoverContext } from './popover-context';
import { PopoverTrigger } from './popover-trigger';

const ARROW_WIDTH = 34 as const;
const ARROW_HEIGHT = 17 as const;
const ARROW_PADDING_BORDERED = 12 as const;
const ARROW_PADDING_DEFAULT = 4 as const;

export interface PopoverProps extends Omit<OverlayProps, 'arrowDimensions' | 'openWith' | 'offset' | 'arrowPadding'> {
  /**
   * Adds correct event listeners that change the open state.
   * @default click
   */
  openWith?: OverlayOpenWith;
  /**
   * Offset of content.
   * @default GAP + ARROW_HEIGHT (3px + 17px)
   */
  offset?: OffsetOptions;
  /**
   * If true, popover renders with an illustrative border on the arrow side
   * and extra arrow padding so the arrow's shoulders stay clear of the
   * rounded corner on `-start` / `-end` placements.
   * @default false
   */
  withBorder?: boolean;
}

export const Popover = (props: PopoverProps) => {
  const { openWith = 'click', withBorder = false, ...rest } = props;

  return (
    <PopoverContext.Provider value={{ withBorder }}>
      <Overlay
        {...rest}
        arrowDimensions={{
          width: ARROW_WIDTH,
          height: ARROW_HEIGHT,
        }}
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
