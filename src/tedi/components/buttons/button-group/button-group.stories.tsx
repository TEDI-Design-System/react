import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
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
    <Button id="1">Details</Button>
    <Button id="2" isActive>
      Updates
    </Button>
    <Button id="3">Settings</Button>
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
              <ButtonGroup type="primary" {...buttonGroupProps} {...{ [property]: value }}>
                <Button id="01">Tab 1</Button>
                <Button id="02" isActive>
                  Tab 2
                </Button>
                <Button id="03">Tab 3</Button>
              </ButtonGroup>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

const TemplateTypes: StoryFn<typeof Button> = (args) => {
  return (
    <Row gutterY={2}>
      <Col md={12}>
        <ButtonGroup type="primary" stretch={false} ariaLabel="Button group example">
          <Button id="1" {...args}>
            Tab 1
          </Button>
          <Button id="2" isActive {...args}>
            Tab 2
          </Button>
          <Button id="3" {...args}>
            Tab 3
          </Button>
        </ButtonGroup>
      </Col>
      <Col md={12}>
        <ButtonGroup type="secondary" stretch={false}>
          <Button id="1" {...args}>
            Tab 1
          </Button>
          <Button id="2" isActive {...args}>
            Tab 2
          </Button>
          <Button id="3" {...args}>
            Tab 3
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

const TemplateWithIcons: StoryFn<ButtonGroupProps> = (args) => {
  return (
    <ButtonGroup {...args} stretch={false}>
      <Button id="1" iconLeft="table">
        Tab 1
      </Button>
      <Button id="2" iconLeft="refresh" isActive>
        Tab 2
      </Button>
      <Button id="3" iconLeft="settings">
        Tab 3
      </Button>
    </ButtonGroup>
  );
};

const TemplateIconOnly: StoryFn<ButtonGroupProps> = (args) => {
  return (
    <ButtonGroup {...args} stretch={false}>
      <Button id="1" icon="table">
        Tab 1
      </Button>
      <Button id="2" icon="refresh" isActive>
        Tab 2
      </Button>
      <Button id="3" icon="settings">
        Tab 3
      </Button>
    </ButtonGroup>
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
    enableMobileDropdown: true,
  },
};

export const Types: StoryObj<typeof Button> = {
  render: TemplateTypes,
};

export const WithIcon: Story = {
  render: TemplateWithIcons,
  args: {
    type: 'primary',
    enableMobileDropdown: true,
    dropdownLabelMode: 'active',
  },
};

export const IconOnly: Story = {
  render: TemplateIconOnly,
  args: {
    type: 'primary',
  },
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
                Details
              </Button>
              <Button id={`${state}-2-${args.type}`} onClick={() => setSelectedId(`${state}-2-${args.type}`)}>
                Updates
              </Button>
              <Button id={`${state}-3-${args.type}`} onClick={() => setSelectedId(`${state}-3-${args.type}`)}>
                Settings
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
          <ButtonGroup
            {...args}
            stretch={false}
            onSelectionChange={setSelectedId}
            ariaLabel="Button group example"
            enableMobileDropdown
          >
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
