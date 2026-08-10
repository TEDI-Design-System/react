Print from @tedi-design-system/react. Use via `window.Tedi.Print` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Print.html`): Default.

## Props

```ts
interface PrintProps {
  /** The content to be rendered within the `Print` component. This can be a single element or an array of elements. */
  children: JSX.Element | (false | "" | JSX.Element)[];
  /** Controls the visibility of the content when printing. - 'show': The content will be visible during printing. - 'hide': The content will be hidden during printing. */
  visibility?: "show" | "hide";
  /** Determines how page, column, or region breaks behave before the element. Uses CSS `break-before` property values. */
  breakBefore?: "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region";
  /** Determines how page, column, or region breaks behave after the element. Uses CSS `break-after` property values. */
  breakAfter?: "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region";
  /** Determines how page, column, or region breaks behave inside the element. Uses CSS `break-inside` property values. */
  breakInside?: "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```
