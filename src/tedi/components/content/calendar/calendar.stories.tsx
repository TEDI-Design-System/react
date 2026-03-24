import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { et } from 'react-day-picker/locale';

import { CalendarView } from '../../form/date-field/date-field';
import { Calendar } from './calendar';

/**
 * React DayPicker based reusable date picker component <br/>
 * <a href="https://daypicker.dev/" target="_BLANK">React DayPicker ↗</a><br />
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.37.57?node-id=4620-82915&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/15bd6e-date-field" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Calendar> = {
  title: 'TEDI-Ready/Content/Calendar',
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default = () => {
  const [view, setView] = useState<CalendarView>('days');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [value, setValue] = useState<Date>();

  return (
    <Calendar
      view={view}
      calendarView="days"
      currentMonth={currentMonth}
      setCurrentMonth={setCurrentMonth}
      setView={setView}
      mode="single"
      value={value}
      locale={et}
      showOutsideDays
      handleSelect={(d) => {
        setValue(d as Date);
      }}
      applyValue={(d) => {
        setValue(d);
      }}
    />
  );
};

export const Multiple: Story = {
  render: () => {
    const defaultDates = [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 3)),
      new Date(new Date().setDate(new Date().getDate() + 7)),
    ];

    const [dates, setDates] = useState<Date[]>(defaultDates);
    const [view, setView] = useState<CalendarView>('days');
    const [currentMonth, setCurrentMonth] = useState(new Date());

    return (
      <Calendar
        view={view}
        calendarView="days"
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        setView={setView}
        mode="multiple"
        value={dates}
        locale={et}
        showOutsideDays
        handleSelect={(d) => {
          setDates(d as Date[]);
        }}
        applyValue={(d) => setDates([d as Date])}
      />
    );
  },
};

export const Range: Story = {
  render: () => {
    const today = new Date();
    const defaultRange = {
      from: today,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    };

    const [range, setRange] = useState<{ from: Date; to?: Date }>(defaultRange);
    const [view, setView] = useState<CalendarView>('days');
    const [currentMonth, setCurrentMonth] = useState(today);

    return (
      <Calendar
        view={view}
        calendarView="days"
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        setView={setView}
        mode="range"
        value={range}
        locale={et}
        showOutsideDays
        handleSelect={(d) => {
          setRange(d as { from: Date; to?: Date });
        }}
        applyValue={(d) => setRange({ from: d as Date, to: range?.to ?? undefined })}
      />
    );
  },
};
