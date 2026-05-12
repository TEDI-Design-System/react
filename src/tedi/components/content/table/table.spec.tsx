import type { ColumnDef } from '@tanstack/react-table';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';

import { Table } from './table';
import type { TableState } from './table.types';
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

  it('renders the placeholder when data is empty', () => {
    render(<Table<Person> id="t-empty" data={[]} columns={columns} placeholder="Nothing here" />);

    expect(screen.getByText('Nothing here')).toBeInTheDocument();
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
      const roleCheckbox = screen.getByRole('checkbox', { name: 'Role' });

      fireEvent.click(roleCheckbox);
      expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();

      fireEvent.click(roleCheckbox);
      expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
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

  describe('column filters', () => {
    it('filters rows based on the per-column filter input', () => {
      render(<Table<Person> id="t-filter" data={data} columns={columns} enableColumnFilters />);

      expect(screen.getByRole('cell', { name: 'Anna' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Jüri' })).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText('Filter Name'), { target: { value: 'Anna' } });

      expect(screen.getByRole('cell', { name: 'Anna' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Jüri' })).not.toBeInTheDocument();
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

    it('renders the pagination bar with prev/next buttons and current page marker', () => {
      render(<Table<Person> id="t-page" data={many} columns={columns} pagination={{ pageSize: 3 }} />);

      expect(screen.getByRole('navigation', { name: /Pagination/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Current page, page 1/i })).toHaveAttribute('aria-current', 'page');
      // Previous arrow is hidden on the first page (intentional — see Pagination).
      expect(screen.queryByRole('button', { name: /Previous page/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Next page/i })).toBeInTheDocument();
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

      expect(screen.getByRole('columnheader', { name: 'Info' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
    });
  });
});
