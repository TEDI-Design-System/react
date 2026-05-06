import cn from 'classnames';
import { components as ReactSelectComponents, OptionProps } from 'react-select';

import Checkbox from '../../checkbox/checkbox';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';
import { areAllSelected, getEnabledOptions, isIndeterminate, SELECT_ALL_VALUE } from './select-bulk-helpers';

type MultiOptionType = OptionProps<ISelectOption, boolean> & {
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMultiOption = ({ renderOption, ...props }: MultiOptionType): JSX.Element => {
  const isSelectAll = props.data.value === SELECT_ALL_VALUE;

  let displayChecked = props.isSelected;
  let displayIndeterminate = false;
  if (isSelectAll) {
    const enabled = getEnabledOptions(props.options).filter((o) => o.value !== SELECT_ALL_VALUE);
    const selected = (props.getValue() as ReadonlyArray<ISelectOption>) ?? [];
    const realSelected = selected.filter((o) => o.value !== SELECT_ALL_VALUE);
    displayChecked = areAllSelected(realSelected, enabled);
    displayIndeterminate = isIndeterminate(realSelected, enabled);
  }

  const OptionBEM = cn(
    styles['tedi-select__option'],
    { [styles['tedi-select__option--disabled']]: props.isDisabled },
    { [styles['tedi-select__option--focused']]: props.isFocused },
    { [styles['tedi-select__option--select-all']]: isSelectAll }
  );

  const { tabIndex, ...innerProps } = props.innerProps;

  return (
    <ReactSelectComponents.Option
      {...props}
      innerProps={{ ...innerProps, tabIndex, role: 'option', 'aria-selected': displayChecked }}
      className={OptionBEM}
    >
      {renderOption && !isSelectAll ? (
        renderOption(props)
      ) : (
        <>
          <span className="sr-only">{props.label}</span>
          <Checkbox
            id={props.data.value}
            label={props.label}
            aria-hidden={true}
            className={styles['tedi-select__checkbox']}
            value={props.data.value}
            name={props.data.value}
            checked={displayChecked}
            indeterminate={displayIndeterminate}
            onChange={() => null}
            disabled={props.isDisabled}
            hover={props.isFocused}
          />
        </>
      )}
    </ReactSelectComponents.Option>
  );
};
