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
import { Fragment, type KeyboardEvent, useCallback, useId, useMemo, useRef } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Collapse } from '../../buttons/collapse/collapse';
import { Checkbox } from '../../form/checkbox/checkbox';
import { TextField } from '../../form/textfield/textfield';
import { Pagination } from '../../navigation/pagination';
import styles from './table.module.scss';
import type { TableContextValue, TableProps } from './table.types';
import { TableColumnsMenu } from './table-columns-menu/table-columns-menu';
import { TableContext } from './table-context';
import { TableHeaderButton } from './table-header-button/table-header-button';
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
    placeholder,
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
    manualPagination = false,
    manualSorting = false,
    manualFiltering = false,
    pageCount,
    rowCount,
  } = props;

  const { getLabel } = useLabels();
  const resolvedPlaceholder = placeholder ?? getLabel('table.no-data');

  // `getLabel` from `useLabels` is meant to be stable, but tests (and some
  // consumer setups) hand back a fresh reference each render. Reading it
  // through a ref lets the header / cell closures pick up the latest locale
  // without invalidating the `augmentedColumns` memo every render — which
  // would otherwise hand TanStack a new columns array and reset row state.
  const getLabelRef = useRef(getLabel);
  getLabelRef.current = getLabel;

  // Stable fallback id so two unidentified `<Table>`s on the same page don't
  // collide on the synthetic checkbox / expand / filter input ids.
  const generatedId = useId();
  const resolvedId = id ?? generatedId;

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

  const coreRowModel = useMemo(() => getCoreRowModel(), []);
  const filteredRowModel = useMemo(() => (manualFiltering ? undefined : getFilteredRowModel()), [manualFiltering]);
  const sortedRowModel = useMemo(() => (manualSorting ? undefined : getSortedRowModel()), [manualSorting]);
  const expandedRowModel = useMemo(() => (hasExpansion ? getExpandedRowModel() : undefined), [hasExpansion]);
  const paginationRowModel = useMemo(
    () => (paginationEnabled && !manualPagination ? getPaginationRowModel() : undefined),
    [paginationEnabled, manualPagination]
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
            id={`${resolvedId}-select-all`}
            name={`${resolvedId}-select-all`}
            label={getLabelRef.current('table.select-all', table.getIsAllRowsSelected())}
            hideLabel
            value="all"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
            onChange={(_value, checked) => table.toggleAllRowsSelected(checked)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            id={`${resolvedId}-select-${row.id}`}
            name={`${resolvedId}-select-${row.id}`}
            label={getLabelRef.current('table.select-row', row.getIsSelected())}
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
            <span
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
              }}
            >
              <Collapse
                id={`${resolvedId}-expand-${row.id}`}
                iconOnly
                arrowType="secondary"
                hideCollapseText
                openText={getLabelRef.current('table.expand-row')}
                closeText={getLabelRef.current('table.collapse-row')}
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
  }, [columns, hasSelection, hasExpansion, resolvedId]);

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
    columns: augmentedColumns,
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
    manualPagination,
    manualSorting,
    manualFiltering,
    // `pageCount` only matters in manual mode; TanStack ignores it otherwise.
    pageCount: manualPagination && pageCount !== undefined ? pageCount : undefined,
    rowCount: manualPagination && rowCount !== undefined ? rowCount : undefined,
    getRowCanExpand: renderSubComponent ? getRowCanExpand ?? (() => true) : getRowCanExpand,
    getSubRows,
    onColumnVisibilityChange: handleVisibilityChange,
    onRowSelectionChange: handleRowSelectionChange,
    onExpandedChange: handleExpandedChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: paginationEnabled ? handlePaginationChange : undefined,
    filterFns: DEFAULT_FILTER_FNS,
    getCoreRowModel: coreRowModel,
    getFilteredRowModel: filteredRowModel,
    getExpandedRowModel: expandedRowModel,
    getSortedRowModel: sortedRowModel,
    getPaginationRowModel: paginationRowModel,
  });

  const contextValue = useMemo<TableContextValue<TData>>(
    () => ({ table, size, id: resolvedId }),
    [table, size, resolvedId]
  );

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
                    const filterId = `${resolvedId}-filter-${column.id}`;

                    return (
                      <th key={column.id} className={styles['tedi-table__header-cell']} scope="col">
                        {column.getCanFilter() && (
                          <TextField
                            id={filterId}
                            name={filterId}
                            label={`Filter ${headerLabel}`}
                            hideLabel
                            size="small"
                            placeholder={getLabel('table.filter-placeholder')}
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
                    {resolvedPlaceholder}
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
              totalItems={rowCount ?? table.getFilteredRowModel().rows.length}
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
  HeaderButton: TableHeaderButton,
});

export default Table;
