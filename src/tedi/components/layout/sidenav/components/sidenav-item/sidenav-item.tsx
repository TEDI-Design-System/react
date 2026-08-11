import cn from 'classnames';
import React, { useState } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import Collapse from '../../../../content/collapse/collapse';
import Link, { LinkProps } from '../../../../navigation/link/link';
import { Tooltip } from '../../../../overlays/tooltip';
import { SideNavItemSize } from '../../sidenav';
import styles from '../../sidenav.module.scss';
import { SideNavDropdown } from '../sidenav-dropdown/sidenav-dropdown';

export type SideNavItemProps<C extends React.ElementType = 'a'> = LinkProps<C> & {
  /**
   * Icon of the item
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Submenu items (legacy)
   */
  subItems?: SideNavItemProps<C>[];
  /**
   * Grouped submenu items (preferred for headings)
   */
  subItemGroups?: {
    subHeading?: React.ReactNode;
    subItems: SideNavItemProps<C>[];
  }[];
  /**
   * Group title rendered above this item, marking the start of a new group. When the sidenav is
   * collapsed the title text is replaced by a divider line (there is no room for a heading).
   */
  subHeading?: React.ReactNode;
  /**
   * Shorter label shown in place of `children` while the sidenav is collapsed. Falls back to
   * `children` when omitted; the full `children` text is always kept in the hover tooltip.
   */
  collapsedText?: string;
  /**
   * Whether the sidenav is currently collapsed
   */
  isCollapsed?: boolean;
  /**
   * Whether this item with children should be open initially
   */
  isDefaultOpen?: boolean;
  /**
   * Height of the SideNavIem
   * <br/> Medium/small better for dashboards
   * @default default
   */
  sideNavItemSize?: SideNavItemSize;
};

