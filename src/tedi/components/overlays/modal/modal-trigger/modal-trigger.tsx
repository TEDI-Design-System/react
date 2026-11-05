import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, JSX } from 'react';

import { getElementRef } from '../../../../helpers/get-element-ref';
import { useModalContext } from '../modal-context';

export interface ModalTriggerProps {
  /**
   * Element that opens the modal when clicked. The element is cloned and receives
   * the `onClick` / `aria-*` props produced by floating-ui.
   */
  children: JSX.Element;
}

export const ModalTrigger = ({ children }: ModalTriggerProps): JSX.Element => {
  const { getReferenceProps, reference } = useModalContext();

  const existingRef = getElementRef(children);
  const mergedRef = useMergeRefs([reference, existingRef]);

  return cloneElement(children, getReferenceProps({ ...children.props, ref: mergedRef }));
};

ModalTrigger.displayName = 'Modal.Trigger';
export default ModalTrigger;
