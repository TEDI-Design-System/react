CollapseButton from @tedi-design-system/react. Use via `window.Tedi.CollapseButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `CollapseButton.html`): Default, States, Icon Only, Secondary Button, With Text Inverted, Icon Only Inverted.

## Props

```ts
interface CollapseButtonProps {
  /** Current open state. Bind alongside `onOpenChange` to keep in sync. */
  open: boolean;
  /** Called when the user toggles the button. Receives the next open state. Standard native `onClick` still fires too; if it calls `preventDefault` the toggle is suppressed. */
  onOpenChange?: (next: boolean) => void;
  /** Label shown when collapsed. Rendered literally — translate at the call site if needed. When omitted, falls back to the `LabelProvider`'s translated `'open'` label. */
  openText?: string;
  /** Label shown when expanded. Rendered literally — translate at the call site if needed. When omitted, falls back to the `LabelProvider`'s translated `'close'` label. */
  closeText?: string;
  /** Hide the label and render the chevron only. */
  hideText?: boolean;
  /** Chevron style. Only takes effect with `hideText` (icon-only mode). */
  arrowType?: "secondary" | "default";
  /** Visual size. */
  size?: "default" | "small";
  /** Light text and icon for placement on a dark / brand background. Ignored when `arrowType` is `secondary` (no inverted form in the design). */
  inverted?: boolean;
  /** Underline the text label. Set `false` in contexts where the chevron is the sole affordance (e.g. inside an accordion header). Has no effect in icon-only mode. */
  underline?: boolean;
  /** Accessible label. Required when `hideText` is `true`. */
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}
```

## Examples

```jsx
// Default
export const Default: StoryObj<typeof CollapseButton> = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<CollapseButtonProps>();
    return <CollapseButton {...args} onOpenChange={(open) => updateArgs({ open })} />;
  },
};

const pseudoStates = ['Default', 'Hover', 'Active', 'Focus'] as const;

const PSEUDO_PARAMS = {
  pseudo: {
    hover: '#Hover',
    active: '#Active',
    focusVisible: '#Focus',
  },
};

type StatesArgs = Pick<
  CollapseButtonProps,
  'openText' | 'closeText' | 'hideText' | 'arrowType' | 'inverted' | 'underline'
> & {
  'aria-label'?: string;
  titleColor?: TextProps['color'];
  hideSizes?: boolean;
};

const StatesTemplate: StoryFn<StatesArgs> = (args) => {
  const { titleColor = 'primary', hideSizes = false, ...collapseProps } = args;

  const renderRow = (state: (typeof pseudoStates)[number], size?: 'small') => (
    <Row key={`${state}-${size ?? 'default'}`} cols={5} alignItems="center" gap={2}>
      <Col>
        <Text color={titleColor}>{state}</Text>
      </Col>
      <Col width={4} className="flex align-items-center gap-3">
        <CollapseButton {...collapseProps} id={state} size={size ?? 'default'} open={false} />
        <CollapseButton {...collapseProps} id={state} size={size ?? 'default'} open />
      </Col>
    </Row>
  );
// …

// States
export const States: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  parameters: PSEUDO_PARAMS,
};

// Icon Only
export const IconOnly: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  args: {
    hideText: true,
    'aria-label': 'Näita detaile',
  },
  parameters: PSEUDO_PARAMS,
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

### IconOnly

```jsx
/* Icon Only */ compose(S, "IconOnly")
```

### SecondaryButton

```jsx
/* Secondary Button */ compose(S, "SecondaryButton")
```

### WithTextInverted

```jsx
/* With Text Inverted */ compose(S, "WithTextInverted")
```

### IconOnlyInverted

```jsx
/* Icon Only Inverted */ compose(S, "IconOnlyInverted")
```
