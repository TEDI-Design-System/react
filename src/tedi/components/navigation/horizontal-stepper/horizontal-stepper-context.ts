import { createContext } from 'react';

/** @internal Step number provided by the parent `HorizontalStepper` to each item. */
export const HorizontalStepperStepNumberContext = createContext<number>(0);
