import classNames from 'classnames';
import React from 'react';

import Popover from '../../overlays/popover/popover';
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
   * Determines whether a popover should be displayed when the text is truncated.
   * If `true`, hovering over the truncated text will show the full content in a popover.
   * @default true
   */
  popover?: boolean;
  /**
   * Adds a custom CSS class to the Ellipsis element for additional styling or theming purposes
   */
  className?: string;
}

type ResizeListener = () => void;

const resizeListeners = new Map<Element, ResizeListener>();
let sharedResizeObserver: ResizeObserver | undefined;

const notifyListeners = () => resizeListeners.forEach((listener) => listener());

/**
 * Calls `listener` whenever the element is resized or the window is resized. A window resize
 * can change the text width without changing the element's own size (for example through a
 * responsive font size), which a `ResizeObserver` does not report.
 *
 * All Ellipsis instances share one `ResizeObserver` and one window listener, so a page with
 * many of them is notified in a single callback instead of running a timer, a window listener
 * and an observer per instance. Both are released when the last observed element is gone.
 */
const observeResize = (element: Element, listener: ResizeListener) => {
  if (resizeListeners.size === 0) {
    window.addEventListener('resize', notifyListeners);
  }
  resizeListeners.set(element, listener);

  if (typeof ResizeObserver !== 'undefined') {
    sharedResizeObserver ??= new ResizeObserver((entries) => {
      entries.forEach((entry) => resizeListeners.get(entry.target)?.());
    });
    sharedResizeObserver.observe(element);
  }

  return () => {
    resizeListeners.delete(element);
    sharedResizeObserver?.unobserve(element);

    if (resizeListeners.size === 0) {
      sharedResizeObserver?.disconnect();
      sharedResizeObserver = undefined;
      window.removeEventListener('resize', notifyListeners);
    }
  };
};

export const Ellipsis = (props: EllipsisProps): JSX.Element => {
  const { children, lineClamp = 2, position = 'end', popover = true, className, ...rest } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [isEllipsed, setIsEllipsed] = React.useState(false);
  const showPopover = isEllipsed && popover;

  // The element is re-created when the popover wrapper is added or removed, so
  // measuring and observing starts over whenever `showPopover` changes.
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    // `start` truncates on a single line (horizontal overflow); `end` clamps
    // multiple lines (vertical overflow).
    const measure = () =>
      setIsEllipsed(
        position === 'start' ? element.scrollWidth > element.clientWidth : element.scrollHeight > element.clientHeight
      );

    measure();
    return observeResize(element, measure);
  }, [position, lineClamp, showPopover]);

  const ellipsis = (
    <div
      data-name="ellipsis"
      {...rest}
      ref={elementRef}
      role={showPopover ? 'button' : undefined}
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

  return showPopover ? (
    <Popover openWith="hover" focusManager={{ modal: false }}>
      <Popover.Trigger>{ellipsis}</Popover.Trigger>
      <Popover.Content>
        <span className={styles['tedi-ellipsis__overlay']}>{children}</span>
      </Popover.Content>
    </Popover>
  ) : (
    ellipsis
  );
};

export default Ellipsis;
