import cn from 'classnames';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

import {
  clearScrollTimeout,
  getScrollTopForIndex,
  needsScrollCorrection,
  scrollToIndex,
  snapToNearestItem,
} from '../../../time-field/time-field-helpers';
import styles from '../../time-picker.module.scss';

export interface TimeWheelProps {
  /**
   * Array of all available hours (normally ["00", "01", ..., "23"]).
   */
  hours: string[];

  /**
   * Array of available minutes based on the `stepMinutes` value
   * (e.g. ["00", "05", "10", ..., "55"] when step is 5).
   */
  minutes: string[];
  /**
   * The currently selected hour ("00" to "23").
   * Used to control the scroll position of the hour wheel.
   */
  selectedHour: string;
  /**
   * The currently selected minute.
   * Must exist in the `minutes` array.
   * Used to control the scroll position of the minute wheel.
   */
  selectedMinute: string;
  /**
   * Callback fired when the user changes either the hour or minute via scrolling or clicking.
   *
   * @param hour - Selected hour in "HH" format
   * @param minute - Selected minute in "mm" format
   */
  onChange: (hour: string, minute: string) => void;
  /**
   * Additional CSS class name to apply to the root wheel container.
   */
  className?: string;
  /**
   * Whether to render the surrounding card chrome (border, background, radius).
   * @default true
   */
  bordered?: boolean;
}

