import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Collapse } from '../../buttons/collapse/collapse';
import { Checkbox } from '../../form/checkbox/checkbox';
import { TextField } from '../../form/textfield/textfield';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Alert } from '../../notifications/alert/alert';
import { EmptyState } from '../../notifications/empty-state';
import { Popover, PopoverContent, PopoverTrigger } from '../../overlays/popover';
import { StatusBadge, type StatusBadgeColor } from '../../tags/status-badge/status-badge';
import { Tag } from '../../tags/tag/tag';
import { Table } from './table';
import type { TableProps } from './table.types';

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
const DEFAULT_PAGINATION = { pageSize: 10, pageSizeOptions: [10, 25, 50] };

/**
 * Used by `Sizes` and `Simple` stories — the Figma frames show 3-4 visible
 * rows per page so the table comparison fits without scrolling.
 */
const SHOWCASE_PAGINATION_3 = { pageSize: 3, pageSizeOptions: [3, 10, 25, 50] };
const SHOWCASE_PAGINATION_4 = { pageSize: 4, pageSizeOptions: [4, 10, 25, 50] };

const personColumns: ColumnDef<Person>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
  { id: 'location', header: 'Location', accessorKey: 'location' },
];

type Story = StoryObj<TableProps<Person>>;

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

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  location: string;
}

const doctorSeed: Omit<Doctor, 'id'>[] = [
  { name: 'Kalle Kask', specialty: 'Dermatovenereoloog', experience: '4 a', location: 'Tallinn' },
  { name: 'Mari Maasikas', specialty: 'Kopsuarst', experience: '4 a', location: 'Tallinn' },
  { name: 'Vello Vaarikas', specialty: 'Kõrva-nina-kurguarst', experience: '4 a', location: 'Tallinn' },
];

const doctors: Doctor[] = Array.from({ length: 28 }, (_, index) => ({
  ...doctorSeed[index % doctorSeed.length],
  id: String(index + 1),
}));

const editLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: 'var(--link-primary-default)',
  textDecoration: 'none',
  fontWeight: 'var(--body-regular-weight)',
};

const nameLinkStyle: React.CSSProperties = {
  color: 'var(--link-primary-default)',
  textDecoration: 'none',
  fontWeight: 'var(--body-regular-weight)',
};

/**
 * Three "simple" table layouts side-by-side, mirroring the Figma "Simple"
 * frame: a bookings list with an edit action, a people list with linked
 * names + status badges, and a doctor list with a multi-line first cell.
 * Same chrome (borders, pagination), different content patterns.
 */
