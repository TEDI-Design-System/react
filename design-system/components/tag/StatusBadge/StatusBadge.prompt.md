StatusBadge from @tedi-design-system/react. Use via `window.Tedi.StatusBadge` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StatusBadge.html`): Default, Sizes, Colors, Status Indicator, With Tooltip.

## Props

```ts
interface StatusBadgeProps {
  /** The content to be displayed inside the StatusBadge. If not provided and `icon` is set, the badge will display the icon only. */
  children?: React.ReactNode;
  /** Additional classes to apply custom styles to the StatusBadge. */
  className?: string;
  /** Provides the full text or description when the Badge represents an abbreviation. This is typically shown as a tooltip on hover. */
  title?: string;
  /** ID attribute */
  id?: string;
  /** ARIA role attribute for accessibility. */
  role?: "button" | "link" | "article" | "dialog" | "figure" | "form" | "img" | "main" | "menu" | "menuitem" | "option" | "search" | "table" | "switch" | "alert" | "status" | (string & {}) /* +54 more */;
  /** Specifies the color scheme of the StatusBadge. */
  color?: "neutral" | "danger" | "success" | "warning" | "accent" | "brand" | "transparent";
  /** Determines the style or visual type of the StatusBadge. */
  variant?: "filled" | "filled-bordered" | "bordered";
  /** Specifies the size of the StatusBadge. */
  size?: "default" | "large";
  /** StatusBadge status indicator */
  status?: "danger" | "success" | "warning" | "inactive";
  /** The name of the icon to be displayed inside the StatusBadge. The icon is rendered using the `Icon` component. */
  icon?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<StatusBadgePropsBreakpointProps>;
  md?: Partial<StatusBadgePropsBreakpointProps>;
  lg?: Partial<StatusBadgePropsBreakpointProps>;
  xl?: Partial<StatusBadgePropsBreakpointProps>;
  xxl?: Partial<StatusBadgePropsBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    color: 'neutral',
    variant: 'filled',
    children: 'Text',
  },
};

const TemplateAllCombos: StoryFn<StatusBadgeProps> = (args) => {
  return (
    <div className="badge-grid">
      <VerticalSpacing size={1}>
        {colors.map((color) => (
          <Row key={color} className="mb-2">
            <Col md={2} className="d-flex align-items-center">
              <strong>{color.charAt(0).toUpperCase() + color.slice(1)}</strong>
            </Col>
            {variants.map((variant) => (
              <Fragment key={variant}>
                <Col width="auto">
                  <StatusBadge {...args} color={color} variant={variant}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto">
                  <StatusBadge {...args} color={color} variant={variant} icon={colorToIconMap[color]}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto">
                  <StatusBadge {...args} color={color} variant={variant} icon={colorToIconMap[color]} />
                </Col>
              </Fragment>
            ))}
          </Row>
        ))}
      </VerticalSpacing>
    </div>
  );
// …

// Sizes
export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: sizeArray,
    children: 'Draft',
    color: 'neutral',
  },
};

// Colors
export const Colors: Story = {
  render: TemplateAllCombos,
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

### Colors

```jsx
/* Colors */ compose(S, "Colors")
```

### StatusIndicator

```jsx
/* Status Indicator */ compose(S, "StatusIndicator")
```

### WithTooltip

```jsx
/* With Tooltip */ compose(S, "WithTooltip")
```
