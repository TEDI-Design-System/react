import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, ReactElement } from 'react';

import { getElementRef } from '../../../../helpers';
import { useDropdownContext } from '../dropdown-context';

export type DropdownTriggerProps = {
  /**
   * The content of the trigger item (button, icon, etc)
   */
  children: ReactElement;
};

export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { refs, getReferenceProps } = useDropdownContext();
  const childRef = getElementRef(children);
  const mergedRef = useMergeRefs([refs.setReference, childRef]);

  return cloneElement(
    children,
    getReferenceProps({
      ...children.props,
      ref: mergedRef,
    })
  );
};
