import * as React from 'react';

/**
 * Ellipsis — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/ellipsis/ellipsis.stories.tsx).
 */
export interface EllipsisProps {
  /** The content to be displayed inside the ellipsis container. */
  children: React.ReactNode;
  /** The maximum number of lines before truncating the text with an ellipsis. If the content exceeds this limit, it will be truncated. Applies to the `end` (multi-line) position only. */
  lineClamp?: number;
  /** Where the ellipsis is placed. - `end` — trailing ellipsis, multi-line (clamped by `lineClamp`). - `start` — leading ellipsis, single-line (keeps the end of the text visible, e.g. for file paths or IDs). */
  position?: "end" | "start";
  /** Determines whether a popover should be displayed when the text is truncated. If `true`, hovering over the truncated text will show the full content in a popover. */
  popover?: boolean;
  /** Adds a custom CSS class to the Ellipsis element for additional styling or theming purposes */
  className?: string;
}

export declare const Ellipsis: React.ComponentType<EllipsisProps>;
