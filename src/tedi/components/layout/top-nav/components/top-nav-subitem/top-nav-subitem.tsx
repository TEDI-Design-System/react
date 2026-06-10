import cn from 'classnames';
import React, { forwardRef } from 'react';

import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../../../helpers/polymorphic/types';
import { UnknownType } from '../../../../../types/commonTypes';
import styles from '../../top-nav.module.scss';
import { useTopNavContext } from '../../top-nav-context';

type TopNavSubItemBaseProps = {
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
   * Click handler. Receives the original mouse / keyboard event.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Additional class name applied to the link element.
   */
  className?: string;
};

export type TopNavSubItemProps<C extends React.ElementType = 'a'> = PolymorphicComponentPropWithRef<
  C,
  TopNavSubItemBaseProps
>;

const TopNavSubItemComponent = forwardRef(
  <C extends React.ElementType = 'a'>(props: TopNavSubItemProps<C>, ref?: PolymorphicRef<C>) => {
    const { children, href, isActive = false, onClick, as, className, ...rest } = props;
    const Component = (as || 'a') as React.ElementType;
    const topNav = useTopNavContext();

    const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
      onClick?.(event);
      topNav?.closeSubmenu();
    };

    const componentProps = {
      ...rest,
      ref,
      className: cn(
        styles['tedi-top-nav__subitem-link'],
        { [styles['tedi-top-nav__subitem-link--active']]: isActive },
        className
      ),
      href,
      'aria-current': isActive ? 'page' : undefined,
      onClick: handleClick,
    } as UnknownType;

    return (
      <li className={styles['tedi-top-nav__subitem']}>
        <Component {...componentProps}>{children}</Component>
      </li>
    );
  }
);

TopNavSubItemComponent.displayName = 'TopNav.SubItem';

export const TopNavSubItem = TopNavSubItemComponent as <C extends React.ElementType = 'a'>(
  props: TopNavSubItemProps<C>
) => React.ReactElement | null;

export default TopNavSubItem;
