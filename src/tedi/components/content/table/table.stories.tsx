import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Collapse } from '../../buttons/collapse/collapse';
import { Checkbox } from '../../form/checkbox/checkbox';
import { TextField } from '../../form/textfield/textfield';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { EmptyState } from '../../notifications/empty-state';
import { Popover, PopoverContent, PopoverTrigger } from '../../overlays/popover';
import { Tag } from '../../tags/tag/tag';
import { Table } from './table';
import type { TableProps, TableState } from './table.types';

/**
 * <a href="https://tanstack.com/table" target="_BLANK">@tanstack/react-table ↗</a><br/>
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=4514-63761&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/557b9f-table" target="_BLANK">ZeroHeight ↗</a>
 */
const meta: Meta<typeof Table> = {
  component: Table,
  title: 'TEDI-Ready/Content/Table',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=4514-63761&m=dev',
    },
  },
};
export default meta;

interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  salary: number;
  status: 'active' | 'inactive';
}

const personSeed: Omit<Person, 'id'>[] = [
  {
    name: 'Anna Tamm',
    email: 'anna.tamm@example.ee',
    role: 'Engineer',
    location: 'Tallinn',
    salary: 4200,
    status: 'active',
  },
  {
    name: 'Jüri Kask',
    email: 'juri.kask@example.ee',
    role: 'Designer',
    location: 'Tartu',
    salary: 3800,
    status: 'active',
  },
  {
    name: 'Maria Saar',
    email: 'maria.saar@example.ee',
    role: 'Product',
    location: 'Pärnu',
    salary: 4600,
    status: 'active',
  },
  {
    name: 'Mart Mets',
    email: 'mart.mets@example.ee',
    role: 'Engineer',
    location: 'Tallinn',
    salary: 4100,
    status: 'inactive',
  },
  { name: 'Liis Lepp', email: 'liis.lepp@example.ee', role: 'Ops', location: 'Narva', salary: 3600, status: 'active' },
  {
    name: 'Kadri Kask',
    email: 'kadri.kask@example.ee',
    role: 'Engineer',
    location: 'Viljandi',
    salary: 4000,
    status: 'active',
  },
  {
    name: 'Rain Roos',
    email: 'rain.roos@example.ee',
    role: 'Designer',
    location: 'Rakvere',
    salary: 3900,
    status: 'inactive',
  },
];

const people: Person[] = Array.from({ length: 28 }, (_, index) => {
  const seed = personSeed[index % personSeed.length];
  const round = Math.floor(index / personSeed.length);
  return {
    ...seed,
    id: String(index + 1),
    name: round === 0 ? seed.name : `${seed.name} ${round + 1}`,
  };
});

/**
 * Default pagination options applied to most stories. Matches Figma examples
 * which show pagination on every table variant (default page size 10).
 */
const DEFAULT_PAGINATION = { pageSize: 10, pageSizeOptions: [10, 25, 50] } as const;

const personColumns: ColumnDef<Person>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
  { id: 'location', header: 'Location', accessorKey: 'location' },
];

type Story = StoryObj<TableProps<Person>>;

/**
 * Baseline render: headers + rows + the default border/padding chrome.
 */
export const Simple: Story = {
  render: () => (
    <Table<Person> id="tedi-table-simple" data={people} columns={personColumns} pagination={DEFAULT_PAGINATION} />
  ),
};

/**
 * Merged header cells — matches Figma Example "Merged cells". The "Aeg" (time)
 * header group spans two sub-columns (Kellaaeg / Kestus); Kuupäev, Asukoht,
 * and the action column are single-column headers that span both header rows.
 * Sort indicator on Kuupäev.
 */
interface Booking {
  id: string;
  dateRange: string;
  hour: string;
  duration: string;
  location: string;
}

const bookings: Booking[] = Array.from({ length: 28 }, (_, index) => ({
  id: String(index + 1),
  dateRange: '22.03.2029 – 29.03.2029',
  hour: '11:14',
  duration: '6 min',
  location: 'Harjumaa',
}));

