import { createContext, useContext } from 'react';

export interface SelectTagsContextValue {
  /** True when the parent Select is in `tagsDirection="row"` multi mode. */
  isSingleRow: boolean;
  /**
   * Number of tags that fit on one row. `null` means "not yet measured" — render
   * every tag so widths can be read; subsequent renders use the computed value.
   */
  visibleCount: number | null;
}

export const SelectTagsContext = createContext<SelectTagsContextValue>({
  isSingleRow: false,
  visibleCount: null,
});

export const useSelectTagsContext = () => useContext(SelectTagsContext);
