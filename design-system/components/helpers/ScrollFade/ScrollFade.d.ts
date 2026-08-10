import * as React from 'react';

/**
 * ScrollFade — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/scroll-fade/scroll-fade.stories.tsx).
 */
export interface ScrollFadeProps {
  /** ScrollFade content */
  children: React.ReactNode;
  /** Additional class name. */
  className?: string;
  /** Scrollbar type */
  scrollBar?: "default" | "custom";
  /** Size of fade in percentages. */
  fadeSize?: 0 | 10 | 20;
  /** Fade position */
  fadePosition?: "top" | "bottom" | "both";
  /** Called when element is scrolled to top */
  onScrollToTop?: () => void;
  /** Called when element is scrolled to bottom */
  onScrollToBottom?: () => void;
}

export declare const ScrollFade: React.ComponentType<ScrollFadeProps>;
