import { render, screen } from '@testing-library/react';

import { DropdownItemValue } from './dropdown-item-value';
import styles from './dropdown-item-value.module.scss';

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

  it('does not expose a selection control for the default type', () => {
    render(
      <DropdownItemValue>
        <DropdownItemValue.Label>Plain</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(screen.getByText('Plain')).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(screen.queryByRole('radio')).toBeNull();
  });

  it('shows a check glyph for a selected checkbox without exposing a control (presentation)', () => {
    render(
      <DropdownItemValue type="checkbox" selected>
        <DropdownItemValue.Label>Item</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(screen.getByText('check')).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('shows a dash glyph for an indeterminate checkbox (presentation)', () => {
    render(
      <DropdownItemValue type="checkbox" indeterminate>
        <DropdownItemValue.Label>Item</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(screen.getByText('remove')).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('renders a selected radio without exposing a control (presentation)', () => {
    const { container } = render(
      <DropdownItemValue type="radio" selected>
        <DropdownItemValue.Label>Item</DropdownItemValue.Label>
      </DropdownItemValue>
    );
    expect(screen.queryByRole('radio')).toBeNull();
    expect(container.querySelector(`.${styles['tedi-dropdown-item-value__radio--checked']}`)).toBeInTheDocument();
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

    it('does not set a dangling aria-labelledby when no Label child is present', () => {
      render(
        <DropdownItemValue type="checkbox" indicatorSemantics="control" selected>
          <span>Bare text, not a Label</span>
        </DropdownItemValue>
      );
      expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-labelledby');
    });
  });
});
