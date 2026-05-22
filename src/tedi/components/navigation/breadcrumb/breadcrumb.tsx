import cn from 'classnames';
import React, { Children, cloneElement, Fragment, isValidElement, ReactElement, ReactNode } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import Button from '../../buttons/button/button';
import { Dropdown } from '../../overlays/dropdown';
import styles from './breadcrumb.module.scss';

const flattenCrumbs = (children: ReactNode): ReactElement[] => {
  const result: ReactElement[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Fragment) {
      result.push(...flattenCrumbs((child.props as { children?: ReactNode }).children));
      return;
    }
    result.push(child);
  });
  return result;
};

type BreadcrumbBreakpointProps = {
  /**
   * - `'long'` — full trail of crumbs separated by chevrons.
   * - `'short'` — only the second-to-last child rendered as a back-link with
   *   a left-pointing arrow. Useful on narrow viewports. Renders nothing when
   *   fewer than two crumbs are supplied.
   * @default long
   */
  variant?: 'long' | 'short';
  /**
   * Maximum number of crumbs to render before collapsing the middle into an
   * ellipsis button. Clicking the button opens a dropdown listing the hidden
   * crumbs. Only applies in the `'long'` variant. When omitted, all crumbs are
   * rendered.
   */
  maxItems?: number;
  /**
   * Number of crumbs to keep visible at the start of the trail when collapsed.
   * @default 1
   */
  itemsBeforeCollapse?: number;
  /**
   * Number of crumbs to keep visible at the end of the trail when collapsed.
   * The current page (last crumb) should normally stay visible — keep this ≥ 1.
   * @default 1
   */
  itemsAfterCollapse?: number;
};

export interface BreadcrumbProps extends BreakpointSupport<BreadcrumbBreakpointProps> {
  /**
   * Crumbs in order from the root page to the current page. Each child becomes
   * one crumb; chevron separators are inserted between them. Use a `Link` (or
   * any anchor) for navigable crumbs and a plain element (e.g. `<span>`) for
   * the current page — add `aria-current="page"` to it yourself.
   */
  children: React.ReactNode;
  /**
   * Accessible label for the wrapping `<nav>` landmark. Falls back to the
   * `breadcrumbs` entry from `LabelProvider`.
   */
  ariaLabel?: string;
  /**
   * Accessible label for the ellipsis button that opens the collapsed-crumbs
   * dropdown. Only used when `maxItems` causes a collapse. Falls back to the
   * `breadcrumbs.show-more` entry from `LabelProvider`.
   */
  showMoreLabel?: string;
  /**
   * Node rendered between crumbs. Pass a string (e.g. `'/'`, `'›'`) for text
   * separators or any React node for custom markup. Hidden from assistive
   * technology — screen readers announce only the crumbs themselves.
   * @default <Icon name="chevron_right" size={16} color="brand" />
   */
  separator?: ReactNode;
  /**
   * Additional class name applied to the `<nav>` element.
   */
  className?: string;
}

type RenderToken = { kind: 'item'; element: ReactElement } | { kind: 'ellipsis'; hidden: ReactElement[] };

const defaultSeparator = <Icon name="chevron_right" size={16} color="brand" />;

export const Breadcrumb = (props: BreadcrumbProps): JSX.Element | null => {
  const { children, ariaLabel, showMoreLabel, separator = defaultSeparator, className } = props;
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    variant = 'long',
    maxItems,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
  } = getCurrentBreakpointProps<BreadcrumbBreakpointProps>(props);
  const { getLabel } = useLabels();
  const navLabel = ariaLabel ?? getLabel('breadcrumbs');
  const showMoreText = showMoreLabel ?? getLabel('breadcrumbs.show-more');

  const crumbs = flattenCrumbs(children);
  if (crumbs.length === 0) return null;

  if (variant === 'short') {
    if (crumbs.length < 2) return null;
    const parent = crumbs[crumbs.length - 2];
    const parentProps = parent.props as { iconLeft?: unknown };
    const withIcon = parentProps.iconLeft === undefined ? cloneElement(parent, { iconLeft: 'arrow_back' }) : parent;
    return (
      <nav aria-label={navLabel} className={cn(styles['tedi-breadcrumb'], className)}>
        {withIcon}
      </nav>
    );
  }

  const shouldCollapse =
    maxItems !== undefined && crumbs.length > maxItems && crumbs.length > itemsBeforeCollapse + itemsAfterCollapse;

  const tokens: RenderToken[] = shouldCollapse
    ? [
        ...crumbs.slice(0, itemsBeforeCollapse).map((element) => ({ kind: 'item' as const, element })),
        { kind: 'ellipsis' as const, hidden: crumbs.slice(itemsBeforeCollapse, crumbs.length - itemsAfterCollapse) },
        ...crumbs.slice(crumbs.length - itemsAfterCollapse).map((element) => ({ kind: 'item' as const, element })),
      ]
    : crumbs.map((element) => ({ kind: 'item' as const, element }));

  const lastIndex = tokens.length - 1;

  return (
    <nav aria-label={navLabel} className={cn(styles['tedi-breadcrumb'], className)}>
      <ol className={styles['tedi-breadcrumb__list']}>
        {tokens.map((token, index) => (
          <Fragment key={index}>
            {token.kind === 'item' ? (
              <li
                className={cn(styles['tedi-breadcrumb__item'], {
                  [styles['tedi-breadcrumb__current']]: index === lastIndex,
                })}
              >
                {token.element}
              </li>
            ) : (
              <li className={styles['tedi-breadcrumb__item']}>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button visualType="link" size="small" icon="more_horiz">
                      <span className="sr-only">{showMoreText}</span>
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {token.hidden.map((hiddenCrumb, hiddenIndex) => (
                      <Dropdown.Item key={hiddenCrumb.key ?? hiddenIndex} index={hiddenIndex} asChild>
                        {hiddenCrumb}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </li>
            )}
            {index < lastIndex && (
              <li className={styles['tedi-breadcrumb__separator']} aria-hidden="true">
                {separator}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
