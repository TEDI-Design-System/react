import cn from 'classnames';
import React from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import { useLabels } from '../../../../providers/label-provider';
import { Icon } from '../../../base/icon/icon';
import Print, { PrintProps } from '../../../misc/print/print';
import { Dropdown } from '../../../overlays/dropdown/dropdown';
import styles from '../tabs.module.scss';
import { useTabsContext } from '../tabs-context';
import { TabsDropdown } from '../tabs-dropdown/tabs-dropdown';
import { TabsDropdownItemProps } from '../tabs-dropdown/tabs-dropdown';

export interface TabsListProps {
  /**
   * Tab trigger elements
   */
  children: React.ReactNode;
  /**
   * Additional class name(s)
   */
  className?: string;
  /**
   * Accessible label for the tablist
   */
  'aria-label'?: string;
  /**
   * ID of element labelling the tablist
   */
  'aria-labelledby'?: string;
  /**
   * Controls visibility when printing
   * @default 'show'
   */
  printVisibility?: PrintProps['visibility'];
}

interface MobileDropdownItem {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export const TabsList = (props: TabsListProps) => {
  const {
    children,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    printVisibility = 'show',
  } = props;

  const { getLabel } = useLabels();
  const { currentTab, setCurrentTab } = useTabsContext();

  const breakpoint = useBreakpoint();
  const isMobile = isBreakpointBelow(breakpoint, 'md');

  const childArray = React.useMemo(() => {
    return React.Children.toArray(children).filter(React.isValidElement);
  }, [children]);

  // Flatten all children (including TabsDropdown items) for mobile dropdown
  const mobileItems = React.useMemo(() => {
    const result: MobileDropdownItem[] = [];
    childArray.forEach((child) => {
      if ((child.type as { displayName?: string }).displayName === TabsDropdown.displayName) {
        const dropdownProps = child.props as { children: React.ReactNode };
        const items = React.Children.toArray(dropdownProps.children).filter(React.isValidElement);
        items.forEach((item) => {
          const itemProps = item.props as TabsDropdownItemProps;
          result.push({ id: itemProps.id, label: itemProps.children, disabled: itemProps.disabled });
        });
      } else {
        const triggerProps = child.props as { id: string; children: React.ReactNode; disabled?: boolean };
        result.push({ id: triggerProps.id, label: triggerProps.children, disabled: triggerProps.disabled });
      }
    });
    return result;
  }, [childArray]);

  const showMore = isMobile && mobileItems.length > 1;

  // Filter out the currently selected tab from the mobile dropdown
  const dropdownItems = mobileItems.filter((item) => item.id !== currentTab);

  const handleMobileSelect = (id: string) => {
    if (id) {
      setCurrentTab(id);
    }
  };

  return (
    <Print visibility={printVisibility}>
      <div
        data-name="tabs-list"
        role="tablist"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(styles['tedi-tabs__list'], className)}
      >
        {children}
        {showMore && (
          <div className={styles['tedi-tabs__more-wrapper']}>
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger>
                <button data-name="tabs-more-btn" type="button" className={styles['tedi-tabs__more-btn']}>
                  {getLabel('tabs.more')}
                  <Icon name="expand_more" size={18} />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {dropdownItems.map((item, index) => (
                  <Dropdown.Item
                    key={item.id}
                    index={index}
                    active={currentTab === item.id}
                    disabled={item.disabled}
                    onClick={() => handleMobileSelect(item.id)}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </div>
        )}
      </div>
    </Print>
  );
};

TabsList.displayName = 'TabsList';

export default TabsList;
