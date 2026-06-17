import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Collapse } from '../../buttons/collapse/collapse';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Alert } from '../../notifications/alert/alert';
import { CardStepper } from './card-stepper';
import { CardStepperStep, CardStepperStepProps } from './card-stepper-step';

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
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.59.78?node-id=51362-134115&m=dev',
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
  render: () => <CardStepper steps={STEPS_NO_DESC} activeStep={2} labels={ET_LABELS} aria-label="Taotluse sammud" />,
};

/**
 * `showStepNumber={false}` drops the step-number ring — the title sits on its own
 * with the counter and step-list button.
 */
export const WithoutStepNumber: Story = {
  render: () => (
    <CardStepper
      steps={STEPS_NO_DESC}
      activeStep={2}
      showStepNumber={false}
      labels={ET_LABELS}
      aria-label="Taotluse sammud"
    />
  ),
};

export const HasNavigation: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <CardStepper steps={STEPS_NO_DESC} activeStep={1} showNavigation labels={ET_LABELS} aria-label="Navigatsioon" />
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
 * `showStatusIcon` adds a status icon next to the active step's title — a success
 * check when the step's `state` is `'completed'`, a danger icon when it's
 * `'error'`. Other states show no icon.
 */
export const WithStatusIcon: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <CardStepper
        steps={[
          { title: 'Isikuandmed', state: 'completed' },
          { title: 'Üldandmed', state: 'completed' },
          { title: 'Taotleja andmed', state: 'completed' },
          { title: 'Ülevaade' },
        ]}
        activeStep={2}
        showStatusIcon
        labels={ET_LABELS}
        aria-label="Lõpetatud samm"
      />
      <CardStepper
        steps={[
          { title: 'Isikuandmed', state: 'completed' },
          { title: 'Üldandmed', state: 'completed' },
          { title: 'Taotleja andmed', state: 'error' },
          { title: 'Ülevaade' },
        ]}
        activeStep={2}
        showStatusIcon
        labels={ET_LABELS}
        aria-label="Veaga samm"
      />
    </VerticalSpacing>
  ),
};

/**
 * `infoPosition="bottom"` (the default) renders the active step's `description`
 * below its title. Shown with a plain layout, with navigation arrows and with the
 * number ring — matching the Figma "with info bottom" variants.
 */
export const WithInfoBottom: Story = {
  render: () => {
    const INFO_BOTTOM_STEPS: CardStepperStepProps[] = [
      { title: 'Isikuandmed', description: 'Taotleja või esindatav', state: 'completed' },
      { title: 'Üldandmed', description: 'Taotleja või esindatav', state: 'completed' },
      { title: 'Taotleja andmed', description: 'Taotleja või esindatav' },
      { title: 'Ülevaade', description: 'Taotleja või esindatav' },
    ];

    return (
      <VerticalSpacing size={1}>
        <CardStepper
          steps={INFO_BOTTOM_STEPS}
          activeStep={2}
          showStepNumber={false}
          labels={ET_LABELS}
          aria-label="Info all, ilma numbrita"
        />
        <CardStepper
          steps={INFO_BOTTOM_STEPS}
          activeStep={1}
          showNavigation
          labels={ET_LABELS}
          aria-label="Info all, navigatsiooniga"
        />
        <CardStepper
          steps={INFO_BOTTOM_STEPS}
          activeStep={2}
          labels={ET_LABELS}
          aria-label="Info all, sammu numbriga"
        />
      </VerticalSpacing>
    );
  },
};

/**
 * `infoPosition="top"` renders the active step's `description` as a small line above
 * its title. The `N / M` counter can also float above the title with
 * `counterPosition="top"` (it then leaves the trailing controls). Both compose with
 * the number ring, navigation arrows or a plain layout — matching the Figma "with
 * info top" variants.
 */
export const WithInfoTop: Story = {
  render: () => {
    const INFO_TOP_STEPS: CardStepperStepProps[] = [
      { title: 'Isikuandmed', description: 'Minu andmed', state: 'completed' },
      { title: 'Dokumendid', description: 'Minu andmed', state: 'completed' },
      { title: 'Elukoht', description: 'Minu andmed' },
      { title: 'Ülevaade', description: 'Minu andmed' },
    ];

    return (
      <VerticalSpacing size={1}>
        <CardStepper
          steps={STEPS_NO_DESC}
          activeStep={2}
          counterPosition="top"
          showStepNumber={false}
          labels={ET_LABELS}
          aria-label="Loendur üleval"
        />
        <CardStepper
          steps={INFO_TOP_STEPS}
          activeStep={2}
          infoPosition="top"
          labels={ET_LABELS}
          aria-label="Info üleval, sammu numbriga"
        />
        <CardStepper
          steps={INFO_TOP_STEPS}
          activeStep={1}
          infoPosition="top"
          showNavigation
          labels={ET_LABELS}
          aria-label="Info üleval, navigatsiooniga"
        />
        <CardStepper
          steps={INFO_TOP_STEPS}
          activeStep={2}
          infoPosition="top"
          showStepNumber={false}
          labels={ET_LABELS}
          aria-label="Info üleval, ilma numbrita"
        />
      </VerticalSpacing>
    );
  },
};

/**
 * A per-step `bottomSlot` renders custom content at the bottom of the card for the
 * active step — only the active step's slot is shown. It composes with any other
 * variant (with or without the progress bar / navigation arrows). The Figma spec
 * shows four uses: a warning `Alert`, a success `Alert`, an expandable "read more"
 * (`Collapse`) and an action `Button`.
 */
export const WithBottomSlot: Story = {
  render: () => {
    const slotSteps = (slot: ReactNode): CardStepperStepProps[] => [
      { title: 'Isikuandmed', state: 'completed' },
      { title: 'Üldandmed', state: 'completed' },
      { title: 'Dokumendid', bottomSlot: slot },
      { title: 'Ülevaade' },
    ];

    return (
      <VerticalSpacing size={1}>
        <CardStepper
          steps={slotSteps(<Alert type="warning">Andmeväljad sisaldavad ebatäpseid väärtuseid</Alert>)}
          activeStep={2}
          showProgress={false}
          labels={ET_LABELS}
          aria-label="Hoiatus bottom-slotis"
        />

        <CardStepper
          steps={slotSteps(<Alert type="success">Isikuandmed vastavad nõuetele</Alert>)}
          activeStep={2}
          labels={ET_LABELS}
          aria-label="Õnnestumine bottom-slotis"
        />

        <CardStepper
          steps={slotSteps(
            <Collapse id="card-stepper-read-more" openText="Loe lähemalt" closeText="Sulge" aria-label="Loe lähemalt">
              <Text>Lisainfo dokumentide kohta, mida selles sammus on vaja esitada.</Text>
            </Collapse>
          )}
          activeStep={2}
          showNavigation
          labels={ET_LABELS}
          aria-label="Laiendatav sisu bottom-slotis"
        />

        <CardStepper
          steps={slotSteps(
            <Button visualType="secondary" iconLeft="add" fullWidth>
              Lisa dokument
            </Button>
          )}
          activeStep={2}
          showNavigation
          labels={ET_LABELS}
          aria-label="Tegevusnupp bottom-slotis"
        />
      </VerticalSpacing>
    );
  },
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
