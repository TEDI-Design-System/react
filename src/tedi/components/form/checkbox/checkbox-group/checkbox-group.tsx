import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../helpers';
import { useLabels } from '../../../../providers/label-provider';
import { ChoiceInputCardVariant, ChoiceInputVariant } from '../../choice-input.types';
import FeedbackText, { FeedbackTextProps } from '../../feedback-text/feedback-text';
import Checkbox, { CheckboxBaseProps } from '../checkbox';
import styles from './checkbox-group.module.scss';
import { CheckboxGroupContext, CheckboxGroupContextValue } from './checkbox-group-context';

/** State of the select-all checkbox, passed to a custom `indeterminateCheck` label function. */
export type CheckboxGroupSelectAllState = 'all' | 'some' | 'none';

interface CheckboxGroupBreakpointProps {
  /** Group id. When omitted a stable id is generated. */
  id?: string;
  /** Shared `name` for the checkboxes. */
  name?: string;
  /** Group label, rendered as the fieldset legend. */
  label: React.ReactNode;
  /** Visually hide the legend while keeping it available to screen readers. */
  hideLabel?: boolean;
  /** Helper / feedback text rendered below the group. */
  helper?: FeedbackTextProps;
  className?: string;
  /** Controlled selected values. Pair with `onChange`. */
  value?: string[];
  /** Uncontrolled initial selected values. */
  defaultValue?: string[];
  /** Fires with the full new list of selected values. */
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Size forwarded to every checkbox. @default 'default' */
  size?: 'default' | 'large';
  /** Visual variant forwarded to every checkbox. @default 'default' */
  variant?: ChoiceInputVariant;
  /** Card colour variant forwarded to every checkbox (only applies to `variant="card"`). @default 'primary' */
  cardVariant?: ChoiceInputCardVariant;
  /** Layout direction of the checkboxes. Defaults to `row` for cards, `column` otherwise. */
  direction?: 'row' | 'column';
  /**
   * Renders a "select all" checkbox above the children that reflects and controls
   * them: checked when all are selected, indeterminate when some are, unchecked
   * when none are. Toggling it selects or clears all (enabled) children.
   * - `true` — use the localised default label ("Select all" / "Remove all").
   * - `string` — a fixed label.
   * - `(state) => string` — a label derived from the current `all` / `some` / `none` state.
   */
  indeterminateCheck?: boolean | string | ((state: CheckboxGroupSelectAllState) => string);
  /** Extra props forwarded to the select-all checkbox (its checked/indeterminate/value are managed). */
  indeterminateCheckProps?: Partial<
    Omit<CheckboxBaseProps, 'value' | 'label' | 'checked' | 'indeterminate' | 'onChange'>
  >;
  children: React.ReactNode;
}

export type CheckboxGroupProps = BreakpointSupport<CheckboxGroupBreakpointProps>;

export const CheckboxGroup = (props: CheckboxGroupProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { getLabel } = useLabels();
  const {
    id,
    name,
    label,
    hideLabel = false,
    helper,
    className,
    value,
    defaultValue = [],
    onChange,
    disabled,
    invalid,
    required,
    size,
    variant = 'default',
    cardVariant = 'primary',
    direction = variant === 'card' ? 'row' : 'column',
    indeterminateCheck,
    indeterminateCheckProps,
    children,
  } = getCurrentBreakpointProps<CheckboxGroupBreakpointProps>(props);

  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;

  const isControlled = value !== undefined;
  const [innerValues, setInnerValues] = React.useState<string[]>(defaultValue);
  const currentValues = React.useMemo(
    () => (isControlled ? value ?? [] : innerValues),
    [isControlled, value, innerValues]
  );
  const helperId = helper ? helper.id ?? `${resolvedId}-helper` : undefined;

  const setValues = React.useCallback(
    (next: string[]) => {
      if (!isControlled) setInnerValues(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const handleToggle = React.useCallback(
    (itemValue: string, checked: boolean) => {
      setValues(checked ? [...currentValues, itemValue] : currentValues.filter((existing) => existing !== itemValue));
    },
    [currentValues, setValues]
  );

  const contextValue = React.useMemo<CheckboxGroupContextValue>(
    () => ({
      name,
      values: currentValues,
      onToggle: handleToggle,
      disabled,
      invalid,
      required,
      size,
      variant,
      cardVariant,
    }),
    [name, currentValues, handleToggle, disabled, invalid, required, size, variant, cardVariant]
  );

  // Enabled child values, used by the select-all checkbox.
  const enabledValues = React.useMemo(() => {
    const values: string[] = [];
    React.Children.toArray(children).forEach((child) => {
      if (
        React.isValidElement<{ value?: string; disabled?: boolean }>(child) &&
        child.props.value !== undefined &&
        !child.props.disabled
      ) {
        values.push(child.props.value);
      }
    });
    return values;
  }, [children]);

  const allSelected = enabledValues.length > 0 && enabledValues.every((value) => currentValues.includes(value));
  const noneSelected = enabledValues.every((value) => !currentValues.includes(value));
  const someSelected = !allSelected && !noneSelected;

  const selectAllState: CheckboxGroupSelectAllState = allSelected ? 'all' : noneSelected ? 'none' : 'some';
  const selectAllLabel =
    typeof indeterminateCheck === 'string'
      ? indeterminateCheck
      : typeof indeterminateCheck === 'function'
      ? indeterminateCheck(selectAllState)
      : allSelected
      ? getLabel('table.filter.remove-all')
      : getLabel('table.filter.select-all');

  const handleToggleAll = React.useCallback(() => {
    setValues(
      allSelected
        ? currentValues.filter((value) => !enabledValues.includes(value))
        : [...new Set([...currentValues, ...enabledValues])]
    );
  }, [allSelected, currentValues, enabledValues, setValues]);

  return (
    <fieldset
      className={cn(
        styles['tedi-checkbox-group'],
        styles[`tedi-checkbox-group--${direction}`],
        { [styles['tedi-checkbox-group--card']]: variant === 'card' },
        className
      )}
      disabled={disabled}
      aria-describedby={helperId}
    >
      {label && (
        <legend className={cn(styles['tedi-checkbox-group__legend'], { 'sr-only': hideLabel })}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </legend>
      )}
      {indeterminateCheck && (
        <Checkbox
          id={`${resolvedId}-select-all`}
          {...indeterminateCheckProps}
          value="select-all"
          label={selectAllLabel}
          checked={allSelected}
          indeterminate={someSelected}
          onChange={handleToggleAll}
          size={size}
        />
      )}
      <CheckboxGroupContext.Provider value={contextValue}>
        <div
          className={cn(styles['tedi-checkbox-group__items'], {
            [styles['tedi-checkbox-group__items--indented']]: !!indeterminateCheck,
          })}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
      {helper && <FeedbackText id={helperId} {...helper} />}
    </fieldset>
  );
};

CheckboxGroup.displayName = 'Checkbox.Group';

export default CheckboxGroup;
