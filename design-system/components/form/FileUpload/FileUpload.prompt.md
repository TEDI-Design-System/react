FileUpload from @tedi-design-system/react. Use via `window.Tedi.FileUpload` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<ThemeProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `FileUpload.html`): Default, Sizes, With Hint, Disabled, Validation Failed, Validation Success, Multiple With Individual Validation, Loading State, Multiple, Multiple Handled, Read Only Files, Pdf And Txt Only, Size Limited, Extension And Size Limit, Controlled Clearing.

## Props

```ts
interface FileUploadProps {
  /** Unique HTML id for the file input, also used to associate the label and helper/error text for accessibility. When omitted, falls back to the surrounding `InputGroup`'s id or a generated one. */
  id?: string;
  /** Visible label for the field. May be omitted when the surrounding `InputGroup` provides its own label. */
  label?: string;
  /** Additional class names appended to the inner dropzone element (`tedi-file-upload`) — the content area that holds the file list and the upload button. Use this to tweak the dropzone itself (border, padding, background) without affecting the surrounding container. */
  className?: string;
  /** Additional class names appended to the outer container element (`tedi-file-upload__container`) that wraps the dropzone, file list, and helper/error states. Use this to tweak the component's outer shell (radius, outline, max-width) or to override size/state modifiers. */
  wrapperClassName?: string;
  /** The name of the file input field, used for form submission and accessibility. */
  name: string;
  /** A helper text or error message to display below the file upload field. */
  helper?: FeedbackTextProps;
  /** Specifies the allowed file types (e.g., "image/png, image/jpeg"). */
  accept?: string;
  /** Allows multiple file selection if `true`. Defaults to `false`. */
  multiple?: boolean;
  /** Callback function triggered when files are added or changed. */
  onChange?: (files: FileUploadFile[]) => void;
  /** An array of preloaded files that appear in the upload field by default. */
  defaultFiles?: FileUploadFile[];
  /** Callback function triggered when a file is removed. */
  onDelete?: (file: FileUploadFile) => void;
  /** Determines whether a "Clear" button is shown to remove all files. */
  hasClearButton?: boolean;
  /** A controlled list of uploaded files. If provided, `onChange` should be used to update them. */
  files?: FileUploadFile[];
  /** If `true`, prevents file selection and removal, making the field read-only. */
  readOnly?: boolean;
  /** Disables the file upload field, preventing interactions. */
  disabled?: boolean;
  /** Maximum allowed file size in bytes. */
  maxSize?: number;
  /** If `true`, validates each file separately instead of rejecting all at once. */
  validateIndividually?: boolean;
  /** Determines the visual size of the file upload field. Defaults to `"default"`. */
  size?: "default" | "small";
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  args: {
    id: 'file-upload',
    name: 'file',
    label: 'Laadi fail üles',
  },
};

// Sizes
export const Sizes: Story = {
  render: TemplateSizes,
  args: {
    label: 'Silt',
  },
};

// With Hint
export const WithHint: Story = {
  args: {
    id: 'file-upload',
    name: 'file',
    label: 'Laadi fail üles',
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 0.001 MB.',
    },
  },
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

### WithHint

```jsx
/* With Hint */ compose(S, "WithHint")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### ValidationFailed

```jsx
/* Validation Failed */ compose(S, "ValidationFailed")
```

### ValidationSuccess

```jsx
/* Validation Success */ compose(S, "ValidationSuccess")
```

### MultipleWithIndividualValidation

```jsx
/* Multiple With Individual Validation */ compose(S, "MultipleWithIndividualValidation")
```

### LoadingState

```jsx
/* Loading State */ compose(S, "LoadingState")
```

### Multiple

```jsx
/* Multiple */ compose(S, "Multiple")
```

### MultipleHandled

```jsx
/* Multiple Handled */ compose(S, "MultipleHandled")
```

### ReadOnlyFiles

```jsx
/* Read Only Files */ compose(S, "ReadOnlyFiles")
```

### PdfAndTxtOnly

```jsx
/* Pdf And Txt Only */ compose(S, "PdfAndTxtOnly")
```

### SizeLimited

```jsx
/* Size Limited */ compose(S, "SizeLimited")
```

### ExtensionAndSizeLimit

```jsx
/* Extension And Size Limit */ compose(S, "ExtensionAndSizeLimit")
```

### ControlledClearing

```jsx
/* Controlled Clearing */ compose(S, "ControlledClearing")
```
