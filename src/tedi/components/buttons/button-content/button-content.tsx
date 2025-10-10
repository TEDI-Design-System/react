import cn from 'classnames';
import React, { forwardRef } from 'react';

import { AllowedHTMLTags, PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../helpers/polymorphic/types';
import { UnknownType } from '../../../types/commonTypes';
import { Icon, IconWithoutBackgroundProps } from '../../base/icon/icon';
import { Spinner } from '../../loaders/spinner/spinner';
import { Print } from '../../misc/print/print';
import { ButtonColor, ButtonType } from '../button/button';
import styles from './button-content.module.scss';

export type ButtonContentProps<
  C extends React.ElementType,
  P extends Record<string, UnknownType>,
  A
> = PolymorphicComponentPropWithRef<
  AllowedHTMLTags<C, A>,
  {
    /**
     * Button children
     */
    children: React.ReactNode;
    /**
     * Additional custom class name.
     */
    className?: string;
    /**
     * Button visual type
     * @default primary
     */
    visualType?: ButtonType;
    /**
     * If button should take all the space it has
     */
    fullWidth?: boolean;
    /**
     * Color schema for button. PS text-color works only with link type links.
     * @default default
     */
    color?: ButtonColor;
    /**
     * Button size
     */
    size?: 'default' | 'small' | 'large';
    /**
     * Name of the icon when button only has an icon in it.
     */
    icon?: string | IconWithoutBackgroundProps;
    /**
     * Name of the icon we want to show on the left.
     */
    iconLeft?: string | IconWithoutBackgroundProps;
    /**
     * Name of the icon we want to show on the right.
     */
    iconRight?: string | IconWithoutBackgroundProps;
    /**
     * Underline the button text
     */
    underline?: boolean;
    /**
     * If button is active and should keep its hover state.
     */
    isHovered?: boolean;
    /**
     * If button is active and should keep it's active state.
     */
    isActive?: boolean;
    /**
     * If button is in loading state and should show spinner.
     * When isLoading is true, button does not trigger onClick event.
     * @default false
     */
    isLoading?: boolean;
    /**
     * Skip applying button/link styles
     * Useful when you just want to use Button or Link logic without the styles
     * In this case icon, iconLeft and iconRight are ignored
     */
    noStyle?: boolean;
    /**
     *
     */
    renderWrapperElement?: unknown;
  } & P
>;

export type ButtonContentComponent = <C extends React.ElementType, P extends Record<string, UnknownType>, A>(
  props: ButtonContentProps<C, P, A>
) => React.ReactNode;

const InternalButtonContent = forwardRef(
  <C extends React.ElementType, P extends Record<string, UnknownType>, A>(
    {
      children,
      as,
      text,
      className,
      visualType = 'primary',
      color = 'default',
      size,
      icon,
      iconLeft,
      iconRight,
      underline = false,
      isHovered,
      isActive,
      isLoading = false,
      noStyle,
      renderWrapperElement,
      fullWidth,
      onClick,
      ...rest
    }: ButtonContentProps<C, P, A>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';
    const hasIcon = icon || iconLeft || iconRight;

    const BEM = !noStyle
      ? cn(
          styles['tedi-btn'],
          styles[`tedi-btn--${visualType}`],
          styles[`tedi-btn--${color}`],
          { [styles[`tedi-btn--${size}`]]: size },
          { [styles['tedi-btn--underline']]: underline },
          { [styles['tedi-btn--is-hovered']]: isHovered },
          { [styles['tedi-btn--is-active']]: isActive },
          { [styles['tedi-btn--is-loading']]: isLoading },
          { [styles['tedi-btn--icon-only']]: icon },
          { [styles['tedi-btn--icon']]: hasIcon },
          { [styles['tedi-btn--full-width']]: fullWidth },
          className
        )
      : cn(styles['tedi-btn--no-style'], { [styles['tedi-btn--full-width']]: fullWidth }, className);

    const getIcon = (location: string, icon: string | IconWithoutBackgroundProps): JSX.Element => {
      const iconBEM = cn(styles['tedi-btn__icon'], styles[`tedi-btn__icon--${location}`], {
        [styles['tedi-btn__spinner']]: isLoading,
      });

      const isLink = visualType === 'link';

      const defaultIconProps: Partial<IconWithoutBackgroundProps> = {
        size: size === 'large' ? 24 : 18,
        className: iconBEM,
        ...(isLink ? { display: 'inline' } : {}),
      };

      const iconProps: IconWithoutBackgroundProps =
        typeof icon === 'string'
          ? { ...defaultIconProps, name: icon }
          : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon?.className) };

      return isLoading ? <Spinner className={iconProps.className} size={18} /> : <Icon {...iconProps} />;
    };

    const renderContent = (): JSX.Element => {
      const leftContent = isLoading ? (
        <Spinner
          position={!hasIcon ? 'absolute' : undefined}
          className={cn(styles['tedi-btn__spinner'], styles['tedi-btn__spinner--left'])}
          size={18}
        />
      ) : iconLeft ? (
        getIcon('left', iconLeft)
      ) : icon ? (
        getIcon('center', icon)
      ) : null;

      return (
        <span className={styles['tedi-btn__inner']}>
          {leftContent}
          <span className={styles['tedi-btn__text']}>{children}</span>
          {!isLoading && iconRight && getIcon('right', iconRight)}
        </span>
      );
    };

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      if (onClick && !isLoading) onClick(event);
    };

    return (
      <Print visibility="hide">
        <Component
          data-name="button-content"
          {...rest}
          aria-disabled={isLoading || rest['aria-disabled']}
          aria-busy={isLoading || undefined}
          onClick={onClickHandler}
          ref={ref}
          className={BEM}
        >
          {!noStyle ? renderContent() : children}
        </Component>
      </Print>
    );
  }
);

InternalButtonContent.displayName = 'ButtonContent';

/**
 * Shares the rendering logic between `Link` and `Button`. We don't export it from the component library.
 */
export const ButtonContent: ButtonContentComponent = InternalButtonContent;

export default ButtonContent;
