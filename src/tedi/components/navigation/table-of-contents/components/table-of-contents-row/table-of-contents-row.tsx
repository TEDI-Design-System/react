import cn from 'classnames';
import { useContext, useEffect, useRef } from 'react';

import Separator from '../../../../misc/separator/separator';
import { TableOfContentsContext, type TableOfContentsNode } from '../../table-of-contents';
import styles from '../../table-of-contents.module.scss';

interface TableOfContentsRowProps {
  node: TableOfContentsNode;
  depth: number;
  index: number;
  /** Parent's number (e.g. `'2'`) for building hierarchical ordinals like `2.1`. */
  numberPrefix?: string;
}

/** Margin (px) left around the active row when scrolling it into view — matches `--tedi-dimensions-05` (0.5rem). */
const SCROLL_MARGIN = 8;

/**
 * Nearest scrollable ancestor that is a real in-page container (never `body` / `documentElement`),
 * so bringing the active row into view scrolls only the table-of-contents' own scroll area and can
 * never scroll the whole document. Returns `null` when no such container exists.
 */
export const getScrollableAncestor = (element: HTMLElement | null): HTMLElement | null => {
  let current = element?.parentElement ?? null;
  while (current && current !== document.body && current !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(current);
    const isScrollable = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
    if (isScrollable && current.scrollHeight > current.clientHeight) return current;
    current = current.parentElement;
  }
  return null;
};

/**
 * Minimal vertical scroll (with an {@link SCROLL_MARGIN}px margin) to bring the row's
 * `[top, bottom]` band inside the container's `[top, bottom]` band. Returns `0` when the row is
 * already visible — "nearest" semantics: scroll up if it's above, down if it's below, else nothing.
 */
export const getRowScrollDelta = (
  rowTop: number,
  rowBottom: number,
  containerTop: number,
  containerBottom: number,
  margin = SCROLL_MARGIN
): number => {
  if (rowTop < containerTop + margin) return rowTop - containerTop - margin;
  if (rowBottom > containerBottom - margin) return rowBottom - containerBottom + margin;
  return 0;
};

export const TableOfContentsRow = ({ node, depth, index, numberPrefix }: TableOfContentsRowProps): JSX.Element => {
  const { activeId, numbered, activeTrail, defaultOpen, scrollActiveIntoView, activeIdChanged } =
    useContext(TableOfContentsContext);
  const { id, content, children, separator, slot } = node;

  const hasChildren = !!children?.length;
  const isSelected = !!id && id === activeId;
  const isOpen = hasChildren && (defaultOpen || (!!id && activeTrail.has(id)));
  const level = Math.min(depth, 2);

  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollActiveIntoView || !isSelected || !activeIdChanged) return;

    const row = rowRef.current;
    if (!row) return;

    const container = getScrollableAncestor(row);
    if (!container || typeof container.scrollBy !== 'function') return;

    const rowRect = row.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const delta = getRowScrollDelta(rowRect.top, rowRect.bottom, containerRect.top, containerRect.bottom);
    if (delta === 0) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    container.scrollBy({ top: delta, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [scrollActiveIntoView, isSelected, activeIdChanged]);

  const numberBase = numberPrefix ? `${numberPrefix}.${index + 1}` : `${index + 1}`;
  const ordinal = numberPrefix ? numberBase : `${numberBase}.`;

  const Group = numbered ? 'ol' : 'ul';

  return (
    <li
      aria-current={isSelected ? 'true' : undefined}
      className={cn(styles['tedi-table-of-contents__item'], {
        [styles['tedi-table-of-contents__item--selected']]: isSelected,
      })}
    >
      <div
        ref={rowRef}
        className={cn(styles['tedi-table-of-contents__row'], styles[`tedi-table-of-contents__row--level-${level}`])}
      >
        {numbered && (
          <span className={styles['tedi-table-of-contents__number']} aria-hidden="true">
            {ordinal}
          </span>
        )}
        <span className={styles['tedi-table-of-contents__content']}>{content}</span>
        {slot !== undefined && <div className={styles['tedi-table-of-contents__slot']}>{slot}</div>}
      </div>

      {isOpen && (
        <Group className={styles['tedi-table-of-contents__group']}>
          {children!.map((child, childIndex) => (
            <TableOfContentsRow
              key={child.id ?? childIndex}
              node={child}
              depth={depth + 1}
              index={childIndex}
              numberPrefix={numbered ? numberBase : undefined}
            />
          ))}
        </Group>
      )}

      {separator && <Separator className={styles['tedi-table-of-contents__separator']} />}
    </li>
  );
};

TableOfContentsRow.displayName = 'TableOfContentsRow';
