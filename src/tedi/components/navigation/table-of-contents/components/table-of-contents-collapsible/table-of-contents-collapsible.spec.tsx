/* eslint-disable react/display-name */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import { TableOfContents } from '../../table-of-contents';

import '@testing-library/jest-dom';

jest.mock('../../../../misc/affix/affix', () => ({
  Affix: ({ children }: PropsWithChildren) => <>{children}</>,
}));

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) =>
      ({
        'table-of-contents.title': 'Table of contents',
        open: 'Open',
        close: 'Close',
      }[key] ?? key),
  }),
}));

jest.mock('../../../../overlays/modal', () => {
  const Modal = ({ open, children }: PropsWithChildren<{ open?: boolean }>) =>
    open ? <div role="dialog">{children}</div> : null;
  Modal.Content = ({ children }: PropsWithChildren) => <div>{children}</div>;
  Modal.Header = ({ children }: PropsWithChildren) => <div>{children}</div>;
  Modal.Body = ({ children }: PropsWithChildren) => <div>{children}</div>;
  return { Modal };
});

const Tree = (): JSX.Element => (
  <TableOfContents.Collapsible heading="Sisukord" activeId="methods">
    <TableOfContents.Item id="intro">
      <a href="#intro">Sissejuhatus</a>
    </TableOfContents.Item>
    <TableOfContents.Item id="methods">
      <a href="#methods">Meetodid</a>
      <TableOfContents.Item id="methods-1">
        <a href="#methods-1">Andmete kogumine</a>
      </TableOfContents.Item>
    </TableOfContents.Item>
    <TableOfContents.Item id="results">
      <a href="#results">Tulemused</a>
    </TableOfContents.Item>
  </TableOfContents.Collapsible>
);

describe('TableOfContents.Collapsible', () => {
  it('renders the bottom bar with the heading and a closed trigger', () => {
    render(<Tree />);
    expect(screen.getByText('Sisukord')).toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the sheet, listing the items and auto-expanding the active branch', () => {
    render(<Tree />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('link', { name: 'Sissejuhatus' })).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: 'Andmete kogumine' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('closes the sheet from the sheet header', () => {
    render(<Tree />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the sheet when a list link is activated', () => {
    render(<Tree />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'Sissejuhatus' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('falls back to the localised title when no heading is provided', () => {
    render(
      <TableOfContents.Collapsible>
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents.Collapsible>
    );
    expect(screen.getByText('Table of contents')).toBeInTheDocument();
  });

  it('names the sheet navigation with the heading when no ariaLabel is set', () => {
    render(<Tree />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('navigation', { name: 'Sisukord' })).toBeInTheDocument();
  });

  it('names the sheet navigation with ariaLabel, taking precedence over the heading', () => {
    render(
      <TableOfContents.Collapsible heading="Sisukord" ariaLabel="Section navigation">
        <TableOfContents.Item id="x">
          <a href="#x">X</a>
        </TableOfContents.Item>
      </TableOfContents.Collapsible>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('navigation', { name: 'Section navigation' })).toBeInTheDocument();
    expect(within(dialog).queryByRole('navigation', { name: 'Sisukord' })).not.toBeInTheDocument();
  });

  describe('hideOnScroll', () => {
    const originalRaf = window.requestAnimationFrame;
    const originalCaf = window.cancelAnimationFrame;

    const setScrollY = (value: number) => Object.defineProperty(window, 'scrollY', { configurable: true, value });

    beforeEach(() => {
      // Run the rAF callback synchronously so a dispatched scroll updates state within the same act().
      // Return 0 so the component's `frame` throttle flag ends up falsy after each synchronous run
      // (a real id would re-block the next scroll, since our stub runs the callback before returning).
      window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      }) as typeof window.requestAnimationFrame;
      window.cancelAnimationFrame = (() => undefined) as typeof window.cancelAnimationFrame;
      setScrollY(0);
    });

    afterEach(() => {
      window.requestAnimationFrame = originalRaf;
      window.cancelAnimationFrame = originalCaf;
      setScrollY(0);
    });

    const HideTree = ({ hideOnScroll = true, sticky }: { hideOnScroll?: boolean; sticky?: boolean }) => (
      <TableOfContents.Collapsible heading="Sisukord" hideOnScroll={hideOnScroll} sticky={sticky}>
        <TableOfContents.Item id="intro">
          <a href="#intro">Sissejuhatus</a>
        </TableOfContents.Item>
      </TableOfContents.Collapsible>
    );

    it('hides the pinned bar on scroll down and reveals it on scroll up', () => {
      const { container } = render(<HideTree />);
      const bar = container.querySelector('.tedi-table-of-contents__bar') as HTMLElement;
      expect(bar).not.toHaveClass('tedi-table-of-contents__bar--hidden');

      setScrollY(100);
      fireEvent.scroll(window);
      expect(bar).toHaveClass('tedi-table-of-contents__bar--hidden');

      setScrollY(40);
      fireEvent.scroll(window);
      expect(bar).not.toHaveClass('tedi-table-of-contents__bar--hidden');
    });

    it('ignores sub-threshold scroll jitter', () => {
      const { container } = render(<HideTree />);
      const bar = container.querySelector('.tedi-table-of-contents__bar') as HTMLElement;

      setScrollY(3);
      fireEvent.scroll(window);
      expect(bar).not.toHaveClass('tedi-table-of-contents__bar--hidden');
    });

    it('does not hide when the bar is not sticky', () => {
      const { container } = render(<HideTree sticky={false} />);
      const bar = container.querySelector('.tedi-table-of-contents__bar') as HTMLElement;

      setScrollY(200);
      fireEvent.scroll(window);
      expect(bar).not.toHaveClass('tedi-table-of-contents__bar--hidden');
    });
  });
});
