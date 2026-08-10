import * as React from 'react';

/**
 * Accordion — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/accordion/accordion.stories.tsx).
 */
export interface AccordionProps {
  /** Accordion content. Should be one or more `AccordionItem` components. */
  children?: React.ReactNode;
  /** Additional class. */
  className?: string;
  /** Whether the accordion allows multiple items to be expanded at the same time. If false, opening one item will collapse the others automatically. */
  allowMultiple?: boolean;
  /** Group-level default for items' initial expanded state. Sets the initial `defaultExpanded` for every child `Accordion.Item` that doesn't specify its own. Per-item `defaultExpanded` (including an explicit `false`) takes precedence. Typically combined with `allowMultiple` to start with all items open. */
  defaultExpanded?: boolean;
  /** Vertical gap between sibling `Accordion.Item` components in rem Accepts any number, not limited to a fixed scale. Forwarded as the `--tedi-accordion-item-gap` CSS variable, so consumers can also override it from any ancestor class — or set a px value there directly when an exact-pixel override is needed. When omitted, falls back to the design-token default (`var(--layout-grid-gutters-08)` = 0.5rem). */
  itemGap?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<AccordionBreakpointProps>;
  md?: Partial<AccordionBreakpointProps>;
  lg?: Partial<AccordionBreakpointProps>;
  xl?: Partial<AccordionBreakpointProps>;
  xxl?: Partial<AccordionBreakpointProps>;
}

export declare const Accordion: React.ComponentType<AccordionProps> & {
  Item: React.ComponentType<any>;
};
