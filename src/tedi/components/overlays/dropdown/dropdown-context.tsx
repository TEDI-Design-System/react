import { useFloating, useInteractions } from '@floating-ui/react';
import React, { useContext } from 'react';

/**
 * State that `Dropdown` shares with its parts, read with `useDropdownContext`.
 */
export type DropdownContextValue = {
  open: boolean;
  /** Calls `onOpenChange`, and updates the open state when uncontrolled. */
  setOpen: (open: boolean) => void;
  /** Floating UI refs for the trigger (`reference`) and the panel (`floating`). */
  refs: ReturnType<typeof useFloating>['refs'];
  /** Floating UI props for the trigger. */
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
  /** Floating UI props for the panel. */
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
  /** Floating UI props for an item: list navigation handlers and its roving `tabindex`. */
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  /** The items' focusable elements by `index`; a `Checkbox` / `Radio` item registers its input. */
  listItemsRef: React.MutableRefObject<Array<HTMLButtonElement | null>>;
  /** Index of the item that takes Tab focus, or `null` when none does. */
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  placement?: string;
  /** The children of `Dropdown.Content`, rendered in the panel. */
  content: React.ReactNode;
  /** Called by `Dropdown.Content` to set the panel's content. */
  setContent: (content: React.ReactNode) => void;
  divided?: boolean;
  variant?: 'default' | 'tree';
  /** The dropdown holds links, so the items have no menu roles and are each a Tab stop. */
  navigation?: boolean;
  /** Id of the panel's content; the trigger's `aria-controls` points to it in navigation mode. */
  contentId?: string;
  /** The `Dropdown.Header` element, used to move focus between its controls and the items. */
  headerRef?: React.RefObject<HTMLDivElement>;
};

export const DropdownContext = React.createContext<DropdownContextValue | null>(null);

/** Returns the surrounding `Dropdown`'s context; throws outside one. */
export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Dropdown components must be used within <Dropdown />');
  }
  return ctx;
};
