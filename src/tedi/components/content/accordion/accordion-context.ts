import React from 'react';

export interface AccordionContextValue {
  /**
   * Whether the accordion allows multiple items to be expanded at the same time.
   */
  allowMultiple: boolean;
  /**
   * Group-level default for items' initial expanded state. Items use this value
   * when they don't specify their own `defaultExpanded`. Per-item overrides
   * (including explicit `false`) take precedence.
   */
  defaultExpanded: boolean;
  /**
   * Called by an AccordionItem after it has updated its expanded state to `true`.
   * In single-expand mode the Accordion will collapse all other registered items.
   */
  notifyExpanded: (id: string) => void;
  /**
   * Allows AccordionItem to register itself so that the Accordion can collapse it
   * when another item is expanded (single-expand mode).
   *
   * Returns an unregister callback.
   */
  register: (id: string, setExpanded: (value: boolean) => void) => () => void;
}

export const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export const useAccordionContext = (): AccordionContextValue | null => {
  return React.useContext(AccordionContext);
};
