import cn from 'classnames';
import { components as ReactSelectComponents, OptionProps } from 'react-select';

import { DropdownItemValue } from '../../../overlays/dropdown/dropdown-item-value/dropdown-item-value';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';
import {
  areAllSelected,
  getEnabledOptions,
  GROUP_OPTION_PREFIX,
  isGroupSentinel,
  isIndeterminate,
  SELECT_ALL_VALUE,
} from './select-bulk-helpers';

type MultiOptionType = OptionProps<ISelectOption, boolean> & {
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMultiOption = ({ renderOption, ...props }: MultiOptionType): JSX.Element => {
  const isSelectAll = props.data.value === SELECT_ALL_VALUE;
  const isGroup = isGroupSentinel(props.data);
  const isInGroup = !!(props.data.customData as { __tediInGroup?: boolean } | undefined)?.__tediInGroup;

  let displayChecked = props.isSelected;
  let displayIndeterminate = false;
  if (isSelectAll) {
    const enabled = getEnabledOptions(props.options).filter((o) => o.value !== SELECT_ALL_VALUE);
    const selected = (props.getValue() as ReadonlyArray<ISelectOption>) ?? [];
    const realSelected = selected.filter((o) => o.value !== SELECT_ALL_VALUE);
    displayChecked = areAllSelected(realSelected, enabled);
    displayIndeterminate = isIndeterminate(realSelected, enabled);
  } else if (isGroup) {
    const flat = props.options as ReadonlyArray<ISelectOption>;
    const startIdx = flat.findIndex((o) => o.value === props.data.value);
    const siblings: ISelectOption[] = [];
    for (let i = startIdx + 1; i < flat.length; i++) {
      const o = flat[i];
      if (!o) break;
      if (typeof o.value === 'string' && (o.value.startsWith(GROUP_OPTION_PREFIX) || o.value === SELECT_ALL_VALUE)) {
        break;
      }
      if (!o.isDisabled) siblings.push(o);
    }
    const selected = (props.getValue() as ReadonlyArray<ISelectOption>) ?? [];
    displayChecked = areAllSelected(selected, siblings);
    displayIndeterminate = isIndeterminate(selected, siblings);
  }

  const OptionBEM = cn(
    styles['tedi-select__option'],
    { [styles['tedi-select__option--disabled']]: props.isDisabled },
    { [styles['tedi-select__option--focused']]: props.isFocused },
    { [styles['tedi-select__option--select-all']]: isSelectAll },
    { [styles['tedi-select__option--group']]: isGroup },
    { [styles['tedi-select__option--indented']]: isInGroup }
  );

  const { tabIndex, ...innerProps } = props.innerProps;

  return (
    <ReactSelectComponents.Option
      {...props}
      innerProps={{ ...innerProps, tabIndex, role: 'option', 'aria-selected': displayChecked }}
      className={OptionBEM}
    >
      {renderOption && !isSelectAll && !isGroup ? (
        renderOption(props)
      ) : (
        <DropdownItemValue
          type="checkbox"
          indicatorSemantics="control"
          selected={displayChecked}
          indeterminate={displayIndeterminate}
          disabled={props.isDisabled}
        >
          <DropdownItemValue.Label>{props.children}</DropdownItemValue.Label>
        </DropdownItemValue>
      )}
    </ReactSelectComponents.Option>
  );
};
