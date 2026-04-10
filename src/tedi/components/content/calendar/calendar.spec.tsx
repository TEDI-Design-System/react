/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';

import { Calendar, CalendarProps } from './calendar';

import '@testing-library/jest-dom';

jest.mock('react-day-picker', () => ({
  DayPicker: (props: any) => {
    const MonthCaption = props.components?.MonthCaption;

    return (
      <div data-testid="day-picker" className={props.classNames?.root}>
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

  it('selecting month updates currentMonth and applies value if calendarView=months', () => {
    const setCurrentMonth = jest.fn();
    const applyValue = jest.fn();

    render(
      <Calendar
        {...baseProps}
        view="months"
        calendarView="months"
        setCurrentMonth={setCurrentMonth}
        applyValue={applyValue}
      />
    );

    fireEvent.click(screen.getByText('select-month'));

    expect(setCurrentMonth).toHaveBeenCalled();
    expect(applyValue).toHaveBeenCalled();
  });

  it('selecting month switches to days if calendarView is not months', () => {
    const setView = jest.fn();

    render(<Calendar {...baseProps} view="months" calendarView="days" setView={setView} />);

    fireEvent.click(screen.getByText('select-month'));

    expect(setView).toHaveBeenCalledWith('days');
  });

  it('selecting year updates currentMonth and applies value if calendarView=years', () => {
    const setCurrentMonth = jest.fn();
    const applyValue = jest.fn();

    render(
      <Calendar
        {...baseProps}
        view="years"
        calendarView="years"
        setCurrentMonth={setCurrentMonth}
        applyValue={applyValue}
      />
    );

    fireEvent.click(screen.getByText('select-year'));

    expect(setCurrentMonth).toHaveBeenCalled();
    expect(applyValue).toHaveBeenCalled();
  });

  it('selecting year switches to months if calendarView is not years', () => {
    const setView = jest.fn();

    render(<Calendar {...baseProps} view="years" calendarView="days" setView={setView} />);

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
});
