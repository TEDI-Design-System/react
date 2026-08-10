import * as React from 'react';

/**
 * Tooltip — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/overlays/tooltip/tooltip.stories.tsx).
 */
export interface TooltipProps {
  /** Adds correct event listeners that change the open state. */
  openWith?: "hover" | "click";
  /** Offset of content. */
  offset?: number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null; } | Derivable<number | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null; }>;
  /** Trigger and Content components */
  children: boolean | ReactNode[] | React.ReactNode;
  /** Changes aria attributes on trigger and content based on the components role */
  role?: "dialog" | "label" | "menu" | "select" | "grid" | "tooltip" | "tree" | "alertdialog" | "listbox" | "combobox";
  /** Is open?<br /> Use this with onToggle prop for controlled component. */
  open?: boolean;
  /** Callback when toggled.<br /> Use this with open prop for state outside of component. */
  onToggle?: (open: boolean) => void;
  /** Is open by default?<br /> Does not work with open and onToggle props. */
  defaultOpen?: boolean;
  /** Placement of content. */
  placement?: "top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start";
  /** Minimum distance (in px) between the arrow and the edges of the content. Helps keep the arrow away from rounded corners, especially on `-start` and `-end` placements. Use a larger value for bigger arrows or arrows with borders. */
  arrowPadding?: number;
  /** Props passed to FloatingFocusManager */
  focusManager?: Omit<FloatingFocusManagerProps, "children" | "context">;
  /** Renders the overlay purely visually: no `useRole` aria wiring on the trigger (so no `aria-describedby`) and the content is `aria-hidden`. Use when the trigger already conveys the same text through its accessible name — e.g. an icon-only button whose visible tooltip merely mirrors its label — so screen readers don't announce it twice. */
  ariaHidden?: boolean;
  /** Re-measure the floating element every animation frame while mounted. Enable this when the trigger/reference element's position can change without a DOM-observable event (e.g. position driven by an inherited CSS custom property on an ancestor). The default `autoUpdate` only reacts to scroll, resize, and element-size changes, so position-only movement goes unnoticed and the overlay lags behind. Opt-in because animation-frame tracking is more expensive than the default. */
  trackReferencePosition?: boolean;
}

export declare const Tooltip: React.ComponentType<TooltipProps> & {
  Trigger: React.ComponentType<any>;
  Content: React.ComponentType<any>;
};
