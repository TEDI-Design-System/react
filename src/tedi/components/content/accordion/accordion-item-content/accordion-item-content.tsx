import cn from 'classnames';
import React from 'react';

import { CardBackground } from '../../card/utility';
import styles from '../accordion.module.scss';
import { useAccordionItemContext } from '../accordion-item/accordion-item-context';

export interface AccordionItemContentProps {
  /**
   * Collapsible content.
   */
  children?: React.ReactNode;
  /**
   * Custom CSS class for the accordion content.
   */
  contentClass?: string;
  /**
   * Background color of the content. Uses the same values as the Card `background`.
   */
  backgroundColor?: CardBackground;
}

export const AccordionItemContent = (props: AccordionItemContentProps): JSX.Element => {
  const { children, contentClass, backgroundColor } = props;
  const { headerId, contentId, expanded, showIconCard } = useAccordionItemContext('Accordion.Item.Content');

  const hostClasses = cn(
    styles['tedi-accordion-item-content'],
    {
      [styles['tedi-accordion-item-content--with-icon-card']]: showIconCard,
    },
    backgroundColor && styles[`tedi-accordion-item-content--background--${backgroundColor}`],
    contentClass
  );

  return (
    <div
      data-name="accordion-item-content"
      id={contentId}
      className={hostClasses}
      role={expanded ? 'region' : undefined}
      aria-labelledby={headerId}
      aria-hidden={!expanded}
      // `inert` is a valid HTML attribute; React 18+ forwards it as a boolean attribute.
      // @ts-expect-error -- inert is not yet in the React DOM TS defs
      inert={!expanded ? '' : undefined}
    >
      <div className={styles['tedi-accordion-item-content__inner']}>{children}</div>
    </div>
  );
};

AccordionItemContent.displayName = 'AccordionItemContent';

export default AccordionItemContent;
