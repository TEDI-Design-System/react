import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle, { ToggleProps } from './toggle';

import '@testing-library/jest-dom';

describe('Toggle component', () => {
  const defaultProps: ToggleProps = {
    id: 'test-toggle',
    label: 'Enable notifications',
  };

  it('renders with default properties', () => {
    render(<Toggle {...defaultProps} />);

    const input = screen.getByRole('switch');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-toggle');
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('renders the label correctly', () => {
    render(<Toggle {...defaultProps} />);

    const label = screen.getByText(/enable notifications/i);
    expect(label).toBeInTheDocument();
  });

  it('renders hidden label when hideLabel is true', () => {
    render(<Toggle {...defaultProps} hideLabel />);

    const label = screen.getByText(/enable notifications/i);
    expect(label).toBeInTheDocument();
    expect(label.closest('label')).toHaveClass('tedi-toggle__label');
  });

  it('calls onChange when toggled', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Toggle {...defaultProps} onChange={handleChange} />);

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('respects controlled checked state', () => {
    const { rerender } = render(<Toggle {...defaultProps} checked={false} onChange={jest.fn()} />);

    let toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();

    rerender(<Toggle {...defaultProps} checked={true} onChange={jest.fn()} />);
    toggle = screen.getByRole('switch');
    expect(toggle).toBeChecked();
  });

  it('renders as uncontrolled with defaultChecked', () => {
    render(<Toggle {...defaultProps} defaultChecked />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeChecked();
  });

  it('disables the toggle when disabled prop is true', () => {
    render(<Toggle {...defaultProps} disabled />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
  });

  it('disables the toggle and prevents onChange when isLoading is true', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Toggle {...defaultProps} isLoading onChange={handleChange} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();

    await user.click(toggle);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<Toggle {...defaultProps} isLoading />);

    const spinner = screen.getByTestId('tedi-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('shows lock icon when icon prop is true', () => {
    render(<Toggle {...defaultProps} icon size="large" />);

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  it('renders label on the right when labelPosition="right"', () => {
    render(<Toggle {...defaultProps} labelPosition="right" />);

    const control = screen.getByRole('switch').closest('.tedi-toggle__control');
    expect(control).toHaveClass('tedi-toggle__control--label-right');
  });

  it('renders label on the left by default', () => {
    render(<Toggle {...defaultProps} />);

    const control = screen.getByRole('switch').closest('.tedi-toggle__control');
    expect(control).toHaveClass('tedi-toggle__control--label-left');
  });

  it('renders helper text when provided', () => {
    render(<Toggle {...defaultProps} helper={{ text: 'This is a helper message', type: 'hint' }} />);

    const helper = screen.getByText(/this is a helper message/i);
    expect(helper).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Toggle {...defaultProps} size="default" />);

    const toggleContainer = screen.getByRole('switch').closest('.tedi-toggle');
    expect(toggleContainer).toHaveClass('tedi-toggle--default');

    rerender(<Toggle {...defaultProps} size="large" />);
    expect(toggleContainer).toHaveClass('tedi-toggle--large');
  });

  it('applies variant classes correctly', () => {
    render(<Toggle {...defaultProps} color="colored" type="outlined" />);

    const toggleContainer = screen.getByRole('switch').closest('.tedi-toggle');
    expect(toggleContainer).toHaveClass('tedi-toggle--colored-outlined');
  });

  it('applies active class when checked', () => {
    render(<Toggle {...defaultProps} checked onChange={jest.fn()} />);
    const toggleContainer = screen.getByRole('switch').closest('.tedi-toggle');
    expect(toggleContainer).toHaveClass('tedi-toggle--active');
  });

  it('applies disabled class when disabled or loading', () => {
    const { rerender } = render(<Toggle {...defaultProps} disabled />);

    let toggleContainer = screen.getByRole('switch').closest('.tedi-toggle');
    expect(toggleContainer).toHaveClass('tedi-toggle--disabled');

    rerender(<Toggle {...defaultProps} isLoading />);
    toggleContainer = screen.getByRole('switch').closest('.tedi-toggle');
    expect(toggleContainer).toHaveClass('tedi-toggle--disabled');
  });
});
