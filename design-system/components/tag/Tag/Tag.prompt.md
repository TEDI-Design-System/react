Tag from @tedi-design-system/react. Use via `window.Tedi.Tag` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Tag.html`): Default, Primary, Secondary, Danger, Ellipsis.

## Props

```ts
interface TagProps {
  /** The content inside the Tag. Typically this will be text or any JSX elements to be displayed. */
  children: React.ReactNode;
  /** Function to be called when the close button is clicked. If provided, a close button will be rendered inside the Tag. */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /** Extra props forwarded to the inner close button (when `onClose` is set). Lets consumers wire up keyboard handlers, tab focus, or event isolation without reaching past the Tag API. `onClick` and `iconSize` are owned by Tag and can't be overridden here. */
  closeButtonProps?: Omit<ClosingButtonProps, "onClick" | "iconSize">;
  /** Determines whether the Tag is in a loading state */
  isLoading?: boolean;
  /** Overrides the Tag's implicit live-region role. Tags default to `role="status"` so they are announced by assistive tech. When a Tag is rendered as static content inside a list — and additions/removals are announced elsewhere — pass e.g. `role="presentation"` so it is not read as a live status, which otherwise makes some screen readers (e.g. JAWS) announce the content twice on focus. */
  role?: "button" | "link" | "article" | "dialog" | "figure" | "form" | "img" | "main" | "menu" | "menuitem" | "option" | "search" | "table" | "switch" | "alert" | "status" | (string & {}) /* +54 more */;
  /** Determines Tag color When true, the Tag will be styled accordingly and an error icon will be displayed. */
  color?: "primary" | "secondary" | "danger";
  /** Truncates the label when the Tag is width-constrained, revealing the full text in a popover on hover/focus. `end` shows a trailing ellipsis (`Long label…`); `start` shows a leading one (`…label`), keeping the most significant tail (e.g. dates, IDs) visible. `false` never truncates — the label wraps and the Tag keeps its full width. */
  ellipsis?: false | "end" | "start";
  /** Additional classes to apply custom styles to the Tag. */
  className?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<TagBreakpointProps>;
  md?: Partial<TagBreakpointProps>;
  lg?: Partial<TagBreakpointProps>;
  xl?: Partial<TagBreakpointProps>;
  xxl?: Partial<TagBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    color: 'primary',
    children: 'Tag',
  },
};

// Primary
export const Primary: Story = {
  render: ColorTemplate,
  args: {
    onClose: (e) => console.log('Close button clicked', e),
    isLoading: true,
    color: 'primary',
    children: 'Tag',
  },
};

// Secondary
export const Secondary: Story = {
  render: ColorTemplate,
  args: {
    onClose: (e) => console.log('Close button clicked', e),
    isLoading: true,
    color: 'secondary',
    children: 'Tag',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Primary

```jsx
/* Primary */ compose(S, "Primary")
```

### Secondary

```jsx
/* Secondary */ compose(S, "Secondary")
```

### Danger

```jsx
/* Danger */ compose(S, "Danger")
```

### Ellipsis

```jsx
/* Ellipsis */ compose(S, "Ellipsis")
```
