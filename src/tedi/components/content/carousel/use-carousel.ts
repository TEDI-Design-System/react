import { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
  swipeThreshold: number;
}

/** Default share of the distance to the next position that a drag must cover to move on. */
export const DEFAULT_SWIPE_THRESHOLD = 0.3;

const DEFAULT_CONFIG: CarouselConfig = {
  slidesPerView: { xs: 1 },
  gap: { xs: 1 },
  fade: false,
  transitionMs: 400,
  loop: true,
  centered: false,
  swipeThreshold: DEFAULT_SWIPE_THRESHOLD,
};

// Wheel movement is measured in slide widths; smaller movements snap to the nearest position.
const WHEEL_DIRECTIONAL_SNAP_THRESHOLD = 0.3;
// Treat negligible fractional end positions as whole-slide positions.
const MAX_INDEX_ROUNDING_TOLERANCE = 1e-6;
// Ignore floating-point noise when walking a released drag; far below the shortest final step.
const EPSILON = 1e-9;
// Drag speed, in slides per ms, that counts as a flick.
const FLICK_VELOCITY = 0.0015;
// A flick's speed is measured over this many ms before release.
const FLICK_WINDOW = 100;
// Drags shorter than this (px) never move the carousel, so taps and jitter stay put.
const MIN_SWIPE_DISTANCE = 10;
// A mouse holds still while clicking, so a shorter drag is already deliberate.
const MIN_MOUSE_SWIPE_DISTANCE = 4;

const mod = (value: number, length: number): number => ((value % length) + length) % length;

const closestPositionIndex = (positions: number[], index: number): number =>
  positions.reduce(
    (closest, position, candidate) =>
      Math.abs(position - index) < Math.abs(positions[closest] - index) ? candidate : closest,
    0
  );

export interface CarouselApi {
  viewportRef: React.RefObject<HTMLDivElement>;
  trackRef: React.RefObject<HTMLDivElement>;
  setSlideRef: (renderedIndex: number, element: HTMLDivElement | null) => void;
  setConfig: (config: CarouselConfig) => void;
  setSlidesCount: (count: number) => void;
  slidesCount: number;
  positions: number[];
  activePositionIndex: number;
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
  onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => void;
}

/**
 * The carousel engine. Holds the infinite-loop track state and exposes the
 * imperative API consumed by `Carousel.Content`, `Carousel.Navigation` and
 * `Carousel.Indicators`. Ported from the Angular `tedi-carousel-content`.
 */
