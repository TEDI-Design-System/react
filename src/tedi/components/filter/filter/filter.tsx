import cn from 'classnames';
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import Button from '../../buttons/button/button';
import Checkbox from '../../form/checkbox/checkbox';
import { Search } from '../../form/search/search';
import { Dropdown } from '../../overlays/dropdown/dropdown';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import styles from './filter.module.scss';
import { FilterGroupContext } from './filter-group-context';

export type FilterVariant = 'primary' | 'secondary';
export type FilterSize = 'default' | 'large';

export interface FilterOption {
  /** Display label of the option. */
  label: string;
  /** Stable identifier returned via selection callbacks. */
  value: string;
  /** Whether the option cannot be selected. */
  disabled?: boolean;
}

type FilterBreakpointProps = {
  /**
   * Visual variant of the filter.
   * @default primary
   */
  variant?: FilterVariant;
  /**
   * Visual size of the filter.
   * @default default
   */
  size?: FilterSize;
};

export interface FilterProps extends BreakpointSupport<FilterBreakpointProps> {
  /**
   * Text shown on the trigger button. Acts as the accessible name when no
   * dropdown options are selected; in single-select mode this is replaced by the
   * selected option's label (or prefixed with it when `preserveLabel` is on).
   */
  text: string;
  /**
   * Stable identifier used when the filter participates in a managed `<FilterGroup>`.
   *
   * The group reads this value to know which child is selected and writes it back
   * via its `onValueChange` / `onValuesChange` handlers. Unused outside of a managed
   * group context.
   */
  value?: string;
  /**
   * When `true`, the trigger button is non-interactive and rendered with a muted style.
   *
   * If the filter lives inside a `<FilterGroup disabled>`, the group's disabled flag
   * also propagates here — there's no need to set both.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Extra class name appended to the root wrapper `<div>` (not the inner `<button>`).
   *
   * Use this for layout adjustments like `margin` or `flex` overrides. To style the
   * trigger itself, target the wrapper's child `button` from your own stylesheet.
   */
  className?: string;
  /**
   * Optional HTML `id` placed on the trigger `<button>`.
   *
   * When omitted, the component generates a stable id internally (`tedi-filter-…`)
   * and uses it as the prefix for sub-element ids (search input, options). Set this
   * when you need an outside `<label htmlFor>` association or deep-linking.
   */
  id?: string;
  /**
   * Selected appearance flag.
   *
   * - **Toggle mode** (no `options`, no `children`): can be either controlled
   *   (pair with `onSelectedChange`) or uncontrolled (use `defaultSelected`).
   * - **Custom-content mode** (`children` provided): **controlled-only**. The
   *   Filter can't know what counts as "selected" inside your custom dropdown,
   *   so you must drive `selected` yourself based on the picked value
   *   (e.g. `selected={Boolean(dateRange?.from)}`). `defaultSelected` and
   *   `onSelectedChange` are not honoured in this mode — the dropdown open /
   *   close toggle doesn't fire either of them.
   * - **Single-select / multi-select modes** (`options` provided): ignored.
   *   The selected appearance is derived from `selectedValue` / `selectedValues`.
   */
  selected?: boolean;
  /**
   * **Uncontrolled** initial selected state — **toggle mode only** (no `options`,
   * no `children`). For custom-content filters the toggle event isn't wired
   * (the click opens the dropdown instead), so this would never update —
   * pass `selected` as a controlled prop instead.
   *
   * Ignored when `selected` is also provided (controlled mode wins).
   *
   * @default false
   */
  defaultSelected?: boolean;
  /**
   * Fires whenever the toggle state changes — **toggle mode only**. Custom-content
   * filters don't fire this callback (the click opens the dropdown; closing the
   * dropdown doesn't toggle a boolean). Single- and multi-select modes use
   * `onSelectedValueChange` / `onSelectedValuesChange` respectively.
   */
  onSelectedChange?: (selected: boolean) => void;
  /**
   * **Controlled** value for single-select dropdown mode. Pair with `options`.
   *
   * An empty string (`''`) means "nothing selected". Provide this together with
   * `onSelectedValueChange` to own the selection externally.
   */
  selectedValue?: string;
  /**
   * **Uncontrolled** initial value for single-select dropdown mode. Pair with `options`.
   *
   * Ignored once `selectedValue` (controlled) is provided.
   */
  defaultSelectedValue?: string;
  /**
   * Fires when the single-select value changes — when an option is committed or the
   * "Clear selection" action is used. Receives the new value (or `''` when cleared).
   *
   * The dropdown closes automatically after a commit; this callback fires before close.
   */
  onSelectedValueChange?: (value: string) => void;
  /**
   * When `true`, the dropdown switches from single-select (one value) to multi-select
   * (an array of values rendered as checkboxes). Has no effect unless `options` is also set.
   *
   * Multi-select dropdowns do **not** close on each click — the user picks several
   * options and dismisses the dropdown manually (Escape / outside-click).
   *
   * @default false
   */
  multiselect?: boolean;
  /**
   * **Controlled** values array for multi-select dropdown mode.
   *
   * The order of entries is preserved as the user toggles options. Pair with
   * `onSelectedValuesChange` to own the selection externally.
   */
  selectedValues?: string[];
  /**
   * **Uncontrolled** initial values array for multi-select dropdown mode.
   *
   * Ignored once `selectedValues` (controlled) is provided.
   */
  defaultSelectedValues?: string[];
  /**
   * Fires when the multi-select values array changes — option toggle, "Select all"
   * toggle, or "Clear selection". Receives the new array.
   */
  onSelectedValuesChange?: (values: string[]) => void;
  /**
   * Option list rendered inside the dropdown. Each entry needs a unique `value` and a
   * `label`; flag entries as `disabled` to prevent selection.
   *
   * Presence of options is what turns the filter into a dropdown — it's mutually
   * exclusive with `children` (custom content takes precedence if both are set).
   */
  options?: FilterOption[];
  /**
   * When `true`, renders a search input above the option list that live-filters
   * options by their `label` (case-insensitive, substring match).
   *
   * Has no effect in custom-content mode.
   *
   * @default false
   */
  searchable?: boolean;
  /**
   * Multi-select only — when `true`, renders a "Select all" checkbox above the option
   * list that toggles every **enabled, currently-visible** option (so it works
   * correctly together with `searchable`).
   *
   * @default false
   */
  showSelectAll?: boolean;
  /**
   * Custom label for the "Select all" row. When omitted, falls back to the
   * `filter.select-all` translation from `<LabelProvider>` (default `'Vali kõik'`
   * in `et`, `'Select all'` in `en`).
   */
  selectAllLabel?: string;
  /**
   * When `true`, renders a "Clear selection" button under the option list (or under
   * `children` in custom-content mode).
   *
   * In single/multi-select modes this empties the selection automatically. In
   * custom-content mode it doesn't touch consumer state — wire up `onClear` to reset
   * whatever the children are bound to.
   *
   * @default false
   */
  showClear?: boolean;
  /**
   * Custom label for the "Clear selection" action. When omitted, falls back to the
   * `filter.clear-selection` translation from `<LabelProvider>` (default
   * `'Tühjenda valik'` in `et`, `'Clear selection'` in `en`).
   */
  clearLabel?: string;
  /**
   * Single-select only — when `true`, the filter `text` stays on the trigger as a
   * prefix once a value is picked: `"Teenus: Optometristi vastuvõtt"` instead of just
   * `"Optometristi vastuvõtt"`.
   *
   * Useful when the filter category isn't obvious from the option label alone.
   *
   * @default false
   */
  preserveLabel?: boolean;
  /**
   * Custom dropdown panel content (e.g. a `<ChoiceGroup>`, calendar, or arbitrary UI).
   *
   * Providing `children` switches the filter into custom-content mode and overrides
   * the option-list rendering even if `options` is also set. The trigger's selected
   * state in this mode is driven by `selected` / `defaultSelected`; the consumer is
   * responsible for any state behind the panel.
   */
  children?: React.ReactNode;
  /**
   * Fires when the user clicks the "Clear selection" button while `children` are
   * rendered (custom-content mode only).
   *
   * Use this to reset the consumer-managed state behind the custom panel — the
   * component itself has nothing to clear in this mode.
   */
  onClear?: () => void;
  /**
   * Slot rendered before `text` on the trigger button — typically an `<Icon>`,
   * `<StatusIndicator>` or `<StatusBadge>`.
   *
   * In toggle mode the prepend is automatically replaced by a check icon when the
   * filter becomes selected (override with `hidePrependWhenSelected={false}`).
   */
  prepend?: React.ReactNode;
  /**
   * When `true`, the `prepend` slot disappears while the filter is selected so the
   * check icon can take its place. Set to `false` to keep the prepend visible
   * regardless of selection state.
   *
   * @default true
   */
  hidePrependWhenSelected?: boolean;
  /**
   * Slot rendered after `text` (and before the dropdown chevron, if any). Always
   * visible — useful for badges that count related items or status pills.
   *
   * In multi-select dropdown mode the component also renders its own count badge
   * showing the number of selected values; `append` sits beside it.
   */
  append?: React.ReactNode;
  /**
   * Where the dropdown panel is positioned relative to the trigger.
   *
   * Accepts any Floating UI placement (`'top'`, `'bottom'`, `'left'`, `'right'`,
   * and their `-start`/`-end` variants). The panel flips automatically when there
   * isn't enough room on the preferred side.
   *
   * @default bottom-start
   */
  placement?: React.ComponentProps<typeof Dropdown>['placement'];
  /**
   * Accessible name for the dropdown's search input. When omitted, the filter's
   * `text` is used as the search field label.
   *
   * Set this when the filter `text` doesn't read sensibly as a search-input label
   * (e.g. when the trigger uses `preserveLabel` and includes a colon).
   */
  searchLabel?: string;
}

