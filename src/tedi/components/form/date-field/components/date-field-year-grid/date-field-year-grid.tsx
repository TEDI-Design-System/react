import { useLabels } from '../../../../../providers/label-provider';
import { PickerGrid } from '../../date-field-grid';

export interface YearGridProps {
  /*
   * Current month being displayed in the calendar. Year will be extracted from this.
   */
  currentMonth: Date;
  /*
   * Callback when a year is selected from the grid. Receives a Date object with the selected year and current month.
   */
  onYearChange: (date: Date) => void;
  /*
   * Callback for navigating to a different year range in the grid. Receives a Date object with the target year and current month.
   */
  onBackToMonths: () => void;
}

export const YearGrid = ({ currentMonth, onYearChange, onBackToMonths }: YearGridProps) => {
  const { getLabel } = useLabels();
  const currentYear = currentMonth.getFullYear();
  const startYear = Math.floor(currentYear / 12) * 12;

  const years = Array.from({ length: 12 }, (_, i) => {
    const year = startYear + i;

    return {
      key: year,
      value: year,
      label: year,
      isSelected: year === currentYear,
    };
  });

  return (
    <PickerGrid
      headerLabel={`${startYear} – ${startYear + 11}`}
      prevAriaLabel={getLabel('pickers.previousYear')}
      nextAriaLabel={getLabel('pickers.nextYear')}
      onPrev={() => onYearChange(new Date(startYear - 12, 0))}
      onNext={() => onYearChange(new Date(startYear + 12, 0))}
      items={years}
      onSelect={(year) => {
        onYearChange(new Date(year, currentMonth.getMonth()));
        onBackToMonths();
      }}
    />
  );
};
