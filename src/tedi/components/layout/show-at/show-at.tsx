import cn from 'classnames';
import React from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import styles from './show-at.module.scss';

type ShowAtBreakpointProps = Partial<Record<Breakpoint, boolean>>;

type ShowAtProps = {
  /**
   * Content to show.
   */
  children: React.ReactNode;
  /**
   * `unmount` leaves the content out of the DOM where it is hidden. `css` always renders it and shows it with
   * CSS, so a server-rendered page is right at every width. It wraps the children in a `<span>`
   * (`display: contents`) and the hidden content stays in the DOM, so avoid it for fields, ids and effects.
   * @default unmount
   */
  mode?: 'unmount' | 'css';
} & ShowAtBreakpointProps;

const ShowAtUnmount = ({ children, ...breakpoints }: Omit<ShowAtProps, 'mode'>) => {
  const current = useBreakpoint();

  const shouldShow = Object.entries(breakpoints).some(([bp, value]) => {
    if (!value) return false;
    return !isBreakpointBelow(current, bp as Breakpoint);
  });

  if (!shouldShow) return null;

  return <>{children}</>;
};

const ShowAtCss = ({ children, ...breakpoints }: Omit<ShowAtProps, 'mode'>) => {
  const showClasses = (Object.entries(breakpoints) as [Breakpoint, boolean | undefined][])
    .filter(([, value]) => value)
    .map(([breakpoint]) => styles[`tedi-show-at-from-${breakpoint}`]);

  return (
    <span data-name="show-at" className={cn(styles['tedi-show-at'], showClasses)}>
      {children}
    </span>
  );
};

export const ShowAt = ({ mode = 'unmount', ...props }: ShowAtProps) =>
  mode === 'css' ? <ShowAtCss {...props} /> : <ShowAtUnmount {...props} />;

ShowAt.displayName = 'ShowAt';
