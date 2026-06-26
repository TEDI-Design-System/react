import cn from 'classnames';
import React, { forwardRef } from 'react';

import styles from '../../carousel.module.scss';

export interface CarouselFooterProps {
  /**
   * Footer content — typically `Carousel.Indicators` and/or `Carousel.Navigation`.
   */
  children?: React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Inline styles — e.g. to center the footer content.
   */
  style?: React.CSSProperties;
}

export const CarouselFooter = forwardRef<HTMLDivElement, CarouselFooterProps>(({ children, className, style }, ref) => (
  <div ref={ref} className={cn(styles['tedi-carousel__footer'], className)} style={style}>
    {children}
  </div>
));

CarouselFooter.displayName = 'CarouselFooter';

export default CarouselFooter;
