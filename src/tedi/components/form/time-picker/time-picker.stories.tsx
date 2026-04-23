import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { TimePicker, TimePickerProps } from './time-picker';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.39.64?node-id=42943-146290&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/73629d-time-field" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'Tedi-Ready/Components/Form/TimePicker',
  component: TimePicker,
} as Meta<TimePickerProps>;

type Story = StoryObj<TimePickerProps>;

const Template: StoryFn<TimePickerProps> = (args) => {
  const [time, setTime] = useState<string | undefined>(args.value);

  useEffect(() => {
    setTime(args.value);
  }, [args.value]);

  return <TimePicker {...args} value={time} onChange={(val) => setTime(val)} />;
};

export const Default: Story = {
  render: Template,
  args: {
    stepMinutes: 1,
  },
};

export const WithInitialValue: Story = {
  render: Template,
  args: {
    value: '12:30',
  },
};

export const PredefinedSlots: Story = {
  render: () => {
    const [timeButton, setTimeButton] = useState<string | undefined>();
    const [timeRadio, setTimeRadio] = useState<string | undefined>();

    const availableTimes = ['08:00', '08:30', '09:00', '09:15', '09:30', '10:00', '10:30', '11:00', '12:00'];

    return (
      <VerticalSpacing>
        <Row>
          <Col width={5}>
            <Text>gridVariant = button</Text>
            <TimePicker value={timeButton} availableTimes={availableTimes} onChange={setTimeButton} />
          </Col>
          <Col width={5}>
            <Text>gridVariant = radio</Text>
            <TimePicker gridVariant="radio" value={timeRadio} availableTimes={availableTimes} onChange={setTimeRadio} />
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
};

export const ControlledExample: StoryFn<TimePickerProps> = () => {
  const [time, setTime] = useState<string>('09:00');

  return (
    <Row>
      <Col width={4} sm={12}>
        <TimePicker value={time} onChange={setTime} />
      </Col>

      <Col width={8} sm={12} className="display-flex align-items-center">
        <Text>Selected time: {time}</Text>
      </Col>
    </Row>
  );
};
