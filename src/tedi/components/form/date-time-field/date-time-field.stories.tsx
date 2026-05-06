import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { UnknownType } from '../../../types/commonTypes';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { DateTimeField, DateTimeFieldProps } from './date-time-field';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=7895-221619&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/78211a-date-and-time-picker" target="_BLANK">ZeroHeight ↗</a>
 */
const meta: Meta<DateTimeFieldProps> = {
  component: DateTimeField,
  title: 'TEDI-Ready/Components/Form/DateTimeField',
  argTypes: {
    inputProps: { control: false },
    locale: { control: false },
    timeHeading: { control: false },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=7895-221619&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<DateTimeFieldProps>;

const Template: StoryFn<DateTimeFieldProps> = (args) => (
  <Row>
    <Col lg={4} md={6} xs={12}>
      <DateTimeField {...args} />
    </Col>
  </Row>
);

/**
 * Side-by-side layout with the scroll-wheel time picker — matches the
 * Figma "One day → Default" frame. Calendar on the left, hour/minute wheel
 * on the right under the "Kellaaeg" / "Time" heading. Both are interactive
 * at the same time; the popover stays open until the user clicks outside.
 */
export const Default: Story = {
  render: Template,
  args: {
    id: 'date-time-default',
    label: 'Date',
    placeholder: 'pp.kk.aaaa hh:mm',
    layout: 'side-by-side',
    stepMinutes: 1,
  },
};

export const PredefinedTimeSlots: Story = {
  render: Template,
  args: {
    id: 'date-time-predefined',
    label: 'Date',
    placeholder: 'pp.kk.aaaa hh:mm',
    layout: 'side-by-side',
    availableTimes: ['09:30', '10:00', '11:30', '15:30', '18:30', '20:30'],
    timeGridVariant: 'button',
  },
};

export const MultiSteps: Story = {
  render: Template,
  args: {
    id: 'date-time-multi-step',
    label: 'Time',
    placeholder: 'pp.kk.aaaa hh:mm',
    layout: 'multi-step',
    availableTimes: ['09:30', '10:00', '11:30', '15:30', '18:30', '20:30'],
    timeGridVariant: 'radio',
  },
};

const ControlledTemplate: StoryFn<DateTimeFieldProps> = (args) => {
  const [value, setValue] = useState<Date | undefined>(new Date(2025, 8, 1, 11, 30));

  const handleChange = (newValue: UnknownType) => {
    if (newValue instanceof Date) {
      setValue(newValue);
    }
  };

  return (
    <VerticalSpacing>
      <Row>
        <Col lg={4} md={6} xs={12}>
          <DateTimeField {...args} value={value} onChange={handleChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Current value: {value ? value.toISOString() : 'undefined'}</p>
        </Col>
      </Row>
    </VerticalSpacing>
  );
};

export const Range: Story = {
  render: Template,
  args: {
    id: 'date-time-range',
    label: 'Date range',
    placeholder: 'pp.kk.aaaa hh:mm – pp.kk.aaaa hh:mm',
    mode: 'range',
    stepMinutes: 1,
  },
};

export const RangePredefinedTimeSlots: Story = {
  render: Template,
  args: {
    id: 'date-time-range-predefined',
    label: 'Date range',
    placeholder: 'pp.kk.aaaa hh:mm – pp.kk.aaaa hh:mm',
    mode: 'range',
    availableTimes: ['09:30', '10:00', '11:30', '15:30', '18:30', '20:30'],
    timeGridVariant: 'button',
  },
};

/**
 * Controlled-value pattern: parent owns selection in `useState`, passes
 * `value` and `onChange`. Use this shape when the value needs to be lifted
 * (form integration, programmatic updates, etc.).
 */
export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    id: 'date-time-controlled',
    label: 'Date',
    placeholder: 'pp.kk.aaaa hh:mm',
    layout: 'side-by-side',
    availableTimes: ['09:30', '10:00', '11:30', '15:30', '18:30', '20:30'],
  },
};

/**
 * Renders an `<input type="datetime-local">` and skips the custom
 * popover entirely — the browser's built-in date+time picker is shown
 * when the calendar icon is clicked. Useful on mobile where the native
 * picker is the platform-idiomatic UX, or as the only UI when the
 * consumer wants to keep the bundle small. Range mode is not supported
 * for native (silently falls back to custom).
 */
export const Native: Story = {
  render: Template,
  args: {
    id: 'date-time-native',
    label: 'Date',
    placeholder: 'pp.kk.aaaa hh:mm',
    useNativePicker: true,
  },
};
