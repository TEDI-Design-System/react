import { render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint } from '../../helpers';
import { ShowAt } from './show-at';

import '@testing-library/jest-dom';

jest.mock('../../helpers', () => ({
  ...jest.requireActual('../../helpers'),
  useBreakpoint: jest.fn(),
  isBreakpointBelow: jest.fn(),
}));

describe('ShowAt component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows children when current breakpoint is at or above the specified breakpoint', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);

    render(
      <ShowAt md>
        <span>Visible content</span>
      </ShowAt>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('hides children when current breakpoint is below the specified breakpoint', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <ShowAt md>
        <span>Hidden content</span>
      </ShowAt>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('hides children when breakpoint prop is false', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);

    render(
      <ShowAt md={false}>
        <span>Hidden content</span>
      </ShowAt>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('shows when any of multiple breakpoints match', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('md');
    (isBreakpointBelow as jest.Mock).mockReturnValueOnce(false);

    render(
      <ShowAt sm lg>
        <span>Visible content</span>
      </ShowAt>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('hides children when all specified breakpoints are above current', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('xs');
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(
      <ShowAt lg xl>
        <span>Hidden content</span>
      </ShowAt>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('hides children when no breakpoint props are passed', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('md');

    render(
      <ShowAt>
        <span>Hidden content</span>
      </ShowAt>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });
});
