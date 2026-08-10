ClosingButton from @tedi-design-system/react. Use via `window.Tedi.ClosingButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ClosingButton.html`): Default, Size, Icon Sizes, States, Color Brand, Color Inverted.

## Props

```ts
interface ClosingButtonProps {
  /** Additional classes to apply custom styles to the ClosingButton. */
  className?: string;
  /** Size of the ClosingButton */
  size?: "default" | "small";
  /** Event handler for the button click event. Triggered when the user clicks on the close button. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  color?: "primary" | "brand" | "white";
  iconSize?: 18 | 24;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    title: 'close',
  },
};

// Size
export const Size: Story = {
  render: SizeTemplate,
};

/**
 * Hover state is shown on all buttons for size preview.
 */

// Icon Sizes
export const IconSizes: Story = {
  render: IconSizeTemplate,
  parameters: {
    pseudo: {
      hover: '.hover',
    },
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Size

```jsx
/* Size */ compose(S, "Size")
```

### IconSizes

```jsx
/* Icon Sizes */ compose(S, "IconSizes")
```

### States

```jsx
/* States */ compose(S, "States")
```

### ColorBrand

```jsx
/* Color Brand */ compose(S, "ColorBrand")
```

### ColorInverted

```jsx
/* Color Inverted */ compose(S, "ColorInverted")
```
