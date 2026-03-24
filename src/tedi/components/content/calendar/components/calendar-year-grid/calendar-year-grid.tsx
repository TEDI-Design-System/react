import { useLabels } from '../../../../../providers/label-provider';
import { PickerGrid } from '../../calendar-grid';

export interface YearGridProps {
  /*
   * Current month being displayed in the calendar. Year will be extracted from this.
   */
  currentMonth: Date;
  /*
   * Callback fired when a year is selected from the grid.
   * Receives a Date object representing the selected year.
   * The month and day values may be normalized by the parent component
   * depending on the active calendar view (e.g. January 1st in year-only mode).
   */
  onSelectYear: (date: Date) => void;
  /*
   * Callback fired when navigating between year ranges in the grid
   * (e.g. when clicking the previous or next buttons).
   * Receives a Date object representing the first year of the
   * newly displayed range.
   */
  onNavigate: (date: Date) => void;
}

export const YearGrid = ({ currentMonth, onSelectYear, onNavigate }: YearGridProps) => {
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
      onPrev={() => onNavigate(new Date(startYear - 12, 0))}
      onNext={() => onNavigate(new Date(startYear + 12, 0))}
      items={years}
      onSelect={(year) => {
        onSelectYear(new Date(year, currentMonth.getMonth(), 1));
      }}
    />
  );
};
