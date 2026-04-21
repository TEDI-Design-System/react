import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { UnknownType } from '../../../types/commonTypes';
import { Dropdown } from '../../overlays/dropdown';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import { TimePicker } from '../time-picker/time-picker';
import styles from './time-field.module.scss';
import { TIMEPICKER_OFFSET } from './time-field-helpers';

type TimeFieldBreakpointProps = {
  /**
   * If `true`, uses the native time picker of the browser instead of a custom one.
   * Note: When using the native picker, the `availableTimes` prop will not be applied.
   * @default false
   */
  useNativePicker?: boolean;
  /**
   * Determines how the time picker is triggered:
   * - 'button' (default) – only clicking the icon opens the picker
   * - 'input' – clicking anywhere in the input opens the picker
   */
  timePickerTrigger?: 'input' | 'button';

  /**
   * Enables or disables the time picker popover.
   * @default true
   */
  showPicker?: boolean;
  /**
   * Variant of the available times:
   * - 'grid-buttons' – buttons grid
   * - 'grid-radio' – radio buttons grid
   * - 'dropdown' – dropdown list
   */
  availableTimesVariant?: 'grid-buttons' | 'grid-radio' | 'dropdown';
};

export interface TimeFieldProps extends BreakpointSupport<TimeFieldBreakpointProps> {
  /**
   * Unique identifier for the input field.
   */
  id: string;
  /**
   * Label for the input field. Used for accessibility.
   */
  label: string;
  /**
   * Current value of the time field (controlled).
   */
  value?: string;
  /**
   * Initial value of the time field (uncontrolled).
   */
  defaultValue?: string;
  /**
   * Callback fired when the time value changes.
   */
  onChange?: (time: string) => void;

  /**
   * Makes the input read-only. Picker can still be opened if showPicker is true.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Marks the input as required.
   */
  required?: boolean;
  /**
   * Placeholder text for the input field.
   */
  placeholder?: string;
  /**
   * Additional props to pass to the underlying TextField component,
   * excluding `id`, `label`, `value`, and `onChange`.
   */
  inputProps?: Omit<TextFieldProps, 'id' | 'label' | 'value' | 'onChange'>;
  /**
   * Step interval in minutes for the time picker.
   * @default 1
   */
  stepMinutes?: number;
  /**
   * Additional CSS class for the container.
   */
  className?: string;
  /**
   * Array of available times to show in the picker or dropdown.
   */
  availableTimes?: string[];
}

export const TimeField: React.FC<TimeFieldProps> = (props) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);

  const {
    id,
    label,
    value,
    defaultValue,
    onChange,
    readOnly = false,
    required,
    placeholder,
    inputProps,
    stepMinutes = 1,
    className,
    availableTimes,
  } = props;

  const {
    useNativePicker = false,
    timePickerTrigger = 'button',
    showPicker = true,
    availableTimesVariant = 'grid-buttons',
  } = getCurrentBreakpointProps<TimeFieldBreakpointProps>(props);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');

  const currentValue = isControlled ? value : internalValue;
  const [open, setOpen] = useState(false);
  const isInputTrigger = timePickerTrigger === 'input';

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: isInputTrigger ? 'bottom-start' : 'bottom-end',
    middleware: [offset(TIMEPICKER_OFFSET), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { refs, context, x, y, strategy } = floating;

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const interactions = useInteractions([
    ...(showPicker && timePickerTrigger === 'input' && !readOnly ? [click] : []),
    dismiss,
    role,
  ]);

  const updateTime = (time: string) => {
    const cleaned = time.trim();

    if (!isControlled) {
      setInternalValue(cleaned);
    }

    onChange?.(cleaned);
  };

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const textFieldRef = React.useRef<TextFieldForwardRef | null>(null);

  useEffect(() => {
    if (textFieldRef.current?.inner) {
      refs.setReference(textFieldRef.current.inner);
    }
  }, [refs]);

  const openNativePicker = () => {
    const input = textFieldRef.current?.input as HTMLInputElement | undefined;

    if (!input) return;

    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }

    input.focus();
  };

  const openCustomPicker = () => setOpen(true);

  const handleIconClick = () => {
    if (readOnly || !showPicker) return;

    if (useNativePicker) {
      openNativePicker();
    } else if (timePickerTrigger === 'button') {
      openCustomPicker();
    }
  };

  const textFieldProps: TextFieldProps = {
    ...(inputProps as TextFieldProps),
    id,
    label,
    value: currentValue,
    placeholder,
    readOnly: readOnly || isInputTrigger,
    icon: 'schedule',
    isClearable: true,
    required,
    onIconClick: handleIconClick,
    onChange: updateTime,
    className: cn(
      styles['tedi-time-field__textfield'],
      { [styles['tedi-time-field__icon--disabled']]: !showPicker || readOnly },
      { [styles['tedi-time-field__textfield--disabled']]: inputProps?.disabled },
      { [styles['tedi-time-field--native']]: useNativePicker }
    ),
    input: {
      ...(inputProps?.input as UnknownType),
      type: 'time',
    },
  };

  if (availableTimes && availableTimesVariant === 'dropdown') {
    return (
      <Dropdown width="trigger">
        <Dropdown.Trigger>
          <div
            className={cn(styles['tedi-time-field__container'], className, {
              [styles['tedi-time-field__container--native']]: useNativePicker,
            })}
          >
            <TextField ref={textFieldRef} {...textFieldProps} />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {availableTimes.map((time, index) => (
            <Dropdown.Item key={time} index={index} active={time === currentValue} onClick={() => updateTime(time)}>
              {time}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  }

  return (
    <>
      <div
        className={cn(styles['tedi-time-field__container'], className)}
        {...(readOnly || !showPicker ? {} : interactions.getReferenceProps())}
        aria-haspopup={showPicker ? 'listbox' : undefined}
        tabIndex={-1}
      >
        <TextField ref={textFieldRef} aria-expanded={showPicker ? open : undefined} {...textFieldProps} />
      </div>

      {!useNativePicker && showPicker && (
        <FloatingPortal>
          {open && !readOnly && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                ref={refs.setFloating}
                {...interactions.getFloatingProps({
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                })}
              >
                <TimePicker
                  value={currentValue}
                  stepMinutes={stepMinutes}
                  availableTimes={availableTimes}
                  onChange={(time) => {
                    updateTime(time);
                    if (availableTimes) setOpen(false);
                  }}
                  gridVariant={availableTimesVariant === 'grid-radio' ? 'radio' : 'buttons'}
                  className={styles['tedi-time-field__picker-wrapper']}
                />
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      )}
    </>
  );
};

TimeField.displayName = 'TimeField';
