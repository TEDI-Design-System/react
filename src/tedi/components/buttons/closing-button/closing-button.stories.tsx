import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import { Card } from '../../content/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import ClosingButton, { ClosingButtonProps } from './closing-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/30df1b-closing-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof ClosingButton> = {
  component: ClosingButton,
  title: 'Tedi-Ready/Components/Buttons/ClosingButton',
  parameters: {
    chromatic: { disableSnapshot: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev',
    },
  },
};

const sizeArray: ClosingButtonProps['size'][] = ['default', 'small'];
const iconSizeArray: ClosingButtonProps['iconSize'][] = [18, 24];

export default meta;
type Story = StoryObj<typeof ClosingButton>;

const SizeTemplate: StoryFn = () => {
  return (
    <div className="example-list">
      {sizeArray.map((size, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="flex w-50">{size}</Col>
          <Col className="flex">
            <ClosingButton size={size} onClick={() => alert(`${size} button clicked`)} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const stateArray = ['Default', 'Hover', 'Active', 'Focus'];

const StatesTemplate: StoryFn = ({ idPrefix = '', ...args }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '200px' }}>
      {stateArray.map((state) => (
        <Row key={state}>
          <Col>
            <Text color={args.color === 'white' ? 'white' : 'primary'} modifiers="bold">
              {state}
            </Text>
          </Col>
          <Col>
            <ClosingButton id={`${idPrefix}${state}`} {...args} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const IconSizeTemplate: StoryFn = () => {
  return (
    <div className="example-list">
      {iconSizeArray.map((iconSize, key) => (
        <Row className={`${key === iconSizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="flex w-50">{`${iconSize}px`}</Col>
          <Col className="flex">
            <ClosingButton iconSize={iconSize} onClick={() => alert(`${iconSize}px icon clicked`)} className="hover" />
            {iconSize === 24 && (
              <div style={{ marginLeft: '16px' }}>
                <ClosingButton
                  iconSize={iconSize}
                  size="small"
                  onClick={() => alert(`${iconSize}px icon clicked`)}
                  className="hover"
                />
              </div>
            )}
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    title: 'close',
  },
};

export const Size: Story = {
  render: SizeTemplate,
};

/**
 * Hover state is shown on all buttons for size preview.
 */
export const IconSizes: Story = {
  render: IconSizeTemplate,
  parameters: {
    pseudo: {
      hover: '.hover',
    },
  },
};

export const States: Story = {
  render: StatesTemplate,
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const ColorBrand: Story = {
  render: StatesTemplate,
  args: {
    color: 'brand',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const ColorInverted: Story = {
  render: StatesTemplate,
  args: {
    color: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

/** Chromatic snapshot for ClosingButton: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: ['.hover', '#vt-states-Hover', '#vt-brand-Hover', '#vt-inverted-Hover'],
      active: ['#vt-states-Active', '#vt-brand-Active', '#vt-inverted-Active'],
      focusVisible: ['#vt-states-Focus', '#vt-brand-Focus', '#vt-inverted-Focus'],
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <ClosingButton title="close" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Size</Text>
        <SizeTemplate />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon sizes</Text>
        <IconSizeTemplate />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">States</Text>
        <StatesTemplate idPrefix="vt-states-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Color brand</Text>
        <StatesTemplate idPrefix="vt-brand-" color="brand" />
      </VerticalSpacing>
      <Card background="brand-primary" borderless>
        <Card.Content>
          <VerticalSpacing size={0.5}>
            <Text modifiers="bold" color="white">
              Color inverted
            </Text>
            <StatesTemplate idPrefix="vt-inverted-" color="white" />
          </VerticalSpacing>
        </Card.Content>
      </Card>
    </VerticalSpacing>
  ),
};
