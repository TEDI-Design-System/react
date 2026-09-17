import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { CSSProperties, useState } from 'react';

import {
  getPrimaryComponentProps,
  getSubcomponentProps,
  subcomponentArgTypes,
} from '../../../../../.storybook/subcomponent-controls';
import Toggle from '../../../../community/components/form/toggle/toggle';
import Button from '../../buttons/button/button';
import InfoButton from '../../buttons/info-button/info-button';
import { Col, Row } from '../../layout/grid';
import Tooltip, { TooltipProps } from './tooltip';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/035e20-tooltip" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<TooltipProps> = {
  component: Tooltip,
  title: 'TEDI-Ready/Components/Overlay/Tooltip',
  subcomponents: {
    'Tooltip.Trigger': Tooltip.Trigger,
    'Tooltip.Content': Tooltip.Content,
  } as never,
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('TooltipContent', 'Tooltip.Content').replaceAll('TooltipTrigger', 'Tooltip.Trigger');
        },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

const Template: StoryFn<TooltipProps> = (args) => {
  return (
    <Tooltip {...args}>
      <Tooltip.Trigger>
        <InfoButton>Info</InfoButton>
      </Tooltip.Trigger>
      <Tooltip.Content>Tooltip Content</Tooltip.Content>
    </Tooltip>
  );
};

const PositionTemplate: StoryFn<TooltipProps> = (args) => {
  return (
    <Row gap={3} justifyContent="center">
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="top-start">
          <Tooltip.Trigger>Top start</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="top">
          <Tooltip.Trigger>Top center</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="top-end">
          <Tooltip.Trigger>Top end</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="bottom-start">
          <Tooltip.Trigger>Bottom start</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="bottom">
          <Tooltip.Trigger>Bottom center</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="bottom-end">
          <Tooltip.Trigger>Bottom end</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="left-start">
          <Tooltip.Trigger>Left start</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="left">
          <Tooltip.Trigger>Left center</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="left-end">
          <Tooltip.Trigger>Left end</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="right-start">
          <Tooltip.Trigger>Right start</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="right">
          <Tooltip.Trigger>Right center</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col xs={12} lg={3} className="flex justify-content-center">
        <Tooltip {...args} placement="right-end">
          <Tooltip.Trigger>Right end</Tooltip.Trigger>
          <Tooltip.Content>Tooltip Content</Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

const WidthTemplate: StoryFn<TooltipProps> = (args) => {
  return (
    <Row gap={3}>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>Tooltip with no width limit</Tooltip.Trigger>
          <Tooltip.Content maxWidth="none">
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>Small tooltip width</Tooltip.Trigger>
          <Tooltip.Content maxWidth="small">
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>Medium tooltip width</Tooltip.Trigger>
          <Tooltip.Content>
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>Large tooltip width</Tooltip.Trigger>
          <Tooltip.Content maxWidth="large">
            The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
          </Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

const TriggerTemplate: StoryFn<TooltipProps> = (args) => {
  return (
    <Row gap={3}>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <InfoButton>Info</InfoButton>
          </Tooltip.Trigger>
          <Tooltip.Content>This tooltip trigger is Info icon.</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <Button icon="search">Search</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>This tooltip trigger is button with icon.</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <Toggle ariaLabel="Some toggle" label="Some toggle" />
          </Tooltip.Trigger>
          <Tooltip.Content>This tooltip trigger is toggle.</Tooltip.Content>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip {...args}>
          <Tooltip.Trigger>Tooltip trigger can...</Tooltip.Trigger>
          <Tooltip.Content>Tooltip trigger can be even text.</Tooltip.Content>
        </Tooltip>
      </Col>
    </Row>
  );
};

const ControlledTemplate: StoryFn<TooltipProps> = (args) => {
  const { open, ...rest } = args;
  const [innerOpen, setInnerOpen] = useState(open);

  return (
    <Tooltip {...rest} open={innerOpen} onToggle={setInnerOpen}>
      <Tooltip.Trigger>
        <InfoButton>Info</InfoButton>
      </Tooltip.Trigger>
      <Tooltip.Content>TooltipContent</Tooltip.Content>
    </Tooltip>
  );
};

/**
 * The default story doubles as an interactive playground with **live controls for
 * `Tooltip.Content`**. Its `maxWidth` is flattened into a namespaced control (grouped
 * under its own category) via the shared `subcomponentArgTypes` helper, then reassembled
 * in `render` with `getSubcomponentProps`. The ungrouped controls are `Tooltip`'s own
 * props (`placement`, `openWith`, …). Hover the trigger to reveal the content.
 */
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Tooltip.Content, {
      category: 'Tooltip.Content',
      prefix: 'content',
      exclude: ['children', 'labelledBy', 'describedBy'],
    }),
  },
  args: {
    content__maxWidth: 'medium',
  },
  render: (args: Record<string, unknown>) => (
    <Tooltip {...getPrimaryComponentProps<TooltipProps>(args)}>
      <Tooltip.Trigger>
        <InfoButton>Info</InfoButton>
      </Tooltip.Trigger>
      <Tooltip.Content {...getSubcomponentProps(args, 'content')}>
        The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
      </Tooltip.Content>
    </Tooltip>
  ),
};

export const ArrowPosition: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: PositionTemplate,
  args: {},
};

