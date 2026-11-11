import { useContext, useEffect } from 'react';

import { StyleContext } from '../../providers/style-provider/style-provider';

type SavedAxis = { value: string; priority: string };
type Lock = { count: number; all: SavedAxis; x: SavedAxis; y: SavedAxis };

const locks = new WeakMap<HTMLElement, Lock>();

const saveAxis = (element: HTMLElement, property: 'overflow' | 'overflow-x' | 'overflow-y'): SavedAxis => ({
  value: element.style.getPropertyValue(property),
  priority: element.style.getPropertyPriority(property),
});

const restoreAxis = (element: HTMLElement, property: 'overflow' | 'overflow-x' | 'overflow-y', saved: SavedAxis) => {
  if (saved.value) {
    element.style.setProperty(property, saved.value, saved.priority);
  } else {
    element.style.removeProperty(property);
  }
};

/**
 * Locks the scroll of an element and returns a function that undoes it.
 * Locks on the same element stack: the original `overflow-x` and `overflow-y` are restored when the last one
 * is released, unless something else changed the overflow in the meantime (for example another library's lock).
 */
export const lockElementScroll = (element: HTMLElement, overflow: 'hidden' | 'scroll' = 'hidden'): (() => void) => {
  const lock = locks.get(element) ?? {
    count: 0,
    all: saveAxis(element, 'overflow'),
    x: saveAxis(element, 'overflow-x'),
    y: saveAxis(element, 'overflow-y'),
  };

  if (lock.count === 0) {
    element.style.overflow = overflow;
  }

  lock.count += 1;
  locks.set(element, lock);

  return () => {
    lock.count -= 1;

    if (lock.count > 0) return;

    locks.delete(element);

    if (element.style.overflow === overflow) {
      restoreAxis(element, 'overflow', lock.all);
      restoreAxis(element, 'overflow-x', lock.x);
      restoreAxis(element, 'overflow-y', lock.y);
    }
  };
};

/**
 * Locks the `scrollContainer` of the `StyleProvider` while `active`.
 * Returns `true` when a scroll container is configured (also while it is still `null`),
 * which means the host document must not be locked.
 */
export const useScrollContainerLock = (active: boolean): boolean => {
  const { scrollContainer } = useContext(StyleContext);

  useEffect(() => {
    if (!active || !scrollContainer) return undefined;

    return lockElementScroll(scrollContainer);
  }, [active, scrollContainer]);

  return scrollContainer !== undefined;
};
