import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { et } from 'react-day-picker/locale';

import Button from '../../buttons/button/button';
import { CalendarView } from '../../form/date-field/date-field';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Calendar, CalendarProps } from './calendar';

/**
 * <a href="https://daypicker.dev/" target="_BLANK">React DayPicker ↗</a><br />
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.39.64?node-id=42935-127968&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/15bd6e-date-field" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Calendar> = {
  title: 'TEDI-Ready/Content/Calendar',
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

const CalendarTemplate: React.FC<Partial<CalendarProps>> = (props) => {
  const [view, setView] = useState<CalendarView>('days');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const defaultValue = props.mode === 'multiple' ? [] : props.mode === 'range' ? { from: new Date() } : undefined;

  const [value, setValue] = useState(props.value ?? defaultValue);

  const handleSelect: CalendarProps['handleSelect'] = (selected, day, modifiers, event) => {
    setValue(selected);
    props.handleSelect?.(selected, day, modifiers, event);
  };

  const applyValue: CalendarProps['applyValue'] = (d) => {
    setValue(d);
    props.applyValue?.(d);
  };

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
      handleSelect={handleSelect}
      applyValue={applyValue}
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <CalendarTemplate />,
};

export const WithFooter: Story = {
  render: () => (
    <VerticalSpacing>
      <Row>
        <Col width="auto">
          <CalendarTemplate
            footer={
              <Row>
                <Col width={12} className="text-center">
                  <Button visualType="link" size="small" iconRight="schedule">
                    Select time
                  </Button>
                </Col>
              </Row>
            }
          />
        </Col>
        <Col width="auto">
          <CalendarTemplate
            footer={
              <Row>
                <Col width={12} className="text-center">
                  <Button iconRight="arrow_forward">Search times</Button>
                </Col>
              </Row>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col width="auto">
          <CalendarTemplate
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
        <Col width="auto">
          <CalendarTemplate
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
    </VerticalSpacing>
  ),
};

export const MultipleSelectedDates: Story = {
  render: () => {
    const defaultDates = [
      new Date(new Date().setDate(new Date().getDate() - 10)),
      new Date(new Date().setDate(new Date().getDate() - 2)),
      new Date(new Date().setDate(new Date().getDate() + 6)),
      new Date(new Date().setDate(new Date().getDate() + 7)),
      new Date(new Date().setDate(new Date().getDate() + 12)),
      new Date(new Date().setDate(new Date().getDate() + 16)),
    ];

    return <CalendarTemplate mode="multiple" value={defaultDates} handleSelect={(d) => console.log('Selected:', d)} />;
  },
};

export const Availability: Story = {
  render: () => {
    const today = new Date();

    const availableDays = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
    ];

    const unavailableDays = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    ];

    const [selectedAvailable, setSelectedAvailable] = useState<Date | undefined>();
    const [selectedUnavailable, setSelectedUnavailable] = useState<Date | undefined>();

    return (
      <Row>
        <Col width="auto">
          <CalendarTemplate
            id="available-days"
            mode="single"
            value={selectedAvailable}
            availableDays={availableDays}
            handleSelect={(selected, day, modifiers, event) => {
              setSelectedAvailable(selected as Date | undefined);
            }}
          />
        </Col>

        <Col width="auto">
          <CalendarTemplate
            id="unavailable-days"
            mode="single"
            value={selectedUnavailable}
            unavailableDays={unavailableDays}
            handleSelect={(selected, day, modifiers, event) => {
              setSelectedUnavailable(selected as Date | undefined);
            }}
          />
        </Col>
      </Row>
    );
  },
};

export const Range: Story = {
  render: () => {
    const today = new Date();
    const defaultRange = {
      from: today,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12),
    };

    return (
      <VerticalSpacing>
        <CalendarTemplate mode="range" value={defaultRange} handleSelect={(d) => console.log('Range selected:', d)} />
        <CalendarTemplate
          mode="range"
          value={defaultRange}
          numberOfMonths={2}
          handleSelect={(d) => console.log('Range selected:', d)}
          showNavigation={false}
        />
      </VerticalSpacing>
    );
  },
};

export const NoControls: Story = {
  render: () => <CalendarTemplate showNavigation={false} />,
};

export const WithWeeksCount: Story = {
  render: () => (
    <VerticalSpacing>
      <CalendarTemplate showWeekNumber />
      <CalendarTemplate showWeekNumber numberOfMonths={2} />
    </VerticalSpacing>
  ),
};

export const YearView: Story = {
  render: () => <CalendarTemplate calendarView="years" view="years" />,
};

export const MonthView: Story = {
  render: () => <CalendarTemplate calendarView="months" view="months" showNavigation={false} />,
};
