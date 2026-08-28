import React from 'react';

import { ModalContext } from './modal-provider';

/**
 * @deprecated Use Modal from `@tedi-design-system/react/tedi` instead.
 */
export interface ModalTriggerProps {
  /**
   * The element that opens the modal.
   */
  children: JSX.Element;
}

/**
 * @deprecated Use Modal from `@tedi-design-system/react/tedi` instead.
 */
export const ModalTrigger = (props: ModalTriggerProps): JSX.Element => {
  const { children } = props;
  const { getReferenceProps, reference } = React.useContext(ModalContext);

  return React.cloneElement(children, getReferenceProps({ ref: reference, ...children.props }));
};

export default ModalTrigger;
