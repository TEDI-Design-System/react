import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Button } from '../../../../tedi/components/buttons/button/button';
import { TextField } from '../../../../tedi/components/form/textfield/textfield';
import { CategorySearch } from './category-search';
import type { CategorySearchFilterDefinition, CategorySearchTextDefinition } from './category-search.types';
import { defineCategorySearchCategory } from './define-category-search-category';

jest.mock('../../../../tedi/helpers', () => ({
  ...jest.requireActual('../../../../tedi/helpers'),
  useBreakpointProps: () => ({
    getCurrentBreakpointProps: <T,>(props: T): T => props,
  }),
}));

interface Filters {
  owner: string;
}

const createCategory = (
  id = 'parcels',
  label = 'Parcels',
  onSearch: CategorySearchFilterDefinition<Filters, string[]>['onSearch'] = ({ owner }) => [`${label}: ${owner}`]
) =>
  defineCategorySearchCategory<Filters, string[]>({
    id,
    label,
    mode: 'category',
    initialFilters: () => ({ owner: '' }),
    renderFilters: ({ values, onChange, disabled }) => (
      <input
        aria-label={`${label} owner`}
        value={values.owner}
        disabled={disabled}
        onChange={(event) => onChange({ owner: event.target.value })}
      />
    ),
    onSearch,
    renderResults: ({ result, filters }) => (
      <>
        <p>
          Submitted {label}: {filters.owner}
        </p>
        <ul aria-label={`${label} matches`}>
          {result.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    ),
  });

const createTextCategory = (onSearch: CategorySearchTextDefinition<string[]>['onSearch'] = (query) => [query]) =>
  defineCategorySearchCategory<string[]>({
    id: 'addresses',
    label: 'Addresses',
    mode: 'search',
    onSearch,
    renderResults: ({ result, query, selectResult }) => (
      <>
        <p>Submitted query: {query}</p>
        <ul aria-label="Address matches">
          {result.map((address) => (
            <li key={address}>
              <Button onClick={() => selectResult(address)}>{address}</Button>
            </li>
          ))}
        </ul>
      </>
    ),
  });

const selectCategory = async (user: ReturnType<typeof userEvent.setup>, label: string) => {
  await user.click(screen.getByRole('button', { name: /^Search category:/ }));
  await user.click(await screen.findByRole('menuitemradio', { name: label }));
};

const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
};

