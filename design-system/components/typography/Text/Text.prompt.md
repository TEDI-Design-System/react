Text from @tedi-design-system/react. Use via `window.Tedi.Text` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Text.html`): Default, Body, Subtitles, General text colors, Status text colors.

## Props

```ts
interface TextProps {
  /** Children of the text */
  children: React.ReactNode;
  /** ID attribute */
  id?: string;
  /** Allows to focus the element */
  tabIndex?: number;
  /** Additional class */
  className?: string;
  /** Base element */
  element?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label" | "li" | "p" | "span";
  /** Single or multiple modifiers to change the text behavior */
  modifiers?: "center" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "left" | "right" | "normal" | "extra-small" | "bold" | "thin" | "italic" | "nowrap" | (string & {}) /* +13 more */;
  /** Color of the text Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI */
  color?: "primary" | "secondary" | "neutral" | "danger" | "success" | "disabled" | "info" | "warning" | "tertiary" | "brand" | "white";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<TextBreakpointProps>;
  md?: Partial<TextBreakpointProps>;
  lg?: Partial<TextBreakpointProps>;
  xl?: Partial<TextBreakpointProps>;
  xxl?: Partial<TextBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    children: 'Text',
  },
};

// Body
export const BodyText: Story = {
  render: TemplateBodyText,
  name: 'Body',
};

// Subtitles
export const Subtitles: Story = {
  render: TemplateSubtitles,
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### BodyText

```jsx
/* Body */ compose(S, "BodyText")
```

### Subtitles

```jsx
/* Subtitles */ compose(S, "Subtitles")
```

### GeneralText

```jsx
/* General text colors */ compose(S, "GeneralText")
```

### StatusText

```jsx
/* Status text colors */ compose(S, "StatusText")
```

## Related

`TextArea`, `TextField`, `TextGroup`
