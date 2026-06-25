import cn from 'classnames';
import React, { forwardRef } from 'react';

import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../helpers/polymorphic/types';
import styles from './card-button.module.scss';

export interface CardButtonBaseProps {
  /**
   * A single `<Card>` to render as the interactive surface. The host element provides the
   * interaction semantics and applies the hover / active / focus / disabled states to the
   * card and its blocks. Keep it to one card and avoid nested interactive elements.
   */
  children?: React.ReactNode;
  /**
   * Additional class name on the host element.
   */
  className?: string;
}

export type CardButtonProps<C extends React.ElementType = 'button'> = PolymorphicComponentPropWithRef<
  C,
  CardButtonBaseProps
>;

const CardButtonInner = forwardRef(
  <C extends React.ElementType = 'button'>(props: CardButtonProps<C>, ref?: PolymorphicRef<C>): JSX.Element => {
    const { as, children, className, ...rest } = props as CardButtonProps<'button'>;
    const Component: React.ElementType = as || 'button';
    const isButton = Component === 'button';

    return (
      <Component
        data-name="card-button"
        {...rest}
        {...(isButton ? { type: rest.type ?? 'button' } : {})}
        ref={ref}
        className={cn(styles['tedi-card-button'], className)}
      >
        {children}
      </Component>
    );
  }
);

CardButtonInner.displayName = 'CardButton';

export const CardButton = CardButtonInner as <C extends React.ElementType = 'button'>(
  props: CardButtonProps<C>
) => React.ReactElement | null;

export default CardButton;
