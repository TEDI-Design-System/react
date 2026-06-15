import cn from 'classnames';
import { forwardRef } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Button } from '../../buttons/button/button';
import styles from './carousel.module.scss';
import { useCarouselContext } from './carousel-context';

/**
 * Props for a single navigation arrow, ready to spread onto a `Button` /
 * `FloatingButton` (or any compatible control). `children` is the accessible label.
 */
export interface CarouselNavigationButtonProps {
  icon: string;
  disabled: boolean;
  onClick: () => void;
  children: string;
}

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
  /**
   * Render each navigation arrow yourself — e.g. to use a `FloatingButton` or a
   * customised `Button`. Receives the arrow `direction` and a `buttonProps` bag
   * (icon / disabled / onClick / accessible-label `children`) to spread onto the
   * control; the surrounding container still handles layout, incl. overlay edge
   * placement, so the returned element only needs to render the button. Defaults
   * to a secondary `Button`.
   *
   * @example
   * <Carousel.Navigation
   *   overlay
   *   renderButton={({ buttonProps }) => <FloatingButton {...buttonProps} position="static" />}
   * />
   */
  renderButton?: (props: { direction: 'prev' | 'next'; buttonProps: CarouselNavigationButtonProps }) => React.ReactNode;
}

const defaultRenderButton = ({ buttonProps }: { buttonProps: CarouselNavigationButtonProps }): React.ReactNode => (
  <Button visualType="secondary" {...buttonProps} />
);

export const CarouselNavigation = forwardRef<HTMLDivElement, CarouselNavigationProps>(
  ({ overlay = false, className, renderButton = defaultRenderButton }, ref) => {
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
        {renderButton({
          direction: 'prev',
          buttonProps: {
            icon: 'arrow_back',
            disabled: !carousel.canPrev,
            onClick: carousel.prev,
            children: getLabel('carousel.move-back'),
          },
        })}
        {renderButton({
          direction: 'next',
          buttonProps: {
            icon: 'arrow_forward',
            disabled: !carousel.canNext,
            onClick: carousel.next,
            children: getLabel('carousel.move-forward'),
          },
        })}
      </div>
    );
  }
);

CarouselNavigation.displayName = 'CarouselNavigation';

export default CarouselNavigation;
