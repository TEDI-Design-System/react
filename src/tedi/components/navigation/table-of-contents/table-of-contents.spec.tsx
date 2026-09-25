import { render, screen } from '@testing-library/react';
import React from 'react';

import { getRowScrollDelta, getScrollableAncestor } from './components/table-of-contents-row/table-of-contents-row';
import { TableOfContents } from './table-of-contents';

import '@testing-library/jest-dom';

jest.mock('../../misc/affix/affix', () => ({
  Affix: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) =>
      ({
        'table-of-contents.title': 'Table of contents',
      }[key] ?? key),
  }),
}));

const Tree = (props: {
  activeId?: string;
  numbered?: boolean;
  variant?: 'default' | 'transparent';
  defaultOpen?: boolean;
  scrollActiveIntoView?: boolean;
  sticky?: boolean;
}) => (
  <TableOfContents {...props}>
    <TableOfContents.Item id="a">
      <a href="#a">Alpha</a>
      <TableOfContents.Item id="a1">
        <a href="#a1">Alpha 1</a>
      </TableOfContents.Item>
    </TableOfContents.Item>
    <TableOfContents.Item id="b">
      <a href="#b">Bravo</a>
      <TableOfContents.Item id="b1">
        <a href="#b1">Bravo 1</a>
      </TableOfContents.Item>
    </TableOfContents.Item>
    <TableOfContents.Item id="c">
      <a href="#c">Charlie</a>
    </TableOfContents.Item>
  </TableOfContents>
);

