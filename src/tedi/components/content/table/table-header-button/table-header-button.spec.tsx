import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { TableHeaderButton } from './table-header-button';

import '@testing-library/jest-dom';

describe('TableHeaderButton', () => {
  it('renders an icon-only button named by aria-label', () => {
    render(<TableHeaderButton icon="unfold_more" aria-label="Sort by name" />);
    expect(screen.getByRole('button', { name: 'Sort by name' })).toBeInTheDocument();
  });

  it('renders label children before the icon so the whole button is the sort target', () => {
    render(<TableHeaderButton icon="unfold_more">Name</TableHeaderButton>);
    expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
  });

  it('lets aria-label override visible label text for the accessible name', () => {
    render(
      <TableHeaderButton icon="unfold_more" aria-label="Sort by name">
        Name
      </TableHeaderButton>
    );
    expect(screen.getByRole('button', { name: 'Sort by name' })).toBeInTheDocument();
  });

  it('applies the selected modifier class when selected is true', () => {
    const { container } = render(<TableHeaderButton icon="arrow_upward" selected aria-label="Sorted" />);
    expect(container.querySelector('button')?.className).toMatch(/--selected/);
  });

  it('fires onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<TableHeaderButton icon="filter_alt" aria-label="Filter" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards arbitrary button attributes (aria-expanded, aria-controls)', () => {
    render(
      <TableHeaderButton icon="filter_alt" aria-label="Open filter" aria-expanded="true" aria-controls="filter-panel" />
    );
    const button = screen.getByRole('button', { name: 'Open filter' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', 'filter-panel');
  });

  it('renders the disabled state', () => {
    render(<TableHeaderButton icon="unfold_more" aria-label="Disabled" disabled />);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('forwards a ref to the underlying button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<TableHeaderButton ref={ref} icon="unfold_more" aria-label="Ref target" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('defaults to type="button" but honours an override', () => {
    const { rerender } = render(<TableHeaderButton icon="unfold_more" aria-label="Default" />);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveAttribute('type', 'button');

    rerender(<TableHeaderButton icon="unfold_more" aria-label="Submit" type="submit" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'submit');
  });

  it('merges custom className with the component class', () => {
    const { container } = render(<TableHeaderButton icon="unfold_more" aria-label="Custom" className="custom-class" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
    expect(button?.className).toMatch(/tedi-table-header-button/);
  });
});
