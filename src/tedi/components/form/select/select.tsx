import cn from 'classnames';
import React, { forwardRef } from 'react';
import ReactSelect, {
  ActionMeta,
  GroupBase,
  InputActionMeta,
  MenuListProps,
  OnChangeValue,
  OptionProps,
  OptionsOrGroups,
  SelectComponentsConfig,
  SelectInstance,
} from 'react-select';
import AsyncSelect from 'react-select/async';

import { FeedbackText, FeedbackTextProps } from '../../../../tedi/components/form/feedback-text/feedback-text';
import { FormLabel, FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { useLabels } from '../../../../tedi/providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import { TextProps } from '../../base/typography/text/text';
import { useOptionalInputGroup } from '../input-group/input-group';
import inputGroupStyles from '../input-group/input-group.module.scss';
import {
  areAllSelected,
  getEnabledOptions,
  GROUP_OPTION_PREFIX,
  isGroupSentinel,
  SELECT_ALL_VALUE,
} from './components/select-bulk-helpers';
import { SelectClearIndicator } from './components/select-clear-indicator';
import { SelectControl } from './components/select-control';
import { SelectDropDownIndicator } from './components/select-dropdown-indicator';
import { SelectGroup } from './components/select-group';
import { SelectGroupHeading } from './components/select-group-heading';
import { SelectIndicatorsContainer } from './components/select-indicators-container';
import { SelectInput } from './components/select-input';
import { SelectLoadingIndicator } from './components/select-loading-indicator';
import { SelectMenu } from './components/select-menu';
import { SelectMenuList } from './components/select-menu-list';
import { SelectMenuPortal } from './components/select-menu-portal';
import { SelectMultiValue } from './components/select-multi-value';
import { SelectMultiValueRemove } from './components/select-multi-value-remove';
import { SelectOption } from './components/select-option';
import { SelectSingleValue } from './components/select-single-value';
import { SelectValueContainer } from './components/select-value-container';
import styles from './select.module.scss';

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    inputIsHidden?: boolean;
  }
}

