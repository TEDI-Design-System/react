import { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { StatusIndicator } from './status-indicator';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=2405-53326&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof StatusIndicator> = {
  component: StatusIndicator,
  title: 'TEDI-Ready/Components/Helpers/StatusIndicator',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=2405-53326&m=dev',
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {
  args: {
    type: 'success',
    size: 'sm',
    hasBorder: false,
  },
};

const types = ['success', 'danger', 'warning', 'inactive'] as const;
const sizes = ['sm', 'lg'] as const;

export const AllVariants: Story = {
  render: () => (
    <div>
      {sizes.map((size) => (
        <Row key={size} className="padding-14-16">
          <Col width={2} className="flex align-items-center">
            <Text modifiers="bold">{size === 'sm' ? 'Small' : 'Large'}</Text>
          </Col>
          <Col className="flex align-items-center gap-3">
            {types.map((type) => (
              <StatusIndicator key={type} type={type} size={size} />
            ))}
          </Col>
        </Row>
      ))}
      {sizes.map((size) => (
        <Row key={`${size}-bordered`} className="padding-14-16">
          <Col width={2} className="flex align-items-center">
            <Text modifiers="bold">{size === 'sm' ? 'Small bordered' : 'Large bordered'}</Text>
          </Col>
          <Col className="flex align-items-center gap-3">
            {types.map((type) => (
              <StatusIndicator key={type} type={type} size={size} hasBorder />
            ))}
          </Col>
        </Row>
      ))}
    </div>
  ),
};

export const Examples: Story = {
  render: () => (
    <span style={{ position: 'relative' }}>
      Lugemata teated&nbsp;
      <StatusIndicator type="danger" position="top-right" />
    </span>
  ),
};

/** Chromatic snapshot for StatusIndicator: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <StatusIndicator type="success" size="sm" hasBorder={false} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">All variants</Text>
        {AllVariants.render?.({} as never, {} as never)}
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Examples</Text>
        <div>{Examples.render?.({} as never, {} as never)}</div>
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
