import cn from 'classnames';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import { FormLabel, FormLabelProps } from '../form-label/form-label';
import styles from './number-field.module.scss';

type TDirection = 'increment' | 'decrement';

type NumberFieldBreakpointProps = {
  /**
   * Text displayed after the input value, typically a unit.
   */
  suffix?: string;
  /**
   * Whether the number field occupies the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Helper text displayed below the input.
   */
  helper?: FeedbackTextProps;
  /**
   * Step size for incrementing or decrementing the value.
   * @default 1
   */
  step?: number;
  /**
   * Additional attributes for the underlying input element.
   */
  input?: React.InputHTMLAttributes<HTMLInputElement>;
};

export interface NumberFieldProps extends BreakpointSupport<NumberFieldBreakpointProps>, FormLabelProps {
  /**
   * Initial value of the input field.
   */
  defaultValue?: number;
  /**
   * Controlled value of the input field. Overrides defaultValue.
   */
  value?: number;
  /**
   * Callback fired when the input value changes.
   */
  onChange?: (value: number) => void;
  /**
   * Specifies the input mode for the field (e.g., numeric or decimal).
   * Defaults to `'decimal'` when `decimalPlaces > 0` or `decimalSeparator === ','`,
   * otherwise numeric.
   */
  inputMode?: 'numeric' | 'decimal';
  /**
   * Number of decimal places for rounding calculations.
   */
  decimalPlaces?: number;
  /**
   * Character used as the decimal separator when displaying the value.
   * Both `.` and `,` are always accepted as input regardless of this setting.
   * @default .
   */
  decimalSeparator?: '.' | ',';
  /**
   * Minimum allowed value. Disables decrementing below this value and restricts manual input.
   */
  min?: number;
  /**
   * Maximum allowed value. Disables incrementing above this value and restricts manual input.
   */
  max?: number;
  /**
   * Disables the input field.
   */
  disabled?: boolean;
  /**
   * Marks the field as invalid for validation purposes.
   */
  invalid?: boolean;
}

