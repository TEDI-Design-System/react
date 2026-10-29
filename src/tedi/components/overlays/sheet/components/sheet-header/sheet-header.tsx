import cn from 'classnames';
import { ReactNode, useLayoutEffect } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Heading } from '../../../../base/typography/heading/heading';
import ClosingButton, { ClosingButtonProps } from '../../../../buttons/closing-button/closing-button';
import { CollapseButton } from '../../../../buttons/collapse-button/collapse-button';
import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

export type SheetHeaderVariant = 'brand' | 'default';
export type SheetHeaderTitlePosition = 'start' | 'center';
export type SheetHeaderHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface SheetHeaderProps {
  /**
   * Header title. Rendered as a heading (see `headingLevel`) and wired to the dialog's `aria-labelledby`.
   */
  title?: ReactNode;
  /**
   * Semantic heading level of the `title`; the visual style stays H6 regardless. The sheet opens over
   * arbitrary page content, so set it to fit the host page's heading outline (WCAG 1.3.1).
   * @default h3
   */
  headingLevel?: SheetHeaderHeadingLevel;
  /**
   * Colour scheme.
   * - `brand` - brand-blue background with white content.
   * - `default` - surface background with primary content.
   * @default brand
   */
  variant?: SheetHeaderVariant;
  /**
   * Where the title sits in the header.
   * - `start` - aligned to the start edge, after the `startSlot` content.
   * - `center` - centred within the header; `startSlot` and the action buttons stay pinned to the edges.
   * @default start
   */
  titlePosition?: SheetHeaderTitlePosition;
  /**
   * Show a collapse toggle that peeks the sheet down to just its header.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Leading content shown before the title - e.g. a back button or a count `Tag`. Stays pinned to the
   * start edge when `titlePosition` is `center`.
   */
  startSlot?: ReactNode;
  /**
   * Trailing content shown before the collapse / close actions - e.g. a count `Tag`.
   */
  endSlot?: ReactNode;
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
    headingLevel = 'h3',
    variant = 'brand',
    titlePosition = 'start',
    collapsible = false,
    startSlot,
    endSlot,
    actions,
    closeButton = true,
    closeButtonProps,
    children,
    className,
  } = props;
  const { getLabel } = useLabels();
  const { onOpenChange, titleId, setHasTitle, collapsed, onCollapsedChange } = useSheetContext();

  // Explicit checks rather than truthiness, so a numeric title such as `0` still renders as the heading.
  const hasTitle = title !== undefined && title !== null && title !== false && title !== '';

  // Layout effect: the dialog's `aria-labelledby` is set before the first paint, so it is never
  // announced without a name.
  useLayoutEffect(() => {
    setHasTitle(hasTitle && (children === undefined || children === null));
    return () => setHasTitle(false);
  }, [hasTitle, children, setHasTitle]);

  return (
    <div
      className={cn(
        styles['tedi-sheet__header'],
        styles[`tedi-sheet__header--${variant}`],
        { [styles['tedi-sheet__header--center']]: titlePosition === 'center' },
        className
      )}
    >
      {children ?? (
        <>
          {startSlot && <div className={styles['tedi-sheet__header-start']}>{startSlot}</div>}
          {hasTitle && (
            <Heading element={headingLevel} modifiers="h6" id={titleId} className={styles['tedi-sheet__title']}>
              {title}
            </Heading>
          )}
          <div className={styles['tedi-sheet__header-actions']}>
            {endSlot}
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
