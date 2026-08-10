Dropdown from @tedi-design-system/react. Use via `window.Tedi.Dropdown` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Dropdown.Trigger`, `Dropdown.Content`, `Dropdown.Item`, `Dropdown.Separator`. See the DS docs for composition — e.g. items like `Dropdown.Item` go inside `<Dropdown>`; containers like `Dropdown.Group` wrap multiple `<Dropdown>`s.

Variants (see `Dropdown.html`): Default, With Active Item, With Action, With Icon, With Checkbox, With Indented Items, With Radio, Custom Width, With Description, Divided, With Separator And Opens Right, Custom Content, Tree.

## Props

```ts
interface DropdownProps {
  /** Child elements — must include exactly one `Dropdown.Trigger` and one `Dropdown.Content` */
  children: React.ReactNode;
  /** When `true`, the dropdown behaves like a modal: - Traps focus inside the dropdown - Shows a visually hidden "Close" button for screen readers - Usually used for menus that require explicit dismissal */
  modal?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default state */
  defaultOpen?: boolean;
  /** Change handler (fires for both modes) */
  onOpenChange?: (open: boolean) => void;
  /** Index of the item that should be focused when the dropdown opens. Pass the index of the "current selection" so the user can arrow-key or Enter/Space to reconfirm without first pressing an arrow. Omit (or pass `undefined`) to keep the default behaviour — no item is pre-focused and the user has to press an arrow key to start navigating. */
  defaultActiveIndex?: number;
  className?: string;
  /** When `true` there is a border between the dropdown items */
  divided?: boolean;
  /** Controls the width of the dropdown menu. - `'auto'` – width is determined by content (default) - `'trigger'` – matches the width of the trigger element - `'full'` – spans the full width of the containing block - `number` – fixed width in pixels - `string` – any valid CSS width value (e.g. `'16rem'`, `'100%'`) */
  width?: string | number;
  /** Controls where the dropdown is positioned relative to its trigger. Accepts any Floating UI placement value, such as: `'bottom-start'`, `'bottom-end'`, `'top-start'`, `'right-end'`, etc. */
  placement?: "top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start";
  /** Controls the visual and structural variant of the dropdown. - `'default'` – standard flat list of items - `'tree'` – hierarchical (tree-style) list with indented items and connector lines Tree visuals are only applied when this prop is set to `'tree'`. Ignored by default. */
  variant?: "default" | "tree";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<DropdownBreakpointProps>;
  md?: Partial<DropdownBreakpointProps>;
  lg?: Partial<DropdownBreakpointProps>;
  xl?: Partial<DropdownBreakpointProps>;
  xxl?: Partial<DropdownBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Dropdown.Item, {
      category: 'Dropdown.Item',
      prefix: 'item',
      exclude: ['children', 'onClick', 'index'],
    }),
  },
  args: {
    item__active: true,
  },
  render: (args: Record<string, unknown>) => (
    <Dropdown {...getPrimaryComponentProps<DropdownProps>(args)}>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          Create
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0} onClick={() => console.log('Lisa pöördumine')}>
          Access to health data
        </Dropdown.Item>
        <Dropdown.Item index={1} {...getSubcomponentProps(args, 'item')} onClick={() => console.log('Lisa toetus')}>
          Declaration of intent
        </Dropdown.Item>
        <Dropdown.Item index={2}>Contacts</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

// With Active Item
export const WithActiveItem: Story = {
  render: () => {
    const [lang, setLang] = React.useState('ENG');
    const [filter, setFilter] = React.useState('Newest first');

    return (
      <Row>
        <Col width={2}>
          <Dropdown>
            <Dropdown.Trigger>
              <Button visualType="link" iconRight="expand_more">
                {lang}
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              {['EST', 'ENG', 'RUS'].map((l, i) => (
                <Dropdown.Item key={l} index={i} active={lang === l} onClick={() => setLang(l)}>
                  {l}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </Col>
        <Col width={3}>
          <Dropdown width={200}>
            <Dropdown.Trigger>
              <Button visualType="link" iconRight="expand_more">
                Sort: {filter}
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              {['Newest first', 'Oldest first', 'Application name A–Z', 'Application name Z–A'].map((f, i) => (
                <Dropdown.Item key={f} index={i} active={filter === f} onClick={() => setFilter(f)}>
                  {f}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
// …

// With Action
export const WithAction: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" icon="add">
          Add
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0} onClick={() => console.log('Lisa pöördumine')}>
          Create contact
        </Dropdown.Item>
        <Dropdown.Item index={1} onClick={() => console.log('Lisa toetus')}>
          Create application
        </Dropdown.Item>
        <Dropdown.Item index={2}>Create invoice</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithActiveItem

```jsx
/* With Active Item */ compose(S, "WithActiveItem")
```

### WithAction

```jsx
/* With Action */ compose(S, "WithAction")
```

### WithIcon

```jsx
/* With Icon */ compose(S, "WithIcon")
```

### WithCheckbox

```jsx
/* With Checkbox */ compose(S, "WithCheckbox")
```

### WithIndentedItems

```jsx
/* With Indented Items */ compose(S, "WithIndentedItems")
```

### WithRadio

```jsx
/* With Radio */ compose(S, "WithRadio")
```

### CustomWidth

```jsx
/* Custom Width */ compose(S, "CustomWidth")
```

### WithDescription

```jsx
/* With Description */ compose(S, "WithDescription")
```

### Divided

```jsx
/* Divided */ compose(S, "Divided")
```

### WithSeparatorAndOpensRight

```jsx
/* With Separator And Opens Right */ compose(S, "WithSeparatorAndOpensRight")
```

### CustomContent

```jsx
/* Custom Content */ compose(S, "CustomContent")
```

### Tree

```jsx
/* Tree */ compose(S, "Tree")
```

## Related

`Dropdown.Trigger`, `Dropdown.Content`, `Dropdown.Item`, `Dropdown.Separator`