export const useCarousel = (ariaLabel?: string): CarouselApi => {
  const { getLabel } = useLabels();
  const breakpoint = useBreakpoint();

  const [config, setConfig] = useState<CarouselConfig>(DEFAULT_CONFIG);
  const [slidesCount, setSlidesCount] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [windowBase, setWindowBase] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [rootFontSize, setRootFontSize] = useState(16);
  const [announcement, setAnnouncement] = useState('');

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lockedRef = useRef(false);
  const draggingRef = useRef(false);
  const pendingFocusRef = useRef(false);
  const startXRef = useRef(0);
  const startIndexRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollDeltaRef = useRef(0);
  const mountedRef = useRef(true);
  // The pointer that started the drag; other pointers are ignored until it ends.
  const pointerIdRef = useRef<number | null>(null);
  // Recent pointer positions, for measuring flick speed at release.
  const samplesRef = useRef<{ x: number; t: number }[]>([]);
  // The current drag's minimum swipe distance (px), set by its pointer type.
  const minSwipeDistanceRef = useRef(MIN_SWIPE_DISTANCE);

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
  // `currentGap` is in rem (used for CSS); `currentGapPx` is its px value for the layout math.
  const currentGapPx = useMemo(() => currentGap * rootFontSize, [currentGap, rootFontSize]);

  const loop = config.loop;

  const maxIndex = useMemo(() => {
    const rawMaxIndex = Math.max(0, slidesCount - currentSlidesPerView);
    const nearestWhole = Math.round(rawMaxIndex);
    return Math.abs(rawMaxIndex - nearestWhole) < MAX_INDEX_ROUNDING_TOLERANCE ? nearestWhole : rawMaxIndex;
  }, [slidesCount, currentSlidesPerView]);

  const positions = useMemo(() => {
    if (!slidesCount) return [];
    if (loop) return Array.from({ length: slidesCount }, (_, i) => i);
    const whole = Math.floor(maxIndex);
    const reachable = Array.from({ length: whole + 1 }, (_, i) => i);
    if (maxIndex > whole) reachable.push(maxIndex);
    return reachable;
  }, [slidesCount, loop, maxIndex]);

  const clampIndex = useCallback(
    (value: number): number => (loop ? value : Math.min(Math.max(value, 0), maxIndex)),
    [loop, maxIndex]
  );

  const buffer = loop ? slidesCount : 0;

  const activePositionIndex = useMemo(() => {
    if (!positions.length) return 0;
    if (loop) return mod(Math.floor(trackIndex), slidesCount);
    return closestPositionIndex(positions, trackIndex);
  }, [positions, trackIndex, slidesCount, loop]);

  const renderedActiveIndex = loop ? trackIndex - windowBase + buffer : Math.ceil(trackIndex);

  const canPrev = slidesCount > 0 && (loop || trackIndex > 0);
  const canNext = slidesCount > 0 && (loop || trackIndex < maxIndex);

  useLayoutEffect(() => {
    if (loop) return;
    clearTimeout(wheelTimeoutRef.current);
    scrollDeltaRef.current = 0;
    trackIndexRef.current = clampIndex(trackIndexRef.current);
    setTrackIndex((index) => clampIndex(index));
  }, [loop, maxIndex, clampIndex]);

  const renderedIndices = useMemo(() => {
    if (!slidesCount) return [];
    if (!loop) return Array.from({ length: slidesCount }, (_, i) => i);
    const total = 2 * buffer + Math.ceil(currentSlidesPerView);
    const start = windowBase - buffer;
    return Array.from({ length: total }, (_, i) => mod(start + i, slidesCount));
  }, [slidesCount, buffer, currentSlidesPerView, windowBase, loop]);

  const slideFlex = useMemo(
    () => `0 0 calc((100% - ${(currentSlidesPerView - 1) * currentGap}rem) / ${currentSlidesPerView})`,
    [currentSlidesPerView, currentGap]
  );

  const trackStyle = useMemo<CSSProperties>(() => {
    if (!viewportWidth) {
      return { gap: `${currentGap}rem`, transform: 'translate3d(0,0,0)', transition: 'none' };
    }
    const totalGapWidth = currentGapPx * (currentSlidesPerView - 1);
    const slideWidth = (viewportWidth - totalGapWidth) / currentSlidesPerView;
    const offsetSlides = loop ? trackIndex - windowBase + buffer : trackIndex;
    const peek = config.centered ? (viewportWidth - slideWidth) / 2 : 0;
    const translateX = -offsetSlides * (slideWidth + currentGapPx) + peek;

    return {
      gap: `${currentGap}rem`,
      transform: `translate3d(${translateX}px, 0, 0)`,
      transition: animate ? `transform ${config.transitionMs}ms ease` : 'none',
    };
  }, [
    viewportWidth,
    currentGap,
    currentGapPx,
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
      if (!loop) return renderedIndex + 1 > trackIndex && renderedIndex < trackIndex + currentSlidesPerView;
      const slidesPerView = Math.ceil(currentSlidesPerView);
      return renderedIndex >= renderedActiveIndex && renderedIndex < renderedActiveIndex + slidesPerView;
    },
    [currentSlidesPerView, renderedActiveIndex, loop, trackIndex]
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
        : Math.min(Math.max(Math.ceil(trackIndexRef.current), 0), slidesCount - 1);
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
      const activeIndex = loop
        ? trackIndexRef.current - windowBaseRef.current + buffer
        : Math.ceil(trackIndexRef.current);
      slideRefs.current[activeIndex]?.focus({ preventScroll: true });
    });
  }, [buffer, loop]);

  const next = useCallback((): void => {
    if (!slidesCount || lockedRef.current) return;
    if (!loop && trackIndexRef.current >= maxIndex) return;
    setAnimate(true);
    setTrackIndex((index) => (loop ? index + 1 : positions.find((position) => position > index) ?? maxIndex));
    lockNavigation();
    announceSlideChange();
  }, [slidesCount, loop, maxIndex, positions, lockNavigation, announceSlideChange]);

  const prev = useCallback((): void => {
    if (!slidesCount || lockedRef.current) return;
    if (!loop && trackIndexRef.current <= 0) return;
    setAnimate(true);
    setTrackIndex((index) => (loop ? index - 1 : [...positions].reverse().find((position) => position < index) ?? 0));
    lockNavigation();
    announceSlideChange();
  }, [slidesCount, loop, positions, lockNavigation, announceSlideChange]);

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
    return (viewportWidth - currentGapPx * (currentSlidesPerView - 1)) / currentSlidesPerView + currentGapPx;
  }, [viewportWidth, currentGapPx, currentSlidesPerView]);

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
        const snapInScrollDirection = Math.abs(scrollDeltaRef.current) > WHEEL_DIRECTIONAL_SNAP_THRESHOLD;
        const currentIndex = trackIndexRef.current;
        let snapIndex: number;
        if (loop) {
          snapIndex = Math.round(currentIndex);
          if (snapInScrollDirection) {
            snapIndex = direction > 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex);
          }
          if (wasClamped) {
            if (currentIndex <= min) snapIndex = Math.ceil(min);
            if (currentIndex >= max) snapIndex = Math.floor(max);
          }
        } else if (wasClamped && currentIndex >= max) {
          snapIndex = max;
        } else if (wasClamped && currentIndex <= min) {
          snapIndex = min;
        } else if (snapInScrollDirection) {
          snapIndex =
            direction > 0
              ? positions.find((position) => position >= currentIndex) ?? max
              : [...positions].reverse().find((position) => position <= currentIndex) ?? min;
        } else {
          snapIndex = positions[closestPositionIndex(positions, currentIndex)];
        }

        const finalIndex = Math.min(Math.max(snapIndex, min), max);
        setTrackIndex(finalIndex);
        scrollDeltaRef.current = 0;
      }, 120);
    },
    [slidesCount, cellWidth, buffer, windowBase, loop, maxIndex, positions]
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
          goToIndex(loop ? slidesCount - 1 : maxIndex);
          break;
        default:
          break;
      }
    },
    [next, prev, goToIndex, slidesCount, loop, maxIndex]
  );

  /** Snap to the nearest reachable position, including a fractional end. */
  const snap = useCallback(
    (value: number): number => {
      if (loop) return Math.round(value);
      return positions.length ? positions[closestPositionIndex(positions, value)] : 0;
    },
    [loop, positions]
  );

  /** The next stop position after `position` in the given direction (itself at a bound). */
  const adjacentStop = useCallback(
    (position: number, forward: boolean): number =>
      forward ? clampIndex(Math.floor(position + EPSILON) + 1) : clampIndex(Math.ceil(position - EPSILON) - 1),
    [clampIndex]
  );

  /** Where the track sits while dragged with the pointer at `clientX`. */
  const dragIndex = useCallback(
    (clientX: number): number => {
      const width = cellWidth();
      if (!width) return trackIndexRef.current;

      const deltaSlides = (clientX - startXRef.current) / width;
      const maxDelta = buffer * 0.9;
      const base = Math.floor(startIndexRef.current);
      const min = loop ? base - maxDelta : 0;
      const max = loop ? base + maxDelta : maxIndex;

      return Math.min(Math.max(startIndexRef.current - deltaSlides, min), max);
    },
    [cellWidth, buffer, loop, maxIndex]
  );

  /** Records the pointer at `clientX` and returns where that drags the track. */
  const trackPointer = useCallback(
    (clientX: number, timeStamp: number): number => {
      lastXRef.current = clientX;
      lastTimeRef.current = timeStamp;

      const samples = samplesRef.current;
      samples.push({ x: clientX, t: timeStamp });

      while (samples[0].t < timeStamp - FLICK_WINDOW) {
        samples.shift();
      }

      return dragIndex(clientX);
    },
    [dragIndex]
  );

  /**
   * Whether the drag ended in a flick: at least the minimum swipe distance of movement in
   * the drag direction within the last `FLICK_WINDOW` ms before release, fast enough.
   * Measuring up to the release lets a pause before the swipe pass and a hold after it
   * slow it down.
   */
  const isFlick = useCallback(
    (releasedAt: number): boolean => {
      // Unmeasured, the gap alone would give a tiny cell width and make any drag a flick.
      const width = viewportWidth ? cellWidth() : 0;
      if (!width) return false;

      const recent = samplesRef.current.find((sample) => sample.t >= releasedAt - FLICK_WINDOW);
      if (!recent) return false;

      const distance = lastXRef.current - recent.x;
      const elapsed = releasedAt - recent.t;
      const sameDirection = Math.sign(distance) === Math.sign(lastXRef.current - startXRef.current);

      if (elapsed <= 0 || !sameDirection || Math.abs(distance) < minSwipeDistanceRef.current) return false;

      return Math.abs(distance) / width / elapsed > FLICK_VELOCITY;
    },
    [viewportWidth, cellWidth]
  );

  /**
   * Where a drag released with the track at `released` settles. Walks stop position to stop
   * position in the drag direction: each gap fully dragged moves on, and a partly dragged
   * gap moves on once it reaches `swipeThreshold` of that gap (a bounded track's final gap
   * can be short). A flick that did not move on otherwise moves one position.
   */
  const swipeTarget = useCallback(
    (released: number, releasedAt: number): number => {
      const startIndex = startIndexRef.current;
      const dx = lastXRef.current - startXRef.current;
      if (Math.abs(dx) < minSwipeDistanceRef.current) return snap(startIndex);

      // Take the direction from the pointer: at a bound the clamped track does not move.
      const forward = dx < 0;
      let remaining = Math.abs(released - startIndex);
      let position = startIndex;
      let moved = false;

      let next = adjacentStop(position, forward);
      let gap = Math.abs(next - position);

      // A gap is zero at a bound, which ends the walk.
      while (gap >= EPSILON && remaining >= gap - EPSILON) {
        position = next;
        remaining -= gap;
        moved = true;
        next = adjacentStop(position, forward);
        gap = Math.abs(next - position);
      }

      if (gap >= EPSILON && remaining > EPSILON && remaining >= gap * config.swipeThreshold - EPSILON) {
        position = next;
        moved = true;
      }

      if (!moved && isFlick(releasedAt)) return adjacentStop(startIndex, forward);

      return moved ? position : snap(startIndex);
    },
    [snap, adjacentStop, isFlick, config.swipeThreshold]
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!slidesCount || draggingRef.current) return;
      viewportRef.current?.setPointerCapture(event.pointerId);
      draggingRef.current = true;
      pointerIdRef.current = event.pointerId;
      setAnimate(false);
      startXRef.current = event.clientX;
      startIndexRef.current = trackIndexRef.current;
      lastXRef.current = event.clientX;
      lastTimeRef.current = event.timeStamp;
      samplesRef.current = [{ x: event.clientX, t: event.timeStamp }];
      minSwipeDistanceRef.current = event.pointerType === 'mouse' ? MIN_MOUSE_SWIPE_DISTANCE : MIN_SWIPE_DISTANCE;
      if (loop) setWindowBase(Math.floor(trackIndexRef.current));
    },
    [slidesCount, loop]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!draggingRef.current || event.pointerId !== pointerIdRef.current || !Number.isFinite(event.clientX)) return;
      setTrackIndex(trackPointer(event.clientX, event.timeStamp));
    },
    [trackPointer]
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!draggingRef.current || event.pointerId !== pointerIdRef.current) return;
      draggingRef.current = false;

      // The pointer can move after the last pointermove; the release reports where it ended.
      const released = Number.isFinite(event.clientX)
        ? trackPointer(event.clientX, event.timeStamp)
        : dragIndex(lastXRef.current);

      setAnimate(true);
      setTrackIndex(swipeTarget(released, event.timeStamp));
    },
    [trackPointer, dragIndex, swipeTarget]
  );

  /**
   * The browser ended the drag, e.g. to scroll the page, or capture was lost mid-drag: not
   * a swipe, so return to where it started. After a normal release this is a no-op, as
   * `lostpointercapture` follows `pointerup`.
   */
  const onPointerCancel = useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!draggingRef.current || event.pointerId !== pointerIdRef.current) return;
      draggingRef.current = false;
      setAnimate(true);
      setTrackIndex(snap(startIndexRef.current));
    },
    [snap]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = (width: number): void => {
      setViewportWidth(width);
      setRootFontSize(parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
    };
    const styles = getComputedStyle(viewport);
    const horizontalPadding = (parseFloat(styles.paddingLeft) || 0) + (parseFloat(styles.paddingRight) || 0);
    measure(viewport.clientWidth - horizontalPadding);

    const observer = new ResizeObserver(([entry]) => {
      if (entry) measure(entry.contentRect.width);
    });
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
    positions,
    activePositionIndex,
    canPrev,
    canNext,
    renderedIndices,
    renderedActiveIndex,
    slideFlex,
    trackStyle,
    contentClassName,
    isSlideVisible,
    announcement,
    regionLabel: ariaLabel?.trim() || getLabel('carousel'),
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
    onPointerCancel,
  };
};
