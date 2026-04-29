import type { ColumnDef } from '@tanstack/react-table';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { Table } from './table';
import type { TableState } from './table.types';

import '@testing-library/jest-dom';

jest.mock('../../../providers/printing-provider/printing-provider', () => ({
  PrintingProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePrint: jest.fn().mockReturnValue(false),
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
          return count === 1 ? 'result' : 'results';
        }
        case 'pagination.page-size':
          return 'Page size';
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
      expect(screen.getByRole('button', { name: /Previous page/i })).toBeDisabled();
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
      render(
        <Table<Person>
          id="t-page-no-select"
          data={many}
          columns={columns}
          pagination={{ pageSize: 3, pageSizeOptions: false }}
        />
      );

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
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
});
