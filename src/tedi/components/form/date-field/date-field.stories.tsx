import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { DateField, DateFieldProps } from './date-field';

/**
 * React DayPicker based reusable DatePicker component <br/>
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

export const Single: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Date',
    required: true,
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

export const Range: Story = {
  render: Template,
  args: {
    mode: 'range',
    label: 'Select date range',
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
    return <DateField label="Visible months" numberOfMonths={2} mode="range" />;
  },
};

export const MonthYearSelectGrid: Story = {
  render: () => {
    return <DateField label="Date" monthYearSelectGrid />;
  },
};

export const CalendarFooter: Story = {
  render: () => {
    return (
      <Row>
        <Col>
          <DateField
            label="Action buttons"
            openBehavior="input"
            footer={
              <Row>
                <Col width={6}>
                  <Button visualType="secondary" fullWidth>
                    Cancel
                  </Button>
                </Col>
                <Col width={6}>
                  <Button visualType="primary" fullWidth>
                    Save
                  </Button>
                </Col>
              </Row>
            }
          />
        </Col>
        <Col>
          <DateField
            label="Select time"
            openBehavior="input"
            footer={
              <Row>
                <Col width={12}>
                  <Button visualType="link" fullWidth iconLeft="schedule">
                    Select time
                  </Button>
                </Col>
              </Row>
            }
          />
        </Col>
      </Row>
    );
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

export const AvailableDays: Story = {
  render: () => {
    const availableDays = [
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
      />
    );
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
      placeholder="pp.kk.aaaa"
      label="Kuupäev"
      required
    />
  );
};
