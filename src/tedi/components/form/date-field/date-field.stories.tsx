/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DateField, DateFieldProps } from './date-field';

/**
 * React DayPicker based reusable DatePicker component <br/>
 * <a href="#" target="_BLANK">Figma ↗</a><br />
 * <a href="# target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'Tedi-Ready/Components/Form/DateField',
  component: DateField,
  parameters: {
    controls: {
      exclude: [],
    },
  },
} as Meta<DateFieldProps>;

type Story = StoryObj<DateFieldProps>;

const Template: StoryFn<DateFieldProps> = (args) => {
  const [value, setValue] = useState<any>();

  return <DateField {...args} selected={value} onSelect={setValue} />;
};

export const Single: Story = {
  render: Template,
  args: {
    mode: 'single',
    placeholder: 'Select a date',
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    mode: 'multiple',
    placeholder: 'Select multiple dates',
  },
};

export const Range: Story = {
  render: Template,
  args: {
    mode: 'range',
    placeholder: 'Select date range',
  },
};

export const DisabledWeekends: Story = {
  render: Template,
  args: {
    mode: 'single',
    disabled: { dayOfWeek: [0, 6] },
    placeholder: 'Weekdays only',
  },
};

const ManualTypingTemplate: StoryFn<DateFieldProps> = (args) => {
  const [value, setValue] = useState<Date | undefined>();

  const parseEstonianDate = (value: string): Date | undefined => {
    const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return undefined;

    const [, dd, mm, yyyy] = match;
    const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));

    return isNaN(date.getTime()) ? undefined : date;
  };

  return <DateField {...args} selected={value} parseDate={parseEstonianDate} />;
};

export const ManualTyping: Story = {
  render: ManualTypingTemplate,
  args: {
    openBehavior: 'button',
    placeholder: 'DD.MM.YYYY',
  },
};
