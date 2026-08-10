Heading from @tedi-design-system/react. Use via `window.Tedi.Heading` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Heading.html`): Default, Headings, Custom Modifier, Semantic Headings.

## Props

```ts
interface HeadingProps {
  sm?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  md?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  lg?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  xl?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  xxl?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  /** Children of the text */
  children: React.ReactNode;
  /** Additional class */
  className?: string;
  /** Color of the text Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI */
  color?: "primary" | "secondary" | "neutral" | "danger" | "success" | "disabled" | "info" | "warning" | "tertiary" | "brand" | "white";
  /** ID attribute */
  id?: string;
  /** Allows to focus the element */
  tabIndex?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Single or multiple modifiers to change the text behavior */
  modifiers?: "center" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "left" | "right" | "normal" | "extra-small" | "bold" | "thin" | "italic" | "nowrap" | (string & {}) /* +13 more */;
  /** Semantic heading tag h1-h6 are allowed values */
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    children: 'Heading',
  },
};

// Headings
export const Headings: Story = {
  render: TemplateHeadings,
};

// Custom Modifier
export const CustomModifier: Story = {
  render: () => (
    <>
      <Heading element="h4" modifiers={['h1', 'bold']} color="warning">
        H4 heading with H1 styles and warning color
      </Heading>
      <Heading element="h2" modifiers={['normal', 'bold']} color="brand">
        H2 heading with normal bold text and brand color
      </Heading>
      <Heading element="h1" modifiers={['normal']}>
        H1 element with normal text styles
      </Heading>
    </>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Headings

```jsx
/* Headings */ compose(S, "Headings")
```

### CustomModifier

```jsx
/* Custom Modifier */ compose(S, "CustomModifier")
```

### SemanticHeadings

```jsx
/* Semantic Headings */ compose(S, "SemanticHeadings")
```

## Related

`HeadingWithIcon`
