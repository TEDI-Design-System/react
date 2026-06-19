import cn from 'classnames';
import React, { forwardRef, useId, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Modal } from '../../overlays/modal/modal';
import { VerticalStepper } from '../vertical-stepper/vertical-stepper';
import styles from './card-stepper.module.scss';
import { CardStepperStep, CardStepperStepProps } from './card-stepper-step';

/**
 * Per-instance label overrides. When omitted, each label comes from the
 * `LabelProvider` (`stepper.previous`, `stepper.next`, `stepper.open-steps`,
 * `stepper.steps`, `stepper.status`).
 */
export interface CardStepperLabels {
  /** Accessible label for the previous-step button. Defaults to the `stepper.previous` label. */
  previous?: string;
  /** Accessible label for the next-step button. Defaults to the `stepper.next` label. */
  next?: string;
  /** Accessible label for the button that opens the step list. Defaults to the `stepper.open-steps` label. */
  openSteps?: string;
  /** Heading of the step-list modal. Defaults to the `stepper.steps` label. */
  modalHeading?: string;
  /**
   * Screen-reader phrasing for the `N / M` counter (the visible "N / M" is hidden
   * from assistive tech, since "N slash M" reads poorly). Defaults to the
   * `stepper.status` label.
   */
  status?: (current: number, total: number) => string;
}

export interface CardStepperProps {
  /**
   * `CardStepper.Step` elements (compound API) — the active step shows on the
   * card, all steps in the modal. Alternative to the `steps` data prop.
   */
  children?: React.ReactNode;
  /**
   * Steps as data (alternative to `CardStepper.Step` children). Ignored when
   * `children` contains `CardStepper.Step` elements.
   */
  steps?: CardStepperStepProps[];
  /**
   * Active step index (0-based), controlled. Pair with `onStepChange`.
   */
  activeStep?: number;
  /**
   * Initial active step index for uncontrolled usage.
   * @default 0
   */
  defaultActiveStep?: number;
  /**
   * Fired with the new index when the user navigates (arrows) or picks a step
   * in the modal.
   */
  onStepChange?: (index: number) => void;
  /**
   * Show the active step's number in a ring indicator on the left. Ignored when
   * `showNavigation` is set — the back arrow occupies the left slot instead.
   * @default true
   */
  showStepNumber?: boolean;
  /**
   * Show a status icon next to the active step's title — a success check when the
   * step's `state` is `'completed'`, a danger icon when it's `'error'`. Nothing is
   * shown for other states. Matches the Figma "with status icon" variant.
   * @default false
   */
  showStatusIcon?: boolean;
  /**
   * Where the active step's `description` sits relative to its title:
   * - `'bottom'` (default) — below the title.
   * - `'top'` — above the title, as a small secondary line.
   *
   * Matches the Figma "with info top" / "with info bottom" variants.
   * @default bottom
   */
  infoPosition?: 'top' | 'bottom';
  /**
   * Where the `N / M` step counter sits:
   * - `'inline'` (default) — in the trailing controls, next to the list / next button.
   * - `'top'` — above the title (and removed from the trailing controls).
   *
   * Matches the Figma "with info top" variant that floats the counter above the title.
   * @default inline
   */
  counterPosition?: 'inline' | 'top';
  /**
   * Show the segmented progress bar below the row.
   * @default true
   */
  showProgress?: boolean;
  /**
   * Show previous / next arrow buttons on the edges. They move sequentially and
   * skip `disabled` steps.
   * @default false
   */
  showNavigation?: boolean;
  /**
   * Show the list button and the step-list modal. Turn off for a read-only
   * progress tracker or an arrows-only flow.
   * @default true
   */
  showStepList?: boolean;
  /**
   * Which steps can be jumped to from the step-list modal:
   * - `true` — any step
   * - `false` — none (the list is read-only)
   * - `'completed'` — only completed steps
   * - `'completed-or-next'` — completed steps and the one immediately after the active step
   *
   * A per-step `disabled` always wins. The prev/next arrows are sequential and are
   * **not** gated by this.
   * @default true
   */
  allowJump?: boolean | 'completed' | 'completed-or-next';
  /**
   * Heading element for the active step's title — set it to fit the surrounding
   * page's heading hierarchy. The visual size is unchanged.
   * @default h4
   */
  headingElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Accessible label overrides. Otherwise sourced from the `LabelProvider`.
   */
  labels?: CardStepperLabels;
  /**
   * Accessible name for the card region.
   */
  'aria-label'?: string;
  /**
   * Additional class name applied to the card root.
   */
  className?: string;
}

