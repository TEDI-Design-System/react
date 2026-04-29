import cn from 'classnames';

import styles from './status-indicator.module.scss';

export type StatusIndicatorType = 'success' | 'danger' | 'warning' | 'inactive';
export type StatusIndicatorSize = 'sm' | 'lg';
export type StatusIndicatorPosition = 'default' | 'top-right';

export interface StatusIndicatorProps {
  /**
   * The status type, which determines the indicator color.
   * @default 'success'
   */
  type?: StatusIndicatorType;
  /**
   * The size of the indicator.
   * @default 'sm'
   */
  size?: StatusIndicatorSize;
  /**
   * Whether the indicator has a white border ring.
   * @default false
   */
  hasBorder?: boolean;
  /**
   * Controls positioning of the indicator.
   * - `'default'` — inline, no absolute positioning
   * - `'top-right'` — absolutely positioned at the top-right corner of the parent
   * @default 'default'
   */
  position?: StatusIndicatorPosition;
  /**
   * Additional class name(s)
   */
  className?: string;
}

export const StatusIndicator = (props: StatusIndicatorProps): JSX.Element => {
  const { type = 'success', size = 'sm', hasBorder = false, position = 'default', className } = props;

  return (
    <span
      data-name="status-indicator"
      className={cn(
        styles['tedi-status-indicator'],
        styles[`tedi-status-indicator--${type}`],
        styles[`tedi-status-indicator--${size}`],
        { [styles['tedi-status-indicator--bordered']]: hasBorder },
        { [styles['tedi-status-indicator--top-right']]: position === 'top-right' },
        className
      )}
      role="img"
      aria-hidden="true"
    />
  );
};

StatusIndicator.displayName = 'StatusIndicator';

export default StatusIndicator;
