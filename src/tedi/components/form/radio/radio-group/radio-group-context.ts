import React from 'react';

import { ChoiceInputCardVariant, ChoiceInputVariant } from '../../choice-input.types';

export interface RadioGroupContextValue {
  /** Shared `name` for all radios in the group. */
  name: string;
  /** Currently selected value (`null` when nothing is selected). */
  value: string | null;
  /** Called by a `Radio` when it is selected. */
  onValueChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  size?: 'default' | 'large';
  variant?: ChoiceInputVariant;
  cardVariant?: ChoiceInputCardVariant;
}

/**
 * Provided by `Radio.Group`. When present, a `Radio` reads its selection,
 * `name`, and shared visual props from here instead of managing its own state.
 */
export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);
