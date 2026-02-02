import { render, screen } from '@testing-library/react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import Button from '../../buttons/button/button';
import Overlay from './overlay';
import { OverlayTrigger } from './overlay-trigger';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key) => `Mocked Label for ${key}`),
  })),
}));

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useIsTouchDevice: jest.fn(),
  useIsMounted: jest.fn(() => true),
}));

describe('Overlay.Trigger', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('applies correct class names when children is text', () => {
    render(
      <Overlay>
        <OverlayTrigger className="my-extra-class">Click me</OverlayTrigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );

    const trigger = screen.getByText('Click me');

    expect(trigger).toHaveClass('tedi-overlay__trigger');
    expect(trigger).toHaveClass('tedi-overlay__trigger--text');
    expect(trigger).toHaveClass('my-extra-class');
  });

  it('applies correct aria attributes when child is an Icon', () => {
    const { getLabel } = useLabels();

    render(
      <Overlay>
        <OverlayTrigger>
          <Icon name="search" data-testid="icon-child" />
        </OverlayTrigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );

    const icon = screen.getByTestId('icon-child');
    expect(icon).toHaveAttribute('aria-label', getLabel('tooltip.icon-trigger'));
  });

  it('does NOT apply aria-label when child is not an Icon', () => {
    const { getLabel } = useLabels();

    render(
      <Overlay>
        <OverlayTrigger>
          <Button data-testid="btn-child">Trigger Button</Button>
        </OverlayTrigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );

    const btn = screen.getByTestId('btn-child');
    expect(btn).not.toHaveAttribute('aria-label', getLabel('tooltip.icon-trigger'));
  });

  it('adds tabindex=0 to non-Icon valid elements (cloneElement path)', () => {
    render(
      <Overlay>
        <OverlayTrigger>
          <span data-testid="span-child">Hover me</span>
        </OverlayTrigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );

    const span = screen.getByTestId('span-child');
    expect(span).toHaveAttribute('tabindex', '0');
  });

  it('does NOT add aria-describedby when role is not "tooltip"', () => {
    render(
      <Overlay role="dialog" defaultOpen={true}>
        <OverlayTrigger>
          <div data-testid="trigger-dialog">Trigger</div>
        </OverlayTrigger>
        <Overlay.Content>Dialog content</Overlay.Content>
      </Overlay>
    );

    const trigger = screen.getByTestId('trigger-dialog');
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });
});
