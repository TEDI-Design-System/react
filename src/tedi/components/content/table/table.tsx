import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnSizingState,
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
  type Table as ReactTable,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import cn from 'classnames';
import { Fragment, type KeyboardEvent, type ReactNode, useCallback, useId, useMemo, useRef } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Collapse } from '../../buttons/collapse/collapse';
import { Checkbox } from '../../form/checkbox/checkbox';
import { TextField } from '../../form/textfield/textfield';
import { Pagination } from '../../navigation/pagination';
import styles from './table.module.scss';
import { TableColumnsMenu } from './table-columns-menu/table-columns-menu';
import { TableContext } from './table-context';
import { TableHeaderButton } from './table-header-button/table-header-button';
import { TableToolbar } from './table-toolbar/table-toolbar';
import { useTablePersistence } from './use-table-persistence';

/**
 * Persistable state slices owned by Table. Each slice can be controlled via
 * `state`/`onStateChange`, defaulted via `defaultState`, or persisted via
 * `persist`.
 */
export interface TableState {
  columnVisibility?: VisibilityState;
  columnOrder?: ColumnOrderState;
  rowOrder?: string[];
  columnSizing?: ColumnSizingState;
  rowSelection?: RowSelectionState;
  expanded?: ExpandedState;
  columnFilters?: ColumnFiltersState;
  sorting?: SortingState;
  pagination?: PaginationState;
}

export type TableSize = 'medium' | 'small';

export interface TablePersistOptions {
  /**
   * Storage key used to read/write persisted state. Must be stable per table.
   */
  key: string;
  /**
   * Storage backend. Defaults to `window.localStorage` when available.
   */
  storage?: Storage;
  /**
   * Subset of state slices to persist. Defaults to user-preference slices
   * only: `columnVisibility`, `columnOrder`, `rowOrder`, `columnSizing`.
   * Task-scoped slices (`rowSelection`, `expanded`, `columnFilters`, `sorting`,
   * `pagination`) are deliberately excluded by default — pass them explicitly
   * via `include` if you want them to survive across sessions.
   */
  include?: (keyof TableState)[];
}

export interface TablePaginationOptions {
  /**
   * Rows per page.
   * @default 10
   */
  pageSize?: number;
  /**
   * Options rendered in the built-in page-size selector. Pass `false` to hide
   * the selector entirely.
   * @default [10, 25, 50]
   */
  pageSizeOptions?: number[] | false;
}

