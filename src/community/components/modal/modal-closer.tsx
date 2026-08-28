import React from 'react';

import { ModalContext } from './modal-provider';

/**
 * @deprecated Use Modal from `@tedi-design-system/react/tedi` instead.
 */
export interface ModalCloserProps {
  /**
   * The element that closes the modal.
   */
  children: React.ReactElement;
}

/**
 * @deprecated Use Modal from `@tedi-design-system/react/tedi` instead.
 */
export const ModalCloser = (props: ModalCloserProps): JSX.Element => {
  const { children } = props;
  const { closeModal } = React.useContext(ModalContext);

  return React.cloneElement(children, {
    onClick: () => {
      children.props.onClick?.();
      closeModal();
    },
  });
};

export default ModalCloser;
