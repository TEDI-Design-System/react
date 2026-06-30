import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { HideAt } from '../../layout/hide-at/hide-at';
import { ShowAt } from '../../layout/show-at/show-at';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Separator } from '../../misc/separator/separator';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { CardStepper, CardStepperStepProps } from '../card-stepper';
import { Link } from '../link/link';
import { VerticalStepper } from './vertical-stepper';
import { VerticalStepperItem, VerticalStepperItemProps } from './vertical-stepper-item';
import { VerticalStepperSubItem, VerticalStepperSubItemProps } from './vertical-stepper-sub-item';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.54.75?node-id=4375-57530&m=dev" target="_blank">Figma ↗</a><br/>
 */
const meta: Meta<typeof VerticalStepper> = {
  component: VerticalStepper,
  title: 'TEDI-Ready/Components/Navigation/VerticalStepper',
  subcomponents: {
    'VerticalStepper.Item': VerticalStepperItem,
    'VerticalStepper.SubItem': VerticalStepperSubItem,
  } as never,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.54.75?node-id=4375-57530&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VerticalStepper>;

const noop = () => undefined;

const Frame = ({ children }: { children: React.ReactNode }) => <div style={{ maxWidth: 360 }}>{children}</div>;

export const Default: Story = {
  render: () => (
    <Frame>
      <VerticalStepper aria-label="Hindamise edenemine">
        <VerticalStepper.Item title="Sotsiaalne võrgustik" current href="#step-1" />
        <VerticalStepper.Item title="Sotsiaalsed suhted" state="completed" defaultOpen>
          <VerticalStepper.SubItem title="Sõbrad" state="completed" onClick={noop} />
          <VerticalStepper.SubItem title="Pere" onClick={noop} />
        </VerticalStepper.Item>
        <VerticalStepper.Item title="Vaimne tervis" state="completed" href="#step-3" />
        <VerticalStepper.Item title="Füüsiline tervis" state="completed" href="#step-4" />
        <VerticalStepper.Item title="Elukeskkond" state="completed" href="#step-5" />
        <VerticalStepper.Item title="Hõivatus" state="error" href="#step-6" />
        <VerticalStepper.Item title="Vaba aeg ja huvitegevused" state="completed" href="#step-7" />
        <VerticalStepper.Item title="Igapäevaelu toimingud" href="#step-8" />
      </VerticalStepper>
    </Frame>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Frame>
      <VerticalStepper aria-label="Taotluse menetlus">
        <VerticalStepper.Item title="Kutse" state="completed" href="#k1" />
        <VerticalStepper.Item
          title="Tahteavaldus"
          description="Ülevaatamine võib võtta kuni 30 tööpäeva"
          state="completed"
          href="#k2"
        />
        <VerticalStepper.Item
          title="Geenianalüüs"
          description="Menetlemine võtab aega kuni 30 päeva"
          current
          href="#k3"
        />
        <VerticalStepper.Item title="Vastus" href="#k4" />
      </VerticalStepper>
    </Frame>
  ),
};

export const WithStatusBadges: Story = {
  render: () => (
    <Frame>
      <VerticalStepper aria-label="Andmete kontroll">
        <VerticalStepper.Item
          title="Isikuandmed"
          state="completed"
          href="#i1"
          info={
            <StatusBadge color="success" variant="bordered">
              Isik on tõestatud
            </StatusBadge>
          }
        />
        <VerticalStepper.Item title="Üldandmed" state="completed" href="#i2" />
        <VerticalStepper.Item title="Terviseandmed" state="completed" href="#i3" />
        <VerticalStepper.Item title="Vastus" current href="#i4" info={<Text color="tertiary">Täidab ametnik</Text>} />
      </VerticalStepper>
    </Frame>
  ),
};

export const WithButton: Story = {
  render: () => (
    <Frame>
      <VerticalStepper aria-label="Andmete sisestus">
        <VerticalStepper.Item
          title="Isikuandmed"
          state="completed"
          href="#b1"
          info={
            <Button visualType="secondary" size="small" iconLeft="add">
              Lisa isik
            </Button>
          }
        />
        <VerticalStepper.Item title="Üldandmed" state="completed" href="#b2" />
        <VerticalStepper.Item title="Terviseandmed" state="completed" href="#b3" />
        <VerticalStepper.Item title="Ülevaade" current href="#b4" />
      </VerticalStepper>
    </Frame>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <Frame>
      <VerticalStepper aria-label="Tervisevaldkonnad">
        <VerticalStepper.Item
          title="Vaimne tervis"
          state="completed"
          href="#l1"
          info={
            <Link href="#read-1" iconRight="arrow_forward">
              Loe rohkem
            </Link>
          }
        />
        <VerticalStepper.Item
          title="Füüsiline tervis"
          state="completed"
          href="#l2"
          info={
            <Link href="#read-2" iconRight="arrow_forward">
              Loe rohkem
            </Link>
          }
        />
        <VerticalStepper.Item title="Üldandmed" state="completed" href="#l3" />
        <VerticalStepper.Item title="Ülevaade" current href="#l4" />
      </VerticalStepper>
    </Frame>
  ),
};

export const Compact: Story = {
  render: () => (
    <Frame>
      <VerticalStepper aria-label="Hindamise edenemine" compact>
        <VerticalStepper.Item title="Sotsiaalne võrgustik" current href="#c1" />
        <VerticalStepper.Item title="Sotsiaalsed suhted" state="completed" defaultOpen>
          <VerticalStepper.SubItem title="Sõbrad" state="completed" onClick={noop} />
          <VerticalStepper.SubItem title="Pere" onClick={noop} />
        </VerticalStepper.Item>
        <VerticalStepper.Item title="Vaimne tervis" state="completed" href="#c3" />
        <VerticalStepper.Item title="Füüsiline tervis" state="completed" href="#c4" />
        <VerticalStepper.Item title="Elukeskkond" state="completed" href="#c5" />
        <VerticalStepper.Item title="Hõivatus" state="error" href="#c6" />
        <VerticalStepper.Item title="Vaba aeg ja huvitegevused" state="completed" href="#c7" />
        <VerticalStepper.Item title="Igapäevaelu toimingud" href="#c8" />
      </VerticalStepper>
    </Frame>
  ),
};

type StateDef<T> = { label: string; props: Partial<T>; noHover?: boolean };

const ITEM_STATES: StateDef<VerticalStepperItemProps>[] = [
  { label: 'Completed', props: { state: 'completed' } },
  { label: 'Has error', props: { state: 'error' } },
  { label: 'Default', props: {} },
  { label: 'Selected', props: { current: true } },
  { label: 'Disabled', props: { state: 'disabled' }, noHover: true },
];

const SUB_STATES: StateDef<VerticalStepperSubItemProps>[] = [
  { label: 'Completed', props: { state: 'completed' } },
  { label: 'Has error', props: { state: 'error' } },
  { label: 'Default', props: {} },
  { label: 'Selected', props: { current: true } },
  { label: 'Disabled', props: { state: 'disabled' }, noHover: true },
  { label: 'Informative', props: { state: 'informative' }, noHover: true },
];

const itemCell = (compact: boolean, props: Partial<VerticalStepperItemProps>) => (
  <VerticalStepper aria-label="Stepper state example" compact={compact}>
    <VerticalStepper.Item title="Text" onClick={noop} {...props} />
    <VerticalStepper.Item title="Text" onClick={noop} {...props} />
  </VerticalStepper>
);

const subCell = (props: Partial<VerticalStepperSubItemProps>) => (
  <VerticalStepper aria-label="Sub-step state example">
    <VerticalStepper.Item title="Text" defaultOpen>
      <VerticalStepper.SubItem title="Text" onClick={noop} {...props} />
      <VerticalStepper.SubItem title="Text" onClick={noop} {...props} />
    </VerticalStepper.Item>
  </VerticalStepper>
);

const StateMatrix = <T,>({
  states,
  renderCell,
}: {
  states: StateDef<T>[];
  renderCell: (props: Partial<T>) => JSX.Element;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `5rem repeat(${states.length}, minmax(140px, 1fr))`,
      gap: '24px 16px',
      alignItems: 'start',
    }}
  >
    <span />
    {states.map((s) => (
      <Text key={s.label} modifiers="bold">
        {s.label}
      </Text>
    ))}

    <Text modifiers="bold">Default</Text>
    {states.map((s) => (
      <div key={s.label}>{renderCell(s.props)}</div>
    ))}

    <Text modifiers="bold">Hover</Text>
    {states.map((s) => (
      <div key={s.label} className={s.noHover ? undefined : 'vs-hover'}>
        {s.noHover ? null : renderCell(s.props)}
      </div>
    ))}
  </div>
);