const MergedCellsTemplate = () => {
  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      {
        id: 'dateRange',
        accessorKey: 'dateRange',
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          const iconName = sorted === 'asc' ? 'arrow_upward' : sorted === 'desc' ? 'arrow_downward' : 'unfold_more';
          return (
            <button
              type="button"
              onClick={column.getToggleSortingHandler()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: 'transparent',
                border: 0,
                padding: 0,
                font: 'inherit',
                color: 'inherit',
                cursor: 'pointer',
              }}
              aria-label="Sort by Kuupäev"
            >
              Kuupäev
              <Icon name={iconName} color={sorted ? 'brand' : 'secondary'} />
            </button>
          );
        },
      },
      {
        id: 'aeg',
        header: 'Aeg',
        columns: [
          { id: 'hour', header: 'Kellaaeg', accessorKey: 'hour' },
          { id: 'duration', header: 'Kestus', accessorKey: 'duration' },
        ],
      },
      { id: 'location', header: 'Asukoht', accessorKey: 'location' },
      {
        id: 'actions',
        header: '',
        cell: () => (
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              color: 'var(--link-primary-default)',
              textDecoration: 'none',
              fontWeight: 'var(--body-regular-weight)',
            }}
          >
            <Icon name="edit" color="brand" size={18} />
            Muuda
          </a>
        ),
      },
    ],
    []
  );

  return (
    <Table<Booking>
      id="tedi-table-merged"
      verticalBorders
      data={bookings}
      columns={columns}
      pagination={DEFAULT_PAGINATION}
    />
  );
};

export const MergedCells: Story = { render: () => <MergedCellsTemplate /> };

export const VerticalBorders: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-vb"
      data={people}
      columns={personColumns}
      verticalBorders
      pagination={DEFAULT_PAGINATION}
    />
  ),
};

/**
 * Compact variant: reduced row padding per Figma small-size tokens
 * (`table/header/padding-*-sm`, `table/data/padding-*-sm`).
 */
export const Small: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-small"
      data={people}
      columns={personColumns}
      size="small"
      pagination={DEFAULT_PAGINATION}
    />
  ),
};

export const NoOutsideBorder: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-borderless"
      data={people}
      columns={personColumns}
      borderless
      pagination={DEFAULT_PAGINATION}
    />
  ),
};

/**
 * Editable rows — matches Figma "Changeable values". Click "Muuda" on any row
 * to swap its cells for form inputs (date range, time, duration, location)
 * plus a cancel (×) / confirm (✓) pair. Other rows stay static until picked.
 */
interface EditableBooking {
  id: string;
  dateRange: string;
  hour: string;
  duration: string;
  location: string;
}

const editableBookingsSeed: EditableBooking[] = Array.from({ length: 28 }, (_, index) => ({
  id: String(index + 1),
  dateRange: '22.03.2029 – 29.03.2029',
  hour: '11:14',
  duration: '6',
  location: 'Harjumaa',
}));

const muudaLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: 'var(--link-primary-default)',
  textDecoration: 'none',
  fontWeight: 'var(--body-regular-weight)',
};

const editActionsStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
};

