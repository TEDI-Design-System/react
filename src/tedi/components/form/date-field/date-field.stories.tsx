import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { TextFieldProps } from '../textfield/textfield';
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

const sizeArray: TextFieldProps['size'][] = ['default', 'small'];
interface TemplateMultipleProps<Type = TextFieldProps['size']> extends TextFieldProps {
  array: Type[];
  property: keyof TextFieldProps;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...textFieldProps } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={2}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col className="d-flex">
            <DateField
              label="Date"
              id={`${textFieldProps.id}-${key}-1`}
              inputProps={{
                [property]: value,
              }}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Date',
    required: true,
  },
};

export const Size: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    property: 'size',
    array: sizeArray,
  },
};

export const FieldOptions: StoryFn = () => {
  const [shortcutValue, setShortcutValue] = useState<Date | undefined>(undefined);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <Row>
      <Col width={6}>
        <div className="flex gap-4 flex-column">
          <DateField id="date-default" label="Date field default" enableCalendar={false} mode="single" />

          <DateField
            id="date-with-hint"
            label="Date field with hint"
            enableCalendar={false}
            placeholder="pp.kk.aaaa"
            mode="single"
            inputProps={{ helper: { text: 'kk.pp.aaaa' } }}
          />

          <div>
            <DateField
              key={shortcutValue?.toISOString() ?? 'empty'}
              id="date-with-shortcuts"
              label="Date field with shortcuts"
              enableCalendar={false}
              mode="single"
              defaultValue={shortcutValue}
              parseDate={(val) => {
                const parts = val.split('.');
                if (parts.length !== 3) return undefined;
                const [day, month, year] = parts.map(Number);
                const d = new Date(year, month - 1, day);
                return isNaN(d.getTime()) ? undefined : d;
              }}
              onSelect={(d) => setShortcutValue(d instanceof Date ? d : undefined)}
            />
            <div className="flex gap-3" style={{ marginTop: '8px' }}>
              <Button visualType="link" size="small" onClick={() => setShortcutValue(today)}>
                Täna
              </Button>
              <Button visualType="link" size="small" onClick={() => setShortcutValue(tomorrow)}>
                Homme
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export const ValueType: StoryFn = () => {
  return (
    <Row>
      <Col width={6}>
        <div className="flex gap-3 flex-column">
          <DateField id="date-default" label="Date" enableCalendar={false} />

          <DateField id="date-with-placeholder" label="Date" enableCalendar={false} placeholder="pp.kk.aaaa" />

          <DateField
            id="date-with-placeholder"
            label="Date"
            enableCalendar={false}
            placeholder="pp.kk.aaaa"
            defaultValue={new Date()}
          />

          <DateField
            id="date-with-multiple-dates"
            label="Date"
            enableCalendar={false}
            placeholder="pp.kk.aaaa"
            defaultValue={[new Date(2026, 2, 24), new Date(2026, 2, 26)]}
            mode="multiple"
          />

          <DateField
            id="date-with-range"
            label="Date"
            enableCalendar={false}
            placeholder="pp.kk.aaaa – pp.kk.aaaa"
            mode="range"
            defaultValue={{
              from: new Date(2026, 2, 24),
              to: new Date(2026, 2, 27),
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export const OnClickType: Story = {
  render: () => {
    return (
      <Row>
        <Col>
          <p style={{ marginBottom: '16px', display: 'block' }}>Calendar button is clickable</p>
          <DateField label="Date" id="calendar-button-trigger" calendarTrigger="button" />
        </Col>
        <Col>
          <p style={{ marginBottom: '16px', display: 'block' }}>Input is clickable</p>
          <DateField label="Date" id="calendar-input-trigger" calendarTrigger="input" />
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

export const Single: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Date',
    required: true,
  },
};

export const MultipleValues: Story = {
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
        <Col width={12}>
          <DateField
            mode="range"
            label="Range with multiple months"
            selected={defaultRange}
            onSelect={(range) => setDefaultRange(range as DateRange)}
            id="range-with-multiple-months"
            numberOfMonths={2}
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
    label: 'Date',
  },
};

export const ShowWeekCount: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Date',
    showWeekNumber: true,
  },
};

export const MultipleMonthsShown: Story = {
  render: () => {
    return <DateField label="Date" numberOfMonths={2} mode="single" id="multiple-shown-single" />;
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
            label="Time"
            id="calendar-with-footer"
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
        <Col>
          <DateField
            label="Date"
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

export const AvailableDays: Story = {
  render: () => {
    const availableDays = [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() + 4)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
      new Date(new Date().setDate(new Date().getDate() + 6)),
    ];

    const [selected, setSelected] = useState<Date | undefined>();

    return (
      <DateField
        mode="single"
        label="Date"
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
        availableDays={availableDays}
        id="available-days-shown"
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
      placeholder="dd.mm.yyyy"
      label="Date"
      required
    />
  );
};
