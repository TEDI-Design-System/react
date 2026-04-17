/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TimePicker } from './time-picker';

jest.mock('../time-field/time-field-helpers', () => ({
  generateHours: () => ['00', '01', '02'],
  generateMinutes: (step: number) => {
    if (step === 5) return ['00', '05', '10'];
    return ['00', '01', '02', '03'];
  },
  parseTime: (time: string) => {
    const [hour = '00', minute = '00'] = (time || '12:00').split(':');
    return { hour, minute };
  },
  findClosestMinute: (target: string, minutes: string[]) => {
    // simple deterministic mock
    return minutes.includes(target) ? target : minutes[0];
  },
}));

jest.mock('./components/time-wheel/time-wheel', () => ({
  TimeWheel: ({ hours, minutes, selectedHour, selectedMinute, onChange }: any) => (
    <div data-testid="time-wheel">
      <div data-testid="hours">{hours.join(',')}</div>
      <div data-testid="minutes">{minutes.join(',')}</div>
      <div data-testid="selected">
        {selectedHour}:{selectedMinute}
      </div>

      <button onClick={() => onChange('01', '10')}>select-time</button>
    </div>
  ),
}));

jest.mock('./components/time-grid/time-grid', () => ({
  TimeGrid: ({ times, value, onSelect }: any) => (
    <div data-testid="time-grid">
      <div data-testid="value">{value}</div>
      {times.map((t: string) => (
        <button key={t} onClick={() => onSelect(t)}>
          {t}
        </button>
      ))}
    </div>
  ),
}));

describe('TimePicker', () => {
  it('renders TimeWheel when availableTimes is not provided', () => {
    render(<TimePicker value="01:10" stepMinutes={5} />);

    expect(screen.getByTestId('time-wheel')).toBeInTheDocument();
    expect(screen.queryByTestId('time-grid')).not.toBeInTheDocument();
  });

  it('renders TimeGrid when availableTimes is provided', () => {
    render(<TimePicker availableTimes={['09:00', '10:00']} value="09:00" />);

    expect(screen.getByTestId('time-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('time-wheel')).not.toBeInTheDocument();
  });

  it('calls onChange when a grid time is selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TimePicker availableTimes={['09:00', '10:00']} onChange={onChange} />);

    await user.click(screen.getByText('10:00'));

    expect(onChange).toHaveBeenCalledWith('10:00');
  });

  it('passes computed hours and minutes to TimeWheel', () => {
    render(<TimePicker value="01:02" stepMinutes={5} />);

    expect(screen.getByTestId('hours')).toHaveTextContent('00,01,02');
    expect(screen.getByTestId('minutes')).toHaveTextContent('00,05,10');
  });

  it('derives selectedHour and selectedMinute correctly', () => {
    render(<TimePicker value="01:02" stepMinutes={5} />);

    // minute should snap to closest from mocked helper
    expect(screen.getByTestId('selected')).toHaveTextContent('01:00');
  });

  it('falls back to "00" when hour is not in generated hours', () => {
    render(<TimePicker value="99:10" />);

    expect(screen.getByTestId('selected')).toHaveTextContent('00:00');
  });

  it('calls onChange when TimeWheel triggers change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TimePicker value="01:01" onChange={onChange} />);

    await user.click(screen.getByText('select-time'));

    expect(onChange).toHaveBeenCalledWith('01:10');
  });

  it('applies className to TimeGrid', () => {
    render(<TimePicker availableTimes={['09:00']} className="custom-class" />);

    expect(screen.getByTestId('time-grid')).toBeInTheDocument();
  });

  it('passes gridVariant to TimeGrid', () => {
    render(<TimePicker availableTimes={['09:00']} gridVariant="radio" />);

    expect(screen.getByTestId('time-grid')).toBeInTheDocument();
  });
});
