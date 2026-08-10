import * as React from 'react';

/**
 * Tabs — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/navigation/tabs/tabs.stories.tsx).
 */
export interface TabsProps {
  /** Tabs content — should include Tabs.List and Tabs.Content elements */
  children: React.ReactNode;
  /** Controlled active tab id. Use together with onChange. */
  value?: string;
  /** Default active tab id for uncontrolled usage. */
  defaultValue?: string;
  /** Callback fired when the active tab changes */
  onChange?: (tabId: string) => void;
  /** Additional class name(s) */
  className?: string;
}

export declare const Tabs: React.ComponentType<TabsProps> & {
  List: React.ComponentType<any>;
  Trigger: React.ComponentType<any>;
  Content: React.ComponentType<any>;
};