describe('CategorySearch', () => {
  it('opens a labelled, non-modal filter region from the initially closed search bar', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory()]} />);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search category: Parcels' })).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: 'Filter' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    const panel = screen.getByRole('region', { name: 'Parcels: Filter' });
    expect(panel).not.toHaveAttribute('aria-modal');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('aria-controls', panel.id);
  });

  it('supports an initially open panel and a specified initial category', async () => {
    render(
      <CategorySearch
        categories={[createCategory(), createCategory('notices', 'Notices')]}
        defaultCategoryId="notices"
        defaultOpen
      />
    );
    expect(await screen.findByRole('region', { name: 'Notices: Filter' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toHaveValue('');
    expect(screen.queryByRole('textbox', { name: 'Parcels owner' })).not.toBeInTheDocument();
  });

  it('does not reset the mounted category, panel or draft when default props change', async () => {
    const user = userEvent.setup();
    const categories = [createCategory(), createCategory('notices', 'Notices')];
    const { rerender } = render(<CategorySearch categories={categories} defaultCategoryId="parcels" defaultOpen />);
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Draft');

    rerender(<CategorySearch categories={categories} defaultCategoryId="notices" defaultOpen={false} />);

    expect(await screen.findByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Draft');
    expect(screen.queryByRole('textbox', { name: 'Notices owner' })).not.toBeInTheDocument();
  });

  it('preserves drafts and results for an existing category ID while using its updated definition', async () => {
    const user = userEvent.setup();
    const originalSearch = jest.fn(() => ['Original parcel']);
    const updatedSearch = jest.fn(() => ['Updated parcel']);
    const { rerender } = render(
      <CategorySearch categories={[createCategory('parcels', 'Parcels', originalSearch)]} defaultOpen />
    );
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Original parcel')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');

    rerender(<CategorySearch categories={[createCategory('parcels', 'Parcels', updatedSearch)]} defaultOpen />);

    expect(await screen.findByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Kask');
    expect(updatedSearch).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Original parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Filters edited since searching.')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(await screen.findByText('Updated parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Kask')).toBeVisible();
    expect(updatedSearch).toHaveBeenCalledWith({ owner: 'Kask' }, { signal: expect.any(AbortSignal) });
    expect(originalSearch).toHaveBeenCalledTimes(1);
  });

  it('rejects duplicate category IDs', () => {
    expect(() =>
      render(<CategorySearch categories={[createCategory(), createCategory('parcels', 'Notices')]} />)
    ).toThrow('CategorySearch category IDs must be unique.');
  });

  it('submits the filter values and renders results with the filters that produced them', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn(({ owner }: Filters) => [`Parcel for ${owner}`]);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Aasa');
    expect(onSearch).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(await screen.findByText('Parcel for Aasa')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith({ owner: 'Aasa' }, { signal: expect.any(AbortSignal) });
    expect(screen.getByRole('region', { name: 'Parcels: Results' })).toHaveFocus();
  });

  it('keeps the previous results and submitted filters when the draft is edited', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory()]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));

    expect(screen.getByText('Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Filters edited since searching.')).toBeVisible();
    expect(screen.queryByText('Parcels: Kask')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox')).toHaveValue('Kask');
  });

  it('keeps the edited-filter notice when the draft is changed back to the submitted values', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn(({ owner }: Filters) => [`Parcels: ${owner}`]);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.type(screen.getByRole('textbox'), 'x{Backspace}');
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));

    expect(screen.getByText('Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Filters edited since searching.')).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
  });

  it('shows the result count for the results action even when translated action labels are identical', async () => {
    const user = userEvent.setup();
    render(
      <CategorySearch
        categories={[createCategory()]}
        labels={{ showFilters: 'Toggle view', showResults: 'Toggle view' }}
        defaultOpen
      />
    );
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Toggle view' }));
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
    await user.click(screen.getByRole('button', { name: 'Toggle view (1)' }));
    expect(screen.getByText('Parcels: Aasa')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Toggle view' })).toBeVisible();
  });

  it('uses translated result labels and count formatting while retaining other default labels', async () => {
    const user = userEvent.setup();
    render(
      <CategorySearch
        categories={[createCategory()]}
        labels={{
          search: 'Find parcels',
          results: 'Matches',
          filtersChanged: 'Filters were edited.',
          resultCount: (count) => `${count} matches found`,
        }}
        defaultOpen
      />
    );

    await user.click(screen.getByRole('button', { name: 'Find parcels' }));

    expect(await screen.findByRole('region', { name: 'Parcels: Matches' })).toBeVisible();
    expect(screen.getByText('1 matches found')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('Parcels: 1 matches found');
    expect(screen.getByRole('button', { name: 'Close' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.type(screen.getByRole('textbox'), 'Edited');
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));

    expect(screen.getByText('Filters were edited.')).toBeVisible();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
  });

  it('preserves results and draft filters when the panel is closed and reopened', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory()]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
  });

  it('restores each category draft and results after switching categories', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory(), createCategory('notices', 'Notices')]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');

    await selectCategory(user, 'Notices');
    await user.type(screen.getByRole('textbox', { name: 'Notices owner' }), 'Tamm');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Notices: Tamm')).toBeVisible();
    await selectCategory(user, 'Parcels');
    expect(screen.getByText('Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.queryByText('Notices: Tamm')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Kask');
    await selectCategory(user, 'Notices');
    expect(screen.getByText('Notices: Tamm')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toHaveValue('Tamm');
  });

  it('clears the active category without resetting another category', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory(), createCategory('notices', 'Notices')]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await selectCategory(user, 'Notices');
    await user.type(screen.getByRole('textbox'), 'Tamm');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Notices: Tamm')).toBeVisible();
    await selectCategory(user, 'Parcels');
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('');
    expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
    await selectCategory(user, 'Notices');
    expect(screen.getByText('Notices: Tamm')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toHaveValue('Tamm');
    await selectCategory(user, 'Parcels');
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('');
    expect(screen.queryByText('Parcels: Aasa')).not.toBeInTheDocument();
  });

  it('clears completed results and restores the filter form with Clear filter', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory()]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Clear filter' }));

    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryByText('Parcels: Aasa')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear filter' })).not.toBeInTheDocument();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
  });

  it('replaces old matches with a completed empty result that can be reopened', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn().mockResolvedValueOnce(['Existing parcel']).mockResolvedValueOnce([]);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Existing parcel')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('No results found.')).toBeVisible();
    expect(screen.queryByText('Existing parcel')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await user.click(screen.getByRole('button', { name: 'Show results (0)' }));
    expect(screen.getByText('No results found.')).toBeVisible();
  });

  it('retains earlier results after a failed search and clears the error on retry', async () => {
    const user = userEvent.setup();
    const onSearch = jest
      .fn()
      .mockResolvedValueOnce(['Previous parcel'])
      .mockRejectedValueOnce(new Error('Temporary failure'))
      .mockResolvedValueOnce(['Recovered parcel']);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Previous parcel')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('The search failed. Please try again.');
    expect(screen.getByText('Previous parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Filters edited since searching.')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox')).toHaveValue('Kask');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Recovered parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Kask')).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByText('Previous parcel')).not.toBeInTheDocument();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
  });

  it.each([undefined, null, '', 0, false])('shows a failed search when the rejection value is %p', async (reason) => {
    const user = userEvent.setup();
    const onSearch = jest.fn().mockRejectedValue(reason);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('The search failed. Please try again.');
    expect(screen.queryByText('Searching…')).not.toBeInTheDocument();
  });

  it('aborts a superseded request and ignores its late response', async () => {
    const user = userEvent.setup();
    const older = deferred<string[]>();
    const newer = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValueOnce(older.promise).mockReturnValueOnce(newer.promise);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Older');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Searching…')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Newer');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch.mock.calls[0][1].signal.aborted).toBe(true);

    await act(async () => {
      newer.resolve(['Current parcel']);
    });
    expect(await screen.findByText('Current parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Newer')).toBeVisible();
    await act(async () => {
      older.resolve(['Stale parcel']);
    });
    expect(screen.getByText('Current parcel')).toBeVisible();
    expect(screen.queryByText('Stale parcel')).not.toBeInTheDocument();
  });

  it.each(['resolve', 'reject'] as const)(
    'keeps the newer request pending when an older request calls %s',
    async (settle) => {
      const user = userEvent.setup();
      const older = deferred<string[]>();
      const newer = deferred<string[]>();
      const onSearch = jest.fn().mockReturnValueOnce(older.promise).mockReturnValueOnce(newer.promise);
      render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
      await user.click(screen.getByRole('button', { name: 'Search' }));
      await user.click(screen.getByRole('button', { name: 'Show filters' }));
      await user.type(screen.getByRole('textbox'), 'Newer');
      await user.click(screen.getByRole('button', { name: 'Search' }));

      await act(async () => {
        if (settle === 'resolve') older.resolve(['Stale parcel']);
        else older.reject(new Error('Stale failure'));
      });
      expect(screen.getByText('Searching…')).toBeVisible();
      expect(screen.queryByText('Stale parcel')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      await act(async () => {
        newer.resolve(['Current parcel']);
      });
      expect(await screen.findByText('Current parcel')).toBeVisible();
      expect(screen.getByText('Submitted Parcels: Newer')).toBeVisible();
    }
  );

  it('aborts a cleared search and ignores its late result after another search starts', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const current = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValueOnce(pending.promise).mockReturnValueOnce(current.promise);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Clear filter' }));
    expect(onSearch.mock.calls[0][1].signal.aborted).toBe(true);
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
    await user.type(screen.getByRole('textbox'), 'Kask');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await act(async () => {
      pending.resolve(['Late parcel']);
    });
    expect(screen.getByText('Searching…')).toBeVisible();
    expect(screen.queryByText('Late parcel')).not.toBeInTheDocument();
    await act(async () => {
      current.resolve(['Current parcel']);
    });
    expect(await screen.findByText('Current parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Kask')).toBeVisible();
  });

  it('keeps a closed panel closed when its pending search completes', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onOpenChange = jest.fn();
    render(
      <CategorySearch
        categories={[createCategory('parcels', 'Parcels', () => pending.promise)]}
        onOpenChange={onOpenChange}
        defaultOpen
      />
    );
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole('button', { name: 'Show results (1)' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Found parcel')).toBeVisible();
  });

  it('preserves edits made during a request while rendering its original submitted filters', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', () => pending.promise)]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');

    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(screen.getByRole('textbox')).toHaveValue('Kask');
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Filters edited since searching.')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox')).toHaveValue('Kask');
  });

  it('stores a pending result in its category without switching away from the active category', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    render(
      <CategorySearch
        categories={[createCategory('parcels', 'Parcels', () => pending.promise), createCategory('notices', 'Notices')]}
        defaultOpen
      />
    );
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await selectCategory(user, 'Notices');
    await user.type(screen.getByRole('textbox', { name: 'Notices owner' }), 'Tamm');
    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(screen.getByRole('region', { name: 'Notices: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toHaveValue('Tamm');
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toHaveFocus();
    expect(screen.queryByText('Found parcel')).not.toBeInTheDocument();
    await selectCategory(user, 'Parcels');
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
  });

  it('discards a removed category request when the same category ID is added again', async () => {
    const user = userEvent.setup();
    const older = deferred<string[]>();
    const newer = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValueOnce(older.promise).mockReturnValueOnce(newer.promise);
    const parcels = createCategory('parcels', 'Parcels', onSearch);
    const notices = createCategory('notices', 'Notices');
    const { rerender } = render(<CategorySearch categories={[parcels, notices]} categoryId="parcels" defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Removed');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    rerender(<CategorySearch categories={[notices]} categoryId="notices" defaultOpen />);
    expect(onSearch.mock.calls[0][1].signal.aborted).toBe(true);
    rerender(<CategorySearch categories={[parcels, notices]} categoryId="parcels" defaultOpen />);
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('');
    await user.type(screen.getByRole('textbox'), 'Re-added');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    await act(async () => {
      older.resolve(['Removed parcel']);
    });
    expect(screen.getByText('Searching…')).toBeVisible();
    expect(screen.queryByText('Removed parcel')).not.toBeInTheDocument();
    await act(async () => {
      newer.resolve(['Current parcel']);
    });
    expect(await screen.findByText('Current parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Re-added')).toBeVisible();
  });

  it.each(['category', 'search'] as const)(
    'reopens the first pending search and its error in %s mode',
    async (mode) => {
      const user = userEvent.setup();
      const pending = deferred<string[]>();
      const category =
        mode === 'category'
          ? createCategory('parcels', 'Parcels', () => pending.promise)
          : defineCategorySearchCategory<string[]>({
              id: 'addresses',
              label: 'Addresses',
              mode: 'search',
              onSearch: () => pending.promise,
              renderResults: ({ result }) => <p>{result[0]}</p>,
            });
      render(<CategorySearch categories={[category]} defaultOpen />);
      if (mode === 'category') await user.click(screen.getByRole('button', { name: 'Search' }));
      else await user.type(screen.getByRole('searchbox'), 'Aasa{Enter}');
      await user.click(screen.getByRole('button', { name: 'Close' }));
      if (mode === 'category') {
        await user.click(screen.getByRole('button', { name: 'Show results' }));
      } else {
        expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
        await selectCategory(user, 'Addresses');
      }
      expect(screen.getByText('Searching…')).toBeVisible();

      await act(async () => {
        pending.reject(new Error('First search failed'));
      });
      expect(await screen.findByRole('alert')).toBeVisible();
      await user.click(screen.getByRole('button', { name: 'Close' }));
      if (mode === 'category') {
        await user.click(screen.getByRole('button', { name: 'Show results' }));
      } else {
        expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
        await selectCategory(user, 'Addresses');
      }
      expect(screen.getByRole('alert')).toHaveTextContent('The search failed. Please try again.');
    }
  );

  it('aborts outstanding searches when unmounted', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValue(pending.promise);
    const { unmount } = render(
      <CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />
    );
    await user.click(screen.getByRole('button', { name: 'Search' }));
    const signal = onSearch.mock.calls[0][1].signal;
    expect(signal.aborted).toBe(false);
    unmount();
    expect(signal.aborted).toBe(true);
    await act(async () => {
      pending.resolve(['Late parcel']);
    });
  });

  it('requests controlled visibility changes without overriding the parent state', async () => {
    const user = userEvent.setup();
    const categories = [createCategory()];
    const onOpenChange = jest.fn();
    const { rerender } = render(<CategorySearch categories={categories} open={false} onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    rerender(<CategorySearch categories={categories} open onOpenChange={onOpenChange} />);
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    rerender(<CategorySearch categories={categories} open={false} onOpenChange={onOpenChange} />);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('requests a controlled category change without replacing the selected category', async () => {
    const user = userEvent.setup();
    const categories = [createCategory(), createCategory('notices', 'Notices')];
    const onCategoryChange = jest.fn();
    const { rerender } = render(
      <CategorySearch categories={categories} categoryId="parcels" onCategoryChange={onCategoryChange} defaultOpen />
    );
    await selectCategory(user, 'Notices');
    expect(onCategoryChange).toHaveBeenCalledWith('notices');
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.queryByRole('textbox', { name: 'Notices owner' })).not.toBeInTheDocument();

    rerender(
      <CategorySearch categories={categories} categoryId="notices" onCategoryChange={onCategoryChange} defaultOpen />
    );
    expect(screen.getByRole('region', { name: 'Notices: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toBeVisible();
  });

  it('keeps the background interactive and leaves the panel open for Escape outside it', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <>
        <CategorySearch categories={[createCategory()]} defaultOpen />
        <button type="button" onClick={onClick}>
          Map action
        </button>
      </>
    );
    await user.click(screen.getByRole('button', { name: 'Map action' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Map action' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Map action' })).toHaveFocus();
  });

  it('closes on Escape from the filter editor and returns focus to its toggle', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory()]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Unsaved');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('textbox')).toHaveValue('Unsaved');
  });

  it('disables category selection, filter editing and submission', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    const onCategoryChange = jest.fn();
    render(
      <CategorySearch
        categories={[createCategory('parcels', 'Parcels', onSearch)]}
        onCategoryChange={onCategoryChange}
        disabled
        defaultOpen
      />
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Search category: Parcels' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Search category: Parcels' }));
    expect(onSearch).not.toHaveBeenCalled();
    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it('searches text with Enter and clears the query and remembered results', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn((query: string) => [`Address: ${query}`]);
    const category = defineCategorySearchCategory<string[]>({
      id: 'addresses',
      label: 'Addresses',
      mode: 'search',
      onSearch,
      renderResults: ({ result, query }) => (
        <p>
          {result[0]} (submitted: {query})
        </p>
      ),
    });
    render(<CategorySearch categories={[category]} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Aasa{Enter}');
    expect(await screen.findByText('Address: Aasa (submitted: Aasa)')).toBeVisible();
    expect(onSearch).toHaveBeenCalledWith('Aasa', {
      signal: expect.any(AbortSignal),
    });
    await user.clear(input);
    await user.type(input, 'Kask{Enter}');
    expect(await screen.findByText('Address: Kask (submitted: Kask)')).toBeVisible();
    expect(screen.queryByText('Address: Aasa (submitted: Aasa)')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Addresses: Results' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(input).toHaveFocus();
    expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
    await selectCategory(user, 'Addresses');
    expect(screen.getByText('Address: Kask (submitted: Kask)')).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(10);
    await user.click(screen.getByRole('button', { name: /^clear$/i }));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
  });

  it('restores an application-provided initial query when clearing a completed search', async () => {
    const user = userEvent.setup();
    const category = defineCategorySearchCategory<string[]>({
      id: 'cities',
      label: 'Cities',
      mode: 'search',
      initialQuery: 'Tartu',
      onSearch: (query) => [query],
      renderResults: ({ result }) => <p>{result[0]}</p>,
    });
    render(<CategorySearch categories={[category]} />);
    const input = screen.getByRole('searchbox', { name: 'Search' });
    expect(input).toHaveValue('Tartu');
    await user.clear(input);
    await user.type(input, 'Tallinn{Enter}');
    expect(await screen.findByText('Tallinn')).toBeVisible();
    await user.click(screen.getByRole('button', { name: /^clear$/i }));
    expect(input).toHaveValue('Tartu');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
  });

  it('does not steal focus from the application when a pending search completes', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    render(
      <>
        <CategorySearch categories={[createCategory('parcels', 'Parcels', () => pending.promise)]} defaultOpen />
        <button type="button">Map action</button>
      </>
    );
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Map action' }));
    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(await screen.findByText('Found parcel')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Map action' })).toHaveFocus();
  });

  it('searches every nonempty text edit with the current query while keeping focus in the input', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn((query: string) => [query]);
    render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
    const input = screen.getByRole('searchbox', { name: 'Search' });

    await user.type(input, 'Aasa');

    expect(onSearch.mock.calls.map(([query]) => query)).toEqual(['A', 'Aa', 'Aas', 'Aasa']);
    expect(await screen.findByRole('button', { name: 'Aasa' })).toBeVisible();
    expect(screen.getByText('Submitted query: Aasa')).toBeVisible();
    expect(screen.getByRole('region', { name: 'Addresses: Results' })).toBeVisible();
    expect(input).toHaveAttribute('aria-controls', screen.getByRole('region').id);
    expect(input).toHaveValue('Aasa');
    expect(input).toHaveFocus();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
  });

  it.each(['Enter', 'search button'] as const)(
    'explicitly submits the latest text query with %s and focuses the panel',
    async (submitWith) => {
      const user = userEvent.setup();
      const onSearch = jest.fn((query: string) => [query]);
      render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
      const input = screen.getByRole('searchbox');
      await user.type(input, 'Aa');
      expect(onSearch).toHaveBeenCalledTimes(2);
      expect(input).toHaveFocus();

      if (submitWith === 'Enter') await user.keyboard('{Enter}');
      else await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(onSearch).toHaveBeenCalledTimes(3);
      expect(onSearch).toHaveBeenLastCalledWith('Aa', { signal: expect.any(AbortSignal) });
      expect(screen.getByRole('region', { name: 'Addresses: Results' })).toHaveFocus();
    }
  );

  it.each([undefined, true])(
    'cancels an emptied text query without discarding previous results when open is %p',
    async (open) => {
      const user = userEvent.setup();
      const pending = deferred<string[]>();
      const next = deferred<string[]>();
      const onSearch = jest
        .fn()
        .mockResolvedValueOnce(['Saved address'])
        .mockReturnValueOnce(pending.promise)
        .mockReturnValueOnce(next.promise);
      render(<CategorySearch categories={[createTextCategory(onSearch)]} open={open} />);
      const input = screen.getByRole('searchbox');
      await user.type(input, 'A');
      expect(await screen.findByRole('button', { name: 'Saved address' })).toBeVisible();
      await user.type(input, 'b');
      expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();

      await user.clear(input);

      expect(onSearch.mock.calls[1][1].signal.aborted).toBe(true);
      expect(input).toHaveValue('');
      expect(input).toHaveFocus();
      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      await user.keyboard('{Enter}');
      await user.click(screen.getByRole('button', { name: 'Search' }));
      expect(onSearch).toHaveBeenCalledTimes(2);
      await act(async () => {
        pending.resolve(['Cancelled address']);
      });
      expect(screen.queryByRole('region')).not.toBeInTheDocument();

      await user.type(input, 'N');

      expect(onSearch).toHaveBeenLastCalledWith('N', { signal: expect.any(AbortSignal) });
      expect(screen.getByRole('button', { name: 'Saved address' })).toBeVisible();
      expect(screen.getByText('Submitted query: A')).toBeVisible();
      expect(screen.queryByRole('button', { name: 'Cancelled address' })).not.toBeInTheDocument();
      expect(input).toHaveFocus();
    }
  );

  it('retains text results while a replacement loads and fails without showing a filter-change notice', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest.fn().mockResolvedValueOnce(['Saved address']).mockReturnValueOnce(pending.promise);
    render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'A');
    expect(await screen.findByRole('button', { name: 'Saved address' })).toBeVisible();
    await user.type(input, 'b');

    expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Saved address' })).toBeVisible();
    expect(screen.getByText('Submitted query: A')).toBeVisible();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
    await act(async () => {
      pending.reject(new Error('Replacement failed'));
    });

    expect(screen.getByRole('alert')).toHaveTextContent('The search failed. Please try again.');
    expect(screen.getByRole('button', { name: 'Saved address' })).toBeVisible();
    expect(screen.getByText('Submitted query: A')).toBeVisible();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
    expect(input).toHaveValue('Ab');
    expect(input).toHaveFocus();
  });

  it.each(['resolve', 'reject'] as const)(
    'selects a retained result, cancels the new query and ignores its late %s',
    async (settle) => {
      const user = userEvent.setup();
      const pending = deferred<string[]>();
      const onSearch = jest.fn().mockResolvedValueOnce(['Saved address']).mockReturnValueOnce(pending.promise);
      render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
      const input = screen.getByRole('searchbox');
      await user.type(input, 'A');
      expect(await screen.findByRole('button', { name: 'Saved address' })).toBeVisible();
      await user.type(input, 'b');
      expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();

      await user.click(screen.getByRole('button', { name: 'Saved address' }));

      expect(onSearch.mock.calls[1][1].signal.aborted).toBe(true);
      expect(onSearch).toHaveBeenCalledTimes(2);
      expect(input).toHaveValue('Saved address');
      expect(input).toHaveFocus();
      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      await act(async () => {
        if (settle === 'resolve') pending.resolve(['Obsolete address']);
        else pending.reject(new Error('Obsolete failure'));
      });
      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      expect(input).toHaveValue('Saved address');
      expect(input).toHaveFocus();

      await selectCategory(user, 'Addresses');

      expect(screen.getByRole('button', { name: 'Saved address' })).toBeVisible();
      expect(screen.getByText('Submitted query: A')).toBeVisible();
      expect(within(screen.getByRole('region')).queryByRole('status')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Obsolete address' })).not.toBeInTheDocument();
      expect(onSearch).toHaveBeenCalledTimes(2);
    }
  );

  it('aborts a pending text search and forgets earlier results when the clear button is used', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const next = deferred<string[]>();
    const onSearch = jest
      .fn()
      .mockResolvedValueOnce(['Saved address'])
      .mockReturnValueOnce(pending.promise)
      .mockReturnValueOnce(next.promise);
    render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'A');
    expect(await screen.findByRole('button', { name: 'Saved address' })).toBeVisible();
    await user.type(input, 'b');

    await user.click(screen.getByRole('button', { name: /^clear$/i }));

    expect(onSearch.mock.calls[1][1].signal.aborted).toBe(true);
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    await act(async () => {
      pending.resolve(['Cancelled address']);
    });
    await selectCategory(user, 'Addresses');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(onSearch).toHaveBeenCalledTimes(2);

    await user.type(input, 'N');

    expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Saved address' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancelled address' })).not.toBeInTheDocument();
    expect(screen.queryByText('Submitted query: A')).not.toBeInTheDocument();
  });

  it('keeps a text panel closed when a pending live search finishes', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValue(pending.promise);
    render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'A');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(input).toHaveFocus();

    await act(async () => {
      pending.resolve(['Found address']);
    });

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(input).toHaveFocus();
    await selectCategory(user, 'Addresses');
    expect(screen.getByRole('button', { name: 'Found address' })).toBeVisible();
    expect(screen.getByText('Submitted query: A')).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('stores a live text result without switching categories or moving focus', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValue(pending.promise);
    render(<CategorySearch categories={[createTextCategory(onSearch), createCategory()]} />);
    await user.type(screen.getByRole('searchbox'), 'A');
    await selectCategory(user, 'Parcels');
    const owner = screen.getByRole('textbox', { name: 'Parcels owner' });
    await user.type(owner, 'Kask');

    await act(async () => {
      pending.resolve(['Found address']);
    });

    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(owner).toHaveValue('Kask');
    expect(owner).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Found address' })).not.toBeInTheDocument();
    await selectCategory(user, 'Addresses');
    expect(screen.getByRole('searchbox')).toHaveValue('A');
    expect(screen.getByRole('button', { name: 'Found address' })).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('does not move focus from the application when live text results arrive', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    render(
      <>
        <CategorySearch categories={[createTextCategory(() => pending.promise)]} />
        <Button>Map action</Button>
      </>
    );
    await user.type(screen.getByRole('searchbox'), 'A');
    await user.click(screen.getByRole('button', { name: 'Map action' }));

    await act(async () => {
      pending.resolve(['Found address']);
    });

    expect(screen.getByRole('button', { name: 'Found address' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Map action' })).toHaveFocus();
  });

  it('does not run live or submitted text searches while disabled', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<CategorySearch categories={[createTextCategory(onSearch)]} disabled />);
    const input = screen.getByRole('searchbox');

    expect(input).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
    await user.type(input, 'A{Enter}');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).not.toHaveBeenCalled();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it.each([undefined, 'small', 'default', 'large'] as const)(
    'passes size %p to the TEDI search, action buttons and filter context',
    async (size) => {
      const user = userEvent.setup();
      const expectedSize = size ?? 'default';
      const category = defineCategorySearchCategory<Filters, string[]>({
        id: 'parcels',
        label: 'Parcels',
        mode: 'category',
        initialFilters: () => ({ owner: '' }),
        renderFilters: ({ values, onChange, disabled, size: fieldSize }) => (
          <TextField
            id="parcel-owner"
            label="Parcel owner"
            size={fieldSize}
            value={values.owner}
            disabled={disabled}
            onChange={(owner) => onChange({ owner })}
          />
        ),
        onSearch: ({ owner }) => [owner],
        renderResults: ({ result }) => <p>{result[0]}</p>,
      });
      render(<CategorySearch categories={[createTextCategory(), category]} size={size} />);
      const input = screen.getByRole('searchbox');

      expect(input.closest('[data-name="textfield"]')).toHaveClass(`tedi-textfield--${expectedSize}`);
      await user.type(input, 'A');
      expect(screen.getByRole('button', { name: 'Close' })).toHaveClass(`tedi-btn--${expectedSize}`);

      await selectCategory(user, 'Parcels');

      expect(screen.getByRole('textbox', { name: 'Parcel owner' }).closest('[data-name="textfield"]')).toHaveClass(
        `tedi-textfield--${expectedSize}`
      );
      for (const name of ['Filter', 'Close', 'Clear', 'Search']) {
        expect(screen.getByRole('button', { name })).toHaveClass(`tedi-btn--${expectedSize}`);
      }
    }
  );

  it('forwards the root ref and accepts per-instance panel dimensions', async () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <CategorySearch
        ref={ref}
        id="parcel-search"
        categories={[createCategory()]}
        panelWidth={420}
        maxPanelHeight="60vh"
        className="map-search"
        defaultOpen
      />
    );
    expect(ref.current).toHaveAttribute('id', 'parcel-search');
    expect(ref.current).toHaveClass('map-search');
    expect(ref.current).toContainElement(await screen.findByRole('region', { name: 'Parcels: Filter' }));
    expect(ref.current?.style.getPropertyValue('--category-search-panel-width')).toBe('420px');
    expect(ref.current?.style.getPropertyValue('--category-search-panel-max-height')).toBe('60vh');
  });
});
