import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
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

import { Icon } from '../../base/icon/icon';
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
            <button
              type="button"
              className={styles['tedi-table__expand-button']}
              aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
              aria-expanded={row.getIsExpanded()}
              onClick={(event) => {
                event.stopPropagation();
                row.toggleExpanded();
              }}
            >
              <Icon name={row.getIsExpanded() ? 'remove' : 'add'} size={16} color="inherit" />
            </button>
          ) : null,
      });
    }

    return [...leading, ...columns];
  }, [columns, hasSelection, hasExpansion, id]);

  const memoColumns = useMemo(() => augmentedColumns, [augmentedColumns]);

  const table = useReactTable<TData>({
    data,
    columns: memoColumns,
    state: {
      columnVisibility: tableState.columnVisibility,
      rowSelection: tableState.rowSelection ?? {},
      expanded: tableState.expanded ?? {},
      columnFilters: tableState.columnFilters ?? [],
      sorting: tableState.sorting ?? [],
      pagination: paginationEnabled
        ? tableState.pagination ?? { pageIndex: 0, pageSize: paginationOptions?.pageSize ?? 10 }
        : undefined,
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
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableColumnFilters ? getFilteredRowModel() : undefined,
    getExpandedRowModel: hasExpansion ? getExpandedRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: paginationEnabled ? getPaginationRowModel() : undefined,
  });

  const contextValue: TableContextValue<TData> = useMemo(() => ({ table, size, id }), [table, size, id]);

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
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} className={styles['tedi-table__row']}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={styles['tedi-table__header-cell']}
                      scope="col"
                      style={header.column.getSize() ? { width: header.column.getSize() } : undefined}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
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
              onPageChange={(nextPage) => table.setPageIndex(nextPage - 1)}
              totalItems={table.getFilteredRowModel().rows.length}
              pageSize={table.getState().pagination.pageSize}
              pageSizeOptions={
                paginationOptions?.pageSizeOptions && paginationOptions.pageSizeOptions.length > 0
                  ? paginationOptions.pageSizeOptions
                  : undefined
              }
              onPageSizeChange={(nextSize) => table.setPageSize(nextSize)}
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
