Breadcrumbs from @tedi-design-system/react. Use via `window.Tedi.Breadcrumbs` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Breadcrumbs.html`): Default, Long, Short, Custom Aria Label, Condensed, Responsive Variant, Custom Separator.

## Props

```ts
interface BreadcrumbsProps {
  /** Crumbs in order from the root page to the current page. Each child becomes one crumb; chevron separators are inserted between them. Use a `Link` (or any anchor) for navigable crumbs and a plain element (e.g. `<span>`) for the current page — add `aria-current="page"` to it yourself. */
  children: React.ReactNode;
  /** Accessible label for the wrapping `<nav>` landmark. Falls back to the `breadcrumbs` entry from `LabelProvider`. */
  ariaLabel?: string;
  /** Accessible label for the ellipsis button that opens the collapsed-crumbs dropdown. Only used when `maxItems` causes a collapse. Falls back to the `breadcrumbs.show-more` entry from `LabelProvider`. */
  showMoreLabel?: string;
  /** Node rendered between crumbs. Pass a string (e.g. `'/'`, `'›'`) for text separators or any React node for custom markup. Hidden from assistive technology — screen readers announce only the crumbs themselves. */
  separator?: React.ReactNode;
  /** Additional class name applied to the `<nav>` element. */
  className?: string;
  /** - `'long'` — full trail of crumbs separated by chevrons. - `'short'` — only the second-to-last child rendered as a back-link with a left-pointing arrow. Useful on narrow viewports. Renders nothing when fewer than two crumbs are supplied. */
  variant?: "long" | "short";
  /** Maximum number of crumbs to render before collapsing the middle into an ellipsis button. Clicking the button opens a dropdown listing the hidden crumbs. Only applies in the `'long'` variant. When omitted, all crumbs are rendered. */
  maxItems?: number;
  /** Number of crumbs to keep visible at the start of the trail when collapsed. */
  itemsBeforeCollapse?: number;
  /** Number of crumbs to keep visible at the end of the trail when collapsed. The current page (last crumb) should normally stay visible — keep this ≥ 1. */
  itemsAfterCollapse?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<BreadcrumbsBreakpointProps>;
  md?: Partial<BreadcrumbsBreakpointProps>;
  lg?: Partial<BreadcrumbsBreakpointProps>;
  xl?: Partial<BreadcrumbsBreakpointProps>;
  xxl?: Partial<BreadcrumbsBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Link href="#">Dashboard</Link>
        <Link href="#">Applications</Link>
        <span aria-current="page">Application nr 506</span>
      </>
    ),
  },
};

// Long
export const Long: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <Breadcrumbs>
        <Link href="#">Dashboard</Link>
        <Link href="#">Applications</Link>
        <span aria-current="page">Application nr 506</span>
      </Breadcrumbs>
      <Breadcrumbs>
        <Link href="#">Dashboard</Link>
        <Link href="#">Documents</Link>
        <Link href="#">My documents</Link>
        <Link href="#">Application nr 506</Link>
        <span aria-current="page">Restrictions</span>
      </Breadcrumbs>
      <Breadcrumbs>
        <Link href="#">Medications</Link>
        <span aria-current="page">Ibuprofen</span>
      </Breadcrumbs>
    </VerticalSpacing>
  ),
};

// Short
export const Short: Story = {
  render: Template,
  args: {
    variant: 'short',
    children: (
      <>
        <Link href="#">Dashboard</Link>
        <span aria-current="page">Current page</span>
      </>
    ),
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Long

```jsx
/* Long */ compose(S, "Long")
```

### Short

```jsx
/* Short */ compose(S, "Short")
```

### CustomAriaLabel

```jsx
/* Custom Aria Label */ compose(S, "CustomAriaLabel")
```

### Condensed

```jsx
/* Condensed */ compose(S, "Condensed")
```

### ResponsiveVariant

```jsx
/* Responsive Variant */ compose(S, "ResponsiveVariant")
```

### CustomSeparator

```jsx
/* Custom Separator */ compose(S, "CustomSeparator")
```
