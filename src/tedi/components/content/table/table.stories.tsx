import { arrayMove } from '@dnd-kit/sortable';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import InfoButton from '../../buttons/info-button/info-button';
import { EmptyState } from '../../content/empty-state';
import { Checkbox } from '../../form/checkbox/checkbox';
import { DateField } from '../../form/date-field/date-field';
import { TextField } from '../../form/textfield/textfield';
import { TimeField } from '../../form/time-field/time-field';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Separator from '../../misc/separator/separator';
import { Alert } from '../../notifications/alert/alert';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '../../overlays/dropdown';
import { Popover, PopoverContent, PopoverTrigger } from '../../overlays/popover';
import { Tooltip } from '../../overlays/tooltip';
import { StatusBadge, type StatusBadgeColor } from '../../tags/status-badge/status-badge';
import { TextGroup } from '../text-group/text-group';
import { Truncate } from '../truncate/truncate';
import type { TableProps } from './table';
import { groupRowSpan, Table } from './table';

/**
 * <a href="https://tanstack.com/table" target="_BLANK">@tanstack/react-table ↗</a><br/>
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=4514-63761&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/557b9f-table" target="_BLANK">Zeroheight ↗</a>
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

const DEFAULT_PAGINATION = { pageSize: 10, pageSizeOptions: [10, 25, 50] };
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
  dateRange: DateRange;
  hour: string;
  duration: string;
  location: string;
}

const bookingDateRange: DateRange = {
  from: new Date(2029, 2, 22),
  to: new Date(2029, 2, 29),
};

const bookings: Booking[] = Array.from({ length: 28 }, (_, index) => ({
  id: String(index + 1),
  dateRange: bookingDateRange,
  hour: '11:14',
  duration: '6 min',
  location: 'Harjumaa',
}));

const dateRangeFormatter = new Intl.DateTimeFormat('et-EE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const formatDateRange = (range: DateRange | undefined): string => {
  if (!range?.from) return '';
  const from = dateRangeFormatter.format(range.from);
  return range.to ? `${from} – ${dateRangeFormatter.format(range.to)}` : from;
};

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

const editRowActionsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8,
  width: '100%',
};

type EditableRowBase = { id: string };

interface EditableRows<T extends EditableRowBase> {
  rows: T[];
  editingId: string | null;
  draft: T | null;
  setDraft: React.Dispatch<React.SetStateAction<T | null>>;
  beginEdit: (row: T) => void;
  cancelEdit: () => void;
  commitEdit: () => void;
}

const EditableRowsContext = createContext<EditableRows<EditableRowBase> | null>(null);

function EditableRowsProvider<T extends EditableRowBase>({
  value,
  children,
}: {
  value: EditableRows<T>;
  children: React.ReactNode;
}) {
  return (
    <EditableRowsContext.Provider value={value as unknown as EditableRows<EditableRowBase>}>
      {children}
    </EditableRowsContext.Provider>
  );
}

function useEditor<T extends EditableRowBase>(): EditableRows<T> {
  const editor = useContext(EditableRowsContext);
  if (!editor) throw new Error('EditableRowsContext missing — wrap the table in <EditableRowsProvider>.');
  return editor as unknown as EditableRows<T>;
}

function useEditableRows<T extends { id: string }>(initial: T[]): EditableRows<T> {
  const [rows, setRows] = useState<T[]>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<T | null>(null);

  const draftRef = useRef(draft);
  draftRef.current = draft;

  const beginEdit = useCallback((row: T) => {
    setEditingId(row.id);
    setDraft(row);
  }, []);
  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setDraft(null);
  }, []);
  const commitEdit = useCallback(() => {
    const current = draftRef.current;
    if (!current) return;
    setRows((existing) => existing.map((row) => (row.id === current.id ? (current as T) : row)));
    setEditingId(null);
    setDraft(null);
  }, []);

  return { rows, editingId, draft, setDraft, beginEdit, cancelEdit, commitEdit };
}

function EditActionsCell<T extends { id: string }>({ row }: { row: T }) {
  const editor = useEditor<T>();
  if (row.id === editor.editingId) {
    return (
      <span style={editRowActionsStyle}>
        <ClosingButton title="Tühista" onClick={editor.cancelEdit} />
        <Button visualType="primary" size="small" icon="check" onClick={editor.commitEdit}>
          Kinnita
        </Button>
      </span>
    );
  }
  return (
    <span style={editRowActionsStyle}>
      <Button visualType="link" iconLeft="edit" onClick={() => editor.beginEdit(row)}>
        Muuda
      </Button>
    </span>
  );
}

function EditableTextCell<T extends { id: string }>({
  row,
  field,
  label,
}: {
  row: T;
  field: keyof T & string;
  label: string;
}) {
  const editor = useEditor<T>();
  const isEditing = row.id === editor.editingId && editor.draft;
  if (!isEditing) {
    return <>{String(row[field] ?? '')}</>;
  }
  const draftValue = String((editor.draft as T)[field] ?? '');
  return (
    <TextField
      id={`${row.id}-${field}`}
      name={field}
      label={label}
      hideLabel
      value={draftValue}
      onChange={(next) => editor.setDraft((prev: T | null) => (prev ? { ...prev, [field]: next } : prev))}
    />
  );
}

function EditableTimeCell<T extends { id: string }>({
  row,
  field,
  label,
}: {
  row: T;
  field: keyof T & string;
  label: string;
}) {
  const editor = useEditor<T>();
  const isEditing = row.id === editor.editingId && editor.draft;
  if (!isEditing) {
    return <>{String(row[field] ?? '')}</>;
  }
  const draftValue = String((editor.draft as T)[field] ?? '');
  return (
    <TimeField
      id={`${row.id}-${field}`}
      label={label}
      value={draftValue}
      inputProps={{ hideLabel: true, name: field }}
      onChange={(next) => editor.setDraft((prev: T | null) => (prev ? { ...prev, [field]: next } : prev))}
    />
  );
}

function EditableDateRangeCell<T extends { id: string }>({
  row,
  field,
  label,
}: {
  row: T;
  field: keyof T & string;
  label: string;
}) {
  const editor = useEditor<T>();
  const isEditing = row.id === editor.editingId && editor.draft;
  const value = row[field] as DateRange | undefined;
  if (!isEditing) {
    return <>{formatDateRange(value)}</>;
  }
  const draftValue = (editor.draft as T)[field] as DateRange | undefined;
  return (
    <DateField
      id={`${row.id}-${field}`}
      mode="range"
      label={label}
      inputProps={{ hideLabel: true }}
      selected={draftValue}
      onSelect={(next) =>
        editor.setDraft((prev: T | null) =>
          prev ? { ...prev, [field]: (next as DateRange | undefined) ?? { from: undefined } } : prev
        )
      }
    />
  );
}

const bookingShowcaseColumns: ColumnDef<Booking>[] = [
  {
    id: 'dateRange',
    header: 'Kuupäev',
    accessorKey: 'dateRange',
    cell: ({ row }) => <EditableDateRangeCell row={row.original} field="dateRange" label="Kuupäev" />,
  },
  {
    id: 'hour',
    header: 'Kellaaeg',
    accessorKey: 'hour',
    cell: ({ row }) => <EditableTimeCell row={row.original} field="hour" label="Kellaaeg" />,
  },
  {
    id: 'duration',
    header: 'Kestus',
    accessorKey: 'duration',
    cell: ({ row }) => <EditableTextCell row={row.original} field="duration" label="Kestus" />,
  },
  {
    id: 'location',
    header: 'Asukoht',
    accessorKey: 'location',
    cell: ({ row }) => <EditableTextCell row={row.original} field="location" label="Asukoht" />,
  },
  {
    id: 'actions',
    header: '',
    size: 1,
    cell: ({ row }) => <EditActionsCell row={row.original} />,
  },
];

export const Default: Story = {
  render: function Default() {
    const editor = useEditableRows<Booking>(bookings);
    return (
      <EditableRowsProvider value={editor}>
        <Table<Booking>
          id="tedi-table-default"
          autoResetPageIndex={false}
          data={editor.rows}
          columns={bookingShowcaseColumns}
          pagination={SHOWCASE_PAGINATION_3}
        />
      </EditableRowsProvider>
    );
  },
};

export const Sizes: Story = {
  render: function Sizes() {
    const defaultEditor = useEditableRows<Booking>(bookings);
    const smallEditor = useEditableRows<Booking>(bookings);
    return (
      <VerticalSpacing size={1}>
        <Heading element="h3">Default</Heading>
        <EditableRowsProvider value={defaultEditor}>
          <Table<Booking>
            id="tedi-table-sizes-default"
            autoResetPageIndex={false}
            data={defaultEditor.rows}
            columns={bookingShowcaseColumns}
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsProvider>
        <Heading element="h3">Small</Heading>
        <EditableRowsProvider value={smallEditor}>
          <Table<Booking>
            id="tedi-table-sizes-small"
            autoResetPageIndex={false}
            data={smallEditor.rows}
            columns={bookingShowcaseColumns}
            size="small"
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsProvider>
      </VerticalSpacing>
    );
  },
};

const simplePeopleColumns: ColumnDef<PersonRecord>[] = [
  {
    id: 'name',
    header: 'Isik',
    accessorKey: 'name',
    cell: ({ row }) => <Button visualType="link">{row.original.name}</Button>,
  },
  { id: 'age', header: 'Vanus', accessorKey: 'age' },
  { id: 'visits', header: 'Külastuste arv', accessorKey: 'visits' },
  {
    id: 'status',
    header: 'Tõendi staatus',
    accessorKey: 'status',
    cell: ({ row }) => <StatusBadge color={certStatusColor[row.original.status]}>{row.original.status}</StatusBadge>,
  },
];

const simpleDoctorColumns: ColumnDef<Doctor>[] = [
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
  {
    id: 'experience',
    header: 'Tööstaaž',
    accessorKey: 'experience',
    cell: ({ row }) => <EditableTextCell row={row.original} field="experience" label="Tööstaaž" />,
  },
  {
    id: 'location',
    header: 'Asukoht',
    accessorKey: 'location',
    cell: ({ row }) => <EditableTextCell row={row.original} field="location" label="Asukoht" />,
  },
  {
    id: 'actions',
    header: '',
    size: 1,
    cell: ({ row }) => <EditActionsCell row={row.original} />,
  },
];

export const Simple: Story = {
  render: function Simple() {
    const bookingEditor = useEditableRows<Booking>(bookings);
    const doctorEditor = useEditableRows<Doctor>(doctors);

    return (
      <VerticalSpacing size={1}>
        <EditableRowsProvider value={bookingEditor}>
          <Table<Booking>
            id="tedi-table-simple-bookings"
            autoResetPageIndex={false}
            data={bookingEditor.rows}
            columns={bookingShowcaseColumns}
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsProvider>
        <Table<PersonRecord>
          id="tedi-table-simple-people"
          data={filterablePeople}
          columns={simplePeopleColumns}
          pagination={SHOWCASE_PAGINATION_4}
        />
        <EditableRowsProvider value={doctorEditor}>
          <Table<Doctor>
            id="tedi-table-simple-doctors"
            autoResetPageIndex={false}
            data={doctorEditor.rows}
            columns={simpleDoctorColumns}
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsProvider>
      </VerticalSpacing>
    );
  },
};

const LONG_DESCRIPTION =
  'Pellentesque mattis augue at mi tristique dignissim. Aliquam lobortis hendrerit ' +
  'augue, sit amet pellentesque nibh ultricies eu. Nullam ut nibh non lectus pulvinar ' +
  'volutpat.';

const LONG_TEXT_MAX_LENGTH = 70;

const baseDoctorWithDescriptionColumns: ColumnDef<Doctor>[] = [
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
  {
    id: 'location',
    header: 'Asukoht',
    accessorKey: 'location',
    cell: ({ row }) => <EditableTextCell row={row.original} field="location" label="Asukoht" />,
  },
  {
    id: 'actions',
    header: '',
    size: 1,
    cell: ({ row }) => <EditActionsCell row={row.original} />,
  },
];

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

const mergedCellsColumns: ColumnDef<Booking>[] = [
  {
    id: 'dateRange',
    accessorKey: 'dateRange',
    size: 240,
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
    cell: ({ row }) => <EditableDateRangeCell row={row.original} field="dateRange" label="Kuupäev" />,
  },
  {
    id: 'aeg',
    header: 'Aeg',
    columns: [
      {
        id: 'hour',
        header: 'Kellaaeg',
        accessorKey: 'hour',
        cell: ({ row }) => <EditableTimeCell row={row.original} field="hour" label="Kellaaeg" />,
      },
      {
        id: 'duration',
        header: 'Kestus',
        accessorKey: 'duration',
        cell: ({ row }) => <EditableTextCell row={row.original} field="duration" label="Kestus" />,
      },
    ],
  },
  {
    id: 'location',
    header: 'Asukoht',
    accessorKey: 'location',
    cell: ({ row }) => <EditableTextCell row={row.original} field="location" label="Asukoht" />,
  },
  {
    id: 'actions',
    header: '',
    size: 1,
    cell: ({ row }) => <EditActionsCell row={row.original} />,
  },
];

export const MergedCells: Story = {
  render: function MergedCells() {
    const editor = useEditableRows<Booking>(bookings);
    return (
      <EditableRowsProvider value={editor}>
        <Table<Booking>
          id="tedi-table-merged"
          verticalBorders
          autoResetPageIndex={false}
          data={editor.rows}
          columns={mergedCellsColumns}
          pagination={DEFAULT_PAGINATION}
        />
      </EditableRowsProvider>
    );
  },
};

/**
 * Vertical row spanning via `meta: { rowSpan: groupRowSpan(data, getKey) }`. Consecutive rows
 * that share the chosen key collapse that column's cell into a single span, so a shared value
 * (e.g. a date) is shown once for the whole group instead of repeating on every row.
 *
 * Resolves against the original `data` array order — sort the data on the consumer side
 * before passing it in, since runtime sorting / pagination won't regroup spanned cells.
 */
