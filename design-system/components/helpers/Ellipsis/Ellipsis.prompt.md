Ellipsis from @tedi-design-system/react. Use via `window.Tedi.Ellipsis` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Ellipsis.html`): Default, Responsive Example, Leading Start, Responsive With Custom Popover.

## Props

```ts
interface EllipsisProps {
  /** The content to be displayed inside the ellipsis container. */
  children: React.ReactNode;
  /** The maximum number of lines before truncating the text with an ellipsis. If the content exceeds this limit, it will be truncated. Applies to the `end` (multi-line) position only. */
  lineClamp?: number;
  /** Where the ellipsis is placed. - `end` — trailing ellipsis, multi-line (clamped by `lineClamp`). - `start` — leading ellipsis, single-line (keeps the end of the text visible, e.g. for file paths or IDs). */
  position?: "end" | "start";
  /** Determines whether a popover should be displayed when the text is truncated. If `true`, hovering over the truncated text will show the full content in a popover. */
  popover?: boolean;
  /** Adds a custom CSS class to the Ellipsis element for additional styling or theming purposes */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: Template,

  args: {
    children: (
      <span>
        Any inline <b>content (even bold)</b>, that is too long for the wrapper
        <span className="text-small"> and dont fit in x number of rows</span>
      </span>
    ),
  },
};

/**
 * Resize the window to see that the ellipsis and popover appear only when content doesn't fit
 */

// Responsive Example
export const ResponsiveExample: Story = {
  args: {
    lineClamp: 1,
    children: (
      <span>
        Any inline <b>content (even bold)</b>, that is too long for the wrapper
        <span className="text-small"> and dont fit in x number of rows</span>
      </span>
    ),
  },
};

/**
 * With `position="start"` the text is truncated on a single line with a **leading**
 * ellipsis, keeping the end of the string visible. Useful for file paths, URLs or IDs
 * where the tail is the most distinguishing part. `lineClamp` does not apply here.
 */

// Leading Start
export const LeadingStart: Story = {
  render: Template,
  args: {
    position: 'start',
    children: 'https://www.tedi.ee/some/very/long/path/to/a/specific-resource-identifier.pdf',
  },
};

/**
 * Example when popover is shown even when text doesn't ellipse.
 * Use this when you want to show popover always or with custom content
 */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### ResponsiveExample

```jsx
/* Responsive Example */ compose(S, "ResponsiveExample")
```

### LeadingStart

```jsx
/* Leading Start */ compose(S, "LeadingStart")
```

### ResponsiveWithCustomPopover

```jsx
/* Responsive With Custom Popover */ compose(S, "ResponsiveWithCustomPopover")
```
