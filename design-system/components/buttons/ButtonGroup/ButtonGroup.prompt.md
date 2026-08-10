ButtonGroup from @tedi-design-system/react. Use via `window.Tedi.ButtonGroup` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ButtonGroup.html`): Default, Sizes, Types, With Icon, Icon Only, Primary, Secondary, Different Width Buttons, Stretched.

## Props

```ts
interface ButtonGroupProps {
  /** The child components to render inside the ButtonGroup. Typically, these should be `<Button>` components. */
  children: React.ReactNode;
  /** The visual style of the ButtonGroup, determining its color and appearance. */
  type?: "primary" | "secondary";
  /** Callback function triggered when the selected button changes. Receives the `id` of the selected button as an argument. */
  onSelectionChange?: (id: string) => void;
  /** Whether all buttons in the group should have equal width and stretched inside their parent element. If `true`, all buttons will take up equal space. If `false`, the button widths will be determined by their content. */
  stretch?: boolean;
  /** A label for the button group, used for accessibility. Required if the group does not have a visible label. */
  ariaLabel?: string;
  /** Additional custom CSS classes to apply to the ButtonGroup container */
  className?: string;
  /** Size of the buttons in ButtonGroup */
  size?: "default" | "small";
  /** Whether the button group should collapse into a dropdown on mobile */
  enableMobileDropdown?: boolean;
  /** Breakpoint at which to switch to dropdown */
  mobileBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Label to display on the dropdown trigger button when the button group collapses on mobile. If not provided, the label provider value for `sidenav.submenu` will be used as fallback. */
  dropdownLabel?: string;
  dropdownLabelMode?: "active" | "static";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,
  args: {
    type: 'primary',
    stretch: false,
    dropdownLabel: 'Text',
  },
};

// Sizes
export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateSizes,
  args: {
    property: 'size',
    array: sizeArray,
    dropdownLabel: 'Text',
    enableMobileDropdown: true,
  },
};

// Types
export const Types: StoryObj<typeof Button> = {
  render: TemplateTypes,
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### Types

```jsx
/* Types */ compose(S, "Types")
```

### WithIcon

```jsx
/* With Icon */ compose(S, "WithIcon")
```

### IconOnly

```jsx
/* Icon Only */ compose(S, "IconOnly")
```

### Primary

```jsx
/* Primary */ compose(S, "Primary")
```

### Secondary

```jsx
/* Secondary */ compose(S, "Secondary")
```

### DifferentWidthButtons

```jsx
/* Different Width Buttons */ compose(S, "DifferentWidthButtons")
```

### Stretched

```jsx
/* Stretched */ compose(S, "Stretched")
```
