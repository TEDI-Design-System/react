import cn from 'classnames';

import styles from './tabs-nav.module.scss';
import TabsNavItem, { TabsNavItemProps } from './tabs-nav-item';

/**
 * @deprecated Use Tabs from `@tedi-design-system/react/tedi` instead.
 */
export interface TabsNavProps {
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * See @tabs-nav-item.
   */
  items: TabsNavItemProps[];
  /**
   * ID of heading labelling the tabs.
   */
  'aria-labelledby': string;
}

/**
 * @deprecated Use Tabs from `@tedi-design-system/react/tedi` instead.
 */
export const TabsNav = (props: TabsNavProps): JSX.Element => {
  const { items, className, 'aria-labelledby': ariaLabelledBy } = props;

  const BEM = cn(styles['tabs__nav'], className);

  return (
    <ul data-name="tabs-nav" className={BEM} role="tablist" aria-labelledby={ariaLabelledBy}>
      {items.map((item, index) => (
        <TabsNavItem {...item} key={index} />
      ))}
    </ul>
  );
};

export default TabsNav;
