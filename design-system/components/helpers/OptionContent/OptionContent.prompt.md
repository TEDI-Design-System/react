OptionContent from @tedi-design-system/react. Use via `window.Tedi.OptionContent` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `OptionContent.Label`, `OptionContent.Meta`. See the DS docs for composition — e.g. items like `OptionContent.Item` go inside `<OptionContent>`; containers like `OptionContent.Group` wrap multiple `<OptionContent>`s.

Variants (see `OptionContent.html`): Default, Items, With Checkbox, With Radio, With Icon, With Description, With Tree, States, Inside select (renderOption), Inside a dropdown, Inside search (in a dropdown), Inside a popover.

## Props

```ts
interface OptionContentProps {
  /** Content of the value row — typically `OptionContent.Label` and optionally `OptionContent.Meta`, but any node is allowed. */
  children?: React.ReactNode;
  /** Selection-indicator type: - `default` — no indicator - `checkbox` — checkbox indicator (multi-select) - `radio` — radio indicator (single-select listbox) */
  type?: "default" | "radio" | "checkbox";
  /** Arrange the label and meta side-by-side (`horizontal`) or stacked (`vertical`, e.g. a title with a description below). */
  layout?: "horizontal" | "vertical";
  /** Whether the indicator renders as selected (checked). */
  selected?: boolean;
  /** Whether the checkbox indicator renders as indeterminate. Ignored for other types. */
  indeterminate?: boolean;
  /** Whether the row renders as disabled (dims the indicator and text). */
  disabled?: boolean;
  /** Leading icon, rendered before the content. Accepts an icon name or full `IconProps`. */
  icon?: string | IconSharedProps & IconWithBackgroundProps | IconSharedProps & IconWithoutBackgroundProps;
  /** How the selection indicator is exposed to assistive tech: - `presentation` (default) — the indicator is `aria-hidden`; the interactive parent owns selection (menu pattern: `aria-checked` on the `DropdownItem`). - `control` — the indicator itself carries `role="checkbox"`/`"radio"`, `aria-checked` and is named via `aria-labelledby` from `OptionContent.Label` (listbox pattern, e.g. inside a `Select` option). Requires a `Label` child. */
  indicatorSemantics?: "presentation" | "control";
  /** Additional class name. */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    type: 'default',
    layout: 'horizontal',
    selected: false,
    disabled: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <OptionContent {...args}>
        <OptionContent.Label>Option 1</OptionContent.Label>
      </OptionContent>
    </div>
  ),
};

/**
 * Plain items, and a nested set indented by level.
 */

// Items
export const Items: Story = {
  render: () => (
    <Row>
      <Menu>
        {['Access to health data', 'Declaration of intent', 'Contacts'].map((text, i) => (
          <DropdownItem key={text} index={i} onClick={noop}>
            <OptionContent>
              <OptionContent.Label>{text}</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>

      <Menu>
        {[
          { text: '1st level' },
          { text: '2nd level', indent: 1 },
          { text: '3rd level', indent: 2 },
          { text: '3rd level', indent: 2 },
          { text: '4th level', indent: 3 },
        ].map((level, i) => (
          <DropdownItem key={i} index={i} indent={level.indent} onClick={noop}>
            <OptionContent>
              <OptionContent.Label>{level.text}</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>
    </Row>
  ),
};

/**
 * Multi-select checkboxes — hierarchical (parent + indented children) and flat.
 */

// With Checkbox
export const WithCheckbox: Story = {
  render: function WithCheckboxExample() {
    const [checked, setChecked] = useState<string[]>(['Tartu', 'Locations']);
    const toggle = (key: string) =>
      setChecked((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));

    const item = (text: string, indent?: number, indeterminate?: boolean) => (
      <DropdownItem
        role="menuitemcheckbox"
        aria-checked={checked.includes(text)}
        closeOnSelect={false}
        indent={indent}
        onClick={() => toggle(text)}
      >
        <OptionContent type="checkbox" selected={checked.includes(text)} indeterminate={indeterminate}>
          <OptionContent.Label>{text}</OptionContent.Label>
        </OptionContent>
      </DropdownItem>
    );

    return (
      <Row>
        <Menu>
          {item('Locations', undefined, !checked.includes('Tallinn'))}
          {item('Tallinn', 1)}
          {item('Tartu', 1)}
          {item('Doctors')}
          {item('Mari Allikas', 1)}
          {item('Tõnu Liblikas', 1)}
        </Menu>

        <Menu>
          {item('Hospitals')}
          {item('Pharmacies')}
          {item('Laboratories')}
        </Menu>
      </Row>
    );
  },
};
// …
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Items

```jsx
/* Items */ compose(S, "Items")
```

### WithCheckbox

```jsx
/* With Checkbox */ compose(S, "WithCheckbox")
```

### WithRadio

```jsx
/* With Radio */ compose(S, "WithRadio")
```

### WithIcon

```jsx
/* With Icon */ compose(S, "WithIcon")
```

### WithDescription

```jsx
/* With Description */ compose(S, "WithDescription")
```

### WithTree

```jsx
/* With Tree */ compose(S, "WithTree")
```

### States

```jsx
/* States */ compose(S, "States")
```

### InsideSelect

```jsx
/* Inside select (renderOption) */ compose(S, "InsideSelect")
```

### InsideDropdown

```jsx
/* Inside a dropdown */ compose(S, "InsideDropdown")
```

### InsideSearch

```jsx
/* Inside search (in a dropdown) */ compose(S, "InsideSearch")
```

### InsidePopover

```jsx
/* Inside a popover */ compose(S, "InsidePopover")
```

## Related

`OptionContent.Label`, `OptionContent.Meta`