const SimpleTemplate = () => {
  const bookingColumns = useMemo<ColumnDef<Booking>[]>(
    () => [
      { id: 'dateRange', header: 'Kuupäev', accessorKey: 'dateRange' },
      { id: 'hour', header: 'Kellaaeg', accessorKey: 'hour' },
      { id: 'duration', header: 'Kestus', accessorKey: 'duration' },
      { id: 'location', header: 'Asukoht', accessorKey: 'location' },
      {
        id: 'actions',
        header: '',
        cell: () => (
          <a href="#" onClick={(event) => event.preventDefault()} style={editLinkStyle}>
            <Icon name="edit" color="brand" size={18} />
            Muuda
          </a>
        ),
      },
    ],
    []
  );

  const peopleColumns = useMemo<ColumnDef<PersonRecord>[]>(
    () => [
      {
        id: 'name',
        header: 'Isik',
        accessorKey: 'name',
        cell: ({ row }) => (
          <a href="#" onClick={(event) => event.preventDefault()} style={nameLinkStyle}>
            {row.original.name}
          </a>
        ),
      },
      { id: 'age', header: 'Vanus', accessorKey: 'age' },
      { id: 'visits', header: 'Külastuste arv', accessorKey: 'visits' },
      {
        id: 'status',
        header: 'Tõendi staatus',
        accessorKey: 'status',
        cell: ({ row }) => (
          <StatusBadge color={certStatusColor[row.original.status]}>{row.original.status}</StatusBadge>
        ),
      },
    ],
    []
  );

  const doctorColumns = useMemo<ColumnDef<Doctor>[]>(
    () => [
      {
        id: 'name',
        header: 'Arst',
        cell: ({ row }) => (
          <div>
            <div>{row.original.name}</div>
            <div style={{ color: 'var(--general-text-secondary)' }}>{row.original.specialty}</div>
          </div>
        ),
      },
      { id: 'experience', header: 'Tööstaaž', accessorKey: 'experience' },
      { id: 'location', header: 'Asukoht', accessorKey: 'location' },
      {
        id: 'actions',
        header: '',
        cell: () => (
          <a href="#" onClick={(event) => event.preventDefault()} style={editLinkStyle}>
            <Icon name="edit" color="brand" size={18} />
            Muuda
          </a>
        ),
      },
    ],
    []
  );

  return (
    <VerticalSpacing size={1}>
      <Table<Booking>
        id="tedi-table-simple-bookings"
        data={bookings}
        columns={bookingColumns}
        pagination={SHOWCASE_PAGINATION_3}
      />
      <Table<PersonRecord>
        id="tedi-table-simple-people"
        data={filterablePeople}
        columns={peopleColumns}
        pagination={SHOWCASE_PAGINATION_4}
      />
      <Table<Doctor>
        id="tedi-table-simple-doctors"
        data={doctors}
        columns={doctorColumns}
        pagination={SHOWCASE_PAGINATION_3}
      />
    </VerticalSpacing>
  );
};

/** Shared columns for the Default and Sizes stories (Figma "Sizes" frame). */
const bookingShowcaseColumns: ColumnDef<Booking>[] = [
  { id: 'dateRange', header: 'Kuupäev', accessorKey: 'dateRange' },
  { id: 'hour', header: 'Kellaaeg', accessorKey: 'hour' },
  { id: 'duration', header: 'Kestus', accessorKey: 'duration' },
  { id: 'location', header: 'Asukoht', accessorKey: 'location' },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <a href="#" onClick={(event) => event.preventDefault()} style={editLinkStyle}>
        <Icon name="edit" color="brand" size={18} />
        Muuda
      </a>
    ),
  },
];

/**
 * Baseline render: a single default-size booking table — same content used in
 * the `Sizes` showcase below, just on its own.
 */
export const Default: Story = {
  render: () => (
    <Table<Booking>
      id="tedi-table-default"
      data={bookings}
      columns={bookingShowcaseColumns}
      pagination={SHOWCASE_PAGINATION_3}
    />
  ),
};

/**
 * Both table sizes side-by-side, mirroring the Figma "Sizes" frame:
 * `default` and `small` variants of the same booking columns so the
 * difference in row/header padding is easy to compare.
 */
const SizesTemplate = () => (
  <VerticalSpacing size={1}>
    <Heading element="h3">Default</Heading>
    <Table<Booking>
      id="tedi-table-sizes-default"
      data={bookings}
      columns={bookingShowcaseColumns}
      pagination={SHOWCASE_PAGINATION_3}
    />
    <Heading element="h3">Small</Heading>
    <Table<Booking>
      id="tedi-table-sizes-small"
      data={bookings}
      columns={bookingShowcaseColumns}
      size="small"
      pagination={SHOWCASE_PAGINATION_3}
    />
  </VerticalSpacing>
);

export const Sizes: Story = { render: () => <SizesTemplate /> };
export const Simple: Story = { render: () => <SimpleTemplate /> };

/**
 * Two long-text patterns from the Figma "Long texts" frame. Top table puts
 * the "Show more" link on its own line under the truncated paragraph (with a
 * chevron). Bottom table inlines the link at the end of the truncated text
 * (underlined, no icon). Tip alert in the middle explains the trade-off.
 */
