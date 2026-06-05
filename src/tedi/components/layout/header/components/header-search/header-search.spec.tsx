import { act, fireEvent, render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { HeaderSearch } from './header-search';

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

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = jest.fn(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = jest.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

describe('HeaderSearch component', () => {
  const mockGetLabel = jest.fn((key: string) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => props),
    });
    (useLabels as jest.Mock).mockReturnValue({ getLabel: mockGetLabel });
  });

  it('renders children directly on desktop', () => {
    render(
      <HeaderSearch>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders search button on mobile with modal variant', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dialog on mobile when search button is clicked', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    fireEvent.click(screen.getByRole('button'));

    const dialog = document.querySelector('dialog');
    expect(dialog).toHaveAttribute('open');
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it('closes dialog when close button is clicked', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    fireEvent.click(screen.getByRole('button'));

    const dialog = document.querySelector('dialog')!;
    expect(dialog).toHaveAttribute('open');

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(dialog).not.toHaveAttribute('open');
  });

  it('renders children directly on mobile with inline variant', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch mobileVariant="inline">
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('uses custom button label', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch mobileLabels={{ button: 'Find' }}>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    expect(screen.getByText('Find')).toBeInTheDocument();
  });

  it('uses custom modal title', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch mobileLabels={{ modalTitle: 'Search items' }}>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Search items')).toBeInTheDocument();
  });

  it('falls back to i18n labels', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    expect(mockGetLabel).toHaveBeenCalledWith('header.search');
  });

  it('does not open dialog when disabled on mobile', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HeaderSearch disabled>
        <input placeholder="Search..." />
      </HeaderSearch>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const dialog = document.querySelector('dialog');
    expect(dialog).not.toHaveAttribute('open');
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      (isBreakpointBelow as jest.Mock).mockReturnValue(true);
    });

    it('uses a native <dialog> element for the modal', () => {
      render(
        <HeaderSearch>
          <input placeholder="Search..." />
        </HeaderSearch>
      );

      const dialog = document.querySelector('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('opens as a modal dialog via showModal()', () => {
      render(
        <HeaderSearch>
          <input placeholder="Search..." />
        </HeaderSearch>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    it('sets aria-label on the dialog from labels.modalTitle', () => {
      render(
        <HeaderSearch mobileLabels={{ modalTitle: 'Search items' }}>
          <input placeholder="Search..." />
        </HeaderSearch>
      );

      const dialog = document.querySelector('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Search items');
    });

    it('sets aria-label on the dialog from i18n fallback', () => {
      render(
        <HeaderSearch>
          <input placeholder="Search..." />
        </HeaderSearch>
      );

      const dialog = document.querySelector('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'header.search');
    });

    it('syncs closed state when dialog emits close event (e.g. Escape key)', () => {
      render(
        <HeaderSearch>
          <input placeholder="Search..." />
        </HeaderSearch>
      );

      const triggerButton = screen.getByRole('button');
      fireEvent.click(triggerButton);

      const dialog = document.querySelector('dialog')!;
      expect(dialog).toHaveAttribute('open');

      // Simulate native Escape — browser fires the close event on the dialog
      act(() => {
        dialog.dispatchEvent(new Event('close'));
      });

      // After the close event, React state synced to false and the effect called dialog.close()
      expect(dialog).not.toHaveAttribute('open');
    });
  });
});
