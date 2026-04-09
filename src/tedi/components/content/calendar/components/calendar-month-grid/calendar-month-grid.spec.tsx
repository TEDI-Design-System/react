/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MonthGrid } from './calendar-month-grid';

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

jest.mock('../../calendar-grid', () => ({
  PickerGrid: ({
    headerLabel,
    prevAriaLabel,
    nextAriaLabel,
    onPrev,
    onNext,
    items,
    onSelect,
    showNavigation = true,
    className,
  }: any) => (
    <div data-testid="picker-grid" className={className}>
      <div data-testid="header">{headerLabel}</div>

      {showNavigation && (
        <>
          <button data-testid="prev-btn" onClick={onPrev} aria-label={prevAriaLabel}>
            Prev
          </button>
          <button data-testid="next-btn" onClick={onNext} aria-label={nextAriaLabel}>
            Next
          </button>
        </>
      )}

      <div data-testid="month-items">
        {items.map((item: any) => (
          <button
            key={item.key}
            data-testid={`month-${item.key}`}
            onClick={() => onSelect(item.value)}
            aria-pressed={item.isSelected}
            data-month={item.value.getMonth()}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  ),
}));

jest.mock('../../../../base/typography/text/text', () => ({
  Text: ({ children }: any) => <span>{children}</span>,
}));

describe('MonthGrid', () => {
  const mockOnSelectMonth = jest.fn();
  const mockOnNavigate = jest.fn();

  const currentMonth = new Date(2025, 6, 15);

  const defaultProps = {
    currentMonth,
    onSelectMonth: mockOnSelectMonth,
    onNavigate: mockOnNavigate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with correct month and year', () => {
    render(<MonthGrid {...defaultProps} />);
    expect(screen.getByTestId('header')).toHaveTextContent('juuli 2025');
  });

  it('renders 12 month buttons', () => {
    render(<MonthGrid {...defaultProps} />);

    const monthButtons = screen.getAllByTestId(/month-\d+/);
    expect(monthButtons).toHaveLength(12);
  });

  it('calls onNavigate with previous month when prev button clicked', async () => {
    const user = userEvent.setup();
    render(<MonthGrid {...defaultProps} />);

    await user.click(screen.getByTestId('prev-btn'));

    expect(mockOnNavigate).toHaveBeenCalledWith(new Date(2025, 5, 1));
  });

  it('calls onNavigate with next month when next button clicked', async () => {
    const user = userEvent.setup();
    render(<MonthGrid {...defaultProps} />);

    await user.click(screen.getByTestId('next-btn'));

    expect(mockOnNavigate).toHaveBeenCalledWith(new Date(2025, 7, 1));
  });

  it('calls onSelectMonth with correct date when month is clicked', async () => {
    const user = userEvent.setup();
    render(<MonthGrid {...defaultProps} />);

    await user.click(screen.getByTestId('month-7'));
    expect(mockOnSelectMonth).toHaveBeenCalledWith(new Date(2025, 7, 1));
  });

  it('marks current month as selected', () => {
    render(<MonthGrid {...defaultProps} />);

    const julyButton = screen.getByTestId('month-6');
    expect(julyButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('hides navigation when showNavigation=false', () => {
    render(<MonthGrid {...defaultProps} showNavigation={false} />);

    expect(screen.queryByTestId('prev-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next-btn')).not.toBeInTheDocument();
  });

  it('passes className to PickerGrid', () => {
    render(<MonthGrid {...defaultProps} className="custom-month-grid" />);

    const pickerGrid = screen.getByTestId('picker-grid');
    expect(pickerGrid).toHaveClass('custom-month-grid');
  });
});
