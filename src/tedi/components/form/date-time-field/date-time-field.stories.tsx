import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { enGB } from 'react-day-picker/locale';

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
  args: {
    locale: enGB,
    localeCode: 'en-GB',
  },
  argTypes: {
    inputProps: { control: false },
    locale: { control: false },
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

// Meta-level `args` only flow into stories that read them; custom-render
// stories below (Size, States, FieldOptions, DateConstraints) instantiate
// DateTimeField directly, so they spread this object to inherit the same
// English locale.
const englishLocale = { locale: enGB, localeCode: 'en-GB' };

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
    placeholder: 'dd.mm.yyyy hh:mm',
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
            {...englishLocale}
            id={`date-time-size-${size}`}
            label="Date"
            placeholder="dd.mm.yyyy hh:mm"
            inputProps={{ size }}
          />
        </Col>
      </Row>
    ))}
  </div>
);

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'] as const;

export const States: Story = {
  render: () => (
    <div className="state-example">
      {stateArray.map((state) => (
        <Row key={state} className="padding-14-16">
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col md={4} xs={12} className="display-flex align-items-center">
            <DateTimeField {...englishLocale} id={state} label="Date and time" disabled={state === 'Disabled'} />
          </Col>
        </Row>
      ))}
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col md={4} xs={12} className="display-flex align-items-center">
          <DateTimeField
            {...englishLocale}
            id="success-datetimefield"
            label="Date and time"
            inputProps={{ helper: { text: 'Feedback text', type: 'valid' } }}
          />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col md={4} xs={12} className="display-flex align-items-center">
          <DateTimeField
            {...englishLocale}
            id="error-datetimefield"
            label="Date and time"
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
          <DateTimeField
            {...englishLocale}
            id="date-time-options-default"
            label="Date and time"
            placeholder="dd.mm.yyyy hh:mm"
          />

          <DateTimeField
            {...englishLocale}
            id="date-time-options-hint"
            label="Date and time with hint"
            placeholder="dd.mm.yyyy hh:mm"
            inputProps={{ helper: { text: 'dd.mm.yyyy hh:mm' } }}
          />

          <div>
            <DateTimeField
              {...englishLocale}
              id="date-time-options-shortcuts"
              label="Date and time with shortcuts"
              placeholder="dd.mm.yyyy hh:mm"
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
    placeholder: 'dd.mm.yyyy hh:mm',
    layout: 'side-by-side',
    availableTimes: ['09:30', '10:00', '11:30', '15:30', '18:30', '20:30'],
    timeGridVariant: 'button',
  },
};

/**
 * When `availableTimes` returns an empty array for the picked date,
 * `DateTimeField` falls back to the scroll-wheel picker — there's no
 * built-in "no times available" empty state inside the popover. Surface
 * that condition from the consumer side:
 *
 * - render a helper / error message on the field (shown below), and / or
 * - disable those days entirely via `disabledMatchers` so the user can't
 *   land on them in the first place.
 *
 * This example treats Mondays as closed: the field is pre-selected to a
 * Monday so the helper is visible, and the matcher greys Mondays out in
 * the calendar.
 */
export const NoTimesAvailable: StoryFn<DateTimeFieldProps> = (args) => {
  const upcomingMonday = (() => {
    const d = new Date();
    const daysUntilMonday = (8 - d.getDay()) % 7 || 7;
    d.setDate(d.getDate() + daysUntilMonday);
    d.setHours(10, 0, 0, 0);
    return d;
  })();

  const [value, setValue] = useState<Date | undefined>(upcomingMonday);

  const getSlots = (date: Date): string[] => {
    const day = date.getDay();
    if (day === 1) return [];
    if (day === 0) return ['10:00', '11:00', '12:00'];
    return ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  };

  const slotsForSelectedDate = value ? getSlots(value) : null;
  const noSlots = slotsForSelectedDate !== null && slotsForSelectedDate.length === 0;

  return (
    <Row>
      <Col lg={4} md={6} xs={12}>
        <DateTimeField
          {...args}
          value={value}
          onChange={(v) => setValue(v instanceof Date ? v : undefined)}
          availableTimes={getSlots}
          disabledMatchers={{ dayOfWeek: [1] }}
          inputProps={
            noSlots
              ? { helper: { text: 'No appointments available on this day — closed on Mondays.', type: 'error' } }
              : undefined
          }
        />
      </Col>
    </Row>
  );
};
NoTimesAvailable.args = {
  id: 'date-time-no-slots',
  label: 'Appointment',
  placeholder: 'dd.mm.yyyy hh:mm',
  layout: 'side-by-side',
  timeGridVariant: 'button',
};

