import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Search, SearchOption, SearchProps } from './search';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string, ...args: unknown[]) => (args.length ? `${key}:${args.join(',')}` : key),
  }),
}));

describe('Search component', () => {
  const defaultProps: SearchProps = {
    placeholder: 'Search...',
    onSearch: jest.fn(),
    value: '',
    id: 'search-1',
    label: 'Search',
  };

  it('renders the Search component with default properties', () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('renders the Search component with a custom placeholder', () => {
    render(<Search {...defaultProps} placeholder="Custom placeholder" />);
    const input = screen.getByPlaceholderText('Custom placeholder');
    expect(input).toBeInTheDocument();
  });

  it('does not name the search region with the placeholder (avoids double announcement)', () => {
    render(<Search {...defaultProps} placeholder="Search by name or keyword" />);
    const region = screen.getByRole('search');
    expect(region).toHaveAttribute('aria-label', 'search');
    expect(region.getAttribute('aria-label')).not.toBe('Search by name or keyword');
  });

  it('uses the provided ariaLabel as the search region name', () => {
    render(<Search {...defaultProps} ariaLabel="Search products" />);
    expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'Search products');
  });

  it('falls back to the generic label when ariaLabel is an empty string', () => {
    render(<Search {...defaultProps} ariaLabel="" />);
    expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'search');
  });

  it('renders the plain input as a searchbox', () => {
    render(<Search {...defaultProps} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('calls onSearch when the search button is clicked', () => {
    render(<Search {...defaultProps} button={{ children: 'Search' }} />);
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSearch).toHaveBeenCalledWith('');
  });

  it('calls onSearch with the current value when Enter is pressed in the input', () => {
    const onSearch = jest.fn();
    render(<Search {...defaultProps} onSearch={onSearch} value="query" />);
    fireEvent.keyDown(screen.getByPlaceholderText('Search...'), { key: 'Enter' });
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('query');
  });

  it('does not call onSearch for non-Enter keys', () => {
    const onSearch = jest.fn();
    render(<Search {...defaultProps} onSearch={onSearch} value="query" />);
    fireEvent.keyDown(screen.getByPlaceholderText('Search...'), { key: 'a' });
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('renders with a search icon by default', () => {
    render(<Search {...defaultProps} />);
    const icon = screen.getByText('search');
    expect(icon).toBeInTheDocument();
  });

  it('renders a custom icon when searchIcon prop is provided', () => {
    render(<Search {...defaultProps} searchIcon="custom-icon" />);
    const icon = screen.getByText('custom-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders with a button when the button prop is provided', () => {
    render(<Search {...defaultProps} button={{ children: 'Custom Button' }} />);
    const button = screen.getByText('Custom Button');
    expect(button).toBeInTheDocument();
  });

  it('does not render the button when button prop is not provided', () => {
    render(<Search {...defaultProps} />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('disables the input when the disabled prop is true', () => {
    render(<Search {...defaultProps} disabled />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeDisabled();
  });
});

describe('Search autocomplete (suggestions)', () => {
  const OPTIONS: SearchOption[] = [
    { value: 'mari', label: 'Mari Maasikas' },
    { value: 'mart', label: 'Mart Mesi' },
    { value: 'kalle', label: 'Kalle Kask', disabled: true },
  ];

  const ControlledExample = (props: Partial<SearchProps>) => {
    const [value, setValue] = useState('');
    const matches = OPTIONS.filter((o) => (o.label as string).toLowerCase().includes(value.toLowerCase()));

    return (
      <Search id="ac" label="Otsi" value={value} onChange={setValue} suggestions={value ? matches : []} {...props} />
    );
  };

  it('renders the input as an accessible combobox', () => {
    render(<Search id="ac" label="Otsi" suggestions={[]} />);

    const input = screen.getByRole('combobox', { name: 'Otsi' });
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a listbox with options once the query meets the threshold', async () => {
    const user = userEvent.setup();
    render(<ControlledExample />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'mar');

    const listbox = await screen.findByRole('listbox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
    expect(within(listbox).getByRole('option', { name: 'Mari Maasikas' })).toBeInTheDocument();
  });

  it('moves the virtual cursor with the arrow keys via aria-activedescendant', async () => {
    const user = userEvent.setup();
    render(<ControlledExample />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'ma');
    await screen.findByRole('listbox');

    await user.keyboard('{ArrowDown}');

    const firstOption = screen.getByRole('option', { name: 'Mari Maasikas' });
    expect(input).toHaveAttribute('aria-activedescendant', firstOption.id);
    expect(firstOption).toHaveAttribute('aria-selected', 'true');
    expect(input).toHaveFocus();
  });

  it('selects the active option on Enter and fires onSuggestionSelect', async () => {
    const onSuggestionSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSuggestionSelect={onSuggestionSelect} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'ma');
    await screen.findByRole('listbox');

    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSuggestionSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'mari' }));
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });

  it('selects an option on click', async () => {
    const onSuggestionSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSuggestionSelect={onSuggestionSelect} />);

    await user.type(screen.getByRole('combobox'), 'mar');
    await screen.findByRole('listbox');

    await user.click(screen.getByRole('option', { name: 'Mart Mesi' }));

    expect(onSuggestionSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'mart' }));
  });

  it('fires onSearch (not onSuggestionSelect) on Enter when no option is active', async () => {
    const onSearch = jest.fn();
    const onSuggestionSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSearch={onSearch} onSuggestionSelect={onSuggestionSelect} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'mar');
    await screen.findByRole('listbox');

    await user.keyboard('{Enter}');

    expect(onSearch).toHaveBeenCalledWith('mar');
    expect(onSuggestionSelect).not.toHaveBeenCalled();
  });

  it('marks a disabled option and skips it on select', async () => {
    const onSuggestionSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSuggestionSelect={onSuggestionSelect} />);

    await user.type(screen.getByRole('combobox'), 'kal');
    await screen.findByRole('listbox');

    const disabled = screen.getByRole('option', { name: 'Kalle Kask' });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabled);
    expect(onSuggestionSelect).not.toHaveBeenCalled();
  });

  it('shows the loading row while loading', async () => {
    const user = userEvent.setup();
    render(<ControlledExample loading />);

    await user.type(screen.getByRole('combobox'), 'x');

    // Shown both in the visible loading row and the polite live-region announcement.
    expect((await screen.findAllByText('search.loading')).length).toBeGreaterThan(0);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('clears aria-activedescendant when the active option is no longer rendered (loading)', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ControlledExample />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'ma');
    await screen.findByRole('listbox');
    await user.keyboard('{ArrowDown}');

    const firstOption = screen.getByRole('option', { name: 'Mari Maasikas' });
    expect(input).toHaveAttribute('aria-activedescendant', firstOption.id);

    rerender(<ControlledExample loading />);
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('renders an option description as a secondary line', async () => {
    const user = userEvent.setup();
    render(
      <Search
        id="ac"
        label="Otsi"
        minQueryLength={0}
        suggestions={[{ value: 'mari', label: 'Mari Maasikas', description: 'Tootejuht' }]}
      />
    );

    await user.type(screen.getByRole('combobox'), 'm');

    const option = await screen.findByRole('option', { name: /Mari Maasikas/ });
    expect(within(option).getByText('Tootejuht')).toBeInTheDocument();
  });

  it('shows the no-results row when the query matches nothing', async () => {
    const user = userEvent.setup();
    render(<Search id="ac" label="Otsi" suggestions={[]} />);

    await user.type(screen.getByRole('combobox'), 'zzz');

    expect((await screen.findAllByText('search.no-results')).length).toBeGreaterThan(0);
  });

  it('supports uncontrolled use — picking an option fills the input', async () => {
    const user = userEvent.setup();
    render(<Search id="ac" label="Otsi" defaultValue="" suggestions={OPTIONS} minQueryLength={0} />);

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'mar');
    await screen.findByRole('listbox');

    await user.click(screen.getByRole('option', { name: 'Mari Maasikas' }));

    expect(input).toHaveValue('Mari Maasikas');
  });

  it('closes the popup when focus leaves the field (no footer)', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ControlledExample isClearable={false} />
        <button type="button">After</button>
      </>
    );

    await user.type(screen.getByRole('combobox'), 'mar');
    await screen.findByRole('listbox');

    await user.tab();

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('keeps the popup open on page scroll by default', async () => {
    const user = userEvent.setup();
    render(<ControlledExample />);

    await user.type(screen.getByRole('combobox'), 'mar');
    await screen.findByRole('listbox');

    fireEvent.scroll(window);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes the popup on page scroll when hideOnScroll is set', async () => {
    const user = userEvent.setup();
    render(<ControlledExample hideOnScroll />);

    await user.type(screen.getByRole('combobox'), 'mar');
    await screen.findByRole('listbox');

    fireEvent.scroll(window);
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });

  it('renders footer content and lets Tab move focus into it', async () => {
    const user = userEvent.setup();
    render(<ControlledExample footer={<button type="button">Isik teadmata</button>} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'mar');
    await screen.findByRole('listbox');

    const footerButton = screen.getByRole('button', { name: 'Isik teadmata' });
    expect(footerButton).toBeInTheDocument();

    await user.tab();
    expect(footerButton).toHaveFocus();
  });
});
