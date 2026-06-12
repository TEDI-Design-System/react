import cn from 'classnames';
import { forwardRef } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Button } from '../../buttons/button/button';
import styles from './carousel.module.scss';
import { useCarouselContext } from './carousel-context';

export interface CarouselNavigationProps {
  /**
   * Pin the arrows to the left / right edges, overlaying the slides (instead of
   * a normal inline row). Use as a direct child of `Carousel` for a
   * header/footer-less carousel; the arrows centre vertically over the content.
   * @default false
   */
  overlay?: boolean;
  /**
   * Additional class name.
   */
  className?: string;
}

export const CarouselNavigation = forwardRef<HTMLDivElement, CarouselNavigationProps>(
  ({ overlay = false, className }, ref) => {
    const { getLabel } = useLabels();
    const carousel = useCarouselContext();

    return (
      <div
        ref={ref}
        className={cn(
          styles['tedi-carousel__navigation'],
          { [styles['tedi-carousel__navigation--overlay']]: overlay },
          className
        )}
      >
        <Button visualType="secondary" icon="arrow_back" disabled={!carousel.canPrev} onClick={carousel.prev}>
          {getLabel('carousel.move-back')}
        </Button>
        <Button visualType="secondary" icon="arrow_forward" disabled={!carousel.canNext} onClick={carousel.next}>
          {getLabel('carousel.move-forward')}
        </Button>
      </div>
    );
  }
);

CarouselNavigation.displayName = 'CarouselNavigation';

export default CarouselNavigation;
