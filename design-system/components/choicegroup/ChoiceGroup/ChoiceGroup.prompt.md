ChoiceGroup from @tedi-design-system/react. Use via `window.Tedi.ChoiceGroup` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `ChoiceGroup.Item`. See the DS docs for composition — e.g. items like `ChoiceGroup.Item` go inside `<ChoiceGroup>`; containers like `ChoiceGroup.Group` wrap multiple `<ChoiceGroup>`s.

Variants (see `ChoiceGroup.html`): Radio, Radio Row, Checkbox, Checkbox Row, Radio Card Segmented, Radio Card Separated, Checkbox Card, Radio Card With Icon, Checkbox Card With Icon, With Error, With Default Value, With Indeterminate, With Extra Content, Responsive, Custom Label, Custom Item Labels, Custom Item HTML Labels.

## Props

```ts
interface ChoiceGroupProps {
  id: string;
  items: ExtendedChoiceGroupItemProps[];
  name: string;
  label: React.ReactNode;
  inputType?: "radio" | "checkbox";
  helper?: FeedbackTextProps;
  className?: string;
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: ChoiceGroupValue) => void;
  variant?: "default" | "card";
  color?: "primary" | "secondary";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  layout?: "segmented" | "separated";
  rowProps?: RowProps;
  showIndicator?: boolean;
  indeterminateCheck?: string | boolean | ((state: ChoiceGroupIndeterminateState) => string);
  indeterminateCheckProps?: { indented?: boolean; } & Partial<Omit<CheckboxProps, "label" | "defaultChecked" | "onChange" | "checked" | "indeterminate">>;
  /** Specifies the size of the label text. Options include 'small' for a smaller label size or 'default' for the standard size. */
  size?: "default" | "small";
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ChoiceGroupAllProps>;
  md?: Partial<ChoiceGroupAllProps>;
  lg?: Partial<ChoiceGroupAllProps>;
  xl?: Partial<ChoiceGroupAllProps>;
  xxl?: Partial<ChoiceGroupAllProps>;
}
```

## Examples

```jsx
// Radio
export const Radio: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(ChoiceGroup.Item, {
      category: 'ChoiceGroup.Item',
      prefix: 'item',
      include: ['variant', 'color', 'layout', 'showIndicator', 'disabled', 'justifyContent', 'direction'],
    }),
  },
  args: {
    label: 'ChoiceGroup with radios:',
    id: 'example-1',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-1',
    item__variant: 'card',
    item__showIndicator: true,
    item__layout: 'separated',
  },
  render: (args: Record<string, unknown>) => {
    const itemProps = getSubcomponentProps<Partial<ExtendedChoiceGroupItemProps>>(args, 'item');
    return (
      <ChoiceGroup
        {...getPrimaryComponentProps<ChoiceGroupProps>(args)}
        items={generateItems({ index: 0 }).map((item) => ({ ...item, ...itemProps }))}
      />
    );
  },
};

// Radio Row
export const RadioRow: Story = {
  args: {
    label: 'ChoiceGroup with radios:',
    id: 'example-1.2',
    defaultValue: [],
    inputType: 'radio',
    name: 'radio-1.2',
    direction: 'row',
    items: generateItems({ index: 1 }),
  },
};

// Checkbox
export const Checkbox: Story = {
  args: {
    label: 'ChoiceGroup with checkboxes:',
    id: 'example-2',
    defaultValue: [],
    inputType: 'checkbox',
    name: 'check-2',
    items: generateItems({ index: 2 }),
  },
};
```

### Radio

```jsx
/* Radio */ compose(S, "Radio")
```

### RadioRow

```jsx
/* Radio Row */ compose(S, "RadioRow")
```

### Checkbox

```jsx
/* Checkbox */ compose(S, "Checkbox")
```

### CheckboxRow

```jsx
/* Checkbox Row */ compose(S, "CheckboxRow")
```

### RadioCardSegmented

```jsx
/* Radio Card Segmented */ compose(S, "RadioCardSegmented")
```

### RadioCardSeparated

```jsx
/* Radio Card Separated */ compose(S, "RadioCardSeparated")
```

### CheckboxCard

```jsx
/* Checkbox Card */ compose(S, "CheckboxCard")
```

### RadioCardWithIcon

```jsx
/* Radio Card With Icon */ compose(S, "RadioCardWithIcon")
```

### CheckboxCardWithIcon

```jsx
/* Checkbox Card With Icon */ compose(S, "CheckboxCardWithIcon")
```

### WithError

```jsx
/* With Error */ compose(S, "WithError")
```

### WithDefaultValue

```jsx
/* With Default Value */ compose(S, "WithDefaultValue")
```

### WithIndeterminate

```jsx
/* With Indeterminate */ compose(S, "WithIndeterminate")
```

### WithExtraContent

```jsx
/* With Extra Content */ compose(S, "WithExtraContent")
```

### Responsive

```jsx
/* Responsive */ compose(S, "Responsive")
```

### CustomLabel

```jsx
/* Custom Label */ compose(S, "CustomLabel")
```

### CustomItemLabels

```jsx
/* Custom Item Labels */ compose(S, "CustomItemLabels")
```

### CustomItemHTMLLabels

```jsx
/* Custom Item HTML Labels */ compose(S, "CustomItemHTMLLabels")
```

## Related

`ChoiceGroup.Item`
