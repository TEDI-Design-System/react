import { GroupBase, OptionsOrGroups } from 'react-select';

import { ISelectOption } from '../select';

/**
 * Returns true when `options` is a grouped tree (i.e. each top-level entry
 * has its own `options` array).
 */
export const isGroupedOptions = (
  options: OptionsOrGroups<ISelectOption, GroupBase<ISelectOption>>
): options is ReadonlyArray<GroupBase<ISelectOption>> =>
  options.length > 0 && Array.isArray((options[0] as GroupBase<ISelectOption>).options);

/**
 * Flattens grouped/non-grouped options into a single list of enabled
 * `ISelectOption`s. Used by Select All and group toggles to decide which
 * options to flip on/off.
 */
export const getEnabledOptions = (
  options: OptionsOrGroups<ISelectOption, GroupBase<ISelectOption>>
): ISelectOption[] => {
  if (!options || options.length === 0) return [];
  if (isGroupedOptions(options)) {
    return options.flatMap((group) => group.options.filter((o) => !o.isDisabled));
  }
  return (options as ISelectOption[]).filter((o) => !o.isDisabled);
};

/**
 * Returns the enabled options of a specific group. Pass the group object
 * directly (e.g. `GroupHeadingProps.data` from react-select) — looking groups
 * up by label is unsafe because duplicate labels would always resolve to the
 * first match, mutating the wrong group.
 */
export const getGroupEnabledOptions = (group: GroupBase<ISelectOption> | null | undefined): ISelectOption[] => {
  if (!group || !Array.isArray(group.options)) return [];
  return group.options.filter((o) => !o.isDisabled);
};

/** True iff every enabled option is currently in the selection. */
export const areAllSelected = (
  selected: ReadonlyArray<ISelectOption>,
  enabled: ReadonlyArray<ISelectOption>
): boolean => {
  if (enabled.length === 0) return false;
  return enabled.every((opt) => selected.some((s) => s.value === opt.value));
};

/** True when some — but not all — enabled options are selected. */
export const isIndeterminate = (
  selected: ReadonlyArray<ISelectOption>,
  enabled: ReadonlyArray<ISelectOption>
): boolean => {
  if (enabled.length === 0) return false;
  const count = enabled.filter((opt) => selected.some((s) => s.value === opt.value)).length;
  return count > 0 && count < enabled.length;
};

/**
 * Toggle behaviour for both Select All and group toggle: when every enabled
 * option in `target` is selected, remove them all; otherwise add the missing
 * ones to the existing selection. Other selected values (e.g. options
 * outside `target`) are preserved.
 */
export const toggleBulkSelection = (
  selected: ReadonlyArray<ISelectOption>,
  target: ReadonlyArray<ISelectOption>
): ISelectOption[] => {
  if (areAllSelected(selected, target)) {
    return selected.filter((s) => !target.some((t) => t.value === s.value));
  }
  const next = [...selected];
  for (const opt of target) {
    if (!next.some((s) => s.value === opt.value)) next.push(opt);
  }
  return next;
};
