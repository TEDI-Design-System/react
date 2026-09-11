import { fireEvent, render, screen } from '@testing-library/react';

import { MobileNav } from './mobile-nav';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => `label:${key}`,
  }),
}));

describe('MobileNav', () => {
  const baseProps = {
    ariaLabel: 'Main navigation',
    isOpen: true,
    onClose: jest.fn(),
  };

  const navItems = [
    {
      children: 'Home',
      href: '/home',
    },
    {
      children: 'Services',
      subItems: [
        {
          children: 'Consulting',
          href: '/services/consulting',
        },
        {
          children: 'Support',
          href: '/services/support',
        },
      ],
    },
  ];

  test('renders nothing if isOpen is false', () => {
    const { container } = render(<MobileNav {...baseProps} isOpen={false} navItems={navItems} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders top-level nav items', () => {
    render(<MobileNav {...baseProps} navItems={navItems} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  test('calls onClose when clicking a leaf item', () => {
    render(<MobileNav {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Home'));
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  test('navigates into subItems when clicking a parent item', () => {
    render(<MobileNav {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));
    expect(screen.getByText('Consulting')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  test('shows back buttons when in nested level', () => {
    render(<MobileNav {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));
    expect(screen.getByText('label:sidenav.backToMainMenu')).toBeInTheDocument();
  });

  test('navigates back to root when clicking "Back to main menu"', () => {
    render(<MobileNav {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));

    const backToMainButton = screen.getByText('label:sidenav.backToMainMenu');
    fireEvent.click(backToMainButton);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  test('calls onClose when clicking a nested leaf item', () => {
    render(<MobileNav {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));
    fireEvent.click(screen.getByText('Consulting'));
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  test('renders without overlay if showOverlay is false', () => {
    render(<MobileNav {...baseProps} navItems={navItems} showOverlay={false} />);
    expect(screen.queryByTestId('floating-overlay')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('offsets the overlay to the real header bottom and keeps it in sync via ResizeObserver', () => {
    // A page header the overlay should sit below.
    const header = document.createElement('header');
    jest.spyOn(header, 'getBoundingClientRect').mockReturnValue({ bottom: 80 } as DOMRect);
    document.body.appendChild(header);

    // jsdom has no ResizeObserver — stub it so the observe/disconnect path runs.
    const observe = jest.fn();
    const disconnect = jest.fn();
    const originalResizeObserver = globalThis.ResizeObserver;
    globalThis.ResizeObserver = jest.fn(() => ({ observe, disconnect, unobserve: jest.fn() })) as never;

    const { container, unmount } = render(<MobileNav {...baseProps} navItems={navItems} />);

    const overlay = container.querySelector('.tedi-sidenav__overlay') as HTMLElement;
    expect(overlay).toHaveStyle({ top: '80px' });
    expect(observe).toHaveBeenCalledWith(header);

    unmount();
    expect(disconnect).toHaveBeenCalled();

    globalThis.ResizeObserver = originalResizeObserver;
    header.remove();
    jest.restoreAllMocks();
  });

  test('falls back to the header-height token when there is no page header', () => {
    const { container } = render(<MobileNav {...baseProps} navItems={navItems} />);
    const overlay = container.querySelector('.tedi-sidenav__overlay') as HTMLElement;
    expect(overlay).toHaveStyle({ top: 'var(--layout-header-height)' });
  });
});
