/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { et, faIR } from 'react-day-picker/locale';

import { useBreakpointProps } from '../../../helpers';
import { Calendar, CalendarProps } from './calendar';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useBreakpointProps: jest.fn(),
}));

const mockDayPickerProps: { current: any } = { current: null };
// Renders day components inside DayPicker, where they can read the calendar's day context.
const mockDaySlot: { current: ((components: any) => ReactNode) | null } = { current: null };

jest.mock('react-day-picker', () => ({
  ...jest.requireActual('react-day-picker'),
  DayPicker: (props: any) => {
    mockDayPickerProps.current = props;
    const MonthCaption = props.components?.MonthCaption;

    return (
      <div data-testid="day-picker" className={props.classNames?.root} data-mode={props.mode}>
        {MonthCaption && <MonthCaption {...props} />}
        {mockDaySlot.current?.(props.components)}

        <button onClick={() => props.onSelect?.(new Date(2025, 0, 15))}>select</button>
        <button onClick={() => props.onMonthChange?.(new Date(2025, 1))}>change-month</button>
        {props.footer}
      </div>
    );
  },
}));

jest.mock('./components/calendar-header/calendar-header', () => ({
  CalendarHeader: (props: any) => (
    <div data-testid="calendar-header">
      <button onClick={props.onOpenMonthGrid}>open-months</button>
      <button onClick={props.onOpenYearGrid}>open-years</button>
    </div>
  ),
}));

jest.mock('./components/calendar-month-grid/calendar-month-grid', () => ({
  MonthGrid: ({ onSelectMonth }: any) => (
    <div data-testid="month-grid">
      <button onClick={() => onSelectMonth(new Date(2025, 5))}>select-month</button>
    </div>
  ),
}));

jest.mock('./components/calendar-year-grid/calendar-year-grid', () => ({
  YearGrid: ({ onSelectYear }: any) => (
    <div data-testid="year-grid">
      <button onClick={() => onSelectYear(new Date(2024, 0, 1))}>select-year</button>
    </div>
  ),
}));

