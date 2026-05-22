import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Link } from '../link/link';
import { Breadcrumb } from './breadcrumb';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useBreakpointProps: jest.fn(),
}));

beforeEach(() => {
  (useBreakpointProps as jest.Mock).mockReturnValue({
    getCurrentBreakpointProps: jest.fn((props) => props),
  });
});

const trail = (
  <Breadcrumb>
    <Link href="/">Dashboard</Link>
    <Link href="/docs">Documents</Link>
    <Link href="/docs/mine">My documents</Link>
    <span aria-current="page">Application nr 506</span>
  </Breadcrumb>
);

describe('Breadcrumb', () => {
  it('renders a nav landmark with an accessible label from LabelProvider', () => {
    render(trail);
    expect(screen.getByRole('navigation', { name: 'breadcrumbs' })).toBeInTheDocument();
  });

  it('wraps each child in an <li> and hides separators from the accessibility tree', () => {
    render(trail);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('respects the consumer-provided aria-current="page" on the last child', () => {
    render(trail);
    const current = screen.getByText('Application nr 506');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: 'Application nr 506' })).not.toBeInTheDocument();
  });

  it('renders every link child with its href', () => {
    render(trail);
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Documents' })).toHaveAttribute('href', '/docs');
    expect(screen.getByRole('link', { name: 'My documents' })).toHaveAttribute('href', '/docs/mine');
  });

  it('renders one separator between each pair of crumbs', () => {
    const { container } = render(trail);
    expect(container.querySelectorAll('.tedi-breadcrumb__separator')).toHaveLength(3);
  });

  it('uses a custom aria-label when provided', () => {
    render(
      <Breadcrumb ariaLabel="Site path">
        <Link href="/">Home</Link>
        <span aria-current="page">Page</span>
      </Breadcrumb>
    );
    expect(screen.getByRole('navigation', { name: 'Site path' })).toBeInTheDocument();
  });

  it('renders short variant as the second-to-last child with an arrow_back icon', () => {
    render(
      <Breadcrumb variant="short">
        <Link href="/">Dashboard</Link>
        <Link href="/docs">Documents</Link>
        <span aria-current="page">Application nr 506</span>
      </Breadcrumb>
    );
    const link = screen.getByRole('link', { name: /Documents/ });
    expect(link).toHaveAttribute('href', '/docs');
    expect(link).toHaveTextContent('arrow_back');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('renders nothing in short mode when fewer than two children are supplied', () => {
    const { container } = render(
      <Breadcrumb variant="short">
        <span aria-current="page">Solo</span>
      </Breadcrumb>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there are no children', () => {
    const { container } = render(<Breadcrumb>{null}</Breadcrumb>);
    expect(container).toBeEmptyDOMElement();
  });

  it('collapses the middle into an ellipsis dropdown when crumbs exceed maxItems', async () => {
    const { container } = render(
      <Breadcrumb maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
        <Link href="/">A</Link>
        <Link href="/b">B</Link>
        <Link href="/c">C</Link>
        <Link href="/d">D</Link>
        <Link href="/e">E</Link>
        <span aria-current="page">F</span>
      </Breadcrumb>
    );
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'E' })).toBeInTheDocument();
    expect(screen.getByText('F')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: 'B' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'C' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'D' })).not.toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'breadcrumbs.show-more' });
    expect(trigger).toBeInTheDocument();
    expect(container.querySelectorAll('.tedi-breadcrumb__separator')).toHaveLength(3);
  });

  it('opens the dropdown and reveals the hidden crumbs when the ellipsis is clicked', () => {
    render(
      <Breadcrumb maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
        <Link href="/">A</Link>
        <Link href="/b">B</Link>
        <Link href="/c">C</Link>
        <Link href="/d">D</Link>
        <Link href="/e">E</Link>
        <span aria-current="page">F</span>
      </Breadcrumb>
    );
    const trigger = screen.getByRole('button', { name: 'breadcrumbs.show-more' });
    fireEvent.click(trigger);
    expect(screen.getByRole('link', { name: 'B' })).toHaveAttribute('href', '/b');
    expect(screen.getByRole('link', { name: 'C' })).toHaveAttribute('href', '/c');
    expect(screen.getByRole('link', { name: 'D' })).toHaveAttribute('href', '/d');
  });

  it('skips collapse when maxItems is not exceeded', () => {
    render(
      <Breadcrumb maxItems={4}>
        <Link href="/">A</Link>
        <Link href="/b">B</Link>
        <span aria-current="page">C</span>
      </Breadcrumb>
    );
    expect(screen.queryByRole('button', { name: 'breadcrumbs.show-more' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders a custom separator between crumbs', () => {
    const { container } = render(
      <Breadcrumb separator="/">
        <Link href="/">A</Link>
        <Link href="/b">B</Link>
        <span aria-current="page">C</span>
      </Breadcrumb>
    );
    const separators = container.querySelectorAll('.tedi-breadcrumb__separator');
    expect(separators).toHaveLength(2);
    separators.forEach((sep) => expect(sep).toHaveTextContent('/'));
  });

  it('flattens Fragment children so each grand-child becomes its own crumb', () => {
    render(
      <Breadcrumb>
        <>
          <Link href="/">Dashboard</Link>
          <Link href="/docs">Documents</Link>
        </>
        <span aria-current="page">Current</span>
      </Breadcrumb>
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Documents' })).toBeInTheDocument();
  });
});
