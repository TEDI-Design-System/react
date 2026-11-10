import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';

import '../../styles/index.scss';

export interface StyleProviderProps {
  children: React.ReactNode;
  /**
   * Element that TEDI is rendered into, usually the root element inside a Shadow DOM.
   * Components that render in a portal (overlays, dropdowns, tooltips, modals, select menus)
   * render into this element instead of `document.body`, so they stay inside the shadow root
   * and keep its styles.
   * Pass `null` while the element is still mounting (for example state set by a callback ref):
   * portals wait until it is set instead of rendering into `document.body`.
   * When omitted, portals render into `document.body`.
   */
  containerElement?: HTMLElement | null;
  /**
   * Key of the Emotion cache that is created for `containerElement`, used for the class name prefix of
   * Emotion styles (react-select, for example). Use a different key for each application on the same page.
   * Only used together with `containerElement`.
   * @default 'tedi'
   */
  cacheKey?: string;
}

export interface IStyleContext {
  containerElement?: HTMLElement | null;
}

export const StyleContext = React.createContext<IStyleContext>({});

/**
 * Returns the element portal content should render into, in the form `FloatingPortal`'s `root` prop expects:
 * an element, `null` while the container is still mounting (the portal waits) or `undefined` for the
 * default, `document.body`.
 */
export const usePortalRoot = (): HTMLElement | null | undefined => {
  const { containerElement } = React.useContext(StyleContext);

  return containerElement;
};

export const StyleProvider = (props: StyleProviderProps): JSX.Element => {
  const { children, containerElement, cacheKey = 'tedi' } = props;
  const value = React.useMemo(() => ({ containerElement }), [containerElement]);
  const emotionCache = React.useMemo(
    () => (containerElement ? createCache({ key: cacheKey, container: containerElement }) : null),
    [containerElement, cacheKey]
  );
  const content = <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;

  return emotionCache ? <CacheProvider value={emotionCache}>{content}</CacheProvider> : content;
};
