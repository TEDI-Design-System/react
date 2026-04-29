import React, { useContext } from 'react';

export type TabsContextValue = {
  currentTab: string;
  setCurrentTab: (id: string) => void;
};

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tabs components must be used within <Tabs />');
  }
  return ctx;
};