const EditableTemplate = () => {
  const [rows, setRows] = useState<EditableBooking[]>(editableBookingsSeed);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditableBooking | null>(null);

  const beginEdit = (row: EditableBooking) => {
    setEditingId(row.id);
    setDraft(row);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };
  const commitEdit = () => {
    if (!draft) return;
    setRows((current) => current.map((row) => (row.id === draft.id ? draft : row)));
    setEditingId(null);
    setDraft(null);
  };

  const columns = useMemo<ColumnDef<EditableBooking>[]>(
    () => [
      {
        id: 'dateRange',
        header: 'Kuupäev',
        accessorKey: 'dateRange',
        cell: ({ row }) => {
          if (row.original.id !== editingId || !draft) return row.original.dateRange;
          return (
            <TextField
              id={`date-${row.original.id}`}
              name="date"
              label="Kuupäev"
              hideLabel
              size="small"
              icon="calendar_today"
              value={draft.dateRange}
              onChange={(next) => setDraft((prev) => (prev ? { ...prev, dateRange: next } : prev))}
            />
          );
        },
      },
      {
        id: 'hour',
        header: 'Kellaaeg',
        accessorKey: 'hour',
        cell: ({ row }) => {
          if (row.original.id !== editingId || !draft) return row.original.hour;
          return (
            <TextField
              id={`hour-${row.original.id}`}
              name="hour"
              label="Kellaaeg"
              hideLabel
              size="small"
              icon="schedule"
              value={draft.hour}
              onChange={(next) => setDraft((prev) => (prev ? { ...prev, hour: next } : prev))}
            />
          );
        },
      },
      {
        id: 'duration',
        header: 'Kestus',
        accessorKey: 'duration',
        cell: ({ row }) => {
          if (row.original.id !== editingId || !draft) return `${row.original.duration} min`;
          return (
            <TextField
              id={`duration-${row.original.id}`}
              name="duration"
              label="Kestus"
              hideLabel
              size="small"
              value={draft.duration}
              onChange={(next) => setDraft((prev) => (prev ? { ...prev, duration: next } : prev))}
            />
          );
        },
      },
      {
        id: 'location',
        header: 'Asukoht',
        accessorKey: 'location',
        cell: ({ row }) => {
          if (row.original.id !== editingId || !draft) return row.original.location;
          return (
            <TextField
              id={`location-${row.original.id}`}
              name="location"
              label="Asukoht"
              hideLabel
              size="small"
              value={draft.location}
              onChange={(next) => setDraft((prev) => (prev ? { ...prev, location: next } : prev))}
            />
          );
        },
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
          if (row.original.id === editingId) {
            return (
              <span style={editActionsStyle}>
                <Button visualType="neutral" size="small" icon="close" aria-label="Tühista" onClick={cancelEdit} />
                <Button visualType="primary" size="small" icon="check" aria-label="Kinnita" onClick={commitEdit} />
              </span>
            );
          }
          return (
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                beginEdit(row.original);
              }}
              style={muudaLinkStyle}
            >
              <Icon name="edit" color="brand" size={18} />
              Muuda
            </a>
          );
        },
      },
    ],
    [draft, editingId]
  );

  return (
    <Table<EditableBooking> id="tedi-table-editable" data={rows} columns={columns} pagination={DEFAULT_PAGINATION} />
  );
};

export const EditableValues: Story = { render: () => <EditableTemplate /> };

/**
 * Sortable columns — header shows a compact sort chevron that cycles through
 * `unsorted → ascending → descending → unsorted` on click. Matches the Figma
 * sort indicator from Example table 7/8. Columns opt in via
 * `columnDef.enableSorting` (default `true`); only columns with
 * `enableSorting: false` render as plain text.
 */
const SortableTemplate = () => {
  const columns = useMemo<ColumnDef<Person>[]>(
    () =>
      [
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'role', header: 'Role', accessorKey: 'role' },
        { id: 'location', header: 'Location', accessorKey: 'location' },
        { id: 'salary', header: 'Salary', accessorKey: 'salary' },
      ].map((col) => ({
        ...col,
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          const iconName = sorted === 'asc' ? 'arrow_upward' : sorted === 'desc' ? 'arrow_downward' : 'unfold_more';
          return (
            <button
              type="button"
              onClick={column.getToggleSortingHandler()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: 'transparent',
                border: 0,
                padding: 0,
                font: 'inherit',
                color: 'inherit',
                cursor: 'pointer',
              }}
              aria-label={`Sort by ${col.header}`}
            >
              {col.header}
              <Icon name={iconName} color={sorted ? 'brand' : 'secondary'} />
            </button>
          );
        },
      })),
    []
  );

  return <Table<Person> id="tedi-table-sortable" data={people} columns={columns} pagination={DEFAULT_PAGINATION} />;
};

export const Sortable: Story = { render: () => <SortableTemplate /> };

