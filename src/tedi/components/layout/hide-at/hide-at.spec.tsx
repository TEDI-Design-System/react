import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server.node';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { HideAt } from './hide-at';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
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
        <span>Hidden content</span>
      </HideAt>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('renders children when current breakpoint is xs (SSR default)', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('xs');
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

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

describe('HideAt component in css mode', () => {
  it('always renders its children, so the server output does not depend on the viewport', () => {
    render(
      <HideAt mode="css" md>
        <span>Content</span>
      </HideAt>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(
      renderToString(
        <HideAt mode="css" md>
          Content
        </HideAt>
      )
    ).toContain('Content');
  });

  it('adds a class for each breakpoint that is set', () => {
    const { container } = render(
      <HideAt mode="css" sm lg>
        <span>Content</span>
      </HideAt>
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('tedi-hide-at-from-sm');
    expect(wrapper.className).toContain('tedi-hide-at-from-lg');
    expect(wrapper.className).not.toContain('tedi-hide-at-from-md');
  });

  it('ignores a breakpoint that is false', () => {
    const { container } = render(
      <HideAt mode="css" md={false}>
        <span>Content</span>
      </HideAt>
    );

    expect((container.firstElementChild as HTMLElement).className).not.toContain('from-md');
  });

  it('supports xs, which hides at every width', () => {
    const { container } = render(
      <HideAt mode="css" xs>
        <span>Content</span>
      </HideAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toContain('tedi-hide-at-from-xs');
  });

  it('adds no hiding class when no breakpoint is passed', () => {
    const { container } = render(
      <HideAt mode="css">
        <span>Always visible</span>
      </HideAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toBe('tedi-hide-at');
  });
});
