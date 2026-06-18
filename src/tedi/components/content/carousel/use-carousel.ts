import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useBreakpoint } from '../../../helpers/hooks/use-breakpoint';
import { useLabels } from '../../../providers/label-provider';
import { BreakpointObject, resolveBreakpointValue } from './carousel-utils';

/**
 * Edge-fade behaviour:
 * - `false` — no fade.
 * - `true` — fades the trailing edge with more than one slide per view, or both edges for a single slide.
 * - `'right'` — always fade only the trailing edge.
 * - `'both'` — always fade both edges, regardless of slide count.
 */
export type CarouselFade = boolean | 'right' | 'both';

export interface CarouselConfig {
  slidesPerView: BreakpointObject<number>;
  gap: BreakpointObject<number>;
  fade: CarouselFade;
  transitionMs: number;
  loop: boolean;
  centered: boolean;
}

const DEFAULT_CONFIG: CarouselConfig = {
  slidesPerView: { xs: 1 },
  gap: { xs: 16 },
  fade: false,
  transitionMs: 400,
  loop: true,
  centered: false,
};

const mod = (value: number, length: number): number => ((value % length) + length) % length;

export interface CarouselApi {
  viewportRef: React.RefObject<HTMLDivElement>;
  trackRef: React.RefObject<HTMLDivElement>;
  setSlideRef: (renderedIndex: number, element: HTMLDivElement | null) => void;
  setConfig: (config: CarouselConfig) => void;
  setSlidesCount: (count: number) => void;
  slidesCount: number;
  slideIndex: number;
  canPrev: boolean;
  canNext: boolean;
  renderedIndices: number[];
  renderedActiveIndex: number;
  slideFlex: string;
  trackStyle: CSSProperties;
  contentClassName: (base: string, fadeModifier: string, fadeXModifier: string) => string;
  isSlideVisible: (renderedIndex: number) => boolean;
  announcement: string;
  regionLabel: string;
  slideLabel: (slide: number) => string;
  next: () => void;
  prev: () => void;
  goToIndex: (index: number, options?: { focusSlide?: boolean }) => void;
  onTransitionEnd: (event: React.TransitionEvent<HTMLDivElement>) => void;
  onScroll: () => void;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
}

/**
 * The carousel engine. Holds the infinite-loop track state and exposes the
 * imperative API consumed by `Carousel.Content`, `Carousel.Navigation` and
 * `Carousel.Indicators`. Ported from the Angular `tedi-carousel-content`.
 */
