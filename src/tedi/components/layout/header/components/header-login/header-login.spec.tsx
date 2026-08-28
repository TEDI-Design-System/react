import { fireEvent, render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { HeaderLogin } from './header-login';

import '@testing-library/jest-dom';

jest.mock('../../../../../helpers', () => ({
  ...jest.requireActual('../../../../../helpers'),
  useBreakpoint: jest.fn(),
  isBreakpointBelow: jest.fn(),
  useBreakpointProps: jest.fn(),
}));

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: jest.fn(),
}));

describe('HeaderLogin component', () => {
  const mockGetLabel = jest.fn((key: string) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => props),
    });
    (useLabels as jest.Mock).mockReturnValue({ getLabel: mockGetLabel });
  });

  it('renders default size login button on desktop', () => {
    render(<HeaderLogin />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.login');
  });

  it('renders small login button on mobile', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(<HeaderLogin />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.login.mobile');
  });

  it('renders with custom label', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => ({ ...props, label: 'Sign in' })),
    });

    const { container } = render(<HeaderLogin />);

    expect(container.textContent).toContain('Sign in');
  });

  it('renders with href', () => {
    const { container } = render(<HeaderLogin href="/login" />);

    const link = container.querySelector('a[href="/login"]');
    expect(link).toBeInTheDocument();
  });

  it('handles onClick without href', () => {
    const onClick = jest.fn();
    render(<HeaderLogin onClick={onClick} />);

    fireEvent.click(screen.getByText('header.login'));

    expect(onClick).toHaveBeenCalled();
  });

  it('handles onClick with href', () => {
    const onClick = jest.fn();
    render(<HeaderLogin onClick={onClick} href="/login" />);

    fireEvent.click(screen.getByRole('link', { name: /header.login/i }));

    expect(onClick).toHaveBeenCalled();
  });

  it('renders a button when href is not provided', () => {
    render(<HeaderLogin />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders small variant when size is explicitly small', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn(() => ({ size: 'small' })),
    });

    render(<HeaderLogin />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.login.mobile');
  });
});
