import { render, screen } from '@testing-library/react';

import { CollapseButton } from './collapse-button';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => ({ open: 'Open', close: 'Close' }[key] ?? key),
  }),
}));

const iconName = () => screen.getByRole('button').querySelector('[data-name="icon"]')?.textContent;

describe('CollapseButton expandDirection', () => {
  it('points the chevron down by default', () => {
    render(<CollapseButton open={false} />);
    expect(iconName()).toBe('expand_more');
  });

  it('points the chevron up when it expands upwards', () => {
    render(<CollapseButton open={false} expandDirection="up" />);
    expect(iconName()).toBe('expand_less');
  });

  it.each([
    ['icon with text', {}],
    ['icon only', { hideText: true }],
    ['secondary icon only', { hideText: true, arrowType: 'secondary' as const }],
  ])('uses the direction in the %s layout', (_, props) => {
    render(<CollapseButton open={false} expandDirection="up" {...props} />);
    expect(iconName()).toBe('expand_less');
  });

  it('flips the chevron with the open class, so an upward button points down when open', () => {
    const { rerender } = render(<CollapseButton open={false} expandDirection="up" />);
    expect(screen.getByRole('button').className).not.toMatch(/--open/);

    rerender(<CollapseButton open expandDirection="up" />);
    expect(screen.getByRole('button').className).toMatch(/--open/);
    expect(iconName()).toBe('expand_less');
  });
});
