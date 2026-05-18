import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Calendar, CalendarProps } from '../../content/calendar/calendar';
import { ChoiceGroup } from '../../form/choice-group';
import { CalendarView } from '../../form/date-field/date-field';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Separator from '../../misc/separator/separator';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { StatusIndicator } from '../../tags/status-indicator/status-indicator';
import { Tag } from '../../tags/tag/tag';
import { Filter, FilterOption, FilterProps } from './filter';
import { FilterGroup } from './filter-group';

const formatDayMonthShort = new Intl.DateTimeFormat('et-EE', { day: '2-digit', month: '2-digit', year: '2-digit' });
const formatRange = (range: DateRange | undefined): string | null => {
  if (!range?.from) return null;
  const from = formatDayMonthShort.format(range.from);
  const to = range.to ? formatDayMonthShort.format(range.to) : '…';
  return `${from} - ${to}`;
};

/**
 * Small wrapper that hosts a range Calendar inside a Filter's custom-content dropdown.
 * Keeps the story bodies readable.
 */
const RangeFilter = ({
  text,
  variant,
  defaultRange,
  numberOfMonths = 2,
}: {
  text: string;
  variant?: FilterProps['variant'];
  defaultRange?: DateRange;
  numberOfMonths?: number;
}) => {
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);
  const [currentMonth, setCurrentMonth] = useState<Date>(defaultRange?.from ?? new Date());
  const [view, setView] = useState<CalendarView>('days');

  const handleSelect: CalendarProps['handleSelect'] = (selected) => {
    setRange(selected as DateRange | undefined);
  };
  const applyValue: CalendarProps['applyValue'] = (d) => setCurrentMonth(d);
  const triggerText = formatRange(range) ?? text;

  return (
    <Filter text={triggerText} variant={variant} selected={Boolean(range?.from)}>
      <Calendar
        mode="range"
        value={range}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        view={view}
        setView={setView}
        handleSelect={handleSelect}
        applyValue={applyValue}
        locale={et}
        numberOfMonths={numberOfMonths}
        showOutsideDays
        bordered={false}
      />
    </Filter>
  );
};

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=6562-159554&m=dev" target="_BLANK">Figma ↗</a>
 */

const meta: Meta<typeof Filter> = {
  component: Filter,
  title: 'TEDI-Ready/Components/Filter/Filter',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: { exclude: ['sm', 'md', 'lg', 'xl', 'xxl'] },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=6562-159554&m=dev',
    },
  },
  argTypes: {
    options: { control: false },
    children: { control: false },
    prepend: { control: false },
    append: { control: false },
  },
};
export default meta;
type Story = StoryObj<FilterProps>;

const teenusOptions: FilterOption[] = [
  { label: 'Optometristi vastuvõtt', value: '1' },
  { label: 'Silmaarsti vastuvõtt', value: '2' },
  { label: 'Hambaarsti vastuvõtt', value: '3' },
];

const raviasutusOptions: FilterOption[] = [
  { label: 'Fertilitas', value: '1' },
  { label: 'Ida-Tallinna Keskhaigla', value: '2' },
  { label: 'Lääne-Tallinna Keskhaigla', value: '3' },
  { label: 'Põhja-Eesti Regionaalhaigla', value: '4' },
  { label: 'Tallinna Lastehaigla', value: '5' },
  { label: 'Tartu Ülikooli Kliinikum', value: '6' },
];

const Template: StoryFn<FilterProps> = (args) => <Filter {...args} />;

export const Default: Story = {
  render: Template,
  args: { text: 'Teenused' },
};

const sizeArray: FilterProps['size'][] = ['default', 'large'];

export const Size: Story = {
  render: () => (
    <div className="example-list">
      {sizeArray.map((value, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={2}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col className="display-flex gap-2 flex-wrap">
            <Filter text="Text" size={value} selected />
            <Filter text="Text" size={value} />
            <Filter text="Text" size={value} />
            <Filter text="Text" size={value} />
          </Col>
        </Row>
      ))}
    </div>
  ),
};

/**
 * Single value filters include boolean toggles (separate and grouped) and single-select dropdown
 * filters. The grouped variant shares a `FilterGroup` to coordinate selection.
 */
