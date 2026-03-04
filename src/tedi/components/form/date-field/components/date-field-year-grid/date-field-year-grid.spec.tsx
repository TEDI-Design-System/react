import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { YearGrid } from './date-field-year-grid';

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

describe('YearGrid component', () => {
  const mockOnYearChange = jest.fn();
  const mockOnBackToMonths = jest.fn();
  const currentMonth = new Date(2025, 6, 15);

  const defaultProps = {
    currentMonth,
    onYearChange: mockOnYearChange,
    onBackToMonths: mockOnBackToMonths,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct 12-year range in header', () => {
    render(<YearGrid {...defaultProps} />);
    expect(screen.getByText('2016 – 2027')).toBeInTheDocument();
  });

  it('renders 12 year buttons', () => {
    render(<YearGrid {...defaultProps} />);
    const yearButtons = screen.getAllByRole('button').filter((btn) => /^\d{4}$/.test(btn.textContent || ''));
    expect(yearButtons).toHaveLength(12);
  });

  it('marks current year as selected', () => {
    render(<YearGrid {...defaultProps} />);

    const selectedYear = screen.getByRole('button', { name: '2025' });

    expect(selectedYear).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onYearChange with previous 12-year range when prev clicked', async () => {
    const user = userEvent.setup();
    render(<YearGrid {...defaultProps} />);
    const prevBtn = screen.getByRole('button', { name: 'Eelmine periood' });
    await user.click(prevBtn);
    expect(mockOnYearChange).toHaveBeenCalledWith(new Date(2004, 0));
  });

  it('calls onYearChange with next 12-year range when next clicked', async () => {
    const user = userEvent.setup();
    render(<YearGrid {...defaultProps} />);
    const nextBtn = screen.getByRole('button', { name: 'Järgmine periood' });
    await user.click(nextBtn);
    expect(mockOnYearChange).toHaveBeenCalledWith(new Date(2028, 0));
  });

  it('calls onYearChange and onBackToMonths when year selected', async () => {
    const user = userEvent.setup();
    render(<YearGrid {...defaultProps} />);

    const year2023 = screen.getByRole('button', { name: '2023' });
    await user.click(year2023);

    expect(mockOnYearChange).toHaveBeenCalledWith(new Date(2023, currentMonth.getMonth()));
    expect(mockOnBackToMonths).toHaveBeenCalled();
  });
});