const CardStepperInner = forwardRef<HTMLDivElement, CardStepperProps>((props, ref) => {
  const {
    children,
    steps: stepsProp,
    activeStep,
    defaultActiveStep = 0,
    onStepChange,
    showStepNumber = true,
    showStatusIcon = false,
    infoPosition = 'bottom',
    counterPosition = 'inline',
    showProgress = true,
    showNavigation = false,
    showStepList = true,
    allowJump = true,
    headingElement = 'h4',
    labels,
    'aria-label': ariaLabel,
    className,
  } = props;

  const { getLabel } = useLabels();
  const resolvedLabels: Required<CardStepperLabels> = {
    previous: labels?.previous ?? getLabel('stepper.previous'),
    next: labels?.next ?? getLabel('stepper.next'),
    openSteps: labels?.openSteps ?? getLabel('stepper.open-steps'),
    modalHeading: labels?.modalHeading ?? getLabel('stepper.steps'),
    status: labels?.status ?? ((current, totalSteps) => getLabel('stepper.status', current, totalSteps)),
  };

  const childSteps = React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<CardStepperStepProps> =>
        React.isValidElement(child) && child.type === CardStepperStep
    )
    .map((child) => child.props);
  const steps: CardStepperStepProps[] = childSteps.length > 0 ? childSteps : stepsProp ?? [];

  const isControlled = activeStep !== undefined;
  const [internalStep, setInternalStep] = useState(defaultActiveStep);
  const total = steps.length;
  const rawActive = isControlled ? (activeStep as number) : internalStep;
  const active = Math.min(Math.max(rawActive, 0), Math.max(total - 1, 0));

  const [modalOpen, setModalOpen] = useState(false);
  const headingId = useId();
  const current = steps[active];
  const showIndicator = showStepNumber && !showNavigation;

  const goTo = (index: number): void => {
    if (index < 0 || index >= total || index === active || steps[index]?.disabled) return;
    if (!isControlled) setInternalStep(index);
    onStepChange?.(index);
  };

  const isStepNavigable = (index: number): boolean => {
    const step = steps[index];
    if (!step || step.disabled) return false;
    if (allowJump === true) return true;
    if (allowJump === false) return false;
    if (allowJump === 'completed') return step.state === 'completed';
    return step.state === 'completed' || index === active + 1;
  };

  const adjacentEnabled = (from: number, direction: -1 | 1): number => {
    for (let i = from; i >= 0 && i < total; i += direction) {
      if (!steps[i].disabled) return i;
    }
    return -1;
  };
  const prevIndex = adjacentEnabled(active - 1, -1);
  const nextIndex = adjacentEnabled(active + 1, 1);

  if (!current) return <></>;

  const counterNode = (
    <span className={styles['tedi-card-stepper__counter']}>
      <span aria-hidden="true">
        {active + 1} / {total}
      </span>
      <span className="visually-hidden">{resolvedLabels.status(active + 1, total)}</span>
    </span>
  );

  const descriptionNode = current.description ? (
    <Text modifiers="small" color="tertiary" className={styles['tedi-card-stepper__description']}>
      {current.description}
    </Text>
  ) : null;

  const showTopDescription = infoPosition === 'top' && descriptionNode;
  const showTopRow = counterPosition === 'top' || showTopDescription;

  return (
    <div ref={ref} role="group" aria-label={ariaLabel} className={cn(styles['tedi-card-stepper'], className)}>
      <div className={styles['tedi-card-stepper__main']}>
        {showNavigation && (
          <Button
            visualType="neutral"
            size="small"
            icon="arrow_back"
            className={styles['tedi-card-stepper__lead']}
            disabled={prevIndex === -1}
            onClick={() => goTo(prevIndex)}
          >
            {resolvedLabels.previous}
          </Button>
        )}

        {showIndicator && (
          <span
            className={cn(styles['tedi-card-stepper__indicator'], styles['tedi-card-stepper__lead'])}
            aria-hidden="true"
          >
            {active + 1}
          </span>
        )}

        <div className={styles['tedi-card-stepper__body']}>
          {showTopRow && (
            <div className={styles['tedi-card-stepper__top']}>
              {counterPosition === 'top' && counterNode}
              {showTopDescription && descriptionNode}
            </div>
          )}

          <Text element={headingElement} id={headingId} modifiers="h4" className={styles['tedi-card-stepper__title']}>
            {current.title}
            {showStatusIcon && (current.state === 'completed' || current.state === 'error') && (
              <Icon
                name={current.state === 'completed' ? 'check' : 'error'}
                color={current.state === 'completed' ? 'success' : 'danger'}
                size={18}
                display="inline"
                label={getLabel(current.state === 'completed' ? 'stepper.completed' : 'stepper.error')}
                className={styles['tedi-card-stepper__status-icon']}
              />
            )}
          </Text>

          {infoPosition === 'bottom' && descriptionNode && (
            <div className={styles['tedi-card-stepper__description-bottom']}>{descriptionNode}</div>
          )}
        </div>

        <div className={styles['tedi-card-stepper__trail']}>
          {counterPosition === 'inline' && counterNode}

          {showStepList && (
            <Button
              visualType="neutral"
              size="small"
              icon="list"
              aria-haspopup="dialog"
              aria-expanded={modalOpen}
              onClick={() => setModalOpen(true)}
            >
              {resolvedLabels.openSteps}
            </Button>
          )}

          {showNavigation && (
            <Button
              visualType="neutral"
              size="small"
              icon="arrow_forward"
              disabled={nextIndex === -1}
              onClick={() => goTo(nextIndex)}
            >
              {resolvedLabels.next}
            </Button>
          )}
        </div>
      </div>

      {showProgress && (
        <ol className={styles['tedi-card-stepper__progress']} aria-hidden="true">
          {steps.map((step, index) => (
            <li
              key={step.id ?? index}
              className={cn(styles['tedi-card-stepper__segment'], {
                [styles['tedi-card-stepper__segment--done']]: index <= active,
              })}
            />
          ))}
        </ol>
      )}

      {current.bottomSlot && <div className={styles['tedi-card-stepper__bottom-slot']}>{current.bottomSlot}</div>}

      {showStepList && (
        <Modal open={modalOpen} onToggle={setModalOpen}>
          <Modal.Content position="bottom">
            <Modal.Header>{resolvedLabels.modalHeading}</Modal.Header>
            <Modal.Body>
              <VerticalStepper aria-label={resolvedLabels.modalHeading}>
                {steps.map((step, index) => {
                  const navigable = isStepNavigable(index);
                  return (
                    <VerticalStepper.Item
                      key={step.id ?? index}
                      title={step.title}
                      description={step.description}
                      state={step.disabled ? 'disabled' : step.state}
                      current={index === active}
                      onClick={
                        navigable
                          ? () => {
                              goTo(index);
                              setModalOpen(false);
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </VerticalStepper>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
});

CardStepperInner.displayName = 'CardStepper';

export const CardStepper = Object.assign(CardStepperInner, {
  Step: CardStepperStep,
});

export default CardStepper;
