import cn from 'classnames';
import React, { CSSProperties } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../helpers';
import { SharedCardProps } from '../card';
import styles from '../card.module.scss';
import { CardContext } from '../card-context';
import { getPaddingCssVariables } from '../utility';

export interface CardContentProps extends BreakpointSupport<SharedCardProps> {
  /**
   * Content rendered inside the card section.
   */
  children?: React.ReactNode;
  /**
   * Renders the content section as an interactive `<button>` element instead of a `<div>`.
   * Use when the whole section should be clickable.
   */
  role?: 'button';
  /**
   * Inline styles applied to the content element.
   */
  style?: CSSProperties;
}

export const CardContent = (props: CardContentProps): JSX.Element => {
  const { padding: rootPadding, background: rootBackground } = React.useContext(CardContext);
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);

  const {
    children,
    className,
    padding,
    background = 'primary',
    backgroundImage,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
    hasSeparator,
    role,
    style,
    ...rest
  } = getCurrentBreakpointProps<CardContentProps>(props, {
    padding: rootPadding,
    background: rootBackground,
  });

  const backgroundClass = background ? styles[`tedi-card--background--${background}`] : '';
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundPosition,
    backgroundSize,
    backgroundRepeat,
  };
  const Component = role === 'button' ? 'button' : 'div';

  return (
    <Component
      data-name="card-content"
      data-padding={typeof padding === 'number' ? `${padding}rem` : undefined}
      className={cn(styles['tedi-card__content'], backgroundClass, className, {
        [styles['tedi-card__content--separator']]: hasSeparator,
      })}
      style={{ ...getPaddingCssVariables(padding), ...backgroundStyle, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CardContent;
