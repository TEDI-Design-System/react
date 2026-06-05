import cn from 'classnames';
import React, { forwardRef } from 'react';

import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../../../helpers/polymorphic/types';
import { UnknownType } from '../../../../../types/commonTypes';
import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import styles from '../../top-nav.module.scss';

type TopNavItemBaseProps = {
  /**
   * Bar label. Pass a string or any ReactNode that renders inline.
   */
  children: React.ReactNode;
  /**
   * Submenu content — typically a fragment of `TopNav.Group` elements.
   * When provided and `isActive` is `true`, the parent `TopNav` renders
   * the submenu inside the mega-menu panel below the bar, and a
   * `keyboard_arrow_down` chevron is added next to the label.
   */
  submenu?: React.ReactNode;
  /**
   * Destination URL. Omit when the item only opens a submenu.
   */
  href?: string;
  /**
   * Optional leading icon — material-symbol name or full `IconWithoutBackgroundProps`.
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Marks this item as the current page. Renders `aria-current="page"`,
   * applies the active visual, and (when the item has a submenu) surfaces
   * the mega-menu panel below the bar.
   * @default false
   */
  isActive?: boolean;
  /**
   * Disables interaction. For a link, sets `aria-disabled` and removes the
   * `href`. For a toggle-only parent (`<button>`), sets the native `disabled`
   * attribute.
   * @default false
   */
  disabled?: boolean;
  /**
   * Click handler. Receives the original mouse / keyboard event.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Additional class name applied to the trigger element.
   */
  className?: string;
  /** @internal Set by the parent to indicate the item carries submenu content. */
  hasSubmenu?: boolean;
  /** @internal When true and the submenu is open, render the submenu inside this `<li>` instead of as a full-width panel. */
  renderSubmenuInline?: boolean;
  /** @internal Parent-controlled submenu visibility. Defaults to `isActive` when undefined (standalone use / link items). */
  isSubmenuOpen?: boolean;
  /** @internal Shared id used to link the toggle button (`aria-controls`) to the submenu panel (`id`). */
  panelId?: string;
};

export type TopNavItemProps<C extends React.ElementType = 'a'> = PolymorphicComponentPropWithRef<
  C,
  TopNavItemBaseProps
>;

const TopNavItemComponent = forwardRef(
  <C extends React.ElementType = 'a'>(props: TopNavItemProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      children,
      href,
      icon,
      isActive = false,
      hasSubmenu = false,
      disabled = false,
      onClick,
      as,
      className,
      submenu,
      renderSubmenuInline = false,
      isSubmenuOpen,
      panelId,
      ...rest
    } = props;
    const isToggle = !href && hasSubmenu;
    const Component = (as ?? (isToggle ? 'button' : 'a')) as React.ElementType;
    const submenuOpen = isSubmenuOpen ?? isActive;
    const showInlineSubmenu = renderSubmenuInline && submenuOpen && hasSubmenu;

    const handleClick = (event: React.MouseEvent) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const linkClassName = cn(
      styles['tedi-top-nav__link'],
      {
        [styles['tedi-top-nav__link--active']]: isActive || submenuOpen,
      },
      className
    );

    const stateProps = isToggle
      ? {
          type: 'button',
          disabled,
          'aria-haspopup': true,
          'aria-expanded': submenuOpen,
          'aria-controls': panelId,
        }
      : {
          href: disabled ? undefined : href,
          'aria-current': isActive ? 'page' : undefined,
          'aria-disabled': disabled || undefined,
        };

    const componentProps = {
      ...rest,
      ref,
      className: linkClassName,
      onClick: handleClick,
      ...stateProps,
    } as UnknownType;

    return (
      <li
        className={cn(styles['tedi-top-nav__item'], {
          [styles['tedi-top-nav__item--has-inline-submenu']]: showInlineSubmenu,
        })}
      >
        <Component {...componentProps}>
          {icon && (
            <Icon
              className={styles['tedi-top-nav__icon']}
              {...(typeof icon === 'string' ? { name: icon } : icon)}
              size={typeof icon === 'string' ? 18 : icon.size ?? 18}
              color="inherit"
            />
          )}
          {children}
          {hasSubmenu && (
            <Icon
              className={cn(styles['tedi-top-nav__icon'], styles['tedi-top-nav__chevron'], {
                [styles['tedi-top-nav__chevron--open']]: submenuOpen,
              })}
              name="keyboard_arrow_down"
              size={18}
              color="inherit"
            />
          )}
        </Component>
        {showInlineSubmenu && (
          <div
            id={panelId}
            className={cn(styles['tedi-top-nav__submenu'], styles['tedi-top-nav__submenu--inline'])}
            data-name="top-nav-submenu"
          >
            <div className={cn(styles['tedi-top-nav__submenu-inner'], styles['tedi-top-nav__submenu-inner--inline'])}>
              {submenu}
            </div>
          </div>
        )}
      </li>
    );
  }
);

TopNavItemComponent.displayName = 'TopNav.Item';

export const TopNavItem = TopNavItemComponent as <C extends React.ElementType = 'a'>(
  props: TopNavItemProps<C>
) => React.ReactElement | null;

export default TopNavItem;
