import { createContext, useContext } from 'react';

export interface TopNavContextValue {
  /**
   * Closes the open desktop submenu (mega-menu) panel. Called by `TopNav.SubItem`
   * when a submenu link is activated so the panel dismisses on navigation
   * (important for SPA / client-side routing where the nav stays mounted).
   * No-op when there is no open panel.
   */
  closeSubmenu: () => void;
}

export const TopNavContext = createContext<TopNavContextValue | null>(null);

export const useTopNavContext = (): TopNavContextValue | null => useContext(TopNavContext);
