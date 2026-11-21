import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UnknownType } from '../../../../types/commonTypes';
import { Checkbox } from '../../../form/checkbox/checkbox';
import { Radio } from '../../../form/radio/radio';
import { OptionContent } from '../../../misc/option-content/option-content';
import { DropdownItem } from './dropdown-item';

const mockSetOpen = jest.fn();
const mockOnClick = jest.fn();
let mockContextOverrides: Record<string, UnknownType> = {};

jest.mock('../dropdown-context', () => ({
  useDropdownContext: () => ({
    getItemProps: (props: UnknownType) => props,
    listItemsRef: { current: [] },
    setOpen: mockSetOpen,
    activeIndex: 0,
    divided: false,
    variant: 'default',
    ...mockContextOverrides,
  }),
}));

describe('DropdownItem', () => {
  beforeEach(() => {
    mockSetOpen.mockClear();
    mockOnClick.mockClear();
    mockContextOverrides = {};
  });

  it('calls onClick and closes dropdown on click', () => {
    const { getByText } = render(
      <DropdownItem index={0} onClick={mockOnClick}>
        Item
      </DropdownItem>
    );
    fireEvent.click(getByText('Item'));
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it('does not call onClick when disabled', () => {
    const { getByText } = render(
      <DropdownItem index={0} onClick={mockOnClick} disabled>
        Item
      </DropdownItem>
    );
    fireEvent.click(getByText('Item'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('handles Enter key activation', () => {
    const { getByText } = render(
      <DropdownItem index={0} onClick={mockOnClick}>
        Item
      </DropdownItem>
    );
    const item = getByText('Item');
    fireEvent.keyDown(item, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it('renders div when asChild=true', () => {
    const { getByText } = render(
      <DropdownItem asChild>
        <span>Child</span>
      </DropdownItem>
    );
    expect(getByText('Child').tagName).toBe('SPAN');
  });

  it('renders children directly inside div when asChild=true', () => {
    render(
      <DropdownItem asChild index={0}>
        <label htmlFor="chk">Custom label</label>
        <input type="checkbox" id="chk" />
      </DropdownItem>
    );
    const div = screen.getByLabelText('Custom label').closest('div');
    expect(div).toBeInTheDocument();
    expect(div?.tagName).toBe('DIV');
  });

  it('does NOT close dropdown when clicking inner input and closeOnSelect=false', () => {
    render(
      <DropdownItem asChild closeOnSelect={false} index={5}>
        <input type="radio" data-testid="radio" />
      </DropdownItem>
    );
    fireEvent.click(screen.getByTestId('radio'));
    expect(mockSetOpen).not.toHaveBeenCalled();
  });

  it('clicks inner input when wrapper is clicked (asChild + closeOnSelect=false)', () => {
    const handleChange = jest.fn();
    render(
      <DropdownItem asChild index={0} closeOnSelect={false}>
        <input type="checkbox" onChange={handleChange} data-testid="inner" />
        Label text
      </DropdownItem>
    );
    const wrapper = screen.getByText('Label text').closest('div')!;
    fireEvent.click(wrapper);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(mockSetOpen).not.toHaveBeenCalled();
  });

  it('toggles an inner checkbox once when the checkbox itself is clicked', () => {
    render(
      <DropdownItem asChild index={0} closeOnSelect={false}>
        <input type="checkbox" id="chk-input" aria-label="Checkbox" />
      </DropdownItem>
    );
    const input = screen.getByRole('checkbox', { name: 'Checkbox' });
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it('toggles an inner checkbox once when its label is clicked', () => {
    render(
      <DropdownItem asChild index={0} closeOnSelect={false}>
        <div>
          <input type="checkbox" id="chk-label" />
          <label htmlFor="chk-label">Checkbox label</label>
        </div>
      </DropdownItem>
    );
    fireEvent.click(screen.getByText('Checkbox label'));
    expect(screen.getByLabelText('Checkbox label')).toBeChecked();
  });

  it('applies indentation styles when indent is provided', () => {
    render(
      <DropdownItem index={0} indent={2}>
        Indented
      </DropdownItem>
    );
    const item = screen.getByText('Indented').closest('button');
    expect(item).toHaveStyle('--dropdown-indent-level: 2');
  });

  it('does not register ref when index is undefined', () => {
    expect(() => render(<DropdownItem>No index</DropdownItem>)).not.toThrow();
  });

  it('does not close dropdown when closeOnSelect=false (non-asChild)', () => {
    render(
      <DropdownItem index={0} onClick={mockOnClick} closeOnSelect={false}>
        Item
      </DropdownItem>
    );
    fireEvent.click(screen.getByText('Item'));
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockSetOpen).not.toHaveBeenCalled();
  });

  it('clicks inner checkbox and does not close when asChild + closeOnSelect=false', () => {
    const handleChange = jest.fn();
    render(
      <DropdownItem asChild index={0} closeOnSelect={false}>
        <input type="checkbox" onChange={handleChange} data-testid="inner" />
        Label text
      </DropdownItem>
    );
    const wrapper = screen.getByText('Label text').closest('div')!;
    fireEvent.click(wrapper);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(mockSetOpen).not.toHaveBeenCalled();
  });

  it('clicks inner radio on Enter key when asChild', () => {
    const handleChange = jest.fn();
    render(
      <DropdownItem asChild index={0} closeOnSelect={false}>
        <input type="radio" onChange={handleChange} />
        Radio label
      </DropdownItem>
    );
    const wrapper = screen.getByText('Radio label').closest('div')!;
    fireEvent.keyDown(wrapper, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('triggers handleClick on non-asChild', () => {
    const handle = jest.fn();
    render(
      <DropdownItem index={0} onClick={handle}>
        Clickable
      </DropdownItem>
    );

    const item = screen.getByText('Clickable');
    fireEvent.click(item); // triggers handleClick
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('triggers handleKeyDown on space key', () => {
    const handle = jest.fn();
    render(
      <DropdownItem index={0} onClick={handle}>
        SpaceItem
      </DropdownItem>
    );

    const item = screen.getByText('SpaceItem');
    fireEvent.keyDown(item, { key: ' ' }); // trigger handleKeyDown for space
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('triggers inner input click when enabled (asChild)', () => {
    const inputChange = jest.fn();
    render(
      <DropdownItem asChild index={0}>
        <input type="checkbox" onChange={inputChange} />
        Enabled input
      </DropdownItem>
    );

    const wrapper = screen.getByText('Enabled input').closest('div')!;
    fireEvent.click(wrapper);
    fireEvent.keyDown(wrapper, { key: 'Enter' });

    expect(inputChange).toHaveBeenCalledTimes(2);
  });

  it('calls onClick when asChild=true without inner input', () => {
    const handle = jest.fn();

    render(
      <DropdownItem asChild index={0} onClick={handle}>
        Plain child
      </DropdownItem>
    );

    const wrapper = screen.getByText('Plain child').closest('div')!;
    fireEvent.click(wrapper);

    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Enter when asChild=true and no input', () => {
    const handle = jest.fn();

    render(
      <DropdownItem asChild index={0} onClick={handle}>
        Key child
      </DropdownItem>
    );

    const wrapper = screen.getByText('Key child').closest('div')!;
    fireEvent.keyDown(wrapper, { key: 'Enter' });

    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('defaults to the menuitem role', () => {
    render(<DropdownItem index={0}>Item</DropdownItem>);
    expect(screen.getByRole('menuitem', { name: 'Item' })).toBeInTheDocument();
  });

  it('forwards a custom role and aria-checked for selection semantics', () => {
    render(
      <DropdownItem index={0} role="menuitemcheckbox" aria-checked>
        Item
      </DropdownItem>
    );
    const item = screen.getByRole('menuitemcheckbox', { name: 'Item' });
    expect(item).toHaveAttribute('aria-checked', 'true');
  });

  describe('checkbox / radio OptionContent', () => {
    const renderItem = (content: React.ReactNode, props: Record<string, UnknownType> = {}) =>
      render(
        <DropdownItem index={0} {...props}>
          {content}
        </DropdownItem>
      );

    it('announces a checkbox as a checked menuitemcheckbox', () => {
      renderItem(
        <OptionContent type="checkbox" selected>
          <OptionContent.Label>Tallinn</OptionContent.Label>
        </OptionContent>
      );
      expect(screen.getByRole('menuitemcheckbox', { name: 'Tallinn' })).toHaveAttribute('aria-checked', 'true');
    });

    it('finds a checkbox OptionContent inside a fragment', () => {
      renderItem(
        <>
          <OptionContent type="checkbox" selected>
            <OptionContent.Label>Tallinn</OptionContent.Label>
          </OptionContent>
        </>
      );
      expect(screen.getByRole('menuitemcheckbox', { name: 'Tallinn' })).toHaveAttribute('aria-checked', 'true');
    });

    it('announces an unchecked and an indeterminate checkbox', () => {
      const { rerender } = renderItem(<OptionContent type="checkbox">Tartu</OptionContent>);
      expect(screen.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'false');

      rerender(
        <DropdownItem index={0}>
          <OptionContent type="checkbox" indeterminate>
            Kõik
          </OptionContent>
        </DropdownItem>
      );
      expect(screen.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'mixed');
    });

    it('announces a radio as a menuitemradio', () => {
      renderItem(
        <OptionContent type="radio" selected>
          Elva
        </OptionContent>
      );
      expect(screen.getByRole('menuitemradio')).toHaveAttribute('aria-checked', 'true');
    });

    it('lets an explicit role and aria-checked win', () => {
      renderItem(
        <OptionContent type="checkbox" selected>
          Tallinn
        </OptionContent>,
        { role: 'menuitem' }
      );
      const item = screen.getByRole('menuitem');
      expect(item).not.toHaveAttribute('aria-checked');
    });

    it('adds no state for a default OptionContent or in navigation mode', () => {
      const { rerender } = renderItem(<OptionContent>Plain</OptionContent>);
      expect(screen.getByRole('menuitem')).not.toHaveAttribute('aria-checked');

      mockContextOverrides = { navigation: true };
      rerender(
        <DropdownItem index={0}>
          <OptionContent type="checkbox" selected>
            Link
          </OptionContent>
        </DropdownItem>
      );
      expect(screen.queryByRole('menuitemcheckbox')).not.toBeInTheDocument();
      expect(screen.getByText('Link').closest('button')).not.toHaveAttribute('aria-checked');
    });

    it('leaves the state to an indicator with control semantics', () => {
      renderItem(
        <OptionContent type="checkbox" selected indicatorSemantics="control">
          Tallinn
        </OptionContent>
      );
      expect(screen.queryByRole('menuitemcheckbox')).not.toBeInTheDocument();
    });
  });

  describe('asChild slot (navigable child, default closeOnSelect)', () => {
    it('merges the item props onto the child so the link itself is the single menuitem', () => {
      render(
        <DropdownItem asChild index={0}>
          <a href="/x">Go</a>
        </DropdownItem>
      );
      const item = screen.getByRole('menuitem', { name: 'Go' });
      expect(item.tagName).toBe('A');
      expect(item).toHaveAttribute('href', '/x');
      expect(item).toHaveAttribute('tabindex', '0');
      expect(item.querySelector('a, button, [tabindex]')).toBeNull();
    });

    it('runs both the item and child onClick and closes on click', () => {
      const childClick = jest.fn();
      render(
        <DropdownItem asChild index={0} onClick={mockOnClick}>
          <a href="/x" onClick={childClick}>
            Go
          </a>
        </DropdownItem>
      );
      fireEvent.click(screen.getByRole('menuitem', { name: 'Go' }));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(childClick).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it.each(['Enter', ' '])('activates exactly once via a single synthetic click on %s', (key) => {
      const childClick = jest.fn();
      render(
        <DropdownItem asChild index={0} onClick={mockOnClick}>
          <a href="/x" onClick={childClick}>
            Go
          </a>
        </DropdownItem>
      );
      fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Go' }), { key });
      // No double activation: the item callback, the child handler, and the close each run once.
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(childClick).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('preserves the child className alongside the dropdown item styling', () => {
      render(
        <DropdownItem asChild index={0}>
          <a href="/x" className="my-link">
            Go
          </a>
        </DropdownItem>
      );
      expect(screen.getByRole('menuitem', { name: 'Go' })).toHaveClass('my-link');
    });

    it('marks a disabled slotted anchor with aria-disabled and removes it from the tab order', () => {
      render(
        <DropdownItem asChild index={0} disabled>
          <a href="/x">Go</a>
        </DropdownItem>
      );
      const item = screen.getByRole('menuitem', { name: 'Go' });
      expect(item).toHaveAttribute('aria-disabled', 'true');
      expect(item).toHaveAttribute('tabindex', '-1');
    });

    it('does not activate a disabled slotted anchor on click', () => {
      const childClick = jest.fn();
      render(
        <DropdownItem asChild index={0} disabled onClick={mockOnClick}>
          <a href="/x" onClick={childClick}>
            Go
          </a>
        </DropdownItem>
      );
      const clickEvent = fireEvent.click(screen.getByRole('menuitem', { name: 'Go' }));
      expect(mockOnClick).not.toHaveBeenCalled();
      expect(childClick).not.toHaveBeenCalled();
      expect(mockSetOpen).not.toHaveBeenCalled();
      expect(clickEvent).toBe(false);
    });

    it('does not activate a disabled slotted anchor on Enter', () => {
      const childClick = jest.fn();
      render(
        <DropdownItem asChild index={0} disabled onClick={mockOnClick}>
          <a href="/x" onClick={childClick}>
            Go
          </a>
        </DropdownItem>
      );
      fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Go' }), { key: 'Enter' });
      expect(mockOnClick).not.toHaveBeenCalled();
      expect(childClick).not.toHaveBeenCalled();
      expect(mockSetOpen).not.toHaveBeenCalled();
    });
  });

  describe('Checkbox / Radio items', () => {
    it.each([
      [
        'Checkbox',
        'menuitemcheckbox',
        <Checkbox key="c" id="c" label="Tallinn" value="tallinn" name="" onChange={jest.fn()} />,
      ],
      [
        'Radio',
        'menuitemradio',
        <Radio key="r" id="r" label="Tallinn" value="tallinn" name="city" onChange={jest.fn()} />,
      ],
    ])('makes the %s input the %s and the row presentational', (_, role, control) => {
      const { container } = render(<DropdownItem index={0}>{control}</DropdownItem>);

      const input = screen.getByRole(role, { name: 'Tallinn' });
      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('tabindex', '0');

      const row = container.firstElementChild as HTMLElement;
      expect(row.tagName).toBe('DIV');
      expect(row).toHaveAttribute('role', 'none');
      expect(row).not.toHaveAttribute('tabindex');
      expect(row).toHaveClass('tedi-dropdown__item');
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    it('gives the input the roving tabindex and registers it for arrow-key navigation', () => {
      const listItemsRef = { current: [] as HTMLElement[] };
      mockContextOverrides = { activeIndex: 0, listItemsRef };
      render(
        <>
          <DropdownItem index={0}>
            <Checkbox id="a" label="Tallinn" value="tallinn" name="" onChange={jest.fn()} />
          </DropdownItem>
          <DropdownItem index={1}>
            <Checkbox id="b" label="Tartu" value="tartu" name="" onChange={jest.fn()} />
          </DropdownItem>
        </>
      );

      const tallinn = screen.getByRole('menuitemcheckbox', { name: 'Tallinn' });
      const tartu = screen.getByRole('menuitemcheckbox', { name: 'Tartu' });
      expect(tallinn).toHaveAttribute('tabindex', '0');
      expect(tartu).toHaveAttribute('tabindex', '-1');
      expect(listItemsRef.current).toEqual([tallinn, tartu]);
    });

    it('toggles the input once on a row click or Enter and keeps the dropdown open', () => {
      const onChange = jest.fn();
      const { container } = render(
        <DropdownItem index={0}>
          <Checkbox id="c" label="Tallinn" value="tallinn" name="" onChange={onChange} />
        </DropdownItem>
      );

      fireEvent.click(container.firstElementChild as HTMLElement);
      fireEvent.keyDown(screen.getByRole('menuitemcheckbox'), { key: 'Enter' });

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(mockSetOpen).not.toHaveBeenCalled();
    });

    it('leaves Space on the focused input to the browser', () => {
      const onChange = jest.fn();
      render(
        <DropdownItem index={0}>
          <Checkbox id="c" label="Tallinn" value="tallinn" name="" onChange={onChange} />
        </DropdownItem>
      );

      const notPrevented = fireEvent.keyDown(screen.getByRole('menuitemcheckbox'), { key: ' ' });

      expect(notPrevented).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('marks a disabled item and an indeterminate checkbox on the input', async () => {
      const onChange = jest.fn();
      render(
        <DropdownItem index={0} disabled>
          <Checkbox id="c" label="Kõik" value="" name="" indeterminate onChange={onChange} />
        </DropdownItem>
      );

      const input = screen.getByRole('menuitemcheckbox', { name: 'Kõik' });
      expect(input).toHaveAttribute('aria-disabled', 'true');
      expect(input).toHaveAttribute('aria-checked', 'mixed');

      // user-event, as fireEvent toggles a disabled input in jsdom, unlike a browser
      const user = userEvent.setup();
      await user.click(input);
      await user.click(screen.getByText('Kõik'));
      input.focus();
      await user.keyboard(' ');

      expect(onChange).not.toHaveBeenCalled();
      expect(input).not.toBeChecked();
      expect(input).toHaveAttribute('aria-checked', 'mixed');
    });

    it('passes the list-navigation handlers the input, not the row', () => {
      const onFocus = jest.fn();
      const onMouseMove = jest.fn();
      const onClick = jest.fn();
      mockContextOverrides = {
        getItemProps: (props: UnknownType) => ({ ...props, onFocus, onMouseMove, onClick }),
      };
      const { container } = render(
        <DropdownItem index={0}>
          <Checkbox id="a" label="Tallinn" value="tallinn" name="" onChange={jest.fn()} />
        </DropdownItem>
      );
      const row = container.firstElementChild as HTMLElement;
      const input = screen.getByRole('menuitemcheckbox', { name: 'Tallinn' });

      fireEvent.focus(input);
      fireEvent.mouseMove(row);
      fireEvent.click(row);

      for (const handler of [onFocus, onMouseMove, onClick]) {
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ currentTarget: input }));
      }
    });

    it('does not register the input without an index', () => {
      const listItemsRef = { current: [] as HTMLElement[] };
      mockContextOverrides = { listItemsRef };
      render(
        <DropdownItem>
          <Checkbox id="a" label="Tallinn" value="tallinn" name="" onChange={jest.fn()} />
        </DropdownItem>
      );

      expect(screen.getByRole('menuitemcheckbox', { name: 'Tallinn' })).toBeInTheDocument();
      expect(listItemsRef.current).toEqual([]);
    });

    it('puts the item ARIA props on the input, and lets aria-checked override', () => {
      render(
        <DropdownItem index={0} aria-describedby="hint" aria-checked="mixed">
          <Checkbox id="a" label="Tallinn" value="tallinn" name="" onChange={jest.fn()} />
        </DropdownItem>
      );
      const input = screen.getByRole('menuitemcheckbox', { name: 'Tallinn' });

      expect(input).toHaveAttribute('aria-describedby', 'hint');
      expect(input).toHaveAttribute('aria-checked', 'mixed');
    });

    it('unregisters the input when the item unmounts', () => {
      const listItemsRef = { current: [] as (HTMLElement | null)[] };
      mockContextOverrides = { listItemsRef };
      const { unmount } = render(
        <DropdownItem index={0}>
          <Checkbox id="a" label="Tallinn" value="tallinn" name="" onChange={jest.fn()} />
        </DropdownItem>
      );
      expect(listItemsRef.current[0]).not.toBeNull();

      unmount();
      expect(listItemsRef.current[0]).toBeNull();
    });

    it('uses the role prop on the input when given', () => {
      render(
        <DropdownItem index={0} role="option">
          <Checkbox id="c" label="Tallinn" value="tallinn" name="" onChange={jest.fn()} />
        </DropdownItem>
      );

      expect(screen.getByRole('option', { name: 'Tallinn' }).tagName).toBe('INPUT');
    });
  });

  describe('asChild with a link', () => {
    it('keeps merging the item props onto a link child', () => {
      render(
        <DropdownItem asChild index={0}>
          <a href="/x">Go</a>
        </DropdownItem>
      );

      const link = screen.getByRole('menuitem', { name: 'Go' });
      expect(link.tagName).toBe('A');
      expect(link).toHaveClass('tedi-dropdown__item');
    });
  });

  describe('disabled keyboard handling', () => {
    it.each(['Enter', ' '])('cancels %p on a disabled item', (key) => {
      render(
        <DropdownItem index={0} onClick={mockOnClick} disabled>
          Item
        </DropdownItem>
      );

      expect(fireEvent.keyDown(screen.getByText('Item'), { key })).toBe(false);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('leaves other keys on a disabled item alone', () => {
      render(
        <DropdownItem index={0} onClick={mockOnClick} disabled>
          Item
        </DropdownItem>
      );

      expect(fireEvent.keyDown(screen.getByText('Item'), { key: 'a' })).toBe(true);
    });
  });

  describe('items holding a native input', () => {
    it('toggles the input on Enter and closes the dropdown', () => {
      const onChange = jest.fn();
      render(
        <DropdownItem index={0}>
          <label>
            <input type="checkbox" onChange={onChange} />
            Notify me
          </label>
        </DropdownItem>
      );

      fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Enter' });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('toggles the input on Enter and stays open with closeOnSelect={false}', () => {
      const onChange = jest.fn();
      render(
        <DropdownItem index={0} closeOnSelect={false}>
          <label>
            <input type="checkbox" onChange={onChange} />
            Notify me
          </label>
        </DropdownItem>
      );

      fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Enter' });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).not.toHaveBeenCalled();
    });
  });

  describe('navigation mode', () => {
    it('takes a disabled item out of the tab order', () => {
      mockContextOverrides = { navigation: true };
      render(
        <DropdownItem index={0} disabled>
          Item
        </DropdownItem>
      );

      expect(screen.getByRole('button', { name: 'Item' })).toHaveAttribute('tabindex', '-1');
    });

    it('does not intercept Space on a navigation link, leaving native link behavior', () => {
      mockContextOverrides = { navigation: true };
      const childClick = jest.fn();
      render(
        <DropdownItem asChild index={0} onClick={mockOnClick}>
          <a href="/x" onClick={childClick}>
            Go
          </a>
        </DropdownItem>
      );

      const link = screen.getByRole('link', { name: 'Go' });
      const notPrevented = fireEvent.keyDown(link, { key: ' ' });

      expect(childClick).not.toHaveBeenCalled();
      expect(mockOnClick).not.toHaveBeenCalled();
      expect(mockSetOpen).not.toHaveBeenCalled();
      expect(notPrevented).toBe(true);
    });

    it('still lets the navigation link handle its own click', () => {
      mockContextOverrides = { navigation: true };
      const childClick = jest.fn();
      render(
        <DropdownItem asChild index={0}>
          <a href="/x" onClick={childClick}>
            Go
          </a>
        </DropdownItem>
      );

      fireEvent.click(screen.getByRole('link', { name: 'Go' }));
      expect(childClick).toHaveBeenCalledTimes(1);
    });
  });
});
