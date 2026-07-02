import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { et } from 'react-day-picker/locale';

import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { CalendarView } from '../../form/date-field/date-field';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { StatusIndicator } from '../../tags/status-indicator';
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
      selectionLevel="days"
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
      <Row gutterY={3}>
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
      <Row gutterY={3}>
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

export const WithLegend: Story = {
  render: () => (
    <VerticalSpacing>
      <Row>
        <Col width="auto">
          <CalendarTemplate
            footer={
              <Row>
                <Col width="auto" className="flex align-items-center gap-2">
                  <div
                    style={{
                      backgroundColor: 'var(--form-datepicker-date-selected)',
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                    }}
                  ></div>{' '}
                  Selected
                </Col>
                <Col width="auto" className="flex align-items-center gap-2">
                  <div
                    style={{
                      backgroundColor: 'var(--form-datepicker-date-available)',
                      border: '1px solid var(--green-200)',
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                    }}
                  ></div>{' '}
                  Available
                </Col>
              </Row>
            }
          />
        </Col>
      </Row>
    </VerticalSpacing>
  ),
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

/**
 * Set `fullWidth` and wrap the calendar in a sized container — it fills that
 * width and scales its cells (and rows) to match. The container's width drives
 * the size.
 */
export const FullWidthSizes: Story = {
  render: () => {
    const sizes = [
      { label: 'Medium — 480px', width: 480 },
      { label: 'Large — 640px', width: 640 },
      { label: 'Extra large — 800px', width: 800 },
    ];

    return (
      <VerticalSpacing size={2}>
        {sizes.map(({ label, width }) => (
          <VerticalSpacing size={0.5} key={width}>
            <Text color="secondary" modifiers="small">
              {label}
            </Text>
            <div style={{ width: '100%', maxWidth: `${width}px` }}>
              <CalendarTemplate fullWidth monthYearSelectType="static" showNavigation={false} />
            </div>
          </VerticalSpacing>
        ))}
      </VerticalSpacing>
    );
  },
};

/**
 * Set `monthYearSelectType="static"` to disable month/year selection: the header
 * shows the month and year as a plain, non-clickable label. The user can only
 * change the month via the prev/next navigation buttons — there is no dropdown
 * or drill-down grid.
 */
export const StaticMonthYear: Story = {
  render: () => <CalendarTemplate monthYearSelectType="static" />,
};

/**
 * Pass a `dayStatus` function `(date) => { type, label }` to overlay a
 * `StatusIndicator` dot on specific days. The `label` is folded into the day
 * button's `aria-label` so screen readers announce the status alongside the date
 * (the dot itself stays `aria-hidden`, satisfying WCAG 1.1.1). Pair the calendar
 * with a legend in the footer so colourblind users can decode the indicator
 * colours (WCAG 1.4.1 — colour is not the only cue).
 */
export const WithDayStatus: Story = {
  render: () => {
    const today = new Date();
    const day = (offset: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);

    const statusByDate = new Map(
      [day(-2), day(4), day(10)].map((date) => [date.toDateString(), 'Confirmed appointment'])
    );

    const dayStatus: CalendarProps['dayStatus'] = (date) => {
      const label = statusByDate.get(date.toDateString());
      return label ? { type: 'success', label } : null;
    };

    return (
      <CalendarTemplate
        dayStatus={dayStatus}
        footer={
          <Row>
            <Col width="auto" className="flex align-items-center gap-2">
              <StatusIndicator type="success" size="sm" hasBorder />
              Confirmed
            </Col>
          </Row>
        }
      />
    );
  },
};

export const MonthView: Story = {
  render: () => <CalendarTemplate selectionLevel="months" view="months" showNavigation={false} />,
};

export const YearView: Story = {
  render: () => <CalendarTemplate selectionLevel="years" view="years" />,
};
