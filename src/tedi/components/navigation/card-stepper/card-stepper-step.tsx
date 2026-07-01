import React from 'react';

import { VerticalStepperItemState } from '../vertical-stepper/vertical-stepper-item';
import { VerticalStepperSubItemState } from '../vertical-stepper/vertical-stepper-sub-item';

export interface CardStepperSubStepProps {
  /**
   * Sub-step label.
   */
  title: React.ReactNode;
  /**
   * Visual / semantic state shown in the step-list modal.
   * @default default
   */
  state?: VerticalStepperSubItemState;
  /**
   * Marks the sub-step as the active one.
   */
  current?: boolean;
  /**
   * Stable key for the sub-step. Falls back to the array index.
   */
  id?: string;
  /**
   * Renders the sub-step as disabled (non-interactive) in the modal.
   */
  disabled?: boolean;
  /**
   * Click handler — makes the sub-step navigable in the modal and closes the list when picked.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  /**
   * Navigates when set; renders the sub-step as a link in the modal.
   */
  href?: string;
}

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
  /**
   * Sub-steps shown under this step in the step-list modal. When present the step
   * becomes a collapsible parent — the title navigates and a chevron expands the
   * sub-step list.
   */
  subSteps?: CardStepperSubStepProps[];
  /**
   * Whether the sub-step list starts expanded in the modal. Defaults to expanded
   * for the active step. Only relevant with `subSteps`.
   */
  defaultExpanded?: boolean;
}

/**
 * Declarative step config for `CardStepper`. It renders nothing on its own — the
 * parent reads its props to build the active card, the progress bar and the
 * step-list modal. Use it as `CardStepper.Step`.
 */
export const CardStepperStep = (_props: CardStepperStepProps): null => null;

CardStepperStep.displayName = 'CardStepperStep';

export default CardStepperStep;
