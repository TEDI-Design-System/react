ProgressBar from @tedi-design-system/react. Use via `window.Tedi.ProgressBar` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ProgressBar.html`): Default, Sizes, Position, With Label, Regular, With Hint, With Error, Value Hidden, Responsive, Animated.

## Props

```ts
interface ProgressBarProps {
  /** Id forwarded to the bar element so external `<label htmlFor>` can target it. */
  id?: string;
  /** Progress value, clamped to `0..100`. `NaN` is treated as `0`. */
  value?: number;
  /** Label rendered above or inline with the bar. */
  label?: string;
  /** Renders a required indicator on the label. Ignored without `label`. */
  required?: boolean;
  /** Accessible name. Falls back to `label`. */
  ariaLabel?: string;
  /** Use the 4px bar height instead of the 8px default. */
  small?: boolean;
  /** Label placement. Ignored without `label`. */
  labelPosition?: "horizontal" | "top";
  /** Show the percentage value. */
  showValue?: boolean;
  /** Where the percentage sits relative to the bar / hint row. */
  valuePosition?: "horizontal" | "bottom";
  /** Override the rendered value text (e.g. `"1 / 5"`) without affecting the fill. */
  valueLabel?: string;
  /** Hint or error text rendered below the bar via `FeedbackText`. */
  helper?: FeedbackTextProps;
  /** Class on the root wrapper. */
  className?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ProgressBarBreakpointProps>;
  md?: Partial<ProgressBarBreakpointProps>;
  lg?: Partial<ProgressBarBreakpointProps>;
  xl?: Partial<ProgressBarBreakpointProps>;
  xxl?: Partial<ProgressBarBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: { value: 60, ariaLabel: 'Edenemisriba pealkiri' },
};

const sizeRows: MatrixRow[] = [
  { lines: ['Default'], props: { value: 20, ariaLabel: 'Edenemisriba pealkiri', helper: HINT } },
  { lines: ['Small'], props: { value: 20, small: true, ariaLabel: 'Edenemisriba pealkiri', helper: HINT } },
];

// Sizes
export const Sizes: Story = {
  render: () => <MatrixTable rows={sizeRows} />,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={20} ariaLabel="Edenemisriba pealkiri" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} small ariaLabel="Edenemisriba pealkiri" helper={{ text: 'Üleslaadimine', type: 'hint' }} />`,
      },
    },
  },
};

const positionRows: MatrixRow[] = [
  {
    lines: ['Top title', 'Horizontal value', 'Bottom hint'],
    props: {
      value: 20,
      label: 'Edenemisriba pealkiri',
      required: true,
      labelPosition: 'top',
      valuePosition: 'horizontal',
      helper: HINT,
    },
  },
  {
    lines: ['Top title', 'Bottom value', 'Bottom hint'],
    props: {
      value: 20,
      label: 'Edenemisriba pealkiri',
      required: true,
      labelPosition: 'top',
      valuePosition: 'bottom',
      helper: HINT,
    },
  },
  {
    lines: ['Horizontal title', 'Horizontal value', 'Bottom hint'],
    props: {
      value: 20,
      label: 'Edenemisriba pealkiri',
// …

// Position
export const Position: Story = {
  render: () => <MatrixTable rows={positionRows} />,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="horizontal" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="horizontal" helper={{ text: 'Üleslaadimine', type: 'hint' }} md={{ labelPosition: 'horizontal' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} md={{ labelPosition: 'horizontal' }} />`,
      },
    },
  },
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

### Position

```jsx
/* Position */ compose(S, "Position")
```

### WithLabel

```jsx
/* With Label */ compose(S, "WithLabel")
```

### Regular

```jsx
/* Regular */ compose(S, "Regular")
```

### WithHint

```jsx
/* With Hint */ compose(S, "WithHint")
```

### WithError

```jsx
/* With Error */ compose(S, "WithError")
```

### ValueHidden

```jsx
/* Value Hidden */ compose(S, "ValueHidden")
```

### Responsive

```jsx
/* Responsive */ compose(S, "Responsive")
```

### Animated

```jsx
/* Animated */ compose(S, "Animated")
```
