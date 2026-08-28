import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
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
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: { exclude: ['sm', 'md', 'lg', 'xl', 'xxl'] },

    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

const CalendarTemplate: React.FC<Partial<CalendarProps>> = (props) => {
  const [view, setView] = useState<CalendarView>('days');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const defaultValue = props.mode === 'multiple' ? [] : props.mode === 'range' ? { from: new Date() } : undefined;

  const [value, setValue] = useState(props.value ?? defaultValue);

  const prevMode = useRef(props.mode);
  useEffect(() => {
    if (prevMode.current === props.mode) return;
    prevMode.current = props.mode;
    setValue(props.mode === 'multiple' ? [] : props.mode === 'range' ? { from: new Date() } : undefined);
  }, [props.mode]);

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
  render: (args) => <CalendarTemplate {...args} />,
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
                    Vali kellaaeg
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
                  <Button iconRight="arrow_forward">Otsi aegu</Button>
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
                    Tühista valik
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
                      Tühista
                    </Button>
                    <Button visualType="primary" fullWidth size="small">
                      Salvesta
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
  render: () => {
    const today = new Date();
    const availableDays = [
      new Date(today.getFullYear(), today.getMonth(), 9),
      new Date(today.getFullYear(), today.getMonth(), 10),
      new Date(today.getFullYear(), today.getMonth(), 16),
      new Date(today.getFullYear(), today.getMonth(), 17),
    ];

    return (
      <VerticalSpacing>
        <Row>
          <Col width="auto">
            <CalendarTemplate
              availableDays={availableDays}
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
                    Valitud
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
                    Vabad ajad
                  </Col>
                </Row>
              }
            />
          </Col>
        </Row>
      </VerticalSpacing>
    );
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
    // Two-month range with `showOutsideDays={false}` so the second month has one
    // clean start/end instead of the range restarting on its leading outside days.
    const rangeAcrossMonths = {
      from: new Date(2026, 6, 24),
      to: new Date(2026, 7, 6),
    };

    return (
      <VerticalSpacing>
        <CalendarTemplate mode="range" value={defaultRange} handleSelect={(d) => console.log('Range selected:', d)} />
        <CalendarTemplate
          mode="range"
          value={rangeAcrossMonths}
          currentMonth={new Date(2026, 6, 1)}
          numberOfMonths={2}
          showOutsideDays={false}
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
 * `fullWidth` fills the parent container, scaling cells to match its width.
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
 * `monthYearSelectType="static"` shows the month/year as a plain label — only
 * the prev/next buttons change the month.
 */
export const StaticMonthYear: Story = {
  render: () => <CalendarTemplate monthYearSelectType="static" />,
};

/**
 * `dayStatus: (date) => { type, label }` overlays a `StatusIndicator` dot on a
 * day; the `label` is added to its `aria-label`. Pair with a footer legend so
 * colour isn't the only cue.
 */
export const WithDayStatus: Story = {
  render: () => {
    const today = new Date();
    const day = (offset: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);

    const statusByDate = new Map(
      [day(-2), day(4), day(10)].map((date) => [date.toDateString(), 'Kinnitatud vastuvõtt'])
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
              <StatusIndicator type="success" size="sm" />
              Kinnitatud
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
