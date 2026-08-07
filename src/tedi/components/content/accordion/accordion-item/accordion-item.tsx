import cn from 'classnames';
import React from 'react';

import styles from '../accordion.module.scss';
import { useAccordionContext } from '../accordion-context';
import { AccordionItemContent } from '../accordion-item-content/accordion-item-content';
import { AccordionItemHeader } from '../accordion-item-header/accordion-item-header';
import { AccordionItemContext } from './accordion-item-context';

export interface AccordionItemProps {
  /**
   * Inner content. Must include `Accordion.Item.Header` and `Accordion.Item.Content`.
   */
  children?: React.ReactNode;
  /**
   * Stable id used for the header/content ARIA wiring. Auto-generated if omitted.
   */
  id?: string;
  /**
   * Whether the accordion item is expanded initially (uncontrolled).
   * Does not control the expanded state after initialization.
   *
   * When omitted, falls back to the parent `Accordion`'s `defaultExpanded` (or `false`).
   * Pass an explicit boolean to override the group default — including `false` to
   * keep an individual item collapsed when the group default is `true`.
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * Controlled expanded state. When provided the item operates in controlled mode
   * and `onToggle` should be used to react to user-driven toggles.
   */
  expanded?: boolean;
  /**
   * Called whenever the user toggles the item. Receives the next expanded state.
   */
  onToggle?: (expanded: boolean) => void;
  /**
   * Enables the icon-card layout variant. Affects both header and content styling,
   * which is why it lives on the item.
   * @default false
   */
  showIconCard?: boolean;
  /**
   * Marks the accordion item as selected (applies a visual 'selected' state).
   * @default false
   */
  selected?: boolean;
  /**
   * Icon card content rendered as a sibling of the header/content (only when `showIconCard` is true).
   */
  iconCard?: React.ReactNode;
  /**
   * Disables the item — the header trigger becomes non-interactive (`disabled`) and the
   * item's expanded state can no longer be toggled by user interaction. The current
   * state is preserved (e.g. a disabled item that's `defaultExpanded` stays open).
   * @default false
   */
  disabled?: boolean;
  /**
   * When `true`, the item auto-expands if `window.location.hash` matches its `id`
   * (e.g. `https://example.com/page#my-item`). Also re-runs on `hashchange`, so
   * navigating between in-page links updates which item is open.
   *
   * Requires an explicit `id` prop — the auto-generated React id isn't stable enough
   * for deep-linking. No-op when `id` is omitted.
   * @default false
   */
  openOnHashMatch?: boolean;
}

const isControlled = (props: Pick<AccordionItemProps, 'expanded'>): boolean => {
  return typeof props.expanded === 'boolean';
};

const AccordionItemComponent = (props: AccordionItemProps): JSX.Element => {
  const {
    children,
    id: idProp,
    defaultExpanded: defaultExpandedProp,
    expanded: expandedProp,
    onToggle,
    showIconCard = false,
    selected = false,
    iconCard,
    disabled = false,
    openOnHashMatch = false,
  } = props;

  const reactId = React.useId();
  const baseId = idProp ?? reactId;
  const headerId = `${baseId}-header`;
  const contentId = `${baseId}-content`;

  const accordion = useAccordionContext();

  const resolvedDefaultExpanded = defaultExpandedProp ?? accordion?.defaultExpanded ?? false;

  const controlled = isControlled(props);
  const [internalExpanded, setInternalExpanded] = React.useState<boolean>(resolvedDefaultExpanded);
  const expanded = controlled ? (expandedProp as boolean) : internalExpanded;

  React.useEffect(() => {
    if (!accordion) return;
    const setExpandedFromAccordion = (value: boolean) => {
      if (!controlled) {
        setInternalExpanded(value);
      } else {
        onToggle?.(value);
      }
    };
    return accordion.register(baseId, setExpandedFromAccordion);
  }, [accordion, baseId, controlled, onToggle]);

  const toggle = React.useCallback(() => {
    if (disabled) return;
    const next = !expanded;
    if (!controlled) {
      setInternalExpanded(next);
    }
    onToggle?.(next);
    if (next) {
      accordion?.notifyExpanded(baseId);
    }
  }, [accordion, baseId, controlled, disabled, expanded, onToggle]);

  React.useEffect(() => {
    if (!openOnHashMatch || !idProp || disabled) return;
    if (typeof window === 'undefined') return;

    const expandIfHashMatches = () => {
      if (window.location.hash === `#${idProp}`) {
        if (!controlled) {
          setInternalExpanded(true);
        } else if (!expandedProp) {
          onToggle?.(true);
        }
        accordion?.notifyExpanded(idProp);
      }
    };

    expandIfHashMatches();
    window.addEventListener('hashchange', expandIfHashMatches);
    return () => window.removeEventListener('hashchange', expandIfHashMatches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOnHashMatch, idProp, disabled, controlled, expandedProp, onToggle]);

  const contextValue = React.useMemo<React.ContextType<typeof AccordionItemContext>>(
    () => ({
      headerId,
      contentId,
      expanded,
      toggle,
      showIconCard,
      disabled,
    }),
    [headerId, contentId, expanded, toggle, showIconCard, disabled]
  );

  const itemClasses = cn(styles['tedi-accordion__item'], {
    [styles['tedi-accordion__item--selected']]: selected,
    [styles['tedi-accordion__item--expanded']]: expanded,
    [styles['tedi-accordion__item--disabled']]: disabled,
    [styles['tedi-accordion__item--with-icon-card']]: showIconCard,
  });

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div data-name="accordion-item" data-testid="tedi-accordion-item" className={itemClasses}>
        {showIconCard && (
          <span data-name="accordion-icon-card" className={styles['tedi-accordion__icon-card']}>
            {iconCard}
          </span>
        )}
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

AccordionItemComponent.displayName = 'AccordionItem';

export const AccordionItem = Object.assign(AccordionItemComponent, {
  Header: AccordionItemHeader,
  Content: AccordionItemContent,
});

export default AccordionItem;
