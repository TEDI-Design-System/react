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
import {
  type CSSProperties,
  type DragEvent as ReactDragEvent,
  Fragment,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Collapse, CollapseProps } from '../../buttons/collapse/collapse';
import { Checkbox, CheckboxProps } from '../../form/checkbox/checkbox';
import { Radio, RadioProps } from '../../form/radio/radio';
import { TextField } from '../../form/textfield/textfield';
import { Pagination } from '../../navigation/pagination';
import styles from './table.module.scss';
import { TableColumnsMenu } from './table-columns-menu/table-columns-menu';
import { TableContext } from './table-context';
import { TableHeaderButton } from './table-header-button/table-header-button';
import { TableToolbar } from './table-toolbar/table-toolbar';
import { useTablePersistence } from './use-table-persistence';

/**
 * Optional shape that columns can put in `columnDef.meta` to:
 *
 * - drive the column-filter aria-label when the header is non-textual (`label`),
 * - align the column's `<th>` / `<td>` content horizontally (`align`) or vertically
 *   (`vAlign`) without wrapping every cell render in a styled span.
 *
 * Wrapper spans still work for the "I want this *one* cell to be different" case;
 * `meta` covers the common "every cell in the column lines up the same way".
 */
export interface TableColumnMeta {
  /** Accessible label used when the column header isn't a plain string. */
  label?: string;
  /**
   * Horizontal alignment applied to every header / body / footer cell in the column.
   * Maps directly to `text-align`. Defaults to `left` (the table's CSS default).
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Vertical alignment applied to every header / body / footer cell in the column.
   * Maps directly to `vertical-align`. Defaults to `middle` for body cells via the
   * table's stylesheet.
   */
  vAlign?: 'top' | 'middle' | 'bottom';
  /**
   * Per-cell `rowSpan` resolver. Lets a column collapse consecutive rows that
   * share a value into a single vertically-spanning cell ("grouped rows").
   *
   * Return:
   * - `n >= 2` — render the cell with `rowSpan={n}`,
   * - `1` (or undefined) — render the cell normally,
   * - `0` — skip the `<td>` entirely; a previous row's spanning cell covers it.
   *
   * Pair with the `groupRowSpan` helper for the common "consecutive rows sharing
   * a key" case. Only the body cells honor this hook — header and footer cells
   * are unaffected.
   */
  rowSpan?: (row: Row<UnknownTData>) => number;
}

/**
 * Internal type alias used in `TableColumnMeta.rowSpan` so the resolver can
 * accept any row shape without forcing the meta interface to be generic
 * (TanStack's `columnDef.meta` is intentionally loosely-typed).
 */
type UnknownTData = unknown;

/**
 * Builds a `meta.rowSpan` resolver that collapses **consecutive** rows sharing
 * the same key into a single spanning cell — the React equivalent of
 * Angular's `groupRowSpan`.
 *
 * Pass the same array you hand to `<Table data={...}>` plus a key extractor:
 *
 * ```tsx
 * const data = [
 *   { id: '1', date: '2026-05-20', doctor: 'Dr Tamm' },
 *   { id: '2', date: '2026-05-20', doctor: 'Dr Tamm' },
 *   { id: '3', date: '2026-05-21', doctor: 'Dr Kask' },
 * ];
 * const columns: ColumnDef<Row>[] = [
 *   { accessorKey: 'date', header: 'Date', meta: { rowSpan: groupRowSpan(data, (d) => d.date) } },
 *   { accessorKey: 'doctor', header: 'Doctor' },
 * ];
 * ```
 *
 * Resolves against the original `data` array order — sorting / filtering /
 * pagination will not regroup rows, so the data should already be ordered
 * for the grouping you want before passing it in.
 */
