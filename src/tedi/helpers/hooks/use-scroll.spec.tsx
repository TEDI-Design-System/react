import { act, renderHook } from '@testing-library/react';
import React from 'react';

import { StyleProvider } from '../../providers/style-provider/style-provider';
import { useScroll } from './use-scroll';

jest.mock('lodash-es/throttle', () => ({
  __esModule: true,
  default: (fn: () => void) => Object.assign(fn, { cancel: jest.fn() }),
}));

const createScrollable = (scrollTop: number) => {
  const element = document.createElement('div');
  Object.defineProperties(element, {
    scrollTop: { value: scrollTop, writable: true },
    scrollHeight: { value: 1000 },
    clientHeight: { value: 200 },
  });
  return element;
};

describe('useScroll', () => {
  const wrapperFor = (scrollContainer?: HTMLElement | null) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <StyleProvider scrollContainer={scrollContainer}>{children}</StyleProvider>
    );

    return Wrapper;
  };

  it('reads the explicit element', () => {
    const element = createScrollable(40);
    const { result } = renderHook(() => useScroll(element));

    expect(result.current).toEqual({ scrollTop: 40, scrollHeight: 1000, clientHeight: 200 });
  });

  it('reads the StyleProvider scroll container and follows its scroll events', () => {
    const container = createScrollable(10);
    const { result } = renderHook(() => useScroll(), { wrapper: wrapperFor(container) });

    expect(result.current.scrollTop).toBe(10);

    act(() => {
      (container as unknown as { scrollTop: number }).scrollTop = 250;
      container.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrollTop).toBe(250);
  });

  it('prefers the explicit element over the StyleProvider scroll container', () => {
    const element = createScrollable(5);
    const container = createScrollable(90);
    const { result } = renderHook(() => useScroll(element), { wrapper: wrapperFor(container) });

    expect(result.current.scrollTop).toBe(5);
  });

  it('does nothing while the scroll container is pending', () => {
    const { result } = renderHook(() => useScroll(), { wrapper: wrapperFor(null) });

    expect(result.current).toEqual({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 });
  });
});
