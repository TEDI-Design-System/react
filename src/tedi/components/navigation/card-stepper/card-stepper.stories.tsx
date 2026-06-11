import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { VerticalSpacing } from '../../layout/vertical-spacing';
import { CardStepper, CardStepperStepProps } from './card-stepper';
import { CardStepperStep } from './card-stepper-step';

/**
 * `CardStepper` is the mobile / compact form of a stepper: a single card showing
 * the active step, a `N / M` counter, a segmented progress bar and a button that
 * opens the full step list in a modal. Pair it with `VerticalStepper` on wider
 * screens (swap on a breakpoint — see `VerticalStepper` → **Responsive**), or use it on its own.
 */
const meta: Meta<typeof CardStepper> = {
  component: CardStepper,
  title: 'TEDI-Ready/Components/Navigation/CardStepper',
  subcomponents: { 'CardStepper.Step': CardStepperStep } as never,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.54.75?node-id=12466-177122&m=dev',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardStepper>;

const STEPS: CardStepperStepProps[] = [
  { title: 'Isikuandmed', state: 'completed' },
  { title: 'Üldandmed', state: 'completed' },
  { title: 'Terviseandmed', description: 'Kirjeldus' },
  { title: 'Ülevaade' },
];

const STEPS_NO_DESC: CardStepperStepProps[] = STEPS.map((step) => ({ title: step.title, state: step.state }));

const ET_LABELS = {
  previous: 'Eelmine samm',
  next: 'Järgmine samm',
  openSteps: 'Ava sammud',
  modalHeading: 'Sammud',
};

export const Default: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <CardStepper steps={STEPS} activeStep={2} labels={ET_LABELS} aria-label="Number ja kirjeldus" />
      <CardStepper steps={STEPS_NO_DESC} activeStep={2} labels={ET_LABELS} aria-label="Number" />
      <CardStepper steps={STEPS} activeStep={2} showStepNumber={false} labels={ET_LABELS} aria-label="Kirjeldus" />
      <CardStepper
        steps={STEPS_NO_DESC}
        activeStep={2}
        showStepNumber={false}
        labels={ET_LABELS}
        aria-label="Pealkiri"
      />
    </VerticalSpacing>
  ),
};

export const WithNavigation: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <CardStepper
        steps={STEPS}
        activeStep={2}
        showNavigation
        labels={ET_LABELS}
        aria-label="Navigatsioon + kirjeldus"
      />
      <CardStepper steps={STEPS_NO_DESC} activeStep={2} showNavigation labels={ET_LABELS} aria-label="Navigatsioon" />
    </VerticalSpacing>
  ),
};

export const WithoutProgressbar: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <CardStepper
        steps={STEPS}
        activeStep={2}
        showNavigation
        showProgress={false}
        labels={ET_LABELS}
        aria-label="Ilma edenemisribata + kirjeldus"
      />
      <CardStepper
        steps={STEPS_NO_DESC}
        activeStep={2}
        showNavigation
        showProgress={false}
        labels={ET_LABELS}
        aria-label="Ilma edenemisribata"
      />
    </VerticalSpacing>
  ),
};

/**
 * The compound API — declare steps as `CardStepper.Step` children instead of the
 * `steps` data prop. Equivalent in behaviour; pick whichever reads better for the
 * call site.
 */
export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(2);
    return (
      <CardStepper
        activeStep={step}
        onStepChange={setStep}
        showNavigation
        labels={ET_LABELS}
        aria-label="Taotluse sammud"
      >
        <CardStepper.Step title="Isikuandmed" state="completed" />
        <CardStepper.Step title="Üldandmed" state="completed" />
        <CardStepper.Step title="Terviseandmed" description="Kirjeldus" />
        <CardStepper.Step title="Ülevaade" />
      </CardStepper>
    );
  },
};

/**
 * A read-only progress tracker — no navigation and no step-list modal
 * (`showNavigation={false}`, `showStepList={false}`). Just shows "where am I".
 */
export const ReadOnlyTracker: Story = {
  render: () => (
    <CardStepper steps={STEPS} activeStep={2} showStepList={false} labels={ET_LABELS} aria-label="Taotluse seis" />
  ),
};

/**
 * Gated navigation — `allowJump="completed-or-next"` lets users jump only to
 * completed steps or the immediate next one in the list; a `disabled` step is
 * skipped by the arrows and not selectable.
 */
export const GatedNavigation: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    return (
      <CardStepper
        steps={[
          { title: 'Isikuandmed', state: 'completed' },
          { title: 'Üldandmed', state: 'completed' },
          { title: 'Terviseandmed' },
          { title: 'Ülevaade', disabled: true },
        ]}
        activeStep={step}
        onStepChange={setStep}
        showNavigation
        allowJump="completed-or-next"
        labels={ET_LABELS}
        aria-label="Taotluse sammud"
      />
    );
  },
};
