import { flexRender, Header, SortDirection } from '@tanstack/react-table';

import { useLabels } from '../../../../providers/label-provider';
import { TableHeaderButton } from '../table-header-button/table-header-button';
import styles from './table-header-content.module.scss';

const SORT_ICONS: Record<SortDirection | 'none', string> = {
  asc: 'arrow_upward',
  desc: 'arrow_downward',
  none: 'unfold_more',
};

export interface TableHeaderContentProps<TData> {
  header: Header<TData, unknown>;
  /** Accessible column name used by the icon-only sort button. */
  label?: string;
  /** Whether the column opted into the built-in sort button via `meta.sortable`. */
  sortable: boolean;
}

/**
 * Renders a column header's content, adding the built-in sort button when the column is `sortable`.
 * - String / number header: the whole title is the sort button.
 * - Custom header: rendered as-is, followed by an icon-only sort button.
 * - Not sortable: rendered as-is.
 */
export const TableHeaderContent = <TData,>({ header, label, sortable }: TableHeaderContentProps<TData>) => {
  const { getLabel } = useLabels();
  const { column } = header;
  const content = flexRender(column.columnDef.header, header.getContext());

  if (!sortable || !column.getCanSort()) {
    return <>{content}</>;
  }

  const direction = column.getIsSorted();

  const buttonProps = {
    icon: SORT_ICONS[direction || 'none'],
    selected: !!direction,
    onClick: column.getToggleSortingHandler(),
  };

  const headerDef = column.columnDef.header;
  // A blank string header has no text to name the button, so it gets the icon-only button instead.
  const hasTitle = typeof headerDef === 'number' || (typeof headerDef === 'string' && headerDef.trim() !== '');

  if (hasTitle) {
    return <TableHeaderButton {...buttonProps}>{content}</TableHeaderButton>;
  }

  return (
    <span className={styles['tedi-table-header-content']}>
      {content}
      <TableHeaderButton {...buttonProps} aria-label={getLabel('table.sort', direction, label ?? column.id)} />
    </span>
  );
};

TableHeaderContent.displayName = 'TableHeaderContent';