export const GroupedRows: Story = {
  render: function GroupedRows() {
    interface PatientRow {
      id: string;
      date: string;
      doctor: string;
      procedure: string;
    }

    const patientRows = useMemo<PatientRow[]>(
      () => [
        { id: '1', date: '2026-05-20', doctor: 'Dr Tamm', procedure: 'Consultation' },
        { id: '2', date: '2026-05-20', doctor: 'Dr Tamm', procedure: 'Follow-up' },
        { id: '3', date: '2026-05-21', doctor: 'Dr Kask', procedure: 'X-ray' },
        { id: '4', date: '2026-05-21', doctor: 'Dr Kask', procedure: 'Consultation' },
      ],
      []
    );

    const columns = useMemo<ColumnDef<PatientRow>[]>(
      () => [
        {
          id: 'date',
          header: 'Date',
          accessorKey: 'date',
          meta: { rowSpan: groupRowSpan(patientRows, (row) => row.date), vAlign: 'top' },
        },
        {
          id: 'doctor',
          header: 'Doctor',
          accessorKey: 'doctor',
          meta: { rowSpan: groupRowSpan(patientRows, (row) => `${row.date}|${row.doctor}`), vAlign: 'top' },
        },
        { id: 'procedure', header: 'Procedure', accessorKey: 'procedure' },
      ],
      [patientRows]
    );

    return <Table<PatientRow> id="tedi-table-grouped" data={patientRows} columns={columns} verticalBorders />;
  },
};

