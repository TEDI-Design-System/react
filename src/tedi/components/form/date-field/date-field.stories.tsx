import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { LabelProvider } from '../../../providers/label-provider';
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
  // The examples use Estonian content, so surface the Estonian modal labels (title, Cancel/Confirm,
  // month-nav aria-labels) by overriding the Storybook default `LabelProvider locale="en"`.
  decorators: [
    (Story) => (
      <LabelProvider locale="et">
        <Story />
      </LabelProvider>
    ),
  ],
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.37.57?node-id=4620-82915&m=dev',
    },
  },
} as Meta<DateFieldProps>;

type Story = StoryObj<DateFieldProps>;

const Template: StoryFn<DateFieldProps> = (args) => {
  return <DateField {...args} />;
};

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
          <Col lg={2} xs={12}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col lg={10} xs={12} className="d-flex">
            <DateField
              label="Kuupäev"
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
    label: 'Kuupäev',
    placeholder: 'pp.kk.aaaa',
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
            <DateField id={state} mode="single" label="Kuupäev" inputProps={{ disabled: state === 'Disabled' }} />
          </Col>
        </Row>
      ))}
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col md={4} xs={12} className="display-flex align-items-center">
          <DateField
            id="success-datefield"
            mode="single"
            label="Kuupäev"
            inputProps={{ helper: { text: 'Tagasiside tekst', type: 'valid' } }}
          />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col md={4} xs={12} className="display-flex align-items-center">
          <DateField
            id="error-datefield"
            mode="single"
            label="Kuupäev"
            inputProps={{ helper: { text: 'Tagasiside tekst', type: 'error' } }}
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

export const FieldOptions: StoryFn = () => {
  const [shortcutValue, setShortcutValue] = useState<Date | undefined>(undefined);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <Row>
      <Col lg={6} xs={12}>
        <div className="flex gap-4 flex-column">
          <DateField id="date-default" label="Kuupäeva väli vaikimisi" placeholder="pp.kk.aaaa" mode="single" />

          <DateField
            id="date-with-hint"
            label="Kuupäeva väli vihjega"
            placeholder="pp.kk.aaaa"
            mode="single"
            inputProps={{ helper: { text: 'pp.kk.aaaa' } }}
          />

          <div>
            <DateField
              id="date-with-shortcuts"
              label="Kuupäeva väli kiirvalikutega"
              placeholder="pp.kk.aaaa"
              mode="single"
              selected={shortcutValue}
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
      <Col lg={6} xs={12}>
        <div className="flex gap-3 flex-column">
          <DateField id="date-default" label="Kuupäev" />

          <DateField id="date-with-placeholder" label="Kuupäev" placeholder="pp.kk.aaaa" />

          <DateField
            id="date-with-placeholder-and-default-value"
            label="Kuupäev"
            placeholder="pp.kk.aaaa"
            defaultValue={new Date()}
          />

          <DateField
            id="date-with-multiple-dates"
            label="Kuupäev"
            placeholder="pp.kk.aaaa"
            defaultValue={[new Date(2026, 2, 24), new Date(2026, 2, 26)]}
            mode="multiple"
          />

          <DateField
            id="date-with-range"
            label="Kuupäev"
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
      <Row gutterY={2}>
        <Col lg={6} xs={12}>
          <p style={{ marginBottom: '16px', display: 'block' }}>Calendar button is clickable</p>
          <DateField label="Kuupäev" placeholder="pp.kk.aaaa" id="calendar-button-trigger" calendarTrigger="button" />
        </Col>
        <Col lg={6} xs={12}>
          <p style={{ marginBottom: '16px', display: 'block' }}>Input is clickable</p>
          <DateField label="Kuupäev" placeholder="pp.kk.aaaa" id="calendar-input-trigger" calendarTrigger="input" />
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
    label: 'Kuupäevad',
    placeholder: 'pp.kk.aaaa',
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
        <Col lg={6} xs={12}>
          <DateField
            mode="range"
            label="Vaikimisi vahemik"
            placeholder="pp.kk.aaaa – pp.kk.aaaa"
            selected={defaultRange}
            onSelect={(range) => setDefaultRange(range as DateRange)}
            id="range-default"
          />
        </Col>

        <Col lg={6} xs={12}>
          <DateField
            mode="range"
            label="Vahemik keelatud tulevikuga"
            placeholder="pp.kk.aaaa – pp.kk.aaaa"
            selected={rangeWithLimits}
            onSelect={(range) => setRangeWithLimits(range as DateRange)}
            minDate={twoMonthsAgo}
            maxDate={maxDate}
            id="range-with-limits"
          />
        </Col>

        <Col lg={6} xs={12}>
          <DateField
            mode="range"
            label="Ainult alguskuupäev"
            placeholder="pp.kk.aaaa – pp.kk.aaaa"
            selected={startOnly}
            onSelect={(range) => setStartOnly(range as DateRange)}
            id="range-with-start-only"
          />
        </Col>

        <Col lg={6} xs={12}>
          <DateField
            mode="range"
            label="Vahemik keelatud minevikuga"
            placeholder="pp.kk.aaaa – pp.kk.aaaa"
            selected={disablePastRange}
            onSelect={(range) => setDisablePastRange(range as DateRange)}
            disablePast
            id="range-with-disabled-past"
          />
        </Col>
        <Col width={12}>
          <DateField
            mode="range"
            label="Vahemik mitme kuuga"
            placeholder="pp.kk.aaaa – pp.kk.aaaa"
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
    label: 'Kuupäev',
    placeholder: 'pp.kk.aaaa',
  },
};

