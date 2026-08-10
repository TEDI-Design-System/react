Card from @tedi-design-system/react. Use via `window.Tedi.Card` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Card.Content`, `Card.Header`, `Card.Notification`. See the DS docs for composition — e.g. items like `Card.Item` go inside `<Card>`; containers like `Card.Group` wrap multiple `<Card>`s.

Variants (see `Card.html`): Default, Header Types, Default Card, Card Info, Alternative Cards, Spacing, Backgrounds, Multiple Content, Split Card Body, Borderless, Border Radius, Breakpoint Props, Equal Height, With Notification, Timeline Card, Two Toned Card.

## Props

```ts
interface CardProps {
  children?: React.ReactNode;
  /** Additional class. */
  className?: string;
  /** Controls card border radius. Accepts `false` to remove all radius or an object to control sides or individual corners. Side values affect two corners while corner values take precedence. Examples: `false` → no radius `{ top:false }` → removes top corners `{ left:false }` → removes left corners `{ topLeft:false }` → removes one corner `{ bottom:false, bottomRight:true }` → corner override */
  borderRadius?: false | { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean; topLeft?: boolean; topRight?: boolean; bottomRight?: boolean; bottomLeft?: boolean; };
  /** Removes the card's border entirely. */
  borderless?: boolean;
  /** Adds a colored accent border to the top or left of the card (e.g. `top-success-primary`, `left-danger-primary`). */
  border?: unknown;
  /** Card content padding Values can be:<br /> - predefined number value in rems<br /> - object of separated horizontal and vertical number values in rems - object of separated top, right, bottom, left number values in rems */
  padding?: unknown;
  /** Background color. */
  background?: unknown;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<CardBreakpointProps>;
  md?: Partial<CardBreakpointProps>;
  lg?: Partial<CardBreakpointProps>;
  xl?: Partial<CardBreakpointProps>;
  xxl?: Partial<CardBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Card.Header, { category: 'Card.Header', prefix: 'header', exclude: ['children'] }),
    ...subcomponentArgTypes(Card.Content, { category: 'Card.Content', prefix: 'content', exclude: ['children'] }),
  },
  render: (args: Record<string, unknown>) => (
    <Card {...getPrimaryComponentProps<CardProps>(args)}>
      <Card.Header {...getSubcomponentProps(args, 'header')}>
        <Heading element="h3">Kaardi pealkiri</Heading>
      </Card.Header>
      <Card.Content {...getSubcomponentProps(args, 'content')}>Kirjeldus</Card.Content>
    </Card>
  ),
};

// Header Types
export const HeaderTypes: Story = {
  render: HeaderTypesTemplate,
};

// Default Card
export const DefaultCard: Story = {
  render: DefaultCardTemplates,
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### HeaderTypes

```jsx
/* Header Types */ compose(S, "HeaderTypes")
```

### DefaultCard

```jsx
/* Default Card */ compose(S, "DefaultCard")
```

### CardInfo

```jsx
/* Card Info */ compose(S, "CardInfo")
```

### AlternativeCards

```jsx
/* Alternative Cards */ compose(S, "AlternativeCards")
```

### Spacing

```jsx
/* Spacing */ compose(S, "Spacing")
```

### Backgrounds

```jsx
/* Backgrounds */ compose(S, "Backgrounds")
```

### MultipleContent

```jsx
/* Multiple Content */ compose(S, "MultipleContent")
```

### SplitCardBody

```jsx
/* Split Card Body */ compose(S, "SplitCardBody")
```

### Borderless

```jsx
/* Borderless */ compose(S, "Borderless")
```

### BorderRadius

```jsx
/* Border Radius */ compose(S, "BorderRadius")
```

### BreakpointProps

```jsx
/* Breakpoint Props */ compose(S, "BreakpointProps")
```

### EqualHeight

```jsx
/* Equal Height */ compose(S, "EqualHeight")
```

### WithNotification

```jsx
/* With Notification */ compose(S, "WithNotification")
```

### TimelineCard

```jsx
/* Timeline Card */ compose(S, "TimelineCard")
```

### TwoTonedCard

```jsx
/* Two Toned Card */ compose(S, "TwoTonedCard")
```

## Related

`CardButton`, `Card.Content`, `Card.Header`, `Card.Notification`
