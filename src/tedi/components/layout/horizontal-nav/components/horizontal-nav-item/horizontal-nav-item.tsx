import cn from 'classnames';
import React from 'react';

import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import styles from '../../horizontal-nav.module.scss';

export interface HorizontalNavItemProps {
  /**
   * Bar label. Pass a string or any ReactNode that renders inline.
   */
  children: React.ReactNode;
  /**
   * Submenu content — typically a fragment of `HorizontalNav.Group` elements.
   * When provided and `isActive` is `true`, the parent `HorizontalNav` renders
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
   * Click handler.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Render the trigger as a different element/component (e.g. a router
   * `NavLink`). When omitted, the trigger element is chosen automatically:
   * `<a>` when `href` is set, otherwise `<button type="button">` (for the
   * toggle-only mega-menu parent pattern).
   */
  as?: 'a' | 'button' | React.ComponentType<React.AnchorHTMLAttributes<HTMLElement> & Record<string, unknown>>;
  /**
   * Additional class name applied to the anchor.
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
}

export const HorizontalNavItem = (props: HorizontalNavItemProps): JSX.Element => {
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
  } = props;
  const isToggle = !href && hasSubmenu;
  const Component = as ?? (isToggle ? 'button' : 'a');
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
    styles['tedi-horizontal-nav__link'],
    {
      [styles['tedi-horizontal-nav__link--active']]: isActive || submenuOpen,
    },
    className
  );

  return (
    <li
      className={cn(styles['tedi-horizontal-nav__item'], {
        [styles['tedi-horizontal-nav__item--has-inline-submenu']]: showInlineSubmenu,
      })}
    >
      <Component
        className={linkClassName}
        onClick={handleClick}
        {...(isToggle
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
            })}
      >
        {icon && (
          <Icon
            className={styles['tedi-horizontal-nav__icon']}
            {...(typeof icon === 'string' ? { name: icon } : icon)}
            size={typeof icon === 'string' ? 18 : icon.size ?? 18}
            color="inherit"
          />
        )}
        {children}
        {hasSubmenu && (
          <Icon className={styles['tedi-horizontal-nav__icon']} name="keyboard_arrow_down" size={18} color="inherit" />
        )}
      </Component>
      {showInlineSubmenu && (
        <div
          id={panelId}
          className={cn(styles['tedi-horizontal-nav__submenu'], styles['tedi-horizontal-nav__submenu--inline'])}
          data-name="horizontal-nav-submenu"
        >
          <div
            className={cn(
              styles['tedi-horizontal-nav__submenu-inner'],
              styles['tedi-horizontal-nav__submenu-inner--inline']
            )}
          >
            {submenu}
          </div>
        </div>
      )}
    </li>
  );
};

export default HorizontalNavItem;
