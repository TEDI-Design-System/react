import { createContext } from 'react';

export interface PopoverContextValue {
  /**
   * If true, the popover is rendered with an illustrative border on the arrow
   * side. Consumed by `Popover.Content` to apply the `--border` modifier
   * classes.
   */
  withBorder: boolean;
}

export const PopoverContext = createContext<PopoverContextValue>({
  withBorder: false,
});
