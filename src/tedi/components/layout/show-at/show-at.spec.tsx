import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server.node';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { ShowAt } from './show-at';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
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
    (isBreakpointBelow as jest.Mock).mockReturnValueOnce(true).mockReturnValueOnce(false);

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

describe('ShowAt component in css mode', () => {
  it('always renders its children, so the server output does not depend on the viewport', () => {
    render(
      <ShowAt mode="css" md>
        <span>Content</span>
      </ShowAt>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(
      renderToString(
        <ShowAt mode="css" md>
          Content
        </ShowAt>
      )
    ).toContain('Content');
  });

  it('adds a class for each breakpoint that is set', () => {
    const { container } = render(
      <ShowAt mode="css" sm lg>
        <span>Content</span>
      </ShowAt>
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('tedi-show-at-from-sm');
    expect(wrapper.className).toContain('tedi-show-at-from-lg');
    expect(wrapper.className).not.toContain('tedi-show-at-from-md');
  });

  it('ignores a breakpoint that is false', () => {
    const { container } = render(
      <ShowAt mode="css" md={false}>
        <span>Content</span>
      </ShowAt>
    );

    expect((container.firstElementChild as HTMLElement).className).not.toContain('from-md');
  });

  it('supports xs, which shows at every width', () => {
    const { container } = render(
      <ShowAt mode="css" xs>
        <span>Content</span>
      </ShowAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toContain('tedi-show-at-from-xs');
  });

  it('adds no showing class when no breakpoint is passed, so the content stays hidden', () => {
    const { container } = render(
      <ShowAt mode="css">
        <span>Never visible</span>
      </ShowAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toBe('tedi-show-at');
  });
});
