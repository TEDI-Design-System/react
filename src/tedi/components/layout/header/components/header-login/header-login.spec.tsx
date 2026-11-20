import { fireEvent, render, screen } from '@testing-library/react';

import { HeaderLogin } from './header-login';

import '@testing-library/jest-dom';

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: () => ({ getLabel: (key: string) => key }),
}));

const getVariants = (container: HTMLElement) => container.querySelectorAll('[data-name="header-variant"]');

describe('HeaderLogin component', () => {
  it('renders a small and a default button, one per variant', () => {
    const { container } = render(<HeaderLogin />);

    const [small, large] = Array.from(getVariants(container));
    expect(small).toHaveTextContent('header.login.mobile');
    expect(large).toHaveTextContent('header.login');
    expect(large).not.toHaveTextContent('header.login.mobile');
  });

  it('wraps each variant in a div, since the button can hold block content', () => {
    const { container } = render(<HeaderLogin />);

    expect(Array.from(getVariants(container)).map((variant) => variant.tagName)).toEqual(['DIV', 'DIV']);
  });

  it('hides each variant at the breakpoints where the other one shows', () => {
    const { container } = render(<HeaderLogin />);

    const [small, large] = Array.from(getVariants(container));
    expect(small.className).toMatch(/hidden-md/);
    expect(small.className).not.toMatch(/hidden-sm/);
    expect(large.className).toMatch(/hidden-xs/);
    expect(large.className).toMatch(/hidden-sm/);
    expect(large.className).not.toMatch(/hidden-md/);
  });

  it('renders one button without a wrapper when size is set', () => {
    const { container } = render(<HeaderLogin size="small" />);

    expect(getVariants(container)).toHaveLength(0);
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(container).toHaveTextContent('header.login.mobile');
  });

  it('renders only the default variant when size is default', () => {
    const { container } = render(<HeaderLogin size="default" />);

    expect(getVariants(container)).toHaveLength(0);
    expect(container).toHaveTextContent('header.login');
    expect(container).not.toHaveTextContent('header.login.mobile');
  });

  it('applies size and label overrides from a breakpoint up', () => {
    const { container } = render(<HeaderLogin size="small" lg={{ size: 'default', label: 'Sign in' }} />);

    const [small, large] = Array.from(getVariants(container));
    expect(small).toHaveTextContent('header.login.mobile');
    expect(small.className).toMatch(/hidden-lg/);
    expect(large).toHaveTextContent('Sign in');
    expect(large.className).toMatch(/hidden-md/);
    expect(large.className).not.toMatch(/hidden-lg/);
  });

  it('renders an empty label from a breakpoint as its own variant, without duplicate keys', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const { container } = render(<HeaderLogin size="small" lg={{ label: '' }} />);

    expect(getVariants(container)).toHaveLength(2);
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('renders with custom label', () => {
    const { container } = render(<HeaderLogin label="Sign in" />);

    expect(container.textContent).toContain('Sign in');
  });

  it('renders links when href is provided', () => {
    const { container } = render(<HeaderLogin href="/login" />);

    expect(container.querySelectorAll('a[href="/login"]')).toHaveLength(2);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders buttons when href is not provided', () => {
    render(<HeaderLogin />);

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    render(<HeaderLogin onClick={onClick} size="default" />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
