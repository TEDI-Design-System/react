import * as React from 'react';

/**
 * HorizontalStepper — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/navigation/horizontal-stepper/horizontal-stepper.stories.tsx).
 */
export interface HorizontalStepperProps {
  /** `HorizontalStepper.Item` elements, one per step. */
  children: React.ReactNode;
  /** Accessible name for the navigation landmark. */
  "aria-label"?: string;
  /** Background style of the stepper track. */
  background?: "default" | "transparent";
  /** Collapse labels so only the indicators plus the selected step's label are visible. `true` collapses at every width; a breakpoint (`'sm'`, `'md'`, `'lg'`, `'xl'`, `'xxl'`) collapses only below that breakpoint. */
  compact?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Additional class name on the root element. */
  className?: string;
}

export declare const HorizontalStepper: React.ComponentType<HorizontalStepperProps> & {
  Item: React.ComponentType<any>;
};
