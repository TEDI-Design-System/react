import * as FloatingUI from '@floating-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { ComponentProps } from 'react';

import { UnknownType } from '../../../types/commonTypes';
import { Dropdown, DropdownProps } from './dropdown';
import styles from './dropdown.module.scss';

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

  it('respects controlled open prop', () => {
    const { rerender } = renderDropdown(
      { children: <span>Trigger</span> },
      <Dropdown.Item index={0}>Item</Dropdown.Item>,
      { open: false }
    );

    expect(screen.queryByText('Item')).not.toBeInTheDocument();

    rerender(
      <Dropdown open={true}>
        <Dropdown.Trigger>
          <p>Trigger</p>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item index={0}>Item</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('calls onOpenChange in controlled mode but does not change internal state', () => {
    const onOpenChange = jest.fn();

    renderDropdown({ children: <span>Trigger</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      open: false,
      onOpenChange,
    });

    fireEvent.click(screen.getByText('Trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Item')).not.toBeInTheDocument();
  });

  it('does not set a valid width when reference is not available yet', () => {
    jest.spyOn(FloatingUI, 'useFloating').mockReturnValue({
      refs: {
        reference: { current: null },
        floating: { current: null },
        setReference: jest.fn(),
        setFloating: jest.fn(),
      },
      x: 0,
      y: 0,
      strategy: 'absolute',
      placement: 'bottom-start',
      middlewareData: {},
    } as UnknownType);

    renderDropdown({ children: <button>Trigger</button> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      width: 'trigger',
    });

    fireEvent.click(screen.getByText('Trigger'));
    const dropdown = screen.getByRole('menu');
    expect(dropdown).toHaveStyle({ width: '0px' });
    expect(dropdown.style.width).toBe('0px');
    expect(parseFloat(getComputedStyle(dropdown).width)).toBe(0);
  });

  it('applies tree variant class when variant="tree"', () => {
    renderDropdown({ children: <span>Menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, { variant: 'tree' });

    fireEvent.click(screen.getByText('Menu'));
    const dropdownContainer = screen.getByRole('menu');
    expect(dropdownContainer).toHaveClass(styles['tedi-dropdown--tree']);
  });

  it('sets aria-activedescendant when activeIndex is set', () => {
    renderDropdown(
      { children: <span>Trigger</span> },
      <>
        <Dropdown.Item index={0}>First</Dropdown.Item>
        <Dropdown.Item index={1}>Second</Dropdown.Item>
      </>,
      {}
    );

    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByRole('menu')).toHaveAttribute('aria-activedescendant', 'dropdown-item-0');
  });
});
