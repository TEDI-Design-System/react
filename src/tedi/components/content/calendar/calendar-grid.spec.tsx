/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';

import { CalendarGrid, CalendarGridProps } from './calendar-grid';

import '@testing-library/jest-dom';

jest.mock('../../base/typography/text/text', () => ({
  Text: ({ children, modifiers }: any) => (
    <span data-testid="text" data-modifiers={modifiers}>
      {children}
    </span>
  ),
}));

jest.mock('../../buttons/button/button', () => ({
  Button: ({
    children,
    onClick,
    'aria-label': ariaLabel,
    icon,
    className,
    'aria-pressed': ariaPressed,
    noStyle,
  }: any) => (
    <button
      data-testid="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={className}
      data-icon={icon}
      data-nostyle={noStyle}
    >
      {children}
    </button>
  ),
}));

jest.mock('../../layout/grid', () => ({
  Row: ({ children, gutter }: any) => (
    <div data-testid="row" data-gutter={gutter}>
      {children}
    </div>
  ),
  Col: ({ children, width }: any) => (
    <div data-testid="col" data-width={width}>
      {children}
    </div>
  ),
}));

describe('CalendarGrid', () => {
  const defaultItems = [
    { key: '1', value: 2024, label: '2024', isSelected: true },
    { key: '2', value: 2025, label: '2025', isSelected: false },
    { key: '3', value: 2026, label: '2026', isSelected: false },
  ];

  const baseProps: CalendarGridProps<number> = {
    headerLabel: 'Year',
    prevAriaLabel: 'Previous',
    nextAriaLabel: 'Next',
    onPrev: jest.fn(),
    onNext: jest.fn(),
    items: defaultItems,
    onSelect: jest.fn(),
    showNavigation: true,
    className: undefined,
  };

  it('renders the component with correct structure', () => {
    render(<CalendarGrid {...baseProps} />);

    expect(screen.getByTestId('row')).toBeInTheDocument();
    expect(screen.getAllByTestId('col')).toHaveLength(3);
    expect(screen.getByText('Year')).toBeInTheDocument();
  });

  it('renders header label correctly', () => {
    render(<CalendarGrid {...baseProps} headerLabel="Select Month" />);

    expect(screen.getByText('Select Month')).toBeInTheDocument();
  });

  it('renders navigation buttons when showNavigation is true', () => {
    render(<CalendarGrid {...baseProps} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('aria-label', 'Previous');
    expect(nextButton).toHaveAttribute('aria-label', 'Next');
  });

  it('does not render navigation buttons when showNavigation is false', () => {
    render(<CalendarGrid {...baseProps} showNavigation={false} />);

    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();

    const header = screen.getByText('Year').parentElement;
    expect(header).toHaveClass('tedi-calendar__picker--no-navigation');
  });

  it('calls onPrev and onNext when navigation buttons are clicked', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();

    render(<CalendarGrid {...baseProps} onPrev={onPrev} onNext={onNext} />);

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('renders all items as buttons in a grid', () => {
    render(<CalendarGrid {...baseProps} />);

    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(5);

    const gridButtons = buttons.filter((btn) => !btn.hasAttribute('aria-label'));
    expect(gridButtons).toHaveLength(3);
  });

  it('calls onSelect with correct value when an item is clicked', () => {
    const onSelect = jest.fn();
    render(<CalendarGrid {...baseProps} onSelect={onSelect} />);

    const year2025Button = screen.getByRole('button', { name: '2025' });
    fireEvent.click(year2025Button);

    expect(onSelect).toHaveBeenCalledWith(2025);
  });

  it('applies selected styles and aria-pressed to selected item', () => {
    render(<CalendarGrid {...baseProps} />);

    const selectedButton = screen.getByRole('button', { name: '2024' });
    const nonSelectedButton = screen.getByRole('button', { name: '2025' });

    expect(selectedButton).toHaveClass('tedi-calendar__grid-button--selected');
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');

    expect(nonSelectedButton).not.toHaveClass('tedi-calendar__grid-button--selected');
    expect(nonSelectedButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('applies custom className to the root container', () => {
    render(<CalendarGrid {...baseProps} className="custom-picker-grid" />);

    const rootContainer = screen.getByTestId('tedi-picker-grid-container');

    expect(rootContainer).toHaveClass('tedi-calendar__picker-grid-container');
    expect(rootContainer).toHaveClass('custom-picker-grid');
  });

  it('renders items with ReactNode labels correctly', () => {
    const itemsWithNode = [
      { key: 'jan', value: 0, label: <span data-testid="jan">January</span>, isSelected: false },
      { key: 'feb', value: 1, label: 'February', isSelected: false },
    ];

    render(<CalendarGrid {...baseProps} items={itemsWithNode} headerLabel="Months" />);

    expect(screen.getByTestId('jan')).toBeInTheDocument();
    expect(screen.getByText('February')).toBeInTheDocument();
  });

  it('uses correct column width (4)', () => {
    render(<CalendarGrid {...baseProps} />);

    const cols = screen.getAllByTestId('col');
    cols.forEach((col) => {
      expect(col).toHaveAttribute('data-width', '4');
    });
  });
});
