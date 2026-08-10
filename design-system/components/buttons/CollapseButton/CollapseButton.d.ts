import * as React from 'react';

/**
 * CollapseButton — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/buttons/collapse-button/collapse-button.stories.tsx).
 */
export interface CollapseButtonProps {
  /** Current open state. Bind alongside `onOpenChange` to keep in sync. */
  open: boolean;
  /** Called when the user toggles the button. Receives the next open state. Standard native `onClick` still fires too; if it calls `preventDefault` the toggle is suppressed. */
  onOpenChange?: (next: boolean) => void;
  /** Label shown when collapsed. Rendered literally — translate at the call site if needed. When omitted, falls back to the `LabelProvider`'s translated `'open'` label. */
  openText?: string;
  /** Label shown when expanded. Rendered literally — translate at the call site if needed. When omitted, falls back to the `LabelProvider`'s translated `'close'` label. */
  closeText?: string;
  /** Hide the label and render the chevron only. */
  hideText?: boolean;
  /** Chevron style. Only takes effect with `hideText` (icon-only mode). */
  arrowType?: "secondary" | "default";
  /** Visual size. */
  size?: "default" | "small";
  /** Light text and icon for placement on a dark / brand background. Ignored when `arrowType` is `secondary` (no inverted form in the design). */
  inverted?: boolean;
  /** Underline the text label. Set `false` in contexts where the chevron is the sole affordance (e.g. inside an accordion header). Has no effect in icon-only mode. */
  underline?: boolean;
  /** Accessible label. Required when `hideText` is `true`. */
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export declare const CollapseButton: React.ComponentType<CollapseButtonProps>;
