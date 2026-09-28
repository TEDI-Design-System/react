import { useId } from 'react';

/**
 * Colon-free variant of React's `useId()`. `useId()` returns ids wrapped in colons
 * (e.g. `:r8m:`) which are valid in the DOM but break CSS-selector resolution — so
 * selector-based tooling (such as axe resolving an `aria-controls` idref) can't
 * confirm the referenced element exists and reports it as inconclusive. Use this
 * whenever the id is written to the DOM and referenced by an `id` / aria idref
 * attribute (`aria-controls`, `aria-labelledby`, `htmlFor`, …).
 *
 * The whole result (prefix included) is stripped of any character that isn't a
 * letter, digit, `-` or `_`, so a caller-supplied prefix such as `"nav:main"`
 * can't reintroduce a colon and break the selector-safe contract.
 *
 * @param prefix Readable prefix prepended to the id. @default 'tedi'
 * @returns A stable, unique, selector-safe id (e.g. `tedi-r8m`).
 */
export const useSafeId = (prefix = 'tedi'): string => `${prefix}-${useId()}`.replace(/[^a-zA-Z0-9_-]/g, '');
