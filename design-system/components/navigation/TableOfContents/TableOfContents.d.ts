import * as React from 'react';

/**
 * TableOfContents — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/navigation/table-of-contents/table-of-contents.stories.tsx).
 */
export interface TableOfContentsProps {
  /** `TableOfContents.Item` elements. An item's non-`Item` children are its link / label; nested `TableOfContents.Item` children become its sub-items. */
  children: React.ReactNode;
  /** Heading rendered above the list. Defaults to the localised "Table of contents" label; pass `null` to render it headless (no visible heading — the navigation keeps an accessible name via `aria-label`). */
  heading?: string;
  /** Visual variant: - `default` — rendered inside a bordered `Card`. - `transparent` — no card chrome (border / background); the list sits directly on the page, with a continuous grey left rail (the active item's segment turns blue). */
  variant?: "default" | "transparent";
  /** Inner padding of the container, in rem — the spacing between the card edge and the heading / items. Defaults to the card's medium padding token. */
  padding?: number;
  /** Id of the currently active item. The active item gets the left accent bar and active link colour; the branch leading to it auto-expands its nested children. */
  activeId?: string;
  /** Show a validation glyph before each item (multistep-form usage). Each state uses a distinct icon shape (not colour alone) with a localised text alternative: a check for `isValid === true`, an empty circle for `undefined` (not completed), and a warning for `isValid === false`. */
  showIcons?: boolean;
  /** Render the list as an ordered list with auto-generated hierarchical numbers (`1.`, `2.`, `2.1`, …) shown before each item. */
  numbered?: boolean;
  /** Stick the card to the viewport while scrolling. */
  sticky?: boolean;
  /** Additional class name on the root element. */
  className?: string;
}

export declare const TableOfContents: React.ComponentType<TableOfContentsProps> & {
  Item: React.ComponentType<any>;
  Collapsible: React.ComponentType<any>;
};
