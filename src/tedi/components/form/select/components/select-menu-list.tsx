import cn from 'classnames';
import { components as ReactSelectComponents, MenuListProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type MenuListType = MenuListProps<ISelectOption, boolean> & {
  renderMessageListFooter?: (props: MenuListProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMenuList = ({ renderMessageListFooter, ...props }: MenuListType) => {
  // "Select all" is now rendered as a regular react-select option (injected
  // by <Select>) so it participates in keyboard navigation and default focus.
  // The menu list itself only handles keyboard / mouse mode tracking and the
  // optional message list footer.
  const { keyboardMode, exitKeyboardMode, dropdownType } = props.selectProps as unknown as {
    keyboardMode?: boolean;
    exitKeyboardMode?: () => void;
    dropdownType?: 'menu' | 'grid';
  };

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
