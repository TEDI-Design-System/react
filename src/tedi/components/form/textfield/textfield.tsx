import cn from 'classnames';
import React, { forwardRef, useCallback, useMemo } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon, IconWithoutBackgroundProps } from '../../base/icon/icon';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import Separator from '../../misc/separator/separator';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import { Field, FieldElement } from '../field/field';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import { useOptionalInputGroup } from '../input-group/input-group';
import styles from './textfield.module.scss';

const iconSizes = {
  large: 24,
  default: 18,
} as const;

type TextFieldBreakpointProps = {
  /**
   * Controls the visual size of the text field.
   *
   * - `'small'`  → Compact version (smaller height, padding, and font size)
   * - `'default'` → Standard size (most commonly used)
   * - `'large'`   → Larger touch target, bigger text and padding
   *
   * @default 'default'
   */
  size?: 'default' | 'small' | 'large';
  /**
   * Icon displayed inside the text field on the right side.
   *
   * Accepts either:
   * - A simple string (icon name) → e.g. `'search'`, `'user'`, `'calendar'`
   * - A full `IconWithoutBackgroundProps` object for advanced configuration (size, color, className, etc.)
   *
   * When `onIconClick` is provided, the icon becomes a clickable button.
   * Otherwise, it is rendered as a non-interactive decorative element.
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * If `true`, renders a `<textarea>` instead of a regular `<input>`.
   * Useful for multi-line text input (comments, descriptions, addresses, etc.).
   *
   * Note: When using `isTextArea`, the component still behaves like a text field
   * (same styling, clear button, icon support, validation, etc.).
   *
   * @default false
   */
  isTextArea?: boolean;
  /**
   * Placeholder text shown when the field is empty.
   *
   * Recommended to be short and descriptive. Avoid using placeholder as a label.
   */
  placeholder?: string;
  /**
   * When `true`, displays a clear (×) button on the right side when the field has a value.
   *
   * Clicking the button clears the input and calls `onClear` (if provided).
   *
   * @default false
   */
  isClearable?: boolean;
  /**
   * Additional CSS class name applied to the root container (`<div>`).
   *
   * Use this for layout adjustments, custom spacing, or theming the entire text field wrapper.
   */
  className?: string;
};

