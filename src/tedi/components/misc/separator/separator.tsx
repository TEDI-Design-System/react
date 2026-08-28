import cn from 'classnames';
import { CSSProperties } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import styles from './separator.module.scss';

export type SeparatorVariant = 'dotted' | 'dot-only';
export type DotSize = 'large' | 'medium' | 'small' | 'extra-small';
export type DotStyle = 'filled' | 'outlined';
export type DotPosition = 'start' | 'center' | 'end' | number;

/**
 * Margin/padding-like spacing around the separator
 * - number → uniform spacing on main axis
 * - object → fine-grained control (top/bottom/left/right)
 */
export type SeparatorSpacing =
  | number
  | {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };

export interface SeparatorSharedProps {
  /**
   * Additional class names
   */
  className?: string;
  /**
   * HTML element to render — most common are 'hr', 'div', 'span'
   */
  element?: 'hr' | 'div' | 'span';
  /**
   * When true, the separator stretches to fill available space (100%)
   */
  isStretched?: boolean;
  /**
   * Semantic color token
   * @default primary
   */
  color?: 'primary' | 'secondary' | 'accent';
  /**
   * Visual style — line with dots vs standalone centered dot(s)
   */
  variant?: SeparatorVariant;
  /**
   * Line thickness in pixels (1 or 2) — affects outlined & solid lines
   */
  thickness?: 1 | 2;
  /**
   * Spacing (margin) around the separator
   * @example
   * spacing={16}        // 16px top & bottom (horizontal) or left & right (vertical)
   * spacing={{ top: 24, bottom: 8 }}
   */
  spacing?: SeparatorSpacing;
}
export interface SeparatorVerticalProps extends SeparatorSharedProps {
  /**
   * Must be set to 'vertical'
   */
  axis: 'vertical';
  /**
   * Height of the vertical separator in rem units
   */
  height?: number;
  /**
   * CSS display value — usually 'block' or 'inline-block'
   */
  display?: 'block' | 'inline' | 'inline-block';
}
export interface SeparatorHorizontalProps extends SeparatorSharedProps {
  /**
   * Must be set to 'horizontal' or left undefined (defaults to horizontal)
   */
  axis?: 'horizontal';
  /**
  Vertical height is not used in horizontal mode
  */
  height?: undefined;
  /**
   * Display is forced to 'block' in horizontal mode
   */
  display?: 'block';
}

type DottedSeparatorProps = {
  variant?: 'dotted';
  dotSize?: DotSize;
  dotStyle?: DotStyle;
  /**
   * Position of the single dot
   * @example
   * 'center' | 'start' | 'end' | 2.5  // 2.5rem from start
   */
  dotPosition?: DotPosition;
};

type DotOnlySeparatorProps = {
  variant: 'dot-only';
  dotSize: DotSize;
  dotStyle?: DotStyle;
  dotPosition?: never;
};

export type SeparatorBreakpointProps = {
  spacing?: SeparatorSpacing;
  height?: number;
  axis?: 'horizontal' | 'vertical';
};

export type SeparatorProps = BreakpointSupport<
  | (SeparatorHorizontalProps & (DottedSeparatorProps | DotOnlySeparatorProps))
  | (SeparatorVerticalProps & (DottedSeparatorProps | DotOnlySeparatorProps))
> &
  SeparatorBreakpointProps;

export const Separator = (props: SeparatorProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);

  const {
    className,
    element: Element = 'div',
    isStretched,
    spacing,
    axis = 'horizontal',
    color = 'primary',
    variant,
    thickness = 1,
    height,
    dotSize = 'large',
    dotStyle = 'filled',
    dotPosition,
    display = 'block',
    ...rest
  } = getCurrentBreakpointProps<SeparatorProps>(props);

  const isNumericDotPosition = typeof dotPosition === 'number';
  const resolvedDotPosition = variant !== 'dot-only' && !isNumericDotPosition ? dotPosition : undefined;

  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;

  if (typeof spacing === 'number') {
    if (axis === 'horizontal') {
      top = bottom = spacing;
    } else {
      left = right = spacing;
    }
  }

  if (typeof spacing === 'object' && spacing !== null) {
    top = spacing.top ?? top;
    bottom = spacing.bottom ?? bottom;
    left = spacing.left ?? left;
    right = spacing.right ?? right;
  }

  const SeparatorBEM = cn(
    styles['tedi-separator'],
    className,
    styles[`tedi-separator--${axis}`],
    styles[`tedi-separator--${color}`],
    {
      [styles[`tedi-separator--${variant}`]]: variant,
      [styles[`tedi-separator--${display}`]]: display,
      [styles[`tedi-separator--dotted-${dotSize}`]]: variant === 'dotted',
      [styles[`tedi-separator--dot-only-${dotSize}`]]: variant === 'dot-only',
      [styles[`tedi-separator--dot-style-${dotStyle}`]]: variant,
      [styles[`tedi-separator--dot-position-${resolvedDotPosition}`]]:
        typeof resolvedDotPosition === 'string' && variant !== 'dot-only',
      [styles['tedi-separator--dot-position-custom']]: isNumericDotPosition,
      [styles['tedi-separator--is-stretched']]: isStretched,
      [styles[`tedi-separator--thickness-${thickness}`]]: thickness || dotStyle === 'outlined' ? thickness : undefined,
    }
  );

  const cssVars: CSSProperties = {
    '--separator-margin-top': `${top}rem`,
    '--separator-margin-bottom': `${bottom}rem`,
    '--separator-margin-left': `${left}rem`,
    '--separator-margin-right': `${right}rem`,
  } as CSSProperties;

  if (height) {
    cssVars['--vertical-separator-height'] = `${height}rem`;
  }

  if (thickness) {
    cssVars['--separator-thickness'] = `${thickness}px`;
  }

  if (variant === 'dotted' && isNumericDotPosition) {
    cssVars['--separator-dot-position'] = `${dotPosition}rem`;
  }

  return <Element data-name="separator" {...rest} style={cssVars} className={SeparatorBEM} />;
};

export default Separator;
