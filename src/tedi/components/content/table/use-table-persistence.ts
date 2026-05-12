import { useCallback, useMemo, useRef, useState } from 'react';

import type { TablePersistOptions, TableState } from './table';

/**
 * State slices persisted by default when `persist` is configured without a
 * custom `include` list. Limited to user-preference slices (column visibility
 * / order / sizing). Task-scoped slices (selection, expanded, filters, sort,
 * pagination) are intentionally excluded — they should reset between sessions.
 */
const DEFAULT_PERSISTED_KEYS: (keyof TableState)[] = ['columnVisibility', 'columnOrder', 'rowOrder', 'columnSizing'];

function getStorage(options?: TablePersistOptions): Storage | null {
  if (!options) return null;
  if (options.storage) return options.storage;
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readInitialState(
  options: TablePersistOptions | undefined,
  fallback: Partial<TableState>
): Partial<TableState> {
  const storage = getStorage(options);
  if (!storage || !options) return fallback;
  try {
    const raw = storage.getItem(options.key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<TableState>;
    const include = options.include ?? DEFAULT_PERSISTED_KEYS;
    const filtered: Partial<TableState> = {};
    for (const key of include) {
      if (parsed[key] !== undefined) filtered[key] = parsed[key] as never;
    }
    return { ...fallback, ...filtered };
  } catch {
    return fallback;
  }
}

/**
 * Owns the Table's internal state and (optionally) syncs it to a Storage backend.
 * The hook always returns a fully-merged TableState so callers never have to
 * reason about `undefined` slices.
 */
export type TableStatePatch = Partial<TableState> | ((prev: TableState) => Partial<TableState>);

export function useTablePersistence(options: {
  persist?: TablePersistOptions;
  controlled?: Partial<TableState>;
  defaultState?: Partial<TableState>;
  onStateChange?: (state: TableState) => void;
}): [TableState, (next: TableStatePatch) => void] {
  const { persist, controlled, defaultState, onStateChange } = options;

  const [internal, setInternal] = useState<TableState>(() => readInitialState(persist, defaultState ?? {}));

  const state = useMemo<TableState>(() => ({ ...internal, ...controlled }), [internal, controlled]);

  // `controlled` and `onStateChange` typically come from fresh object/closure
  // identities on every parent render (consumers write `state={{ pagination,
  // sorting }}` which rebuilds the object each time). Reading them through
  // refs keeps `setState` a stable function across the table's lifetime —
  // otherwise every downstream `useCallback` that depends on it churns, and
  // TanStack sees fresh `onXxxChange` props every render.
  const controlledRef = useRef(controlled);
  controlledRef.current = controlled;
  const onStateChangeRef = useRef(onStateChange);
  onStateChangeRef.current = onStateChange;
  const persistRef = useRef(persist);
  persistRef.current = persist;

  const setState = useCallback((patchOrFn: TableStatePatch) => {
    setInternal((prev) => {
      const controlledNow = controlledRef.current;
      const mergedPrev: TableState = { ...prev, ...controlledNow };
      const patch = typeof patchOrFn === 'function' ? patchOrFn(mergedPrev) : patchOrFn;
      const next: TableState = { ...prev, ...patch };
      // `patch` must win over `controlled` so that the parent hears the new
      // value when a controlled key (pagination, sorting, …) just changed.
      // `controlled` then re-asserts ownership for keys the parent owns but
      // didn't change in this update, while `prev` provides internal-only keys.
      const merged: TableState = { ...prev, ...controlledNow, ...patch };

      const current = persistRef.current;
      const storage = getStorage(current);
      if (storage && current) {
        try {
          const include = current.include ?? DEFAULT_PERSISTED_KEYS;
          const persisted: Partial<TableState> = {};
          for (const key of include) {
            if (merged[key] !== undefined) persisted[key] = merged[key] as never;
          }
          storage.setItem(current.key, JSON.stringify(persisted));
        } catch {
          // silently ignore quota / serialization errors
        }
      }

      onStateChangeRef.current?.(merged);
      return next;
    });
  }, []);

  return [state, setState];
}
