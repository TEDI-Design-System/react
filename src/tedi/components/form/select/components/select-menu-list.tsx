import cn from 'classnames';
import { components as ReactSelectComponents, MenuListProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type MenuListType = MenuListProps<ISelectOption, boolean> & {
  selectProps: MenuListProps<ISelectOption, boolean>['selectProps'] & {
    keyboardMode?: boolean;
    exitKeyboardMode?: () => void;
    dropdownType?: 'menu' | 'grid';
  };
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMenuList = ({ renderMessageListFooter, ...props }: MenuListType) => {
  const { keyboardMode, exitKeyboardMode, dropdownType } = props.selectProps;

  return (
    <div className={styles['tedi-select__menu-list-wrapper']} onMouseMove={keyboardMode ? exitKeyboardMode : undefined}>
      <ReactSelectComponents.MenuList
        {...props}
        className={cn(props.className, styles['tedi-select__menu-list'], {
          [styles['tedi-select__menu-list--keyboard']]: keyboardMode,
          [styles['tedi-select__menu-list--grid']]: dropdownType === 'grid',
        })}
      >
        {props.children}
      </ReactSelectComponents.MenuList>
      {renderMessageListFooter && (
        <div className={styles['tedi-select__menu-list-footer']}>{renderMessageListFooter(props)}</div>
      )}
    </div>
  );
};

SelectMenuList.displayName = 'SelectMenuList';