export interface TextFieldProps
  extends BreakpointSupport<TextFieldBreakpointProps>,
    Omit<FormLabelProps, 'size' | 'id' | 'label'> {
  /**
   * Unique identifier for the text field.
   *
   * Required for accessibility (associates label, helper text, and input).
   * Also used to generate `aria-describedby` and helper IDs automatically.
   */
  id?: string;
  /**
   * The text or React node that serves as the label for the text field.
   * If `hideLabel` is `true`, the label will be visually hidden but still accessible to screen readers.
   * If `hideLabel` is `'keep-space'`, the label will be hidden but the space it occupies will be preserved.
   */
  label?: React.ReactNode;
  /**
   * Name attribute for the underlying input/textarea element.
   *
   * Important for form submission and integration with form libraries (React Hook Form, Formik, etc.).
   */
  name?: string;
  /**
   * Custom CSS class applied directly to the `<input>` or `<textarea>` element (via the internal `Field` component).
   *
   * Use this when you need to style the input itself (e.g. text alignment, font, custom focus styles).
   *
   * Note: The root container uses `className`.
   */
  inputClassName?: string;
  /**
   * Callback fired when the value changes. Receives the new value as a plain string.
   *
   * Preferred for most use cases (simpler than `onChangeEvent`).
   *
   * @param value - The current value of the field after change
   */
  onChange?: (value: string) => void;
  /**
   * Native `onChange` event handler.
   *
   * Gives you access to the full `ChangeEvent` object (useful if you need `event.target`, `event.preventDefault()`, etc.).
   *
   * Note: Both `onChange` and `onChangeEvent` are called when the value changes.
   */
  onChangeEvent?: React.ChangeEventHandler<FieldElement>;
  /**
   * Keyboard event handlers attached to the inner wrapper `<div>`.
   *
   * Useful for handling Enter key submission, arrow key navigation, or custom keyboard shortcuts.
   *
   * Note: These are **not** attached to the input/textarea directly, but to the surrounding container.
   */
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Key-down handler attached to the field's surrounding container (not the input directly).
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Key-up handler attached to the field's surrounding container (not the input directly).
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Default value for **uncontrolled** usage.
   *
   * Use this when you don't want to manage state yourself.
   * The component will manage its internal state.
   */
  defaultValue?: string;
  /**
   * Controlled value of the text field.
   *
   * When provided, the component becomes **fully controlled**.
   * You must update this value via `onChange` to reflect user input.
   */
  value?: string;
  /**
   * Called when the user clicks on the icon (only works if `icon` is provided).
   *
   * The icon is automatically wrapped in a `<button>` when this prop is present.
   *
   * @param event - Mouse event from the icon wrapper
   */
  onIconClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /**
   * Extra HTML attributes spread on the icon `<button>` element.
   *
   * Use this to wire ARIA state (e.g. `aria-expanded`, `aria-controls`,
   * `aria-haspopup`) directly to the icon trigger, so screen readers announce
   * disclosure state correctly when the icon opens a popover / dialog.
   *
   * Only applied when `onIconClick` is set (i.e. the icon is rendered as a
   * `<button>`).
   */
  iconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /**
   * Click handler for the entire inner container (the area around the input).
   *
   * Can be used to focus the input when clicking anywhere in the field area,
   * or to trigger custom behavior.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Disables the entire text field.
   *
   * When `true`:
   * - Input becomes non-editable and non-focusable
   * - Clear button and icon are disabled
   * - Visual disabled styles are applied
   */
  disabled?: boolean;
  /**
   * Marks the field as invalid and triggers error styling.
   *
   * Also affects `aria-invalid` attribute.
   *
   * Note: The `helper` prop can override this if it contains items with `type: 'error'`.
   */
  invalid?: boolean;
  /**
   * Makes the field read-only.
   *
   * User can focus and select text, but cannot modify the value.
   * Useful for pre-filled data that should not be changed.
   */
  readOnly?: boolean;
  /**
   * Helper text, success message, or error message displayed below the field.
   *
   * Accepts either:
   * - A single `FeedbackTextProps` object
   * - An array of `FeedbackTextProps` (useful for multiple messages or mixed error/success states)
   *
   * The component automatically detects error states from helper items.
   */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /**
   * Fired when the input/textarea receives focus.
   */
  onFocus?: React.FocusEventHandler<FieldElement>;
  /**
   * Fired when the input/textarea loses focus.
   */
  onBlur?: React.FocusEventHandler<FieldElement>;
  /**
   * Hides the spinner/arrows for number inputs (`type="number"`).
   *
   * Only has effect when the underlying input has `type="number"`.
   *
   * @default true
   */
  isArrowsHidden?: boolean;
  /**
   * Callback fired when the clear button (×) is clicked.
   *
   * Useful if you need to perform additional actions besides clearing the value
   * (e.g. analytics, resetting related fields, etc.).
   *
   * Note: The field value is automatically cleared regardless of this callback.
   */
  onClear?: () => void;
  /**
   * Additional attributes for the input element.
   */
  input?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /**
   * Optional start slot element to render inside the input container, before the input field.
   */
  startSlot?: React.ReactNode;
  /**
   * Optional end slot element to render inside the input container, after the input field.
   */
  endSlot?: React.ReactNode;
}

export interface TextFieldForwardRef {
  input: FieldElement | null;
  inner: HTMLDivElement | null;
}

