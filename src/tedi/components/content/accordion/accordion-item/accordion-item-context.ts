import React from 'react';

/**
 * Context exposed by `AccordionItem` to its `Header` and `Content` sub-components.
 *
 * The item owns the expanded state, the shared layout flags (`showIconCard`, `selected`)
 * and the ARIA wiring (`headerId`, `contentId`). Header and content only render
 * appearance and project user content.
 */
export interface AccordionItemContextValue {
  /** ID of the element acting as the header trigger (used for `aria-labelledby` on content). */
  headerId: string;
  /** ID of the content panel (used for `aria-controls` on the trigger). */
  contentId: string;
  /** Whether the item is currently expanded. */
  expanded: boolean;
  /** Toggles the expanded state. No-op when the item is disabled. */
  toggle: () => void;
  /** Whether the icon-card layout is active for this item. */
  showIconCard: boolean;
  /** Whether the item is disabled (header is non-interactive, state can't be toggled by user). */
  disabled: boolean;
}

export const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export const useAccordionItemContext = (componentName: string): AccordionItemContextValue => {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(`<${componentName}> must be rendered inside an <Accordion.Item>.`);
  }
  return ctx;
};
