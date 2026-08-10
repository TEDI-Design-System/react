import * as React from 'react';

/**
 * SideNav — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/layout/sidenav/sidenav.stories.tsx).
 */
export interface SideNavProps<C extends React.ElementType = 'a'> {
  linkAs?: AllowedHTMLTags<C, "a" | React.ComponentType<any>>;
  navItems: SideNavItemProps<any>[] | SideNavItemProps<C>[];
  /** SideNav menu aria-label */
  ariaLabel: string;
  /** Id of the navigation */
  id?: string;
  /** Show dividers between navigation items */
  showDividers?: boolean;
  /** Additional class names for the sidenav component */
  className?: string;
  /** Breakpoint at which to switch to mobile view */
  mobileBreakpoint?: "mobile" | "tablet";
  /** Whether to show the mobile overlay when in mobile view */
  showMobileOverlay?: boolean;
  /** Callback when the mobile menu is toggled */
  onMenuToggle?: (isOpen: boolean) => void;
  /** Controls the open state of the mobile sidenav. When provided, the mobile menu becomes a controlled component. To control the menu externally (e.g. from a toggle button), pair this prop with `SideNav.Toggle`: ```tsx const [isOpen, setIsOpen] = useState(true); <SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} /> <SideNav isMobileOpen={isOpen} ariaLabel="Mobile menu" navItems={...} /> ``` If not provided, the mobile menu manages its open state internally based on viewport size. */
  isMobileOpen?: boolean;
  /** Whether the sidenav is collapsed (showing only icons/shortened text) */
  isCollapsed?: boolean;
  /** Callback when the sidenav is toggled between collapsed/expanded */
  onCollapseToggle?: (isCollapsed: boolean) => void;
  /** Height of the SideNavIem <br/> Medium/small better for dashboards */
  sideNavItemSize?: "default" | "small" | "medium";
}

// Referenced types, resolved one level deep (see the story source for the rest).
type AllowedHTMLTags<C extends React.ElementType, V> = C extends V ? C : never;

type SideNavItemProps<C extends React.ElementType = 'a'> = LinkProps<C> & {
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

export declare const SideNav: React.ComponentType<SideNavProps> & {
  Toggle: React.ComponentType<any>;
  Item: React.ComponentType<any>;
  Dropdown: React.ComponentType<any>;
  Mobile: React.ComponentType<any>;
};
