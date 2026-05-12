import { useLabels } from '../../../../providers/label-provider';
import { Button } from '../../../buttons/button/button';
import { Checkbox } from '../../../form/checkbox/checkbox';
import { Dropdown } from '../../../overlays/dropdown/dropdown';
import { DropdownContent } from '../../../overlays/dropdown/dropdown-content/dropdown-content';
import { DropdownItem } from '../../../overlays/dropdown/dropdown-item/dropdown-item';
import { DropdownTrigger } from '../../../overlays/dropdown/dropdown-trigger/dropdown-trigger';
import { useTableContext } from '../table-context';

export interface TableColumnsMenuProps {
  /**
   * Trigger label. Falls back to the localised `table.columns` label from
   * `LabelProvider` when not provided.
   */
  triggerLabel?: React.ReactNode;
  /**
   * Additional class name on the dropdown trigger button.
   */
  className?: string;
}

export const TableColumnsMenu = ({ triggerLabel, className }: TableColumnsMenuProps) => {
  const { table, id } = useTableContext();
  const { getLabel } = useLabels();
  const resolvedTriggerLabel = triggerLabel ?? getLabel('table.columns');

  const hideableColumns = table.getAllLeafColumns().filter((column) => column.getCanHide());
  const visibleCount = hideableColumns.filter((column) => column.getIsVisible()).length;

  const resolveHeader = (column: (typeof hideableColumns)[number]) => {
    const header = column.columnDef.header;
    return typeof header === 'string' ? header : column.id;
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button type="button" visualType="neutral" iconLeft="view_column" className={className}>
          {resolvedTriggerLabel}
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        {hideableColumns.map((column) => {
          const isVisible = column.getIsVisible();
          const isLastVisible = isVisible && visibleCount === 1;
          const checkboxId = `${id}-columns-menu-${column.id}`;
          const headerLabel = resolveHeader(column);

          return (
            <DropdownItem key={column.id} asChild closeOnSelect={false}>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  id={checkboxId}
                  name={checkboxId}
                  label={headerLabel}
                  value={column.id}
                  checked={isVisible}
                  disabled={isLastVisible}
                  onChange={() => column.toggleVisibility()}
                />
              </div>
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </Dropdown>
  );
};

TableColumnsMenu.displayName = 'Table.ColumnsMenu';
