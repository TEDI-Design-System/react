import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { VerticalSpacingItem, VerticalSpacingItemProps } from '../../layout/vertical-spacing';
import styles from './list.module.scss';

type ListItemBreakpointProps = {
  /**
   * Props for controlling vertical spacing between list items. If provided,
   * the List will be wrapped inside a VerticalSpacing component.
   */
  verticalSpacingItem?: Omit<VerticalSpacingItemProps, 'element' | 'children'>;
};

export interface ListItemProps
  extends BreakpointSupport<ListItemBreakpointProps>,
    // Forward native `<li>` attributes — notably `value` to override a single
    // item's number in an ordered list, plus `id` / `aria-*`. `style` is omitted
    // for parity with `List`.
    Omit<React.LiHTMLAttributes<HTMLLIElement>, 'style' | 'children'> {
  /**
   * List children should be ListItem components
   */
  children: React.ReactNode;
  /**
   * Adds a custom CSS class to the ListItem element for additional styling or theming purposes
   */
  className?: string;
}

export const ListItem = (props: ListItemProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { children, verticalSpacingItem, className, ...rest } = getCurrentBreakpointProps<ListItemProps>(props);
  const listItemBEM = cn(styles['tedi-list__item'], verticalSpacingItem?.className, className);

  // In an ordered list the number is a CSS counter, so `value` (override this
  // item's number) only shows if we set the counter. Use `counter-set`, not
  // `counter-reset` — reset would open a *new* nested counter scope, which
  // `counters(item, '.')` then renders as e.g. "6.10". We also switch off this
  // item's own increment so the value is exact regardless of the set/increment
  // order; following items continue from it. (`counter-set` needs Safari 17.2+;
  // older browsers fall back to normal numbering.)
  const itemStyle =
    typeof rest.value === 'number' ? { counterIncrement: 'none', counterSet: `item ${rest.value}` } : undefined;

  if (props.verticalSpacingItem) {
    // `VerticalSpacingItem` merges the counter override with its own spacing style.
    return (
      <VerticalSpacingItem {...verticalSpacingItem} {...rest} element="li" className={listItemBEM} style={itemStyle}>
        {children}
      </VerticalSpacingItem>
    );
  }

  return (
    <li className={listItemBEM} {...rest} style={itemStyle}>
      {children}
    </li>
  );
};

export default ListItem;
