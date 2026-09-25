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

export const TableOfContentsRow = ({ node, depth, index, numberPrefix }: TableOfContentsRowProps): JSX.Element => {
  const { activeId, numbered, activeTrail, defaultOpen, scrollActiveIntoView } = useContext(TableOfContentsContext);
  const { id, content, children, separator, slot } = node;

  const hasChildren = !!children?.length;
  const isSelected = !!id && id === activeId;
  const isOpen = hasChildren && (defaultOpen || (!!id && activeTrail.has(id)));
  const level = Math.min(depth, 2);

  const rowRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!scrollActiveIntoView || !isSelected) return;

    const row = rowRef.current;
    if (!row || typeof row.scrollIntoView !== 'function') return;

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    row.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [scrollActiveIntoView, isSelected]);

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
