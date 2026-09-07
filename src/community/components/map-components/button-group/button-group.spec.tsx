import { fireEvent, render, screen } from '@testing-library/react';

// The `src/tedi` barrel transitively imports react-sticky-box (ESM-only), which Jest does not transform.
jest.mock('react-sticky-box', () => ({ __esModule: true, default: () => null }));

import { MapButton } from '../map-button/map-button';
import { ButtonGroup } from './button-group';

describe('ButtonGroup', () => {
  it('renders MapButton children', () => {
    render(
      <ButtonGroup ariaLabel="Group">
        <MapButton id="a">A</MapButton>
        <MapButton id="b">B</MapButton>
      </ButtonGroup>
    );

    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'B' })).toBeInTheDocument();
  });

  it('applies active and disabled modifier classes based on child props', () => {
    render(
      <ButtonGroup ariaLabel="Group">
        <MapButton id="a" isActive>
          A
        </MapButton>
        <MapButton id="b" disabled>
          B
        </MapButton>
      </ButtonGroup>
    );

    expect(screen.getByRole('button', { name: 'A' }).className).toContain('tedi-button-group__item--active');
    expect(screen.getByRole('button', { name: 'B' }).className).toContain('tedi-button-group__item--disabled');
  });

  it('keeps a custom className on a child alongside the group-injected classes', () => {
    render(
      <ButtonGroup ariaLabel="Group">
        <MapButton id="a" className="custom-class">
          A
        </MapButton>
      </ButtonGroup>
    );

    const button = screen.getByRole('button', { name: 'A' });
    expect(button.className).toContain('tedi-button-group__item');
    expect(button.className).toContain('custom-class');
  });

  it('fires both the child onClick and onSelectionChange', () => {
    const onClick = jest.fn();
    const onSelectionChange = jest.fn();

    render(
      <ButtonGroup ariaLabel="Group" onSelectionChange={onSelectionChange}>
        <MapButton id="a" onClick={onClick}>
          A
        </MapButton>
      </ButtonGroup>
    );

    fireEvent.click(screen.getByRole('button', { name: 'A' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledWith('a');
  });

  it('does not fire onClick or onSelectionChange when the child is disabled', () => {
    const onClick = jest.fn();
    const onSelectionChange = jest.fn();

    render(
      <ButtonGroup ariaLabel="Group" onSelectionChange={onSelectionChange}>
        <MapButton id="a" disabled onClick={onClick}>
          A
        </MapButton>
      </ButtonGroup>
    );

    fireEvent.click(screen.getByRole('button', { name: 'A' }));

    expect(onClick).not.toHaveBeenCalled();
    expect(onSelectionChange).not.toHaveBeenCalled();
  });
});
