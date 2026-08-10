InfoTooltip from @tedi-design-system/react. Use via `window.Tedi.InfoTooltip` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `InfoTooltip.html`): Default, In Label Row.

## Props

```ts
interface InfoTooltipProps {
  /** Tooltip content shown when the info button is hovered or focused. */
  children: React.ReactNode;
  /** Placement of the tooltip relative to the info button. */
  placement?: "top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start";
  /** How the tooltip is opened. */
  openWith?: "hover" | "click";
  /** Max width of the tooltip content. */
  maxWidth?: "small" | "none" | "large" | "medium";
  /** Info button colour. Use `inverted` on dark or coloured backgrounds. */
  color?: "default" | "inverted";
  /** Renders the smaller (16px) info button. */
  isSmall?: boolean;
  /** Accessible name for the info button. */
  ariaLabel?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<InfoTooltipBreakpointProps>;
  md?: Partial<InfoTooltipBreakpointProps>;
  lg?: Partial<InfoTooltipBreakpointProps>;
  xl?: Partial<InfoTooltipBreakpointProps>;
  xxl?: Partial<InfoTooltipBreakpointProps>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    children: 'Lisainfo väljal',
  },
};

/**
 * Typical usage — a trailing info affix next to a form label. `Label` renders
 * this exact pattern via its `tooltip` prop (it uses `InfoTooltip` internally and
 * places the trigger outside the `<label>`), so you rarely compose it by hand.
 */

// In Label Row
export const InLabelRow: Story = {
  render: () => (
    <Label htmlFor="city" required tooltip="Sisestage linn, kus te praegu elate.">
      Linn
    </Label>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### InLabelRow

```jsx
/* In Label Row */ compose(S, "InLabelRow")
```