export const groupRowSpan = <TData,>(
  data: TData[],
  getKey: (item: TData) => unknown
): ((row: Row<TData>) => number) => {
  return (row) => {
    const idx = row.index;
    if (idx < 0 || idx >= data.length) return 1;
    const currentKey = getKey(data[idx]);
    if (idx > 0 && getKey(data[idx - 1]) === currentKey) return 0;
    let span = 1;
    for (let i = idx + 1; i < data.length; i++) {
      if (getKey(data[i]) === currentKey) span++;
      else break;
    }
    return span;
  };
};

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

export type TableSelectionCheckboxProps = Omit<
  CheckboxProps,
  | 'id'
  | 'name'
  | 'label'
  | 'hideLabel'
  | 'value'
  | 'checked'
  | 'defaultChecked'
  | 'indeterminate'
  | 'disabled'
  | 'onChange'
>;

export type TableSelectionRadioProps = Omit<
  RadioProps,
  'id' | 'name' | 'label' | 'hideLabel' | 'value' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange'
>;

/**
 * Row-selection indicator type. `'multiple'` (default) uses checkboxes with a
 * select-all header; `'single'` uses radios, hides the header, and limits
 * `rowSelection` to a single row at a time.
 */
export type TableSelectionMode = 'multiple' | 'single';

export type TableExpandCollapseProps = Omit<
  CollapseProps,
  'id' | 'controlsId' | 'children' | 'open' | 'onToggle' | 'openText' | 'closeText' | 'title'
