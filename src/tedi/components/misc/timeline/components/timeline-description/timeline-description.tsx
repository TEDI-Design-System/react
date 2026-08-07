import cn from 'classnames';
import { type ReactNode } from 'react';

import { TextColor } from '../../../../base/typography/text/text';
import styles from '../../timeline.module.scss';

export interface TimelineDescriptionProps {
  /**
   * Description content, shown below the title in a muted style.
   */
  children?: ReactNode;
  /**
   * Text color, using the shared typography colors. Defaults to `tertiary`.
   * Pass `null` to inherit the surrounding color instead.
   * @default tertiary
   */
  color?: TextColor | null;
  /**
   * Additional class name.
   */
  className?: string;
}

export const TimelineDescription = ({
  children,
  color = 'tertiary',
  className,
}: TimelineDescriptionProps): JSX.Element => (
  <div className={cn(styles['tedi-timeline-description'], { [`tedi-text--${color}`]: color }, className)}>
    {children}
  </div>
);

TimelineDescription.displayName = 'TimelineDescription';

export default TimelineDescription;
