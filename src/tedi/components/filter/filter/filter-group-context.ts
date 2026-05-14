import { createContext } from 'react';

export interface FilterGroupContextValue {
  isManaged: boolean;
  multiselect: boolean;
  disabled: boolean;
  isSelected: (value: string) => boolean;
  selectFilter: (value: string) => void;
}

export const FilterGroupContext = createContext<FilterGroupContextValue | null>(null);
