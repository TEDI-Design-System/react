import cn from 'classnames';
import React from 'react';

import { Icon, IconProps } from '../../../base/icon/icon';
import styles from '../tabs.module.scss';
import { useTabsContext } from '../tabs-context';
import { navigateTablist } from '../tabs-helpers';

export interface TabsTriggerProps {
  /**
   * Unique identifier for this tab. Must match the corresponding TabsContent id.
   */
  id: string;
  /**
   * Tab label text
   */
  children: React.ReactNode;
  /**
   * Icon displayed before the label
   */
  icon?: IconProps['name'];
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional class name(s)
   */
  className?: string;
}

export const TabsTrigger = (props: TabsTriggerProps) => {
  const { id, children, icon, disabled = false, className } = props;
  const { currentTab, setCurrentTab } = useTabsContext();
  const isSelected = currentTab === id;

  const handleClick = () => {
    if (!disabled) {
      setCurrentTab(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const target = navigateTablist(e);
    if (target) {
      setCurrentTab(target.id);
    }
  };

  return (
    <button
      data-name="tabs-trigger"
      id={id}
      role="tab"
      type="button"
      aria-selected={isSelected}
      aria-controls={`${id}-panel`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={cn(
        styles['tedi-tabs__trigger'],
        { [styles['tedi-tabs__trigger--selected']]: isSelected },
        { [styles['tedi-tabs__trigger--disabled']]: disabled },
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon && <Icon name={icon} size={16} color="inherit" />}
      {children}
    </button>
  );
};

TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
