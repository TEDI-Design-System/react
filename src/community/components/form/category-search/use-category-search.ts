import { useEffect, useRef, useState } from 'react';

import type { CategorySearchCategory } from './category-search.types';

interface CategorySearchState {
  draft: unknown;
  completedSearch?: { input: unknown; result: unknown };
  status: 'idle' | 'loading' | 'error';
}

export function useCategorySearch(categories: readonly CategorySearchCategory[]) {
  const [states, setStates] = useState<ReadonlyMap<string, CategorySearchState>>(() => {
    const initialStates = new Map<string, CategorySearchState>(
      categories.map((category) => [category.id, { draft: category.initialValue(), status: 'idle' }])
    );
    if (initialStates.size !== categories.length) throw new Error('CategorySearch category IDs must be unique.');
    return initialStates;
  });
  const requests = useRef(new Map<string, AbortController>());

  useEffect(() => {
    const controllers = requests.current;
    return () => {
      controllers.forEach((controller) => controller.abort());
      controllers.clear();
    };
  }, []);

  function updateState(categoryId: string, changes: Partial<CategorySearchState>) {
    setStates((previous) => {
      const current = previous.get(categoryId)!;
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
  }

  function clear(category: CategorySearchCategory) {
    cancel(category.id);
    updateState(category.id, {
      draft: category.mode === 'search' ? '' : category.initialValue(),
      completedSearch: undefined,
      status: 'idle',
    });
  }

  function select(categoryId: string, text: string) {
    cancel(categoryId);
    updateState(categoryId, { draft: text, status: 'idle' });
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

  return { states, changeDraft, search, clear, select };
}
