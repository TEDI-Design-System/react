import cn from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Text } from '../../../../base/typography/text/text';
import { CollapseButton } from '../../../../buttons/collapse-button/collapse-button';
import { Modal } from '../../../../overlays/modal';
import {
  buildActiveTrail,
  childrenToNodes,
  TableOfContentsContext,
  type TableOfContentsProps,
} from '../../table-of-contents';
import styles from '../../table-of-contents.module.scss';
import { TableOfContentsList } from '../table-of-contents-list/table-of-contents-list';

export interface TableOfContentsCollapsibleProps
  extends Pick<TableOfContentsProps, 'children' | 'heading' | 'activeId' | 'showIcons' | 'numbered' | 'className'> {
  /**
   * Pin the bar to the bottom of the viewport. Set `false` to render it inline.
   * @default true
   */
  sticky?: boolean;
}

/**
 * Mobile variant of `TableOfContents`: a bottom bar that opens the list in a bottom-sheet overlay.
 * Same `TableOfContents.Item` children as the desktop card; render it on small viewports.
 */
export const TableOfContentsCollapsible = (props: TableOfContentsCollapsibleProps): JSX.Element => {
  const { children, heading, activeId, showIcons = false, numbered = false, sticky = true, className } = props;
  const { getLabel } = useLabels();
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = listRef.current;
    if (!open || !element) return undefined;

    const handleNavigate = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('a, button')) setOpen(false);
    };

    element.addEventListener('click', handleNavigate);
    return () => element.removeEventListener('click', handleNavigate);
  }, [open]);

  const nodes = useMemo(() => childrenToNodes(children), [children]);
  const activeTrail = useMemo(() => buildActiveTrail(nodes, activeId), [nodes, activeId]);
  const contextValue = useMemo(
    () => ({ activeId, showIcons, numbered, activeTrail }),
    [activeId, showIcons, numbered, activeTrail]
  );

  const resolvedHeading = heading === undefined ? getLabel('table-of-contents.title') : heading;
  const title = resolvedHeading ?? getLabel('table-of-contents.title');

  return (
    <TableOfContentsContext.Provider value={contextValue}>
      <div
        className={cn(
          styles['tedi-table-of-contents__bar'],
          { [styles['tedi-table-of-contents__bar--static']]: !sticky },
          className
        )}
      >
        <Text modifiers="bold" className={styles['tedi-table-of-contents__bar-title']}>
          {title}
        </Text>
        <CollapseButton
          open={open}
          onOpenChange={setOpen}
          openText={getLabel('open')}
          closeText={getLabel('close')}
          underline={false}
          aria-haspopup="dialog"
        />
      </div>

      <Modal open={open} onToggle={setOpen}>
        <Modal.Content
          position="bottom"
          fullscreen="edge"
          aria-label={title}
          className={styles['tedi-table-of-contents__sheet']}
        >
          <Modal.Header closeButton={false}>
            <div className={styles['tedi-table-of-contents__sheet-header']}>
              <Text modifiers="bold" className={styles['tedi-table-of-contents__bar-title']}>
                {title}
              </Text>
              <CollapseButton
                open={open}
                onOpenChange={setOpen}
                openText={getLabel('open')}
                closeText={getLabel('close')}
                underline={false}
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div ref={listRef} className={styles['tedi-table-of-contents']}>
              <TableOfContentsList nodes={nodes} heading={null} />
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </TableOfContentsContext.Provider>
  );
};

TableOfContentsCollapsible.displayName = 'TableOfContentsCollapsible';

export default TableOfContentsCollapsible;
