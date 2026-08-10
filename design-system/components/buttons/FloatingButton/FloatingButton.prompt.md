FloatingButton from @tedi-design-system/react. Use via `window.Tedi.FloatingButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `FloatingButton.html`): Default, Primary Horizontal, Primary Vertical, Secondary Horizontal, Secondary Vertical.

## Props

```ts
interface FloatingButtonProps {
  /** Button axis */
  axis?: "horizontal" | "vertical";
  /** Button visual type */
  visualType?: "primary" | "secondary";
  /** Button size */
  size?: "large" | "medium";
  /** Button position */
  position?: "sticky" | "fixed" | "unset" | "static" | "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "-webkit-sticky" | "absolute" | "relative";
  /** Button placement */
  placement?: FloatingButtonPlacement;
  /** Button offset */
  offset?: FloatingButtonOffset;
  /** Button z-index */
  zIndex?: number;
  ref?: React.Ref;
  sm?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  md?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  lg?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  xl?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  xxl?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  /** Render as custom component */
  as?: "button";
  /** Button children */
  children: React.ReactNode;
  /** Additional custom class name. */
  className?: string;
  /** Name of the icon when button only has an icon in it. */
  icon?: string | IconWithoutBackgroundProps;
  /** Name of the icon we want to show on the left. */
  iconLeft?: string | IconWithoutBackgroundProps;
  /** Name of the icon we want to show on the right. */
  iconRight?: string | IconWithoutBackgroundProps;
  /** Underline the button text */
  underline?: boolean;
  /** If button is active and should keep its hover state. */
  isHovered?: boolean;
  /** If button is active and should keep it's active state. */
  isActive?: boolean;
  /** Automatically show tooltip for icon-only buttons. */
  showTooltip?: boolean;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Skips form's browser validation */
  formNoValidate?: boolean;
  style?: CSSProperties;
  id?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    children: 'Scroll up',
    position: 'static',
  },
};

// Primary Horizontal
export const PrimaryHorizontal: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'horizontal',
    visualType: 'primary',
    position: 'static',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

// Primary Vertical
export const PrimaryVertical: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'vertical',
    visualType: 'primary',
    position: 'static',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### PrimaryHorizontal

```jsx
/* Primary Horizontal */ compose(S, "PrimaryHorizontal")
```

### PrimaryVertical

```jsx
/* Primary Vertical */ compose(S, "PrimaryVertical")
```

### SecondaryHorizontal

```jsx
/* Secondary Horizontal */ compose(S, "SecondaryHorizontal")
```

### SecondaryVertical

```jsx
/* Secondary Vertical */ compose(S, "SecondaryVertical")
```
