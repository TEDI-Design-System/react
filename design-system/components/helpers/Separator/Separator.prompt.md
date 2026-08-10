Separator from @tedi-design-system/react. Use via `window.Tedi.Separator` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Separator.html`): Default, Horizontal Spacings, Horizontal Thickness, Vertical, Vertical Spacings, Vertical Thickness, Dotted Line Horizontal, Dotted Line Vertical, Sizes, Spacing Top Default, Spacing Top Small, Position, Dot Filled, Dot Outlined, Dotted Sizes, Inline Separator Usage, Vertical Dotted Card Example, Vertical Dotted Small Card Example.

## Props

```ts
interface SeparatorProps {
  /** Must be set to 'horizontal' or left undefined (defaults to horizontal) */
  axis?: "horizontal" | "vertical";
  /** Vertical height is not used in horizontal mode */
  height?: number;
  /** Display is forced to 'block' in horizontal mode */
  display?: "inline-block" | "inline" | "block";
  /** Additional class names */
  className?: string;
  /** HTML element to render — most common are 'hr', 'div', 'span' */
  element?: "div" | "hr" | "span";
  /** When true, the separator stretches to fill available space (100%) */
  isStretched?: boolean;
  /** Semantic color token */
  color?: "primary" | "secondary" | "accent";
  /** Visual style — line with dots vs standalone centered dot(s) */
  variant?: "dotted" | "dot-only";
  /** Line thickness in pixels (1 or 2) — affects outlined & solid lines */
  thickness?: 1 | 2;
  /** Spacing (margin) around the separator */
  spacing?: number | { top?: number; bottom?: number; left?: number; right?: number; };
  dotSize?: "small" | "large" | "medium" | "extra-small";
  dotStyle?: "filled" | "outlined";
  /** Position of the single dot */
  dotPosition?: number | "center" | "end" | "start";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  md?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  lg?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  xl?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
  xxl?: Partial<SeparatorHorizontalProps & DottedSeparatorProps> | Partial<SeparatorHorizontalProps & DotOnlySeparatorProps> | Partial<SeparatorVerticalProps & DottedSeparatorProps> | Partial<SeparatorVerticalProps & DotOnlySeparatorProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: { spacing: 1 },
};

// Horizontal Spacings
export const HorizontalSpacings: Story = {
  render: SpacingHorizontal,
  args: {
    axis: 'horizontal',
  },
};

// Horizontal Thickness
export const HorizontalThickness: Story = {
  render: ColorsAndThickness,
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### HorizontalSpacings

```jsx
/* Horizontal Spacings */ compose(S, "HorizontalSpacings")
```

### HorizontalThickness

```jsx
/* Horizontal Thickness */ compose(S, "HorizontalThickness")
```

### Vertical

```jsx
/* Vertical */ compose(S, "Vertical")
```

### VerticalSpacings

```jsx
/* Vertical Spacings */ compose(S, "VerticalSpacings")
```

### VerticalThickness

```jsx
/* Vertical Thickness */ compose(S, "VerticalThickness")
```

### DottedLineHorizontal

```jsx
/* Dotted Line Horizontal */ compose(S, "DottedLineHorizontal")
```

### DottedLineVertical

```jsx
/* Dotted Line Vertical */ compose(S, "DottedLineVertical")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### SpacingTopDefault

```jsx
/* Spacing Top Default */ compose(S, "SpacingTopDefault")
```

### SpacingTopSmall

```jsx
/* Spacing Top Small */ compose(S, "SpacingTopSmall")
```

### Position

```jsx
/* Position */ compose(S, "Position")
```

### DotFilled

```jsx
/* Dot Filled */ compose(S, "DotFilled")
```

### DotOutlined

```jsx
/* Dot Outlined */ compose(S, "DotOutlined")
```

### DottedSizes

```jsx
/* Dotted Sizes */ compose(S, "DottedSizes")
```

### InlineSeparatorUsage

```jsx
/* Inline Separator Usage */ compose(S, "InlineSeparatorUsage")
```

### VerticalDottedCardExample

```jsx
/* Vertical Dotted Card Example */ compose(S, "VerticalDottedCardExample")
```

### VerticalDottedSmallCardExample

```jsx
/* Vertical Dotted Small Card Example */ compose(S, "VerticalDottedSmallCardExample")
```