export const States: Story = {
  parameters: { pseudo: { hover: ['.vs-hover a', '.vs-hover button'] } },
  render: () => (
    <VerticalSpacing size={2}>
      <StateMatrix states={ITEM_STATES} renderCell={(props) => itemCell(false, props)} />
      <Separator />
      <StateMatrix states={ITEM_STATES} renderCell={(props) => itemCell(true, props)} />
      <Separator />
      <StateMatrix states={SUB_STATES} renderCell={subCell} />
    </VerticalSpacing>
  ),
};

const RESPONSIVE_STEPS: CardStepperStepProps[] = [
  { title: 'Isikuandmed', description: 'Üles laaditud 03.06.2026', state: 'completed' },
  { title: 'Üldandmed', state: 'completed' },
  { title: 'Terviseandmed' },
  { title: 'Ülevaade' },
];

/**
 * On wider screens the full `VerticalStepper` is shown; below `md` it collapses to
 * the compact `CardStepper`, sharing one `activeStep` and step list. The swap uses
 * the `ShowAt` / `HideAt` layout helpers. Resize the canvas (or use the viewport
 * toolbar) to see it switch.
 */
export const Responsive: Story = {
  render: function ResponsiveExample() {
    const [step, setStep] = useState(2);

    return (
      <>
        <ShowAt md>
          <Frame>
            <VerticalStepper aria-label="Taotluse sammud">
              {RESPONSIVE_STEPS.map((s, index) => (
                <VerticalStepper.Item
                  key={index}
                  title={s.title}
                  description={s.description}
                  state={s.state}
                  current={index === step}
                  onClick={() => setStep(index)}
                />
              ))}
            </VerticalStepper>
          </Frame>
        </ShowAt>

        <HideAt md>
          <Frame>
            <CardStepper
              steps={RESPONSIVE_STEPS}
              activeStep={step}
              onStepChange={setStep}
              showNavigation
              labels={{
                previous: 'Eelmine samm',
                next: 'Järgmine samm',
                openSteps: 'Ava sammud',
                modalHeading: 'Sammud',
              }}
              aria-label="Taotluse sammud"
            />
          </Frame>
        </HideAt>
      </>
    );
  },
};
