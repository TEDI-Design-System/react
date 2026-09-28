import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Breakpoint } from '../../../helpers';
import { FloatingButton } from '../../buttons/floating-button/floating-button';
import { Carousel } from './carousel';

const mockUseBreakpoint = jest.fn<Breakpoint, []>(() => 'lg');

jest.mock('../../../helpers/hooks/use-breakpoint', () => ({
  __esModule: true,
  ...jest.requireActual('../../../helpers/hooks/use-breakpoint'),
  useBreakpoint: () => mockUseBreakpoint(),
}));

const originalResizeObserver = global.ResizeObserver;
const originalSetPointerCapture = Element.prototype.setPointerCapture;
const originalReleasePointerCapture = Element.prototype.releasePointerCapture;
let resizeObserverCallback: ResizeObserverCallback;

beforeAll(() => {
  class MockResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      resizeObserverCallback = callback;
    }
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  }
  global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
  Element.prototype.setPointerCapture = jest.fn();
  Element.prototype.releasePointerCapture = jest.fn();
});

afterAll(() => {
  global.ResizeObserver = originalResizeObserver;
  Element.prototype.setPointerCapture = originalSetPointerCapture;
  Element.prototype.releasePointerCapture = originalReleasePointerCapture;
});

beforeEach(() => {
  mockUseBreakpoint.mockReturnValue('lg');
});

const renderCarousel = (count = 3, props?: React.ComponentProps<typeof Carousel.Content>) =>
  render(
    <Carousel>
      <Carousel.Header>
        <span>Title</span>
      </Carousel.Header>
      <Carousel.Content {...props}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i}>Slide {i + 1}</div>
        ))}
      </Carousel.Content>
      <Carousel.Footer>
        <Carousel.Indicators />
        <Carousel.Navigation />
      </Carousel.Footer>
    </Carousel>
  );

const activeDotIndex = (): number =>
  screen
    .getAllByRole('button', { name: 'carousel.show-slide' })
    .findIndex((dot) => dot.getAttribute('aria-current') === 'true');

