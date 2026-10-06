import { autoUpdate, shift, size as sizePanel, useFloating } from '@floating-ui/react';
import cn from 'classnames';
import React, { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';

import { Icon } from '../../../../tedi/components/base/icon/icon';
import { Button } from '../../../../tedi/components/buttons/button/button';
import { EmptyState } from '../../../../tedi/components/content/empty-state/empty-state';
import { InputGroup } from '../../../../tedi/components/form/input-group/input-group';
import { Search } from '../../../../tedi/components/form/search/search';
import type { TextFieldForwardRef } from '../../../../tedi/components/form/textfield/textfield';
import { Dropdown } from '../../../../tedi/components/overlays/dropdown/dropdown';
import { Modal } from '../../../../tedi/components/overlays/modal/modal';
import { isBreakpointBelow, useBreakpoint } from '../../../../tedi/helpers';
import styles from './category-search.module.scss';
import type { CategorySearchCategory, CategorySearchLabels, CategorySearchProps } from './category-search.types';
import { useCategorySearch } from './use-category-search';

// Hidden labels reserve space for the widest category name.
function renderCategoryLabel(
  categories: readonly CategorySearchCategory[],
  selectedCategory: CategorySearchCategory,
  isMobile: boolean
) {
  if (isMobile) return selectedCategory.label;

  return categories.map((category) => {
    const selected = category.id === selectedCategory.id;

    return (
      <span
        key={category.id}
        aria-hidden={!selected}
        className={selected ? undefined : styles['tedi-category-search__category-label--hidden']}
      >
        {category.label}
      </span>
    );
  });
}

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
 * Search categories with independent drafts and results in a desktop panel or full-screen mobile modal.
 * The desktop panel is non-modal. Closing, switching categories, or changing presentation
 * preserves drafts and results; clearing or emptying text resets only the active category.
 */
export const CategorySearch = forwardRef<HTMLDivElement, CategorySearchProps>(
  (
    {
      categories,
      id,
      defaultCategoryId,
      defaultOpen = false,
      minimizeCounter,
      mobile,
      disabled = false,
      size = 'default',
      validationPosition = 'before',
      labels: labelOverrides,
      searchBarWidth = '100%',
      textResultsPanelWidth = '100%',
      fullWidthFilterPanel = false,
      maxPanelHeight = 'min(32rem, 70dvh)',
      className,
    },
    forwardedRef
  ) => {
    const breakpoint = useBreakpoint();
    const isMobile = mobile ?? isBreakpointBelow(breakpoint, 'md');
    const generatedId = useId();
    const rootId = id ?? `category-search-${generatedId}`;
    const panelId = `${rootId}-panel`;
    const labels = { ...defaultLabels, ...labelOverrides };
    const [categoryId, setCategoryId] = useState(defaultCategoryId ?? categories[0].id);
    const [open, setOpen] = useState(defaultOpen);
    const { states, changeDraft, search, clear, select } = useCategorySearch(categories);
    // Keep the filter view after the user opens it or validation brings it back.
    const [keepFiltersVisible, setKeepFiltersVisible] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<TextFieldForwardRef>(null);
    const previousMinimizeCounter = useRef(minimizeCounter);

    useEffect(() => {
      if (previousMinimizeCounter.current !== minimizeCounter) {
        previousMinimizeCounter.current = minimizeCounter;
        setOpen(false);
      }
    }, [minimizeCounter]);

    const category = categories.find((item) => item.id === categoryId) ?? categories[0];
    const categoryState = states.get(category.id)!;
    const completedSearch = categoryState.completedSearch;
    const loading = categoryState.status === 'loading';
    const hasError = categoryState.status === 'error';
    const hasSearch = Boolean(completedSearch || loading || hasError);
    const textMode = category.mode === 'search';
    const fullWidthPanel = !textMode && fullWidthFilterPanel;
    const hasValidationMessage = !textMode && Boolean(category.validationMessage);
    const canShowResults = hasSearch && !hasValidationMessage;
    const searchButton =
      category.showSearchButton === false ? undefined : { icon: 'search', size, disabled, 'aria-label': labels.search };

    useEffect(() => {
      if (open && hasValidationMessage && !keepFiltersVisible) {
        setKeepFiltersVisible(true);
      }
    }, [keepFiltersVisible, hasValidationMessage, open]);

    let panelView: 'closed' | 'filters' | 'results' = 'closed';
    if (open) {
      if (textMode) {
        if (categoryState.draft && hasSearch) panelView = 'results';
      } else if (canShowResults && !keepFiltersVisible) {
        panelView = 'results';
      } else {
        panelView = 'filters';
      }
    }
    const panelVisible = panelView !== 'closed';
    const count = completedSearch
      ? category.getResultCount?.(completedSearch.result) ??
        (Array.isArray(completedSearch.result) ? completedSearch.result.length : undefined)
      : undefined;
    const showEmptyState = count === 0 && !loading && !hasError;

    const { refs: panelRefs, floatingStyles: panelStyles } = useFloating<HTMLElement>({
      open: !isMobile && panelVisible,
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [
        textMode && shift(),
        sizePanel({
          apply({ rects, availableWidth, elements }) {
            // Text results may be wider; filter panels match their reference.
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
    } else if (canShowResults) {
      toggleLabel = labels.showResults;
      showResultCount = true;
    }

    useImperativeHandle(forwardedRef, () => rootRef.current as HTMLDivElement);

    function selectCategory(next: CategorySearchCategory) {
      if (disabled) return;
      if (next.id !== category.id) setKeepFiltersVisible(false);
      setCategoryId(next.id);
      setOpen(true);
    }

    function focusSearchControl() {
      if (textMode) searchRef.current?.input?.focus();
      else triggerRef.current?.focus();
    }

    function openMobile() {
      if (!disabled) setOpen(true);
    }

    function closePanel() {
      setOpen(false);
      if (!isMobile) focusSearchControl();
    }

    function clearSearch() {
      if (disabled) return;
      clear(category);
      setKeepFiltersVisible(hasValidationMessage);
      setOpen(true);
    }

    function changeQuery(query: string) {
      if (disabled) return;
      setOpen(isMobile || query.length > 0);

      if (!query) {
        clear(category);
        return;
      }

      changeDraft(category.id, query);
      // Use this change's text; categoryState.draft still belongs to the previous render.
      void search(category, query);
    }

    function selectResult(text: string) {
      if (!textMode || disabled) return;
      select(category.id, text);
      closePanel();
    }

    function submitSearch() {
      if (disabled || (textMode && !categoryState.draft)) return;
      // Recover focus before the submitted form or text retry button disappears.
      const panel = panelRef.current;
      if (!hasValidationMessage && panel?.contains(document.activeElement)) {
        if (textMode) focusSearchControl();
        else panel.focus();
      }
      setKeepFiltersVisible(false);
      setOpen(true);
      void search(category, categoryState.draft);
    }

    function toggleView() {
      if (panelView === 'closed') {
        setKeepFiltersVisible(hasValidationMessage);
        setOpen(true);
      } else if (panelView === 'results') {
        setKeepFiltersVisible(true);
      } else if (canShowResults) {
        setKeepFiltersVisible(false);
      } else {
        closePanel();
      }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (isMobile) return;
      if (event.key !== 'Escape' || event.defaultPrevented || !panelVisible) return;
      const target = event.target as HTMLElement;
      if (!rootRef.current?.contains(target)) return;
      // Let an open field dropdown handle Escape before the search panel does.
      if (target.closest('[role="combobox"][aria-expanded="true"]')) return;
      event.stopPropagation();
      event.preventDefault();
      closePanel();
    }

    const categorySelector = (
      <Dropdown
        defaultActiveIndex={categories.indexOf(category)}
        modal={false}
        placement="bottom-end"
        className={cn(styles['tedi-category-search__menu'], styles[`tedi-category-search__menu--${size}`])}
      >
        <Dropdown.Trigger>
          <Button noStyle size={size} disabled={disabled} aria-label={`${labels.category}: ${category.label}`}>
            <span className={styles['tedi-category-search__category-label']}>
              {renderCategoryLabel(categories, category, isMobile)}
            </span>
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
    );

    const searchBar = (
      <div
        ref={!isMobile && fullWidthPanel ? panelRefs.setReference : undefined}
        className={styles['tedi-category-search__bar']}
      >
        <InputGroup id={`${rootId}-input`} label={textMode ? labels.searchInput : null} hideLabel disabled={disabled}>
          <div
            ref={isMobile || fullWidthPanel ? undefined : panelRefs.setReference}
            className={styles['tedi-category-search__main']}
          >
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
                  onClear={focusSearchControl}
                  onSearch={submitSearch}
                  button={searchButton}
                  input={{
                    'aria-controls': panelVisible ? panelId : undefined,
                    onClick: () => {
                      if (!disabled && completedSearch) setOpen(true);
                    },
                  }}
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
                    onClick={() => {
                      clearSearch();
                      focusSearchControl();
                    }}
                  >
                    {labels.cancelFilter}
                  </Button>
                )}
              </div>
            )}
          </div>
          {!isMobile && (
            <InputGroup.Suffix className={styles['tedi-category-search__suffix']}>{categorySelector}</InputGroup.Suffix>
          )}
        </InputGroup>
      </div>
    );

    const panel = panelVisible && (
      <section
        id={panelId}
        ref={(node) => {
          panelRef.current = node;
          if (!isMobile) panelRefs.setFloating(node);
        }}
        style={isMobile ? undefined : panelStyles}
        tabIndex={-1}
        aria-label={`${category.label}: ${panelView === 'results' ? labels.results : labels.filter}`}
        className={isMobile ? undefined : styles['tedi-category-search__panel']}
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
              {validationPosition === 'before' && category.validationMessage}
              {category.renderFilters?.({
                values: categoryState.draft,
                onChange: (values) => changeDraft(category.id, values),
                disabled,
                size,
              })}
              {validationPosition === 'after' && category.validationMessage}
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
            {!loading && completedSearch && (
              <div aria-label={labels.results}>
                {!textMode && categoryState.draft !== completedSearch.input && <p>{labels.filtersChanged}</p>}
                {!textMode && count !== undefined && count > 0 && <p>{labels.resultCount(count)}</p>}
                {showEmptyState && <EmptyState type="inside">{labels.noResults}</EmptyState>}
                {count !== 0 &&
                  category.renderResults({
                    value: completedSearch.input,
                    result: completedSearch.result,
                    selectResult,
                  })}
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
    );

    const announcement = (
      <span className={styles['tedi-category-search__sr-only']} role="status" aria-live="polite" aria-atomic="true">
        {panelVisible && !loading && !hasError && completedSearch
          ? `${category.label}: ${count !== undefined ? labels.resultCount(count) : labels.results}`
          : ''}
      </span>
    );

    return (
      <div
        id={rootId}
        ref={rootRef}
        className={cn(styles['tedi-category-search'], styles[`tedi-category-search--${size}`], className)}
        style={
          {
            width: searchBarWidth,
            '--category-search-text-results-panel-width':
              typeof textResultsPanelWidth === 'number' ? `${textResultsPanelWidth}px` : textResultsPanelWidth,
            '--category-search-panel-max-height':
              typeof maxPanelHeight === 'number' ? `${maxPanelHeight}px` : maxPanelHeight,
          } as React.CSSProperties
        }
        onKeyDown={handleKeyDown}
      >
        {isMobile ? (
          <>
            <Search
              id={`${rootId}-opener`}
              label={labels.searchInput}
              hideLabel
              ariaLabel={category.label}
              value={textMode ? (categoryState.draft as string) : ''}
              placeholder={category.placeholder ?? category.label}
              size={size}
              disabled={disabled}
              isClearable={false}
              onClick={openMobile}
              onSearch={openMobile}
              input={{
                readOnly: true,
                'aria-haspopup': 'dialog',
                'aria-expanded': open,
              }}
              button={searchButton}
            />
            <Modal open={open} onToggle={setOpen}>
              <Modal.Content fullscreen="edge" returnFocus={previousMinimizeCounter.current === minimizeCounter}>
                <Modal.Header title={labels.searchInput} closeButtonProps={{ title: labels.close }} />
                <Modal.Body>
                  <div
                    className={cn(
                      styles['tedi-category-search'],
                      styles[`tedi-category-search--${size}`],
                      styles['tedi-category-search__mobile-body']
                    )}
                  >
                    <div className={styles['tedi-category-search__mobile-controls']}>
                      <div className={styles['tedi-category-search__suffix']}>{categorySelector}</div>
                      {searchBar}
                    </div>
                    {panel}
                    {announcement}
                  </div>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </>
        ) : (
          <>
            {searchBar}
            {panel}
            {announcement}
          </>
        )}
      </div>
    );
  }
);

CategorySearch.displayName = 'CategorySearch';
export default CategorySearch;