export const NumberField = (props: NumberFieldProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    id,
    label,
    hideLabel,
    required,
    className,
    size,
    inputMode,
    decimalPlaces,
    decimalSeparator = '.',
    min,
    max,
    step = 1,
    defaultValue,
    value,
    onChange,
    suffix,
    fullWidth = false,
    disabled = false,
    invalid = false,
    helper,
    input,
  } = getCurrentBreakpointProps<NumberFieldProps>(props);

  const resolvedInputMode =
    inputMode ?? ((decimalPlaces && decimalPlaces > 0) || decimalSeparator === ',' ? 'decimal' : 'numeric');

  const formatNumber = useCallback(
    (num: number): string => (decimalSeparator === ',' ? String(num).replace('.', ',') : String(num)),
    [decimalSeparator]
  );

  const { getLabel } = useLabels();

  const inputRef = useRef<HTMLInputElement>(null);
  const isFocusedRef = useRef(false);

  const [inputUpdated, setInputUpdated] = useState<string>('');
  const [inputInnerValue, setInputInnerValue] = useState<number>(defaultValue ?? 0);
  const [displayValue, setDisplayValue] = useState<string>(() =>
    formatNumber(value !== undefined ? value : defaultValue ?? 0)
  );

  const getCurrentValue = useMemo(
    (): number => (onChange && typeof value !== 'undefined' ? value : inputInnerValue),
    [onChange, value, inputInnerValue]
  );

  useEffect(() => {
    if (!isFocusedRef.current && typeof value !== 'undefined') {
      setDisplayValue(formatNumber(value));
    }
  }, [value, formatNumber]);

  const helperId = helper ? `${id}-helper` : undefined;

  const isInvalid = useCallback(
    (currentValue: number): boolean => {
      const isBelowMinValue = Boolean(min !== undefined && currentValue < min);
      const isAboveMaxValue = Boolean(max !== undefined && currentValue > max);
      return invalid || isBelowMinValue || isAboveMaxValue || helper?.type === 'error';
    },
    [invalid, helper, max, min]
  );

  const forceToLimits = (currentValue: number) => {
    return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, currentValue));
  };

  const updateValueUpdatedLabel = (newValue: number) => {
    const valueUpdated = getLabel('numberField.quantityUpdated', newValue);

    setInputUpdated(valueUpdated);
    setTimeout(() => {
      setInputUpdated('');
    }, 5000);
  };

  const roundValue = (currentValue: number) => {
    return decimalPlaces !== undefined ? parseFloat(currentValue.toFixed(decimalPlaces)) : currentValue;
  };

  const handleButtonClick = (direction: TDirection) => {
    let returnValue = getCurrentValue;

    if (direction === 'increment') {
      returnValue = returnValue + step;
    }
    if (direction === 'decrement') {
      returnValue = returnValue - step;
    }

    returnValue = forceToLimits(returnValue);
    returnValue = roundValue(returnValue);

    updateValueUpdatedLabel(returnValue);
    onChange?.(returnValue);
    setInputInnerValue(returnValue);
    setDisplayValue(formatNumber(returnValue));
  };

  const handleInputChange = ({ currentTarget: { value: rawValue } }: ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(rawValue);

    const normalized = rawValue.replace(',', '.');
    const parsed = rawValue === '' ? 0 : parseFloat(normalized);

    if (!Number.isNaN(parsed)) {
      const clamped = forceToLimits(parsed);
      const rounded = roundValue(clamped);
      onChange?.(rounded);
      setInputInnerValue(rounded);
    }
  };

  const handleFocus = () => {
    isFocusedRef.current = true;
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    setDisplayValue(formatNumber(getCurrentValue));
  };

  const renderButton = (direction: TDirection) => {
    const isOnOrOutOfBounds =
      direction === 'increment'
        ? max !== undefined && getCurrentValue >= max
        : min !== undefined && getCurrentValue <= min;

    const ButtonBEM = cn(styles['tedi-number-field__button'], styles[`tedi-number-field__button--${direction}`], {
      [styles['tedi-number-field__button--disabled']]: isOnOrOutOfBounds || disabled,
    });

    const changeValue = getLabel(`numberField.${direction}`, step);

    return (
      <Button
        aria-label={changeValue}
        onClick={() => handleButtonClick(direction)}
        disabled={isOnOrOutOfBounds || disabled}
        visualType="secondary"
        className={ButtonBEM}
        icon={{ name: direction === 'increment' ? 'add' : 'remove' }}
        size={size === 'small' ? 'small' : undefined}
      >
        {direction === 'increment' ? '+' : '-'}
      </Button>
    );
  };

  const renderInputElement = () => {
    const InputWrapperBEM = cn(styles['tedi-number-field__input-wrapper'], {
      [styles['tedi-number-field__input-wrapper--with-suffix']]: suffix,
      [styles['tedi-number-field__input-wrapper--full-width']]: fullWidth,
    });

    const InputBEM = cn(styles['tedi-number-field__input'], input?.className);
    const focusInput = () => inputRef?.current?.focus();

    return (
      <div className={InputWrapperBEM} onClick={focusInput}>
        <input
          ref={inputRef}
          id={id}
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={getCurrentValue}
          aria-describedby={helperId}
          aria-invalid={isInvalid(getCurrentValue) ? 'true' : 'false'}
          type="text"
          inputMode={resolvedInputMode}
          value={displayValue}
          required={required}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={InputBEM}
          {...input}
        />
        {suffix && (
          <Text element="span" modifiers="small" color="tertiary" className={styles['tedi-number-field__suffix']}>
            {suffix}
          </Text>
        )}
      </div>
    );
  };

  const NumberFieldBem = cn(
    styles['tedi-number-field'],
    { [styles['tedi-number-field--invalid']]: isInvalid(getCurrentValue) },
    { [styles['tedi-number-field--disabled']]: disabled },
    { [styles['tedi-number-field--small']]: size === 'small' },
    className
  );

  return (
    <div data-name="number-field" className={className}>
      <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} size={size} />
      <div className={NumberFieldBem}>
        {renderButton('decrement')}
        {renderInputElement()}
        {renderButton('increment')}
      </div>
      {helper && <FeedbackText className={styles['tedi-number-field__feedback']} {...helper} id={helperId} />}
      {inputUpdated && (
        <div aria-live="polite" className="sr-only">
          {inputUpdated}
        </div>
      )}
    </div>
  );
};

NumberField.displayName = 'NumberField';

export default NumberField;
