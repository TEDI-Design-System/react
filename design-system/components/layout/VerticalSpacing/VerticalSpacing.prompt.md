VerticalSpacing from @tedi-design-system/react. Use via `window.Tedi.VerticalSpacing` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `VerticalSpacing.Item`. See the DS docs for composition — e.g. items like `VerticalSpacing.Item` go inside `<VerticalSpacing>`; containers like `VerticalSpacing.Group` wrap multiple `<VerticalSpacing>`s.

Variants (see `VerticalSpacing.html`): Default, Sizes, As Section, With Custom Class Name, Nested Spacing, Mixed Content, Overwrite Item Spacing.

## Props

```ts
interface VerticalSpacingProps {
  /** Any content to be rendered within the spacing component */
  children: boolean | ReactNode[] | React.ReactNode;
  /** The HTML element to render, such as `div`, `section`, `article`, etc */
  element?: "symbol" | "object" | "button" | "link" | "text" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | (string & {}) /* +162 more */;
  /** Additional class name(s) to apply to the element */
  className?: string;
  /** The size of the vertical spacing, applied as `margin-bottom` The value corresponds to `em` units */
  size?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 0.75 | 2.5 | 0.25 | 1.25 | 1.75;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<VerticalSpacingBreakpointProps>;
  md?: Partial<VerticalSpacingBreakpointProps>;
  lg?: Partial<VerticalSpacingBreakpointProps>;
  xl?: Partial<VerticalSpacingBreakpointProps>;
  xxl?: Partial<VerticalSpacingBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    size: 1,
  },
};

// Sizes
export const Sizes: Story = {
  render: TemplateWithSizes,
  args: {
    element: 'div',
  },
};

// As Section
export const AsSection: Story = {
  render: Template,
  args: {
    element: 'section',
    size: 1,
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### AsSection

```jsx
/* As Section */ compose(S, "AsSection")
```

### WithCustomClassName

```jsx
/* With Custom Class Name */ compose(S, "WithCustomClassName")
```

### NestedSpacing

```jsx
/* Nested Spacing */ compose(S, "NestedSpacing")
```

### MixedContent

```jsx
/* Mixed Content */ compose(S, "MixedContent")
```

### OverwriteItemSpacing

```jsx
/* Overwrite Item Spacing */ compose(S, "OverwriteItemSpacing")
```

## Related

`VerticalSpacing.Item`
