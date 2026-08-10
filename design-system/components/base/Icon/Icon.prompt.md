Icon from @tedi-design-system/react. Use via `window.Tedi.Icon` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Icon.html`): Default, Icon Size, Icon size inside background, Icon colors, Icon background colors, Used Inside Text.

## Props

```ts
interface IconProps {
  /** Name of material icon https://fonts.google.com/icons */
  name: string;
  /** Additional classes to style the icon or its wrapper. - If `background` is provided, the `className` will be applied to the wrapper element. - If `background` is not provided, the `className` will be applied directly to the icon element. */
  className?: string;
  /** Type of icon It is recommended to only use one type throughout your app */
  type?: "outlined" | "sharp" | "rounded";
  /** Size of the icon */
  size?: 18 | 24 | 8 | 12 | 16 | 36 | 48;
  /** Render a filled variant of the icon */
  filled?: boolean;
  /** Which color Icon should be Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI */
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "tertiary" | "brand" | "white" | "inherit" | "brand-dark" | "warning-dark";
  /** Icons label for screen-readers. If omitted then the icon is hidden for screen-readers. */
  label?: string;
  /** Add round background */
  background?: "primary" | "secondary" | "brand-primary" | "brand-secondary";
  display?: "inline" | "block";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,

  args: {
    name: 'account_circle',
  },
};

// Icon Size
export const Sizes: Story = {
  name: 'Icon Size',
  render: TemplateColumn,

  args: {
    name: 'account_circle',
    property: 'size',
    color: 'primary',
    array: sizeArray,
  },
};

// Icon size inside background
export const SizesWithBackground: Story = {
  name: 'Icon size inside background',
  render: TemplateColumnWithMultipleVariants,
  args: {
    items: [
      {
        name: 'info',
        property: 'size',
        color: 'brand',
        background: 'brand-secondary',
        size: 16,
      },
      {
        name: 'vaccines',
        property: 'size',
        color: 'brand',
        background: 'brand-secondary',
        size: 24,
      },
    ],
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Sizes

```jsx
/* Icon Size */ compose(S, "Sizes")
```

### SizesWithBackground

```jsx
/* Icon size inside background */ compose(S, "SizesWithBackground")
```

### Colors

```jsx
/* Icon colors */ compose(S, "Colors")
```

### Backgrounds

```jsx
/* Icon background colors */ compose(S, "Backgrounds")
```

### UsedInsideText

```jsx
/* Used Inside Text */ compose(S, "UsedInsideText")
```
