import cn from 'classnames';
import { Children, cloneElement, type CSSProperties, isValidElement, type ReactElement, type ReactNode } from 'react';

import { TimelineDescription } from './components/timeline-description/timeline-description';
import { TimelineItem, type TimelineItemProps } from './components/timeline-item/timeline-item';
import { TimelineTitle } from './components/timeline-title/timeline-title';
import styles from './timeline.module.scss';

export type TimelineVariant = 'default' | 'card';
export type TimelineItemState = 'current' | 'past' | 'future';

export interface TimelineProps {
  /**
   * `Timeline.Item` elements.
   */
  children: ReactNode;
  /**
   * Index of the active (current) item. Items before it render as completed (past),
   * items after it as upcoming (future). When omitted, all items are future.
   */
  activeIndex?: number;
  /**
   * Visual variant. `card` wraps the timeline in card borders and padding.
   * @default default
   */
  variant?: TimelineVariant;
  /**
   * Item padding in rem for the `card` variant (same scale as `Card`).
   * @default 1
   */
  cardPadding?: number;
  /**
   * Additional class name.
   */
  className?: string;
}

const isItemElement = (child: ReactNode): child is ReactElement<TimelineItemProps> =>
  isValidElement(child) && child.type === TimelineItem;

const resolveState = (index: number, activeIndex?: number): TimelineItemState => {
  if (activeIndex === undefined) return 'future';
  if (index === activeIndex) return 'current';
  return index < activeIndex ? 'past' : 'future';
};

const TimelineComponent = ({
  children,
  activeIndex,
  variant = 'default',
  cardPadding,
  className,
}: TimelineProps): JSX.Element => {
  const itemCount = Children.toArray(children).filter(isItemElement).length;

  let itemIndex = -1;
  const items = Children.map(children, (child) => {
    if (!isItemElement(child)) return child;
    itemIndex += 1;
    const index = itemIndex;
    return cloneElement(child, { state: resolveState(index, activeIndex), isLast: index === itemCount - 1 });
  });

  const style =
    variant === 'card' && cardPadding !== undefined
      ? ({ '--tedi-timeline-card-padding': `${cardPadding}rem` } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn(styles['tedi-timeline'], { [styles['tedi-timeline--card']]: variant === 'card' }, className)}
      style={style}
    >
      {items}
    </div>
  );
};

TimelineComponent.displayName = 'Timeline';

export const Timeline = Object.assign(TimelineComponent, {
  Item: TimelineItem,
  Title: TimelineTitle,
  Description: TimelineDescription,
});

export default Timeline;
