import * as React from 'react';

/**
 * Affix — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/affix/affix.stories.tsx).
 */
export interface AffixProps {
  /** Affix children */
  children?: React.ReactNode;
  /** Additional class. */
  className?: string;
  /** Position of Affix. */
  position?: "sticky" | "fixed";
  /** Spacing from the top of the Container. */
  top?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Spacing from the bottom of the Container. */
  bottom?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Spacing from the left of the Container. */
  left?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Spacing from the right of the Container. */
  right?: 0 | 0.5 | 1 | 1.5 | 2 | "unset";
  /** Determine what element(s) the top/bottom values should be relative to */
  relative?: "header"[] | "window";
}

export declare const Affix: React.ComponentType<AffixProps>;
