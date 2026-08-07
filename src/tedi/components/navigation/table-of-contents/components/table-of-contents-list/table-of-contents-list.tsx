import cn from 'classnames';
import { useContext, useId } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Heading } from '../../../../base/typography/heading/heading';
import { TableOfContentsContext, type TableOfContentsNode } from '../../table-of-contents';
import styles from '../../table-of-contents.module.scss';
import { TableOfContentsRow } from '../table-of-contents-row/table-of-contents-row';

export interface TableOfContentsListProps {
  nodes: TableOfContentsNode[];
  heading?: string | null;
}

export const TableOfContentsList = ({ nodes, heading }: TableOfContentsListProps): JSX.Element => {
  const { numbered } = useContext(TableOfContentsContext);
  const { getLabel } = useLabels();
  const headingId = useId();
  const List = numbered ? 'ol' : 'ul';

  return (
    <>
      {heading && (
        <Heading element="h3" modifiers="h4" id={headingId} className={styles['tedi-table-of-contents__heading']}>
          {heading}
        </Heading>
      )}
      <nav
        aria-labelledby={heading ? headingId : undefined}
        aria-label={heading ? undefined : getLabel('table-of-contents.title')}
      >
        <List
          className={cn(styles['tedi-table-of-contents__list'], {
            [styles['tedi-table-of-contents__list--headless']]: !heading,
          })}
        >
          {nodes.map((node, index) => (
            <TableOfContentsRow key={node.id ?? index} node={node} depth={1} index={index} />
          ))}
        </List>
      </nav>
    </>
  );
};

TableOfContentsList.displayName = 'TableOfContentsList';
