import { render, renderHook } from '@testing-library/react';
import React from 'react';

import { StyleProvider } from '../../providers/style-provider/style-provider';
import { lockElementScroll, useScrollContainerLock } from './use-scroll-container-lock';

describe('lockElementScroll', () => {
  it('hides overflow and restores the previous value', () => {
    const element = document.createElement('div');
    element.style.overflow = 'auto';

    const unlock = lockElementScroll(element);
    expect(element.style.overflow).toBe('hidden');

    unlock();
    expect(element.style.overflow).toBe('auto');
  });

  it('applies the given overflow value', () => {
    const element = document.createElement('div');

    const unlock = lockElementScroll(element, 'scroll');
    expect(element.style.overflow).toBe('scroll');

    unlock();
    expect(element.style.overflow).toBe('');
  });

  it('keeps the element locked until the last lock is released', () => {
    const element = document.createElement('div');

    const unlockFirst = lockElementScroll(element);
    const unlockSecond = lockElementScroll(element);

    unlockFirst();
    expect(element.style.overflow).toBe('hidden');

    unlockSecond();
    expect(element.style.overflow).toBe('');
  });
});

describe('useScrollContainerLock', () => {
  const wrapperFor = (scrollContainer?: HTMLElement | null) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <StyleProvider scrollContainer={scrollContainer}>{children}</StyleProvider>
    );

    return Wrapper;
  };

  it('returns false and locks nothing without a scroll container', () => {
    const { result } = renderHook(() => useScrollContainerLock(true));

    expect(result.current).toBe(false);
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('locks the scroll container while active and restores it afterwards', () => {
    const container = document.createElement('div');
    const { result, rerender } = renderHook(({ active }) => useScrollContainerLock(active), {
      initialProps: { active: true },
      wrapper: wrapperFor(container),
    });

    expect(result.current).toBe(true);
    expect(container.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('');

    rerender({ active: false });
    expect(container.style.overflow).toBe('');
  });

  it('releases the lock on unmount', () => {
    const container = document.createElement('div');
    const Locker = () => {
      useScrollContainerLock(true);
      return null;
    };
    const { unmount } = render(
      <StyleProvider scrollContainer={container}>
        <Locker />
      </StyleProvider>
    );

    expect(container.style.overflow).toBe('hidden');
    unmount();
    expect(container.style.overflow).toBe('');
  });

  it('returns true but locks nothing while the scroll container is pending', () => {
    const { result } = renderHook(() => useScrollContainerLock(true), { wrapper: wrapperFor(null) });

    expect(result.current).toBe(true);
    expect(document.documentElement.style.overflow).toBe('');
  });
});
