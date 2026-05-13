import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef, ColumnOrderState } from '@tanstack/react-table';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import { Checkbox } from '../../form/checkbox/checkbox';
import { TextField } from '../../form/textfield/textfield';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { EmptyState } from '../../misc/empty-state';
import Separator from '../../misc/separator/separator';
import { Alert } from '../../notifications/alert/alert';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '../../overlays/dropdown';
import { Popover, PopoverContent, PopoverTrigger } from '../../overlays/popover';
import { StatusBadge, type StatusBadgeColor } from '../../tags/status-badge/status-badge';
import { Truncate } from '../truncate/truncate';
import type { TableProps } from './table';
import { Table } from './table';

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

const editRowActionsStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
};

interface EditableRows<T extends { id: string }> {
  rows: T[];
  editingId: string | null;
  draft: T | null;
  setDraft: React.Dispatch<React.SetStateAction<T | null>>;
  beginEdit: (row: T) => void;
  cancelEdit: () => void;
  commitEdit: () => void;
}

/**
 * Context that flows the editor into the table cells. Cells read the latest
 * state via context instead of taking the editor as a prop — that way the
 * `columns` array can be a module-level constant and TanStack never rebuilds
 * its column instances, which is what kept the TextField mounted across
 * keystrokes so it doesn't lose focus.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditableRowsContext = createContext<EditableRows<any> | null>(null);

function useEditor<T extends { id: string }>(): EditableRows<T> {
  const editor = useContext(EditableRowsContext);
  if (!editor) throw new Error('EditableRowsContext missing — wrap the table in <EditableRowsContext.Provider>.');
  return editor as EditableRows<T>;
}

/**
 * Tiny shared state machine for row-level inline editing. Tracks which row
 * (if any) is currently in edit mode and the draft copy of its values; commits
 * or discards back to the parent array on confirm / cancel. Reused across all
 * stories that ship a "Muuda" affordance so the button actually does something.
 */
function useEditableRows<T extends { id: string }>(initial: T[]): EditableRows<T> {
  const [rows, setRows] = useState<T[]>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<T | null>(null);

  // Read latest draft from a ref inside commitEdit so the callback identity
  // can stay stable across renders without the `draft` dep.
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

/**
 * Renders the per-row action cell: a Muuda link normally, or cancel / commit
 * buttons when this row is the one being edited.
 */
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
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        editor.beginEdit(row);
      }}
      style={editLinkStyle}
    >
      <Icon name="edit" color="brand" size={18} />
      Muuda
    </a>
  );
}

/** Cell renderer that flips to a `<TextField>` when its row is editing. */
function EditableTextCell<T extends { id: string }>({
  row,
  field,
  label,
  icon,
}: {
  row: T;
  field: keyof T & string;
  label: string;
  icon?: string;
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
      icon={icon}
      value={draftValue}
      onChange={(next) => editor.setDraft((prev: T | null) => (prev ? { ...prev, [field]: next } : prev))}
    />
  );
}

/**
 * Each cell flips into a TextField when its row is being edited; the actions column
 * swaps the Muuda link for cancel / commit buttons. The cells read editor
 * state from `EditableRowsContext`, so this array stays a stable module-level
 * constant — important for TanStack reconciliation across keystrokes.
 */
const bookingShowcaseColumns: ColumnDef<Booking>[] = [
  {
    id: 'dateRange',
    header: 'Kuupäev',
    accessorKey: 'dateRange',
    cell: ({ row }) => <EditableTextCell row={row.original} field="dateRange" label="Kuupäev" icon="calendar_today" />,
  },
  {
    id: 'hour',
    header: 'Kellaaeg',
    accessorKey: 'hour',
    cell: ({ row }) => <EditableTextCell row={row.original} field="hour" label="Kellaaeg" icon="schedule" />,
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
    cell: ({ row }) => <EditActionsCell row={row.original} />,
  },
];

/**
 * Baseline render: a single default-size booking table — same content used in
 * the `Sizes` showcase below, just on its own.
 */
