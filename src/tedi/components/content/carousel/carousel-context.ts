import { createContext, useContext } from 'react';

import { CarouselApi } from './use-carousel';

export const CarouselContext = createContext<CarouselApi | null>(null);

/**
 * Reads the carousel engine provided by the `Carousel` root. Throws when a
 * carousel sub-component is rendered outside of `Carousel`.
 */
export const useCarouselContext = (): CarouselApi => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('Carousel sub-components must be used within a <Carousel> component.');
  }

  return context;
};