const LONG_DESCRIPTION =
  'Pellentesque mattis augue at mi tristique dignissim. Aliquam lobortis hendrerit ' +
  'augue, sit amet pellentesque nibh ultricies eu. Nullam ut nibh non lectus pulvinar ' +
  'volutpat.';

const truncate2LinesStyle: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const inlineShowMoreLinkStyle: React.CSSProperties = {
  color: 'var(--link-primary-default)',
  textDecoration: 'underline',
  fontWeight: 'var(--body-regular-weight)',
  whiteSpace: 'nowrap',
};

const baseDoctorWithDescriptionColumns = (): ColumnDef<Doctor>[] => [
  {
    id: 'name',
    header: 'Arst',
    cell: ({ row }) => (
      <div>
        <div>{row.original.name}</div>
        <div style={{ color: 'var(--general-text-secondary)' }}>{row.original.specialty}</div>
      </div>
    ),
  },
  // Description cell injected per variant.
  { id: 'location', header: 'Asukoht', accessorKey: 'location' },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <a href="#" onClick={(event) => event.preventDefault()} style={editLinkStyle}>
        <Icon name="edit" color="brand" size={18} />
        Muuda
      </a>
    ),
  },
];

const LongTextsTemplate = () => {
  const [expandedBlock, setExpandedBlock] = useState<Set<string>>(new Set());
  const [expandedInline, setExpandedInline] = useState<Set<string>>(new Set());

  const toggleIn = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const blockColumns = useMemo<ColumnDef<Doctor>[]>(() => {
    const base = baseDoctorWithDescriptionColumns();
    return [
      base[0],
      {
        id: 'description',
        header: 'Kirjeldus',
        cell: ({ row }) => {
          const isExpanded = expandedBlock.has(row.id);
          return (
            <div>
              <div style={isExpanded ? undefined : truncate2LinesStyle}>{LONG_DESCRIPTION}</div>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setExpandedBlock((prev) => toggleIn(prev, row.id));
                }}
                style={{ ...editLinkStyle, marginTop: 4 }}
              >
                {isExpanded ? 'Show less' : 'Show more'}
                <Icon name={isExpanded ? 'arrow_drop_up' : 'arrow_drop_down'} color="brand" size={18} />
              </a>
            </div>
          );
        },
      },
      base[1],
      base[2],
    ];
  }, [expandedBlock]);

  const inlineColumns = useMemo<ColumnDef<Doctor>[]>(() => {
    const base = baseDoctorWithDescriptionColumns();
    return [
      base[0],
      {
        id: 'description',
        header: 'Kirjeldus',
        cell: ({ row }) => {
          const isExpanded = expandedInline.has(row.id);
          // Truncate at a fixed length so the inline "Show more" sits at the
          // end of the text rather than on its own line. CSS line-clamp can't
          // mix with an inline trailing link without complex layout tricks.
          const truncated =
            LONG_DESCRIPTION.length > 70 ? `${LONG_DESCRIPTION.slice(0, 70).trimEnd()}…` : LONG_DESCRIPTION;
          return (
            <span>
              {isExpanded ? LONG_DESCRIPTION : truncated}{' '}
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setExpandedInline((prev) => toggleIn(prev, row.id));
                }}
                style={inlineShowMoreLinkStyle}
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </a>
            </span>
          );
        },
      },
      base[1],
      base[2],
    ];
  }, [expandedInline]);

  return (
    <VerticalSpacing size={1}>
      <Table<Doctor>
        id="tedi-table-long-texts-block"
        data={doctors}
        columns={blockColumns}
        pagination={SHOWCASE_PAGINATION_3}
      />
      <Table<Doctor>
        id="tedi-table-long-texts-inline"
        data={doctors}
        columns={inlineColumns}
        pagination={SHOWCASE_PAGINATION_3}
      />
    </VerticalSpacing>
  );
};

