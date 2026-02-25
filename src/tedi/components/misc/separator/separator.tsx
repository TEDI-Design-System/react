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
   * @default 'primary'
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

  let top: number | undefined;
  let bottom: number | undefined;
  let left: number | undefined;
  let right: number | undefined;

  if (typeof spacing === 'number') {
    if (axis === 'horizontal') {
      top = bottom = spacing;
      left = right = 0;
    } else {
      left = right = spacing;
      top = bottom = 0;
    }
  } else if (typeof spacing === 'object' && spacing !== null) {
    top = spacing.top ?? (axis === 'horizontal' ? spacing.top ?? spacing.bottom ?? 0 : 0);
    bottom = spacing.bottom ?? (axis === 'horizontal' ? spacing.top ?? spacing.bottom ?? 0 : 0);
    left = spacing.left ?? (axis === 'vertical' ? spacing.left ?? spacing.right ?? 0 : 0);
    right = spacing.right ?? (axis === 'vertical' ? spacing.left ?? spacing.right ?? 0 : 0);
  }

  const SeparatorBEM = cn(
    styles['tedi-separator'],
    className,
    { [styles[`tedi-separator--${color}`]]: color },
    { [styles[`tedi-separator--${axis}`]]: axis },
    { [styles[`tedi-separator--${variant}`]]: variant },
    { [styles[`tedi-separator--${display}`]]: display },
    { [styles[`tedi-separator--${variant}-${dotSize}`]]: variant === 'dot-only' && dotSize },
    { [styles[`tedi-separator--dot-style-${dotStyle}`]]: variant && dotStyle },
    { [styles[`tedi-separator--dotted-${dotSize}`]]: variant === 'dotted' && dotSize },
    { [styles[`tedi-separator--dot-position-${resolvedDotPosition}`]]: resolvedDotPosition && variant !== 'dot-only' },
    { [styles['tedi-separator--dot-position-custom']]: isNumericDotPosition },
    {
      [styles[`tedi-separator--thickness-${thickness}`]]: thickness || dotStyle === 'outlined' ? thickness : undefined,
    },
    { [styles['tedi-separator--is-stretched']]: isStretched },
    { [styles[`tedi-separator--top-${top}`.replace('.', '-')]]: top },
    { [styles[`tedi-separator--bottom-${bottom}`.replace('.', '-')]]: bottom },
    { [styles[`tedi-separator--left-${left}`.replace('.', '-')]]: left },
    { [styles[`tedi-separator--right-${right}`.replace('.', '-')]]: right }
  );

  const getCssVars = () => {
    const cssvars: CSSProperties = {};
    if (height) cssvars['--vertical-separator-height'] = `${height}rem`;

    if (thickness) {
      cssvars['--separator-thickness'] = `${thickness}px`;
    }

    if (variant === 'dotted' && isNumericDotPosition) {
      cssvars['--separator-dot-position'] = `${dotPosition}rem`;
    }

    return cssvars;
  };

  return <Element data-name="separator" {...rest} style={getCssVars()} className={SeparatorBEM} />;
};

export default Separator;
