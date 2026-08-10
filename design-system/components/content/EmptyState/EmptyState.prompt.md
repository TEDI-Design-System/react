EmptyState from @tedi-design-system/react. Use via `window.Tedi.EmptyState` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `EmptyState.html`): Default, With Primary Action, With Secondary Action, With Link, With Heading, Minimal, Small Padding, Separate, Attached To Component, Inside Component, Custom Icon, Different Icon Color.

## Props

```ts
interface EmptyStateProps {
  /** Container variant — matches the Figma "Types" section. - `'separate'` (default) — full border + radius, stands on its own. - `'attached'` — top border omitted so the block sits flush beneath a preceding card or table (same width + same bottom-radius). - `'inside'` — no border, no radius; intended to be placed inside another container such as a `<Card>` or `<Table>`. */
  type?: "separate" | "attached" | "inside";
  /** Padding scale. `default` = 24px, `small` = 16px. */
  size?: "default" | "small";
  /** Icon rendered above the text block. Pass a Material icon name, a full `IconWithoutBackgroundProps` object to configure the underlying `Icon`, or `null` to hide the icon. */
  icon?: string | IconWithoutBackgroundProps;
  /** Optional heading rendered above the description — appears as an H3 in brand-primary text color. */
  heading?: React.ReactNode;
  /** Main body text describing why there is nothing to show. */
  children?: React.ReactNode;
  /** Call-to-action slot. Typically a `<Button>` (or two) or a `<Link>`. Rendered below the text block. */
  actions?: React.ReactNode;
  /** Additional class name on the root element. */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    children: 'Andmed puuduvad',
  },
};

// With Primary Action
export const WithPrimaryAction: Story = {
  args: {
    children: 'Andmed puuduvad',
    actions: (
      <Button type="button" iconLeft="add">
        Loo uus
      </Button>
    ),
  },
};

// With Secondary Action
export const WithSecondaryAction: Story = {
  args: {
    children: 'Andmed puuduvad',
    actions: (
      <Button type="button" visualType="secondary" iconLeft="add">
        Loo uus
      </Button>
    ),
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithPrimaryAction

```jsx
/* With Primary Action */ compose(S, "WithPrimaryAction")
```

### WithSecondaryAction

```jsx
/* With Secondary Action */ compose(S, "WithSecondaryAction")
```

### WithLink

```jsx
/* With Link */ compose(S, "WithLink")
```

### WithHeading

```jsx
/* With Heading */ compose(S, "WithHeading")
```

### Minimal

```jsx
/* Minimal */ compose(S, "Minimal")
```

### SmallPadding

```jsx
/* Small Padding */ compose(S, "SmallPadding")
```

### Separate

```jsx
/* Separate */ compose(S, "Separate")
```

### AttachedToComponent

```jsx
/* Attached To Component */ compose(S, "AttachedToComponent")
```

### InsideComponent

```jsx
/* Inside Component */ compose(S, "InsideComponent")
```

### CustomIcon

```jsx
/* Custom Icon */ compose(S, "CustomIcon")
```

### DifferentIconColor

```jsx
/* Different Icon Color */ compose(S, "DifferentIconColor")
```
