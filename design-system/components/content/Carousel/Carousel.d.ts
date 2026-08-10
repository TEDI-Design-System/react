import * as React from 'react';

/**
 * Carousel — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/carousel/carousel.stories.tsx).
 */
export interface CarouselProps {
  /** Carousel composition — `Carousel.Header`, `Carousel.Content` and `Carousel.Footer`. */
  children?: React.ReactNode;
  /** Additional class name applied to the carousel root. */
  className?: string;
}

export declare const Carousel: React.ComponentType<CarouselProps> & {
  Header: React.ComponentType<any>;
  Content: React.ComponentType<any>;
  Footer: React.ComponentType<any>;
  Navigation: React.ComponentType<any>;
  Indicators: React.ComponentType<any>;
};
