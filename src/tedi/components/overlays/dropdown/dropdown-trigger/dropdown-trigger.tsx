import { cloneElement, ReactElement } from 'react';

import { useDropdownContext } from '../dropdown-context';

export type DropdownTriggerProps = {
  /**
   * The content of the trigger item (button, icon, etc)
   */
  children: ReactElement;
};

export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { refs, getReferenceProps } = useDropdownContext();

  return cloneElement(
    children,
    getReferenceProps({
      ref: refs.setReference,
    })
  );
};
