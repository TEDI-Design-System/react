import cn from 'classnames';
import { JSX, ReactNode } from 'react';

import styles from './left-panel.module.scss';

export interface LeftPanelContentProps {
  /** Additional class name applied to the content region. */
  className?: string;
  /** Main scrollable content of the panel. */
  children?: ReactNode;
}

export const LeftPanelContent = ({ className, children }: LeftPanelContentProps): JSX.Element => (
  <div className={cn(styles['tedi-left-panel__content-wrapper'], className)}>{children}</div>
);

LeftPanelContent.displayName = 'LeftPanel.Content';

export default LeftPanelContent;
