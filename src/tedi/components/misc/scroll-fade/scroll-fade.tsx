import cn from 'classnames';
import { forwardRef, useCallback } from 'react';

import { useScrollFade } from '../../../helpers';
import styles from './scroll-fade.module.scss';

export interface ScrollFadeProps {
  /**
   * ScrollFade content
   */
  children: React.ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Scrollbar type
   * @default custom
   */
  scrollBar?: 'default' | 'custom';
  /**
   * Size of fade in percentages.
   * @default 20
   */
  fadeSize?: 0 | 10 | 20;
  /**
   * Fade position
   * @default both
   */
  fadePosition?: 'top' | 'bottom' | 'both';
  /**
   * Called when element is scrolled to top
   */
  onScrollToTop?: () => void;
  /**
   * Called when element is scrolled to bottom
   */
  onScrollToBottom?: () => void;
}

export const ScrollFade = forwardRef<HTMLDivElement, ScrollFadeProps>((props, ref): JSX.Element => {
  const {
    children,
    className,
    scrollBar = 'custom',
    onScrollToBottom,
    onScrollToTop,
    fadeSize = 20,
    fadePosition = 'both',
  } = props;

  const { scrollRef, canScrollStart, canScrollEnd, handleScroll } = useScrollFade({
    direction: 'vertical',
    onScrollToStart: onScrollToTop,
    onScrollToEnd: onScrollToBottom,
  });

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      scrollRef(node);
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [scrollRef, ref]
  );

  const showStartFade = canScrollStart && (fadePosition === 'both' || fadePosition === 'top');
  const showEndFade = canScrollEnd && (fadePosition === 'both' || fadePosition === 'bottom');

  const ScrollFadeBEM = cn(
    styles['tedi-scroll-fade'],
    { [styles[`tedi-scroll-fade--top-${fadeSize}`]]: showStartFade },
    { [styles[`tedi-scroll-fade--bottom-${fadeSize}`]]: showEndFade },
    className
  );

  const ScrollFadeInnerBEM = cn(styles['tedi-scroll-fade__inner'], {
    [styles['tedi-scroll-fade__inner--custom-scroll']]: scrollBar === 'custom',
  });

  return (
    <div data-name="scroll-fade" className={ScrollFadeBEM}>
      <div ref={mergedRef} onScroll={handleScroll} className={ScrollFadeInnerBEM} tabIndex={0}>
        {children}
      </div>
    </div>
  );
});

ScrollFade.displayName = 'ScrollFade';

export default ScrollFade;
