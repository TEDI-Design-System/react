import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Collapse } from '../../buttons/collapse/collapse';
import { TextField } from '../../form/textfield/textfield';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { EmptyState } from '../../notifications/empty-state';
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

const people: Person[] = [
  {
    id: '1',
    name: 'Anna Tamm',
    email: 'anna.tamm@example.ee',
    role: 'Engineer',
    location: 'Tallinn',
    salary: 4200,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jüri Kask',
    email: 'juri.kask@example.ee',
    role: 'Designer',
    location: 'Tartu',
    salary: 3800,
    status: 'active',
  },
  {
    id: '3',
    name: 'Maria Saar',
    email: 'maria.saar@example.ee',
    role: 'Product',
    location: 'Pärnu',
    salary: 4600,
    status: 'active',
  },
  {
    id: '4',
    name: 'Mart Mets',
    email: 'mart.mets@example.ee',
    role: 'Engineer',
    location: 'Tallinn',
    salary: 4100,
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Liis Lepp',
    email: 'liis.lepp@example.ee',
    role: 'Ops',
    location: 'Narva',
    salary: 3600,
    status: 'active',
  },
];

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
  render: () => <Table<Person> id="tedi-table-simple" data={people} columns={personColumns} />,
};

/**
 * Merged header cells via grouped column definitions — TanStack Table nests
 * columns under a shared header that spans every child column.
 */
export const MergedCells: Story = {
  render: () => {
    const columns: ColumnDef<Person>[] = [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      {
        id: 'work',
        header: 'Work',
        columns: [
          { id: 'role', header: 'Role', accessorKey: 'role' },
          { id: 'location', header: 'Location', accessorKey: 'location' },
        ],
      },
      {
        id: 'contact',
        header: 'Contact',
        columns: [{ id: 'email', header: 'Email', accessorKey: 'email' }],
      },
    ];
    return <Table<Person> id="tedi-table-merged" data={people} columns={columns} />;
  },
};

export const VerticalBorders: Story = {
  render: () => <Table<Person> id="tedi-table-vb" data={people} columns={personColumns} verticalBorders />,
};

/**
 * Compact variant: reduced row padding per Figma small-size tokens
 * (`table/header/padding-*-sm`, `table/data/padding-*-sm`).
 */
export const Small: Story = {
  render: () => <Table<Person> id="tedi-table-small" data={people} columns={personColumns} size="small" />,
};

export const NoOutsideBorder: Story = {
  render: () => <Table<Person> id="tedi-table-borderless" data={people} columns={personColumns} borderless />,
};

/**
 * Editable cells: the cell renderer returns a TEDI `TextField` bound to the
 * data store. The owning component holds the data source.
 */
const EditableTemplate = () => {
  const [rows, setRows] = useState(people);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      { id: 'name', header: 'Name', accessorKey: 'name' },
      {
        id: 'role',
        header: 'Role',
        accessorKey: 'role',
        cell: ({ row }) => (
          <TextField
            id={`role-${row.original.id}`}
            name={`role-${row.original.id}`}
            label={`Role for ${row.original.name}`}
            hideLabel
            size="small"
            value={row.original.role}
            onChange={(next) =>
              setRows((current) =>
                current.map((person) => (person.id === row.original.id ? { ...person, role: next } : person))
              )
            }
          />
        ),
      },
      { id: 'location', header: 'Location', accessorKey: 'location' },
    ],
    []
  );

  return <Table<Person> id="tedi-table-editable" data={rows} columns={columns} />;
};

export const EditableValues: Story = { render: () => <EditableTemplate /> };

export const Filters: Story = {
  render: () => <Table<Person> id="tedi-table-filters" data={people} columns={personColumns} enableColumnFilters />,
};

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
    return <Table<Person> id="tedi-table-collapse" data={people} columns={columns} />;
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
    return <Table<Person> id="tedi-table-collapse-inline" data={people} columns={columns} />;
  },
};

export const SelectableRows: Story = {
  render: () => <Table<Person> id="tedi-table-selectable" data={people} columns={personColumns} enableRowSelection />,
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
      />
    </>
  );
};

export const ClickableRows: Story = { render: () => <ClickableTemplate /> };

export const Striped: Story = {
  render: () => <Table<Person> id="tedi-table-striped" data={people} columns={personColumns} striped />,
};

export const StickyFirstColumn: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Table<Person> id="tedi-table-sticky" data={people} columns={personColumns} stickyFirstColumn />
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
        <EmptyState
          type="inside"
          heading="No results found"
          actions={
            <Button visualType="primary" size="small">
              Clear filters
            </Button>
          }
        >
          Try adjusting your filters or search terms to see more results.
        </EmptyState>
      }
    />
  ),
};

export const WithPagination: Story = {
  render: () => {
    // Repeat the data set so pagination has something to page through.
    const largeData = Array.from({ length: 24 }, (_, index) => {
      const base = people[index % people.length];
      return { ...base, id: String(index + 1), name: `${base.name} ${Math.floor(index / people.length) + 1}` };
    });
    return (
      <Table<Person>
        id="tedi-table-pagination"
        data={largeData}
        columns={personColumns}
        pagination={{ pageSize: 5, pageSizeOptions: [5, 10, 25] }}
      />
    );
  },
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
    return <Table<Person> id="tedi-table-footer" data={people} columns={columns} />;
  },
};

/**
 * Column-visibility toolbar example. Reuses the dropdown from the base
 * story file so consumers can see how `<Table.ColumnsMenu />` plugs into
 * `<Table.Toolbar>`.
 */
export const WithColumnsMenu: Story = {
  render: () => (
    <Table<Person> id="tedi-table-visibility" data={people} columns={personColumns}>
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
    return <Table<Person> id="tedi-table-status" data={people} columns={columns} enableRowSelection />;
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
    >
      <Table.Toolbar>
        <Table.ColumnsMenu />
      </Table.Toolbar>
    </Table>
  );
};

export const Persisted: Story = { render: () => <PersistedTemplate /> };
