import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import MultiValueField, { MultiValueFieldProps } from './multi-value-field';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('MultiValueField', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: MultiValueFieldProps = {
    id: 'test-multi',
    label: 'Test Multi',
    placeholder: 'Add value',
  };

  it('renders the input correctly', () => {
    render(<MultiValueField {...defaultProps} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-multi');
    expect(input).toHaveAttribute('placeholder', 'Add value');
  });

  it('adds a value when pressing Enter', () => {
    render(<MultiValueField {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('does not add empty or whitespace-only values', () => {
    render(<MultiValueField {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
  });

  it('does not add duplicate values', () => {
    render(<MultiValueField {...defaultProps} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getAllByText('hello')).toHaveLength(1);
  });

  it('removes last value on Backspace when input is empty', () => {
    render(<MultiValueField {...defaultProps} />);

    const input = screen.getByRole('textbox');

    // Add two values
    fireEvent.change(input, { target: { value: 'one' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.change(input, { target: { value: 'two' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('two')).toBeInTheDocument();

    // Backspace when input is empty
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(screen.getByText('one')).toBeInTheDocument();
  });

  it('calls onChange when values change', () => {
    const handleChange = jest.fn();
    render(<MultiValueField {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith(['hello']);
  });

  it('renders initial controlled values', () => {
    render(<MultiValueField {...defaultProps} values={['apple', 'banana']} />);

    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
  });

  it('does not allow removing values when disabled', () => {
    render(<MultiValueField {...defaultProps} values={['one']} disabled />);

    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MultiValueField {...defaultProps} className="custom-multi-field" />);

    const field = screen.getByRole('textbox').closest('div[class*="tedi-multi-value-field"]');
    expect(field).toHaveClass('custom-multi-field');
  });
});
