import cn from 'classnames';
import { JSX, ReactNode } from 'react';

import styles from './left-panel.module.scss';

export interface LeftPanelFooterProps {
  /** Additional class name applied to the footer region. */
  className?: string;
  /** Content placed in the gray footer area. */
  children?: ReactNode;
}

export const LeftPanelFooter = ({ className, children }: LeftPanelFooterProps): JSX.Element => (
  <div className={cn(styles['tedi-left-panel__footer'], className)}>{children}</div>
);

LeftPanelFooter.displayName = 'LeftPanel.Footer';

export default LeftPanelFooter;
