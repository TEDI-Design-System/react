import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../modal.module.scss';

export interface ModalBodyProps {
  /**
   * Body content.
   */
  children: ReactNode;
  /**
   * Disable the body's internal scroll. Use when the modal is wrapped in
   * `<Modal.Content scrollBehavior="page">` and overflow is handled by the page.
   * @default false
   */
  noScroll?: boolean;
  /**
   * Additional class name.
   */
  className?: string;
}

export const ModalBody = ({ children, noScroll = false, className }: ModalBodyProps): JSX.Element => (
  <div
    className={cn(
      styles['tedi-modal__body'],
      {
        [styles['tedi-modal__body--scroll-page']]: noScroll,
      },
      className
    )}
  >
    {children}
  </div>
);

ModalBody.displayName = 'Modal.Body';
export default ModalBody;
