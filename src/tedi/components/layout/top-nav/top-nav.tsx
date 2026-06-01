import cn from 'classnames';
import React, {
  Children,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Breakpoint, BREAKPOINT_WIDTHS, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { MobileNav } from '../mobile-nav/mobile-nav';
import { SideNavItemProps } from '../sidenav/components/sidenav-item/sidenav-item';
import { TopNavGroup, TopNavGroupProps } from './components/top-nav-group/top-nav-group';
import { TopNavItem, TopNavItemProps } from './components/top-nav-item/top-nav-item';
import { TopNavSeparator } from './components/top-nav-separator/top-nav-separator';
import { TopNavSubItem, TopNavSubItemProps } from './components/top-nav-subitem/top-nav-subitem';
import styles from './top-nav.module.scss';

type BreakpointWidthName = Exclude<Breakpoint, 'xs'>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type TopNavMaxWidth = number | BreakpointWidthName | (string & {});

const resolveMaxWidth = (value: TopNavMaxWidth | 'none' | undefined): number | string | undefined => {
  if (value === undefined || value === 'none' || value === 0) return undefined;
  if (typeof value === 'string' && value !== 'xs' && value in BREAKPOINT_WIDTHS) {
    return BREAKPOINT_WIDTHS[value as BreakpointWidthName];
  }
  return value;
};

export interface TopNavProps {
  /**
   * `TopNav.Item` and `TopNav.Separator` children. Any other
   * React node is ignored. Fragments are flattened, so `<>…</>` wrappers work
   * transparently.
   */
  children: ReactNode;
  /**
   * Accessible name for the wrapping `<nav>` landmark.
   */
  ariaLabel: string;
  /**
   * Breakpoint below which the bar collapses into the shared Sidenav mobile
   * drawer. Pass any TEDI breakpoint name (`xs`/`sm`/`md`/`lg`/`xl`/`xxl`).
   * @default md
   */
  mobileBreakpoint?: Breakpoint;
  /**
   * Controlled open state for the mobile drawer. Pair with `onMenuToggle`
   * to wire it to an external toggle button.
   */
  isMobileOpen?: boolean;
  /**
   * Fires whenever the mobile drawer opens or closes.
   */
  onMenuToggle?: (open: boolean) => void;
  /**
   * Dim the rest of the viewport when the mobile drawer is open.
   * @default true
   */
  showMobileOverlay?: boolean;
  /**
   * Additional class name applied to the desktop `<nav>`.
   */
  className?: string;
  /**
   * Element id forwarded to the desktop `<nav>`.
   */
  id?: string;
  /**
   * Controls how the submenu (mega-menu) panel sizes and positions itself
   * when the active item has submenu content.
   *
   * - `'full'` (default) — the panel spans the full nav width and is centered,
   *   suitable for wide multi-column mega-menus.
   * - `'item'` — the panel sits left-aligned directly under the active item
   *   with content-driven width, suitable for narrow single- or few-column
   *   menus.
   * @default full
   */
  submenuFit?: 'full' | 'item';
  /**
   * Constrains the inner content (item bar and full-width submenu inner) to a
   * maximum width and centers it inside the blue `<nav>` background. Pass any
   * valid CSS length (e.g. `1440`, `'1440px'`, `'90rem'`), or a TEDI breakpoint
   * name (`'sm' | 'md' | 'lg' | 'xl' | 'xxl'`) — these resolve to the
   * breakpoint's `min-width` (36rem / 48rem / 62rem / 75rem / 87.5rem
   * respectively), useful for aligning the nav inner with a breakpoint-driven
   * content container. The `<nav>` itself still spans 100% of its container.
   *
   * Pass `'none'` (or `0`) to disable the constraint and let the bar fill the
   * full width of the nav.
   * @default xxl
   */
  maxWidth?: TopNavMaxWidth | 'none';
}

const flattenChildren = (children: ReactNode): ReactElement[] => {
  const result: ReactElement[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Fragment) {
      result.push(...flattenChildren((child.props as { children?: ReactNode }).children));
      return;
    }
    if (child.type === TopNavItem || child.type === TopNavSeparator) {
      result.push(child);
    }
  });
  return result;
};

const isNavItem = (element: ReactElement): element is ReactElement<TopNavItemProps> => element.type === TopNavItem;

type MobileSubItemGroup = NonNullable<SideNavItemProps['subItemGroups']>[number];

const extractMobileSubItem = (element: ReactElement<TopNavSubItemProps>): SideNavItemProps => ({
  children: element.props.children,
  href: element.props.href,
  isActive: element.props.isActive,
  onClick: element.props.onClick as SideNavItemProps['onClick'],
});

const extractMobileSubmenuGroups = (submenu: ReactNode): MobileSubItemGroup[] | undefined => {
  if (!submenu) return undefined;
  const groups: MobileSubItemGroup[] = [];
  Children.forEach(submenu, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Fragment) {
      const nested = extractMobileSubmenuGroups((child.props as { children?: ReactNode }).children);
      if (nested) groups.push(...nested);
      return;
    }
    if (child.type !== TopNavGroup) return;
    const groupProps = child.props as TopNavGroupProps;
    const subItems: SideNavItemProps[] = [];
    Children.forEach(groupProps.children, (subChild) => {
      if (!isValidElement(subChild)) return;
      if (subChild.type !== TopNavSubItem) return;
      subItems.push(extractMobileSubItem(subChild as ReactElement<TopNavSubItemProps>));
    });
    if (subItems.length > 0) groups.push({ subHeading: groupProps.title, subItems });
  });
  return groups.length > 0 ? groups : undefined;
};

