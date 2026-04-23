import React, { useMemo } from 'react';

import { findClosestMinute, generateHours, generateMinutes, parseTime } from '../time-field/time-field-helpers';
import { TimeGrid } from './components/time-grid/time-grid';
import { TimeWheel } from './components/time-wheel/time-wheel';

export interface TimePickerProps {
  /**
   * Currently selected time in "HH:mm" format (24-hour).
   *
   * @example "14:30"
   * @default ""
   */
  value?: string;
  /**
   * Initial time value for uncontrolled mode. Should be in "HH:mm" format.
   * @example "09:00"
   * @default ""
   */
  defaultValue?: string;
  /**
   * Callback fired when the user selects a new time.
   * Returns the selected time in "HH:mm" format.
   *
   * @param time - Selected time as "HH:mm" string
   */
  onChange?: (time: string) => void;
  /**
   * Minute step interval for the minute wheel.
   * Determines which minute values are shown (e.g. 00, 05, 10, ..., 55).
   *
   * @default 1
   */
  stepMinutes?: number;
  /**
   * When provided, the component switches from wheel mode to grid mode.
   * Displays a list/grid of predefined time slots instead of scrollable wheels.
   *
   * Each string must be in "HH:mm" format.
   *
   * @example ["09:00", "09:30", "10:00", "14:00", "15:30"]
   */
  availableTimes?: string[];
  /**
   * Variant of the grid rendered when `availableTimes` is provided:
   * - 'buttons' – buttons grid
   * - 'radio' – radio buttons grid
   * @default button
   */
  gridVariant?: 'button' | 'radio';
  /**
   * Additional CSS class name to apply to the root element.
   * Useful for custom styling and layout overrides.
   */
  className?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  defaultValue = '',
  onChange,
  stepMinutes = 1,
  availableTimes,
  gridVariant = 'button',
  className,
}) => {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const handleChange = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const hours = useMemo(generateHours, []);
  const minutes = useMemo(() => generateMinutes(stepMinutes), [stepMinutes]);

  const { hour, minute } = parseTime(current || '12:00');

  const selectedHour = hours.includes(hour) ? hour : '00';
  const selectedMinute = findClosestMinute(minute, minutes);

  if (Array.isArray(availableTimes) && availableTimes.length > 0) {
    return (
      <TimeGrid
        times={availableTimes}
        value={current}
        variant={gridVariant}
        onSelect={handleChange}
        className={className}
      />
    );
  }

  return (
    <TimeWheel
      hours={hours}
      minutes={minutes}
      selectedHour={selectedHour}
      selectedMinute={selectedMinute}
      onChange={(hour, minute) => handleChange(`${hour}:${minute}`)}
      className={className}
    />
  );
};

TimePicker.displayName = 'TimePicker';
