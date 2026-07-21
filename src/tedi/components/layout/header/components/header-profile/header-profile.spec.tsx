import { act, fireEvent, render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { HeaderProfile } from './header-profile';

import '@testing-library/jest-dom';

jest.mock('../../../../../helpers', () => ({
  ...jest.requireActual('../../../../../helpers'),
  useBreakpoint: jest.fn(),
  isBreakpointBelow: jest.fn(),
  useBreakpointProps: jest.fn(),
}));

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: jest.fn(),
}));

describe('HeaderProfile component', () => {
  const mockGetLabel = jest.fn((key: string) => key);

  const setDesktopView = () => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockImplementation((_bp: string, target: string) => {
      if (target === 'md') return false;
      if (target === 'lg') return false;
      return false;
    });
  };

  const setMobileView = () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    (isBreakpointBelow as jest.Mock).mockImplementation((_bp: string, target: string) => {
      if (target === 'md') return true;
      if (target === 'lg') return true;
      return true;
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setDesktopView();
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => props),
    });
    (useLabels as jest.Mock).mockReturnValue({ getLabel: mockGetLabel });
  });

  it('renders profile button', () => {
    render(
      <HeaderProfile>
        <span>Profile content</span>
      </HeaderProfile>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders children in dropdown on desktop when dropdown is opened', () => {
    render(
      <HeaderProfile>
        <span>Profile menu item</span>
      </HeaderProfile>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Profile menu item')).toBeInTheDocument();
  });

  it('renders with label when showLabel is true', () => {
    render(
      <HeaderProfile showLabel>
        <span>Content</span>
      </HeaderProfile>
    );

    expect(mockGetLabel).toHaveBeenCalledWith('header.profile');
  });

  it('uses mobile label on mobile viewport', () => {
    setMobileView();

    render(
      <HeaderProfile>
        <span>Content</span>
      </HeaderProfile>
    );

    expect(mockGetLabel).toHaveBeenCalledWith('header.profile.mobile');
  });

  it('renders modal view on mobile', () => {
    setMobileView();

    const { container } = render(
      <HeaderProfile>
        <span>Profile content</span>
      </HeaderProfile>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(container.querySelector('[class*="header-profile__modal"]')).toBeInTheDocument();
    expect(screen.getByText('Profile content')).toBeInTheDocument();
  });

  it('closes modal view on overlay click', () => {
    setMobileView();

    const { container } = render(
      <HeaderProfile>
        <span>Profile content</span>
      </HeaderProfile>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Profile content')).toBeInTheDocument();

    const overlay = container.querySelector('[class*="header-profile__overlay"]');
    fireEvent.click(overlay!);

    expect(container.querySelector('[class*="header-profile__modal"]')).not.toBeInTheDocument();
  });

  it('does not open dropdown when disabled on desktop', () => {
    render(
      <HeaderProfile disabled>
        <span>Profile menu item</span>
      </HeaderProfile>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.queryByText('Profile menu item')).not.toBeInTheDocument();
  });

  it('does not open modal when disabled on mobile', () => {
    setMobileView();

    const { container } = render(
      <HeaderProfile disabled>
        <span>Profile content</span>
      </HeaderProfile>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(container.querySelector('[class*="header-profile__modal"]')).not.toBeInTheDocument();
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      setMobileView();
    });

    it('opens modal via the button directly, not a wrapping div', () => {
      const { container } = render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>
      );

      // The button itself should trigger the modal — no non-interactive wrapper with onClick needed
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(container.querySelector('[class*="header-profile__modal"]')).toBeInTheDocument();
    });

    it('renders modal with role="dialog" and aria-modal="true"', () => {
      render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>
      );

      fireEvent.click(screen.getByRole('button'));

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('sets aria-label on the modal', () => {
      render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'header.profile.mobile');
    });

    it('marks the overlay as aria-hidden', () => {
      const { container } = render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>
      );

      fireEvent.click(screen.getByRole('button'));

      const overlay = container.querySelector('[class*="header-profile__overlay"]');
      expect(overlay).toHaveAttribute('aria-hidden', 'true');
    });

    it('closes modal on Escape key press', () => {
      render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('returns focus to the trigger button when modal closes via Escape', () => {
      setDesktopView();
      // Use tablet view (below lg but above md) so it uses the modal path with a focusable Button
      (isBreakpointBelow as jest.Mock).mockImplementation((_bp: string, target: string) => {
        if (target === 'md') return false;
        if (target === 'lg') return true;
        return true;
      });

      render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(document.activeElement).toBe(button);
    });
  });

  describe('header offset for the fixed modal/overlay', () => {
    let headerEl: HTMLElement;

    const rectWithBottom = (bottom: number): DOMRect => ({
      bottom,
      top: 0,
      left: 0,
      right: 0,
      width: 0,
      height: bottom,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    beforeEach(() => {
      setMobileView();
      headerEl = document.createElement('header');
      document.body.appendChild(headerEl);
    });

    afterEach(() => {
      headerEl.remove();
    });

    it('sets --header-profile-offset from the header bottom when the modal opens', () => {
      headerEl.getBoundingClientRect = jest.fn(() => rectWithBottom(120));

      const { container } = render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>,
        { container: headerEl }
      );

      fireEvent.click(screen.getByRole('button'));

      const modal = container.querySelector('[class*="header-profile__modal"]') as HTMLElement;
      const overlay = container.querySelector('[class*="header-profile__overlay"]') as HTMLElement;

      expect(modal.style.getPropertyValue('--header-profile-offset')).toBe('120px');
      expect(overlay.style.getPropertyValue('--header-profile-offset')).toBe('120px');
    });

    it('updates the offset when the window is resized', () => {
      let bottom = 100;
      headerEl.getBoundingClientRect = jest.fn(() => rectWithBottom(bottom));

      const { container } = render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>,
        { container: headerEl }
      );

      fireEvent.click(screen.getByRole('button'));

      const getModal = () => container.querySelector('[class*="header-profile__modal"]') as HTMLElement;
      expect(getModal().style.getPropertyValue('--header-profile-offset')).toBe('100px');

      bottom = 64;
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(getModal().style.getPropertyValue('--header-profile-offset')).toBe('64px');
    });

    it('removes the resize and scroll listeners when the modal closes', () => {
      headerEl.getBoundingClientRect = jest.fn(() => rectWithBottom(80));
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>,
        { container: headerEl }
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), true);

      removeEventListenerSpy.mockRestore();
    });

    it('does not set the offset when there is no ancestor header', () => {
      const { container } = render(
        <HeaderProfile>
          <span>Profile content</span>
        </HeaderProfile>
      );

      fireEvent.click(screen.getByRole('button'));

      const modal = container.querySelector('[class*="header-profile__modal"]') as HTMLElement;
      expect(modal.style.getPropertyValue('--header-profile-offset')).toBe('');
    });
  });
});
