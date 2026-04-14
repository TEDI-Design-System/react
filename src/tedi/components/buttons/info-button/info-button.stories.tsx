import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import InfoButton from './info-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-72997&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/0341c9-info-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof InfoButton> = {
  component: InfoButton,
  title: 'Tedi-Ready/Components/Buttons/InfoButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-72997&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoButton>;

const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus'];

type TemplateMultipleProps = {
  array: typeof buttonStateArray;
  color?: 'default' | 'inverted';
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, color = 'default', ...buttonProps } = args;

  return (
    <VerticalSpacing>
      {array.map((state, index) => (
        <Row key={index}>
          <Col width={1} className="display-flex align-items-center">
            <Text modifiers="bold" color={color === 'inverted' ? 'white' : 'primary'}>
              {state}
            </Text>
          </Col>
          <Col width={1} className="text-center">
            <InfoButton
              title={`Info button ${state}`}
              color={color}
              {...buttonProps}
              aria-label={`Info button ${state}`}
              id={state}
            >
              Info button
            </InfoButton>
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

export const Default: Story = {
  args: {
    title: 'Info button',
  },
};

export const States: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const Inverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'inverted',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
    backgrounds: { default: 'brand' },
  },
};
