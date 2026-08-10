HeadingWithIcon from @tedi-design-system/react. Use via `window.Tedi.HeadingWithIcon` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `HeadingWithIcon.html`): Default, Colors.

## Props

```ts
interface HeadingWithIconProps {
  /** Heading text */
  children: React.ReactNode;
  /** Additional class */
  className?: string;
  /** Heading text color */
  headingColor?: "primary" | "secondary" | "neutral" | "danger" | "success" | "disabled" | "info" | "warning" | "tertiary" | "brand" | "white";
  /** Icon color */
  iconColor?: "primary" | "secondary" | "danger" | "success" | "warning" | "tertiary" | "brand" | "white" | "inherit" | "brand-dark" | "warning-dark";
  sm?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  md?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  lg?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  xl?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  xxl?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  /** ID attribute */
  id?: string;
  /** Allows to focus the element */
  tabIndex?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Single or multiple modifiers to change the text behavior */
  modifiers?: "center" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "left" | "right" | "normal" | "extra-small" | "bold" | "thin" | "italic" | "nowrap" | (string & {}) /* +13 more */;
  /** Semantic heading tag h1-h6 are allowed values */
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Size of the icon */
  size?: 18 | 24 | 8 | 12 | 16 | 36 | 48;
  /** Type of icon It is recommended to only use one type throughout your app */
  type?: "outlined" | "sharp" | "rounded";
  /** Icons label for screen-readers. If omitted then the icon is hidden for screen-readers. */
  label?: string;
  /** Name of material icon https://fonts.google.com/icons */
  name: string;
  background?: undefined;
  /** Type of display */
  display?: "inline" | "block";
  /** Render a filled variant of the icon */
  filled?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    children: 'My family physician',
    name: 'assignment_ind',
    headingColor: 'brand',
    iconColor: 'brand',
  },
};

// Colors
export const Colors: Story = {
  render: TemplateColors,
  args: {
    children: 'My family physician',
    name: 'assignment_ind',
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Colors

```jsx
/* Colors */ compose(S, "Colors")
```
