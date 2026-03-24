import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { DateField, DateFieldProps } from './date-field';

/**
 * <a href="https://daypicker.dev/" target="_BLANK">React DayPicker ↗</a><br />
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.37.57?node-id=4620-82915&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/15bd6e-date-field" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'Tedi-Ready/Components/Form/DateField',
  component: DateField,
} as Meta<DateFieldProps>;

type Story = StoryObj<DateFieldProps>;

const Template: StoryFn<DateFieldProps> = (args) => {
  return <DateField {...args} />;
};

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

interface TemplateStateProps extends DateFieldProps {
  array: typeof stateArray;
}

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array, ...dateFieldProps } = args;

  return (
    <div className="state-example">
      {array.map((state, index) => (
        <Row key={index} className="padding-14-16">
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col className="display-flex align-items-center" width={10}>
            <DateField
              {...dateFieldProps}
              id={state}
              inputProps={{
                ...(state === 'Disabled' && { disabled: true }),
              }}
            />
          </Col>
        </Row>
      ))}
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col className="display-flex align-items-center" width={10}>
          <DateField
            {...dateFieldProps}
            id="error-success-field"
            inputProps={{
              helper: { text: 'Feedback text', type: 'valid' },
            }}
          />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col className="display-flex align-items-center" width={10}>
          <DateField
            {...dateFieldProps}
            id="error-date-field"
            inputProps={{
              helper: { text: 'Feedback text', type: 'error' },
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export const Single: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Date',
    required: true,
  },
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Label',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const DefaultValue: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Default selected date',
    defaultValue: new Date(),
  },
};

export const InputOnly: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Date',
    required: true,
    placeholder: 'dd.mm.yyyy',
    enableCalendar: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'enableCalendar props allows you to show/hide calendar',
      },
    },
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date[] | undefined>([]);

    const formatDate = (date: Date | Date[] | DateRange | undefined): string => {
      if (!date) return '';

      const fmt = new Intl.DateTimeFormat('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });

      if (date instanceof Date) {
        return fmt.format(date);
      }

      if (Array.isArray(date)) {
        return date.map((d) => fmt.format(d)).join(', ');
      }

      if ('from' in date && date.from) {
        const from = fmt.format(date.from);
        return date.to ? `${from} – ${fmt.format(date.to)}` : from;
      }

      return '';
    };

    return (
      <DateField
        {...args}
        selected={value}
        onSelect={(selected) => {
          if (Array.isArray(selected)) {
            setValue(selected);
          } else if (selected instanceof Date) {
            setValue([selected]);
          } else {
            setValue([]);
          }
        }}
        formatDate={formatDate}
      />
    );
  },
  args: {
    mode: 'multiple',
    label: 'Dates',
  },
};

export const AvailableDays: Story = {
  render: () => {
    const availableDays = [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 4)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
      new Date(new Date().setDate(new Date().getDate() + 6)),
    ];

    const [selected, setSelected] = useState<Date | undefined>();

    return (
      <DateField
        mode="single"
        label="Pick from available days"
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
        availableDays={availableDays}
        id="available-days-shown"
      />
    );
  },
};

export const Range: Story = {
  render: () => {
    const [defaultRange, setDefaultRange] = useState<DateRange | undefined>();
    const [rangeWithLimits, setRangeWithLimits] = useState<DateRange | undefined>();
    const [startOnly, setStartOnly] = useState<DateRange | undefined>({ from: new Date(), to: undefined });
    const [disablePastRange, setDisablePastRange] = useState<DateRange | undefined>();

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    const maxDate = new Date();

    return (
      <Row gutterY={3}>
        <Col width={6}>
          <DateField
            mode="range"
            label="Default Range"
            selected={defaultRange}
            onSelect={(range) => setDefaultRange(range as DateRange)}
            id="range-default"
          />
        </Col>

        <Col width={6}>
          <DateField
            mode="range"
            label="Range with disabled future"
            selected={rangeWithLimits}
            onSelect={(range) => setRangeWithLimits(range as DateRange)}
            minDate={twoMonthsAgo}
            maxDate={maxDate}
            id="range-with-limits"
          />
        </Col>

        <Col width={6}>
          <DateField
            mode="range"
            label="Start date only"
            selected={startOnly}
            onSelect={(range) => setStartOnly(range as DateRange)}
            id="range-with-start-only"
          />
        </Col>

        <Col width={6}>
          <DateField
            mode="range"
            label="Range with disabled past"
            selected={disablePastRange}
            onSelect={(range) => setDisablePastRange(range as DateRange)}
            disablePast
            id="range-with-disabled-past"
          />
        </Col>
      </Row>
    );
  },
};

export const DisabledWeekends: Story = {
  render: Template,
  args: {
    mode: 'single',
    disabled: { dayOfWeek: [0, 6] },
    label: 'Weekdays only',
  },
};

export const ShowWeekCount: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Weekdays only',
    showWeekNumber: true,
  },
};

export const MultipleMonthsShown: Story = {
  render: () => {
    return <DateField label="Date" numberOfMonths={2} mode="range" id="multiple-shown" />;
  },
};

export const MonthYearSelectGrid: Story = {
  render: () => {
    return <DateField label="Date" monthYearSelectGrid id="month-year-grid" />;
  },
};

export const CalendarFooter: Story = {
  render: () => {
    return (
      <Row>
        <Col>
          <DateField
            label="Select time"
            id="calendar-with-footer"
            footer={
              <Row>
                <Col width={12} className="text-center">
                  <Button visualType="secondary" size="small">
                    Cancel selection
                  </Button>
                </Col>
              </Row>
            }
          />
        </Col>
        <Col>
          <DateField
            label="Action buttons"
            id="calendar-with-footer-2"
            footer={
              <Row>
                <Col width={12}>
                  <div className="flex gap-3">
                    <Button visualType="secondary" fullWidth size="small">
                      Cancel
                    </Button>
                    <Button visualType="primary" fullWidth size="small">
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            }
          />
        </Col>
      </Row>
    );
  },
};

export const CalendarTrigger: Story = {
  render: () => {
    return (
      <Row>
        <Col>
          <DateField label="Calendar icon trigger" id="calendar-button-trigger" calendarTrigger="button" />
        </Col>
        <Col>
          <DateField label="Input trigger" id="calendar-input-trigger" calendarTrigger="input" />
        </Col>
      </Row>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'calendarTrigger prop allows you to open calendar either on input click or calendar icon',
      },
    },
  },
};

export const ManualTyping: StoryFn<DateFieldProps> = (args) => {
  const [value, setValue] = useState<Date | undefined>();

  const parseEstonianDate = (value: string): Date | undefined => {
    const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return undefined;

    const [, dd, mm, yyyy] = match;
    const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));

    return isNaN(date.getTime()) ? undefined : date;
  };

  return (
    <DateField
      {...args}
      selected={value}
      onSelect={(date) => setValue(date as Date | undefined)}
      parseDate={parseEstonianDate}
      placeholder="dd.mm.yyyy"
      label="Date"
      required
    />
  );
};