export const TimeWheel: React.FC<TimeWheelProps> = ({
  hours,
  minutes,
  selectedHour,
  selectedMinute,
  onChange,
  className,
  bordered = true,
}) => {
  const uid = React.useId();
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const isProgrammaticScrollHour = useRef(false);
  const isProgrammaticScrollMinute = useRef(false);

  const scrollTimeoutHour = useRef<NodeJS.Timeout>();
  const scrollTimeoutMinute = useRef<NodeJS.Timeout>();

  const lastHourIndex = useRef(-1);
  const lastMinuteIndex = useRef(-1);

  const [activeHourIndex, setActiveHourIndex] = React.useState<number | null>(null);
  const [activeMinuteIndex, setActiveMinuteIndex] = React.useState<number | null>(null);

  const clampIndex = (index: number, length: number) => Math.max(0, Math.min(length - 1, index));

  const forceScrollTo = (ref: React.RefObject<HTMLDivElement>, targetIndex: number, isHour: boolean) => {
    const element = ref.current;
    if (!element || targetIndex < 0) return;

    const target = getScrollTopForIndex(targetIndex);

    if (isHour) isProgrammaticScrollHour.current = true;
    else isProgrammaticScrollMinute.current = true;

    // 'instant' (not 'auto') so this jump is synchronous — the column's
    // CSS `scroll-behavior: smooth` would otherwise turn this into a ~300ms
    // animation, and the in-flight scroll events during that animation would
    // get mis-classified as user scrolls (the rAF clears the programmatic
    // flag after one frame, while the animation keeps firing for ~280ms more)
    // and fire onChange with every intermediate index — which is how the
    // wheel ended up snapping back to 00:00 on open.
    element.scrollTo({ top: target, behavior: 'instant' });

    requestAnimationFrame(() => {
      if (isHour) isProgrammaticScrollHour.current = false;
      else isProgrammaticScrollMinute.current = false;
    });
  };

  useLayoutEffect(() => {
    const hourIndex = hours.indexOf(selectedHour);
    const minuteIndex = minutes.indexOf(selectedMinute);

    if (hourIndex !== lastHourIndex.current) {
      lastHourIndex.current = hourIndex;
      forceScrollTo(hourRef, hourIndex, true);
    }

    if (minuteIndex !== lastMinuteIndex.current) {
      lastMinuteIndex.current = minuteIndex;
      forceScrollTo(minuteRef, minuteIndex, false);
    }

    setActiveHourIndex(hourIndex);
    setActiveMinuteIndex(minuteIndex);
  }, [hours, minutes, selectedHour, selectedMinute]);

  // Callback refs — updated every render so scrollend listeners always use fresh
  // closure values without needing to re-register. This avoids the stale-closure
  // problem that arises when event listeners are registered once in useEffect.
  const processHourScrollEnd = useRef<() => void>(() => {});
  processHourScrollEnd.current = () => {
    const el = hourRef.current;
    if (!el || isProgrammaticScrollHour.current) return;

    clearScrollTimeout(scrollTimeoutHour.current);

    const index = clampIndex(snapToNearestItem(el.scrollTop, hours.length), hours.length);
    setActiveHourIndex(index);

    const target = getScrollTopForIndex(index);

    // Use 'instant' here — 'auto' would trigger the CSS scroll-behavior:smooth
    // animation (~300ms), causing it to outlast the 50ms programmatic flag and
    // treat the remaining animation frames as user scrolls, re-triggering snaps.
    if (needsScrollCorrection(el.scrollTop, target, 8)) {
      isProgrammaticScrollHour.current = true;
      scrollToIndex(el, index, 'instant');
      requestAnimationFrame(() => {
        isProgrammaticScrollHour.current = false;
      });
    }

    if (index !== lastHourIndex.current) {
      lastHourIndex.current = index;
      onChange(hours[index]!, selectedMinute);
    }
  };

  const processMinuteScrollEnd = useRef<() => void>(() => {});
  processMinuteScrollEnd.current = () => {
    const el = minuteRef.current;
    if (!el || isProgrammaticScrollMinute.current) return;

    clearScrollTimeout(scrollTimeoutMinute.current);

    const index = clampIndex(snapToNearestItem(el.scrollTop, minutes.length), minutes.length);
    setActiveMinuteIndex(index);

    const target = getScrollTopForIndex(index);

    if (needsScrollCorrection(el.scrollTop, target, 8)) {
      isProgrammaticScrollMinute.current = true;
      scrollToIndex(el, index, 'instant');
      requestAnimationFrame(() => {
        isProgrammaticScrollMinute.current = false;
      });
    }

    if (index !== lastMinuteIndex.current) {
      lastMinuteIndex.current = index;
      onChange(selectedHour, minutes[index]!);
    }
  };

  // Primary path: scrollend fires once after the CSS snap animation completes,
  // so scrollTop is always at a valid snap point when we read it. This prevents
  // the flicker caused by the debounced scroll handler reading an intermediate
  // scrollTop mid-snap-animation (most visible on high-refresh-rate trackpads).
  useEffect(() => {
    const hourEl = hourRef.current;
    const minuteEl = minuteRef.current;
    if (!hourEl || !minuteEl) return;

    const onHourScrollEnd = () => processHourScrollEnd.current();
    const onMinuteScrollEnd = () => processMinuteScrollEnd.current();

    hourEl.addEventListener('scrollend', onHourScrollEnd);
    minuteEl.addEventListener('scrollend', onMinuteScrollEnd);

    return () => {
      hourEl.removeEventListener('scrollend', onHourScrollEnd);
      minuteEl.removeEventListener('scrollend', onMinuteScrollEnd);
    };
  }, []);

  // Fallback for browsers without scrollend support: debounce at 150ms so the
  // handler fires well after the CSS snap animation has finished emitting scroll
  // events. processScrollEnd clears this timer when scrollend fires first.
  //
  // The active-index state is updated on every scroll event so the highlight
  // follows the wheel in real time — this gives instant visual feedback without
  // waiting for scrollend. onChange is intentionally NOT called here; it fires
  // only in processHourScrollEnd once the scroll has fully settled.
  const handleHourScroll = () => {
    if (!hourRef.current || isProgrammaticScrollHour.current) return;

    const index = clampIndex(snapToNearestItem(hourRef.current.scrollTop, hours.length), hours.length);
    setActiveHourIndex(index);

    clearScrollTimeout(scrollTimeoutHour.current);
    scrollTimeoutHour.current = setTimeout(() => processHourScrollEnd.current(), 150);
  };

  const handleMinuteScroll = () => {
    if (!minuteRef.current || isProgrammaticScrollMinute.current) return;

    const index = clampIndex(snapToNearestItem(minuteRef.current.scrollTop, minutes.length), minutes.length);
    setActiveMinuteIndex(index);

    clearScrollTimeout(scrollTimeoutMinute.current);
    scrollTimeoutMinute.current = setTimeout(() => processMinuteScrollEnd.current(), 150);
  };

  const handleHourClick = (index: number) => {
    const hour = hours[index];
    if (!hour || !hourRef.current) return;

    clearScrollTimeout(scrollTimeoutHour.current);

    lastHourIndex.current = index;
    setActiveHourIndex(index);
    onChange(hour, selectedMinute);

    isProgrammaticScrollHour.current = true;
    scrollToIndex(hourRef.current, index, 'smooth');

    setTimeout(() => {
      isProgrammaticScrollHour.current = false;
    }, 300);
  };

  const handleMinuteClick = (index: number) => {
    const minute = minutes[index];
    if (!minute || !minuteRef.current) return;

    clearScrollTimeout(scrollTimeoutMinute.current);

    lastMinuteIndex.current = index;
    setActiveMinuteIndex(index);
    onChange(selectedHour, minute);

    isProgrammaticScrollMinute.current = true;
    scrollToIndex(minuteRef.current, index, 'smooth');

    setTimeout(() => {
      isProgrammaticScrollMinute.current = false;
    }, 300);
  };

  const handleColumnKeyDown =
    (type: 'hour' | 'minute', list: string[], selected: string, onSelect: (v: string) => void) =>
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = list.indexOf(selected);
      if (currentIndex === -1) return;

      let nextIndex = -1;
      // Track whether the new index wrapped around (e.g. 59 → 00 going down,
      // 00 → 59 going up). When it does, animate the scroll instantly so we
      // don't smooth-scroll across the entire wheel.
      let wrapped = false;

      switch (event.key) {
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % list.length;
          wrapped = currentIndex === list.length - 1;
          break;
        case 'ArrowUp':
          nextIndex = (currentIndex - 1 + list.length) % list.length;
          wrapped = currentIndex === 0;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = list.length - 1;
          break;
        case 'PageDown':
          nextIndex = (currentIndex + 5) % list.length;
          wrapped = currentIndex + 5 >= list.length;
          break;
        case 'PageUp':
          nextIndex = (currentIndex - 5 + list.length) % list.length;
          wrapped = currentIndex - 5 < 0;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onSelect(list[currentIndex]);
          return;
        default:
          return;
      }

      event.preventDefault();

      const container = type === 'hour' ? hourRef.current : minuteRef.current;
      const el = container?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${type}-${nextIndex}`)}`);

      el?.focus();
      el?.scrollIntoView({ block: 'center', behavior: wrapped ? 'auto' : 'smooth' });
    };

  useEffect(() => {
    return () => {
      clearScrollTimeout(scrollTimeoutHour.current);
      clearScrollTimeout(scrollTimeoutMinute.current);
    };
  }, []);

  return (
    <div
      className={cn(
        styles['tedi-time-picker__wheel'],
        { [styles['tedi-time-picker__wheel--borderless']]: !bordered },
        className
      )}
    >
      <div
        ref={hourRef}
        role="listbox"
        aria-label="Hours"
        tabIndex={0}
        aria-activedescendant={`${uid}-hour-${hours.indexOf(selectedHour)}`}
        className={styles['tedi-time-picker__wheel-column']}
        onScroll={handleHourScroll}
        onKeyDown={handleColumnKeyDown('hour', hours, selectedHour, (h) => onChange(h, selectedMinute))}
      >
        {hours.map((h, idx) => (
          <div
            key={h}
            className={cn(styles['tedi-time-picker__wheel-item'], {
              [styles['tedi-time-picker__wheel-item--selected']]:
                idx === (activeHourIndex ?? hours.indexOf(selectedHour)),
            })}
            onClick={() => handleHourClick(idx)}
            id={`${uid}-hour-${idx}`}
            role="option"
            aria-selected={h === selectedHour}
          >
            {h}
          </div>
        ))}
      </div>

      <div
        ref={minuteRef}
        role="listbox"
        className={styles['tedi-time-picker__wheel-column']}
        onScroll={handleMinuteScroll}
        aria-label="Minutes"
        tabIndex={0}
        aria-activedescendant={`${uid}-minute-${minutes.indexOf(selectedMinute)}`}
        onKeyDown={handleColumnKeyDown('minute', minutes, selectedMinute, (m) => onChange(selectedHour, m))}
      >
        {minutes.map((m, idx) => (
          <div
            key={m}
            className={cn(styles['tedi-time-picker__wheel-item'], {
              [styles['tedi-time-picker__wheel-item--selected']]:
                idx === (activeMinuteIndex ?? minutes.indexOf(selectedMinute)),
            })}
            onClick={() => handleMinuteClick(idx)}
            id={`${uid}-minute-${idx}`}
            role="option"
            aria-selected={m === selectedMinute}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
};

TimeWheel.displayName = 'TimeWheel';
