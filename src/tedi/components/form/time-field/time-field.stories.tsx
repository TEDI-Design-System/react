import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
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

const sizeLabels: Record<string, string> = { default: 'Default', small: 'Small' };

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col md={2} sm={6}>
            <Text modifiers="bold">{value ? sizeLabels[value] ?? value : ''}</Text>
          </Col>
          <Col lg={3} md={6} className="d-flex">
            <TimeField label="Aeg" id={`time-field-size--${value}`} inputProps={{ [property]: value }} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: 'Aeg',
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
            <TimeField id={state} label="Aeg" inputProps={{ disabled: state === 'Disabled' }} />
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
            label="Aeg"
            inputProps={{ helper: { text: 'Vihjetekst', type: 'valid' } }}
          />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col md={4} xs={12} className="display-flex align-items-center">
          <TimeField id="error-timefield" label="Aeg" inputProps={{ helper: { text: 'Vihjetekst', type: 'error' } }} />
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
          <TimeField id="time-field-default" label="Aeg" />

          <TimeField id="time-field-with-hint" label="Aeg" inputProps={{ helper: { text: 'Vihjetekst' } }} />
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
          <TimeField id="time-default" label="Aeg" />
          <TimeField id="time-with-placeholder" label="Aeg" placeholder="tt:mm" />
          <TimeField id="time-with-default-value" label="Aeg" defaultValue="13:00" />
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
            <Text modifiers="small">Clock button is clickable</Text>
            <TimeField label="Aeg" id="calendar-button-trigger" timePickerTrigger="button" />
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={6}>
            <Text modifiers="small">Input is clickable</Text>
            <TimeField label="Aeg" id="calendar-button-trigger" timePickerTrigger="input" />
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
      input: '11:30' as string | undefined,
      radio: '11:30' as string | undefined,
      button: '11:30' as string | undefined,
    });

    const availableTimes = ['09:30', '10:00', '11:30', '15:30', '18:30', '20:30'];

    const handleChange = (key: keyof typeof times) => (newTime: string) => {
      setTimes((prev) => ({ ...prev, [key]: newTime }));
    };

    return (
      <Row>
        <Col lg={4} md={6} xs={12}>
          <Text modifiers={['small']}>Input trigger (recommended)</Text>
          <TimeField
            id="slots-input"
            label="Aeg"
            value={times.input}
            onChange={handleChange('input')}
            placeholder="Vali aeg"
            availableTimes={availableTimes}
            timePickerTrigger="input"
          />
        </Col>
        <Col lg={4} md={6} xs={12}>
          <Text modifiers={['small']}>Radio buttons</Text>
          <TimeField
            id="slots-radio"
            label="Aeg"
            value={times.radio}
            onChange={handleChange('radio')}
            placeholder="Vali aeg"
            availableTimes={availableTimes}
            availableTimesVariant="grid-radio"
            timePickerTrigger="input"
          />
        </Col>
        <Col lg={4} md={6} xs={12}>
          <Text modifiers={['small']}>Button trigger</Text>
          <TimeField
            id="slots-button"
            label="Aeg"
            value={times.button}
            onChange={handleChange('button')}
            placeholder="Vali aeg"
            availableTimes={availableTimes}
            timePickerTrigger="button"
          />
        </Col>
      </Row>
    );
  },
};

export const Dropdown: Story = {
  render: () => {
    const [times, setTimes] = useState({
      empty: undefined as string | undefined,
      preselected: '13:30' as string | undefined,
    });
    const availableTimes = ['12:30', '13:00', '13:30', '14:00', '14:30'];

    const handleChange = (key: keyof typeof times) => (newTime: string) => {
      setTimes((prev) => ({ ...prev, [key]: newTime }));
    };

    return (
      <Row>
        <Col lg={6} md={12}>
          <Text modifiers={['small']}>Button trigger</Text>
          <TimeField
            id="dropdown-empty"
            label="Aeg"
            value={times.empty}
            onChange={handleChange('empty')}
            placeholder="Vali aeg"
            availableTimes={availableTimes}
            availableTimesVariant="dropdown"
            timePickerTrigger="button"
          />
        </Col>
        <Col lg={6} md={12}>
          <Text modifiers={['small']}>Input trigger</Text>
          <TimeField
            id="dropdown-preselected"
            label="Aeg"
            value={times.preselected}
            onChange={handleChange('preselected')}
            placeholder="Vali aeg"
            availableTimes={availableTimes}
            availableTimesVariant="dropdown"
            timePickerTrigger="input"
          />
        </Col>
      </Row>
    );
  },
};

export const FieldWithoutPicker: Story = {
  render: Template,
  args: {
    label: 'Aeg',
    placeholder: 'tt:mm',
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
    label: 'Aeg 15-minutiliste sammudega',
    stepMinutes: 15,
    placeholder: 'tt:mm',
    defaultValue: '12:30',
  },
};

export const ManualTyping: StoryFn<TimeFieldProps> = (args) => {
  const [time, setTime] = useState<string | undefined>('08:00');

  return (
    <Row>
      <Col lg={3} md={6}>
        <TimeField {...args} value={time} onChange={(val) => setTime(val)} label="Aeg" placeholder="tt:mm" />
      </Col>
    </Row>
  );
};

/**
 * Pass `modal` to open the picker inside a centered modal (with Cancel / Confirm
 * footer buttons) instead of the floating popover. The most common use is the
 * mobile pattern — `modal="md"` opens in a modal below `md` and falls back to
 * the popover from `md` up. Pass `modal` alone (or `modal={true}`) to always
 * use the modal. The user's choice is held as a draft and only committed on
 * Confirm — Cancel / Escape / backdrop dismiss discards it.
 */
export const ModalPicker: Story = {
  render: (args) => <Template {...args} />,
  args: {
    id: 'time-modal',
    label: 'Aeg',
    placeholder: 'tt:mm',
    modal: true,
    timePickerTrigger: 'input',
  },
};

/**
 * `modal="md"` opens the picker in a modal only below `md` viewports and
 * leaves the popover behavior unchanged on desktop. Resize the Storybook
 * canvas or pick a mobile preset to see the modal kick in.
 */
export const ResponsiveModalPicker: Story = {
  render: (args) => <Template {...args} />,
  args: {
    id: 'time-modal-responsive',
    label: 'Aeg',
    placeholder: 'tt:mm',
    modal: 'md',
    timePickerTrigger: 'input',
  },
};

export const NativePicker: Story = {
  render: () => (
    <Row>
      <Col lg={6} md={12}>
        <Text modifiers={['small']}>Always native (useNativePicker=true)</Text>
        <TimeField id="native-always" label="Aeg" defaultValue="09:30" useNativePicker />
      </Col>
      <Col lg={6} md={12}>
        <Text modifiers={['small']}>Responsive</Text>
        <TimeField
          id="native-responsive"
          label="Aeg"
          defaultValue="09:30"
          useNativePicker
          md={{ useNativePicker: false }}
        />
      </Col>
    </Row>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Native time picker uses the browser’s built-in input[type="time"] UI instead of the custom TimePicker. Prefer this on mobile devices for better native UX, improved accessibility, and reduced UI complexity. It is also useful when you want to minimize bundle/UI overhead or align with platform conventions. Note: when enabled, availableTimes is ignored because native inputs do not support restricting selectable values.',
      },
    },
  },
};
