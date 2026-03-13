import cn from 'classnames';
import React from 'react';

import { Icon } from '../../../base/icon/icon';
import { Dropdown } from '../../../overlays/dropdown/dropdown';
import styles from '../tabs.module.scss';
import { useTabsContext } from '../tabs-context';
import { navigateTablist } from '../tabs-helpers';

export interface TabsDropdownItemProps {
  /**
   * Unique identifier matching the corresponding TabsContent id
   */
  id: string;
  /**
   * Item label
   */
  children: React.ReactNode;
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
}

const TabsDropdownItem = (props: TabsDropdownItemProps) => {
  const { id, children } = props;
  return <span data-tab-id={id}>{children}</span>;
};

TabsDropdownItem.displayName = 'TabsDropdownItem';

export interface TabsDropdownProps {
  /**
   * Dropdown label displayed on the trigger
   */
  label: string;
  /**
   * TabsDropdown.Item elements
   */
  children: React.ReactNode;
  /**
   * Whether the dropdown trigger is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional class name(s)
   */
  className?: string;
}

export const TabsDropdown = (props: TabsDropdownProps) => {
  const { label, children, disabled = false, className } = props;
  const { currentTab, setCurrentTab } = useTabsContext();

  const [open, setOpen] = React.useState(false);

  const childArray = React.Children.toArray(children).filter(React.isValidElement);
  const childIds = childArray.map((child) => (child.props as TabsDropdownItemProps).id);
  const isSelected = childIds.includes(currentTab);

  const selectedChild = childArray.find((child) => (child.props as TabsDropdownItemProps).id === currentTab);
  const displayLabel = selectedChild ? (selectedChild.props as TabsDropdownItemProps).children : label;

  const handleSelect = (id: string) => {
    setCurrentTab(id);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const target = navigateTablist(e);
    if (target) {
      setOpen(false);
      setCurrentTab(target.id);
    }
  };

  return (
    <Dropdown open={open} onOpenChange={setOpen} placement="bottom-start">
      <Dropdown.Trigger>
        <button
          data-name="tabs-dropdown"
          role="tab"
          type="button"
          disabled={disabled}
          aria-selected={isSelected}
          aria-controls={isSelected ? `${currentTab}-panel` : undefined}
          tabIndex={isSelected ? 0 : -1}
          className={cn(
            styles['tedi-tabs__trigger'],
            { [styles['tedi-tabs__trigger--selected']]: isSelected },
            { [styles['tedi-tabs__trigger--disabled']]: disabled },
            className
          )}
          onKeyDown={handleKeyDown}
        >
          {displayLabel}
          <Icon name={open ? 'expand_less' : 'expand_more'} size={18} color="inherit" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {childArray.map((child, index) => {
          const itemProps = child.props as TabsDropdownItemProps;
          return (
            <Dropdown.Item
              key={itemProps.id}
              index={index}
              active={currentTab === itemProps.id}
              disabled={itemProps.disabled}
              onClick={() => handleSelect(itemProps.id)}
            >
              {itemProps.children}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
};

TabsDropdown.displayName = 'TabsDropdown';
TabsDropdown.Item = TabsDropdownItem;

export default TabsDropdown;
