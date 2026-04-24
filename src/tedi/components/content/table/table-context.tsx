import { createContext, useContext } from 'react';

import type { TableContextValue } from './table.types';

export const TableContext = createContext<TableContextValue | null>(null);

export function useTableContext<TData = unknown>(): TableContextValue<TData> {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('TableContext missing — wrap the component in <Table>.');
  return ctx as TableContextValue<TData>;
}
