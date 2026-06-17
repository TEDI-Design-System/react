import React from 'react';

import { VerticalStepperItemState } from '../vertical-stepper/vertical-stepper-item';

export interface CardStepperStepProps {
  /**
   * Step title.
   */
  title: React.ReactNode;
  /**
   * Optional secondary line shown under the title (on the card for the active
   * step, and always in the step-list modal).
   */
  description?: React.ReactNode;
  /**
   * Visual / semantic state used in the progress bar and the step-list modal.
   * @default default
   */
  state?: VerticalStepperItemState;
  /**
   * Stable key for the step. Falls back to the array index.
   */
  id?: string;
  /**
   * Excludes the step from navigation — not reachable via the arrows or the step
   * list, and rendered as disabled in the modal.
   */
  disabled?: boolean;
  /**
   * Custom content rendered at the bottom of the card when this step is active —
   * e.g. an inline `Alert`, a "read more" link or an action button. Only shown for
   * the active step. Matches the Figma "with bottom slot" variant.
   */
  bottomSlot?: React.ReactNode;
}

/**
 * Declarative step config for `CardStepper`. It renders nothing on its own — the
 * parent reads its props to build the active card, the progress bar and the
 * step-list modal. Use it as `CardStepper.Step`.
 */
export const CardStepperStep = (_props: CardStepperStepProps): null => null;

CardStepperStep.displayName = 'CardStepperStep';

export default CardStepperStep;
