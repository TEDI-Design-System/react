import cn from 'classnames';
import React from 'react';

import styles from '../tabs.module.scss';
import { useTabsContext } from '../tabs-context';

export interface TabsContentProps {
  /**
   * Unique identifier matching the corresponding TabsTrigger id.
   * When provided, content is only shown when this tab is active.
   * When omitted, content is always rendered (useful for router outlets).
   */
  id?: string;
  /**
   * Tab panel content
   */
  children: React.ReactNode;
  /**
   * Additional class name(s)
   */
  className?: string;
}

export const TabsContent = (props: TabsContentProps) => {
  const { id, children, className } = props;
  const { currentTab } = useTabsContext();

  if (id && currentTab !== id) {
    return null;
  }

  return (
    <div
      data-name="tabs-content"
      id={id ? `${id}-panel` : undefined}
      role="tabpanel"
      aria-labelledby={id ?? undefined}
      className={cn(styles['tedi-tabs__content'], className)}
    >
      {children}
    </div>
  );
};

TabsContent.displayName = 'TabsContent';

export default TabsContent;
