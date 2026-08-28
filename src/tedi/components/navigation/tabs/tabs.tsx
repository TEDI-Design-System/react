import cn from 'classnames';
import React from 'react';

import styles from './tabs.module.scss';
import { TabsContent } from './tabs-content/tabs-content';
import { TabsContext } from './tabs-context';
import { TabsList } from './tabs-list/tabs-list';
import { TabsTrigger } from './tabs-trigger/tabs-trigger';

export interface TabsProps {
  /**
   * Tabs content — should include Tabs.List and Tabs.Content elements
   */
  children: React.ReactNode;
  /**
   * Controlled active tab id. Use together with onChange.
   */
  value?: string;
  /**
   * Default active tab id for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Callback fired when the active tab changes
   */
  onChange?: (tabId: string) => void;
  /**
   * Additional class name(s)
   */
  className?: string;
}

export const Tabs = (props: TabsProps) => {
  const { children, value: controlledTab, defaultValue, onChange, className } = props;
  const [uncontrolledTab, setUncontrolledTab] = React.useState(defaultValue || '');

  const currentTab = controlledTab ?? uncontrolledTab;

  const setCurrentTab = React.useCallback(
    (id: string) => {
      if (id === currentTab) return;
      if (controlledTab === undefined) {
        setUncontrolledTab(id);
      }
      onChange?.(id);
    },
    [controlledTab, currentTab, onChange]
  );

  return (
    <TabsContext.Provider value={{ currentTab, setCurrentTab }}>
      <div data-name="tabs" className={cn(styles['tedi-tabs'], className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.displayName = 'Tabs';
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
