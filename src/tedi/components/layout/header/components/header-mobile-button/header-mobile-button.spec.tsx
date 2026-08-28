import { fireEvent, render, screen } from '@testing-library/react';

import HeaderMobileButton from './header-mobile-button';

import '@testing-library/jest-dom';

describe('HeaderMobileButton component', () => {
  it('renders a button with icon and label', () => {
    render(<HeaderMobileButton icon="menu" label="Menu" />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders as a Button when no href is provided', () => {
    render(<HeaderMobileButton icon="menu" label="Menu" />);

    expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders as a Link when href is provided and not disabled', () => {
    render(<HeaderMobileButton icon="menu" label="Menu" href="/page" />);

    const link = screen.getByRole('link', { name: /Menu/i });
    expect(link).toHaveAttribute('href', '/page');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as a Button when href is provided but disabled', () => {
    render(<HeaderMobileButton icon="menu" label="Menu" href="/page" disabled />);

    expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('calls onClick when Link is clicked', () => {
    const onClick = jest.fn();
    render(<HeaderMobileButton icon="menu" label="Menu" href="/page" onClick={onClick} />);

    fireEvent.click(screen.getByRole('link', { name: /Menu/i }));

    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick when Button is clicked', () => {
    const onClick = jest.fn();
    render(<HeaderMobileButton icon="menu" label="Menu" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: /Menu/i }));

    expect(onClick).toHaveBeenCalled();
  });

  it('applies selected class when selected is true', () => {
    render(<HeaderMobileButton icon="menu" label="Menu" selected />);

    const button = screen.getByRole('button', { name: /Menu/i });
    expect(button.className).toMatch(/header-mobile-button--selected/);
  });

  it('applies disabled class when disabled is true', () => {
    render(<HeaderMobileButton icon="menu" label="Menu" disabled />);

    const button = screen.getByRole('button', { name: /Menu/i });
    expect(button.className).toMatch(/header-mobile-button--disabled/);
  });

  it('renders icon from IconWithoutBackgroundProps object', () => {
    const { container } = render(
      <HeaderMobileButton icon={{ name: 'settings', className: 'custom-icon' }} label="Settings" />
    );

    expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<HeaderMobileButton icon="menu" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
