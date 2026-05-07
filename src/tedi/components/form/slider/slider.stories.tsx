import { Decorator, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Field } from '../field/field';
import InputGroup from '../input-group/input-group';
import { NumberField } from '../number-field/number-field';
import { Slider, SliderProps } from './slider';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=19071-105925&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'TEDI-Ready/Components/Form/Slider',
  argTypes: {
    addonRight: { control: false },
  },
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=19071-105925&m=dev',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

const wrapInCol: Decorator = (Story) => (
  <Row>
    <Col lg={6} xs={12}>
      <Story />
    </Col>
  </Row>
);

export const Default: Story = {
  decorators: [wrapInCol],
  args: {
    id: 'slider-default',
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    minLabel: '0%',
    maxLabel: '100%',
  },
};

const InputGroupTemplate = (args: SliderProps) => {
  const [value, setValue] = useState<number>(20);
  return (
    <Row>
      <Col lg={6} xs={12}>
        <Slider
          {...args}
          value={value}
          onChange={setValue}
          addonRight={
            <div style={{ width: '100px' }}>
              <InputGroup id="slider-input-group-field" label="Value" hideLabel>
                <InputGroup.Input>
                  <Field
                    type="number"
                    value={String(value)}
                    onChange={(next) => {
                      const parsed = Number(next);
                      if (!Number.isNaN(parsed)) setValue(parsed);
                    }}
                  />
                </InputGroup.Input>
                <InputGroup.Suffix>%</InputGroup.Suffix>
              </InputGroup>
            </div>
          }
        />
      </Col>
    </Row>
  );
};

export const WithInputGroup: Story = {
  render: (args) => <InputGroupTemplate {...args} />,
  args: {
    id: 'slider-input-group',
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
    minLabel: '0%',
    maxLabel: '100%',
  },
};

export const MinAndMaxValues: Story = {
  decorators: [wrapInCol],
  args: {
    id: 'slider-min-max',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    minLabel: '0%',
    maxLabel: '100%',
    'aria-label': 'Label',
  },
};

export const WithCurrentValue: Story = {
  decorators: [wrapInCol],
  args: {
    id: 'slider-current-value',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showCurrentValue: true,
    valueFormatter: (value) => `${value}%`,
    'aria-label': 'Label',
  },
};

const CustomValueTemplate = (args: SliderProps) => {
  const [numberValue, setNumberValue] = useState<number>(4);
  const [inputValue, setInputValue] = useState<number>(50);

  return (
    <VerticalSpacing size={2}>
      <Row>
        <Col lg={6} xs={12}>
          <Slider
            id="slider-custom-value-basic"
            label="Label"
            hideLabel
            min={0}
            max={100}
            defaultValue={50}
            minLabel="0%"
            maxLabel="100%"
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} xs={12}>
          <Slider
            min={0}
            max={100}
            minLabel="0%"
            maxLabel="100%"
            defaultValue={50}
            value={inputValue}
            onChange={setInputValue}
            label="Label"
            addonRight={
              <div style={{ width: '100px' }}>
                <InputGroup id="slider-custom-value-input-group" label="Value" hideLabel>
                  <InputGroup.Input>
                    <Field
                      type="number"
                      value={String(inputValue)}
                      onChange={(next) => {
                        const parsed = Number(next);
                        if (!Number.isNaN(parsed)) setInputValue(parsed);
                      }}
                    />
                  </InputGroup.Input>
                  <InputGroup.Suffix>%</InputGroup.Suffix>
                </InputGroup>
              </div>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} xs={12}>
          <Slider
            {...args}
            value={numberValue}
            onChange={setNumberValue}
            addonRight={
              <NumberField
                id="slider-custom-value-number"
                label="Value"
                hideLabel
                min={args.min}
                max={args.max}
                step={args.step}
                value={numberValue}
                onChange={setNumberValue}
              />
            }
          />
        </Col>
      </Row>
    </VerticalSpacing>
  );
};

export const CustomValue: Story = {
  render: (args) => <CustomValueTemplate {...args} />,
  args: {
    id: 'slider-custom-value',
    label: 'Label',
    min: 1,
    max: 10,
    step: 1,
    minLabel: '1',
    maxLabel: '10',
  },
};

