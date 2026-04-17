import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { NumberField } from '../number-field/number-field';
import { Slider, SliderProps } from './slider';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=19071-105925&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'TEDI-Ready/Components/Form/Slider',
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

export const Default: Story = {
  args: {
    id: 'slider-default',
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
    minLabel: '0%',
    maxLabel: '100%',
    valueFormatter: (value) => `${value}%`,
  },
};

export const WithoutTooltip: Story = {
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

export const MinAndMaxValues: Story = {
  args: {
    id: 'slider-min-max',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    minLabel: '0%',
    maxLabel: '100%',
  },
};

export const CurrentValue: Story = {
  args: {
    id: 'slider-current-value',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showCurrentValue: true,
    valueFormatter: (value) => `${value}%`,
  },
};

const InputGroupTemplate = (args: SliderProps) => {
  const [value, setValue] = useState<number>(20);
  return (
    <Slider
      {...args}
      value={value}
      onChange={setValue}
      addonRight={
        <NumberField
          id="slider-input-group-number"
          label="Value"
          hideLabel
          suffix="%"
          min={args.min}
          max={args.max}
          step={args.step}
          value={value}
          onChange={setValue}
        />
      }
    />
  );
};

const NumberFieldTemplate = (args: SliderProps) => {
  const [value, setValue] = useState<number>(4);
  return (
    <Slider
      {...args}
      value={value}
      onChange={setValue}
      addonRight={
        <NumberField
          id="slider-number-field"
          label="Value"
          hideLabel
          min={args.min}
          max={args.max}
          step={args.step}
          value={value}
          onChange={setValue}
        />
      }
    />
  );
};

export const WithNumberField: Story = {
  render: (args) => <NumberFieldTemplate {...args} />,
  args: {
    id: 'slider-number-field-wrapper',
    label: 'Label',
    min: 1,
    max: 10,
    step: 1,
    minLabel: '1',
    maxLabel: '10',
  },
};

export const Disabled: Story = {
  args: {
    id: 'slider-disabled',
    label: 'Label',
    min: 0,
    max: 100,
    defaultValue: 30,
    minLabel: '0%',
    maxLabel: '100%',
    disabled: true,
  },
};

export const WithHelper: Story = {
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

export const Invalid: Story = {
  args: {
    id: 'slider-invalid',
    label: 'Label',
    min: 0,
    max: 100,
    defaultValue: 80,
    minLabel: '0%',
    maxLabel: '100%',
    helper: { id: 'slider-error-text', text: 'Value is out of range', type: 'error' },
  },
};
