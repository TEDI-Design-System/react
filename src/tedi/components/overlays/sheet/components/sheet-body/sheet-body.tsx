import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

export interface SheetBodyProps {
  /**
   * Body content. Scrolls when it overflows the available height.
   */
  children: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const SheetBody = ({ children, className }: SheetBodyProps): JSX.Element | null => {
  const { collapsed } = useSheetContext();

  if (collapsed) return null;

  return <div className={cn(styles['tedi-sheet__body'], className)}>{children}</div>;
};

SheetBody.displayName = 'Sheet.Body';
export default SheetBody;
