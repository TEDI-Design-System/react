import React from 'react';

export interface TableOfContentsItemProps {
  /**
   * Unique id. Required to mark the item active (via the parent's `activeId`)
   * and to be the parent of nested items.
   */
  id?: string;
  /**
   * The item's link / label (a `Link`, `Anchor`, `Button`, etc. — pass
   * `underline={false}` on a `Link` to match the design) plus any nested
   * `TableOfContents.Item` children, which become this item's sub-items.
   */
  children?: React.ReactNode;
  /**
   * Render a separator below the item.
   */
  separator?: boolean;
  /**
   * Trailing content shown at the end of the item's row (right-aligned) — e.g. a
   * count `Tag` or `StatusBadge`. Kept out of the link so it isn't part of the
   * link's accessible name.
   */
  slot?: React.ReactNode;
}

export const TableOfContentsItem = (_props: TableOfContentsItemProps): JSX.Element | null => null;

TableOfContentsItem.displayName = 'TableOfContentsItem';

export default TableOfContentsItem;
