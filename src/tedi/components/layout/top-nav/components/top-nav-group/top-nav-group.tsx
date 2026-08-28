import cn from 'classnames';
import React from 'react';

import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import styles from '../../top-nav.module.scss';

export interface TopNavGroupProps {
  /**
   * Uppercase section title rendered above the link list. When omitted, the
   * heading is not rendered — useful for a single-column mega-menu that only
   * lists links.
   */
  title?: React.ReactNode;
  /**
   * `TopNav.SubItem` children. Anything else is ignored.
   */
  children: React.ReactNode;
  /**
   * Optional leading icon rendered next to the title — material-symbol name or
   * full `IconWithoutBackgroundProps`. Ignored when `title` is omitted.
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * HTML heading level used for the title — pick the value that keeps the
   * document outline correct on the host page.
   * @default h3
   */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Additional class name applied to the column.
   */
  className?: string;
}

export const TopNavGroup = ({
  title,
  children,
  icon,
  headingLevel = 'h3',
  className,
}: TopNavGroupProps): JSX.Element => {
  const HeadingTag = headingLevel;
  return (
    <section className={cn(styles['tedi-top-nav__group'], className)}>
      {title && (
        <HeadingTag className={styles['tedi-top-nav__group-title']}>
          {icon && (
            <Icon
              className={styles['tedi-top-nav__group-icon']}
              {...(typeof icon === 'string' ? { name: icon } : icon)}
              size={typeof icon === 'string' ? 16 : icon.size ?? 16}
              color="inherit"
            />
          )}
          {title}
        </HeadingTag>
      )}
      <ul className={styles['tedi-top-nav__group-list']}>{children}</ul>
    </section>
  );
};

TopNavGroup.displayName = 'TopNav.Group';

export default TopNavGroup;
