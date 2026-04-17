import cn from 'classnames';
import React from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { useTheme } from '../../../providers/theme-provider/theme-provider';
import styles from '../header/header.module.scss';

export interface HeaderProps {
  /**
   * Content rendered inside the header, typically Header.Logo, Header.Center, and Header.Actions subcomponents.
   */
  children?: React.ReactNode;
  /**
   * Toggle element for the mobile side navigation menu.
   * Typically a SideNav.Toggle component.
   */
  toggle?: React.ReactNode;
  /**
   * Content rendered below the main header bar on mobile viewports (below `md` breakpoint).
   * Commonly used for a mobile-specific search bar or other compact navigation elements.
   */
  bottom?: React.ReactNode;
}

export interface HeaderContentProps {
  /** Content rendered in the center area of the header, typically navigation links or a search bar. */
  children?: React.ReactNode;
  /**
   * Controls the horizontal alignment of center content.
   * @default center
   */
  alignment?: 'flex-start' | 'center' | 'space-between';
  /** Additional CSS class name applied to the center content area. */
  className?: string;
}

export interface HeaderActionsProps {
  /** Action elements rendered on the right side of the header (e.g. language selector, login, profile). */
  children?: React.ReactNode;
}

const Header = ({ children, toggle, bottom }: HeaderProps) => {
  const breakpoint = useBreakpoint();
  const isMobile = isBreakpointBelow(breakpoint, 'md');

  return (
    <div className={cn(styles['tedi-header'])}>
      <header className={cn(styles['tedi-header__main'])}>
        {toggle && <>{toggle}</>}
        <div className={styles['tedi-header__main--content']}>{children}</div>
      </header>

      {bottom && isMobile && <div className={styles['tedi-header__bottom']}>{bottom}</div>}
    </div>
  );
};

export interface HeaderLogoProps {
  /**
   * The default logo to display (typically used in light theme).
   */
  logo: React.ReactNode;
  /**
   * Optional logo variant for dark theme.
   * If provided, it will be used when the current theme is dark.
   */
  logoDark?: React.ReactNode;
  /**
   * Controls visibility of the logo.
   * Can be used together with responsive utilities (e.g. HideAt/ShowAt or media queries).
   * @default true
   */
  showLogo?: boolean;
  /**
   * Optional link URL.
   * If provided, the logo will be wrapped in an anchor element.
   */
  href?: string;
}

Header.Logo = function Logo({ logo, logoDark, href, showLogo = true }: HeaderLogoProps) {
  const { theme } = useTheme();

  const resolvedLogo = theme === 'dark' && logoDark ? logoDark : logo;

  if (!showLogo) return null;

  const content = href ? <a href={href}>{resolvedLogo}</a> : resolvedLogo;

  return <div className={styles['tedi-header__logo']}>{content}</div>;
};

Header.Center = function Content(props: HeaderContentProps) {
  const { children, className, alignment = 'center', ...rest } = props;

  const centerBEM = cn(styles['tedi-header__center'], styles[`tedi-header__center--${alignment}`], className);

  return (
    <div className={centerBEM} {...rest}>
      {children}
    </div>
  );
};

Header.Actions = function Actions(props: HeaderActionsProps) {
  const { children } = props;
  return <div className={styles['tedi-header__actions']}>{children}</div>;
};

export default Header;
