import { fireEvent, render, screen } from '@testing-library/react';

// The `src/tedi` barrel transitively imports react-sticky-box (ESM-only), which Jest does not transform.
jest.mock('react-sticky-box', () => ({ __esModule: true, default: () => null }));

import { MapButton } from './map-button';

describe('MapButton', () => {
  it('renders its label', () => {
    render(<MapButton>Mõõda</MapButton>);
    expect(screen.getByRole('button', { name: 'Mõõda' })).toBeInTheDocument();
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
});
