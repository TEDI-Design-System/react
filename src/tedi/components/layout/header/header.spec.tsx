import { render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../helpers';
import { useTheme } from '../../../providers/theme-provider/theme-provider';
import { Header, HeaderActions, HeaderCenter, HeaderLogo } from './header';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useBreakpoint: jest.fn(),
  isBreakpointBelow: jest.fn(),
  useBreakpointProps: jest.fn(),
}));

jest.mock('../../../providers/theme-provider/theme-provider', () => ({
  useTheme: jest.fn(),
}));

describe('Header component', () => {
  beforeEach(() => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => props),
    });
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  describe('Header', () => {
    it('renders children content', () => {
      render(
        <Header>
          <span>Header content</span>
        </Header>
      );

      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('renders a header element', () => {
      render(
        <Header>
          <span>Content</span>
        </Header>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders toggle when provided', () => {
      render(
        <Header toggle={<button>Toggle</button>}>
          <span>Content</span>
        </Header>
      );

      expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
    });

    it('does not render toggle when not provided', () => {
      render(
        <Header>
          <span>Content</span>
        </Header>
      );

      expect(screen.queryByRole('button', { name: 'Toggle' })).not.toBeInTheDocument();
    });

    it('renders the top bar content when top prop is provided', () => {
      render(
        <Header top={<div>Top bar</div>}>
          <span>Content</span>
        </Header>
      );

      expect(screen.getByText('Top bar')).toBeInTheDocument();
    });

    it('does not render the top section when top is not provided', () => {
      const { container } = render(
        <Header>
          <span>Content</span>
        </Header>
      );

      expect(container.querySelector('[class*="tedi-header__top"]')).not.toBeInTheDocument();
    });

    it('applies the default space-between justify-content utility on the top bar', () => {
      render(
        <Header top={<div>Top bar</div>}>
          <span>Content</span>
        </Header>
      );

      const topBar = screen.getByText('Top bar').parentElement;
      expect(topBar).toHaveClass('tedi-header__top', 'justify-content-between');
    });

    it('applies the topAlignment justify-content utility on the top bar', () => {
      render(
        <Header top={<div>Top bar</div>} topAlignment="center">
          <span>Content</span>
        </Header>
      );

      const topBar = screen.getByText('Top bar').parentElement;
      expect(topBar).toHaveClass('justify-content-center');
    });

    it('renders bottom content when bottom prop is provided', () => {
      render(
        <Header bottom={<div>Bottom bar</div>}>
          <span>Content</span>
        </Header>
      );

      expect(screen.getByText('Bottom bar')).toBeInTheDocument();
    });

    it('does not render bottom section when bottom is not provided', () => {
      const { container } = render(
        <Header>
          <span>Content</span>
        </Header>
      );

      expect(container.querySelector('[class*="header__bottom"]')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Header className="custom-header">
          <span>Content</span>
        </Header>
      );

      const headerDiv = container.querySelector('[class*="tedi-header"]');
      expect(headerDiv).toHaveClass('custom-header');
    });
  });

  describe('HeaderLogo', () => {
    it('renders the logo', () => {
      render(<HeaderLogo logo={<img alt="Logo" src="/logo.svg" />} />);

      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    it('wraps logo in a link when href is provided', () => {
      render(<HeaderLogo logo={<img alt="Logo" src="/logo.svg" />} href="/home" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/home');
      expect(link).toContainElement(screen.getByAltText('Logo'));
    });

    it('does not wrap logo in a link when href is not provided', () => {
      render(<HeaderLogo logo={<img alt="Logo" src="/logo.svg" />} />);

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('returns null when showLogo is false', () => {
      const { container } = render(<HeaderLogo logo={<img alt="Logo" src="/logo.svg" />} showLogo={false} />);

      expect(container).toBeEmptyDOMElement();
    });

    it('shows logo by default (showLogo defaults to true)', () => {
      render(<HeaderLogo logo={<img alt="Logo" src="/logo.svg" />} />);

      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    it('renders dark logo when theme is dark and logoDark is provided', () => {
      (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });

      render(
        <HeaderLogo
          logo={<img alt="Light logo" src="/light.svg" />}
          logoDark={<img alt="Dark logo" src="/dark.svg" />}
        />
      );

      expect(screen.getByAltText('Dark logo')).toBeInTheDocument();
      expect(screen.queryByAltText('Light logo')).not.toBeInTheDocument();
    });

    it('renders light logo when theme is dark but logoDark is not provided', () => {
      (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });

      render(<HeaderLogo logo={<img alt="Light logo" src="/light.svg" />} />);

      expect(screen.getByAltText('Light logo')).toBeInTheDocument();
    });

    it('renders light logo when theme is light', () => {
      (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

      render(
        <HeaderLogo
          logo={<img alt="Light logo" src="/light.svg" />}
          logoDark={<img alt="Dark logo" src="/dark.svg" />}
        />
      );

      expect(screen.getByAltText('Light logo')).toBeInTheDocument();
      expect(screen.queryByAltText('Dark logo')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<HeaderLogo logo={<span>Logo</span>} className="custom-logo" />);

      expect(container.firstChild).toHaveClass('custom-logo');
    });
  });

  describe('HeaderCenter', () => {
    it('renders children content', () => {
      render(<HeaderCenter>Center content</HeaderCenter>);

      expect(screen.getByText('Center content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<HeaderCenter className="custom-center">Content</HeaderCenter>);

      expect(container.firstChild).toHaveClass('custom-center');
    });
  });

  describe('HeaderActions', () => {
    it('renders children content', () => {
      render(<HeaderActions>Action buttons</HeaderActions>);

      expect(screen.getByText('Action buttons')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<HeaderActions className="custom-actions">Actions</HeaderActions>);

      expect(container.firstChild).toHaveClass('custom-actions');
    });
  });

  describe('Compound component assignments', () => {
    it('has all expected subcomponents', () => {
      expect(Header.Logo).toBeDefined();
      expect(Header.Center).toBeDefined();
      expect(Header.Actions).toBeDefined();
      expect(Header.Language).toBeDefined();
      expect(Header.Login).toBeDefined();
      expect(Header.Logout).toBeDefined();
      expect(Header.Profile).toBeDefined();
      expect(Header.Role).toBeDefined();
      expect(Header.Search).toBeDefined();
    });
  });

  describe('displayName', () => {
    it('has correct displayName for Header', () => {
      expect(Header.displayName).toBe('Header');
    });

    it('has correct displayName for HeaderLogo', () => {
      expect(HeaderLogo.displayName).toBe('Header.Logo');
    });

    it('has correct displayName for HeaderCenter', () => {
      expect(HeaderCenter.displayName).toBe('Header.Center');
    });

    it('has correct displayName for HeaderActions', () => {
      expect(HeaderActions.displayName).toBe('Header.Actions');
    });
  });
});
