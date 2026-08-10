ScrollFade from @tedi-design-system/react. Use via `window.Tedi.ScrollFade` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ScrollFade.html`): Default, Scrollbar, Fade Size, Fade Position, No Fade Without Scrollbar.

## Props

```ts
interface ScrollFadeProps {
  /** ScrollFade content */
  children: React.ReactNode;
  /** Additional class name. */
  className?: string;
  /** Scrollbar type */
  scrollBar?: "default" | "custom";
  /** Size of fade in percentages. */
  fadeSize?: 0 | 10 | 20;
  /** Fade position */
  fadePosition?: "top" | "bottom" | "both";
  /** Called when element is scrolled to top */
  onScrollToTop?: () => void;
  /** Called when element is scrolled to bottom */
  onScrollToBottom?: () => void;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    scrollBar: 'custom',
    fadeSize: 20,
    fadePosition: 'both',
  },
};

// Scrollbar
export const Scrollbar: Story = {
  render: ScrollbarTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

// Fade Size
export const FadeSize: Story = {
  render: FadeSizeTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Scrollbar

```jsx
/* Scrollbar */ compose(S, "Scrollbar")
```

### FadeSize

```jsx
/* Fade Size */ compose(S, "FadeSize")
```

### FadePosition

```jsx
/* Fade Position */ compose(S, "FadePosition")
```

### NoFadeWithoutScrollbar

```jsx
/* No Fade Without Scrollbar */ compose(S, "NoFadeWithoutScrollbar")
```