export const ShowWeekCount: Story = {
  render: Template,
  args: {
    mode: 'single',
    label: 'Kuupäev',
    placeholder: 'pp.kk.aaaa',
    showWeekNumber: true,
  },
};

export const MultipleMonths: Story = {
  render: () => {
    return (
      <DateField label="Kuupäev" placeholder="pp.kk.aaaa" numberOfMonths={2} mode="single" id="multiple-shown-single" />
    );
  },
};

export const YearGrid: Story = {
  render: () => {
    return (
      <DateField
        label="Kuupäev"
        placeholder="pp.kk.aaaa"
        monthYearSelectType="grid"
        id="month-year-grid"
        selectionLevel="years"
      />
    );
  },
};

/**
 * Both fields use `monthYearSelectType="grid"`, so every picker is a grid (no dropdown) —
 * they only differ in the direction the user moves through year / month / day:
 *
 * - **Left (year → month → day):** `initialView="years"` opens straight on the year grid.
 *   With the default `selectionLevel="days"`, picking a year drills into the month grid,
 *   then the day grid, where the final date commits.
 * - **Right (day → month → year):** the default `initialView` opens on the day grid; the
 *   grid-style header lets the user step *up* — click the month to open the month grid,
 *   click the year to open the year grid — before drilling back down to a day.
 */
export const GridPickerFirst: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        <DateField
          id="date-grid-year-first"
          mode="single"
          label="Aasta → kuu → päev"
          placeholder="pp.kk.aaaa"
          initialView="years"
          monthYearSelectType="grid"
        />
        <DateField
          id="date-grid-day-first"
          mode="single"
          label="Päev → kuu → aasta"
          placeholder="pp.kk.aaaa"
          monthYearSelectType="grid"
        />
      </div>
    );
  },
};

/**
 * Month + year picker — no day grid. `selectionLevel="months"` makes the
 * calendar commit when the user clicks a month tile (the day grid is
 * skipped). The `formatDate` / `parseDate` overrides change the input
 * display + manual-typing format to `kk.aaaa` (e.g. `06.2026`); the
 * underlying value is still a `Date` that falls on the first of the month.
 */
