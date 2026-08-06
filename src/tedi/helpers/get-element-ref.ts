import { ReactElement, Ref, version } from 'react';

/**
 * Reads a React element's ref in a version-safe way.
 *
 * React 19 moved `ref` onto `props` (an enumerable prop) and warns whenever the
 * legacy `element.ref` getter is accessed. React 18 keeps the ref on the element
 * itself. So read from `props.ref` on React 19+ and only fall back to
 * `element.ref` on React 18 — avoiding both the deprecation warning and the
 * lost ref.
 */
export const getElementRef = <T = unknown>(element: ReactElement): Ref<T> | undefined => {
  const el = element as ReactElement<{ ref?: Ref<T> }> & { ref?: Ref<T> };
  return Number.parseInt(version, 10) >= 19 ? el.props.ref : el.ref;
};
