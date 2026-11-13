import cn from 'classnames';
import React from 'react';

import { Breakpoint } from '../../../helpers';
import styles from './hide-at.module.scss';

type HideAtProps = {
  /**
   * Content to hide.
   */
  children: React.ReactNode;
} & Partial<Record<Breakpoint, boolean>>;

/**
 * Hides its children at and above each breakpoint that is set. The children are always rendered and hidden with
 * CSS, so server-rendered pages are correct at every width. Avoid it for content that must not exist twice
 * (for example fields with an `id`).
 */
export const HideAt = ({ children, ...breakpoints }: HideAtProps) => {
  const hideClasses = (Object.entries(breakpoints) as [Breakpoint, boolean | undefined][])
    .filter(([, value]) => value)
    .map(([breakpoint]) => styles[`tedi-hide-at-from-${breakpoint}`]);

  return (
    <span data-name="hide-at" className={cn(styles['tedi-hide-at'], hideClasses)}>
      {children}
    </span>
  );
};

HideAt.displayName = 'HideAt';