export const States: Story = {
  render: () => {
    const sharedArgs: SliderProps = {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
      minLabel: '0%',
      maxLabel: '100%',
      valueFormatter: (value) => `${value}%`,
    };

    const thumbArgs: SliderProps = {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
      tooltip: false,
      'aria-label': 'Thumb',
    };

    const thumbColStyle = { width: '1.5rem' };

    return (
      <VerticalSpacing size={2}>
        <Row gutterY={2}>
          <Col lg={2} xs={12} className="display-flex align-items-center">
            <Text modifiers="bold">Default</Text>
          </Col>
          <Col lg={1} xs={2} className="display-flex align-items-center">
            <div style={thumbColStyle}>
              <Slider {...thumbArgs} id="Default-thumb" />
            </div>
          </Col>
          <Col lg={6} xs={10}>
            <Slider {...sharedArgs} id="Default" />
          </Col>
        </Row>
        <Row>
          <Col lg={2} xs={12} className="display-flex align-items-center">
            <Text modifiers="bold">Hover</Text>
          </Col>
          <Col lg={1} xs={2} className="display-flex align-items-center">
            <div style={thumbColStyle}>
              <Slider {...thumbArgs} id="Hover-thumb" className="slider-state-hover" />
            </div>
          </Col>
          <Col lg={6} xs={10}>
            <Slider {...sharedArgs} id="Hover" className="slider-state-hover" />
          </Col>
        </Row>
        <Row>
          <Col lg={2} xs={12} className="display-flex align-items-center">
            <Text modifiers="bold">Active</Text>
          </Col>
          <Col lg={1} xs={2} className="display-flex align-items-center">
            <div style={thumbColStyle}>
              <Slider {...thumbArgs} id="Active-thumb" className="slider-state-active" />
            </div>
          </Col>
          <Col lg={6} xs={10}>
            <Slider {...sharedArgs} id="Active" className="slider-state-active" />
          </Col>
        </Row>
        <Row>
          <Col lg={2} xs={12} className="display-flex align-items-center">
            <Text modifiers="bold">Disabled</Text>
          </Col>
          <Col lg={1} xs={2} className="display-flex align-items-center">
            <div style={thumbColStyle}>
              <Slider {...thumbArgs} id="Disabled-thumb" disabled />
            </div>
          </Col>
          <Col lg={6} xs={10}>
            <Slider {...sharedArgs} id="slider-states-disabled" disabled />
          </Col>
        </Row>
        <Row>
          <Col lg={2} xs={12} className="display-flex align-items-center">
            <Text modifiers="bold">Focus</Text>
          </Col>
          <Col lg={1} xs={2} className="display-flex align-items-center">
            <div style={thumbColStyle}>
              <Slider {...thumbArgs} id="Focus-thumb" className="slider-state-focus" />
            </div>
          </Col>
          <Col lg={6} xs={10}>
            <Slider {...sharedArgs} id="Focus" className="slider-state-focus" />
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
  parameters: {
    pseudo: {
      hover: ['#Hover', '#Hover-thumb', '.slider-state-hover'],
      focusVisible: ['#Focus', '#Focus-thumb', '.slider-state-focus'],
      active: ['#Active', '#Active-thumb', '.slider-state-active'],
    },
  },
};

/**
 * Hides the live-value tooltip that appears above the thumb during
 * hover / focus / drag. Useful when range labels or a paired input field
 * already convey the current value.
 */
export const WithoutTooltip: Story = {
  decorators: [wrapInCol],
  args: {
    id: 'slider-no-tooltip',
    label: 'Label',
    min: 0,
    max: 100,
    defaultValue: 40,
    minLabel: '0%',
    maxLabel: '100%',
    tooltip: false,
  },
};

/**
 * Adds helper / hint text below the slider for guidance.
 */
export const WithHelper: Story = {
  decorators: [wrapInCol],
  args: {
    id: 'slider-helper',
    label: 'Label',
    min: 0,
    max: 100,
    defaultValue: 40,
    minLabel: '0%',
    maxLabel: '100%',
    helper: { id: 'slider-helper-text', text: 'Drag the thumb to change the value', type: 'hint' },
  },
};
