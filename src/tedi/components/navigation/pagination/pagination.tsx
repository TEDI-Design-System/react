import cn from 'classnames';
import { forwardRef, useCallback, useId, useMemo, useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { type ISelectOption, Select, type TSelectValue } from '../../form/select/select';
import styles from './pagination.module.scss';
import { usePagination } from './use-pagination';

export type PaginationItemType = 'page' | 'previous' | 'next' | 'ellipsis';
export interface PaginationItem {
  type: PaginationItemType;
  page: number | null;
  selected: boolean;
  disabled: boolean;
}
export interface PaginationLabels {
  /**
   * Accessible label for the nav wrapper.
   * @default 'Pagination'
   */
  ariaLabel: string;
  /**
   * Previous button label (icon-only, used as aria-label).
   * @default 'Previous page'
   */
  previous: string;
  /**
   * Next button label (icon-only, used as aria-label).
   * @default 'Next page'
   */
  next: string;
  /**
   * Function that builds the aria-label for a numeric page button.
   * @default (page) => `Go to page ${page}`
   */
  pageAriaLabel: (page: number) => string;
  /**
   * Function that builds the aria-label for the currently active page.
   * @default (page) => `Current page, page ${page}`
   */
  currentPageAriaLabel: (page: number) => string;
  /**
   * Rendered to the left of the pagination nav when `totalItems` is set.
   * @default (count) => `${count} results`
   */
  results: (count: number) => string;
  /**
   * Prefix label for the page-size select.
   * @default 'Show per page'
   */
  pageSize: string;
  /**
   * Builds the message announced to screen readers (via a visually-hidden
   * `aria-live="polite"` region) whenever the current page changes. Lets SR
   * users know that the page transition happened without sighted feedback.
   * @default (page, pageCount) => `Page ${page} of ${pageCount}`
   */
  pageStatus: (page: number, pageCount: number) => string;
}
export interface PaginationProps {
  /**
   * Total number of pages.
   */
  pageCount: number;
  /**
   * Controlled current page (1-based). Pair with `onPageChange`.
   */
  page?: number;
  /**
   * Initial page for uncontrolled mode (1-based).
   * @default 1
   */
  defaultPage?: number;
  /**
   * Fires whenever the user navigates to a different page.
   */
  onPageChange?: (page: number) => void;
  /**
   * Total number of items across all pages. Renders a "{count} results" label
   * to the left of the nav when set.
   */
  totalItems?: number;
  /**
   * Current page size. Shown in the page-size select when
   * `pageSizeOptions` is provided.
   */
  pageSize?: number;
  /**
   * Options for the page-size select. Omit to hide the select.
   */
  pageSizeOptions?: number[];
  /**
   * Fires when the user picks a different page size.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Number of pages always shown at the start and end of the range before
   * ellipsis kicks in.
   * @default 1
   */
  boundaryCount?: number;
  /**
   * Number of sibling pages shown on either side of the current page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Override any of the default text labels / aria labels.
   */
  labels?: Partial<PaginationLabels>;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref): JSX.Element => {
  const {
    pageCount,
    page,
    defaultPage = 1,
    onPageChange,
    totalItems,
    pageSize,
    pageSizeOptions,
    onPageSizeChange,
    boundaryCount = 1,
    siblingCount = 1,
    labels,
    className,
  } = props;

  const { getLabel } = useLabels();

  const mergedLabels = useMemo<PaginationLabels>(
    () => ({
      ariaLabel: getLabel('pagination.title'),
      previous: getLabel('pagination.prev-page'),
      next: getLabel('pagination.next-page'),
      pageAriaLabel: (pageNumber) => getLabel('pagination.page', pageNumber, false),
      currentPageAriaLabel: (pageNumber) => getLabel('pagination.page', pageNumber, true),
      results: (count) => getLabel('pagination.results', count),
      pageSize: getLabel('pagination.page-size'),
      pageStatus: (pageNumber, total) => getLabel('pagination.page-status', pageNumber, total),
      ...labels,
    }),
    [getLabel, labels]
  );

  const [uncontrolledPage, setUncontrolledPage] = useState<number>(defaultPage);
  const currentPage = page ?? uncontrolledPage;

  const items = usePagination({ page: currentPage, pageCount, boundaryCount, siblingCount });

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage === currentPage || nextPage < 1 || nextPage > pageCount) return;
      if (page === undefined) setUncontrolledPage(nextPage);
      onPageChange?.(nextPage);
    },
    [currentPage, onPageChange, page, pageCount]
  );

  const selectId = useId();

  const pageSizeSelectOptions = useMemo<ISelectOption[]>(
    () =>
      Array.isArray(pageSizeOptions)
        ? pageSizeOptions.map((option) => ({
            value: String(option),
            label: String(option),
          }))
        : [],
    [pageSizeOptions]
  );

  const currentPageSizeOption = useMemo<ISelectOption | null>(() => {
    if (pageSize === undefined) return pageSizeSelectOptions[0] ?? null;
    return pageSizeSelectOptions.find((option) => option.value === String(pageSize)) ?? null;
  }, [pageSize, pageSizeSelectOptions]);

  const handlePageSizeChange = useCallback(
    (value: TSelectValue) => {
      const option = Array.isArray(value) ? value[0] : value;
      if (option && 'value' in option) {
        onPageSizeChange?.(Number(option.value));
      }
    },
    [onPageSizeChange]
  );

  const rootClassName = cn(styles['tedi-pagination'], className);

  const breakpoint = useBreakpoint();
  const isMobile = isBreakpointBelow(breakpoint, 'md');

  const showResults = totalItems !== undefined;
  const showPageSizeSelect = !isMobile && Array.isArray(pageSizeOptions) && pageSizeOptions.length > 0;

  const previousItem = items[0];
  const nextItem = items[items.length - 1];
  const pageItems = items.slice(1, -1);

  const renderArrow = (item: PaginationItem) => {
    const label = item.type === 'previous' ? mergedLabels.previous : mergedLabels.next;
    const iconName = item.type === 'previous' ? 'arrow_back' : 'arrow_forward';

    return (
      <Button
        type="button"
        className={cn(
          styles['tedi-pagination__button'],
          styles['tedi-pagination__button--nav'],
          styles[`tedi-pagination__button--nav-${item.type}`]
        )}
        aria-label={label}
        disabled={item.disabled}
        onClick={() => item.page !== null && handlePageChange(item.page)}
        noStyle
      >
        <Icon name={iconName} size={18} color="brand" />
      </Button>
    );
  };

  // Dropdown options carry plain page numbers — "1", "2", "3" — so the open menu reads as
  // a clean list of jump targets rather than repeating the total on every row.
  const pageJumpOptions = useMemo<ISelectOption[]>(
    () =>
      Array.from({ length: pageCount }, (_, idx) => {
        const pageNumber = idx + 1;
        return { value: String(pageNumber), label: String(pageNumber) };
      }),
    [pageCount]
  );

  // The trigger (closed-state value) shows the current page in context — "1 / 10" — so the
  // user can see at a glance where they are and how many pages exist. react-select picks
  // the active option in the dropdown by `value` equality, so the divergent label is OK.
  const currentPageJumpOption = useMemo<ISelectOption | null>(
    () => ({ value: String(currentPage), label: `${currentPage} / ${pageCount}` }),
    [currentPage, pageCount]
  );

  const handlePageJumpChange = useCallback(
    (value: TSelectValue) => {
      const option = Array.isArray(value) ? value[0] : value;
      if (option && 'value' in option) {
        handlePageChange(Number(option.value));
      }
    },
    [handlePageChange]
  );

  return (
    <div ref={ref} className={rootClassName} data-name="tedi-pagination">
      <span className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {pageCount > 1 ? mergedLabels.pageStatus(currentPage, pageCount) : ''}
      </span>

      <div className={styles['tedi-pagination__slot-start']} role="status" aria-live="polite" aria-atomic="true">
        {showResults && (
          <Text className={styles['tedi-pagination__results']} color="secondary" modifiers="small">
            {mergedLabels.results(totalItems)}
          </Text>
        )}
      </div>

      <div className={styles['tedi-pagination__slot-center']}>
        {pageCount > 1 && (
          <nav aria-label={mergedLabels.ariaLabel} className={styles['tedi-pagination__nav']}>
            {renderArrow(previousItem)}

            {!isMobile && (
              <ul className={styles['tedi-pagination__list']}>
                {pageItems.map((item, index) => {
                  // Slot-based keys so React reuses the same `<li>` / `<button>` DOM across
                  // renders. With page-number keys, every threshold crossing was
                  // unmounting buttons and the `transition: all 250ms` on background /
                  // colour never fired — the new buttons just rendered in their final state.
                  // Reusing the DOM lets the `--selected` class change animate smoothly.
                  const slotKey = `slot-${index}`;
                  if (item.type === 'ellipsis') {
                    return (
                      <li
                        key={slotKey}
                        className={cn(styles['tedi-pagination__item'], styles['tedi-pagination__item--ellipsis'])}
                        aria-hidden="true"
                      >
                        …
                      </li>
                    );
                  }

                  const pageNumber = item.page as number;
                  return (
                    <li key={slotKey} className={styles['tedi-pagination__item']}>
                      <Button
                        type="button"
                        className={cn(styles['tedi-pagination__button'], {
                          [styles['tedi-pagination__button--selected']]: item.selected,
                        })}
                        aria-label={
                          item.selected
                            ? mergedLabels.currentPageAriaLabel(pageNumber)
                            : mergedLabels.pageAriaLabel(pageNumber)
                        }
                        aria-current={item.selected ? 'page' : undefined}
                        onClick={() => handlePageChange(pageNumber)}
                        noStyle
                      >
                        {/* Inner span keyed by page number — when the slot's label
                            changes (e.g. "5" → "4" at a threshold crossing) the span
                            remounts and CSS fades the new digit in over the slot's
                            persistent surface colour. Avoids the instant-flip feel. */}
                        <span key={pageNumber} className={styles['tedi-pagination__button-label']}>
                          {pageNumber}
                        </span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}

            {isMobile && (
              <div className={styles['tedi-pagination__page-jump']}>
                <Select
                  id={`tedi-pagination-jump-${selectId}`}
                  className={styles['tedi-pagination__page-jump-select']}
                  label={mergedLabels.ariaLabel}
                  hideLabel
                  size="small"
                  options={pageJumpOptions}
                  value={currentPageJumpOption}
                  onChange={handlePageJumpChange}
                  isSearchable={false}
                  isClearable={false}
                />
              </div>
            )}

            {renderArrow(nextItem)}
          </nav>
        )}
      </div>

      <div className={styles['tedi-pagination__slot-end']}>
        {showPageSizeSelect && (
          <div className={styles['tedi-pagination__page-size']}>
            <Text
              className={styles['tedi-pagination__page-size-label']}
              color="secondary"
              modifiers="small"
              element="span"
            >
              {mergedLabels.pageSize}
            </Text>
            <Select
              id={`tedi-pagination-page-size-${selectId}`}
              className={styles['tedi-pagination__select']}
              label={mergedLabels.pageSize}
              hideLabel
              size="small"
              options={pageSizeSelectOptions}
              value={currentPageSizeOption}
              onChange={handlePageSizeChange}
              isSearchable={false}
              isClearable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
