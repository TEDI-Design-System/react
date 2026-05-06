import cn from 'classnames';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { components as ReactSelectComponents, ValueContainerProps } from 'react-select';

import { Tag } from '../../../tags/tag/tag';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';
import { SelectTagsContext } from './select-tags-context';

const TAG_GAP_PX = 8;
const COUNTER_TAG_WIDTH_PX = 40;

type Props = ValueContainerProps<ISelectOption, boolean> & {
  selectProps: ValueContainerProps<ISelectOption, boolean>['selectProps'] & { tagsDirection?: 'row' | 'stack' };
};

export const SelectValueContainer = ({ children, ...props }: Props) => {
  const tagsDirection = props.selectProps.tagsDirection;
  const isMulti = props.isMulti;
  const isSingleRow = !!isMulti && tagsDirection === 'row';
  // Re-measure whenever the focus state flips — react-select inflates the
  // input's min-width from ~2px to 5rem on focus (see select.module.scss).
  // Without this trigger the visibleCount calculated in the unfocused state
  // would still be in effect after focus, causing the now-too-wide input to
  // push the last visible tag and the +N counter past the container's right
  // edge.
  const isFocused = !!props.selectProps.menuIsOpen || !!(props.selectProps as { isFocused?: boolean }).isFocused;
  // Re-measure when the typed input string changes — the input grows with
  // content past its min-width, so a static measurement taken when the input
  // was empty is no longer accurate once the user types.
  const inputValue = props.selectProps.inputValue ?? '';

  const selected = (props.selectProps.value as ReadonlyArray<ISelectOption> | null) ?? [];
  const totalCount = Array.isArray(selected) ? selected.length : 0;

  const containerRef = useRef<HTMLDivElement | null>(null);
  // Width seen by the most recent measurement pass. We compare against this
  // inside the ResizeObserver so contents-only reflows (e.g. tags coming
  // back when we reset to null) don't ping-pong us into a re-measure loop.
  const lastMeasuredWidthRef = useRef<number>(0);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  // Reset measurement whenever inputs that affect available space change:
  // selection count (more / fewer tags to lay out), focus state (input min
  // jumps between ~2px and 5rem), or typed input string (input grows with
  // content). Each of these can change the layout enough that a previously
  // computed visibleCount no longer fits.
  useLayoutEffect(() => {
    if (!isSingleRow) {
      if (visibleCount !== null) setVisibleCount(null);
      return;
    }
    setVisibleCount(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSingleRow, totalCount, isFocused, inputValue]);

  // Re-measure when the container actually changes width (browser resize,
  // parent layout shift, etc.). Without this the `+N` counter only matches
  // the layout that existed at first paint — narrowing the window after
  // load would leave overflow tags visibly clipping or push more rows in
  // than fit. We compare the new contentRect width against the last value
  // we measured at, so reflows triggered by our own setState don't loop.
  useEffect(() => {
    if (!isSingleRow) return;
    const container = containerRef.current;
    if (!container) return;
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const newWidth = entries[0]?.contentRect.width ?? 0;
      if (newWidth > 0 && newWidth !== lastMeasuredWidthRef.current) {
        // Triggers the measurement pass below via the visibleCount === null
        // branch; that pass updates `lastMeasuredWidthRef`.
        setVisibleCount(null);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [isSingleRow]);

  // Measure rendered tags after the reset render and compute how many fit.
  useLayoutEffect(() => {
    if (!isSingleRow || visibleCount !== null) return;
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    if (containerWidth === 0) return;

    const tags = container.querySelectorAll<HTMLElement>('[data-tedi-tag-index]');
    if (tags.length === 0) {
      lastMeasuredWidthRef.current = containerWidth;
      setVisibleCount(0);
      return;
    }

    // Reserve the input's actual rendered width (not just its min-width) so
    // we account for content the user may have typed. Fall back to min-width
    // when the input hasn't been laid out yet.
    const inputEl = container.querySelector<HTMLElement>('.select__input-container');
    let inputReserve = 0;
    if (inputEl) {
      const rendered = inputEl.offsetWidth;
      const minWidth = parseFloat(getComputedStyle(inputEl).minWidth) || 0;
      inputReserve = Math.max(rendered, minWidth);
    }
    // Reserve the gap between the last-visible-tag-or-counter and the input
    // too — without this we underestimate by TAG_GAP_PX, letting the layout
    // overflow by exactly one gap (visible as the rightmost tag clipping
    // into the input area, which from a user's vantage looks like the first
    // tags being pushed under the input).
    const available = containerWidth - inputReserve - TAG_GAP_PX;

    let usedWidth = 0;
    let visible = 0;
    for (let i = 0; i < tags.length; i++) {
      const tagWidth = tags[i].offsetWidth;
      const hasMore = i < tags.length - 1;
      const reserved = hasMore ? COUNTER_TAG_WIDTH_PX + TAG_GAP_PX : 0;
      const needed = usedWidth + tagWidth + (visible > 0 ? TAG_GAP_PX : 0);
      if (needed + reserved <= available) {
        usedWidth = needed;
        visible++;
      } else {
        break;
      }
    }
    if (visible === 0) visible = 1;
    lastMeasuredWidthRef.current = containerWidth;
    setVisibleCount(visible);
  }, [isSingleRow, visibleCount, totalCount]);

  const hiddenCount = isSingleRow && visibleCount !== null ? Math.max(0, totalCount - visibleCount) : 0;

  const ctxValue = useMemo(() => ({ isSingleRow, visibleCount }), [isSingleRow, visibleCount]);

  // react-select renders children as [...MultiValues, Input]. Inject the
  // `+N` Tag before the input so the visual order is: tags → counter → input.
  const childrenArray = React.Children.toArray(children);
  const lastIndex = childrenArray.length > 0 ? childrenArray.length - 1 : -1;
  const beforeInput = lastIndex >= 0 ? childrenArray.slice(0, lastIndex) : [];
  const inputChild = lastIndex >= 0 ? childrenArray[lastIndex] : null;

  return (
    <SelectTagsContext.Provider value={ctxValue}>
      <ReactSelectComponents.ValueContainer
        {...props}
        innerProps={{
          ...props.innerProps,
          ref: (el: HTMLDivElement | null) => {
            containerRef.current = el;
          },
        }}
        className={cn(styles['tedi-select__value-container'], props.className)}
      >
        {beforeInput}
        {hiddenCount > 0 && (
          <Tag color="primary" className={styles['tedi-select__overflow-tag']}>
            +{hiddenCount}
          </Tag>
        )}
        {inputChild}
      </ReactSelectComponents.ValueContainer>
    </SelectTagsContext.Provider>
  );
};

SelectValueContainer.displayName = 'SelectValueContainer';
