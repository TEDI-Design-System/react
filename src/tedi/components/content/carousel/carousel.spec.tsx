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

beforeAll(() => {
  class MockResizeObserver {
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
  });
});