export const TooltipWidth: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: WidthTemplate,
  args: {},
};

export const Triggers: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: TriggerTemplate,
  args: {},
};

export const OpenWithClick: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: Template,
  args: {
    openWith: 'click',
  },
};

export const UncontrolledDefaultOpen: Story = {
  render: Template,
  args: {
    defaultOpen: true,
  },
};

export const ControlledOpen: Story = {
  render: ControlledTemplate,
  args: {
    open: true,
  },
};

const VERTICAL_PLACEMENTS = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] as const;
const HORIZONTAL_PLACEMENTS = ['left-start', 'left', 'left-end', 'right-start', 'right', 'right-end'] as const;

// Each open tooltip needs a slot it can grow into, or it lands on its neighbour and floating-ui
// flips or shifts it away from the placement being tested. The trigger sits at the far edge of its
// slot so the content grows inwards. Vertical and horizontal placements are split across two
// stories because `shift()` keeps content inside the viewport: a story taller than the viewport
// would drag its lowest tooltips back up.
const verticalSlotStyle = (placement: string): CSSProperties => ({
  height: 90,
  display: 'flex',
  alignItems: placement.startsWith('top') ? 'flex-end' : 'flex-start',
});

const horizontalSlotStyle: CSSProperties = { height: 90, display: 'flex', alignItems: 'center' };

/**
 * Visual-regression only. `ArrowPosition` renders closed triggers, so the bubble and its arrow were
 * never captured. `defaultOpen` renders them open from props alone.
 */
export const OpenVerticalPlacementsForVisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => (
    <div style={{ paddingTop: 80 }}>
      <Row>
        {VERTICAL_PLACEMENTS.map((placement) => (
          <Col key={placement} xs={4} className="flex justify-content-center">
            <div style={verticalSlotStyle(placement)}>
              <Tooltip defaultOpen placement={placement}>
                <Tooltip.Trigger>{placement}</Tooltip.Trigger>
                <Tooltip.Content>Tooltip Content</Tooltip.Content>
              </Tooltip>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  ),
};

/**
 * Visual-regression only. Side placements put the arrow on the left or right edge of the bubble.
 */
export const OpenHorizontalPlacementsForVisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => (
    <Row>
      {HORIZONTAL_PLACEMENTS.map((placement) => (
        <Col key={placement} xs={6} className="flex justify-content-center">
          <div style={horizontalSlotStyle}>
            <Tooltip defaultOpen placement={placement}>
              <Tooltip.Trigger>{placement}</Tooltip.Trigger>
              <Tooltip.Content>Tooltip Content</Tooltip.Content>
            </Tooltip>
          </div>
        </Col>
      ))}
    </Row>
  ),
};

/**
 * Visual-regression only. `maxWidth` decides where the text wraps, which is only visible once the
 * bubble is open. Stacked rather than placed side by side because `none` and `large` are wider
 * than a quarter of the canvas.
 */
export const OpenWidthsForVisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => (
    <Row>
      {(['none', 'small', 'medium', 'large'] as const).map((maxWidth) => (
        <Col key={maxWidth} xs={12}>
          <div style={{ height: 180 }}>
            <Tooltip defaultOpen placement="bottom-start">
              <Tooltip.Trigger>{maxWidth}</Tooltip.Trigger>
              <Tooltip.Content maxWidth={maxWidth}>
                The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
              </Tooltip.Content>
            </Tooltip>
          </div>
        </Col>
      ))}
    </Row>
  ),
};
