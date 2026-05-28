import cn from 'classnames';

import styles from '../../horizontal-nav.module.scss';

export interface HorizontalNavSeparatorProps {
  /**
   * Additional class name applied to the separator list item.
   */
  className?: string;
}

export const HorizontalNavSeparator = ({ className }: HorizontalNavSeparatorProps): JSX.Element => (
  <li role="separator" aria-orientation="vertical" className={cn(styles['tedi-horizontal-nav__separator'], className)}>
    <span className={styles['tedi-horizontal-nav__separator-line']} aria-hidden="true" />
  </li>
);

HorizontalNavSeparator.displayName = 'HorizontalNav.Separator';

export default HorizontalNavSeparator;
