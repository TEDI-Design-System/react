import cn from 'classnames';
import React from 'react';

import { Breakpoint } from '../../../helpers';
import styles from './show-at.module.scss';

type ShowAtProps = {
  /**
   * Content to show.
   */
  children: React.ReactNode;
} & Partial<Record<Breakpoint, boolean>>;

/**
 * Shows its children at and above each breakpoint that is set, and hides them below. The children are always
 * rendered and shown with CSS, so server-rendered pages are correct at every width. Avoid it for content that
 * must not exist twice (for example fields with an `id`).
 */
export const ShowAt = ({ children, ...breakpoints }: ShowAtProps) => {
  const showClasses = (Object.entries(breakpoints) as [Breakpoint, boolean | undefined][])
    .filter(([, value]) => value)
    .map(([breakpoint]) => styles[`tedi-show-at-from-${breakpoint}`]);

  return (
    <span data-name="show-at" className={cn(styles['tedi-show-at'], showClasses)}>
      {children}
    </span>
  );
};

ShowAt.displayName = 'ShowAt';
