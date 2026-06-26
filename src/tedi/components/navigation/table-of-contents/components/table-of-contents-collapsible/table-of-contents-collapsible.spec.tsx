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
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
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
});
