import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { TextFieldProps } from '../textfield/textfield';
import { TimeField, TimeFieldProps } from './time-field';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=4662-91741&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/73629d-time-field" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'Tedi-Ready/Components/Form/TimeField',
  component: TimeField,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=4662-91741&m=dev',
    },
  },
} as Meta<TimeFieldProps>;

type Story = StoryObj<TimeFieldProps>;

const Template: StoryFn<TimeFieldProps> = (args) => (
  <Row>
    <Col lg={3} md={6}>
      <TimeField {...args} />
    </Col>
  </Row>
);
const sizeArray: TextFieldProps['size'][] = ['default', 'small'];

interface TemplateMultipleProps<Type = TextFieldProps['size']> extends TextFieldProps {
  array: Type[];
  property: keyof TextFieldProps;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col md={2} sm={6}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col lg={3} md={6} className="d-flex">
            <TimeField label="Time" id={`time-field-size--${value}`} inputProps={{ [property]: value }} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: 'Time',
    required: true,
    stepMinutes: 1,
  },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,

  args: {
    array: sizeArray,
    property: 'size',
  },
};

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'] as const;

export const States: StoryObj<TimeFieldProps> = {
  render: () => (
    <div className="state-example">
      {stateArray.map((state) => (
        <Row key={state} className="padding-14-16">
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col md={4} xs={12} className="display-flex align-items-center">
            <TimeField id={state} label="Time" inputProps={{ disabled: state === 'Disabled' }} />
          </Col>
        </Row>
      ))}
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col md={4} xs={12} className="display-flex align-items-center">
          <TimeField
            id="success-timefield"
            label="Time"
            inputProps={{ helper: { text: 'Feedback text', type: 'valid' } }}
          />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col md={4} xs={12} className="display-flex align-items-center">
          <TimeField
            id="error-timefield"
            label="Time"
            inputProps={{ helper: { text: 'Feedback text', type: 'error' } }}
          />
        </Col>
      </Row>
    </div>
  ),
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const FieldOptions: StoryFn = () => {
  return (
    <Row>
      <Col lg={3} md={6}>
        <div className="flex gap-4 flex-column">
          <TimeField id="time-field-default" label="Default time field" />

          <TimeField
            id="time-field-with-hint"
            label="Time field with hint"
            inputProps={{ helper: { text: 'Hint text' } }}
          />
        </div>
      </Col>
    </Row>
  );
};

export const ValueType: StoryFn = () => {
  return (
    <Row>
      <Col lg={3} md={6}>
        <div className="flex gap-3 flex-column">
          <TimeField id="time-default" label="Label" />
          <TimeField id="time-with-placeholder" label="Label" placeholder="hh:mm" />
          <TimeField id="time-with-default-value" label="Label" defaultValue="13:00" />
        </div>
      </Col>
    </Row>
  );
};

export const OnClickType: Story = {
  render: () => {
    return (
      <VerticalSpacing>
        <Row>
          <Col lg={3} md={6}>
            <Text>Clock button is clickable</Text>
            <TimeField label="Time" id="calendar-button-trigger" timePickerTrigger="button" />
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={6}>
            <Text>Input is clickable</Text>
            <TimeField label="Time" id="calendar-button-trigger" timePickerTrigger="input" />
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'timePickerTrigger prop allows you to open time picker either on input click or clock icon',
      },
    },
  },
};

export const PredefinedTimeSlots: Story = {
  render: () => {
    const [times, setTimes] = useState({
      dropdown: undefined as string | undefined,
      grid: undefined as string | undefined,
    });

    const availableTimes = ['08:00', '08:30', '09:00', '09:15', '09:30', '10:00', '10:30', '11:00', '12:00'];

    const handleChange = (key: 'dropdown' | 'grid') => (newTime: string) => {
      setTimes((prev) => ({ ...prev, [key]: newTime }));
    };

    return (
      <VerticalSpacing>
        <Row>
          <Col lg={3} md={6}>
            <TimeField
              id="time-dropdown"
              label="Time"
              value={times.dropdown}
              onChange={handleChange('dropdown')}
              placeholder="Choose time"
              availableTimes={availableTimes}
              timePickerTrigger="input"
            />
          </Col>
        </Row>

        <Row>
          <Col lg={3} md={6}>
            <TimeField
              id="time-grid"
              label="Time"
              value={times.grid}
              onChange={handleChange('grid')}
              placeholder="Choose time"
              availableTimes={availableTimes}
              availableTimesVariant="grid-radio"
              timePickerTrigger="input"
            />
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
};

export const Dropdown: Story = {
  render: () => {
    const [time, setTime] = useState<string | undefined>();
    const availableTimes = ['08:00', '08:30', '09:00', '09:15', '09:30', '10:00', '10:30', '11:00', '12:00'];

    return (
      <Row>
        <Col lg={3} md={6}>
          <TimeField
            id="available-times-dropdown"
            label="Time"
            value={time}
            onChange={setTime}
            placeholder="Choose time"
            availableTimes={availableTimes}
            availableTimesVariant="dropdown"
          />
        </Col>
      </Row>
    );
  },
};

export const FieldWithoutPicker: Story = {
  render: Template,
  args: {
    label: 'Time',
    placeholder: 'hh:mm',
    showPicker: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'You can set showPicker=false if you only need to use the input and not the picker',
      },
    },
  },
};

export const CustomStep: Story = {
  render: Template,
  args: {
    label: 'Time with 15-min steps',
    stepMinutes: 15,
    placeholder: 'hh:mm',
    defaultValue: '12:30',
  },
};

export const ManualTyping: StoryFn<TimeFieldProps> = (args) => {
  const [time, setTime] = useState<string | undefined>('08:00');

  return (
    <Row>
      <Col lg={3} md={6}>
        <TimeField
          {...args}
          value={time}
          onChange={(val) => setTime(val)}
          label="Enter time manually"
          placeholder="HH:mm"
        />
      </Col>
    </Row>
  );
};

export const NativePicker: Story = {
  render: Template,
  args: {
    label: 'Time',
    placeholder: 'hh:mm',
    useNativePicker: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Native time picker uses the browser’s built-in input[type="time"] UI instead of the custom TimePicker. Prefer this on mobile devices for better native UX, improved accessibility, and reduced UI complexity. It is also useful when you want to minimize bundle/UI overhead or align with platform conventions. Note: when enabled, availableTimes is ignored because native inputs do not support restricting selectable values.',
      },
    },
  },
};
