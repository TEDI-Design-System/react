import * as React from 'react';

/**
 * TimePicker — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/time-picker/time-picker.stories.tsx).
 */
export interface TimePickerProps {
  /** Currently selected time in "HH:mm" format (24-hour). */
  value?: string;
  /** Initial time value for uncontrolled mode. Should be in "HH:mm" format. */
  defaultValue?: string;
  /** Callback fired when the user selects a new time. Returns the selected time in "HH:mm" format. */
  onChange?: (time: string) => void;
  /** Minute step interval for the minute wheel. Determines which minute values are shown (e.g. 00, 05, 10, ..., 55). */
  stepMinutes?: number;
  /** When provided, the component switches from wheel mode to grid mode. Displays a list/grid of predefined time slots instead of scrollable wheels. Each string must be in "HH:mm" format. */
  availableTimes?: string[];
  /** Variant of the grid rendered when `availableTimes` is provided: - 'buttons' – buttons grid - 'radio' – radio buttons grid */
  gridVariant?: "button" | "radio";
  /** Additional CSS class name to apply to the root element. Useful for custom styling and layout overrides. */
  className?: string;
  /** Whether to render the surrounding card (border, background, radius). Set to `false` when embedding inside a parent that already provides its own surface — e.g. alongside a calendar inside `DateTimeField`. The inner gradient masks and column separators are preserved either way. */
  bordered?: boolean;
}

export declare const TimePicker: React.ComponentType<TimePickerProps>;
