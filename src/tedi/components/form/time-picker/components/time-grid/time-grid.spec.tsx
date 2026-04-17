/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TimeGrid } from './time-grid';

jest.mock('../../../../buttons/button/button', () => ({
  __esModule: true,
  default: ({ children, onClick, className }: any) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock('../../../../layout/grid', () => ({
  Row: ({ children }: any) => <div data-testid="row">{children}</div>,
  Col: ({ children }: any) => <div data-testid="col">{children}</div>,
}));

jest.mock('../../../choice-group/choice-group', () => ({
  __esModule: true,
  default: ({ items, value, onChange }: any) => (
    <div data-testid="choice-group">
      {items.map((item: any) => (
        <label key={item.id}>
          <input
            type="radio"
            name="time-grid"
            value={item.value}
            checked={item.value === value}
            onChange={() => onChange(item.value)}
          />
          {item.label}
        </label>
      ))}
    </div>
  ),
}));

describe('TimeGrid', () => {
  const times = ['09:00', '10:00', '11:00'];

  it('renders buttons variant by default', () => {
    render(<TimeGrid times={times} onSelect={jest.fn()} />);

    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();

    expect(screen.getByTestId('row')).toBeInTheDocument();
  });

  it('renders radio variant when specified', () => {
    render(<TimeGrid times={times} variant="radio" onSelect={jest.fn()} />);

    expect(screen.getByTestId('choice-group')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(times.length);
  });

  it('calls onSelect when a button is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<TimeGrid times={times} onSelect={onSelect} />);

    await user.click(screen.getByText('10:00'));

    expect(onSelect).toHaveBeenCalledWith('10:00');
  });

  it('calls onSelect when a radio option is selected', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<TimeGrid times={times} variant="radio" onSelect={onSelect} />);

    const radios = screen.getAllByRole('radio');
    await user.click(radios[1]);

    expect(onSelect).toHaveBeenCalledWith('10:00');
  });

  it('applies selected class to active button', () => {
    render(<TimeGrid times={times} value="10:00" onSelect={jest.fn()} />);

    const selectedButton = screen.getByText('10:00');
    expect(selectedButton.className).toContain('tedi-time-picker__grid-item--selected');
  });

  it('passes value to radio group as checked state', () => {
    render(<TimeGrid times={times} value="11:00" variant="radio" onSelect={jest.fn()} />);

    const radios = screen.getAllByRole('radio');

    expect(radios[2]).toBeChecked();
  });

  it('applies custom className to root container', () => {
    const { container } = render(<TimeGrid times={times} className="custom-class" onSelect={jest.fn()} />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('respects colWidth prop (radio items)', () => {
    render(<TimeGrid times={times} variant="radio" colWidth={6} onSelect={jest.fn()} />);

    expect(screen.getByTestId('choice-group')).toBeInTheDocument();
  });
});
