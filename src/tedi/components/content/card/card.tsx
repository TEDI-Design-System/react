import cn from 'classnames';
import React, { CSSProperties, forwardRef } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import styles from './card.module.scss';
import { CardContent, CardContentProps } from './card-content/card-content';
import { CardContext } from './card-context';
import CardHeader from './card-header/card-header';
import CardNotification from './card-notification/card-notification';
import {
  BorderRadius,
  CardBackground,
  CardBorderType,
  CardContentPaddingNumber,
  getCardBorderPlacementColor,
  resolveBorderRadius,
} from './utility';

export type CardContentPadding =
  | CardContentPaddingNumber
  | { vertical: CardContentPaddingNumber; horizontal: CardContentPaddingNumber }
  | {
      top: CardContentPaddingNumber;
      right: CardContentPaddingNumber;
      bottom: CardContentPaddingNumber;
      left: CardContentPaddingNumber;
    };
export interface SharedCardProps {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Card content padding
   * Values can be:<br />
   * - predefined number value in rems<br />
   * - object of separated horizontal and vertical number values in rems
   * - object of separated top, right, bottom, left number values in rems
   */
  padding?: CardContentPadding;
  /**
   * Background color.
   * @default primary
   */
  background?: CardBackground;
  /**
   * Background image.
   */
  backgroundImage?: CSSProperties['backgroundImage'];
  /**
   * Background position for the image.
   */
  backgroundPosition?: CSSProperties['backgroundPosition'];
  /**
   * Background size for the image.
   */
  backgroundSize?: CSSProperties['backgroundSize'];
  /**
   * Background repeat for the image.
   */
  backgroundRepeat?: CSSProperties['backgroundRepeat'];
  /**
   * Renders a separator line between this section and the adjacent card content.
   * Useful for visually dividing stacked `Card.Header`, `Card.Content` and `Card.Notification` sections.
   * @default false
   */
  hasSeparator?: boolean;
}

type CardBreakpointProps = {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Controls card border radius.
   *
   * Accepts `false` to remove all radius or an object to control sides or individual corners.
   *
   * Side values affect two corners while corner values take precedence.
   *
   * Examples:
   * `false` → no radius
   * `{ top:false }` → removes top corners
   * `{ left:false }` → removes left corners
   * `{ topLeft:false }` → removes one corner
   * `{ bottom:false, bottomRight:true }` → corner override
   */
  borderRadius?: BorderRadius;
  /**
   * Removes the card's border entirely.
   * @default false
   */
  borderless?: boolean;
  /**
   * Adds a colored accent border to the top or left of the card (e.g. `top-success-primary`, `left-danger-primary`).
   */
  border?: CardBorderType;
} & Pick<CardContentProps, 'padding' | 'background'>;

export interface CardProps extends BreakpointSupport<CardBreakpointProps> {
  children?: React.ReactNode;
}

const CardComponent = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { children, className, padding, background, borderRadius, borderless, border, ...rest } =
    getCurrentBreakpointProps<CardProps>(props, { padding: 1 });

  const [borderPlacement, borderColor] = getCardBorderPlacementColor(border);

  const corners = resolveBorderRadius(borderRadius);

  const cardBEM = cn(
    styles['tedi-card'],
    {
      [styles[`tedi-card--border-${borderPlacement}`]]: borderPlacement,
      [styles[`tedi-card--border--${borderColor}`]]: borderColor,
      [styles['tedi-card--borderless']]: borderless,

      [styles['tedi-card--no-radius-tl']]: !corners.topLeft,
      [styles['tedi-card--no-radius-tr']]: !corners.topRight,
      [styles['tedi-card--no-radius-br']]: !corners.bottomRight,
      [styles['tedi-card--no-radius-bl']]: !corners.bottomLeft,
    },
    className
  );

  return (
    <CardContext.Provider value={{ padding, background }}>
      <div data-name="card" data-testid="tedi-card" {...rest} className={cardBEM} ref={ref}>
        {children}
      </div>
    </CardContext.Provider>
  );
});

CardComponent.displayName = 'Card';

export const Card = Object.assign(CardComponent, {
  Content: CardContent,
  Header: CardHeader,
  Notification: CardNotification,
});

export default Card;
