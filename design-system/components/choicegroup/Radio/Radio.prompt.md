Radio from @tedi-design-system/react. Use via `window.Tedi.Radio` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Radio.html`): Default, Sizes, States, Hidden Label, With Extra Content, With Tooltip, Controlled, Radio With Long Title.

## Props

```ts
interface RadioProps {
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
    id: 'default-radio',
    name: 'default-radio',
    defaultChecked: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: TemplateSizes,
};

// States
export const States = () => {
  return (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Default</Text>
            </Col>
            <Col>
              <Radio id="radio-default" label="Text" name="radio-default" value="radio" />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Hover</Text>
            </Col>
            <Col>
              <Radio id="radio-hover" label="Text" name="radio-hover" value="radio" hover />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Selected</Text>
            </Col>
            <Col>
              <Radio id="radio-checked" label="Text" name="radio-checked" value="radio" defaultChecked />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled</Text>
            </Col>
            <Col>
              <Radio id="radio-disabled" label="Text" name="radio-disabled" value="radio" disabled />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled selected</Text>
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

### WithExtraContent

```jsx
/* With Extra Content */ compose(S, "WithExtraContent")
```

### WithTooltip

```jsx
/* With Tooltip */ compose(S, "WithTooltip")
```

### Controlled

```jsx
/* Controlled */ compose(S, "Controlled")
```

### RadioWithLongTitle

```jsx
/* Radio With Long Title */ compose(S, "RadioWithLongTitle")
```
