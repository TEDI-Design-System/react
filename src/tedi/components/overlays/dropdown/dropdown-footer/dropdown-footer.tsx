import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../dropdown.module.scss';

export type DropdownFooterProps = {
  /**
   * Content below the items, such as a "Log out" button, placed inside `Dropdown.Content`; it stays in
   * place when the items scroll and is reached with Tab.
   */
  children: ReactNode;
  /**
   * Additional class name(s) for the footer.
   */
  className?: string;
};

export const DropdownFooter = ({ children, className }: DropdownFooterProps) => (
  <div className={cn(styles['tedi-dropdown__footer'], className)}>{children}</div>
);

DropdownFooter.displayName = 'DropdownFooter';
