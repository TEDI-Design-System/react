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
  const mutationObserverRef = useRef<MutationObserver | null>(null);
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

  const disconnectObservers = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    mutationObserverRef.current?.disconnect();
    mutationObserverRef.current = null;
  }, []);

  const scrollRef = useCallback(
    (node: HTMLElement | null) => {
      disconnectObservers();

      nodeRef.current = node;

      if (node) {
        checkFade(node);

        const resizeObserver = new ResizeObserver(() => {
          checkFade(node);
        });
        observerRef.current = resizeObserver;
        resizeObserver.observe(node);

        // A capped scroll container keeps its own size when its content changes, so the
        // children are observed too, and kept in sync as they are added or removed.
        const observedChildren = new Set<Element>();
        const syncChildren = () => {
          const children = new Set(Array.from(node.children));

          observedChildren.forEach((child) => {
            if (!children.has(child)) {
              resizeObserver.unobserve(child);
              observedChildren.delete(child);
            }
          });
          children.forEach((child) => {
            if (!observedChildren.has(child)) {
              resizeObserver.observe(child);
              observedChildren.add(child);
            }
          });
        };

        syncChildren();

        if (typeof MutationObserver !== 'undefined') {
          const mutationObserver = new MutationObserver(() => {
            syncChildren();
            checkFade(node);
          });
          mutationObserverRef.current = mutationObserver;
          mutationObserver.observe(node, { childList: true });
        }
      }
    },
    [checkFade, disconnectObservers]
  );

  useEffect(() => disconnectObservers, [disconnectObservers]);

  return { scrollRef, canScrollStart, canScrollEnd, handleScroll };
};
