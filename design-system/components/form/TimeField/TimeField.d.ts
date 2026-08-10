import * as React from 'react';

/**
 * TimeField — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/time-field/time-field.stories.tsx).
 */
export interface TimeFieldProps {
  /** Unique identifier for the input field. */
  id: string;
  /** Label for the input field. Used for accessibility. */
  label: string;
  /** Current value of the time field (controlled). */
  value?: string;
  /** Initial value of the time field (uncontrolled). */
  defaultValue?: string;
  /** Callback fired when the time value changes. */
  onChange?: (time: string) => void;
  /** Makes the input read-only. Picker can still be opened if showPicker is true. */
  readOnly?: boolean;
  /** Disables the input and the picker. Equivalent of `<DateTimeField disabled>` — added so all three field siblings (`DateField`, `TimeField`, `DateTimeField`) share the same form-control idiom for "this field is fully unavailable". Forwards to the underlying `TextField`'s `disabled` attribute and short-circuits the picker open path. */
  disabled?: boolean;
  /** Marks the input as required. */
  required?: boolean;
  /** Placeholder text for the input field. */
  placeholder?: string;
  /** Additional props to pass to the underlying TextField component, excluding `id`, `label`, `value`, and `onChange`. */
  inputProps?: Omit<TextFieldProps, "label" | "value" | "id" | "onChange">;
  /** Step interval in minutes for the time picker. */
  stepMinutes?: number;
  /** Additional CSS class for the container. */
  className?: string;
  /** Array of available times to show in the picker or dropdown. */
  availableTimes?: string[];
  /** Open the picker inside a modal instead of a floating popover. Useful on narrow viewports where a popover overlaps the input itself. - `true` always opens in a modal - `false` (default) always uses the popover - A breakpoint name (e.g. `'md'`) opens in a modal *below* that breakpoint and falls back to the popover from that breakpoint up Ignored when `useNativePicker` resolves to `true`. */
  modal?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Extra props forwarded to the picker modal's `Modal.Content` — e.g. `size`, `width`, `maxWidth`, `position`, `fullscreen`, and per-breakpoint overrides. Lets the consumer tune the modal beyond its `size="small"` / `width="xs"` (capped to 312px) defaults. `className` is merged with the component's own (so the internal padding reset is preserved). Only applies when the picker opens as a modal. */
  modalProps?: Omit<ModalContentProps, "children">;
  /** If `true`, the field swaps the custom time-picker popover for the browser's native time picker (`<input type="time">`). Works on both mobile and desktop — useful when the consumer wants to skip the custom UI entirely. Note: When using the native picker, the `availableTimes` prop is ignored. */
  useNativePicker?: boolean;
  /** Determines how the time picker is triggered: - 'button' (default) – only clicking the icon opens the picker - 'input' – clicking anywhere in the input opens the picker */
  timePickerTrigger?: "button" | "input";
  /** Enables or disables the time picker popover. */
  showPicker?: boolean;
  /** Variant of the available times: - 'grid-buttons' – buttons grid - 'grid-radio' – radio buttons grid - 'dropdown' – dropdown list */
  availableTimesVariant?: "dropdown" | "grid-buttons" | "grid-radio";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<TimeFieldBreakpointProps>;
  md?: Partial<TimeFieldBreakpointProps>;
  lg?: Partial<TimeFieldBreakpointProps>;
  xl?: Partial<TimeFieldBreakpointProps>;
  xxl?: Partial<TimeFieldBreakpointProps>;
}

export declare const TimeField: React.ComponentType<TimeFieldProps>;
