import cn from 'classnames';
import { ReactNode, useLayoutEffect, useRef } from 'react';

import styles from '../footer.module.scss';

export interface FooterListProps {
  /**
   * `<Footer.ListItem>` elements. Each item holds one link (or one link group such as a
   * contact row with an icon).
   */
  children: ReactNode;
  /**
   * Insert a small dot between items (matches the Figma "with separator" bottom variant). The dots are
   * drawn with CSS, so they are not part of the list and are not announced. A dot is hidden when it
   * would end a wrapped line.
   * @default false
   */
  separator?: boolean;
  /**
   * Wraps the list in a `<nav>` landmark with this label. Opt-in: leave it out for groups that are not
   * navigation (for example contact details). The label must be unique within the page.
   */
  navigationLabel?: string;
  /**
   * Accessible name of the list itself, for example the section heading it belongs to.
   */
  'aria-label'?: string;
  /**
   * Additional class name on the `<ul>`.
   */
  className?: string;
}

export const FooterList = ({
  children,
  separator = false,
  navigationLabel,
  'aria-label': ariaLabel,
  className,
}: FooterListProps): JSX.Element => {
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!separator || !list) return undefined;

    // Show a dot only after an item that is followed by another item on the same line.
    const updateSeparators = () => {
      const items = Array.from(list.children) as HTMLElement[];

      items.forEach((item, index) => {
        const next = items[index + 1];
        item.classList.toggle(styles['tedi-footer-list__item--followed'], !!next && item.offsetTop === next.offsetTop);
      });
    };

    updateSeparators();

    if (typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(updateSeparators);
    observer.observe(list);
    Array.from(list.children).forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [children, separator]);

  const list = (
    // `role="list"` keeps list semantics in Safari/VoiceOver, which drops them when `list-style` is `none`.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul
      ref={listRef}
      role="list"
      aria-label={ariaLabel}
      className={cn(styles['tedi-footer-list'], { [styles['tedi-footer-list--separator']]: separator }, className)}
    >
      {children}
    </ul>
  );

  return navigationLabel ? <nav aria-label={navigationLabel}>{list}</nav> : list;
};

FooterList.displayName = 'Footer.List';

export default FooterList;
