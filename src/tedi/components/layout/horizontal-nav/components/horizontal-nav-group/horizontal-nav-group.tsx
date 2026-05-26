import cn from 'classnames';
import React from 'react';

import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import styles from '../../horizontal-nav.module.scss';

export interface HorizontalNavGroupProps {
  /**
   * Uppercase section title rendered above the link list. When omitted, the
   * heading is not rendered — useful for a single-column mega-menu that only
   * lists links.
   */
  title?: React.ReactNode;
  /**
   * `HorizontalNav.SubItem` children. Anything else is ignored.
   */
  children: React.ReactNode;
  /**
   * Optional leading icon rendered next to the title — material-symbol name or
   * full `IconWithoutBackgroundProps`. Ignored when `title` is omitted.
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Additional class name applied to the column.
   */
  className?: string;
}

export const HorizontalNavGroup = ({ title, children, icon, className }: HorizontalNavGroupProps): JSX.Element => (
  <section className={cn(styles['tedi-horizontal-nav__group'], className)}>
    {title && (
      <h3 className={styles['tedi-horizontal-nav__group-title']}>
        {icon && (
          <Icon
            className={styles['tedi-horizontal-nav__group-icon']}
            {...(typeof icon === 'string' ? { name: icon } : icon)}
            size={typeof icon === 'string' ? 16 : icon.size ?? 16}
            color="inherit"
          />
        )}
        {title}
      </h3>
    )}
    <ul className={styles['tedi-horizontal-nav__group-list']}>{children}</ul>
  </section>
);

export default HorizontalNavGroup;
