import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import NumberField, { NumberFieldProps } from './number-field';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('NumberField component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: NumberFieldProps = {
    id: 'test-number-field',
    label: 'Test Label',
    step: 1,
    min: 0,
    max: 10,
    onChange: jest.fn(),
    helper: { type: 'hint', text: 'Helper text', id: 'helper-id' },
  };

  it('renders the NumberField with default properties', () => {
    render(<NumberField {...defaultProps} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-number-field');
  });

  it('renders the label', () => {
    render(<NumberField {...defaultProps} />);
    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
  });

  it('increments the value when the increment button is clicked', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(incrementButton);

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('decrements the value when the decrement button is clicked', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} defaultValue={5} />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    fireEvent.click(decrementButton);

    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('does not decrement below the minimum value', () => {
    render(<NumberField {...defaultProps} defaultValue={0} />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    fireEvent.click(decrementButton);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue('0');
  });

  it('does not increment above the maximum value', () => {
    render(<NumberField {...defaultProps} defaultValue={10} />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(incrementButton);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue('10');
  });

  it('parses a comma as a decimal separator', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} min={0} max={100} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '1,5' } });
    expect(handleChange).toHaveBeenCalledWith(1.5);
  });

  it('does not fire onChange for partial entries like a lone minus sign', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} min={-100} max={100} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '-' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not fire onChange for inputs with trailing non-numeric characters (1a, 12-, 1.5xyz)', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} min={-100} max={100} />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '1a' } });
    fireEvent.change(input, { target: { value: '12-' } });
    fireEvent.change(input, { target: { value: '1.5xyz' } });
    fireEvent.change(input, { target: { value: '1e5' } });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not re-fire onChange when the parsed value is unchanged (e.g. trailing decimal separator)', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} min={0} max={100} />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith(2);

    fireEvent.change(input, { target: { value: '2,' } });
    expect(handleChange).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: '2,5' } });
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenLastCalledWith(2.5);
  });

  it('fires onChange with undefined when the input is cleared', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} defaultValue={5} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  it('renders helper text when provided', () => {
    render(<NumberField {...defaultProps} />);
    const helper = screen.getByText(/helper text/i);
    expect(helper).toBeInTheDocument();
  });

  it('disables the input and buttons when the disabled prop is true', () => {
    render(<NumberField {...defaultProps} disabled />);
    const input = screen.getByRole('spinbutton');
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const decrementButton = screen.getByRole('button', { name: /decrement/i });

    expect(input).toBeDisabled();
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });

  it('shows validation error when invalid prop is true', () => {
    render(<NumberField {...defaultProps} invalid />);
    const container = document.querySelector('.tedi-number-field');
    expect(container).toHaveClass('tedi-number-field--invalid');
  });

  it('displays the suffix when provided', () => {
    render(<NumberField {...defaultProps} suffix="kg" />);
    const suffix = screen.getByText(/kg/i);
    expect(suffix).toBeInTheDocument();
  });

  it('updates value on manual input', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });

    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('applies the "small" class when size is set to "small"', () => {
    render(<NumberField {...defaultProps} size="small" />);
    const container = document.querySelector('.tedi-number-field');
    expect(container).toHaveClass('tedi-number-field--small');
  });

  it('formats the displayed value with the configured decimal separator', () => {
    render(<NumberField {...defaultProps} decimalSeparator="," defaultValue={1.5} min={-10} max={10} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue('1,5');
  });

  it('reformats the display to the configured decimal separator on blur', () => {
    render(<NumberField {...defaultProps} decimalSeparator="," defaultValue={0} min={0} max={10} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '2.5' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('2,5');
  });

  it('uses inputMode="decimal" when decimalSeparator is a comma', () => {
    render(<NumberField {...defaultProps} decimalSeparator="," />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('inputmode', 'decimal');
  });
});