describe('Calendar', () => {
  const baseProps: CalendarProps = {
    currentMonth: new Date(2025, 0, 1),
    setCurrentMonth: jest.fn(),
    value: undefined,
    handleSelect: jest.fn(),
    applyValue: jest.fn(),
  };

  const renderDays = (slot: (components: any) => ReactNode, props: Partial<CalendarProps> = {}) => {
    mockDaySlot.current = slot;
    return render(<Calendar {...baseProps} {...props} />);
  };

  beforeEach(() => {
    mockDaySlot.current = null;
    (useBreakpointProps as jest.Mock).mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
      getCurrentBreakpointProps: ({ sm, md, lg, xl, xxl, defaultServerBreakpoint, ...xs }: any) => xs,
    });
  });

  it('renders DayPicker in default (days) view', () => {
    render(<Calendar {...baseProps} />);

    expect(screen.getByTestId('day-picker')).toBeInTheDocument();
  });

  it('renders MonthGrid when view is months', () => {
    render(<Calendar {...baseProps} view="months" />);

    expect(screen.getByTestId('month-grid')).toBeInTheDocument();
  });

  it('renders YearGrid when view is years', () => {
    render(<Calendar {...baseProps} view="years" />);

    expect(screen.getByTestId('year-grid')).toBeInTheDocument();
  });

  it('calls handleSelect when a day is selected', () => {
    const handleSelect = jest.fn();

    render(<Calendar {...baseProps} handleSelect={handleSelect} />);

    fireEvent.click(screen.getByText('select'));

    expect(handleSelect).toHaveBeenCalledWith(new Date(2025, 0, 15));
  });

  it('calls setCurrentMonth when month changes', () => {
    const setCurrentMonth = jest.fn();

    render(<Calendar {...baseProps} setCurrentMonth={setCurrentMonth} />);

    fireEvent.click(screen.getByText('change-month'));

    expect(setCurrentMonth).toHaveBeenCalled();
  });

  it('switches to month view when header button clicked', () => {
    const setView = jest.fn();

    render(<Calendar {...baseProps} setView={setView} />);

    fireEvent.click(screen.getByText('open-months'));

    expect(setView).toHaveBeenCalledWith('months');
  });

  it('switches to year view when header button clicked', () => {
    const setView = jest.fn();

    render(<Calendar {...baseProps} setView={setView} />);

    fireEvent.click(screen.getByText('open-years'));

    expect(setView).toHaveBeenCalledWith('years');
  });

  it('selecting month updates currentMonth and applies value if selectionLevel=months', () => {
    const setCurrentMonth = jest.fn();
    const applyValue = jest.fn();

    render(
      <Calendar
        {...baseProps}
        view="months"
        selectionLevel="months"
        setCurrentMonth={setCurrentMonth}
        applyValue={applyValue}
      />
    );

    fireEvent.click(screen.getByText('select-month'));

    expect(setCurrentMonth).toHaveBeenCalled();
    expect(applyValue).toHaveBeenCalled();
  });

  it('selecting month switches to days if selectionLevel is not months', () => {
    const setView = jest.fn();

    render(<Calendar {...baseProps} view="months" selectionLevel="days" setView={setView} />);

    fireEvent.click(screen.getByText('select-month'));

    expect(setView).toHaveBeenCalledWith('days');
  });

  it('selecting year updates currentMonth and applies value if selectionLevel=years', () => {
    const setCurrentMonth = jest.fn();
    const applyValue = jest.fn();

    render(
      <Calendar
        {...baseProps}
        view="years"
        selectionLevel="years"
        setCurrentMonth={setCurrentMonth}
        applyValue={applyValue}
      />
    );

    fireEvent.click(screen.getByText('select-year'));

    expect(setCurrentMonth).toHaveBeenCalled();
    expect(applyValue).toHaveBeenCalled();
  });

  it('selecting year switches to months if selectionLevel is not years', () => {
    const setView = jest.fn();

    render(<Calendar {...baseProps} view="years" selectionLevel="days" setView={setView} />);

    fireEvent.click(screen.getByText('select-year'));

    expect(setView).toHaveBeenCalledWith('months');
  });

  it('renders footer when provided', () => {
    render(<Calendar {...baseProps} footer={<div>Footer content</div>} />);

    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Calendar {...baseProps} className="custom-class" />);

    const dayPicker = screen.getByTestId('day-picker');
    expect(dayPicker).toHaveClass('custom-class');
  });

  it('does not apply the full-width modifier by default', () => {
    render(<Calendar {...baseProps} />);

    expect(screen.getByTestId('day-picker')).not.toHaveClass('tedi-calendar--full-width');
  });

  it('applies the full-width modifier class when fullWidth is set', () => {
    render(<Calendar {...baseProps} fullWidth />);

    expect(screen.getByTestId('day-picker')).toHaveClass('tedi-calendar--full-width');
  });

  it('resolves per-breakpoint overrides (e.g. fullWidth at md)', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
      getCurrentBreakpointProps: ({ sm, md, lg, xl, xxl, defaultServerBreakpoint, ...xs }: any) => ({ ...xs, ...md }),
    });

    render(<Calendar {...baseProps} fullWidth={false} md={{ fullWidth: true }} />);

    expect(screen.getByTestId('day-picker')).toHaveClass('tedi-calendar--full-width');
  });

  it('applies disabled matchers when provided', () => {
    const disabledMatchers = [(date: Date) => true];

    render(<Calendar {...baseProps} disabledMatchers={disabledMatchers} />);

    const dayPicker = screen.getByTestId('day-picker');
    expect(dayPicker).toBeInTheDocument();
  });

  describe('availableDays', () => {
    it('marks matching dates available when availableDays is an array', () => {
      const target = new Date(2025, 0, 15);
      const other = new Date(2025, 0, 16);

      render(<Calendar {...baseProps} availableDays={[target]} />);

      expect(mockDayPickerProps.current.modifiers.available(target)).toBe(true);
      expect(mockDayPickerProps.current.modifiers.available(other)).toBe(false);
    });

    it('uses the predicate form of availableDays', () => {
      const predicate = jest.fn((date: Date) => date.getDate() === 10);

      render(<Calendar {...baseProps} availableDays={predicate} />);

      const included = new Date(2025, 0, 10);
      const excluded = new Date(2025, 0, 11);

      expect(mockDayPickerProps.current.modifiers.available(included)).toBe(true);
      expect(mockDayPickerProps.current.modifiers.available(excluded)).toBe(false);
      expect(predicate).toHaveBeenCalled();
    });

    it('disables days that are not available', () => {
      const available = new Date(2025, 0, 15);
      const unavailable = new Date(2025, 0, 16);

      render(<Calendar {...baseProps} availableDays={[available]} />);

      const disabled = mockDayPickerProps.current.disabled as Array<(d: Date) => boolean>;
      expect(disabled.some((fn) => fn(unavailable))).toBe(true);
      expect(disabled.some((fn) => fn(available))).toBe(false);
    });

    it('modifier returns false when availableDays is not set', () => {
      render(<Calendar {...baseProps} />);

      expect(mockDayPickerProps.current.modifiers.available(new Date(2025, 0, 15))).toBe(false);
    });
  });

  describe('unavailableDays', () => {
    it('marks matching dates unavailable when unavailableDays is an array', () => {
      const blocked = new Date(2025, 0, 20);
      const other = new Date(2025, 0, 21);

      render(<Calendar {...baseProps} unavailableDays={[blocked]} />);

      expect(mockDayPickerProps.current.modifiers.unavailable(blocked)).toBe(true);
      expect(mockDayPickerProps.current.modifiers.unavailable(other)).toBe(false);
    });

    it('uses the predicate form of unavailableDays', () => {
      const predicate = jest.fn((date: Date) => date.getDate() === 5);

      render(<Calendar {...baseProps} unavailableDays={predicate} />);

      expect(mockDayPickerProps.current.modifiers.unavailable(new Date(2025, 0, 5))).toBe(true);
      expect(mockDayPickerProps.current.modifiers.unavailable(new Date(2025, 0, 6))).toBe(false);
    });

    it('disables unavailable dates via computedDisabled', () => {
      const blocked = new Date(2025, 0, 20);

      render(<Calendar {...baseProps} unavailableDays={[blocked]} />);

      const disabled = mockDayPickerProps.current.disabled as Array<(d: Date) => boolean>;
      expect(disabled.some((fn) => fn(blocked))).toBe(true);
    });

    it('modifier returns false when unavailableDays is not set', () => {
      render(<Calendar {...baseProps} />);

      expect(mockDayPickerProps.current.modifiers.unavailable(new Date(2025, 0, 15))).toBe(false);
    });
  });

  describe('selectionProps', () => {
    it('passes Date[] through when mode is multiple', () => {
      const dates = [new Date(2025, 0, 1), new Date(2025, 0, 2)];

      render(<Calendar {...baseProps} mode="multiple" value={dates} />);

      expect(mockDayPickerProps.current.mode).toBe('multiple');
      expect(mockDayPickerProps.current.selected).toEqual(dates);
    });

    it('coerces non-array value to undefined when mode is multiple', () => {
      render(<Calendar {...baseProps} mode="multiple" value={new Date(2025, 0, 1)} />);

      expect(mockDayPickerProps.current.mode).toBe('multiple');
      expect(mockDayPickerProps.current.selected).toBeUndefined();
    });

    it('passes DateRange through when mode is range', () => {
      const range = { from: new Date(2025, 0, 1), to: new Date(2025, 0, 5) };

      render(<Calendar {...baseProps} mode="range" value={range} />);

      expect(mockDayPickerProps.current.mode).toBe('range');
      expect(mockDayPickerProps.current.selected).toEqual(range);
    });

    it('coerces Date value to undefined when mode is range', () => {
      render(<Calendar {...baseProps} mode="range" value={new Date(2025, 0, 1)} />);

      expect(mockDayPickerProps.current.mode).toBe('range');
      expect(mockDayPickerProps.current.selected).toBeUndefined();
    });

    it('coerces array value to undefined when mode is range', () => {
      render(<Calendar {...baseProps} mode="range" value={[new Date(2025, 0, 1)]} />);

      expect(mockDayPickerProps.current.mode).toBe('range');
      expect(mockDayPickerProps.current.selected).toBeUndefined();
    });

    it('passes Date through when mode is single', () => {
      const date = new Date(2025, 0, 1);

      render(<Calendar {...baseProps} mode="single" value={date} />);

      expect(mockDayPickerProps.current.mode).toBe('single');
      expect(mockDayPickerProps.current.selected).toEqual(date);
    });

    it('coerces array value to undefined when mode is single', () => {
      render(<Calendar {...baseProps} mode="single" value={[new Date(2025, 0, 1)]} />);

      expect(mockDayPickerProps.current.mode).toBe('single');
      expect(mockDayPickerProps.current.selected).toBeUndefined();
    });
  });

  describe('day labels', () => {
    const date = new Date(2026, 10, 16);
    const november = new Date(2026, 10, 1);
    const labelFor = (day: { date: Date; displayMonth: Date }, modifiers = {}, props: Partial<CalendarProps> = {}) => {
      const { unmount } = renderDays(({ DayButton }) => <DayButton day={day} modifiers={modifiers} />, props);
      const label = screen.getByRole('gridcell').getAttribute('aria-label');
      unmount();
      return label;
    };

    it('names a day with weekday, day and month but no year', () => {
      expect(labelFor({ date, displayMonth: november })).toBe('esmaspäev, 16. november');
    });

    it('keeps the today wording from the locale and leaves the selected state out of the name', () => {
      expect(labelFor({ date, displayMonth: november }, { today: true, selected: true })).toBe(
        'Täna, esmaspäev, 16. november'
      );
    });

    it('adds the year only to outside days from another year than their month grid', () => {
      const january = new Date(2027, 0, 1);
      const december = new Date(2026, 11, 1);

      expect(
        [
          { date: new Date(2026, 11, 30), displayMonth: january },
          { date: new Date(2027, 0, 1), displayMonth: january },
          { date: new Date(2026, 11, 31), displayMonth: december },
          { date: new Date(2027, 0, 1), displayMonth: december },
        ].map((day) => labelFor(day))
      ).toEqual([
        'kolmapäev, 30. detsember 2026',
        'reede, 1. jaanuar',
        'neljapäev, 31. detsember',
        'reede, 1. jaanuar 2027',
      ]);
    });

    it('leaves consumer day labels unchanged', () => {
      const label = 'kolmapäev, 30. detsember 2026';
      renderDays(
        ({ DayButton }) => (
          <DayButton
            day={{ date: new Date(2026, 11, 30), displayMonth: new Date(2027, 0, 1) }}
            modifiers={{}}
            aria-label={label}
          />
        ),
        { labels: { labelDayButton: () => label } }
      );

      expect(screen.getByRole('gridcell')).toHaveAttribute('aria-label', label);
    });

    it('uses string labels from the locale', () => {
      expect(
        labelFor({ date, displayMonth: november }, {}, { locale: { ...et, labels: { labelDayButton: 'Päev' } } })
      ).toBe('Päev');
    });

    it('names days with Gregorian dates for locales whose default calendar differs', () => {
      expect(labelFor({ date, displayMonth: november }, {}, { locale: faIR })).toBe('دوشنبه ۱۶ نوامبر');
    });

    it('passes consumer labels to DayPicker', () => {
      const custom = () => 'custom';
      render(<Calendar {...baseProps} labels={{ labelDayButton: custom }} />);

      expect(mockDayPickerProps.current.labels.labelDayButton).toBe(custom);
    });
  });

  describe('dayStatus', () => {
    const dayStatus = (date: Date) => (date.getDate() === 15 ? { type: 'success' as const, label: 'Available' } : null);

    const renderDayButton = (date: Date, props: Partial<CalendarProps> = {}) =>
      renderDays(
        ({ DayButton }) => (
          <DayButton day={{ date, displayMonth: new Date(2025, 0) }} modifiers={{}}>
            {date.getDate()}
          </DayButton>
        ),
        props
      );

    it('puts the gridcell role and selected state on the day button', () => {
      const date = new Date(2025, 0, 16);
      const { container } = renderDays(({ Day, DayButton }) => (
        <table>
          <tbody>
            <tr>
              <Day day={{ date }} modifiers={{ selected: true }} role="gridcell" aria-selected>
                <DayButton day={{ date, displayMonth: date }} modifiers={{ selected: true }}>
                  16
                </DayButton>
              </Day>
              <Day day={{ date }} modifiers={{ hidden: true }} role="gridcell" />
            </tr>
          </tbody>
        </table>
      ));
      const [visibleCell, hiddenCell] = Array.from(container.querySelectorAll('td'));

      expect(visibleCell).toHaveAttribute('role', 'presentation');
      expect(visibleCell).not.toHaveAttribute('aria-selected');
      expect(hiddenCell).toHaveAttribute('role', 'gridcell');
      expect(screen.getByRole('gridcell', { name: 'neljapäev, 16. jaanuar', selected: true })).toBe(
        container.querySelector('td button')
      );
    });

    it('overlays a StatusIndicator and appends the status label to aria-label for matching days', () => {
      const { container } = renderDayButton(new Date(2025, 0, 15), { dayStatus });

      expect(container.querySelector('[data-name="status-indicator"]')).toBeInTheDocument();
      expect(screen.getByRole('gridcell')).toHaveAttribute('aria-label', 'kolmapäev, 15. jaanuar, Available');
    });

    it('renders a plain day button without an indicator for days that have no status', () => {
      const { container } = renderDayButton(new Date(2025, 0, 16), { dayStatus });

      expect(container.querySelector('[data-name="status-indicator"]')).not.toBeInTheDocument();
      expect(screen.getByRole('gridcell')).toHaveAttribute('aria-label', 'neljapäev, 16. jaanuar');
    });

    it('keeps the day button mounted when an inline dayStatus or locale changes identity', () => {
      const date = new Date(2025, 0, 16);
      const { rerender } = renderDayButton(date, { dayStatus: (d) => dayStatus(d), locale: { ...et } });
      const { Day, DayButton } = mockDayPickerProps.current.components;
      const button = screen.getByRole('gridcell');

      rerender(<Calendar {...baseProps} dayStatus={() => ({ type: 'danger', label: 'Busy' })} locale={{ ...et }} />);

      expect(mockDayPickerProps.current.components.Day).toBe(Day);
      expect(mockDayPickerProps.current.components.DayButton).toBe(DayButton);
      expect(screen.getByRole('gridcell', { name: 'neljapäev, 16. jaanuar, Busy' })).toBe(button);
    });
  });

  it('falls back to default setView without crashing when prop is omitted', () => {
    // Omit setView; opening a month from the MonthGrid should invoke the default noop.
    expect(() => render(<Calendar {...baseProps} view="months" selectionLevel="days" />)).not.toThrow();

    fireEvent.click(screen.getByText('select-month'));
  });
});
