import cn from 'classnames';
import React from 'react';

import { Breakpoint, breakpoints, BreakpointSupport } from '../../../helpers';
import styles from './header-responsive-variants.module.scss';

export interface HeaderButtonVariantProps {
  size?: 'default' | 'small';
  label?: string;
}

export interface HeaderButtonVariant {
  size: 'default' | 'small';
  label?: string;
  /** Breakpoints at which this variant is the visible one. */
  visibleAt: Breakpoint[];
}

/**
 * The button the visitor sees at each breakpoint, merged mobile-first like `useBreakpointProps`.
 * Without a `size`, the button is `small` below `md` and `default` from `md` up.
 * Breakpoints that end up with the same size and label share one variant. Without a `size` prop that is still two
 * variants (small below `md`, default from `md` up); each distinct responsive `size` or `label` adds one more.
 */
export const getHeaderButtonVariants = (props: BreakpointSupport<HeaderButtonVariantProps>): HeaderButtonVariant[] => {
  const variants: HeaderButtonVariant[] = [];
  let current: HeaderButtonVariantProps = {};

  breakpoints.forEach((bp) => {
    const overrides = bp === 'xs' ? props : props[bp];
    if (overrides?.size !== undefined) current = { ...current, size: overrides.size };
    if (overrides?.label !== undefined) current = { ...current, label: overrides.label };

    const size = current.size ?? (bp === 'xs' || bp === 'sm' ? 'small' : 'default');
    const existing = variants.find((variant) => variant.size === size && variant.label === current.label);

    if (existing) existing.visibleAt.push(bp);
    else variants.push({ size, label: current.label, visibleAt: [bp] });
  });

  return variants;
};

interface HeaderResponsiveVariantsProps {
  variants: HeaderButtonVariant[];
  children: (variant: HeaderButtonVariant) => React.ReactNode;
}

/**
 * Renders the button once per variant. A single variant renders as is; several are each wrapped in a
 * box-less element that CSS hides at the breakpoints where another variant is the visible one.
 */
export const HeaderResponsiveVariants = ({ variants, children }: HeaderResponsiveVariantsProps) => {
  if (variants.length === 1) return <>{children(variants[0])}</>;

  return (
    <>
      {variants.map((variant) => (
        <div
          // Every breakpoint belongs to exactly one variant, so the first one identifies it.
          key={variant.visibleAt[0]}
          data-name="header-variant"
          className={cn(
            styles['tedi-header-variant'],
            breakpoints
              .filter((bp) => !variant.visibleAt.includes(bp))
              .map((bp) => styles[`tedi-header-variant--hidden-${bp}`])
          )}
        >
          {children(variant)}
        </div>
      ))}
    </>
  );
};
