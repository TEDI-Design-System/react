import { FloatingPortal } from '@floating-ui/react';
import React from 'react';

import { usePortalRoot } from './style-provider';

const NestedPortalContext = React.createContext(false);

const rootKeys = new WeakMap<HTMLElement, number>();
let nextRootKey = 0;

/**
 * Key that changes with the root, because `FloatingPortal` does not move its node when `root` changes.
 */
const getRootKey = (root: HTMLElement | null | undefined): string => {
  if (!root) return String(root);

  const key = rootKeys.get(root) ?? nextRootKey++;
  rootKeys.set(root, key);

  return String(key);
};

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
  const root = isNested ? undefined : portalRoot;

  return (
    <FloatingPortal key={getRootKey(root)} root={root}>
      <NestedPortalContext.Provider value={true}>{children}</NestedPortalContext.Provider>
    </FloatingPortal>
  );
};
