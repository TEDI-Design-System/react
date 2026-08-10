HorizontalStepper from @tedi-design-system/react. Use via `window.Tedi.HorizontalStepper` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `HorizontalStepper.Item`. See the DS docs for composition — e.g. items like `HorizontalStepper.Item` go inside `<HorizontalStepper>`; containers like `HorizontalStepper.Group` wrap multiple `<HorizontalStepper>`s.

Variants (see `HorizontalStepper.html`): Default, Second Step, Third Step, With Errors, With Descriptions, Transparent Background, Compact, Click To Navigate, External Navigation, States, Compact States.

## Props

```ts
interface HorizontalStepperProps {
  /** `HorizontalStepper.Item` elements, one per step. */
  children: React.ReactNode;
  /** Accessible name for the navigation landmark. */
  "aria-label"?: string;
  /** Background style of the stepper track. */
  background?: "default" | "transparent";
  /** Collapse labels so only the indicators plus the selected step's label are visible. `true` collapses at every width; a breakpoint (`'sm'`, `'md'`, `'lg'`, `'xl'`, `'xxl'`) collapses only below that breakpoint. */
  compact?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Additional class name on the root element. */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(HorizontalStepper.Item, {
      category: 'HorizontalStepper.Item',
      prefix: 'item',
      exclude: ['label', 'onSelect'],
    }),
  },
  args: {
    'aria-label': 'Form progress',
    background: 'default',
    compact: 'sm',
    item__selected: true,
  },
  render: (args: Record<string, unknown>) => (
    <HorizontalStepper {...getPrimaryComponentProps<HorizontalStepperProps>(args)}>
      <HorizontalStepper.Item {...getSubcomponentProps(args, 'item')} label="Kutse" />
      <HorizontalStepper.Item label="Tahteavaldus" />
      <HorizontalStepper.Item label="Geenianalüüs" />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  ),
};

const STATE_ROWS = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'active', label: 'Active' },
  { key: 'focus', label: 'Focus' },
] as const;

const TYPE_COLS: { key: string; label: string; props: Partial<HorizontalStepperItemProps>; rows: string[] }[] = [
  { key: 'completed', label: 'Completed', props: { completed: true }, rows: ['default', 'hover', 'active', 'focus'] },
  { key: 'error', label: 'Has error', props: { error: true }, rows: ['default', 'hover', 'active', 'focus'] },
  { key: 'default', label: 'Default', props: {}, rows: ['default', 'hover', 'active'] },
  { key: 'selected', label: 'Selected', props: { selected: true }, rows: ['default'] },
];

const StatesMatrix = ({ compact }: { compact: boolean }) => {
  const breakpoint = useBreakpoint();
// …

// Second Step
export const SecondStep: Story = {
  render: () => (
    <HorizontalStepper aria-label="Form progress" compact="lg">
      <HorizontalStepper.Item label="Kutse" completed />
      <HorizontalStepper.Item label="Tahteavaldus" selected />
      <HorizontalStepper.Item label="Geenianalüüs" />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  ),
};

// Third Step
export const ThirdStep: Story = {
  render: () => (
    <HorizontalStepper aria-label="Form progress" compact="lg">
      <HorizontalStepper.Item label="Kutse" completed />
      <HorizontalStepper.Item label="Tahteavaldus" completed />
      <HorizontalStepper.Item label="Geenianalüüs" selected />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  ),
};

/**
 * `error` takes precedence over `completed` — the indicator shows a warning glyph
 * and the step switches to the danger colours. Pair it with `description` to
 * explain what went wrong.
 */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### SecondStep

```jsx
/* Second Step */ compose(S, "SecondStep")
```

### ThirdStep

```jsx
/* Third Step */ compose(S, "ThirdStep")
```

### WithErrors

```jsx
/* With Errors */ compose(S, "WithErrors")
```

### WithDescriptions

```jsx
/* With Descriptions */ compose(S, "WithDescriptions")
```

### TransparentBackground

```jsx
/* Transparent Background */ compose(S, "TransparentBackground")
```

### Compact

```jsx
/* Compact */ compose(S, "Compact")
```

### ClickToNavigate

```jsx
/* Click To Navigate */ compose(S, "ClickToNavigate")
```

### ExternalNavigation

```jsx
/* External Navigation */ compose(S, "ExternalNavigation")
```

### States

```jsx
/* States */ compose(S, "States")
```

### CompactStates

```jsx
/* Compact States */ compose(S, "CompactStates")
```

## Related

`HorizontalStepper.Item`