export const SingleValueFilter: Story = {
  render: () => (
    <VerticalSpacing>
      <VerticalSpacing size={1}>
        <Text modifiers="bold">Separate</Text>
        <div className="display-flex gap-2 flex-wrap">
          <Filter text="Vastuvõtud" defaultSelected />
          <Filter text="Analüüsid" defaultSelected />
          <Filter text="Uuringud" />
          <Filter text="Vaktsineerimised" />
        </div>
        <div className="display-flex gap-2 flex-wrap">
          <Filter text="Vastuvõtud" variant="secondary" defaultSelected />
          <Filter text="Analüüsid" variant="secondary" defaultSelected />
          <Filter text="Uuringud" variant="secondary" />
          <Filter text="Vaktsineerimised" variant="secondary" />
        </div>
        <div className="display-flex gap-2 flex-wrap">
          <Filter
            text="Vastuvõtud"
            variant="secondary"
            defaultSelected
            prepend={<Icon name="medical_services" size={18} color="inherit" />}
          />
          <Filter text="Analüüsid" variant="secondary" prepend={<Icon name="science" size={18} color="inherit" />} />
          <Filter text="Uuringud" variant="secondary" prepend={<Icon name="biotech" size={18} color="inherit" />} />
          <Filter
            text="Vaktsineerimised"
            variant="secondary"
            prepend={<Icon name="vaccines" size={18} color="inherit" />}
          />
        </div>
      </VerticalSpacing>

      <VerticalSpacing size={1}>
        <Text modifiers="bold">Grouped</Text>
        <div className="display-flex gap-2 flex-wrap">
          <FilterGroup>
            <Filter text="Kooskõlastatud" />
            <Filter text="Tagasilükatud" />
          </FilterGroup>
          <FilterGroup>
            <Filter text="Kooskõlastatud" defaultSelected />
            <Filter text="Tagasilükatud" />
          </FilterGroup>
        </div>
        <div className="display-flex gap-2 flex-wrap">
          <FilterGroup>
            <Filter text="Kooskõlastatud" variant="secondary" />
            <Filter text="Tagasilükatud" variant="secondary" />
          </FilterGroup>
          <FilterGroup>
            <Filter text="Kooskõlastatud" variant="secondary" defaultSelected />
            <Filter text="Tagasilükatud" variant="secondary" />
          </FilterGroup>
        </div>
        <div className="display-flex gap-2 flex-wrap">
          <FilterGroup>
            <Filter text="Analüüsid" />
            <Filter text="Doonorlus" />
            <Filter text="Uuringud" />
            <Filter text="Vaktsineerimised" />
          </FilterGroup>
        </div>
      </VerticalSpacing>

      <VerticalSpacing size={1}>
        <Text modifiers="bold">Dropdown label + value</Text>
        <div className="display-flex gap-2 flex-wrap">
          <Filter text="Teenus" options={teenusOptions} preserveLabel showClear />
        </div>
        <div className="display-flex gap-2 flex-wrap">
          <Filter text="Teenus" variant="secondary" options={teenusOptions} preserveLabel showClear />
        </div>
      </VerticalSpacing>

      <VerticalSpacing size={1}>
        <Text modifiers="bold">Dropdown value</Text>
        <div className="display-flex gap-2 flex-wrap">
          <Filter text="Raviasutus" options={raviasutusOptions} />
          <Filter text="Teenus" options={teenusOptions} />
          <RangeFilter text="Ajavahemik" defaultRange={{ from: new Date(2026, 6, 13), to: new Date(2026, 7, 15) }} />
        </div>
        <div className="display-flex gap-2 flex-wrap">
          <Filter text="Raviasutus" variant="secondary" options={raviasutusOptions} />
          <Filter text="Teenus" variant="secondary" options={teenusOptions} />
          <RangeFilter
            text="Ajavahemik"
            variant="secondary"
            defaultRange={{ from: new Date(2026, 6, 13), to: new Date(2026, 7, 15) }}
          />
        </div>
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};

const arstOptions: FilterOption[] = [
  { label: 'Dr Anna Tamm', value: 'tamm' },
  { label: 'Dr Mari Kask', value: 'kask' },
  { label: 'Dr Jaan Saar', value: 'saar' },
  { label: 'Dr Liis Põld', value: 'pold' },
];

const ajavahemikOptions: FilterOption[] = [
  { label: 'Viimane nädal', value: 'week' },
  { label: 'Viimane kuu', value: 'month' },
  { label: 'Viimane aasta', value: 'year' },
  { label: 'Kohandatud', value: 'custom' },
];

/**
 * Multi value filters open a dropdown with checkboxes. Supports search, "Select all", and
 * "Clear selection" out of the box. Selected count is shown as a status badge on the trigger.
 */
export const MultiValueFilter: Story = {
  render: () => (
    <VerticalSpacing>
      <div className="display-flex gap-2 flex-wrap">
        <Filter
          text="Teenused"
          multiselect
          options={teenusOptions}
          defaultSelectedValues={['1', '2']}
          searchable
          showSelectAll
          showClear
        />
        <Filter
          text="Raviasutus"
          multiselect
          options={raviasutusOptions}
          defaultSelectedValues={['4']}
          searchable
          showSelectAll
          showClear
        />
        <Filter text="Arst" multiselect options={arstOptions} searchable showSelectAll showClear />
        <Filter text="Ajavahemik" multiselect options={ajavahemikOptions} showClear />
      </div>
      <div className="display-flex gap-2 flex-wrap">
        <Filter
          text="Teenused"
          variant="secondary"
          multiselect
          options={teenusOptions}
          defaultSelectedValues={['1', '2']}
          searchable
          showSelectAll
          showClear
        />
        <Filter
          text="Raviasutus"
          variant="secondary"
          multiselect
          options={raviasutusOptions}
          defaultSelectedValues={['4']}
          searchable
          showSelectAll
          showClear
        />
        <Filter text="Arst" variant="secondary" multiselect options={arstOptions} searchable showSelectAll showClear />
        <Filter text="Ajavahemik" variant="secondary" multiselect options={ajavahemikOptions} showClear />
      </div>
    </VerticalSpacing>
  ),
};

export const CustomizeContent: Story = {
  render: () => (
    <VerticalSpacing>
      <VerticalSpacing size={1}>
        <Text modifiers="bold">Prepend hidden when selected (default)</Text>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Unread (3)"
                variant="secondary"
                size="large"
                prepend={<StatusIndicator type="danger" size="sm" />}
              />
              <Filter text="All" variant="secondary" size="large" />
            </FilterGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Unread (3)"
                variant="secondary"
                size="large"
                defaultSelected
                prepend={<StatusIndicator type="danger" size="sm" />}
              />
              <Filter text="All" variant="secondary" size="large" />
            </FilterGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Submitted"
                variant="secondary"
                size="large"
                prepend={<StatusBadge color="brand">5</StatusBadge>}
              />
              <Filter
                text="Requires attention"
                variant="secondary"
                size="large"
                prepend={<StatusBadge color="danger">7</StatusBadge>}
              />
            </FilterGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Submitted"
                variant="secondary"
                size="large"
                defaultSelected
                prepend={<StatusBadge color="brand">5</StatusBadge>}
              />
              <Filter
                text="Requires attention"
                variant="secondary"
                size="large"
                prepend={<StatusBadge color="danger">7</StatusBadge>}
              />
            </FilterGroup>
          </Col>
        </Row>
      </VerticalSpacing>

      <VerticalSpacing size={1}>
        <Text modifiers="bold">Prepend visible when selected</Text>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Submitted"
                variant="secondary"
                size="large"
                hidePrependWhenSelected={false}
                prepend={<StatusBadge color="brand">5</StatusBadge>}
              />
              <Filter
                text="Requires attention"
                variant="secondary"
                size="large"
                hidePrependWhenSelected={false}
                prepend={<StatusBadge color="danger">7</StatusBadge>}
              />
            </FilterGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Submitted"
                variant="secondary"
                size="large"
                defaultSelected
                hidePrependWhenSelected={false}
                prepend={<StatusBadge color="brand">5</StatusBadge>}
              />
              <Filter
                text="Requires attention"
                variant="secondary"
                size="large"
                hidePrependWhenSelected={false}
                prepend={<StatusBadge color="danger">7</StatusBadge>}
              />
            </FilterGroup>
          </Col>
        </Row>
      </VerticalSpacing>

      <VerticalSpacing size={1}>
        <Text modifiers="bold">Append</Text>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Submitted"
                variant="secondary"
                size="large"
                append={<StatusBadge color="brand">5</StatusBadge>}
              />
              <Filter
                text="Requires attention"
                variant="secondary"
                size="large"
                append={<StatusBadge color="danger">7</StatusBadge>}
              />
            </FilterGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterGroup>
              <Filter
                text="Submitted"
                variant="secondary"
                size="large"
                defaultSelected
                append={<StatusBadge color="brand">5</StatusBadge>}
              />
              <Filter
                text="Requires attention"
                variant="secondary"
                size="large"
                append={<StatusBadge color="danger">7</StatusBadge>}
              />
            </FilterGroup>
          </Col>
        </Row>
      </VerticalSpacing>

      <VerticalSpacing size={1}>
        <Text modifiers="bold">Append with dropdown</Text>
        <Filter
          text="Requires attention"
          variant="secondary"
          size="large"
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
          ]}
          append={<StatusBadge color="danger">7</StatusBadge>}
        />
      </VerticalSpacing>

      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Prepend icon with append and dropdown</Text>
        <Filter
          text="Requires attention"
          variant="secondary"
          size="large"
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
          ]}
          prepend={<Icon name="language" size={18} color="inherit" />}
          append={<StatusBadge color="danger">7</StatusBadge>}
        />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};

