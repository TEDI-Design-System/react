import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SideNavItem } from './sidenav-item';

describe('SideNavItem', () => {
  const defaultProps = {
    children: 'Test Item',
    icon: 'home',
    level: 1,
    isCollapsed: false,
    isDefaultOpen: false,
    onItemClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic item (no children)', () => {
    test('renders correctly', () => {
      render(<SideNavItem {...defaultProps} />);
      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    test('calls onItemClick when clicked', async () => {
      const user = userEvent.setup();
      render(<SideNavItem {...defaultProps} />);
      await user.click(screen.getByText('Test Item'));
      expect(defaultProps.onItemClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onItemClick when item has children', async () => {
      const user = userEvent.setup();
      const onItemClick = jest.fn();

      render(<SideNavItem {...defaultProps} onItemClick={onItemClick} subItems={[{ children: 'Child' }]} />);

      await user.click(screen.getByText('Test Item'));
      expect(onItemClick).not.toHaveBeenCalled();
    });

    test('applies active styles when isActive=true', () => {
      render(<SideNavItem {...defaultProps} isActive />);
      expect(screen.getByRole('menuitem').parentElement).toHaveClass('tedi-sidenav__item--current');
    });
  });

  describe('collapsed mode (isCollapsed = true)', () => {
    test('uses aria-label when collapsed', () => {
      render(<SideNavItem {...defaultProps} isCollapsed />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-label', 'Test Item');
    });

    test('renders SideNavDropdown when has children & collapsed', () => {
      render(<SideNavItem {...defaultProps} isCollapsed subItems={[{ children: 'Sub' }]} />);
      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByText(/expand_more/i)).toBeInTheDocument();
    });
  });

  describe('items with children', () => {
    test('opens subitems when isDefaultOpen=true', () => {
      render(<SideNavItem {...defaultProps} subItems={[{ children: 'Visible Child' }]} isDefaultOpen />);

      expect(screen.getByText('Visible Child')).toBeInTheDocument();
    });

    test('renders subItemGroups with heading', () => {
      render(
        <SideNavItem
          {...defaultProps}
          isDefaultOpen
          subItemGroups={[
            {
              subHeading: 'Analytics',
              subItems: [{ children: 'Reports' }],
            },
          ]}
        />
      );

      expect(screen.getByText('Analytics')).toBeInTheDocument();
      expect(screen.getByText('Reports')).toBeInTheDocument();
    });

    test('uses clickable Link + separate Collapse when href exists (level 1)', () => {
      render(<SideNavItem {...defaultProps} href="/dashboard" subItems={[{ children: 'Dash' }]} isDefaultOpen />);

      const link = screen.getByRole('menuitem', { name: /Test Item/ });
      expect(link).toHaveAttribute('href', '/dashboard');
      expect(screen.getByText('Dash')).toBeInTheDocument();
    });

    test('keyboard toggle works on Collapse title (Enter/Space)', async () => {
      const user = userEvent.setup();

      render(<SideNavItem {...defaultProps} subItems={[{ children: 'Child' }]} />);

      const collapseButton = screen.getByRole('button', { name: 'open' });

      collapseButton.focus();

      await user.keyboard('{Enter}');
      expect(collapseButton).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard(' ');
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('keyboard toggle works with Space key on non-linked parent', async () => {
      const user = userEvent.setup();

      render(<SideNavItem {...defaultProps} subItems={[{ children: 'Space Child' }]} />);

      await user.tab();
      await user.keyboard(' ');

      expect(screen.getByText('Space Child')).toBeInTheDocument();
    });
  });

  describe('level > 1 (nested)', () => {
    test('renders bullet instead of chevron on nested parents', () => {
      render(
        <SideNavItem {...defaultProps} level={1} isDefaultOpen>
          <SideNavItem subItems={[{ children: 'Deep' }]}>Nested Parent</SideNavItem>
        </SideNavItem>
      );

      expect(screen.getByText('Deep')).toBeInTheDocument();
    });
  });

  test('handles accessibility attributes', () => {
    render(
      <SideNavItem {...defaultProps} isActive={true} isCollapsed={true}>
        Active Item
      </SideNavItem>
    );

    const item = screen.getByRole('menuitem');
    expect(item).toHaveAttribute('aria-current', 'page');
    expect(item).toHaveAttribute('aria-label', 'Active Item');
  });

  test('handles accessibility attributes', () => {
    render(
      <SideNavItem {...defaultProps} isActive={true} isCollapsed={true}>
        Active Item
      </SideNavItem>
    );

    const item = screen.getByRole('menuitem');
    expect(item).toHaveAttribute('aria-current', 'page');
    expect(item).toHaveAttribute('aria-label', 'Active Item');
  });

  test('renders nested items with correct level', () => {
    const subItems = [
      {
        children: 'Nested Item',
        level: 2,
        subItems: [{ children: 'Deep Item', icon: 'deep-icon' }],
      },
    ];
    render(<SideNavItem {...defaultProps} subItems={subItems} isDefaultOpen={true} />);
    expect(screen.getByText('Deep Item')).toBeInTheDocument();
    const nestedItem = screen.getByText('Deep Item').closest('li');
    const icon = nestedItem?.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
  });

  test('does not toggle on unrelated keys', async () => {
    const user = userEvent.setup();

    render(<SideNavItem {...defaultProps} subItems={[{ children: 'Hidden Child' }]} isDefaultOpen />);
    expect(screen.getByText('Hidden Child')).toBeInTheDocument();

    await user.tab();
    await user.keyboard('{Escape}');

    expect(screen.getByText('Hidden Child')).toBeInTheDocument();
  });

  test('sets aria attributes for linked parent with children', () => {
    render(<SideNavItem {...defaultProps} href="/parent" subItems={[{ children: 'Child' }]} />);

    const link = screen.getByRole('menuitem', { name: /test item/i });
    expect(link).toHaveAttribute('aria-haspopup', 'true');
    expect(link).toHaveAttribute('aria-expanded');
    expect(link).toHaveAttribute('aria-controls');
  });

  test('updates dropdown open state when SideNavDropdown opens', async () => {
    const user = userEvent.setup();

    render(<SideNavItem {...defaultProps} isCollapsed subItems={[{ children: 'Child' }]} />);

    await user.click(screen.getByText('Test Item'));
  });
});
