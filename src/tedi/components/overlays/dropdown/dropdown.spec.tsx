import * as FloatingUI from '@floating-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  it('draws tree lines on indented items when variant="tree"', () => {
    renderDropdown(
      { children: <span>Menu</span> },
      <>
        <Dropdown.Item index={0}>Parent</Dropdown.Item>
        <Dropdown.Item index={1} indent={1}>
          Child
        </Dropdown.Item>
      </>,
      { variant: 'tree' }
    );

    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menuitem', { name: 'Child' }).className).toMatch(/tedi-dropdown__item--tree-item/);
    expect(screen.getByRole('menuitem', { name: 'Parent' }).className).not.toMatch(/tedi-dropdown__item--tree-item/);
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

  it('focuses the item at defaultActiveIndex on open', () => {
    renderDropdown(
      { children: <span>Trigger</span> },
      <>
        <Dropdown.Item index={0}>First</Dropdown.Item>
        <Dropdown.Item index={1}>Second</Dropdown.Item>
        <Dropdown.Item index={2}>Third</Dropdown.Item>
      </>,
      { defaultActiveIndex: 2 }
    );

    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByRole('menu')).toHaveAttribute('aria-activedescendant', 'dropdown-item-2');
  });

  it('resets the active index when the dropdown closes', () => {
    renderDropdown(
      { children: <span>Trigger</span> },
      <>
        <Dropdown.Item index={0}>First</Dropdown.Item>
        <Dropdown.Item index={1}>Second</Dropdown.Item>
      </>,
      { defaultActiveIndex: 1 }
    );

    // Open → close → reopen. Ensure the seeded index is reapplied cleanly.
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByRole('menu')).toHaveAttribute('aria-activedescendant', 'dropdown-item-1');

    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByRole('menu')).toHaveAttribute('aria-activedescendant', 'dropdown-item-1');
  });

  it('exposes asChild buttons as focusable menuitems with roving tabindex', () => {
    renderDropdown(
      { children: <span>Open</span> },
      <>
        <Dropdown.Item index={0}>Result</Dropdown.Item>
        <Dropdown.Item asChild index={1}>
          <button type="button">Action A</button>
        </Dropdown.Item>
        <Dropdown.Item asChild index={2}>
          <button type="button">Action B</button>
        </Dropdown.Item>
      </>,
      { defaultActiveIndex: 1 }
    );

    fireEvent.click(screen.getByText('Open'));

    const actionA = screen.getByRole('menuitem', { name: 'Action A' });
    const actionB = screen.getByRole('menuitem', { name: 'Action B' });
    const result = screen.getByRole('menuitem', { name: 'Result' });

    expect(actionA.tagName).toBe('BUTTON');
    expect(actionB.tagName).toBe('BUTTON');
    expect(actionA).toHaveAttribute('tabindex', '0');
    expect(actionB).toHaveAttribute('tabindex', '-1');
    expect(result).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('menu')).toHaveAttribute('aria-activedescendant', 'dropdown-item-1');
  });

  it('applies pixel width when width is a number', () => {
    renderDropdown({ children: <span>Trigger</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      width: 300,
    });

    fireEvent.click(screen.getByText('Trigger'));

    expect(screen.getByRole('menu')).toHaveStyle({ width: '300px' });
  });

  it('applies custom string width', () => {
    renderDropdown({ children: <span>Trigger</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      width: '16rem',
    });

    fireEvent.click(screen.getByText('Trigger'));

    expect(screen.getByRole('menu')).toHaveStyle({ width: '16rem' });
  });

  it('does not apply width when width="auto"', () => {
    renderDropdown({ children: <span>Trigger</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      width: 'auto',
    });

    fireEvent.click(screen.getByText('Trigger'));

    const dropdown = screen.getByRole('menu');
    expect(dropdown.style.width).toBe('');
  });

  it('passes the trigger width to the min-width when width="auto"', async () => {
    const rectSpy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 40,
      top: 0,
      left: 0,
      bottom: 40,
      right: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    renderDropdown({ children: <button>Trigger</button> }, <Dropdown.Item index={0}>Item</Dropdown.Item>);

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() =>
      expect(screen.getByRole('menu').style.getPropertyValue('--_tedi-dropdown-trigger-width')).toBe('200px')
    );
    rectSpy.mockRestore();
  });

  it('does not pass the trigger width when width is set explicitly', () => {
    renderDropdown({ children: <button>Trigger</button> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      width: 100,
    });

    fireEvent.click(screen.getByText('Trigger'));

    expect(screen.getByRole('menu').style.getPropertyValue('--_tedi-dropdown-trigger-width')).toBe('');
  });

  it('uses container width when width="full"', () => {
    const container = document.createElement('div');

    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      width: 500,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      configurable: true,
      get() {
        return container;
      },
    });

    renderDropdown({ children: <span>Trigger</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      width: 'full',
    });

    fireEvent.click(screen.getByText('Trigger'));

    expect(screen.getByRole('menu')).toHaveStyle({ width: '500px' });
  });

  describe('hideOnScroll', () => {
    const openWithScrollArea = (dropdownProps?: Omit<DropdownProps, 'children'>) => {
      render(
        <div data-testid="scroll-area" style={{ overflow: 'auto', height: 100 }}>
          <Dropdown {...dropdownProps}>
            <Dropdown.Trigger>
              <span>Open menu</span>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item index={0}>Item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      );
      fireEvent.click(screen.getByText('Open menu'));
      expect(screen.getByText('Item')).toBeInTheDocument();
    };

    it('stays open when an ancestor scrolls by default', () => {
      openWithScrollArea();
      fireEvent.scroll(screen.getByTestId('scroll-area'));
      expect(screen.getByText('Item')).toBeInTheDocument();
    });

    it('closes when an ancestor of the trigger scrolls', () => {
      openWithScrollArea({ hideOnScroll: true });
      fireEvent.scroll(screen.getByTestId('scroll-area'));
      expect(screen.queryByText('Item')).not.toBeInTheDocument();
    });

    it('stays open when its own items scroll', () => {
      openWithScrollArea({ hideOnScroll: true, maxHeight: 50 });
      fireEvent.scroll(document.querySelector(`.${styles['tedi-dropdown__scroll']}`) as HTMLElement);
      expect(screen.getByText('Item')).toBeInTheDocument();
    });
  });

  it('does not wrap content in a scroll body when maxHeight is unset', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>);
    fireEvent.click(screen.getByText('Open menu'));
    expect(document.querySelector(`.${styles['tedi-dropdown__scroll']}`)).not.toBeInTheDocument();
  });

  it('restricts the body height with a scrollable wrapper when maxHeight is a number (px)', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      maxHeight: 200,
    });
    fireEvent.click(screen.getByText('Open menu'));
    const scroll = document.querySelector(`.${styles['tedi-dropdown__scroll']}`);
    expect(scroll).toBeInTheDocument();
    expect(scroll).toHaveStyle({ maxHeight: '200px' });
    expect(scroll).toContainElement(screen.getByText('Item'));
  });

  it('accepts a CSS length string for maxHeight', () => {
    renderDropdown({ children: <span>Open menu</span> }, <Dropdown.Item index={0}>Item</Dropdown.Item>, {
      maxHeight: '20rem',
    });
    fireEvent.click(screen.getByText('Open menu'));
    expect(document.querySelector(`.${styles['tedi-dropdown__scroll']}`)).toHaveStyle({ maxHeight: '20rem' });
  });

  it('keeps focus on the active item when the pointer hovers and leaves another item', () => {
    renderDropdown(
      { children: <button>Open menu</button> },
      <>
        <Dropdown.Item index={0}>First</Dropdown.Item>
        <Dropdown.Item index={1}>Second</Dropdown.Item>
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const first = screen.getByRole('menuitem', { name: 'First' });
    const second = screen.getByRole('menuitem', { name: 'Second' });
    first.focus();

    fireEvent.mouseMove(second);
    fireEvent.pointerLeave(second);

    expect(first).toHaveFocus();
  });

  describe('Footer', () => {
    it('renders the footer outside the menu, which moves to the element around the items', () => {
      renderDropdown({ children: <button>Open menu</button> }, [
        <Dropdown.Item key="item" index={0}>
          Profile
        </Dropdown.Item>,
        <Dropdown.Footer key="footer" className="custom-footer">
          <button>Log out</button>
        </Dropdown.Footer>,
      ]);
      const trigger = screen.getByRole('button', { name: 'Open menu' });
      fireEvent.click(trigger);

      const menu = screen.getByRole('menu');
      const logOut = screen.getByRole('button', { name: 'Log out' });
      expect(menu).toContainElement(screen.getByRole('menuitem', { name: 'Profile' }));
      expect(menu).not.toContainElement(logOut);
      expect(menu).toHaveClass(styles['tedi-dropdown__menu']);
      expect(menu.parentElement).toHaveClass(styles['tedi-dropdown']);
      expect(menu.parentElement).not.toHaveAttribute('role');
      expect(trigger).toHaveAttribute('aria-controls', menu.id);
      expect(logOut.parentElement).toHaveClass(styles['tedi-dropdown__footer'], 'custom-footer');
    });

    it('keeps the footer outside the scrolling items with maxHeight', () => {
      renderDropdown(
        { children: <button>Open menu</button> },
        [
          <Dropdown.Item key="item" index={0}>
            Profile
          </Dropdown.Item>,
          <Dropdown.Footer key="footer">
            <button>Log out</button>
          </Dropdown.Footer>,
        ],
        { maxHeight: 100 }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

      const scroll = document.querySelector(`.${styles['tedi-dropdown__scroll']}`);
      expect(scroll).toContainElement(screen.getByRole('menuitem', { name: 'Profile' }));
      expect(scroll).not.toContainElement(screen.getByRole('button', { name: 'Log out' }));
    });

    it('puts the content id on the element around the items in navigation mode', () => {
      renderDropdown(
        { children: <button>Open menu</button> },
        [
          <Dropdown.Item key="item" index={0}>
            Profile
          </Dropdown.Item>,
          <Dropdown.Footer key="footer">
            <button>Log out</button>
          </Dropdown.Footer>,
        ],
        { navigation: true }
      );
      const trigger = screen.getByRole('button', { name: 'Open menu' });
      fireEvent.click(trigger);

      const wrapper = document.querySelector(`.${styles['tedi-dropdown__menu']}`) as HTMLElement;
      expect(wrapper).not.toHaveAttribute('role');
      expect(wrapper.id).toBeTruthy();
      expect(trigger).toHaveAttribute('aria-controls', wrapper.id);
      expect(wrapper).not.toContainElement(screen.getByRole('button', { name: 'Log out' }));
    });
  });

  it('finds a footer inside a fragment', () => {
    renderDropdown(
      { children: <button>Open menu</button> },
      <>
        <Dropdown.Item index={0}>Profile</Dropdown.Item>
        <Dropdown.Footer>
          <button>Log out</button>
        </Dropdown.Footer>
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('menu')).not.toContainElement(screen.getByRole('button', { name: 'Log out' }));
  });

  describe('Header', () => {
    const renderWithHeader = () =>
      renderDropdown(
        { children: <button>Open menu</button> },
        <>
          <Dropdown.Header className="custom-header">
            <input aria-label="Search" />
          </Dropdown.Header>
          <Dropdown.Item index={0}>First</Dropdown.Item>
          <Dropdown.Item index={1}>Second</Dropdown.Item>
        </>
      );

    it('renders the header above the items, outside the menu', () => {
      renderWithHeader();
      const trigger = screen.getByRole('button', { name: 'Open menu' });
      fireEvent.click(trigger);

      const menu = screen.getByRole('menu');
      const search = screen.getByRole('textbox', { name: 'Search' });
      expect(menu).not.toContainElement(search);
      expect(search.parentElement).toHaveClass(styles['tedi-dropdown__header'], 'custom-header');
      expect(search.parentElement?.nextElementSibling).toBe(menu);
      expect(menu).toHaveAttribute('data-dropdown-header');
      expect(menu).not.toHaveAttribute('data-dropdown-footer');
      expect(trigger).toHaveAttribute('aria-controls', menu.id);
    });

    it('focuses the header control on open', async () => {
      renderWithHeader();
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

      await waitFor(() => expect(screen.getByRole('textbox', { name: 'Search' })).toHaveFocus());
    });

    it('moves between the header control and the first item with the arrow keys', () => {
      renderWithHeader();
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      const search = screen.getByRole('textbox', { name: 'Search' });
      const first = screen.getByRole('menuitem', { name: 'First' });

      fireEvent.keyDown(search, { key: 'ArrowDown' });
      expect(first).toHaveFocus();

      fireEvent.keyDown(first, { key: 'ArrowUp' });
      expect(search).toHaveFocus();
    });

    it('leaves the arrow keys alone in navigation mode', () => {
      renderDropdown(
        { children: <button>Open menu</button> },
        <>
          <Dropdown.Header>
            <input aria-label="Search" />
          </Dropdown.Header>
          <Dropdown.Item index={0}>First</Dropdown.Item>
        </>,
        { navigation: true }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      const search = screen.getByRole('textbox', { name: 'Search' });
      search.focus();

      expect(fireEvent.keyDown(search, { key: 'ArrowDown' })).toBe(true);
      expect(search).toHaveFocus();
    });

    it('leaves ArrowUp on a later item to the list', () => {
      renderWithHeader();
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      const second = screen.getByRole('menuitem', { name: 'Second' });
      second.focus();

      fireEvent.keyDown(second, { key: 'ArrowUp' });
      expect(screen.getByRole('textbox', { name: 'Search' })).not.toHaveFocus();
      expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus();
    });

    it('leaves ArrowDown to a header control that uses it, such as a combobox', () => {
      renderDropdown(
        { children: <button>Open menu</button> },
        <>
          <Dropdown.Header>
            <input role="combobox" aria-expanded="false" aria-controls="cities" aria-label="City" />
          </Dropdown.Header>
          <Dropdown.Item index={0}>First</Dropdown.Item>
        </>
      );
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      const combobox = screen.getByRole('combobox', { name: 'City' });
      combobox.focus();

      fireEvent.keyDown(combobox, { key: 'ArrowDown' });
      expect(combobox).toHaveFocus();
    });

    it('keeps keys unique when items in a fragment sit next to a header', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      renderDropdown({ children: <button>Open menu</button> }, [
        <Dropdown.Header key="header">
          <input aria-label="Search" />
        </Dropdown.Header>,
        <Dropdown.Item key="first" index={0}>
          First
        </Dropdown.Item>,
        <React.Fragment key="rest">
          <Dropdown.Item index={1}>Second</Dropdown.Item>
          <Dropdown.Item index={2}>Third</Dropdown.Item>
        </React.Fragment>,
      ]);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

      expect(screen.getAllByRole('menuitem')).toHaveLength(3);
      expect(consoleError).not.toHaveBeenCalledWith(
        expect.stringContaining('same key'),
        expect.anything(),
        expect.anything()
      );
      expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(/same key/);
      consoleError.mockRestore();
    });
  });

  describe('Group', () => {
    it('renders a group named by its title', () => {
      renderDropdown(
        { children: <button>Open menu</button> },
        <>
          <Dropdown.Item index={0}>Maarika Mets</Dropdown.Item>
          <Dropdown.Group label="Esindatavad" className="custom-group">
            <Dropdown.Item index={1}>Kadri Mets</Dropdown.Item>
          </Dropdown.Group>
        </>
      );
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

      const group = screen.getByRole('group', { name: 'Esindatavad' });
      expect(group).toHaveClass(styles['tedi-dropdown__group'], 'custom-group');
      expect(group).toContainElement(screen.getByRole('menuitem', { name: 'Kadri Mets' }));
      expect(group).not.toContainElement(screen.getByRole('menuitem', { name: 'Maarika Mets' }));
      expect(screen.getByText('Esindatavad')).toHaveClass(styles['tedi-dropdown__group-title']);
    });
  });
});
