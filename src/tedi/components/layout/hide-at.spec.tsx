import { render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint } from '../../helpers';
import { HideAt } from './hide-at';

import '@testing-library/jest-dom';

jest.mock('../../helpers', () => ({
  ...jest.requireActual('../../helpers'),
  useBreakpoint: jest.fn(),
  isBreakpointBelow: jest.fn(),
}));

describe('HideAt component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when no breakpoint matches', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <HideAt md>
        <span>Visible content</span>
      </HideAt>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('hides children when current breakpoint is at or above the specified breakpoint', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);

    render(
      <HideAt md>
        <span>Hidden content</span>
      </HideAt>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('renders children when breakpoint prop is false', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);

    render(
      <HideAt md={false}>
        <span>Visible content</span>
      </HideAt>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('hides when any of multiple breakpoints match', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValueOnce(true).mockReturnValueOnce(false);

    render(
      <HideAt sm lg>
        <span>Hidden content</span>
      </HideAt>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('hides children when all specified breakpoints are below the current breakpoint', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('xxl');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);

    render(
      <HideAt sm md>
        <span>Visible content</span>
      </HideAt>
    );

    expect(screen.queryByText('Visible content')).not.toBeInTheDocument();
  });

  it('renders children when current breakpoint is null (SSR)', () => {
    (useBreakpoint as jest.Mock).mockReturnValue(null);

    render(
      <HideAt md>
        <span>Visible content</span>
      </HideAt>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('renders children when no breakpoint props are passed', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('md');

    render(
      <HideAt>
        <span>Always visible</span>
      </HideAt>
    );

    expect(screen.getByText('Always visible')).toBeInTheDocument();
  });
});
