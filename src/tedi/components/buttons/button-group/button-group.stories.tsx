import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Button } from '../button/button';
import ButtonGroup, { ButtonGroupProps } from './button-group';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=2215-38193&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/82e9cf-button-group" target="_BLANK">ZeroHeight ↗</a>
 */

const meta: Meta<typeof ButtonGroup> = {
  title: 'TEDI-Ready/Components/Buttons/ButtonGroup',
  component: ButtonGroup,
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const buttonStates = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
const sizeArray: ButtonGroupProps['size'][] = ['default', 'small'];

const Template: StoryFn<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args} ariaLabel="Button group example">
    <Button id="1">Text</Button>
    <Button id="2" isActive>
      Text
    </Button>
    <Button id="3">Text</Button>
  </ButtonGroup>
);

interface TemplateMultipleProps<Type = ButtonGroupProps['size']> extends ButtonGroupProps {
  array: Type[];
  property: keyof ButtonGroupProps;
}

const TemplateSizes: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...buttonGroupProps } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => {
        return (
          <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col width={2}>
              <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
            </Col>
            <Col>
              <VerticalSpacing>
                <ButtonGroup type="primary" {...buttonGroupProps} {...{ [property]: value }}>
                  <Button id="01">Text</Button>
                  <Button id="02" isActive>
                    Text
                  </Button>
                  <Button id="03">Text</Button>
                </ButtonGroup>
              </VerticalSpacing>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

const TemplateTypes: StoryFn<typeof Button> = (args) => {
  return (
    <VerticalSpacing>
      <ButtonGroup type="primary" stretch={false} ariaLabel="Button group example">
        <Button id="1" {...args}>
          Text
        </Button>
        <Button id="2" isActive {...args}>
          Text
        </Button>
        <Button id="3" {...args}>
          Text
        </Button>
      </ButtonGroup>
      <ButtonGroup type="secondary" stretch={false}>
        <Button id="1" {...args}>
          Text
        </Button>
        <Button id="2" isActive {...args}>
          Text
        </Button>
        <Button id="3" {...args}>
          Text
        </Button>
      </ButtonGroup>
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    type: 'primary',
    stretch: false,
    dropdownLabel: 'Text',
  },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateSizes,
  args: {
    property: 'size',
    array: sizeArray,
    dropdownLabel: 'Text',
  },
};

export const Types: StoryObj<typeof Button> = {
  render: TemplateTypes,
};

export const WithIcon: StoryObj<typeof Button> = {
  render: TemplateTypes,
  args: { iconLeft: 'table' },
};

export const IconOnly: StoryObj<typeof Button> = {
  render: TemplateTypes,
  args: { icon: 'table' },
};

const TemplateColumn: StoryFn<{ states: string[]; type: 'primary' | 'secondary' }> = (args) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <VerticalSpacing size={0.5}>
      {args.states.map((state, index) => (
        <Row key={index}>
          <Col lg={1} md={2} sm={2}>
            <strong>{state}</strong>
          </Col>
          <Col lg={6} md={10} sm={10}>
            <ButtonGroup type={args.type} onSelectionChange={setSelectedId} ariaLabel="Button group example">
              <Button
                id={`${state}-${args.type}`}
                isActive={state === 'Active' || selectedId === `${state}-1-${args.type}`}
                onClick={() => setSelectedId(`${state}-1-${args.type}`)}
                disabled={state === 'Disabled'}
              >
                Text
              </Button>
              <Button id={`${state}-2-${args.type}`} onClick={() => setSelectedId(`${state}-2-${args.type}`)}>
                Text
              </Button>
              <Button id={`${state}-3-${args.type}`} onClick={() => setSelectedId(`${state}-3-${args.type}`)}>
                Text
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

export const Primary: StoryObj<{ states: string[] }> = {
  render: (args) => <TemplateColumn {...args} type="primary" />,
  args: {
    states: buttonStates,
  },
  parameters: {
    pseudo: {
      hover: ['#Hover-primary'],
      active: ['#Active-primary'],
      focusVisible: ['#Focus-primary'],
    },
  },
};

export const Secondary: StoryObj<{ states: string[] }> = {
  render: (args) => <TemplateColumn {...args} type="secondary" />,
  args: {
    states: buttonStates,
  },
  parameters: {
    pseudo: {
      hover: ['#Hover-secondary'],
      active: ['#Active-secondary'],
      focusVisible: ['#Focus-secondary'],
    },
  },
};

export const DifferentWidthButtons: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
      <Row>
        <Col md={12}>
          <ButtonGroup {...args} stretch={false} onSelectionChange={setSelectedId} ariaLabel="Button group example">
            <Button id="1" isActive={selectedId === '1'} onClick={() => setSelectedId('1')}>
              Text
            </Button>
            <Button id="2" isActive={selectedId === '2'}>
              Longer text
            </Button>
            <Button id="3" isActive={selectedId === '3'}>
              Even longer text
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  },
  args: {
    type: 'primary',
  },
};

export const Stretched: Story = {
  render: Template,
  args: {
    stretch: true,
  },
};
