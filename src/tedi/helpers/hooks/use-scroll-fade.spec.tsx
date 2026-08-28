import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { useScrollFade, UseScrollFadeOptions } from './use-scroll-fade';

let resizeCallbacks: Map<Element, () => void>;

beforeEach(() => {
  resizeCallbacks = new Map();
  global.ResizeObserver = jest.fn().mockImplementation((cb: ResizeObserverCallback) => ({
    observe: jest.fn((el: Element) => {
      resizeCallbacks.set(el, () => cb([], {} as ResizeObserver));
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(() => {
      resizeCallbacks.clear();
    }),
  }));
});

const TestComponent = (props: UseScrollFadeOptions & { testId?: string }) => {
  const { testId = 'scrollable', ...options } = props;
  const { scrollRef, canScrollStart, canScrollEnd, handleScroll } = useScrollFade(options);

  return (
    <div>
      <div ref={scrollRef} onScroll={handleScroll} data-testid={testId}>
        Content
      </div>
      <span data-testid="start">{String(canScrollStart)}</span>
      <span data-testid="end">{String(canScrollEnd)}</span>
    </div>
  );
};

const mockElementScroll = (
  el: HTMLElement,
  values: {
    scrollTop?: number;
    scrollHeight?: number;
    clientHeight?: number;
    scrollLeft?: number;
    scrollWidth?: number;
    clientWidth?: number;
  }
) => {
  for (const [key, value] of Object.entries(values)) {
    Object.defineProperty(el, key, { value, configurable: true });
  }
};

describe('useScrollFade', () => {
  describe('vertical (default)', () => {
    it('returns false for both when content does not overflow', () => {
      render(<TestComponent />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollTop: 0, scrollHeight: 200, clientHeight: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(screen.getByTestId('start')).toHaveTextContent('false');
      expect(screen.getByTestId('end')).toHaveTextContent('false');
    });

    it('shows end fade when at top with overflow', () => {
      render(<TestComponent />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollTop: 0, scrollHeight: 500, clientHeight: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(screen.getByTestId('start')).toHaveTextContent('false');
      expect(screen.getByTestId('end')).toHaveTextContent('true');
    });

    it('shows both fades when scrolled to middle', () => {
      render(<TestComponent />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollTop: 100, scrollHeight: 500, clientHeight: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(screen.getByTestId('start')).toHaveTextContent('true');
      expect(screen.getByTestId('end')).toHaveTextContent('true');
    });

    it('shows only start fade when scrolled to end', () => {
      render(<TestComponent />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollTop: 300, scrollHeight: 500, clientHeight: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(screen.getByTestId('start')).toHaveTextContent('true');
      expect(screen.getByTestId('end')).toHaveTextContent('false');
    });

    it('calls onScrollToStart when at start', () => {
      const onScrollToStart = jest.fn();
      render(<TestComponent onScrollToStart={onScrollToStart} />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollTop: 0, scrollHeight: 500, clientHeight: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(onScrollToStart).toHaveBeenCalled();
    });

    it('calls onScrollToEnd when at end', () => {
      const onScrollToEnd = jest.fn();
      render(<TestComponent onScrollToEnd={onScrollToEnd} />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollTop: 300, scrollHeight: 500, clientHeight: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(onScrollToEnd).toHaveBeenCalled();
    });
  });

  describe('horizontal', () => {
    it('shows end fade when at start with overflow', () => {
      render(<TestComponent direction="horizontal" />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollLeft: 0, scrollWidth: 500, clientWidth: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(screen.getByTestId('start')).toHaveTextContent('false');
      expect(screen.getByTestId('end')).toHaveTextContent('true');
    });

    it('shows both fades when scrolled to middle', () => {
      render(<TestComponent direction="horizontal" />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollLeft: 100, scrollWidth: 500, clientWidth: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(screen.getByTestId('start')).toHaveTextContent('true');
      expect(screen.getByTestId('end')).toHaveTextContent('true');
    });

    it('shows only start fade when scrolled to end', () => {
      render(<TestComponent direction="horizontal" />);
      const el = screen.getByTestId('scrollable');
      mockElementScroll(el, { scrollLeft: 300, scrollWidth: 500, clientWidth: 200 });

      act(() => {
        resizeCallbacks.forEach((cb) => cb());
      });

      expect(screen.getByTestId('start')).toHaveTextContent('true');
      expect(screen.getByTestId('end')).toHaveTextContent('false');
    });
  });
});
