import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Col, Icon, Row, Text, TextProps, VerticalSpacing } from '../../../../tedi';
import ButtonGroup, { ButtonGroupProps } from '../button-group/button-group';
import MapButton, { MapButtonProps } from './map-button';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=2-214&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/83bdb3-map-button" target="_BLANK">ZeroHeight ↗</a>
 */

const meta: Meta<typeof MapButton> = {
  component: MapButton,
  title: 'Community/Map components/MapButton',
};

export default meta;
type Story = StoryObj<typeof MapButton>;

const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus', 'Selected'];
type TemplateMultipleProps<Type = typeof buttonStateArray> = MapButtonProps & {
  array: Type;
  titleColor: TextProps['color'];
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, ...buttonProps } = args;

  return (
    <>
      <VerticalSpacing size={0.5}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text color={titleColor} modifiers="bold">
              Default
            </Text>
          </Col>
          <Col className="text-bold">
            <Text color={titleColor} modifiers="bold">
              Small
            </Text>
          </Col>
        </Row>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="display-flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col className="display-flex align-items-center gap-3">
              <MapButton id={value} {...buttonProps} selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} {...buttonProps} icon="straighten" selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} {...buttonProps} selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} {...buttonProps} icon="straighten" selected={value === 'Selected'} hideLabel>
                Text
              </MapButton>
            </Col>
            <Col className="display-flex align-items-center gap-3">
              <MapButton id={value} size="small" {...buttonProps} selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} size="small" {...buttonProps} icon="straighten" selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton id={value} size="small" {...buttonProps} icon="edit" selected={value === 'Selected'}>
                Text
              </MapButton>
              <MapButton
                id={value}
                size="small"
                {...buttonProps}
                icon="straighten"
                selected={value === 'Selected'}
                hideLabel
              >
                Text
              </MapButton>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

export const HideLabel: Story = {
  args: {
    children: 'Text',
    hideLabel: true,
    icon: 'straighten',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Text',
    icon: 'straighten',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Text',
    icon: 'straighten',
    isLoading: true,
  },
};

export const Underline: Story = {
  args: {
    children: 'Text',
    underline: true,
  },
};

export const WithDropdown: Story = {
  args: {
    children: 'Text',
    icon: 'straighten',
    dropdownItems: [
      {
        children: (
          <Text>
            <Icon name="radio_button_unchecked" display="inline" /> Mõõda ringina
          </Text>
        ),
        isActive: true,
        onClick: () => console.log('Item 1 clicked'),
      },
      {
        children: (
          <Text>
            <Icon name="polyline" display="inline" /> Mõõda joonena
          </Text>
        ),
        onClick: () => console.log('Item 2 clicked'),
      },
      {
        children: (
          <Text>
            <Icon name="check_box_outline_blank" display="inline" /> Mõõda ala
          </Text>
        ),
        onClick: () => console.log('Item 3 clicked'),
      },
    ],
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

const TemplateGroup: StoryFn<ButtonGroupProps> = (args) => {
  return (
    <ButtonGroup {...args}>
      <MapButton icon="explore">Kompass</MapButton>
      <MapButton icon="straighten">Mõõda</MapButton>
      <MapButton icon="compare">Võrdle</MapButton>
      <MapButton icon="history">Ajajoon</MapButton>
    </ButtonGroup>
  );
};

// meta.component is MapButton, so Storybook infers MapButton's controls. For the ButtonGroup
// stories we declare ButtonGroup's argTypes explicitly and restrict the Controls panel to them.
const buttonGroupArgTypes: Meta<typeof ButtonGroup>['argTypes'] = {
  direction: { control: 'radio', options: ['horizontal', 'vertical'] },
  stretch: { control: 'boolean' },
  prefix: { control: 'text' },
  suffix: { control: 'text' },
  ariaLabel: { control: 'text' },
};

const buttonGroupParameters: Meta<typeof ButtonGroup>['parameters'] = {
  controls: { include: ['direction', 'stretch', 'prefix', 'suffix', 'ariaLabel'] },
};

export const ButtonGroupHorizontal: StoryObj<ButtonGroupProps> = {
  render: TemplateGroup,
  argTypes: buttonGroupArgTypes,
  parameters: buttonGroupParameters,
  args: {
    direction: 'horizontal',
  },
};

export const ButtonGroupVertical: StoryObj<ButtonGroupProps> = {
  render: TemplateGroup,
  argTypes: buttonGroupArgTypes,
  parameters: buttonGroupParameters,
  args: {
    direction: 'vertical',
  },
};

export const ButtonGroupHorizontalWithPrefixAndSuffix: StoryObj<ButtonGroupProps> = {
  render: TemplateGroup,
  argTypes: buttonGroupArgTypes,
  parameters: buttonGroupParameters,
  args: {
    direction: 'horizontal',
    prefix: 'Prefix',
    suffix: 'Suffix',
    ariaLabel: 'Example button group',
  },
};

export const ButtonGroupVerticalWithPrefixAndSuffix: StoryObj<ButtonGroupProps> = {
  render: TemplateGroup,
  argTypes: buttonGroupArgTypes,
  parameters: buttonGroupParameters,
  args: {
    direction: 'vertical',
    prefix: '360°',
    suffix: '360°',
    ariaLabel: 'Example button group',
  },
};