export interface SelectProps extends Omit<FormLabelProps, 'id' | 'label'> {
  /**
   * Unique HTML id for the input. Also used as react-select's `instanceId` for SSR-stable internal IDs.
   * When omitted, falls back to the surrounding `InputGroup`'s id or a generated `useId()`.
   */
  id?: string;
  /** Visible label. May be omitted when the surrounding `InputGroup` provides its own label. */
  label?: string;
  /**
   * The list of selectable options. Pass a flat `ISelectOption[]` for a simple
   * list, or an array of `IGroupedOptions` (each with its own `options` array)
   * for a grouped menu.
   */
  options?: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>>;
  /**
   * Used in async mode (`async: true`).
   * - `true` — call `loadOptions` once on mount with an empty input string
   *   and use the result as the initial option list.
   * - An array — show these options before the user types anything.
   * - Omit — start with no options until the user types.
   */
  defaultOptions?: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> | boolean;
  /** Text shown in the field when no value is selected. */
  placeholder?: string;
  /** Extra class on the root wrapper. Use `classNames` for per-subcomponent overrides. */
  className?: string;
  /**
   * Icon shown on the right of the field as the dropdown indicator.
   * - `"arrow_drop_down"` (default) — standard select chevron.
   * - `"search"` — magnifier; useful for combobox-style search fields.
   * @default 'arrow_drop_down'
   */
  iconName?: 'arrow_drop_down' | 'search';
  /**
   * Fires whenever the selection changes. Receives the new value:
   * a single `ISelectOption` (single-select), an array (multi-select),
   * or `null` when cleared.
   */
  onChange?: (value: TSelectValue) => void;
  /**
   * Fires whenever the user types in the search input. Receives the new input
   * string and a `react-select` action descriptor (e.g. `'input-change'`,
   * `'menu-close'`). Use this to drive controlled search.
   */
  onInputChange?: (value: string, actionMeta: InputActionMeta) => void;
  /** Controlled search input string. Pair with `onInputChange` to manage it from the parent. */
  inputValue?: string;
  /**
   * Async option loader. Called with the current search string; resolve the
   * `callback` with the matching options. Only invoked when `async: true`.
   */
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>>) => void
  ) => void;
  /** When `true`, shows a loading spinner in the indicator area. Useful while async results are pending. */
  isLoading?: boolean;
  /** Uncontrolled initial selection. Ignored when `value` is provided. */
  defaultValue?: TSelectValue;
  /**
   * Controlled selection. When set, the parent owns the value and must update
   * it via `onChange`. Use `defaultValue` for uncontrolled usage.
   */
  value?: TSelectValue;
  /** Disables interaction and applies disabled styling. */
  disabled?: boolean;
  /** Form field name; rendered onto the underlying hidden input for form submission. */
  name?: string;
  /**
   * Forces error styling. Also set automatically when `helper.type === 'error'`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Forces valid (success) styling. Also set automatically when `helper.type === 'valid'`.
   * @default false
   */
  valid?: boolean;
  /**
   * Helper / feedback text rendered below the field. Set `type` to `'hint'`,
   * `'error'`, or `'valid'` — the latter two also drive the field's invalid /
   * valid visual state.
   */
  helper?: FeedbackTextProps;
  /**
   * Visual size variant.
   * - omit — default (40px tall).
   * - `"small"` — compact (32px tall) for dense layouts.
   */
  size?: 'small';
  /**
   * Switches the underlying component to `react-select`'s `AsyncSelect`. Pair
   * with `loadOptions` (and optionally `defaultOptions`) to fetch options on
   * the fly.
   * @default false
   */
  async?: boolean;
  /**
   * Custom renderer for the content of each option in the dropdown. Receives
   * the full option props from `react-select`; return any React node. Use
   * `renderValue` if you also want to customise how the selected value
   * appears in the trigger.
   */
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
  /**
   * Message shown when the option list is empty (no matches for the search,
   * or no options at all). Defaults to the localised `select.no-options`
   * label from `LabelProvider`.
   */
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  /**
   * Message shown while async options are loading. Defaults to the localised
   * `select.loading` label from `LabelProvider`.
   */
  loadingMessage?: (obj: { inputValue: string }) => React.ReactNode;
  /**
   * Renders custom content underneath the option list, inside the dropdown
   * (e.g. a "Show more" button or a "powered by" footer).
   */
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
  /**
   * Enables multi-select mode: the field renders selections as removable
   * tags and `onChange` receives an array.
   * @default false
   */
  multiple?: boolean;
  /**
   * Layout for selected tags in multi-select mode.
   * - `"stack"` (default) — tags wrap onto multiple rows.
   * - `"row"` — tags stay on one row; overflow tags collapse into a `+N`
   *   counter, just like the Angular `multiRow=false` mode.
   * @default 'stack'
   */
  tagsDirection?: 'stack' | 'row';
  /**
   * Layout for the dropdown menu.
   * - `"menu"` (default): vertical list of options.
   * - `"grid"`: swatch grid for color / icon pickers and similar compact
   *   pickers. Grid sizing is customizable via the `--tedi-swatch-size`,
   *   `--tedi-swatch-gap`, and `--tedi-swatch-columns` CSS variables on the
   *   menu list element.
   * @default 'menu'
   */
  dropdownType?: 'menu' | 'grid';
  /**
   * Custom renderer for the trigger value (single-select). Receives the
   * currently selected option and may return any React node — useful for
   * color swatches, icons, or any non-text representation in the field.
   * Ignored in multi-select mode (use `renderOption` for tag rendering).
   */
  renderValue?: (option: ISelectOption) => React.ReactNode;
  /**
   * In multi-select mode, prepends a "Select all" toggle to the menu list.
   * Toggles every enabled option (or, when filtering, every visible enabled
   * option) on/off. Indeterminate when only some are selected. Ignored when
   * `multiple` is false.
   * @default false
   */
  showSelectAll?: boolean;
  /**
   * In multi-select mode with grouped options, makes each group heading a
   * checkbox that toggles the whole group. Indeterminate when only some
   * options in the group are selected. Ignored when `multiple` is false or
   * `options` is not grouped.
   * @default false
   */
  selectableGroups?: boolean;
  /**
   * Open the menu automatically when the input first receives focus.
   * @default false
   */
  openMenuOnFocus?: boolean;
  /**
   * Open the menu when the trigger area is clicked.
   * @default true
   */
  openMenuOnClick?: boolean;
  /**
   * Treat the Tab key as a confirm-and-move-on for the currently focused
   * option (otherwise Tab simply moves focus out of the menu without
   * selecting).
   * @default false
   */
  tabSelectsValue?: boolean;
  /**
   * Close the menu after each successful selection. Default depends on
   * `multiple`: `true` for single-select, `false` for multi-select so the
   * user can pick several options without re-opening.
   */
  closeMenuOnSelect?: boolean;
  /**
   * Blur the search input after each selection. Useful if you want to
   * collapse the cursor immediately on pick.
   * @default false
   */
  blurInputOnSelect?: boolean;
  /**
   * Focus the input on initial mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Whether the value can be cleared via the "×" indicator. The visible
   * "×" button only appears if `isClearIndicatorVisible` is also `true`
   * (that prop is now deprecated; see its docstring for migration plans).
   * Backspace deletion is controlled separately by `backspaceRemovesValue`
   * (default `false`).
   * @default true
   */
  isClearable?: boolean;
  /**
   * @deprecated This prop will be removed in a future major version.
   *
   * `isClearable` and `isClearIndicatorVisible` overlap: `isClearable` already
   * controls whether the value can be cleared, and `isClearIndicatorVisible`
   * only adds an extra gate on whether the visible "×" button renders. The
   * default combination (`isClearable: true`, `isClearIndicatorVisible: false`)
   * leaves consumers in a state where Backspace clears the value but no
   * affordance is shown — a hidden interaction.
   *
   * In a future major version the prop will be removed and `isClearable`
   * alone will control both behaviour and visibility (matching `react-select`
   * and the Angular implementation). For new code, prefer `isClearable` and
   * leave this prop unset.
   */
  isClearIndicatorVisible?: boolean;
  /**
   * Allow filtering the option list by typing. Set to `false` for a pure
   * dropdown with no search input (e.g. color/icon pickers).
   * @default true
   */
  isSearchable?: boolean;
  /**
   * In multi-select mode, render an "×" remove button on each selected tag
   * so the user can deselect single options without re-opening the menu.
   * @default false
   */
  isTagRemovable?: boolean;
  /**
   * If `true`, pressing Backspace while the input is empty removes the
   * last selected value (single-mode: clears it; multi-mode: pops the
   * last tag). Disabled by default because react-select's upstream
   * default (`true`) leads to accidental deletions, especially in
   * multi-select with no visual cue for the affected tag.
   * @default false
   */
  backspaceRemovesValue?: boolean;
  /**
   * Controlled menu open state. When set, the parent owns whether the menu
   * is showing — pair with `onMenuOpen` / `onMenuClose`.
   */
  menuIsOpen?: boolean;
  /** Fires when the menu opens (uncontrolled or controlled). */
  onMenuOpen?: () => void;
  /** Fires when the menu closes (uncontrolled or controlled). */
  onMenuClose?: () => void;
  /** Fires when the input loses focus. */
  onBlur?: () => void;
  /**
   * Hide the underlying text input (its width collapses to 0). Useful when
   * the field is a pure picker with no typing — the value display still
   * shows, but the cursor caret area is removed.
   */
  inputIsHidden?: boolean;
  /**
   * Typography overrides applied to group headings (when `options` is
   * grouped). `text` on an individual `IGroupedOptions` entry takes
   * precedence over this default.
   * @default { modifiers: 'small', color: 'tertiary' }
   */
  optionGroupHeadingText?: Pick<TextProps, 'modifiers' | 'color'>;
  /**
   * In async mode, cache the result of each `loadOptions` call by input
   * string so the same query isn't re-fetched.
   * @default false
   */
  cacheOptions?: boolean;
  /**
   * In single-select mode, render each option with a leading radio button
   * for a more explicit "pick one" UI. Has no effect in multi-select mode.
   * @default false
   */
  showRadioButtons?: boolean;
  /**
   * Per-subcomponent class overrides forwarded to react-select's `classNames`
   * map. Each entry adds an extra class onto the corresponding internal
   * subcomponent; use this for one-off styling without losing the default
   * `tedi-select__*` BEM classes.
   */
  classNames?: {
    clearIndicator?: string;
    container?: string;
    control?: string;
    dropdownIndicator?: string;
    group?: string;
    groupHeading?: string;
    indicatorsContainer?: string;
    indicatorSeparator?: string;
    input?: string;
    loadingIndicator?: string;
    loadingMessage?: string;
    menu?: string;
    menuList?: string;
    menuPortal?: string;
    multiValue?: string;
    multiValueLabel?: string;
    multiValueRemove?: string;
    noOptionsMessage?: string;
    option?: string;
    placeholder?: string;
    singleValue?: string;
    valueContainer?: string;
  };
}

