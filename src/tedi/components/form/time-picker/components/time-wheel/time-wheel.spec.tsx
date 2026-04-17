/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { clearScrollTimeout, needsScrollCorrection, scrollToIndex } from '../../../time-field/time-field-helpers';
import { TimeWheel } from './time-wheel';

jest.useFakeTimers();

jest.mock('../../../time-field/time-field-helpers', () => ({
  clearScrollTimeout: jest.fn(),
  scrollToIndex: jest.fn(),

  getScrollTopForIndex: (i: number) => i * 40,

  snapToNearestItem: (scrollTop: number, length: number) =>
    Math.max(0, Math.min(length - 1, Math.floor(scrollTop / 40))),

  needsScrollCorrection: jest.fn(() => false),
}));

describe('TimeWheel', () => {
  const hours = ['00', '01', '02'];
  const minutes = ['00', '10', '20'];

  beforeEach(() => {
    jest.clearAllMocks();
    Element.prototype.scrollTo = jest.fn();
  });

  it('renders hours and minutes', () => {
    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="01" selectedMinute="10" onChange={jest.fn()} />);

    const columns = screen.getAllByRole('listbox');

    expect(columns[0]).toHaveTextContent('00');
    expect(columns[0]).toHaveTextContent('01');
    expect(columns[0]).toHaveTextContent('02');
    expect(columns[1]).toHaveTextContent('00');
    expect(columns[1]).toHaveTextContent('10');
    expect(columns[1]).toHaveTextContent('20');
  });

  it('marks selected values', () => {
    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="01" selectedMinute="10" onChange={jest.fn()} />);

    expect(screen.getByText('01').className).toContain('--selected');
    expect(screen.getByText('10').className).toContain('--selected');
  });

  it('calls onChange on hour click', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    await user.click(screen.getByText('02'));

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(onChange).toHaveBeenCalledWith('02', '00');
  });

  it('calls onChange on minute click', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    await user.click(screen.getByText('20'));

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(onChange).toHaveBeenCalledWith('00', '20');
  });

  it('handles hour scroll', () => {
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 40, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('handles minute scroll', () => {
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const col = screen.getAllByRole('listbox')[1];

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 40, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('triggers scroll correction timeout branch', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(true);

    const onChange = jest.fn();

    render(
      <TimeWheel
        hours={['00', '01']}
        minutes={['00', '10']}
        selectedHour="00"
        selectedMinute="00"
        onChange={onChange}
      />
    );

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 40, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(scrollToIndex).toHaveBeenCalled();
  });

  it('keyboard Enter selects value (hour column)', () => {
    const onChange = jest.fn();

    render(
      <TimeWheel hours={['00', '01']} minutes={['00']} selectedHour="01" selectedMinute="00" onChange={onChange} />
    );

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });

    expect(onChange).toHaveBeenCalledWith('01', '00');
  });

  it('keyboard Space selects value (hour column)', () => {
    const onChange = jest.fn();

    render(
      <TimeWheel hours={['00', '01']} minutes={['00']} selectedHour="01" selectedMinute="00" onChange={onChange} />
    );

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    });

    expect(onChange).toHaveBeenCalledWith('01', '00');
  });

  it('cleans up timers on unmount', () => {
    const { unmount } = render(
      <TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={jest.fn()} />
    );

    unmount();

    expect(clearScrollTimeout).toHaveBeenCalled();
  });

  it('cleans up retry + scroll timers on unmount (full cleanup branch)', () => {
    const { unmount } = render(
      <TimeWheel hours={['00']} minutes={['00']} selectedHour="00" selectedMinute="00" onChange={jest.fn()} />
    );

    act(() => {
      jest.advanceTimersByTime(50);
    });

    unmount();

    expect(clearScrollTimeout).toHaveBeenCalled();
  });
});
