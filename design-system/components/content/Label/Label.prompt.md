Label from @tedi-design-system/react. Use via `window.Tedi.Label` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Label.html`): Default, Required field, Bold, Bold Required field, Info Button Story, Default Small, Default Small Bold.

## Props

```ts
interface LabelProps {
  /** The element type to render. This can be any valid HTML element, allowing flexibility in how the label is used. Defaults to 'label'. */
  as?: "symbol" | "object" | "button" | "link" | "text" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | (string & {}) /* +164 more */;
  /** If true, displays a required symbol (*) after the label text, indicating that the associated input is mandatory. */
  required?: boolean;
  /** Tooltip content to display when hovering over the info button. Accepts rich content (e.g. bold text, links), not just a plain string. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
  /** If true, applies a bold font weight to the label text. */
  isBold?: boolean;
  /** If true, applies a small font size to the label text. */
  isSmall?: boolean;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<LabelBreakpointProps>;
  md?: Partial<LabelBreakpointProps>;
  lg?: Partial<LabelBreakpointProps>;
  xl?: Partial<LabelBreakpointProps>;
  xxl?: Partial<LabelBreakpointProps>;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,

  args: {
    children: 'Toimeaine',
  },
};

// Required field
export const Required: Story = {
  render: Template,
  name: 'Required field',

  args: {
    children: 'Toimeaine',
    required: true,
  },
};

// Bold
export const DefaultBold: Story = {
  render: Template,
  name: 'Bold',

  args: {
    children: 'Toimeaine',
    isBold: true,
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Required

```jsx
/* Required field */ compose(S, "Required")
```

### DefaultBold

```jsx
/* Bold */ compose(S, "DefaultBold")
```

### RequiredBold

```jsx
/* Bold Required field */ compose(S, "RequiredBold")
```

### InfoButtonStory

```jsx
/* Info Button Story */ compose(S, "InfoButtonStory")
```

### DefaultSmall

```jsx
/* Default Small */ compose(S, "DefaultSmall")
```

### DefaultSmallBold

```jsx
/* Default Small Bold */ compose(S, "DefaultSmallBold")
```

## Related

`LabelProvider`
