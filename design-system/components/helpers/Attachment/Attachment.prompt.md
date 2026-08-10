Attachment from @tedi-design-system/react. Use via `window.Tedi.Attachment` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Attachment.html`): Default, Read Only, With Progress, With File Size, With Icon, Without Delete Button, With Different Actions, Vertical, With Error, Labeled Actions.

## Props

```ts
interface AttachmentProps {
  /** File name (required). */
  name: string;
  /** Hint / error message shown below the card, wired via `aria-describedby`. */
  feedback?: FeedbackTextProps;
  /** Pre-formatted file size (e.g. `'1.2 MB'`), shown after the name. Format it yourself. */
  fileSize?: string;
  /** Material icon name for a leading file-type glyph. */
  icon?: string;
  /** Action buttons (download, delete, …) shown on the right. `Button`s default to `visualType="neutral"`. */
  actions?: React.ReactNode;
  /** Show an upload progress bar. */
  isLoading?: boolean;
  /** Upload progress (0..100); only shown while `isLoading`. */
  progress?: number;
  /** Hint text under the progress bar (e.g. `'Üleslaadimine'`); only shown while `isLoading`. */
  progressLabel?: string;
  /** `false` switches the card to the error state (danger surface + warning glyph). */
  isValid?: boolean;
  /** Force the layout: `'vertical'` stacks the content, `'horizontal'` keeps one row. When omitted, derived from the viewport via `verticalBelow`. */
  direction?: "horizontal" | "vertical";
  /** Breakpoint below which the layout auto-switches to vertical (when `direction` is unset). */
  verticalBelow?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Additional class name on the root element. */
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: renderWithDelete,
};

// Read Only
export const ReadOnly: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="Kodukülastusakt_Triin.pdf" actions={downloadAction} />
      <Attachment name="Lisa_5.pdf" actions={downloadAction} />
      <Attachment name="Graafik_2025.pdf" actions={downloadAction} />
    </VerticalSpacing>
  </div>
);

// With Progress
export const WithProgress: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        isLoading
        progress={34}
        progressLabel="Üleslaadimine"
        actions={deleteAction}
      />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" isLoading progress={34} actions={deleteAction} />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        fileSize="0,9 MB"
        isLoading
        progress={34}
        progressLabel="Üleslaadimine"
        actions={
          <>
            {downloadAction}
            {deleteAction}
          </>
        }
      />
    </VerticalSpacing>
  </div>
);
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### ReadOnly

```jsx
/* Read Only */ compose(S, "ReadOnly")
```

### WithProgress

```jsx
/* With Progress */ compose(S, "WithProgress")
```

### WithFileSize

```jsx
/* With File Size */ compose(S, "WithFileSize")
```

### WithIcon

```jsx
/* With Icon */ compose(S, "WithIcon")
```

### WithoutDeleteButton

```jsx
/* Without Delete Button */ compose(S, "WithoutDeleteButton")
```

### WithDifferentActions

```jsx
/* With Different Actions */ compose(S, "WithDifferentActions")
```

### Vertical

```jsx
/* Vertical */ compose(S, "Vertical")
```

### WithError

```jsx
/* With Error */ compose(S, "WithError")
```

### LabeledActions

```jsx
/* Labeled Actions */ compose(S, "LabeledActions")
```
