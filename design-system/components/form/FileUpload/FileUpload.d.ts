import * as React from 'react';

/**
 * FileUpload — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/file-upload/file-upload.stories.tsx).
 */
export interface FileUploadProps {
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

// Referenced types, resolved one level deep (see the story source for the rest).
interface FeedbackTextProps {
    /**
     * Helper text
     */
    text: React.ReactNode | React.ReactNode[];
    /**
     * ID to reference the helper from aria-describedby attributes.
     * If omitted, then the id might be set through a parent component.
     */
    id?: string;
    /**
     * Additional custom class.
     */
    className?: string;
    /**
     * Type of form-helper.
     * @default hint
     */
    type?: FeedbackTextType;
    /**
     * Position of the helper.
     * @default left
     */
    position?: FeedbackTextPosition;
}

interface FileUploadFile extends Partial<File> {
    /**
     * A unique identifier for the file, useful for tracking files in a list.
     */
    id?: string;
    /**
     * Indicates if the file is currently being uploaded.
     */
    isLoading?: boolean;
    /**
     * Specifies whether the file passed validation checks (e.g., size, extension).
     */
    isValid?: boolean;
}

export declare const FileUpload: React.ComponentType<FileUploadProps>;
