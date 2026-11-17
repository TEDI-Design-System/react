import { flexRender, Header, SortDirection } from '@tanstack/react-table';

import { useLabels } from '../../../../providers/label-provider';
import {
  TableFilterAction,
  TableFilterContent,
  TableFilterOptions,
  TableFilterPopover,
  TableFilterPopoverWidth,
} from '../table-filter-popover';
import { TableHeaderButton } from '../table-header-button/table-header-button';
import styles from './table-header-content.module.scss';

const SORT_ICONS: Record<SortDirection | 'none', string> = {
  asc: 'arrow_upward',
  desc: 'arrow_downward',
  none: 'unfold_more',
};

export interface TableHeaderContentProps<TData> {
  header: Header<TData, unknown>;
  /** Accessible column name used by the icon-only buttons. */
  label?: string;
  /** Whether the column opted into the built-in sort button via `meta.sortable`. */
  sortable: boolean;
  /** Filter popover options from `meta.filterable`; the column has no popover when omitted. */
  filterOptions?: TableFilterOptions;
  /** Custom filter input from `meta.filterContent`. */
  filterContent?: TableFilterContent<TData>;
  /** Table-level footer buttons for the filter popover. */
  filterActions?: TableFilterAction[];
  /** Table-level width of the filter popover. */
  filterPopoverWidth?: TableFilterPopoverWidth;
}

/**
 * Renders a column header's content with the built-in sort button and filter popover when the
 * column opts into them.
 * - Sortable string / number header: the whole title is the sort button.
 * - Any other header: rendered as-is, followed by the icon-only buttons.
 * - Neither: rendered as-is.
 */
export const TableHeaderContent = <TData,>({
  header,
  label,
  sortable,
  filterOptions,
  filterContent,
  filterActions,
  filterPopoverWidth,
}: TableHeaderContentProps<TData>) => {
  const { getLabel } = useLabels();
  const { column } = header;
  const content = flexRender(column.columnDef.header, header.getContext());
  const hasSort = sortable && column.getCanSort();
  const hasFilter = !!filterOptions && column.getCanFilter();

  if (!hasSort && !hasFilter) {
    return <>{content}</>;
  }

  const direction = column.getIsSorted();
  const sortProps = {
    icon: SORT_ICONS[direction || 'none'],
    selected: !!direction,
    onClick: column.getToggleSortingHandler(),
  };
  const headerDef = column.columnDef.header;
  // A blank string header has no text to name the button, so it gets the icon-only button instead.
  const hasTitle = typeof headerDef === 'number' || (typeof headerDef === 'string' && headerDef.trim() !== '');
  const titleIsSortButton = hasSort && hasTitle;
  const columnLabel = label ?? column.id;

  return (
    <span className={styles['tedi-table-header-content']}>
      {titleIsSortButton ? <TableHeaderButton {...sortProps}>{content}</TableHeaderButton> : content}
      {hasSort && !titleIsSortButton && (
        <TableHeaderButton {...sortProps} aria-label={getLabel('table.sort', direction, columnLabel)} />
      )}
      {hasFilter && (
        <TableFilterPopover
          column={column}
          label={columnLabel}
          options={filterOptions}
          content={filterContent}
          defaultActions={filterActions}
          defaultWidth={filterPopoverWidth}
        />
      )}
    </span>
  );
};

TableHeaderContent.displayName = 'TableHeaderContent';
