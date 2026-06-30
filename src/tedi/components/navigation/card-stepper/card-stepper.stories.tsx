import { Meta, StoryObj } from '@storybook/react-vite';
import { type CSSProperties, ReactNode, useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { CardButton } from '../../buttons/card-button/card-button';
import { Collapse } from '../../buttons/collapse/collapse';
import { Card } from '../../cards/card/card';
import { Col, Row } from '../../layout/grid';
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
    (Story, context) => (
      <div style={{ maxWidth: context.parameters.fullWidth ? undefined : 360 }}>
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

const MANY_STEPS: CardStepperStepProps[] = [
  { title: 'Kutse', state: 'completed' },
  { title: 'Tahteavaldus', state: 'completed' },
  { title: 'Geenianalüüs' },
  { title: 'Vastus' },
  ...Array.from({ length: 8 }, (_, i) => ({ title: `Samm ${i + 5}` })),
];

/**
 * A longer flow — open the step-list button to see the full numbered step list in the modal
 * (completed steps show a check, the current step is highlighted).
 */
export const ManySteps: Story = {
  name: 'Many steps (open the list)',
  render: () => <CardStepper steps={MANY_STEPS} activeStep={2} labels={ET_LABELS} aria-label="Geeniuuringu sammud" />,
};

const SUB_STEP_FLOW: CardStepperStepProps[] = [
  { title: 'Kutse', state: 'completed' },
  {
    title: 'Tahteavaldus',
    state: 'completed',
    subSteps: [
      { title: 'Nõusolek', state: 'completed' },
      { title: 'Allkiri', state: 'completed' },
    ],
  },
  {
    title: 'Geenianalüüs',
    description: 'Kirjeldus',
    subSteps: [
      { title: 'Proovi andmine', state: 'completed' },
      { title: 'Analüüs', current: true },
      { title: 'Tulemused' },
    ],
  },
  { title: 'Vastus' },
];

/**
 * A step with `subSteps` becomes a collapsible parent in the step-list modal — open the list
 * to see the active step expanded into its sub-steps. The parent title still navigates; a
 * separate chevron toggles the sub-list.
 */
export const CollapsibleSubSteps: Story = {
  name: 'Collapsible sub-steps (open the list)',
  render: () => (
    <CardStepper steps={SUB_STEP_FLOW} activeStep={2} labels={ET_LABELS} aria-label="Sammud alamsammudega" />
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

type ButtonStepState = 'completed' | 'current' | 'upcoming';

const stepIndicatorStyle = (state: ButtonStepState): CSSProperties => {
  const base: CSSProperties = {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    fontSize: 'var(--body-small-regular-size)',
    lineHeight: 1,
  };
  if (state === 'completed') {
    return {
      ...base,
      color: 'var(--general-text-white)',
      backgroundColor: 'var(--stepper-step-completed-bg)',
      border: 'var(--tedi-borders-01) solid var(--stepper-step-completed-bg)',
    };
  }
  if (state === 'current') {
    return {
      ...base,
      color: 'var(--stepper-item-vertical-text-selected)',
      backgroundColor: 'var(--stepper-step-selected-bg)',
      border: 'var(--tedi-borders-02) solid var(--stepper-step-selected-border)',
    };
  }
  return {
    ...base,
    color: 'var(--stepper-item-vertical-text-disabled)',
    backgroundColor: 'var(--stepper-step-disabled-bg)',
    border: 'var(--tedi-borders-01) solid var(--stepper-step-disabled-border)',
  };
};

const BUTTON_STEPS = [
  { title: 'Minu andmed' },
  { title: 'Tervise ajalugu' },
  { title: 'Analüüside tulemused', description: 'Täidab meditsiini töötaja', trailing: '15p' },
  { title: 'Harjumused' },
  { title: 'Praegune terviseseisund' },
  { title: 'Ülevaade' },
];

interface StepCardProps {
  index: number;
  state: ButtonStepState;
  title: string;
  description?: string;
  trailing?: string;
  onClick?: () => void;
}

const StepCard = ({ index, state, title, description, trailing, onClick }: StepCardProps): JSX.Element => (
  <CardButton disabled={state === 'upcoming'} onClick={onClick} aria-current={state === 'current' ? 'step' : undefined}>
    <Card>
      <Card.Content>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--layout-grid-gutters-08)' }}>
          {/* align the number with the title line (not centered against title + description) */}
          <span aria-hidden="true" style={{ ...stepIndicatorStyle(state), alignSelf: 'flex-start' }}>
            {index}
          </span>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--layout-grid-gutters-04)' }}>
              <Text element="span" modifiers="bold">
                {title}
              </Text>
              {state === 'completed' && <Icon name="check" color="success" size={18} display="inline" />}
            </div>
            {description && (
              <Text element="span" modifiers="small" color="tertiary">
                {description}
              </Text>
            )}
          </div>
          {trailing && (
            <Text element="span" modifiers="small" color="tertiary">
              {trailing}
            </Text>
          )}
          <Icon name="arrow_right_alt" color="secondary" />
        </div>
      </Card.Content>
    </Card>
  </CardButton>
);

/**
 * The "button cards" form of a stepper: instead of one compact `CardStepper` card, each step is its
 * own clickable `CardButton` (step-number ring + title; completed steps show a check, the current
 * step its description / timing, upcoming steps are disabled). Composed in the story — there's no
 * built-in component for it.
 */
export const CardStepperButton: Story = {
  name: 'Card stepper button',
  render: function CardStepperButtonExample() {
    const [active, setActive] = useState(2);

    return (
      <div style={{ maxWidth: 420 }}>
        <VerticalSpacing size={0.5}>
          {BUTTON_STEPS.map((step, index) => {
            const state: ButtonStepState = index < active ? 'completed' : index === active ? 'current' : 'upcoming';
            return (
              <StepCard
                key={step.title}
                index={index + 1}
                state={state}
                title={step.title}
                description={step.description}
                trailing={step.trailing}
                onClick={() => setActive(index)}
              />
            );
          })}
        </VerticalSpacing>
      </div>
    );
  },
};

type ButtonStepSemantic = 'default' | 'error' | 'success';

const semanticIndicatorStyle = (semantic: ButtonStepSemantic, disabled = false): CSSProperties => {
  const base: CSSProperties = {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    fontSize: 'var(--body-small-regular-size)',
    lineHeight: 1,
  };
  if (disabled) {
    // Disabled overrides the semantic colour — the number ring goes muted/grey.
    return {
      ...base,
      color: 'var(--stepper-item-vertical-text-disabled)',
      backgroundColor: 'var(--stepper-step-disabled-bg)',
      border: 'var(--tedi-borders-01) solid var(--stepper-step-disabled-border)',
    };
  }
  if (semantic === 'error') {
    return {
      ...base,
      color: 'var(--general-text-white)',
      backgroundColor: 'var(--stepper-step-danger-bg)',
      border: 'var(--tedi-borders-01) solid var(--stepper-step-danger-bg)',
    };
  }
  if (semantic === 'success') {
    return {
      ...base,
      color: 'var(--general-text-white)',
      backgroundColor: 'var(--stepper-step-completed-bg)',
      border: 'var(--tedi-borders-01) solid var(--stepper-step-completed-bg)',
    };
  }
  return {
    ...base,
    color: 'var(--general-text-secondary)',
    backgroundColor: 'var(--stepper-step-default-bg)',
    border: 'var(--tedi-borders-01) solid var(--stepper-step-default-border)',
  };
};

const SEMANTIC_COLUMNS: { key: ButtonStepSemantic; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'error', label: 'Has error' },
  { key: 'success', label: 'Success' },
];

const BUTTON_STATE_ROWS = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'] as const;

const stateStepCard = (semantic: ButtonStepSemantic, row: (typeof BUTTON_STATE_ROWS)[number]): JSX.Element => (
  <CardButton data-pseudo={row} disabled={row === 'Disabled'}>
    <Card>
      <Card.Content>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--layout-grid-gutters-08)' }}>
          <span aria-hidden="true" style={semanticIndicatorStyle(semantic, row === 'Disabled')}>
            1
          </span>
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              gap: 'var(--layout-grid-gutters-04)',
              minWidth: 0,
            }}
          >
            <Text element="span" modifiers="bold">
              Minu andmed
            </Text>
            {row !== 'Disabled' && semantic === 'error' && (
              <Icon name="error" color="danger" size={18} display="inline" />
            )}
            {row !== 'Disabled' && semantic === 'success' && (
              <Icon name="check" color="success" size={18} display="inline" />
            )}
          </div>
          <Icon name="arrow_right_alt" color="secondary" />
        </div>
      </Card.Content>
    </Card>
  </CardButton>
);

export const CardStepperButtonStates: Story = {
  name: 'Card stepper button states',
  parameters: {
    fullWidth: true,
    pseudo: {
      hover: '[data-pseudo="Hover"]',
      active: '[data-pseudo="Active"]',
      focusVisible: '[data-pseudo="Focus"]',
    },
  },
  render: () => (
    <VerticalSpacing size={1}>
      <Row alignItems="center" gutterY={2} lg={{ gutterY: 0 }}>
        <Col xs={12} lg={2} />
        {SEMANTIC_COLUMNS.map((column) => (
          <Col key={column.key} xs={12} lg={3} grow={1}>
            <Text modifiers="bold">{column.label}</Text>
          </Col>
        ))}
      </Row>

      {BUTTON_STATE_ROWS.map((row) => (
        <Row key={row} alignItems="center" gutterY={2} lg={{ gutterY: 0 }}>
          <Col xs={12} lg={2}>
            <Text modifiers="bold">{row}</Text>
          </Col>
          {SEMANTIC_COLUMNS.map((column) => (
            <Col key={column.key} xs={12} lg={3} grow={1}>
              {stateStepCard(column.key, row)}
            </Col>
          ))}
        </Row>
      ))}
    </VerticalSpacing>
  ),
};
