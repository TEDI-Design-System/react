import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import FloatingButton, { FloatingButtonProps } from './floating-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-73451&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/546461-floating-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof FloatingButton> = {
  component: FloatingButton,
  title: 'Tedi-ready/Components/Buttons/FloatingButton',
  parameters: {
    chromatic: { disableSnapshot: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-73451&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

const buttonSizeArray = ['Default', 'Large'];
const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus'];

type TemplateMultipleProps<Type = typeof buttonStateArray> = FloatingButtonProps & {
  array: Type;
  idPrefix?: string;
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, idPrefix, ...buttonProps } = args;
  const getId = (size: string, value: string, index: number) =>
    idPrefix ? `${idPrefix}${size}-${value}-${index}` : value;

  return (
    <Row style={{ gap: buttonProps.axis === 'vertical' ? 100 : 0 }}>
      {buttonSizeArray.map((size) => (
        <Col key={size} md={12}>
          <Row style={{ paddingBottom: 16 }}>
            <Col md={12} lg={6}>
              <Text modifiers="bold">{size}</Text>
            </Col>
          </Row>
          <Row style={{ gap: buttonProps.axis === 'vertical' ? 100 : 16, paddingBottom: 16 }}>
            {array.map((value, key) => (
              <Col xs={12} key={key} style={{ display: buttonProps.axis === 'vertical' ? 'flex' : undefined }}>
                <Col xs={2}>
                  <Text>{value}</Text>
                </Col>
                <Col className="flex align-items-center gap-3">
                  <FloatingButton
                    id={getId(size, value, 1)}
                    size={size === 'Large' ? 'large' : 'medium'}
                    {...buttonProps}
                  >
                    Scroll up
                  </FloatingButton>
                  <FloatingButton
                    id={getId(size, value, 2)}
                    size={size === 'Large' ? 'large' : 'medium'}
                    {...buttonProps}
                    iconRight="arrow_upward"
                  >
                    Scroll up
                  </FloatingButton>
                  <FloatingButton
                    id={getId(size, value, 3)}
                    size={size === 'Large' ? 'large' : 'medium'}
                    {...buttonProps}
                    iconLeft="arrow_upward"
                  >
                    Scroll up
                  </FloatingButton>
                  {buttonProps.axis === 'horizontal' && (
                    <FloatingButton
                      id={getId(size, value, 4)}
                      size={size === 'Large' ? 'large' : 'medium'}
                      {...buttonProps}
                      icon="arrow_upward"
                    >
                      Scroll up
                    </FloatingButton>
                  )}
                </Col>
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export const Default: Story = {
  args: {
    children: 'Scroll up',
    position: 'static',
  },
};

export const PrimaryHorizontal: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'horizontal',
    visualType: 'primary',
    position: 'static',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const PrimaryVertical: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'vertical',
    visualType: 'primary',
    position: 'static',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const SecondaryHorizontal: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'horizontal',
    visualType: 'secondary',
    position: 'static',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const SecondaryVertical: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    axis: 'vertical',
    visualType: 'secondary',
    position: 'static',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

/** Chromatic snapshot for FloatingButton: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: '[id^="vt-"][id*="-Hover-"]',
      active: '[id^="vt-"][id*="-Active-"]',
      focusVisible: '[id^="vt-"][id*="-Focus-"]',
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <FloatingButton position="static">Scroll up</FloatingButton>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Primary horizontal</Text>
        <TemplateColumn
          array={buttonStateArray}
          axis="horizontal"
          visualType="primary"
          position="static"
          idPrefix="vt-primary-horizontal-"
        >
          Scroll up
        </TemplateColumn>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Primary vertical</Text>
        <TemplateColumn
          array={buttonStateArray}
          axis="vertical"
          visualType="primary"
          position="static"
          idPrefix="vt-primary-vertical-"
        >
          Scroll up
        </TemplateColumn>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Secondary horizontal</Text>
        <TemplateColumn
          array={buttonStateArray}
          axis="horizontal"
          visualType="secondary"
          position="static"
          idPrefix="vt-secondary-horizontal-"
        >
          Scroll up
        </TemplateColumn>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Secondary vertical</Text>
        <TemplateColumn
          array={buttonStateArray}
          axis="vertical"
          visualType="secondary"
          position="static"
          idPrefix="vt-secondary-vertical-"
        >
          Scroll up
        </TemplateColumn>
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
