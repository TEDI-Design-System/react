import cn from 'classnames';
import React from 'react';

import styles from '../table.module.scss';

export interface TableToolbarProps {
  /**
   * Toolbar contents — typically Table sub-components like
   * `<Table.ColumnsMenu />`, but any node is allowed.
   */
  children?: React.ReactNode;
  /**
   * Additional class name on the toolbar wrapper.
   */
  className?: string;
}

/**
 * Optional slot rendered above the `<table>`. Hosts controls like
 * `<Table.ColumnsMenu />`. Nothing clever — it just provides consistent spacing.
 */
export const TableToolbar = ({ children, className }: TableToolbarProps) => (
  <div className={cn(styles['tedi-table__toolbar'], className)}>{children}</div>
);

TableToolbar.displayName = 'Table.Toolbar';

export default TableToolbar;
