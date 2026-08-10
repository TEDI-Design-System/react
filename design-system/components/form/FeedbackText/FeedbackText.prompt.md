FeedbackText from @tedi-design-system/react. Use via `window.Tedi.FeedbackText` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `FeedbackText.html`): Helper, Error, Valid, Position Left, Position Right.

## Props

```ts
interface FeedbackTextProps {
  /** Helper text */
  text: boolean | ReactNode[] | React.ReactNode;
  /** ID to reference the helper from aria-describedby attributes. If omitted, then the id might be set through a parent component. */
  id?: string;
  /** Additional custom class. */
  className?: string;
  /** Type of form-helper. */
  type?: "hint" | "valid" | "error";
  /** Position of the helper. */
  position?: "left" | "right";
}
```

## Examples

```jsx
// Helper
export const Helper: Story = {
  args: {
    text: 'I am a hint text',
  },
};

// Error
export const Error: Story = {
  args: {
    text: 'I am an error text',
    type: 'error',
  },
};

// Valid
export const Valid: Story = {
  args: {
    text: 'I am a valid text',
    type: 'valid',
  },
};
```

### Helper

```jsx
/* Helper */ compose(S, "Helper")
```

### Error

```jsx
/* Error */ compose(S, "Error")
```

### Valid

```jsx
/* Valid */ compose(S, "Valid")
```

### PositionLeft

```jsx
/* Position Left */ compose(S, "PositionLeft")
```

### PositionRight

```jsx
/* Position Right */ compose(S, "PositionRight")
```
