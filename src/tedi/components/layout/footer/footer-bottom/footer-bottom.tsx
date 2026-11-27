import cn from 'classnames';
import { Children, isValidElement, ReactNode, useContext, useLayoutEffect, useRef } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export interface FooterBottomProps {
  /**
   * Bottom-row content. Wrap links in `<Footer.List>` with one `<Footer.ListItem>` per link so assistive
   * technology announces them as a list. On mobile the gap shrinks and items wrap to multiple lines.
   */
  children: ReactNode;
  /**
   * Insert a small dot between items (matches the Figma "with separator" bottom variant). When
   * `false`, items are spaced only by the flex `gap`. Does not reach inside `<Footer.List>`; set
   * `separator` on the list instead.
   * @default false
   */
  separator?: boolean;
  /**
   * Additional class name on the bottom strip.
   */
  className?: string;
}

export const FooterBottom = ({ children, separator = false, className }: FooterBottomProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const { mobileBreakpoint, maxWidth } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);

  const items = separator ? Children.toArray(children).filter((child) => isValidElement(child) || child) : null;
  const innerRef = useRef<HTMLDivElement>(null);
  const itemCount = items?.length ?? 0;

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner || itemCount < 2) return undefined;

    const updateSeparators = () => {
      const items = Array.from(inner.children) as HTMLElement[];

      items.forEach((item, index) => {
        const next = items[index + 1];
        item.classList.toggle(
          styles['tedi-footer-bottom__item--followed'],
          !!next && item.offsetTop === next.offsetTop
        );
      });
    };

    updateSeparators();

    if (typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(updateSeparators);
    observer.observe(inner);

    Array.from(inner.children).forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [children, isMobile, itemCount, maxWidth]);

  return (
    <div
      data-name="footer-bottom"
      className={cn(styles['tedi-footer-bottom'], { [styles['tedi-footer-bottom--mobile']]: isMobile }, className)}
    >
      {/* Inner wrapper keeps the strip background full-bleed while its content caps to `maxWidth`. */}
      <div
        ref={innerRef}
        className={cn(styles['tedi-footer-bottom__inner'], {
          [styles['tedi-footer-bottom__inner--with-separators']]: itemCount > 1,
        })}
        style={maxWidth !== undefined ? { maxWidth } : undefined}
      >
        {items && itemCount > 1
          ? items.map((child, index) => (
              <div key={isValidElement(child) ? child.key : index} className={styles['tedi-footer-bottom__item']}>
                {child}
                {index < items.length - 1 && (
                  <span
                    data-name="footer-bottom-dot"
                    className={styles['tedi-footer-bottom__dot']}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))
          : children}
      </div>
    </div>
  );
};

FooterBottom.displayName = 'Footer.Bottom';

export default FooterBottom;