export const TopNav = (props: TopNavProps): React.ReactElement | null => {
  const {
    children,
    ariaLabel,
    mobileBreakpoint = 'md',
    isMobileOpen,
    onMenuToggle,
    showMobileOverlay = true,
    className,
    id,
    submenuFit = 'full',
    maxWidth = 'xxl',
  } = props;

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, mobileBreakpoint);

  const isControlled = isMobileOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? isMobileOpen : internalOpen;

  useEffect(() => {
    if (!isControlled && !isMobileView) {
      setInternalOpen(false);
    }
  }, [isMobileView, isControlled]);

  const setMenuOpen = (open: boolean) => {
    if (!isControlled) setInternalOpen(open);
    onMenuToggle?.(open);
  };

  const allChildren = useMemo(() => flattenChildren(children), [children]);
  const items = useMemo(() => allChildren.filter(isNavItem), [allChildren]);

  const isToggleItem = (item: ReactElement<TopNavItemProps>) =>
    !item.props.href && Children.count(item.props.submenu) > 0;

  const activeToggleIndex = useMemo(() => {
    const idx = items.findIndex((item) => isToggleItem(item) && item.props.isActive);
    return idx === -1 ? null : idx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  const [openButtonIndex, setOpenButtonIndex] = useState<number | null>(activeToggleIndex);

  useEffect(() => {
    setOpenButtonIndex(activeToggleIndex);
  }, [activeToggleIndex]);
  const navRef = useRef<HTMLElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (openButtonIndex === null) return;
    const onMouseDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenButtonIndex(null);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      const trigger = navRef.current?.querySelector<HTMLButtonElement>(
        `[aria-controls="${CSS.escape(panelId)}"][aria-expanded="true"]`
      );
      trigger?.focus();
      setOpenButtonIndex(null);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openButtonIndex, panelId]);

  const isItemSubmenuOpen = (item: ReactElement<TopNavItemProps>, indexInItems: number) =>
    isToggleItem(item) ? openButtonIndex === indexInItems : Boolean(item.props.isActive);

  const activeItemWithSubmenu = useMemo(
    () => items.find((item, idx) => isItemSubmenuOpen(item, idx) && Children.count(item.props.submenu) > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, openButtonIndex]
  );

  const mobileItems = useMemo<SideNavItemProps[]>(
    () =>
      items.map((item) => ({
        children: item.props.children,
        disabled: item.props.disabled,
        href: item.props.href,
        icon: item.props.icon,
        isActive: item.props.isActive,
        onClick: item.props.onClick as SideNavItemProps['onClick'],
        subItemGroups: extractMobileSubmenuGroups(item.props.submenu),
      })),
    [items]
  );

  if (isMobileView) {
    return (
      <MobileNav
        navItems={mobileItems}
        ariaLabel={ariaLabel}
        isOpen={isOpen}
        onClose={() => setMenuOpen(false)}
        showOverlay={showMobileOverlay}
        className={className}
      />
    );
  }

  const renderSubmenuInline = submenuFit === 'item';
  const resolvedMaxWidth = resolveMaxWidth(maxWidth);

  let itemCursor = 0;

  return (
    <nav
      ref={navRef}
      id={id}
      className={cn(styles['tedi-top-nav'], className)}
      aria-label={ariaLabel}
      data-name="top-nav"
    >
      <div className={styles['tedi-top-nav__bar']}>
        <ul
          className={styles['tedi-top-nav__list']}
          style={resolvedMaxWidth !== undefined ? { maxWidth: resolvedMaxWidth } : undefined}
        >
          {allChildren.map((child, index) => {
            if (isNavItem(child)) {
              const itemIndex = itemCursor++;
              const hasSubmenu = Children.count(child.props.submenu) > 0;
              const toggle = isToggleItem(child);
              const isSubmenuOpen = isItemSubmenuOpen(child, itemIndex);
              const consumerOnClick = child.props.onClick;
              const wrappedOnClick = toggle
                ? (event: React.MouseEvent | React.KeyboardEvent) => {
                    consumerOnClick?.(event);
                    setOpenButtonIndex((current) => (current === itemIndex ? null : itemIndex));
                  }
                : consumerOnClick;
              return React.cloneElement(child, {
                key: index,
                hasSubmenu,
                renderSubmenuInline,
                isSubmenuOpen,
                panelId,
                onClick: wrappedOnClick,
              });
            }
            return React.cloneElement(child, { key: index });
          })}
        </ul>
      </div>
      {!renderSubmenuInline && activeItemWithSubmenu && (
        <div id={panelId} className={styles['tedi-top-nav__submenu']} data-name="top-nav-submenu">
          <div
            className={styles['tedi-top-nav__submenu-inner']}
            style={resolvedMaxWidth !== undefined ? { maxWidth: resolvedMaxWidth } : undefined}
          >
            {activeItemWithSubmenu.props.submenu}
          </div>
        </div>
      )}
    </nav>
  );
};

TopNav.displayName = 'TopNav';

TopNav.Item = TopNavItem;
TopNav.Group = TopNavGroup;
TopNav.SubItem = TopNavSubItem;
TopNav.Separator = TopNavSeparator;

export default TopNav;