const HeaderWithInfo = ({ label, info, align }: { label: string; info: string; align?: 'left' | 'right' }) => (
  <span
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
    }}
  >
    {label}
    <Tooltip>
      <Tooltip.Trigger>
        <InfoButton isSmall aria-label={`${label} info`} />
      </Tooltip.Trigger>
      <Tooltip.Content>{info}</Tooltip.Content>
    </Tooltip>
  </span>
);

interface Service {
  id: string;
  service: string;
  doctor: string;
  price: number;
  location: string;
}

const serviceSeed: Omit<Service, 'id'>[] = [
  { service: 'Vaimse tervise nõustamisteenus', doctor: 'Pille Paunküla', price: 45.5, location: 'Tallinn' },
  { service: 'Hematoloogia', doctor: 'Kalle Kuusik', price: 89.99, location: 'Tallinn' },
  { service: 'Ortopeedia', doctor: 'Märt Männimets', price: 110, location: 'Tallinn' },
  { service: 'Dermatoloogia', doctor: 'Anna Tamm', price: 75, location: 'Tartu' },
  { service: 'Kardioloogia', doctor: 'Mati Saar', price: 120.5, location: 'Pärnu' },
  { service: 'Neuroloogia', doctor: 'Liis Põld', price: 95.25, location: 'Tallinn' },
  { service: 'Pediaatria', doctor: 'Jaan Lepp', price: 60, location: 'Tartu' },
];
const services: Service[] = Array.from({ length: 28 }, (_, index) => ({
  id: String(index + 1),
  ...serviceSeed[index % serviceSeed.length],
}));

