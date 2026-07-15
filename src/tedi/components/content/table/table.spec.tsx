import type { ColumnDef } from '@tanstack/react-table';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';

import type { TableState } from './table';
import { groupRowSpan, Table } from './table';
import { useTableContext } from './table-context';

import '@testing-library/jest-dom';

jest.mock('../../../providers/printing-provider/printing-provider', () => ({
  PrintingProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePrint: jest.fn().mockReturnValue(false),
}));

// `Pagination` (rendered inside Table) renders different chrome below `md`
// (page-jump Select) than at `md`+ (numbered list). The hook is mocked to
// 'lg' so the existing assertions on the numbered list keep working;
// breakpoint-specific behaviour is covered by Pagination's own tests.
jest.mock('../../../helpers', () => ({
  useBreakpoint: () => 'lg',
  isBreakpointBelow: () => false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useBreakpointProps: () => ({ getCurrentBreakpointProps: (props: any) => ({ ...props }) }),
}));

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string, ...args: unknown[]) => {
      switch (key) {
        case 'pagination.title':
          return 'Pagination';
        case 'pagination.prev-page':
          return 'Previous page';
        case 'pagination.next-page':
          return 'Next page';
        case 'pagination.page': {
          const [page, isCurrent] = args as [number, boolean];
          return isCurrent ? `Current page, page ${page}` : `Go to page ${page}`;
        }
        case 'pagination.results': {
          const [count] = args as [number];
          return `${count} ${count === 1 ? 'result' : 'results'}`;
        }
        case 'pagination.page-size':
          return 'Page size';
        case 'table.filter-input': {
          const [columnLabel] = args as [string | undefined];
          return `Filter ${columnLabel ?? 'column'}`.trim();
        }
        case 'table.row-details':
          return 'Row details';
        case 'table.drag-column': {
          const [columnLabel] = args as [string];
          return `Drag column ${columnLabel}`;
        }
        case 'table.drag-row':
          return 'Drag row';
        default:
          return key;
      }
    },
  }),
}));

interface Person {
  id: string;
  name: string;
  role: string;
}

const data: Person[] = [
  { id: '1', name: 'Anna', role: 'Engineer' },
  { id: '2', name: 'Jüri', role: 'Designer' },
];

const columns: ColumnDef<Person>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
];

