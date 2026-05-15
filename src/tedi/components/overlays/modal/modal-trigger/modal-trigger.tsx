import { cloneElement, JSX } from 'react';

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
  return cloneElement(children, getReferenceProps({ ref: reference, ...children.props }));
};

ModalTrigger.displayName = 'Modal.Trigger';
export default ModalTrigger;
