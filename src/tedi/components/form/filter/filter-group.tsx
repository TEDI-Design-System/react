import cn from 'classnames';
import React from 'react';

import styles from './filter.module.scss';
import { FilterGroupContext, FilterGroupContextValue } from './filter-group-context';

interface FilterGroupCommonProps {
  /**
   * Accessible label for the group, exposed as `aria-label` on the container.
   *
   * Recommended whenever the group is managed (single- or multi-select) so screen readers
   * announce the radio/group semantics with context (e.g. "Status, radio group"). Setting
   * `label` also implicitly turns the group into managed mode.
   */
  label?: string;
  /**
   * When `true`, every `<Filter>` inside the group is disabled, regardless of their own
   * `disabled` props. Useful for "this section isn't applicable yet" UX.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Extra class name appended to the group container `<div>`. Use this for spacing/layout;
   * the per-filter radius and border-collapsing already comes from the group's own styles.
   */
  className?: string;
  /**
   * `<Filter>` children that participate in the group. Non-`<Filter>` nodes are rendered
   * verbatim but do not contribute to the managed selection state.
   */
  children: React.ReactNode;
}

interface FilterGroupSingleProps extends FilterGroupCommonProps {
  /**
   * When `false` or omitted, the group enforces single-select (radio-like) semantics —
   * picking a child deselects the others; re-clicking the active one toggles it to `null`.
   *
   * @default false
   */
  multiselect?: false;
  /**
   * **Controlled** selected value. The string identifier matches the `value` prop on the
   * `<Filter>` child you want highlighted, or `null` for "nothing selected".
   *
   * Pair with `onValueChange` to fully own the state.
   */
  value?: string | null;
  /**
   * **Uncontrolled** initial selected value. Ignored once `value` is provided.
   */
  defaultValue?: string | null;
  /**
   * Fires whenever the selected value changes — when a child is clicked, or when the
   * currently-active child is re-clicked to toggle it back to `null`.
   */
  onValueChange?: (value: string | null) => void;
  values?: never;
  defaultValues?: never;
  onValuesChange?: never;
}

interface FilterGroupMultiProps extends FilterGroupCommonProps {
  /**
   * Set to `true` to switch the group into multi-select (toggle-group) semantics — multiple
   * children can be active at once and `aria-pressed` is used in place of `aria-checked`.
   */
  multiselect: true;
  /**
   * **Controlled** selected values array. Each entry should match the `value` prop of one
   * `<Filter>` child. Order is preserved as the user toggles entries.
   */
  values?: string[];
  /**
   * **Uncontrolled** initial selected values array. Ignored once `values` is provided.
   */
  defaultValues?: string[];
  /**
   * Fires whenever the selected values array changes (any child toggled on or off).
   */
  onValuesChange?: (values: string[]) => void;
  value?: never;
  defaultValue?: never;
  onValueChange?: never;
}

export type FilterGroupProps = FilterGroupSingleProps | FilterGroupMultiProps;

type FilterGroupInternalProps = FilterGroupCommonProps & {
  multiselect?: boolean;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
};

export const FilterGroup = (props: FilterGroupProps): JSX.Element => {
  const {
    label,
    disabled = false,
    className,
    children,
    multiselect = false,
    value: controlledValue,
    defaultValue,
    onValueChange,
    values: controlledValues,
    defaultValues,
    onValuesChange,
  } = props as FilterGroupInternalProps;

  const isManaged =
    controlledValue !== undefined ||
    defaultValue !== undefined ||
    onValueChange !== undefined ||
    controlledValues !== undefined ||
    defaultValues !== undefined ||
    onValuesChange !== undefined ||
    Boolean(label) ||
    multiselect;

  const [innerValue, setInnerValue] = React.useState<string | null>(defaultValue ?? null);
  const [innerValues, setInnerValues] = React.useState<string[]>(defaultValues ?? []);

  const currentValue = controlledValue !== undefined ? controlledValue : innerValue;
  const currentValues = controlledValues !== undefined ? controlledValues : innerValues;

  const selectFilter = React.useCallback(
    (val: string) => {
      if (multiselect) {
        const next = currentValues.includes(val) ? currentValues.filter((v) => v !== val) : [...currentValues, val];
        if (controlledValues === undefined) {
          setInnerValues(next);
        }
        onValuesChange?.(next);
      } else {
        const next = currentValue === val ? null : val;
        if (controlledValue === undefined) {
          setInnerValue(next);
        }
        onValueChange?.(next);
      }
    },
    [multiselect, currentValues, currentValue, controlledValues, controlledValue, onValuesChange, onValueChange]
  );

  const isSelected = React.useCallback(
    (val: string): boolean => {
      if (multiselect) return currentValues.includes(val);
      return currentValue === val;
    },
    [multiselect, currentValues, currentValue]
  );

  const context = React.useMemo<FilterGroupContextValue>(
    () => ({
      isManaged,
      multiselect,
      disabled,
      isSelected,
      selectFilter,
    }),
    [isManaged, multiselect, disabled, isSelected, selectFilter]
  );

  const role = isManaged ? (multiselect ? 'group' : 'radiogroup') : undefined;

  return (
    <FilterGroupContext.Provider value={context}>
      <div className={cn(styles['tedi-filter-group'], className)} role={role} aria-label={label}>
        {children}
      </div>
    </FilterGroupContext.Provider>
  );
};

FilterGroup.displayName = 'FilterGroup';
