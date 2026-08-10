Popover from @tedi-design-system/react. Use via `window.Tedi.Popover` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Sub-components: `Popover.Trigger`, `Popover.Content`. See the DS docs for composition — e.g. items like `Popover.Item` go inside `<Popover>`; containers like `Popover.Group` wrap multiple `<Popover>`s.

Variants (see `Popover.html`): Default, Content Examples, Heading, Trigger, Arrow Position, With Prominent Border, Size, Closing Button, Not Dismissible, Scroll Locked, Focus Locked, Accessibility Baseline, No Title Accessible Name, Read All Stress Test.

## Props

```ts
interface PopoverProps {
  /** Adds correct event listeners that change the open state. */
  openWith?: "hover" | "click";
  /** Offset of content. */
  offset?: number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null; } | Derivable<number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null; }>;
  /** If true, popover renders with an illustrative border on the arrow side and extra arrow padding so the arrow's shoulders stay clear of the rounded corner on `-start` / `-end` placements. */
  withBorder?: boolean;
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
  /** Props passed to FloatingFocusManager */
  focusManager?: Omit<FloatingFocusManagerProps, "children" | "context">;
  /** Is dismissible by clicking outside of content or Escape button? */
  dismissible?: boolean;
  /** Is scrolling locked outside of content? */
  scrollLock?: boolean;
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
    ...subcomponentArgTypes(Popover.Content, {
      category: 'Popover.Content',
      prefix: 'content',
      exclude: ['children', 'labelledBy', 'describedBy', 'titleProps', 'closeProps'],
    }),
  },
  args: {
    content__title: 'Pealkiri',
    content__close: true,
    content__width: 'medium',
  },
  render: (args: Record<string, unknown>) => (
    <Popover {...getPrimaryComponentProps<PopoverProps>(args)}>
      <Popover.Trigger>
        <Button>Popover Trigger</Button>
      </Popover.Trigger>
      <Popover.Content {...getSubcomponentProps(args, 'content')}>{POLAR_BEAR_TEXT}</Popover.Content>
    </Popover>
  ),
};

// Content Examples
export const ContentExamples: Story = {
  render: ContentExamplesTemplate,
  args: {},
};

// Heading
export const Heading: Story = {
  render: HeadingTemplate,
  args: {},
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### ContentExamples

```jsx
/* Content Examples */ compose(S, "ContentExamples")
```

### Heading

```jsx
/* Heading */ compose(S, "Heading")
```

### Trigger

```jsx
/* Trigger */ compose(S, "Trigger")
```

### ArrowPosition

```jsx
/* Arrow Position */ compose(S, "ArrowPosition")
```

### WithProminentBorder

```jsx
/* With Prominent Border */ compose(S, "WithProminentBorder")
```

### Size

```jsx
/* Size */ compose(S, "Size")
```

### ClosingButton

```jsx
/* Closing Button */ compose(S, "ClosingButton")
```

### NotDismissible

```jsx
/* Not Dismissible */ compose(S, "NotDismissible")
```

### ScrollLocked

```jsx
/* Scroll Locked */ compose(S, "ScrollLocked")
```

### FocusLocked

```jsx
/* Focus Locked */ compose(S, "FocusLocked")
```

### AccessibilityBaseline

```jsx
/* Accessibility Baseline */ compose(S, "AccessibilityBaseline")
```

### NoTitleAccessibleName

```jsx
/* No Title Accessible Name */ compose(S, "NoTitleAccessibleName")
```

### ReadAllStressTest

```jsx
/* Read All Stress Test */ compose(S, "ReadAllStressTest")
```

## Related

`Popover.Trigger`, `Popover.Content`
