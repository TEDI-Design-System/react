import { render, screen } from '@testing-library/react';

import { DropdownItemValue } from './dropdown-item-value';

describe('DropdownItemValue', () => {
  it('renders the label and meta content', () => {
    render(
      <DropdownItemValue>
        <DropdownItemValue.Label>Tallinn</DropdownItemValue.Label>
        <DropdownItemValue.Meta>4 results</DropdownItemValue.Meta>
      </DropdownItemValue>
    );
    expect(screen.getByText('Tallinn')).toBeInTheDocument();
    expect(screen.getByText('4 results')).toBeInTheDocument();
  });

  it('does not render a selection indicator for the default type', () => {
    const { container } = render(
      <DropdownItemValue>
        <DropdownItemValue.Label>Plain</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(container.querySelector('[class*="indicator"]')).toBeNull();
  });

  it('renders a checked checkbox indicator when selected', () => {
    const { container } = render(
      <DropdownItemValue type="checkbox" selected>
        <DropdownItemValue.Label>Item</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(container.querySelector('[class*="checkbox--checked"]')).toBeInTheDocument();
  });

  it('renders an indeterminate checkbox indicator', () => {
    const { container } = render(
      <DropdownItemValue type="checkbox" indeterminate>
        <DropdownItemValue.Label>Item</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(container.querySelector('[class*="checkbox--checked"]')).toBeInTheDocument();
  });

  it('renders a radio indicator', () => {
    const { container } = render(
      <DropdownItemValue type="radio" selected>
        <DropdownItemValue.Label>Item</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(container.querySelector('[class*="radio--checked"]')).toBeInTheDocument();
  });

  it('keeps the selection indicator out of the accessibility tree', () => {
    render(
      <DropdownItemValue type="checkbox" selected>
        <DropdownItemValue.Label>Item</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    // No checkbox role is exposed — the parent item owns selection semantics.
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('renders a leading icon', () => {
    render(
      <DropdownItemValue icon="location_on">
        <DropdownItemValue.Label>Tallinn</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(screen.getByText('Tallinn')).toBeInTheDocument();
  });

  describe('indicatorSemantics="control" (listbox)', () => {
    it('exposes a radio with an accessible name from the label', () => {
      render(
        <DropdownItemValue type="radio" indicatorSemantics="control" selected>
          <DropdownItemValue.Label>Tartu</DropdownItemValue.Label>
        </DropdownItemValue>
      );
      const radio = screen.getByRole('radio', { name: 'Tartu' });
      expect(radio).toHaveAttribute('aria-checked', 'true');
    });

    it('exposes a checkbox with an indeterminate (mixed) state', () => {
      render(
        <DropdownItemValue type="checkbox" indicatorSemantics="control" indeterminate>
          <DropdownItemValue.Label>All</DropdownItemValue.Label>
        </DropdownItemValue>
      );
      expect(screen.getByRole('checkbox', { name: 'All' })).toHaveAttribute('aria-checked', 'mixed');
    });
  });
});
