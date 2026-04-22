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
   * Visual size of the buttons.
   * @default 'medium'
   */
  size?: 'medium' | 'small';
  /**
   * Override any of the default text labels / aria labels.
   */
  labels?: Partial<PaginationLabels>;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}
