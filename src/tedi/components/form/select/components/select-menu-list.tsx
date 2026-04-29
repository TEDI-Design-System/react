import cn from 'classnames';
import { components as ReactSelectComponents, MenuListProps } from 'react-select';

import { useLabels } from '../../../../providers/label-provider';
import { Checkbox } from '../../checkbox/checkbox';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';
import { areAllSelected, getEnabledOptions, isIndeterminate, toggleBulkSelection } from './select-bulk-helpers';

type MenuListType = MenuListProps<ISelectOption, boolean> & {
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMenuList = ({ renderMessageListFooter, ...props }: MenuListType) => {
  const { getLabel } = useLabels();
  // Custom props forwarded from <Select> via selectProps. Cast through unknown
  // to read them without polluting react-select's public types.
  const { showSelectAll, selectAllLabel, keyboardMode, exitKeyboardMode, dropdownType } =
    props.selectProps as unknown as {
      showSelectAll?: boolean;
      selectAllLabel?: string;
      keyboardMode?: boolean;
      exitKeyboardMode?: () => void;
      dropdownType?: 'menu' | 'grid';
    };
  const isMulti = !!props.isMulti;
  const enabled = getEnabledOptions(props.options);
  const selected = (props.getValue() as ReadonlyArray<ISelectOption>) ?? [];
  const allSelected = areAllSelected(selected, enabled);
  const indeterminate = isIndeterminate(selected, enabled);

  const handleSelectAll = () => {
    const next = toggleBulkSelection(selected, enabled);
    props.setValue(next, allSelected ? 'deselect-option' : 'select-option');
  };

  const renderSelectAll = isMulti && showSelectAll && enabled.length > 0;

  return (
    <div className={styles['tedi-select__menu-list-wrapper']} onMouseMove={keyboardMode ? exitKeyboardMode : undefined}>
      <ReactSelectComponents.MenuList
        {...props}
        className={cn(props.className, styles['tedi-select__menu-list'], {
          [styles['tedi-select__menu-list--keyboard']]: keyboardMode,
          [styles['tedi-select__menu-list--grid']]: dropdownType === 'grid',
        })}
      >
        {renderSelectAll && (
          <div
            className={styles['tedi-select__select-all']}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSelectAll}
            role="option"
            aria-selected={allSelected}
          >
            <Checkbox
              id={`${props.selectProps.instanceId ?? 'tedi-select'}-select-all`}
              name="tedi-select__select-all"
              value="__select_all__"
              label={selectAllLabel ?? getLabel('select.select-all')}
              checked={allSelected}
              indeterminate={indeterminate}
            />
          </div>
        )}
        {props.children}
      </ReactSelectComponents.MenuList>
      {renderMessageListFooter && (
        <div className={styles['tedi-select__menu-list-footer']}>{renderMessageListFooter(props)}</div>
      )}
    </div>
  );
};

SelectMenuList.displayName = 'SelectMenuList';
