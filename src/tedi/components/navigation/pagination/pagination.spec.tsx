import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { useState } from 'react';

import { Pagination } from './pagination';
import { usePagination } from './use-pagination';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string, ...args: unknown[]) => {
      switch (key) {
        case 'pagination.title':
          return 'Pagination';
        case 'pagination.prev-page':
          return 'Previous page';
        case 'pagination.next-page':
          return 'Next page';
        case 'pagination.page': {
          const [page, isCurrent] = args as [number, boolean];
          return isCurrent ? `Current page, page ${page}` : `Go to page ${page}`;
        }
        case 'pagination.results': {
          const [count] = args as [number];
          return count === 1 ? 'result' : 'results';
        }
        case 'pagination.page-size':
          return 'Page size';
        default:
          return key;
      }
    },
  }),
}));

describe('usePagination', () => {
  it('returns an empty list when pageCount is 0', () => {
    expect(usePagination({ page: 1, pageCount: 0 })).toEqual([]);
  });

  it('renders every page when pageCount is small enough', () => {
    const items = usePagination({ page: 2, pageCount: 4 });
    const pages = items.filter((item) => item.type === 'page').map((item) => item.page);
    expect(pages).toEqual([1, 2, 3, 4]);
    expect(items.some((item) => item.type === 'ellipsis')).toBe(false);
  });

  it('inserts an ellipsis on each side when the active page is in the middle', () => {
    const items = usePagination({ page: 20, pageCount: 40, boundaryCount: 1, siblingCount: 1 });
    const ellipses = items.filter((item) => item.type === 'ellipsis');
    expect(ellipses).toHaveLength(2);
  });

  it('marks the current page as selected', () => {
    const items = usePagination({ page: 3, pageCount: 10 });
    const selected = items.find((item) => item.selected);
    expect(selected?.page).toBe(3);
  });

  it('clamps out-of-range page inputs', () => {
    const low = usePagination({ page: -5, pageCount: 10 });
    const high = usePagination({ page: 99, pageCount: 10 });

    expect(low.find((i) => i.selected)?.page).toBe(1);
    expect(high.find((i) => i.selected)?.page).toBe(10);
  });

  it('disables the Previous button on the first page and Next on the last', () => {
    const first = usePagination({ page: 1, pageCount: 10 });
    const last = usePagination({ page: 10, pageCount: 10 });

    expect(first[0]).toEqual(expect.objectContaining({ type: 'previous', disabled: true }));
    expect(last[last.length - 1]).toEqual(expect.objectContaining({ type: 'next', disabled: true }));
  });

  it('produces the same number of slots for every page when pageCount exceeds the window', () => {
    const pageCount = 30;
    const counts = new Set(
      Array.from({ length: pageCount }, (_, index) => usePagination({ page: index + 1, pageCount }).length)
    );
    expect(counts.size).toBe(1);
  });

  it('keeps the slot count constant with custom boundary + sibling counts', () => {
    const counts = new Set(
      Array.from(
        { length: 25 },
        (_, index) => usePagination({ page: index + 1, pageCount: 25, boundaryCount: 2, siblingCount: 2 }).length
      )
    );
    expect(counts.size).toBe(1);
  });

  it('swaps the ellipsis for an extra page number when near the start boundary', () => {
    const nearStart = usePagination({ page: 2, pageCount: 20 });
    const middle = usePagination({ page: 10, pageCount: 20 });

    const ellipsesAtStart = nearStart.filter((item) => item.type === 'ellipsis').length;
    const ellipsesAtMiddle = middle.filter((item) => item.type === 'ellipsis').length;

    expect(ellipsesAtStart).toBe(1);
    expect(ellipsesAtMiddle).toBe(2);
    expect(nearStart.length).toBe(middle.length);
  });
});

