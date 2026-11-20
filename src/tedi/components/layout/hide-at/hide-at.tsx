import cn from 'classnames';
import React from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import styles from './hide-at.module.scss';

type HideAtBreakpointProps = Partial<Record<Breakpoint, boolean>>;

type HideAtProps = {
  /**
   * Content to hide.
   */
  children: React.ReactNode;
  /**
   * `unmount` removes the content where it is hidden. `css` always renders it and hides it with CSS, so a
   * server-rendered page is right at every width. It wraps the children in a `<span>` (`display: contents`) and
   * the hidden content stays in the DOM, so avoid it for fields, ids and effects.
   * @default unmount
   */
  mode?: 'unmount' | 'css';
} & HideAtBreakpointProps;

const HideAtUnmount = ({ children, ...breakpoints }: Omit<HideAtProps, 'mode'>) => {
  const current = useBreakpoint();

  const shouldHide = Object.entries(breakpoints).some(([bp, value]) => {
    if (!value) return false;
    return !isBreakpointBelow(current, bp as Breakpoint);
  });

  if (shouldHide) return null;

  return <>{children}</>;
};

const HideAtCss = ({ children, ...breakpoints }: Omit<HideAtProps, 'mode'>) => {
  const hideClasses = (Object.entries(breakpoints) as [Breakpoint, boolean | undefined][])
    .filter(([, value]) => value)
    .map(([breakpoint]) => styles[`tedi-hide-at-from-${breakpoint}`]);

  return (
    <span data-name="hide-at" className={cn(styles['tedi-hide-at'], hideClasses)}>
      {children}
    </span>
  );
};

export const HideAt = ({ mode = 'unmount', ...props }: HideAtProps) =>
  mode === 'css' ? <HideAtCss {...props} /> : <HideAtUnmount {...props} />;

HideAt.displayName = 'HideAt';