/**
 * Two row-action patterns from the Figma "Actions" frame. Top table puts
 * separate edit + delete icon buttons on each row. Bottom table collapses
 * the same affordances into a single kebab (`more_vert`) button — typical
 * pattern when the row is dense or has many possible actions.
 */
const baseDoctorActionsColumns = (): ColumnDef<Doctor>[] => [
  {
    id: 'name',
    header: 'Arst',
    cell: ({ row }) => (
      <div>
        <div>{row.original.name}</div>
        <div style={{ color: 'var(--general-text-secondary)' }}>{row.original.specialty}</div>
      </div>
    ),
  },
  { id: 'experience', header: 'Tööstaaž', accessorKey: 'experience' },
  { id: 'location', header: 'Asukoht', accessorKey: 'location' },
];

const rowActionsCellStyle: React.CSSProperties = {
  display: 'inline-flex',
  gap: 8,
  justifyContent: 'flex-end',
  width: '100%',
};

const ActionsTemplate = () => {
  const editDeleteColumns = useMemo<ColumnDef<Doctor>[]>(
    () => [
      ...baseDoctorActionsColumns(),
      {
        id: 'actions',
        header: '',
        cell: () => (
          <span style={rowActionsCellStyle}>
            <Button visualType="secondary" icon="edit" aria-label="Edit row" onClick={() => undefined}>
              <></>
            </Button>
            <Button visualType="secondary" icon="delete" aria-label="Delete row" onClick={() => undefined}>
              <></>
            </Button>
          </span>
        ),
      },
    ],
    []
  );

  const kebabColumns = useMemo<ColumnDef<Doctor>[]>(
    () => [
      ...baseDoctorActionsColumns(),
      {
        id: 'actions',
        header: '',
        cell: () => (
          <span style={rowActionsCellStyle}>
            <Button visualType="secondary" icon="more_vert" aria-label="More actions" onClick={() => undefined}>
              <></>
            </Button>
          </span>
        ),
      },
    ],
    []
  );

  return (
    <VerticalSpacing size={1}>
      <Table<Doctor>
        id="tedi-table-actions-edit-delete"
        data={doctors}
        columns={editDeleteColumns}
        pagination={SHOWCASE_PAGINATION_3}
      />
      <Table<Doctor>
        id="tedi-table-actions-kebab"
        data={doctors}
        columns={kebabColumns}
        pagination={SHOWCASE_PAGINATION_3}
      />
    </VerticalSpacing>
  );
};

/**
 * "Custom" Figma frame: a tip alert plus a table with custom-rendered cells —
 * avatar circle next to the name, a status note column with coloured
 * `StatusBadge`s, and the same edit/delete row actions from the Actions
 * showcase. Demonstrates that any column can return arbitrary JSX.
 */
type CustomNoteColor = 'warning' | 'danger' | undefined;

interface CustomDoctor extends Doctor {
  note?: string;
  noteColor?: CustomNoteColor;
}

const customDoctorSeed: Omit<CustomDoctor, 'id'>[] = [
  {
    name: 'Kalle Kask',
    specialty: 'Dermatovenereoloog',
    experience: '4 a',
    location: 'Tallinn',
    note: 'Esineb maksehäireid',
    noteColor: 'warning',
  },
  {
    name: 'Mari Maasikas',
    specialty: 'Kopsuarst',
    experience: '4 a',
    location: 'Tallinn',
  },
  {
    name: 'Vello Vaarikas',
    specialty: 'Kõrva-nina-kurguarst',
    experience: '4 a',
    location: 'Tallinn',
    note: 'Arve tasumata',
    noteColor: 'danger',
  },
];

const customDoctors: CustomDoctor[] = Array.from({ length: 28 }, (_, index) => ({
  ...customDoctorSeed[index % customDoctorSeed.length],
  id: String(index + 1),
}));

const avatarStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'var(--general-surface-secondary)',
  color: 'var(--general-text-secondary)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'var(--heading-weight)',
  fontSize: 'var(--body-small-regular-size)',
  flexShrink: 0,
};

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');

const CustomTemplate = () => {
  const columns = useMemo<ColumnDef<CustomDoctor>[]>(
    () => [
      {
        id: 'name',
        header: 'Arst',
        cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span aria-hidden="true" style={avatarStyle}>
              {initialsOf(row.original.name)}
            </span>
            <div>
              <div>{row.original.name}</div>
              <div style={{ color: 'var(--general-text-secondary)' }}>{row.original.specialty}</div>
            </div>
          </div>
        ),
      },
      {
        id: 'note',
        header: '',
        cell: ({ row }) =>
          row.original.note && row.original.noteColor ? (
            <Alert type={row.original.noteColor} size="small" role="status">
              {row.original.note}
            </Alert>
          ) : null,
      },
      { id: 'location', header: 'Asukoht', accessorKey: 'location' },
      {
        id: 'actions',
        header: '',
        cell: () => (
          <span style={rowActionsCellStyle}>
            <Button visualType="secondary" icon="edit" aria-label="Edit row" onClick={() => undefined}>
              <></>
            </Button>
            <Button visualType="secondary" icon="delete" aria-label="Delete row" onClick={() => undefined}>
              <></>
            </Button>
          </span>
        ),
      },
    ],
    []
  );

  return (
    <VerticalSpacing size={1}>
      <Table<CustomDoctor>
        id="tedi-table-custom"
        data={customDoctors}
        columns={columns}
        pagination={SHOWCASE_PAGINATION_3}
      />
    </VerticalSpacing>
  );
};

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
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Kuupäev
              <Table.HeaderButton
                icon={iconName}
                selected={!!sorted}
                aria-label="Sort by Kuupäev"
                onClick={column.getToggleSortingHandler()}
              />
            </span>
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
                <Button visualType="neutral" size="small" icon="close" onClick={cancelEdit}>
                  Tühista
                </Button>
                <Button visualType="primary" size="small" icon="check" onClick={commitEdit}>
                  Kinnita
                </Button>
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
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {col.header}
              <Table.HeaderButton
                icon={iconName}
                selected={!!sorted}
                aria-label={`Sort by ${col.header}`}
                onClick={column.getToggleSortingHandler()}
              />
            </span>
          );
        },
      })),
    []
  );

  return <Table<Person> id="tedi-table-sortable" data={people} columns={columns} pagination={DEFAULT_PAGINATION} />;
};

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

const certStatusColor: Record<CertStatus, StatusBadgeColor> = {
  Kehtiv: 'success',
  Aegumas: 'warning',
  Kehtetu: 'danger',
  Aegunud: 'neutral',
};

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
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {children}
      <Table.HeaderButton
        icon={iconName}
        selected={!!sorted}
        aria-label={ariaLabel}
        onClick={column.getToggleSortingHandler()}
      />
    </span>
  );
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
        <Table.HeaderButton icon="filter_alt" selected={!!value} filled={!!value} aria-label={`Filtreeri ${label}`} />
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
        <Table.HeaderButton icon="filter_alt" selected={active} filled={active} aria-label={`Filtreeri ${label}`} />
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
        <Table.HeaderButton icon="filter_alt" selected={active} filled={active} aria-label={`Filtreeri ${label}`} />
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
          <StatusBadge color={certStatusColor[row.original.status]}>{row.original.status}</StatusBadge>
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

interface CollapsibleRecord {
  id: string;
  name: string;
  age: number;
  visits: number;
  status: CertStatus;
  subRows?: CollapsibleRecord[];
}

