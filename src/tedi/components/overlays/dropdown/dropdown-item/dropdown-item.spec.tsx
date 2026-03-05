import { fireEvent, render, screen } from '@testing-library/react';

import { DropdownItem } from './dropdown-item';

const mockSetOpen = jest.fn();
const mockOnClick = jest.fn();

jest.mock('../dropdown-context', () => ({
  useDropdownContext: () => ({
    getItemProps: (props: never) => props,
    listItemsRef: { current: [] },
    setOpen: mockSetOpen,
    activeIndex: 0,
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

  it('does not close dropdown when closeOnSelect=false', () => {
    const { getByText } = render(
      <DropdownItem index={0} onClick={mockOnClick} closeOnSelect={false}>
        Item
      </DropdownItem>
    );

    fireEvent.click(getByText('Item'));
    expect(mockSetOpen).not.toHaveBeenCalled();
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

    fireEvent.click(getByText('Item'));
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

  it('clicks inner checkbox/radio when wrapper is clicked (closeOnSelect=false)', () => {
    const handleChange = jest.fn();

    render(
      <DropdownItem asChild index={0} closeOnSelect={false}>
        <input type="checkbox" onChange={handleChange} data-testid="inner-input" />
        Label
      </DropdownItem>
    );

    fireEvent.click(screen.getByTestId('inner-input').parentElement!);
    expect(handleChange).toHaveBeenCalledTimes(0);
    expect(mockSetOpen).not.toHaveBeenCalled();
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

  it('ignores events when disabled (even asChild)', () => {
    const handleChange = jest.fn();

    const { getByText } = render(
      <DropdownItem asChild disabled index={0}>
        <input type="checkbox" onChange={handleChange} />
        Disabled item
      </DropdownItem>
    );

    fireEvent.click(getByText('Disabled item'));
    expect(handleChange).not.toHaveBeenCalled();

    fireEvent.keyDown(getByText('Disabled item').closest('div')!, { key: 'Enter' });
    expect(handleChange).not.toHaveBeenCalled();
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
    expect(() => {
      render(<DropdownItem> No index </DropdownItem>);
    }).not.toThrow();
  });
});
