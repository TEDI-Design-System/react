import type { Column } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useLabels } from '../../../../providers/label-provider';
import { Button } from '../../../buttons/button/button';
import { TextField } from '../../../form/textfield/textfield';
import { Popover } from '../../../overlays/popover/popover';
import { PopoverContent } from '../../../overlays/popover/popover-content';
import { PopoverTrigger } from '../../../overlays/popover/popover-trigger';
import { TableHeaderButton } from '../table-header-button/table-header-button';
import styles from './table-filter-popover.module.scss';
import type {
  TableFilterAction,
  TableFilterContent,
  TableFilterContext,
  TableFilterOptions,
  TableFilterPopoverWidth,
} from './table-filter-popover.types';

export const DEFAULT_FILTER_ACTIONS: TableFilterAction[] = ['clear', 'apply'];

const ACTION_LABEL_KEYS = {
  apply: 'table.filter-apply',
  clear: 'table.filter-clear',
  cancel: 'table.filter-cancel',
} as const;

const serialize = (value: unknown): string => {
  try {
    return JSON.stringify(value) ?? '';
  } catch {
    return String(value);
  }
};

export interface TableFilterPopoverProps<TData> {
  column: Column<TData, unknown>;
  /** Accessible column name. */
  label: string;
  options: TableFilterOptions;
  /** Table-level footer buttons, used when `options.actions` is not set. */
  defaultActions?: TableFilterAction[];
  /** Table-level popover width, used when `options.popoverWidth` is not set. */
  defaultWidth?: TableFilterPopoverWidth;
  /** Custom filter input; a text field is rendered when omitted. */
  content?: TableFilterContent<TData>;
}

/**
 * Icon-only header button that opens a popover with the column's filter input and footer actions.
 * The input edits a draft; the column filter only changes on `apply` or `clear`.
 */
export const TableFilterPopover = <TData,>({
  column,
  label,
  options,
  defaultActions = DEFAULT_FILTER_ACTIONS,
  defaultWidth = 'small',
  content,
}: TableFilterPopoverProps<TData>) => {
  const { getLabel } = useLabels();
  const applied = column.getFilterValue();

  const [open, setOpen] = useState(false);
  const [draft, setDraftState] = useState<unknown>(applied);

  // Mirrors the draft so `apply()` right after `setValue()` in one handler commits the new value.
  const draftRef = useRef<unknown>(applied);
  const setDraft = useCallback((next: unknown) => {
    draftRef.current = next;
    setDraftState(next);
  }, []);

  // Realign the draft when the applied filter changes from outside (clear all, controlled state).
  const appliedKey = serialize(applied);
  useEffect(() => {
    setDraft(applied);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedKey, setDraft]);

  const handleToggle = useCallback(
    (next: boolean) => {
      if (next && options.clearOnClose) setDraft(column.getFilterValue());
      setOpen(next);
    },
    [column, options.clearOnClose, setDraft]
  );

  const context = useMemo<TableFilterContext<unknown, TData>>(
    () => ({
      value: draft,
      setValue: setDraft,
      apply: () => {
        column.setFilterValue(draftRef.current);
        setOpen(false);
      },
      clear: () => {
        setDraft(undefined);
        column.setFilterValue(undefined);
        setOpen(false);
      },
      cancel: () => {
        setDraft(column.getFilterValue());
        setOpen(false);
      },
      column,
      label,
    }),
    [draft, column, label, setDraft]
  );

  const actions = [...new Set(options.actions ?? defaultActions)];
  const isActive = applied !== undefined;

  return (
    <Popover open={open} onToggle={handleToggle} placement="bottom-end">
      <PopoverTrigger>
        <TableHeaderButton
          icon="filter_alt"
          selected={isActive}
          filled={isActive}
          aria-label={getLabel('table.filter', label)}
        />
      </PopoverTrigger>
      <PopoverContent width={options.popoverWidth ?? defaultWidth}>
        <div className={styles['tedi-table-filter']}>
          {content ? (
            content(context)
          ) : (
            <TextField
              id={`${column.id}-filter`}
              name={`${column.id}-filter`}
              label={getLabel('table.filter-input', label)}
              hideLabel
              placeholder={getLabel('table.filter-placeholder')}
              value={typeof draft === 'string' ? draft : ''}
              onChange={(next) => setDraft(next || undefined)}
            />
          )}
          {actions.length > 0 && (
            <div className={styles['tedi-table-filter__actions']}>
              {actions.map((action) => (
                <Button
                  key={action}
                  size="small"
                  visualType={action === 'apply' ? 'primary' : 'secondary'}
                  onClick={context[action]}
                >
                  {getLabel(ACTION_LABEL_KEYS[action])}
                </Button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

TableFilterPopover.displayName = 'TableFilterPopover';