export const Default: Story = {
  render: function Default() {
    const editor = useEditableRows<Booking>(bookings);
    return (
      <EditableRowsContext.Provider value={editor}>
        <Table<Booking>
          id="tedi-table-default"
          data={editor.rows}
          columns={bookingShowcaseColumns}
          pagination={SHOWCASE_PAGINATION_3}
        />
      </EditableRowsContext.Provider>
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
        <EditableRowsContext.Provider value={defaultEditor}>
          <Table<Booking>
            id="tedi-table-sizes-default"
            data={defaultEditor.rows}
            columns={bookingShowcaseColumns}
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsContext.Provider>
        <Heading element="h3">Small</Heading>
        <EditableRowsContext.Provider value={smallEditor}>
          <Table<Booking>
            id="tedi-table-sizes-small"
            data={smallEditor.rows}
            columns={bookingShowcaseColumns}
            size="small"
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsContext.Provider>
      </VerticalSpacing>
    );
  },
};

const simplePeopleColumns: ColumnDef<PersonRecord>[] = [
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
    cell: ({ row }) => <EditActionsCell row={row.original} />,
  },
];

export const Simple: Story = {
  render: function Simple() {
    const bookingEditor = useEditableRows<Booking>(bookings);
    const doctorEditor = useEditableRows<Doctor>(doctors);

    return (
      <VerticalSpacing size={1}>
        <EditableRowsContext.Provider value={bookingEditor}>
          <Table<Booking>
            id="tedi-table-simple-bookings"
            data={bookingEditor.rows}
            columns={bookingShowcaseColumns}
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsContext.Provider>
        <Table<PersonRecord>
          id="tedi-table-simple-people"
          data={filterablePeople}
          columns={simplePeopleColumns}
          pagination={SHOWCASE_PAGINATION_4}
        />
        <EditableRowsContext.Provider value={doctorEditor}>
          <Table<Doctor>
            id="tedi-table-simple-doctors"
            data={doctorEditor.rows}
            columns={simpleDoctorColumns}
            pagination={SHOWCASE_PAGINATION_3}
          />
        </EditableRowsContext.Provider>
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
  // Description cell injected per variant.
  {
    id: 'location',
    header: 'Asukoht',
    accessorKey: 'location',
    cell: ({ row }) => <EditableTextCell row={row.original} field="location" label="Asukoht" />,
  },
  {
    id: 'actions',
    header: '',
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

/**
 * Two-level header using column groups. Nest column definitions under `columns` inside a parent
 * `columnDef` — TanStack Table will render the parent as a merged header cell spanning its children.
 */
const mergedCellsColumns: ColumnDef<Booking>[] = [
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
    cell: ({ row }) => <EditableTextCell row={row.original} field="dateRange" label="Kuupäev" icon="calendar_today" />,
  },
  {
    id: 'aeg',
    header: 'Aeg',
    columns: [
      {
        id: 'hour',
        header: 'Kellaaeg',
        accessorKey: 'hour',
        cell: ({ row }) => <EditableTextCell row={row.original} field="hour" label="Kellaaeg" icon="schedule" />,
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
    cell: ({ row }) => <EditActionsCell row={row.original} />,
  },
];

export const MergedCells: Story = {
  render: function MergedCells() {
    const editor = useEditableRows<Booking>(bookings);
    return (
      <EditableRowsContext.Provider value={editor}>
        <Table<Booking>
          id="tedi-table-merged"
          verticalBorders
          data={editor.rows}
          columns={mergedCellsColumns}
          pagination={DEFAULT_PAGINATION}
        />
      </EditableRowsContext.Provider>
    );
  },
};

/**
 * Column separator lines via `verticalBorders`. Combine with `borderless` if the outer border
 * should be removed at the same time.
 */
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
      <EditableRowsContext.Provider value={editor}>
        <Table<Booking>
          id="tedi-table-editable"
          data={editor.rows}
          columns={bookingShowcaseColumns}
          pagination={DEFAULT_PAGINATION}
        />
      </EditableRowsContext.Provider>
    );
  },
};

/**
 * Client-side sorting via `Table.HeaderButton` in the header renderer. Each click cycles
 * `unfold_more → arrow_upward → arrow_downward → unfold_more`. TanStack Table handles the
 * sort state internally; no external state needed for client-side use.
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
  },
};

/**
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
 * Whole-row click via `onRowClick={(row) => ...}`. The table adds pointer cursor and hover highlight
 * automatically. Use instead of (or alongside) `enableRowSelection` when a click should navigate
 * or open a detail panel rather than toggle a checkbox.
 */
export const ClickableRows: Story = {
  render: function ClickableRows() {
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

/**
 * First column stays fixed during horizontal scroll via `stickyFirstColumn`. Constrain the
 * container width (e.g. `maxWidth: 520`) so there is something to scroll — the sticky effect
 * is invisible when the table fits without overflow.
 */
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
    <div style={{ maxWidth: 520 }}>
      <Table<Person>
        id="tedi-table-sticky-both"
        data={people}
        columns={personColumns}
        stickyHeader
        stickyFirstColumn
        maxHeight={280}
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
    cell: () => <Truncate maxLength={LONG_TEXT_MAX_LENGTH}>{LONG_DESCRIPTION}</Truncate>,
  },
  baseDoctorWithDescriptionColumns[1],
  baseDoctorWithDescriptionColumns[2],
];

export const LongTexts: Story = {
  render: function LongTexts() {
    const editor = useEditableRows<Doctor>(doctors);

    return (
      <EditableRowsContext.Provider value={editor}>
        <Table<Doctor>
          id="tedi-table-long-texts"
          data={editor.rows}
          columns={longTextsColumns}
          pagination={SHOWCASE_PAGINATION_3}
        />
      </EditableRowsContext.Provider>
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
          cell: ({ row }) => (
            <span style={rowActionsCellStyle}>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    visualType="secondary"
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
          cell: ({ row }) => (
            <span style={rowActionsCellStyle}>
              <Popover>
                <PopoverTrigger>
                  <Button
                    visualType="secondary"
                    icon="info"
                    aria-label={`${row.original.name} eelvaade`}
                    onClick={() => undefined}
                  >
                    <></>
                  </Button>
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
        header: 'Salary (€)',
        accessorKey: 'salary',
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
// Drag-and-drop reordering — uses `@dnd-kit` for the drag mechanics.
//
// Pattern (works for both rows and columns):
//   1. Wrap the Table in `<DndContext>` + `<SortableContext items={ids} />`.
//   2. Render a tiny "drag handle" element that calls `useSortable({ id })`
//      and attaches its `attributes` / `listeners` to a grip button.
//   3. In `onDragEnd`, compute the new order with `arrayMove` and either
//      reorder the data array (rows) or set `state.columnOrder` (columns).
// ---------------------------------------------------------------------------

/**
 * Drag handle cell shared by both stories. The `id` is whatever sortable
 * identifier the parent context expects (row id or column id). Listeners
 * sit on a real `<button>` for accessible keyboard / SR drag support.
 */
const DragHandle = ({ id, label }: { id: string; label: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <button
      ref={setNodeRef}
      type="button"
      aria-label={label}
      style={{
        background: 'transparent',
        border: 0,
        padding: 4,
        cursor: 'grab',
        opacity: isDragging ? 0.4 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      {...attributes}
      {...listeners}
    >
      <Icon name="drag_indicator" size={18} color="secondary" />
    </button>
  );
};

/**
 * Drag rows by the grip handle to reorder them. The story owns the data array
 * and applies `arrayMove` on drag end — Table itself doesn't need to know.
 *
 * **Persistence (not applied in this story).** The order lives in the
 * component's local `useState`, so refreshing the page resets it. TanStack
 * has no native rowOrder, so Table can't auto-persist the visual order on
 * your behalf — you have two options:
 *
 * 1. **Persist the data array yourself**: serialise the reordered `rows`
 *    array (or just the ids) into `localStorage` on every drag-end and
 *    hydrate the `useState` initial value from there on mount.
 * 2. **Use Table's `rowOrder` state slice**: `state.rowOrder` is in Table's
 *    `DEFAULT_PERSISTED_KEYS`, so passing `persist={{ key: '…' }}` writes
 *    the list of ids to `localStorage` automatically. On mount, read it
 *    back (via `defaultState.rowOrder`) and physically reorder your `data`
 *    array before passing it to `<Table>`. Table itself only stores the
 *    list — your component still owns the data shape.
 *
 * For server-backed data the same applies: persist the new order ids on the
 * server (or in `rowOrder`) and re-derive `data` from the response on the
 * next fetch.
 */
export const DraggableRows: Story = {
  render: function DraggableRows() {
    // Story owns its own reorderable copy of `people` so drag-end can mutate it.
    const [rows, setRows] = useState<Person[]>(() => people.slice(0, 8));
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const columns = useMemo<ColumnDef<Person>[]>(
      () => [
        {
          id: 'drag',
          header: '',
          size: 40,
          enableSorting: false,
          enableHiding: false,
          cell: ({ row }) => <DragHandle id={row.original.id} label={`Drag row ${row.original.name}`} />,
        },
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'role', header: 'Role', accessorKey: 'role' },
        { id: 'location', header: 'Location', accessorKey: 'location' },
      ],
      []
    );

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      setRows((current) => {
        const oldIndex = current.findIndex((r) => r.id === active.id);
        const newIndex = current.findIndex((r) => r.id === over.id);
        if (oldIndex < 0 || newIndex < 0) return current;
        return arrayMove(current, oldIndex, newIndex);
      });
    };

    return (
      <VerticalSpacing size={1}>
        <Alert type="info" role="status" title="Row reordering" icon="lightbulb">
          <Text>
            Grab the <StatusBadge>≡</StatusBadge> handle on any row to reorder. Keyboard users: focus a handle and press
            Space to lift, arrows to move, Space to drop. The parent component owns the data order and updates it on{' '}
            <StatusBadge>onDragEnd</StatusBadge>.
          </Text>
        </Alert>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
            <Table<Person> id="tedi-table-row-drag" data={rows} columns={columns} />
          </SortableContext>
        </DndContext>
      </VerticalSpacing>
    );
  },
};

/**
 * Drag a column header's grip to reorder columns. The story owns
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
 * mount — no extra wiring needed. The same prop covers `columnVisibility`,
 * `rowOrder` (ids only — see DraggableRows for the caveat), and
 * `columnSizing`. Use `persist.include` to opt in / out of specific slices.
 */
export const DraggableColumns: Story = {
  render: function DraggableColumns() {
    const baseColumns = useMemo<ColumnDef<Person>[]>(
      () => [
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'email', header: 'Email', accessorKey: 'email' },
        { id: 'role', header: 'Role', accessorKey: 'role' },
        { id: 'location', header: 'Location', accessorKey: 'location' },
      ],
      []
    );

    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(() =>
      baseColumns.map((column) => column.id as string)
    );
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Wrap each header in a drag handle so the column can be picked up from the
    // header cell itself. We re-derive the columns array whenever `columnOrder`
    // changes so the handle's id matches the column we're dragging.
    const columns = useMemo<ColumnDef<Person>[]>(
      () =>
        baseColumns.map((column) => ({
          ...column,
          header: ({ column: ctxColumn }) => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <DragHandle id={ctxColumn.id} label={`Drag column ${String(column.header)}`} />
              {column.header as string}
            </span>
          ),
        })) as ColumnDef<Person>[],
      [baseColumns]
    );

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      setColumnOrder((current) => {
        const oldIndex = current.indexOf(active.id as string);
        const newIndex = current.indexOf(over.id as string);
        if (oldIndex < 0 || newIndex < 0) return current;
        return arrayMove(current, oldIndex, newIndex);
      });
    };

    return (
      <VerticalSpacing size={1}>
        <Alert type="info" role="status" title="Column reordering" icon="lightbulb">
          <Text>
            Drag a column header by its <StatusBadge>≡</StatusBadge> handle to reorder. Column order lives on{' '}
            <StatusBadge>state.columnOrder</StatusBadge>; Table forwards it to TanStack so the cells re-render in the
            new order automatically.
          </Text>
        </Alert>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
            <Table<Person>
              id="tedi-table-column-drag"
              data={people.slice(0, 6)}
              columns={columns}
              state={{ columnOrder }}
              onStateChange={(next) => {
                if (next.columnOrder) setColumnOrder(next.columnOrder);
              }}
            />
          </SortableContext>
        </DndContext>
      </VerticalSpacing>
    );
  },
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