const collapsibleSeed: Omit<CollapsibleRecord, 'id' | 'subRows'>[] = [
  { name: 'Mari Maasikas', age: 25, visits: 6, status: 'Kehtiv' },
  { name: 'Kalle Kapsapea', age: 35, visits: 13, status: 'Kehtiv' },
  { name: 'Mart Mägi', age: 43, visits: 26, status: 'Kehtiv' },
  { name: 'Meelis Mets', age: 64, visits: 26, status: 'Kehtetu' },
  { name: 'Kadri Kask', age: 32, visits: 4, status: 'Aegumas' },
  { name: 'Liis Linn', age: 21, visits: 13, status: 'Aegunud' },
];

const collapsiblePeople: CollapsibleRecord[] = Array.from({ length: 28 }, (_, index) => {
  const seed = collapsibleSeed[index % collapsibleSeed.length];
  const round = Math.floor(index / collapsibleSeed.length);
  const name = round === 0 ? seed.name : `${seed.name} ${round + 1}`;
  const id = String(index + 1);
  const subRows: CollapsibleRecord[] | undefined =
    index % 2 === 0
      ? [
          { id: `${id}-1`, name, age: seed.age, visits: Math.floor(seed.visits / 2), status: 'Kehtiv' },
          { id: `${id}-2`, name, age: seed.age, visits: seed.visits - Math.floor(seed.visits / 2), status: 'Kehtetu' },
        ]
      : undefined;
  return { ...seed, id, name, ...(subRows ? { subRows } : {}) };
});

export const CollapsibleRows: Story = {
  render: () => {
    const columns: ColumnDef<CollapsibleRecord>[] = [
      { id: 'name', header: 'Isik', accessorKey: 'name' },
      { id: 'age', header: 'Vanus', accessorKey: 'age' },
      { id: 'visits', header: 'Külastuste arv', accessorKey: 'visits' },
      {
        id: 'status',
        header: 'Tõendi staatus',
        accessorKey: 'status',
        cell: ({ row }) => (
          <StatusBadge color={certStatusColor[row.original.status]}>{row.original.status}</StatusBadge>
        ),
      },
    ];
    return (
      <Table<CollapsibleRecord>
        id="tedi-table-collapse"
        data={collapsiblePeople}
        columns={columns}
        getSubRows={(row) => row.subRows}
        pagination={DEFAULT_PAGINATION}
      />
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
export const WithEmptyState: Story = {
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

/**
 * Two long-text patterns from the Figma "Long texts" frame. Top table puts
 * the "Show more" link on its own line under the truncated paragraph (with a
 * chevron). Bottom table inlines the link at the end of the truncated text
 * (underlined, no icon). Tip alert in the middle explains the trade-off.
 */
export const LongTexts: Story = { render: () => <LongTextsTemplate /> };

/**
 * Two row-action patterns from the Figma "Actions" frame. Top table puts
 * separate edit + delete icon buttons on each row. Bottom table collapses
 * the same affordances into a single kebab (`more_vert`) button — typical
 * pattern when the row is dense or has many possible actions.
 */
export const Actions: Story = { render: () => <ActionsTemplate /> };

/**
 * "Custom" Figma frame: a tip alert plus a table with custom-rendered cells —
 * avatar circle next to the name, a status note column with coloured `Alert`
 * tags, and the same edit/delete row actions from the Actions showcase.
 * Demonstrates that any column can return arbitrary JSX.
 */
export const Custom: Story = { render: () => <CustomTemplate /> };

// ─────────────────────────────────────────────────────────────────────────────
// Stories not present in the Figma "Types" frame — kept after the Figma-driven
// showcase so the story sidebar follows the design's documented order first.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Footer row showing per-column aggregates (e.g. salary total, headcount).
 * Columns opt in by providing a `footer` value/function on `columnDef`.
 */
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
 * Sortable columns — header shows a compact sort chevron that cycles through
 * `unsorted → ascending → descending → unsorted` on click. Standalone
 * showcase; a combined sort + filter version lives in `Filters`.
 */
export const Sortable: Story = { render: () => <SortableTemplate /> };

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
