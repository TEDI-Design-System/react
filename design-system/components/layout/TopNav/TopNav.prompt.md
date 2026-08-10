TopNav from @tedi-design-system/react. Use via `window.Tedi.TopNav` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `TopNav.Item`, `TopNav.Group`, `TopNav.SubItem`, `TopNav.Separator`. See the DS docs for composition — e.g. items like `TopNav.Item` go inside `<TopNav>`; containers like `TopNav.Group` wrap multiple `<TopNav>`s.

Variants (see `TopNav.html`): Default, With Icons, With Separator, Custom Item Content, Menu Open, Constrained Inner Width, Content Width Mega Menu, Submenu Group Without Title, Item States, Sub Item States, Group Variants, Controlled Mobile, Sticky, Sticky On Scroll.

## Props

```ts
interface TopNavProps {
  /** `TopNav.Item` and `TopNav.Separator` children. Any other React node is ignored. Fragments are flattened, so `<>…</>` wrappers work transparently. */
  children: React.ReactNode;
  /** Accessible name for the wrapping `<nav>` landmark. */
  ariaLabel: string;
  /** Breakpoint below which the bar collapses into the shared Sidenav mobile drawer. Pass any TEDI breakpoint name (`xs`/`sm`/`md`/`lg`/`xl`/`xxl`). */
  mobileBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Controlled open state for the mobile drawer. Pair with `onMenuToggle` to wire it to an external toggle button. */
  isMobileOpen?: boolean;
  /** Fires whenever the mobile drawer opens or closes. */
  onMenuToggle?: (open: boolean) => void;
  /** Dim the rest of the viewport when the mobile drawer is open. */
  showMobileOverlay?: boolean;
  /** Additional class name applied to the desktop `<nav>`. */
  className?: string;
  /** Element id forwarded to the desktop `<nav>`. */
  id?: string;
  /** Controls how the submenu (mega-menu) panel sizes and positions itself when the active item has submenu content. Both options use the same padding — this only affects the panel's width and horizontal position, not its density. - `'full'` (default) — the panel stretches to the full nav width and is centered, suitable for wide multi-column mega-menus. - `'content'` — the panel is only as wide as its content and sits left-aligned directly under the active item (it is *not* a smaller / tighter variant — just not stretched). Good for single- or few-column menus. */
  submenuFit?: "content" | "full";
  /** Constrains the inner content (item bar and full-width submenu inner) to a maximum width and centers it inside the blue `<nav>` background. Pass any valid CSS length (e.g. `1440`, `'1440px'`, `'90rem'`), or a TEDI breakpoint name (`'sm' | 'md' | 'lg' | 'xl' | 'xxl'`) — these resolve to the breakpoint's `min-width` (36rem / 48rem / 62rem / 75rem / 87.5rem respectively), useful for aligning the nav inner with a breakpoint-driven content container. The `<nav>` itself still spans 100% of its container. Pass `'none'` (or `0`) to disable the constraint and let the bar fill the full width of the nav. */
  maxWidth?: number | "sm" | "md" | "lg" | "xl" | "xxl" | "none" | string & {};
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <TopNav.Item href="#">Avaleht</TopNav.Item>
        <TopNav.Item href="#" isActive>
          Perekond
        </TopNav.Item>
        <TopNav.Item href="#">Hüvitised ja toetused</TopNav.Item>
        <TopNav.Item href="#">Töö ja töösuhted</TopNav.Item>
        <TopNav.Item href="#">Liiklus ja sõidukid</TopNav.Item>
        <TopNav.Item href="#">Minu andmed</TopNav.Item>
      </>
    ),
  },
};

// With Icons
export const WithIcons: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <TopNav.Item href="#" icon="home" isActive>
          Avaleht
        </TopNav.Item>
        <TopNav.Item href="#" icon="family_restroom">
          Perekond
        </TopNav.Item>
        <TopNav.Item href="#" icon="payments">
          Hüvitised
        </TopNav.Item>
        <TopNav.Item href="#" icon="work">
          Töö
        </TopNav.Item>
        <TopNav.Item href="#" icon="folder_shared">
          Minu andmed
        </TopNav.Item>
      </>
    ),
  },
};

// With Separator
export const WithSeparator: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <TopNav.Item href="#" isActive>
          Töölaud
        </TopNav.Item>
        <TopNav.Item href="#">Minu taotlused</TopNav.Item>
        <TopNav.Item href="#">Minu dokumendid</TopNav.Item>
        <TopNav.Item href="#">Koolitused</TopNav.Item>
        <TopNav.Separator />
        <TopNav.Item href="#" icon="settings">
          Seaded
        </TopNav.Item>
      </>
    ),
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithIcons

```jsx
/* With Icons */ compose(S, "WithIcons")
```

### WithSeparator

```jsx
/* With Separator */ compose(S, "WithSeparator")
```

### CustomItemContent

```jsx
/* Custom Item Content */ compose(S, "CustomItemContent")
```

### MenuOpen

```jsx
/* Menu Open */ compose(S, "MenuOpen")
```

### ConstrainedInnerWidth

```jsx
/* Constrained Inner Width */ compose(S, "ConstrainedInnerWidth")
```

### ContentWidthMegaMenu

```jsx
/* Content Width Mega Menu */ compose(S, "ContentWidthMegaMenu")
```

### SubmenuGroupWithoutTitle

```jsx
/* Submenu Group Without Title */ compose(S, "SubmenuGroupWithoutTitle")
```

### ItemStates

```jsx
/* Item States */ compose(S, "ItemStates")
```

### SubItemStates

```jsx
/* Sub Item States */ compose(S, "SubItemStates")
```

### GroupVariants

```jsx
/* Group Variants */ compose(S, "GroupVariants")
```

### ControlledMobile

```jsx
/* Controlled Mobile */ compose(S, "ControlledMobile")
```

### Sticky

```jsx
/* Sticky */ compose(S, "Sticky")
```

### StickyOnScroll

```jsx
/* Sticky On Scroll */ compose(S, "StickyOnScroll")
```

## Related

`TopNav.Item`, `TopNav.Group`, `TopNav.SubItem`, `TopNav.Separator`
