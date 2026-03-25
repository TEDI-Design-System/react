import { useLabels } from '../../../../../providers/label-provider';
import { Text } from '../../../../base/typography/text/text';
import { PickerGrid } from '../../calendar-grid';

export interface MonthGridProps {
  /*
   * Current month being displayed in the calendar.
   */
  currentMonth: Date;
  /*
   * Callback when a month is selected from the grid. Receives a Date object with the selected month and current year.
   */
  onSelectMonth: (date: Date) => void;
  /*
   * Callback for navigating to a different month in the grid. Receives a Date object with the target month and current year.
   */
  onNavigate: (date: Date) => void;
  /**
   * Show or hide previous/next navigation buttons in calendar header.
   * Default is `true`.
   */
  showNavigation?: boolean;
}

export const MonthGrid = ({ currentMonth, onSelectMonth, onNavigate, showNavigation }: MonthGridProps) => {
  const { getLabel } = useLabels();
  const year = currentMonth.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(year, i, 1);

    return {
      key: i,
      value: date,
      label: <Text modifiers="capitalize-first">{date.toLocaleString('et-EE', { month: 'short' })}</Text>,
      isSelected: i === currentMonth.getMonth(),
    };
  });

  return (
    <PickerGrid
      headerLabel={
        <>
          {currentMonth.toLocaleString('et-EE', { month: 'short' })} {year}
        </>
      }
      prevAriaLabel={getLabel('pickers.previousMonth')}
      nextAriaLabel={getLabel('pickers.nextMonth')}
      onPrev={() => onNavigate(new Date(year, currentMonth.getMonth() - 1))}
      onNext={() => onNavigate(new Date(year, currentMonth.getMonth() + 1))}
      items={months}
      onSelect={onSelectMonth}
      showNavigation={showNavigation}
    />
  );
};
