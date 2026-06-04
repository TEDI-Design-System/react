import { render, screen } from '@testing-library/react';
import React from 'react';

import { TableOfContents } from './table-of-contents';

import '@testing-library/jest-dom';

jest.mock('../../misc/affix/affix', () => ({
  Affix: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => (key === 'table-of-contents.title' ? 'Table of contents' : key),
  }),
}));

const Tree = (props: { activeId?: string; numbered?: boolean }) => (
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

  it('renders validation glyphs when showIcons is set', () => {
    render(
      <TableOfContents showIcons>
        <TableOfContents.Item id="x" isValid>
          <a href="#x">Valid</a>
        </TableOfContents.Item>
        <TableOfContents.Item id="y" isValid={false}>
          <a href="#y">Invalid</a>
        </TableOfContents.Item>
        <TableOfContents.Item id="z">
          <a href="#z">Untouched</a>
        </TableOfContents.Item>
      </TableOfContents>
    );
    expect(screen.getAllByText('check').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('warning')).toBeInTheDocument();
  });

  it('renders an ordered list with auto hierarchical numbers when numbered', () => {
    const { container } = render(<Tree numbered activeId="a" />);
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('1.1')).toBeInTheDocument();
  });
});
