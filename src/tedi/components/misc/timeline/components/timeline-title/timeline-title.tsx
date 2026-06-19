import cn from 'classnames';
import { type ReactNode } from 'react';

import styles from '../../timeline.module.scss';

export interface TimelineTitleProps {
  /**
   * Title content. Wrap it in a heading element if you need heading semantics —
   * nested typography inherits the title's size / weight.
   */
  children?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const TimelineTitle = ({ children, className }: TimelineTitleProps): JSX.Element => (
  <div className={cn(styles['tedi-timeline-title'], className)}>{children}</div>
);

TimelineTitle.displayName = 'TimelineTitle';

export default TimelineTitle;
