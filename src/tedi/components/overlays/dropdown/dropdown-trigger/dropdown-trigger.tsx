import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, ReactElement } from 'react';

import { getElementRef } from '../../../../helpers/get-element-ref';
import { useDropdownContext } from '../dropdown-context';

export type DropdownTriggerProps = {
  /**
   * The content of the trigger item (button, icon, etc)
   */
  children: ReactElement;
};

export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { refs, getReferenceProps, navigation, open, contentId } = useDropdownContext();
  const childRef = getElementRef(children);
  const mergedRef = useMergeRefs([refs.setReference, childRef]);

  const navigationProps = navigation
    ? { 'aria-expanded': open, 'aria-controls': open ? contentId : undefined }
    : undefined;

  return cloneElement(
    children,
    getReferenceProps({
      ...children.props,
      ...navigationProps,
      ref: mergedRef,
    })
  );
};