/**
 * Per-column filter popovers — matches Figma Example table 7/8 exactly
 * (Nimi / Töö algus / Vanus / Külastuste arv / Tõendi staatus).
 *
 * Each filterable header pairs a `unfold_more`/`arrow_upward`/`arrow_downward`
 * sort chevron with a `filter_alt` funnel `Popover` trigger. Popover contents
 * vary per column:
 * - text filter for `Nimi`
 * - date-range (Alates / Kuni) for `Töö algus`
 * - multi-select checkbox list for `Tõendi staatus`
 *
 * Both icons tint `brand` when their state is active; otherwise `tertiary`.
 */
type CertStatus = 'Kehtiv' | 'Kehtetu' | 'Aegumas' | 'Aegunud';

interface PersonRecord {
  id: string;
  name: string;
  jobStart: string;
  age: number;
  visits: number;
  status: CertStatus;
}

const CERT_STATUSES: CertStatus[] = ['Kehtiv', 'Kehtetu', 'Aegumas', 'Aegunud'];

const filterablePeopleSeed: Omit<PersonRecord, 'id'>[] = [
  { name: 'Mari Maasikas', jobStart: '21.08.2019', age: 25, visits: 6, status: 'Kehtiv' },
  { name: 'Kalle Kapsapea', jobStart: '14.03.2020', age: 35, visits: 13, status: 'Kehtiv' },
  { name: 'Mart Mägi', jobStart: '02.01.2018', age: 43, visits: 26, status: 'Kehtiv' },
  { name: 'Meelis Mets', jobStart: '10.07.2021', age: 64, visits: 26, status: 'Kehtetu' },
  { name: 'Kadri Kask', jobStart: '30.11.2022', age: 32, visits: 4, status: 'Aegumas' },
  { name: 'Liis Linn', jobStart: '21.08.2019', age: 21, visits: 13, status: 'Aegunud' },
];

const filterablePeople: PersonRecord[] = Array.from({ length: 28 }, (_, index) => {
  const seed = filterablePeopleSeed[index % filterablePeopleSeed.length];
  const round = Math.floor(index / filterablePeopleSeed.length);
  return {
    ...seed,
    id: String(index + 1),
    name: round === 0 ? seed.name : `${seed.name} ${round + 1}`,
  };
});

const headerButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 0,
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
};

const SortLabel = ({
  column,
  children,
  ariaLabel,
}: {
  column: {
    getIsSorted: () => false | 'asc' | 'desc';
    getToggleSortingHandler: () => ((e: unknown) => void) | undefined;
  };
  children: React.ReactNode;
  ariaLabel: string;
}) => {
  const sorted = column.getIsSorted();
  const iconName = sorted === 'asc' ? 'arrow_upward' : sorted === 'desc' ? 'arrow_downward' : 'unfold_more';
  return (
    <button type="button" onClick={column.getToggleSortingHandler()} style={headerButtonStyle} aria-label={ariaLabel}>
      {children}
      <Icon name={iconName} color={sorted ? 'brand' : 'secondary'} />
    </button>
  );
};

const filterTriggerStyle: React.CSSProperties = {
  background: 'transparent',
  border: 0,
  padding: 2,
  cursor: 'pointer',
};

const TextFilterPopover = ({
  value,
  onApply,
  label,
}: {
  value: string;
  onApply: (next: string | undefined) => void;
  label: string;
}) => {
  const [draft, setDraft] = useState(value);
  return (
    <Popover>
      <PopoverTrigger>
        <button type="button" aria-label={`Filtreeri ${label}`} style={filterTriggerStyle}>
          <Icon name="filter_alt" color={value ? 'brand' : 'secondary'} filled={value ? true : false} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <VerticalSpacing size={0.5}>
          <TextField
            id={`filter-${label}`}
            name={`filter-${label}`}
            label={label}
            hideLabel
            value={draft}
            onChange={setDraft}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button
              visualType="secondary"
              size="small"
              onClick={() => {
                setDraft('');
                onApply(undefined);
              }}
            >
              Tühista
            </Button>
            <Button visualType="primary" size="small" onClick={() => onApply(draft || undefined)}>
              Filtreeri
            </Button>
          </div>
        </VerticalSpacing>
      </PopoverContent>
    </Popover>
  );
};

