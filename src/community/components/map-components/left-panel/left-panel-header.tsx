import cn from 'classnames';
import { JSX, ReactNode } from 'react';

import styles from './left-panel.module.scss';

export interface LeftPanelHeaderProps {
  /** Additional class name applied to the header region. */
  className?: string;
  /** Content placed in the blue header area, under the icon. */
  children?: ReactNode;
}

export const LeftPanelHeader = ({ className, children }: LeftPanelHeaderProps): JSX.Element => (
  <div className={cn(styles['tedi-left-panel__header-controls'], className)}>{children}</div>
);

LeftPanelHeader.displayName = 'LeftPanel.Header';

export default LeftPanelHeader;
