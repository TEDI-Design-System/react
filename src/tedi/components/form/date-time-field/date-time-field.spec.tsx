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

  // Covers `date-time-field.tsx:675` — the `<Button onClick={() => setStep('date')}>`
  // in the time-step header that returns the user to the calendar.
  it('navigates back from time step to date step via the "Back" button in multi-step layout', async () => {
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
    await user.click(await screen.findByRole('button', { name: /select time/i }));

    // We're on the time step — time grid is visible, calendar is gone.
    expect(screen.getByText('11:30')).toBeInTheDocument();

    await user.click(await screen.findByRole('button', { name: /back/i }));

    // Back to the calendar — the time grid is gone and the "Select time"
    // CTA is offered again.
    expect(screen.queryByText('11:30')).not.toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /select time/i })).toBeInTheDocument();
  });

  // Covers the `timeHeading` prop pass-through (declared at
  // `date-time-field.tsx:87`, rendered into the side-by-side split header).
  it('renders a custom `timeHeading` in the side-by-side layout', async () => {
    const user = userEvent.setup();
    render(<DateTimeField {...defaultProps} availableTimes={['09:30', '11:30']} timeHeading="Pick a time" />);

    await user.click(screen.getByRole('button'));

    expect(await screen.findByText('Pick a time')).toBeInTheDocument();
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

    // Covers `date-time-field.tsx:503-504` — the `input.showPicker()` branch
    // inside `openNativePicker`. jsdom doesn't implement `showPicker`, so we
    // stub it on the input prototype before the click.
    it('invokes `showPicker()` on the native input when the icon is clicked', async () => {
      const showPicker = jest.fn();
      const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'showPicker');
      Object.defineProperty(HTMLInputElement.prototype, 'showPicker', {
        value: showPicker,
        configurable: true,
        writable: true,
      });

      try {
        const user = userEvent.setup();
        render(<DateTimeField {...defaultProps} useNativePicker />);

        await user.click(screen.getByRole('button'));

        expect(showPicker).toHaveBeenCalledTimes(1);
      } finally {
        if (originalDescriptor) {
          Object.defineProperty(HTMLInputElement.prototype, 'showPicker', originalDescriptor);
        } else {
          delete (HTMLInputElement.prototype as unknown as { showPicker?: unknown }).showPicker;
        }
      }
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

  describe('uncontrolled mode', () => {
    it('seeds the input from `defaultValue` without `value`', () => {
      render(<DateTimeField {...defaultProps} defaultValue={new Date(2025, 8, 1, 9, 30)} />);
      expect(screen.getByLabelText('When')).toHaveValue('01.09.2025 09:30');
    });

    it('mutates internal state on input typing without `value`', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} onChange={onChange} />);

      const input = screen.getByLabelText('When');
      await user.type(input, '15.06.2025 10:00');
      // The last typed character commits a parsed Date.
      expect(onChange).toHaveBeenCalled();
      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date;
      expect(last).toBeInstanceOf(Date);
      expect(last.getFullYear()).toBe(2025);
      expect(last.getMonth()).toBe(5);
      expect(last.getDate()).toBe(15);
      expect(last.getHours()).toBe(10);
      expect(last.getMinutes()).toBe(0);
    });
  });

  describe('parser', () => {
    it('rejects an impossible calendar date (Feb 30) without firing onChange', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} onChange={onChange} />);

      await user.type(screen.getByLabelText('When'), '30.02.2025 10:00');
      expect(onChange).not.toHaveBeenCalledWith(expect.any(Date));
    });

    it('rejects an out-of-range minute (75) without firing onChange', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} onChange={onChange} />);

      await user.type(screen.getByLabelText('When'), '15.06.2025 10:75');
      expect(onChange).not.toHaveBeenCalledWith(expect.any(Date));
    });

    it('ignores extra surrounding whitespace and still parses', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} onChange={onChange} />);

      await user.type(screen.getByLabelText('When'), '  15.06.2025 10:00  ');
      expect(onChange).toHaveBeenCalled();
      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date;
      expect(last).toBeInstanceOf(Date);
      expect(last.getFullYear()).toBe(2025);
    });
  });

  describe('inputProps passthrough', () => {
    it('renders the inputProps.helper text below the field', () => {
      render(
        <DateTimeField {...defaultProps} inputProps={{ helper: { type: 'hint', text: 'Format: pp.kk.aaaa hh:mm' } }} />
      );
      expect(screen.getByText('Format: pp.kk.aaaa hh:mm')).toBeInTheDocument();
    });

    it('disables the underlying input when the top-level `disabled` prop is set', () => {
      render(<DateTimeField {...defaultProps} disabled />);
      expect(screen.getByLabelText('When')).toBeDisabled();
    });
  });

  describe('initialMonth fallback', () => {
    it('opens on the explicit `initialMonth` when no value is present', async () => {
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} initialMonth={new Date(2030, 5, 15)} />);

      await user.click(screen.getByRole('button'));
      // Calendar header renders the year alongside the month — June 2030 is
      // the visible month. Multiple grids may render; assert at least one matches.
      const headings = await screen.findAllByText(/2030/);
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('clearing', () => {
    it('emits undefined after the value is cleared from outside the input', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(<DateTimeField {...defaultProps} defaultValue={new Date(2025, 8, 1, 9, 30)} onChange={onChange} />);

      const input = screen.getByLabelText('When');
      await user.clear(input);
      expect(onChange).toHaveBeenLastCalledWith(undefined);
    });
  });

  describe('selectionLevel (handleApplyValue branch)', () => {
    // Covers `date-time-field.tsx:455-461` — the function only fires when
    // `Calendar` exits at year/month grid (`selectionLevel='years'|'months'`).
    // Default `selectionLevel='days'` keeps it dead; here we test the month
    // commit path for both single and range mode.

    // Helper: when `defaultValue` is set the textfield gains a "clear"
    // button alongside the icon trigger, so `getByRole('button')` becomes
    // ambiguous. Pick the trigger explicitly by excluding the closing button.
    const getIconTrigger = (): HTMLElement => {
      const trigger = screen.getAllByRole('button').find((b) => b.getAttribute('data-name') !== 'closing-button');
      if (!trigger) throw new Error('Icon trigger button not found');
      return trigger;
    };

    // Helper: find the first month button inside the open grid that isn't
    // June (the currently-displayed month for our test fixtures). Restrict
    // to the grid-button class so we don't accidentally match the nav
    // (prev / next) buttons that also sit inside MonthGrid.
    const findNonJuneMonth = async (): Promise<HTMLElement> => {
      const monthButtons = Array.from(document.querySelectorAll<HTMLElement>('[class*="tedi-calendar__grid-button"]'));
      // Estonian short month names: jaan, veebr, märts, apr, mai, juuni,
      // juuli, aug, sept, okt, nov, dets. We must skip both "juuni" (June)
      // AND "juuli" (July) since the substring "juu" appears in both —
      // pick "jaan" (January) for stability.
      const target = monthButtons.find((b) => b.textContent?.toLowerCase().startsWith('jaan'));
      if (!target) throw new Error('Could not find the January month button to click');
      return target;
    };

    // Helper: with `monthYearSelectType='grid'`, the calendar header
    // exposes the current month name as a clickable trigger that switches
    // `view` from 'days' to 'months'. We can't use `getByRole('button')`
    // because day-cells also include the month name in their accessible
    // label (e.g. "13. juuni 2025"), so find by the unique header class.
    const openMonthGrid = async (user: ReturnType<typeof userEvent.setup>): Promise<void> => {
      const headerButtons = document.querySelectorAll<HTMLElement>('[class*="tedi-calendar__month-year-selector"]');
      const monthHeaderButton = Array.from(headerButtons).find((b) => b.textContent && /\D/.test(b.textContent));
      if (!monthHeaderButton) throw new Error('Could not find the month-name header trigger');
      await user.click(monthHeaderButton);
    };

    it('commits the value when a month is picked with `selectionLevel="months"` (single mode)', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DateTimeField
          {...defaultProps}
          monthYearSelectType="grid"
          selectionLevel="months"
          defaultValue={new Date(2025, 5, 15, 10, 30)}
          onChange={onChange}
        />
      );

      await user.click(getIconTrigger());
      await openMonthGrid(user);
      await user.click(await findNonJuneMonth());

      expect(onChange).toHaveBeenCalled();
      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      // Time component must be preserved from the previous value.
      expect(last).toBeInstanceOf(Date);
      expect((last as Date).getHours()).toBe(10);
      expect((last as Date).getMinutes()).toBe(30);
    });

    it('commits a `from`-only range when a month is picked with `selectionLevel="months"` (range mode)', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <DateTimeField
          {...defaultProps}
          mode="range"
          monthYearSelectType="grid"
          selectionLevel="months"
          defaultValue={{ from: new Date(2025, 5, 15, 9, 0), to: new Date(2025, 5, 20, 14, 0) }}
          onChange={onChange}
        />
      );

      await user.click(getIconTrigger());
      await openMonthGrid(user);
      await user.click(await findNonJuneMonth());

      expect(onChange).toHaveBeenCalled();
      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as { from: Date; to?: Date };
      // Range commit takes only `from` from the month click and preserves
      // the previous `from` time (09:00). `to` is dropped per the
      // implementation (only `from` is set in `handleApplyValue`'s range branch).
      expect(last.from).toBeInstanceOf(Date);
      expect(last.from.getHours()).toBe(9);
      expect(last.from.getMinutes()).toBe(0);
      expect(last.to).toBeUndefined();
    });
  });

  describe('native input parsing', () => {
    // Covers `date-time-field.tsx:483-487` — the `useNative` branch inside
    // `handleInputChange` that parses an ISO `datetime-local` string and
    // syncs `currentMonth`.
    it('parses a typed `datetime-local` value when `useNativePicker` is true', async () => {
      const onChange = jest.fn();
      render(<DateTimeField {...defaultProps} useNativePicker onChange={onChange} />);

      // jsdom doesn't support `userEvent.type` on `<input type="datetime-local">`,
      // so dispatch a synthetic change event with the ISO-formatted value.
      const input = screen.getByLabelText('When') as HTMLInputElement;
      input.focus();
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, '2025-09-15T11:45');
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(onChange).toHaveBeenCalled();
      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date;
      expect(last).toBeInstanceOf(Date);
      expect(last.getFullYear()).toBe(2025);
      expect(last.getMonth()).toBe(8);
      expect(last.getDate()).toBe(15);
      expect(last.getHours()).toBe(11);
      expect(last.getMinutes()).toBe(45);
    });

    it('ignores an unparseable datetime-local string without firing onChange', async () => {
      const onChange = jest.fn();
      render(<DateTimeField {...defaultProps} useNativePicker onChange={onChange} />);

      const input = screen.getByLabelText('When') as HTMLInputElement;
      input.focus();
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      setter?.call(input, 'not-a-date');
      input.dispatchEvent(new Event('input', { bubbles: true }));

      // `parseNativeValue` returns undefined → early-return → no Date emit.
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
      expect(lastCall).not.toBeInstanceOf(Date);
    });
  });
});
