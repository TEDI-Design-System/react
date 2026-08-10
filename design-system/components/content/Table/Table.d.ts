import * as React from 'react';

/**
 * Table — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/table/table.stories.tsx).
 * @replaces table
 */
export interface TableProps<TData> {
  /** Unique identifier for the table. Used for accessibility and as the default persistence key namespace. */
  id?: string;
  /** Row data. Render order mirrors the array order; reorder the array yourself (e.g. in `onRowDrop`) to change it. */
  data: TData[];
  /** Returns a stable id for each row. Without it, TanStack falls back to the row index — so identifiers shift when rows sort / paginate / reorder, which breaks record stability for `rowSelection`, `activeRowId`, and the `onRowDrop` `fromId`/`toId`. Set this whenever your data has a stable key. */
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  /** Column definitions. Must include a stable `id` on every column when column visibility / reorder / persistence are used. */
  columns: ColumnDef<TData>[];
  /** Visual size of the table. Matches Figma: `medium` = 49px rows, `small` = 41px rows. */
  size?: "small" | "medium";
  /** Caption rendered above the table. Announced to assistive technology. */
  caption?: React.ReactNode;
  /** Alternating row backgrounds. */
  striped?: boolean;
  /** Renders vertical separators between columns. */
  verticalBorders?: boolean;
  /** Removes the outer border + radius around the table, keeping only internal row dividers. */
  borderless?: boolean;
  /** Freezes the first column during horizontal scroll. */
  stickyFirstColumn?: boolean;
  /** Pins the `<thead>` row(s) to the top during vertical scroll. Requires `maxHeight` so the table's internal scroll container becomes the sticky anchor — wrapping the Table in an external scrollable div will NOT work, because the `<thead>` sticks to its nearest scrolling ancestor (which is always the internal `.tedi-table__scroll` div). Combines safely with `stickyFirstColumn`. */
  stickyHeader?: boolean;
  /** Constrains the height of the table's internal scroll container. Accepts any CSS length value (`number` is treated as pixels). Pair with `stickyHeader` for a fixed-height table whose header stays pinned during vertical scroll. */
  maxHeight?: string | number;
  /** Fires when a data row is clicked. Adds `role="button"`, a pointer cursor and Enter/Space keyboard activation to every row. */
  onRowClick?: (row: Row<TData>) => void;
  /** Highlights the row whose `id` matches as the currently-active row. Useful in master-detail layouts where the click handler navigates or opens a side panel and the table should stay visibly anchored to that row. Distinct from row selection (which is checkbox-driven via `enableRowSelection`) and from the transient `:hover` state. Renders with `aria-current="true"` for screen readers. */
  activeRowId?: string;
  /** Paint a hover background on data rows when the cursor is over them. Off by default — a hover highlight implies the row is interactive, which is misleading when there's nothing to click. Pass `true` for read-only tables that still want the affordance, or omit and the table will turn hover on automatically whenever `onRowClick` is set. */
  rowHover?: boolean;
  /** Enables row selection. When true, Table prepends a selection column with a checkbox (or radio, when `selectionMode === 'single'`) bound to `rowSelection` state. */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /** How rows are selected when `enableRowSelection` is on: - `'multiple'` (default) — checkbox per row + select-all in the header. `rowSelection` can hold any number of row ids. - `'single'` — radio per row, no select-all. Selecting a row clears any previous selection, so `rowSelection` holds at most one row id. In both modes the controlled `state.rowSelection` / `onStateChange` API is unchanged — only the indicator and TanStack's underlying multi-select behavior change. */
  selectionMode?: "single" | "multiple";
  /** Paints the `--table-active` background tint on every selected row. Turn off when checkboxes are used purely for "pick some rows for a bulk action" and the row-level highlight would be visually noisy. The checkbox itself still reflects the selected state. */
  highlightSelectedRows?: boolean;
  /** Enables per-column filter inputs rendered below the header row. Only columns whose `columnDef.enableColumnFilter !== false` render an input. */
  enableColumnFilters?: boolean;
  /** Render function for the expanded content of a row. When provided, Table prepends an expand/collapse toggle column and renders this node in a full- width row below every expanded parent row. */
  renderSubComponent?: (row: Row<TData>) => ReactNode;
  /** Predicate controlling which rows can be expanded. Defaults to "all rows" when `renderSubComponent` is provided, otherwise "none". */
  getRowCanExpand?: (row: Row<TData>) => boolean;
  /** Returns the sub-rows of a data row. Enables nested hierarchical data. */
  getSubRows?: (row: TData) => TData[] | undefined;
  /** How an expandable row is toggled: - `'button'` (default) — only the chevron button toggles expansion, and it renders in the bordered `secondary` arrow style. - `'row'` — a click anywhere on an expandable row toggles it (Enter/Space too), and the chevron renders in the neutral `default` arrow style as a plain indicator. Only rows that can expand become clickable. Has no effect unless the table is expandable (`getSubRows` or `renderSubComponent` is set). */
  expandTrigger?: "button" | "row";
  /** Whether expanded sub-rows count toward pagination (TanStack's `paginateExpandedRows`). Defaults to `false` so expanding a parent keeps its children on the same page and only top-level rows fill `pageSize` — opening a row never pushes siblings to the next page or splits a parent's children across pages. Set to `true` for TanStack's default, where sub-rows occupy page slots like any other row. Has no effect unless the table is both expandable and paginated. */
  paginateExpandedRows?: boolean;
  /** Enables client-side pagination and renders a built-in page-switcher footer. Pass `true` for default settings or an options object to customise. Page state lives on `TableState.pagination` so it is fully controllable and persistable. */
  pagination?: boolean | TablePaginationOptions;
  /** Whether the current page resets to the first page whenever `data` changes (TanStack's `autoResetPageIndex`). Defaults to `true` for client-side pagination (keeps the user on a valid page after filtering or sorting) and to `false` when `manualPagination` is set — in server-side mode `data` is replaced on every page/sort change, so auto-resetting would bounce the user back to page 1 and trigger an update loop. Set to `false` for client-side tables that mutate `data` in place (e.g. inline row editing), or override explicitly in either mode. */
  autoResetPageIndex?: boolean;
  /** Switches pagination to server-side mode. When `true`, Table stops slicing `data` locally — `data` is treated as the rows for the current page only. Pair with `pageCount` (or `rowCount`) and a controlled `state.pagination` + `onStateChange` to fetch the right page from the server on each change. */
  manualPagination?: boolean;
  /** Switches sorting to server-side mode. When `true`, Table no longer sorts `data` locally — sort state still updates and fires `onStateChange` so the parent can refetch in the new order, but the rows are rendered in the order they arrive in `data`. */
  manualSorting?: boolean;
  /** Switches filtering to server-side mode. When `true`, Table stops applying `columnFilters` locally; the parent is expected to translate filter state (visible via `onStateChange`) into a server query. */
  manualFiltering?: boolean;
  /** Total number of pages on the server. Required when `manualPagination` is `true` so the pagination footer can render the right page count — local row-count math is otherwise wrong, since `data` only holds the current page's rows. */
  pageCount?: number;
  /** Total number of rows on the server (across all pages). Used as the "X tulemust" / "X results" counter in the pagination footer when `manualPagination` is on. Falls back to the locally filtered row count when omitted. */
  rowCount?: number;
  /** Controlled state. Pair with `onStateChange`. Any key left undefined falls back to the corresponding default or internal state. */
  state?: Partial<TableState>;
  /** Initial state for uncontrolled usage. Ignored when `state` is provided. */
  defaultState?: Partial<TableState>;
  /** Callback fired whenever any state slice changes. */
  onStateChange?: (state: TableState) => void;
  /** When set, Table wires a localStorage adapter for the named key. Acts as a default state provider and persists subsequent changes. Consumers can still supply `state`/`onStateChange` to layer extra behavior on top. */
  persist?: TablePersistOptions;
  /** Rendered inside `<tbody>` when `data` is empty — typically an `EmptyState` node, or any string / node. */
  emptyState?: React.ReactNode;
  /** ARIA live-region role wrapping the empty state. Use `'status'` for polite announcements (recommended for "no results" feedback when the user changes a filter) or `'alert'` for assertive announcements that interrupt the current SR utterance. Omit when the empty state should not announce changes — e.g. when the table is empty on first render and the content never changes. */
  emptyStateRole?: "alert" | "status";
  /** Additional class name on the root element. */
  className?: string;
  /** Props forwarded to the row-selection checkboxes (the header select-all checkbox and every per-row cell checkbox). Use this to e.g. switch the checkboxes to `size: 'large'`. Wiring props (id, name, label, value, checked, indeterminate, disabled, onChange, hideLabel) are owned by Table and cannot be overridden. Ignored when `selectionMode === 'single'`. */
  checkboxProps?: TableSelectionCheckboxProps;
  /** Props forwarded to the row-selection radios when `selectionMode === 'single'`. Use this to e.g. switch the radios to `size: 'large'`. Wiring props (id, name, label, value, checked, disabled, onChange, hideLabel) are owned by Table and cannot be overridden. */
  radioProps?: TableSelectionRadioProps;
  /** Props forwarded to the row-expand `CollapseButton` toggle. Use this to e.g. switch to `arrowType: 'default'` or change the `size`. Wiring props (id, open, onOpenChange, openText, closeText, aria-controls, hideText) are owned by Table and cannot be overridden. */
  collapseProps?: TableExpandCollapseProps;
  /** Per-row className / inline style hook. Called once for every data row and the returned `className` is merged with Table's own row classes; the returned `style` is applied to the `<tr>`. Useful for drag-and-drop drop indicators, conditional row tinting, etc. Row event handlers are NOT accepted here — Table owns row click / keyboard behavior. */
  rowProps?: (row: Row<TData>) => { className?: string; style?: CSSProperties; } | undefined;
  /** Per-column className / inline style hook. Called for every header cell and every body cell; whatever is returned is applied to *both* the `<th>` (including the column-filter row) and every `<td>` belonging to the column. Useful for drag-and-drop drop indicators that should span the full column height, or for column-level theming. Identify the column via the `columnId` argument. */
  columnProps?: (columnId: string) => { className?: string; style?: CSSProperties; } | undefined;
  /** Toolbar + Table subcomponents such as `<Table.ColumnsMenu />`. */
  children?: React.ReactNode;
  /** Enables row reordering by **mouse and keyboard**. The Table auto-injects a leading drag-handle column. Mouse: drag a row by its handle. Keyboard: focus a handle, `Space`/`Enter` to pick the row up, `↑`/`↓` to move it (clamped to the rendered rows), `Space`/`Enter` to drop, `Escape` to cancel — every move (and the drop/cancel) is announced via a live region. Both paths emit `onRowDrop`; the consumer applies the new order to the source `data` array. Each `row.id` returned by TanStack is used as the drag identifier, so the data must have a stable `id` (or supply `getRowId`). */
  reorderableRows?: boolean;
  /** Enables column reordering by **mouse and keyboard**. Each (non-built-in, non-grouped) leaf header gets a grip button next to its label. Mouse: drag the header by its grip. Keyboard: focus the grip, `Space`/`Enter` to pick the column up, `←`/`→` to move it, `Space`/`Enter` to drop, `Escape` to cancel (announced via a live region). Reordering pushes the new order into TanStack's `columnOrder` state — flows through `onStateChange` and the `persist` adapter automatically; no `onRowDrop`-style wiring needed. Grouped header parents are never draggable; only flat / leaf columns are. Built-in slots (`__drag__`, `__select__`, `__expand__`) are skipped. */
  reorderableColumns?: boolean;
  /** Fires when a draggable row is dropped to a new position. Receives the before/after `row.id`s and the convenience indexes. Apply the move to your data with `arrayMove(data, fromIndex, toIndex)` and pass the result back via `data`. Only invoked when `reorderableRows` is enabled and the drop actually changes the row order. */
  onRowDrop?: (event: TableRowDropEvent) => void;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type TableExpandCollapseProps = Omit<CollapseButtonProps, 'id' | 'open' | 'onOpenChange' | 'openText' | 'closeText' | 'aria-controls' | 'hideText'>;

interface TablePaginationOptions {
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
    /**
     * Props forwarded to the built-in `Pagination` to customise its appearance
     * and behaviour — e.g. `background`, `borders`, `hideResults`,
     * `showPrevNextButtons`, `arrowVariant`, `labels`. The data / state props the
     * Table owns (`pageCount`, `page`, `totalItems`, `pageSize`, `pageSizeOptions`
     * and the change handlers) are managed internally and cannot be overridden.
     */
    paginationProps?: Omit<PaginationProps, 'pageCount' | 'page' | 'onPageChange' | 'totalItems' | 'pageSize' | 'pageSizeOptions' | 'onPageSizeChange'>;
}

interface TablePersistOptions {
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
     * only: `columnVisibility`, `columnOrder`.
     * Task-scoped slices (`rowSelection`, `expanded`, `columnFilters`, `sorting`,
     * `pagination`) are deliberately excluded by default — pass them explicitly
     * via `include` if you want them to survive across sessions.
     */
    include?: (keyof TableState)[];
}

interface TableRowDropEvent {
    fromId: string;
    toId: string;
    fromIndex: number;
    toIndex: number;
}

type TableSelectionCheckboxProps = Omit<CheckboxProps, 'id' | 'name' | 'label' | 'hideLabel' | 'value' | 'checked' | 'defaultChecked' | 'indeterminate' | 'disabled' | 'onChange'>;

type TableSelectionRadioProps = Omit<RadioProps, 'id' | 'name' | 'label' | 'hideLabel' | 'value' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange'>;

interface TableState {
    columnVisibility?: VisibilityState;
    columnOrder?: ColumnOrderState;
    rowSelection?: RowSelectionState;
    expanded?: ExpandedState;
    columnFilters?: ColumnFiltersState;
    sorting?: SortingState;
    pagination?: PaginationState;
}

export declare const Table: React.ComponentType<TableProps> & {
  Toolbar: React.ComponentType<any>;
  ColumnsMenu: React.ComponentType<any>;
  HeaderButton: React.ComponentType<any>;
};
