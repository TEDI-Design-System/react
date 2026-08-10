Tabs from @tedi-design-system/react. Use via `window.Tedi.Tabs` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`. See the DS docs for composition — e.g. items like `Tabs.Item` go inside `<Tabs>`; containers like `Tabs.Group` wrap multiple `<Tabs>`s.

Variants (see `Tabs.html`): Default, With Icons, With Status Badge, States, Controlled, With Disabled Tab, Overflow Behavior, With Sub Tabs.

## Props

```ts
interface TabsProps {
  /** Tabs content — should include Tabs.List and Tabs.Content elements */
  children: React.ReactNode;
  /** Controlled active tab id. Use together with onChange. */
  value?: string;
  /** Default active tab id for uncontrolled usage. */
  defaultValue?: string;
  /** Callback fired when the active tab changes */
  onChange?: (tabId: string) => void;
  /** Additional class name(s) */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tervise sakid">
        <Tabs.Trigger id="tab-1">Terviseteekond</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Haiguste kulg</Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Ravimite ajalugu</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.healthTimeline}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.diseaseCourse}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.medication}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Ikoonidega sakid">
        <Tabs.Trigger id="tab-1" icon="table_chart">
          Tabel
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2" icon="grid_on">
          Ruudustik
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.table}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.grid}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

// With Status Badge
export const WithStatusBadge: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Olekumärgisega sakid">
        <Tabs.Trigger id="tab-1">
          <Ellipsis lineClamp={1} popover={true}>
            Terviseteekond
          </Ellipsis>{' '}
          <StatusBadge color="brand">Esitatud</StatusBadge>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2">
          <span style={{ position: 'relative' }}>
            Lugemata teated&nbsp;
            <StatusIndicator type="danger" position="top-right" />
          </span>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Ravimite ajalugu</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.healthTimeline}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.unreadMessages}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.medication}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithIcons

```jsx
/* With Icons */ compose(S, "WithIcons")
```

### WithStatusBadge

```jsx
/* With Status Badge */ compose(S, "WithStatusBadge")
```

### States

```jsx
/* States */ compose(S, "States")
```

### Controlled

```jsx
/* Controlled */ compose(S, "Controlled")
```

### WithDisabledTab

```jsx
/* With Disabled Tab */ compose(S, "WithDisabledTab")
```

### OverflowBehavior

```jsx
/* Overflow Behavior */ compose(S, "OverflowBehavior")
```

### WithSubTabs

```jsx
/* With Sub Tabs */ compose(S, "WithSubTabs")
```

## Related

`Tabs.List`, `Tabs.Trigger`, `Tabs.Content`
