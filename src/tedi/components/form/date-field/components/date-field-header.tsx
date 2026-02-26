import { MonthCaptionProps, useNavigation } from 'react-day-picker';

import Button from '../../../buttons/button/button';

export function CalendarHeader({ calendarMonth, displayIndex }: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const displayMonth = calendarMonth.date;

  const months = Array.from({ length: 12 }, (_, i) => new Date(2025, i, 1).toLocaleString('et-EE', { month: 'long' }));

  const years = Array.from({ length: 10 }, (_, i) => 2021 + i);

  return (
    <div className="display-flex align-items-center justify-content-between">
      <Button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        aria-label="Previous month"
        icon="arrow_back"
        visualType="neutral"
      >
        Previous
      </Button>

      <select
        value={displayMonth.getMonth()}
        onChange={(e) => goToMonth(new Date(displayMonth.getFullYear(), Number(e.target.value)))}
      >
        {months.map((m, i) => (
          <option key={i} value={i}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={displayMonth.getFullYear()}
        onChange={(e) => goToMonth(new Date(Number(e.target.value), displayMonth.getMonth()))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <Button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        visualType="neutral"
        aria-label="Next month"
        icon="arrow_forward"
      >
        Next
      </Button>
    </div>
  );
}
