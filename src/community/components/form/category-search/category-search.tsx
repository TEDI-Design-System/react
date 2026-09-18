import { autoUpdate, shift, size as sizePanel, useFloating } from '@floating-ui/react';
import cn from 'classnames';
import React, { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';

import { Icon } from '../../../../tedi/components/base/icon/icon';
import { Button } from '../../../../tedi/components/buttons/button/button';
import { InputGroup } from '../../../../tedi/components/form/input-group/input-group';
import { Search } from '../../../../tedi/components/form/search/search';
import type { TextFieldForwardRef } from '../../../../tedi/components/form/textfield/textfield';
import { Dropdown } from '../../../../tedi/components/overlays/dropdown/dropdown';
import styles from './category-search.module.scss';
import type { CategorySearchCategory, CategorySearchLabels, CategorySearchProps } from './category-search.types';
import { useCategorySearch } from './use-category-search';

const defaultLabels: CategorySearchLabels = {
  category: 'Search category',
  searchInput: 'Search',
  search: 'Search',
  clear: 'Clear',
  close: 'Close',
  filter: 'Filter',
  cancelFilter: 'Clear filter',
  showFilters: 'Show filters',
  showResults: 'Show results',
  results: 'Results',
  loading: 'Searching…',
  noResults: 'No results found.',
  searchError: 'The search failed. Please try again.',
  filtersChanged: 'Filters edited since searching.',
  resultCount: (count) => `${count} results`,
};

/**
 * Search categories with independent drafts and results in an anchored, non-modal panel.
 * The background remains interactive. Closing, switching categories, or editing a draft
 * preserves completed results; clearing resets only the active category.
 */
export const CategorySearch = forwardRef<HTMLDivElement, CategorySearchProps>(
  (
    {
      categories,
      id,
      categoryId,
      defaultCategoryId,
      onCategoryChange,
      open,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      size = 'default',
      labels: labelOverrides,
      panelWidth = '100%',
      maxPanelHeight = 'min(32rem, 70dvh)',
      className,
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const rootId = id ?? `category-search-${generatedId}`;
    const panelId = `${rootId}-panel`;
    const labels = { ...defaultLabels, ...labelOverrides };
    const [innerCategoryId, setInnerCategoryId] = useState(defaultCategoryId ?? categories[0]?.id);
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const { states, changeDraft, search, clear, cancel } = useCategorySearch(categories);
    // Normally a category with a saved search shows results. This records when
    // the user explicitly chooses to edit that category's filters instead.
    const [editingCategoryId, setEditingCategoryId] = useState<string>();

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<TextFieldForwardRef>(null);
    const focusPanelNext = useRef(false);

    const activeId = categoryId ?? innerCategoryId;
    const category = categories.find((item) => item.id === activeId) ?? categories[0];
    const categoryState = category ? states.get(category.id) : undefined;
    const completedSearch = categoryState?.completedSearch;
    const loading = categoryState?.status === 'loading';
    const hasError = categoryState?.status === 'error';
    const hasSearch = Boolean(completedSearch || loading || hasError);
    const textMode = category?.mode === 'search';
    const isOpen = open ?? innerOpen;
    let panelView: 'closed' | 'filters' | 'results' = 'closed';
    if (isOpen && category && categoryState) {
      if (textMode) {
        if (categoryState.draft && hasSearch) panelView = 'results';
      } else if (hasSearch && editingCategoryId !== category.id) {
        panelView = 'results';
      } else {
        panelView = 'filters';
      }
    }
    const panelVisible = panelView !== 'closed';
    const count = completedSearch
      ? category?.getResultCount?.(completedSearch.result) ??
        (Array.isArray(completedSearch.result) ? completedSearch.result.length : undefined)
      : undefined;

    const { refs: panelRefs, floatingStyles: panelStyles } = useFloating<HTMLElement>({
      open: panelVisible,
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [
        textMode && shift(),
        sizePanel({
          apply({ rects, availableWidth, elements }) {
            // Text results may be wider; filter forms end before the category selector.
            if (textMode) {
              elements.floating.style.width = '';
              elements.floating.style.maxWidth = `${Math.max(0, availableWidth)}px`;
            } else {
              elements.floating.style.width = `${rects.reference.width}px`;
              elements.floating.style.maxWidth = '';
            }
          },
        }),
      ],
    });

    let toggleLabel = labels.filter;
    let showResultCount = false;
    if (panelView === 'results') {
      toggleLabel = labels.showFilters;
    } else if (hasSearch) {
      toggleLabel = labels.showResults;
      showResultCount = true;
    }

    useImperativeHandle(forwardedRef, () => rootRef.current as HTMLDivElement);

    useEffect(() => {
      setEditingCategoryId(undefined);
    }, [category?.id]);

    // Focus moves when the user submits, never when a delayed response arrives.
    useEffect(() => {
      if (panelView === 'closed' || !focusPanelNext.current) return;
      focusPanelNext.current = false;
      const focused = document.activeElement;
      if (focused === document.body || (focused && rootRef.current?.contains(focused))) {
        panelRefs.floating.current?.focus();
      }
    }, [panelView, category?.id, categoryState, panelRefs.floating]);

    function changeOpen(next: boolean) {
      if (open === undefined) setInnerOpen(next);
      onOpenChange?.(next);
    }

    function selectCategory(next: CategorySearchCategory) {
      if (disabled) return;
      if (categoryId === undefined) setInnerCategoryId(next.id);
      onCategoryChange?.(next.id);
      changeOpen(true);
    }

    function focusSearchControl() {
      if (textMode) searchRef.current?.input?.focus();
      else triggerRef.current?.focus();
    }

    function closePanel() {
      focusPanelNext.current = false;
      changeOpen(false);
      focusSearchControl();
    }

    function clearSearch() {
      if (!category || disabled) return;
      clear(category);
      setEditingCategoryId(undefined);
      focusPanelNext.current = false;
      changeOpen(!textMode);
      focusSearchControl();
    }

    function changeQuery(query: string) {
      if (!category || disabled) return;
      changeDraft(category.id, query);
      focusPanelNext.current = false;
      changeOpen(query.length > 0);

      if (!query) {
        cancel(category.id);
        return;
      }

      // Use this change's text; categoryState.draft still belongs to the previous render.
      void search(category, query);
    }

    function selectResult(text: string) {
      if (!category || !textMode || disabled) return;
      cancel(category.id);
      changeDraft(category.id, text);
      closePanel();
    }

    function submitSearch() {
      if (!category || !categoryState || disabled || (textMode && !categoryState.draft)) return;
      setEditingCategoryId(undefined);
      focusPanelNext.current = true;
      changeOpen(true);
      void search(category, categoryState.draft);
    }

    function toggleView() {
      if (panelView === 'closed') {
        setEditingCategoryId(undefined);
        changeOpen(true);
      } else if (panelView === 'results') {
        setEditingCategoryId(category?.id);
      } else if (hasSearch) {
        setEditingCategoryId(undefined);
      } else {
        closePanel();
      }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key !== 'Escape' || event.defaultPrevented || !panelVisible) return;
      const target = event.target as HTMLElement;
      if (!rootRef.current?.contains(target)) return;
      // Let an open field dropdown handle Escape before the search panel does.
      if (target.closest('[role="combobox"][aria-expanded="true"]')) return;
      event.stopPropagation();
      event.preventDefault();
      closePanel();
    }

    return (
      <div
        id={rootId}
        ref={rootRef}
        className={cn(styles['tedi-category-search'], styles[`tedi-category-search--${size}`], className)}
        style={
          {
            '--category-search-panel-width': typeof panelWidth === 'number' ? `${panelWidth}px` : panelWidth,
            '--category-search-panel-max-height':
              typeof maxPanelHeight === 'number' ? `${maxPanelHeight}px` : maxPanelHeight,
          } as React.CSSProperties
        }
        onKeyDown={handleKeyDown}
      >
        {category && categoryState && (
          <>
            <div className={styles['tedi-category-search__bar']}>
              <InputGroup
                id={`${rootId}-input`}
                label={textMode ? labels.searchInput : null}
                hideLabel
                disabled={disabled}
              >
                <div ref={panelRefs.setReference} className={styles['tedi-category-search__main']}>
                  {textMode ? (
                    <InputGroup.Input>
                      <Search
                        ref={searchRef}
                        id={`${rootId}-input`}
                        name={`${rootId}-query`}
                        value={categoryState.draft as string}
                        disabled={disabled}
                        size={size}
                        ariaLabel={category.label}
                        placeholder={category.placeholder}
                        onChange={changeQuery}
                        onClear={clearSearch}
                        onSearch={submitSearch}
                        onIconClick={submitSearch}
                        iconButtonProps={{ 'aria-label': labels.search }}
                        input={{ 'aria-controls': panelVisible ? panelId : undefined }}
                      />
                    </InputGroup.Input>
                  ) : (
                    <div className={styles['tedi-category-search__actions']}>
                      <Button
                        id={`${rootId}-input`}
                        ref={triggerRef}
                        size={size}
                        visualType="link"
                        iconLeft="tune"
                        disabled={disabled}
                        aria-expanded={panelVisible}
                        aria-controls={panelVisible ? panelId : undefined}
                        onClick={toggleView}
                      >
                        {toggleLabel}
                        {showResultCount && count !== undefined ? ` (${count})` : ''}
                      </Button>
                      {hasSearch && (
                        <Button
                          size={size}
                          visualType="link"
                          iconLeft="close"
                          disabled={disabled}
                          onClick={clearSearch}
                        >
                          {labels.cancelFilter}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                <InputGroup.Suffix className={styles['tedi-category-search__suffix']}>
                  <Dropdown
                    defaultActiveIndex={categories.indexOf(category)}
                    modal={false}
                    placement="bottom-end"
                    className={cn(styles['tedi-category-search__menu'], styles[`tedi-category-search__menu--${size}`])}
                  >
                    <Dropdown.Trigger>
                      <Button
                        noStyle
                        size={size}
                        disabled={disabled}
                        aria-label={`${labels.category}: ${category.label}`}
                      >
                        <span className={styles['tedi-category-search__category-label']}>{category.label}</span>
                        <Icon name="arrow_drop_down" color="inherit" />
                      </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {categories.map((item, index) => (
                        <Dropdown.Item
                          key={item.id}
                          index={index}
                          className={styles['tedi-category-search__menu-item']}
                          role="menuitemradio"
                          aria-checked={category.id === item.id}
                          active={category.id === item.id}
                          disabled={disabled}
                          onClick={() => selectCategory(item)}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Content>
                  </Dropdown>
                </InputGroup.Suffix>
              </InputGroup>
            </div>
            {panelVisible && (
              <section
                id={panelId}
                ref={panelRefs.setFloating}
                style={panelStyles}
                tabIndex={-1}
                aria-label={`${category.label}: ${panelView === 'results' ? labels.results : labels.filter}`}
                className={styles['tedi-category-search__panel']}
              >
                {panelView === 'filters' ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      submitSearch();
                    }}
                  >
                    <fieldset disabled={disabled} className={styles['tedi-category-search__fields']}>
                      <legend className={styles['tedi-category-search__sr-only']}>{category.label}</legend>
                      {category.renderFilters?.({
                        values: categoryState.draft,
                        onChange: (values) => changeDraft(category.id, values),
                        disabled,
                        size,
                      })}
                    </fieldset>
                    <div className={styles['tedi-category-search__footer']}>
                      <Button size={size} visualType="link" onClick={closePanel}>
                        {labels.close}
                      </Button>
                      <Button size={size} visualType="secondary" disabled={disabled} onClick={clearSearch}>
                        {labels.clear}
                      </Button>
                      <Button size={size} type="submit" formNoValidate={false} disabled={disabled}>
                        {labels.search}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    {loading && <p role="status">{labels.loading}</p>}
                    {hasError && <p role="alert">{labels.searchError}</p>}
                    {completedSearch && (
                      <div aria-label={labels.results}>
                        {!textMode && categoryState.draft !== completedSearch.input && <p>{labels.filtersChanged}</p>}
                        {!textMode && count !== undefined && <p>{labels.resultCount(count)}</p>}
                        {count === 0 ? (
                          <p>{labels.noResults}</p>
                        ) : (
                          category.renderResults({
                            value: completedSearch.input,
                            result: completedSearch.result,
                            selectResult,
                          })
                        )}
                      </div>
                    )}
                    <div className={styles['tedi-category-search__footer']}>
                      <Button size={size} visualType="link" onClick={closePanel}>
                        {labels.close}
                      </Button>
                      {textMode && hasError && (
                        <Button size={size} disabled={disabled} onClick={submitSearch}>
                          {labels.search}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </section>
            )}
            <span
              className={styles['tedi-category-search__sr-only']}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {panelVisible && !loading && !hasError && completedSearch
                ? `${category.label}: ${count !== undefined ? labels.resultCount(count) : labels.results}`
                : ''}
            </span>
          </>
        )}
      </div>
    );
  }
);

CategorySearch.displayName = 'CategorySearch';
export default CategorySearch;
