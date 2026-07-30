import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../helpers';
import { ChoiceInputCardVariant, ChoiceInputVariant } from '../../choice-input.types';
import FeedbackText, { FeedbackTextProps } from '../../feedback-text/feedback-text';
import styles from './radio-group.module.scss';
import { RadioGroupContext, RadioGroupContextValue } from './radio-group-context';

interface RadioGroupBreakpointProps {
  /** Group id. When omitted a stable id is generated. */
  id?: string;
  /**
   * Shared `name` for the radios. When omitted a stable name is generated so the
   * group still behaves as a single native radio group.
   */
  name?: string;
  /** Group label, rendered as the fieldset legend. */
  label: React.ReactNode;
  /** Visually hide the legend while keeping it available to screen readers. */
  hideLabel?: boolean;
  /** Helper / feedback text rendered below the group. */
  helper?: FeedbackTextProps;
  className?: string;
  /** Controlled selected value. Pair with `onChange`. */
  value?: string | null;
  /** Uncontrolled initial selected value. */
  defaultValue?: string | null;
  /** Fires with the newly selected value. */
  onChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Size forwarded to every radio. @default 'default' */
  size?: 'default' | 'large';
  /** Visual variant forwarded to every radio. @default 'default' */
  variant?: ChoiceInputVariant;
  /** Card colour variant forwarded to every radio (only applies to `variant="card"`). @default 'primary' */
  cardVariant?: ChoiceInputCardVariant;
  /** Layout direction of the radios. Defaults to `row` for cards, `column` otherwise. */
  direction?: 'row' | 'column';
  /**
   * Card layout. `separated` = individual cards with a gap; `segmented` = joined
   * cards with shared borders and only the group's outer corners rounded (a
   * button-group style). Only applies to `variant="card"`.
   * @default 'separate
   */
  layout?: 'separated' | 'segmented';
  children: React.ReactNode;
}

export type RadioGroupProps = BreakpointSupport<RadioGroupBreakpointProps>;

export const RadioGroup = (props: RadioGroupProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    id,
    name,
    label,
    hideLabel = false,
    helper,
    className,
    value,
    defaultValue = null,
    onChange,
    disabled,
    invalid,
    required,
    size,
    variant = 'default',
    cardVariant = 'primary',
    direction = variant === 'card' ? 'row' : 'column',
    layout = 'separated',
    children,
  } = getCurrentBreakpointProps<RadioGroupBreakpointProps>(props);

  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;
  const generatedName = React.useId();
  const resolvedName = name ?? generatedName;

  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState<string | null>(defaultValue);
  const currentValue = isControlled ? value ?? null : innerValue;
  const helperId = helper ? helper.id ?? `${resolvedId}-helper` : undefined;
  const legendId = `${resolvedId}-legend`;

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (!isControlled) setInnerValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({
      name: resolvedName,
      value: currentValue,
      onValueChange: handleValueChange,
      disabled,
      invalid,
      required,
      size,
      variant,
      cardVariant,
    }),
    [resolvedName, currentValue, handleValueChange, disabled, invalid, required, size, variant, cardVariant]
  );

  return (
    <fieldset
      className={cn(
        styles['tedi-radio-group'],
        styles[`tedi-radio-group--${direction}`],
        { [styles['tedi-radio-group--segmented']]: layout === 'segmented' },
        className
      )}
      role="radiogroup"
      aria-labelledby={label ? legendId : undefined}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-required={required || undefined}
      aria-describedby={helperId}
    >
      {label && (
        <legend id={legendId} className={cn(styles['tedi-radio-group__legend'], { 'sr-only': hideLabel })}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </legend>
      )}
      <RadioGroupContext.Provider value={contextValue}>
        <div className={styles['tedi-radio-group__items']} data-layout={layout} data-direction={direction}>
          {children}
        </div>
      </RadioGroupContext.Provider>
      {helper && <FeedbackText id={helperId} {...helper} />}
    </fieldset>
  );
};

RadioGroup.displayName = 'Radio.Group';

export default RadioGroup;
