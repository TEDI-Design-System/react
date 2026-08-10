import * as React from 'react';

/**
 * Header — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/layout/header/header.stories.tsx).
 */
export interface HeaderProps {
  /** Content rendered inside the header, typically Header.Logo, Header.Center, and Header.Actions subcomponents. */
  children: React.ReactNode;
  /** Toggle element for the mobile side navigation menu. Typically a SideNav.Toggle component. */
  toggle?: React.ReactNode;
  /** Content rendered in the top bar above the main header. */
  top?: React.ReactNode;
  /** Content rendered below the main header bar on mobile viewports (below `md` breakpoint). Commonly used for a mobile-specific search bar or other compact navigation elements. */
  bottom?: React.ReactNode;
  /** Additional CSS class name applied to the header wrapper. */
  className?: string;
  /** Horizontal alignment (`justify-content`) of the top bar content. Supports per-breakpoint overrides, e.g. `topAlignment="center"` with `lg={{ topAlignment: 'space-between' }}`. */
  topAlignment?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<HeaderBreakpointProps>;
  md?: Partial<HeaderBreakpointProps>;
  lg?: Partial<HeaderBreakpointProps>;
  xl?: Partial<HeaderBreakpointProps>;
  xxl?: Partial<HeaderBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
interface HeaderBreakpointProps {
    /**
     * Horizontal alignment (`justify-content`) of the top bar content.
     * Supports per-breakpoint overrides, e.g. `topAlignment="center"` with `lg={{ topAlignment: 'space-between' }}`.
     * @default space-between
     */
    topAlignment?: HeaderAlignment;
}

export declare const Header: React.ComponentType<HeaderProps> & {
  Logo: React.ComponentType<any>;
  Center: React.ComponentType<any>;
  Actions: React.ComponentType<any>;
  Language: React.ComponentType<any>;
  Login: React.ComponentType<any>;
  Logout: React.ComponentType<any>;
  Profile: React.ComponentType<any>;
  Role: React.ComponentType<any>;
  Search: React.ComponentType<any>;
};