type DateRangeValue = { from?: string; to?: string };

const DateRangeFilterPopover = ({
  value,
  onApply,
  label,
}: {
  value: DateRangeValue | undefined;
  onApply: (next: DateRangeValue | undefined) => void;
  label: string;
}) => {
  const [from, setFrom] = useState(value?.from ?? '');
  const [to, setTo] = useState(value?.to ?? '');
  const active = Boolean(value?.from || value?.to);
  return (
    <Popover>
      <PopoverTrigger>
        <button type="button" aria-label={`Filtreeri ${label}`} style={filterTriggerStyle}>
          <Icon name="filter_alt" color={active ? 'brand' : 'secondary'} filled={active ? true : false} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <VerticalSpacing size={0.5}>
          <TextField
            id="filter-date-from"
            name="filter-date-from"
            label="Alates"
            placeholder="pp.kk.aaaa"
            value={from}
            onChange={setFrom}
          />
          <TextField
            id="filter-date-to"
            name="filter-date-to"
            label="Kuni"
            placeholder="pp.kk.aaaa"
            value={to}
            onChange={setTo}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button
              visualType="secondary"
              size="small"
              onClick={() => {
                setFrom('');
                setTo('');
                onApply(undefined);
              }}
            >
              Tühista
            </Button>
            <Button
              visualType="primary"
              size="small"
              onClick={() => onApply(from || to ? { from: from || undefined, to: to || undefined } : undefined)}
            >
              Filtreeri
            </Button>
          </div>
        </VerticalSpacing>
      </PopoverContent>
    </Popover>
  );
};

const MultiSelectFilterPopover = ({
  value,
  onApply,
  label,
}: {
  value: CertStatus[] | undefined;
  onApply: (next: CertStatus[] | undefined) => void;
  label: string;
}) => {
  const [draft, setDraft] = useState<CertStatus[]>(value ?? []);
  const active = (value?.length ?? 0) > 0;
  return (
    <Popover>
      <PopoverTrigger>
        <button type="button" aria-label={`Filtreeri ${label}`} style={filterTriggerStyle}>
          <Icon name="filter_alt" color={active ? 'brand' : 'secondary'} filled={active ? true : false} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <VerticalSpacing size={0.5}>
          {CERT_STATUSES.map((option) => (
            <Checkbox
              key={option}
              id={`filter-status-${option}`}
              name="filter-status"
              value={option}
              label={option}
              checked={draft.includes(option)}
              onChange={(_val, checked) =>
                setDraft((prev) => (checked ? [...prev, option] : prev.filter((v) => v !== option)))
              }
            />
          ))}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button
              visualType="secondary"
              size="small"
              onClick={() => {
                setDraft([]);
                onApply(undefined);
              }}
            >
              Tühista
            </Button>
            <Button visualType="primary" size="small" onClick={() => onApply(draft.length ? draft : undefined)}>
              Filtreeri
            </Button>
          </div>
        </VerticalSpacing>
      </PopoverContent>
    </Popover>
  );
};

const parseDate = (value: string): number | null => {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  return Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd));
};

