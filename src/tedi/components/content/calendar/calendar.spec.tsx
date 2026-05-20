/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';

import { Calendar, CalendarProps } from './calendar';

import '@testing-library/jest-dom';

const mockDayPickerProps: { current: any } = { current: null };

jest.mock('react-day-picker', () => ({
  DayPicker: (props: any) => {
    mockDayPickerProps.current = props;
    const MonthCaption = props.components?.MonthCaption;

    return (
      <div data-testid="day-picker" className={props.classNames?.root} data-mode={props.mode}>
        {MonthCaption && <MonthCaption {...props} />}

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

  it('falls back to default setView without crashing when prop is omitted', () => {
    // Omit setView; opening a month from the MonthGrid should invoke the default noop.
    expect(() => render(<Calendar {...baseProps} view="months" selectionLevel="days" />)).not.toThrow();

    fireEvent.click(screen.getByText('select-month'));
  });
});
