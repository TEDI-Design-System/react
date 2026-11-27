import { render, screen } from '@testing-library/react';
import { act } from 'react';

import Ellipsis, { EllipsisProps } from './ellipsis';

import '@testing-library/jest-dom';

describe('Ellipsis Component', () => {
  const renderEllipsis = (props: Partial<EllipsisProps> = {}) => {
    return render(
      <Ellipsis {...props}>
        <p>Ellipsis content</p>
      </Ellipsis>
    );
  };

  it('renders the component', () => {
    const { getByText } = renderEllipsis();
    expect(getByText('Ellipsis content')).toBeInTheDocument();
  });

  it('applies default lineClamp value (2)', () => {
    const { container } = renderEllipsis();
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toHaveStyle({ 'line-clamp': '2' });
  });

  it('applies custom lineClamp value', () => {
    const { container } = renderEllipsis({ lineClamp: 3 });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toHaveStyle({ 'line-clamp': '3' });
  });

  it('renders with popover when content overflows', () => {
    const { container } = renderEllipsis({ popover: true });
    const popoverTrigger = container.querySelector('[data-name="ellipsis"]');
    expect(popoverTrigger).toBeInTheDocument();
  });

  it('does not render popover when popover is false', () => {
    const { container } = renderEllipsis({ popover: false });
    expect(container.querySelector('Popover')).not.toBeInTheDocument();
  });

  it('applies additional props', () => {
    const { container } = renderEllipsis({ className: 'custom-class' });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toBeInTheDocument();
    expect(ellipsisElement).toHaveClass('custom-class');
  });

  it('updates state when content overflows', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);

    render(
      <Ellipsis>
        <p>Ellipsis content</p>
      </Ellipsis>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Ellipsis content');
  });

  it('does not show popover when content fits within container', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(50);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);

    render(
      <Ellipsis>
        <p>Ellipsis content</p>
      </Ellipsis>
    );

    expect(screen.getByText('Ellipsis content')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not apply a lineClamp style for the start position', () => {
    const { container } = renderEllipsis({ position: 'start' });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).not.toHaveStyle({ 'line-clamp': '2' });
  });

  it('detects horizontal overflow (scrollWidth) for the start position', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(200);
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);

    act(() => {
      renderEllipsis({ position: 'start' });
    });

    expect(screen.getByText('Ellipsis content')).toBeInTheDocument();
  });

  describe('resize observing', () => {
    const originalResizeObserver = global.ResizeObserver;
    const observe = jest.fn();
    const unobserve = jest.fn();
    let observerCallback: ResizeObserverCallback;

    beforeEach(() => {
      jest.restoreAllMocks();
      observe.mockClear();
      unobserve.mockClear();
      global.ResizeObserver = jest.fn((callback: ResizeObserverCallback) => {
        observerCallback = callback;
        return { observe, unobserve, disconnect: jest.fn() };
      }) as unknown as typeof ResizeObserver;
    });

    afterEach(() => {
      global.ResizeObserver = originalResizeObserver;
    });

    it('re-measures when the element is resized', () => {
      const scrollHeight = jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(50);
      jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);
      render(<Ellipsis>Ellipsis content</Ellipsis>);
      const element = screen.getByText('Ellipsis content').closest('[data-name="ellipsis"]') as HTMLElement;
      expect(element).not.toHaveAttribute('tabindex');

      scrollHeight.mockReturnValue(100);
      act(() => {
        observerCallback([{ target: element } as ResizeObserverEntry], {} as ResizeObserver);
      });

      expect(screen.getByText('Ellipsis content').closest('[data-name="ellipsis"]')).toHaveAttribute('tabindex', '0');
    });

    it('stops observing the element on unmount', () => {
      jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(50);
      jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);
      const { unmount } = render(<Ellipsis>Ellipsis content</Ellipsis>);
      expect(observe).toHaveBeenCalledTimes(1);

      unmount();

      expect(unobserve).toHaveBeenCalledTimes(1);
    });
  });
});
