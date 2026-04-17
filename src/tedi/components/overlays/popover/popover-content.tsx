import cn from 'classnames';
import { useContext } from 'react';
import { useId } from 'react';

import { Text, TextProps } from '../../base/typography/text/text';
import ClosingButton, { ClosingButtonProps } from '../../buttons/closing-button/closing-button';
import { OverlayContext } from '../overlay/overlay';
import { OverlayContent, OverlayContentProps } from '../overlay/overlay-content';
import styles from './popover.module.scss';
import { PopoverContext } from './popover-context';

export interface PopoverContentProps extends Omit<OverlayContentProps, 'classNames'> {
  /**
   * Popover title.
   */
  title?: string;
  /**
   * Popover title props.
   */
  titleProps?: Omit<TextProps, 'children'>;
  /**
   * Is close button shown?
   * @default false
   */
  close?: boolean;
  /**
   * Popover close button props.
   */
  closeProps?: ClosingButtonProps;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Popover width.
   * @default small
   */
  width?: 'small' | 'medium' | 'large' | 'none';
}

export const PopoverContent = (props: PopoverContentProps) => {
  const {
    children,
    width = 'small',
    className,
    title,
    titleProps = { element: 'h4' },
    close,
    closeProps = { size: 'default' },
  } = props;
  const { onOpenChange } = useContext(OverlayContext);
  // `withBorder` is owned by <Popover> because it also influences floating-ui
  // arrow padding, not just styling. Reading it from context keeps the two
  // concerns in sync.
  const { withBorder } = useContext(PopoverContext);
  const titleId = useId();
  const hasDescription = Boolean(children);
  const descriptionId = useId();

  return (
    <OverlayContent
      classNames={{
        content: cn(
          styles['tedi-popover'],
          { [styles[`tedi-popover--${width}`]]: width, [styles['tedi-popover--border']]: withBorder },
          className
        ),
        arrow: cn(styles['tedi-popover__arrow'], { [styles['tedi-popover__arrow--border']]: withBorder }),
      }}
      labelledBy={title ? titleId : undefined}
      describedBy={hasDescription ? descriptionId : undefined}
    >
      {(title || close) && (
        <div className={cn(styles['tedi-popover__header'], { [styles['tedi-popover__header--no-title']]: !title })}>
          {title && (
            <Text {...titleProps} id={titleId} className={cn('align-self-center', titleProps.className)}>
              {title}
            </Text>
          )}
          {close && (
            <ClosingButton
              {...closeProps}
              onClick={(e) => {
                onOpenChange(false);
                closeProps.onClick?.(e);
              }}
            />
          )}
        </div>
      )}
      {hasDescription ? <div id={descriptionId}>{children}</div> : children}
    </OverlayContent>
  );
};
