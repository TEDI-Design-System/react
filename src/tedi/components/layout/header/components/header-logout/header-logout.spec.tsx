import { fireEvent, render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { HeaderLogout } from './header-logout';

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

describe('HeaderLogout component', () => {
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

  it('renders default size logout button on desktop', () => {
    render(<HeaderLogout />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.logout');
  });

  it('renders small logout button on mobile', () => {
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(<HeaderLogout />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.logout.mobile');
  });

  it('renders with custom label', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => ({ ...props, label: 'Sign out' })),
    });

    render(<HeaderLogout />);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('renders with href', () => {
    render(<HeaderLogout href="/logout" />);

    const link = screen.getByRole('link', { name: /header.logout/i });
    expect(link).toHaveAttribute('href', '/logout');
  });

  it('handles onClick without href', () => {
    const onClick = jest.fn();
    render(<HeaderLogout onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: /header.logout/i }));

    expect(onClick).toHaveBeenCalled();
  });

  it('handles onClick with href', () => {
    const onClick = jest.fn();
    render(<HeaderLogout onClick={onClick} href="/logout" />);

    fireEvent.click(screen.getByRole('link', { name: /header.logout/i }));

    expect(onClick).toHaveBeenCalled();
  });

  it('renders a button when href is not provided', () => {
    render(<HeaderLogout />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders small variant when size is explicitly small', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn(() => ({ size: 'small' })),
    });

    render(<HeaderLogout />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.logout.mobile');
  });
});