const priceFormatter = new Intl.NumberFormat('et-EE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Column separator lines via `verticalBorders`. Combine with `borderless` if the outer border
 * should be removed at the same time.
 */
export const VerticalBorders: Story = {
  render: () => {
    const columns: ColumnDef<Service>[] = [
      {
        id: 'service',
        accessorKey: 'service',
        header: ({ column }) => {
          const sorted = column.getIsSorted();
          const iconName = sorted === 'asc' ? 'arrow_upward' : sorted === 'desc' ? 'arrow_downward' : 'unfold_more';
          return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Teenus
              <Table.HeaderButton
                icon={iconName}
                selected={!!sorted}
                aria-label="Sorteeri Teenus järgi"
                onClick={column.getToggleSortingHandler()}
              />
            </span>
          );
        },
      },
      {
        id: 'doctor',
        accessorKey: 'doctor',
        header: () => <HeaderWithInfo label="Arst" info="Vastutav raviarst, kes teostab teenuse." />,
      },
      {
        id: 'price',
        accessorKey: 'price',
        header: 'Maksumus',
        meta: { align: 'right' },
        cell: ({ row }) => `${priceFormatter.format(row.original.price)} €/h`,
      },
      {
        id: 'location',
        accessorKey: 'location',
        header: () => <HeaderWithInfo label="Asukoht" info="Vastuvõtu toimumiskoht." />,
      },
    ];
    return (
      <Table<Service>
        id="tedi-table-vb"
        data={services}
        columns={columns}
        verticalBorders
        pagination={DEFAULT_PAGINATION}
      />
    );
  },
};

/**
 * Removes the outer table border with `borderless`. Useful when the table sits inside an
 * already-bordered card or panel and a double border would look wrong.
 */
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
 * Built on the shared `useEditableRows` hook + `EditableRowsContext` and the
 * module-level `bookingShowcaseColumns` array: the editor state lives in the
 * hook, flows through context, and is read by `EditableTextCell` /
 * `EditActionsCell` inside each cell. Keeping the columns array stable across
 * renders is what prevents TanStack from rebuilding column instances on every
 * keystroke (which would otherwise unmount the inner `<TextField>` and lose
 * focus after each character).
 */
export const EditableValues: Story = {
  render: function EditableValues() {
    const editor = useEditableRows<Booking>(bookings);
    return (
      <EditableRowsProvider value={editor}>
        <Table<Booking>
          id="tedi-table-editable"
          autoResetPageIndex={false}
          data={editor.rows}
          columns={bookingShowcaseColumns}
          pagination={DEFAULT_PAGINATION}
        />
      </EditableRowsProvider>
    );
  },
};

/**
 * Client-side sorting via `Table.HeaderButton` in the header renderer. The column label is
 * passed as the button's children, so the whole "text + icon" header is one clickable sort
 * target. Each click cycles `unfold_more → arrow_upward → arrow_downward → unfold_more`.
 * TanStack Table handles the sort state internally; no external state needed for client-side use.
 */
export const Sortable: Story = {
  render: function Sortable() {
    const columns = useMemo<ColumnDef<Person>[]>(
      () =>
        [
          { id: 'name', header: 'Name', accessorKey: 'name' },
          { id: 'role', header: 'Role', accessorKey: 'role' },
          { id: 'location', header: 'Location', accessorKey: 'location' },
          { id: 'salary', header: 'Salary', accessorKey: 'salary' },
        ].map((col) => ({
          ...col,
          meta: { label: col.header },
          header: ({ column }) => {
            const sorted = column.getIsSorted();
            const iconName = sorted === 'asc' ? 'arrow_upward' : sorted === 'desc' ? 'arrow_downward' : 'unfold_more';
            return (
              <Table.HeaderButton
                icon={iconName}
                selected={!!sorted}
                aria-label={`Sort by ${col.header}`}
                onClick={column.getToggleSortingHandler()}
              >
                {col.header}
              </Table.HeaderButton>
            );
          },
        })),
      []
    );

    return <Table<Person> id="tedi-table-sortable" data={people} columns={columns} pagination={DEFAULT_PAGINATION} />;
  },
};

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
    <Table.HeaderButton
      icon={iconName}
      selected={!!sorted}
      aria-label={ariaLabel}
      onClick={column.getToggleSortingHandler()}
    >
      {children}
    </Table.HeaderButton>
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
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onToggle={setOpen}>
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
                setOpen(false);
              }}
            >
              Tühista
            </Button>
            <Button
              visualType="primary"
              size="small"
              onClick={() => {
                onApply(draft || undefined);
                setOpen(false);
              }}
            >
              Filtreeri
            </Button>
          </div>
        </VerticalSpacing>
      </PopoverContent>
    </Popover>
  );
};

type DateRangeValue = { from?: string; to?: string };

const dateRangeStringToDate = (value?: string): Date | undefined => {
  if (!value) return undefined;
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  if (!match) return undefined;
  const [, dd, mm, yyyy] = match;
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
};

