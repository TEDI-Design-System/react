import type { CSSProperties, ReactNode } from 'react';

export type CategorySearchSize = 'small' | 'default' | 'large';

export interface CategorySearchRequestContext {
  /** Aborted by a newer search, an empty query, selection, Clear, or unmount. */
  signal: AbortSignal;
}

export interface CategorySearchFilterContext<Filters> {
  /** Current draft. Treat nested values as immutable React state. */
  values: Filters;
  /**
   * Replace edited filter objects, including changed nested objects; never mutate them.
   * This preserves the submitted input associated with saved results.
   */
  onChange: (values: Filters) => void;
  /** Whether the rendered fields should be disabled. */
  disabled: boolean;
  /** Resolved component size. Pass it to fields that support this size. */
  size: CategorySearchSize;
}

export interface CategorySearchFilterDefinition<Filters, Result> {
  /** Stable and unique within one CategorySearch instance. */
  id: string;
  /** Category name shown in the selector and used to name the panel. */
  label: string;
  /** Display this category's custom filter form. */
  mode: 'category';
  /** Return a fresh value. Called on mount and whenever this category is cleared. */
  initialFilters: () => Filters;
  /** Render fields only; CategorySearch provides the form and its action buttons. */
  renderFilters: (context: CategorySearchFilterContext<Filters>) => ReactNode;
  /**
   * Application-provided validation content, usually a TEDI Alert.
   * While supplied, this category shows its filters when its panel is open.
   * The application controls message updates and removal; this does not prevent searching.
   */
  validationMessage?: ReactNode;
  /** Search a submitted draft. Do not mutate filters; honor signal when supported. */
  onSearch: (filters: Filters, context: CategorySearchRequestContext) => Result | Promise<Result>;
  /** Render the last successful result alongside the filters that produced it. */
  renderResults: (context: { result: Result; filters: Filters }) => ReactNode;
  /** Supply this when the result is paginated or is not a plain array. */
  getResultCount?: (result: Result) => number;
}

export interface CategorySearchTextDefinition<Result> {
  /** Stable and unique within one CategorySearch instance. */
  id: string;
  /** Category name shown in the selector and used to name the panel. */
  label: string;
  /** Display the standard text search field. */
  mode: 'search';
  /** Initial query, used only on mount. Clearing always leaves an empty string. */
  initialQuery?: string;
  /** Search input placeholder. The hidden input label comes from labels.searchInput. */
  placeholder?: string;
  /** Show the submit button beside the text input. Defaults to true. */
  showSearchButton?: boolean;
  /** Search on each non-empty text change and explicit submission; honor signal when supported. */
  onSearch: (query: string, context: CategorySearchRequestContext) => Result | Promise<Result>;
  /** Render the last successful result alongside the query that produced it. */
  renderResults: (context: {
    result: Result;
    query: string;
    /** Put a result label in the input, close the panel, and cancel any pending lookup. */
    selectResult: (text: string) => void;
  }) => ReactNode;
  /** Supply this when the result is paginated or is not a plain array. */
  getResultCount?: (result: Result) => number;
}

/**
 * Common shape for storing different categories in one array.
 * Use defineCategorySearchCategory to keep each category's own filter and result types.
 */
export interface CategorySearchCategory {
  /** Stable category identity. */
  id: string;
  /** User-facing category name. */
  label: string;
  /** Select the standard search field or a custom filter form. */
  mode: 'search' | 'category';
  /** Optional placeholder for a standard search field. */
  placeholder?: string;
  /** Show the submit button beside the text input. Defaults to true. */
  showSearchButton?: boolean;
  /** @internal Create an initial or reset draft. */
  initialValue: () => unknown;
  /** @internal Render the normalized category filter fields. */
  renderFilters?: (context: CategorySearchFilterContext<unknown>) => ReactNode;
  /** @internal Current application-provided validation content for a filter category. */
  validationMessage?: ReactNode;
  /** @internal Execute a search with the normalized submitted draft. */
  onSearch: (value: unknown, context: CategorySearchRequestContext) => unknown;
  /** @internal Render completed results and their normalized submitted draft. */
  renderResults: (context: { result: unknown; value: unknown; selectResult: (text: string) => void }) => ReactNode;
  /** @internal Return the number of matching results for the summary. */
  getResultCount?: (result: unknown) => number;
}

