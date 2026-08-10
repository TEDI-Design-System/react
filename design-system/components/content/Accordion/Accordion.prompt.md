Accordion from @tedi-design-system/react. Use via `window.Tedi.Accordion` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Accordion.Item`. See the DS docs for composition — e.g. items like `Accordion.Item` go inside `<Accordion>`; containers like `Accordion.Group` wrap multiple `<Accordion>`s.

Variants (see `Accordion.html`): Default, Variants, Action Types, With Icon Card, Customized, Accordion Behavior, Disabled, Hash Deep Linking, Semantic Headings.

## Props

```ts
interface AccordionProps {
  /** Accordion content. Should be one or more `AccordionItem` components. */
  children?: React.ReactNode;
  /** Additional class. */
  className?: string;
  /** Whether the accordion allows multiple items to be expanded at the same time. If false, opening one item will collapse the others automatically. */
  allowMultiple?: boolean;
  /** Group-level default for items' initial expanded state. Sets the initial `defaultExpanded` for every child `Accordion.Item` that doesn't specify its own. Per-item `defaultExpanded` (including an explicit `false`) takes precedence. Typically combined with `allowMultiple` to start with all items open. */
  defaultExpanded?: boolean;
  /** Vertical gap between sibling `Accordion.Item` components in rem Accepts any number, not limited to a fixed scale. Forwarded as the `--tedi-accordion-item-gap` CSS variable, so consumers can also override it from any ancestor class — or set a px value there directly when an exact-pixel override is needed. When omitted, falls back to the design-token default (`var(--layout-grid-gutters-08)` = 0.5rem). */
  itemGap?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<AccordionBreakpointProps>;
  md?: Partial<AccordionBreakpointProps>;
  lg?: Partial<AccordionBreakpointProps>;
  xl?: Partial<AccordionBreakpointProps>;
  xxl?: Partial<AccordionBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: {
    ...subcomponentArgTypes(Accordion.Item, {
      category: 'Accordion.Item',
      prefix: 'item',
      // ReactNode slots + deep-link/internal props don't make good knobs; onToggle is wired as an action below.
      exclude: ['children', 'id', 'openOnHashMatch', 'iconCard', 'onToggle'],
    }),
    item__onToggle: {
      action: 'onToggle',
      name: 'onToggle',
      description: 'Called whenever the user toggles the item. Receives the next expanded state.',
      table: { category: 'Accordion.Item' },
    },
    ...subcomponentArgTypes(Accordion.Item.Header, {
      category: 'Accordion.Item.Header',
      prefix: 'header',
      exclude: [
        'children',
        'title',
        'beforeTitle',
        'afterTitle',
        'startAction',
        'endAction',
        'startDescription',
        'endDescription',
      ],
    }),
    ...subcomponentArgTypes(Accordion.Item.Content, {
      category: 'Accordion.Item.Content',
      prefix: 'content',
      exclude: ['children'],
    }),
  },
  args: {
    // Accordion (primary)
    allowMultiple: false,
    defaultExpanded: false,
    // Accordion.Item
// …

// Variants
export const Variants: StoryObj = {
  render: () => {
    const [selectedA, setSelectedA] = React.useState(false);
    const [selectedB, setSelectedB] = React.useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-16)' }}>
        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header title="Pealkiri" />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Pealkiri"
              afterTitle={<StatusBadge color="success">Kinnitatud</StatusBadge>}
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Pealkiri"
              beforeTitle={<Icon name="description" color="secondary" size={18} />}
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Pealkiri"
              beforeTitle={<Icon name="account_circle" color="brand" background="brand-secondary" size={16} />}
            />
// …

// Action Types
export const ActionTypes: StoryObj = {
  render: () => {
    const [selectedA, setSelectedA] = React.useState(false);
    const [selectedB, setSelectedB] = React.useState(false);
    const [selectedC, setSelectedC] = React.useState(true);
    const [selectedD, setSelectedD] = React.useState(true);

    const rowStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--layout-grid-gutters-08)',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-16)' }}>
        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header title="Pealkiri" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item defaultExpanded>
              <Accordion.Item.Header title="Pealkiri" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Pealkiri"
                closeText="Pealkiri"
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
// …
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Variants

```jsx
/* Variants */ compose(S, "Variants")
```

### ActionTypes

```jsx
/* Action Types */ compose(S, "ActionTypes")
```

### WithIconCard

```jsx
/* With Icon Card */ compose(S, "WithIconCard")
```

### Customized

```jsx
/* Customized */ compose(S, "Customized")
```

### AccordionBehavior

```jsx
/* Accordion Behavior */ compose(S, "AccordionBehavior")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### HashDeepLinking

```jsx
/* Hash Deep Linking */ compose(S, "HashDeepLinking")
```

### SemanticHeadings

```jsx
/* Semantic Headings */ compose(S, "SemanticHeadings")
```

## Related

`Accordion.Item`