/**
 * `availableTimes` also accepts a function `(date: Date) => string[]`,
 * evaluated per render with the currently-selected date. Use this when the
 * slot list depends on the day — e.g. a clinic with longer weekday hours
 * than weekends, or a venue that's closed on Mondays.
 *
 * Pick a weekday vs. a Saturday vs. a Sunday to see the time grid change.
 */
export const PerDayTimeSlots: Story = {
  render: Template,
  args: {
    id: 'date-time-per-day',
    label: 'Appointment',
    placeholder: 'dd.mm.yyyy hh:mm',
    layout: 'side-by-side',
    timeGridVariant: 'button',
    availableTimes: (date: Date) => {
      const day = date.getDay();
      if (day === 0) return ['10:00', '11:00', '12:00'];
      if (day === 6) return ['09:00', '10:00', '11:00', '12:00', '13:00'];
      return ['08:30', '09:30', '10:30', '11:30', '13:00', '14:00', '15:00', '16:00', '17:00'];
    },
  },
};

export const MultiSteps: Story = {
  render: Template,
  args: {
    id: 'date-time-multi-step',
    label: 'Time',
    placeholder: 'dd.mm.yyyy hh:mm',
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
    placeholder: 'dd.mm.yyyy hh:mm – dd.mm.yyyy hh:mm',
    mode: 'range',
    stepMinutes: 1,
  },
};

export const RangePredefinedTimeSlots: Story = {
  render: Template,
  args: {
    id: 'date-time-range-predefined',
    label: 'Date range',
    placeholder: 'dd.mm.yyyy hh:mm – dd.mm.yyyy hh:mm',
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
    placeholder: 'dd.mm.yyyy hh:mm',
    layout: 'side-by-side',
    availableTimes: ['09:30', '10:00', '11:30', '15:30', '18:30', '20:30'],
  },
};

/**
 * Calendar constraints — `disablePast`, `disableFuture`, and explicit
 * `minDate` / `maxDate`. The time picker doesn't enforce time-of-day bounds
 * (every minute is selectable inside the allowed days), only the calendar
 * grid is constrained.
 *
 * If the user types a date that fails the disable matchers, the field
 * surfaces an inline error (overridable via `disabledDateErrorMessage`).
 * Try typing a past date into the first input or a future date into the
 * second.
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
          {...englishLocale}
          id="date-time-disable-past"
          label="Future date and time only"
          placeholder="dd.mm.yyyy hh:mm"
          disablePast
        />
      </Col>
      <Col lg={6} xs={12}>
        <Text modifiers="bold">disableFuture</Text>
        <DateTimeField
          {...englishLocale}
          id="date-time-disable-future"
          label="Past date and time only"
          placeholder="dd.mm.yyyy hh:mm"
          disableFuture
        />
      </Col>
      <Col lg={6} xs={12}>
        <Text modifiers="bold">minDate / maxDate (±7 days)</Text>
        <DateTimeField
          {...englishLocale}
          id="date-time-min-max"
          label="Date inside a 14-day window"
          placeholder="dd.mm.yyyy hh:mm"
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
    placeholder: 'dd.mm.yyyy hh:mm',
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
    placeholder: 'dd.mm.yyyy hh:mm',
    useNativePicker: true,
  },
};
