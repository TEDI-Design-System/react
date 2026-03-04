import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MonthGrid } from './date-field-month-grid';

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

describe('MonthGrid component', () => {
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

    expect(screen.getByText('juuli 2025')).toBeInTheDocument();
  });

  it('renders 12 month buttons', () => {
    render(<MonthGrid {...defaultProps} />);

    const monthButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.textContent?.match(/jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets/i));

    expect(monthButtons).toHaveLength(12);
  });

  it('calls onNavigate with previous month when prev button clicked', async () => {
    const user = userEvent.setup();
    render(<MonthGrid {...defaultProps} />);
    const prevBtn = screen.getByRole('button', { name: 'Eelmine kuu' });
    await user.click(prevBtn);
    expect(mockOnNavigate).toHaveBeenCalledWith(new Date(2025, 5, 1));
  });

  it('calls onNavigate with next month when next button clicked', async () => {
    const user = userEvent.setup();
    render(<MonthGrid {...defaultProps} />);
    const nextBtn = screen.getByRole('button', { name: 'Järgmine kuu' });
    await user.click(nextBtn);
    expect(mockOnNavigate).toHaveBeenCalledWith(new Date(2025, 7, 1));
  });

  it('calls onSelectMonth with correct date when month is clicked', async () => {
    const user = userEvent.setup();
    render(<MonthGrid {...defaultProps} />);
    const augustButton = screen.getByRole('button', { name: /aug/i });
    await user.click(augustButton);
    expect(mockOnSelectMonth).toHaveBeenCalledWith(new Date(2025, 7, 1));
  });

  it('marks current month as selected', () => {
    render(<MonthGrid {...defaultProps} />);
    const selectedButton = screen.getByRole('button', { name: 'juuli' });
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
  });
});
