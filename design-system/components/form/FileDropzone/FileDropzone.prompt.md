FileDropzone from @tedi-design-system/react. Use via `window.Tedi.FileDropzone` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `FileDropzone.html`): Default, With Hint, Disabled, Multiple, Validation Failed, Multiple With Individual Validation, Has Tooltip, Multiple With Individual Validation And Attachment Props, With Attachment Props.

## Props

```ts
interface FileDropzoneProps {
  /** Additional CSS class names to apply to the dropzone for custom styling */
  className?: string;
  /** The name attribute for the file input, used for form submission and identifying the field. */
  name: string;
  /** The text label displayed for the file dropzone, providing context for users. Defaults to the `LabelProvider`'s localised `file-dropzone.label` (e.g. "Lohista failid siia või klõpsa, et sirvida" in Estonian). */
  label?: string;
  /** Provides helper text or feedback (such as an error or instruction message) to guide the user. */
  helper?: FeedbackTextProps;
  /** Disables the file dropzone, preventing user interaction. */
  disabled?: boolean;
  /** Overrides forwarded to each rendered `Attachment` (e.g. `icon`, `fileSize`, `progress`, `feedback`). Pass a function to vary per file. `FileDropzone` sets `name`, `isValid` and `isLoading` itself, and always appends a remove button to the `actions` slot (after any `actions` you provide here). */
  attachmentProps?: Partial<Omit<AttachmentProps, "name">> | ((file: FileUploadFile) => Partial<Omit<AttachmentProps, "name">>);
  /** The unique identifier for the input element that this label is associated with. This ID should match the input element's `id` attribute to ensure accessibility. */
  id: string;
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
  /** Specifies the allowed file types (e.g., "image/png, image/jpeg"). */
  accept?: string;
  /** The maximum file size allowed for upload, in bytes. */
  maxSize?: number;
  /** Determines if multiple files can be uploaded at once. */
  multiple?: boolean;
  /** If true, each file is validated separately instead of rejecting all at once. */
  validateIndividually?: boolean;
  /** An array of default files that are preloaded in the upload list. */
  defaultFiles?: FileUploadFile[];
  /** Callback function triggered when files are added or changed. */
  onChange?: (files: FileUploadFile[]) => void;
  /** Callback function triggered when a file is removed. */
  onDelete?: (file: FileUploadFile) => void;
  /** An optional array of files to be used in controlled mode. When provided, the hook uses this array as the source of truth for the file list instead of its internal state. The parent component is responsible for updating this prop in response to the `onChange` callback. If not provided, the hook operates in uncontrolled mode, managing its own internal file state via `defaultFiles` and user interactions. */
  files?: FileUploadFile[];
  /** How long (ms) the announcement message should be visible. */
  announcementTimeout?: number;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

const Template: StoryFn<FileDropzoneProps> = (args) => (
  <Row>
    <Col md={6}>
      <FileDropzone {...args} />
    </Col>
  </Row>
);

// With Hint
export const WithHint: Story = {
  render: Template,
  args: {
    name: 'file',
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 1 MB.',
    },
  },
};

// Disabled
export const Disabled: Story = {
  render: Template,
  args: {
    id: 'file-dropzone-disabled',
    name: 'file-loading',
    label: 'Lohista failid siia',
    disabled: true,
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithHint

```jsx
/* With Hint */ compose(S, "WithHint")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### Multiple

```jsx
/* Multiple */ compose(S, "Multiple")
```

### ValidationFailed

```jsx
/* Validation Failed */ compose(S, "ValidationFailed")
```

### MultipleWithIndividualValidation

```jsx
/* Multiple With Individual Validation */ compose(S, "MultipleWithIndividualValidation")
```

### HasTooltip

```jsx
/* Has Tooltip */ compose(S, "HasTooltip")
```

### MultipleWithIndividualValidationAndAttachmentProps

```jsx
/* Multiple With Individual Validation And Attachment Props */ compose(S, "MultipleWithIndividualValidationAndAttachmentProps")
```

### WithAttachmentProps

```jsx
/* With Attachment Props */ compose(S, "WithAttachmentProps")
```
