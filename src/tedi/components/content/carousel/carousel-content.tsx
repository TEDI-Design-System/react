import cn from 'classnames';
import React, { forwardRef, useEffect, useRef } from 'react';

import styles from './carousel.module.scss';
import { useCarouselContext } from './carousel-context';
import { BreakpointInput, normalizeBreakpointInput } from './carousel-utils';

export interface CarouselContentProps {
  /**
   * Slides — each direct child is rendered as one slide.
   */
  children?: React.ReactNode;
  /**
   * Slides per view (minimum 1, can be fractional, e.g. `1.25` for peeking).
   * Accepts a number or per-breakpoint object.
   * @default 1
   */
  slidesPerView?: BreakpointInput<number>;
  /**
   * Gap between slides in px. Accepts a number or per-breakpoint object.
   * @default 16
   */
  gap?: BreakpointInput<number>;
  /**
   * Fade the edges. With more than one slide per view only the right edge
   * fades; with a single slide both edges fade.
   * @default false
   */
  fade?: boolean;
  /**
   * Transition duration in ms.
   * @default 400
   */
  transitionMs?: number;
  /**
   * Whether the track loops infinitely. Set `false` for a finite, bounded
   * carousel — navigation stops at the first / last slide and the prev / next
   * controls disable at the bounds.
   * @default true
   */
  loop?: boolean;
  /**
   * Center the active slide so an equal peek of the previous / next slide shows
   * on both edges. Pair with a fractional `slidesPerView` (e.g. `1.4`) and keep
   * `loop` on so there are neighbours to reveal on both sides.
   * @default false
   */
  centered?: boolean;
  /**
   * Additional class name applied to the viewport.
   */
  className?: string;
}

export const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  (
    {
      children,
      slidesPerView = 1,
      gap = 16,
      fade = false,
      transitionMs = 400,
      loop = true,
      centered = false,
      className,
    },
    ref
  ) => {
    const carousel = useCarouselContext();
    const slides = React.Children.toArray(children);
    const slideNodes = useRef<(HTMLDivElement | null)[]>([]);

    const configKey = JSON.stringify({ slidesPerView, gap, fade, transitionMs, loop, centered });
    useEffect(() => {
      carousel.setConfig({
        slidesPerView: normalizeBreakpointInput(slidesPerView),
        gap: normalizeBreakpointInput(gap),
        fade,
        transitionMs,
        loop,
        centered,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configKey]);

    useEffect(() => {
      carousel.setSlidesCount(slides.length);
    }, [slides.length, carousel]);

    // Keep off-screen slides (incl. loop duplicates) inert so their interactive
    // content is excluded from the tab order and the accessibility tree. Runs
    // every render to stay in sync as the visible window moves.
    useEffect(() => {
      carousel.renderedIndices.forEach((_, index) => {
        slideNodes.current[index]?.toggleAttribute('inert', !carousel.isSlideVisible(index));
      });
    });

    const setViewportRef = (node: HTMLDivElement | null): void => {
      (carousel.viewportRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={setViewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={carousel.regionLabel}
        aria-live="off"
        tabIndex={0}
        className={cn(
          carousel.contentClassName(
            styles['tedi-carousel__content'],
            styles['tedi-carousel__content--fade-right'],
            styles['tedi-carousel__content--fade-x']
          ),
          className
        )}
        onScroll={carousel.onScroll}
        onWheel={carousel.onWheel}
        onKeyDown={carousel.onKeyDown}
        onPointerDown={carousel.onPointerDown}
        onPointerMove={carousel.onPointerMove}
        onPointerUp={carousel.onPointerUp}
        onPointerCancel={carousel.onPointerUp}
        onLostPointerCapture={carousel.onPointerUp}
      >
        <div
          ref={carousel.trackRef}
          className={styles['tedi-carousel__track']}
          style={carousel.trackStyle}
          onTransitionEnd={carousel.onTransitionEnd}
        >
          {carousel.renderedIndices.map((slideIndex, renderedIndex) => {
            const visible = carousel.isSlideVisible(renderedIndex);
            return (
              <div
                key={renderedIndex}
                ref={(node) => {
                  slideNodes.current[renderedIndex] = node;
                  carousel.setSlideRef(renderedIndex, node);
                }}
                role={visible ? 'group' : 'presentation'}
                aria-roledescription="slide"
                aria-label={carousel.slideLabel(slideIndex + 1)}
                aria-current={renderedIndex === carousel.renderedActiveIndex ? 'true' : undefined}
                aria-hidden={visible ? undefined : 'true'}
                tabIndex={visible ? -1 : undefined}
                className={styles['tedi-carousel__slide']}
                style={{ flex: carousel.slideFlex }}
              >
                {slides[slideIndex]}
              </div>
            );
          })}
        </div>

        <div aria-live="polite" className="visually-hidden">
          {carousel.announcement}
        </div>
      </div>
    );
  }
);

CarouselContent.displayName = 'CarouselContent';

export default CarouselContent;