/**
 * One option in the select list. `customData` is a typed escape hatch for
 * carrying domain data alongside the display label — `renderOption` /
 * `renderValue` can read it back via `props.data.customData`.
 */
export interface ISelectOption<CustomData = unknown> {
  /** The string written into the form value when this option is picked. */
  value: string;
  /** Display label. Strings are searchable; React nodes render as-is and aren't filtered by search. */
  label: string | React.ReactNode | React.ReactNode[];
  /** When `true`, the option appears greyed out and can't be picked. */
  isDisabled?: boolean;
  /** Arbitrary data attached to the option, accessible inside custom renderers. */
  customData?: CustomData;
}

/**
 * A group of options in a grouped select. Extends react-select's `GroupBase`
 * with a `text` field that overrides typography for this specific heading.
 */
export interface IGroupedOptions<CustomOption = unknown> extends GroupBase<CustomOption> {
  /** Typography override for this group heading. Falls back to `optionGroupHeadingText`. */
  text?: Pick<TextProps, 'modifiers' | 'color'>;
}

/**
 * Shape of the Select's value: a single option (single-select), an array
 * (multi-select), or `null` when empty.
 */
export type TSelectValue<CustomData = unknown> =
  | ISelectOption<CustomData>
  | ReadonlyArray<ISelectOption<CustomData>>
  | null;

