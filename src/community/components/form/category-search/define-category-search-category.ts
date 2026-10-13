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
export function defineCategorySearchCategory(definition: CategorySearchTextDefinition): CategorySearchCategory;
export function defineCategorySearchCategory<Filters, Result>(
  definition: CategorySearchFilterDefinition<Filters, Result> | CategorySearchTextDefinition
): CategorySearchCategory {
  const common = {
    id: definition.id,
    label: definition.label,
  };

  if (definition.mode === 'search') {
    return {
      ...common,
      mode: 'search',
      placeholder: definition.placeholder,
      showSearchButton: definition.showSearchButton,
      initialValue: () => definition.initialQuery ?? '',
      onSearch: (value, context) => definition.onSearch(value as string, context),
      onSuggestionSelect: definition.onSuggestionSelect,
      renderSuggestionContent: definition.renderSuggestionContent,
    };
  }

  const getResultCount = definition.getResultCount;
  return {
    ...common,
    mode: 'category',
    initialValue: definition.initialFilters,
    validationMessage: definition.validationMessage,
    renderFilters: ({ values, onChange, disabled, size }) =>
      definition.renderFilters({ values: values as Filters, onChange, disabled, size }),
    onSearch: (value, context) => definition.onSearch(value as Filters, context),
    renderResults: ({ result, value }) =>
      definition.renderResults({ result: result as Result, filters: value as Filters }),
    getResultCount: getResultCount ? (result: unknown) => getResultCount(result as Result) : undefined,
  };
}
