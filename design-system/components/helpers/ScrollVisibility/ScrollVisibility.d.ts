import * as React from 'react';

/**
 * ScrollVisibility — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/scroll-visibility/scroll-visibility.stories.tsx).
 */
export interface ScrollVisibilityProps {
  /** Content to hide/show */
  children: React.ReactNode;
  /** Additional class name which applies to first child element */
  className?: string;
  /** Conditionally enable the functionality */
  enabled?: boolean;
  /** Determines wheter to hide or show when scrolled past scrollDistance */
  visibility?: "show" | "hide";
  /** Determines if the component's visibility toggles when scrolling opposite direction after crossing scrollDistance */
  toggleVisibility?: boolean;
  /** Distance in px user has to scroll for the component to show/hide */
  scrollDistance?: number;
  /** Direction used to calculate `scrollDistance`: - down: Measured from the top of the page. - up: Measured from the bottom of the page. */
  scrollDirection?: "up" | "down";
  /** Detect scroll based on this element */
  scrollContainer?: HTMLElement;
  /** Direction the component animates to */
  animationDirection?: "center" | "left" | "right" | "up" | "down";
}

export declare const ScrollVisibility: React.ComponentType<ScrollVisibilityProps>;
