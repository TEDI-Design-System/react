import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import cn from 'classnames';
import { Fragment, type KeyboardEvent, useCallback, useMemo } from 'react';

import { Collapse } from '../../buttons/collapse/collapse';
import { Checkbox } from '../../form/checkbox/checkbox';
import { TextField } from '../../form/textfield/textfield';
import { Pagination } from '../../navigation/pagination';
import styles from './table.module.scss';
import type { TableContextValue, TableProps } from './table.types';
import { TableColumnsMenu } from './table-columns-menu/table-columns-menu';
import { TableContext } from './table-context';
import { useTablePersistence } from './use-table-persistence';

const SELECT_COLUMN_ID = '__select__';
const EXPAND_COLUMN_ID = '__expand__';

// Satisfy the community-side `declare module '@tanstack/table-core'` FilterFns
// augmentation so the typed `useReactTable` signature accepts our options. The
// community Table uses richer implementations; the TEDI-Ready Table's stories
// drive filtering via built-ins (`includesString`) or per-column `filterFn`
// overrides, so these stubs are never invoked in practice.
const passthroughFilter: FilterFn<unknown> = () => true;
const DEFAULT_FILTER_FNS = {
  text: passthroughFilter,
  select: passthroughFilter,
  'multi-select': passthroughFilter,
  'date-range': passthroughFilter,
  'date-range-period': passthroughFilter,
} as const;