const dateToDateRangeString = (date?: Date): string | undefined => {
  if (!date) return undefined;
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getFullYear()}`;
};

const DateRangeFilterPopover = ({
  value,
  onApply,
  label,
}: {
  value: DateRangeValue | undefined;
  onApply: (next: DateRangeValue | undefined) => void;
  label: string;
}) => {
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = dateRangeStringToDate(value?.from);
    const to = dateRangeStringToDate(value?.to);
    return from || to ? { from, to } : undefined;
  });
  const [open, setOpen] = useState(false);
  const active = Boolean(value?.from || value?.to);
  return (
    <Popover open={open} onToggle={setOpen}>
      <PopoverTrigger>
        <Table.HeaderButton icon="filter_alt" selected={active} filled={active} aria-label={`Filtreeri ${label}`} />
      </PopoverTrigger>
      <PopoverContent width="medium">
        <VerticalSpacing size={0.5}>
          <DateField
            id="filter-date-range"
            mode="range"
            label={label}
            selected={range}
            placeholder="pp.kk.aaaa - pp.kk.aaaa"
            onSelect={(next) => setRange(next as DateRange | undefined)}
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button
              visualType="secondary"
              size="small"
              onClick={() => {
                setRange(undefined);
                onApply(undefined);
                setOpen(false);
              }}
            >
              Tühista
            </Button>
            <Button
              visualType="primary"
              size="small"
              onClick={() => {
                const fromStr = dateToDateRangeString(range?.from);
                const toStr = dateToDateRangeString(range?.to);
                onApply(fromStr || toStr ? { from: fromStr, to: toStr } : undefined);
                setOpen(false);
              }}
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
  const [open, setOpen] = useState(false);
  const active = (value?.length ?? 0) > 0;
  return (
    <Popover open={open} onToggle={setOpen}>
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
                setOpen(false);
              }}
            >
              Tühista
            </Button>
            <Button
              visualType="primary"
              size="small"
              onClick={() => {
                onApply(draft.length ? draft : undefined);
                setOpen(false);
              }}
            >
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

/**
 * Column filter popovers via `Table.HeaderButton` + `Popover`. Each column provides a `filterFn`
 * and stores its filter value in TanStack Table's `columnFilters` state. Filter UI varies per column:
 * text input for names, date-range fields for dates, and a checkbox list for enum values.
 */
export const Filters: Story = {
  render: function Filters() {
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
  },
};

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

/**
 * Nested rows using TanStack Table's sub-rows feature. Pass `getSubRows={(row) => row.subRows}` and
 * include a `subRows` array on any data item. Rows with children get an expand/collapse toggle
 * automatically; child rows are indented by depth level.
 */
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

/**
 * Same nested data as `CollapsibleRows`, but `expandTrigger="row"` makes a click
 * anywhere on an expandable row toggle it (Enter / Space too) — only rows that can
 * expand become clickable. The chevron renders in the neutral `default` arrow style
 * as a plain icon-only indicator rather than the bordered `secondary` button.
 */
export const CollapsibleRowsRowTrigger: Story = {
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
        id="tedi-table-collapse-row-trigger"
        data={collapsiblePeople}
        columns={columns}
        getSubRows={(row) => row.subRows}
        expandTrigger="row"
        pagination={DEFAULT_PAGINATION}
      />
    );
  },
};

/**
 * Columns hidden on narrow viewports — the secondary columns whose `id` is in `RESPONSIVE_SECONDARY_COLUMNS`
 * are toggled off below `md` and re-surfaced inside the expandable detail row.
 */
const RESPONSIVE_SECONDARY_COLUMNS: { id: keyof Person; header: string }[] = [
  { id: 'email', header: 'E-post' },
  { id: 'role', header: 'Roll' },
  { id: 'location', header: 'Asukoht' },
];

/**
 * Row checkboxes via `enableRowSelection`. A header checkbox selects/deselects all rows on the
 * current page. Read selected rows with `table.getSelectedRowModel().rows` in `onStateChange`.
 */
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

/**
 * Single-select via `selectionMode="single"`. Each row gets a radio instead of a checkbox, the
 * select-all header is omitted, and `rowSelection` holds at most one row id at a time — picking
 * a new row clears the previous selection automatically. The controlled `state.rowSelection`
 * / `onStateChange` API is unchanged, so existing consumers keep working.
 */
export const SingleSelectRows: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-single-select"
      data={people}
      columns={personColumns}
      enableRowSelection
      selectionMode="single"
      pagination={DEFAULT_PAGINATION}
    />
  ),
};

/**
 * Whole-row click via `onRowClick={(row) => ...}`. The table adds pointer cursor and hover highlight
 * automatically. Use instead of (or alongside) `enableRowSelection` when a click should navigate
 * or open a detail panel rather than toggle a checkbox.
 *
 * Pair the click handler with `activeRowId` to pin the clicked row visually — useful for
 * master-detail layouts where the row should stay highlighted while a side pane shows its
 * content. The active row paints with the same `--table-hover` surface as `:hover` but
 * survives cursor movement, and announces itself to screen readers via `aria-current="true"`.
 */
export const ClickableRows: Story = {
  render: function ClickableRows() {
    const [active, setActive] = useState<{ id: string; name: string } | null>(null);
    return (
      <>
        <Text className="margin-bottom-10">{active ? `You clicked ${active.name}` : 'Click a row to select it.'}</Text>
        <Table<Person>
          id="tedi-table-clickable"
          data={people}
          columns={personColumns}
          onRowClick={(row) => setActive({ id: row.id, name: row.original.name })}
          activeRowId={active?.id}
          pagination={DEFAULT_PAGINATION}
        />
      </>
    );
  },
};

/**
 * Alternating row background color via `striped`. Helps readability in wide or dense tables.
 */
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

interface StickyDoctor extends Doctor {
  personalId: string;
}

const stickyDoctorSeed: Omit<StickyDoctor, 'id'>[] = [
  {
    name: 'Kalle Kask',
    personalId: '49504080456',
    specialty: 'Dermatovenereoloog',
    experience: '4 a',
    location: 'Tallinn',
  },
  {
    name: 'Mari Maasikas',
    personalId: '39404080456',
    specialty: 'Kopsuarst',
    experience: '4 a',
    location: 'Tallinn',
  },
  {
    name: 'Vello Vaarikas',
    personalId: '39403080865',
    specialty: 'Kõrva-nina-kurguarst',
    experience: '4 a',
    location: 'Tallinn',
  },
];

const stickyDoctors: StickyDoctor[] = Array.from({ length: 28 }, (_, index) => ({
  ...stickyDoctorSeed[index % stickyDoctorSeed.length],
  id: String(index + 1),
}));

const stickyDoctorColumns: ColumnDef<StickyDoctor>[] = [
  {
    id: 'name',
    header: 'Arst',
    accessorKey: 'name',
    size: 280,
    cell: ({ row }) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
        {row.original.name}
        <span style={{ color: 'var(--general-text-tertiary)' }}>{row.original.personalId}</span>
      </span>
    ),
  },
  { id: 'specialty', header: 'Eriala', accessorKey: 'specialty', size: 240 },
  { id: 'experience', header: 'Tööstaaž', accessorKey: 'experience', size: 200 },
  { id: 'location', header: 'Asukoht', accessorKey: 'location', size: 200 },
  {
    id: 'actions',
    header: '',
    size: 1,
    cell: () => (
      <span style={rowActionsCellStyle}>
        <Button visualType="link" iconLeft="edit">
          Muuda
        </Button>
      </span>
    ),
  },
];

/**
 * First column stays fixed during horizontal scroll via `stickyFirstColumn`. Constrain the
 * container width so the table overflows — the sticky effect is invisible when the table fits
 * without scroll.
 */
export const StickyFirstColumn: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Table<StickyDoctor>
        id="tedi-table-sticky"
        data={stickyDoctors}
        columns={stickyDoctorColumns}
        stickyFirstColumn
        pagination={DEFAULT_PAGINATION}
      />
    </div>
  ),
};

/**
 * Header row stays pinned during vertical scroll via `stickyHeader` + `maxHeight`. The Table's
 * internal `.tedi-table__scroll` div is the sticky anchor — wrapping the Table in an external
 * scrollable container will NOT work, because `position: sticky` always resolves against the
 * nearest scrolling ancestor (always the internal div). Use the `maxHeight` prop so Table
 * applies the height constraint to that internal div instead.
 *
 * Combines with `stickyFirstColumn`: when both are on, the top-left header cell stacks above
 * both axes automatically.
 */
export const StickyHeader: Story = {
  render: () => (
    <Table<Person> id="tedi-table-sticky-header" data={people} columns={personColumns} stickyHeader maxHeight={240} />
  ),
};

/**
 * Both axes pinned: first column locked horizontally, header row locked vertically. The
 * intersection cell (top-left header) stacks above both sticky planes so it stays visible
 * regardless of scroll direction.
 */
export const StickyHeaderAndFirstColumn: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Table<StickyDoctor>
        id="tedi-table-sticky-both"
        data={stickyDoctors}
        columns={stickyDoctorColumns}
        stickyHeader
        stickyFirstColumn
        maxHeight={280}
      />
    </div>
  ),
};

/**
 * Empty-state rendering: when `data` is empty, Table falls back to the
 * `emptyState` prop. Passing an `<EmptyState>` node produces the richer
 * zero-data layout (icon + heading + description + actions) inside the table
 * body.
 */
export const WithEmptyState: Story = {
  render: () => (
    <Table<Person>
      id="tedi-table-empty-state"
      data={[]}
      columns={personColumns}
      emptyState={
        <EmptyState type="inside" icon={{ name: 'spa', color: 'tertiary' }}>
          No results found
        </EmptyState>
      }
    />
  ),
};

/**
 * Long-text columns use `<Truncate>` so the description cell collapses to a
 * single line with a "Show more" toggle. By default the toggle renders inline
 * at the end of the truncated text; pass `button={{ style: { display: 'block' } }}`
 * to drop it onto its own line below the paragraph instead.
 */
const longTextsColumns: ColumnDef<Doctor>[] = [
  baseDoctorWithDescriptionColumns[0],
  {
    id: 'description',
    header: 'Kirjeldus',
    size: 480,
    cell: () => <Truncate maxLength={LONG_TEXT_MAX_LENGTH}>{LONG_DESCRIPTION}</Truncate>,
  },
  baseDoctorWithDescriptionColumns[1],
  baseDoctorWithDescriptionColumns[2],
];

export const LongTexts: Story = {
  render: function LongTexts() {
    const editor = useEditableRows<Doctor>(doctors);

    return (
      <EditableRowsProvider value={editor}>
        <Table<Doctor>
          id="tedi-table-long-texts"
          autoResetPageIndex={false}
          data={editor.rows}
          columns={longTextsColumns}
          pagination={SHOWCASE_PAGINATION_3}
        />
      </EditableRowsProvider>
    );
  },
};

export const Actions: Story = {
  render: function Actions() {
    const columns = useMemo<ColumnDef<Doctor>[]>(
      () => [
        ...baseDoctorActionsColumns(),
        {
          id: 'actions',
          header: '',
          size: 1,
          cell: ({ row }) => (
            <span style={rowActionsCellStyle}>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    visualType="secondary"
                    size="small"
                    icon="more_vert"
                    aria-label={`Avalda ${row.original.name} valikud`}
                    onClick={() => undefined}
                  >
                    <></>
                  </Button>
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem onClick={() => undefined}>Muuda</DropdownItem>
                  <DropdownItem onClick={() => undefined}>Dubleeri</DropdownItem>
                  <DropdownItem onClick={() => undefined}>Saada e-mail</DropdownItem>
                  <DropdownItem onClick={() => undefined}>Kustuta</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </span>
          ),
        },
      ],
      []
    );

    return (
      <Table<Doctor> id="tedi-table-actions" data={doctors} columns={columns} pagination={SHOWCASE_PAGINATION_3} />
    );
  },
};

export const Custom: Story = {
  render: function Custom() {
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
          size: 1,
          cell: ({ row }) => (
            <span style={rowActionsCellStyle}>
              <Popover>
                <PopoverTrigger>
                  <InfoButton isSmall aria-label={`${row.original.name} eelvaade`} />
                </PopoverTrigger>
                <PopoverContent>
                  <VerticalSpacing size={0.5}>
                    <div style={{ fontWeight: 'var(--heading-weight)' }}>{row.original.name}</div>
                    <div style={{ color: 'var(--general-text-secondary)' }}>
                      {row.original.specialty} · {row.original.location}
                    </div>
                    <Separator color="primary" axis="horizontal" spacing={0.5} />
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <Button visualType="secondary" size="small" icon="edit" onClick={() => undefined}>
                        Muuda
                      </Button>
                      <Button visualType="primary" size="small" icon="open_in_new" onClick={() => undefined}>
                        Ava profiil
                      </Button>
                    </div>
                  </VerticalSpacing>
                </PopoverContent>
              </Popover>
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
  },
};

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
        accessorKey: 'salary',
        header: 'Salary (€)',
        meta: { align: 'right' },
        cell: (info) => (info.getValue() as number).toLocaleString('et-EE'),
        footer: (info) => {
          const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.salary, 0);
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

// ---------------------------------------------------------------------------
// Drag-and-drop reordering — fully owned by Table via `reorderableRows` /
// `reorderableColumns` boolean props. The stories below only manage the data /
// state pieces the consumer would manage in a real app.
// ---------------------------------------------------------------------------

/**
 * Drag rows by the grip handle to reorder them. The story owns the data array
 * and applies `arrayMove` on drag end — Table itself doesn't need to know.
 *
 * **Persistence (not applied in this story).** The order lives in the
 * component's local `useState`, so refreshing the page resets it. Row order is
 * owned entirely by your `data` array — Table doesn't hold a row-order slice —
 * so to persist it, serialise the reordered `rows` (or just their ids) into
 * `localStorage` on every reorder and hydrate the `useState` initial value
 * from there on mount. For server-backed data, persist the new order on the
 * server and re-derive `data` from the response on the next fetch.
 */
export const ReorderableRows: Story = {
  render: function DraggableRows() {
    const [rows, setRows] = useState<Person[]>(() => people.slice(0, 8));

    const columns = useMemo<ColumnDef<Person>[]>(
      () => [
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'role', header: 'Role', accessorKey: 'role' },
        { id: 'location', header: 'Location', accessorKey: 'location' },
      ],
      []
    );

    return (
      <VerticalSpacing size={1}>
        <Alert type="info" role="status" title="Row reordering" icon="lightbulb">
          <Text>
            Reorder by mouse (grab the <StatusBadge>≡</StatusBadge> handle) or <strong>keyboard</strong>: Tab to a
            handle, press <StatusBadge>Space</StatusBadge>/<StatusBadge>Enter</StatusBadge> to pick the row up, then{' '}
            <StatusBadge>↑</StatusBadge>/<StatusBadge>↓</StatusBadge> to move, <StatusBadge>Space</StatusBadge>/
            <StatusBadge>Enter</StatusBadge> to drop, or <StatusBadge>Esc</StatusBadge> to cancel. Each move emits{' '}
            <StatusBadge>onRowDrop</StatusBadge> with source indices — the parent applies it (e.g. with{' '}
            <StatusBadge>arrayMove</StatusBadge>) and passes the new data back. Moves are announced to screen readers
            via a live region.
          </Text>
        </Alert>
        <Table<Person>
          id="tedi-table-row-drag"
          data={rows}
          columns={columns}
          reorderableRows
          onRowDrop={({ fromIndex, toIndex }) => setRows((current) => arrayMove(current, fromIndex, toIndex))}
        />
      </VerticalSpacing>
    );
  },
};

/**
 * Reorder a column header's grip to reorder columns. The story owns
 * `state.columnOrder`; Table forwards it to TanStack's `columnOrder` state so
 * cells reshuffle without re-creating the column definitions.
 *
 * **Persistence (not applied in this story).** The order lives in local
 * `useState`, so refreshing the page resets it. To make column order survive
 * a refresh, drop the local state + `state` / `onStateChange` wiring and add
 * a single prop:
 *
 * ```tsx
 * <Table id="…" data={…} columns={…} persist={{ key: 'my-table' }} />
 * ```
 *
 * `columnOrder` is in Table's `DEFAULT_PERSISTED_KEYS`, so the persist
 * adapter writes it to `localStorage` on every change and hydrates it on
 * mount — no extra wiring needed. The same prop also covers `columnVisibility`.
 * Use `persist.include` to opt in / out of specific slices.
 */
export const ReorderableColumns: Story = {
  render: function DraggableColumns() {
    const columns = useMemo<ColumnDef<Person>[]>(
      () => [
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'email', header: 'Email', accessorKey: 'email' },
        { id: 'role', header: 'Role', accessorKey: 'role' },
        { id: 'location', header: 'Location', accessorKey: 'location' },
      ],
      []
    );

    return (
      <VerticalSpacing size={1}>
        <Alert type="info" role="status" title="Column reordering" icon="lightbulb">
          <Text>
            Reorder by mouse (reorder a header by its <StatusBadge>≡</StatusBadge> handle) or <strong>keyboard</strong>:
            Tab to a handle, <StatusBadge>Space</StatusBadge>/<StatusBadge>Enter</StatusBadge> to pick up, then{' '}
            <StatusBadge>←</StatusBadge>/<StatusBadge>→</StatusBadge> to move, <StatusBadge>Space</StatusBadge>/
            <StatusBadge>Enter</StatusBadge> to drop, or <StatusBadge>Esc</StatusBadge> to cancel. The Table owns the
            wiring and pushes the new order into TanStack&apos;s <StatusBadge>state.columnOrder</StatusBadge> (announced
            to screen readers) — combine with <StatusBadge>persist</StatusBadge> to keep the order across refreshes.
          </Text>
        </Alert>
        <Table<Person> id="tedi-table-column-drag" data={people.slice(0, 6)} columns={columns} reorderableColumns />
      </VerticalSpacing>
    );
  },
};

/**
 * `reorderableColumns` works alongside a pinned header (`stickyHeader` + `maxHeight`). Column
 * reordering is data-driven — the drop rewrites TanStack's `state.columnOrder` and the header simply
 * re-renders in the new order — so `position: sticky` doesn't interfere with the native HTML5 drag.
 * Scroll the body to confirm the header stays pinned, then drag a column header by its
 * <StatusBadge>≡</StatusBadge> handle: the order updates while the header remains fixed.
 */
export const ReorderableColumnsStickyHeader: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <Alert type="info" role="status" title="Reorder columns + sticky header" icon="lightbulb">
        <Text>
          Reorder columns by dragging a header handle while the header stays pinned during vertical scroll. The two
          features are independent — drag rewrites <StatusBadge>state.columnOrder</StatusBadge>; the sticky header is
          pure CSS.
        </Text>
      </Alert>
      <Table<Person>
        id="tedi-table-column-drag-sticky"
        data={people}
        columns={personColumns}
        reorderableColumns
        stickyHeader
        maxHeight={280}
      />
    </VerticalSpacing>
  ),
};

/**
 * Server-side pagination + sorting demo. `manualPagination` / `manualSorting`
 * tell the Table not to slice or re-order `data` locally; the parent owns
 * the current page slice and the sort, and re-derives them when state
 * changes. In a real app the `onStateChange` callback would dispatch a
 * fetch with the new page / sort and pass the response back as `data`.
 *
 * Key props:
 * - `manualPagination` / `manualSorting` — disables in-memory work
 * - `pageCount` / `rowCount` — server-known totals (the local row count is
 *   wrong because `data` only holds the current page)
 * - controlled `state` + `onStateChange` — observe page / sort changes and
 *   refetch
 */
export const ServerSide: Story = {
  render: function ServerSide() {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

    const sortedData = useMemo(() => {
      if (sorting.length === 0) return people;
      const { id, desc } = sorting[0];
      const direction = desc ? -1 : 1;
      return [...people].sort((a, b) => {
        const av = a[id as keyof Person];
        const bv = b[id as keyof Person];
        if (av === bv) return 0;
        return av > bv ? direction : -direction;
      });
    }, [sorting]);

    const pageRows = useMemo(
      () =>
        sortedData.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize),
      [sortedData, pagination]
    );

    const sortableColumns = useMemo<ColumnDef<Person>[]>(
      () =>
        personColumns.map((col) => ({
          ...col,
          header: ({ column }) => {
            const sorted = column.getIsSorted();
            const iconName = sorted === 'asc' ? 'arrow_upward' : sorted === 'desc' ? 'arrow_downward' : 'unfold_more';
            return (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {col.header as string}
                <Table.HeaderButton
                  icon={iconName}
                  selected={!!sorted}
                  aria-label={`Sort by ${col.header as string}`}
                  onClick={column.getToggleSortingHandler()}
                />
              </span>
            );
          },
        })) as ColumnDef<Person>[],
      []
    );

    return (
      <VerticalSpacing size={1}>
        <Alert type="info" role="status" title="Server-side mode" icon="lightbulb">
          <Text>
            This story simulates a server-paginated, server-sorted table. The parent owns the current page slice and the
            sort state; the Table is told <StatusBadge>manualPagination</StatusBadge> +{' '}
            <StatusBadge>manualSorting</StatusBadge> so it does not re-slice or re-sort its{' '}
            <StatusBadge>data</StatusBadge> locally.
          </Text>
          <Text modifiers="bold">Wiring it up in your app</Text>
          <pre
            style={{
              margin: 0,
              padding: 'var(--tedi-dimensions-12)',
              background: 'var(--general-surface-secondary)',
              fontSize: 'var(--body-small-regular-size)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {`const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
