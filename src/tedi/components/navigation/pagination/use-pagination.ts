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

const range = (start: number, end: number): number[] => {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

/**
 * Computes the ordered list of pagination items (previous, page-buttons,
 * ellipsis, next).
 *
 * The algorithm targets a stable slot count: for any `pageCount` larger than
 * the window size, the returned list always has the same number of page
 * entries (`boundaryCount * 2 + siblingCount * 2 + 3`). As the current page
 * moves toward a boundary, the corresponding ellipsis is swapped for an extra
 * adjacent page number rather than collapsing the list — the visual row does
 * not expand or contract as the user navigates.
 *
 * Edge cases:
 * - `pageCount <= 0` → returns `[]`.
 * - `page` is clamped to `[1, pageCount]` before computation.
 * - `pageCount <= window size` → every page is rendered, no ellipsis.
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

  // Constant number of page slots when the list is larger than the window.
  // Breakdown: boundary (start) + 1 ellipsis + sibling window (2*sibling+1) +
  // 1 ellipsis + boundary (end). Both ellipses are always present — near a
  // boundary the "ellipsis" slot is filled with a real page number instead.
  const windowSize = safeBoundary * 2 + safeSibling * 2 + 3;

  let pageList: (number | 'ellipsis')[];

  if (pageCount <= windowSize) {
    pageList = range(1, pageCount);
  } else {
    // Number of pages to render in the leading / trailing run when we skip an
    // ellipsis on that side (boundary already accounts for the "always shown"
    // end piece, plus one slot reclaimed from the missing ellipsis).
    const edgeRun = safeBoundary + safeSibling * 2 + 2;

    const startThreshold = safeBoundary + safeSibling + 2;
    const endThreshold = pageCount - safeBoundary - safeSibling - 1;

    if (currentPage <= startThreshold) {
      pageList = [...range(1, edgeRun), 'ellipsis', ...range(pageCount - safeBoundary + 1, pageCount)];
    } else if (currentPage >= endThreshold) {
      pageList = [...range(1, safeBoundary), 'ellipsis', ...range(pageCount - edgeRun + 1, pageCount)];
    } else {
      pageList = [
        ...range(1, safeBoundary),
        'ellipsis',
        ...range(currentPage - safeSibling, currentPage + safeSibling),
        'ellipsis',
        ...range(pageCount - safeBoundary + 1, pageCount),
      ];
    }
  }

  const items: PaginationItem[] = [
    {
      type: 'previous' as PaginationItemType,
      page: currentPage > 1 ? currentPage - 1 : null,
      selected: false,
      disabled: currentPage <= 1,
    },
    ...pageList.map<PaginationItem>((entry) =>
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
