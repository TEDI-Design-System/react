import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { UnknownType } from '../../../types/commonTypes';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { TextFieldProps } from '../textfield/textfield';
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
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
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

const sizeArray: TextFieldProps['size'][] = ['default', 'small'];

export const Size: StoryFn = () => (
  <div className="example-list">
    {sizeArray.map((size, idx) => (
      <Row key={size ?? 'default'} className={`${idx === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`}>
        <Col lg={2} xs={12}>
          <Text modifiers="bold">{size ? size.charAt(0).toUpperCase() + size.slice(1) : ''}</Text>
        </Col>
        <Col lg={10} xs={12} className="d-flex">
          <DateTimeField
            id={`date-time-size-${size}`}
            label="Date"
            placeholder="pp.kk.aaaa hh:mm"
            inputProps={{ size }}
          />
        </Col>
      </Row>
    ))}
  </div>
);

/**
 * Demonstrates `inputProps` pass-through on the input control: helper hint,
 * and a controlled-value pattern wired to quick-pick buttons (Today, Tomorrow
 * at 09:00). Mirrors DateField's `FieldOptions` story.
 */
export const FieldOptions: StoryFn = () => {
  const [shortcutValue, setShortcutValue] = useState<Date | undefined>(undefined);

  const today = new Date();
  today.setHours(9, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  return (
    <Row>
      <Col lg={6} xs={12}>
        <div className="flex gap-4 flex-column">
          <DateTimeField id="date-time-options-default" label="Date and time" placeholder="pp.kk.aaaa hh:mm" />

          <DateTimeField
            id="date-time-options-hint"
            label="Date and time with hint"
            placeholder="pp.kk.aaaa hh:mm"
            inputProps={{ helper: { text: 'pp.kk.aaaa hh:mm' } }}
          />

          <div>
            <DateTimeField
              id="date-time-options-shortcuts"
              label="Date and time with shortcuts"
              placeholder="pp.kk.aaaa hh:mm"
              value={shortcutValue}
              onChange={(v) => setShortcutValue(v instanceof Date ? v : undefined)}
            />
            <div className="flex gap-3" style={{ marginTop: '8px' }}>
              <Button visualType="link" size="small" onClick={() => setShortcutValue(today)}>
                Täna 9:00
              </Button>
              <Button visualType="link" size="small" onClick={() => setShortcutValue(tomorrow)}>
                Homme 9:00
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
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
 * Calendar constraints — `disablePast`, `disableFuture`, and explicit
 * `minDate` / `maxDate`. The time picker doesn't enforce time-of-day bounds
 * (every minute is selectable inside the allowed days), only the calendar
 * grid is constrained.
 */
export const DateConstraints: StoryFn = () => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  return (
    <Row gutterY={3}>
      <Col lg={6} xs={12}>
        <Text modifiers="bold">disablePast</Text>
        <DateTimeField
          id="date-time-disable-past"
          label="Future date and time only"
          placeholder="pp.kk.aaaa hh:mm"
          disablePast
        />
      </Col>
      <Col lg={6} xs={12}>
        <Text modifiers="bold">disableFuture</Text>
        <DateTimeField
          id="date-time-disable-future"
          label="Past date and time only"
          placeholder="pp.kk.aaaa hh:mm"
          disableFuture
        />
      </Col>
      <Col lg={6} xs={12}>
        <Text modifiers="bold">minDate / maxDate (±7 days)</Text>
        <DateTimeField
          id="date-time-min-max"
          label="Date inside a 14-day window"
          placeholder="pp.kk.aaaa hh:mm"
          minDate={minDate}
          maxDate={maxDate}
        />
      </Col>
    </Row>
  );
};

/**
 * Header month / year pickers render as a full grid instead of the default
 * `<Select>` dropdown. Easier to scan when the user needs to jump several
 * years backward / forward.
 */
export const YearGrid: Story = {
  render: Template,
  args: {
    id: 'date-time-year-grid',
    label: 'Date',
    placeholder: 'pp.kk.aaaa hh:mm',
    monthYearSelectType: 'grid',
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
