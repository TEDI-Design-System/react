import { fireEvent, render, screen } from '@testing-library/react';

import { UnknownType } from '../../../../types/commonTypes';
import { DropdownItem } from './dropdown-item';

const mockSetOpen = jest.fn();
const mockOnClick = jest.fn();

jest.mock('../dropdown-context', () => ({
  useDropdownContext: () => ({
    getItemProps: (props: UnknownType) => props,
    listItemsRef: { current: [] },
    setOpen: mockSetOpen,
    activeIndex: 0,
    divided: false,
    variant: 'default',
  }),
}));

describe('DropdownItem', () => {
  beforeEach(() => {
    mockSetOpen.mockClear();
    mockOnClick.mockClear();
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

  it('applies indentation styles when indent is provided', () => {
    render(
      <DropdownItem index={0} indent={2}>
        Indented
      </DropdownItem>
    );
    const item = screen.getByText('Indented').closest('button');
    expect(item).toHaveStyle('--dropdown-indent: 2rem');
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
});
