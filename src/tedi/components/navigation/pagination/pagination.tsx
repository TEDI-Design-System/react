import cn from 'classnames';
import { forwardRef, type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import {
  type Breakpoint,
  type BreakpointSupport,
  isBreakpointBelow,
  useBreakpoint,
  useBreakpointProps,
} from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { type ISelectOption, Select, type TSelectValue } from '../../form/select/select';
import styles from './pagination.module.scss';
import {
  PaginationMobileModal,
  type PaginationMobileModalOption,
} from './pagination-mobile-modal/pagination-mobile-modal';
import { usePagination } from './use-pagination';

export type PaginationItemType = 'page' | 'previous' | 'next' | 'ellipsis';
export interface PaginationItem {
  type: PaginationItemType;
  page: number | null;
  selected: boolean;
  disabled: boolean;
}

export type PaginationBackground = 'white' | 'transparent';
export type PaginationBorders = 'top' | 'bottom' | 'both' | 'none';
export type PaginationVisibility = boolean | Exclude<Breakpoint, 'xs'>;

export interface PaginationPageSizeOption {
  value: number;
  label: string;
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
   * Returns any React node, so consumers can mix copy with formatting markup
   * (e.g. a bold count or a status badge) — not just a plain string.
   * @default (count) => `${count} results`
   */
  results: (count: number) => ReactNode;
  /**
   * Prefix label for the page-size select.
   * @default 'Show per page'
   */
  pageSize: string;
  /**
   * Announcement for the polite aria-live region when the page changes.
   * Lets screen reader users know they moved without stealing focus.
   * @default (page, total) => `Page ${page} of ${total}`
   */
  pageStatus: (page: number, pageCount: number) => string;
}

type PaginationBreakpointProps = {
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
   * Background variant. `transparent` removes the surface fill — use it when
   * pagination sits on a non-white container. Border behaviour is controlled
   * separately via `borders`.
   * @default white
   */
  background?: PaginationBackground;
  /**
   * Where the separator border is drawn around the pagination strip:
   * - `'top'` (default) — separator above only (typical "table then pager"
   *   layout).
   * - `'both'` — separator above and below (split layout where the pager is
   *   sandwiched between content rows, e.g. a fixed header table + a footer
   *   beneath the pager).
   * - `'none'` — borderless, for embedded contexts where the outer container
   *   already provides framing.
   *
   * Ignored when `background='transparent'` — that variant is always borderless.
   * @default top
   */
  borders?: PaginationBorders;
  /**
   * Keep the Previous / Next buttons visible even when they would be disabled
   * (Previous on the first page, Next on the last). Default `false` drops the
   * disabled edge button entirely — compact layout. Set `true` to keep both
   * buttons rendered (disabled) at the edges so the pager width stays stable.
   * @default false
   */
  showPrevNextButtons?: boolean;
  /**
   * Show the textual `previous` / `next` labels alongside the arrow icons on
   * the edge nav buttons. The labels are sourced from `labels.previous` /
   * `labels.next` (or the corresponding i18n keys). Default keeps the
   * icon-only Figma variant.
   *
   * When set, the arrows render as small text links (label + icon, link
   * colour, underline on hover) rather than circular icon buttons —
   * `arrowVariant` is ignored in this mode.
   * @default false
   */
  showEdgeNavLabels?: boolean;
  /**
   * Material icon name for the Previous arrow. Override to swap the default
   * chevron (e.g. `'first_page'`, `'chevron_left'`).
   * @default 'arrow_back'
   */
  previousIcon?: string;
  /**
   * Material icon name for the Next arrow.
   * @default 'arrow_forward'
   */
  nextIcon?: string;
  /**
   * Visual treatment of the prev/next arrow buttons:
   * - `'default'` — brand-coloured icon on a transparent circle (light tint on
   *   hover); pair with `showEdgeNavLabels` for the small-link style.
   * - `'primary'` — a primary small `Button` with the label text and a leading
   *   (previous) / trailing (next) arrow icon, for prominent navigation. The
   *   text label is always shown, so `showEdgeNavLabels` has no effect here.
   * @default default
   */
  arrowVariant?: 'default' | 'primary';
};

export interface PaginationProps extends BreakpointSupport<PaginationBreakpointProps> {
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
   * Options for the page-size select. Omit to hide the select. Accepts plain numbers, or
   * `{ value, label }` objects when the visible text should differ from the value — e.g. a
   * "Show all" entry `{ value: totalItems, label: 'Show all' }`. Selecting an option emits its
   * `value` via `onPageSizeChange`; the pager collapses once the consumer recomputes `pageCount` to 1.
   */
  pageSizeOptions?: (number | PaginationPageSizeOption)[];
  /**
   * Fires when the user picks a different page size.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Override any of the default text labels / aria labels.
   */
  labels?: Partial<PaginationLabels>;
  /**
   * Hide the "X results" label even when `totalItems` is set. Pass a
   * breakpoint name (e.g. `"md"`) to hide only below that breakpoint.
   * @default false
   */
  hideResults?: PaginationVisibility;
  /**
   * Hide the page-size dropdown even when `pageSizeOptions` is non-empty.
   * Pass a breakpoint name to hide only below that breakpoint.
   * @default false
   */
  hidePageSize?: PaginationVisibility;
  /**
   * Hide the pager (prev/next + page list). Pass a breakpoint name to hide
   * only below that breakpoint.
   * @default false
   */
  hidePager?: PaginationVisibility;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}

const BREAKPOINT_ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const resolveVisibility = (value: PaginationVisibility | undefined, current: Breakpoint | null): boolean => {
  if (value === undefined || value === false) return false;
  if (value === true) return true;
  if (!current) return false;
  return BREAKPOINT_ORDER.indexOf(current) < BREAKPOINT_ORDER.indexOf(value);
};

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
    labels,
    hideResults = false,
    hidePageSize = false,
    hidePager = false,
    className,
  } = props;

  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    boundaryCount = 1,
    siblingCount = 1,
    background = 'white',
    borders = 'top',
    showPrevNextButtons = false,
    showEdgeNavLabels = false,
    previousIcon = 'arrow_back',
    nextIcon = 'arrow_forward',
    arrowVariant = 'default',
  } = getCurrentBreakpointProps<PaginationBreakpointProps>(props);

  const { getLabel } = useLabels();
  const breakpoint = useBreakpoint();
  const useCompactPicker = isBreakpointBelow(breakpoint, 'md');

  const mergedLabels = useMemo<PaginationLabels>(
    () => ({
      ariaLabel: getLabel('pagination.title'),
      previous: getLabel('pagination.prev-page'),
      next: getLabel('pagination.next-page'),
      pageAriaLabel: (pageNumber) => getLabel('pagination.page', pageNumber, false),
      currentPageAriaLabel: (pageNumber) => getLabel('pagination.page', pageNumber, true),
      results: (count) => getLabel('pagination.results', count),
      pageSize: getLabel('pagination.page-size'),
      pageStatus: (current, total) => getLabel('pagination.page-status', current, total),
      ...labels,
    }),
    [getLabel, labels]
  );

  const [uncontrolledPage, setUncontrolledPage] = useState<number>(defaultPage);
  const rawPage = page ?? uncontrolledPage;
  const currentPage = pageCount > 0 ? Math.max(1, Math.min(pageCount, rawPage)) : 1;

  useEffect(() => {
    if (page !== undefined) return;
    if (pageCount > 0 && uncontrolledPage > pageCount) {
      setUncontrolledPage(pageCount);
    } else if (uncontrolledPage < 1) {
      setUncontrolledPage(1);
    }
  }, [page, pageCount, uncontrolledPage]);

  const items = usePagination({ page: currentPage, pageCount, boundaryCount, siblingCount });

  const handlePageChange = useCallback(
    (nextPage: number | null) => {
      if (nextPage === null) return;
      if (nextPage === currentPage || nextPage < 1 || nextPage > pageCount) return;
      if (page === undefined) setUncontrolledPage(nextPage);
      onPageChange?.(nextPage);
    },
    [currentPage, onPageChange, page, pageCount]
  );

  const selectId = useId();

  const normalizedPageSizeOptions = useMemo<PaginationPageSizeOption[]>(
    () =>
      Array.isArray(pageSizeOptions)
        ? pageSizeOptions.map((option) =>
            typeof option === 'number' ? { value: option, label: String(option) } : option
          )
        : [],
    [pageSizeOptions]
  );

  const pageSizeSelectOptions = useMemo<ISelectOption[]>(
    () => normalizedPageSizeOptions.map((option) => ({ value: String(option.value), label: option.label })),
    [normalizedPageSizeOptions]
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

  const currentPageSizeValue = currentPageSizeOption ? Number(currentPageSizeOption.value) : pageSize ?? 0;

  const currentPageSizeLabel =
    normalizedPageSizeOptions.find((option) => option.value === pageSize)?.label ??
    (pageSize !== undefined ? String(pageSize) : '');

  const pageOptions = useMemo<PaginationMobileModalOption[]>(
    () =>
      Array.from({ length: pageCount }, (_, index) => {
        const value = index + 1;
        return {
          value,
          label: String(value),
          ariaLabel:
            value === currentPage ? mergedLabels.currentPageAriaLabel(value) : mergedLabels.pageAriaLabel(value),
        };
      }),
    [pageCount, currentPage, mergedLabels]
  );

  const pageSizeModalOptions = useMemo<PaginationMobileModalOption[]>(
    () =>
      normalizedPageSizeOptions.map((option) => ({
        value: option.value,
        label: option.label,
        ariaLabel: `${mergedLabels.pageSize} ${option.label}`,
      })),
    [normalizedPageSizeOptions, mergedLabels]
  );

  const isResultsHidden = resolveVisibility(hideResults, breakpoint);
  const isPageSizeHidden = resolveVisibility(hidePageSize, breakpoint);
  const isPagerHidden = resolveVisibility(hidePager, breakpoint);

  const showResults = !isResultsHidden && totalItems !== undefined;
  const showPageSizeSelect = !isPageSizeHidden && Array.isArray(pageSizeOptions) && pageSizeOptions.length > 0;
  const showPager = !isPagerHidden && pageCount > 1;

  const rootClassName = cn(
    styles['tedi-pagination'],
    styles[`tedi-pagination--bg-${background}`],
    background !== 'transparent' && styles[`tedi-pagination--borders-${borders}`],
    {
      [styles['tedi-pagination--no-pager']]: !showPager,
      [styles['tedi-pagination--no-results']]: !showResults,
      [styles['tedi-pagination--no-page-size']]: !showPageSizeSelect,
    },
    className
  );

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);

  const prevModalOpenRef = useRef(isMobileModalOpen);
  useEffect(() => {
    if (prevModalOpenRef.current && !isMobileModalOpen) {
      mobileTriggerRef.current?.focus();
    }
    prevModalOpenRef.current = isMobileModalOpen;
  }, [isMobileModalOpen]);

  const [isPageSizeModalOpen, setIsPageSizeModalOpen] = useState(false);
  const pageSizeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const prevPageSizeModalOpenRef = useRef(isPageSizeModalOpen);
  useEffect(() => {
    if (prevPageSizeModalOpenRef.current && !isPageSizeModalOpen) {
      pageSizeTriggerRef.current?.focus();
    }
    prevPageSizeModalOpenRef.current = isPageSizeModalOpen;
  }, [isPageSizeModalOpen]);

  const statusText = pageCount > 1 ? mergedLabels.pageStatus(currentPage, pageCount) : '';
  const mobileTriggerLabel = `${currentPage} / ${pageCount}`;
  const mobileTriggerAriaLabel = `${mobileTriggerLabel}, ${mergedLabels.ariaLabel}`;

  const previousItem = items[0];
  const nextItem = items[items.length - 1];
  const pageItems = items.slice(1, -1);

  const renderEdgeButton = (
    side: 'previous' | 'next',
    item: PaginationItem | undefined,
    icon: string,
    label: string
  ) => {
    const sideClass = styles[`tedi-pagination__button--nav-${side}`];

    if (arrowVariant === 'primary') {
      return (
        <Button
          type="button"
          visualType="primary"
          size="small"
          iconLeft={side === 'previous' ? icon : undefined}
          iconRight={side === 'next' ? icon : undefined}
          className={sideClass}
          disabled={item?.disabled}
          onClick={() => handlePageChange(item?.page ?? null)}
        >
          {label}
        </Button>
      );
    }

    const iconNode = <Icon name={icon} size={18} color="inherit" />;
    const labelNode = showEdgeNavLabels ? <span className={styles['tedi-pagination__nav-label']}>{label}</span> : null;

    return (
      <Button
        type="button"
        className={cn(styles['tedi-pagination__button'], styles['tedi-pagination__button--nav'], sideClass, {
          [styles['tedi-pagination__button--nav-link']]: showEdgeNavLabels,
        })}
        aria-label={label}
        disabled={item?.disabled}
        onClick={() => handlePageChange(item?.page ?? null)}
        noStyle
      >
        {side === 'previous' ? (
          <>
            {iconNode}
            {labelNode}
          </>
        ) : (
          <>
            {labelNode}
            {iconNode}
          </>
        )}
      </Button>
    );
  };

  return (
    <div ref={ref} className={rootClassName} data-name="tedi-pagination">
      <span className={styles['tedi-pagination__status']} role="status" aria-live="polite" aria-atomic="true">
        {statusText}
      </span>

      <div className={styles['tedi-pagination__slot-start']}>
        {showResults && (
          <Text className={styles['tedi-pagination__results']} color="secondary" modifiers="small">
            {mergedLabels.results(totalItems!)}
          </Text>
        )}
      </div>

      <div className={styles['tedi-pagination__slot-center']}>
        {showPager && (
          <nav aria-label={mergedLabels.ariaLabel} className={styles['tedi-pagination__nav']}>
            {!showPrevNextButtons && previousItem?.disabled
              ? null
              : renderEdgeButton('previous', previousItem, previousIcon, mergedLabels.previous)}

            {!useCompactPicker && (
              <ul className={styles['tedi-pagination__list']}>
                {pageItems.map((item, index) => {
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
                        <span key={pageNumber} className={styles['tedi-pagination__button-label']}>
                          {pageNumber}
                        </span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}

            {useCompactPicker && (
              <button
                ref={mobileTriggerRef}
                type="button"
                className={styles['tedi-pagination__mobile-trigger']}
                aria-haspopup="dialog"
                aria-expanded={isMobileModalOpen}
                aria-label={mobileTriggerAriaLabel}
                onClick={() => setIsMobileModalOpen(true)}
              >
                <span className={styles['tedi-pagination__mobile-trigger-label']} aria-hidden="true">
                  <strong>{currentPage}</strong>
                  <span>/</span>
                  <span>{pageCount}</span>
                </span>
                <Icon name="arrow_drop_down" size={24} color="inherit" />
              </button>
            )}

            {!showPrevNextButtons && nextItem?.disabled
              ? null
              : renderEdgeButton('next', nextItem, nextIcon, mergedLabels.next)}
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
            {useCompactPicker ? (
              <button
                ref={pageSizeTriggerRef}
                type="button"
                className={styles['tedi-pagination__mobile-trigger']}
                aria-haspopup="dialog"
                aria-expanded={isPageSizeModalOpen}
                aria-label={`${mergedLabels.pageSize} ${currentPageSizeLabel}`}
                onClick={() => setIsPageSizeModalOpen(true)}
              >
                <span className={styles['tedi-pagination__mobile-trigger-label']} aria-hidden="true">
                  {currentPageSizeLabel}
                </span>
                <Icon name="arrow_drop_down" size={24} color="inherit" />
              </button>
            ) : (
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
            )}
          </div>
        )}
      </div>

      {useCompactPicker && showPager && (
        <PaginationMobileModal
          open={isMobileModalOpen}
          onOpenChange={setIsMobileModalOpen}
          options={pageOptions}
          selectedValue={currentPage}
          onSelect={handlePageChange}
          ariaLabel={mergedLabels.ariaLabel}
          ariaCurrent="page"
        />
      )}

      {useCompactPicker && showPageSizeSelect && (
        <PaginationMobileModal
          open={isPageSizeModalOpen}
          onOpenChange={setIsPageSizeModalOpen}
          options={pageSizeModalOptions}
          selectedValue={currentPageSizeValue}
          onSelect={(value) => onPageSizeChange?.(value)}
          ariaLabel={mergedLabels.pageSize}
          title={mergedLabels.pageSize}
        />
      )}
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