describe('TableOfContents', () => {
  it('renders the heading and top-level items', () => {
    render(<Tree />);
    expect(screen.getByRole('heading', { name: 'Table of contents' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Charlie' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current', () => {
    render(<Tree activeId="a" />);
    expect(screen.getByRole('link', { name: 'Alpha' }).closest('li')).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'Bravo' }).closest('li')).not.toHaveAttribute('aria-current');
  });

  it('shows every branch’s sub-items by default', () => {
    render(<Tree activeId="a1" />);
    expect(screen.getByRole('link', { name: 'Alpha 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Bravo 1' })).toBeInTheDocument();
  });

  it('shows sub-items even without an active id', () => {
    render(<Tree />);
    expect(screen.getByRole('link', { name: 'Alpha 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Bravo 1' })).toBeInTheDocument();
  });

  it('expands only the active branch and hides other branches when defaultOpen is false', () => {
    render(<Tree activeId="a1" defaultOpen={false} />);
    expect(screen.getByRole('link', { name: 'Alpha 1' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Bravo 1' })).not.toBeInTheDocument();
  });

  it('renders the navigation landmark labelled by the heading', () => {
    render(
      <TableOfContents heading="Sisukord">
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    expect(screen.getByRole('navigation', { name: 'Sisukord' })).toBeInTheDocument();
  });

  it('uses a navigation landmark and never the tree/treeitem roles (WCAG)', () => {
    render(<Tree activeId="a1" />);
    expect(screen.getByRole('navigation', { name: 'Table of contents' })).toBeInTheDocument();
    expect(screen.queryByRole('tree')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('treeitem')).toHaveLength(0);
    expect(screen.getByRole('link', { name: 'Alpha' }).closest('li')).toBeInTheDocument();
  });

  it('labels the navigation with the localized table-of-contents title when no heading is shown', () => {
    render(
      <TableOfContents heading="">
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Table of contents' })).toBeInTheDocument();
  });

  it('renders the heading as an h3 by default', () => {
    render(<Tree />);
    expect(screen.getByRole('heading', { level: 3, name: 'Table of contents' })).toBeInTheDocument();
  });

  it('renders the heading at the requested headingLevel', () => {
    render(
      <TableOfContents heading="Sisukord" headingLevel="h1">
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    const heading = screen.getByRole('heading', { level: 1, name: 'Sisukord' });
    expect(heading).toBeInTheDocument();
    // The visual style stays h4 regardless of the semantic level.
    expect(heading).toHaveClass('tedi-text--h4');
  });

  it('labels the navigation with ariaLabel, taking precedence over the heading', () => {
    render(
      <TableOfContents heading="Sisukord" ariaLabel="Section navigation">
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    const nav = screen.getByRole('navigation', { name: 'Section navigation' });
    expect(nav).toHaveAttribute('aria-label', 'Section navigation');
    expect(nav).not.toHaveAttribute('aria-labelledby');
  });

  it('falls back to the heading when ariaLabel is an empty string', () => {
    render(
      <TableOfContents heading="Sisukord" ariaLabel="">
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    const nav = screen.getByRole('navigation', { name: 'Sisukord' });
    expect(nav).toHaveAttribute('aria-labelledby');
    expect(nav).not.toHaveAttribute('aria-label');
  });

  it('labels the headless navigation with the localized title when heading is null', () => {
    render(
      <TableOfContents heading={null}>
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Table of contents' });
    expect(nav).toHaveAttribute('aria-label', 'Table of contents');
    expect(nav).not.toHaveAttribute('aria-labelledby');
  });

  it('renders an ordered list with auto hierarchical numbers when numbered', () => {
    const { container } = render(<Tree numbered activeId="a" />);
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('1.1')).toBeInTheDocument();
  });

  it('omits the card chrome in the transparent variant while keeping the navigation and items', () => {
    const { container, rerender } = render(<Tree />);
    expect(container.querySelector('[data-name="card"]')).toBeInTheDocument();

    rerender(<Tree variant="transparent" />);
    expect(container.querySelector('[data-name="card"]')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Table of contents' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Alpha' })).toBeInTheDocument();
    expect(container.querySelector('[class*="tedi-table-of-contents--transparent"]')).toBeInTheDocument();
  });

  it('applies the bordered modifier only when bordered', () => {
    const { container, rerender } = render(<Tree />);
    expect(container.querySelector('[class*="tedi-table-of-contents--bordered"]')).not.toBeInTheDocument();

    rerender(
      <TableOfContents bordered>
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    expect(container.querySelector('[class*="tedi-table-of-contents--bordered"]')).toBeInTheDocument();
  });

  it('renders a separator below the item that sets `separator`, not the next one', () => {
    const { container } = render(
      <TableOfContents>
        <TableOfContents.Item id="a" separator>
          <a href="#a">A</a>
        </TableOfContents.Item>
        <TableOfContents.Item id="b">
          <a href="#b">B</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    const items = container.querySelectorAll('[class*="tedi-table-of-contents__item"]');
    const separator = container.querySelector('[class*="tedi-table-of-contents__separator"]');
    expect(separator).toBeInTheDocument();
    expect(items[0]).toContainElement(separator as HTMLElement);
    expect(items[1]).not.toContainElement(separator as HTMLElement);
  });

  it('renders an item slot as trailing content, outside the link', () => {
    render(
      <TableOfContents>
        <TableOfContents.Item id="x" slot={<span data-testid="count">43</span>}>
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    const slot = screen.getByTestId('count');
    expect(slot).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'X' })).not.toContainElement(slot);
  });

  it('renders headless (no heading) when heading is null, keeping the localized landmark name', () => {
    render(
      <TableOfContents heading={null}>
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Table of contents' })).toBeInTheDocument();
  });

  it('applies the sticky height-cap class only when sticky (so the last item stays reachable on zoom)', () => {
    const { container, rerender } = render(<Tree />);
    expect(container.querySelector('.tedi-table-of-contents--sticky')).toBeInTheDocument();

    rerender(
      <TableOfContents sticky={false}>
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    expect(container.querySelector('.tedi-table-of-contents--sticky')).not.toBeInTheDocument();
  });

  describe('getRowScrollDelta', () => {
    it('returns 0 when the row is already fully visible', () => {
      expect(getRowScrollDelta(50, 90, 0, 200)).toBe(0);
    });

    it('returns a negative delta (scroll up) when the row is above the container', () => {
      expect(getRowScrollDelta(-20, 10, 0, 200)).toBe(-28); // -20 - 0 - 8 margin
    });

    it('returns a positive delta (scroll down) when the row is below the container', () => {
      expect(getRowScrollDelta(500, 540, 0, 200)).toBe(348); // 540 - 200 + 8 margin
    });

    it('accounts for the margin near the container edge', () => {
      expect(getRowScrollDelta(4, 40, 0, 200)).toBe(-4); // within the 8px top margin
    });
  });

  describe('getScrollableAncestor', () => {
    afterEach(() => {
      document.body.innerHTML = '';
      document.body.style.overflowY = '';
    });

    it('returns the nearest scrollable ancestor', () => {
      const outer = document.createElement('div');
      outer.style.overflowY = 'auto';
      Object.defineProperty(outer, 'scrollHeight', { value: 1000, configurable: true });
      Object.defineProperty(outer, 'clientHeight', { value: 100, configurable: true });
      const child = document.createElement('div');
      outer.appendChild(child);
      document.body.appendChild(outer);

      expect(getScrollableAncestor(child)).toBe(outer);
    });

    it('returns null when no ancestor is scrollable', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      parent.appendChild(child);
      document.body.appendChild(parent);

      expect(getScrollableAncestor(child)).toBeNull();
    });

    it('never returns the document body, so the page itself is never scrolled', () => {
      document.body.style.overflowY = 'auto';
      Object.defineProperty(document.body, 'scrollHeight', { value: 1000, configurable: true });
      Object.defineProperty(document.body, 'clientHeight', { value: 100, configurable: true });
      const el = document.createElement('div');
      document.body.appendChild(el);

      expect(getScrollableAncestor(el)).toBeNull();
    });
  });

  describe('scrollActiveIntoView', () => {
    const rect = (top: number, bottom: number): DOMRect =>
      ({ top, bottom, left: 0, right: 0, width: 0, height: bottom - top, x: 0, y: top, toJSON: () => ({}) } as DOMRect);

    const renderInScrollContainer = (
      activeId: string,
      extra: { defaultOpen?: boolean } = {}
    ): { rerenderWith: (nextId: string) => void; scrollBy: jest.Mock } => {
      const tree = (id: string) => (
        <div data-testid="scroll-container" style={{ overflowY: 'auto' }}>
          <Tree activeId={id} sticky={false} scrollActiveIntoView {...extra} />
        </div>
      );
      const { rerender } = render(tree(activeId));

      const container = screen.getByTestId('scroll-container');
      Object.defineProperty(container, 'scrollHeight', { value: 1000, configurable: true });
      Object.defineProperty(container, 'clientHeight', { value: 200, configurable: true });
      container.getBoundingClientRect = () => rect(0, 200);
      const scrollBy = jest.fn();
      container.scrollBy = scrollBy;

      return { rerenderWith: (nextId: string) => rerender(tree(nextId)), scrollBy };
    };

    it('does not scroll on initial render', () => {
      const { scrollBy } = renderInScrollContainer('a');
      expect(scrollBy).not.toHaveBeenCalled();
    });

    it('does not scroll the initially selected row under Strict Mode (mount-effect replay)', () => {
      const scrollBy = jest.fn();
      window.HTMLElement.prototype.scrollBy = scrollBy;
      render(
        <React.StrictMode>
          <div style={{ overflowY: 'auto' }}>
            <Tree activeId="a" sticky={false} scrollActiveIntoView />
          </div>
        </React.StrictMode>
      );
      expect(scrollBy).not.toHaveBeenCalled();
    });

    it('scrolls only the table-of-contents container, never the document', () => {
      const windowScrollBy = jest.fn();
      window.scrollBy = windowScrollBy;
      const windowScrollTo = jest.fn();
      window.scrollTo = windowScrollTo;

      const { rerenderWith, scrollBy } = renderInScrollContainer('a');

      const charlieRow = screen
        .getByRole('link', { name: 'Charlie' })
        .closest('.tedi-table-of-contents__row') as HTMLElement;
      charlieRow.getBoundingClientRect = () => rect(500, 540);

      rerenderWith('c');

      expect(scrollBy).toHaveBeenCalledTimes(1);
      expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }));
      expect(scrollBy.mock.calls[0][0].top).toBeGreaterThan(0); // row is below → scroll down
      expect(windowScrollBy).not.toHaveBeenCalled();
      expect(windowScrollTo).not.toHaveBeenCalled();
    });

    it('does not scroll when the row is already visible in the container', () => {
      const { rerenderWith, scrollBy } = renderInScrollContainer('a');

      const charlieRow = screen
        .getByRole('link', { name: 'Charlie' })
        .closest('.tedi-table-of-contents__row') as HTMLElement;
      charlieRow.getBoundingClientRect = () => rect(50, 90); // inside [0, 200]

      rerenderWith('c');
      expect(scrollBy).not.toHaveBeenCalled();
    });

    it('scrolls a selected child that mounts into a reopened branch when defaultOpen is false', () => {
      const { rerenderWith, scrollBy } = renderInScrollContainer('a', { defaultOpen: false });

      expect(screen.queryByRole('link', { name: 'Bravo 1' })).not.toBeInTheDocument();

      rerenderWith('b1');

      const bravoRow = screen
        .getByRole('link', { name: 'Bravo 1' })
        .closest('.tedi-table-of-contents__row') as HTMLElement;
      expect(scrollBy).toHaveBeenCalledTimes(1);
      expect(bravoRow).toHaveTextContent('Bravo 1');
    });

    it('does not scroll when the prop is not set', () => {
      const scrollBy = jest.fn();
      window.HTMLElement.prototype.scrollBy = scrollBy;
      const { rerender } = render(
        <div style={{ overflowY: 'auto' }}>
          <Tree activeId="a" sticky={false} />
        </div>
      );
      rerender(
        <div style={{ overflowY: 'auto' }}>
          <Tree activeId="c" sticky={false} />
        </div>
      );
      expect(scrollBy).not.toHaveBeenCalled();
    });

    it('skips scrolling when there is no scrollable container', () => {
      const scrollBy = jest.fn();
      window.HTMLElement.prototype.scrollBy = scrollBy;
      const { rerender } = render(<Tree activeId="a" sticky={false} scrollActiveIntoView />);
      rerender(<Tree activeId="c" sticky={false} scrollActiveIntoView />);
      expect(scrollBy).not.toHaveBeenCalled();
    });

    it('respects prefers-reduced-motion', () => {
      (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { rerenderWith, scrollBy } = renderInScrollContainer('a');

      const charlieRow = screen
        .getByRole('link', { name: 'Charlie' })
        .closest('.tedi-table-of-contents__row') as HTMLElement;
      charlieRow.getBoundingClientRect = () => rect(500, 540);

      rerenderWith('c');
      expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'auto' }));
    });
  });
});
