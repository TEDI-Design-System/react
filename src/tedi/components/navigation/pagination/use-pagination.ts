import type { PaginationItem, PaginationItemType } from './pagination.types';

export interface UsePaginationArgs {
  /** 1-based current page. */
  page: number;
  /** Total page count. */
  pageCount: number;
  /** Pages always shown at the very start and very end. */
  boundaryCount?: number;
  /** Pages shown on either side of the current page. */
  siblingCount?: number;
}

/**
 * Computes the ordered list of pagination items (previous, page-buttons, ellipsis, next)
 * using the boundary + sibling strategy popularised by MUI.
 *
 * Edge cases:
 * - `pageCount <= 0` → returns `[]` (nothing to render).
 * - `page` is clamped to `[1, pageCount]` before computation.
 * - Adjacent numeric pages never collapse into ellipsis (an ellipsis only appears
 *   when there is a true gap of ≥ 2).
 */
export function usePagination({
  page,
  pageCount,
  boundaryCount = 1,
  siblingCount = 1,
}: UsePaginationArgs): PaginationItem[] {
  if (pageCount <= 0) return [];

  const safeBoundary = Math.max(0, boundaryCount);
  const safeSibling = Math.max(0, siblingCount);
  const currentPage = Math.max(1, Math.min(pageCount, page));

  const range = (start: number, end: number): number[] => {
    if (end < start) return [];
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const startPages = range(1, Math.min(safeBoundary, pageCount));
  const endPages = range(Math.max(pageCount - safeBoundary + 1, safeBoundary + 1), pageCount);

  const siblingsStart = Math.max(
    Math.min(currentPage - safeSibling, pageCount - safeBoundary - safeSibling * 2 - 1),
    safeBoundary + 2
  );

  const siblingsEnd = Math.min(
    Math.max(currentPage + safeSibling, safeBoundary + safeSibling * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : pageCount - 1
  );

  const middle = range(siblingsStart, siblingsEnd);

  const pageList: (number | 'ellipsis')[] = [
    ...startPages,
    ...(siblingsStart > safeBoundary + 2
      ? ['ellipsis' as const]
      : safeBoundary + 1 < pageCount - safeBoundary
      ? [safeBoundary + 1]
      : []),
    ...middle,
    ...(siblingsEnd < pageCount - safeBoundary - 1
      ? ['ellipsis' as const]
      : pageCount - safeBoundary > safeBoundary
      ? [pageCount - safeBoundary]
      : []),
    ...endPages,
  ];

  const deduped: (number | 'ellipsis')[] = [];
  for (const entry of pageList) {
    const last = deduped[deduped.length - 1];
    if (entry === 'ellipsis' && last === 'ellipsis') continue;
    if (typeof entry === 'number' && entry === last) continue;
    deduped.push(entry);
  }

  const items: PaginationItem[] = [
    {
      type: 'previous' as PaginationItemType,
      page: currentPage > 1 ? currentPage - 1 : null,
      selected: false,
      disabled: currentPage <= 1,
    },
    ...deduped.map<PaginationItem>((entry) =>
      entry === 'ellipsis'
        ? { type: 'ellipsis', page: null, selected: false, disabled: true }
        : {
            type: 'page',
            page: entry,
            selected: entry === currentPage,
            disabled: false,
          }
    ),
    {
      type: 'next',
      page: currentPage < pageCount ? currentPage + 1 : null,
      selected: false,
      disabled: currentPage >= pageCount,
    },
  ];

  return items;
}
