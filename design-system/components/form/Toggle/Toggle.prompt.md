Toggle from @tedi-design-system/react. Use via `window.Tedi.Toggle` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Toggle.html`): Default, Size, Type, Label Position, States, Primary, Primary Outlined, Colored, Colored Outlined, With Feedback Text.

## Props

```ts
interface ToggleProps {
  /** Unique identifier for the toggle input. Required for accessibility and to link the label with the input. */
  id: string;
  /** Label text or element displayed next to the toggle. This is shown to users and should clearly describe what the toggle does. */
  label: React.ReactNode;
  /** Visually hides the label while keeping it accessible to screen readers. Useful when the toggle's purpose is clear from context (e.g., in a settings row). */
  hideLabel?: boolean;
  /** Position of the label relative to the toggle switch. */
  labelPosition?: "left" | "right";
  /** Optional helper text displayed below the toggle. Can be used to provide additional context or validation messages. */
  helper?: FeedbackTextProps;
  /** Additional CSS class name(s) to apply to the toggle wrapper. Useful for custom styling or theming from parent components. */
  className?: string;
  /** Controlled state of the toggle. Use this together with `onChange` for full control over the checked state. */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage. Ignored if `checked` prop is provided. */
  defaultChecked?: boolean;
  /** Callback fired when the toggle state changes. */
  onChange?: (value: boolean) => void;
  /** Size of the toggle switch. */
  size?: "default" | "large";
  /** Color variant of the toggle. - `primary`: Standard toggle (usually blue/brand color) - `colored`: Alternative accent color (e.g. for special settings) */
  color?: "primary" | "colored";
  /** Visual style variant of the toggle. */
  type?: "filled" | "outlined";
  /** Shows a lock icon inside the toggle knob. Typically used with `size="large"` to indicate secure/private settings. */
  icon?: boolean;
  /** Disables the toggle, preventing user interaction. */
  disabled?: boolean;
  /** Shows a loading spinner inside the toggle instead of the icon or dot. Useful for async operations (e.g. saving settings). When `true`, `onChange` will not be triggered. */
  isLoading?: boolean;
  /** Tooltip content shown when hovering over the label. Useful for providing extra explanation without cluttering the UI. */
  tooltip?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    label: 'Toggle',
  },
};

// Size
export const Size: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: sizeArray,
  },
};

// Type
export const Type = () => {
  return (
    <Row>
      <Col width="auto">
        <Toggle id="toggle-1" defaultChecked label="Toggle button" />
      </Col>
      <Col width="auto">
        <Toggle id="toggle-2" defaultChecked label="Toggle button" tooltip="Tooltip content" />
      </Col>
      <Col width="auto">
        <Toggle id="toggle-3" defaultChecked label="Toggle button" size="large" />
      </Col>
      <Col width="auto">
        <Toggle id="toggle-4" defaultChecked label="Toggle button" size="large" icon />
      </Col>
    </Row>
  );
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Size

```jsx
/* Size */ compose(S, "Size")
```

### Type

```jsx
/* Type */ compose(S, "Type")
```

### LabelPosition

```jsx
/* Label Position */ compose(S, "LabelPosition")
```

### States

```jsx
/* States */ compose(S, "States")
```

### Primary

```jsx
/* Primary */ compose(S, "Primary")
```

### PrimaryOutlined

```jsx
/* Primary Outlined */ compose(S, "PrimaryOutlined")
```

### Colored

```jsx
/* Colored */ compose(S, "Colored")
```

### ColoredOutlined

```jsx
/* Colored Outlined */ compose(S, "ColoredOutlined")
```

### WithFeedbackText

```jsx
/* With Feedback Text */ compose(S, "WithFeedbackText")
```
