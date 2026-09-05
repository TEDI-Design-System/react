import React from 'react';

import { ChoiceInputCardVariant, ChoiceInputVariant } from '../../choice-input.types';

export interface CheckboxGroupContextValue {
  /** Shared `name` for all checkboxes in the group. */
  name?: string;
  /** Currently selected values. */
  values: string[];
  /** Called by a `Checkbox` when it is toggled. */
  onToggle: (value: string, checked: boolean) => void;
  disabled?: boolean;
  invalid?: boolean;
  size?: 'default' | 'large';
  variant?: ChoiceInputVariant;
  cardVariant?: ChoiceInputCardVariant;
}

/**
 * Provided by `Checkbox.Group`. When present, a `Checkbox` reads its checked
 * state, `name`, and shared visual props from here.
 */
export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null);
