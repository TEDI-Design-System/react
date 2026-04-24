import { useCallback, useMemo, useRef, useState } from 'react';

import type { TablePersistOptions, TableState } from './table.types';

const ALL_KEYS: (keyof TableState)[] = ['columnVisibility', 'columnOrder', 'rowOrder', 'columnSizing'];

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
    const include = options.include ?? ALL_KEYS;
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

  const persistRef = useRef(persist);
  persistRef.current = persist;

  const setState = useCallback(
    (patchOrFn: TableStatePatch) => {
      setInternal((prev) => {
        const mergedPrev: TableState = { ...prev, ...controlled };
        const patch = typeof patchOrFn === 'function' ? patchOrFn(mergedPrev) : patchOrFn;
        const next: TableState = { ...prev, ...patch };
        const merged: TableState = { ...next, ...controlled };

        const current = persistRef.current;
        const storage = getStorage(current);
        if (storage && current) {
          try {
            const include = current.include ?? ALL_KEYS;
            const persisted: Partial<TableState> = {};
            for (const key of include) {
              if (merged[key] !== undefined) persisted[key] = merged[key] as never;
            }
            storage.setItem(current.key, JSON.stringify(persisted));
          } catch {
            // silently ignore quota / serialization errors
          }
        }

        onStateChange?.(merged);
        return next;
      });
    },
    [controlled, onStateChange]
  );

  return [state, setState];
}
