import cn from 'classnames';
import { Children } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { IconColor } from '../../base/icon/icon';
import { VerticalSpacing, VerticalSpacingProps } from '../../layout/vertical-spacing';
import styles from './list.module.scss';
import ListItem, { ListItemProps } from './list-item';

type ListElement = 'ul' | 'ol';

export type BulletColor = IconColor;

type ListBreakpointProps = {
  /**
   * Props for controlling vertical spacing between list items. If provided,
   * the List will be wrapped inside a VerticalSpacing component.
   */
  verticalSpacing?: Omit<VerticalSpacingProps, 'element' | 'children'>;
  /**
   * Determines whether the list should have default styling (with bullets or numbers).
   * @default 'none'
   */
  style?: 'styled' | 'none';
};

export interface ListProps
  extends BreakpointSupport<ListBreakpointProps>,
    // Forward native list attributes to the rendered element — notably `start`,
    // `reversed` and `type` for ordered lists, plus `id` / `aria-*`. `style` is
    // omitted because this component repurposes it for the styling variant.
    Omit<React.OlHTMLAttributes<HTMLOListElement>, 'style' | 'children'> {
  /**
   * List children should be ListItem components
   */
  children: React.ReactElement<ListItemProps> | React.ReactElement<ListItemProps>[] | React.ReactNode;
  /**
   * The HTML element to use for rendering the list.
   * Can either be 'ul' for an unordered list or 'ol' for an ordered list.
   * @default 'ul'
   */
  element?: ListElement;
  /**
   * Adds a custom CSS class to the List element for additional styling or theming purposes
   */
  className?: string;
  /**
   * This prop is used to set the color of the bullet points in the list.
   * Uses same color values as TEDI Icon
   * @default brand
   */
  color?: BulletColor;
}

export const List = (props: ListProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    element = 'ul',
    style = 'none',
    verticalSpacing,
    className,
    color = 'brand',
    ...rest
  } = getCurrentBreakpointProps<ListProps>(props);
  const isReversedOrdered = element === 'ol' && rest.reversed === true;
  const listBEM = cn(
    styles['tedi-list'],
    styles[`tedi-list--${element === 'ul' ? 'unordered' : 'ordered'}`],
    styles[`tedi-list--style-${style}`],
    styles[`tedi-list--bullet-color-${color}`],
    isReversedOrdered && styles['tedi-list--reversed'],
    verticalSpacing?.className,
    className
  );
  const Element = element;

  // The visible numbers come from a CSS counter, not the native `<ol>` marker, so
  // `start` / `reversed` only take effect if we seed that counter (the native
  // attributes are still forwarded for correct semantics / copy-paste / non-CSS
  // fallback). `counter-reset` is processed before `counter-increment`.
  const orderedListStyle = (() => {
    if (element !== 'ol') return undefined;
    if (isReversedOrdered) {
      const first = typeof rest.start === 'number' ? rest.start : Children.count(children);
      return { counterReset: `item ${first + 1}` };
    }

    return typeof rest.start === 'number' ? { counterReset: `item ${rest.start - 1}` } : undefined;
  })();

  if (verticalSpacing) {
    // `VerticalSpacing` merges the counter seed with its own spacing style.
    return (
      <VerticalSpacing {...verticalSpacing} {...rest} element={element} className={listBEM} style={orderedListStyle}>
        {children}
      </VerticalSpacing>
    );
  }

  return (
    <Element className={listBEM} {...rest} style={orderedListStyle}>
      {children}
    </Element>
  );
};

List.Item = ListItem;
export default List;
