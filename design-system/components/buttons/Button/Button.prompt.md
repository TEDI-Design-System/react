Button from @tedi-design-system/react. Use via `window.Tedi.Button` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Button.html`): Default, Primary, Primary Inverted, Secondary, Secondary Inverted, Neutral, Neutral Inverted, Success, Danger, Danger Neutral, No Style Template, Full Width, Responsive Button, Long Text Button That Wraps Into Multiple Lines, Visual Type Link.

## Props

```ts
interface ButtonProps {
  /** Button children */
  children: React.ReactNode;
  /** Additional custom class name. */
  className?: string;
  /** Button visual type */
  visualType?: "primary" | "secondary" | "neutral" | "link";
  /** If button should take all the space it has */
  fullWidth?: boolean;
  /** Color scheme of the button. The 'text' value is only supported when visualType is 'link'. */
  color?: "default" | "danger" | "success" | "inverted" | "text";
  /** Button size */
  size?: "default" | "small" | "large";
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
  /** Render as custom component */
  as?: AllowedHTMLTags<C, "button">;
  style?: React.PropsWithoutRef<React.ComponentProps<AllowedHTMLTags<C, "button">>>["style"];
  id?: React.PropsWithoutRef<React.ComponentProps<AllowedHTMLTags<C, "button">>>["id"];
  ref?: PolymorphicRef<AllowedHTMLTags<C, "button">>;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  md?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  lg?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  xl?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
  xxl?: Partial<ButtonContentProps<C, IInternalButtonProps, "button">>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  argTypes: {
    as: {
      control: false,
      table: {
        type: { summary: 'ElementType' },
      },
    },
  },
  args: {
    children: 'Button',
  },
};

type TemplateMultipleProps<Type = typeof buttonStateArray> = ButtonProps<'button'> & {
  array: Type;
  titleColor: TextProps['color'];
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, ...buttonProps } = args;

  return (
    <>
      <VerticalSpacing size={0.5}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text color={titleColor} modifiers="bold">
              Default
            </Text>
          </Col>
          <Col className="text-bold">
            <Text color={titleColor} modifiers="bold">
              Small
            </Text>
          </Col>
        </Row>
        {array.map((value, key) => (
// …

// Primary
export const Primary: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

// Primary Inverted
export const PrimaryInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Primary

```jsx
/* Primary */ compose(S, "Primary")
```

### PrimaryInverted

```jsx
/* Primary Inverted */ compose(S, "PrimaryInverted")
```

### Secondary

```jsx
/* Secondary */ compose(S, "Secondary")
```

### SecondaryInverted

```jsx
/* Secondary Inverted */ compose(S, "SecondaryInverted")
```

### Neutral

```jsx
/* Neutral */ compose(S, "Neutral")
```

### NeutralInverted

```jsx
/* Neutral Inverted */ compose(S, "NeutralInverted")
```

### Success

```jsx
/* Success */ compose(S, "Success")
```

### Danger

```jsx
/* Danger */ compose(S, "Danger")
```

### DangerNeutral

```jsx
/* Danger Neutral */ compose(S, "DangerNeutral")
```

### NoStyleTemplate

```jsx
/* No Style Template */ compose(S, "NoStyleTemplate")
```

### FullWidth

```jsx
/* Full Width */ compose(S, "FullWidth")
```

### ResponsiveButton

```jsx
/* Responsive Button */ compose(S, "ResponsiveButton")
```

### LongTextButtonThatWrapsIntoMultipleLines

```jsx
/* Long Text Button That Wraps Into Multiple Lines */ compose(S, "LongTextButtonThatWrapsIntoMultipleLines")
```

### VisualTypeLink

```jsx
/* Visual Type Link */ compose(S, "VisualTypeLink")
```

## Related

`ButtonGroup`