export const useCarousel = (): CarouselApi => {
  const { getLabel } = useLabels();
  const breakpoint = useBreakpoint();

  const [config, setConfig] = useState<CarouselConfig>(DEFAULT_CONFIG);
  const [slidesCount, setSlidesCount] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [windowBase, setWindowBase] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lockedRef = useRef(false);
  const draggingRef = useRef(false);
  const pendingFocusRef = useRef(false);
  const startXRef = useRef(0);
  const startIndexRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollDeltaRef = useRef(0);
  const mountedRef = useRef(true);

  const trackIndexRef = useRef(trackIndex);
  const windowBaseRef = useRef(windowBase);
  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);
  useEffect(() => {
    windowBaseRef.current = windowBase;
  }, [windowBase]);

  const currentSlidesPerView = useMemo(
    () => resolveBreakpointValue(config.slidesPerView, breakpoint),
    [config.slidesPerView, breakpoint]
  );
  const currentGap = useMemo(() => resolveBreakpointValue(config.gap, breakpoint), [config.gap, breakpoint]);

  const loop = config.loop;

  const maxIndex = useMemo(
    () => Math.max(0, slidesCount - Math.ceil(currentSlidesPerView)),
    [slidesCount, currentSlidesPerView]
  );

  const clampIndex = useCallback(
    (value: number): number => (loop ? value : Math.min(Math.max(value, 0), maxIndex)),
    [loop, maxIndex]
  );

  const buffer = loop ? slidesCount : 0;

  const slideIndex = useMemo(() => {
    if (slidesCount === 0) return 0;
    if (loop) return mod(Math.floor(trackIndex), slidesCount);
    return Math.min(Math.max(Math.round(trackIndex), 0), slidesCount - 1);
  }, [trackIndex, slidesCount, loop]);

  const renderedActiveIndex = loop ? trackIndex - windowBase + buffer : trackIndex;

  const canPrev = loop || trackIndex > 0.001;
  const canNext = loop || trackIndex < maxIndex - 0.001;

  const renderedIndices = useMemo(() => {
    if (!slidesCount) return [];
    if (!loop) return Array.from({ length: slidesCount }, (_, i) => i);
    const total = 2 * buffer + Math.ceil(currentSlidesPerView);
    const start = windowBase - buffer;
    return Array.from({ length: total }, (_, i) => mod(start + i, slidesCount));
  }, [slidesCount, buffer, currentSlidesPerView, windowBase, loop]);

  const slideFlex = useMemo(
    () => `0 0 calc((100% - ${(currentSlidesPerView - 1) * currentGap}px) / ${currentSlidesPerView})`,
    [currentSlidesPerView, currentGap]
  );

  const trackStyle = useMemo<CSSProperties>(() => {
    if (!viewportWidth) {
      return { gap: `${currentGap}px`, transform: 'translate3d(0,0,0)', transition: 'none' };
    }
    const totalGapWidth = currentGap * (currentSlidesPerView - 1);
    const slideWidth = (viewportWidth - totalGapWidth) / currentSlidesPerView;
    const offsetSlides = loop ? trackIndex - windowBase + buffer : trackIndex;
    const peek = config.centered ? (viewportWidth - slideWidth) / 2 : 0;
    const translateX = -offsetSlides * (slideWidth + currentGap) + peek;

    return {
      gap: `${currentGap}px`,
      transform: `translate3d(${translateX}px, 0, 0)`,
      transition: animate ? `transform ${config.transitionMs}ms ease` : 'none',
    };
  }, [
    viewportWidth,
    currentGap,
    currentSlidesPerView,
    trackIndex,
    windowBase,
    buffer,
    animate,
    config.transitionMs,
    config.centered,
    loop,
  ]);

  const isSlideVisible = useCallback(
    (renderedIndex: number): boolean => {
      const slidesPerView = Math.ceil(currentSlidesPerView);
      return renderedIndex >= renderedActiveIndex && renderedIndex < renderedActiveIndex + slidesPerView;
    },
    [currentSlidesPerView, renderedActiveIndex]
  );

  const contentClassName = useCallback(
    (base: string, fadeModifier: string, fadeXModifier: string): string => {
      const classes = [base];
      if (config.fade) {
        const both = config.fade === 'both' || (config.fade !== 'right' && currentSlidesPerView <= 1);
        classes.push(both ? fadeXModifier : fadeModifier);
      }
      return classes.join(' ');
    },
    [config.fade, currentSlidesPerView]
  );

  const setSlideRef = useCallback((renderedIndex: number, element: HTMLDivElement | null): void => {
    slideRefs.current[renderedIndex] = element;
  }, []);

  const announceSlideChange = useCallback((): void => {
    setTimeout(() => {
      if (!mountedRef.current || !slidesCount) return;
      const current = loop
        ? mod(Math.floor(trackIndexRef.current), slidesCount)
        : Math.min(Math.max(Math.round(trackIndexRef.current), 0), slidesCount - 1);
      setAnnouncement(getLabel('carousel.slide', current + 1, slidesCount));
    }, 100);
  }, [getLabel, slidesCount, loop]);

  const lockNavigation = useCallback((): void => {
    lockedRef.current = true;
    setTimeout(() => {
      lockedRef.current = false;
    }, config.transitionMs);
  }, [config.transitionMs]);

  const focusActiveSlide = useCallback((): void => {
    setTimeout(() => {
      const activeIndex = trackIndexRef.current - windowBaseRef.current + buffer;
      slideRefs.current[activeIndex]?.focus({ preventScroll: true });
    });
  }, [buffer]);

  const next = useCallback((): void => {
    if (!slidesCount || lockedRef.current) return;
    if (!loop && trackIndexRef.current >= maxIndex - 0.001) return;
    setAnimate(true);
    setTrackIndex((index) => clampIndex(index + 1));
    lockNavigation();
    announceSlideChange();
  }, [slidesCount, loop, maxIndex, clampIndex, lockNavigation, announceSlideChange]);

  const prev = useCallback((): void => {
    if (!slidesCount || lockedRef.current) return;
    if (!loop && trackIndexRef.current <= 0.001) return;
    setAnimate(true);
    setTrackIndex((index) => clampIndex(index - 1));
    lockNavigation();
    announceSlideChange();
  }, [slidesCount, loop, clampIndex, lockNavigation, announceSlideChange]);

  const goToIndex = useCallback(
    (index: number, options?: { focusSlide?: boolean }): void => {
      if (!slidesCount || lockedRef.current) return;
      setAnimate(true);

      if (loop) {
        const current = mod(Math.floor(trackIndexRef.current), slidesCount);
        const normalized = mod(index, slidesCount);
        const delta = normalized - current;
        setTrackIndex((value) => value + delta);
      } else {
        setTrackIndex(clampIndex(index));
      }

      if (options?.focusSlide) {
        pendingFocusRef.current = true;
      } else {
        announceSlideChange();
      }
    },
    [slidesCount, loop, clampIndex, announceSlideChange]
  );

  const onTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLDivElement>): void => {
      if (event.target !== trackRef.current || event.propertyName !== 'transform' || draggingRef.current) {
        return;
      }
      setAnimate(false);
      setWindowBase(Math.floor(trackIndexRef.current));

      if (pendingFocusRef.current) {
        pendingFocusRef.current = false;
        focusActiveSlide();
      }
    },
    [focusActiveSlide]
  );

  const onScroll = useCallback((): void => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
  }, []);

  const cellWidth = useCallback((): number => {
    return (viewportWidth - currentGap * (currentSlidesPerView - 1)) / currentSlidesPerView + currentGap;
  }, [viewportWidth, currentGap, currentSlidesPerView]);

  const onWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>): void => {
      if (!slidesCount) return;

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (!delta) return;

      const width = cellWidth();
      if (!width) return;

      const deltaSlides = delta / width;
      scrollDeltaRef.current += deltaSlides;

      const maxDelta = buffer * 0.9;
      const min = loop ? windowBase - maxDelta : 0;
      const max = loop ? windowBase + maxDelta : maxIndex;

      const unclamped = trackIndexRef.current + deltaSlides;
      const clamped = Math.min(Math.max(unclamped, min), max);
      const wasClamped = clamped !== unclamped;

      setAnimate(false);
      setTrackIndex(clamped);

      clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        setAnimate(true);
        const direction = Math.sign(scrollDeltaRef.current);
        const currentIndex = trackIndexRef.current;
        let snapIndex = Math.round(currentIndex);

        if (Math.abs(scrollDeltaRef.current) > 0.3) {
          snapIndex = direction > 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex);
        }
        if (wasClamped) {
          if (currentIndex <= min) snapIndex = Math.ceil(min);
          if (currentIndex >= max) snapIndex = Math.floor(max);
        }

        const finalIndex = Math.min(Math.max(snapIndex, min), max);
        setTrackIndex(finalIndex);
        scrollDeltaRef.current = 0;
      }, 120);
    },
    [slidesCount, cellWidth, buffer, windowBase, loop, maxIndex]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown':
          event.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault();
          prev();
          break;
        case 'Home':
          event.preventDefault();
          goToIndex(0);
          break;
        case 'End':
          event.preventDefault();
          goToIndex(slidesCount - 1);
          break;
        default:
          break;
      }
    },
    [next, prev, goToIndex, slidesCount]
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!slidesCount) return;
      viewportRef.current?.setPointerCapture(event.pointerId);
      draggingRef.current = true;
      setAnimate(false);
      startXRef.current = event.clientX;
      startIndexRef.current = trackIndexRef.current;
      startTimeRef.current = event.timeStamp;
      lastXRef.current = event.clientX;
      lastTimeRef.current = event.timeStamp;
      if (loop) setWindowBase(Math.floor(trackIndexRef.current));
    },
    [slidesCount, loop]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!draggingRef.current) return;
      const width = cellWidth();
      if (!width) return;

      const dx = event.clientX - startXRef.current;
      if (Number.isNaN(dx)) return;
      lastXRef.current = event.clientX;
      lastTimeRef.current = event.timeStamp;
      const deltaSlides = dx / width;
      const targetIndex = startIndexRef.current - deltaSlides;

      const maxDelta = buffer * 0.9;
      const base = Math.floor(startIndexRef.current);
      const min = loop ? base - maxDelta : 0;
      const max = loop ? base + maxDelta : maxIndex;
      setTrackIndex(Math.min(Math.max(targetIndex, min), max));
    },
    [cellWidth, buffer, loop, maxIndex]
  );

  const onPointerUp = useCallback((): void => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setAnimate(true);

    const width = cellWidth();
    const rounded = Math.round(trackIndexRef.current);
    let target = rounded;

    const elapsed = lastTimeRef.current - startTimeRef.current;
    const velocity = elapsed > 0 && width ? -(lastXRef.current - startXRef.current) / width / elapsed : 0;
    const FLICK_VELOCITY = 0.0015;

    if (Math.abs(velocity) > FLICK_VELOCITY && rounded === Math.round(startIndexRef.current)) {
      target = Math.round(startIndexRef.current) + (velocity > 0 ? 1 : -1);
    }

    setTrackIndex(clampIndex(target));
  }, [cellWidth, clampIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setViewportWidth(viewport.clientWidth);

    const observer = new ResizeObserver(() => setViewportWidth(viewport.clientWidth));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      mountedRef.current = false;
      clearTimeout(wheelTimeoutRef.current);
    },
    []
  );

  return {
    viewportRef,
    trackRef,
    setSlideRef,
    setConfig,
    setSlidesCount,
    slidesCount,
    slideIndex,
    canPrev,
    canNext,
    renderedIndices,
    renderedActiveIndex,
    slideFlex,
    trackStyle,
    contentClassName,
    isSlideVisible,
    announcement,
    regionLabel: getLabel('carousel'),
    slideLabel: (slide: number) => getLabel('carousel.slide', slide, slidesCount),
    next,
    prev,
    goToIndex,
    onTransitionEnd,
    onScroll,
    onWheel,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
};
