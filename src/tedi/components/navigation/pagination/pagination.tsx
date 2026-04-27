import cn from 'classnames';
import { useCallback, useId, useMemo, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { type ISelectOption, Select, type TSelectValue } from '../../form/select/select';
import styles from './pagination.module.scss';
import type { PaginationLabels, PaginationProps } from './pagination.types';
import { usePagination } from './use-pagination';

export const Pagination = (props: PaginationProps): JSX.Element => {
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
      results: (count) => `${count} ${getLabel('pagination.results', count)}`,
      pageSize: getLabel('pagination.page-size'),
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
      (pageSizeOptions ?? []).map((option) => ({
        value: String(option),
        label: String(option),
      })),
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

  const showResults = totalItems !== undefined;
  const showPageSizeSelect = Array.isArray(pageSizeOptions) && pageSizeOptions.length > 0;

  return (
    <div className={rootClassName} data-name="tedi-pagination">
      <div className={styles['tedi-pagination__slot-start']}>
        {showResults && (
          <Text className={styles['tedi-pagination__results']} color="secondary" modifiers="small">
            {mergedLabels.results(totalItems)}
          </Text>
        )}
      </div>

      <div className={styles['tedi-pagination__slot-center']}>
        {pageCount > 1 && (
          <nav aria-label={mergedLabels.ariaLabel} className={styles['tedi-pagination__nav']}>
            <ul className={styles['tedi-pagination__list']}>
              {items.map((item, index) => {
                if (item.type === 'ellipsis') {
                  return (
                    <li
                      key={`ellipsis-${index}`}
                      className={cn(styles['tedi-pagination__item'], styles['tedi-pagination__item--ellipsis'])}
                      aria-hidden="true"
                    >
                      …
                    </li>
                  );
                }

                if (item.type === 'previous' || item.type === 'next') {
                  const label = item.type === 'previous' ? mergedLabels.previous : mergedLabels.next;
                  const iconName = item.type === 'previous' ? 'arrow_back' : 'arrow_forward';
                  return (
                    <li key={item.type} className={styles['tedi-pagination__item']}>
                      <Button
                        type="button"
                        className={cn(styles['tedi-pagination__button'], styles['tedi-pagination__button--nav'])}
                        aria-label={label}
                        disabled={item.disabled}
                        onClick={() => item.page !== null && handlePageChange(item.page)}
                        noStyle
                      >
                        <Icon name={iconName} size={18} color="brand" />
                      </Button>
                    </li>
                  );
                }

                const pageNumber = item.page as number;
                return (
                  <li key={pageNumber} className={styles['tedi-pagination__item']}>
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
                      {pageNumber}
                    </Button>
                  </li>
                );
              })}
            </ul>
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
};

Pagination.displayName = 'Pagination';

export default Pagination;
