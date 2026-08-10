Affix from @tedi-design-system/react. Use via `window.Tedi.Affix` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Affix.html`): Default, Sticky Top 0, Fixed Example.

## Props

```ts
interface AffixProps {
  /** Affix children */
  children?: React.ReactNode;
  /** Additional class. */
  className?: string;
  /** Position of Affix. */
  position?: "sticky" | "fixed";
  /** Spacing from the top of the Container. */
  top?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Spacing from the bottom of the Container. */
  bottom?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Spacing from the left of the Container. */
  left?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Spacing from the right of the Container. */
  right?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Determine what element(s) the top/bottom values should be relative to */
  relative?: "header"[] | "window";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    children: 'This text is Sticky in its container!',
  },
};

// Sticky Top 0
export const StickyTop0: Story = {
  render: Template,
  args: {
    children: 'This text is Sticky in its container!',
    top: 0,
  },
};

// Fixed Example
export const FixedExample: Story = {
  render: Template,
  args: {
    children: 'This text is Fixed on bottom of page!',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 'unset',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### StickyTop0

```jsx
/* Sticky Top 0 */ compose(S, "StickyTop0")
```

### FixedExample

```jsx
/* Fixed Example */ compose(S, "FixedExample")
```
