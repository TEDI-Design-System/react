import cn from 'classnames';
import React from 'react';

import { useTheme } from '../../../providers/theme-provider/theme-provider';
import Print from '../../misc/print/print';
import HeaderLanguage from './components/header-language/header-language';
import HeaderLogin from './components/header-login/header-login';
import HeaderLogout from './components/header-logout/header-logout';
import HeaderProfile from './components/header-profile/header-profile';
import HeaderRole from './components/header-role/header-role';
import HeaderSearch from './components/header-search/header-search';
import styles from './header.module.scss';

export interface HeaderProps {
  /**
   * Content rendered inside the header, typically Header.Logo, Header.Center, and Header.Actions subcomponents.
   */
  children: React.ReactNode;
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
  /** Additional CSS class name applied to the header wrapper. */
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { children, toggle, bottom, className } = props;

  return (
    <Print visibility="hide">
      <header className={cn(styles['tedi-header'], className)}>
        <div className={styles['tedi-header__main']}>
          {toggle}
          <div className={styles['tedi-header__main--content']}>{children}</div>
        </div>

        {bottom && <div className={styles['tedi-header__bottom']}>{bottom}</div>}
      </header>
    </Print>
  );
};

Header.displayName = 'Header';

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
   * Useful for conditionally hiding the logo based on application state, feature flags,
   * or custom media queries that fall between standard breakpoints (e.g. 420px).
   * For responsive hiding at standard breakpoints, prefer wrapping Header.Logo with HideAt/ShowAt.
   * @default true
   */
  showLogo?: boolean;
  /**
   * Optional link URL.
   * If provided, the logo will be wrapped in an anchor element.
   */
  href?: string;
  /** Additional CSS class name applied to the logo wrapper. */
  className?: string;
}

export const HeaderLogo = (props: HeaderLogoProps) => {
  const { logo, logoDark, href, showLogo = true, className } = props;
  const { theme } = useTheme();

  const resolvedLogo = theme === 'dark' && logoDark ? logoDark : logo;

  if (!showLogo) return null;

  const content = href ? <a href={href}>{resolvedLogo}</a> : resolvedLogo;

  return <div className={cn(styles['tedi-header__logo'], className)}>{content}</div>;
};

HeaderLogo.displayName = 'Header.Logo';

export interface HeaderCenterProps {
  /** Content rendered in the center area of the header, typically navigation links or a search bar. */
  children: React.ReactNode;
  /**
   * Controls the horizontal alignment of center content.
   * @default center
   */
  alignment?: 'flex-start' | 'center' | 'space-between';
  /** Additional CSS class name applied to the center content area. */
  className?: string;
}

export const HeaderCenter = (props: HeaderCenterProps) => {
  const { children, className, alignment = 'center' } = props;

  return (
    <div className={cn(styles['tedi-header__center'], styles[`tedi-header__center--${alignment}`], className)}>
      {children}
    </div>
  );
};

HeaderCenter.displayName = 'Header.Center';

export interface HeaderActionsProps {
  /** Action elements rendered on the right side of the header (e.g. language selector, login, profile). */
  children: React.ReactNode;
  /** Additional CSS class name applied to the actions wrapper. */
  className?: string;
}

export const HeaderActions = (props: HeaderActionsProps) => {
  const { children, className } = props;
  return <div className={cn(styles['tedi-header__actions'], className)}>{children}</div>;
};

HeaderActions.displayName = 'Header.Actions';

Header.Logo = HeaderLogo;
Header.Center = HeaderCenter;
Header.Actions = HeaderActions;
Header.Language = HeaderLanguage;
Header.Login = HeaderLogin;
Header.Logout = HeaderLogout;
Header.Profile = HeaderProfile;
Header.Role = HeaderRole;
Header.Search = HeaderSearch;

export default Header;
