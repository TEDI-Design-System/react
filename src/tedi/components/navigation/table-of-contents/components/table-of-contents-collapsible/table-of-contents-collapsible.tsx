import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Text } from '../../../../base/typography/text/text';
import { CollapseButton } from '../../../../buttons/collapse-button/collapse-button';
import { Sheet } from '../../../../overlays/sheet/sheet';
import {
  buildActiveTrail,
  childrenToNodes,
  TableOfContentsContext,
  type TableOfContentsProps,
} from '../../table-of-contents';
import styles from '../../table-of-contents.module.scss';
import { TableOfContentsList } from '../table-of-contents-list/table-of-contents-list';

export interface TableOfContentsCollapsibleProps
  extends Pick<TableOfContentsProps, 'children' | 'heading' | 'ariaLabel' | 'activeId' | 'numbered' | 'className'> {
  /**
   * Pin the bar to the bottom of the viewport. Set `false` to render it inline.
   * @default true
   */
  sticky?: boolean;
  /**
   * Mobile-only behaviour of this `TableOfContents.Collapsible` bar — there is no desktop equivalent.
   * When the bar is pinned (`sticky`), auto-hide it while the page scrolls down and reveal it again on
   * scroll up, so it stays out of the way while reading but is one gesture away. No effect when
   * `sticky` is `false`.
   * @default false
   */
  hideOnScroll?: boolean;
}

/**
 * Mobile variant of `TableOfContents`: a bottom bar that opens the list in a bottom-sheet overlay.
 * Same `TableOfContents.Item` children as the desktop card; render it on small viewports.
 */
export const TableOfContentsCollapsible = (props: TableOfContentsCollapsibleProps): JSX.Element => {
  const {
    children,
    heading,
    ariaLabel,
    activeId,
    numbered = false,
    sticky = true,
    hideOnScroll = false,
    className,
  } = props;
  const { getLabel } = useLabels();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [listElement, setListElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hideOnScroll || !sticky) {
      setHidden(false);
      return undefined;
    }

    let lastY = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastY;
        if (Math.abs(delta) > 4) {
          setHidden(delta > 0 && y > 0);
          lastY = y;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [hideOnScroll, sticky]);

  useEffect(() => {
    if (!open || !listElement) return undefined;

    const handleNavigate = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('a, button')) setOpen(false);
    };

    listElement.addEventListener('click', handleNavigate);
    return () => listElement.removeEventListener('click', handleNavigate);
  }, [open, listElement]);

  const resolvedHeading = heading === undefined ? getLabel('table-of-contents.title') : heading;
  const title = resolvedHeading ?? getLabel('table-of-contents.title');
  const navLabel = ariaLabel || title;

  const nodes = useMemo(() => childrenToNodes(children), [children]);
  const activeTrail = useMemo(() => buildActiveTrail(nodes, activeId), [nodes, activeId]);
  const contextValue = useMemo(
    () => ({ activeId, numbered, ariaLabel: navLabel, activeTrail, defaultOpen: true }),
    [activeId, numbered, navLabel, activeTrail]
  );

  return (
    <TableOfContentsContext.Provider value={contextValue}>
      <div
        className={cn(
          styles['tedi-table-of-contents__bar'],
          {
            [styles['tedi-table-of-contents__bar--static']]: !sticky,
            [styles['tedi-table-of-contents__bar--hidden']]: hidden && !open,
          },
          className
        )}
      >
        <Text modifiers="bold" className={styles['tedi-table-of-contents__bar-title']}>
          {title}
        </Text>
        <CollapseButton open={open} onOpenChange={setOpen} underline={false} aria-haspopup="dialog" />
      </div>

      <Sheet
        open={open}
        onToggle={setOpen}
        ariaLabel={title}
        className={styles['tedi-table-of-contents__sheet']}
        header={
          <div className={styles['tedi-table-of-contents__sheet-header']}>
            <Text modifiers="bold" className={styles['tedi-table-of-contents__bar-title']}>
              {title}
            </Text>
            <CollapseButton open={open} onOpenChange={setOpen} underline={false} />
          </div>
        }
      >
        <div ref={setListElement} className={styles['tedi-table-of-contents']}>
          <TableOfContentsList nodes={nodes} heading={null} />
        </div>
      </Sheet>
    </TableOfContentsContext.Provider>
  );
};

TableOfContentsCollapsible.displayName = 'TableOfContentsCollapsible';

export default TableOfContentsCollapsible;
