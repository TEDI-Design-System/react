import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

export type SheetFooterAlign = 'left' | 'center' | 'right';

export interface SheetFooterProps {
  /**
   * Main footer actions. Positioned by `align`, or at the start when `endSlot` is set.
   */
  children?: ReactNode;
  /**
   * Horizontal placement of the main actions. Ignored when `endSlot` is set (the split
   * layout pins `children` to the start and `endSlot` to the end).
   * @default left
   */
  align?: SheetFooterAlign;
  /**
   * Stretch the actions to fill the footer width - each button grows to an equal share. With `endSlot`
   * set, only the main actions stretch and the `endSlot` content keeps its natural width.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Content pinned to the end edge - e.g. an overflow menu button.
   */
  endSlot?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const SheetFooter = ({
  children,
  align = 'left',
  fullWidth = false,
  endSlot,
  className,
}: SheetFooterProps): JSX.Element => {
  const { collapsed } = useSheetContext();

  const isSplit = Boolean(endSlot);
  // Hidden rather than unmounted while collapsed, matching `Sheet.Body`.
  return (
    <div
      hidden={collapsed}
      className={cn(
        styles['tedi-sheet__footer'],
        styles[isSplit ? 'tedi-sheet__footer--split' : `tedi-sheet__footer--${align}`],
        { [styles['tedi-sheet__footer--full-width']]: fullWidth },
        className
      )}
    >
      <div className={styles['tedi-sheet__footer-side']}>{children}</div>
      {isSplit && (
        <div className={cn(styles['tedi-sheet__footer-side'], styles['tedi-sheet__footer-side--end'])}>{endSlot}</div>
      )}
    </div>
  );
};

SheetFooter.displayName = 'Sheet.Footer';
export default SheetFooter;
