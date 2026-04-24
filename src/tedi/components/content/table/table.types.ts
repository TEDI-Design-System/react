import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnSizingState,
  ExpandedState,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table as ReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import type React from 'react';

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
   * Subset of state slices to persist. Defaults to all slices.
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
   * @default 'medium'
   */
  size?: TableSize;
  /**
   * Caption rendered above the table. Announced to assistive technology.
   */
  caption?: React.ReactNode;
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
  renderSubComponent?: (row: Row<TData>) => React.ReactNode;
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
  placeholder?: React.ReactNode;
  /**
   * Additional class name on the root element.
   */
  className?: string;
  /**
   * Toolbar + Table subcomponents such as `<Table.ColumnsMenu />`.
   */
  children?: React.ReactNode;
}

/**
 * Value exposed through `TableContext`. Subcomponents like ColumnsMenu use it
 * to read and mutate the table state without prop-drilling.
 */
export interface TableContextValue<TData = unknown> {
  table: ReactTable<TData>;
  size: TableSize;
  id?: string;
}
