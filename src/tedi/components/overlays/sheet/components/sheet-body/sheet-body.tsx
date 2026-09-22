import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

export type SheetBodyPadding = 'default' | 'none';

export interface SheetBodyProps {
  /**
   * Body content. Scrolls when it overflows the available height.
   */
  children: ReactNode;
  /**
   * Body padding.
   * - `default` — the standard sheet padding.
   * - `none` — edge-to-edge content. Use when the content brings its own padding
   *   (e.g. `Tabs`, a full-width action list) and should sit flush with the sheet edges.
   * @default default
   */
  padding?: SheetBodyPadding;
  /**
   * Additional class name.
   */
  className?: string;
}

export const SheetBody = ({ children, padding = 'default', className }: SheetBodyProps): JSX.Element | null => {
  const { collapsed } = useSheetContext();

  if (collapsed) return null;

  return (
    <div
      className={cn(
        styles['tedi-sheet__body'],
        { [styles['tedi-sheet__body--no-padding']]: padding === 'none' },
        className
      )}
    >
      {children}
    </div>
  );
};

SheetBody.displayName = 'Sheet.Body';
export default SheetBody;
