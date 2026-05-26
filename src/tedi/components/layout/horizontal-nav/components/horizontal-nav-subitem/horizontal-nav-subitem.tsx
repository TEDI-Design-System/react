import cn from 'classnames';
import React from 'react';

import styles from '../../horizontal-nav.module.scss';

export interface HorizontalNavSubItemProps {
  /**
   * Link label.
   */
  children: React.ReactNode;
  /**
   * Destination URL.
   */
  href?: string;
  /**
   * Marks this submenu item as the current page.
   * @default false
   */
  isActive?: boolean;
  /**
   * Click handler.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Render the link as a different element/component (e.g. a router `NavLink`).
   * @default a
   */
  as?: 'a' | React.ComponentType<React.AnchorHTMLAttributes<HTMLElement> & Record<string, unknown>>;
  /**
   * Additional class name applied to the anchor.
   */
  className?: string;
}

export const HorizontalNavSubItem = (props: HorizontalNavSubItemProps): JSX.Element => {
  const { children, href, isActive = false, onClick, as, className } = props;
  const Component = as ?? 'a';
  return (
    <li className={styles['tedi-horizontal-nav__subitem']}>
      <Component
        className={cn(
          styles['tedi-horizontal-nav__subitem-link'],
          { [styles['tedi-horizontal-nav__subitem-link--active']]: isActive },
          className
        )}
        href={href}
        aria-current={isActive ? 'page' : undefined}
        onClick={onClick}
      >
        {children}
      </Component>
    </li>
  );
};

export default HorizontalNavSubItem;
