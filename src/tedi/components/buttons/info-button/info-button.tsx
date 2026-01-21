import cn from 'classnames';
import React from 'react';

import { Button, ButtonProps } from '../button/button';
import styles from './info-button.module.scss';

export interface InfoButtonProps extends Omit<ButtonProps, 'size' | 'children' | 'color'> {
  /**
   * If true, applies a small size to the InfoButton.
   * @default false
   */
  isSmall?: boolean;
  /**
   * Children elements to be rendered inside the InfoButton.
   */
  children?: React.ReactNode;
  /*
   * Color variant of the InfoButton.
   * @default 'default'
   */
  color?: 'default' | 'inverted';
}

export const InfoButton = React.forwardRef<HTMLButtonElement, InfoButtonProps>(
  ({ isSmall, children, color = 'default', ...props }, ref): JSX.Element => (
    <Button
      className={cn(styles['tedi-info-button'])}
      data-variant={color === 'inverted' ? 'inverted' : undefined}
      data-name="info-button"
      {...props}
      icon={{ name: 'info', size: isSmall ? 16 : 18 }}
      visualType="neutral"
      color={color}
      ref={ref}
    >
      {children}
    </Button>
  )
);

InfoButton.displayName = 'InfoButton';

export default InfoButton;
