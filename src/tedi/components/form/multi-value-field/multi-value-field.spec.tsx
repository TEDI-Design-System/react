import { fireEvent, render, screen } from '@testing-library/react';

import MultiValueField, { MultiValueFieldProps } from './multi-value-field';

import '@testing-library/jest-dom';

describe('MultiValueField', () => {
  const defaultProps: MultiValueFieldProps = {
    id: 'test-multi',
    label: 'Test Multi',
  };

  it('renders label when provided', () => {
    render(<MultiValueField {...defaultProps} />);
    expect(screen.getByText('Test Multi')).toBeInTheDocument();
  });

  it('renders values as tags', () => {
    render(<MultiValueField {...defaultProps} values={['apple', 'banana']} />);

    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
  });

  it('calls onChange when removing a value', () => {
    const handleChange = jest.fn();

    render(<MultiValueField {...defaultProps} values={['one', 'two']} onChange={handleChange} />);

    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);

    expect(handleChange).toHaveBeenCalledWith(['two']);
  });

  it('shows clear button when values exist and isClearable is true', () => {
    render(<MultiValueField {...defaultProps} values={['one']} />);

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('clears all values when clear button is clicked', () => {
    const handleChange = jest.fn();

    render(<MultiValueField {...defaultProps} values={['one', 'two']} onChange={handleChange} />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('does not show clear button when isClearable is false', () => {
    render(<MultiValueField {...defaultProps} values={['one']} isClearable={false} />);

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('renders hidden input when name is provided', () => {
    render(<MultiValueField {...defaultProps} name="test-name" values={['one', 'two']} />);

    const input = document.querySelector('input[type="hidden"]');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveValue(JSON.stringify(['one', 'two']));
  });

  it('renders icon when provided', () => {
    render(<MultiValueField {...defaultProps} icon="add" />);

    // Icon renders as span[data-name="icon"] in your setup
    expect(document.querySelector('[data-name="icon"]')).toBeInTheDocument();
  });

  it('calls onIconClick when icon is clicked', () => {
    const handleClick = jest.fn();

    render(<MultiValueField {...defaultProps} icon="add" onIconClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<MultiValueField {...defaultProps} className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
