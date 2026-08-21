import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { SearchAutocomplete, SearchAutocompleteOption } from './search-autocomplete';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string, ...args: unknown[]) => (args.length ? `${key}:${args.join(',')}` : key),
  }),
}));

const OPTIONS: SearchAutocompleteOption[] = [
  { value: 'mari', label: 'Mari Maasikas' },
  { value: 'mart', label: 'Mart Mesi' },
  { value: 'kalle', label: 'Kalle Kask', disabled: true },
];

const ControlledExample = (props: Partial<React.ComponentProps<typeof SearchAutocomplete>>) => {
  const [value, setValue] = useState('');
  const matches = OPTIONS.filter((o) => (o.label as string).toLowerCase().includes(value.toLowerCase()));

  return (
    <SearchAutocomplete
      id="ac"
      label="Otsi"
      value={value}
      onQueryChange={setValue}
      options={value ? matches : []}
      {...props}
    />
  );
};

describe('SearchAutocomplete', () => {
  it('renders the input as an accessible combobox', () => {
    render(<SearchAutocomplete id="ac" label="Otsi" options={[]} />);

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

  it('selects the active option on Enter and fires onSelect', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSelect={onSelect} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'ma');
    await screen.findByRole('listbox');

    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'mari' }));
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  });

  it('selects an option on click', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSelect={onSelect} />);

    await user.type(screen.getByRole('combobox'), 'mar');
    await screen.findByRole('listbox');

    await user.click(screen.getByRole('option', { name: 'Mart Mesi' }));

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'mart' }));
  });

  it('fires onSearch (not onSelect) on Enter when no option is active', async () => {
    const onSearch = jest.fn();
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSearch={onSearch} onSelect={onSelect} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'mar');
    await screen.findByRole('listbox');

    await user.keyboard('{Enter}');

    expect(onSearch).toHaveBeenCalledWith('mar');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('marks a disabled option and skips it on select', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(<ControlledExample onSelect={onSelect} />);

    await user.type(screen.getByRole('combobox'), 'kal');
    await screen.findByRole('listbox');

    const disabled = screen.getByRole('option', { name: 'Kalle Kask' });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabled);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('shows the loading row while loading', async () => {
    const user = userEvent.setup();
    render(<ControlledExample loading />);

    await user.type(screen.getByRole('combobox'), 'x');

    const listbox = await screen.findByRole('listbox');
    expect(within(listbox).getByText('search.loading')).toBeInTheDocument();
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

  it('shows the no-results row when the query matches nothing', async () => {
    const user = userEvent.setup();
    render(<SearchAutocomplete id="ac" label="Otsi" options={[]} />);

    await user.type(screen.getByRole('combobox'), 'zzz');

    const listbox = await screen.findByRole('listbox');
    expect(within(listbox).getByText('search.no-results')).toBeInTheDocument();
  });

  it('supports uncontrolled use — picking an option fills the input', async () => {
    const user = userEvent.setup();
    render(<SearchAutocomplete id="ac" label="Otsi" defaultValue="" options={OPTIONS} openThreshold={0} />);

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'mar');
    await screen.findByRole('listbox');

    await user.click(screen.getByRole('option', { name: 'Mari Maasikas' }));

    expect(input).toHaveValue('Mari Maasikas');
  });
});
