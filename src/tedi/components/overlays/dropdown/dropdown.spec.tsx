import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

import { Dropdown, DropdownProps } from './dropdown';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => key,
  }),
}));

const renderDropdown = (
  triggerProps: ComponentProps<typeof Dropdown.Trigger>,
  content: React.ReactNode,
  dropdownProps?: Omit<DropdownProps, 'children'>
) => {
  return render(
    <Dropdown {...dropdownProps}>
      <Dropdown.Trigger {...triggerProps} />
      <Dropdown.Content>{content}</Dropdown.Content>
    </Dropdown>
  );
};

describe('Dropdown component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Trigger children correctly', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>);
    const trigger = screen.getByText('Open menu');
    expect(trigger.tagName).toBe('SPAN');
  });

  it('does not render content by default', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>);
    expect(screen.queryByText('Item')).not.toBeInTheDocument();
  });

  it('opens dropdown on trigger click', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>);
    const trigger = screen.getByText('Open menu');
    fireEvent.click(trigger);
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('closes dropdown when item is clicked', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>);
    fireEvent.click(screen.getByText('Open menu'));
    fireEvent.click(screen.getByText('Item'));
    expect(screen.queryByText('Item')).not.toBeInTheDocument();
  });

  it('renders multiple items', () => {
    renderDropdown(
      { children: <span>Open menu</span> },
      <>
        <Dropdown.Item index={0}>Item 1</Dropdown.Item>
        <Dropdown.Item index={1}>Item 2</Dropdown.Item>
      </>
    );

    fireEvent.click(screen.getByText('Open menu'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('marks active item with active class', () => {
    renderDropdown(
      { children: <span>Open menu</span> },
      <>
        <Dropdown.Item index={0}>Item 1</Dropdown.Item>
        <Dropdown.Item index={1} active>
          Item 2
        </Dropdown.Item>
      </>
    );

    fireEvent.click(screen.getByText('Open menu'));
    const activeItem = screen.getByText('Item 2');
    expect(activeItem).toHaveClass('tedi-dropdown__item--active');
  });

  it('traps focus inside dropdown when modal=true', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      modal: true,
    });

    fireEvent.click(screen.getByText('Open menu'));
    const item = screen.getByText('Item');
    item.focus();
    expect(document.activeElement).toBe(item);
  });
});