export const Select = forwardRef<SelectInstance<ISelectOption, boolean, IGroupedOptions<ISelectOption>>, SelectProps>(
  (props, ref): JSX.Element => {
    const {
      options,
      defaultOptions,
      id,
      name,
      iconName = 'arrow_drop_down',
      label,
      required,
      value,
      defaultValue,
      tagsDirection = 'stack',
      onChange,
      onInputChange,
      inputValue,
      loadOptions,
      isLoading,
      openMenuOnFocus = false,
      openMenuOnClick = true,
      tabSelectsValue = false,
      disabled = false,
      className,
      hideLabel = false,
      helper,
      placeholder,
      invalid,
      valid,
      size,
      async = false,
      renderOption,
      renderMessageListFooter,
      noOptionsMessage,
      loadingMessage,
      multiple = false,
      showSelectAll = false,
      selectableGroups = false,
      dropdownType = 'menu',
      renderValue,
      closeMenuOnSelect = !multiple,
      blurInputOnSelect = false,
      autoFocus = false,
      isClearable = true,
      isClearIndicatorVisible = false,
      isSearchable = true,
      menuIsOpen,
      onMenuClose,
      onMenuOpen,
      onBlur,
      inputIsHidden,
      isTagRemovable = false,
      backspaceRemovesValue = false,
      optionGroupHeadingText = { modifiers: 'small', color: 'tertiary' },
      cacheOptions = true,
      showRadioButtons = false,
      renderWithoutLabel,
      tooltip,
      classNames,
    } = props;
    const inputGroup = useOptionalInputGroup?.();
    const generatedId = React.useId();
    const shouldHideLabel = inputGroup?.hasExternalLabel;
    const resolvedId = props.id ?? inputGroup?.inputId ?? generatedId;

    const helperId = helper ? helper?.id ?? `${resolvedId}-helper` : undefined;
    const element = React.useRef<SelectInstance<ISelectOption, boolean, IGroupedOptions<ISelectOption>> | null>(null);
    const { getLabel } = useLabels();

    React.useImperativeHandle(
      ref,
      () => element.current as SelectInstance<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
    );

    const showSelectAllMode = !!showSelectAll && multiple;

    const [internalValue, setInternalValue] = React.useState<TSelectValue>(defaultValue ?? null);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const currentValueArray: ReadonlyArray<ISelectOption> = React.useMemo(() => {
      if (Array.isArray(currentValue)) return currentValue;
      if (currentValue) return [currentValue as ISelectOption];
      return [];
    }, [currentValue]);

    const selectAllSentinel = React.useMemo<ISelectOption>(
      () => ({ value: SELECT_ALL_VALUE, label: getLabel('select.select-all') }),
      [getLabel]
    );

    const selectableGroupsMode = !!selectableGroups && !!multiple;

    type GroupSentinelEntry = { enabled: ISelectOption[] };
    const { groupFlattenedOptions, groupSentinelMap } = React.useMemo(() => {
      const emptyMap = new Map<string, GroupSentinelEntry>();
      if (!selectableGroupsMode || !options || options.length === 0) {
        return { groupFlattenedOptions: null, groupSentinelMap: emptyMap };
      }
      const hasAnyGroup = options.some((it) => it && Array.isArray((it as IGroupedOptions<ISelectOption>).options));
      if (!hasAnyGroup) return { groupFlattenedOptions: null, groupSentinelMap: emptyMap };

      const flat: ISelectOption[] = [];
      const sentinelMap = new Map<string, GroupSentinelEntry>();

      for (const item of options) {
        if (item && Array.isArray((item as IGroupedOptions<ISelectOption>).options)) {
          const group = item as IGroupedOptions<ISelectOption>;
          const sentinelValue = `${GROUP_OPTION_PREFIX}${group.label ?? ''}`;
          const enabled = group.options.filter((o) => !o.isDisabled);
          sentinelMap.set(sentinelValue, { enabled });

          flat.push({ value: sentinelValue, label: group.label ?? '' });
          for (const child of group.options) {
            flat.push({
              ...child,
              customData: { ...((child.customData as object) ?? {}), __tediInGroup: true },
            });
          }
        } else {
          flat.push(item as ISelectOption);
        }
      }

      return { groupFlattenedOptions: flat, groupSentinelMap: sentinelMap };
    }, [options, selectableGroupsMode]);

    const optionsForReactSelect = React.useMemo(() => {
      let next = (groupFlattenedOptions ?? options) as typeof options | undefined;
      if (showSelectAllMode && next && next.length > 0) {
        next = [selectAllSentinel, ...next] as typeof options;
      }
      return next;
    }, [options, groupFlattenedOptions, showSelectAllMode, selectAllSentinel]);

    const valueForReactSelect = React.useMemo(() => {
      const extras: ISelectOption[] = [];

      if (selectableGroupsMode && groupSentinelMap.size > 0) {
        for (const [sentinelValue, entry] of groupSentinelMap) {
          if (entry.enabled.length > 0 && areAllSelected(currentValueArray, entry.enabled)) {
            extras.push({ value: sentinelValue, label: '' });
          }
        }
      }

      if (showSelectAllMode) {
        const enabled = getEnabledOptions(options ?? []);
        if (enabled.length > 0 && areAllSelected(currentValueArray, enabled)) {
          extras.push(selectAllSentinel);
        }
      }

      if (extras.length === 0) return currentValue;
      return [...currentValueArray, ...extras];
    }, [
      currentValue,
      currentValueArray,
      options,
      selectableGroupsMode,
      groupSentinelMap,
      showSelectAllMode,
      selectAllSentinel,
    ]);

    const onChangeHandler = (option: OnChangeValue<ISelectOption, boolean>, actionMeta: ActionMeta<ISelectOption>) => {
      let resolved: OnChangeValue<ISelectOption, boolean> = option;
      const toggledOption = (actionMeta as { option?: ISelectOption }).option;

      if (selectableGroupsMode && toggledOption && groupSentinelMap.has(toggledOption.value)) {
        const enabled = groupSentinelMap.get(toggledOption.value)!.enabled;
        if (actionMeta.action === 'select-option') {
          const next = [...currentValueArray];
          for (const opt of enabled) {
            if (!next.some((s) => s.value === opt.value)) next.push(opt);
          }
          resolved = next;
        } else if (actionMeta.action === 'deselect-option') {
          resolved = currentValueArray.filter((s) => !enabled.some((e) => e.value === s.value));
        }
      } else if (showSelectAllMode) {
        const enabled = getEnabledOptions(options ?? []);
        const toggledSelectAll = toggledOption?.value === SELECT_ALL_VALUE;

        if (toggledSelectAll && actionMeta.action === 'select-option') {
          const previouslyDisabled = currentValueArray.filter(
            (s) => s.value !== SELECT_ALL_VALUE && !enabled.some((e) => e.value === s.value)
          );
          resolved = [...previouslyDisabled, ...enabled];
        } else if (toggledSelectAll && actionMeta.action === 'deselect-option') {
          resolved = currentValueArray.filter(
            (s) => s.value !== SELECT_ALL_VALUE && !enabled.some((e) => e.value === s.value)
          );
        }
      }

      if (Array.isArray(resolved)) {
        resolved = (resolved as ISelectOption[]).filter((o) => o.value !== SELECT_ALL_VALUE && !isGroupSentinel(o));
      }

      if (!isControlled) {
        setInternalValue(resolved as TSelectValue);
      }

      onChange?.(resolved);

      if (!blurInputOnSelect && element.current) {
        setTimeout(() => element.current?.inputRef?.focus(), 0);
      }
    };

    const filterOption = React.useCallback(
      (candidate: { value: string; label: string; data: ISelectOption }, input: string) => {
        if (candidate.data.value === SELECT_ALL_VALUE) return true;
        if (isGroupSentinel(candidate.data)) return true;
        if (!input) return true;
        return String(candidate.label).toLowerCase().includes(input.toLowerCase());
      },
      []
    );

    const [keyboardMode, setKeyboardMode] = React.useState(false);
    const handleSelectKeyDown = (e: React.KeyboardEvent) => {
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === 'PageUp' ||
        e.key === 'PageDown' ||
        e.key === 'Tab'
      ) {
        if (!keyboardMode) setKeyboardMode(true);
      }
    };
    const exitKeyboardMode = React.useCallback(() => {
      setKeyboardMode((prev) => (prev ? false : prev));
    }, []);

    const SelectMenuListMemo = React.useCallback(
      (menuProps: MenuListProps<ISelectOption, boolean>) => (
        <SelectMenuList {...menuProps} renderMessageListFooter={renderMessageListFooter} />
      ),
      [renderMessageListFooter]
    );

    const renderReactSelect = (): JSX.Element => {
      const customComponents: SelectComponentsConfig<ISelectOption, boolean, IGroupedOptions<ISelectOption>> = {
        ClearIndicator: (props) => SelectClearIndicator({ isClearIndicatorVisible, ...props }),
        DropdownIndicator: () => SelectDropDownIndicator({ iconName }),
        IndicatorSeparator: () => null,
        MenuPortal: SelectMenuPortal,
        Menu: SelectMenu,
        MenuList: SelectMenuListMemo,
        Option: (props) => SelectOption({ renderOption, multiple, showRadioButtons, ...props }),
        Control: SelectControl,
        Input: SelectInput,
        MultiValue: (props) => SelectMultiValue({ isTagRemovable, ...props }),
        MultiValueRemove: SelectMultiValueRemove,
        SingleValue: SelectSingleValue,
        Group: SelectGroup,
        GroupHeading: (props) => SelectGroupHeading({ optionGroupHeadingText, ...props }),
        IndicatorsContainer: SelectIndicatorsContainer,
        ValueContainer: SelectValueContainer,
        LoadingIndicator: SelectLoadingIndicator,
      };

      const ReactSelectElement = async ? AsyncSelect : ReactSelect;

      const getNoOptionsMessage = () => getLabel('select.no-options');
      const getLoadingMessage = () => getLabel('select.loading');

      return (
        <ReactSelectElement<ISelectOption, boolean, IGroupedOptions<ISelectOption>>
          // Forwarded to `selectProps` so children (ValueContainer, MultiValue,
          // MenuList, GroupHeading) can read these without a separate context.
          // @ts-expect-error custom prop preserved on selectProps
          tagsDirection={tagsDirection}
          showSelectAll={showSelectAll}
          selectableGroups={selectableGroups}
          dropdownType={dropdownType}
          renderValue={renderValue}
          keyboardMode={keyboardMode}
          exitKeyboardMode={exitKeyboardMode}
          onKeyDown={handleSelectKeyDown}
          id={resolvedId}
          aria-describedby={helperId}
          autoFocus={autoFocus}
          ref={element}
          instanceId={id}
          className="tedi-select__wrapper"
          name={name}
          options={optionsForReactSelect}
          defaultOptions={defaultOptions}
          value={valueForReactSelect}
          defaultValue={defaultValue}
          cacheOptions={cacheOptions}
          onChange={onChangeHandler}
          filterOption={showSelectAllMode || selectableGroupsMode ? filterOption : undefined}
          onInputChange={onInputChange}
          onBlur={onBlur}
          inputValue={inputValue}
          inputId={`${id}-input`}
          loadOptions={loadOptions}
          isLoading={isLoading}
          noOptionsMessage={noOptionsMessage || getNoOptionsMessage}
          loadingMessage={loadingMessage || getLoadingMessage}
          classNamePrefix="select"
          components={customComponents}
          isDisabled={disabled}
          isSearchable={isSearchable}
          menuIsOpen={menuIsOpen}
          openMenuOnFocus={openMenuOnFocus}
          openMenuOnClick={openMenuOnClick}
          tabSelectsValue={tabSelectsValue}
          onMenuClose={onMenuClose}
          onMenuOpen={onMenuOpen}
          placeholder={placeholder || ''}
          isClearable={isClearable}
          backspaceRemovesValue={backspaceRemovesValue}
          menuShouldScrollIntoView={true}
          isMulti={multiple}
          hideSelectedOptions={false}
          closeMenuOnSelect={closeMenuOnSelect}
          blurInputOnSelect={blurInputOnSelect}
          menuPlacement="auto"
          inputIsHidden={inputIsHidden}
          required={required}
          menuPortalTarget={document.body}
          menuPosition="absolute"
          classNames={(() => {
            const merged: Record<string, (state: UnknownType) => string> = {};
            if (classNames) {
              for (const [key, value] of Object.entries(classNames)) {
                merged[key] = typeof value === 'string' ? () => value : (value as (state: UnknownType) => string);
              }
            }

            if (inputGroup) {
              const previousControl = merged.control;
              merged.control = (state) => cn(previousControl?.(state), inputGroupStyles['tedi-input-group__input']);
            }
            return Object.keys(merged).length > 0 ? merged : undefined;
          })()}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: 'var(--tedi-blue-600)',
              danger: 'var(--tedi-red-600)',
              dangerLight: 'var(--tedi-red-200)',
            },
          })}
          styles={{
            input: (base) => ({
              ...base,
              gridTemplateColumns: '0fr',
            }),
          }}
        />
      );
    };

    const SelectBEM = cn(
      styles['tedi-select'],
      className,
      { [styles['tedi-select--invalid']]: invalid || helper?.type === 'error' },
      { [styles['tedi-select--valid']]: valid || helper?.type === 'valid' },
      { [styles[`tedi-select--${size}`]]: size },
      { [styles[`tedi-select--tags-${tagsDirection}`]]: tagsDirection },
      { [styles['tedi-select--searchable']]: isSearchable },
      { [styles['tedi-select--disabled']]: disabled }
    );

    return (
      <div data-name="select" className={SelectBEM}>
        <div className={styles['tedi-select__inner']}>
          {!shouldHideLabel && (
            <FormLabel
              id={`${resolvedId}-input`}
              label={label}
              required={required}
              hideLabel={hideLabel}
              size={size}
              renderWithoutLabel={renderWithoutLabel}
              tooltip={tooltip}
            />
          )}
          {renderReactSelect()}
        </div>
        {helper && <FeedbackText {...helper} id={helperId} />}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
