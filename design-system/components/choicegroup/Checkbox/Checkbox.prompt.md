Checkbox from @tedi-design-system/react. Use via `window.Tedi.Checkbox` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Checkbox.html`): Default, Sizes, States, Hidden Label, With Helper, With Tooltip, Controlled, Check With Long Title.

## Props

```ts
interface CheckboxProps {
  /** If the check is in indeterminate state. (Not checked or unchecked) When this is true then the checked prop is ignored */
  indeterminate?: boolean;
  /** ID property */
  id: string;
  /** Label text */
  label: React.ReactNode;
  /** Additional classes. */
  className?: string;
  /** Value property */
  value: string;
  /** name of the input */
  name: string;
  /** is the label hidden */
  hideLabel?: boolean;
  /** If the option is disabled */
  disabled?: boolean;
  /** onChange handler */
  onChange?: (value: string, checked: boolean) => void;
  /** Helper text displayed below the input. */
  helper?: FeedbackTextProps;
  /** If the check is controlled from outside the components */
  checked?: boolean;
  /** If the check is checked by default */
  defaultChecked?: boolean;
  /** If the item should be in hover state */
  hover?: boolean;
  /** Provide content for tooltip. Accepts rich content (e.g. bold text, links), not just a plain string. */
  tooltip?: React.ReactNode;
  /** Input size */
  size?: "default" | "large";
  /** Whether the input is marked as invalid. */
  invalid?: boolean;
  /** Whether the input is marked as required. */
  required?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,

  args: {
    id: 'default-check',
    name: 'default-check',
    defaultChecked: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: TemplateSizes,
};

// States
export const States = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);

  return (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Default</Text>
            </Col>
            <Col>
              <Checkbox id="check-default" label="Text" name="check-default" value="check" />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Hover</Text>
            </Col>
            <Col>
              <Checkbox id="check-hover" label="Text" name="check-hover" value="check" hover />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Selected</Text>
            </Col>
            <Col>
              <Checkbox
                id="check-checked"
                label="Text"
                name="check-checked"
                value="check"
                checked={checked}
                onChange={(value, checked) => setChecked(checked)}
              />
            </Col>
          </Row>
          <Row>
// …
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### States

```jsx
/* States */ compose(S, "States")
```

### HiddenLabel

```jsx
/* Hidden Label */ compose(S, "HiddenLabel")
```

### WithHelper

```jsx
/* With Helper */ compose(S, "WithHelper")
```

### WithTooltip

```jsx
/* With Tooltip */ compose(S, "WithTooltip")
```

### Controlled

```jsx
/* Controlled */ compose(S, "Controlled")
```

### CheckWithLongTitle

```jsx
/* Check With Long Title */ compose(S, "CheckWithLongTitle")
```
