import { fireEvent, render, screen } from '@testing-library/react';

import { SideNavDropdown } from '../sidenav-dropdown/sidenav-dropdown';
import { SideNavItemProps } from '../sidenav-item/sidenav-item';
import styles from './sidenav-dropdown.module.scss';

const mockGroups = [
  {
    subHeading: 'Group 1',
    subItems: [
      {
        children: 'Item 1',
        href: '/item-1',
        isActive: false,
        onClick: jest.fn(),
      },
      {
        children: 'Item 2',
        href: '/item-2',
        isActive: true,
        onClick: jest.fn(),
      },
    ],
  },
];

const nestedGroups = [
  {
    subItems: [
      {
        children: 'Parent Item',
        href: '/parent',
        subItems: [
          {
            children: 'Child Item',
            href: '/child',
          },
        ],
      },
    ],
  },
];

describe('SideNavDropdown', () => {
  it('renders the trigger button', () => {
    render(<SideNavDropdown trigger={<span>Open menu</span>} groups={mockGroups} />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={mockGroups} />);
    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);

    const menus = screen.getAllByRole('menu');
    expect(menus.length).toBeGreaterThan(0);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('opens dropdown on keyboard (Enter)', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={mockGroups} />);
    const trigger = screen.getByRole('button');

    fireEvent.keyDown(trigger, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('calls item onClick and closes dropdown', () => {
    const onClickMock = jest.fn();
    const customGroups: { subItems: SideNavItemProps<'a'>[] }[] = [
      {
        subItems: [
          {
            children: 'Clickable Item',
            href: '/clickable',
            isActive: false,
            onClick: onClickMock,
          },
        ],
      },
    ];

    render(<SideNavDropdown trigger={<span>Trigger</span>} groups={customGroups} />);
    fireEvent.click(screen.getByRole('button'));
    const item = screen.getByRole('menuitem', { name: /clickable item/i });
    fireEvent.click(item);

    expect(onClickMock).toHaveBeenCalled();
    expect(screen.queryByText(/clickable item/i)).not.toBeInTheDocument();
  });

  it('calls onOpenChange callback', () => {
    const onOpenChange = jest.fn();
    render(<SideNavDropdown trigger={<span>Trigger</span>} groups={mockGroups} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('opens dropdown on Space key', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={mockGroups} />);
    const trigger = screen.getByRole('button');

    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('closes dropdown on Escape key', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={mockGroups} />);
    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('renders nested submenu items', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={nestedGroups} />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Parent Item')).toBeInTheDocument();
    expect(screen.getByText('Child Item')).toBeInTheDocument();
  });

  it('sets aria attributes for items with children', () => {
    const groupsWithChildren = [
      {
        subItems: [
          {
            children: 'Parent',
            href: '/parent',
            subItems: [{ children: 'Child', href: '/child' }],
          },
        ],
      },
    ];

    render(<SideNavDropdown trigger={<span>Menu</span>} groups={groupsWithChildren} />);
    fireEvent.click(screen.getByRole('button'));

    const parentItem = screen.getByRole('menuitem', { name: /parent/i });
    expect(parentItem).toHaveAttribute('aria-haspopup', 'true');
    expect(parentItem).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onOpenChange when closing', () => {
    const onOpenChange = jest.fn();
    render(<SideNavDropdown trigger={<span>Trigger</span>} groups={mockGroups} onOpenChange={onOpenChange} />);

    const trigger = screen.getByRole('button', { name: /trigger/i });

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('renders bullet indicator for items with children', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={nestedGroups} />);
    fireEvent.click(screen.getByRole('button'));

    expect(document.querySelector(`.${styles['tedi-sidenav__bullet']}`)).toBeInTheDocument();
  });
});