>;

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
   * Highlights the row whose `id` matches as the currently-active row.
   *
   * Useful in master-detail layouts where the click handler navigates or opens a side
   * panel and the table should stay visibly anchored to that row. Distinct from row
   * selection (which is checkbox-driven via `enableRowSelection`) and from the
   * transient `:hover` state. Renders with `aria-current="true"` for screen readers.
   */
  activeRowId?: string;
  /**
   * Paint a hover background on data rows when the cursor is over them. Off by default —
   * a hover highlight implies the row is interactive, which is misleading when there's
   * nothing to click. Pass `true` for read-only tables that still want the affordance,
   * or omit and the table will turn hover on automatically whenever `onRowClick` is set.
   */
  rowHover?: boolean;
  /**
   * Enables row selection. When true, Table prepends a selection column with
   * a checkbox (or radio, when `selectionMode === 'single'`) bound to
   * `rowSelection` state.
   */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /**
   * How rows are selected when `enableRowSelection` is on:
   * - `'multiple'` (default) — checkbox per row + select-all in the header.
   *   `rowSelection` can hold any number of row ids.
   * - `'single'` — radio per row, no select-all. Selecting a row clears any
   *   previous selection, so `rowSelection` holds at most one row id.
   *
   * In both modes the controlled `state.rowSelection` / `onStateChange` API
   * is unchanged — only the indicator and TanStack's underlying multi-select
   * behavior change.
   * @default multiple
   */
  selectionMode?: TableSelectionMode;
  /**
   * Paints the `--table-active` background tint on every selected row. Turn
   * off when checkboxes are used purely for "pick some rows for a bulk
   * action" and the row-level highlight would be visually noisy. The
   * checkbox itself still reflects the selected state.
   * @default true
   */
  highlightSelectedRows?: boolean;
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
   * Props forwarded to the row-selection checkboxes (the header select-all
   * checkbox and every per-row cell checkbox). Use this to e.g. switch the
   * checkboxes to `size: 'large'`. Wiring props (id, name, label, value,
   * checked, indeterminate, disabled, onChange, hideLabel) are owned by
   * Table and cannot be overridden. Ignored when `selectionMode === 'single'`.
   */
  checkboxProps?: TableSelectionCheckboxProps;
  /**
   * Props forwarded to the row-selection radios when `selectionMode === 'single'`.
   * Use this to e.g. switch the radios to `size: 'large'`. Wiring props
   * (id, name, label, value, checked, disabled, onChange, hideLabel) are owned
   * by Table and cannot be overridden.
   */
  radioProps?: TableSelectionRadioProps;
  /**
   * Props forwarded to the row-expand Collapse toggle. Use this to e.g.
   * switch to `arrowType: 'default'`, change the icon size, or disable
   * `iconOnly`. Wiring props (id, controlsId, open, onToggle, openText,
   * closeText, children) are owned by Table and cannot be overridden.
   */
  collapseProps?: TableExpandCollapseProps;
  /**
   * Per-row className / inline style hook. Called once for every data row and
   * the returned `className` is merged with Table's own row classes; the
   * returned `style` is applied to the `<tr>`. Useful for drag-and-drop drop
   * indicators, conditional row tinting, etc. Row event handlers are NOT
   * accepted here — Table owns row click / keyboard behavior.
   */
  rowProps?: (row: Row<TData>) => { className?: string; style?: CSSProperties } | undefined;
  /**
   * Per-column className / inline style hook. Called for every header cell
   * and every body cell; whatever is returned is applied to *both* the `<th>`
   * (including the column-filter row) and every `<td>` belonging to the
   * column. Useful for drag-and-drop drop indicators that should span the
   * full column height, or for column-level theming. Identify the column via
   * the `columnId` argument.
   */
  columnProps?: (columnId: string) => { className?: string; style?: CSSProperties } | undefined;
  /**
   * Toolbar + Table subcomponents such as `<Table.ColumnsMenu />`.
   */
  children?: ReactNode;
  /**
   * Enables row drag-and-drop reordering. The Table auto-injects a leading
   * drag-handle column and wires up the native HTML5 drag API internally —
   * the consumer just listens to `onRowDrop` and applies the new order to the
   * source `data` array.
   *
   * Each `row.id` returned by TanStack is used as the drag identifier, so the
   * data must have a stable `id` (or supply `getRowId`).
   *
   * **Accessibility caveat:** HTML5 drag-and-drop is pointer-only — keyboard
   * users cannot reorder rows by focusing the grip. Provide an alternative
   * reorder mechanism (e.g. "Move up" / "Move down" buttons in a row action
   * menu) if keyboard parity matters for your audience.
   *
   * @default false
   */
  draggableRows?: boolean;
  /**
   * Enables column drag-and-drop reordering. Each (non-built-in, non-grouped)
   * leaf header gets a grip button next to its label. Dropping a column
   * pushes the new order into TanStack's `columnOrder` state — flows through
   * `onStateChange` and the `persist` adapter automatically.
   *
   * Grouped header parents are never draggable; only flat / leaf columns are.
   * Built-in slots (`__drag__`, `__select__`, `__expand__`) are skipped.
   *
   * **Same a11y caveat as `draggableRows`** — pointer-only.
   *
   * @default false
   */
  draggableColumns?: boolean;
  /**
   * Fires when a draggable row is dropped to a new position. Receives the
   * before/after `row.id`s and the convenience indexes. Apply the move to your
   * data with `arrayMove(data, fromIndex, toIndex)` and pass the result back
   * via `data`.
   *
   * Only invoked when `draggableRows` is enabled and the drop actually changes
   * the row order.
   */
  onRowDrop?: (event: TableRowDropEvent) => void;
}

interface TableDataRowProps<TData> {
  row: Row<TData>;
  rowClassName: string;
  rowStyle: CSSProperties | undefined;
  isActiveRow: boolean;
  clickable: boolean;
  onClick: ((row: Row<TData>) => void) | undefined;
  onKeyDownHandler: ((event: KeyboardEvent<HTMLTableRowElement>) => void) | undefined;
  ariaRowIndex: number | undefined;
  columnProps: ((columnId: string) => { className?: string; style?: CSSProperties } | undefined) | undefined;
  draggable: boolean;
  dragHandleLabel: string;
  /** When `draggable` is true, native HTML5 drag handlers wired by the parent Table. */
  dragHandlers?: {
    onDragStart: (event: ReactDragEvent<HTMLTableRowElement>) => void;
    onDragOver: (event: ReactDragEvent<HTMLTableRowElement>) => void;
    onDragLeave: () => void;
    onDragEnd: () => void;
    onDrop: (event: ReactDragEvent<HTMLTableRowElement>) => void;
    onHandlePointerDown: () => void;
  };
  /** Column id currently being dragged over (for drop-target indicator on body cells). */
  dragOverColumnId?: string | null;
}

