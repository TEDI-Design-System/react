import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarHeader } from './date-calendar-header';

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
    displayIndex: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders previous and next month buttons with correct aria-labels', () => {
    render(<CalendarHeader {...defaultProps} />);

    const prevBtn = screen.getByRole('button', { name: 'Eelmine kuu' });
    const nextBtn = screen.getByRole('button', { name: 'Järgmine kuu' });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toHaveAttribute('aria-label', 'Eelmine kuu');
    expect(nextBtn).toHaveAttribute('aria-label', 'Järgmine kuu');
  });

  it('calls goToMonth with previous month when prev button is clicked', async () => {
    const user = userEvent.setup();
    render(<CalendarHeader {...defaultProps} />);

    const prevBtn = screen.getByRole('button', { name: 'Eelmine kuu' });
    await user.click(prevBtn);

    expect(mockGoToMonth).toHaveBeenCalledWith(mockPreviousMonth);
  });

  it('calls goToMonth with next month when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<CalendarHeader {...defaultProps} />);

    const nextBtn = screen.getByRole('button', { name: 'Järgmine kuu' });
    await user.click(nextBtn);

    expect(mockGoToMonth).toHaveBeenCalledWith(mockNextMonth);
  });

  it('renders month and year as plain text + dropdown triggers when monthYearSelectGrid = false', () => {
    render(<CalendarHeader {...defaultProps} />);

    expect(screen.getByText('juuli')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getAllByText('arrow_drop_down')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /juuli/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: '2025' })).toHaveLength(1);
  });

  it('renders clickable month and year buttons (no dropdown) when monthYearSelectGrid = true', () => {
    render(
      <CalendarHeader
        {...defaultProps}
        monthYearSelectGrid={true}
        onOpenMonthGrid={jest.fn()}
        onOpenYearGrid={jest.fn()}
      />
    );

    const monthBtn = screen.getByRole('button', { name: 'juuli' });
    const yearBtn = screen.getByRole('button', { name: '2025' });

    expect(monthBtn).toBeInTheDocument();
    expect(yearBtn).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('calls onOpenMonthGrid when month button is clicked in grid mode', async () => {
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

    const monthBtn = screen.getByRole('button', { name: 'juuli' });
    await user.click(monthBtn);

    expect(onOpenMonthGrid).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenYearGrid when year button is clicked in grid mode', async () => {
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

    const yearBtn = screen.getByRole('button', { name: '2025' });
    await user.click(yearBtn);

    expect(onOpenYearGrid).toHaveBeenCalledTimes(1);
  });

  it('shows correct month name in Estonian locale', () => {
    render(
      <CalendarHeader
        {...defaultProps}
        calendarMonth={{
          date: new Date(2025, 11, 10),
          weeks: [],
        }}
      />
    );

    expect(screen.getByText('detsember')).toBeInTheDocument();
  });

  it('applies correct container class', () => {
    const { container } = render(<CalendarHeader {...defaultProps} />);
    expect(container.firstChild).toHaveClass('tedi-date-calendar__header');
  });
});
