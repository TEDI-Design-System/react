import { useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';
import React, { forwardRef, useContext, useEffect, useId, useRef } from 'react';

import { AllowedHTMLTags, PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../helpers/polymorphic/types';
import { AccessibilityContext } from '../../../providers/accessibility-provider/accessibility-provider';
import { useLabels } from '../../../providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import { Icon, IconWithoutBackgroundProps } from '../../base/icon/icon';
import { Spinner } from '../../loaders/spinner/spinner';
import { Tooltip } from '../../overlays/tooltip/tooltip';
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
     * Color scheme of the button. The 'text' value is only supported when visualType is 'link'.
     * @default default
     */
    color?: ButtonColor;
    /**
     * Button size. The 'extra-small' size is only intended for icon-only buttons (use with the `icon` prop).
     */
    size?: 'default' | 'small' | 'extra-small';
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
     * Shows a spinner and blocks activation: `onClick` is not called, forms don't submit and links
     * don't navigate. The button stays focusable. Screen readers hear the loading label when the
     * focused button switches into this state (needs `AccessibilityProvider`,
     * built into `Layout`), and as the button's description when it is focused while loading.
     * @default false
     */
    isLoading?: boolean;
    /**
     * What screen readers hear while `isLoading`. Say what is happening, e.g. "Saving".
     * @default the `button.loading` label
     */
    loadingLabel?: string;
    /**
     * Skip applying button/link styles
     * Useful when you just want to use Button or Link logic without the styles
     * In this case icon, iconLeft and iconRight are ignored
     */
    noStyle?: boolean;
    /**
     * Internal use only
     */
    renderWrapperElement?: unknown;
    /**
     * Automatically show tooltip for icon-only buttons.
     * @default true
     */
    showTooltip?: boolean;
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
      _text,
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
      loadingLabel,
      noStyle,
      _renderWrapperElement,
      fullWidth,
      onClick,
      showTooltip = false,
      ...rest
    }: ButtonContentProps<C, P, A>,
    ref?: PolymorphicRef<C>
  ) => {
    const { getLabel } = useLabels();
    const Component = as || 'button';

    const accessibility = useContext(AccessibilityContext);
    const loaderId = useId();
    // `removeLoader` changes identity on every update, so the cleanup reads the latest one.
    const removeLoaderRef = useRef(accessibility?.removeLoader);
    removeLoaderRef.current = accessibility?.removeLoader;
    const wasLoadingRef = useRef(isLoading);
    const elementRef = useRef<HTMLElement>(null);
    const mergedRef = useMergeRefs([elementRef, ref]);

    useEffect(() => {
      // Only a switch into loading is announced, not a button that renders loading.
      const isSwitch = isLoading && !wasLoadingRef.current;
      wasLoadingRef.current = isLoading;
      // Focus-only, so buttons loading elsewhere don't interrupt with an assertive message.
      if (!isSwitch || !accessibility || elementRef.current !== document.activeElement) return;

      accessibility.addLoader({
        id: loaderId,
        mountLabel: loadingLabel || getLabel('button.loading'),
        politeness: 'assertive',
      });
      return () => removeLoaderRef.current?.(loaderId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);
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
        [styles['tedi-btn__icon-responsive']]: Component === 'a' && size === 'small',
      });

      const defaultIconProps: Partial<IconWithoutBackgroundProps> = {
        size: 18,
        className: iconBEM,
      };

      const iconProps: IconWithoutBackgroundProps =
        typeof icon === 'string'
          ? { ...defaultIconProps, name: icon }
          : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon?.className) };

      return isLoading ? <Spinner className={iconProps.className} size={18} decorative /> : <Icon {...iconProps} />;
    };

    const renderContent = (): JSX.Element => {
      const leftContent = isLoading ? (
        <Spinner
          position={!hasIcon ? 'absolute' : undefined}
          className={cn(styles['tedi-btn__spinner'], styles['tedi-btn__spinner--left'])}
          size={18}
          decorative
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
      if (isLoading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // A middle-click opens a link without firing `click`.
    const onAuxClickHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
      if (isLoading) {
        event.preventDefault();
        return;
      }
      rest.onAuxClick?.(event);
    };

    const isIconOnly = Boolean(icon);
    const getButtonText = (children: React.ReactNode): string | undefined => {
      if (typeof children === 'string') return children;
      if (Array.isArray(children)) {
        return children
          .map((c) => (typeof c === 'string' ? c : ''))
          .join('')
          .trim();
      }
      return undefined;
    };

    const buttonText = getButtonText(children);
    const loadingDescriptionId = `${loaderId}-loading`;
    const buttonElement = (
      <Component
        data-name="button-content"
        {...rest}
        aria-disabled={isLoading || rest['aria-disabled']}
        aria-describedby={cn(rest['aria-describedby'], isLoading && loadingDescriptionId) || undefined}
        onClick={onClickHandler}
        onAuxClick={onAuxClickHandler}
        ref={mergedRef}
        className={BEM}
      >
        {!noStyle ? renderContent() : children}
        {isLoading && (
          // aria-hidden keeps it out of the name and browse mode; aria-describedby still reads it.
          <span id={loadingDescriptionId} aria-hidden="true" className={styles['tedi-btn__loading-description']}>
            {loadingLabel || getLabel('button.loading')}
          </span>
        )}
      </Component>
    );

    return showTooltip && isIconOnly && buttonText ? (
      <Tooltip ariaHidden>
        <Tooltip.Trigger>{buttonElement}</Tooltip.Trigger>
        <Tooltip.Content>{buttonText}</Tooltip.Content>
      </Tooltip>
    ) : (
      buttonElement
    );
  }
);

InternalButtonContent.displayName = 'ButtonContent';

/**
 * Shares the rendering logic between `Link` and `Button`. We don't export it from the component library.
 */
export const ButtonContent: ButtonContentComponent = InternalButtonContent;

export default ButtonContent;
