import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { TextFieldForwardRef } from '../textfield/textfield';
import { DateTimeField, DateTimeFieldProps } from './date-time-field';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => key,
  }),
}));

describe('DateTimeField component', () => {
  const defaultProps: DateTimeFieldProps = {
    id: 'date-time-field',
    label: 'When',
  };

  // The TimeWheel (rendered when no `availableTimes` are provided) calls
  // `element.scrollTo` from a layout effect on mount, which jsdom doesn't
  // implement. Stubbing it on the prototype keeps the side-by-side layout
  // tests (which fall back to the wheel) from crashing.
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  it('renders the field with its label', () => {
    render(<DateTimeField {...defaultProps} />);
    expect(screen.getByLabelText('When')).toBeInTheDocument();
  });

  it('forwards ref to the underlying TextField', () => {
    const ref = createRef<TextFieldForwardRef>();
    render(<DateTimeField {...defaultProps} ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.input).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.input).toBe(screen.getByLabelText('When'));
  });

  it('shows the placeholder when no value is provided', () => {
    render(<DateTimeField {...defaultProps} placeholder="dd.MM.yyyy HH:mm" />);
    expect(screen.getByPlaceholderText('dd.MM.yyyy HH:mm')).toBeInTheDocument();
  });

  it('formats the controlled value as "dd.MM.yyyy HH:mm" (et-EE default)', () => {
    const value = new Date(2025, 8, 1, 11, 30);
    render(<DateTimeField {...defaultProps} value={value} />);

    expect(screen.getByLabelText('When')).toHaveValue('01.09.2025 11:30');
  });

  it('opens the calendar when the icon is clicked', async () => {
    const user = userEvent.setup();
    render(<DateTimeField {...defaultProps} />);

    await user.click(screen.getByRole('button'));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('toggles the popover closed when the icon is clicked again', async () => {
    const user = userEvent.setup();
    render(<DateTimeField {...defaultProps} />);

    const icon = screen.getByRole('button');
    await user.click(icon);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(icon);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders both calendar and time picker together in the side-by-side layout (default)', async () => {
    const user = userEvent.setup();
    render(<DateTimeField {...defaultProps} availableTimes={['09:30', '11:30', '15:30']} />);

    await user.click(screen.getByRole('button'));

    // Both the calendar and the time slot grid are visible at once — there's
    // no intermediate "Select time" footer link.
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('11:30')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /select time/i })).not.toBeInTheDocument();
  });

  it('advances from date step to time step via the "Select time" footer in multi-step layout', async () => {
    const user = userEvent.setup();
    render(
      <DateTimeField
        {...defaultProps}
        layout="multi-step"
        availableTimes={['09:30', '11:30', '15:30']}
        selectTimeLabel="Select time"
        backLabel="Back"
      />
    );

    await user.click(screen.getByRole('button'));

    // Multi-step starts at the calendar; time grid is NOT yet rendered.
    expect(screen.queryByText('11:30')).not.toBeInTheDocument();

    const selectTime = await screen.findByRole('button', { name: /select time/i });
    await user.click(selectTime);

    expect(await screen.findByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByText('11:30')).toBeInTheDocument();
  });

  it('selecting a predefined time fires onChange with the combined Date (multi-step)', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(
      <DateTimeField
        {...defaultProps}
        layout="multi-step"
        defaultValue={new Date(2025, 8, 1, 0, 0)}
        availableTimes={['09:30', '11:30', '15:30']}
        selectTimeLabel="Select time"
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole('button'));
    await user.click(await screen.findByRole('button', { name: /select time/i }));
    await user.click(await screen.findByText('11:30'));

    expect(onChange).toHaveBeenCalled();
    const next = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date;
    expect(next.getHours()).toBe(11);
    expect(next.getMinutes()).toBe(30);
    expect(next.getDate()).toBe(1);
    expect(next.getMonth()).toBe(8);
    expect(next.getFullYear()).toBe(2025);
  });

  it('selecting a predefined time in side-by-side layout updates the value but keeps the popover open', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(
      <DateTimeField
        {...defaultProps}
        defaultValue={new Date(2025, 8, 1, 0, 0)}
        availableTimes={['09:30', '11:30', '15:30']}
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole('button'));
    await user.click(await screen.findByText('11:30'));

    expect(onChange).toHaveBeenCalled();
    const next = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date;
    expect(next.getHours()).toBe(11);
    expect(next.getMinutes()).toBe(30);
    // Popover stays open in side-by-side mode so the user can still change
    // the date afterwards.
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('parses a typed "dd.MM.yyyy HH:mm" value and fires onChange', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<DateTimeField {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText('When');
    await user.type(input, '15.06.2024 09:45');

    expect(onChange).toHaveBeenCalled();
    const next = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date;
    expect(next.getDate()).toBe(15);
    expect(next.getMonth()).toBe(5);
    expect(next.getFullYear()).toBe(2024);
    expect(next.getHours()).toBe(9);
    expect(next.getMinutes()).toBe(45);
  });

  it('rejects malformed typed input (out-of-range hour) without firing onChange', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<DateTimeField {...defaultProps} onChange={onChange} />);

    await user.type(screen.getByLabelText('When'), '15.06.2024 25:00');

    // 25:00 is invalid — onChange must NOT be called with a Date for the
    // intermediate keystrokes that nearly form a valid value either.
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not open the popover when disabled', async () => {
    const user = userEvent.setup();
    render(<DateTimeField {...defaultProps} disabled />);

    await user.click(screen.getByRole('button'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clears the value when the input is emptied', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<DateTimeField {...defaultProps} defaultValue={new Date(2025, 8, 1, 11, 30)} onChange={onChange} />);

    await user.clear(screen.getByLabelText('When'));

    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  describe('useNativePicker', () => {
    it('renders the input with type="datetime-local" when native picker is enabled', () => {
      render(<DateTimeField {...defaultProps} useNativePicker />);

      // The TextField input is the underlying element exposed via the
      // accessible name; native mode should switch its type.
      expect(screen.getByLabelText('When')).toHaveAttribute('type', 'datetime-local');
    });

    it('formats the controlled value in datetime-local ISO format when native', () => {
      const value = new Date(2025, 8, 1, 11, 30);
      render(<DateTimeField {...defaultProps} useNativePicker value={value} />);

      // datetime-local expects "YYYY-MM-DDTHH:mm".
      expect(screen.getByLabelText('When')).toHaveValue('2025-09-01T11:30');
    });

    it('does not render the custom popover when native picker is enabled', async () => {
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} useNativePicker />);

      // Clicking the icon in native mode would call `showPicker()` (no-op
      // in jsdom) — the custom dialog must not appear regardless.
      await user.click(screen.getByRole('button'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('falls back to the custom popover in range mode (native has no range counterpart)', async () => {
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} useNativePicker mode="range" />);

      await user.click(screen.getByRole('button'));
      expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('range mode', () => {
    it('formats the controlled range value as "from – to"', () => {
      const value = {
        from: new Date(2025, 8, 1, 11, 30),
        to: new Date(2025, 8, 5, 14, 0),
      };
      render(<DateTimeField {...defaultProps} mode="range" value={value} />);

      expect(screen.getByLabelText('When')).toHaveValue('01.09.2025 11:30 – 05.09.2025 14:00');
    });

    it('renders both from and to time pickers in the popover', async () => {
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} mode="range" availableTimes={['09:30', '11:30', '15:30']} />);

      await user.click(screen.getByRole('button'));

      // Two TimePicker grids render — each option appears once per picker,
      // so a single time slot label appears twice.
      expect(await screen.findAllByText('11:30')).toHaveLength(2);
    });

    it('updates the from time without clearing the existing to time', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      const initial = {
        from: new Date(2025, 8, 1, 9, 30),
        to: new Date(2025, 8, 5, 14, 0),
      };

      render(
        <DateTimeField
          {...defaultProps}
          mode="range"
          defaultValue={initial}
          availableTimes={['09:30', '11:30', '15:30']}
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole('button'));

      // Click the first 11:30 (the `from` picker — the leftmost match).
      const slots = await screen.findAllByText('11:30');
      await user.click(slots[0]);

      expect(onChange).toHaveBeenCalled();
      const next = onChange.mock.calls[onChange.mock.calls.length - 1][0] as {
        from: Date;
        to: Date;
      };
      expect(next.from.getHours()).toBe(11);
      expect(next.from.getMinutes()).toBe(30);
      // `to` is preserved from the previous value.
      expect(next.to.getHours()).toBe(14);
      expect(next.to.getMinutes()).toBe(0);
    });
  });
});
