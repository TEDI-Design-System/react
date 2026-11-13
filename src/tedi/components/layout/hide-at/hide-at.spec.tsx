import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server.node';

import { HideAt } from './hide-at';

import '@testing-library/jest-dom';

describe('HideAt component', () => {
  it('always renders its children, so the server output does not depend on the viewport', () => {
    render(
      <HideAt md>
        <span>Content</span>
      </HideAt>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(renderToString(<HideAt md>Content</HideAt>)).toContain('Content');
  });

  it('adds a class for each breakpoint that is set', () => {
    const { container } = render(
      <HideAt sm lg>
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
      <HideAt md={false}>
        <span>Content</span>
      </HideAt>
    );

    expect((container.firstElementChild as HTMLElement).className).not.toContain('from-md');
  });

  it('supports xs, which hides at every width', () => {
    const { container } = render(
      <HideAt xs>
        <span>Content</span>
      </HideAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toContain('tedi-hide-at-from-xs');
  });

  it('adds no hiding class when no breakpoint is passed', () => {
    const { container } = render(
      <HideAt>
        <span>Always visible</span>
      </HideAt>
    );

    expect((container.firstElementChild as HTMLElement).className).toBe('tedi-hide-at');
  });
});
