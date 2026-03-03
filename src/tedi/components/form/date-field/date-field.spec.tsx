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

describe('DateField', () => {
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
    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveClass('tedi-date-field__textfield');
  });

  it('renders MultiValueField in multiple mode', () => {
    render(<DateField {...defaultProps} mode="multiple" />);
    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
    expect(screen.getByLabelText('Birth date')).toHaveClass('tedi-date-field__multivalue');
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

  it('shows required asterisk when required=true', () => {
    render(<DateField {...defaultProps} required />);
    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveAttribute('aria-required', 'true');
    // or check for visual asterisk if your TextField renders it
  });

  it('opens calendar when clicking calendar icon (openBehavior=button)', async () => {
    const user = userEvent.setup();
    render(<DateField {...defaultProps} />);

    const iconButton = screen.getByRole('button', { name: /calendar/i });
    await user.click(iconButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('pickers.yearSelection') || screen.getByText(/January/i)).toBeInTheDocument();
    });
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

  it('does not open calendar on input click when readOnly=true', async () => {
    const user = userEvent.setup();
    render(<DateField {...defaultProps} readOnly openBehavior="input" />);

    const input = screen.getByLabelText('Birth date');
    await user.click(input);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // it('closes calendar after selecting date in single mode (default behavior)', async () => {
  //   const user = userEvent.setup();
  //   const handleSelect = jest.fn();

  //   render(<DateField {...defaultProps} onSelect={handleSelect} initialMonth={new Date(2025, 5, 1)} />);

  //   await user.click(screen.getByRole('button', { name: /calendar/i }));
  //   await waitFor(() => screen.getByRole('dialog'));
  //   await user.click(screen.getByText('15'));

  //   await waitFor(() => {
  //     expect(handleSelect).toHaveBeenCalledWith(
  //       expect.any(Date),
  //       expect.anything(),
  //       expect.anything(),
  //       expect.anything()
  //     );
  //     expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  //   });
  // });

  // it('applies custom className to root container', () => {
  //   render(<DateField {...defaultProps} className="my-special-datepicker" />);
  //   const container = screen.getByLabelText('Birth date').closest('div');
  //   expect(container).toHaveClass('my-special-datepicker');
  // });

  it('uses custom locale when provided', () => {
    render(<DateField {...defaultProps} locale={et} initialMonth={new Date(2025, 0, 1)} />);
  });

  // Add more specific tests as needed, e.g.:
  // - multiple mode chip removal
  // - range selection (start → end)
  // - disabled dates rendering
  // - custom formatDate / parseDate
  // - month/year grid view switching
});
