import React from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';

type HideAtProps = {
  children: React.ReactNode;
} & Partial<Record<Breakpoint, boolean>>;

export const HideAt = ({ children, ...breakpoints }: HideAtProps) => {
  const current = useBreakpoint();

  const shouldHide = Object.entries(breakpoints).some(([bp, value]) => {
    if (!value) return false;
    if (!current) return false;
    return !isBreakpointBelow(current, bp as Breakpoint);
  });

  if (shouldHide) return null;

  return <>{children}</>;
};

HideAt.displayName = 'HideAt';
