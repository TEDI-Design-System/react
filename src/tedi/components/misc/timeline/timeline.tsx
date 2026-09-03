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
   * Vertical padding of each item in the `card` variant, in rem (same scale as
   * `Card`). Both the gaps between items and the card's top/bottom edges resolve
   * to twice this value. Horizontal item padding is fixed at the card default.
   * @default 0.5
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

export const Timeline = ({
  children,
  activeIndex,
  variant = 'default',
  cardPadding,
  className,
}: TimelineProps): JSX.Element => {
  const childArray = Children.toArray(children);
  // Ordinal of each TimelineItem among items only (non-item children are passed
  // through untouched). Precomputed as a pure lookup so no mutable counter is
  // reassigned inside the render mapping.
  const itemPositions = childArray.flatMap((child, position) => (isItemElement(child) ? [position] : []));
  const itemCount = itemPositions.length;
  const ordinalByPosition = new Map(itemPositions.map((position, ordinal) => [position, ordinal] as const));

  const items = childArray.map((child, position) => {
    if (!isItemElement(child)) return child;
    const index = ordinalByPosition.get(position) ?? 0;
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

Timeline.displayName = 'Timeline';

Timeline.Item = TimelineItem;
Timeline.Title = TimelineTitle;
Timeline.Description = TimelineDescription;

export default Timeline;
