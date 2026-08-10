List from @tedi-design-system/react. Use via `window.Tedi.List` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `List.Item`. See the DS docs for composition — e.g. items like `List.Item` go inside `<List>`; containers like `List.Group` wrap multiple `<List>`s.

Variants (see `List.html`): Default, Unordered List, Ordered List, No Style List.

## Props

```ts
interface ListProps {
  /** List children should be ListItem components */
  children: boolean | React.ReactNode;
  /** The HTML element to use for rendering the list. Can either be 'ul' for an unordered list or 'ol' for an ordered list. */
  element?: "ol" | "ul";
  /** Adds a custom CSS class to the List element for additional styling or theming purposes */
  className?: string;
  /** This prop is used to set the color of the bullet points in the list. Uses same color values as TEDI Icon */
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "tertiary" | "brand" | "white" | "inherit" | "brand-dark" | "warning-dark";
  /** Props for controlling vertical spacing between list items. If provided, the List will be wrapped inside a VerticalSpacing component. */
  verticalSpacing?: Omit<VerticalSpacingProps, "children" | "element">;
  /** Determines whether the list should have default styling (with bullets or numbers). */
  style?: "none" | "styled";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ListBreakpointProps>;
  md?: Partial<ListBreakpointProps>;
  lg?: Partial<ListBreakpointProps>;
  xl?: Partial<ListBreakpointProps>;
  xxl?: Partial<ListBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    style: 'styled',
    element: 'ul',
  },
};

// Unordered List
export const UnorderedList: Story = {
  render: TemplateUnorderedList,
  args: {
    style: 'styled',
  },
};

// Ordered List
export const OrderedList: Story = {
  render: TemplateOrderedList,
  args: {
    element: 'ol',
    style: 'styled',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### UnorderedList

```jsx
/* Unordered List */ compose(S, "UnorderedList")
```

### OrderedList

```jsx
/* Ordered List */ compose(S, "OrderedList")
```

### NoStyleList

```jsx
/* No Style List */ compose(S, "NoStyleList")
```

## Related

`List.Item`
