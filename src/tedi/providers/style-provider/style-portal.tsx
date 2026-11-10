import { FloatingPortal } from '@floating-ui/react';
import React from 'react';

import { usePortalRoot } from './style-provider';

const NestedPortalContext = React.createContext(false);

export interface StylePortalProps {
  children: React.ReactNode;
}

/**
 * `FloatingPortal` that renders into the `StyleProvider` container element.
 * Inside another `StylePortal` it keeps the parent portal as its root, so a dropdown in a modal stays inside the modal's portal.
 */
export const StylePortal = ({ children }: StylePortalProps): JSX.Element => {
  const portalRoot = usePortalRoot();
  const isNested = React.useContext(NestedPortalContext);

  return (
    <FloatingPortal root={isNested ? undefined : portalRoot}>
      <NestedPortalContext.Provider value={true}>{children}</NestedPortalContext.Provider>
    </FloatingPortal>
  );
};