const DRAG_HANDLE_ATTR = 'data-tedi-drag-handle';

const DragHandleCell = ({ label, onHandlePointerDown }: { label: string; onHandlePointerDown: () => void }) => (
  <button
    type="button"
    className={styles['tedi-table__drag-handle']}
    aria-label={label}
    onClick={(event) => event.stopPropagation()}
    onMouseDown={onHandlePointerDown}
    onTouchStart={onHandlePointerDown}
    {...{ [DRAG_HANDLE_ATTR]: '' }}
  >
    <Icon name="drag_indicator" size={18} color="inherit" />
  </button>
);

const TableDataRowBody = <TData,>(props: TableDataRowProps<TData>) => {
  const {
    row,
    rowClassName,
    rowStyle,
    isActiveRow,
    clickable,
    onClick,
    onKeyDownHandler,
    ariaRowIndex,
    columnProps,
    draggable,
    dragHandleLabel,
    dragHandlers,
    dragOverColumnId,
  } = props;

  return (
    <tr
      className={rowClassName}
      style={rowStyle}
      draggable={draggable || undefined}
      onDragStart={dragHandlers?.onDragStart}
      onDragOver={dragHandlers?.onDragOver}
      onDragLeave={dragHandlers?.onDragLeave}
      onDragEnd={dragHandlers?.onDragEnd}
      onDrop={dragHandlers?.onDrop}
      onClick={clickable && onClick ? () => onClick(row) : undefined}
      onKeyDown={clickable ? onKeyDownHandler : undefined}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      aria-rowindex={ariaRowIndex}
      aria-current={isActiveRow ? 'true' : undefined}
    >
      {row.getVisibleCells().map((cell) => {
        const cellMeta = cell.column.columnDef.meta as TableColumnMeta | undefined;
        const userColumnProps = columnProps?.(cell.column.id);
        const isDragCell = draggable && cell.column.id === DRAG_COLUMN_ID;
        const isDragOverThisCol = !!dragOverColumnId && cell.column.id === dragOverColumnId;
        const resolvedRowSpan = cellMeta?.rowSpan?.(cell.row as Row<unknown>);
        if (resolvedRowSpan === 0) return null;
        return (
          <td
            key={cell.id}
            rowSpan={resolvedRowSpan && resolvedRowSpan > 1 ? resolvedRowSpan : undefined}
            className={cn(
              styles['tedi-table__cell'],
              {
                [styles[`tedi-table__cell--align-${cellMeta?.align}`]]: cellMeta?.align,
                [styles[`tedi-table__cell--valign-${cellMeta?.vAlign}`]]: cellMeta?.vAlign,
                [styles['tedi-table__cell--drag-handle']]: isDragCell,
                [styles['tedi-table__cell--drag-over']]: isDragOverThisCol,
              },
              userColumnProps?.className
            )}
            style={userColumnProps?.style}
          >
            {isDragCell ? (
              <DragHandleCell
                label={dragHandleLabel}
                onHandlePointerDown={dragHandlers?.onHandlePointerDown ?? (() => undefined)}
              />
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </td>
        );
      })}
    </tr>
  );
};

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
const DRAG_COLUMN_ID = '__drag__';

/**
 * Payload emitted by `Table` when a row is reordered via drag-and-drop.
 *
 * `fromIndex` / `toIndex` are positions in the **source `data` array** —
 * unchanged by sorting, filtering, or pagination. Apply directly with e.g.
 * `arrayMove(data, fromIndex, toIndex)`. `fromId` / `toId` mirror those
 * positions via the rows' TanStack ids (defaulting to the row's string
 * index in `data`, unless overridden via `getRowId`).
 */
export interface TableRowDropEvent {
  fromId: string;
  toId: string;
  /** Index of the dragged row in the original `data` array. */
  fromIndex: number;
  /** Index of the drop target in the original `data` array. */
  toIndex: number;
}

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
    activeRowId,
    rowHover,
    enableRowSelection,
    selectionMode = 'multiple',
    highlightSelectedRows = true,
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
    checkboxProps,
    radioProps,
    collapseProps,
    rowProps,
    columnProps,
    draggableRows = false,
    onRowDrop,
    draggableColumns = false,
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

    if (draggableRows) {
      leading.push({
        id: DRAG_COLUMN_ID,
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        size: 40,
        header: '',
        cell: () => null,
      });
    }

    if (hasSelection) {
      const isSingle = selectionMode === 'single';
      const radioGroupName = `${resolvedId}-select`;

      leading.push({
        id: SELECT_COLUMN_ID,
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        size: 40,
        header: isSingle
          ? ''
          : ({ table }) => (
              <Checkbox
                {...checkboxProps}
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
        cell: ({ row }) =>
          isSingle ? (
            <Radio
              {...radioProps}
              id={`${resolvedId}-select-${row.id}`}
              name={radioGroupName}
              label={getLabelRef.current('table.select-row', row.getIsSelected())}
              hideLabel
              value={row.id}
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={(_value, checked) => {
                if (checked) row.toggleSelected(true);
              }}
            />
          ) : (
            <Checkbox
              {...checkboxProps}
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
                iconOnly
                arrowType="secondary"
                hideCollapseText
                {...collapseProps}
                id={`${resolvedId}-expand-${row.id}`}
                controlsId={subRowId}
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
  }, [
    columns,
    hasSelection,
    selectionMode,
    hasExpansion,
    draggableRows,
    resolvedId,
    checkboxProps,
    radioProps,
    collapseProps,
  ]);

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
    enableMultiRowSelection: selectionMode !== 'single',
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
  const hoverEnabled = rowHover ?? Boolean(onRowClick);

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
      [styles['tedi-table--row-hover']]: hoverEnabled,
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

  const [draggingRowId, setDraggingRowId] = useState<string | null>(null);
  const [dragOverRowId, setDragOverRowId] = useState<string | null>(null);
  const draggingRowIdRef = useRef<string | null>(null);
  const armedRowIdRef = useRef<string | null>(null);

  const [draggingColumnId, setDraggingColumnId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const draggingColumnIdRef = useRef<string | null>(null);
  const armedColumnIdRef = useRef<string | null>(null);

  const rowIndexById = useMemo<Map<string, number>>(
    () => (draggableRows ? new Map(rows.map((r) => [r.id, r.index])) : new Map()),
    [draggableRows, rows]
  );

  useEffect(() => {
    if (!draggableRows && !draggableColumns) return;
    const disarm = () => {
      armedRowIdRef.current = null;
      armedColumnIdRef.current = null;
    };
    window.addEventListener('mouseup', disarm);
    window.addEventListener('touchend', disarm);
    return () => {
      window.removeEventListener('mouseup', disarm);
      window.removeEventListener('touchend', disarm);
    };
  }, [draggableRows, draggableColumns]);

  const buildRowDragHandlers = useCallback(
    (rowId: string) => ({
      onHandlePointerDown: () => {
        armedRowIdRef.current = rowId;
      },
      onDragStart: (event: ReactDragEvent<HTMLTableRowElement>) => {
        if (armedRowIdRef.current !== rowId) {
          event.preventDefault();
          return;
        }
        armedRowIdRef.current = null;
        event.dataTransfer.effectAllowed = 'move';
        try {
          event.dataTransfer.setData('text/plain', rowId);
        } catch {
          /* IE / older Safari quirks — safe to ignore */
        }

        const sourceRow = event.currentTarget;
        const sourceTable = sourceRow.closest('table');
        if (sourceTable) {
          const rowRect = sourceRow.getBoundingClientRect();
          const sourceCells = Array.from(sourceRow.children) as HTMLElement[];
          const ghost = document.createElement('div');
          ghost.style.cssText = `position:fixed;top:-10000px;left:0;width:${rowRect.width}px;pointer-events:none;`;
          const ghostTable = document.createElement('table');
          ghostTable.className = sourceTable.className;
          ghostTable.style.cssText = `width:${rowRect.width}px;table-layout:fixed;border-collapse:collapse;`;
          const ghostBody = document.createElement('tbody');
          const ghostRow = sourceRow.cloneNode(true) as HTMLTableRowElement;
          ghostRow.classList.add(styles['tedi-table__row--drag-preview']);
          const ghostCells = Array.from(ghostRow.children) as HTMLElement[];
          sourceCells.forEach((cell, i) => {
            const ghostCell = ghostCells[i];
            if (!ghostCell) return;
            const cellRect = cell.getBoundingClientRect();
            ghostCell.style.width = `${cellRect.width}px`;
            ghostCell.style.minWidth = `${cellRect.width}px`;
            ghostCell.style.maxWidth = `${cellRect.width}px`;
          });
          ghostBody.appendChild(ghostRow);
          ghostTable.appendChild(ghostBody);
          ghost.appendChild(ghostTable);
          document.body.appendChild(ghost);
          event.dataTransfer.setDragImage(ghost, 24, rowRect.height / 2);
          window.setTimeout(() => ghost.remove(), 0);
        }

        draggingRowIdRef.current = rowId;
        setDraggingRowId(rowId);
      },
      onDragOver: (event: ReactDragEvent<HTMLTableRowElement>) => {
        if (!draggingRowIdRef.current || draggingRowIdRef.current === rowId) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setDragOverRowId(rowId);
      },
      onDragLeave: () => {
        setDragOverRowId((current) => (current === rowId ? null : current));
      },
      onDragEnd: () => {
        draggingRowIdRef.current = null;
        armedRowIdRef.current = null;
        setDraggingRowId(null);
        setDragOverRowId(null);
      },
      onDrop: (event: ReactDragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
        const fromId = draggingRowIdRef.current;
        const toId = rowId;
        draggingRowIdRef.current = null;
        armedRowIdRef.current = null;
        setDraggingRowId(null);
        setDragOverRowId(null);
        if (!fromId || fromId === toId) return;
        const fromIndex = rowIndexById.get(fromId);
        const toIndex = rowIndexById.get(toId);
        if (fromIndex === undefined || toIndex === undefined) return;
        onRowDrop?.({ fromId, toId, fromIndex, toIndex });
      },
    }),
    [rowIndexById, onRowDrop]
  );

  const moveItem = <T,>(array: T[], from: number, to: number): T[] => {
    const next = array.slice();
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
  };

  const buildColumnDragHandlers = useCallback(
    (columnId: string) => ({
      onHandlePointerDown: () => {
        armedColumnIdRef.current = columnId;
      },
      onDragStart: (event: ReactDragEvent<HTMLTableCellElement>) => {
        if (armedColumnIdRef.current !== columnId) {
          event.preventDefault();
          return;
        }
        armedColumnIdRef.current = null;
        event.dataTransfer.effectAllowed = 'move';
        try {
          event.dataTransfer.setData('text/plain', columnId);
        } catch {
          /* */
        }

        const sourceCell = event.currentTarget;
        const rect = sourceCell.getBoundingClientRect();
        const ghost = document.createElement('div');
        ghost.style.cssText = `position:fixed;top:-10000px;left:0;width:${rect.width}px;pointer-events:none;`;
        const ghostTable = document.createElement('table');
        const sourceTable = sourceCell.closest('table');
        ghostTable.className = sourceTable?.className ?? '';
        ghostTable.style.cssText = `width:${rect.width}px;table-layout:fixed;border-collapse:collapse;`;
        const ghostHead = document.createElement('thead');
        const ghostRow = document.createElement('tr');
        ghostRow.className = styles['tedi-table__row'] ?? '';
        const ghostCell = sourceCell.cloneNode(true) as HTMLTableCellElement;
        ghostCell.classList.add(styles['tedi-table__header-cell--drag-preview']);
        ghostCell.style.width = `${rect.width}px`;
        ghostRow.appendChild(ghostCell);
        ghostHead.appendChild(ghostRow);
        ghostTable.appendChild(ghostHead);
        ghost.appendChild(ghostTable);
        document.body.appendChild(ghost);
        event.dataTransfer.setDragImage(ghost, rect.width / 2, rect.height / 2);
        window.setTimeout(() => ghost.remove(), 0);

        draggingColumnIdRef.current = columnId;
        setDraggingColumnId(columnId);
      },
      onDragOver: (event: ReactDragEvent<HTMLTableCellElement>) => {
        if (!draggingColumnIdRef.current || draggingColumnIdRef.current === columnId) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setDragOverColumnId(columnId);
      },
      onDragLeave: () => {
        setDragOverColumnId((current) => (current === columnId ? null : current));
      },
      onDragEnd: () => {
        draggingColumnIdRef.current = null;
        armedColumnIdRef.current = null;
        setDraggingColumnId(null);
        setDragOverColumnId(null);
      },
      onDrop: (event: ReactDragEvent<HTMLTableCellElement>) => {
        event.preventDefault();
        const fromId = draggingColumnIdRef.current;
        const toId = columnId;
        draggingColumnIdRef.current = null;
        armedColumnIdRef.current = null;
        setDraggingColumnId(null);
        setDragOverColumnId(null);
        if (!fromId || fromId === toId) return;

        const currentOrder = table.getState().columnOrder;
        const baseOrder = currentOrder.length > 0 ? currentOrder : table.getAllLeafColumns().map((c) => c.id);
        const fromIndex = baseOrder.indexOf(fromId);
        const toIndex = baseOrder.indexOf(toId);
        if (fromIndex < 0 || toIndex < 0) return;
        table.setColumnOrder(moveItem(baseOrder, fromIndex, toIndex));
      },
    }),
    [table]
  );

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
                    const headerMeta = header.column.columnDef.meta as TableColumnMeta | undefined;
                    const headerLabel =
                      headerMeta?.label ??
                      (typeof header.column.columnDef.header === 'string' ? header.column.columnDef.header : undefined);
                    const userColumnProps = columnProps?.(header.column.id);
                    const headerSize = header.column.getSize();
                    const isBuiltInColumn =
                      header.column.id === DRAG_COLUMN_ID ||
                      header.column.id === SELECT_COLUMN_ID ||
                      header.column.id === EXPAND_COLUMN_ID;
                    const colDraggable = draggableColumns && isStandaloneLeaf && !isBuiltInColumn;
                    const colHandlers = colDraggable ? buildColumnDragHandlers(header.column.id) : undefined;
                    const isDraggingThisCol = colDraggable && draggingColumnId === header.column.id;
                    const isDragOverThisCol =
                      colDraggable && dragOverColumnId === header.column.id && draggingColumnId !== header.column.id;
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        rowSpan={rowSpanCount > 1 ? rowSpanCount : undefined}
                        draggable={colDraggable || undefined}
                        onDragStart={colHandlers?.onDragStart}
                        onDragOver={colHandlers?.onDragOver}
                        onDragLeave={colHandlers?.onDragLeave}
                        onDragEnd={colHandlers?.onDragEnd}
                        onDrop={colHandlers?.onDrop}
                        className={cn(
                          styles['tedi-table__header-cell'],
                          {
                            [styles['tedi-table__header-cell--group']]: isGroup,
                            [styles['tedi-table__header-cell--dragging']]: isDraggingThisCol,
                            [styles['tedi-table__header-cell--drag-over']]: isDragOverThisCol,
                            [styles[`tedi-table__cell--align-${headerMeta?.align}`]]: headerMeta?.align,
                            [styles[`tedi-table__cell--valign-${headerMeta?.vAlign}`]]: headerMeta?.vAlign,
                          },
                          userColumnProps?.className
                        )}
                        scope="col"
                        aria-sort={ariaSort}
                        aria-label={headerLabel}
                        style={
                          headerSize || userColumnProps?.style
                            ? { ...(headerSize ? { width: headerSize } : null), ...userColumnProps?.style }
                            : undefined
                        }
                      >
                        {colDraggable && colHandlers ? (
                          <span className={styles['tedi-table__header-cell-inner']}>
                            <button
                              type="button"
                              className={styles['tedi-table__drag-handle']}
                              aria-label={getLabel('table.drag-column', headerLabel ?? header.column.id)}
                              onClick={(event) => event.stopPropagation()}
                              onMouseDown={colHandlers.onHandlePointerDown}
                              onTouchStart={colHandlers.onHandlePointerDown}
                              {...{ [DRAG_HANDLE_ATTR]: '' }}
                            >
                              <Icon name="drag_indicator" size={18} color="inherit" />
                            </button>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
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
                    const meta = column.columnDef.meta as TableColumnMeta | undefined;
                    const headerLabel =
                      meta?.label ??
                      (typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id);
                    const filterId = `${resolvedId}-filter-${column.id}`;
                    const userColumnProps = columnProps?.(column.id);

                    return (
                      <th
                        key={column.id}
                        className={cn(styles['tedi-table__header-cell'], userColumnProps?.className)}
                        style={userColumnProps?.style}
                        scope="col"
                      >
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
                  const isActiveRow = activeRowId !== undefined && row.id === activeRowId;
                  const userRowProps = rowProps?.(row);
                  const rowClassName = cn(
                    styles['tedi-table__row'],
                    {
                      [styles['tedi-table__row--selected']]: highlightSelectedRows && row.getIsSelected(),
                      [styles['tedi-table__row--active']]: isActiveRow,
                      [styles['tedi-table__row--clickable']]: clickable,
                      [styles['tedi-table__row--sub-row']]: row.depth > 0,
                    },
                    userRowProps?.className
                  );
                  const ariaRowIndex = paginationEnabled
                    ? headerRowCount + rowIndexOffset + visibleIndex + 1
                    : undefined;
                  const subRowId = `${resolvedId}-sub-${row.id}`;
                  const isDraggingThisRow = draggableRows && draggingRowId === row.id;
                  const isDragOverThisRow = draggableRows && dragOverRowId === row.id && draggingRowId !== row.id;
                  const rowProps2: TableDataRowProps<TData> = {
                    row,
                    rowClassName: cn(rowClassName, {
                      [styles['tedi-table__row--dragging']]: isDraggingThisRow,
                      [styles['tedi-table__row--drag-over']]: isDragOverThisRow,
                    }),
                    rowStyle: userRowProps?.style,
                    isActiveRow,
                    clickable,
                    onClick: onRowClick,
                    onKeyDownHandler: handleRowKeyDown(row),
                    ariaRowIndex,
                    columnProps,
                    draggable: draggableRows,
                    dragHandleLabel: getLabel('table.drag-row'),
                    dragHandlers: draggableRows ? buildRowDragHandlers(row.id) : undefined,
                    dragOverColumnId: draggableColumns ? dragOverColumnId : null,
                  };
                  return (
                    <Fragment key={row.id}>
                      <TableDataRowBody {...rowProps2} />
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
                    {group.headers.map((header) => {
                      const footerMeta = header.column.columnDef.meta as TableColumnMeta | undefined;
                      return (
                        <td
                          key={header.id}
                          colSpan={header.colSpan}
                          className={cn(styles['tedi-table__cell'], styles['tedi-table__cell--footer'], {
                            [styles[`tedi-table__cell--align-${footerMeta?.align}`]]: footerMeta?.align,
                            [styles[`tedi-table__cell--valign-${footerMeta?.vAlign}`]]: footerMeta?.vAlign,
                          })}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.footer, header.getContext())}
                        </td>
                      );
                    })}
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
