import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Checkbox from '../checkbox';

import '@testing-library/jest-dom';

describe('Checkbox.Group', () => {
  it('toggles multiple values (uncontrolled) and reports the full list', () => {
    const onChange = jest.fn();
    render(
      <Checkbox.Group label="Toppings" onChange={onChange}>
        <Checkbox value="cheese" label="Cheese" />
        <Checkbox value="ham" label="Ham" />
      </Checkbox.Group>
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'Cheese' }));
    expect(onChange).toHaveBeenLastCalledWith(['cheese']);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Ham' }));
    expect(onChange).toHaveBeenLastCalledWith(['cheese', 'ham']);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Cheese' }));
    expect(onChange).toHaveBeenLastCalledWith(['ham']);
  });

  it('reflects a controlled value array', () => {
    render(
      <Checkbox.Group label="Toppings" value={['ham']} onChange={jest.fn()}>
        <Checkbox value="cheese" label="Cheese" />
        <Checkbox value="ham" label="Ham" />
      </Checkbox.Group>
    );

    expect(screen.getByRole('checkbox', { name: 'Ham' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Cheese' })).not.toBeChecked();
  });

  it('renders the legend and applies the card variant from the group', () => {
    const { container } = render(
      <Checkbox.Group label="Toppings" variant="card">
        <Checkbox value="cheese" label="Cheese" />
      </Checkbox.Group>
    );

    expect(screen.getByText('Toppings')).toBeInTheDocument();
    expect(container.querySelector('.tedi-checkbox--card-primary')).toBeInTheDocument();
  });

  describe('select-all (indeterminate)', () => {
    const renderWith = (value: string[], onChange = jest.fn()) =>
      render(
        <Checkbox.Group label="Toppings" indeterminateCheck value={value} onChange={onChange}>
          <Checkbox value="a" label="A" />
          <Checkbox value="b" label="B" />
        </Checkbox.Group>
      );

    it('is unchecked and labelled "select all" when nothing is selected', () => {
      renderWith([]);
      const selectAll = screen.getByRole<HTMLInputElement>('checkbox', { name: /select-all/i });
      expect(selectAll).not.toBeChecked();
      expect(selectAll.indeterminate).toBe(false);
    });

    it('is indeterminate when only some are selected', () => {
      renderWith(['a']);
      const selectAll = screen.getByRole<HTMLInputElement>('checkbox', { name: /select-all/i });
      expect(selectAll.indeterminate).toBe(true);
    });

    it('is checked and labelled "remove all" when all are selected', () => {
      renderWith(['a', 'b']);
      expect(screen.getByRole('checkbox', { name: /remove-all/i })).toBeChecked();
    });

    it('selects all children when clicked from empty', () => {
      const onChange = jest.fn();
      renderWith([], onChange);
      fireEvent.click(screen.getByRole('checkbox', { name: /select-all/i }));
      expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    });

    it('clears the children when clicked while all selected', () => {
      const onChange = jest.fn();
      renderWith(['a', 'b'], onChange);
      fireEvent.click(screen.getByRole('checkbox', { name: /remove-all/i }));
      expect(onChange).toHaveBeenLastCalledWith([]);
    });
  });

  it('keeps required/invalid on each checkbox, not on the group container', () => {
    render(
      <Checkbox.Group label="Toppings" required invalid>
        <Checkbox value="cheese" label="Cheese" />
      </Checkbox.Group>
    );

    const group = screen.getByRole('group', { name: 'Toppings' });
    expect(group).not.toHaveAttribute('aria-required');
    expect(group).not.toHaveAttribute('aria-invalid');
    expect(screen.getByRole('checkbox', { name: 'Cheese' })).toBeRequired();
  });

  it('disables every checkbox when the group is disabled', () => {
    render(
      <Checkbox.Group label="Toppings" disabled>
        <Checkbox value="cheese" label="Cheese" />
      </Checkbox.Group>
    );

    expect(screen.getByRole('checkbox', { name: 'Cheese' })).toBeDisabled();
  });
});
