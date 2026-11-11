import { useContext, useEffect } from 'react';

import { StyleContext } from '../../providers/style-provider/style-provider';

const locks = new WeakMap<HTMLElement, { count: number; overflow: string }>();

/**
 * Locks the scroll of an element and returns a function that undoes it.
 * Locks on the same element stack: the original `overflow` is restored when the last one is released.
 */
export const lockElementScroll = (element: HTMLElement, overflow: 'hidden' | 'scroll' = 'hidden'): (() => void) => {
  const lock = locks.get(element) ?? { count: 0, overflow: element.style.overflow };

  if (lock.count === 0) {
    element.style.overflow = overflow;
  }

  lock.count += 1;
  locks.set(element, lock);

  return () => {
    lock.count -= 1;

    if (lock.count === 0) {
      element.style.overflow = lock.overflow;
      locks.delete(element);
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
