import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseScrollFadeOptions {
  /**
   * Scroll direction to track
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Called when element is scrolled to start (top or left)
   */
  onScrollToStart?: () => void;
  /**
   * Called when element is scrolled to end (bottom or right)
   */
  onScrollToEnd?: () => void;
}

export interface UseScrollFadeReturn {
  /**
   * Callback ref to attach to the scrollable element.
   * Sets up ResizeObserver and initial measurement.
   */
  scrollRef: React.RefCallback<HTMLElement>;
  /**
   * Whether content can be scrolled towards the start (top or left)
   */
  canScrollStart: boolean;
  /**
   * Whether content can be scrolled towards the end (bottom or right)
   */
  canScrollEnd: boolean;
  /**
   * Scroll event handler to attach to the scrollable element's onScroll
   */
  handleScroll: React.UIEventHandler<HTMLElement>;
}

export const useScrollFade = (options: UseScrollFadeOptions = {}): UseScrollFadeReturn => {
  const { direction = 'vertical', onScrollToStart, onScrollToEnd } = options;

  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const onScrollToStartRef = useRef(onScrollToStart);
  const onScrollToEndRef = useRef(onScrollToEnd);
  const wasAtStartRef = useRef(false);
  const wasAtEndRef = useRef(false);

  onScrollToStartRef.current = onScrollToStart;
  onScrollToEndRef.current = onScrollToEnd;

  const checkFade = useCallback(
    (el: HTMLElement) => {
      let scrollPos: number;
      let scrollSize: number;
      let clientSize: number;

      if (direction === 'horizontal') {
        scrollPos = el.scrollLeft;
        scrollSize = el.scrollWidth;
        clientSize = el.clientWidth;
      } else {
        scrollPos = el.scrollTop;
        scrollSize = el.scrollHeight;
        clientSize = el.clientHeight;
      }

      const atStart = scrollPos <= 1;
      const atEnd = Math.abs(scrollSize - scrollPos - clientSize) <= 1;

      setCanScrollStart(!atStart);
      setCanScrollEnd(!atEnd);

      if (atStart && !wasAtStartRef.current) onScrollToStartRef.current?.();
      if (atEnd && !wasAtEndRef.current) onScrollToEndRef.current?.();

      wasAtStartRef.current = atStart;
      wasAtEndRef.current = atEnd;
    },
    [direction]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      checkFade(e.currentTarget);
    },
    [checkFade]
  );

  const scrollRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      nodeRef.current = node;

      if (node) {
        checkFade(node);

        observerRef.current = new ResizeObserver(() => {
          checkFade(node);
        });
        observerRef.current.observe(node);
      }
    },
    [checkFade]
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { scrollRef, canScrollStart, canScrollEnd, handleScroll };
};