export interface TableProps<TData> {
  /**
   * Unique identifier for the table. Used for accessibility and as the default
   * persistence key namespace.
   */
  id?: string;
  /**
   * Row data. Render order mirrors array order unless `rowOrder` is applied.
   */
  data: TData[];
  /**
   * Column definitions. Must include a stable `id` on every column when
   * column visibility / reorder / persistence are used.
   */
  columns: ColumnDef<TData>[];
  /**
   * Visual size of the table. Matches Figma: `medium` = 49px rows, `small` = 41px rows.
   * @default medium
   */
  size?: TableSize;
  /**
   * Caption rendered above the table. Announced to assistive technology.
   */
  caption?: ReactNode;
  /**
   * Alternating row backgrounds.
   * @default false
   */
  striped?: boolean;
  /**
   * Renders vertical separators between columns.
   * @default false
   */
  verticalBorders?: boolean;
  /**
   * Removes the outer border + radius around the table, keeping only internal
   * row dividers.
   * @default false
   */
  borderless?: boolean;
  /**
   * Freezes the first column during horizontal scroll.
   * @default false
   */
  stickyFirstColumn?: boolean;
  /**
   * Pins the `<thead>` row(s) to the top during vertical scroll. Requires
   * `maxHeight` so the table's internal scroll container becomes the sticky
   * anchor — wrapping the Table in an external scrollable div will NOT work,
   * because the `<thead>` sticks to its nearest scrolling ancestor (which is
   * always the internal `.tedi-table__scroll` div). Combines safely with
   * `stickyFirstColumn`.
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Constrains the height of the table's internal scroll container. Accepts
   * any CSS length value (`number` is treated as pixels). Pair with
   * `stickyHeader` for a fixed-height table whose header stays pinned during
   * vertical scroll.
   */
  maxHeight?: number | string;
  /**
   * Fires when a data row is clicked. Adds `role="button"`, a pointer cursor
   * and Enter/Space keyboard activation to every row.
   */
  onRowClick?: (row: Row<TData>) => void;
  /**
   * Enables row selection. When true, Table prepends a selection column with
   * checkboxes bound to `rowSelection` state.
   */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /**
   * Enables per-column filter inputs rendered below the header row.
   * Only columns whose `columnDef.enableColumnFilter !== false` render an input.
   */
  enableColumnFilters?: boolean;
  /**
   * Render function for the expanded content of a row. When provided, Table
   * prepends an expand/collapse toggle column and renders this node in a full-
   * width row below every expanded parent row.
   */
  renderSubComponent?: (row: Row<TData>) => ReactNode;
  /**
   * Predicate controlling which rows can be expanded. Defaults to "all rows"
   * when `renderSubComponent` is provided, otherwise "none".
   */
  getRowCanExpand?: (row: Row<TData>) => boolean;
  /**
   * Returns the sub-rows of a data row. Enables nested hierarchical data.
   */
  getSubRows?: (row: TData) => TData[] | undefined;
  /**
   * Enables client-side pagination and renders a built-in page-switcher footer.
   * Pass `true` for default settings or an options object to customise.
   * Page state lives on `TableState.pagination` so it is fully controllable and
   * persistable.
   */
  pagination?: boolean | TablePaginationOptions;
  /**
   * Switches pagination to server-side mode. When `true`, Table stops slicing
   * `data` locally — `data` is treated as the rows for the current page only.
   * Pair with `pageCount` (or `rowCount`) and a controlled `state.pagination`
   * + `onStateChange` to fetch the right page from the server on each change.
   * @default false
   */
  manualPagination?: boolean;
  /**
   * Switches sorting to server-side mode. When `true`, Table no longer sorts
   * `data` locally — sort state still updates and fires `onStateChange` so
   * the parent can refetch in the new order, but the rows are rendered in
   * the order they arrive in `data`.
   * @default false
   */
  manualSorting?: boolean;
  /**
   * Switches filtering to server-side mode. When `true`, Table stops applying
   * `columnFilters` locally; the parent is expected to translate filter state
   * (visible via `onStateChange`) into a server query.
   * @default false
   */
  manualFiltering?: boolean;
  /**
   * Total number of pages on the server. Required when `manualPagination` is
   * `true` so the pagination footer can render the right page count — local
   * row-count math is otherwise wrong, since `data` only holds the current
   * page's rows.
   */
  pageCount?: number;
  /**
   * Total number of rows on the server (across all pages). Used as the
   * "X tulemust" / "X results" counter in the pagination footer when
   * `manualPagination` is on. Falls back to the locally filtered row count
   * when omitted.
   */
  rowCount?: number;
  /**
   * Controlled state. Pair with `onStateChange`. Any key left undefined falls
   * back to the corresponding default or internal state.
   */
  state?: Partial<TableState>;
  /**
   * Initial state for uncontrolled usage. Ignored when `state` is provided.
   */
  defaultState?: Partial<TableState>;
  /**
   * Callback fired whenever any state slice changes.
   */
  onStateChange?: (state: TableState) => void;
  /**
   * When set, Table wires a localStorage adapter for the named key. Acts as a
   * default state provider and persists subsequent changes. Consumers can still
   * supply `state`/`onStateChange` to layer extra behavior on top.
   */
  persist?: TablePersistOptions;
  /**
   * Rendered inside `<tbody>` when `data` is empty.
   * @default "No data"
   */
  placeholder?: ReactNode;
  /**
   * ARIA live-region role wrapping the empty-state placeholder. Use `'status'`
   * for polite announcements (recommended for "no results" feedback when the
   * user changes a filter) or `'alert'` for assertive announcements that
   * interrupt the current SR utterance. Omit when the placeholder should not
   * announce changes — e.g. when the table is empty on first render and the
   * content never changes.
   */
  placeholderRole?: 'alert' | 'status';
  /**
   * Additional class name on the root element.
   */
  className?: string;
  /**
   * Toolbar + Table subcomponents such as `<Table.ColumnsMenu />`.
   */
  children?: ReactNode;
}

