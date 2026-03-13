import { Meta, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { StatusIndicator } from './status-indicator';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=2405-53326&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof StatusIndicator> = {
  component: StatusIndicator,
  title: 'TEDI-Ready/Components/Tag/StatusIndicator',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=2405-53326&m=dev',
    },
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
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{size === 'sm' ? 'Small' : 'Large'}</Text>
          </Col>
          <Col className="display-flex align-items-center gap-3">
            {types.map((type) => (
              <StatusIndicator key={type} type={type} size={size} />
            ))}
          </Col>
        </Row>
      ))}
      {sizes.map((size) => (
        <Row key={`${size}-bordered`} className="padding-14-16">
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{size === 'sm' ? 'Small bordered' : 'Large bordered'}</Text>
          </Col>
          <Col className="display-flex align-items-center gap-3">
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
