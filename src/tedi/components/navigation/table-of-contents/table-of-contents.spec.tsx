import { render, screen } from '@testing-library/react';
import React from 'react';

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

const Tree = (props: { activeId?: string; numbered?: boolean; variant?: 'default' | 'transparent' }) => (
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

  it('expands only the active branch and hides other branches', () => {
    render(<Tree activeId="a1" />);
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

  it('renders footer content at the end of the list', () => {
    const { container } = render(
      <TableOfContents
        footer={
          <a href="#top" data-testid="toc-footer-link">
            Back to top
          </a>
        }
      >
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    const footer = container.querySelector('[class*="tedi-table-of-contents__footer"]');
    expect(footer).toBeInTheDocument();
    expect(footer).toContainElement(screen.getByRole('link', { name: 'Back to top' }));
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
});
