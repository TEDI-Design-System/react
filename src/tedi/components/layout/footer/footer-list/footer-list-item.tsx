import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../footer.module.scss';

export interface FooterListItemProps {
  /**
   * Item content — typically a single `<Link>`.
   */
  children: ReactNode;
  /**
   * Additional class name on the `<li>`.
   */
  className?: string;
}

export const FooterListItem = ({ children, className }: FooterListItemProps): JSX.Element => (
  <li className={cn(styles['tedi-footer-list__item'], className)}>{children}</li>
);

FooterListItem.displayName = 'Footer.ListItem';

export default FooterListItem;
