import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

export interface SheetFooterProps {
  /**
   * Footer content - typically the primary actions. Placed on the left; when `right`
   * is set they stay left and `right` is pushed to the opposite edge.
   */
  children?: ReactNode;
  /**
   * Content pinned to the right edge - e.g. an overflow menu button.
   */
  right?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const SheetFooter = ({ children, right, className }: SheetFooterProps): JSX.Element | null => {
  const { collapsed } = useSheetContext();

  if (collapsed) return null;

  const isSplit = Boolean(right);
  return (
    <div
      className={cn(
        styles['tedi-sheet__footer'],
        styles[isSplit ? 'tedi-sheet__footer--split' : 'tedi-sheet__footer--start'],
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
