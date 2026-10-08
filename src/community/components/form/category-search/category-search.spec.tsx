import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, type ReactNode, useState } from 'react';

import { Button } from '../../../../tedi/components/buttons/button/button';
import { TextField } from '../../../../tedi/components/form/textfield/textfield';
import { Alert } from '../../../../tedi/components/notifications/alert/alert';
import { CategorySearch } from './category-search';
import type { CategorySearchFilterDefinition, CategorySearchTextDefinition } from './category-search.types';
import { defineCategorySearchCategory } from './define-category-search-category';

const mockUseBreakpoint = jest.fn(() => 'lg');

jest.mock('../../../../tedi/helpers', () => ({
  ...jest.requireActual('../../../../tedi/helpers'),
  useBreakpoint: () => mockUseBreakpoint(),
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
  onSearch: CategorySearchFilterDefinition<Filters, string[]>['onSearch'] = ({ owner }) => [`${label}: ${owner}`],
  validationMessage?: ReactNode
) =>
  defineCategorySearchCategory<Filters, string[]>({
    id,
    label,
    mode: 'category',
    validationMessage,
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

const createTextCategory = (
  onSearch: CategorySearchTextDefinition<string[]>['onSearch'] = (query) => [query],
  showSearchButton?: boolean
) =>
  defineCategorySearchCategory<string[]>({
    id: 'addresses',
    label: 'Addresses',
    mode: 'search',
    showSearchButton,
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
  beforeEach(() => {
    mockUseBreakpoint.mockReturnValue('lg');
  });

  it.each([
    { mobile: true, breakpoint: 'lg', presentation: 'mobile' },
    { mobile: false, breakpoint: 'xs', presentation: 'desktop' },
    { mobile: undefined, breakpoint: 'sm', presentation: 'mobile' },
    { mobile: undefined, breakpoint: 'md', presentation: 'desktop' },
  ])(
    'uses $presentation presentation at $breakpoint when mobile is $mobile',
    async ({ mobile, breakpoint, presentation }) => {
      mockUseBreakpoint.mockReturnValue(breakpoint);
      render(<CategorySearch categories={[createCategory()]} mobile={mobile} defaultOpen />);
      const panel =
        presentation === 'mobile'
          ? await screen.findByRole('dialog', { name: 'Search' })
          : await screen.findByRole('region', { name: 'Parcels: Filter' });

      expect(within(panel).getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('');
      expect(screen.getByRole('button', { name: 'Search category: Parcels' })).toBeVisible();
      if (presentation === 'mobile') {
        expect(within(panel).queryByRole('button', { name: 'Filter' })).not.toBeInTheDocument();
      } else {
        expect(screen.getByRole('button', { name: 'Filter' })).toBeVisible();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      }
    }
  );

  it.each(['click', 'tap'] as const)('opens Modal with a deliberate %s without searching', async (interaction) => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<CategorySearch categories={[createTextCategory(onSearch)]} mobile />);
    const launcher = screen.getByRole('searchbox', { name: 'Search' });
    expect(launcher).toHaveAttribute('readonly');
    expect(screen.queryByRole('button', { name: /^Search category:/ })).not.toBeInTheDocument();

    if (interaction === 'tap') await user.pointer({ keys: '[TouchA]', target: launcher });
    else await user.click(launcher);

    expect(await screen.findByRole('dialog', { name: 'Search' })).toBeVisible();
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('orders the mobile controls and reopens saved results after selection or closing', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn(() => ['Aasa 1', 'Aasa 2']);
    render(<CategorySearch categories={[createTextCategory(onSearch)]} mobile />);
    await user.click(screen.getByRole('searchbox', { name: 'Search' }));

    const dialog = await screen.findByRole('dialog', { name: 'Search' });
    const input = within(dialog).getByRole('searchbox', { name: 'Search' });
    const selector = within(dialog).getByRole('button', { name: 'Search category: Addresses' });
    const heading = within(dialog).getByRole('heading', { name: 'Search' });
    const close = within(dialog).getAllByRole('button', { name: 'Close' })[0];
    expect(close).toBeVisible();
    expect(Boolean(heading.compareDocumentPosition(selector) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(Boolean(close.compareDocumentPosition(selector) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    expect(input).not.toHaveAttribute('readonly');
    expect(Boolean(selector.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    await user.type(input, 'A');
    const results = await within(dialog).findByRole('list', { name: 'Address matches' });
    expect(Boolean(input.compareDocumentPosition(results) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    await user.click(within(dialog).getByRole('button', { name: 'Aasa 1' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('Aasa 1');
    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveFocus();
    await user.click(screen.getByRole('searchbox', { name: 'Search' }));
    const reopened = await screen.findByRole('dialog', { name: 'Search' });
    expect(within(reopened).getByRole('searchbox', { name: 'Search' })).toHaveValue('Aasa 1');
    expect(within(reopened).getByRole('button', { name: 'Aasa 1' })).toBeVisible();
    expect(within(reopened).getByRole('button', { name: 'Aasa 2' })).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(1);
    await user.click(within(reopened).getAllByRole('button', { name: 'Close' })[0]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveFocus();
    await user.click(screen.getByRole('searchbox', { name: 'Search' }));
    await screen.findByRole('dialog', { name: 'Search' });
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it.each(['Clear', 'deleting the text'] as const)(
    'keeps Modal open after %s without restoring cleared results',
    async (clearWith) => {
      const user = userEvent.setup();
      const pending = deferred<string[]>();
      const onSearch = jest.fn().mockResolvedValueOnce(['Saved address']).mockReturnValueOnce(pending.promise);
      render(<CategorySearch categories={[createTextCategory(onSearch)]} mobile />);
      await user.click(screen.getByRole('searchbox', { name: 'Search' }));
      const dialog = await screen.findByRole('dialog', { name: 'Search' });
      const input = within(dialog).getByRole('searchbox', { name: 'Search' });
      await user.type(input, 'A');
      await within(dialog).findByRole('button', { name: 'Saved address' });
      await user.type(input, 'b');
      if (clearWith === 'Clear') await user.click(within(dialog).getByRole('button', { name: /^clear$/i }));
      else await user.clear(input);

      expect(screen.getByRole('dialog', { name: 'Search' })).toBe(dialog);
      expect(input).toHaveValue('');
      expect(onSearch.mock.calls[1][1].signal.aborted).toBe(true);
      await act(async () => {
        pending.resolve(['Cancelled address']);
      });
      expect(within(dialog).queryByRole('list')).not.toBeInTheDocument();
      await user.click(within(dialog).getAllByRole('button', { name: 'Close' })[0]);
      await user.click(screen.getByRole('searchbox', { name: 'Search' }));
      expect(within(await screen.findByRole('dialog', { name: 'Search' })).queryByRole('list')).not.toBeInTheDocument();
      expect(onSearch).toHaveBeenCalledTimes(2);
    }
  );

  it('preserves categories, drafts, results and supplied messages across presentation changes', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn(() => ['Found parcel']);
    const categories = [
      createCategory('parcels', 'Parcels', onSearch),
      createCategory('notices', 'Notices', undefined, <Alert type="warning">Notice advice</Alert>),
    ];
    const { rerender } = render(<CategorySearch categories={categories} mobile defaultOpen minimizeCounter={5} />);
    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Close' })[0]).toHaveFocus());
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Aasa');
    await user.click(within(screen.getByRole('dialog', { name: 'Search' })).getByRole('button', { name: 'Search' }));
    await screen.findByText('Found parcel');
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox', { name: 'Parcels owner' }));
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Kask');
    await selectCategory(user, 'Notices');
    await user.type(screen.getByRole('textbox', { name: 'Notices owner' }), 'Tamm');

    rerender(<CategorySearch categories={categories} mobile={false} minimizeCounter={5} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Notices: Filter' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Search category: Notices' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toHaveValue('Tamm');
    expect(screen.getByText('Notice advice')).toBeVisible();
    await selectCategory(user, 'Parcels');
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));

    rerender(<CategorySearch categories={categories} mobile minimizeCounter={5} />);
    expect(await screen.findByRole('dialog', { name: 'Search' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Search category: Parcels' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Kask');
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('minimizes Modal without restoring focus and keeps pending results and validation for reopening', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValue(pending.promise);
    const category = createCategory('parcels', 'Parcels', onSearch);
    const { rerender } = render(<CategorySearch categories={[category]} mobile minimizeCounter={2} />);
    await user.click(screen.getByRole('searchbox', { name: 'Search' }));
    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Close' })[0]).toHaveFocus());
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Aasa');
    await user.click(within(screen.getByRole('dialog', { name: 'Search' })).getByRole('button', { name: 'Search' }));
    expect(screen.getByRole('region', { name: 'Parcels: Results' })).toHaveFocus();
    await act(async () => {
      rerender(<CategorySearch categories={[category]} mobile minimizeCounter={1} />);
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search' })).not.toHaveFocus();
    expect(onSearch.mock.calls[0][1].signal.aborted).toBe(false);
    await act(async () => {
      pending.resolve(['Found parcel']);
    });

    const message = { ...category, validationMessage: <Alert type="danger">Backend advice</Alert> };
    rerender(<CategorySearch categories={[message]} mobile minimizeCounter={1} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('searchbox', { name: 'Search' }));
    expect(await screen.findByRole('dialog', { name: 'Search' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Search category: Parcels' })).toBeVisible();
    expect(screen.getByText('Backend advice')).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Aasa');
    rerender(<CategorySearch categories={[message]} mobile minimizeCounter={1} />);
    expect(screen.getByRole('dialog', { name: 'Search' })).toBeVisible();
    rerender(<CategorySearch categories={[category]} mobile minimizeCounter={1} />);
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('preserves an open search when automatic presentation follows breakpoint changes', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn(() => ['Found parcel']);
    const categories = [createCategory('parcels', 'Parcels', onSearch)];
    const { rerender } = render(<CategorySearch categories={categories} defaultOpen />);
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await screen.findByText('Found parcel');

    mockUseBreakpoint.mockReturnValue('sm');
    rerender(<CategorySearch categories={categories} />);
    expect(await screen.findByRole('dialog', { name: 'Search' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Search category: Parcels' })).toBeVisible();
    expect(screen.getByText('Found parcel')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Aasa');

    mockUseBreakpoint.mockReturnValue('md');
    rerender(<CategorySearch categories={categories} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Aasa');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('shows delayed validation for the active mobile category in its preserved filter form', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const category = createCategory('parcels', 'Parcels', () => pending.promise);
    const { rerender } = render(<CategorySearch categories={[category]} mobile defaultOpen />);
    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Close' })[0]).toHaveFocus());
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Aasa');
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Aasa');
    await user.click(within(screen.getByRole('dialog', { name: 'Search' })).getByRole('button', { name: 'Search' }));
    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(screen.getByText('Found parcel')).toBeVisible();

    rerender(
      <CategorySearch
        categories={[{ ...category, validationMessage: <Alert type="danger">Backend advice</Alert> }]}
        mobile
      />
    );
    expect(await screen.findByText('Backend advice')).toBeVisible();
    const input = screen.getByRole('textbox', { name: 'Parcels owner' });
    expect(input).toHaveValue('Aasa');
    expect(screen.getByRole('alert').closest('form')).toBe(input.closest('form'));
    expect(screen.queryByText('Found parcel')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Filter' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Show results/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear filter' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Clear filter' }));
    expect(screen.getByRole('dialog', { name: 'Search' })).toBeVisible();
    expect(screen.getByText('Backend advice')).toBeVisible();
    expect(input).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear filter' })).not.toBeInTheDocument();
  });

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

  it('minimizes only when the counter changes without resetting the category or moving outside focus', async () => {
    const user = userEvent.setup();
    const categories = [createCategory(), createCategory('notices', 'Notices')];
    const { rerender } = render(
      <>
        <CategorySearch categories={categories} defaultOpen minimizeCounter={5} />
        <Button>Map action</Button>
      </>
    );
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    await selectCategory(user, 'Notices');
    await user.type(screen.getByRole('textbox', { name: 'Notices owner' }), 'Draft');
    await user.click(screen.getByRole('button', { name: 'Map action' }));

    rerender(
      <>
        <CategorySearch categories={categories} defaultOpen minimizeCounter={5} />
        <Button>Map action</Button>
      </>
    );
    expect(screen.getByRole('region', { name: 'Notices: Filter' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Map action' })).toHaveFocus();

    rerender(
      <>
        <CategorySearch categories={categories} defaultOpen minimizeCounter={0} />
        <Button>Map action</Button>
      </>
    );
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Map action' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Search category: Notices' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    expect(screen.getByRole('textbox', { name: 'Notices owner' })).toHaveValue('Draft');

    rerender(
      <>
        <CategorySearch categories={categories} defaultOpen minimizeCounter={0} />
        <Button>Map action</Button>
      </>
    );
    expect(screen.getByRole('region', { name: 'Notices: Filter' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Map action' }));

    rerender(
      <>
        <CategorySearch categories={categories} defaultOpen minimizeCounter={1} />
        <Button>Map action</Button>
      </>
    );
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Map action' })).toHaveFocus();
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

  it.each([undefined, 'before', 'after'] as const)(
    'positions validation %p and preserves fields when the message moves or changes',
    async (validationPosition) => {
      const user = userEvent.setup();
      const category = createCategory('parcels', 'Parcels', undefined, <Alert type="warning">Initial advice</Alert>);
      const { rerender } = render(
        <CategorySearch categories={[category]} validationPosition={validationPosition} defaultOpen />
      );
      const input = screen.getByRole('textbox');
      const message = await screen.findByRole('alert');
      expect(message.closest('form')).toBe(input.closest('form'));
      expect(Boolean(message.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(
        validationPosition !== 'after'
      );
      await user.type(input, 'Draft');

      const nextPosition = validationPosition === 'after' ? 'before' : 'after';
      rerender(<CategorySearch categories={[category]} validationPosition={nextPosition} defaultOpen />);
      expect(screen.getByText('Initial advice')).toBeVisible();
      expect(Boolean(screen.getByRole('alert').compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(
        nextPosition === 'before'
      );
      expect(screen.getByRole('textbox')).toBe(input);
      expect(input).toHaveValue('Draft');
      expect(input).toHaveFocus();

      rerender(
        <CategorySearch
          categories={[{ ...category, validationMessage: <Alert type="danger">Updated advice</Alert> }]}
          validationPosition={nextPosition}
          defaultOpen
        />
      );
      expect(await screen.findByText('Updated advice')).toBeVisible();
      expect(screen.queryByText('Initial advice')).not.toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBe(input);
      expect(input).toHaveValue('Draft');

      rerender(<CategorySearch categories={[{ ...category, validationMessage: undefined }]} defaultOpen />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBe(input);
      expect(input).toHaveValue('Draft');
      expect(input).toHaveFocus();
    }
  );

  it('restores the filter form for an asynchronous message without losing drafts or saved results', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest.fn().mockReturnValue(pending.promise);
    const category = createCategory('parcels', 'Parcels', onSearch);
    const { rerender } = render(<CategorySearch categories={[category]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');
    await user.click(screen.getByRole('button', { name: 'Show results' }));

    rerender(
      <CategorySearch
        categories={[
          {
            ...category,
            validationMessage: (
              <Alert type="danger" onClose={() => rerender(<CategorySearch categories={[category]} defaultOpen />)}>
                Backend validation details
              </Alert>
            ),
          },
        ]}
        defaultOpen
      />
    );
    expect(await screen.findByText('Backend validation details')).toBeVisible();
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('Kask');
    expect(onSearch.mock.calls[0][1].signal.aborted).toBe(false);

    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(screen.getByRole('textbox')).toHaveValue('Kask');
    expect(screen.queryByText('Found parcel')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Show results/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    expect(screen.getByText('Backend validation details')).toBeVisible();

    const input = screen.getByRole('textbox');
    await user.click(within(screen.getByRole('alert')).getByRole('button'));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toHaveValue('Kask');
    expect(screen.queryByText('Found parcel')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByRole('region', { name: 'Parcels: Results' })).toBeVisible();
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.getByText('Filters edited since searching.')).toBeVisible();
    expect(screen.queryByText('Backend validation details')).not.toBeInTheDocument();
  });

  it('keeps delayed messages, replacements and removals independent between filter categories', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const parcels = createCategory('parcels', 'Parcels', () => pending.promise);
    const notices = createCategory('notices', 'Notices', undefined, <Alert type="warning">Notice advice</Alert>);
    const { rerender } = render(<CategorySearch categories={[parcels, notices]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await selectCategory(user, 'Notices');
    const noticeInput = screen.getByRole('textbox', { name: 'Notices owner' });
    await user.type(noticeInput, 'Tamm');

    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    const parcelMessage = { ...parcels, validationMessage: <Alert type="danger">Parcel advice</Alert> };
    rerender(<CategorySearch categories={[parcelMessage, notices]} defaultOpen />);
    expect(screen.getByRole('region', { name: 'Notices: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox')).toBe(noticeInput);
    expect(noticeInput).toHaveValue('Tamm');
    expect(noticeInput).toHaveFocus();
    expect(screen.getByText('Notice advice')).toBeVisible();
    expect(screen.queryByText('Parcel advice')).not.toBeInTheDocument();

    await selectCategory(user, 'Parcels');
    expect(await screen.findByText('Parcel advice')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
    expect(screen.queryByText('Notice advice')).not.toBeInTheDocument();
    await selectCategory(user, 'Notices');

    const updatedParcel = { ...parcels, validationMessage: <Alert type="danger">Updated parcel advice</Alert> };
    rerender(<CategorySearch categories={[updatedParcel, notices]} defaultOpen />);
    expect(screen.getByText('Notice advice')).toBeVisible();
    expect(screen.queryByText('Updated parcel advice')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Tamm');

    rerender(<CategorySearch categories={[updatedParcel, { ...notices, validationMessage: undefined }]} defaultOpen />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Tamm');
    await selectCategory(user, 'Parcels');
    expect(await screen.findByText('Updated parcel advice')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
  });

  it.each(['Close', 'minimizeCounter'] as const)(
    'stays closed after %s when validation arrives, changes or is removed',
    async (closeWith) => {
      const user = userEvent.setup();
      const pending = deferred<string[]>();
      const category = createCategory('parcels', 'Parcels', () => pending.promise);
      const minimizeCounter = closeWith === 'minimizeCounter' ? 1 : undefined;
      const { rerender } = render(<CategorySearch categories={[category]} defaultOpen />);
      await user.type(screen.getByRole('textbox'), 'Aasa');
      await user.click(screen.getByRole('button', { name: 'Search' }));
      if (closeWith === 'Close') await user.click(screen.getByRole('button', { name: 'Close' }));
      else rerender(<CategorySearch categories={[category]} defaultOpen minimizeCounter={minimizeCounter} />);
      await act(async () => {
        pending.resolve(['Found parcel']);
      });

      for (const message of ['First backend message', undefined, 'Latest backend message']) {
        rerender(
          <CategorySearch
            categories={[{ ...category, validationMessage: message && <Alert type="danger">{message}</Alert> }]}
            defaultOpen
            minimizeCounter={minimizeCounter}
          />
        );
        expect(screen.queryByRole('region')).not.toBeInTheDocument();
      }

      await user.click(screen.getByRole('button', { name: 'Filter' }));
      expect(await screen.findByText('Latest backend message')).toBeVisible();
      expect(screen.getByRole('textbox')).toHaveValue('Aasa');

      if (closeWith === 'minimizeCounter') {
        rerender(
          <CategorySearch
            categories={[{ ...category, validationMessage: <Alert type="danger">Latest backend message</Alert> }]}
            defaultOpen
            minimizeCounter={2}
          />
        );
        expect(screen.queryByRole('region')).not.toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Filter' }));
        expect(screen.getByText('Latest backend message')).toBeVisible();
        expect(screen.getByRole('textbox')).toHaveValue('Aasa');
      }
    }
  );

  it.each(['danger', 'warning'] as const)('still submits with a supplied %s Alert', async (type) => {
    const user = userEvent.setup();
    const onSearch = jest.fn(() => ['Found parcel']);
    const category = createCategory('parcels', 'Parcels', onSearch, <Alert type={type}>Application message</Alert>);
    const { rerender } = render(<CategorySearch categories={[category]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    const submit = screen.getByRole('button', { name: 'Search' });
    await user.click(submit);

    expect(onSearch).toHaveBeenCalledWith({ owner: 'Aasa' }, { signal: expect.any(AbortSignal) });
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByText('Application message')).toBeVisible();
    expect(submit).toHaveFocus();

    rerender(<CategorySearch categories={[{ ...category, validationMessage: undefined }]} defaultOpen />);
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
    expect(submit).toHaveFocus();
    expect(screen.queryByText('Found parcel')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(await screen.findByText('Found parcel')).toBeVisible();
    expect(screen.queryByText('Application message')).not.toBeInTheDocument();
  });

  it('shows results when the application clears validation while submitting', async () => {
    const user = userEvent.setup();
    function Example() {
      const [message, setMessage] = useState<ReactNode>(<Alert type="danger">Review the filters</Alert>);
      const category = createCategory(
        'parcels',
        'Parcels',
        () => {
          setMessage(undefined);
          return ['Found parcel'];
        },
        message
      );
      return <CategorySearch categories={[category]} defaultOpen />;
    }
    render(<Example />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(await screen.findByText('Found parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
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

  it.each(['Close', 'minimizeCounter'] as const)(
    'preserves results and draft filters when closed with %s and reopened',
    async (closeWith) => {
      const user = userEvent.setup();
      const category = createCategory();
      const { rerender } = render(<CategorySearch categories={[category]} defaultOpen />);
      await user.type(screen.getByRole('textbox'), 'Aasa');
      await user.click(screen.getByRole('button', { name: 'Search' }));
      expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
      await user.click(screen.getByRole('button', { name: 'Show filters' }));
      await user.clear(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), 'Kask');
      await user.click(screen.getByRole('button', { name: 'Show results (1)' }));

      if (closeWith === 'Close') await user.click(screen.getByRole('button', { name: 'Close' }));
      else rerender(<CategorySearch categories={[category]} defaultOpen minimizeCounter={1} />);

      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
      expect(screen.getByText('Parcels: Aasa')).toBeVisible();
      expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
      expect(screen.getByText('Filters edited since searching.')).toBeVisible();
      await user.click(screen.getByRole('button', { name: 'Show filters' }));
      expect(screen.getByRole('textbox')).toHaveValue('Kask');
    }
  );

  it('restores each category draft and results after switching categories', async () => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory(), createCategory('notices', 'Notices')]} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');

    await selectCategory(user, 'Parcels');
    expect(screen.getByRole('textbox', { name: 'Parcels owner' })).toHaveValue('Kask');

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

    expect(screen.getByRole('button', { name: 'Clear' })).toHaveFocus();
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

  it.each([false, true])('clears results and restores filters with Clear filter when mobile is %s', async (mobile) => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createCategory()]} mobile={mobile} defaultOpen />);
    if (mobile) {
      await waitFor(() => expect(screen.getAllByRole('button', { name: 'Close' })[0]).toHaveFocus());
    }
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Clear filter' }));

    if (mobile) {
      expect(screen.getByRole('dialog', { name: 'Search' })).toBeVisible();
      expect(screen.queryByRole('button', { name: 'Filter' })).not.toBeInTheDocument();
      expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toHaveFocus();
    } else {
      expect(screen.getByRole('button', { name: 'Filter' })).toHaveFocus();
    }
    expect(screen.getByRole('region', { name: 'Parcels: Filter' })).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryByText('Parcels: Aasa')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear filter' })).not.toBeInTheDocument();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
  });

  it('shows a localized empty state only after a successful empty search and allows reopening it', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest
      .fn()
      .mockResolvedValueOnce(['Existing parcel'])
      .mockResolvedValueOnce([])
      .mockReturnValueOnce(pending.promise);
    const { container } = render(
      <CategorySearch
        categories={[createCategory('parcels', 'Parcels', onSearch)]}
        defaultOpen
        labels={{ noResults: 'Tulemusi ei leitud.' }}
      />
    );
    expect(container.querySelector('[data-name="tedi-empty-state"]')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Existing parcel')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Tulemusi ei leitud.')).toBeVisible();
    expect(container.querySelector('[data-name="tedi-empty-state"]')).toHaveClass('tedi-empty-state--inside');
    expect(screen.queryByText('0 results')).not.toBeInTheDocument();
    expect(screen.queryByText('Existing parcel')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await user.click(screen.getByRole('button', { name: 'Show results (0)' }));
    expect(screen.getByText('Tulemusi ei leitud.')).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Searching…')).toBeVisible();
    expect(container.querySelector('[data-name="tedi-empty-state"]')).not.toBeInTheDocument();

    await act(async () => {
      pending.reject(new Error('Temporary failure'));
    });
    expect(await screen.findByRole('alert')).toHaveTextContent('The search failed. Please try again.');
    expect(container.querySelector('[data-name="tedi-empty-state"]')).not.toBeInTheDocument();
  });

  it('renders successful results without a count when the result is not an array', async () => {
    const user = userEvent.setup();
    const category = defineCategorySearchCategory<Filters, { label: string }>({
      id: 'parcels',
      label: 'Parcels',
      mode: 'category',
      initialFilters: () => ({ owner: '' }),
      renderFilters: () => null,
      onSearch: () => ({ label: 'Found parcel' }),
      renderResults: ({ result }) => <p>{result.label}</p>,
    });
    render(<CategorySearch categories={[category]} defaultOpen />);
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(await screen.findByText('Found parcel')).toBeVisible();
    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('button', { name: 'Show results' })).toBeVisible();
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

  it('shows a failed search when the rejection value is undefined', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn().mockRejectedValue(undefined);
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
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', () => pending.promise)]} defaultOpen />);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show results (1)' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Found parcel')).toBeVisible();
  });

  it('hides saved results while searching and preserves edits and submitted filters', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest.fn().mockResolvedValueOnce(['Previous parcel']).mockReturnValueOnce(pending.promise);
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} defaultOpen />);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Previous parcel')).toBeVisible();
    expect(screen.getByText('1 results')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.type(screen.getByRole('textbox'), 'Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByText('Searching…')).toBeVisible();
    expect(screen.queryByText('Previous parcel')).not.toBeInTheDocument();
    expect(screen.queryByText('1 results')).not.toBeInTheDocument();
    expect(screen.queryByText('Filters edited since searching.')).not.toBeInTheDocument();
    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Kask');

    await act(async () => {
      pending.resolve(['Found parcel']);
    });
    expect(screen.getByRole('textbox')).toHaveValue('Kask');
    await user.click(screen.getByRole('button', { name: 'Show results (1)' }));
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(screen.queryByText('Previous parcel')).not.toBeInTheDocument();
    expect(screen.queryByText('Searching…')).not.toBeInTheDocument();
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
    render(<CategorySearch categories={[createCategory('parcels', 'Parcels', onSearch)]} disabled defaultOpen />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Search category: Parcels' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await user.click(screen.getByRole('button', { name: 'Search category: Parcels' }));
    expect(onSearch).not.toHaveBeenCalled();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('uses initialQuery only for initial population and leaves Clear empty', async () => {
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
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
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

  it.each([undefined, true, false])('respects showSearchButton=%s for text categories', async (showSearchButton) => {
    const user = userEvent.setup();
    render(<CategorySearch categories={[createTextCategory(undefined, showSearchButton)]} />);
    const input = screen.getByRole('searchbox');
    const searchButton = screen.queryByRole('button', { name: 'Search', hidden: true });

    if (showSearchButton === false) {
      expect(searchButton).not.toBeInTheDocument();
      expect(input).not.toHaveClass('tedi-search__input--has-button');
      await user.click(input);
      await user.tab();
      expect(screen.getByRole('button', { name: 'Search category: Addresses' })).toHaveFocus();
    } else {
      expect(searchButton).toBeVisible();
      expect(input).toHaveClass('tedi-search__input--has-button');
    }
  });

  it('submits Enter once and keeps filter submission when the text search button is hidden', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn(() => ['Aasa 1', 'Aasa 2']);
    const filterSearch = jest.fn(({ owner }: Filters) => [owner]);
    render(
      <CategorySearch
        categories={[createTextCategory(onSearch, false), createCategory('parcels', 'Parcels', filterSearch)]}
      />
    );
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Aa');
    expect(onSearch).toHaveBeenCalledTimes(2);
    await user.keyboard('{Enter}');
    expect(onSearch).toHaveBeenCalledTimes(3);
    expect(onSearch).toHaveBeenLastCalledWith('Aa', { signal: expect.any(AbortSignal) });
    expect(input).toHaveFocus();

    await selectCategory(user, 'Parcels');
    await user.type(screen.getByRole('textbox', { name: 'Parcels owner' }), 'Kask');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(filterSearch).toHaveBeenCalledTimes(1);
    expect(filterSearch).toHaveBeenCalledWith({ owner: 'Kask' }, { signal: expect.any(AbortSignal) });
  });

  it.each(['click', 'tap'] as const)('reopens the full saved text results with an input %s', async (interaction) => {
    const user = userEvent.setup();
    const onSearch = jest.fn(() => ['Aasa 1', 'Aasa 2']);
    render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'A');
    await user.click(await screen.findByRole('button', { name: 'Aasa 1' }));

    expect(input).toHaveValue('Aasa 1');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    if (interaction === 'tap') await user.pointer({ keys: '[TouchA]', target: input });
    else await user.click(input);

    expect(screen.getByRole('button', { name: 'Aasa 1' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Aasa 2' })).toBeVisible();
    expect(screen.getByText('Submitted query: A')).toBeVisible();
    expect(input).toHaveValue('Aasa 1');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('keeps saved text results independent when reopening categories', async () => {
    const user = userEvent.setup();
    const addressSearch = jest.fn(() => ['Aasa 1', 'Aasa 2']);
    const citySearch = jest.fn(() => ['Tallinn', 'Tartu']);
    const cities = { ...createTextCategory(citySearch), id: 'cities', label: 'Cities' };
    render(<CategorySearch categories={[createTextCategory(addressSearch), cities]} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'A');
    await user.click(await screen.findByRole('button', { name: 'Aasa 1' }));

    await selectCategory(user, 'Cities');
    expect(input).toHaveValue('');
    await user.click(input);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(citySearch).not.toHaveBeenCalled();
    await user.type(input, 'T');
    await user.click(await screen.findByRole('button', { name: 'Tartu' }));
    await user.click(input);
    expect(input).toHaveValue('Tartu');
    expect(screen.getByRole('button', { name: 'Tallinn' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Tartu' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Aasa 1' })).not.toBeInTheDocument();

    await selectCategory(user, 'Addresses');
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await user.click(input);
    expect(input).toHaveValue('Aasa 1');
    expect(screen.getByRole('button', { name: 'Aasa 1' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Aasa 2' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Tartu' })).not.toBeInTheDocument();
    expect(addressSearch).toHaveBeenCalledTimes(1);
    expect(citySearch).toHaveBeenCalledTimes(1);
  });

  it.each(['Enter', 'search button'] as const)(
    'explicitly submits the latest text query with %s without moving focus',
    async (submitWith) => {
      const user = userEvent.setup();
      const onSearch = jest.fn((query: string) => [query]);
      render(<CategorySearch categories={[createTextCategory(onSearch)]} labels={{ search: 'Find addresses' }} />);
      const input = screen.getByRole('searchbox');
      const searchButton = screen.getByRole('button', { name: 'Find addresses' });
      expect(searchButton).toBeInTheDocument();
      await user.type(input, 'Aa');
      expect(onSearch).toHaveBeenCalledTimes(2);
      expect(input).toHaveFocus();

      if (submitWith === 'Enter') await user.keyboard('{Enter}');
      else await user.click(searchButton);

      expect(onSearch).toHaveBeenCalledTimes(3);
      expect(onSearch).toHaveBeenLastCalledWith('Aa', { signal: expect.any(AbortSignal) });
      expect(screen.getByRole('region', { name: 'Addresses: Results' })).toBeVisible();
      expect(submitWith === 'Enter' ? input : searchButton).toHaveFocus();
    }
  );

  it.each([
    ['deleting the text', 'resolve'],
    ['deleting the text', 'reject'],
    ['Clear', 'resolve'],
    ['Clear', 'reject'],
  ] as const)('clears text with %s and ignores a late %s', async (clearWith, settle) => {
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
    expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();

    if (clearWith === 'Clear') await user.click(screen.getByRole('button', { name: /^clear$/i }));
    else await user.clear(input);

    expect(onSearch.mock.calls[1][1].signal.aborted).toBe(true);
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    await user.click(input);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    await user.keyboard('{Enter}');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledTimes(2);
    await selectCategory(user, 'Addresses');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    await user.type(input, 'N');

    expect(onSearch).toHaveBeenLastCalledWith('N', { signal: expect.any(AbortSignal) });
    expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Saved address' })).not.toBeInTheDocument();
    expect(screen.queryByText('Submitted query: A')).not.toBeInTheDocument();

    await act(async () => {
      if (settle === 'resolve') pending.resolve(['Cancelled address']);
      else pending.reject(new Error('Cancelled failure'));
    });

    expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Cancelled address' })).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(input).toHaveValue('N');
    expect(input).toHaveFocus();

    await act(async () => {
      next.resolve(['Current address']);
    });

    expect(await screen.findByRole('button', { name: 'Current address' })).toBeVisible();
    expect(screen.getByText('Submitted query: N')).toBeVisible();
  });

  it('retains text results after a failed replacement and restores input focus when retry disappears', async () => {
    const user = userEvent.setup();
    const pending = deferred<string[]>();
    const onSearch = jest
      .fn()
      .mockResolvedValueOnce(['Saved address'])
      .mockReturnValueOnce(pending.promise)
      .mockResolvedValueOnce(['Recovered address']);
    render(<CategorySearch categories={[createTextCategory(onSearch)]} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'A');
    expect(await screen.findByRole('button', { name: 'Saved address' })).toBeVisible();
    await user.type(input, 'b');

    expect(within(screen.getByRole('region')).getByRole('status')).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Saved address' })).not.toBeInTheDocument();
    expect(screen.queryByText('Submitted query: A')).not.toBeInTheDocument();
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

    await user.click(within(screen.getByRole('region')).getByRole('button', { name: 'Search' }));

    expect(await screen.findByRole('button', { name: 'Recovered address' })).toBeVisible();
    expect(screen.getByText('Submitted query: Ab')).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it.each(['Escape', 'minimizeCounter'] as const)(
    'keeps a text panel closed after %s when a pending live search finishes',
    async (closeWith) => {
      const user = userEvent.setup();
      const pending = deferred<string[]>();
      const onSearch = jest.fn().mockReturnValue(pending.promise);
      const category = createTextCategory(onSearch);
      const { rerender } = render(<CategorySearch categories={[category]} />);
      const input = screen.getByRole('searchbox');
      await user.type(input, 'A');

      if (closeWith === 'Escape') await user.keyboard('{Escape}');
      else rerender(<CategorySearch categories={[category]} minimizeCounter={1} />);

      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      expect(input).toHaveValue('A');
      expect(input).toHaveFocus();
      expect(onSearch.mock.calls[0][1].signal.aborted).toBe(false);
      await act(async () => {
        pending.resolve(['Found address']);
      });

      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      expect(input).toHaveFocus();
      await user.click(input);
      expect(screen.getByRole('button', { name: 'Found address' })).toBeVisible();
      expect(screen.getByText('Submitted query: A')).toBeVisible();
      expect(onSearch).toHaveBeenCalledTimes(1);
    }
  );

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
      expect(screen.getByRole('button', { name: 'Search' })).toHaveClass(`tedi-btn--${expectedSize}`);
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

  it('preserves filter values and results when full panel width changes', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn(() => ['Found parcel']);
    const categories = [createCategory('parcels', 'Parcels', onSearch)];
    const { rerender } = render(<CategorySearch categories={categories} defaultOpen />);
    await user.type(screen.getByRole('textbox'), 'Aasa');

    rerender(<CategorySearch categories={categories} fullWidthFilterPanel />);
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('Found parcel')).toBeVisible();

    rerender(<CategorySearch categories={categories} fullWidthFilterPanel={false} />);
    expect(screen.getByText('Found parcel')).toBeVisible();
    expect(screen.getByText('Submitted Parcels: Aasa')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('textbox')).toHaveValue('Aasa');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('forwards the root ref and applies independent bar and text-results dimensions', async () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <CategorySearch
        ref={ref}
        id="parcel-search"
        categories={[createCategory()]}
        searchBarWidth="30rem"
        textResultsPanelWidth={420}
        maxPanelHeight="60vh"
        className="map-search"
        defaultOpen
      />
    );
    expect(ref.current).toHaveAttribute('id', 'parcel-search');
    expect(ref.current).toHaveClass('map-search');
    expect(ref.current).toHaveStyle({ width: '30rem' });
    expect(ref.current).toContainElement(await screen.findByRole('region', { name: 'Parcels: Filter' }));
    expect(ref.current?.style.getPropertyValue('--category-search-text-results-panel-width')).toBe('420px');
    expect(ref.current?.style.getPropertyValue('--category-search-panel-max-height')).toBe('60vh');
  });
});