const sizeToIconSize = (size: FilterSize) => (size === 'large' ? 24 : 18);

const useBaseId = (id?: string): string => {
  const generated = React.useId();
  return id ?? `tedi-filter-${generated.replace(/[^a-zA-Z0-9-]/g, '')}`;
};

export const Filter = forwardRef<HTMLButtonElement, FilterProps>((props, ref) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    text,
    value: groupValue,
    disabled: disabledProp = false,
    className,
    id,
    selected: selectedProp,
    defaultSelected = false,
    onSelectedChange,
    selectedValue,
    defaultSelectedValue,
    onSelectedValueChange,
    multiselect = false,
    selectedValues,
    defaultSelectedValues,
    onSelectedValuesChange,
    options = [],
    searchable = false,
    showSelectAll = false,
    selectAllLabel: selectAllLabelProp,
    showClear = false,
    clearLabel: clearLabelProp,
    preserveLabel = false,
    children,
    onClear,
    prepend,
    hidePrependWhenSelected = true,
    append,
    placement = 'bottom-start',
    variant = 'primary',
    size = 'default',
    searchLabel,
  } = getCurrentBreakpointProps<FilterProps>(props);

  const { getLabel } = useLabels();
  const selectAllLabel = selectAllLabelProp ?? getLabel('filter.select-all');
  const clearLabel = clearLabelProp ?? getLabel('filter.clear-selection');

  const group = useContext(FilterGroupContext);
  const baseId = useBaseId(id);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const hasOptions = options.length > 0;
  const hasCustomContent = Boolean(children);
  const hasDropdown = hasOptions || hasCustomContent;
  const isSingleSelect = hasOptions && !multiselect;
  const isMultiSelect = hasOptions && multiselect;
  const isGrouped = Boolean(group?.isManaged);
  const groupOwnsSelection = isGrouped && groupValue !== undefined && !hasDropdown;
  const isGroupedRadio = groupOwnsSelection && !group?.multiselect;
  const disabled = disabledProp || (group?.disabled ?? false);

  const [innerSelected, setInnerSelected] = useState(defaultSelected);
  const [innerSingle, setInnerSingle] = useState(defaultSelectedValue ?? '');
  const [innerMulti, setInnerMulti] = useState<string[]>(defaultSelectedValues ?? []);

  if (
    process.env.NODE_ENV !== 'production' &&
    hasCustomContent &&
    (defaultSelected || onSelectedChange) &&
    selectedProp === undefined
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      '[Filter] `defaultSelected` and `onSelectedChange` are not honoured in custom-content mode ' +
        '(when `children` is provided). Drive the selected state yourself via the controlled `selected` prop, ' +
        'e.g. `selected={Boolean(value)}`.'
    );
  }

  const toggleSelected = selectedProp !== undefined ? selectedProp : innerSelected;
  const singleValue = selectedValue !== undefined ? selectedValue : innerSingle;
  const multiValues = selectedValues !== undefined ? selectedValues : innerMulti;

  const isSelected = useMemo(() => {
    if (groupOwnsSelection) return group!.isSelected(groupValue!);
    if (isMultiSelect) return multiValues.length > 0;
    if (isSingleSelect) return singleValue !== '';
    return toggleSelected;
  }, [groupOwnsSelection, groupValue, group, isMultiSelect, multiValues, isSingleSelect, singleValue, toggleSelected]);

  const selectedLabel = useMemo(() => {
    if (!isSingleSelect || !singleValue) return null;
    return options.find((opt) => opt.value === singleValue)?.label ?? null;
  }, [isSingleSelect, singleValue, options]);

  const displayText = useMemo(() => {
    if (isSingleSelect) {
      if (selectedLabel && preserveLabel) return `${text}: ${selectedLabel}`;
      return selectedLabel ?? text;
    }
    return text;
  }, [isSingleSelect, selectedLabel, preserveLabel, text]);

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!open) setSearchTerm('');
  }, [open]);

  const filteredOptions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(term));
  }, [searchTerm, options]);

  const enabledFiltered = useMemo(() => filteredOptions.filter((opt) => !opt.disabled), [filteredOptions]);
  const allFilteredSelected = useMemo(() => {
    if (enabledFiltered.length === 0) return false;
    return enabledFiltered.every((opt) => multiValues.includes(opt.value));
  }, [enabledFiltered, multiValues]);
  const someFilteredSelected = useMemo(() => {
    if (enabledFiltered.length === 0) return false;
    const count = enabledFiltered.filter((opt) => multiValues.includes(opt.value)).length;
    return count > 0 && count < enabledFiltered.length;
  }, [enabledFiltered, multiValues]);

  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [ref]
  );

  const handleToggle = useCallback(() => {
    if (groupOwnsSelection) {
      group!.selectFilter(groupValue!);
      return;
    }
    const next = !toggleSelected;
    if (selectedProp === undefined) setInnerSelected(next);
    onSelectedChange?.(next);
  }, [groupOwnsSelection, group, groupValue, toggleSelected, selectedProp, onSelectedChange]);

  const commitSingle = useCallback(
    (val: string) => {
      const next = singleValue === val ? '' : val;
      if (selectedValue === undefined) setInnerSingle(next);
      onSelectedValueChange?.(next);
    },
    [singleValue, selectedValue, onSelectedValueChange]
  );

  const commitMulti = useCallback(
    (val: string) => {
      const next = multiValues.includes(val) ? multiValues.filter((v) => v !== val) : [...multiValues, val];
      if (selectedValues === undefined) setInnerMulti(next);
      onSelectedValuesChange?.(next);
    },
    [multiValues, selectedValues, onSelectedValuesChange]
  );

  const toggleSelectAll = useCallback(() => {
    let next: string[];
    if (allFilteredSelected) {
      const filteredValues = new Set(enabledFiltered.map((opt) => opt.value));
      next = multiValues.filter((v) => !filteredValues.has(v));
    } else {
      const current = new Set(multiValues);
      enabledFiltered.forEach((opt) => current.add(opt.value));
      next = [...current];
    }
    if (selectedValues === undefined) setInnerMulti(next);
    onSelectedValuesChange?.(next);
  }, [allFilteredSelected, enabledFiltered, multiValues, selectedValues, onSelectedValuesChange]);

  const clearSelection = useCallback(() => {
    if (hasCustomContent) {
      onClear?.();
    } else if (isMultiSelect) {
      if (selectedValues === undefined) setInnerMulti([]);
      onSelectedValuesChange?.([]);
    } else if (isSingleSelect) {
      if (selectedValue === undefined) setInnerSingle('');
      onSelectedValueChange?.('');
    }
    setOpen(false);
  }, [
    hasCustomContent,
    onClear,
    isMultiSelect,
    selectedValues,
    onSelectedValuesChange,
    isSingleSelect,
    selectedValue,
    onSelectedValueChange,
  ]);

  const hidePrepend = isSelected && hidePrependWhenSelected;
  const triggerRole = isGroupedRadio ? 'radio' : undefined;
  const ariaChecked = isGroupedRadio ? isSelected : undefined;
  const ariaPressed = !hasDropdown && !isGroupedRadio ? isSelected : undefined;

  const buttonContent = (
    <>
      {!hasDropdown && isSelected && (
        <Icon className={styles['tedi-filter__icon']} name="check" size={sizeToIconSize(size)} color="inherit" />
      )}
      {prepend !== undefined && prepend !== null && (
        <span
          className={cn(styles['tedi-filter__prepend'], {
            [styles['tedi-filter__prepend--hidden']]: hidePrepend,
          })}
        >
          {prepend}
        </span>
      )}
      <span className={styles['tedi-filter__text']}>{displayText}</span>
      {append !== undefined && append !== null && <span className={styles['tedi-filter__append']}>{append}</span>}
      {isMultiSelect && isSelected && multiValues.length > 0 && (
        <StatusBadge className={styles['tedi-filter__count']} color={disabled ? 'neutral' : 'brand'}>
          {String(multiValues.length)}
        </StatusBadge>
      )}
      {hasDropdown && (
        <Icon
          className={styles['tedi-filter__icon']}
          name="arrow_drop_down"
          filled
          size={sizeToIconSize(size)}
          color="inherit"
        />
      )}
    </>
  );

  const rootClassName = cn(
    styles['tedi-filter'],
    styles[`tedi-filter--${variant}`],
    size === 'large' && styles['tedi-filter--large'],
    isSelected && styles['tedi-filter--selected'],
    className
  );

  const triggerButton = (
    <Button
      ref={setTriggerRef}
      id={id}
      type="button"
      disabled={disabled}
      className={styles['tedi-filter__button']}
      onClick={hasDropdown ? undefined : handleToggle}
      role={hasDropdown ? undefined : triggerRole}
      aria-checked={ariaChecked}
      aria-pressed={ariaPressed}
      noStyle
    >
      {buttonContent}
    </Button>
  );

  if (!hasDropdown) {
    return <div className={rootClassName}>{triggerButton}</div>;
  }

  const selectAllIndex = isMultiSelect && showSelectAll ? 0 : null;
  const optionsOffset = selectAllIndex !== null ? 1 : 0;

  const renderOptions = () =>
    filteredOptions.map((option, i) => {
      const optionSelected = isMultiSelect ? multiValues.includes(option.value) : singleValue === option.value;
      const index = i + optionsOffset;

      if (isMultiSelect) {
        return (
          <Dropdown.Item
            key={option.value}
            index={index}
            asChild
            disabled={option.disabled}
            closeOnSelect={false}
            active={optionSelected}
          >
            <Checkbox
              id={`${baseId}-option-${i}`}
              label={option.label}
              value={option.value}
              checked={optionSelected}
              disabled={option.disabled}
              onChange={() => commitMulti(option.value)}
              name={`${baseId}-options`}
            />
          </Dropdown.Item>
        );
      }

      return (
        <Dropdown.Item
          key={option.value}
          index={index}
          disabled={option.disabled}
          active={optionSelected}
          onClick={() => commitSingle(option.value)}
        >
          {option.label}
        </Dropdown.Item>
      );
    });

  return (
    <div className={rootClassName}>
      <Dropdown open={open} onOpenChange={setOpen} placement={placement} width="auto">
        <Dropdown.Trigger>{triggerButton}</Dropdown.Trigger>
        <Dropdown.Content>
          {hasCustomContent ? (
            <>
              <div className={styles['tedi-filter-dropdown__custom-content']}>{children}</div>
              {showClear && (
                <>
                  <Dropdown.Separator />
                  <div className={styles['tedi-filter-dropdown__clear']}>
                    <Button visualType="neutral" size="small" type="button" iconLeft="refresh" onClick={clearSelection}>
                      {clearLabel}
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {searchable && (
                <>
                  <div className={styles['tedi-filter-dropdown__search']}>
                    <Search
                      id={`${baseId}-search`}
                      label={searchLabel ?? text}
                      hideLabel
                      ariaLabel={searchLabel ?? text}
                      value={searchTerm}
                      onChange={setSearchTerm}
                    />
                  </div>
                  <Dropdown.Separator />
                </>
              )}
              {selectAllIndex !== null && (
                <>
                  <Dropdown.Item index={selectAllIndex} asChild closeOnSelect={false}>
                    <Checkbox
                      id={`${baseId}-select-all`}
                      label={selectAllLabel}
                      value="select-all"
                      checked={allFilteredSelected}
                      indeterminate={someFilteredSelected}
                      onChange={toggleSelectAll}
                      name={`${baseId}-select-all`}
                    />
                  </Dropdown.Item>
                  <Dropdown.Separator />
                </>
              )}
              {renderOptions()}
              {showClear && (
                <>
                  <Dropdown.Separator />
                  <div className={styles['tedi-filter-dropdown__clear']}>
                    <Button visualType="neutral" size="small" type="button" iconLeft="refresh" onClick={clearSelection}>
                      {clearLabel}
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
});

Filter.displayName = 'Filter';

export default Filter;
