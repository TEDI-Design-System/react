import { useFloating, useInteractions } from '@floating-ui/react';
import React, { useContext } from 'react';

export type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>['refs'];
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  listItemsRef: React.MutableRefObject<Array<HTMLButtonElement | null>>;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  placement?: string;
  content: React.ReactNode;
  setContent: (content: React.ReactNode) => void;
  divided?: boolean;
  variant?: 'default' | 'tree';
  /**
   * Navigation mode: the dropdown holds links rather than menu commands. Disables the
   * `menu`/`menuitem` roles and roving tabindex so items are announced as links and are
   * natural Tab stops.
   */
  navigation?: boolean;
  /** Id applied to the floating content; referenced by the trigger's `aria-controls` in navigation mode. */
  contentId?: string;
};

export const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Dropdown components must be used within <Dropdown />');
  }
  return ctx;
};
