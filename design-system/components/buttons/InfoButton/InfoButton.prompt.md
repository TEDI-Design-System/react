InfoButton from @tedi-design-system/react. Use via `window.Tedi.InfoButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `InfoButton.html`): Default, States, Inverted, Usage with tooltip and popover.

## Props

```ts
interface InfoButtonProps {
  /** If true, applies a small size to the InfoButton */
  isSmall?: boolean;
  /** Children elements to be rendered inside the InfoButton */
  children?: React.ReactNode;
  color?: "default" | "inverted";
  ref?: React.Ref;
  sm?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  md?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  lg?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  xl?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  xxl?: Partial<ButtonContentProps<"button", IInternalButtonProps, "button">>;
  /** Render as custom component */
  as?: "button";
  /** Additional custom class name. */
  className?: string;
  /** Button visual type */
  visualType?: "primary" | "secondary" | "neutral" | "link";
  /** If button should take all the space it has */
  fullWidth?: boolean;
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
  /** If button is in loading state and should show spinner. When isLoading is true, button does not trigger onClick event. */
  isLoading?: boolean;
  /** Skip applying button/link styles Useful when you just want to use Button or Link logic without the styles In this case icon, iconLeft and iconRight are ignored */
  noStyle?: boolean;
  /** Internal use only */
  renderWrapperElement?: unknown;
  /** Automatically show tooltip for icon-only buttons. */
  showTooltip?: boolean;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Skips form's browser validation */
  formNoValidate?: boolean;
  style?: React.CSSProperties;
  id?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

// States
export const States: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

// Inverted
export const Inverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'inverted',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

const labelStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--layout-grid-gutters-04)',
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### States

```jsx
/* States */ compose(S, "States")
```

### Inverted

```jsx
/* Inverted */ compose(S, "Inverted")
```

### UsageWithTooltipAndPopover

```jsx
/* Usage with tooltip and popover */ compose(S, "UsageWithTooltipAndPopover")
```
