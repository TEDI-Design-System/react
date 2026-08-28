import { cloneElement, MouseEvent, ReactElement } from 'react';

import { useModalContext } from '../modal-context';

export interface ModalCloserProps {
  /**
   * Element that closes the modal when clicked. The element is cloned and receives
   * a wrapped `onClick` that calls the original handler first, then closes the modal.
   */
  children: ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void }>;
}

export const ModalCloser = ({ children }: ModalCloserProps): JSX.Element => {
  const { onOpenChange } = useModalContext();
  return cloneElement(children, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event);
      onOpenChange(false);
    },
  });
};

ModalCloser.displayName = 'Modal.Closer';
export default ModalCloser;
