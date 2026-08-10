SideNav from @tedi-design-system/react. Use via `window.Tedi.SideNav` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Vertical primary navigation. **Decoupled from layout** — it does not position itself and
there is no `Layout` component. See "Page shell / app layout" in README.md for the
canonical shell; this page covers SideNav's own contract.

**Live Storybook:** https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-sidenav--docs

Stories (see `SideNav.html`): `Default`, `SidenavItemStates`, `SecondLevelMenuItems`,
`SecondLevelMenuItemsParentsAreLinks`, `ThirdLevelMenuItems`,
`ThirdLevelMenuItemsParentsAreLinks`, `CollapsibleToggle`, `DefaultOpen`,
`MediumSideNavItems`, `SmallSideNavItems`, `SubTitles`.

## Gotchas

**1. It renders nothing below `lg` unless you wire the toggle.** This is the single most
common failure — no error, no warning, just an empty column.

`mobileBreakpoint` defaults to `"tablet"` → mobile view below **`lg`**. In mobile view
SideNav renders a `MobileNav`, which returns `null` while closed. So a plain
`<SideNav navItems={…} />` is invisible on any viewport under 1200px.

Pick one of the two setups:

```jsx
// ✓ A. Static desktop column that stays visible down to md
<SideNav ariaLabel="Peamenüü" navItems={navItems} mobileBreakpoint="mobile" />

// ✓ B. Toggle-driven — ONE boolean drives both; they share no context
const [open, setOpen] = useState(false);
<Header toggle={<SideNav.Toggle menuOpen={open} toggleMenu={() => setOpen(!open)} />}>…</Header>
<SideNav ariaLabel="Peamenüü" navItems={navItems} isMobileOpen={open} />

// ✗ invisible below lg — nothing to open it
<SideNav ariaLabel="Peamenüü" navItems={navItems} />
```

`mobileBreakpoint="mobile"` switches at `md`, `"tablet"` (default) at `lg`.

**2. `ariaLabel` is required** — a non-optional prop, so omitting it is a TypeScript
error. It is only used as `aria-label`; there is no runtime guard and it does not cause a
blank render. If your nav is invisible, it is gotcha 1.

**3. Resize with the token, and don't hardcode the column width.** Class names are
hashed and not public API. SideNav is
`width: var(--navigation-vertical-item-width-default)` and `height: 100%` — so **its
parent controls its height, and the token controls its width.**

The shipped value is breakpoint-dependent:

| Width | Applies |
|---|---|
| **240px** | base — the desktop column |
| 400px | `@media (width < 62rem)` — the mobile drawer |
| 320px | `@media (width < 48rem)` |

```jsx
// ✗ hardcoding the mobile value leaves a 160px gap on desktop (nav is 240px there)
<div style={{ width: 400 }}><SideNav … /></div>

// ✓ let the column size to the nav
<div style={{ display: 'flex' }}><SideNav … /></div>
```

```css
/* ✓ to resize, move the token — the column follows automatically */
.app-shell { --navigation-vertical-item-width-default: 280px; }
```

## `navItems` item shape

`SideNavItemProps` is `LinkProps` plus nav-specific fields — so anything `Link` accepts
works here too:

```ts
{
  children: React.ReactNode;          // the visible label (from LinkProps)
  href?: string;                      // omit and use onClick for router navigation
  onClick?: (e) => void;
  isActive?: boolean;                 // current-page highlight — you set this
  icon?: string | IconWithoutBackgroundProps;   // Material Symbols ligature
  subItems?: SideNavItemProps[];                // one nested level
  subItemGroups?: { subHeading?: React.ReactNode; subItems: SideNavItemProps[] }[];
}
```

```jsx
const navItems = [
  { children: 'Töölaud', href: '/', icon: 'dashboard', isActive: true },
  { children: 'Juhtumid', icon: 'folder', subItemGroups: [
      { subHeading: 'Aktiivsed', subItems: [{ children: 'Minu juhtumid', href: '/cases/mine' }] },
  ]},
];
```

Use `subItemGroups` rather than `subItems` when you want headings — `subItems` is the
legacy shape.

`linkAs` swaps the rendered element for a router link (`linkAs={NextLink}`).

## Props

```ts
interface SideNavProps {
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
```
