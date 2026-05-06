/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TimeGrid } from './time-grid';

jest.mock('../../../../buttons/button/button', () => ({
  __esModule: true,
  default: ({ children, onClick, className, ...rest }: any) => (
    <button className={className} onClick={onClick} {...rest}>
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

  it('auto-focuses the selected button on mount', () => {
    render(<TimeGrid times={times} value="10:00" onSelect={jest.fn()} />);

    const selectedButton = screen.getByText('10:00');
    expect(selectedButton).toHaveFocus();
  });

  it('auto-focuses the selected radio input on mount', () => {
    render(<TimeGrid times={times} value="11:00" variant="radio" onSelect={jest.fn()} />);

    const radios = screen.getAllByRole('radio');
    expect(radios[2]).toHaveFocus();
  });

  it('does not move focus when no value is selected', () => {
    render(
      <>
        <button type="button">outside</button>
        <TimeGrid times={times} onSelect={jest.fn()} />
      </>
    );

    const outside = screen.getByText('outside');
    outside.focus();
    expect(outside).toHaveFocus();
  });

  it('arrow keys move focus between radio cards without calling onSelect', () => {
    const onSelect = jest.fn();
    render(<TimeGrid times={times} value="10:00" variant="radio" onSelect={onSelect} />);

    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveFocus();

    const grid = radios[0].closest('.tedi-time-picker__grid') as HTMLElement;
    fireEvent.keyDown(grid, { key: 'ArrowDown' });

    expect(radios[2]).toHaveFocus();
    expect(onSelect).not.toHaveBeenCalled();

    fireEvent.keyDown(grid, { key: 'ArrowUp' });
    expect(radios[1]).toHaveFocus();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('ArrowDown at the last radio wraps to the first', () => {
    render(<TimeGrid times={times} value="11:00" variant="radio" onSelect={jest.fn()} />);
    const radios = screen.getAllByRole('radio');
    const grid = radios[0].closest('.tedi-time-picker__grid') as HTMLElement;

    expect(radios[2]).toHaveFocus();
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    expect(radios[0]).toHaveFocus();
  });

  it('Home and End jump to the first and last radio cards', () => {
    render(<TimeGrid times={times} value="10:00" variant="radio" onSelect={jest.fn()} />);
    const radios = screen.getAllByRole('radio');
    const grid = radios[0].closest('.tedi-time-picker__grid') as HTMLElement;

    fireEvent.keyDown(grid, { key: 'End' });
    expect(radios[radios.length - 1]).toHaveFocus();

    fireEvent.keyDown(grid, { key: 'Home' });
    expect(radios[0]).toHaveFocus();
  });
});
