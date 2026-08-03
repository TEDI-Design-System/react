import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, ReactElement, Ref } from 'react';

import { useDropdownContext } from '../dropdown-context';

export type DropdownTriggerProps = {
  /**
   * The content of the trigger item (button, icon, etc)
   */
  children: ReactElement;
};

export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { refs, getReferenceProps } = useDropdownContext();
  const childRef =
    (children.props as { ref?: Ref<HTMLElement> }).ref ??
    (children as ReactElement & { ref?: Ref<HTMLElement> }).ref ??
    null;
  const mergedRef = useMergeRefs([refs.setReference, childRef]);

  return cloneElement(
    children,
    getReferenceProps({
      ...children.props,
      ref: mergedRef,
    })
  );
};