const [sorting, setSorting] = useState([]);

// Refetch from the server whenever pagination / sort changes.
const { data: page, total } = useServerQuery({ pagination, sorting });

<Table
  data={page.rows}                    // current page only
  columns={columns}
  manualPagination                    // disables in-memory pagination
  manualSorting                       // disables in-memory sort
  pageCount={Math.ceil(total / pagination.pageSize)}
  rowCount={total}                    // shown in the "X results" footer
  state={{ pagination, sorting }}     // controlled
  onStateChange={(next) => {
    if (next.pagination) setPagination(next.pagination);
    if (next.sorting) setSorting(next.sorting);
  }}
  pagination
/>`}
          </pre>
          <Separator axis="horizontal" spacing={1} color="secondary" />
          <Text modifiers="small" color="secondary">
            Tip: <StatusBadge>manualFiltering</StatusBadge> works the same way for column filters when you have them.
          </Text>
        </Alert>
        <Table<Person>
          id="tedi-table-server-side"
          data={pageRows}
          columns={sortableColumns}
          manualPagination
          manualSorting
          pageCount={Math.ceil(people.length / pagination.pageSize)}
          rowCount={people.length}
          state={{ pagination, sorting }}
          onStateChange={(next) => {
            if (next.pagination) setPagination(next.pagination);
            if (next.sorting !== undefined) setSorting(next.sorting);
          }}
          pagination={{ pageSize: 5, pageSizeOptions: [5, 10, 25] }}
        />
      </VerticalSpacing>
    );
  },
};

/**
 * Responsive table. The default for any wide table is **horizontal scroll** — the Table already wraps
 * itself in an `overflow-x: auto` container, so no extra props are needed for that. This story shows the
 * *opt-in* alternative: below the `md` breakpoint the secondary
 * columns are hidden (via controlled `columnVisibility`) and re-surfaced as label/value pairs inside an
 * expandable detail row (`renderSubComponent` + `getRowCanExpand`, both gated on the breakpoint). At `md`
 * and up the full table renders and the expand column disappears. Resize the preview to see the switch.
 */
export const Responsive: Story = {
  render: function Responsive() {
    const breakpoint = useBreakpoint();
    const belowMd = isBreakpointBelow(breakpoint, 'md');

    const columns = useMemo<ColumnDef<Person>[]>(
      () => [
        { id: 'name', header: 'Nimi', accessorKey: 'name' },
        { id: 'email', header: 'E-post', accessorKey: 'email' },
        { id: 'role', header: 'Roll', accessorKey: 'role' },
        { id: 'location', header: 'Asukoht', accessorKey: 'location' },
        { id: 'salary', header: 'Palk', accessorKey: 'salary' },
      ],
      []
    );

    const columnVisibility = useMemo(
      () =>
        RESPONSIVE_SECONDARY_COLUMNS.reduce<Record<string, boolean>>((acc, col) => {
          acc[col.id] = !belowMd;
          return acc;
        }, {}),
      [belowMd]
    );

    return (
      <Table<Person>
        id="tedi-table-responsive"
        data={people}
        columns={columns}
        state={{ columnVisibility }}
        getRowCanExpand={() => belowMd}
        renderSubComponent={
          belowMd
            ? (row) => (
                <VerticalSpacing size={0.5}>
                  {RESPONSIVE_SECONDARY_COLUMNS.map((col) => (
                    <TextGroup
                      key={col.id}
                      type="horizontal"
                      labelWidth="6rem"
                      label={col.header}
                      value={String(row.original[col.id])}
                    />
                  ))}
                </VerticalSpacing>
              )
            : undefined
        }
        pagination={DEFAULT_PAGINATION}
      />
    );
  },
};
