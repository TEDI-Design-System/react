StatusIndicator from @tedi-design-system/react. Use via `window.Tedi.StatusIndicator` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StatusIndicator.html`): Default, All Variants, Examples.

## Props

```ts
interface StatusIndicatorProps {
  /** The status type, which determines the indicator color. */
  type?: "danger" | "success" | "warning" | "inactive";
  /** The size of the indicator. */
  size?: "sm" | "lg";
  /** Whether the indicator has a white border ring. */
  hasBorder?: boolean;
  /** Controls positioning of the indicator. - `'default'` — inline, no absolute positioning - `'top-right'` — absolutely positioned at the top-right corner of the parent */
  position?: "default" | "top-right";
  /** Additional class name(s) */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    type: 'success',
    size: 'sm',
    hasBorder: false,
  },
};

const types = ['success', 'danger', 'warning', 'inactive'] as const;
const sizes = ['sm', 'lg'] as const;

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div>
      {sizes.map((size) => (
        <Row key={size} className="padding-14-16">
          <Col width={2} className="flex align-items-center">
            <Text modifiers="bold">{size === 'sm' ? 'Small' : 'Large'}</Text>
          </Col>
          <Col className="flex align-items-center gap-3">
            {types.map((type) => (
              <StatusIndicator key={type} type={type} size={size} />
            ))}
          </Col>
        </Row>
      ))}
      {sizes.map((size) => (
        <Row key={`${size}-bordered`} className="padding-14-16">
          <Col width={2} className="flex align-items-center">
            <Text modifiers="bold">{size === 'sm' ? 'Small bordered' : 'Large bordered'}</Text>
          </Col>
          <Col className="flex align-items-center gap-3">
            {types.map((type) => (
              <StatusIndicator key={type} type={type} size={size} hasBorder />
            ))}
          </Col>
        </Row>
      ))}
    </div>
  ),
};

// Examples
export const Examples: Story = {
  render: () => (
    <span style={{ position: 'relative' }}>
      Lugemata teated&nbsp;
      <StatusIndicator type="danger" position="top-right" />
    </span>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### AllVariants

```jsx
/* All Variants */ compose(S, "AllVariants")
```

### Examples

```jsx
/* Examples */ compose(S, "Examples")
```