describe('Carousel', () => {
  it('renders a carousel region with an accessible name', () => {
    renderCarousel();
    const region = screen.getByRole('region', { name: 'carousel' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    expect(region).toHaveAttribute('aria-live', 'off');
  });

  it('uses a custom ariaLabel as the region name (distinguishes multiple carousels)', () => {
    render(
      <Carousel ariaLabel="Uudised">
        <Carousel.Content>
          <div>Slide 1</div>
        </Carousel.Content>
      </Carousel>
    );
    expect(screen.getByRole('region', { name: 'Uudised' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'carousel' })).not.toBeInTheDocument();
  });

  it('falls back to the localized label when ariaLabel is blank', () => {
    render(
      <Carousel ariaLabel="   ">
        <Carousel.Content>
          <div>Slide 1</div>
        </Carousel.Content>
      </Carousel>
    );
    expect(screen.getByRole('region', { name: 'carousel' })).toBeInTheDocument();
  });

  it('exposes only the slides in view as groups (default 1 per view)', () => {
    renderCarousel(3);
    expect(screen.getAllByRole('group')).toHaveLength(1);
  });

  it('shows more groups when slidesPerView is increased via a breakpoint object', () => {
    renderCarousel(5, { slidesPerView: { xs: 3 } });
    // ceil(3) visible slides become groups
    expect(screen.getAllByRole('group')).toHaveLength(3);
  });

  it('renders one dot indicator per slide', () => {
    renderCarousel(4);
    expect(screen.getAllByRole('button', { name: 'carousel.show-slide' })).toHaveLength(4);
  });

  it('renders prev / next navigation buttons', () => {
    renderCarousel();
    expect(screen.getByRole('button', { name: 'carousel.move-back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'carousel.move-forward' })).toBeInTheDocument();
  });

  it('advances and goes back, wrapping around', () => {
    jest.useFakeTimers();
    try {
      renderCarousel(3);
      const next = screen.getByRole('button', { name: 'carousel.move-forward' });
      const back = screen.getByRole('button', { name: 'carousel.move-back' });
      const advance = () => act(() => jest.advanceTimersByTime(400));

      expect(activeDotIndex()).toBe(0);
      fireEvent.click(next);
      expect(activeDotIndex()).toBe(1);
      advance();
      fireEvent.click(back);
      expect(activeDotIndex()).toBe(0);
      advance();
      fireEvent.click(back);
      expect(activeDotIndex()).toBe(2);
    } finally {
      jest.useRealTimers();
    }
  });

  it('moves to a slide when its indicator is clicked', () => {
    renderCarousel(4);
    fireEvent.click(screen.getAllByRole('button', { name: 'carousel.show-slide' })[2]);
    expect(activeDotIndex()).toBe(2);
  });

  it('supports the numbers indicator variant', () => {
    render(
      <Carousel>
        <Carousel.Content>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i}>Slide {i + 1}</div>
          ))}
        </Carousel.Content>
        <Carousel.Footer>
          <Carousel.Indicators variant="numbers" withArrows />
        </Carousel.Footer>
      </Carousel>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/\/ 3/)).toBeInTheDocument();
  });

  it('navigates with the keyboard (arrows, Home, End)', () => {
    jest.useFakeTimers();
    try {
      renderCarousel(4);
      const region = screen.getByRole('region', { name: 'carousel' });
      const advance = () => act(() => jest.advanceTimersByTime(400));

      fireEvent.keyDown(region, { key: 'ArrowRight' });
      expect(activeDotIndex()).toBe(1);
      advance();
      fireEvent.keyDown(region, { key: 'ArrowLeft' });
      expect(activeDotIndex()).toBe(0);
      advance();
      fireEvent.keyDown(region, { key: 'End' });
      expect(activeDotIndex()).toBe(3);
      advance();
      fireEvent.keyDown(region, { key: 'Home' });
      expect(activeDotIndex()).toBe(0);
    } finally {
      jest.useRealTimers();
    }
  });

  it('handles a pointer drag without breaking the carousel', () => {
    renderCarousel(4);
    const region = screen.getByRole('region', { name: 'carousel' });

    fireEvent.pointerDown(region, { clientX: 300, pointerId: 1 });
    fireEvent.pointerMove(region, { clientX: 284, pointerId: 1 });
    fireEvent.pointerUp(region, { pointerId: 1 });

    expect(screen.getAllByRole('button', { name: 'carousel.show-slide' })).toHaveLength(4);
    expect(activeDotIndex()).toBeGreaterThanOrEqual(0);
  });

  it('handles wheel scrolling and snaps after settling', () => {
    jest.useFakeTimers();
    try {
      renderCarousel(5);
      const region = screen.getByRole('region', { name: 'carousel' });
      fireEvent.wheel(region, { deltaX: 200, deltaY: 0 });
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(activeDotIndex()).toBeGreaterThan(0);
    } finally {
      jest.useRealTimers();
    }
  });

  it('settles the window base on transition end', () => {
    const { container } = renderCarousel(3);
    fireEvent.click(screen.getByRole('button', { name: 'carousel.move-forward' }));
    const track = container.querySelector('[class*="track"]') as HTMLElement;
    fireEvent.transitionEnd(track, { propertyName: 'transform' });
    expect(activeDotIndex()).toBe(1);
  });

  it('resets viewport scroll offset on scroll', () => {
    const { container } = renderCarousel(3);
    const region = screen.getByRole('region', { name: 'carousel' }) as HTMLElement;
    region.scrollLeft = 50;
    fireEvent.scroll(region);
    expect(region.scrollLeft).toBe(0);
    expect(container).toBeInTheDocument();
  });

  it('marks off-screen slides inert so their interactive content is not tabbable', () => {
    const { container } = render(
      <Carousel>
        <Carousel.Content slidesPerView={1}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i}>
              <button type="button">Action {i + 1}</button>
            </div>
          ))}
        </Carousel.Content>
      </Carousel>
    );

    const slideEls = container.querySelectorAll('[aria-roledescription="slide"]');
    const inertSlides = container.querySelectorAll('[aria-roledescription="slide"][inert]');
    expect(slideEls.length - inertSlides.length).toBe(1);
    expect(container.querySelector('[aria-current="true"]')).not.toHaveAttribute('inert');
  });

  it('throws when a sub-component is used outside Carousel', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      expect(() => render(<Carousel.Navigation />)).toThrow(/within a <Carousel>/);
    } finally {
      spy.mockRestore();
    }
  });

  describe('finite (loop={false})', () => {
    const renderFinite = (count = 3) =>
      render(
        <Carousel>
          <Carousel.Content loop={false} slidesPerView={1}>
            {Array.from({ length: count }, (_, i) => (
              <div key={i}>Slide {i + 1}</div>
            ))}
          </Carousel.Content>
          <Carousel.Navigation overlay />
        </Carousel>
      );

    it('renders each slide once (no looping duplicates)', () => {
      const { container } = renderFinite(3);
      expect(container.querySelectorAll('[aria-roledescription="slide"]')).toHaveLength(3);
    });

    it('disables prev at the start and next at the end', () => {
      jest.useFakeTimers();
      try {
        renderFinite(3);
        const back = screen.getByRole('button', { name: 'carousel.move-back' });
        const next = screen.getByRole('button', { name: 'carousel.move-forward' });
        const advance = () => act(() => jest.advanceTimersByTime(400));

        expect(back).toBeDisabled();
        expect(next).toBeEnabled();

        fireEvent.click(next);
        advance();
        expect(back).toBeEnabled();
        expect(next).toBeEnabled();

        fireEvent.click(next);
        advance();
        expect(next).toBeDisabled();
        expect(back).toBeEnabled();
      } finally {
        jest.useRealTimers();
      }
    });

    it('jumps to a clicked indicator, clamped to the bounds', () => {
      render(
        <Carousel>
          <Carousel.Content loop={false} slidesPerView={1}>
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i}>Slide {i + 1}</div>
            ))}
          </Carousel.Content>
          <Carousel.Footer>
            <Carousel.Indicators />
          </Carousel.Footer>
        </Carousel>
      );
      fireEvent.click(screen.getAllByRole('button', { name: 'carousel.show-slide' })[2]);
      expect(activeDotIndex()).toBe(2);
    });

    it('renders custom navigation buttons via renderButton with the wiring intact', () => {
      render(
        <Carousel>
          <Carousel.Content loop={false} slidesPerView={1}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i}>Slide {i + 1}</div>
            ))}
          </Carousel.Content>
          <Carousel.Navigation
            overlay
            renderButton={({ buttonProps }) => <FloatingButton {...buttonProps} position="static" />}
          />
        </Carousel>
      );

      const back = screen.getByRole('button', { name: 'carousel.move-back' });
      const next = screen.getByRole('button', { name: 'carousel.move-forward' });
      // Rendered as FloatingButton, with label / disabled wiring flowing through buttonProps.
      expect(back).toHaveClass('tedi-floating-button');
      expect(next).toHaveClass('tedi-floating-button');
      expect(back).toBeDisabled();
      expect(next).toBeEnabled();
    });
  });

  describe('with a measured viewport', () => {
    let descriptor: PropertyDescriptor | undefined;
    beforeEach(() => {
      descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 1000 });
    });
    afterEach(() => {
      if (descriptor) Object.defineProperty(HTMLElement.prototype, 'clientWidth', descriptor);
    });

    it('positions the track with a real (non-zero) transform once measured', () => {
      const { container } = renderCarousel(4);
      const track = container.querySelector('[class*="track"]') as HTMLElement;

      expect(track.style.transform).toMatch(/translate3d\(-\d/);
    });

    it('uses a fractional ResizeObserver width after the initial measurement', () => {
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 1422 });
      const { container } = renderCarousel(3, { loop: false, slidesPerView: 2, gap: 0 });
      const track = container.querySelector('[class*="track"]') as HTMLElement;
      const translateX = (): number => Number(track.style.transform.match(/translate3d\((-?[\d.]+)px/)?.[1]);

      fireEvent.click(screen.getByRole('button', { name: 'carousel.move-forward' }));
      expect(translateX()).toBeCloseTo(-711);

      act(() => {
        resizeObserverCallback([{ contentRect: { width: 1422.39 } } as ResizeObserverEntry], {} as ResizeObserver);
      });
      expect(translateX()).toBeCloseTo(-711.195);
    });

    it('measures the content width consistently when the viewport has horizontal padding', () => {
      const style = document.createElement('style');
      style.textContent = '.padded-carousel-content { padding-left: 20px; padding-right: 30px; }';
      document.head.appendChild(style);

      try {
        const { container } = renderCarousel(3, {
          className: 'padded-carousel-content',
          loop: false,
          slidesPerView: 2,
          gap: 0,
        });
        const track = container.querySelector('[class*="track"]') as HTMLElement;
        const translateX = (): number => Number(track.style.transform.match(/translate3d\((-?[\d.]+)px/)?.[1]);

        fireEvent.click(screen.getByRole('button', { name: 'carousel.move-forward' }));
        expect(translateX()).toBeCloseTo(-475);

        act(() => {
          resizeObserverCallback([{ contentRect: { width: 950 } } as ResizeObserverEntry], {} as ResizeObserver);
        });
        expect(translateX()).toBeCloseTo(-475);
      } finally {
        style.remove();
      }
    });

    const boundedCarousel = (
      count: number,
      slidesPerView: number | { xs: number; lg: number },
      variant: 'dots' | 'numbers' = 'dots'
    ) => (
      <Carousel>
        <Carousel.Content loop={false} slidesPerView={slidesPerView}>
          {Array.from({ length: count }, (_, i) => (
            <div key={i}>Slide {i + 1}</div>
          ))}
        </Carousel.Content>
        <Carousel.Footer>
          <Carousel.Indicators variant={variant} />
          <Carousel.Navigation />
        </Carousel.Footer>
      </Carousel>
    );

    const trackPosition = (container: HTMLElement, slidesPerView: number): number => {
      const track = container.querySelector('[class*="track"]') as HTMLElement;
      const translateX = Number(track.style.transform.match(/translate3d\((-?[\d.]+)px/)?.[1]);
      const cellWidth = (1000 - 16 * (slidesPerView - 1)) / slidesPerView + 16;
      return -translateX / cellWidth;
    };

    const firePointer = (element: HTMLElement, type: string, clientX: number, timeStamp: number): void => {
      const event = new Event(type, { bubbles: true });
      Object.defineProperties(event, {
        clientX: { value: clientX },
        pointerId: { value: 1 },
        timeStamp: { value: timeStamp },
      });
      fireEvent(element, event);
    };

    it.each([2.5, 2.9])('reaches and leaves the fractional final position with %s slides per view', (slidesPerView) => {
      jest.useFakeTimers();
      try {
        const { container } = render(boundedCarousel(5, slidesPerView));
        const region = screen.getByRole('region', { name: 'carousel' });
        const next = screen.getByRole('button', { name: 'carousel.move-forward' });
        const back = screen.getByRole('button', { name: 'carousel.move-back' });
        const dots = screen.getAllByRole('button', { name: 'carousel.show-slide' });
        const advance = () => act(() => jest.advanceTimersByTime(400));

        expect(dots).toHaveLength(4);
        for (let i = 0; i < 3; i++) {
          fireEvent.click(next);
          advance();
        }
        expect(trackPosition(container, slidesPerView)).toBeCloseTo(5 - slidesPerView);
        expect(dots[3]).toHaveAttribute('aria-current', 'true');
        expect(next).toBeDisabled();
        expect(container.querySelectorAll('[aria-roledescription="slide"][role="group"]')).toHaveLength(3);

        fireEvent.click(back);
        advance();
        expect(trackPosition(container, slidesPerView)).toBeCloseTo(2);
        fireEvent.keyDown(region, { key: 'End' });
        expect(trackPosition(container, slidesPerView)).toBeCloseTo(5 - slidesPerView);
        fireEvent.keyDown(region, { key: 'Home' });
        expect(trackPosition(container, slidesPerView)).toBeCloseTo(0);
        fireEvent.click(dots[3]);
        expect(trackPosition(container, slidesPerView)).toBeCloseTo(5 - slidesPerView);
        const transitionEnd = new Event('transitionend', { bubbles: true });
        Object.defineProperty(transitionEnd, 'propertyName', { value: 'transform' });
        fireEvent(container.querySelector('[class*="track"]') as HTMLElement, transitionEnd);
        act(() => jest.runOnlyPendingTimers());
        expect(container.querySelectorAll('[aria-roledescription="slide"]')[3]).toHaveFocus();
      } finally {
        jest.useRealTimers();
      }
    });

    it('keeps a small fractional final step reachable', () => {
      jest.useFakeTimers();
      try {
        const { container } = render(boundedCarousel(5, 2.9995));
        const next = screen.getByRole('button', { name: 'carousel.move-forward' });
        expect(screen.getAllByRole('button', { name: 'carousel.show-slide' })).toHaveLength(4);

        fireEvent.click(next);
        act(() => jest.advanceTimersByTime(400));
        fireEvent.click(next);
        act(() => jest.advanceTimersByTime(400));
        expect(trackPosition(container, 2.9995)).toBeCloseTo(2);
        expect(next).toBeEnabled();

        fireEvent.click(next);
        expect(trackPosition(container, 2.9995)).toBeCloseTo(2.0005, 5);
        expect(next).toBeDisabled();
      } finally {
        jest.useRealTimers();
      }
    });

    it('does not add a near-duplicate final position for a nearly whole slides-per-view value', () => {
      jest.useFakeTimers();
      try {
        const { container } = render(boundedCarousel(5, 2.9999999));
        const next = screen.getByRole('button', { name: 'carousel.move-forward' });
        const dots = screen.getAllByRole('button', { name: 'carousel.show-slide' });
        expect(dots).toHaveLength(3);

        fireEvent.click(next);
        act(() => jest.advanceTimersByTime(400));
        fireEvent.click(next);
        expect(trackPosition(container, 2.9999999)).toBeCloseTo(2);
        expect(dots[2]).toHaveAttribute('aria-current', 'true');
        expect(next).toBeDisabled();
      } finally {
        jest.useRealTimers();
      }
    });

    it('counts reachable positions and shows no indicators for empty content', () => {
      const { container, rerender } = render(boundedCarousel(5, 2.5, 'numbers'));
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText(/\/ 4/)).toBeInTheDocument();
      fireEvent.keyDown(screen.getByRole('region', { name: 'carousel' }), { key: 'End' });
      expect(trackPosition(container, 2.5)).toBeCloseTo(2.5);
      expect(screen.getByText('4')).toBeInTheDocument();
      rerender(boundedCarousel(0, 2.5, 'numbers'));
      expect(screen.queryByText(/\/ 4/)).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'carousel.move-forward' })).toBeDisabled();
      rerender(boundedCarousel(0, 2.5));
      expect(screen.queryAllByRole('button', { name: 'carousel.show-slide' })).toHaveLength(0);
    });

    it('snaps a bounded drag and flick to the fractional final position', () => {
      const { container } = render(boundedCarousel(5, 2.5));
      const region = screen.getByRole('region', { name: 'carousel' });
      const dots = screen.getAllByRole('button', { name: 'carousel.show-slide' });
      fireEvent.click(dots[2]);
      firePointer(region, 'pointerdown', 900, 100);
      firePointer(region, 'pointermove', 700, 300);
      firePointer(region, 'pointerup', 700, 300);
      expect(trackPosition(container, 2.5)).toBeCloseTo(2.5);

      fireEvent.click(dots[2]);
      firePointer(region, 'pointerdown', 900, 100);
      firePointer(region, 'pointermove', 880, 110);
      firePointer(region, 'pointerup', 880, 110);
      expect(trackPosition(container, 2.5)).toBeCloseTo(2.5);
      expect(dots[3]).toHaveAttribute('aria-current', 'true');
    });

    it('flicks backward from the fractional end', () => {
      const { container } = render(boundedCarousel(5, 2.5));
      const region = screen.getByRole('region', { name: 'carousel' });
      fireEvent.keyDown(region, { key: 'End' });

      firePointer(region, 'pointerdown', 900, 100);
      firePointer(region, 'pointermove', 920, 110);
      firePointer(region, 'pointerup', 920, 110);

      expect(trackPosition(container, 2.5)).toBeCloseTo(2);
      expect(activeDotIndex()).toBe(2);
    });

    it('still flicks forward in looping mode', () => {
      renderCarousel(4);
      const region = screen.getByRole('region', { name: 'carousel' });

      firePointer(region, 'pointerdown', 900, 100);
      firePointer(region, 'pointermove', 880, 110);
      firePointer(region, 'pointerup', 880, 110);

      expect(activeDotIndex()).toBe(1);
    });

    it('snaps bounded wheel movement at both bounds and in either direction', () => {
      jest.useFakeTimers();
      try {
        const { container } = render(boundedCarousel(5, 2.5));
        const region = screen.getByRole('region', { name: 'carousel' });
        const wheel = (deltaX: number): void => {
          fireEvent.wheel(region, { deltaX, deltaY: 0 });
          act(() => jest.advanceTimersByTime(120));
        };

        wheel(-50);
        expect(trackPosition(container, 2.5)).toBeCloseTo(0);
        wheel(60);
        expect(trackPosition(container, 2.5)).toBeCloseTo(0);
        wheel(170);
        expect(trackPosition(container, 2.5)).toBeCloseTo(1);
        wheel(-170);
        expect(trackPosition(container, 2.5)).toBeCloseTo(0);

        fireEvent.keyDown(region, { key: 'End' });
        wheel(50);
        expect(trackPosition(container, 2.5)).toBeCloseTo(2.5);
      } finally {
        jest.useRealTimers();
      }
    });

    it('clamps after a breakpoint change and cancels a pending wheel snap', () => {
      jest.useFakeTimers();
      try {
        const view = { xs: 3, lg: 1 };
        const { container, rerender } = render(boundedCarousel(5, view));
        const region = screen.getByRole('region', { name: 'carousel' });
        fireEvent.keyDown(region, { key: 'End' });
        expect(trackPosition(container, 1)).toBeCloseTo(4);

        fireEvent.wheel(region, { deltaX: 50, deltaY: 0 });
        mockUseBreakpoint.mockReturnValue('xs');
        rerender(boundedCarousel(5, view));
        expect(trackPosition(container, 3)).toBeCloseTo(2);
        act(() => jest.advanceTimersByTime(200));
        expect(trackPosition(container, 3)).toBeCloseTo(2);
        expect(screen.getByRole('button', { name: 'carousel.move-forward' })).toBeDisabled();
        expect(screen.getAllByRole('button', { name: 'carousel.show-slide' })).toHaveLength(3);
      } finally {
        jest.useRealTimers();
      }
    });

    it('clamps after slides are removed and wheels to a fractional final position', () => {
      jest.useFakeTimers();
      try {
        const { container, rerender } = render(boundedCarousel(5, 2.5));
        const region = screen.getByRole('region', { name: 'carousel' });
        fireEvent.keyDown(region, { key: 'End' });
        rerender(boundedCarousel(3, 2.5));
        expect(trackPosition(container, 2.5)).toBeCloseTo(0.5);
        expect(screen.getAllByRole('button', { name: 'carousel.show-slide' })).toHaveLength(2);

        fireEvent.keyDown(region, { key: 'Home' });
        fireEvent.wheel(region, { deltaX: 300, deltaY: 0 });
        act(() => jest.advanceTimersByTime(120));
        expect(trackPosition(container, 2.5)).toBeCloseTo(0.5);
        expect(screen.getByRole('button', { name: 'carousel.move-forward' })).toBeDisabled();
      } finally {
        jest.useRealTimers();
      }
    });
  });
});
