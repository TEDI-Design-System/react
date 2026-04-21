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
  /*
   * Variant of the grid when availableTimesView is set to 'grid':
   * - 'buttons' – buttons grid
   * - 'radio' – radio buttons grid
   * @default 'buttons'
   */
  gridVariant?: 'buttons' | 'radio';
  /**
   * Additional CSS class name to apply to the root element.
   * Useful for custom styling and layout overrides.
   */
  className?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value = '',
  onChange,
  stepMinutes = 1,
  availableTimes,
  gridVariant = 'buttons',
  className,
}) => {
  const hours = useMemo(generateHours, []);
  const minutes = useMemo(() => generateMinutes(stepMinutes), [stepMinutes]);

  const { hour, minute } = parseTime(value || '12:00');

  const selectedHour = hours.includes(hour) ? hour : '00';
  const selectedMinute = findClosestMinute(minute, minutes);

  if (availableTimes) {
    return (
      <TimeGrid
        times={availableTimes}
        value={value}
        variant={gridVariant}
        onSelect={(time) => onChange?.(time)}
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
      onChange={(hour, minute) => {
        onChange?.(`${hour}:${minute}`);
      }}
      className={className}
    />
  );
};

TimePicker.displayName = 'TimePicker';
