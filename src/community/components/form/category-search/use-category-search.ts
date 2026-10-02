import { useEffect, useRef, useState } from 'react';

import type { CategorySearchCategory } from './category-search.types';

interface CategorySearchState {
  draft: unknown;
  completedSearch?: { input: unknown; result: unknown };
  status: 'idle' | 'loading' | 'error';
}

export function useCategorySearch(categories: readonly CategorySearchCategory[]) {
  const [states, setStates] = useState<ReadonlyMap<string, CategorySearchState>>(
    () => new Map(categories.map((category) => [category.id, { draft: category.initialValue(), status: 'idle' }]))
  );
  const requests = useRef(new Map<string, AbortController>());

  useEffect(() => {
    const controllers = requests.current;
    return () => {
      controllers.forEach((controller) => controller.abort());
      controllers.clear();
    };
  }, []);

  // Keeping an ID preserves its input and results; removing it also invalidates its request.
  useEffect(() => {
    const ids = new Set(categories.map((category) => category.id));
    if (ids.size !== categories.length) throw new Error('CategorySearch category IDs must be unique.');

    requests.current.forEach((controller, categoryId) => {
      if (!ids.has(categoryId)) {
        controller.abort();
        requests.current.delete(categoryId);
      }
    });

    setStates((previous) => {
      const next = new Map(previous);
      let changed = false;
      for (const category of categories) {
        if (!next.has(category.id)) {
          next.set(category.id, { draft: category.initialValue(), status: 'idle' });
          changed = true;
        }
      }
      for (const categoryId of previous.keys()) {
        if (!ids.has(categoryId)) {
          next.delete(categoryId);
          changed = true;
        }
      }
      return changed ? next : previous;
    });
  }, [categories]);

  function updateState(categoryId: string, changes: Partial<CategorySearchState>) {
    setStates((previous) => {
      const current = previous.get(categoryId);
      if (!current) return previous;
      const next = new Map(previous);
      next.set(categoryId, { ...current, ...changes });
      return next;
    });
  }

  function changeDraft(categoryId: string, draft: unknown) {
    updateState(categoryId, { draft });
  }

  function cancel(categoryId: string) {
    requests.current.get(categoryId)?.abort();
    requests.current.delete(categoryId);
    updateState(categoryId, { status: 'idle' });
  }

  function clear(category: CategorySearchCategory) {
    cancel(category.id);
    updateState(category.id, { draft: category.initialValue(), completedSearch: undefined, status: 'idle' });
  }

  async function search(category: CategorySearchCategory, input: unknown) {
    const categoryId = category.id;
    cancel(categoryId);
    const request = new AbortController();
    requests.current.set(categoryId, request);
    updateState(categoryId, { status: 'loading' });

    try {
      // Keep the submitted input. Filter edits must replace objects, never mutate this one.
      const result = await category.onSearch(input, { signal: request.signal });
      // Callbacks may ignore abort, so only the current request may save its result.
      if (requests.current.get(categoryId) !== request) return;
      updateState(categoryId, { completedSearch: { input, result }, status: 'idle' });
    } catch {
      if (requests.current.get(categoryId) !== request) return;
      updateState(categoryId, { status: 'error' });
    } finally {
      if (requests.current.get(categoryId) === request) requests.current.delete(categoryId);
    }
  }

  return { states, changeDraft, search, clear, cancel };
}
