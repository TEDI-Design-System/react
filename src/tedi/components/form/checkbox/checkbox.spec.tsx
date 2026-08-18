import { fireEvent, render, screen } from '@testing-library/react';
import { act, useState } from 'react';

import Checkbox from './checkbox';

import '@testing-library/jest-dom';

jest.mock('../../base/icon/icon', () => ({
  Icon: jest.fn(({ name }) => <span data-testid={`icon-${name}`}>{name}</span>),
}));

describe('Checkbox component', () => {
  it('renders with default props', () => {
    const { container } = render(<Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" />);

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it('renders with checked prop', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" defaultChecked />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeChecked();
  });

  it('renders with disabled prop', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" disabled />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeDisabled();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" onChange={handleChange} />
    );

    const input = container.querySelector('input[type="checkbox"]');
    if (input) {
      fireEvent.click(input);
    }
    expect(handleChange).toHaveBeenCalledWith('check-value', true);
  });

  it('renders with hideLabel prop', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" hideLabel />
    );

    const hiddenLabel = container.querySelector('label');

    expect(hiddenLabel).toBeInTheDocument();
    expect(hiddenLabel).toHaveClass('tedi-form-label--hidden');
  });

  it('renders with tooltip', () => {
    const { getByTestId } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" tooltip="Tooltip Text" />
    );

    expect(getByTestId('icon-info')).toBeInTheDocument();
  });

  it('renders with extra content', () => {
    const { getByText } = render(
      <Checkbox
        id="check-id"
        label="Check Label"
        value="check-value"
        name="check-group"
        helper={{ text: 'Extra Content' }}
      />
    );

    expect(getByText('Extra Content')).toBeInTheDocument();
  });

  it('handles defaultChecked correctly', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" defaultChecked />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeChecked();
  });

  it('changes state when clicked if not controlled', async () => {
    const TestComponent = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <Checkbox
          id="check-id"
          label="Check Label"
          value="check-value"
          name="check-group"
          defaultChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      );
    };

    render(<TestComponent />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(checkbox).toBeChecked();
  });

  it('does not change state when clicked if controlled', async () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Checkbox
        id="check-id"
        label="Check Label"
        value="check-value"
        name="check-group"
        checked={false}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(checkbox).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('check-value', true);

    rerender(
      <Checkbox
        id="check-id"
        label="Check Label"
        value="check-value"
        name="check-group"
        checked={true}
        onChange={handleChange}
      />
    );

    expect(checkbox).toBeChecked();
  });

  it('renders with indeterminate state', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" indeterminate />
    );

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input).not.toHaveAttribute('aria-checked');
    expect(input.indeterminate).toBe(true);
    expect(input).not.toBeChecked();

    const indeterminateIcon = container.querySelector('.tedi-checkbox__indicator--indeterminate');
    expect(indeterminateIcon).toBeInTheDocument();
  });

  it('renders with indeterminate state and ignores checked', () => {
    render(<Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" checked indeterminate />);

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input).not.toBeChecked();
  });

  it('clears the indeterminate state when the prop is removed', () => {
    const { rerender } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" indeterminate />
    );

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);

    // Rerender without the click so this asserts the prop-driven effect, not the
    // native reset a checkbox click performs on `indeterminate`.
    rerender(<Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" />);

    expect(input.indeterminate).toBe(false);
  });

  it('calls labelRef.current.click() when clicked', () => {
    const { getByTestId } = render(
      <Checkbox id="check-id" label="Checkbox Label" value="check-value" name="check-group" />
    );

    const label = getByTestId('checkbox-label');
    const indicator = getByTestId('checkbox-indicator');

    jest.spyOn(label, 'click').mockImplementation(() => {});

    fireEvent.click(indicator);

    expect(label.click).toHaveBeenCalled();
  });

  it('renders required indicator when required prop is true', () => {
    render(<Checkbox id="checkbox-id" label="Checkbox Label" value="checkbox-value" name="checkbox-group" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('exposes the required state via the native required attribute', () => {
    render(<Checkbox id="checkbox-id" label="Checkbox Label" value="checkbox-value" name="checkbox-group" required />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
    expect(checkbox).not.toHaveAttribute('aria-required');
  });

  it('is not required by default', () => {
    render(<Checkbox id="checkbox-id" label="Checkbox Label" value="checkbox-value" name="checkbox-group" />);

    expect(screen.getByRole('checkbox')).not.toBeRequired();
  });

  it('exposes the invalid state programmatically via aria-invalid', () => {
    render(<Checkbox id="checkbox-id" label="Checkbox Label" value="checkbox-value" name="checkbox-group" invalid />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates the error helper text as the accessible description when invalid', () => {
    render(
      <Checkbox
        id="checkbox-id"
        label="Checkbox Label"
        value="checkbox-value"
        name="checkbox-group"
        invalid
        helper={{ text: 'This field is required', type: 'error' }}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription('This field is required');
  });

  it('does not set aria-invalid when valid', () => {
    render(<Checkbox id="checkbox-id" label="Checkbox Label" value="checkbox-value" name="checkbox-group" />);

    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid');
  });

  it('card variant: accessible name is the label only; description and helper are the description', () => {
    render(
      <Checkbox
        id="cb-card"
        variant="card"
        label="Express delivery"
        value="express"
        description="Arrives tomorrow"
        helper={{ text: 'Costs extra' }}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Express delivery' });
    // Name is not merged with the description/helper text.
    expect(checkbox).toHaveAccessibleName('Express delivery');
    expect(checkbox).toHaveAccessibleDescription(/Arrives tomorrow/);
    expect(checkbox).toHaveAccessibleDescription(/Costs extra/);
  });
});