export interface CategorySearchLabels {
  /** Accessible category selector label. */
  category: string;
  /** Search submission button label. */
  search: string;
  /** Hidden label for the standard text search input and title of the mobile modal. */
  searchInput: string;
  /** Clear the current category action label. */
  clear: string;
  /** Close the panel action label. */
  close: string;
  /** Category filter submission button label. */
  filter: string;
  /** Reset the current category filter action label. */
  cancelFilter: string;
  /** Action label for opening the filter fields. */
  showFilters: string;
  /** Action label for reopening remembered results. */
  showResults: string;
  /** Accessible results label and fallback announcement when no result count is available. */
  results: string;
  /** Status while a search is running. */
  loading: string;
  /** Message after a successful search with zero results. */
  noResults: string;
  /** Generic visible message after a failed search. */
  searchError: string;
  /**
   * Notice when the filter object was replaced since the saved search was submitted.
   * Returning fields to their earlier values does not remove it. Defaults to 'Filters edited since searching.'.
   */
  filtersChanged: string;
  /** Format the number of matching results. */
  resultCount: (count: number) => string;
}

export interface CategorySearchProps {
  /** Optional stable DOM ID prefix; an ID is generated when omitted. */
  id?: string;
  /**
   * At least one predefined category with unique, stable IDs. Create these with defineCategorySearchCategory.
   * Keep the same IDs while mounted; definitions and callbacks may be updated.
   */
  categories: readonly CategorySearchCategory[];
  /**
   * Use the full-screen mobile modal (true) or desktop panel (false).
   * When omitted, follows TEDI's below-md breakpoint. Changing presentation preserves state.
   */
  mobile?: boolean;
  /** Initially selected ID, used only on mount. Defaults to the first category. */
  defaultCategoryId?: string;
  /**
   * Initial panel or modal visibility, used only on mount. Defaults to false.
   * Desktop text results also require a non-empty input and a pending search, completed search, or error.
   */
  defaultOpen?: boolean;
  /**
   * Application-owned minimize counter. The initial value is ignored.
   * Later changes hide the panel or modal without clearing saved state or restoring focus.
   */
  minimizeCounter?: number;
  /** Disable category selection, filter fields, and submission. Defaults to false. */
  disabled?: boolean;
  /** Size of the search field and buttons; also provided to renderFilters. Defaults to 'default'. */
  size?: CategorySearchSize;
  /** Place validation content before or after the filter fields. Defaults to 'before'. */
  validationPosition?: 'before' | 'after';
  /** Override visible and accessible labels for localization. */
  labels?: Partial<CategorySearchLabels>;
  /** Width of the whole search bar, including the category selector. Defaults to '100%' and fits within its parent. */
  searchBarWidth?: CSSProperties['width'];
  /**
   * Desktop text-results panel width. May exceed the search bar; constrained to the available viewport space.
   * Defaults to '100%' of the whole search bar. Does not set filter-category panel width.
   * The mobile modal fills the viewport width.
   */
  textResultsPanelWidth?: CSSProperties['width'];
  /**
   * Match desktop filter forms and their results to the full bar, including the category selector.
   * Defaults to false: panels match the bar excluding the selector.
   * Does not affect text-search results or the mobile modal.
   */
  fullWidthFilterPanel?: boolean;
  /** Maximum desktop panel height. Defaults to 'min(32rem, 70dvh)'. The mobile modal fills the viewport height. */
  maxPanelHeight?: CSSProperties['maxHeight'];
  /** Additional CSS class applied to the outer component element. */
  className?: string;
}
