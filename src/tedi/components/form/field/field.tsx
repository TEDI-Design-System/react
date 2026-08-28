import cn from 'classnames';
import React, { forwardRef } from 'react';

import { useOptionalInputGroup } from '../input-group/input-group';
import styles from './field.module.scss';

export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface FieldProps {
  /**
   * Unique identifier for the field element.
   */
  id?: string;
  /**
   * Name attribute used in forms and form submissions.
   */
  name?: string;
  /**
   * Controlled value of the field.
   */
  value?: string;
  /**
   * The type of the input element (e.g. 'text', 'email', 'password', 'number', 'tel', 'url', etc.).
   *
   * **Note**: This prop is ignored when `isTextArea={true}`.
   * @default 'text'
   */
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  /**
   * Default value for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Callback fired when value changes (returns string value only).
   */
  onChange?: (value: string) => void;
  /**
   * Native change event callback (full event access).
   */
  onChangeEvent?: React.ChangeEventHandler<FieldElement>;
  /**
   * Disables the field and prevents user interaction.
   */
  disabled?: boolean;
  /**
   * Makes the field read-only (user cannot edit but can focus/select).
   */
  readOnly?: boolean;
  /**
   * Marks the field as required in form validation.
   */
  required?: boolean;
  /**
   * Marks the field visually and semantically as invalid.
   */
  invalid?: boolean;
  /**
   * Placeholder text displayed when the field is empty.
   */
  placeholder?: string;
  /**
   * Custom CSS class for the input/textarea element.
   */
  className?: string;
  /**
   * ARIA description reference (used for helper/error text association).
   */
  'aria-describedby'?: string;
  /**
   * Accessible label for screen readers when no visible label exists.
   */
  'aria-label'?: string;
  /**
   * Focus event handler.
   */
  onFocus?: React.FocusEventHandler<FieldElement>;
  /**
   * Blur event handler.
   */
  onBlur?: React.FocusEventHandler<FieldElement>;
  /**
   * Renders a textarea instead of an input element.
   */
  isTextArea?: boolean;
  /**
   * Native input element props override (input only).
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Native textarea element props override (textarea only).
   */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const Field = forwardRef<FieldElement, FieldProps>((props, ref) => {
  const {
    id,
    name,
    value: externalValue,
    type,
    defaultValue,
    onChange,
    onChangeEvent,
    disabled,
    readOnly,
    required,
    invalid,
    placeholder,
    className: userClassName,
    onFocus,
    onBlur,
    isTextArea,
    inputProps,
    textareaProps,
    ...rest
  } = props;

  const innerRef = React.useRef<FieldElement | null>(null);

  const [innerValue, setInnerValue] = React.useState(externalValue ?? defaultValue ?? '');

  const value = externalValue ?? innerValue;

  React.useImperativeHandle(ref, () => innerRef.current as FieldElement);

  const handleChange: React.ChangeEventHandler<FieldElement> = (e) => {
    const newValue = e.currentTarget.value;
    setInnerValue(newValue);
    onChange?.(newValue);
    onChangeEvent?.(e);
  };

  const inputGroup = useOptionalInputGroup?.();
  const generatedId = React.useId();
  const resolvedId = props.id ?? inputGroup?.inputId ?? generatedId;

  const finalClassName = cn(styles['tedi-field'], userClassName);

  const sharedProps = {
    ...rest,
    id: resolvedId,
    name,
    value,
    placeholder,
    disabled,
    readOnly,
    required,
    'aria-invalid': invalid || undefined,
    onChange: handleChange,
    onFocus,
    onBlur,
    className: finalClassName,
    ref: innerRef,
  };

  if (isTextArea) {
    return <textarea {...textareaProps} {...sharedProps} ref={innerRef as React.Ref<HTMLTextAreaElement>} />;
  }

  return <input {...inputProps} {...sharedProps} type={type} ref={innerRef as React.Ref<HTMLInputElement>} />;
});

Field.displayName = 'Field';
