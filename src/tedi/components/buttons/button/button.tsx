import classNames from 'classnames';
import React, { forwardRef } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { PolymorphicRef } from '../../../helpers/polymorphic/types';
import { UnknownType } from '../../../types/commonTypes';
import ButtonContent, { ButtonContentProps } from '../button-content/button-content';
import styles from '../button-content/button-content.module.scss';

export type ButtonType = 'primary' | 'secondary' | 'neutral' | 'link';
export type ButtonColor = 'default' | 'danger' | 'success' | 'inverted' | 'text';

interface IInternalButtonProps {
  /**
   * Button type
   * @default button
   */
  type?: 'submit' | 'button' | 'reset';
  /**
   * Skips form's browser validation
   * @default true when type="submit"
   */
  formNoValidate?: boolean;
  /**
   * If true, the icon will be placed in a separate column
   */
  iconStandalone?: boolean;
}

type AllowedTags = 'button';

export type ButtonProps<C extends React.ElementType = 'button'> = BreakpointSupport<
  ButtonContentProps<C, IInternalButtonProps, AllowedTags>
>;

const ButtonComponent = forwardRef(
  <C extends React.ElementType = 'button'>(props: ButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);

    const {
      children,
      as,
      type = 'button',
      formNoValidate = type === 'submit' ? true : undefined,
      iconStandalone,
      ...rest
    } = getCurrentBreakpointProps<ButtonProps<C>>(props);

    const ComponentAs = as || 'button';

    return (
      <ButtonContent
        data-name="button"
        {...(rest as UnknownType)}
        type={type}
        formNoValidate={formNoValidate}
        ref={ref}
        as={ComponentAs}
        className={classNames(rest.className, { [styles['tedi-btn__icon-standalone--link']]: iconStandalone })}
      >
        {children}
      </ButtonContent>
    );
  }
);

ButtonComponent.displayName = 'Button';

export const Button = ButtonComponent as <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

export default Button;
