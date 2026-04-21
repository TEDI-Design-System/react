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
}

export const TimeWheel: React.FC<TimeWheelProps> = ({
  hours,
  minutes,
  selectedHour,
  selectedMinute,
  onChange,
  className,
}) => {
  const uid = React.useId();
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const isProgrammaticScrollHour = useRef(false);
  const isProgrammaticScrollMinute = useRef(false);

  const scrollTimeoutHour = useRef<NodeJS.Timeout>();
  const scrollTimeoutMinute = useRef<NodeJS.Timeout>();

  const retryTimeoutHour = useRef<NodeJS.Timeout>();
  const retryTimeoutMinute = useRef<NodeJS.Timeout>();

  const lastHourIndex = useRef(-1);
  const lastMinuteIndex = useRef(-1);

  const clampIndex = (index: number, length: number) => Math.max(0, Math.min(length - 1, index));

  const forceScrollTo = (ref: React.RefObject<HTMLDivElement>, targetIndex: number, isHour: boolean, attempt = 0) => {
    const element = ref.current;
    if (!element || targetIndex < 0) return;

    const target = getScrollTopForIndex(targetIndex);
    const maxAttempts = 12;

    const tryScroll = () => {
      if (!element) return;

      isHour ? (isProgrammaticScrollHour.current = true) : (isProgrammaticScrollMinute.current = true);

      element.scrollTo({ top: target, behavior: 'instant' });

      requestAnimationFrame(() => {
        if (!element) return;

        const stillWrong = needsScrollCorrection(element.scrollTop, target, 3);

        if (stillWrong && attempt < maxAttempts) {
          const nextDelay = 16 + attempt * 20;
          if (isHour) {
            retryTimeoutHour.current = setTimeout(() => forceScrollTo(ref, targetIndex, true, attempt + 1), nextDelay);
          } else {
            retryTimeoutMinute.current = setTimeout(
              () => forceScrollTo(ref, targetIndex, false, attempt + 1),
              nextDelay
            );
          }
        } else {
          if (isHour) isProgrammaticScrollHour.current = false;
          else isProgrammaticScrollMinute.current = false;
        }
      });
    };

    tryScroll();
  };

  useLayoutEffect(() => {
    const hourIndex = hours.indexOf(selectedHour);
    const minuteIndex = minutes.indexOf(selectedMinute);

    lastHourIndex.current = hourIndex;
    lastMinuteIndex.current = minuteIndex;

    if (retryTimeoutHour.current) clearTimeout(retryTimeoutHour.current);
    if (retryTimeoutMinute.current) clearTimeout(retryTimeoutMinute.current);

    isProgrammaticScrollHour.current = false;
    isProgrammaticScrollMinute.current = false;

    const initializeScrollPosition = () => {
      forceScrollTo(hourRef, hourIndex, true);
      forceScrollTo(minuteRef, minuteIndex, false);
    };

    requestAnimationFrame(() => {
      initializeScrollPosition();
    });

    return () => {
      if (retryTimeoutHour.current) clearTimeout(retryTimeoutHour.current);
      if (retryTimeoutMinute.current) clearTimeout(retryTimeoutMinute.current);
    };
  }, [hours, minutes, selectedHour, selectedMinute]);

  const handleHourScroll = () => {
    if (!hourRef.current || isProgrammaticScrollHour.current) return;

    const index = clampIndex(snapToNearestItem(hourRef.current.scrollTop, hours.length), hours.length);

    if (index !== lastHourIndex.current) {
      lastHourIndex.current = index;
      onChange(hours[index]!, selectedMinute);
    }

    clearScrollTimeout(scrollTimeoutHour.current);
    scrollTimeoutHour.current = setTimeout(() => {
      if (!hourRef.current) return;
      const target = getScrollTopForIndex(index);
      if (needsScrollCorrection(hourRef.current.scrollTop, target, 4)) {
        isProgrammaticScrollHour.current = true;
        scrollToIndex(hourRef.current, index);
        setTimeout(() => {
          isProgrammaticScrollHour.current = false;
        }, 50);
      }
    }, 100);
  };

  const handleMinuteScroll = () => {
    if (!minuteRef.current || isProgrammaticScrollMinute.current) return;

    const index = clampIndex(snapToNearestItem(minuteRef.current.scrollTop, minutes.length), minutes.length);

    if (index !== lastMinuteIndex.current) {
      lastMinuteIndex.current = index;
      onChange(selectedHour, minutes[index]!);
    }

    clearScrollTimeout(scrollTimeoutMinute.current);
    scrollTimeoutMinute.current = setTimeout(() => {
      if (!minuteRef.current) return;
      const target = getScrollTopForIndex(index);
      if (needsScrollCorrection(minuteRef.current.scrollTop, target, 4)) {
        isProgrammaticScrollMinute.current = true;
        scrollToIndex(minuteRef.current, index);
        setTimeout(() => {
          isProgrammaticScrollMinute.current = false;
        }, 50);
      }
    }, 100);
  };

  const handleHourClick = (index: number) => {
    const hour = hours[index];
    if (!hour || !hourRef.current) return;

    clearScrollTimeout(scrollTimeoutHour.current);
    onChange(hour, selectedMinute);
    lastHourIndex.current = index;

    isProgrammaticScrollHour.current = true;
    scrollToIndex(hourRef.current, index, 'smooth');
    setTimeout(() => {
      isProgrammaticScrollHour.current = false;
    }, 350);
  };

  const handleMinuteClick = (index: number) => {
    const minute = minutes[index];
    if (!minute || !minuteRef.current) return;

    clearScrollTimeout(scrollTimeoutMinute.current);
    onChange(selectedHour, minute);
    lastMinuteIndex.current = index;

    isProgrammaticScrollMinute.current = true;
    scrollToIndex(minuteRef.current, index, 'smooth');
    setTimeout(() => {
      isProgrammaticScrollMinute.current = false;
    }, 350);
  };

  const handleColumnKeyDown =
    (type: 'hour' | 'minute', list: string[], selected: string, onSelect: (v: string) => void) =>
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = list.indexOf(selected);
      if (currentIndex === -1) return;

      let nextIndex = -1;

      switch (event.key) {
        case 'ArrowDown':
          nextIndex = Math.min(currentIndex + 1, list.length - 1);
          break;

        case 'ArrowUp':
          nextIndex = Math.max(currentIndex - 1, 0);
          break;

        case 'Home':
          nextIndex = 0;
          break;

        case 'End':
          nextIndex = list.length - 1;
          break;

        case 'PageDown':
          nextIndex = Math.min(currentIndex + 5, list.length - 1);
          break;

        case 'PageUp':
          nextIndex = Math.max(currentIndex - 5, 0);
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

      const el = document.getElementById(`${type}-${nextIndex}`);
      el?.focus();
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    };

  useEffect(() => {
    return () => {
      clearScrollTimeout(scrollTimeoutHour.current);
      clearScrollTimeout(scrollTimeoutMinute.current);
      if (retryTimeoutHour.current) clearTimeout(retryTimeoutHour.current);
      if (retryTimeoutMinute.current) clearTimeout(retryTimeoutMinute.current);
    };
  }, []);

  return (
    <div className={cn(styles['tedi-time-picker__wheel'], className)}>
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
              [styles['tedi-time-picker__wheel-item--selected']]: h === selectedHour,
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
              [styles['tedi-time-picker__wheel-item--selected']]: m === selectedMinute,
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
