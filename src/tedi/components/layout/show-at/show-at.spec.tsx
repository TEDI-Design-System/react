import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server.node';

import { ShowAt } from './show-at';

import '@testing-library/jest-dom';

describe('ShowAt component', () => {
  it('always renders its children, so the server output does not depend on the viewport', () => {
    render(
      <ShowAt md>
        <span>Content</span>
      </ShowAt>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(renderToString(<ShowAt md>Content</ShowAt>)).toContain('Content');
  });

  it('adds a class for each breakpoint that is set', () => {
    const { container } = render(
      <ShowAt sm lg>
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
      <ShowAt md={false}>
        <span>Content</span>
      </ShowAt>
    );

    expect((container.firstElementChild as HTMLElement).className).not.toContain('from-md');
  });

  it('supports xs, which shows at every width', () => {
    const { container } = render(
      <ShowAt xs>
        <span>Content</span>
      </ShowAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toContain('tedi-show-at-from-xs');
  });

  it('adds no showing class when no breakpoint is passed, so the content stays hidden', () => {
    const { container } = render(
      <ShowAt>
        <span>Never visible</span>
      </ShowAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toBe('tedi-show-at');
  });
});
