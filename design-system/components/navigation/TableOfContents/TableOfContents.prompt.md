TableOfContents from @tedi-design-system/react. Use via `window.Tedi.TableOfContents` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `TableOfContents.Item`, `TableOfContents.Collapsible`. See the DS docs for composition — e.g. items like `TableOfContents.Item` go inside `<TableOfContents>`; containers like `TableOfContents.Group` wrap multiple `<TableOfContents>`s.

Variants (see `TableOfContents.html`): Default, Transparent, Headless, With Icon, Nested, Numbered, Item States, Sticky In Layout, Collapsible.

## Props

```ts
interface TableOfContentsProps {
  /** `TableOfContents.Item` elements. An item's non-`Item` children are its link / label; nested `TableOfContents.Item` children become its sub-items. */
  children: React.ReactNode;
  /** Heading rendered above the list. Defaults to the localised "Table of contents" label; pass `null` to render it headless (no visible heading — the navigation keeps an accessible name via `aria-label`). */
  heading?: string;
  /** Visual variant: - `default` — rendered inside a bordered `Card`. - `transparent` — no card chrome (border / background); the list sits directly on the page, with a continuous grey left rail (the active item's segment turns blue). */
  variant?: "default" | "transparent";
  /** Inner padding of the container, in rem — the spacing between the card edge and the heading / items. Defaults to the card's medium padding token. */
  padding?: number;
  /** Id of the currently active item. The active item gets the left accent bar and active link colour; the branch leading to it auto-expands its nested children. */
  activeId?: string;
  /** Show a validation glyph before each item (multistep-form usage). Each state uses a distinct icon shape (not colour alone) with a localised text alternative: a check for `isValid === true`, an empty circle for `undefined` (not completed), and a warning for `isValid === false`. */
  showIcons?: boolean;
  /** Render the list as an ordered list with auto-generated hierarchical numbers (`1.`, `2.`, `2.1`, …) shown before each item. */
  numbered?: boolean;
  /** Stick the card to the viewport while scrolling. */
  sticky?: boolean;
  /** Additional class name on the root element. */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="section-3">
      {sectionItems()}
    </TableOfContents>
  ),
};

// Transparent
export const Transparent: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" variant="transparent" sticky={false} activeId="section-3">
      {sectionItems()}
    </TableOfContents>
  ),
};

// Headless
export const Headless: Story = {
  render: () => (
    <TableOfContents heading={null} sticky={false} numbered activeId="section-3">
      {sectionItems()}
    </TableOfContents>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Transparent

```jsx
/* Transparent */ compose(S, "Transparent")
```

### Headless

```jsx
/* Headless */ compose(S, "Headless")
```

### WithIcon

```jsx
/* With Icon */ compose(S, "WithIcon")
```

### Nested

```jsx
/* Nested */ compose(S, "Nested")
```

### Numbered

```jsx
/* Numbered */ compose(S, "Numbered")
```

### ItemStates

```jsx
/* Item States */ compose(S, "ItemStates")
```

### StickyInLayout

```jsx
/* Sticky In Layout */ compose(S, "StickyInLayout")
```

### Collapsible

```jsx
/* Collapsible */ compose(S, "Collapsible")
```

## Related

`TableOfContents.Item`, `TableOfContents.Collapsible`
