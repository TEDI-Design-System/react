import classNames from 'classnames';
import React from 'react';

import { useElementSize } from '../../../helpers';
import Tooltip from '../../overlays/tooltip/tooltip';
import styles from './ellipsis.module.scss';

export type EllipsisPosition = 'start' | 'end';

export interface EllipsisProps {
  /**
   * The content to be displayed inside the ellipsis container.
   */
  children: React.ReactNode;
  /**
   * The maximum number of lines before truncating the text with an ellipsis.
   * If the content exceeds this limit, it will be truncated. Applies to the
   * `end` (multi-line) position only.
   * @default 2
   */
  lineClamp?: number;
  /**
   * Where the ellipsis is placed.
   * - `end` — trailing ellipsis, multi-line (clamped by `lineClamp`).
   * - `start` — leading ellipsis, single-line (keeps the end of the text visible,
   *   e.g. for file paths or IDs).
   * @default end
   */
  position?: EllipsisPosition;
  /**
   * Determines whether a tooltip should be displayed when the text is truncated.
   * If `true`, hovering over or focusing the truncated text will show the full content in a tooltip.
   * @default true
   */
  popover?: boolean;
  /**
   * Adds a custom CSS class to the Ellipsis element for additional styling or theming purposes
   */
  className?: string;
}

export const Ellipsis = (props: EllipsisProps): JSX.Element => {
  const { children, lineClamp = 2, position = 'end', popover = true, className, ...rest } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [isEllipsed, setIsEllipsed] = React.useState(false);
  const elementSize = useElementSize(elementRef);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // `start` truncates on a single line (horizontal overflow); `end` clamps
    // multiple lines (vertical overflow).
    setIsEllipsed(
      position === 'start' ? element.scrollWidth > element.clientWidth : element.scrollHeight > element.clientHeight
    );
  }, [elementSize, position, lineClamp]);

  const showTooltip = isEllipsed && popover;

  const ellipsis = (
    <div
      data-name="ellipsis"
      {...rest}
      ref={elementRef}
      className={classNames(
        styles['tedi-ellipsis'],
        { [styles['tedi-ellipsis--start']]: position === 'start' },
        className
      )}
      style={position === 'end' ? { lineClamp, WebkitLineClamp: lineClamp } : undefined}
    >
      {position === 'start' ? <span className={styles['tedi-ellipsis__inner']}>{children}</span> : children}
    </div>
  );

  return showTooltip ? (
    <Tooltip>
      <Tooltip.Trigger>{ellipsis}</Tooltip.Trigger>
      <Tooltip.Content>
        <span className={styles['tedi-ellipsis__overlay']}>{children}</span>
      </Tooltip.Content>
    </Tooltip>
  ) : (
    ellipsis
  );
};

export default Ellipsis;
