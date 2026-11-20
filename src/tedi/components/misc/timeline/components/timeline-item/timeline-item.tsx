import cn from 'classnames';
import { Children, isValidElement, type ReactNode } from 'react';

import Separator from '../../../separator/separator';
import type { TimelineItemState } from '../../timeline';
import styles from '../../timeline.module.scss';
import { TimelineDescription } from '../timeline-description/timeline-description';
import { TimelineTitle } from '../timeline-title/timeline-title';

export interface TimelineItemProps {
  /**
   * Item content. `Timeline.Title` and `Timeline.Description` are rendered in the
   * info area; any other content is rendered below them.
   */
  children?: ReactNode;
  /**
   * Timing labels shown before the item (e.g. `['2024', '16. detsember']`). On desktop
   * they stack in the left column (first line larger); on mobile they sit inline.
   */
  timings?: string[];
  /**
   * Content pinned to the bottom of the timings column on desktop and rendered after the
   * item content on mobile — e.g. a "last modified" note. It is rendered in both places and
   * CSS shows one, so keep it to text: ids, effects and state would exist twice.
   */
  timingsBottom?: ReactNode;
  /**
   * Current / past / future state. Injected by `Timeline` from its `activeIndex`.
   * @internal
   */
  state?: TimelineItemState;
  /**
   * Whether this is the last item (hides the connecting line). Injected by `Timeline`.
   * @internal
   */
  isLast?: boolean;
}

export const TimelineItem = ({
  children,
  timings = [],
  timingsBottom,
  state = 'future',
  isLast = false,
}: TimelineItemProps): JSX.Element => {
  const childArray = Children.toArray(children);
  const isType = (child: ReactNode, type: React.ElementType): boolean => isValidElement(child) && child.type === type;
  const title = childArray.find((child) => isType(child, TimelineTitle));
  const description = childArray.find((child) => isType(child, TimelineDescription));
  const content = childArray.filter((child) => !isType(child, TimelineTitle) && !isType(child, TimelineDescription));

  const dotColor = state === 'future' ? 'secondary' : 'accent';
  const lineColor = state === 'past' ? 'accent' : 'secondary';

  const hasTimingsBottom = timingsBottom !== null && timingsBottom !== undefined && typeof timingsBottom !== 'boolean';
  // Rendered in two places, and CSS shows one: beside the timings from `lg` up, below the item under `lg`.
  const timingsBottomNode = hasTimingsBottom && (
    <div className={styles['tedi-timeline__timings-bottom']}>{timingsBottom}</div>
  );

  return (
    <div
      className={cn(styles['tedi-timeline-item'], {
        [styles['tedi-timeline__item--has-bottom']]: hasTimingsBottom,
      })}
    >
      <div className={styles['tedi-timeline__timings']}>
        {timings.map((timing, index) => (
          <span key={`${timing}-${index}`} className={styles['tedi-timeline__time']}>
            {timing}
          </span>
        ))}
        {timingsBottomNode}
      </div>

      <div
        className={cn(styles['tedi-timeline__marker'], {
          [styles['tedi-timeline__marker--large']]: state === 'current',
        })}
      >
        <Separator
          variant="dot-only"
          color={dotColor}
          dotSize={state === 'current' ? 'large' : 'medium'}
          dotStyle={state === 'future' ? 'outlined' : 'filled'}
        />
        {!isLast && <Separator axis="vertical" color={lineColor} />}
      </div>

      <div className={styles['tedi-timeline__info']}>
        <div>
          {title}
          {description}
        </div>
        {content.length > 0 && <div className={styles['tedi-timeline__content']}>{content}</div>}
      </div>

      {timingsBottomNode}
    </div>
  );
};

TimelineItem.displayName = 'TimelineItem';

export default TimelineItem;
