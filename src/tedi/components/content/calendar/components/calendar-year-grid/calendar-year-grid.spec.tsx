/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { YearGrid } from './calendar-year-grid';

import '@testing-library/jest-dom';

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => {
      const labels: Record<string, string> = {
        'pickers.previousYear': 'Eelmine periood',
        'pickers.nextYear': 'Järgmine periood',
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

      <div data-testid="year-items">
        {items.map((item: any) => (
          <button
            key={item.key}
            data-testid={`year-${item.value}`}
            onClick={() => onSelect(item.value)}
            aria-pressed={item.isSelected}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  ),
}));

describe('YearGrid', () => {
  const mockOnSelectYear = jest.fn();
  const mockOnNavigate = jest.fn();
  const currentMonth = new Date(2025, 6, 15);

  const defaultProps = {
    currentMonth,
    onSelectYear: mockOnSelectYear,
    onNavigate: mockOnNavigate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders current year in header', () => {
    render(<YearGrid {...defaultProps} />);
    expect(screen.getByTestId('header')).toHaveTextContent('2025');
  });

  it('renders 12 year buttons', () => {
    render(<YearGrid {...defaultProps} />);

    const yearButtons = screen.getAllByTestId(/year-\d+/);
    expect(yearButtons).toHaveLength(12);
  });

  it('marks current year as selected', () => {
    render(<YearGrid {...defaultProps} />);

    const currentYearBtn = screen.getByTestId('year-2025');
    expect(currentYearBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onNavigate with previous 12-year range when prev clicked', async () => {
    const user = userEvent.setup();
    render(<YearGrid {...defaultProps} />);
    await user.click(screen.getByTestId('prev-btn'));
    expect(mockOnNavigate).toHaveBeenCalledWith(new Date(2004, 0));
  });

  it('calls onNavigate with next 12-year range when next clicked', async () => {
    const user = userEvent.setup();
    render(<YearGrid {...defaultProps} />);
    await user.click(screen.getByTestId('next-btn'));
    expect(mockOnNavigate).toHaveBeenCalledWith(new Date(2028, 0));
  });

  it('calls onSelectYear with correct date (preserving current month) when a year is clicked', async () => {
    const user = userEvent.setup();
    render(<YearGrid {...defaultProps} />);

    await user.click(screen.getByTestId('year-2023'));

    expect(mockOnSelectYear).toHaveBeenCalledWith(new Date(2023, currentMonth.getMonth(), 1));
  });

  it('hides navigation when showNavigation=false', () => {
    render(<YearGrid {...defaultProps} showNavigation={false} />);
    expect(screen.queryByTestId('prev-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next-btn')).not.toBeInTheDocument();
  });

  it('passes className to PickerGrid', () => {
    render(<YearGrid {...defaultProps} className="custom-year-grid" />);

    const pickerGrid = screen.getByTestId('picker-grid');
    expect(pickerGrid).toHaveClass('custom-year-grid');
  });
});
