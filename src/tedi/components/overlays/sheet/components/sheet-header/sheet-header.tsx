import cn from 'classnames';
import { ReactNode, useEffect } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Heading } from '../../../../base/typography/heading/heading';
import ClosingButton, { ClosingButtonProps } from '../../../../buttons/closing-button/closing-button';
import { CollapseButton } from '../../../../buttons/collapse-button/collapse-button';
import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

export type SheetHeaderVariant = 'brand' | 'default';

export interface SheetHeaderProps {
  /**
   * Header title. Rendered as an `<h6>` and wired to the dialog's `aria-labelledby`.
   */
  title?: ReactNode;
  /**
   * Colour scheme.
   * - `brand` - brand-blue background with white content.
   * - `default` - surface background with primary content.
   * @default brand
   */
  variant?: SheetHeaderVariant;
  /**
   * Centre the title within the header instead of aligning it to the start. The action buttons stay
   * pinned to the trailing edge.
   * @default false
   */
  centerTitle?: boolean;
  /**
   * Show a collapse toggle that peeks the sheet down to just its header.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Leading content shown before the title - e.g. a back button or a count `Tag`. Stays pinned to the
   * start edge when `centerTitle` is set.
   */
  left?: ReactNode;
  /**
   * Trailing content shown before the collapse / close actions - e.g. a count `Tag`.
   */
  right?: ReactNode;
  /**
   * Extra header actions, placed inside the action group between the collapse and close buttons -
   * e.g. a fullscreen toggle. Use `Button` `size="small"` for icon-only actions so they match the
   * collapse and close buttons.
   */
  actions?: ReactNode;
  /**
   * Show the close button.
   * @default true
   */
  closeButton?: boolean;
  /**
   * Props forwarded to the close button (except `onClick`, which is managed).
   */
  closeButtonProps?: Omit<ClosingButtonProps, 'onClick' | 'color'>;
  /**
   * Custom header content. Replaces the default title / action layout entirely.
   */
  children?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const SheetHeader = (props: SheetHeaderProps): JSX.Element => {
  const {
    title,
    variant = 'brand',
    centerTitle = false,
    collapsible = false,
    left,
    right,
    actions,
    closeButton = true,
    closeButtonProps,
    children,
    className,
  } = props;
  const { getLabel } = useLabels();
  const { onOpenChange, labelId, setHasTitle, collapsed, onCollapsedChange } = useSheetContext();

  useEffect(() => {
    setHasTitle(Boolean(title) && (children === undefined || children === null));
    return () => setHasTitle(false);
  }, [title, children, setHasTitle]);

  return (
    <div
      className={cn(
        styles['tedi-sheet__header'],
        styles[`tedi-sheet__header--${variant}`],
        { [styles['tedi-sheet__header--center']]: centerTitle },
        className
      )}
    >
      {children ?? (
        <>
          {left && <div className={styles['tedi-sheet__header-left']}>{left}</div>}
          {title && (
            <Heading element="h6" modifiers="h6" id={labelId} className={styles['tedi-sheet__title']}>
              {title}
            </Heading>
          )}
          <div className={styles['tedi-sheet__header-actions']}>
            {right}
            {collapsible && (
              <CollapseButton
                className={styles['tedi-sheet__collapse-toggle']}
                hideText
                open={!collapsed}
                onOpenChange={(next) => onCollapsedChange(!next)}
                inverted={variant === 'brand'}
                aria-label={getLabel(collapsed ? 'sheet.expand' : 'sheet.collapse')}
              />
            )}
            {actions}
            {closeButton && (
              <ClosingButton
                {...closeButtonProps}
                color={variant === 'brand' ? 'white' : 'primary'}
                onClick={() => onOpenChange(false)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

SheetHeader.displayName = 'Sheet.Header';
export default SheetHeader;
