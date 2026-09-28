import cn from 'classnames';
import { Children, createContext, isValidElement, type ReactElement, type ReactNode, useMemo } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
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

export type TableOfContentsHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TableOfContentsBreakpointProps = {
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
   * Stick the card to the viewport while scrolling.
   * @default true
   */
  sticky?: boolean;
};

export interface TableOfContentsProps extends BreakpointSupport<TableOfContentsBreakpointProps> {
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
   * Configurable semantic heading level (`h1`–`h6`); the visual style stays H4 regardless. Set it
   * to match the surrounding page's heading outline and avoid skipped heading levels (WCAG 1.3.1).
   * Ignored when the list is headless.
   * @default h3
   */
  headingLevel?: TableOfContentsHeadingLevel;
  /**
   * Override the navigation landmark's accessible name. When empty, the `<nav>` falls back to the
   * heading (via `aria-labelledby`), or the localised title when headless. Use it to disambiguate
   * multiple tables of contents on the same page.
   */
  ariaLabel?: string;
  /**
   * Id of the currently active item. The active item gets the left accent bar
   * and active link colour. When `defaultOpen` is `false`, the branch leading
   * to it is the only one kept expanded.
   */
  activeId?: string;
  /**
   * Draws a divider between items so the list reads as a set of separated rows. The last item has no
   * divider — the card border closes the list.
   * @default false
   */
  bordered?: boolean;
  /**
   * Whether every item's sub-items are expanded by default. Set `false` to make the list behave like
   * an accordion: only the branch leading to `activeId` keeps its nested children visible.
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * Render the list as an ordered list with auto-generated hierarchical numbers
   * (`1.`, `2.`, `2.1`, …) shown before each item.
   * @default false
   */
  numbered?: boolean;
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
  separator?: boolean;
  slot?: ReactNode;
}

interface TableOfContentsContextValue {
  activeId?: string;
  numbered?: boolean;
  headingLevel?: TableOfContentsHeadingLevel;
  ariaLabel?: string;
  activeTrail: Set<string>;
  defaultOpen?: boolean;
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
      const { id, separator, slot, children: itemChildren } = element.props;
      const childArray = Children.toArray(itemChildren);
      const subItems = childArray.filter(isItemElement);
      const content = childArray.filter((child) => !isItemElement(child));
      return {
        id,
        separator,
        slot,
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
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    heading,
    headingLevel = 'h3',
    ariaLabel,
    activeId,
    defaultOpen = true,
    numbered = false,
    sticky = true,
    variant = 'default',
    bordered = false,
    className,
  } = getCurrentBreakpointProps<TableOfContentsProps>(props);

  const resolvedHeading = heading === undefined ? getLabel('table-of-contents.title') : heading;

  const nodes = useMemo(() => childrenToNodes(children), [children]);
  const activeTrail = useMemo(() => buildActiveTrail(nodes, activeId), [nodes, activeId]);

  const contextValue = useMemo<TableOfContentsContextValue>(
    () => ({ activeId, numbered, headingLevel, ariaLabel, activeTrail, defaultOpen }),
    [activeId, numbered, headingLevel, ariaLabel, activeTrail, defaultOpen]
  );

  const list = (
    <div
      className={cn(styles['tedi-table-of-contents'], {
        [styles['tedi-table-of-contents--transparent']]: variant === 'transparent',
        [styles['tedi-table-of-contents--bordered']]: bordered,
      })}
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