const FiltersTemplate = () => {
  const columns = useMemo<ColumnDef<PersonRecord>[]>(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        filterFn: 'includesString',
        header: ({ column }) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <SortLabel column={column} ariaLabel="Sorteeri Nimi">
              Nimi
            </SortLabel>
            <TextFilterPopover
              value={(column.getFilterValue() as string | undefined) ?? ''}
              onApply={(next) => column.setFilterValue(next)}
              label="Nimi"
            />
          </span>
        ),
      },
      {
        id: 'jobStart',
        accessorKey: 'jobStart',
        filterFn: (row, id, value: DateRangeValue) => {
          if (!value?.from && !value?.to) return true;
          const cell = parseDate(row.getValue(id) as string);
          if (cell === null) return false;
          const fromTs = value.from ? parseDate(value.from) : null;
          const toTs = value.to ? parseDate(value.to) : null;
          if (fromTs !== null && cell < fromTs) return false;
          if (toTs !== null && cell > toTs) return false;
          return true;
        },
        header: ({ column }) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <SortLabel column={column} ariaLabel="Sorteeri Töö algus">
              Töö algus
            </SortLabel>
            <DateRangeFilterPopover
              value={column.getFilterValue() as DateRangeValue | undefined}
              onApply={(next) => column.setFilterValue(next)}
              label="Töö algus"
            />
          </span>
        ),
      },
      {
        id: 'age',
        accessorKey: 'age',
        header: ({ column }) => (
          <SortLabel column={column} ariaLabel="Sorteeri Vanus">
            Vanus
          </SortLabel>
        ),
      },
      {
        id: 'visits',
        accessorKey: 'visits',
        header: ({ column }) => (
          <SortLabel column={column} ariaLabel="Sorteeri Külastuste arv">
            Külastuste arv
          </SortLabel>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        filterFn: (row, id, value: CertStatus[]) => !value?.length || value.includes(row.getValue(id) as CertStatus),
        header: ({ column }) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <SortLabel column={column} ariaLabel="Sorteeri Tõendi staatus">
              Tõendi staatus
            </SortLabel>
            <MultiSelectFilterPopover
              value={column.getFilterValue() as CertStatus[] | undefined}
              onApply={(next) => column.setFilterValue(next)}
              label="Tõendi staatus"
            />
          </span>
        ),
        cell: ({ row }) => (
          <Tag color={row.original.status === 'Kehtiv' ? 'primary' : 'secondary'}>{row.original.status}</Tag>
        ),
      },
    ],
    []
  );

  return (
    <Table<PersonRecord>
      id="tedi-table-filters"
      data={filterablePeople}
      columns={columns}
      pagination={DEFAULT_PAGINATION}
    />
  );
};

export const Filters: Story = { render: () => <FiltersTemplate /> };

/**
 * Collapsible rows using the TEDI `Collapse` component in icon-only secondary
 * mode. Each row gets a compact arrow trigger; supplementary content reveals
 * inline below it when expanded.
 */
export const CollapsibleRows: Story = {
  render: () => {
    const columns: ColumnDef<Person>[] = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
      { id: 'location', header: 'Location', accessorKey: 'location' },
      {
        id: 'details',
        header: '',
        size: 40,
        cell: ({ row }) => (
          <Collapse id={`row-${row.original.id}`} iconOnly arrowType="secondary" hideCollapseText>
            <VerticalSpacing size={0.5}>
              <Text modifiers="bold">Details for {row.original.name}</Text>
              <Text>Monthly salary: €{row.original.salary.toLocaleString('et-EE')}</Text>
              <Tag color={row.original.status === 'active' ? 'primary' : 'secondary'}>{row.original.status}</Tag>
            </VerticalSpacing>
          </Collapse>
        ),
      },
    ];
    return <Table<Person> id="tedi-table-collapse" data={people} columns={columns} pagination={DEFAULT_PAGINATION} />;
  },
};

/**
 * Alternative collapsible layout using the TEDI `Collapse` component inside a
 * regular cell. Use this when the disclosure should stay inline with its row
 * rather than push content into a separate full-width row.
 */
export const CollapsibleInlineContent: Story = {
  render: () => {
    const columns: ColumnDef<Person>[] = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'role', header: 'Role', accessorKey: 'role' },
      {
        id: 'details',
        header: 'Details',
        cell: ({ row }) => (
          <Collapse id={`details-${row.original.id}`} title={<Text>View details</Text>} size="small">
            <VerticalSpacing size={0.5}>
              <Text>Location: {row.original.location}</Text>
              <Text>Email: {row.original.email}</Text>
              <Tag color={row.original.status === 'active' ? 'primary' : 'secondary'}>{row.original.status}</Tag>
            </VerticalSpacing>
          </Collapse>
        ),
      },
    ];
    return (
      <Table<Person> id="tedi-table-collapse-inline" data={people} columns={columns} pagination={DEFAULT_PAGINATION} />
    );
  },
};

export const SelectableRows: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-selectable"
      data={people}
      columns={personColumns}
      enableRowSelection
      pagination={DEFAULT_PAGINATION}
    />
  ),
};

