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
  const isFocused = !!props.selectProps.menuIsOpen || !!(props.selectProps as { isFocused?: boolean }).isFocused;
  const inputValue = props.selectProps.inputValue ?? '';

  const selected = (props.selectProps.value as ReadonlyArray<ISelectOption> | null) ?? [];
  const totalCount = Array.isArray(selected) ? selected.length : 0;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastMeasuredWidthRef = useRef<number>(0);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!isSingleRow) {
      if (visibleCount !== null) setVisibleCount(null);
      return;
    }
    setVisibleCount(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSingleRow, totalCount, isFocused, inputValue]);

  useEffect(() => {
    if (!isSingleRow) return;
    const container = containerRef.current;
    if (!container) return;
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const newWidth = entries[0]?.contentRect.width ?? 0;
      if (newWidth > 0 && newWidth !== lastMeasuredWidthRef.current) {
        setVisibleCount(null);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [isSingleRow]);

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

    const inputEl = container.querySelector<HTMLElement>('.select__input-container');
    let inputReserve = 0;
    if (inputEl) {
      const rendered = inputEl.offsetWidth;
      const minWidth = parseFloat(getComputedStyle(inputEl).minWidth) || 0;
      inputReserve = Math.max(rendered, minWidth);
    }

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

    if (visible === 0 && tags.length > 0) {
      visible = 1;
    }

    lastMeasuredWidthRef.current = containerWidth;
    setVisibleCount(visible);
  }, [isSingleRow, visibleCount, totalCount]);

  const hiddenCount = isSingleRow && visibleCount !== null ? Math.max(0, totalCount - visibleCount) : 0;

  const ctxValue = useMemo(() => ({ isSingleRow, visibleCount }), [isSingleRow, visibleCount]);
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
