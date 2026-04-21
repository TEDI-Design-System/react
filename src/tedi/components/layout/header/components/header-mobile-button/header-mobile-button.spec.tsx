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
    const { container } = render(<HeaderMobileButton icon="menu" label="Menu" />);

    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('a')).not.toBeInTheDocument();
  });

  it('renders as a Link when href is provided and not disabled', () => {
    const { container } = render(<HeaderMobileButton icon="menu" label="Menu" href="/page" />);

    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/page');
    expect(container.querySelector('button')).not.toBeInTheDocument();
  });

  it('renders as a Button when href is provided but disabled', () => {
    const { container } = render(<HeaderMobileButton icon="menu" label="Menu" href="/page" disabled />);

    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('a')).not.toBeInTheDocument();
  });

  it('calls onClick when Link is clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<HeaderMobileButton icon="menu" label="Menu" href="/page" onClick={onClick} />);

    const link = container.querySelector('a')!;
    fireEvent.click(link);

    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick when Button is clicked', () => {
    const onClick = jest.fn();
    render(<HeaderMobileButton icon="menu" label="Menu" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });

  it('applies selected class when selected is true', () => {
    const { container } = render(<HeaderMobileButton icon="menu" label="Menu" selected />);

    expect(container.querySelector('[class*="header-mobile-button--selected"]')).toBeInTheDocument();
  });

  it('applies disabled class when disabled is true', () => {
    const { container } = render(<HeaderMobileButton icon="menu" label="Menu" disabled />);

    expect(container.querySelector('[class*="header-mobile-button--disabled"]')).toBeInTheDocument();
  });

  it('renders icon from IconWithoutBackgroundProps object', () => {
    const { container } = render(
      <HeaderMobileButton icon={{ name: 'settings', className: 'custom-icon' }} label="Settings" />
    );

    expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(<HeaderMobileButton icon="menu" />);

    expect(container.querySelector('[class*="header-mobile-button__inner"]')).toBeInTheDocument();
  });
});
