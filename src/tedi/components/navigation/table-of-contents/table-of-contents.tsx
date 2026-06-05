import cn from 'classnames';
import { Children, createContext, isValidElement, type ReactElement, type ReactNode, useMemo } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Card, CardContent } from '../../cards/card';
import { Affix } from '../../misc/affix/affix';
import styles from './table-of-contents.module.scss';
import { TableOfContentsItem, type TableOfContentsItemProps } from './table-of-contents-item';
import { TableOfContentsList } from './table-of-contents-list';

export interface TableOfContentsProps {
  /**
   * `TableOfContents.Item` elements. An item's non-`Item` children are its
   * link / label; nested `TableOfContents.Item` children become its sub-items.
   */
  children: ReactNode;
  /**
   * Heading rendered above the list.
   */
  heading?: string;
  /**
   * Id of the currently active item. The active item gets the left accent bar
   * and active link colour; the branch leading to it auto-expands its nested
   * children.
   */
  activeId?: string;
  /**
   * Show a validation glyph before each item (multistep-form usage). Each state uses a distinct
   * icon shape (not colour alone) with a localised text alternative: a check for `isValid === true`,
   * an empty circle for `undefined` (not completed), and a warning for `isValid === false`.
   * @default false
   */
  showIcons?: boolean;
  /**
   * Render the list as an ordered list with auto-generated hierarchical numbers
   * (`1.`, `2.`, `2.1`, …) shown before each item.
   * @default false
   */
  numbered?: boolean;
  /**
   * Stick the card to the viewport while scrolling.
   * @default true
   */
  sticky?: boolean;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}

/** Internal data shape derived from the `TableOfContents.Item` element tree. */
export interface TableOfContentsNode {
  id?: string;
  content: ReactNode;
  children?: TableOfContentsNode[];
  isValid?: boolean;
  separator?: boolean;
  hideIcon?: boolean;
}

interface TableOfContentsContextValue {
  activeId?: string;
  showIcons?: boolean;
  numbered?: boolean;
  activeTrail: Set<string>;
}

export const TableOfContentsContext = createContext<TableOfContentsContextValue>({
  activeTrail: new Set<string>(),
});

const isItemElement = (child: ReactNode): child is ReactElement<TableOfContentsItemProps> =>
  isValidElement(child) && child.type === TableOfContentsItem;

const childrenToNodes = (children: ReactNode): TableOfContentsNode[] =>
  Children.toArray(children)
    .filter(isItemElement)
    .map((element) => {
      const { id, isValid, separator, hideIcon, children: itemChildren } = element.props;
      const childArray = Children.toArray(itemChildren);
      const subItems = childArray.filter(isItemElement);
      const content = childArray.filter((child) => !isItemElement(child));
      return {
        id,
        isValid,
        separator,
        hideIcon,
        content: <>{content}</>,
        children: subItems.length ? childrenToNodes(itemChildren) : undefined,
      };
    });

const buildActiveTrail = (nodes: TableOfContentsNode[], activeId?: string): Set<string> => {
  const trail = new Set<string>();
  if (!activeId) return trail;

  const walk = (items: TableOfContentsNode[], ancestors: string[]): boolean => {
    for (const node of items) {
      const path = node.id ? [...ancestors, node.id] : ancestors;
      if (node.id === activeId || (node.children && walk(node.children, path))) {
        path.forEach((id) => trail.add(id));
        return true;
      }
    }
    return false;
  };

  walk(nodes, []);
  return trail;
};

/**
 * Navigational table of contents for long pages or multistep forms. Compose it
 * from `TableOfContents.Item` children; nest items by placing `Item`s inside an
 * `Item`. Mark the current section with `activeId` for the active accent bar, or
 * pass `showIcons` with per-item `isValid` for multistep-form progress.
 *
 * When linking to in-page sections, use the same `id` on the section element and
 * the item's anchor, and set `tabIndex={-1}` on the section so focus moves
 * correctly in screen readers.
 *
 * Note: a responsive mobile variant will be added once a TEDI-Ready `Accordion`
 * exists; for now the card renders at every breakpoint.
 */
const TableOfContentsComponent = (props: TableOfContentsProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    children,
    heading = getLabel('table-of-contents.title'),
    activeId,
    showIcons = false,
    numbered = false,
    sticky = true,
    className,
  } = props;

  const nodes = useMemo(() => childrenToNodes(children), [children]);
  const activeTrail = useMemo(() => buildActiveTrail(nodes, activeId), [nodes, activeId]);

  const contextValue = useMemo<TableOfContentsContextValue>(
    () => ({ activeId, showIcons, numbered, activeTrail }),
    [activeId, showIcons, numbered, activeTrail]
  );

  const card = (
    <Card className={cn(sticky && styles['tedi-table-of-contents--sticky'], className)}>
      <CardContent padding={0}>
        <TableOfContentsList nodes={nodes} heading={heading} />
      </CardContent>
    </Card>
  );

  return (
    <TableOfContentsContext.Provider value={contextValue}>
      {sticky ? (
        <Affix position="sticky" top={1.5} bottom={1.5}>
          {card}
        </Affix>
      ) : (
        card
      )}
    </TableOfContentsContext.Provider>
  );
};

TableOfContentsComponent.displayName = 'TableOfContents';

export const TableOfContents = Object.assign(TableOfContentsComponent, {
  Item: TableOfContentsItem,
});

export default TableOfContents;
