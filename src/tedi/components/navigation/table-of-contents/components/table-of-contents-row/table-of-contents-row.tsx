import cn from 'classnames';
import { useContext } from 'react';

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
  const { activeId, numbered, activeTrail } = useContext(TableOfContentsContext);
  const { id, content, children, separator } = node;

  const hasChildren = !!children?.length;
  const isSelected = !!id && id === activeId;
  const isOpen = hasChildren && !!id && activeTrail.has(id);
  const level = Math.min(depth, 2);

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
      <span
        className={cn(styles['tedi-table-of-contents__row'], styles[`tedi-table-of-contents__row--level-${level}`])}
      >
        {numbered && (
          <span className={styles['tedi-table-of-contents__number']} aria-hidden="true">
            {ordinal}
          </span>
        )}
        <span className={styles['tedi-table-of-contents__content']}>{content}</span>
      </span>

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

      {separator && <Separator />}
    </li>
  );
};

TableOfContentsRow.displayName = 'TableOfContentsRow';
