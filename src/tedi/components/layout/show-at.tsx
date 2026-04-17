import React from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../helpers';

type ShowAtProps = {
  children: React.ReactNode;
} & Partial<Record<Breakpoint, boolean>>;

export const ShowAt = ({ children, ...breakpoints }: ShowAtProps) => {
  const current = useBreakpoint();

  const shouldShow = Object.entries(breakpoints).some(([bp, value]) => {
    if (!value) return false;
    return !isBreakpointBelow(current, bp as Breakpoint);
  });

  if (!shouldShow) return null;

  return <>{children}</>;
};
