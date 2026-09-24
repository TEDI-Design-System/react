import type {
  CategorySearchCategory,
  CategorySearchFilterDefinition,
  CategorySearchTextDefinition,
} from './category-search.types';

/**
 * Gives text and filter categories a common internal format, while keeping each
 * category's own input and result types checked at the application boundary.
 */
export function defineCategorySearchCategory<Filters, Result>(
  definition: CategorySearchFilterDefinition<Filters, Result>
): CategorySearchCategory;
export function defineCategorySearchCategory<Result>(
  definition: CategorySearchTextDefinition<Result>
): CategorySearchCategory;
export function defineCategorySearchCategory<Filters, Result>(
  definition: CategorySearchFilterDefinition<Filters, Result> | CategorySearchTextDefinition<Result>
): CategorySearchCategory {
  const getResultCount = definition.getResultCount;
  const common = {
    id: definition.id,
    label: definition.label,
    getResultCount: getResultCount ? (result: unknown) => getResultCount(result as Result) : undefined,
  };

  if (definition.mode === 'search') {
    return {
      ...common,
      mode: 'search',
      placeholder: definition.placeholder,
      initialValue: () => definition.initialQuery ?? '',
      onSearch: (value, context) => definition.onSearch(value as string, context),
      renderResults: ({ result, value, selectResult }) =>
        definition.renderResults({ result: result as Result, query: value as string, selectResult }),
    };
  }

  return {
    ...common,
    mode: 'category',
    initialValue: definition.initialFilters,
    renderFilters: ({ values, onChange, disabled, size }) =>
      definition.renderFilters({ values: values as Filters, onChange, disabled, size }),
    onSearch: (value, context) => definition.onSearch(value as Filters, context),
    renderResults: ({ result, value }) =>
      definition.renderResults({ result: result as Result, filters: value as Filters }),
  };
}
