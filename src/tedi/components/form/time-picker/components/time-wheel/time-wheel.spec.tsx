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

  it('triggers minute scroll correction timeout branch', () => {
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

    const col = screen.getAllByRole('listbox')[1];

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 40, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(scrollToIndex).toHaveBeenCalled();
  });

  it('does nothing on scroll when a programmatic scroll is in progress', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(false);

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const col = screen.getAllByRole('listbox')[0];

    // A click sets isProgrammaticScrollHour = true and schedules a reset after 350ms.
    // Firing a scroll event right after should be ignored, so onChange must not be
    // called for the scroll.
    return user.click(screen.getByText('01')).then(() => {
      onChange.mockClear();

      act(() => {
        Object.defineProperty(col, 'scrollTop', { value: 80, writable: true });
        col.dispatchEvent(new Event('scroll'));
      });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('ignores scroll when the snapped index has not changed', () => {
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 0, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('ArrowDown focuses the next hour item', () => {
    const onChange = jest.fn();

    render(
      <TimeWheel
        hours={['00', '01', '02']}
        minutes={['00']}
        selectedHour="00"
        selectedMinute="00"
        onChange={onChange}
      />
    );

    const col = screen.getAllByRole('listbox')[0];
    const items = col.querySelectorAll('[role="option"]');
    const focusSpy = jest.spyOn(items[1] as HTMLElement, 'focus');
    const scrollSpy = jest.spyOn(items[1] as HTMLElement, 'scrollIntoView');

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    });

    expect(focusSpy).toHaveBeenCalled();
    expect(scrollSpy).toHaveBeenCalledWith({ block: 'center', behavior: 'smooth' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('ArrowUp focuses the previous hour item and clamps at 0', () => {
    render(
      <TimeWheel
        hours={['00', '01', '02']}
        minutes={['00']}
        selectedHour="00"
        selectedMinute="00"
        onChange={jest.fn()}
      />
    );

    const col = screen.getAllByRole('listbox')[0];
    const items = col.querySelectorAll('[role="option"]');
    const focusSpy = jest.spyOn(items[0] as HTMLElement, 'focus');

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it('Home focuses the first item and End focuses the last item', () => {
    render(
      <TimeWheel
        hours={['00', '01', '02', '03']}
        minutes={['00']}
        selectedHour="02"
        selectedMinute="00"
        onChange={jest.fn()}
      />
    );

    const col = screen.getAllByRole('listbox')[0];
    const items = col.querySelectorAll('[role="option"]');
    const firstFocusSpy = jest.spyOn(items[0] as HTMLElement, 'focus');
    const lastFocusSpy = jest.spyOn(items[3] as HTMLElement, 'focus');

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    });
    expect(firstFocusSpy).toHaveBeenCalled();

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    });
    expect(lastFocusSpy).toHaveBeenCalled();
  });

  it('PageDown and PageUp jump by 5 items and clamp at both ends', () => {
    const list = ['00', '01', '02', '03', '04', '05', '06', '07'];

    render(<TimeWheel hours={list} minutes={['00']} selectedHour="01" selectedMinute="00" onChange={jest.fn()} />);

    const col = screen.getAllByRole('listbox')[0];
    const items = col.querySelectorAll('[role="option"]');
    const pageDownSpy = jest.spyOn(items[6] as HTMLElement, 'focus');

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
    });
    expect(pageDownSpy).toHaveBeenCalled();

    const pageUpSpy = jest.spyOn(items[0] as HTMLElement, 'focus');
    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));
    });
    expect(pageUpSpy).toHaveBeenCalled();
  });

  it('PageDown clamps to the last item when near the end of the list', () => {
    const list = ['00', '01', '02', '03'];

    render(<TimeWheel hours={list} minutes={['00']} selectedHour="02" selectedMinute="00" onChange={jest.fn()} />);

    const col = screen.getAllByRole('listbox')[0];
    const items = col.querySelectorAll('[role="option"]');
    const lastFocusSpy = jest.spyOn(items[3] as HTMLElement, 'focus');

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
    });

    expect(lastFocusSpy).toHaveBeenCalled();
  });

  it('ignores unhandled keys', () => {
    const onChange = jest.fn();

    render(
      <TimeWheel hours={['00', '01']} minutes={['00']} selectedHour="00" selectedMinute="00" onChange={onChange} />
    );

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('does nothing on keyboard input when the selected value is not in the list', () => {
    const onChange = jest.fn();

    render(
      <TimeWheel hours={['00', '01']} minutes={['00']} selectedHour="99" selectedMinute="00" onChange={onChange} />
    );

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('keyboard Enter on minute column selects the current minute', () => {
    const onChange = jest.fn();

    render(
      <TimeWheel
        hours={['00']}
        minutes={['00', '10', '20']}
        selectedHour="00"
        selectedMinute="10"
        onChange={onChange}
      />
    );

    const col = screen.getAllByRole('listbox')[1];

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });

    expect(onChange).toHaveBeenCalledWith('00', '10');
  });

  it('scrolls both columns to the selected index on mount (requestAnimationFrame)', () => {
    const scrollToSpy = jest.fn();
    Element.prototype.scrollTo = scrollToSpy;

    render(
      <TimeWheel
        hours={['00', '01', '02']}
        minutes={['00', '10', '20']}
        selectedHour="02"
        selectedMinute="20"
        onChange={jest.fn()}
      />
    );

    act(() => {
      jest.advanceTimersByTime(20);
    });

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 80, behavior: 'instant' });
  });

  it('skips initial scroll when the selected value is not in the list', () => {
    const scrollToSpy = jest.fn();
    Element.prototype.scrollTo = scrollToSpy;

    render(
      <TimeWheel
        hours={['00', '01']}
        minutes={['00', '10']}
        selectedHour="99"
        selectedMinute="99"
        onChange={jest.fn()}
      />
    );

    act(() => {
      jest.advanceTimersByTime(20);
    });

    expect(scrollToSpy).not.toHaveBeenCalled();
  });

  it('schedules a retry when the initial scroll does not land correctly', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(true);
    const scrollToSpy = jest.fn();
    Element.prototype.scrollTo = scrollToSpy;

    render(
      <TimeWheel
        hours={['00', '01', '02']}
        minutes={['00', '10']}
        selectedHour="02"
        selectedMinute="10"
        onChange={jest.fn()}
      />
    );

    act(() => {
      jest.advanceTimersByTime(20);
    });

    const callsAfterFirstRaf = scrollToSpy.mock.calls.length;

    act(() => {
      jest.advanceTimersByTime(60);
    });

    expect(scrollToSpy.mock.calls.length).toBeGreaterThan(callsAfterFirstRaf);
  });

  it('stops retrying initial scroll once a re-render supersedes the pending attempt (stale gen)', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(true);
    Element.prototype.scrollTo = jest.fn();

    const { rerender } = render(
      <TimeWheel
        hours={['00', '01']}
        minutes={['00', '10']}
        selectedHour="00"
        selectedMinute="00"
        onChange={jest.fn()}
      />
    );

    act(() => {
      jest.advanceTimersByTime(20);
    });

    rerender(
      <TimeWheel
        hours={['00', '01']}
        minutes={['00', '10']}
        selectedHour="01"
        selectedMinute="10"
        onChange={jest.fn()}
      />
    );

    // Drain any retry timers — none should crash because the previous gen is now stale.
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getAllByRole('listbox')).toHaveLength(2);
  });

  it('advances past the 50ms inner timeout after a scroll correction fires', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(true);

    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const col = screen.getAllByRole('listbox')[0];

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 40, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    // Advance past both the 100ms correction trigger and the 50ms flag reset.
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(scrollToIndex).toHaveBeenCalled();
  });

  it('cleans up hour retry timers when the wheel unmounts mid-retry', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(true);
    Element.prototype.scrollTo = jest.fn();

    const { unmount } = render(
      <TimeWheel
        hours={['00', '01']}
        minutes={['00', '10']}
        selectedHour="01"
        selectedMinute="10"
        onChange={jest.fn()}
      />
    );

    // Let the initial rAF enqueue a retry via setTimeout(16ms, schedule).
    act(() => {
      jest.advanceTimersByTime(16);
    });

    unmount();

    // Draining timers after unmount must not crash (retry cleanup path ran).
    expect(() =>
      act(() => {
        jest.advanceTimersByTime(1000);
      })
    ).not.toThrow();
  });

  it('aborts pending retries when the wheel re-renders with different selected values', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(true);
    Element.prototype.scrollTo = jest.fn();

    const { rerender } = render(
      <TimeWheel
        hours={['00', '01']}
        minutes={['00', '10']}
        selectedHour="00"
        selectedMinute="00"
        onChange={jest.fn()}
      />
    );

    // Enough for outer rAF (16ms) + inner rAF (~32ms) + first retry schedule fire (~48ms).
    act(() => {
      jest.advanceTimersByTime(80);
    });

    // Re-render clears the pending retry and bumps the generation counter.
    rerender(
      <TimeWheel
        hours={['00', '01']}
        minutes={['00', '10']}
        selectedHour="01"
        selectedMinute="10"
        onChange={jest.fn()}
      />
    );

    // Any stale rAF callback that fires after this point must early-return via isStale().
    expect(() =>
      act(() => {
        jest.advanceTimersByTime(2000);
      })
    ).not.toThrow();
  });

  it('skips scroll handling when the snapped minute index is unchanged', () => {
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const col = screen.getAllByRole('listbox')[1];

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 0, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('skips minute scroll handling while a programmatic minute scroll is in progress', async () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(false);

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const col = screen.getAllByRole('listbox')[1];

    await user.click(screen.getByText('10'));
    onChange.mockClear();

    act(() => {
      Object.defineProperty(col, 'scrollTop', { value: 80, writable: true });
      col.dispatchEvent(new Event('scroll'));
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('skips the scroll-correction branch when no correction is needed (hour + minute)', () => {
    (needsScrollCorrection as jest.Mock).mockReturnValue(false);

    const onChange = jest.fn();

    render(<TimeWheel hours={hours} minutes={minutes} selectedHour="00" selectedMinute="00" onChange={onChange} />);

    const [hourCol, minuteCol] = screen.getAllByRole('listbox');

    act(() => {
      Object.defineProperty(hourCol, 'scrollTop', { value: 40, writable: true });
      hourCol.dispatchEvent(new Event('scroll'));
      Object.defineProperty(minuteCol, 'scrollTop', { value: 40, writable: true });
      minuteCol.dispatchEvent(new Event('scroll'));
    });

    // Fire the 100ms correction timeouts; scrollToIndex must not be called
    // because needsScrollCorrection returns false.
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(scrollToIndex).not.toHaveBeenCalled();
  });

  it('ArrowDown on the minute column focuses the next minute item', () => {
    render(
      <TimeWheel
        hours={['00']}
        minutes={['00', '10', '20']}
        selectedHour="00"
        selectedMinute="00"
        onChange={jest.fn()}
      />
    );

    const col = screen.getAllByRole('listbox')[1];
    const items = col.querySelectorAll('[role="option"]');
    const focusSpy = jest.spyOn(items[1] as HTMLElement, 'focus');

    act(() => {
      col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    });

    expect(focusSpy).toHaveBeenCalled();
  });
});