/**
 * Value exposed through `TableContext`. Subcomponents like ColumnsMenu use it
 * to read and mutate the table state without prop-drilling.
 */
export interface TableContextValue<TData = unknown> {
  table: ReactTable<TData>;
  size: TableSize;
  id?: string;
  /**
   * Snapshot of the current Table state. Included so the context value
   * identity changes whenever state updates — context consumers re-render
   * even when they're passed as referentially-stable children.
   */
  state: Partial<TableState>;
}

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

function hasChildColumns<TData>(
  columnDef: ColumnDef<TData>
): columnDef is ColumnDef<TData> & { columns?: ColumnDef<TData>[] } {
  return Array.isArray((columnDef as { columns?: ColumnDef<TData>[] }).columns);
}

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
    placeholderRole,
    className,
    children,
    striped = false,
    verticalBorders = false,
    borderless = false,
    stickyFirstColumn = false,
    stickyHeader = false,
    maxHeight,
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

  const handleColumnOrderChange: OnChangeFn<ColumnOrderState> = useCallback(
    (updater) => {
      setTableState((prev) => {
        const previous = prev.columnOrder ?? [];
        const next = typeof updater === 'function' ? updater(previous) : updater;
        return { columnOrder: next };
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
            label={getLabelRef.current('table.select-all', table.getIsAllPageRowsSelected())}
            hideLabel
            value="all"
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
            onChange={(_value, checked) => table.toggleAllPageRowsSelected(checked)}
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
        cell: ({ row }) => {
          if (!row.getCanExpand()) return null;
          const subRowId = `${resolvedId}-sub-${row.id}`;

          return (
            <span
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
              }}
            >
              <Collapse
                id={`${resolvedId}-expand-${row.id}`}
                controlsId={subRowId}
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
          );
        },
      });
    }

    return [...leading, ...columns];
  }, [columns, hasSelection, hasExpansion, resolvedId]);

  const fallbackRowSelection = useMemo<RowSelectionState>(() => ({}), []);
  const fallbackExpanded = useMemo<ExpandedState>(() => ({}), []);
  const fallbackColumnFilters = useMemo<ColumnFiltersState>(() => [], []);
  const fallbackColumnOrder = useMemo<ColumnOrderState>(() => [], []);
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
      columnOrder: tableState.columnOrder ?? fallbackColumnOrder,
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
    onColumnOrderChange: handleColumnOrderChange,
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
    () => ({ table, size, id: resolvedId, state: tableState }),
    [table, size, resolvedId, tableState]
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
      [styles['tedi-table--sticky-header']]: stickyHeader,
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
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(row);
    }
  };

  const headerRowCount = headerGroups.length + (enableColumnFilters ? 1 : 0);
  const paginationState = table.getState().pagination;
  const rowIndexOffset = paginationEnabled ? paginationState.pageIndex * paginationState.pageSize : 0;
  const totalDataRowCount = paginationEnabled ? rowCount ?? table.getFilteredRowModel().rows.length : rows.length;
  const ariaRowCount = paginationEnabled ? headerRowCount + totalDataRowCount : undefined;

  return (
    <TableContext.Provider value={contextValue as TableContextValue}>
      <div className={rootClassName} data-name="tedi-table">
        {children}
        <div
          className={styles['tedi-table__scroll']}
          style={maxHeight !== undefined ? { maxHeight, overflowY: 'auto' } : undefined}
        >
          <table
            id={id}
            className={styles['tedi-table__table']}
            aria-rowcount={ariaRowCount}
            aria-colcount={leafColumnCount > 0 ? leafColumnCount : undefined}
          >
            {caption && <caption className={styles['tedi-table__caption']}>{caption}</caption>}
            <thead className={styles['tedi-table__head']}>
              {headerGroups.map((headerGroup, rowIndex) => (
                <tr
                  key={headerGroup.id}
                  className={styles['tedi-table__row']}
                  aria-rowindex={paginationEnabled ? rowIndex + 1 : undefined}
                >
                  {headerGroup.headers.map((header) => {
                    const isGroup = header.subHeaders.length > 0;
                    const hasParentGroup = Boolean(header.column.parent);
                    const columnHasChildren = hasChildColumns(header.column.columnDef);
                    const isStandaloneLeaf = !columnHasChildren && !hasParentGroup;
                    if (header.isPlaceholder && !isStandaloneLeaf) {
                      return null;
                    }
                    if (!header.isPlaceholder && isStandaloneLeaf && rowIndex > 0) {
                      return null;
                    }
                    const rowSpanCount = isStandaloneLeaf ? headerGroups.length - rowIndex : 1;
                    const sortDirection = header.column.getIsSorted();
                    const ariaSort: 'ascending' | 'descending' | 'none' | undefined = header.column.getCanSort()
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : sortDirection === 'desc'
                        ? 'descending'
                        : 'none'
                      : undefined;
                    const headerMeta = header.column.columnDef.meta as { label?: string } | undefined;
                    const headerLabel =
                      headerMeta?.label ??
                      (typeof header.column.columnDef.header === 'string' ? header.column.columnDef.header : undefined);
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        rowSpan={rowSpanCount > 1 ? rowSpanCount : undefined}
                        className={cn(styles['tedi-table__header-cell'], {
                          [styles['tedi-table__header-cell--group']]: isGroup,
                        })}
                        scope="col"
                        aria-sort={ariaSort}
                        aria-label={headerLabel}
                        style={header.column.getSize() ? { width: header.column.getSize() } : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  })}
                </tr>
              ))}
              {enableColumnFilters && (
                <tr
                  className={cn(styles['tedi-table__row'], styles['tedi-table__row--filter'])}
                  aria-rowindex={paginationEnabled ? headerGroups.length + 1 : undefined}
                >
                  {leafColumns.map((column) => {
                    const meta = column.columnDef.meta as { label?: string } | undefined;
                    const headerLabel =
                      meta?.label ??
                      (typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id);
                    const filterId = `${resolvedId}-filter-${column.id}`;

                    return (
                      <th key={column.id} className={styles['tedi-table__header-cell']} scope="col">
                        {column.getCanFilter() && (
                          <TextField
                            id={filterId}
                            name={filterId}
                            label={getLabel('table.filter-input', headerLabel)}
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
                    {placeholderRole ? <div role={placeholderRole}>{resolvedPlaceholder}</div> : resolvedPlaceholder}
                  </td>
                </tr>
              ) : (
                rows.map((row, visibleIndex) => {
                  const clickable = Boolean(onRowClick);
                  const rowClassName = cn(styles['tedi-table__row'], {
                    [styles['tedi-table__row--selected']]: row.getIsSelected(),
                    [styles['tedi-table__row--clickable']]: clickable,
                    [styles['tedi-table__row--sub-row']]: row.depth > 0,
                  });
                  const ariaRowIndex = paginationEnabled
                    ? headerRowCount + rowIndexOffset + visibleIndex + 1
                    : undefined;
                  const subRowId = `${resolvedId}-sub-${row.id}`;
                  return (
                    <Fragment key={row.id}>
                      <tr
                        className={rowClassName}
                        onClick={clickable ? () => onRowClick?.(row) : undefined}
                        onKeyDown={clickable ? handleRowKeyDown(row) : undefined}
                        tabIndex={clickable ? 0 : undefined}
                        role={clickable ? 'button' : undefined}
                        aria-rowindex={ariaRowIndex}
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
                            id={subRowId}
                            role="region"
                            aria-label={getLabel('table.row-details')}
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

export const Table = Object.assign(TableBase, {
  Toolbar: TableToolbar,
  ColumnsMenu: TableColumnsMenu,
  HeaderButton: TableHeaderButton,
});

export default Table;
