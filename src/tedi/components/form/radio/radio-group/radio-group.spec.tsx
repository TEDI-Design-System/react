import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Radio from '..';

import '@testing-library/jest-dom';

describe('Radio.Group', () => {
  it('renders the legend and grouped radios sharing a name', () => {
    render(
      <Radio.Group label="Plan" name="plan">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </Radio.Group>
    );

    expect(screen.getByText('Plan')).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    radios.forEach((radio) => expect(radio).toHaveAttribute('name', 'plan'));
  });

  it('selects a single value (uncontrolled) and reports changes', () => {
    const onChange = jest.fn();
    render(
      <Radio.Group label="Plan" onChange={onChange}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </Radio.Group>
    );

    fireEvent.click(screen.getByRole('radio', { name: 'A' }));
    expect(onChange).toHaveBeenLastCalledWith('a');
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked();

    fireEvent.click(screen.getByRole('radio', { name: 'B' }));
    expect(onChange).toHaveBeenLastCalledWith('b');
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'A' })).not.toBeChecked();
  });

  it('reflects a controlled value', () => {
    render(
      <Radio.Group label="Plan" value="b" onChange={jest.fn()}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </Radio.Group>
    );

    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'A' })).not.toBeChecked();
  });

  it('generates a shared name when none is provided', () => {
    render(
      <Radio.Group label="Plan">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </Radio.Group>
    );

    const [first, second] = screen.getAllByRole('radio');
    expect(first.getAttribute('name')).toBeTruthy();
    expect(first.getAttribute('name')).toBe(second.getAttribute('name'));
  });

  it('applies the card variant markup from the group', () => {
    const { container } = render(
      <Radio.Group label="Plan" variant="card" cardVariant="secondary">
        <Radio value="a" label="A" />
      </Radio.Group>
    );

    expect(container.querySelector('.tedi-radio--card')).toBeInTheDocument();
    expect(container.querySelector('.tedi-radio--card-secondary')).toBeInTheDocument();
  });

  it('is a radiogroup labelled by its legend and conveys required/invalid at group level', () => {
    render(
      <Radio.Group label="Plan" required invalid>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </Radio.Group>
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAccessibleName('Plan');
    expect(group).toHaveAttribute('aria-required', 'true');
    expect(group).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows the required asterisk on the legend only, not repeated on every option', () => {
    const { container } = render(
      <Radio.Group label="Plan" required>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
        <Radio value="c" label="C" />
      </Radio.Group>
    );

    expect(container.querySelectorAll('[class*="tedi-label__required"]')).toHaveLength(0);
  });

  it('still shows a single option’s own required asterisk', () => {
    const { container } = render(
      <Radio.Group label="Plan">
        <Radio value="a" label="A" required />
        <Radio value="b" label="B" />
      </Radio.Group>
    );

    expect(container.querySelectorAll('[class*="tedi-label__required"]')).toHaveLength(1);
  });

  it('marks the items wrapper for the segmented card layout', () => {
    const { container } = render(
      <Radio.Group label="View" variant="card" layout="segmented" defaultValue="a">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </Radio.Group>
    );

    const items = container.querySelector('[data-layout="segmented"]');
    expect(items).toBeInTheDocument();
    expect(items).toHaveAttribute('data-direction', 'row');
    // still a single selectable radio group
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked();
  });

  it('disables every radio when the group is disabled', () => {
    render(
      <Radio.Group label="Plan" disabled>
        <Radio value="a" label="A" />
      </Radio.Group>
    );

    expect(screen.getByRole('radio', { name: 'A' })).toBeDisabled();
  });
});
