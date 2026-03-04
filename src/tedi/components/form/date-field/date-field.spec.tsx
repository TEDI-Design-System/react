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
    render(<DateField {...defaultProps} openBehavior="input" />);

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

  // Add more specific tests as needed, e.g.:
  // - multiple mode chip removal
  // - range selection (start → end)
  // - disabled dates rendering
  // - custom formatDate / parseDate
  // - month/year grid view switching
});
