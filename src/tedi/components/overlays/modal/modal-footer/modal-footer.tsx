import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../modal.module.scss';

export interface ModalFooterProps {
  /**
   * Content placed on the right side of the footer (the primary actions).
   * If `left` is omitted, the footer simply right-aligns these children.
   */
  children?: ReactNode;
  /**
   * Content placed on the left side of the footer. When set, the footer splits into
   * `left` + `right` halves — matches Figma's "Buttons left and right" variant.
   */
  left?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const ModalFooter = ({ children, left, className }: ModalFooterProps): JSX.Element => {
  const isSplit = Boolean(left);
  return (
    <div
      className={cn(
        styles['tedi-modal__footer'],
        styles[isSplit ? 'tedi-modal__footer--split' : 'tedi-modal__footer--end'],
        className
      )}
    >
      {isSplit && <div className={styles['tedi-modal__footer-side']}>{left}</div>}
      <div className={cn(styles['tedi-modal__footer-side'], styles['tedi-modal__footer-side--right'])}>{children}</div>
    </div>
  );
};

ModalFooter.displayName = 'Modal.Footer';
export default ModalFooter;
