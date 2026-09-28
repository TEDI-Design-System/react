import cn from 'classnames';
import React, { forwardRef } from 'react';

import styles from './carousel.module.scss';
import { CarouselContext } from './carousel-context';
import { CarouselContent } from './components/carousel-content/carousel-content';
import { CarouselFooter } from './components/carousel-footer/carousel-footer';
import { CarouselHeader } from './components/carousel-header/carousel-header';
import { CarouselIndicators } from './components/carousel-indicators/carousel-indicators';
import { CarouselNavigation } from './components/carousel-navigation/carousel-navigation';
import { useCarousel } from './use-carousel';

export interface CarouselProps {
  /**
   * Carousel composition — `Carousel.Header`, `Carousel.Content` and
   * `Carousel.Footer`.
   */
  children?: React.ReactNode;
  /**
   * Additional class name applied to the carousel root.
   */
  className?: string;
  /**
   * Accessible name for the carousel region. Set a distinct label per carousel when a page has
   * several. Defaults to the localized `carousel` label.
   */
  ariaLabel?: string;
}

const CarouselInner = forwardRef<HTMLDivElement, CarouselProps>(({ children, className, ariaLabel }, ref) => {
  const carousel = useCarousel(ariaLabel);

  return (
    <CarouselContext.Provider value={carousel}>
      <div ref={ref} className={cn(styles['tedi-carousel'], className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
});

CarouselInner.displayName = 'Carousel';

export const Carousel = Object.assign(CarouselInner, {
  Header: CarouselHeader,
  Content: CarouselContent,
  Footer: CarouselFooter,
  Navigation: CarouselNavigation,
  Indicators: CarouselIndicators,
});

export default Carousel;
