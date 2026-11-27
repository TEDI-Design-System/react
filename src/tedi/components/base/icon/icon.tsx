import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './icon.module.scss';

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48;
export type IconType = 'outlined' | 'sharp' | 'rounded';
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'brand-dark'
  | 'success'
  | 'warning'
  | 'warning-dark'
  | 'danger'
  | 'white'
  | 'inherit';
export type IconBackgroundColor = 'primary' | 'secondary' | 'brand-primary' | 'brand-secondary';

export interface IconSharedProps {
  /**
   * Name of material icon
   * https://fonts.google.com/icons
   */
  name: string;
  /**
   * Additional classes to style the icon or its wrapper.
   * - If `backgroundColor` is provided, the `className` will be applied to the wrapper element.
   * - If `backgroundColor` is not provided, the `className` will be applied directly to the icon element.
   */
  className?: string;
  /**
   * Type of icon
   * It is recommended to only use one type throughout your app, and to load only that type's font
   * (`icons/<type>.css` with `index-without-icons.css`) instead of all three via `index.css`.
   * @default outlined
   */
  type?: IconType;
  /**
   * Size of the icon
   * @default 24
   */
  size?: IconSize;
  /**
   * Render a filled variant of the icon
   * @default false
   */
  filled?: boolean;
  /**
   * Which color Icon should be
   * Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI
   * @default primary
   */
  color?: IconColor;
  /**
   * Icons label for screen-readers.
   * If omitted then the icon is hidden for screen-readers.
   */
  label?: string;
}

export interface IconWithBackgroundProps extends IconSharedProps {
  /**
   * Add round background
   */
  backgroundColor: IconBackgroundColor;
  display?: 'block';
}

export interface IconWithoutBackgroundProps extends IconSharedProps {
  backgroundColor?: undefined;
  /**
   * Type of display
   * @default block
   */
  display?: 'block' | 'inline';
}

export type IconProps = IconSharedProps & (IconWithBackgroundProps | IconWithoutBackgroundProps);

export const Icon = forwardRef<HTMLDivElement, IconProps>((props: IconProps, ref): JSX.Element => {
  const {
    className,
    name,
    type = 'outlined',
    size = 24,
    filled,
    display = 'block',
    color = 'primary',
    backgroundColor,
    label,
    ...rest
  } = props;

  const wrapperBEM = cn(
    styles['tedi-icon__wrapper'],
    {
      [styles['tedi-icon__wrapper--bg']]: backgroundColor,
      [styles[`tedi-icon__wrapper--bg-${backgroundColor}`]]: backgroundColor,
      [styles[`tedi-icon__wrapper--size-${size}`]]: size,
      [styles['tedi-icon__wrapper--block']]: backgroundColor,
    },
    backgroundColor && className
  );

  const iconBEM = cn(
    'notranslate',
    'material-symbols',
    type && [`material-symbols--${type}`],
    styles['tedi-icon'],
    color && styles[`tedi-icon--color-${color}`],
    size && styles[`tedi-icon--size-${size}`],
    display && styles[`tedi-icon--${display}`],
    filled && styles['tedi-icon--filled'],
    !backgroundColor && className
  );

  const iconElement = (
    <span
      ref={!backgroundColor ? ref : null}
      className={iconBEM}
      data-name="icon"
      role="img"
      aria-label={label}
      aria-hidden={!label}
      {...rest}
    >
      {name}
    </span>
  );

  if (backgroundColor) {
    return (
      <div className={wrapperBEM} ref={ref}>
        {iconElement}
      </div>
    );
  }

  return iconElement;
});

Icon.displayName = 'Icon';