export const MonthYearOnly: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();

    const formatMonthYear = (date: Date | Date[] | DateRange | undefined): string => {
      if (!date || !(date instanceof Date)) return '';
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${month}.${date.getFullYear()}`;
    };

    const parseMonthYear = (input: string): Date | undefined => {
      const match = input.trim().match(/^(\d{1,2})\.(\d{4})$/);
      if (!match) return undefined;
      const month = Number(match[1]);
      const year = Number(match[2]);
      if (month < 1 || month > 12) return undefined;
      const d = new Date(year, month - 1, 1);
      return isNaN(d.getTime()) ? undefined : d;
    };

    return (
      <DateField
        id="date-month-year-only"
        mode="single"
        label="Kuu ja aasta"
        placeholder="kk.aaaa"
        selectionLevel="months"
        monthYearSelectType="grid"
        selected={selected}
        onSelect={(d) => setSelected(d as Date)}
        formatDate={formatMonthYear}
        parseDate={parseMonthYear}
      />
    );
  },
};

/**
 * Year-only picker. `selectionLevel="years"` commits when the user clicks a
 * year tile (Jan 1 of that year). `formatDate` / `parseDate` swap the
 * display format to a plain four-digit year.
 */
export const YearOnly: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();

    const formatYear = (date: Date | Date[] | DateRange | undefined): string =>
      date instanceof Date ? String(date.getFullYear()) : '';

    const parseYear = (input: string): Date | undefined => {
      const match = input.trim().match(/^(\d{4})$/);
      if (!match) return undefined;
      const d = new Date(Number(match[1]), 0, 1);
      return isNaN(d.getTime()) ? undefined : d;
    };

    return (
      <DateField
        id="date-year-only"
        mode="single"
        label="Aasta"
        placeholder="aaaa"
        selectionLevel="years"
        monthYearSelectType="grid"
        selected={selected}
        onSelect={(d) => setSelected(d as Date)}
        formatDate={formatYear}
        parseDate={parseYear}
      />
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    return (
      <Row gutterY={3}>
        <Col lg={6} xs={12}>
          <DateField
            label="Kuupäev"
            placeholder="pp.kk.aaaa"
            id="calendar-with-footer"
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
        <Col lg={6} xs={12}>
          <DateField
            label="Kuupäev"
            placeholder="pp.kk.aaaa"
            id="calendar-with-footer-2"
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
        label="Kuupäev"
        placeholder="pp.kk.aaaa"
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
        availableDays={availableDays}
        id="available-days-shown"
      />
    );
  },
};

/**
 * Swaps the custom calendar popover for the browser's native date picker
 * (`<input type="date">`). Useful when the consumer wants to skip the custom
 * UI entirely — works on both mobile (where the native control is usually
 * the best UX) and desktop (where it's a compact, dependency-free fallback).
 *
 */
export const NativePicker: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <DateField
        id="date-field-native-picker"
        mode="single"
        label="Kuupäev"
        placeholder="pp.kk.aaaa"
        useNativePicker
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
      />
    );
  },
};

/**
 * Pass `modal` (alone or `modal={true}`) to open the calendar inside a modal — with a
 * Cancel / Confirm footer — instead of the floating popover, on **every** viewport including
 * desktop. With `calendarTrigger="input"` the modal opens from clicking anywhere in the field.
 * The selection is held as a draft and only committed on Confirm — Cancel / Escape / backdrop
 * dismiss discards it.
 *
 * `modalProps` is breakpoint-aware, so `{ fullscreen: 'edge', md: { fullscreen: false } }` makes the
 * modal cover the full viewport below `md` (handy on phones) while staying a centered dialog from
 * `md` up.
 */
export const ModalPicker: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <DateField
        id="date-field-modal"
        mode="single"
        label="Kuupäev"
        modal
        calendarTrigger="input"
        modalProps={{ fullscreen: 'edge', md: { fullscreen: false } }}
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
      />
    );
  },
};

/**
 * `modal="md"` opens the calendar in a modal only below `md` viewports and keeps the regular
 * popover calendar on desktop. Paired with `modalProps={{ fullscreen: 'edge' }}` the mobile modal
 * fills the viewport edge-to-edge. Resize the Storybook canvas to see it switch.
 */
export const ResponsiveModalPicker: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
      <DateField
        id="date-field-modal-responsive"
        mode="single"
        label="Kuupäev"
        modal="md"
        calendarTrigger="input"
        modalProps={{ fullscreen: 'edge' }}
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
      />
    );
  },
};

/**
 * Calendar modals (`modal` + `calendarTrigger="input"`): edge-fullscreen on mobile, centered on
 * desktop. `selectionLevel` restricts the picker to **month** or **year** — with
 * `monthYearSelectType="grid"` the navigation replaces the content in place instead of dropping down
 * — and `modalTitle` sets the heading. The **range** modal shows two months side by side on desktop
 * (`numberOfMonths={2}`): the dialog's `width: max-content` default auto-sizes to fit both, and on
 * narrow / mobile-fullscreen the calendar wraps them into a vertical stack. It also passes
 * `showNavigation={false}`, which locks it to the two shown months — no prev/next navigation and the
 * month/year header renders as a static (non-clickable) label.
 */
export const ModalPickers: Story = {
  render: () => {
    const [month, setMonth] = useState<Date | undefined>();
    const [year, setYear] = useState<Date | undefined>();
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <Row gutterY={2}>
        <Col lg={4} xs={12}>
          <Text modifiers="small">Kuu</Text>
          <DateField
            id="date-field-modal-month"
            mode="single"
            label="Kuu"
            modal
            calendarTrigger="input"
            selectionLevel="months"
            monthYearSelectType="grid"
            modalTitle="Vali kuu"
            modalProps={{ fullscreen: 'edge', md: { fullscreen: false } }}
            selected={month}
            onSelect={(date) => setMonth(date as Date)}
          />
        </Col>
        <Col lg={4} xs={12}>
          <Text modifiers="small">Aasta</Text>
          <DateField
            id="date-field-modal-year"
            mode="single"
            label="Aasta"
            modal
            calendarTrigger="input"
            selectionLevel="years"
            monthYearSelectType="grid"
            modalTitle="Vali aasta"
            modalProps={{ fullscreen: 'edge', md: { fullscreen: false } }}
            selected={year}
            onSelect={(date) => setYear(date as Date)}
          />
        </Col>
        <Col lg={4} xs={12}>
          <Text modifiers="small">Vahemik (2 kuud)</Text>
          <DateField
            id="date-field-modal-range"
            mode="range"
            label="Vahemik"
            modal
            calendarTrigger="input"
            numberOfMonths={2}
            monthYearSelectType="grid"
            modalTitle="Vali vahemik"
            showNavigation={false}
            modalProps={{ fullscreen: 'edge', md: { fullscreen: false } }}
            selected={range}
            onSelect={(date) => setRange(date as DateRange)}
          />
        </Col>
      </Row>
    );
  },
};
