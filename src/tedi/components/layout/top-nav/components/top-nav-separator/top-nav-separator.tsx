import cn from 'classnames';

import styles from '../../top-nav.module.scss';

export interface TopNavSeparatorProps {
  /**
   * Additional class name applied to the separator list item.
   */
  className?: string;
}

export const TopNavSeparator = ({ className }: TopNavSeparatorProps): JSX.Element => (
  <li className={cn(styles['tedi-top-nav__separator'], className)}>
    <span role="separator" aria-orientation="vertical" className={styles['tedi-top-nav__separator-line']} />
  </li>
);

TopNavSeparator.displayName = 'TopNav.Separator';

export default TopNavSeparator;