describe('Pagination component', () => {
  it('renders numeric page buttons and marks the current one with aria-current', () => {
    render(<Pagination pageCount={5} defaultPage={3} />);

    const current = screen.getByRole('button', { name: /Current page, page 3/i });
    expect(current).toHaveAttribute('aria-current', 'page');

    expect(screen.getByRole('button', { name: /Go to page 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to page 5/i })).toBeInTheDocument();
  });

  it('renders Previous + Next nav buttons', () => {
    render(<Pagination pageCount={5} defaultPage={3} />);
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next page/i })).toBeInTheDocument();
  });

  it('fires onPageChange when a page button is clicked (uncontrolled)', () => {
    const onPageChange = jest.fn();
    render(<Pagination pageCount={5} defaultPage={1} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /Go to page 3/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    expect(screen.getByRole('button', { name: /Current page, page 3/i })).toBeInTheDocument();
  });

  it('respects controlled page and only updates when the prop changes', () => {
    const Wrapper = () => {
      const [page, setPage] = useState(2);
      return (
        <>
          <button type="button" onClick={() => setPage(4)}>
            jump
          </button>
          <Pagination pageCount={5} page={page} onPageChange={setPage} />
        </>
      );
    };

    render(<Wrapper />);
    expect(screen.getByRole('button', { name: /Current page, page 2/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'jump' }));
    expect(screen.getByRole('button', { name: /Current page, page 4/i })).toBeInTheDocument();
  });

  it('disables Previous on the first page and Next on the last', () => {
    const { rerender } = render(<Pagination pageCount={3} page={1} />);
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Next page/i })).toBeEnabled();

    rerender(<Pagination pageCount={3} page={3} />);
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Next page/i })).toBeDisabled();
  });

  it('Previous / Next move the current page by one', () => {
    const onPageChange = jest.fn();
    render(<Pagination pageCount={5} defaultPage={2} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /Next page/i }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);

    fireEvent.click(screen.getByRole('button', { name: /Previous page/i }));
    expect(onPageChange).toHaveBeenLastCalledWith(2);
  });

  it('renders ellipses for large page counts', () => {
    const { container } = render(<Pagination pageCount={30} defaultPage={15} />);
    const ellipses = container.querySelectorAll('[aria-hidden="true"]');
    expect(ellipses.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the results label when totalItems is set', () => {
    render(<Pagination pageCount={10} defaultPage={1} totalItems={97} />);
    expect(screen.getByText('97 results')).toBeInTheDocument();
  });

  it('allows overriding labels for localisation', () => {
    render(
      <Pagination
        pageCount={5}
        defaultPage={1}
        totalItems={28}
        labels={{
          previous: 'Eelmine',
          next: 'Järgmine',
          results: (count) => `${count} tulemust`,
        }}
      />
    );

    expect(screen.getByRole('button', { name: 'Eelmine' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Järgmine' })).toBeInTheDocument();
    expect(screen.getByText('28 tulemust')).toBeInTheDocument();
  });

  it('renders the page-size selector when pageSizeOptions is provided', async () => {
    const onPageSizeChange = jest.fn();
    render(
      <Pagination
        pageCount={5}
        defaultPage={1}
        pageSize={25}
        pageSizeOptions={[10, 25, 50]}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const combobox = screen.getByRole('combobox', { name: /Page size/i });
    expect(combobox).toBeInTheDocument();
    // The current page size label is rendered inside the Select
    expect(screen.getByText('25')).toBeInTheDocument();

    await act(async () => {
      combobox.focus();
      fireEvent.keyDown(combobox, { key: 'ArrowDown', code: 'ArrowDown' });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByText('50'));
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });

  it('omits the page-size selector when pageSizeOptions is empty', () => {
    render(<Pagination pageCount={5} defaultPage={1} pageSizeOptions={[]} />);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('does not render the nav when pageCount <= 1', () => {
    render(<Pagination pageCount={1} defaultPage={1} totalItems={3} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    // results label still renders
    expect(screen.getByText('3 results')).toBeInTheDocument();
  });

  it('applies the medium size class when size="medium"', () => {
    const { container } = render(<Pagination pageCount={3} defaultPage={1} size="medium" />);
    const nav = container.querySelector('[data-name="tedi-pagination"]');
    expect(nav?.className).toMatch(/--medium/);
  });

  it('applies a custom className', () => {
    const { container } = render(<Pagination pageCount={3} defaultPage={1} className="my-pagination" />);
    expect(container.querySelector('[data-name="tedi-pagination"]')?.className).toContain('my-pagination');
  });

  it('ignores clicks on the current page (no-op)', () => {
    const onPageChange = jest.fn();
    render(<Pagination pageCount={5} defaultPage={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Current page, page 3/i }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('renders ellipsis placeholders with aria-hidden', () => {
    const { container } = render(<Pagination pageCount={30} defaultPage={15} />);
    const ellipses = container.querySelectorAll('[aria-hidden="true"]');
    ellipses.forEach((el) => {
      expect(within(el as HTMLElement).queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
