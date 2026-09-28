import React from 'react';

export interface VerticalStepperContextValue {
  /**
   * Compact density — smaller indicators and tighter rows. Provided by the
   * parent `VerticalStepper` so items and sub-items render in the same size.
   */
  compact: boolean;
}

export const VerticalStepperContext = React.createContext<VerticalStepperContextValue>({
  compact: false,
});

export const useVerticalStepperContext = (): VerticalStepperContextValue => React.useContext(VerticalStepperContext);
