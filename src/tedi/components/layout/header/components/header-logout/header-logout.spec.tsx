import { render } from '@testing-library/react';

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

    expect(mockGetLabel).toHaveBeenCalledWith('header.logout-small');
  });

  it('renders with custom label', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => ({ ...props, label: 'Sign out' })),
    });

    const { container } = render(<HeaderLogout />);

    expect(container.textContent).toContain('Sign out');
  });

  it('renders with href', () => {
    const { container } = render(<HeaderLogout href="/logout" />);

    const link = container.querySelector('a[href="/logout"]');
    expect(link).toBeInTheDocument();
  });

  it('handles onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<HeaderLogout onClick={onClick} />);

    const link = container.querySelector('a');
    link?.click();

    expect(onClick).toHaveBeenCalled();
  });

  it('renders small variant when size is explicitly small', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn(() => ({ size: 'small' })),
    });

    render(<HeaderLogout />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.logout-small');
  });
});
