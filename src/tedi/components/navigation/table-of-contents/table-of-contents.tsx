import cn from 'classnames';
import {
  Children,
  createContext,
  type CSSProperties,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useMemo,
} from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Card, CardContent } from '../../content/card';
import { Affix } from '../../misc/affix/affix';
import { TableOfContentsCollapsible } from './components/table-of-contents-collapsible/table-of-contents-collapsible';
import {
  TableOfContentsItem,
  type TableOfContentsItemProps,
} from './components/table-of-contents-item/table-of-contents-item';
import { TableOfContentsList } from './components/table-of-contents-list/table-of-contents-list';
import styles from './table-of-contents.module.scss';

export interface TableOfContentsProps {
  /**
   * `TableOfContents.Item` elements. An item's non-`Item` children are its
   * link / label; nested `TableOfContents.Item` children become its sub-items.
   */
  children: ReactNode;
  /**
   * Heading rendered above the list. Defaults to the localised "Table of
   * contents" label; pass `null` to render it headless (no visible heading —
   * the navigation keeps an accessible name via `aria-label`).
   */
  heading?: string | null;
  /**
   * Visual variant:
   * - `default` — rendered inside a bordered `Card`.
   * - `transparent` — no card chrome (border / background); the list sits
   *   directly on the page, with a continuous grey left rail (the active item's
   *   segment turns blue).
   * @default default
   */
  variant?: 'default' | 'transparent';
  /**
   * Inner padding of the container, in rem — the spacing between the card edge and the
   * heading / items. Defaults to the card's medium padding token.
   */
  padding?: number;
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

export const childrenToNodes = (children: ReactNode): TableOfContentsNode[] =>
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

export const buildActiveTrail = (nodes: TableOfContentsNode[], activeId?: string): Set<string> => {
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

export function TableOfContents(props: TableOfContentsProps): JSX.Element {
  const { getLabel } = useLabels();
  const {
    children,
    heading,
    activeId,
    showIcons = false,
    numbered = false,
    sticky = true,
    variant = 'default',
    padding,
    className,
  } = props;

  const resolvedHeading = heading === undefined ? getLabel('table-of-contents.title') : heading;

  const nodes = useMemo(() => childrenToNodes(children), [children]);
  const activeTrail = useMemo(() => buildActiveTrail(nodes, activeId), [nodes, activeId]);

  const contextValue = useMemo<TableOfContentsContextValue>(
    () => ({ activeId, showIcons, numbered, activeTrail }),
    [activeId, showIcons, numbered, activeTrail]
  );

  const rootStyle =
    padding !== undefined ? ({ '--tedi-table-of-contents-padding': `${padding}rem` } as CSSProperties) : undefined;

  const list = (
    <div
      className={cn(styles['tedi-table-of-contents'], {
        [styles['tedi-table-of-contents--transparent']]: variant === 'transparent',
      })}
      style={rootStyle}
    >
      <TableOfContentsList nodes={nodes} heading={resolvedHeading} />
    </div>
  );

  const surfaceClassName = cn({ [styles['tedi-table-of-contents--sticky']]: sticky }, className);

  const surface =
    variant === 'transparent' ? (
      <div className={surfaceClassName}>{list}</div>
    ) : (
      <Card className={surfaceClassName}>
        <CardContent padding={0}>{list}</CardContent>
      </Card>
    );

  return (
    <TableOfContentsContext.Provider value={contextValue}>
      {sticky ? (
        <Affix position="sticky" top={1.5} bottom={1.5}>
          {surface}
        </Affix>
      ) : (
        surface
      )}
    </TableOfContentsContext.Provider>
  );
}

TableOfContents.displayName = 'TableOfContents';
TableOfContents.Item = TableOfContentsItem;
TableOfContents.Collapsible = TableOfContentsCollapsible;

export default TableOfContents;
