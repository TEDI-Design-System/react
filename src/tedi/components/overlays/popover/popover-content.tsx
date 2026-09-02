import cn from 'classnames';
import { CSSProperties, useContext } from 'react';
import { useId } from 'react';

import { Text, TextProps } from '../../base/typography/text/text';
import ClosingButton, { ClosingButtonProps } from '../../buttons/closing-button/closing-button';
import { CardContentPadding } from '../../content/card/card';
import { OverlayContext } from '../overlay/overlay';
import { OverlayContent, OverlayContentProps } from '../overlay/overlay-content';
import styles from './popover.module.scss';
import { PopoverContext } from './popover-context';

const resolvePopoverPadding = (padding: CardContentPadding | undefined): CSSProperties | undefined => {
  if (padding === undefined) return undefined;
  const rem = (value: number) => `${value}rem`;
  const sides =
    typeof padding === 'number'
      ? { top: padding, right: padding, bottom: padding, left: padding }
      : 'vertical' in padding
      ? { top: padding.vertical, right: padding.horizontal, bottom: padding.vertical, left: padding.horizontal }
      : padding;
  return {
    '--popover-content-padding-top': rem(sides.top),
    '--popover-content-padding-right': rem(sides.right),
    '--popover-content-padding-bottom': rem(sides.bottom),
    '--popover-content-padding-left': rem(sides.left),
  } as CSSProperties;
};

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
  /**
   * Inner padding of the popover, using the same scale as `Card` — a number in rems,
   * `{ vertical, horizontal }`, or `{ top, right, bottom, left }`. Set to `0` (or zero a single axis)
   * when the popover holds a menu whose rows should reach the edges. Defaults to the popover padding.
   */
  padding?: CardContentPadding;
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
    padding,
  } = props;
  const { onOpenChange } = useContext(OverlayContext);
  const { withBorder } = useContext(PopoverContext);
  const titleId = useId();
  const hasDescription = Boolean(children);
  const descriptionId = useId();

  return (
    <OverlayContent
      classNames={{
        content: cn(
          styles['tedi-popover'],
          {
            [styles[`tedi-popover--${width}`]]: width && width !== 'none',
            [styles['tedi-popover--border']]: withBorder,
          },
          className
        ),
        arrow: cn(styles['tedi-popover__arrow'], { [styles['tedi-popover__arrow--border']]: withBorder }),
      }}
      labelledBy={title ? titleId : undefined}
      describedBy={hasDescription ? descriptionId : undefined}
      contentStyle={resolvePopoverPadding(padding)}
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

PopoverContent.displayName = 'PopoverContent';
