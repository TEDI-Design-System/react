import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { et } from 'react-day-picker/locale';

import { DateField, DateFieldProps } from './date-field';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => key,
  }),
}));

describe('DateField component', () => {
  const defaultProps: DateFieldProps = {
    label: 'Birth date',
    mode: 'single',
    id: 'date-field',
  };

  it('renders without crashing and shows label', () => {
    render(<DateField {...defaultProps} />);
    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
  });

  it('renders TextField in single mode by default', () => {
    render(<DateField {...defaultProps} />);

    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
  });

  it('renders MultiValueField in multiple mode', () => {
    render(<DateField {...defaultProps} mode="multiple" />);

    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
  });

  it('shows placeholder when no value is selected', () => {
    render(<DateField {...defaultProps} placeholder="Pick a date" />);
    expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument();
  });

  it('displays formatted date when value is provided (single mode)', () => {
    const selected = new Date(2024, 5, 15); // 15.06.2024 in et-EE
    render(<DateField {...defaultProps} selected={selected} />);

    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveValue('15.06.2024');
  });

  it('displays — formatted range when mode=range', () => {
    const range = { from: new Date(2025, 0, 10), to: new Date(2025, 0, 25) };
    render(<DateField {...defaultProps} mode="range" selected={range} />);

    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveValue('10.01.2025 – 25.01.2025');
  });

  it('is read-only when readOnly=true', () => {
    render(<DateField {...defaultProps} readOnly />);
    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveAttribute('readonly');
  });

  it('marks field required', () => {
    render(<DateField {...defaultProps} required />);

    expect(screen.getByRole('textbox', { name: /birth date/i })).toBeRequired();
  });

  it('opens calendar when clicking input (openBehavior=input)', async () => {
    const user = userEvent.setup();
    render(<DateField {...defaultProps} calendarTrigger="input" />);

    const input = screen.getByLabelText('Birth date');
    await user.click(input);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes calendar after selecting date', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<DateField {...defaultProps} onSelect={onSelect} initialMonth={new Date(2025, 5, 1)} />);

    await user.click(screen.getByRole('button'));
    const day = await screen.findByText('15');
    await user.click(day);

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('uses custom locale when provided', () => {
    render(<DateField {...defaultProps} locale={et} initialMonth={new Date(2025, 0, 1)} />);
  });

  it('applies custom className', () => {
    render(<DateField {...defaultProps} className="my-datepicker" />);
    const input = screen.getByLabelText('Birth date');
    expect(input.closest('.tedi-date-field__container')).toHaveClass('my-datepicker');
  });

  it('parses manual input', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<DateField {...defaultProps} parseDate={(v) => new Date(2024, 0, 1)} onSelect={onSelect} />);
    await user.type(screen.getByLabelText('Birth date'), '01.01.2024');
    expect(onSelect).toHaveBeenCalled();
  });

  it('updates when controlled value changes', () => {
    const { rerender } = render(<DateField {...defaultProps} selected={undefined} />);
    rerender(<DateField {...defaultProps} selected={new Date(2024, 5, 15)} />);
    expect(screen.getByLabelText('Birth date')).toHaveValue('15.06.2024');
  });

  it('removes value from MultiValueField in multiple mode', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <DateField
        {...defaultProps}
        mode="multiple"
        selected={[new Date(2025, 5, 15), new Date(2025, 6, 20)]}
        onSelect={onSelect}
      />
    );

    const removeButtons = screen.getAllByRole('button', { name: 'close' });
    await user.click(removeButtons[0]);

    expect(onSelect).toHaveBeenCalledWith(
      expect.arrayContaining([expect.any(Date)]),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
  });

  it('respects readOnly prop', () => {
    render(<DateField {...defaultProps} readOnly />);

    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveAttribute('readonly');
  });

  it('uses defaultValue for uncontrolled component', () => {
    const defaultVal = new Date(2025, 0, 15);
    render(<DateField {...defaultProps} defaultValue={defaultVal} />);

    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveValue('15.01.2025');
  });

  it('handles manual input parsing with parseDate prop', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const customParse = jest.fn((val: string) => {
      if (val === 'today') return new Date(2025, 5, 15);
      return undefined;
    });

    render(<DateField {...defaultProps} parseDate={customParse} onSelect={onSelect} />);

    const input = screen.getByLabelText('Birth date');
    await user.type(input, 'today');
    await user.keyboard('{Enter}'); // or fireEvent.keyDown if preferred

    expect(customParse).toHaveBeenCalledWith('today');
    expect(onSelect).toHaveBeenCalled();
  });

  it('applies inputProps correctly', () => {
    render(<DateField {...defaultProps} inputProps={{ disabled: true, size: 'small' }} />);

    const input = screen.getByLabelText('Birth date');
    expect(input).toBeDisabled();
  });

  it('calls onSelect and formats value when selecting a date', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<DateField {...defaultProps} onSelect={onSelect} initialMonth={new Date(2025, 5, 1)} />);

    await user.click(screen.getByRole('button'));

    const day = await screen.findByText('15');
    await user.click(day);

    expect(onSelect).toHaveBeenCalled();

    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveValue('15.06.2025');
  });

  it('does not close calendar when closeOnSelect is false', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} closeOnSelect={false} initialMonth={new Date(2025, 5, 1)} />);

    await user.click(screen.getByRole('button'));
    const day = await screen.findByText('15');
    await user.click(day);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not call onSelect when input is invalid', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<DateField {...defaultProps} onSelect={onSelect} />);

    const input = screen.getByLabelText('Birth date');
    await user.clear(input);
    await user.type(input, 'invalid-date');

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('uses custom formatDate when provided', async () => {
    const user = userEvent.setup();
    const formatDate = jest.fn(() => 'CUSTOM FORMAT');

    render(<DateField {...defaultProps} formatDate={formatDate} selected={new Date(2025, 5, 15)} />);

    expect(screen.getByLabelText('Birth date')).toHaveValue('CUSTOM FORMAT');
  });

  it('updates selected values in multiple mode', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<DateField {...defaultProps} mode="multiple" selected={[new Date(2025, 5, 15)]} onSelect={onSelect} />);

    const removeButtons = screen.getAllByRole('button', { name: 'close' });
    await user.click(removeButtons[0]);

    expect(onSelect).toHaveBeenCalled();
  });

  it('renders with minDate and maxDate without crashing', () => {
    render(<DateField {...defaultProps} minDate={new Date(2025, 0, 1)} maxDate={new Date(2025, 11, 31)} />);

    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
  });

  it('updates internal state when controlled value changes', () => {
    const { rerender } = render(<DateField {...defaultProps} selected={new Date(2025, 0, 1)} />);

    rerender(<DateField {...defaultProps} selected={new Date(2025, 1, 1)} />);

    expect(screen.getByLabelText('Birth date')).toHaveValue('01.02.2025');
  });
});
