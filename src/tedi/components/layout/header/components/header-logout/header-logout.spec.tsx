import { fireEvent, render, screen } from '@testing-library/react';

import { HeaderLogout } from './header-logout';

import '@testing-library/jest-dom';

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: () => ({ getLabel: (key: string) => key }),
}));

const getVariants = (container: HTMLElement) => container.querySelectorAll('[data-name="header-variant"]');

describe('HeaderLogout component', () => {
  it('renders a small and a default button, one per variant', () => {
    const { container } = render(<HeaderLogout />);

    const [small, large] = Array.from(getVariants(container));
    expect(small).toHaveTextContent('header.logout.mobile');
    expect(large).toHaveTextContent('header.logout');
    expect(large).not.toHaveTextContent('header.logout.mobile');
  });

  it('wraps each variant in a div, since the button can hold block content', () => {
    const { container } = render(<HeaderLogout />);

    expect(Array.from(getVariants(container)).map((variant) => variant.tagName)).toEqual(['DIV', 'DIV']);
  });

  it('hides each variant at the breakpoints where the other one shows', () => {
    const { container } = render(<HeaderLogout />);

    const [small, large] = Array.from(getVariants(container));
    expect(small.className).toMatch(/hidden-md/);
    expect(small.className).not.toMatch(/hidden-sm/);
    expect(large.className).toMatch(/hidden-xs/);
    expect(large.className).toMatch(/hidden-sm/);
    expect(large.className).not.toMatch(/hidden-md/);
  });

  it('renders one button without a wrapper when size is set', () => {
    const { container } = render(<HeaderLogout size="small" />);

    expect(getVariants(container)).toHaveLength(0);
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(container).toHaveTextContent('header.logout.mobile');
  });

  it('renders only the default variant when size is default', () => {
    const { container } = render(<HeaderLogout size="default" />);

    expect(getVariants(container)).toHaveLength(0);
    expect(container).toHaveTextContent('header.logout');
    expect(container).not.toHaveTextContent('header.logout.mobile');
  });

  it('applies size and label overrides from a breakpoint up', () => {
    const { container } = render(<HeaderLogout size="small" lg={{ size: 'default', label: 'Sign in' }} />);

    const [small, large] = Array.from(getVariants(container));
    expect(small).toHaveTextContent('header.logout.mobile');
    expect(small.className).toMatch(/hidden-lg/);
    expect(large).toHaveTextContent('Sign in');
    expect(large.className).toMatch(/hidden-md/);
    expect(large.className).not.toMatch(/hidden-lg/);
  });

  it('renders with custom label', () => {
    const { container } = render(<HeaderLogout label="Sign in" />);

    expect(container.textContent).toContain('Sign in');
  });

  it('renders links when href is provided', () => {
    const { container } = render(<HeaderLogout href="/logout" />);

    expect(container.querySelectorAll('a[href="/logout"]')).toHaveLength(2);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders buttons when href is not provided', () => {
    render(<HeaderLogout />);

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    render(<HeaderLogout onClick={onClick} size="default" />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
