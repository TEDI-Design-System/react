Spinner from @tedi-design-system/react. Use via `window.Tedi.Spinner` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Spinner.html`): Default, Size, Color.

## Props

```ts
interface SpinnerProps {
  /** Adds a custom CSS class to the spinner element for additional styling or theming purposes. */
  className?: string;
  /** Provides a text label for screen readers to announce the spinner's purpose or status. */
  label?: string;
  /** Renders the spinner as purely decorative — no `role="status"` live region and no screen-reader label. Use when the loading state is already announced by an ancestor (e.g. a button's `aria-busy`), so it isn't announced twice. */
  decorative?: boolean;
  /** Defines the size of the spinner. Accepted values: 8, 10 (small), 12, 16 (default), 18, 24, 36, 48 (large). */
  size?: 18 | 24 | 8 | 10 | 12 | 16 | 36 | 48;
  /** Specifies the color theme of the spinner. The color should meet accessibility standards for color contrast. */
  color?: "primary" | "secondary";
  /** Sets the spinner's positioning behavior. This is useful when you want to position the spinner over other elements. */
  position?: "absolute";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<SpinnerBreakpointProps>;
  md?: Partial<SpinnerBreakpointProps>;
  lg?: Partial<SpinnerBreakpointProps>;
  xl?: Partial<SpinnerBreakpointProps>;
  xxl?: Partial<SpinnerBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,

  args: {
    size: 16,
    color: 'primary',
    label: 'Loading...',
  },
  decorators: [withConditionalCanvasBackground],
};

// Size
export const Size: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,

  args: {
    property: 'size',
    color: 'primary',
    array: sizeArray,
    label: 'Loading...',
  },
};

// Color
export const Color: StoryObj<TemplateMultipleProps> = {
  render: TemplateColors,
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Size

```jsx
/* Size */ compose(S, "Size")
```

### Color

```jsx
/* Color */ compose(S, "Color")
```
