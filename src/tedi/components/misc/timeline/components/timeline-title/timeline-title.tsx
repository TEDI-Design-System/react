import cn from 'classnames';
import { type ReactNode } from 'react';

import { TextColor } from '../../../../base/typography/text/text';
import styles from '../../timeline.module.scss';

export interface TimelineTitleProps {
  /**
   * Title content. Wrap it in a heading element if you need heading semantics —
   * nested typography inherits the title's size / weight.
   */
  children?: ReactNode;
  /**
   * Text color, using the shared typography colors. Defaults to `secondary`.
   * Pass `'inherit'` to inherit the surrounding color instead.
   * @default secondary
   */
  color?: TextColor | 'inherit';
  /**
   * Additional class name.
   */
  className?: string;
}

export const TimelineTitle = ({ children, color = 'secondary', className }: TimelineTitleProps): JSX.Element => (
  <div className={cn(styles['tedi-timeline-title'], { [`tedi-text--${color}`]: color !== 'inherit' }, className)}>
    {children}
  </div>
);

TimelineTitle.displayName = 'TimelineTitle';

export default TimelineTitle;
