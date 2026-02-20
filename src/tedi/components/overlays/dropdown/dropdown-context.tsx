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
};

export const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Dropdown components must be used within <Dropdown />');
  }
  return ctx;
};
