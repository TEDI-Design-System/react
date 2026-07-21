import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarHeader } from './calendar-header';
import styles from './calendar-header.module.scss';

import '@testing-library/jest-dom';

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => {
      const labels: Record<string, string> = {
        'pickers.previousMonth': 'Eelmine kuu',
        'pickers.nextMonth': 'Järgmine kuu',
      };
      return labels[key] || key;
    },
  }),
}));

const mockGoToMonth = jest.fn();
const mockNextMonth = new Date(2025, 7, 1);
const mockPreviousMonth = new Date(2025, 5, 1);

jest.mock('react-day-picker', () => ({
  ...jest.requireActual('react-day-picker'),
  useNavigation: () => ({
    goToMonth: mockGoToMonth,
    nextMonth: mockNextMonth,
    previousMonth: mockPreviousMonth,
  }),
}));

describe('CalendarHeader', () => {
  const defaultProps = {
    calendarMonth: {
      date: new Date(2025, 6, 15),
      displayMonth: new Date(2025, 6, 1),
      weeks: [],
    },
    monthYearSelectType: 'dropdown' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders previous and next navigation buttons', () => {
    render(<CalendarHeader {...defaultProps} showNavigation />);

    const prevButton = screen.getByRole('button', { name: /eelmine/i });
    const nextButton = screen.getByRole('button', { name: /järgmine/i });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('aria-label', 'Eelmine kuu');
    expect(nextButton).toHaveAttribute('aria-label', 'Järgmine kuu');
  });

  it('calls goToMonth with previous month when prev button is clicked', async () => {
    const user = userEvent.setup();
    render(<CalendarHeader {...defaultProps} showNavigation />);

    const prevButton = screen.getByRole('button', { name: /eelmine/i });
    await user.click(prevButton);

    expect(mockGoToMonth).toHaveBeenCalledWith(mockPreviousMonth);
  });

  it('calls goToMonth with next month when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<CalendarHeader {...defaultProps} showNavigation />);

    const nextButton = screen.getByRole('button', { name: /järgmine/i });
    await user.click(nextButton);

    expect(mockGoToMonth).toHaveBeenCalledWith(mockNextMonth);
  });

  it('hides navigation buttons when showNavigation=false', () => {
    render(<CalendarHeader {...defaultProps} showNavigation={false} />);

    expect(screen.queryByRole('button', { name: 'Eelmine kuu' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Järgmine kuu' })).not.toBeInTheDocument();
  });

  it('renders month and year dropdowns when monthYearSelectType = "dropdown"', () => {
    render(<CalendarHeader {...defaultProps} localeCode="et" />);

    const monthButton = screen.getByRole('button', { name: /juuli/i });
    expect(monthButton).toBeInTheDocument();
    const yearButton = screen.getByRole('button', { name: /2025/i });
    expect(yearButton).toBeInTheDocument();
    expect(screen.getAllByTestId('tedi-icon-arrow_drop_down')).toHaveLength(2);
  });

  it('renders clickable month/year buttons (grid mode) when monthYearSelectType = "grid"', () => {
    const onOpenMonthGrid = jest.fn();
    const onOpenYearGrid = jest.fn();

    render(
      <CalendarHeader
        {...defaultProps}
        monthYearSelectType="grid"
        onOpenMonthGrid={onOpenMonthGrid}
        onOpenYearGrid={onOpenYearGrid}
        localeCode="et"
      />
    );

    const monthBtn = screen.getByRole('button', { name: /juuli/i });
    const yearBtn = screen.getByRole('button', { name: /2025/i });

    expect(monthBtn).toBeInTheDocument();
    expect(yearBtn).toBeInTheDocument();
  });

  it('calls onOpenMonthGrid when month button clicked in grid mode', async () => {
    const onOpenMonthGrid = jest.fn();
    const user = userEvent.setup();

    render(
      <CalendarHeader
        {...defaultProps}
        monthYearSelectType="grid"
        onOpenMonthGrid={onOpenMonthGrid}
        onOpenYearGrid={jest.fn()}
        localeCode="et"
      />
    );

    await user.click(screen.getByRole('button', { name: /juuli/i }));

    expect(onOpenMonthGrid).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenYearGrid when year button clicked in grid mode', async () => {
    const onOpenYearGrid = jest.fn();
    const user = userEvent.setup();

    render(
      <CalendarHeader
        {...defaultProps}
        monthYearSelectType="grid"
        onOpenMonthGrid={jest.fn()}
        onOpenYearGrid={onOpenYearGrid}
        localeCode="et"
      />
    );

    await user.click(screen.getByRole('button', { name: /2025/i }));

    expect(onOpenYearGrid).toHaveBeenCalledTimes(1);
  });

  it('shows correct Estonian month name', () => {
    render(
      <CalendarHeader
        {...defaultProps}
        calendarMonth={{
          date: new Date(2025, 11, 10),
          weeks: [],
        }}
        localeCode="et"
      />
    );

    expect(screen.getByRole('button', { name: /detsember/i })).toBeInTheDocument();
  });

  it('applies correct header class and no-navigation variant', () => {
    const { container } = render(<CalendarHeader {...defaultProps} showNavigation={false} />);

    const header = container.querySelector(`.${styles['tedi-calendar__header']}`);
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(styles['tedi-calendar__no-navigation']);
  });

  it('calls goToMonth with new month when a month dropdown item is selected', async () => {
    const user = userEvent.setup();

    render(<CalendarHeader {...defaultProps} localeCode="et" />);

    await user.click(screen.getByRole('button', { name: /juuli/i }));

    const januaryItem = await screen.findByRole('menuitem', { name: /jaanuar/i });
    await user.click(januaryItem);

    expect(mockGoToMonth).toHaveBeenCalledTimes(1);
    const called = mockGoToMonth.mock.calls[0][0] as Date;
    expect(called.getMonth()).toBe(0);
    expect(called.getFullYear()).toBe(2025);
  });

  it('calls goToMonth with new year when a year dropdown item is selected', async () => {
    const user = userEvent.setup();

    render(<CalendarHeader {...defaultProps} localeCode="et" />);

    await user.click(screen.getByRole('button', { name: /2025/i }));

    const currentYear = new Date().getFullYear();
    const targetYear = currentYear - 10;
    const yearItem = await screen.findByRole('menuitem', { name: String(targetYear) });
    await user.click(yearItem);

    expect(mockGoToMonth).toHaveBeenCalledTimes(1);
    const called = mockGoToMonth.mock.calls[0][0] as Date;
    expect(called.getFullYear()).toBe(targetYear);
    expect(called.getMonth()).toBe(defaultProps.calendarMonth.date.getMonth());
  });

  it('disables month items whose entire month is unavailable via disabledMatchers', async () => {
    const user = userEvent.setup();

    // Anything before July 2025 is disabled — so January–June 2025 should be
    // disabled in the month dropdown when viewing July 2025.
    render(<CalendarHeader {...defaultProps} localeCode="et" disabledMatchers={[{ before: new Date(2025, 6, 1) }]} />);

    await user.click(screen.getByRole('button', { name: /juuli/i }));

    expect(await screen.findByRole('menuitem', { name: /jaanuar/i })).toBeDisabled();
    expect(screen.getByRole('menuitem', { name: /juuni/i })).toBeDisabled();
    expect(screen.getByRole('menuitem', { name: /juuli/i })).not.toBeDisabled();
    expect(screen.getByRole('menuitem', { name: /august/i })).not.toBeDisabled();
  });

  it('disables year items whose entire year is unavailable via disabledMatchers', async () => {
    const user = userEvent.setup();

    const currentYear = new Date().getFullYear();
    // Disable everything before Jan 1 of the current year — past years in the
    // 21-year window (currentYear-10 … currentYear-1) should all be disabled.
    render(
      <CalendarHeader {...defaultProps} localeCode="et" disabledMatchers={[{ before: new Date(currentYear, 0, 1) }]} />
    );

    await user.click(screen.getByRole('button', { name: /2025/i }));

    const previousYear = currentYear - 1;
    expect(await screen.findByRole('menuitem', { name: String(previousYear) })).toBeDisabled();
    expect(screen.getByRole('menuitem', { name: String(currentYear) })).not.toBeDisabled();
    expect(screen.getByRole('menuitem', { name: String(currentYear + 1) })).not.toBeDisabled();
  });
});
