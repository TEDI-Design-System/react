import cn from 'classnames';
import React from 'react';

import { Button, ButtonProps } from '../button/button';
import styles from './info-button.module.scss';

export interface InfoButtonProps extends Omit<ButtonProps, 'size' | 'children'> {
  /**
   * If true, applies a small size to the InfoButton.
   * @default false
   */
  isSmall?: boolean;
  /**
   * Children elements to be rendered inside the InfoButton.
   */
  children?: React.ReactNode;
}

export const InfoButton = React.forwardRef<HTMLButtonElement, InfoButtonProps>(
  ({ isSmall, children, ...props }, ref): JSX.Element => (
    <Button
      className={cn(styles['tedi-info-button'])}
      data-name="info-button"
      {...props}
      type="button"
      icon={{ name: 'info', size: isSmall ? 16 : 18 }}
      visualType="neutral"
      ref={ref}
    >
      {children}
    </Button>
  )
);

InfoButton.displayName = 'InfoButton';

export default InfoButton;
