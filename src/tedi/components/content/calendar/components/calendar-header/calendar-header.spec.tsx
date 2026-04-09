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
    monthYearSelectGrid: false,
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

  it('renders month and year dropdowns when monthYearSelectGrid = false', () => {
    render(<CalendarHeader {...defaultProps} />);

    const monthButton = screen.getByRole('button', { name: /juuli/i });
    expect(monthButton).toBeInTheDocument();
    const yearButton = screen.getByRole('button', { name: /2025/i });
    expect(yearButton).toBeInTheDocument();
    expect(screen.getAllByTestId('tedi-icon-arrow_drop_down')).toHaveLength(2);
  });

  it('renders clickable month/year buttons (grid mode) when monthYearSelectGrid = true', () => {
    const onOpenMonthGrid = jest.fn();
    const onOpenYearGrid = jest.fn();

    render(
      <CalendarHeader
        {...defaultProps}
        monthYearSelectGrid={true}
        onOpenMonthGrid={onOpenMonthGrid}
        onOpenYearGrid={onOpenYearGrid}
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
        monthYearSelectGrid={true}
        onOpenMonthGrid={onOpenMonthGrid}
        onOpenYearGrid={jest.fn()}
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
        monthYearSelectGrid={true}
        onOpenMonthGrid={jest.fn()}
        onOpenYearGrid={onOpenYearGrid}
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
});