const ClickableTemplate = () => {
  const [clicked, setClicked] = useState<string | null>(null);
  return (
    <>
      <Text className="margin-bottom-10">{clicked ? `You clicked ${clicked}` : 'Click a row to select it.'}</Text>
      <Table<Person>
        id="tedi-table-clickable"
        data={people}
        columns={personColumns}
        onRowClick={(row) => setClicked(row.original.name)}
        pagination={DEFAULT_PAGINATION}
      />
    </>
  );
};

export const ClickableRows: Story = { render: () => <ClickableTemplate /> };

export const Striped: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-striped"
      data={people}
      columns={personColumns}
      striped
      pagination={DEFAULT_PAGINATION}
    />
  ),
};

export const StickyFirstColumn: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Table<Person>
        id="tedi-table-sticky"
        data={people}
        columns={personColumns}
        stickyFirstColumn
        pagination={DEFAULT_PAGINATION}
      />
    </div>
  ),
};

/**
 * Empty-state rendering: when `data` is empty, Table falls back to the
 * `placeholder` prop. Passing an `<EmptyState>` node produces the richer
 * zero-data layout (icon + heading + description + actions) inside the table
 * body.
 */
export const EmptyWithEmptyState: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-empty-state"
      data={[]}
      columns={personColumns}
      placeholder={
        <EmptyState type="inside" icon={{ name: 'spa', color: 'tertiary' }}>
          No results found
        </EmptyState>
      }
    />
  ),
};

export const WithFooter: Story = {
  render: () => {
    const columns: ColumnDef<Person>[] = [
      { id: 'name', header: 'Name', accessorKey: 'name', footer: `${people.length} people` },
      { id: 'role', header: 'Role', accessorKey: 'role' },
      { id: 'location', header: 'Location', accessorKey: 'location' },
      {
        id: 'salary',
        header: 'Salary (€)',
        accessorKey: 'salary',
        cell: (info) => (info.getValue() as number).toLocaleString('et-EE'),
        footer: (info) => {
          const total = info.table.getRowModel().rows.reduce((sum, row) => sum + row.original.salary, 0);
          return `Total €${total.toLocaleString('et-EE')}`;
        },
      },
    ];
    return <Table<Person> id="tedi-table-footer" data={people} columns={columns} pagination={DEFAULT_PAGINATION} />;
  },
};

/**
 * Column-visibility toolbar example. Reuses the dropdown from the base
 * story file so consumers can see how `<Table.ColumnsMenu />` plugs into
 * `<Table.Toolbar>`.
 */
export const WithColumnsMenu: Story = {
  render: () => (
    <Table<Person> id="tedi-table-visibility" data={people} columns={personColumns} pagination={DEFAULT_PAGINATION}>
      <Table.Toolbar>
        <Table.ColumnsMenu />
      </Table.Toolbar>
    </Table>
  ),
};

/**
 * Combines tag rendering with selectable rows to preview a richer production-
 * style table.
 */
export const StatusShowcase: Story = {
  render: () => {
    const columns: ColumnDef<Person>[] = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      { id: 'email', header: 'Email', accessorKey: 'email' },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => (
          <Tag color={row.original.status === 'active' ? 'primary' : 'secondary'}>{row.original.status}</Tag>
        ),
      },
    ];
    return (
      <Table<Person>
        id="tedi-table-status"
        data={people}
        columns={columns}
        enableRowSelection
        pagination={DEFAULT_PAGINATION}
      />
    );
  },
};

const PersistedTemplate = () => {
  const [state, setState] = useState<TableState>({});
  return (
    <Table<Person>
      id="tedi-table-persisted"
      data={people}
      columns={personColumns}
      state={state}
      onStateChange={setState}
      persist={{ key: 'tedi-table-persisted-story' }}
      pagination={DEFAULT_PAGINATION}
    >
      <Table.Toolbar>
        <Table.ColumnsMenu />
      </Table.Toolbar>
    </Table>
  );
};

export const Persisted: Story = { render: () => <PersistedTemplate /> };
