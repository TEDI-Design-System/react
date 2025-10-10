import cn from 'classnames';
import React, { forwardRef } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon, IconWithoutBackgroundProps } from '../../base/icon/icon';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import Separator from '../../misc/separator/separator';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './textfield.module.scss';

type TextFieldBreakpointProps = {
  /**
   * Input field size
   * @default 'default'
   */
  size?: 'default' | 'small' | 'large';
  /**
   * Icon name or configuration for the input field.
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Whether to render a textarea instead of an input.
   */
  isTextArea?: boolean;
  /**
   * Placeholder text displayed inside the input.
   */
  placeholder?: string;
  /**
   * Whether the input includes a clear button.
   */
  isClearable?: boolean;
  /**
   * Custom CSS classes for the container.
   */
  className?: string;
};

export interface TextFieldProps extends BreakpointSupport<TextFieldBreakpointProps>, Omit<FormLabelProps, 'size'> {
  /**
   * Unique identifier for the input field.
   */
  id: string;
  /**
   * Name attribute for the input element.
   */
  name?: string;
  /**
   * Custom CSS classes for the input element.
   */
  inputClassName?: string;
  /**
   * Callback triggered when the input value changes.
   */
  onChange?: (value: string) => void;
  /**
   * Callback triggered with the change event.
   */
  onChangeEvent?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Callback for keypress events.
   */
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Callback for keydown events.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Callback for keyup events.
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Initial default value of the input.
   */
  defaultValue?: string;
  /**
   * Controlled value of the input field.
   */
  value?: string;
  /**
   * Callback for clicking the icon.
   */
  onIconClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /**
   * Callback for input container clicks.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the input is marked as invalid.
   */
  invalid?: boolean;
  /**
   * Whether the input is read-only.
   */
  readOnly?: boolean;
  /**
   * Helper text or feedback messages.
   */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /**
   * Callback for input focus events.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Callback for input blur events.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Whether to hide arrows for number inputs.
   * @default true
   */
  isArrowsHidden?: boolean;
  /**
   * Callback triggered when the clear button is clicked.
   */
  onClear?: () => void;
  /**
   * Additional attributes for the input element.
   */
  input?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export interface TextFieldForwardRef {
  input: HTMLInputElement | HTMLTextAreaElement | null;
  inner: HTMLDivElement | null;
}

export const TextField = forwardRef<TextFieldForwardRef, TextFieldProps>((props, ref): JSX.Element => {
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
    size,
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
    ...rest
  } = getCurrentBreakpointProps<TextFieldProps>(props) || {};
  const { getLabel } = useLabels();
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [innerValue, setInnerValue] = React.useState(externalValue ?? defaultValue ?? '');
  const helperId = React.useMemo(() => {
    if (!helper) return undefined;

    if (Array.isArray(helper)) {
      return helper[0]?.id ?? `${id}-helper`;
    }

    return helper.id ?? `${id}-helper`;
  }, [helper, id]);

  const value = React.useMemo(() => externalValue ?? innerValue, [externalValue, innerValue]);
  const showClearButton = isClearable && value;

  React.useImperativeHandle(ref, () => ({
    get input() {
      return inputRef.current;
    },
    get inner() {
      return innerRef.current;
    },
  }));

  const isInvalid = React.useMemo((): boolean => {
    if (Array.isArray(helper)) {
      return invalid || helper.some((h) => h.type === 'error');
    }
    return invalid || helper?.type === 'error';
  }, [invalid, helper]);

  const isValid = React.useMemo((): boolean => {
    if (!helper || (Array.isArray(helper) && helper.length === 0)) {
      return false;
    }

    if (Array.isArray(helper)) {
      return !invalid && helper.every((h) => h.type === 'valid');
    }

    return !invalid && helper.type === 'valid';
  }, [invalid, helper]);

  const labelSize = size === 'large' ? 'default' : size;

  const getIcon = React.useCallback(
    (icon: string | IconWithoutBackgroundProps): JSX.Element => {
      const defaultIconProps: Partial<IconWithoutBackgroundProps> = {
        size: size === 'large' ? 24 : size === 'small' ? 16 : 18,
        className: cn(styles['tedi-textfield__icon']),
      };
      const iconProps: IconWithoutBackgroundProps =
        typeof icon === 'string'
          ? { ...defaultIconProps, name: icon }
          : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon?.className) };
      const iconComponent = <Icon {...iconProps} />;
      const WrapperElement = onIconClick ? 'button' : 'div';

      return (
        <WrapperElement
          className={styles['tedi-textfield__icon-wrapper']}
          type={onIconClick ? 'button' : undefined}
          onClick={disabled ? undefined : onIconClick}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          {iconComponent}
        </WrapperElement>
      );
    },
    [disabled, onIconClick, size]
  );

  const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = React.useCallback(
    (event) => {
      const newValue = event.currentTarget.value;
      setInnerValue(newValue);
      onChange?.(newValue);
      onChangeEvent?.(event);
    },
    [onChange, onChangeEvent]
  );

  const clearInput = React.useCallback(() => {
    setInnerValue('');
    onChange?.('');
    onClear?.();
  }, [onChange, onClear]);

  const isTextAreaRef = React.useCallback(
    (
      props: TextFieldProps,
      ref: React.ForwardedRef<any> // eslint-disable-line  @typescript-eslint/no-explicit-any
    ): ref is React.ForwardedRef<HTMLTextAreaElement> => {
      return !!isTextArea;
    },
    [isTextArea]
  );

  const isInputRef = React.useCallback(
    (
      props: TextFieldProps,
      ref: React.ForwardedRef<any> // eslint-disable-line  @typescript-eslint/no-explicit-any
    ): ref is React.ForwardedRef<HTMLInputElement> => {
      return !isTextArea;
    },
    [isTextArea]
  );

  const renderInputElement = React.useMemo((): JSX.Element | null => {
    const sharedProps = {
      ...input,
      id,
      name,
      ...(hideLabel ? { 'aria-label': label } : {}),
      'aria-describedby': helperId,
      'aria-disabled': disabled || undefined,
      className: cn(styles['tedi-textfield__input'], inputClassName, {
        [styles['tedi-textfield__input--hidden-arrows']]: isArrowsHidden,
      }),
      disabled,
      required,
      'aria-invalid': isInvalid || undefined,
      placeholder,
      readOnly,
      onChange: onChangeHandler,
      value,
      onBlur,
      onFocus,
    };

    if (isTextAreaRef(props, inputRef)) {
      return <textarea {...(sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} ref={inputRef} />;
    }

    if (isInputRef(props, inputRef)) {
      return <input {...(sharedProps as React.InputHTMLAttributes<HTMLInputElement>)} ref={inputRef} />;
    }

    return null;
  }, [
    input,
    id,
    name,
    hideLabel,
    label,
    helperId,
    disabled,
    inputClassName,
    isArrowsHidden,
    required,
    isInvalid,
    placeholder,
    readOnly,
    onChangeHandler,
    value,
    onBlur,
    onFocus,
    isTextAreaRef,
    props,
    isInputRef,
  ]);

  const renderClearButton = React.useMemo(() => {
    const clearButtonProps = {
      size: (size === 'large' ? 'large' : 'medium') as 'medium' | 'large',
      onClick: disabled ? () => {} : clearInput,
      disabled,
      'aria-disabled': disabled || undefined,
      title: `${getLabel('clear')}`,
      className: cn(styles['tedi-textfield__clear-button']),
    };

    return <ClosingButton {...clearButtonProps} />;
  }, [clearInput, disabled, getLabel, size]);

  const renderRightArea = React.useMemo(() => {
    return (
      <div className={styles['tedi-textfield__right-area']}>
        {showClearButton && renderClearButton}
        {showClearButton && icon ? (
          <Separator color="primary" axis="vertical" className={styles['tedi-textfield__separator']} />
        ) : null}
        {icon && getIcon(icon)}
      </div>
    );
  }, [getIcon, icon, renderClearButton, showClearButton]);

  const TextFieldBEM = cn(
    styles['tedi-textfield'],
    { [styles[`tedi-textfield--${size}`]]: size },
    { [styles['tedi-textfield--with-icon']]: icon },
    { [styles['tedi-textfield--invalid']]: isInvalid },
    { [styles['tedi-textfield--valid']]: isValid },
    { [styles['tedi-textfield--clearable']]: showClearButton },
    className
  );

  const renderFeedbackWrapper = () => {
    if (!helper || (Array.isArray(helper) && helper.length === 0)) {
      return null;
    }

    return (
      <div className={styles['tedi-textfield__feedback-wrapper']}>
        {Array.isArray(helper) ? (
          helper.map((item, index) => <FeedbackText key={index} {...item} id={`${helperId}-${index}`} />)
        ) : (
          <FeedbackText {...helper} id={helperId} />
        )}
      </div>
    );
  };

  return (
    <div data-name="textfield" {...rest} className={TextFieldBEM}>
      <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} size={labelSize} />
      <div
        className={styles['tedi-textfield__inner']}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onClick={onClick}
        tabIndex={disabled ? -1 : 0}
        ref={innerRef}
      >
        {renderInputElement}
        {isClearable || icon ? renderRightArea : null}
      </div>
      {renderFeedbackWrapper()}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
