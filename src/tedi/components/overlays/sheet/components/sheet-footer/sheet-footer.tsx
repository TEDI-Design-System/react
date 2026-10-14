import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

export type SheetFooterAlign = 'left' | 'center' | 'right';

export interface SheetFooterProps {
  /**
   * Footer content - typically the primary actions. Positioned by `align`; when `right`
   * is set they stay on the `align` edge and `right` is pushed to the opposite edge.
   */
  children?: ReactNode;
  /**
   * Horizontal placement of the main actions. Ignored when `right` is set (the split
   * layout pins `children` to the start and `right` to the end).
   * @default left
   */
  align?: SheetFooterAlign;
  /**
   * Stretch the actions to fill the footer width - each button grows to an equal share.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Content pinned to the right edge - e.g. an overflow menu button.
   */
  right?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const SheetFooter = ({
  children,
  align = 'left',
  fullWidth = false,
  right,
  className,
}: SheetFooterProps): JSX.Element | null => {
  const { collapsed } = useSheetContext();

  if (collapsed) return null;

  const isSplit = Boolean(right);
  return (
    <div
      className={cn(
        styles['tedi-sheet__footer'],
        styles[isSplit ? 'tedi-sheet__footer--split' : `tedi-sheet__footer--${align}`],
        { [styles['tedi-sheet__footer--full-width']]: fullWidth && !isSplit },
        className
      )}
    >
      <div className={styles['tedi-sheet__footer-side']}>{children}</div>
      {isSplit && (
        <div className={cn(styles['tedi-sheet__footer-side'], styles['tedi-sheet__footer-side--right'])}>{right}</div>
      )}
    </div>
  );
};

SheetFooter.displayName = 'Sheet.Footer';
export default SheetFooter;
