import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Filter, FilterOption } from './filter';
import { FilterGroup } from './filter-group';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => {
  const labels: Record<string, string> = {
    'filter.clear-selection': 'Tühjenda valik',
    'filter.select-all': 'Vali kõik',
    close: 'Close',
  };
  return {
    useLabels: () => ({
      getLabel: (key: string) => labels[key] ?? key,
    }),
  };
});

const options: FilterOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c', disabled: true },
];

describe('Filter — toggle mode', () => {
  it('renders the trigger with text', () => {
    render(<Filter text="Active" />);
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
  });

  it('toggles selected state on click (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<Filter text="Active" />);
    const button = screen.getByRole('button', { name: /active/i });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('respects defaultSelected', () => {
    render(<Filter text="Active" defaultSelected />);
    expect(screen.getByRole('button', { name: /active/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelectedChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Filter text="Active" onSelectedChange={onChange} />);
    await user.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('honours controlled selected prop', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { rerender } = render(<Filter text="Active" selected={false} onSelectedChange={onChange} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    rerender(<Filter text="Active" selected onSelectedChange={onChange} />);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('disables the trigger when disabled', () => {
    render(<Filter text="Active" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('Filter — single-select dropdown', () => {
  it('opens the menu on trigger click and renders an item per option', async () => {
    const user = userEvent.setup();
    render(<Filter text="Teenus" options={options} />);
    await user.click(screen.getByRole('button', { name: /teenus/i }));
    const menu = await screen.findByRole('menu');
    expect(within(menu).getAllByRole('menuitem')).toHaveLength(3);
  });

  it('selecting an option updates the trigger label and closes the menu', async () => {
    const user = userEvent.setup();
    render(<Filter text="Teenus" options={options} />);
    await user.click(screen.getByRole('button', { name: /teenus/i }));
    await user.click(screen.getByRole('menuitem', { name: 'Option A' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAccessibleName('Option A');
  });

  it('preserveLabel keeps the filter label as a prefix', async () => {
    const user = userEvent.setup();
    render(<Filter text="Teenus" options={options} preserveLabel />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('menuitem', { name: 'Option A' }));
    expect(screen.getByRole('button')).toHaveAccessibleName('Teenus: Option A');
  });

  it('calls onSelectedValueChange with the new value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Filter text="Teenus" options={options} onSelectedValueChange={onChange} />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('menuitem', { name: 'Option B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not commit a value when a disabled option is clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Filter text="Teenus" options={options} onSelectedValueChange={onChange} />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('menuitem', { name: 'Option C' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clear button resets the selection', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Filter text="Teenus" options={options} showClear onSelectedValueChange={onChange} defaultSelectedValue="a" />
    );
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button', { name: /tühjenda valik/i }));
    expect(onChange).toHaveBeenCalledWith('');
  });
});

describe('Filter — multi-select dropdown', () => {
  it('opens with one checkbox per option and toggles them independently', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Filter text="Tags" multiselect options={options} onSelectedValuesChange={onChange} />);
    await user.click(screen.getByRole('button'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
    expect(onChange).toHaveBeenLastCalledWith(['a']);
    await user.click(screen.getByRole('checkbox', { name: 'Option B' }));
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    // The menu stays open across multi-select clicks.
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('shows a count badge that mirrors the number of selected options', async () => {
    const user = userEvent.setup();
    render(<Filter text="Tags" multiselect options={options} defaultSelectedValues={['a', 'b']} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('select-all toggles all enabled filtered options', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Filter text="Tags" multiselect options={options} showSelectAll onSelectedValuesChange={onChange} />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('checkbox', { name: /vali kõik/i }));
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
  });

  it('select-all deselects all when every filtered option is already selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Filter
        text="Tags"
        multiselect
        options={options}
        showSelectAll
        defaultSelectedValues={['a', 'b']}
        onSelectedValuesChange={onChange}
      />
    );
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('checkbox', { name: /vali kõik/i }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('search input filters the visible options', async () => {
    const user = userEvent.setup();
    render(<Filter text="Tags" multiselect options={options} searchable />);
    await user.click(screen.getByRole('button'));
    await user.type(screen.getByRole('searchbox'), 'b');
    expect(screen.queryByRole('checkbox', { name: 'Option A' })).not.toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Option B' })).toBeInTheDocument();
  });

  it('clear empties the selection', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Filter
        text="Tags"
        multiselect
        options={options}
        defaultSelectedValues={['a', 'b']}
        showClear
        onSelectedValuesChange={onChange}
      />
    );
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button', { name: /tühjenda valik/i }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});

describe('Filter — custom dropdown content', () => {
  it('renders children and an optional clear action that fires onClear', async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    render(
      <Filter text="Period" showClear onClear={onClear}>
        <div>custom panel</div>
      </Filter>
    );
    await user.click(screen.getByRole('button', { name: /period/i }));
    expect(screen.getByText('custom panel')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /tühjenda valik/i }));
    expect(onClear).toHaveBeenCalled();
  });

  it('warns when defaultSelected / onSelectedChange are passed alongside custom-content children', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(
      <Filter text="Period" defaultSelected onSelectedChange={() => undefined}>
        <div>custom panel</div>
      </Filter>
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('not honoured in custom-content mode'));
    warn.mockRestore();
  });

  it('does not warn when custom-content filter uses the controlled `selected` prop', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(
      <Filter text="Period" selected>
        <div>custom panel</div>
      </Filter>
    );
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe('FilterGroup — single-select (radiogroup)', () => {
  function Harness() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <FilterGroup label="Status" value={value} onValueChange={setValue}>
        <Filter text="All" value="all" />
        <Filter text="Active" value="active" />
        <Filter text="Done" value="done" />
      </FilterGroup>
    );
  }

  it('uses radiogroup semantics and radio roles on each filter', () => {
    render(<Harness />);
    expect(screen.getByRole('radiogroup', { name: 'Status' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('selecting one filter deselects the others', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const radios = screen.getAllByRole('radio');
    await user.click(radios[1]);
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('clicking the selected filter toggles it back to null', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const radios = screen.getAllByRole('radio');
    await user.click(radios[1]);
    await user.click(radios[1]);
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
  });
});

describe('FilterGroup — multi-select', () => {
  function Harness() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <FilterGroup label="Tags" multiselect values={values} onValuesChange={setValues}>
        <Filter text="Urgent" value="urgent" />
        <Filter text="Review" value="review" />
        <Filter text="Draft" value="draft" />
      </FilterGroup>
    );
  }

  it('exposes group role and aria-pressed on each filter', () => {
    render(<Harness />);
    expect(screen.getByRole('group', { name: 'Tags' })).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('toggles filters independently', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('FilterGroup — unmanaged', () => {
  it('does not add group role when no managed props are passed', () => {
    render(
      <FilterGroup>
        <Filter text="Foo" defaultSelected />
        <Filter text="Bar" />
      </FilterGroup>
    );
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('FilterGroup — dropdown filters keep their own selection state', () => {
  // Regression: when a Filter with `options` (single- or multi-select) lives inside a
  // managed FilterGroup, the chip used to read `isSelected` from `group.isSelected(...)`,
  // which was never updated by the dropdown commit paths. The chip stayed unselected
  // even after the user picked a value.
  it('single-select dropdown inside a managed group reflects the dropdown selection', () => {
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    const { container } = render(
      <FilterGroup label="Sort">
        <Filter text="Sort" options={options} defaultSelectedValue="a" value="group-key" />
      </FilterGroup>
    );

    // Pre-fix the wrapper read `isSelected` from the group (unset), so this
    // class was missing even though the dropdown had a selected value.
    expect(container.querySelector('.tedi-filter')?.className).toMatch(/tedi-filter--selected/);
  });

  it('multi-select dropdown inside a managed group reflects the dropdown selection', async () => {
    const user = userEvent.setup();
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];
    render(
      <FilterGroup label="Tags" multiselect>
        <Filter text="Tags" multiselect options={options} value="group-key" />
      </FilterGroup>
    );

    await user.click(screen.getByRole('button', { name: /tags/i }));
    await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
    // The count badge renders only when `isSelected` is true. Pre-fix the chip
    // read `isSelected` from the unset group state, so the badge never appeared.
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

describe('FilterGroup — accessible name', () => {
  it('uses ariaLabelledBy when set (alternative to `label`)', () => {
    render(
      <>
        <h2 id="tags-heading">Tags</h2>
        <FilterGroup ariaLabelledBy="tags-heading" multiselect>
          <Filter text="Foo" value="foo" />
          <Filter text="Bar" value="bar" />
        </FilterGroup>
      </>
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-labelledby', 'tags-heading');
    expect(group).not.toHaveAttribute('aria-label');
  });

  it('warns in dev when a managed group has no accessible name', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(
      <FilterGroup multiselect>
        <Filter text="Foo" value="foo" />
        <Filter text="Bar" value="bar" />
      </FilterGroup>
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('needs an accessible name'));
    warn.mockRestore();
  });
});

describe('FilterGroup — uncontrolled', () => {
  it('single-select tracks the selection in internal state when `value` is not provided', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    render(
      <FilterGroup label="Tags" onValueChange={onValueChange}>
        <Filter text="Foo" value="foo" />
        <Filter text="Bar" value="bar" />
      </FilterGroup>
    );

    const [foo, bar] = screen.getAllByRole('radio');
    await user.click(foo);
    expect(foo).toBeChecked();
    expect(bar).not.toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith('foo');

    await user.click(bar);
    expect(foo).not.toBeChecked();
    expect(bar).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith('bar');

    // Clicking the active one toggles it back to null.
    await user.click(bar);
    expect(bar).not.toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it('multi-select tracks the selection in internal state when `values` is not provided', async () => {
    const user = userEvent.setup();
    const onValuesChange = jest.fn();
    render(
      <FilterGroup label="Tags" multiselect onValuesChange={onValuesChange}>
        <Filter text="Foo" value="foo" />
        <Filter text="Bar" value="bar" />
      </FilterGroup>
    );

    const [foo, bar] = screen.getAllByRole('button');
    await user.click(foo);
    expect(foo).toHaveAttribute('aria-pressed', 'true');
    expect(onValuesChange).toHaveBeenLastCalledWith(['foo']);

    await user.click(bar);
    expect(foo).toHaveAttribute('aria-pressed', 'true');
    expect(bar).toHaveAttribute('aria-pressed', 'true');
    expect(onValuesChange).toHaveBeenLastCalledWith(['foo', 'bar']);

    // Toggle one off.
    await user.click(foo);
    expect(foo).toHaveAttribute('aria-pressed', 'false');
    expect(onValuesChange).toHaveBeenLastCalledWith(['bar']);
  });
});
