import { fireEvent, render, screen, within } from '@testing-library/react';
import { createRef } from 'react';

// The `src/tedi` barrel transitively imports react-sticky-box (ESM-only), which Jest does not transform.
jest.mock('react-sticky-box', () => ({ __esModule: true, default: () => null }));

import { MapButton } from './map-button';

describe('MapButton', () => {
  it('renders its label', () => {
    render(<MapButton>Mõõda</MapButton>);
    expect(screen.getByRole('button', { name: 'Mõõda' })).toBeInTheDocument();
  });

  it('keeps the label as the accessible name when it is hidden visually', () => {
    render(
      <MapButton hideLabel icon="straighten" tooltipContent={null}>
        Mõõda
      </MapButton>
    );

    // The icon is `aria-hidden`, so the visually hidden label is the only source of a name.
    const btn = screen.getByRole('button', { name: 'Mõõda' });
    expect(btn).toHaveTextContent('Mõõda');
    expect(within(btn).getByText('Mõõda')).toHaveClass('sr-only');
  });

  it('is disabled and does not fire onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <MapButton disabled onClick={onClick}>
        Text
      </MapButton>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('blocks onClick and marks busy while loading', () => {
    const onClick = jest.fn();
    render(
      <MapButton isLoading onClick={onClick}>
        Text
      </MapButton>
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies the underline / is-hovered / active modifier classes', () => {
    const { rerender } = render(<MapButton underline>Text</MapButton>);
    expect(screen.getByRole('button').className).toContain('tedi-map-button--underline');

    rerender(<MapButton isHovered>Text</MapButton>);
    expect(screen.getByRole('button').className).toContain('tedi-map-button--is-hovered');

    rerender(<MapButton isActive>Text</MapButton>);
    expect(screen.getByRole('button').className).toContain('tedi-map-button--is-active');
  });

  it('forwards isActive to dropdownItems so the active option is highlighted', () => {
    render(
      <MapButton
        dropdownItems={[
          { children: 'Option A', isActive: false },
          { children: 'Option B', isActive: true },
        ]}
      >
        Text
      </MapButton>
    );

    fireEvent.click(screen.getByRole('combobox'));

    const options = screen.getAllByRole('option');
    expect(options[0].className).not.toContain('tedi-map-dropdown__item--active');
    expect(options[1].className).toContain('tedi-map-dropdown__item--active');

    // Keyboard navigation should also initialize from the active item (roving tabIndex).
    expect(options[0]).toHaveAttribute('tabindex', '-1');
    expect(options[1]).toHaveAttribute('tabindex', '0');
  });

  it('forwards the ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<MapButton ref={ref}>Text</MapButton>);
    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('forwards the ref even when the dropdown claims the trigger as its floating reference', () => {
    // Regression: MapDropdown clones the trigger, and its own `refs.setReference` used to be
    // overwritten by (or overwrite) the trigger's ref. On React 19 the collision dropped
    // floating-ui's reference, so the dropdown rendered unanchored in the top-left corner.
    const ref = createRef<HTMLButtonElement>();
    render(
      <MapButton ref={ref} dropdownItems={[{ children: 'Option A' }]}>
        Text
      </MapButton>
    );

    const trigger = screen.getByRole('combobox');
    expect(ref.current).toBe(trigger);

    // Floating-ui still owns the trigger: clicking it opens the listbox.
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});
