import { fireEvent, render, screen } from '@testing-library/react';

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
});
