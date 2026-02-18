import { fireEvent, render } from '@testing-library/react';

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

    fireEvent.keyDown(getByText('Item'), { key: 'Enter' });
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
});
