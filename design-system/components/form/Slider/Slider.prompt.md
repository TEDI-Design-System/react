Slider from @tedi-design-system/react. Use via `window.Tedi.Slider` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Slider.html`): Default, With Input Group, Min And Max Values, With Current Value, Custom Value, States, Without Tooltip, With Helper.

## Props

```ts
interface SliderProps {
  /** Unique identifier for the underlying input element. Generated automatically if not provided. */
  id?: string;
  /** Name attribute of the underlying input element. */
  name?: string;
  /** Label text rendered above the slider. */
  label?: React.ReactNode;
  /** Controls the visibility of the label. Pass `true` to hide it visually while keeping it available to assistive technology, or `'keep-space'` to reserve the vertical space. */
  hideLabel?: boolean | "keep-space";
  /** Marks the field as required. */
  required?: boolean;
  /** Minimum allowed value. */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Step size. */
  step?: number;
  /** Controlled value. Use together with `onChange`. */
  value?: number;
  /** Default value for uncontrolled usage. */
  defaultValue?: number;
  /** Callback fired when the value changes. */
  onChange?: (value: number) => void;
  /** Disables the slider. */
  disabled?: boolean;
  /** Marks the slider as invalid for validation purposes. */
  invalid?: boolean;
  /** Accessible label used when no visible `label` is provided. */
  "aria-label"?: string;
  /** ID of an element that labels the slider, used when no visible `label` is provided. */
  "aria-labelledby"?: string;
  /** Human-readable text alternative of the current value. */
  "aria-valuetext"?: string;
  /** Text/element rendered to the left of the track (e.g. the minimum value). */
  minLabel?: React.ReactNode;
  /** Text/element rendered to the right of the track (e.g. the maximum value). Ignored when `showCurrentValue` is `true`. */
  maxLabel?: React.ReactNode;
  /** When `true`, renders the current value to the right of the track instead of `maxLabel`. */
  showCurrentValue?: boolean;
  /** Formats the current value, used by both the thumb tooltip and the `showCurrentValue` label. */
  valueFormatter?: (value: number) => React.ReactNode;
  /** Renders a tooltip above the thumb showing the current value. Shown only while the slider is hovered, focused, or being dragged. Value is formatted via `valueFormatter`. */
  tooltip?: boolean;
  /** Node rendered to the right of the slider, typically a NumberField used to edit the same value. */
  addonRight?: React.ReactNode;
  /** Helper text rendered below the slider. */
  helper?: FeedbackTextProps;
  /** Additional class name(s) applied to the root element. */
  className?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<SliderBreakpointProps>;
  md?: Partial<SliderBreakpointProps>;
  lg?: Partial<SliderBreakpointProps>;
  xl?: Partial<SliderBreakpointProps>;
  xxl?: Partial<SliderBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  decorators: [wrapInCol],
  args: {
    id: 'slider-default',
    label: 'Väärtus',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    minLabel: '0%',
    maxLabel: '100%',
  },
};

const InputGroupTemplate = (args: SliderProps) => {
  const [value, setValue] = useState<number>(20);
  return (
    <Row>
      <Col lg={6} xs={12}>
        <Slider
          {...args}
          value={value}
          onChange={setValue}
          addonRight={
            <div style={{ width: '100px' }}>
              <InputGroup id="slider-input-group-field" label="Väärtus" hideLabel>
                <InputGroup.Input>
                  <Field
                    type="number"
                    value={String(value)}
                    onChange={(next) => {
                      const parsed = Number(next);
                      if (!Number.isNaN(parsed)) setValue(parsed);
                    }}
                  />
                </InputGroup.Input>
                <InputGroup.Suffix>%</InputGroup.Suffix>
              </InputGroup>
            </div>
          }
// …

// With Input Group
export const WithInputGroup: Story = {
  render: (args) => <InputGroupTemplate {...args} />,
  args: {
    id: 'slider-input-group',
    label: 'Väärtus',
    min: 0,
    max: 100,
    step: 1,
    minLabel: '0%',
    maxLabel: '100%',
  },
};

// Min And Max Values
export const MinAndMaxValues: Story = {
  decorators: [wrapInCol],
  args: {
    id: 'slider-min-max',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    minLabel: '0%',
    maxLabel: '100%',
    'aria-label': 'Väärtus',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithInputGroup

```jsx
/* With Input Group */ compose(S, "WithInputGroup")
```

### MinAndMaxValues

```jsx
/* Min And Max Values */ compose(S, "MinAndMaxValues")
```

### WithCurrentValue

```jsx
/* With Current Value */ compose(S, "WithCurrentValue")
```

### CustomValue

```jsx
/* Custom Value */ compose(S, "CustomValue")
```

### States

```jsx
/* States */ compose(S, "States")
```

### WithoutTooltip

```jsx
/* Without Tooltip */ compose(S, "WithoutTooltip")
```

### WithHelper

```jsx
/* With Helper */ compose(S, "WithHelper")
```