describe('Table', () => {
  it('renders the column headers and row data', () => {
    render(<Table<Person> id="t" data={data} columns={columns} />);

    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Anna' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Designer' })).toBeInTheDocument();
  });

  it('scopes the th accessible name to the column label even when the header renders extra controls', () => {
    const customColumns: ColumnDef<Person>[] = [
      {
        id: 'name',
        accessorKey: 'name',
        meta: { label: 'Name' },
        header: () => (
          <span>
            Name
            <button type="button" aria-label="Sort by Name">
              ▲
            </button>
          </span>
        ),
      },
      { id: 'role', header: 'Role', accessorKey: 'role' },
    ];

    render(<Table<Person> id="t-aname" data={data} columns={customColumns} />);

    // The th's accessible name must be just "Name" — not "Name Sort by Name" —
    // so JAWS doesn't read the sort button label when announcing body cells.
    const nameHeader = screen.getByRole('columnheader', { name: 'Name' });
    expect(nameHeader).toHaveAttribute('aria-label', 'Name');
  });

  it('falls back the leaf header accessible name to the column id when no label is provided', () => {
    const customColumns: ColumnDef<Person>[] = [
      {
        id: 'name',
        accessorKey: 'name',
        header: () => (
          <span>
            Name
            <button type="button" aria-label="Sort by Name">
              ▲
            </button>
          </span>
        ),
      },
      { id: 'role', header: 'Role', accessorKey: 'role' },
    ];

    render(<Table<Person> id="t-fallback" data={data} columns={customColumns} />);

    const nameHeader = screen.getByRole('columnheader', { name: 'name' });
    expect(nameHeader).toHaveAttribute('aria-label', 'name');
  });

  it('renders the empty state when data is empty', () => {
    render(<Table<Person> id="t-empty" data={[]} columns={columns} emptyState="Nothing here" />);

    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('wraps the empty state in a live region when emptyStateRole is set', () => {
    const { rerender } = render(
      <Table<Person> id="t-empty-status" data={[]} columns={columns} emptyState="No results" emptyStateRole="status" />
    );

    expect(screen.getByRole('status')).toHaveTextContent('No results');

    rerender(
      <Table<Person> id="t-empty-status" data={[]} columns={columns} emptyState="No results" emptyStateRole="alert" />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('No results');
  });

  it('omits the live-region wrapper when emptyStateRole is not set', () => {
    render(<Table<Person> id="t-empty-plain" data={[]} columns={columns} emptyState="Nothing here" />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('applies the small size class when size="small"', () => {
    const { container } = render(<Table<Person> id="t-sm" data={data} columns={columns} size="small" />);
    const root = container.querySelector('[data-name="tedi-table"]');
    expect(root?.className).toMatch(/--small/);
  });

  it('renders a caption when provided', () => {
    render(<Table<Person> id="t-cap" data={data} columns={columns} caption="All people" />);
    expect(screen.getByText('All people').tagName).toBe('CAPTION');
  });

  it('hides a column via defaultState.columnVisibility', () => {
    render(
      <Table<Person> id="t-hidden" data={data} columns={columns} defaultState={{ columnVisibility: { role: false } }} />
    );

    expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  });

  describe('ColumnsMenu', () => {
    it('toggles column visibility through the menu', () => {
      render(
        <Table<Person> id="t-menu" data={data} columns={columns}>
          <Table.Toolbar>
            <Table.ColumnsMenu />
          </Table.Toolbar>
        </Table>
      );

      fireEvent.click(screen.getByRole('button', { name: /Columns/i }));
      const roleCheckbox = screen.getByRole('checkbox', { name: 'Role' }) as HTMLInputElement;

      expect(roleCheckbox.checked).toBe(true);

      fireEvent.click(roleCheckbox);
      expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();
      expect(roleCheckbox.checked).toBe(false);

      fireEvent.click(roleCheckbox);
      expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
      expect(roleCheckbox.checked).toBe(true);
    });

    it('prevents hiding the last visible column', () => {
      render(
        <Table<Person>
          id="t-menu-last"
          data={data}
          columns={columns}
          defaultState={{ columnVisibility: { role: false } }}
        >
          <Table.Toolbar>
            <Table.ColumnsMenu />
          </Table.Toolbar>
        </Table>
      );

      fireEvent.click(screen.getByRole('button', { name: /Columns/i }));
      expect(screen.getByRole('checkbox', { name: 'Name' })).toBeDisabled();
    });

    it('accepts a custom trigger label', () => {
      render(
        <Table<Person> id="t-menu-label" data={data} columns={columns}>
          <Table.Toolbar>
            <Table.ColumnsMenu triggerLabel="Manage columns" />
          </Table.Toolbar>
        </Table>
      );

      expect(screen.getByRole('button', { name: /Manage columns/i })).toBeInTheDocument();
    });

    it('throws when rendered outside of <Table>', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      expect(() => render(<Table.ColumnsMenu />)).toThrow('TableContext missing');
      spy.mockRestore();
    });
  });

  describe('state integration', () => {
    it('reports state changes through onStateChange', () => {
      const onStateChange = jest.fn();
      render(
        <Table<Person> id="t-ctrl" data={data} columns={columns} onStateChange={onStateChange}>
          <Table.Toolbar>
            <Table.ColumnsMenu />
          </Table.Toolbar>
        </Table>
      );

      fireEvent.click(screen.getByRole('button', { name: /Columns/i }));
      fireEvent.click(screen.getByRole('checkbox', { name: 'Role' }));

      expect(onStateChange).toHaveBeenCalled();
      // The column ends up hidden; assert the last-reported state reflects that.
      expect(onStateChange.mock.calls.at(-1)?.[0]).toEqual(
        expect.objectContaining({ columnVisibility: { role: false } })
      );
      expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();
    });

    it('respects fully controlled state', () => {
      const Wrapper = () => {
        const [state, setState] = useState<TableState>({ columnVisibility: { role: false } });
        return (
          <>
            <button type="button" onClick={() => setState({ columnVisibility: {} })}>
              reveal-role
            </button>
            <Table<Person>
              id="t-fully-controlled"
              data={data}
              columns={columns}
              state={state}
              onStateChange={setState}
            />
          </>
        );
      };

      render(<Wrapper />);
      expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'reveal-role' }));
      expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    });

    it('reports the new pageIndex through onStateChange when pagination is controlled (server-side mode)', () => {
      const ServerSideWrapper = () => {
        const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 1 });
        return (
          <Table<Person>
            id="t-server-side"
            data={data.slice(pagination.pageIndex, pagination.pageIndex + pagination.pageSize)}
            columns={columns}
            manualPagination
            pageCount={data.length}
            rowCount={data.length}
            state={{ pagination }}
            onStateChange={(next) => {
              if (next.pagination) setPagination(next.pagination);
            }}
            pagination={{ pageSize: 1, pageSizeOptions: [1, 2] }}
          />
        );
      };

      render(<ServerSideWrapper />);
      expect(screen.getByRole('cell', { name: 'Anna' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Jüri' })).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Go to page 2/i }));

      expect(screen.queryByRole('cell', { name: 'Anna' })).not.toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Jüri' })).toBeInTheDocument();
    });

    // Mirrors the editable stories: a state-held data array, mutated in place
    // when the user "saves" a row (new array reference, same row count).
    const EditableHarness = ({ autoResetPageIndex }: { autoResetPageIndex?: boolean }) => {
      const [rows, setRows] = useState<Person[]>([
        { id: '1', name: 'Anna', role: 'Engineer' },
        { id: '2', name: 'Jüri', role: 'Designer' },
      ]);
      return (
        <>
          <button
            type="button"
            onClick={() => setRows((prev) => prev.map((r) => (r.id === '2' ? { ...r, role: 'Lead Designer' } : r)))}
          >
            mutate data
          </button>
          <Table<Person>
            id="t-autoreset"
            data={rows}
            columns={columns}
            autoResetPageIndex={autoResetPageIndex}
            pagination={{ pageSize: 1, pageSizeOptions: [1, 2] }}
          />
        </>
      );
    };

    it('keeps the current page across data changes when autoResetPageIndex is false', () => {
      render(<EditableHarness autoResetPageIndex={false} />);

      fireEvent.click(screen.getByRole('button', { name: /Go to page 2/i }));
      expect(screen.getByRole('cell', { name: 'Jüri' })).toBeInTheDocument();

      // Same save, but the user stays on page 2 with the saved value.
      fireEvent.click(screen.getByRole('button', { name: 'mutate data' }));

      expect(screen.getByRole('cell', { name: 'Lead Designer' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Anna' })).not.toBeInTheDocument();
    });

    it('resets the scroll container to the top on page change', () => {
      const { container } = render(
        <Table<Person>
          id="t-scroll-reset"
          data={data}
          columns={columns}
          maxHeight={200}
          pagination={{ pageSize: 1, pageSizeOptions: [1, 2] }}
        />
      );

      const scroll = container.querySelector('.tedi-table__scroll') as HTMLElement;
      scroll.scrollTop = 120;
      expect(scroll.scrollTop).toBe(120);

      fireEvent.click(screen.getByRole('button', { name: /Go to page 2/i }));

      expect(scroll.scrollTop).toBe(0);
    });
  });

  describe('persistence', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    it('hydrates state from localStorage on mount', () => {
      window.localStorage.setItem('persist-hydrate', JSON.stringify({ columnVisibility: { role: false } }));

      render(<Table<Person> id="t-hyd" data={data} columns={columns} persist={{ key: 'persist-hydrate' }} />);

      expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();
    });

    it('writes state changes back to localStorage', () => {
      render(
        <Table<Person> id="t-write" data={data} columns={columns} persist={{ key: 'persist-write' }}>
          <Table.Toolbar>
            <Table.ColumnsMenu />
          </Table.Toolbar>
        </Table>
      );

      fireEvent.click(screen.getByRole('button', { name: /Columns/i }));
      fireEvent.click(screen.getByRole('checkbox', { name: 'Role' }));

      const stored = window.localStorage.getItem('persist-write');
      expect(stored).not.toBeNull();
      expect(JSON.parse(stored as string)).toEqual({ columnVisibility: { role: false } });
    });

    it('ignores non-included keys when include is provided', () => {
      render(
        <Table<Person>
          id="t-incl"
          data={data}
          columns={columns}
          persist={{ key: 'persist-include', include: ['columnOrder'] }}
        >
          <Table.Toolbar>
            <Table.ColumnsMenu />
          </Table.Toolbar>
        </Table>
      );

      fireEvent.click(screen.getByRole('button', { name: /Columns/i }));
      fireEvent.click(screen.getByRole('checkbox', { name: 'Role' }));

      const stored = window.localStorage.getItem('persist-include');
      expect(JSON.parse(stored as string)).toEqual({});
    });

    it('falls back gracefully when stored JSON is corrupt', () => {
      window.localStorage.setItem('persist-corrupt', '{not json');
      expect(() =>
        render(<Table<Person> id="t-corr" data={data} columns={columns} persist={{ key: 'persist-corrupt' }} />)
      ).not.toThrow();
      expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    });

    it('falls back gracefully when window.localStorage access throws', () => {
      const original = Object.getOwnPropertyDescriptor(window, 'localStorage');
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new Error('blocked');
        },
      });

      try {
        expect(() =>
          render(<Table<Person> id="t-block" data={data} columns={columns} persist={{ key: 'persist-block' }} />)
        ).not.toThrow();
        expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
      } finally {
        if (original) {
          Object.defineProperty(window, 'localStorage', original);
        } else {
          // jsdom may define localStorage on the prototype rather than as an
          // own property — in that case `getOwnPropertyDescriptor` returns
          // `undefined` and we must delete our shadowing throwing getter so
          // the prototype's working implementation is exposed again.
          delete (window as { localStorage?: unknown }).localStorage;
        }
      }
    });

    it('uses the supplied storage option when provided', () => {
      const fakeStorage: Storage = {
        length: 0,
        clear: jest.fn(),
        key: jest.fn(),
        getItem: jest.fn().mockReturnValue(JSON.stringify({ columnVisibility: { role: false } })),
        removeItem: jest.fn(),
        setItem: jest.fn(),
      };
      render(
        <Table<Person>
          id="t-custom-storage"
          data={data}
          columns={columns}
          persist={{ key: 'persist-custom', storage: fakeStorage }}
        />
      );
      expect(fakeStorage.getItem).toHaveBeenCalledWith('persist-custom');
      expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();
    });
  });

  describe('variant classes', () => {
    const flags = [
      ['striped', '--striped'],
      ['verticalBorders', '--vertical-borders'],
      ['borderless', '--borderless'],
      ['stickyFirstColumn', '--sticky-first-column'],
      ['stickyHeader', '--sticky-header'],
    ] as const;

    it.each(flags)('applies the %s class when the matching prop is true', (prop, fragment) => {
      const { container } = render(
        <Table<Person> id={`t-${prop}`} data={data} columns={columns} {...{ [prop]: true }} />
      );
      expect(container.querySelector('[data-name="tedi-table"]')?.className).toContain(fragment);
    });
  });

  describe('clickable rows', () => {
    it('fires onRowClick and marks the row role=button + tabIndex=0', () => {
      const onRowClick = jest.fn();
      render(<Table<Person> id="t-click" data={data} columns={columns} onRowClick={onRowClick} />);

      const rows = screen.getAllByRole('button');
      expect(rows).toHaveLength(data.length);
      expect(rows[0]).toHaveAttribute('tabIndex', '0');

      fireEvent.click(rows[0]);
      expect(onRowClick).toHaveBeenCalledTimes(1);
      expect(onRowClick.mock.calls[0][0].original).toEqual(data[0]);
    });

    it('activates on Enter/Space keydown', () => {
      const onRowClick = jest.fn();
      render(<Table<Person> id="t-click-kb" data={data} columns={columns} onRowClick={onRowClick} />);

      const firstRow = screen.getAllByRole('button')[0];
      fireEvent.keyDown(firstRow, { key: 'Enter' });
      fireEvent.keyDown(firstRow, { key: ' ' });
      fireEvent.keyDown(firstRow, { key: 'Escape' });

      expect(onRowClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('row selection', () => {
    it('auto-injects a select column and toggles row selection', () => {
      render(<Table<Person> id="t-sel" data={data} columns={columns} enableRowSelection />);

      const checkboxes = screen.getAllByRole('checkbox');
      // 1 header + data.length rows
      expect(checkboxes).toHaveLength(data.length + 1);

      fireEvent.click(checkboxes[1]);
      expect(checkboxes[1]).toBeChecked();
    });

    it('select-all toggles every row', () => {
      render(<Table<Person> id="t-sel-all" data={data} columns={columns} enableRowSelection />);

      const [selectAll, ...rowBoxes] = screen.getAllByRole('checkbox');
      fireEvent.click(selectAll);

      rowBoxes.forEach((box) => expect(box).toBeChecked());
    });

    it('paints the `--selected` background on selected rows by default', () => {
      const { container } = render(<Table<Person> id="t-sel-bg" data={data} columns={columns} enableRowSelection />);
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);
      expect(container.querySelector('.tedi-table__row--selected')).toBeInTheDocument();
    });

    it('skips the selected-row background when `highlightSelectedRows` is false (checkbox still tracks state)', () => {
      const { container } = render(
        <Table<Person>
          id="t-sel-no-bg"
          data={data}
          columns={columns}
          enableRowSelection
          highlightSelectedRows={false}
        />
      );
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);
      expect(checkboxes[1]).toBeChecked();
      expect(container.querySelector('.tedi-table__row--selected')).not.toBeInTheDocument();
    });

    it('renders radios and omits the select-all header when selectionMode is "single"', () => {
      render(
        <Table<Person> id="t-sel-single" data={data} columns={columns} enableRowSelection selectionMode="single" />
      );

      expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
      const radios = screen.getAllByRole('radio');
      // 1 radio per data row, no select-all in the header
      expect(radios).toHaveLength(data.length);
    });

    it('limits selection to one row at a time in single mode', () => {
      const onStateChange = jest.fn();
      render(
        <Table<Person>
          id="t-sel-single-one"
          data={data}
          columns={columns}
          enableRowSelection
          selectionMode="single"
          onStateChange={onStateChange}
        />
      );

      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[0]);
      expect(radios[0]).toBeChecked();

      fireEvent.click(radios[1]);
      expect(radios[1]).toBeChecked();
      expect(radios[0]).not.toBeChecked();

      const lastCall = onStateChange.mock.calls.at(-1)?.[0];
      expect(Object.keys(lastCall?.rowSelection ?? {})).toHaveLength(1);
    });
  });

  describe('expansion', () => {
    it('renders the expand column + sub-component when renderSubComponent is provided', () => {
      render(
        <Table<Person>
          id="t-exp"
          data={data}
          columns={columns}
          renderSubComponent={(row) => <span>details for {row.original.name}</span>}
        />
      );

      // Without a `LabelProvider` wrapping the render, `getLabel` returns the
      // i18n key verbatim, which is what the accessible name resolves to.
      const toggle = screen.getAllByRole('button', { name: /table\.expand-row/i })[0];
      fireEvent.click(toggle);

      expect(screen.getByText(/details for Anna/)).toBeInTheDocument();

      const collapse = screen.getByRole('button', { name: /table\.collapse-row/i });
      fireEvent.click(collapse);
      expect(screen.queryByText(/details for Anna/)).not.toBeInTheDocument();
    });
  });

  describe('expandTrigger="row"', () => {
    interface NestedPerson extends Person {
      subRows?: NestedPerson[];
    }
    const nested: NestedPerson[] = [
      { id: '1', name: 'Anna', role: 'Engineer', subRows: [{ id: '1-1', name: 'Anna Jr', role: 'Intern' }] },
      { id: '2', name: 'Jüri', role: 'Designer' },
    ];

    it('toggles an expandable row when the row body is clicked', () => {
      render(
        <Table<NestedPerson>
          id="t-exp-row"
          data={nested}
          columns={columns}
          getSubRows={(row) => row.subRows}
          expandTrigger="row"
        />
      );

      expect(screen.queryByRole('cell', { name: 'Anna Jr' })).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('cell', { name: 'Anna' }));
      expect(screen.getByRole('cell', { name: 'Anna Jr' })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('cell', { name: 'Anna' }));
      expect(screen.queryByRole('cell', { name: 'Anna Jr' })).not.toBeInTheDocument();
    });

    it('toggles via Enter / Space when the row is focused', () => {
      render(
        <Table<NestedPerson>
          id="t-exp-row-kbd"
          data={nested}
          columns={columns}
          getSubRows={(row) => row.subRows}
          expandTrigger="row"
        />
      );

      const annaRow = screen.getByRole('cell', { name: 'Anna' }).closest('tr') as HTMLTableRowElement;
      fireEvent.keyDown(annaRow, { key: 'Enter' });
      expect(screen.getByRole('cell', { name: 'Anna Jr' })).toBeInTheDocument();
      fireEvent.keyDown(annaRow, { key: ' ' });
      expect(screen.queryByRole('cell', { name: 'Anna Jr' })).not.toBeInTheDocument();
    });

    it('makes only expandable rows interactive', () => {
      render(
        <Table<NestedPerson>
          id="t-exp-row-roles"
          data={nested}
          columns={columns}
          getSubRows={(row) => row.subRows}
          expandTrigger="row"
        />
      );

      // Anna can expand → her row is exposed as a button; Jüri cannot, so his row stays a plain row.
      expect(screen.getByRole('cell', { name: 'Anna' }).closest('tr')).toHaveAttribute('role', 'button');
      expect(screen.getByRole('cell', { name: 'Jüri' }).closest('tr')).not.toHaveAttribute('role', 'button');
    });
  });

  describe('paginateExpandedRows', () => {
    interface NestedPerson extends Person {
      subRows?: NestedPerson[];
    }
    // Page size 2: page 1 holds the top-level Alpha + Bravo, page 2 holds Charlie.
    // Alpha has two children.
    const nested: NestedPerson[] = [
      {
        id: 'A',
        name: 'Alpha',
        role: 'R',
        subRows: [
          { id: 'A1', name: 'Alpha-1', role: 'R' },
          { id: 'A2', name: 'Alpha-2', role: 'R' },
        ],
      },
      { id: 'B', name: 'Bravo', role: 'R' },
      { id: 'C', name: 'Charlie', role: 'R' },
    ];

    it('keeps a parent’s expanded children on its page without pushing siblings off (default)', () => {
      render(
        <Table<NestedPerson>
          id="t-pag-exp-default"
          data={nested}
          columns={columns}
          getSubRows={(row) => row.subRows}
          pagination={{ pageSize: 2, pageSizeOptions: [2, 5] }}
        />
      );

      expect(screen.getByRole('cell', { name: 'Alpha' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Bravo' })).toBeInTheDocument();

      fireEvent.click(screen.getAllByRole('button', { name: /table\.expand-row/i })[0]);

      // Both children render on the same page and Bravo is NOT pushed to page 2.
      expect(screen.getByRole('cell', { name: 'Alpha-1' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Alpha-2' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Bravo' })).toBeInTheDocument();
    });

    it('splits children across pages when paginateExpandedRows is true (TanStack default)', () => {
      render(
        <Table<NestedPerson>
          id="t-pag-exp-true"
          data={nested}
          columns={columns}
          getSubRows={(row) => row.subRows}
          paginateExpandedRows
          pagination={{ pageSize: 2, pageSizeOptions: [2, 5] }}
        />
      );

      fireEvent.click(screen.getAllByRole('button', { name: /table\.expand-row/i })[0]);

      // Children now occupy page slots: only the first child fits, the second
      // child and Bravo are pushed to page 2.
      expect(screen.getByRole('cell', { name: 'Alpha-1' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Alpha-2' })).not.toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Bravo' })).not.toBeInTheDocument();
    });
  });

  describe('column filters', () => {
    it('filters rows based on the per-column filter input', () => {
      render(<Table<Person> id="t-filter" data={data} columns={columns} enableColumnFilters />);

      expect(screen.getByRole('cell', { name: 'Anna' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Jüri' })).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText('Filter Name'), { target: { value: 'Anna' } });

      expect(screen.getByRole('cell', { name: 'Anna' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Jüri' })).not.toBeInTheDocument();
    });

    it('forwards meta.filterProps (e.g. maxLength) to the built-in column filter input', () => {
      const filterColumns: ColumnDef<Person>[] = [
        { id: 'name', header: 'Name', accessorKey: 'name', meta: { filterProps: { input: { maxLength: 40 } } } },
        { id: 'role', header: 'Role', accessorKey: 'role' },
      ];
      render(<Table<Person> id="t-filter-props" data={data} columns={filterColumns} enableColumnFilters />);

      expect(screen.getByLabelText('Filter Name')).toHaveAttribute('maxlength', '40');
      expect(screen.getByLabelText('Filter Name')).toBeInTheDocument();
    });
  });

  describe('footer', () => {
    it('renders a tfoot when any column defines footer', () => {
      const withFooter: typeof columns = [
        { id: 'name', header: 'Name', accessorKey: 'name', footer: 'Total' },
        { id: 'role', header: 'Role', accessorKey: 'role' },
      ];
      render(<Table<Person> id="t-foot" data={data} columns={withFooter} />);

      const foot = document.querySelector('tfoot');
      expect(foot).toBeInTheDocument();
      expect(foot).toHaveTextContent('Total');
    });

    it('omits the tfoot entirely when no column defines footer', () => {
      render(<Table<Person> id="t-nofoot" data={data} columns={columns} />);
      expect(document.querySelector('tfoot')).not.toBeInTheDocument();
    });
  });

  describe('pagination', () => {
    const many: Person[] = Array.from({ length: 7 }, (_, index) => ({
      id: String(index + 1),
      name: `Person ${index + 1}`,
      role: 'Tester',
    }));

    it('renders the pagination bar with the next button and current page marker', () => {
      render(<Table<Person> id="t-page" data={many} columns={columns} pagination={{ pageSize: 3 }} />);

      expect(screen.getByRole('navigation', { name: /Pagination/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Current page, page 1/i })).toHaveAttribute('aria-current', 'page');
      // The Table does not set `showPrevNextButtons`, so the disabled Previous arrow is
      // dropped on the first page (compact default); only the enabled Next arrow renders.
      expect(screen.queryByRole('button', { name: /Previous page/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Next page/i })).toBeEnabled();
      expect(screen.getByText('7 results')).toBeInTheDocument();
    });

    it('navigates forward + backward between pages', () => {
      render(<Table<Person> id="t-page-nav" data={many} columns={columns} pagination={{ pageSize: 3 }} />);

      expect(screen.getByRole('cell', { name: 'Person 1' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Next page/i }));
      expect(screen.getByRole('button', { name: /Current page, page 2/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Person 4' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Person 1' })).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Previous page/i }));
      expect(screen.getByRole('button', { name: /Current page, page 1/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Person 1' })).toBeInTheDocument();
    });

    it('changes page size via the selector and keeps the new page in the viewport', async () => {
      render(
        <Table<Person>
          id="t-page-size"
          data={many}
          columns={columns}
          pagination={{ pageSize: 3, pageSizeOptions: [3, 5] }}
        />
      );

      const combobox = screen.getByRole('combobox', { name: /Page size/i });

      await act(async () => {
        combobox.focus();
        fireEvent.keyDown(combobox, { key: 'ArrowDown', code: 'ArrowDown' });
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      fireEvent.click(screen.getByText('5'));

      expect(screen.getByRole('cell', { name: 'Person 5' })).toBeInTheDocument();
    });

    it('hides the page-size selector when pageSizeOptions is false', () => {
      const { container } = render(
        <Table<Person>
          id="t-page-no-select"
          data={many}
          columns={columns}
          pagination={{ pageSize: 3, pageSizeOptions: false }}
        />
      );

      // The page-jump Select (mobile collapse) is always in the DOM but
      // hidden via CSS at desktop widths, so target the page-size select
      // directly by its id prefix.
      expect(container.querySelector('[id^="tedi-pagination-page-size-"]')).not.toBeInTheDocument();
    });

    it('omits the pagination bar when pagination is not enabled', () => {
      render(<Table<Person> id="t-no-page" data={data} columns={columns} />);
      expect(screen.queryByRole('navigation', { name: /Pagination/i })).not.toBeInTheDocument();
    });
  });

  describe('server-side mode', () => {
    it('uses the supplied pageCount and rowCount instead of local row math', () => {
      // Two rows on the current page, server says there are 50 total —
      // local math would compute 1 page / 2 results, but the manual props
      // override.
      render(
        <Table<Person>
          id="t-manual"
          data={data}
          columns={columns}
          pagination={{ pageSize: 10, pageSizeOptions: false }}
          manualPagination
          pageCount={5}
          rowCount={50}
        />
      );

      // The "results" total in the pagination footer should reflect the
      // server-supplied rowCount (50), not the local 2-row count.
      expect(screen.getByText(/50/)).toBeInTheDocument();
    });

    it('does not re-sort the rows locally when manualSorting is true', () => {
      // Pass rows already in the order the "server" returned them (Charlie,
      // Alice, Bob). With local sorting they would be re-ordered when sort
      // state changes; with manualSorting they stay as-is.
      const orderedData: Person[] = [
        { id: '1', name: 'Charlie', role: 'Engineer' },
        { id: '2', name: 'Alice', role: 'Engineer' },
        { id: '3', name: 'Bob', role: 'Engineer' },
      ];

      render(
        <Table<Person>
          id="t-manual-sort"
          data={orderedData}
          columns={[{ id: 'name', header: 'Name', accessorKey: 'name' }]}
          manualSorting
          state={{ sorting: [{ id: 'name', desc: false }] }}
        />
      );

      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveTextContent('Charlie');
      expect(cells[1]).toHaveTextContent('Alice');
      expect(cells[2]).toHaveTextContent('Bob');
    });
  });

  describe('sorting & column-order handlers', () => {
    const sortableColumns: ColumnDef<Person>[] = [
      {
        id: 'name',
        header: ({ column }) => (
          <button type="button" onClick={column.getToggleSortingHandler()}>
            Name
          </button>
        ),
        accessorKey: 'name',
      },
      { id: 'role', header: 'Role', accessorKey: 'role' },
    ];

    it('reorders rows when a sortable header toggles sort (function-updater path)', () => {
      const sortable: Person[] = [
        { id: '1', name: 'Charlie', role: 'Engineer' },
        { id: '2', name: 'Alice', role: 'Designer' },
        { id: '3', name: 'Bob', role: 'Manager' },
      ];

      render(<Table<Person> id="t-sort" data={sortable} columns={sortableColumns} />);

      // Initial order: Charlie, Alice, Bob.
      let nameCells = screen.getAllByRole('cell').filter((c) => /Charlie|Alice|Bob/.test(c.textContent ?? ''));
      expect(nameCells[0]).toHaveTextContent('Charlie');

      fireEvent.click(screen.getByRole('button', { name: 'Name' }));

      // After ascending sort: Alice, Bob, Charlie.
      nameCells = screen.getAllByRole('cell').filter((c) => /Charlie|Alice|Bob/.test(c.textContent ?? ''));
      expect(nameCells[0]).toHaveTextContent('Alice');
      expect(nameCells[1]).toHaveTextContent('Bob');
      expect(nameCells[2]).toHaveTextContent('Charlie');
    });

    it('fires onColumnOrderChange when the consumer reorders columns via the table instance', () => {
      const onStateChange = jest.fn();

      const ReorderTrigger = () => {
        const { table } = useTableContext<Person>();
        useEffect(() => {
          table.setColumnOrder(['role', 'name']);
        }, [table]);
        return null;
      };

      render(
        <Table<Person> id="t-col-order" data={data} columns={columns} onStateChange={onStateChange}>
          <ReorderTrigger />
        </Table>
      );

      const orders = onStateChange.mock.calls
        .map((args) => (args[0] as TableState).columnOrder)
        .filter((order): order is string[] => Array.isArray(order));
      expect(orders).toContainEqual(['role', 'name']);
    });
  });

  describe('keyboard reordering', () => {
    it('renders a polite live region when reordering is enabled', () => {
      const { container } = render(<Table<Person> id="t-kb-live" data={data} columns={columns} reorderableColumns />);
      expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
    });

    it('reorders a column with the keyboard (pick up → ArrowRight → drop)', () => {
      const onStateChange = jest.fn();
      render(
        <Table<Person> id="t-kb-col" data={data} columns={columns} reorderableColumns onStateChange={onStateChange} />
      );

      const handle = screen.getByRole('button', { name: 'Drag column Name' });
      handle.focus();
      fireEvent.keyDown(handle, { key: ' ' });
      expect(handle).toHaveAttribute('aria-pressed', 'true');
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      fireEvent.keyDown(handle, { key: ' ' });

      const orders = onStateChange.mock.calls
        .map((args) => (args[0] as TableState).columnOrder)
        .filter((order): order is string[] => Array.isArray(order));
      expect(orders).toContainEqual(['role', 'name']);
    });

    it('Escape cancels a column pickup and restores the original order', () => {
      render(<Table<Person> id="t-kb-cancel" data={data} columns={columns} reorderableColumns />);

      const handle = screen.getByRole('button', { name: 'Drag column Name' });
      handle.focus();
      fireEvent.keyDown(handle, { key: ' ' });
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      // Mid-move the order is Role, Name.
      expect(screen.getAllByRole('columnheader').map((h) => h.getAttribute('aria-label'))).toEqual(['Role', 'Name']);

      fireEvent.keyDown(handle, { key: 'Escape' });
      // After cancel it is restored to Name, Role.
      expect(screen.getAllByRole('columnheader').map((h) => h.getAttribute('aria-label'))).toEqual(['Name', 'Role']);
    });

    it('reorders a row with the keyboard via onRowDrop (pick up → ArrowDown)', () => {
      const onRowDrop = jest.fn();
      render(<Table<Person> id="t-kb-row" data={data} columns={columns} reorderableRows onRowDrop={onRowDrop} />);

      const handles = screen.getAllByRole('button', { name: 'Drag row' });
      handles[0].focus();
      fireEvent.keyDown(handles[0], { key: 'Enter' });
      expect(handles[0]).toHaveAttribute('aria-pressed', 'true');
      fireEvent.keyDown(handles[0], { key: 'ArrowDown' });

      expect(onRowDrop).toHaveBeenCalledWith(expect.objectContaining({ fromIndex: 0, toIndex: 1 }));
    });
  });

  describe('expand column wrapper', () => {
    it('handles Enter / Space keydown on the toggle without crashing (stopPropagation path)', () => {
      render(
        <Table<Person>
          id="t-exp-keyboard"
          data={data}
          columns={columns}
          renderSubComponent={(row) => <span>details for {row.original.name}</span>}
        />
      );

      const toggle = screen.getAllByRole('button', { name: /table\.expand-row/i })[0];
      fireEvent.keyDown(toggle, { key: 'Enter', bubbles: true });
      fireEvent.keyDown(toggle, { key: ' ', bubbles: true });
      // Pressing a non-Enter/Space key bubbles through the span without
      // hitting the stopPropagation branch — still must not throw.
      fireEvent.keyDown(toggle, { key: 'Tab', bubbles: true });
      expect(toggle).toBeInTheDocument();
    });
  });

  describe('grouped headers', () => {
    it('renders a standalone column only in the top header row when grouped columns exist', () => {
      const groupedColumns: ColumnDef<Person>[] = [
        { id: 'name', header: 'Standalone Name', accessorKey: 'name' },
        {
          id: 'info-group',
          header: 'Info',
          columns: [{ id: 'role', header: 'Role', accessorKey: 'role' }],
        },
      ];

      render(<Table<Person> id="t-grouped" data={data} columns={groupedColumns} />);

      // Top header row contains both "Standalone Name" and "Info" group label.
      // Second header row contains only "Role" — the standalone "Standalone Name"
      // is NOT duplicated thanks to the rowIndex > 0 short-circuit.
      const standaloneHeaders = screen.getAllByRole('columnheader', { name: 'Standalone Name' });
      expect(standaloneHeaders).toHaveLength(1);
      // Standalone leaf spans both header rows via rowSpan rather than being
      // duplicated, so it stays visually aligned with the group label beside it.
      expect(standaloneHeaders[0]).toHaveAttribute('rowspan', '2');

      expect(screen.getByRole('columnheader', { name: 'Info' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    });
  });

  describe('grouped rows (meta.rowSpan)', () => {
    interface PatientRow {
      id: string;
      date: string;
      doctor: string;
    }
    const patients: PatientRow[] = [
      { id: '1', date: '2026-05-20', doctor: 'Dr Tamm' },
      { id: '2', date: '2026-05-20', doctor: 'Dr Tamm' },
      { id: '3', date: '2026-05-21', doctor: 'Dr Kask' },
    ];

    it('spans the first cell of a group and skips later cells for the same key', () => {
      const columns: ColumnDef<PatientRow>[] = [
        {
          id: 'date',
          header: 'Date',
          accessorKey: 'date',
          meta: { rowSpan: groupRowSpan(patients, (row) => row.date) },
        },
        { id: 'doctor', header: 'Doctor', accessorKey: 'doctor' },
      ];

      const { container } = render(<Table<PatientRow> id="t-grouped-rows" data={patients} columns={columns} />);

      const bodyRows = container.querySelectorAll('tbody tr');
      // First row: date cell has rowSpan=2 + doctor cell — 2 cells.
      expect(bodyRows[0].querySelectorAll('td')).toHaveLength(2);
      expect(bodyRows[0].querySelector('td')?.getAttribute('rowspan')).toBe('2');
      // Second row in group: date cell skipped — only the doctor cell renders.
      expect(bodyRows[1].querySelectorAll('td')).toHaveLength(1);
      // Third row starts a new group, span=1 — no rowSpan attribute.
      expect(bodyRows[2].querySelectorAll('td')).toHaveLength(2);
      expect(bodyRows[2].querySelector('td')?.hasAttribute('rowspan')).toBe(false);
    });
  });
});
