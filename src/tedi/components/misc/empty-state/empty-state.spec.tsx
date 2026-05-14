import { render, screen } from '@testing-library/react';

import { EmptyState } from './empty-state';

import '@testing-library/jest-dom';

describe('EmptyState', () => {
  it('renders the description passed as children', () => {
    render(<EmptyState>Nothing to see here</EmptyState>);
    expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
  });

  it('renders the default spa icon when no icon prop is provided', () => {
    const { container } = render(<EmptyState>Empty</EmptyState>);
    const icon = container.querySelector('[data-name="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('spa');
  });

  it('renders the icon named by a string icon prop', () => {
    const { container } = render(<EmptyState icon="event_busy">Empty</EmptyState>);
    const icon = container.querySelector('[data-name="icon"]');
    expect(icon).toHaveTextContent('event_busy');
  });

  it('accepts a full IconProps object for the icon', () => {
    const { container } = render(<EmptyState icon={{ name: 'inbox', color: 'secondary' }}>Empty</EmptyState>);
    const icon = container.querySelector('[data-name="icon"]');
    expect(icon).toHaveTextContent('inbox');
  });

  it('hides the icon when icon is null', () => {
    const { container } = render(<EmptyState icon={null}>Empty</EmptyState>);
    expect(container.querySelector('[data-name="icon"]')).not.toBeInTheDocument();
  });

  it('renders a heading as an h3 in brand color', () => {
    const { container } = render(<EmptyState heading="Choose new time">You have no data to display</EmptyState>);
    const heading = container.querySelector('h3');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Choose new time');
  });

  it('renders the actions slot', () => {
    render(<EmptyState actions={<button type="button">Create new</button>}>Empty</EmptyState>);
    expect(screen.getByRole('button', { name: 'Create new' })).toBeInTheDocument();
  });

  it('applies the separate type class by default', () => {
    const { container } = render(<EmptyState>Empty</EmptyState>);
    const root = container.querySelector('[data-name="tedi-empty-state"]');
    expect(root?.className).toMatch(/--separate/);
  });

  it.each([
    ['separate', '--separate'],
    ['attached', '--attached'],
    ['inside', '--inside'],
  ] as const)('applies the %s type class', (type, fragment) => {
    const { container } = render(<EmptyState type={type}>Empty</EmptyState>);
    const root = container.querySelector('[data-name="tedi-empty-state"]');
    expect(root?.className).toContain(fragment);
  });

  it.each([
    ['default', '--default'],
    ['small', '--small'],
  ] as const)('applies the %s size class', (size, fragment) => {
    const { container } = render(<EmptyState size={size}>Empty</EmptyState>);
    const root = container.querySelector('[data-name="tedi-empty-state"]');
    expect(root?.className).toContain(fragment);
  });

  it('merges a custom className onto the root', () => {
    const { container } = render(<EmptyState className="my-empty">Empty</EmptyState>);
    expect(container.querySelector('[data-name="tedi-empty-state"]')?.className).toContain('my-empty');
  });

  it('omits the content wrapper when neither heading nor description is provided', () => {
    const { container } = render(<EmptyState icon="spa">{null}</EmptyState>);
    const contentDivs = container.querySelectorAll('[class*="tedi-empty-state__content"]');
    expect(contentDivs).toHaveLength(0);
  });

  it('omits the actions wrapper when actions is not provided', () => {
    const { container } = render(<EmptyState>Empty</EmptyState>);
    expect(container.querySelector('[class*="tedi-empty-state__actions"]')).not.toBeInTheDocument();
  });

  it('has the expected displayName', () => {
    expect(EmptyState.displayName).toBe('EmptyState');
  });
});
