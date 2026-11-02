import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Button, ButtonProps } from '../button/button';
import ButtonGroup, { ButtonGroupProps } from './button-group';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=2215-38193&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/82e9cf-button-group" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof ButtonGroup> = {
  title: 'TEDI-Ready/Components/Buttons/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const buttonStates = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
const sizeArray: ButtonGroupProps['size'][] = ['default', 'small'];

const Template: StoryFn<Omit<ButtonGroupProps, 'children'> & { idPrefix?: string }> = ({ idPrefix = '', ...args }) => (
  <ButtonGroup {...args} ariaLabel="Button group example">
    <Button id={`${idPrefix}1`}>Details</Button>
    <Button id={`${idPrefix}2`} isActive>
      Updates
    </Button>
    <Button id={`${idPrefix}3`}>Settings</Button>
  </ButtonGroup>
);

interface TemplateMultipleProps<Type = ButtonGroupProps['size']> extends Omit<ButtonGroupProps, 'children'> {
  array: Type[];
  property: keyof ButtonGroupProps;
  idPrefix?: string;
}

const TemplateSizes: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, idPrefix = '', ...buttonGroupProps } = args;

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
                <Button id={`${idPrefix}${value}-01`}>Tab 1</Button>
                <Button id={`${idPrefix}${value}-02`} isActive>
                  Tab 2
                </Button>
                <Button id={`${idPrefix}${value}-03`}>Tab 3</Button>
              </ButtonGroup>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

const TemplateTypes: StoryFn<Partial<ButtonProps> & { idPrefix?: string }> = ({ idPrefix = '', ...args }) => {
  return (
    <Row gutterY={2}>
      <Col md={12}>
        <ButtonGroup type="primary" stretch={false} ariaLabel="Button group example">
          <Button id={`${idPrefix}1`} {...args}>
            Tab 1
          </Button>
          <Button id={`${idPrefix}2`} isActive {...args}>
            Tab 2
          </Button>
          <Button id={`${idPrefix}3`} {...args}>
            Tab 3
          </Button>
        </ButtonGroup>
      </Col>
      <Col md={12}>
        <ButtonGroup type="secondary" stretch={false}>
          <Button id={`${idPrefix}secondary-1`} {...args}>
            Tab 1
          </Button>
          <Button id={`${idPrefix}secondary-2`} isActive {...args}>
            Tab 2
          </Button>
          <Button id={`${idPrefix}secondary-3`} {...args}>
            Tab 3
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

const TemplateWithIcons: StoryFn<Omit<ButtonGroupProps, 'children'> & { idPrefix?: string }> = ({
  idPrefix = '',
  ...args
}) => {
  return (
    <ButtonGroup {...args} stretch={false}>
      <Button id={`${idPrefix}1`} iconLeft="table">
        Tab 1
      </Button>
      <Button id={`${idPrefix}2`} iconLeft="refresh" isActive>
        Tab 2
      </Button>
      <Button id={`${idPrefix}3`} iconLeft="settings">
        Tab 3
      </Button>
    </ButtonGroup>
  );
};

const TemplateIconOnly: StoryFn<Omit<ButtonGroupProps, 'children'> & { idPrefix?: string }> = ({
  idPrefix = '',
  ...args
}) => {
  return (
    <ButtonGroup {...args} stretch={false}>
      <Button id={`${idPrefix}1`} icon="table" showTooltip>
        Tab 1
      </Button>
      <Button id={`${idPrefix}2`} icon="refresh" isActive showTooltip>
        Tab 2
      </Button>
      <Button id={`${idPrefix}3`} icon="settings" showTooltip>
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
    enableMobileDropdown: true,
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

const DifferentWidthTemplate: StoryFn<Omit<ButtonGroupProps, 'children'> & { idPrefix?: string }> = ({
  idPrefix = '',
  ...args
}) => {
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
          <Button
            id={`${idPrefix}1`}
            isActive={selectedId === `${idPrefix}1`}
            onClick={() => setSelectedId(`${idPrefix}1`)}
          >
            Text
          </Button>
          <Button id={`${idPrefix}2`} isActive={selectedId === `${idPrefix}2`}>
            Longer text
          </Button>
          <Button id={`${idPrefix}3`} isActive={selectedId === `${idPrefix}3`}>
            Even longer text
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export const DifferentWidthButtons: Story = {
  render: DifferentWidthTemplate,
  args: {
    type: 'primary',
  },
};

export const Stretched: Story = {
  render: Template,
  args: {
    stretch: true,
    dropdownLabel: 'Text',
    enableMobileDropdown: true,
  },
};

/** Chromatic snapshot for ButtonGroup: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: ['#Hover-primary', '#Hover-secondary'],
      active: ['#Active-primary', '#Active-secondary'],
      focusVisible: ['#Focus-primary', '#Focus-secondary'],
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <Template type="primary" stretch={false} idPrefix="vt-default-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Sizes</Text>
        <TemplateSizes property="size" array={sizeArray} idPrefix="vt-sizes-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Types</Text>
        <TemplateTypes idPrefix="vt-types-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">With icon</Text>
        <TemplateWithIcons type="primary" idPrefix="vt-with-icon-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon only</Text>
        <TemplateIconOnly type="primary" idPrefix="vt-icon-only-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Primary states</Text>
        <TemplateColumn states={buttonStates} type="primary" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Secondary states</Text>
        <TemplateColumn states={buttonStates} type="secondary" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Different width buttons</Text>
        <DifferentWidthTemplate type="primary" idPrefix="vt-different-width-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Stretched</Text>
        <Template stretch idPrefix="vt-stretched-" />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
