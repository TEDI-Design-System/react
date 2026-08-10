TextGroup from @tedi-design-system/react. Use via `window.Tedi.TextGroup` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `TextGroup.List`. See the DS docs for composition — e.g. items like `TextGroup.Item` go inside `<TextGroup>`; containers like `TextGroup.Group` wrap multiple `<TextGroup>`s.

Variants (see `TextGroup.html`): Default, Types, Position Type, Horizontal Label Length, Long Text Values, Responsive Layout Change, Custom Label, With List.

## Props

```ts
interface TextGroupProps {
  /** Type of text group layout */
  type?: "horizontal" | "vertical";
  /** Alignment for the label text */
  labelAlign?: "left" | "right";
  /** Width for the label (e.g., '200px', '30%', etc.) */
  labelWidth?: string | number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  md?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  lg?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  xl?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  xxl?: Partial<{ type?: "horizontal"; labelAlign?: TextAlign; labelWidth?: string | number; }> | Partial<{ type: "vertical"; labelAlign?: "left"; labelWidth?: string | number; }>;
  /** Label for the text group */
  label: React.ReactNode;
  /** Value displayed alongside the label */
  value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.ReactNode[];
  /** Additional class name(s) to apply to the element */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};

// Types
export const Types: Story = {
  render: TemplateWithTypes,
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};

// Position Type
export const PositionType: Story = {
  render: TemplateWithLayouts,
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Types

```jsx
/* Types */ compose(S, "Types")
```

### PositionType

```jsx
/* Position Type */ compose(S, "PositionType")
```

### HorizontalLabelLength

```jsx
/* Horizontal Label Length */ compose(S, "HorizontalLabelLength")
```

### LongTextValues

```jsx
/* Long Text Values */ compose(S, "LongTextValues")
```

### ResponsiveLayoutChange

```jsx
/* Responsive Layout Change */ compose(S, "ResponsiveLayoutChange")
```

### CustomLabel

```jsx
/* Custom Label */ compose(S, "CustomLabel")
```

### WithList

```jsx
/* With List */ compose(S, "WithList")
```

## Related

`TextGroup.List`
