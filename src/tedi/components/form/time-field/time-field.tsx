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

import {
  type Breakpoint,
  BreakpointSupport,
  isBreakpointBelow,
  useBreakpoint,
  useBreakpointProps,
} from '../../../helpers';
import { UnknownType } from '../../../types/commonTypes';
import { Dropdown } from '../../overlays/dropdown';
import type { ModalContentProps } from '../../overlays/modal/modal-content/modal-content';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import { TimePicker } from '../time-picker/time-picker';
import styles from './time-field.module.scss';
import { normalizeTime, TIMEPICKER_OFFSET } from './time-field-helpers';
import { TimePickerModal } from './time-picker-modal/time-picker-modal';

export type TimeFieldModal = boolean | Exclude<Breakpoint, 'xs'>;

type TimeFieldBreakpointProps = {
  /**
   * If `true`, the field swaps the custom time-picker popover for the
   * browser's native time picker (`<input type="time">`). Works on both
   * mobile and desktop — useful when the consumer wants to skip the custom
   * UI entirely.
   * Note: When using the native picker, the `availableTimes` prop is ignored.
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
  /**
   * Open the picker inside a modal instead of a floating popover. Useful on
   * narrow viewports where a popover overlaps the input itself.
   *
   * - `true` always opens in a modal
   * - `false` (default) always uses the popover
   * - A breakpoint name (e.g. `'md'`) opens in a modal *below* that breakpoint
   *   and falls back to the popover from that breakpoint up
   *
   * Ignored when `useNativePicker` resolves to `true`.
   * @default false
   */
  modal?: TimeFieldModal;
  /**
   * Extra props forwarded to the picker modal's `Modal.Content` — e.g. `size`, `width`, `maxWidth`,
   * `position`, `fullscreen`, and per-breakpoint overrides. Lets the consumer tune the modal beyond
   * its `size="small"` / `width="xs"` defaults. `className` is merged with the component's own (so
   * the internal padding reset is preserved). Only applies when the picker opens as a modal.
   */
  modalProps?: Omit<ModalContentProps, 'children'>;
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
    modal = false,
    modalProps,
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
  const [modalOpen, setModalOpen] = useState(false);
  const isInputTrigger = timePickerTrigger === 'input';
  const shouldUseNativePicker = useNativePicker;

  const breakpoint = useBreakpoint();
  const useModalPicker =
    !shouldUseNativePicker &&
    showPicker &&
    !readOnly &&
    (modal === true || (typeof modal === 'string' && isBreakpointBelow(breakpoint, modal)));

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
  const shouldUseCustomInputTrigger =
    showPicker && isInputTrigger && !readOnly && !shouldUseNativePicker && !useModalPicker;

  const interactions = useInteractions([...(shouldUseCustomInputTrigger ? [click] : []), dismiss, role]);

  const updateTime = (time: string) => {
    const cleaned = time.trim();

    if (!isControlled) {
      setInternalValue(cleaned);
    }

    onChange?.(cleaned);
  };

  const handleInputBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const raw = (event.target as HTMLInputElement).value ?? '';
    (inputProps?.onBlur as React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined)?.(event);
    const normalised = normalizeTime(raw);
    if (normalised !== null && normalised !== raw) {
      updateTime(normalised);
    }
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

  const openCustomPicker = () => setOpen((prev) => !prev);
  const openModalPicker = () => setModalOpen(true);

  const handleIconClick = () => {
    if (readOnly || !showPicker) return;

    if (shouldUseNativePicker) {
      openNativePicker();
    } else if (useModalPicker) {
      openModalPicker();
    } else if (timePickerTrigger === 'button') {
      openCustomPicker();
    }
  };

  const inputClickFromTrigger =
    useModalPicker && isInputTrigger && !readOnly
      ? () => {
          openModalPicker();
        }
      : undefined;

  const textFieldProps: TextFieldProps = {
    ...(inputProps as TextFieldProps),
    id,
    label,
    value: currentValue,
    placeholder,
    readOnly: readOnly || (!shouldUseNativePicker && isInputTrigger),
    icon: showPicker ? 'schedule' : { name: 'schedule', color: 'inherit' },
    isClearable: true,
    required,
    onIconClick: showPicker ? handleIconClick : undefined,
    onChange: updateTime,
    onBlur: handleInputBlur,
    className: cn(
      styles['tedi-time-field__textfield'],
      { [styles['tedi-time-field__icon--disabled']]: !showPicker || readOnly },
      { [styles['tedi-time-field__textfield--disabled']]: inputProps?.disabled },
      { [styles['tedi-time-field--native']]: shouldUseNativePicker }
    ),
    input: {
      ...(inputProps?.input as UnknownType),
      ...(shouldUseNativePicker && { type: 'time' }),
      ...(inputClickFromTrigger && { onClick: inputClickFromTrigger }),
    },
  };

  const shouldUseDropdownPicker =
    !shouldUseNativePicker &&
    showPicker &&
    !readOnly &&
    availableTimesVariant === 'dropdown' &&
    !!availableTimes?.length;

  if (shouldUseDropdownPicker) {
    const selectedIndex = availableTimes.indexOf(currentValue);
    const defaultActiveIndex = selectedIndex >= 0 ? selectedIndex : 0;

    return (
      <Dropdown width="trigger" defaultActiveIndex={defaultActiveIndex}>
        <Dropdown.Trigger>
          <div
            className={cn(styles['tedi-time-field__container'], className, {
              [styles['tedi-time-field__container--native']]: shouldUseNativePicker,
            })}
          >
            <TextField
              ref={textFieldRef}
              {...textFieldProps}
              input={
                {
                  ...textFieldProps.input,
                  ...(!isInputTrigger && {
                    onClick: (event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation(),
                  }),
                } as UnknownType
              }
            />
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
        {...(shouldUseCustomInputTrigger ? interactions.getReferenceProps() : {})}
        aria-haspopup={showPicker ? 'listbox' : undefined}
        tabIndex={-1}
      >
        <TextField ref={textFieldRef} aria-expanded={showPicker ? open : undefined} {...textFieldProps} />
      </div>

      {useModalPicker && (
        <TimePickerModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          value={currentValue}
          onConfirm={updateTime}
          stepMinutes={stepMinutes}
          availableTimes={availableTimes}
          gridVariant={availableTimesVariant === 'grid-radio' ? 'radio' : 'button'}
          modalProps={modalProps}
        />
      )}

      {!shouldUseNativePicker && showPicker && !useModalPicker && (
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
                  gridVariant={availableTimesVariant === 'grid-radio' ? 'radio' : 'button'}
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
