import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';

import {
  getPrimaryComponentProps,
  getSubcomponentProps,
  subcomponentArgTypes,
} from '../../../../../.storybook/subcomponent-controls';
import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { HorizontalStepper, HorizontalStepperProps } from './horizontal-stepper';
import { HorizontalStepperItem, HorizontalStepperItemProps } from './horizontal-stepper-item';

const STEPS = ['Kutse', 'Tahteavaldus', 'Geenianalüüs', 'Vastus'];

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.51.75?node-id=11201-120696&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/42d5cb-stepper-horizontal" target="_blank">Zeroheight ↗</a>
 */
const meta: Meta<typeof HorizontalStepper> = {
  component: HorizontalStepper,
  subcomponents: {
    'HorizontalStepper.Item': HorizontalStepperItem,
  } as never,
  title: 'TEDI-Ready/Components/Navigation/HorizontalStepper',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.51.75?node-id=11201-120696&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<HorizontalStepperProps>;

/**
 * The default story doubles as an interactive playground with **live controls for
 * `HorizontalStepper.Item`**. The item knobs (`selected`, `completed`, `error`,
 * `disabled`, `description`, …) — flattened into namespaced controls via the shared
 * `subcomponentArgTypes` helper — drive the **first** step (current by default) so their
 * effect is visible next to the unchanged later steps. The ungrouped controls are
 * `HorizontalStepper`'s own props (`background`, `compact`, …); `label` is excluded since
 * each step sets its own.
 */
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(HorizontalStepper.Item, {
      category: 'HorizontalStepper.Item',
      prefix: 'item',
      exclude: ['label', 'onSelect'],
    }),
  },
  args: {
    'aria-label': 'Form progress',
    background: 'default',
    compact: 'sm',
    item__selected: true,
  },
  render: (args: Record<string, unknown>) => (
    <HorizontalStepper {...getPrimaryComponentProps<HorizontalStepperProps>(args)}>
      <HorizontalStepper.Item {...getSubcomponentProps(args, 'item')} label="Kutse" />
      <HorizontalStepper.Item label="Tahteavaldus" />
      <HorizontalStepper.Item label="Geenianalüüs" />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  ),
};

const STATE_ROWS = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'active', label: 'Active' },
  { key: 'focus', label: 'Focus' },
] as const;

const TYPE_COLS: { key: string; label: string; props: Partial<HorizontalStepperItemProps>; rows: string[] }[] = [
  { key: 'completed', label: 'Completed', props: { completed: true }, rows: ['default', 'hover', 'active', 'focus'] },
  { key: 'error', label: 'Has error', props: { error: true }, rows: ['default', 'hover', 'active', 'focus'] },
  { key: 'default', label: 'Default', props: {}, rows: ['default', 'hover', 'active'] },
  { key: 'selected', label: 'Selected', props: { selected: true }, rows: ['default'] },
];

