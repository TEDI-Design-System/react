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
  /** Trigger label. In single-select mode it's replaced by the picked option (or prefixed when `preserveLabel`). */
  text: string;
  /** Identifier for participating in a managed `<FilterGroup>`. Unused outside a group. */
  value?: string;
  /** @default false */
  disabled?: boolean;
  /** Class on the root wrapper `<div>` (not the inner `<button>`). */
  className?: string;
  /** Trigger `<button>` id. Auto-generated when omitted; also used as a prefix for sub-element ids. */
  id?: string;
  /**
   * Selected appearance.
   * - Toggle mode (no `options`, no `children`): controlled or uncontrolled (`defaultSelected`).
   * - Custom-content mode (`children`): controlled-only — derive it from your own state.
   * - Dropdown mode (`options`): ignored; derived from `selectedValue` / `selectedValues`.
   */
  selected?: boolean;
  /** Toggle-mode initial state. Ignored when `selected` is set. @default false */
  defaultSelected?: boolean;
  /** Toggle-mode change callback. Not fired in custom-content or dropdown modes. */
  onSelectedChange?: (selected: boolean) => void;
  /** Single-select controlled value (`''` = nothing selected). Pair with `options`. */
  selectedValue?: string;
  /** Single-select initial value. Ignored when `selectedValue` is set. */
  defaultSelectedValue?: string;
  /** Single-select change callback — fires on commit or clear (`''`). */
  onSelectedValueChange?: (value: string) => void;
  /** Switch the dropdown to multi-select (checkboxes). Requires `options`. @default false */
  multiselect?: boolean;
  /** Multi-select controlled values. */
  selectedValues?: string[];
  /** Multi-select initial values. Ignored when `selectedValues` is set. */
  defaultSelectedValues?: string[];
  /** Multi-select change callback — fires on toggle, "Select all", or clear. */
  onSelectedValuesChange?: (values: string[]) => void;
  /** Dropdown options. Mutually exclusive with `children` (children wins if both). */
  options?: FilterOption[];
  /** Search input that filters `options` by label (case-insensitive substring). @default false */
  searchable?: boolean;
  /** Multi-select "Select all" toggle; targets enabled + visible options. @default false */
  showSelectAll?: boolean;
  /** Override the `filter.select-all` i18n label. */
  selectAllLabel?: string;
  /**
   * "Clear selection" button below the panel. Dropdown modes clear automatically;
   * custom-content mode delegates to `onClear`. @default false
   */
  showClear?: boolean;
  /** Override the `filter.clear-selection` i18n label. */
  clearLabel?: string;
  /** Single-select: keep `text` as a prefix once a value is picked ("Teenus: …"). @default false */
  preserveLabel?: boolean;
  /** Custom dropdown content. Switches the filter into controlled custom-content mode. */
  children?: React.ReactNode;
  /** Fires when "Clear" is clicked in custom-content mode — reset your own state here. */
  onClear?: () => void;
  /**
   * Slot before `text` (icon, status). Auto-replaced by a check icon when toggle-mode
   * selected — disable via `hidePrependWhenSelected={false}`.
   */
  prepend?: React.ReactNode;
  /** Hide `prepend` while selected so the check icon can take its place. @default true */
  hidePrependWhenSelected?: boolean;
  /** Slot after `text`. In multi-select sits alongside the built-in count badge. */
  append?: React.ReactNode;
  /** Floating UI placement; flips when room is tight. @default bottom-start */
  placement?: React.ComponentProps<typeof Dropdown>['placement'];
  /** Accessible label for the search input. Falls back to `text`. */
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

  if (hasCustomContent && (defaultSelected || onSelectedChange) && selectedProp === undefined) {
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
          <Dropdown.Item key={option.value} index={index} asChild disabled={option.disabled} closeOnSelect={false}>
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