/**
 * Mirrors the Figma states grid (`4612:83728`) — one table per variant
 * (Primary, Secondary), each with five rows (Default, Hover, Active, Focus,
 * Disabled) × two columns (Not selected, Selected). Each cell renders both a
 * plain text Filter and a multi-select Filter with a count badge so the count
 * appearance is covered alongside the bare button.
 */
export const States: Story = {
  parameters: {
    pseudo: {
      hover: '.pseudo-hover button',
      active: '.pseudo-active button',
      focusVisible: '.pseudo-focus button',
    },
  },
  render: function StatesStory() {
    const breakpoint = useBreakpoint();
    const isMobile = isBreakpointBelow(breakpoint, 'md');
    const stateRows: { label: string; id: string; disabled?: boolean }[] = [
      { label: 'Default', id: 'default' },
      { label: 'Hover', id: 'hover' },
      { label: 'Active', id: 'active' },
      { label: 'Focus', id: 'focus' },
      { label: 'Disabled', id: 'disabled', disabled: true },
    ];
    const stateOptions: FilterOption[] = [
      { label: 'Optometristi vastuvõtt', value: '1' },
      { label: 'Silmaarsti vastuvõtt', value: '2' },
      { label: 'Hambaarsti vastuvõtt', value: '3' },
    ];

    const variants: { label: string; variant: FilterProps['variant'] }[] = [
      { label: 'Primary', variant: 'primary' },
      { label: 'Secondary', variant: 'secondary' },
    ];

    const renderCell = (variant: FilterProps['variant'], selected: boolean, disabled: boolean | undefined) => (
      <Row gutter={1} gutterX={3} alignItems="center">
        <Col xs="auto">
          <Filter text="Text" variant={variant} selected={selected} disabled={disabled} />
        </Col>
        <Col xs="auto">
          <Filter
            text="Text"
            variant={variant}
            multiselect
            options={stateOptions}
            defaultSelectedValues={selected ? ['1', '2'] : []}
            disabled={disabled}
          />
        </Col>
      </Row>
    );

    const renderTable = (label: string, variant: FilterProps['variant']) => (
      <VerticalSpacing size={0.75}>
        <Text element="h3" modifiers="h4">
          {label}
        </Text>
        {!isMobile && (
          <Row gutter={2}>
            <Col md={2} />
            <Col md={3}>
              <Text modifiers="bold">Not selected</Text>
            </Col>
            <Col md={5}>
              <Text modifiers="bold">Selected</Text>
            </Col>
          </Row>
        )}
        {stateRows.map((row) => (
          <Row key={row.id} gutter={2} alignItems="center" className={`pseudo-${row.id}`}>
            <Col xs={12} md={2}>
              <Text modifiers="bold">{row.label}</Text>
            </Col>
            <Col xs={12} md={3}>
              {isMobile ? (
                <VerticalSpacing size={0.25}>
                  <Text modifiers="small" color="tertiary">
                    Not selected
                  </Text>
                  {renderCell(variant, false, row.disabled)}
                </VerticalSpacing>
              ) : (
                renderCell(variant, false, row.disabled)
              )}
            </Col>
            <Col xs={12} md={5}>
              {isMobile ? (
                <VerticalSpacing size={0.25}>
                  <Text modifiers="small" color="tertiary">
                    Selected
                  </Text>
                  {renderCell(variant, true, row.disabled)}
                </VerticalSpacing>
              ) : (
                renderCell(variant, true, row.disabled)
              )}
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    );

    return (
      <VerticalSpacing size={2}>
        {variants.map((v) => (
          <div key={v.label}>{renderTable(v.label, v.variant)}</div>
        ))}
      </VerticalSpacing>
    );
  },
};

export const CustomDropdownContent: Story = {
  render: function CustomDropdownContentStory() {
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const periods = useMemo(
      () => [
        { value: 'day', label: 'Päev' },
        { value: 'week', label: 'Nädal' },
        { value: 'month', label: 'Kuu' },
        { value: 'year', label: 'Aasta' },
      ],
      []
    );
    const label = periods.find((p) => p.value === selectedPeriod)?.label ?? 'Periood';

    return (
      <div className="display-flex gap-2">
        <Filter text={label} selected={!!selectedPeriod} showClear onClear={() => setSelectedPeriod('')}>
          <ChoiceGroup
            id="period"
            name="period"
            label="Periood"
            inputType="radio"
            items={periods.map((p) => ({ id: p.value, label: p.label, value: p.value }))}
            value={selectedPeriod}
            onChange={(value) => setSelectedPeriod(String(value ?? ''))}
          />
        </Filter>
      </div>
    );
  },
};

type TagEntry = { key: string; text: string; remove: () => void };

const TagList = ({ tags }: { tags: TagEntry[] }) =>
  tags.length === 0 ? null : (
    <div className="display-flex gap-1 flex-wrap">
      {tags.map((tag) => (
        <Tag key={tag.key} onClose={tag.remove}>
          {tag.text}
        </Tag>
      ))}
    </div>
  );

/**
 * Realistic page-level examples combining toggle filters, single- and multi-select dropdowns,
 * managed `FilterGroup`s, tag chips that mirror the selected state, and a global clear action.
 */
export const Examples: Story = {
  render: function ExamplesStory() {
    const [vastuvotud, setVastuvotud] = useState(true);
    const [analuusid, setAnaluusid] = useState(true);
    const [uuringud, setUuringud] = useState(false);
    const [uuring, setUuring] = useState('');
    const [raviasutus, setRaviasutus] = useState<string[]>(['3', '4']);
    const [teenus, setTeenus] = useState('');
    const [aegAlates, setAegAlates] = useState('');

    const [typeAndmed, setTypeAndmed] = useState<string | null>('all');
    const [teenusAndmed, setTeenusAndmed] = useState('');
    const [raviasutusAndmed, setRaviasutusAndmed] = useState<string[]>([]);

    const [category, setCategory] = useState<string[]>(['vastuvotud', 'analuusid']);
    const [teenusDoc, setTeenusDoc] = useState('');

    const [typePrimary, setTypePrimary] = useState<string | null>('all');
    const [uuringPrimary, setUuringPrimary] = useState('');

    const uuringOptions: FilterOption[] = useMemo(
      () => [
        { label: 'Vereanalüüs', value: '1' },
        { label: 'Röntgen', value: '2' },
        { label: 'Ultraheli', value: '3' },
        { label: 'MRT', value: '4' },
      ],
      []
    );
    const aegAlatesOptions: FilterOption[] = useMemo(
      () => [
        { label: 'Viimane nädal', value: '1' },
        { label: 'Viimane kuu', value: '2' },
        { label: 'Viimane aasta', value: '3' },
      ],
      []
    );
    const typeOptions: FilterOption[] = useMemo(
      () => [
        { label: 'Kõik', value: 'all' },
        { label: 'Aktiivsed', value: 'active' },
        { label: 'Lõpetatud', value: 'done' },
      ],
      []
    );
    const categoryOptions: FilterOption[] = useMemo(
      () => [
        { label: 'Vastuvõtud', value: 'vastuvotud' },
        { label: 'Analüüsid', value: 'analuusid' },
        { label: 'Uuringud', value: 'uuringud' },
        { label: 'Vaktsineerimised', value: 'vaktsineerimised' },
      ],
      []
    );

    const labelOf = (options: FilterOption[], value: string) => options.find((o) => o.value === value)?.label ?? value;

    const section1Tags = useMemo<TagEntry[]>(() => {
      const t: TagEntry[] = [];
      if (vastuvotud) t.push({ key: 'vastuvotud', text: 'Vastuvõtud', remove: () => setVastuvotud(false) });
      if (analuusid) t.push({ key: 'analuusid', text: 'Analüüsid', remove: () => setAnaluusid(false) });
      if (uuringud) t.push({ key: 'uuringud', text: 'Uuringud', remove: () => setUuringud(false) });
      if (uuring) {
        t.push({
          key: `uuring-${uuring}`,
          text: `Uuring: ${labelOf(uuringOptions, uuring)}`,
          remove: () => setUuring(''),
        });
      }
      raviasutus.forEach((v) => {
        t.push({
          key: `raviasutus-${v}`,
          text: `Raviasutus: ${labelOf(raviasutusOptions, v)}`,
          remove: () => setRaviasutus(raviasutus.filter((x) => x !== v)),
        });
      });
      if (teenus) {
        t.push({
          key: `teenus-${teenus}`,
          text: `Teenus: ${labelOf(teenusOptions, teenus)}`,
          remove: () => setTeenus(''),
        });
      }
      if (aegAlates) {
        t.push({
          key: `aeg-${aegAlates}`,
          text: `Aeg alates: ${labelOf(aegAlatesOptions, aegAlates)}`,
          remove: () => setAegAlates(''),
        });
      }
      return t;
    }, [vastuvotud, analuusid, uuringud, uuring, raviasutus, teenus, aegAlates, uuringOptions, aegAlatesOptions]);

    const section2Tags = useMemo<TagEntry[]>(() => {
      const t: TagEntry[] = [];
      if (typeAndmed) {
        t.push({
          key: `type-andmed-${typeAndmed}`,
          text: `Tüüp: ${labelOf(typeOptions, typeAndmed)}`,
          remove: () => setTypeAndmed(null),
        });
      }
      if (teenusAndmed) {
        t.push({
          key: `teenus-andmed-${teenusAndmed}`,
          text: `Teenus: ${labelOf(teenusOptions, teenusAndmed)}`,
          remove: () => setTeenusAndmed(''),
        });
      }
      raviasutusAndmed.forEach((v) => {
        t.push({
          key: `raviasutus-andmed-${v}`,
          text: `Raviasutus: ${labelOf(raviasutusOptions, v)}`,
          remove: () => setRaviasutusAndmed(raviasutusAndmed.filter((x) => x !== v)),
        });
      });
      return t;
    }, [typeAndmed, teenusAndmed, raviasutusAndmed, typeOptions]);

    const section3Tags = useMemo<TagEntry[]>(() => {
      const t: TagEntry[] = [];
      category.forEach((v) => {
        t.push({
          key: `category-${v}`,
          text: `Kategooria: ${labelOf(categoryOptions, v)}`,
          remove: () => setCategory(category.filter((x) => x !== v)),
        });
      });
      if (teenusDoc) {
        t.push({
          key: `teenus-doc-${teenusDoc}`,
          text: `Teenus: ${labelOf(teenusOptions, teenusDoc)}`,
          remove: () => setTeenusDoc(''),
        });
      }
      return t;
    }, [category, teenusDoc, categoryOptions]);

    const section4Tags = useMemo<TagEntry[]>(() => {
      const t: TagEntry[] = [];
      if (typePrimary) {
        t.push({
          key: `type-primary-${typePrimary}`,
          text: `Tüüp: ${labelOf(typeOptions, typePrimary)}`,
          remove: () => setTypePrimary(null),
        });
      }
      if (uuringPrimary) {
        t.push({
          key: `uuring-primary-${uuringPrimary}`,
          text: `Uuring: ${labelOf(uuringOptions, uuringPrimary)}`,
          remove: () => setUuringPrimary(''),
        });
      }
      return t;
    }, [typePrimary, uuringPrimary, typeOptions, uuringOptions]);

    const clearAll = () => {
      setVastuvotud(false);
      setAnaluusid(false);
      setUuringud(false);
      setUuring('');
      setRaviasutus([]);
      setTeenus('');
      setAegAlates('');
    };

    return (
      <VerticalSpacing>
        <Text element="h1" modifiers="h1" color="secondary">
          Taotlused
        </Text>
        <div className="display-flex gap-2 flex-wrap align-items-center">
          <Filter text="Vastuvõtud" variant="secondary" selected={vastuvotud} onSelectedChange={setVastuvotud} />
          <Filter text="Analüüsid" variant="secondary" selected={analuusid} onSelectedChange={setAnaluusid} />
          <Filter text="Uuringud" variant="secondary" selected={uuringud} onSelectedChange={setUuringud} />
          <Separator axis="vertical" height={1.5} />
          <Filter
            text="Uuring"
            variant="secondary"
            options={uuringOptions}
            selectedValue={uuring}
            onSelectedValueChange={setUuring}
            showClear
          />
          <Filter
            text="Raviasutus"
            variant="secondary"
            multiselect
            options={raviasutusOptions}
            selectedValues={raviasutus}
            onSelectedValuesChange={setRaviasutus}
            searchable
            showSelectAll
            showClear
          />
          <Filter
            text="Teenus"
            variant="secondary"
            options={teenusOptions}
            selectedValue={teenus}
            onSelectedValueChange={setTeenus}
            showClear
          />
          <Filter
            text="Aeg alates"
            variant="secondary"
            options={aegAlatesOptions}
            selectedValue={aegAlates}
            onSelectedValueChange={setAegAlates}
            showClear
          />
          <Separator axis="vertical" height={1.5} />
          <Button type="button" onClick={clearAll} size="small" visualType="neutral" iconLeft="refresh">
            Tühjenda filtrid
          </Button>
        </div>
        <TagList tags={section1Tags} />
        <Text color="tertiary">{`${64 - section1Tags.length} tulemust`}</Text>

        <Separator />

        {/* — Section 2: Andmed (single-select FilterGroup) */}
        <Text element="h1" modifiers="h1" color="secondary">
          Andmed
        </Text>
        <div className="display-flex gap-2 flex-wrap align-items-center">
          <FilterGroup label="Tüüp" value={typeAndmed} onValueChange={setTypeAndmed}>
            <Filter text="Kõik" value="all" variant="secondary" />
            <Filter text="Aktiivsed" value="active" variant="secondary" />
            <Filter text="Lõpetatud" value="done" variant="secondary" />
          </FilterGroup>
          <Separator axis="vertical" height={1.5} />
          <Filter
            text="Teenus"
            variant="secondary"
            options={teenusOptions}
            selectedValue={teenusAndmed}
            onSelectedValueChange={setTeenusAndmed}
            showClear
          />
          <Filter
            text="Raviasutus"
            variant="secondary"
            multiselect
            options={raviasutusOptions}
            selectedValues={raviasutusAndmed}
            onSelectedValuesChange={setRaviasutusAndmed}
            searchable
            showSelectAll
            showClear
          />
        </div>
        <TagList tags={section2Tags} />

        <Separator />

        {/* — Section 3: Menetlusdokumendid (multi-select FilterGroup) */}
        <Text element="h1" modifiers="h1" color="secondary">
          Menetlusdokumendid
        </Text>
        <div className="display-flex gap-2 flex-wrap align-items-center">
          <FilterGroup label="Kategooria" multiselect values={category} onValuesChange={setCategory}>
            <Filter text="Vastuvõtud" value="vastuvotud" variant="secondary" />
            <Filter text="Analüüsid" value="analuusid" variant="secondary" />
            <Filter text="Uuringud" value="uuringud" variant="secondary" />
            <Filter text="Vaktsineerimised" value="vaktsineerimised" variant="secondary" />
          </FilterGroup>
          <Separator axis="vertical" height={1.5} />
          <Filter
            text="Teenus"
            variant="secondary"
            options={teenusOptions}
            selectedValue={teenusDoc}
            onSelectedValueChange={setTeenusDoc}
            showClear
          />
        </div>
        <TagList tags={section3Tags} />

        <Separator />

        {/* — Section 4: Taotlused (primary variant) */}
        <Text element="h1" modifiers="h1" color="secondary">
          Taotlused (primary)
        </Text>
        <div className="display-flex gap-2 flex-wrap align-items-center">
          <FilterGroup label="Tüüp" value={typePrimary} onValueChange={setTypePrimary}>
            <Filter text="Kõik" value="all" />
            <Filter text="Aktiivsed" value="active" />
            <Filter text="Lõpetatud" value="done" />
          </FilterGroup>
          <Separator axis="vertical" height={1.5} />
          <Filter
            text="Uuring"
            options={uuringOptions}
            selectedValue={uuringPrimary}
            onSelectedValueChange={setUuringPrimary}
            showClear
          />
        </div>
        <TagList tags={section4Tags} />
      </VerticalSpacing>
    );
  },
};
