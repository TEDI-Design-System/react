CardButton from @tedi-design-system/react. Use via `window.Tedi.CardButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `CardButton.html`): Default, Card Rows, Card Shortcut, With Icon Card, States, As Link, Complex Card.

## Props

```ts
interface CardButtonProps {
  /** A single `<Card>` to render as the interactive surface. The host element provides the interaction semantics and applies the hover / active / focus / disabled states to the card and its blocks. Keep it to one card and avoid nested interactive elements. */
  children?: React.ReactNode;
  /** Additional class name on the host element. */
  className?: string;
  /** Render as custom component */
  as?: C;
  ref?: PolymorphicRef<C>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: () => (
    <CardButton>
      <ShortcutCard title="Töövõime" description="Näiteks töövõimetuslehed, töövõime hindamine" />
    </CardButton>
  ),
};

// Card Rows
export const CardRows: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <CardButton>
        <BookingCard
          lead={
            <Text element="span" modifiers="bold">
              8:30
            </Text>
          }
          title="Kardioloog"
          description="Valdkond"
          book
        />
      </CardButton>
      <CardButton>
        <BookingCard
          lead={
            <Text element="span" modifiers="bold">
              8:30
            </Text>
          }
          title="Kardioloog"
          book
        />
      </CardButton>
      <CardButton>
        <BookingCard
          lead={<Icon name="monitor_heart" color="secondary" />}
          title="Kardioloog"
          description="Valdkond"
          book
        />
      </CardButton>
      <CardButton>
        <BookingCard title="Kardioloog" description="Valdkond" book />
      </CardButton>
      <CardButton>
        <IconCard icon="monitor_heart" title="Kardioloog" description="Valdkond" />
      </CardButton>
// …

// Card Shortcut
export const CardShortcut: Story = {
  render: () => (
    <Row cols={1} md={{ cols: 2 }} gutter={3}>
      <Col>
        <CardButton>
          <ShortcutCard title="Töövõime" description="Näiteks töövõimetuslehed, töövõime hindamine" />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <ShortcutCard
            title="Esindusõigus Terviseportaalis"
            description="Võimaldab jagada ligipääsu sinu terviseandmetele"
          />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <ShortcutCard title="Mootorsõiduki juhiloa tõend" description="Kehtib kuni 28.05.2024" />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <ShortcutCard title="Minu hammaste tervis" description="Ülevaade sinu vastuvõttudest" />
        </CardButton>
      </Col>
    </Row>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### CardRows

```jsx
/* Card Rows */ compose(S, "CardRows")
```

### CardShortcut

```jsx
/* Card Shortcut */ compose(S, "CardShortcut")
```

### WithIconCard

```jsx
/* With Icon Card */ compose(S, "WithIconCard")
```

### States

```jsx
/* States */ compose(S, "States")
```

### AsLink

```jsx
/* As Link */ compose(S, "AsLink")
```

### ComplexCard

```jsx
/* Complex Card */ compose(S, "ComplexCard")
```
