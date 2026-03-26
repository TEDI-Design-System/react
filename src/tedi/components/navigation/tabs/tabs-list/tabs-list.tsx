import cn from 'classnames';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useScrollFade } from '../../../../helpers';
import { useLabels } from '../../../../providers/label-provider';
import { Icon } from '../../../base/icon/icon';
import Print, { PrintProps } from '../../../misc/print/print';
import { Dropdown } from '../../../overlays/dropdown/dropdown';
import styles from '../tabs.module.scss';
import { useTabsContext } from '../tabs-context';

export interface TabsListProps {
  /**
   * Tab trigger elements
   */
  children: React.ReactNode;
  /**
   * Additional class name(s)
   */
  className?: string;
  /**
   * Accessible label for the tablist
   */
  'aria-label'?: string;
  /**
   * ID of element labelling the tablist
   */
  'aria-labelledby'?: string;
  /**
   * Controls visibility when printing
   * @default 'show'
   */
  printVisibility?: PrintProps['visibility'];
  /**
   * How to handle tab overflow when tabs don't fit in available space.
   * - 'dropdown': Shows a dropdown button containing overflowing tabs (default)
   * - 'scroll': Enables horizontal scrolling with a fade indicator
   * @default 'dropdown'
   */
  overflowMode?: 'dropdown' | 'scroll';
}

interface OverflowItem {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export const TabsList = (props: TabsListProps) => {
  const {
    children,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    printVisibility = 'show',
    overflowMode = 'dropdown',
  } = props;

  const { getLabel } = useLabels();
  const { currentTab, setCurrentTab } = useTabsContext();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const isOverflowingRef = useRef(false);
  const naturalWidthRef = useRef(0);

  isOverflowingRef.current = isOverflowing;

  const {
    scrollRef,
    canScrollStart: canScrollLeft,
    canScrollEnd: canScrollRight,
    handleScroll,
  } = useScrollFade({ direction: 'horizontal' });

  const mergedListRef = useCallback(
    (node: HTMLDivElement | null) => {
      (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (overflowMode === 'scroll') {
        scrollRef(node);
      }
    },
    [overflowMode, scrollRef]
  );

  const childArray = React.useMemo(() => {
    return React.Children.toArray(children).filter(React.isValidElement);
  }, [children]);

  const allItems = React.useMemo(() => {
    const result: OverflowItem[] = [];
    childArray.forEach((child) => {
      const triggerProps = child.props as { id: string; children: React.ReactNode; disabled?: boolean };
      result.push({ id: triggerProps.id, label: triggerProps.children, disabled: triggerProps.disabled });
    });
    return result;
  }, [childArray]);

  const showMore = overflowMode === 'dropdown' && isOverflowing && allItems.length > 1;
  const dropdownItems = allItems.filter((item) => item.id !== currentTab);

  const handleMoreSelect = (id: string) => {
    if (id) {
      setCurrentTab(id);
    }
  };

  // Capture natural width when all tabs are visible and check for overflow synchronously
  useLayoutEffect(() => {
    if (overflowMode !== 'dropdown') return;
    const list = listRef.current;
    if (!list || isOverflowingRef.current) return;

    naturalWidthRef.current = list.scrollWidth;
    if (list.scrollWidth > list.clientWidth && list.clientWidth > 0) {
      setIsOverflowing(true);
    }
  }, [overflowMode, isOverflowing, childArray]);

  // ResizeObserver for "dropdown" mode overflow detection
  useEffect(() => {
    if (overflowMode !== 'dropdown') return;
    const wrapper = wrapperRef.current;
    const list = listRef.current;
    if (!wrapper || !list) return;

    const checkOverflow = () => {
      if (isOverflowingRef.current) {
        if (naturalWidthRef.current <= wrapper.clientWidth) {
          setIsOverflowing(false);
        }
      } else {
        if (list.scrollWidth > list.clientWidth && list.clientWidth > 0) {
          naturalWidthRef.current = list.scrollWidth;
          setIsOverflowing(true);
        }
      }
    };

    const ro = new ResizeObserver(checkOverflow);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [overflowMode]);

  return (
    <Print visibility={printVisibility}>
      <div
        ref={wrapperRef}
        className={cn(styles['tedi-tabs__list-wrapper'], {
          [styles['tedi-tabs__list-wrapper--scroll-fade-left']]: overflowMode === 'scroll' && canScrollLeft,
          [styles['tedi-tabs__list-wrapper--scroll-fade-right']]: overflowMode === 'scroll' && canScrollRight,
        })}
      >
        <div
          ref={mergedListRef}
          data-name="tabs-list"
          role="tablist"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(
            styles['tedi-tabs__list'],
            { [styles['tedi-tabs__list--overflow']]: showMore },
            { [styles['tedi-tabs__list--scroll']]: overflowMode === 'scroll' },
            className
          )}
          onScroll={overflowMode === 'scroll' ? handleScroll : undefined}
        >
          {children}
        </div>
        {showMore && (
          <div className={styles['tedi-tabs__more-wrapper']}>
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger>
                <button data-name="tabs-more-btn" type="button" className={styles['tedi-tabs__more-btn']}>
                  {getLabel('tabs.more')}
                  <Icon name="expand_more" size={18} />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {dropdownItems.map((item, index) => (
                  <Dropdown.Item
                    key={item.id}
                    index={index}
                    disabled={item.disabled}
                    onClick={() => handleMoreSelect(item.id)}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </div>
        )}
      </div>
    </Print>
  );
};

TabsList.displayName = 'TabsList';

export default TabsList;
