import type { Column } from '@tanstack/react-table';
import type { ReactNode } from 'react';

/**
 * A button in the footer of the column filter popover:
 * - `'apply'` commits the draft as the column filter and closes.
 * - `'clear'` removes the column filter and closes.
 * - `'cancel'` closes and leaves the applied filter as it was; the unapplied draft is discarded.
 */
export type TableFilterAction = 'apply' | 'clear' | 'cancel';

export type TableFilterPopoverWidth = 'small' | 'medium' | 'large' | 'none';

/** Tuning options for a column's filter popover, passed through `meta.filterable`. */
export interface TableFilterOptions {
  /**
   * Resets the draft to the applied filter value each time the popover opens.
   * @default false
   */
  clearOnClose?: boolean;
  /** Popover width for this column, overriding the table's `filterPopoverWidth`. */
  popoverWidth?: TableFilterPopoverWidth;
  /**
   * Footer buttons for this column in display order, overriding the table's `filterActions`; an empty array hides the footer.
   */
  actions?: TableFilterAction[];
}

/** Context handed to a column's `meta.filterContent` render function. */
export interface TableFilterContext<TValue = unknown, TData = unknown> {
  /** Current draft, the value the filter input should show. */
  value: TValue;
  /** Writes the draft. Does not filter yet; call `apply()` to commit. */
  setValue: (next: TValue) => void;
  /** Commits the draft with `column.setFilterValue` and closes the popover. */
  apply: () => void;
  /** Removes the applied filter and closes the popover. */
  clear: () => void;
  /** Closes the popover, keeping the applied filter. The draft is reset to the applied value. */
  cancel: () => void;
  /** TanStack column the popover filters. */
  column: Column<TData, unknown>;
  /** Accessible column name, for labelling the filter input. */
  label: string;
}

export type TableFilterContent<TData = unknown> = (context: TableFilterContext<unknown, TData>) => ReactNode;
