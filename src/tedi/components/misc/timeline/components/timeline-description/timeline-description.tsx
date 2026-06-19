import cn from 'classnames';
import { type ReactNode } from 'react';

import styles from '../../timeline.module.scss';

export interface TimelineDescriptionProps {
  /**
   * Description content, shown below the title in a muted style.
   */
  children?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const TimelineDescription = ({ children, className }: TimelineDescriptionProps): JSX.Element => (
  <div className={cn(styles['tedi-timeline-description'], className)}>{children}</div>
);

TimelineDescription.displayName = 'TimelineDescription';

export default TimelineDescription;
