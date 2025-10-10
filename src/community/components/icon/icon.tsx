import cn from 'classnames';
import React, { forwardRef } from 'react';

import { TextColor } from '../typography/text/text';
import styles from './icon.module.scss';

export type IconSize = 12 | 14 | 16 | 18 | 24 | 36 | 48;

export interface IconProps {
  /**
   * Name of material symbols icon.
   * https://fonts.google.com/icons?icon.set=Material+Symbols
   */
  name: string;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Type of icon.
   * It is recommended to only use one type throughout your app.
   * This ensures that only one icon font is downloaded.
   * @default outlined
   */
  type?: 'outlined' | 'rounded' | 'sharp';
  /**
   * Render a filled variant of the icon.
   * @default false
   */
  filled?: boolean;
  /**
   * Size of the icon.
   * @default 24
   */
  size?: IconSize;
  /**
   * Which color Icon should be.
   * Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI.
   * @default default
   */
  color?: TextColor;
  /**
   * Type of display. block by default.
   * @default block
   */
  display?: 'block' | 'inline';
  /**
   * Icons label for screen-readers.
   * If omitted then the icon is hidden for screen-readers.
   */
  label?: string;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>((props, ref): JSX.Element => {
  const {
    className,
    name,
    filled = false,
    label,
    type = 'outlined',
    size = 24,
    display = 'block',
    color,
    ...rest
  } = props;
  const iconBEM = cn(
    'notranslate', // Added to prevent Google Translate from translating the icon
    'material-symbols',
    styles['icon'],
    styles[`icon--${display}`],
    { [`material-symbols--${type}`]: type, [`text-${color}`]: color },
    className
  );

  const iconVariant = {
    ...(size ? { '--icon-internal-variation-size': `${size / 16}rem` } : {}),
    ...(filled ? { '--icon-internal-variation-fill': 1 } : {}),
  } as React.CSSProperties;

  return (
    <span
      data-name="icon"
      role="img"
      aria-hidden={!label}
      {...rest}
      className={iconBEM}
      style={iconVariant}
      ref={ref}
      aria-label={label}
    >
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';

export default Icon;
