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
   * Validation state for multistep-form usage (only rendered with `showIcons`
   * on the parent): `true` = valid, `false` = invalid, `undefined` = not yet
   * validated.
   */
  isValid?: boolean;
  /**
   * Render a separator below the item.
   */
  separator?: boolean;
  /**
   * Hide the validation glyph for this item even when `showIcons` is on.
   */
  hideIcon?: boolean;
}

export const TableOfContentsItem = (_props: TableOfContentsItemProps): JSX.Element | null => null;

TableOfContentsItem.displayName = 'TableOfContentsItem';

export default TableOfContentsItem;