function TableBase<TData>(props: TableProps<TData>): JSX.Element {
  const {
    id,
    data,
    columns,
    size = 'medium',
    caption,
    state,
    defaultState,
    onStateChange,
    persist,
    placeholder = 'No data',
    className,
    children,
    striped = false,
    verticalBorders = false,
    borderless = false,
    stickyFirstColumn = false,
    onRowClick,
    enableRowSelection,
    enableColumnFilters = false,
    renderSubComponent,
    getRowCanExpand,
    getSubRows,
    pagination: paginationProp,
  } = props;

  const paginationOptions = useMemo(() => {
    if (!paginationProp) return null;
    if (paginationProp === true) return { pageSize: 10, pageSizeOptions: [10, 25, 50] as number[] | false };
    return {
      pageSize: paginationProp.pageSize ?? 10,
      pageSizeOptions:
        paginationProp.pageSizeOptions === undefined ? ([10, 25, 50] as number[]) : paginationProp.pageSizeOptions,
    };
  }, [paginationProp]);
  const paginationEnabled = paginationOptions !== null;

  // Stable options array reference passed down to `<Pagination>`. Without this
  // the array is recomputed from `paginationOptions` every render, which in
  // the real browser can cascade through react-select inside the page-size
  // picker and produce a feedback loop.
  const paginationPageSizeOptions = useMemo<number[] | undefined>(() => {
    const opts = paginationOptions?.pageSizeOptions;
    return Array.isArray(opts) && opts.length > 0 ? opts : undefined;
  }, [paginationOptions]);

  const [tableState, setTableState] = useTablePersistence({
    persist,
    controlled: state,
    defaultState,
    onStateChange,
  });

  const handleVisibilityChange: OnChangeFn<VisibilityState> = useCallback(
    (updater) => {
      setTableState((prev) => {
        const previous = prev.columnVisibility ?? {};
        const next = typeof updater === 'function' ? updater(previous) : updater;
        return { columnVisibility: next };
      });
    },
    [setTableState]
  );

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (updater) => {
      setTableState((prev) => {
        const previous = prev.rowSelection ?? {};
        const next = typeof updater === 'function' ? updater(previous) : updater;
        return { rowSelection: next };
      });
    },
    [setTableState]
  );

  const handleExpandedChange: OnChangeFn<ExpandedState> = useCallback(
    (updater) => {
      setTableState((prev) => {
        const previous = prev.expanded ?? {};
        const next = typeof updater === 'function' ? updater(previous) : updater;
        return { expanded: next };
      });
    },
    [setTableState]
  );

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    (updater) => {
      setTableState((prev) => {
        const previous = prev.columnFilters ?? [];
        const next = typeof updater === 'function' ? updater(previous) : updater;
        return { columnFilters: next };
      });
    },
    [setTableState]
  );

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(
    (updater) => {
      setTableState((prev) => {
        const previous = prev.sorting ?? [];
        const next = typeof updater === 'function' ? updater(previous) : updater;
        return { sorting: next };
      });
    },
    [setTableState]
  );

  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updater) => {
      setTableState((prev) => {
        const previous: PaginationState = prev.pagination ?? {
          pageIndex: 0,
          pageSize: paginationOptions?.pageSize ?? 10,
        };
        const next = typeof updater === 'function' ? updater(previous) : updater;
        return { pagination: next };
      });
    },
    [setTableState, paginationOptions]
  );

  const hasExpansion = Boolean(renderSubComponent || getSubRows);
  const hasSelection = Boolean(enableRowSelection);

  // Memoise row-model factories: TanStack compares these by reference, so a
  // fresh function every render can (and occasionally does) look like a
  // row-model swap and cascade through autoReset handlers in the real browser.
  const coreRowModel = useMemo(() => getCoreRowModel(), []);
  const filteredRowModel = useMemo(() => getFilteredRowModel(), []);
  const sortedRowModel = useMemo(() => getSortedRowModel(), []);
  const expandedRowModel = useMemo(() => (hasExpansion ? getExpandedRowModel() : undefined), [hasExpansion]);
  const paginationRowModel = useMemo(
    () => (paginationEnabled ? getPaginationRowModel() : undefined),
    [paginationEnabled]
  );

  const augmentedColumns = useMemo<ColumnDef<TData>[]>(() => {
    const leading: ColumnDef<TData>[] = [];

    if (hasSelection) {
      leading.push({
        id: SELECT_COLUMN_ID,
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        size: 40,
        header: ({ table }) => (
          <Checkbox
            id={`${id ?? 'tedi-table'}-select-all`}
            name={`${id ?? 'tedi-table'}-select-all`}
            label="Select all"
            hideLabel
            value="all"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
            onChange={(_value, checked) => table.toggleAllRowsSelected(checked)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            id={`${id ?? 'tedi-table'}-select-${row.id}`}
            name={`${id ?? 'tedi-table'}-select-${row.id}`}
            label="Select row"
            hideLabel
            value={row.id}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={(_value, checked) => row.toggleSelected(checked)}
          />
        ),
      });
    }

    if (hasExpansion) {
      leading.push({
        id: EXPAND_COLUMN_ID,
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        size: 40,
        header: '',
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <span onClick={(e) => e.stopPropagation()}>
              <Collapse
                id={`${id ?? 'tedi-table'}-expand-${row.id}`}
                iconOnly
                arrowType="secondary"
                hideCollapseText
                openText="Expand row"
                closeText="Collapse row"
                open={row.getIsExpanded()}
                onToggle={() => row.toggleExpanded()}
              >
                {null}
              </Collapse>
            </span>
          ) : null,
      });
    }

    return [...leading, ...columns];
  }, [columns, hasSelection, hasExpansion, id]);

  const memoColumns = useMemo(() => augmentedColumns, [augmentedColumns]);

  // Stabilise fallback references so unset slices don't churn the state object
  // every render (TanStack can treat new-but-equal refs as state changes).
  const fallbackRowSelection = useMemo<RowSelectionState>(() => ({}), []);
  const fallbackExpanded = useMemo<ExpandedState>(() => ({}), []);
  const fallbackColumnFilters = useMemo<ColumnFiltersState>(() => [], []);
  const fallbackSorting = useMemo<SortingState>(() => [], []);
  const fallbackPagination = useMemo<PaginationState>(
    () => ({ pageIndex: 0, pageSize: paginationOptions?.pageSize ?? 10 }),
    [paginationOptions]
  );

  const table = useReactTable<TData>({
    data,
    columns: memoColumns,
    state: {
      columnVisibility: tableState.columnVisibility,
      rowSelection: tableState.rowSelection ?? fallbackRowSelection,
      expanded: tableState.expanded ?? fallbackExpanded,
      columnFilters: tableState.columnFilters ?? fallbackColumnFilters,
      sorting: tableState.sorting ?? fallbackSorting,
      pagination: paginationEnabled ? tableState.pagination ?? fallbackPagination : undefined,
    },
    enableRowSelection,
    enableColumnFilters,
    getRowCanExpand: renderSubComponent ? getRowCanExpand ?? (() => true) : getRowCanExpand,
    getSubRows,
    onColumnVisibilityChange: handleVisibilityChange,
    onRowSelectionChange: handleRowSelectionChange,
    onExpandedChange: handleExpandedChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: paginationEnabled ? handlePaginationChange : undefined,
    // Satisfies the globally-augmented FilterFns contract from community/Table.
    // Per-column `filterFn` overrides take precedence when a story sets one.
    filterFns: DEFAULT_FILTER_FNS,
    getCoreRowModel: coreRowModel,
    // Always-on: filtering runs whenever columnFilters has entries, regardless of
    // whether the built-in inline filter row is shown. Cheap when no filters set.
    getFilteredRowModel: filteredRowModel,
    getExpandedRowModel: expandedRowModel,
    getSortedRowModel: sortedRowModel,
    getPaginationRowModel: paginationRowModel,
  });

  // Not memoised: TanStack returns the same `table` reference every render
  // (stored in a useState ref), so a useMemo here would never recompute and
  // context consumers (e.g. TableColumnsMenu) would never see state changes.
  const contextValue: TableContextValue<TData> = { table, size, id };

  // Stable references for the Pagination controls — react-select reacts badly
  // to a new callback identity on every render inside its controlled flow.
  const handlePaginationPageChange = useCallback((nextPage: number) => table.setPageIndex(nextPage - 1), [table]);
  const handlePaginationPageSizeChange = useCallback((nextSize: number) => table.setPageSize(nextSize), [table]);

  const hasGroupedHeaders = table.getHeaderGroups().length > 1;

  const rootClassName = cn(
    styles['tedi-table'],
    styles[`tedi-table--${size}`],
    {
      [styles['tedi-table--striped']]: striped,
      [styles['tedi-table--vertical-borders']]: verticalBorders,
      [styles['tedi-table--borderless']]: borderless,
      [styles['tedi-table--sticky-first-column']]: stickyFirstColumn,
      [styles['tedi-table--clickable-rows']]: Boolean(onRowClick),
      [styles['tedi-table--has-pagination']]: paginationEnabled,
      [styles['tedi-table--grouped-headers']]: hasGroupedHeaders,
    },
    className
  );

  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();
  const footerGroups = table.getFooterGroups();
  const leafColumns = table.getVisibleLeafColumns();
  const leafColumnCount = leafColumns.length;
  const hasFooter = footerGroups.some((group) =>
    group.headers.some((header) => header.column.columnDef.footer !== undefined)
  );

  const handleRowKeyDown = (row: Row<TData>) => (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (!onRowClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(row);
    }
  };

  return (
    <TableContext.Provider value={contextValue as TableContextValue}>
      <div className={rootClassName} data-name="tedi-table">
        {children}
        <div className={styles['tedi-table__scroll']}>
          <table id={id} className={styles['tedi-table__table']}>
            {caption && <caption className={styles['tedi-table__caption']}>{caption}</caption>}
            <thead className={styles['tedi-table__head']}>
              {headerGroups.map((headerGroup, rowIndex) => (
                <tr key={headerGroup.id} className={styles['tedi-table__row']}>
                  {headerGroup.headers.map((header) => {
                    const isGroup = header.subHeaders.length > 0;
                    const hasParentGroup = Boolean(header.column.parent);
                    // Top-level leaf columns (no parent group) are represented by a
                    // placeholder at row 0 that rowSpans down. Skip their real leaf
                    // header in deeper rows to avoid a duplicate — matches Figma's
                    // "Merged cells" where Kuupäev / Asukoht span both header rows.
                    // Leaves that DO have a parent group (Kellaaeg / Kestus under
                    // "Aeg") still render in their designated deep row.
                    if (!header.isPlaceholder && !isGroup && !hasParentGroup && rowIndex > 0) {
                      return null;
                    }
                    const rowSpanCount = header.isPlaceholder ? headerGroups.length - rowIndex : 1;
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        rowSpan={rowSpanCount > 1 ? rowSpanCount : undefined}
                        className={cn(styles['tedi-table__header-cell'], {
                          [styles['tedi-table__header-cell--group']]: isGroup,
                        })}
                        scope="col"
                        style={header.column.getSize() ? { width: header.column.getSize() } : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  })}
                </tr>
              ))}
              {enableColumnFilters && (
                <tr className={cn(styles['tedi-table__row'], styles['tedi-table__row--filter'])}>
                  {leafColumns.map((column) => {
                    const headerLabel =
                      typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id;
                    const filterId = `${id ?? 'tedi-table'}-filter-${column.id}`;

                    return (
                      <th key={column.id} className={styles['tedi-table__header-cell']} scope="col">
                        {column.getCanFilter() && (
                          <TextField
                            id={filterId}
                            name={filterId}
                            label={`Filter ${headerLabel}`}
                            hideLabel
                            size="small"
                            placeholder="Filter…"
                            value={(column.getFilterValue() as string | undefined) ?? ''}
                            onChange={(next) => column.setFilterValue(next || undefined)}
                          />
                        )}
                      </th>
                    );
                  })}
                </tr>
              )}
            </thead>
            <tbody className={styles['tedi-table__body']}>
              {rows.length === 0 ? (
                <tr className={styles['tedi-table__row']}>
                  <td
                    colSpan={Math.max(1, leafColumnCount)}
                    className={cn(styles['tedi-table__cell'], styles['tedi-table__cell--placeholder'])}
                  >
                    {placeholder}
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const clickable = Boolean(onRowClick);
                  const rowClassName = cn(styles['tedi-table__row'], {
                    [styles['tedi-table__row--selected']]: row.getIsSelected(),
                    [styles['tedi-table__row--clickable']]: clickable,
                    [styles['tedi-table__row--sub-row']]: row.depth > 0,
                  });
                  return (
                    <Fragment key={row.id}>
                      <tr
                        className={rowClassName}
                        onClick={clickable ? () => onRowClick?.(row) : undefined}
                        onKeyDown={clickable ? handleRowKeyDown(row) : undefined}
                        tabIndex={clickable ? 0 : undefined}
                        role={clickable ? 'button' : undefined}
                        aria-selected={row.getIsSelected() || undefined}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className={styles['tedi-table__cell']}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                      {renderSubComponent && row.getIsExpanded() && (
                        <tr className={cn(styles['tedi-table__row'], styles['tedi-table__row--sub-component'])}>
                          <td
                            colSpan={Math.max(1, leafColumnCount)}
                            className={cn(styles['tedi-table__cell'], styles['tedi-table__cell--sub-component'])}
                          >
                            {renderSubComponent(row)}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
            {hasFooter && (
              <tfoot className={styles['tedi-table__foot']}>
                {footerGroups.map((group) => (
                  <tr key={group.id} className={styles['tedi-table__row']}>
                    {group.headers.map((header) => (
                      <td
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(styles['tedi-table__cell'], styles['tedi-table__cell--footer'])}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot>
            )}
          </table>
        </div>
        {paginationEnabled && (
          <div className={styles['tedi-table__pagination']}>
            <Pagination
              pageCount={Math.max(1, table.getPageCount())}
              page={table.getState().pagination.pageIndex + 1}
              onPageChange={handlePaginationPageChange}
              totalItems={table.getFilteredRowModel().rows.length}
              pageSize={table.getState().pagination.pageSize}
              pageSizeOptions={paginationPageSizeOptions}
              onPageSizeChange={handlePaginationPageSizeChange}
            />
          </div>
        )}
      </div>
    </TableContext.Provider>
  );
}

TableBase.displayName = 'Table';

/**
 * Optional slot rendered above the `<table>`. Hosts controls like
 * `<Table.ColumnsMenu />`. Nothing clever — it just provides consistent spacing.
 */
const TableToolbar = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn(styles['tedi-table__toolbar'], className)}>{children}</div>
);
TableToolbar.displayName = 'Table.Toolbar';

export const Table = Object.assign(TableBase, {
  Toolbar: TableToolbar,
  ColumnsMenu: TableColumnsMenu,
});

export default Table;
