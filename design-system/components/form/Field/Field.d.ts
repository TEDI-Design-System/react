import * as React from 'react';

/**
 * Field — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/field/field.stories.tsx).
 */
export interface FieldProps {
  /** Unique identifier for the field element. */
  id?: string;
  /** Name attribute used in forms and form submissions. */
  name?: string;
  /** Controlled value of the field. */
  value?: string;
  /** The type of the input element (e.g. 'text', 'email', 'password', 'number', 'tel', 'url', etc.). **Note**: This prop is ignored when `isTextArea={true}`. */
  type?: unknown;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Callback fired when value changes (returns string value only). */
  onChange?: (value: string) => void;
  /** Native change event callback (full event access). */
  onChangeEvent?: React.ChangeEventHandler<FieldElement>;
  /** Disables the field and prevents user interaction. */
  disabled?: boolean;
  /** Makes the field read-only (user cannot edit but can focus/select). */
  readOnly?: boolean;
  /** Marks the field as required in form validation. */
  required?: boolean;
  /** Marks the field visually and semantically as invalid. */
  invalid?: boolean;
  /** Placeholder text displayed when the field is empty. */
  placeholder?: string;
  /** Custom CSS class for the input/textarea element. */
  className?: string;
  /** ARIA description reference (used for helper/error text association). */
  "aria-describedby"?: string;
  /** Accessible label for screen readers when no visible label exists. */
  "aria-label"?: string;
  /** Focus event handler. */
  onFocus?: React.FocusEventHandler<FieldElement>;
  /** Blur event handler. */
  onBlur?: React.FocusEventHandler<FieldElement>;
  /** Renders a textarea instead of an input element. */
  isTextArea?: boolean;
  /** Native input element props override (input only). */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Native textarea element props override (textarea only). */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export declare const Field: React.ComponentType<FieldProps>;
