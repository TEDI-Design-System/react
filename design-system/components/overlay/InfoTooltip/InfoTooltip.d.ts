import * as React from 'react';

/**
 * InfoTooltip — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/overlays/tooltip/info-tooltip.stories.tsx).
 */
export interface InfoTooltipProps {
  /** Tooltip content shown when the info button is hovered or focused. */
  children: React.ReactNode;
  /** Placement of the tooltip relative to the info button. */
  placement?: "top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start";
  /** How the tooltip is opened. */
  openWith?: "hover" | "click";
  /** Max width of the tooltip content. */
  maxWidth?: "small" | "none" | "large" | "medium";
  /** Info button colour. Use `inverted` on dark or coloured backgrounds. */
  color?: "default" | "inverted";
  /** Renders the smaller (16px) info button. */
  isSmall?: boolean;
  /** Accessible name for the info button. */
  ariaLabel?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<InfoTooltipBreakpointProps>;
  md?: Partial<InfoTooltipBreakpointProps>;
  lg?: Partial<InfoTooltipBreakpointProps>;
  xl?: Partial<InfoTooltipBreakpointProps>;
  xxl?: Partial<InfoTooltipBreakpointProps>;
}

export declare const InfoTooltip: React.ComponentType<InfoTooltipProps>;
