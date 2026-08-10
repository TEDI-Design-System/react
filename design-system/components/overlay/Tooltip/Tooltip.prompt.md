Tooltip from @tedi-design-system/react. Use via `window.Tedi.Tooltip` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Tooltip.Trigger`, `Tooltip.Content`. See the DS docs for composition — e.g. items like `Tooltip.Item` go inside `<Tooltip>`; containers like `Tooltip.Group` wrap multiple `<Tooltip>`s.

Variants (see `Tooltip.html`): Default, Arrow Position, Tooltip Width, Triggers, Open With Click, Uncontrolled Default Open, Controlled Open.

## Props

```ts
interface TooltipProps {
  /** Adds correct event listeners that change the open state. */
  openWith?: "hover" | "click";
  /** Offset of content. */
  offset?: number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null; } | Derivable<number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null; }>;
  /** Trigger and Content components */
  children: boolean | ReactNode[] | React.ReactNode;
  /** Changes aria attributes on trigger and content based on the components role */
  role?: "dialog" | "label" | "menu" | "select" | "grid" | "tooltip" | "tree" | "alertdialog" | "listbox" | "combobox";
  /** Is open?<br /> Use this with onToggle prop for controlled component. */
  open?: boolean;
  /** Callback when toggled.<br /> Use this with open prop for state outside of component. */
  onToggle?: (open: boolean) => void;
  /** Is open by default?<br /> Does not work with open and onToggle props. */
  defaultOpen?: boolean;
  /** Placement of content. */
  placement?: "top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start";
  /** Minimum distance (in px) between the arrow and the edges of the content. Helps keep the arrow away from rounded corners, especially on `-start` and `-end` placements. Use a larger value for bigger arrows or arrows with borders. */
  arrowPadding?: number;
  /** Props passed to FloatingFocusManager */
  focusManager?: Omit<FloatingFocusManagerProps, "children" | "context">;
  /** Renders the overlay purely visually: no `useRole` aria wiring on the trigger (so no `aria-describedby`) and the content is `aria-hidden`. Use when the trigger already conveys the same text through its accessible name — e.g. an icon-only button whose visible tooltip merely mirrors its label — so screen readers don't announce it twice. */
  ariaHidden?: boolean;
  /** Re-measure the floating element every animation frame while mounted. Enable this when the trigger/reference element's position can change without a DOM-observable event (e.g. position driven by an inherited CSS custom property on an ancestor). The default `autoUpdate` only reacts to scroll, resize, and element-size changes, so position-only movement goes unnoticed and the overlay lags behind. Opt-in because animation-frame tracking is more expensive than the default. */
  trackReferencePosition?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Tooltip.Content, {
      category: 'Tooltip.Content',
      prefix: 'content',
      exclude: ['children', 'labelledBy', 'describedBy'],
    }),
  },
  args: {
    content__maxWidth: 'medium',
  },
  render: (args: Record<string, unknown>) => (
    <Tooltip {...getPrimaryComponentProps<TooltipProps>(args)}>
      <Tooltip.Trigger>
        <InfoButton>Info</InfoButton>
      </Tooltip.Trigger>
      <Tooltip.Content {...getSubcomponentProps(args, 'content')}>
        The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
      </Tooltip.Content>
    </Tooltip>
  ),
};

// Arrow Position
export const ArrowPosition: Story = {
  render: PositionTemplate,
  args: {},
};

// Tooltip Width
export const TooltipWidth: Story = {
  render: WidthTemplate,
  args: {},
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### ArrowPosition

```jsx
/* Arrow Position */ compose(S, "ArrowPosition")
```

### TooltipWidth

```jsx
/* Tooltip Width */ compose(S, "TooltipWidth")
```

### Triggers

```jsx
/* Triggers */ compose(S, "Triggers")
```

### OpenWithClick

```jsx
/* Open With Click */ compose(S, "OpenWithClick")
```

### UncontrolledDefaultOpen

```jsx
/* Uncontrolled Default Open */ compose(S, "UncontrolledDefaultOpen")
```

### ControlledOpen

```jsx
/* Controlled Open */ compose(S, "ControlledOpen")
```

## Related

`Tooltip.Trigger`, `Tooltip.Content`
