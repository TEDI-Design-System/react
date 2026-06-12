import cn from 'classnames';
import React, { forwardRef } from 'react';

import styles from './carousel.module.scss';

export interface CarouselHeaderProps {
  /**
   * Header content — typically a title block and optionally `Carousel.Navigation`.
   */
  children?: React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Inline styles.
   */
  style?: React.CSSProperties;
}

export const CarouselHeader = forwardRef<HTMLDivElement, CarouselHeaderProps>(({ children, className, style }, ref) => (
  <div ref={ref} className={cn(styles['tedi-carousel__header'], className)} style={style}>
    {children}
  </div>
));

CarouselHeader.displayName = 'CarouselHeader';

export default CarouselHeader;