export const TextField = forwardRef<TextFieldForwardRef, TextFieldProps>((props, ref) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);

  const {
    id,
    label,
    className,
    inputClassName,
    disabled,
    required,
    hideLabel,
    invalid,
    readOnly,
    icon,
    onIconClick,
    iconButtonProps,
    size = 'default',
    placeholder,
    isArrowsHidden = true,
    isClearable,
    onClear,
    onChange,
    onChangeEvent,
    onKeyUp,
    onKeyDown,
    onKeyPress,
    defaultValue,
    value: externalValue,
    onFocus,
    onBlur,
    onClick,
    helper,
    input,
    name,
    isTextArea,
    startSlot,
    endSlot,
    ...rest
  } = getCurrentBreakpointProps<TextFieldProps>(props) || {};

  const { getLabel } = useLabels();

  const innerRef = React.useRef<HTMLDivElement>(null);
  const fieldRef = React.useRef<FieldElement>(null);

  const [innerValue, setInnerValue] = React.useState(externalValue ?? defaultValue ?? '');

  const value = externalValue ?? innerValue;
  const showClearButton = Boolean(isClearable && value && !readOnly);

  const inputGroup = useOptionalInputGroup?.();
  const generatedId = React.useId();
  const shouldHideLabel = inputGroup?.hasExternalLabel;
  const resolvedId = props.id ?? inputGroup?.inputId ?? generatedId;

  React.useImperativeHandle(ref, () => ({
    get input() {
      return fieldRef.current;
    },
    get inner() {
      return innerRef.current;
    },
  }));

  const isInvalid = useMemo((): boolean => {
    if (Array.isArray(helper)) {
      return invalid || helper.some((h) => h.type === 'error');
    }
    return invalid || helper?.type === 'error';
  }, [invalid, helper]);

  const isValid = useMemo((): boolean => {
    if (!helper || (Array.isArray(helper) && helper.length === 0)) return false;
    if (Array.isArray(helper)) {
      return !invalid && helper.every((h) => h.type === 'valid');
    }
    return !invalid && helper.type === 'valid';
  }, [invalid, helper]);

  const labelSize = size === 'large' ? 'default' : size;
  const isControlled = externalValue !== undefined;

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) setInnerValue(newValue);
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const clearInput = useCallback(() => {
    if (!isControlled) setInnerValue('');
    onChange?.('');
    onClear?.();
  }, [isControlled, onChange, onClear]);

  const renderIcon = useCallback(() => {
    if (!icon) return null;

    const isInteractiveIcon = Boolean(onIconClick);
    const smallIconSize = isInteractiveIcon ? 18 : 16;
    const defaultIconProps: Partial<IconWithoutBackgroundProps> = {
      size: size === 'large' ? 24 : size === 'small' ? smallIconSize : 18,
      className: styles['tedi-textfield__icon'],
    };

    const iconProps: IconWithoutBackgroundProps =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon.className) };

    if (onIconClick) {
      return (
        <button
          type="button"
          {...iconButtonProps}
          className={cn(styles['tedi-textfield__icon-wrapper'], iconButtonProps?.className)}
          onClick={disabled ? undefined : onIconClick}
          disabled={disabled}
        >
          <Icon {...iconProps} />
        </button>
      );
    }

    return (
      <div className={styles['tedi-textfield__icon-wrapper']} aria-hidden="true">
        <Icon {...iconProps} />
      </div>
    );
  }, [icon, size, onIconClick, iconButtonProps, disabled]);

  const renderClearButton = useMemo(() => {
    if (!showClearButton) return null;

    return (
      <ClosingButton
        iconSize={iconSizes[size === 'large' ? 'large' : 'default']}
        onClick={disabled ? undefined : clearInput}
        disabled={disabled}
        title={getLabel('clear')}
        className={styles['tedi-textfield__clear-button']}
      />
    );
  }, [showClearButton, size, disabled, clearInput, getLabel]);

  const renderRightArea = useMemo(() => {
    if (!showClearButton && !icon) return null;

    return (
      <div className={styles['tedi-textfield__right-area']}>
        {renderClearButton}
        {showClearButton && icon && (
          <Separator color="primary" axis="vertical" className={styles['tedi-textfield__separator']} />
        )}
        {icon && renderIcon()}
      </div>
    );
  }, [showClearButton, icon, renderClearButton, renderIcon]);

  const renderInputElement = (
    <Field
      {...input}
      id={resolvedId}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onChangeEvent={onChangeEvent}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      invalid={isInvalid}
      placeholder={placeholder}
      className={cn(styles['tedi-textfield__input'], inputClassName, {
        [styles['tedi-textfield__input--hidden-arrows']]: isArrowsHidden,
      })}
      onFocus={(e) => {
        (input?.onFocus as React.FocusEventHandler<FieldElement> | undefined)?.(e);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        (input?.onBlur as React.FocusEventHandler<FieldElement> | undefined)?.(e);
        onBlur?.(e);
      }}
      isTextArea={isTextArea}
      aria-describedby={
        !helper || (Array.isArray(helper) && helper.length === 0)
          ? undefined
          : Array.isArray(helper)
          ? helper.map((_, index) => `${resolvedId}-helper-${index}`).join(' ')
          : `${resolvedId}-helper`
      }
      aria-label={hideLabel && typeof label === 'string' ? label : undefined}
      ref={fieldRef}
    />
  );

  const TextFieldBEM = cn(
    styles['tedi-textfield'],
    { [styles[`tedi-textfield--${size}`]]: size },
    { [styles['tedi-textfield--with-icon']]: icon },
    { [styles['tedi-textfield--invalid']]: isInvalid },
    { [styles['tedi-textfield--valid']]: isValid },
    { [styles['tedi-textfield--clearable']]: showClearButton },
    className
  );

  const renderFeedback = () => {
    if (!helper || (Array.isArray(helper) && helper.length === 0)) return null;

    return (
      <div className={styles['tedi-textfield__feedback-wrapper']}>
        {Array.isArray(helper) ? (
          helper.map((item, index) => <FeedbackText key={index} {...item} id={`${resolvedId}-helper-${index}`} />)
        ) : (
          <FeedbackText {...helper} id={`${resolvedId}-helper`} />
        )}
      </div>
    );
  };

  return (
    <div data-name="textfield" {...rest} className={TextFieldBEM}>
      {!shouldHideLabel && (
        <FormLabel id={resolvedId} label={label} required={required} hideLabel={hideLabel} size={labelSize} />
      )}

      <div
        className={styles['tedi-textfield__inner']}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onClick={onClick}
        ref={innerRef}
      >
        {startSlot}
        {renderInputElement}
        {endSlot}
        {(isClearable || icon) && renderRightArea}
      </div>

      {renderFeedback()}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
