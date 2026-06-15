import cn from 'classnames';
import { components as ReactSelectComponents, OptionProps } from 'react-select';

import { DropdownItemValue } from '../../../overlays/dropdown/dropdown-item-value/dropdown-item-value';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type SingleOptionType = OptionProps<ISelectOption, boolean> & {
  showRadioButtons?: boolean;
  renderOption?: (props: OptionProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectSingleOption = ({ showRadioButtons, renderOption, ...props }: SingleOptionType): JSX.Element => {
  const OptionBEM = cn(
    styles['tedi-select__option'],
    { [styles['tedi-select__option--disabled']]: props.isDisabled },
    { [styles['tedi-select__option--selected']]: props.isSelected && !showRadioButtons },
    { [styles['tedi-select__option--focused']]: props.isFocused }
  );

  return (
    <ReactSelectComponents.Option
      {...props}
      innerProps={{
        role: 'option',
        'aria-selected': props.isSelected,
        'aria-disabled': props.isDisabled,
        ...props.innerProps,
      }}
      className={OptionBEM}
    >
      {showRadioButtons ? (
        <DropdownItemValue
          type="radio"
          indicatorSemantics="control"
          selected={props.isSelected}
          disabled={props.isDisabled}
        >
          <DropdownItemValue.Label>{props.children}</DropdownItemValue.Label>
        </DropdownItemValue>
      ) : renderOption ? (
        renderOption(props)
      ) : (
        props.children
      )}
    </ReactSelectComponents.Option>
  );
};