const StatesMatrix = ({ compact }: { compact: boolean }) => {
  const breakpoint = useBreakpoint();
  const isMobile = isBreakpointBelow(breakpoint, 'md');

  if (isMobile) {
    return (
      <VerticalSpacing size={1.5}>
        {TYPE_COLS.map((col) => (
          <div key={col.key}>
            <Text modifiers="bold">{col.label}</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              {STATE_ROWS.filter((row) => col.rows.includes(row.key)).map((row) => (
                <div
                  key={row.key}
                  data-stepper-state={row.key}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <div style={{ minWidth: '4rem' }}>
                    <Text modifiers="small" color="secondary" element="span">
                      {row.label}
                    </Text>
                  </div>
                  <div style={{ width: 'fit-content', maxWidth: '100%' }}>
                    <HorizontalStepper
                      aria-label={`${col.label} – ${row.label}`}
                      background="transparent"
                      compact={compact}
                    >
                      <HorizontalStepper.Item label="Step" {...col.props} />
                    </HorizontalStepper>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </VerticalSpacing>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto repeat(4, max-content)',
        gap: '1rem 2rem',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <span />
      {TYPE_COLS.map((col) => (
        <Text key={col.key} modifiers="bold">
          {col.label}
        </Text>
      ))}
      {STATE_ROWS.map((row) => (
        <Fragment key={row.key}>
          <Text modifiers="bold">{row.label}</Text>
          {TYPE_COLS.map((col) =>
            col.rows.includes(row.key) ? (
              <div key={col.key} data-stepper-state={row.key}>
                <HorizontalStepper
                  aria-label={`${col.label} – ${row.label}`}
                  background="transparent"
                  compact={compact}
                >
                  <HorizontalStepper.Item label="Step" {...col.props} />
                </HorizontalStepper>
              </div>
            ) : (
              <span key={col.key} />
            )
          )}
        </Fragment>
      ))}
    </div>
  );
};

const statesPseudo = {
  pseudo: {
    hover: '[data-stepper-state="hover"] button',
    active: '[data-stepper-state="active"] button',
    focusVisible: '[data-stepper-state="focus"] button',
  },
};

export const SecondStep: Story = {
  render: () => (
    <HorizontalStepper aria-label="Form progress" compact="lg">
      <HorizontalStepper.Item label="Kutse" completed />
      <HorizontalStepper.Item label="Tahteavaldus" selected />
      <HorizontalStepper.Item label="Geenianalüüs" />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  ),
};

export const ThirdStep: Story = {
  render: () => (
    <HorizontalStepper aria-label="Form progress" compact="lg">
      <HorizontalStepper.Item label="Kutse" completed />
      <HorizontalStepper.Item label="Tahteavaldus" completed />
      <HorizontalStepper.Item label="Geenianalüüs" selected />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  ),
};

/**
 * `error` takes precedence over `completed` — the indicator shows a warning glyph
 * and the step switches to the danger colours. Pair it with `description` to
 * explain what went wrong.
 */
export const WithErrors: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <HorizontalStepper aria-label="Form with errors" compact="lg">
        <HorizontalStepper.Item label="Kutse" error />
        <HorizontalStepper.Item label="Tahteavaldus" selected />
        <HorizontalStepper.Item label="Geenianalüüs" />
        <HorizontalStepper.Item label="Vastus" />
      </HorizontalStepper>
      <HorizontalStepper aria-label="Form with error description" compact="lg">
        <HorizontalStepper.Item label="Kutse" completed />
        <HorizontalStepper.Item label="Tahteavaldus" error description="Sammus esinevad vead" />
        <HorizontalStepper.Item label="Geenianalüüs" selected />
        <HorizontalStepper.Item label="Vastus" />
      </HorizontalStepper>
    </VerticalSpacing>
  ),
};

/**
 * Add a `description` for a secondary line below each label.
 */
export const WithDescriptions: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <HorizontalStepper aria-label="Steps with descriptions" compact="lg">
        <HorizontalStepper.Item label="Kutse" selected />
        <HorizontalStepper.Item label="Tahteavaldus" />
        <HorizontalStepper.Item label="Geenianalüüs" description="Ametnik täidab" />
        <HorizontalStepper.Item label="Vastus" description="Ametnik täidab" />
      </HorizontalStepper>
      <HorizontalStepper aria-label="Steps with descriptions" compact="lg">
        <HorizontalStepper.Item label="Kutse" completed />
        <HorizontalStepper.Item label="Tahteavaldus" selected />
        <HorizontalStepper.Item label="Geenianalüüs" description="Ametnik täidab" />
        <HorizontalStepper.Item label="Vastus" description="Ametnik täidab" />
      </HorizontalStepper>
      <HorizontalStepper aria-label="Steps with descriptions" compact="lg">
        <HorizontalStepper.Item label="Kutse" completed />
        <HorizontalStepper.Item label="Tahteavaldus" completed />
        <HorizontalStepper.Item label="Geenianalüüs" selected description="Ametnik täidab" />
        <HorizontalStepper.Item label="Vastus" description="Ametnik täidab" />
      </HorizontalStepper>
      <HorizontalStepper aria-label="Steps with descriptions" compact="lg">
        <HorizontalStepper.Item label="Kutse" completed />
        <HorizontalStepper.Item label="Tahteavaldus" completed />
        <HorizontalStepper.Item label="Geenianalüüs" completed description="Ametnik täidab" />
        <HorizontalStepper.Item label="Vastus" selected description="Ametnik täidab" />
      </HorizontalStepper>
    </VerticalSpacing>
  ),
};

/**
 * `background="transparent"` drops the track surface so the stepper blends into
 * a coloured or patterned page background.
 */
export const TransparentBackground: Story = {
  render: () => (
    <HorizontalStepper aria-label="Form progress" background="transparent" compact="lg">
      <HorizontalStepper.Item label="Kutse" completed />
      <HorizontalStepper.Item label="Tahteavaldus" selected />
      <HorizontalStepper.Item label="Geenianalüüs" />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  ),
};

/**
 * Collapsed — only the indicators plus the selected step's label are shown. Use
 * `compact` (`true` for always-on, or a breakpoint like `compact="md"` to collapse
 * only below that width) to keep the stepper compact on narrow viewports.
 */
export const Compact: Story = {
  render: () => {
    const Demo = () => {
      const [current, setCurrent] = useState(1);
      return (
        <div style={{ maxWidth: 480 }}>
          <HorizontalStepper aria-label="Form progress" compact>
            {STEPS.map((label, index) => (
              <HorizontalStepper.Item
                key={label}
                label={label}
                description="Ametnik täidab"
                completed={index < current}
                selected={index === current}
                onSelect={() => setCurrent(index)}
              />
            ))}
          </HorizontalStepper>
        </div>
      );
    };
    return <Demo />;
  },
};

/**
 * Validation runs at the end of the form, so every step is reachable from the
 * header. Each item handles `onSelect` to update the current step; past steps
 * render as `completed`, future ones stay default.
 */
export const ClickToNavigate: Story = {
  render: () => {
    const Demo = () => {
      const [current, setCurrent] = useState(1);
      return (
        <HorizontalStepper aria-label="Form progress" compact="lg">
          {STEPS.map((label, index) => (
            <HorizontalStepper.Item
              key={label}
              label={label}
              completed={index < current}
              selected={index === current}
              onSelect={() => setCurrent(index)}
            />
          ))}
        </HorizontalStepper>
      );
    };
    return <Demo />;
  },
};

/**
 * Step-by-step validation — the user advances with `Edasi` / `Tagasi`. Past steps
 * render as `completed` and stay clickable for back-navigation; future steps are
 * `disabled` so they can't be skipped from the header.
 */
export const ExternalNavigation: Story = {
  render: () => {
    const Demo = () => {
      const [current, setCurrent] = useState(0);
      return (
        <VerticalSpacing size={1.5}>
          <HorizontalStepper aria-label="Form progress" compact="lg">
            {STEPS.map((label, index) => (
              <HorizontalStepper.Item
                key={label}
                label={label}
                completed={index < current}
                selected={index === current}
                disabled={index > current}
                onSelect={() => setCurrent(index)}
              />
            ))}
          </HorizontalStepper>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              visualType="secondary"
              disabled={current === 0}
              onClick={() => setCurrent((step) => Math.max(0, step - 1))}
            >
              Tagasi
            </Button>
            <Button
              disabled={current === STEPS.length - 1}
              onClick={() => setCurrent((step) => Math.min(STEPS.length - 1, step + 1))}
            >
              Edasi
            </Button>
          </div>
        </VerticalSpacing>
      );
    };
    return <Demo />;
  },
};

export const States: Story = {
  parameters: statesPseudo,
  render: () => <StatesMatrix compact={false} />,
};

export const CompactStates: Story = {
  parameters: statesPseudo,
  render: () => <StatesMatrix compact />,
};