export const SideNavItem = <C extends React.ElementType = 'a'>(
  props: SideNavItemProps<C> & {
    onItemClick?: () => void;
    level?: number;
    isCollapsed?: boolean;
  }
) => {
  const {
    icon,
    children,
    isActive,
    onClick,
    subItems,
    subItemGroups,
    as,
    onItemClick,
    className,
    subHeading,
    collapsedText,
    level = 1,
    isCollapsed = false,
    isDefaultOpen = false,
    sideNavItemSize = 'default',
    ...rest
  } = props;

  const { getLabel } = useLabels();
  const [isCollapsedInternal, setIsCollapsedInternal] = useState(isDefaultOpen ?? false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const collapseId = React.useId();
  const displayTitle = isCollapsed && collapsedText ? collapsedText : children;

  const groupsToRender = subItemGroups ?? (subItems ? [{ subItems }] : null);
  const hasChildren = !!groupsToRender;
  const hasTreeIndicator = level > 1 && hasChildren;

  const SideNavItemBEM = cn(
    styles['tedi-sidenav__item'],
    styles[`tedi-sidenav__item--${sideNavItemSize}`],
    {
      [styles[`tedi-sidenav__item--level-${level}`]]: level > 1,
      [styles['tedi-sidenav__item--current']]: isActive,
      [styles['tedi-sidenav__item--has-children']]: hasChildren,
      [styles['tedi-sidenav__item--with-tree']]: hasTreeIndicator,
    },
    className
  );

  const getIcon = (icon: string | IconWithoutBackgroundProps) => {
    const iconBEM = cn(styles['tedi-sidenav__icon']);
    const defaultIconProps: Partial<IconWithoutBackgroundProps> = {
      color: 'white',
      className: iconBEM,
    };
    const iconProps: IconWithoutBackgroundProps =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : {
            ...defaultIconProps,
            ...icon,
            className: cn(defaultIconProps.className, icon?.className),
          };

    return <Icon {...iconProps} />;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!hasChildren) {
      onItemClick?.();
    }
  };

  const handleCollapseToggle = (isOpen: boolean) => {
    setIsCollapsedInternal(isOpen);
  };

  const isLinkedParent = hasChildren && (rest.href || rest.to);

  const linkProps = {
    ...rest,
    as,
    onClick: handleClick,
    className: cn(styles['tedi-sidenav__link'], isLinkedParent && styles['tedi-sidenav__link--has-children-link']),
    noStyle: true,
    'aria-current': isActive ? 'page' : undefined,
    'aria-label': isCollapsed && typeof children === 'string' ? children : undefined,
  } as unknown as LinkProps<C>;

  const renderChildren = () =>
    !isCollapsed &&
    groupsToRender?.map((group, index) => (
      <div key={index}>
        {group?.subHeading && <div className={styles['tedi-sidenav__subheading']}>{group.subHeading}</div>}
        <ul className={styles['tedi-sidenav__list']}>
          {group.subItems?.map((item, key) => (
            <SideNavItem
              as={as}
              {...item}
              key={key}
              level={level + 1}
              onItemClick={onItemClick}
              isCollapsed={isCollapsed}
              className={cn(styles['tedi-sidenav__sub-item'], item.className)}
            />
          ))}
        </ul>
      </div>
    ));

  const content = (
    <li data-name="sidenav-item" className={SideNavItemBEM}>
      {hasChildren && isCollapsed ? (
        <SideNavDropdown
          trigger={
            <Tooltip.Trigger>
              <span
                className={cn(styles['tedi-sidenav__link'], isDropdownOpen && styles['tedi-sidenav__link--active'])}
              >
                {icon && getIcon(icon)}
                <Icon name="expand_more" color="white" className={styles['tedi-sidenav__toggle-icon']} size={18} />
                <span className={styles['tedi-sidenav__title']}>{displayTitle}</span>
              </span>
            </Tooltip.Trigger>
          }
          as={as}
          groups={groupsToRender}
          onOpenChange={setIsDropdownOpen}
        />
      ) : hasChildren && level === 1 ? (
        rest.href || rest.to ? (
          <>
            <Link {...linkProps}>
              {icon && getIcon(icon)}
              <span className={styles['tedi-sidenav__title']}>{displayTitle}</span>
            </Link>
            <div className={styles['tedi-sidenav__link-collapse-wrapper']}>
              <Collapse
                id={collapseId}
                hideCollapseText
                inverted
                open={isCollapsedInternal}
                onToggle={handleCollapseToggle}
                toggleLabel={getLabel('sidenav.toggleSubmenuChildren', {
                  isCollapsedInternal,
                  children,
                })}
                className={styles['tedi-sidenav__collapse']}
                titleRowProps={{ element: 'span' }}
              >
                {renderChildren()}
              </Collapse>
            </div>
          </>
        ) : (
          <Collapse
            id={collapseId}
            hideCollapseText
            inverted
            fullRowToggle
            open={isCollapsedInternal}
            onToggle={handleCollapseToggle}
            className={styles['tedi-sidenav__collapse']}
            titleRowProps={{ element: 'span' }}
            toggleLabel={getLabel('sidenav.toggleSubmenuChildren', {
              isCollapsedInternal,
              children,
            })}
            title={
              <span
                className={cn(
                  styles['tedi-sidenav__link'],
                  isCollapsedInternal && styles['tedi-sidenav__link--active']
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {icon && getIcon(icon)}
                <span className={styles['tedi-sidenav__title']}>{displayTitle}</span>
              </span>
            }
          >
            {renderChildren()}
          </Collapse>
        )
      ) : hasChildren ? (
        <>
          <Link {...linkProps}>
            {icon && getIcon(icon)}
            <span className={styles['tedi-sidenav__title']}>{displayTitle}</span>
            <i className={styles['tedi-sidenav__bullet']} />
          </Link>
          {renderChildren()}
        </>
      ) : (
        <Tooltip.Trigger>
          <Link {...linkProps}>
            {icon && getIcon(icon)}
            <span className={styles['tedi-sidenav__title']}>{displayTitle}</span>
          </Link>
        </Tooltip.Trigger>
      )}
    </li>
  );

  const wrapped =
    level === 1 && isCollapsed ? (
      <Tooltip placement="right" focusManager={undefined}>
        <Tooltip.Content maxWidth="medium">{children}</Tooltip.Content>
        {content}
      </Tooltip>
    ) : (
      content
    );

  if (subHeading) {
    return (
      <>
        <li className={styles['tedi-sidenav__group-heading']}>
          <span className={styles['tedi-sidenav__subheading']}>{subHeading}</span>
        </li>
        {wrapped}
      </>
    );
  }

  return wrapped;
};
