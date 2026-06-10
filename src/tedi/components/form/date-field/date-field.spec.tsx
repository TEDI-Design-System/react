import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { et } from 'react-day-picker/locale';

import { TextFieldForwardRef } from '../textfield/textfield';
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

  it('forwards ref to the underlying TextField (single mode)', () => {
    const ref = createRef<TextFieldForwardRef>();
    render(<DateField {...defaultProps} ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.input).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.input).toBe(screen.getByLabelText('Birth date'));
  });

  it('renders TextField in single mode by default', () => {
    render(<DateField {...defaultProps} />);

    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
  });

  it('renders MultiValueField in multiple mode', () => {
    const { container } = render(<DateField {...defaultProps} mode="multiple" />);

    expect(container.querySelector('.tedi-multi-value-field')).toBeInTheDocument();
    expect(screen.getByText('Birth date')).toBeInTheDocument();
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

  it('uses custom locale when provided', async () => {
    const user = userEvent.setup();
    render(<DateField {...defaultProps} locale={et} initialMonth={new Date(2025, 0, 1)} />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText(/jaanuar/i)).toBeInTheDocument();
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

  it('formats multiple dates correctly', () => {
    render(<DateField {...defaultProps} mode="multiple" selected={[new Date(2025, 0, 1), new Date(2025, 0, 2)]} />);

    expect(screen.getByText('01.01.2025')).toBeInTheDocument();
    expect(screen.getByText('02.01.2025')).toBeInTheDocument();
  });

  it('does not open calendar when enableCalendar=false', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} enableCalendar={false} />);

    await user.click(screen.getByRole('textbox'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens calendar when clicking icon (button trigger)', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('closes calendar when clicking icon again (button trigger toggle)', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('mirrors the calendar open state on the trigger button via aria-expanded', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('omits aria-expanded on the trigger when enableCalendar=false', () => {
    render(<DateField {...defaultProps} enableCalendar={false} />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('aria-expanded');
  });

  it('wires aria-haspopup + aria-expanded on the input when calendarTrigger="input"', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} calendarTrigger="input" />);

    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveAttribute('aria-haspopup', 'dialog');
    expect(input).toHaveAttribute('aria-expanded', 'false');

    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('formats range with only start date', () => {
    render(<DateField {...defaultProps} mode="range" selected={{ from: new Date(2025, 0, 10) }} />);

    expect(screen.getByLabelText('Birth date')).toHaveValue('10.01.2025');
  });

  it('parses valid default input (dd.MM.yyyy)', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<DateField {...defaultProps} onSelect={onSelect} />);

    const input = screen.getByLabelText('Birth date');

    await user.clear(input);
    await user.type(input, '15.06.2025');

    expect(onSelect).toHaveBeenCalled();
  });

  it('rejects invalid date like 32.13.2025', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<DateField {...defaultProps} onSelect={onSelect} />);

    const input = screen.getByLabelText('Birth date');

    await user.clear(input);
    await user.type(input, '32.13.2025');

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('opens calendar with initialMonth', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} initialMonth={new Date(2025, 11, 1)} />);

    await user.click(screen.getByRole('button'));

    expect(await screen.findByText(/detsember/i)).toBeInTheDocument();
  });

  it('closes calendar in multiple mode when closeOnSelect=true', async () => {
    const user = userEvent.setup();

    render(<DateField {...defaultProps} mode="multiple" closeOnSelect={true} initialMonth={new Date(2025, 5, 1)} />);

    await user.click(screen.getByRole('button'));
    const day = await screen.findByText('15');
    await user.click(day);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('returns an empty string when formatted range has no from date', () => {
    render(<DateField {...defaultProps} mode="range" selected={{ from: undefined, to: undefined } as never} />);

    expect(screen.getByLabelText('Birth date')).toHaveValue('');
  });

  it('accepts a single (non-array) disabled matcher', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const target = new Date(2025, 5, 15);

    render(
      <DateField
        {...defaultProps}
        disabled={(date: Date) => date.getTime() === target.getTime()}
        initialMonth={new Date(2025, 5, 1)}
        onSelect={onSelect}
      />
    );

    await user.click(screen.getByRole('button'));
    const day = await screen.findByText('15');
    await user.click(day);

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('skips onSelect when parsed input matches a disabled function matcher', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const target = new Date(2025, 5, 15);

    render(
      <DateField
        {...defaultProps}
        disabled={(date: Date) => date.getTime() === target.getTime()}
        parseDate={() => target}
        onSelect={onSelect}
      />
    );

    const input = screen.getByLabelText('Birth date');
    await user.type(input, '15.06.2025');

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('skips onSelect when parsed input matches an exact Date matcher', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const target = new Date(2025, 5, 15);

    render(<DateField {...defaultProps} disabled={target} parseDate={() => target} onSelect={onSelect} />);

    await user.type(screen.getByLabelText('Birth date'), '15.06.2025');

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders without crashing with disablePast + disableFuture flags', () => {
    expect(() => render(<DateField {...defaultProps} disablePast disableFuture />)).not.toThrow();
    expect(screen.getByLabelText('Birth date')).toBeInTheDocument();
  });

  it('applies value from month grid selection (applyValue path)', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <DateField
        {...defaultProps}
        selectionLevel="months"
        monthYearSelectType="grid"
        onSelect={onSelect}
        initialMonth={new Date(2025, 0, 1)}
      />
    );

    await user.click(screen.getByRole('button'));

    const monthCell = await screen.findByRole('button', { name: /juuni/i });
    await user.click(monthCell);

    expect(onSelect).toHaveBeenCalled();
    const [firstArg] = onSelect.mock.calls[0];
    expect(firstArg).toBeInstanceOf(Date);
  });

  it('applyValue short-circuits when the selected month is disabled', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <DateField
        {...defaultProps}
        selectionLevel="months"
        monthYearSelectType="grid"
        onSelect={onSelect}
        initialMonth={new Date(2025, 0, 1)}
        disabled={(date: Date) => date.getMonth() === 5}
      />
    );

    await user.click(screen.getByRole('button'));

    const juneCell = await screen.findByRole('button', { name: /juuni/i });
    await user.click(juneCell);

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('clears input value when parsed input clears the selection', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <DateField {...defaultProps} selected={new Date(2025, 5, 15)} parseDate={() => undefined} onSelect={onSelect} />
    );

    const input = screen.getByLabelText('Birth date');
    expect(input).toHaveValue('15.06.2025');

    await user.clear(input);

    expect(input).toHaveValue('');
  });

  it('passes shouldDisableMonth and shouldDisableYear through without crashing', async () => {
    const user = userEvent.setup();
    const shouldDisableMonth = jest.fn(() => false);
    const shouldDisableYear = jest.fn(() => false);

    render(
      <DateField {...defaultProps} shouldDisableMonth={shouldDisableMonth} shouldDisableYear={shouldDisableYear} />
    );

    await user.click(screen.getByRole('button'));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('accepts an array of disabled matchers via disabled prop', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const target = new Date(2025, 5, 15);

    render(
      <DateField
        {...defaultProps}
        disabled={[(date: Date) => date.getTime() === target.getTime()]}
        initialMonth={new Date(2025, 5, 1)}
        onSelect={onSelect}
      />
    );

    await user.click(screen.getByRole('button'));
    const day = await screen.findByText('15');
    await user.click(day);

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('rejects a typed past date when disablePast is set (single mode)', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<DateField {...defaultProps} disablePast onSelect={onSelect} />);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '01.01.1999');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('rejects a typed future date when disableFuture is set (single mode)', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<DateField {...defaultProps} disableFuture onSelect={onSelect} />);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '01.01.2099');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('rejects a typed past date in the native picker when disablePast is set', () => {
    const onSelect = jest.fn();
    render(<DateField {...defaultProps} useNativePicker disablePast onSelect={onSelect} />);

    const input = screen.getByLabelText('Birth date');
    fireEvent.change(input, { target: { value: '1999-01-01' } });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('shows an error feedback message when the user types a disabled date', async () => {
    const user = userEvent.setup();
    render(<DateField {...defaultProps} disablePast disabledDateErrorMessage="Date is in the past" />);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '01.01.1999');
    expect(screen.getByText('Date is in the past')).toBeInTheDocument();
  });

  it('clears the error feedback once the typed date becomes valid', async () => {
    const user = userEvent.setup();
    render(<DateField {...defaultProps} disablePast disabledDateErrorMessage="Date is in the past" />);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '01.01.1999');
    expect(screen.getByText('Date is in the past')).toBeInTheDocument();
    await user.clear(input);
    expect(screen.queryByText('Date is in the past')).not.toBeInTheDocument();
  });
});
