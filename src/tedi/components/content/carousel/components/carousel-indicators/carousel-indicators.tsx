import cn from 'classnames';
import { forwardRef } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Text } from '../../../../base/typography/text/text';
import { Button } from '../../../../buttons/button/button';
import styles from '../../carousel.module.scss';
import { useCarouselContext } from '../../carousel-context';

export type CarouselIndicatorsVariant = 'dots' | 'numbers';

export interface CarouselIndicatorsProps {
  /**
   * Show prev / next arrow buttons alongside the indicators. When set, do not
   * also use `Carousel.Navigation`.
   * @default false
   */
  withArrows?: boolean;
  /**
   * Indicator style — a row of dots or a `current / total` counter.
   * @default dots
   */
  variant?: CarouselIndicatorsVariant;
  /**
   * Additional class name.
   */
  className?: string;
}

export const CarouselIndicators = forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  ({ withArrows = false, variant = 'dots', className }, ref) => {
    const { getLabel } = useLabels();
    const carousel = useCarouselContext();
    const { positions, activePositionIndex } = carousel;

    return (
      <div ref={ref} className={cn(styles['tedi-carousel__indicators'], className)}>
        {withArrows && (
          <Button visualType="neutral" icon="arrow_back" disabled={!carousel.canPrev} onClick={carousel.prev}>
            {getLabel('carousel.move-back')}
          </Button>
        )}

        {variant === 'dots'
          ? positions.map((position, index) => (
              <button
                key={index}
                type="button"
                aria-label={getLabel('carousel.show-slide', index + 1)}
                aria-current={index === activePositionIndex ? 'true' : undefined}
                className={cn(styles['tedi-carousel__indicator'], {
                  [styles['tedi-carousel__indicator--active']]: index === activePositionIndex,
                })}
                onClick={() => carousel.goToIndex(position, { focusSlide: true })}
              />
            ))
          : positions.length > 0 && (
              <div>
                <Text element="span" modifiers="bold" color="brand">
                  {activePositionIndex + 1}
                </Text>
                <Text element="span" color="tertiary">
                  {` / ${positions.length}`}
                </Text>
              </div>
            )}

        {withArrows && (
          <Button visualType="neutral" icon="arrow_forward" disabled={!carousel.canNext} onClick={carousel.next}>
            {getLabel('carousel.move-forward')}
          </Button>
        )}
      </div>
    );
  }
);

CarouselIndicators.displayName = 'CarouselIndicators';

export default CarouselIndicators;
