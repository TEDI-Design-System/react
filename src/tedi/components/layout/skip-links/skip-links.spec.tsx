import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { SkipLinks } from './skip-links';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('SkipLinks component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders a default link to the main content', () => {
    render(<SkipLinks />);
    const link = screen.getByRole('link', { name: 'skip-links.main-content' });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('renders the given links in a list', () => {
    render(
      <SkipLinks
        links={[
          { href: '#main-content', children: 'Skip to main content' },
          { href: '#search', children: 'Skip to search' },
        ]}
      />
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Skip to search' })).toHaveAttribute('href', '#search');
  });

  it('applies a custom class name', () => {
    const { container } = render(<SkipLinks className="custom-class" />);
    expect(container.firstChild).toHaveClass('tedi-skip-links', 'custom-class');
  });

  it('focuses the target instead of navigating', () => {
    render(
      <>
        <SkipLinks />
        <main id="main-content">Main</main>
      </>
    );
    const main = screen.getByRole('main');

    expect(fireEvent.click(screen.getByRole('link'))).toBe(false);
    expect(main).toHaveFocus();
    expect(main).toHaveAttribute('tabindex', '-1');
    expect(main).toHaveClass('tedi-skip-links__target');

    main.blur();
    expect(main).not.toHaveAttribute('tabindex');
    expect(main).not.toHaveClass('tedi-skip-links__target');
  });

  it('keeps the tabindex of a focusable target', () => {
    render(
      <>
        <SkipLinks links={[{ href: '#footer', children: 'Skip to footer' }]} />
        <footer id="footer" tabIndex={0}>
          Footer
        </footer>
      </>
    );
    const footer = screen.getByRole('contentinfo');

    fireEvent.click(screen.getByRole('link'));
    expect(footer).not.toHaveClass('tedi-skip-links__target');

    footer.blur();
    expect(footer).toHaveAttribute('tabindex', '0');
  });

  it('leaves a link to a missing target alone', () => {
    render(<SkipLinks links={[{ href: '#missing', children: 'Skip to nowhere' }]} />);

    expect(fireEvent.click(screen.getByRole('link'))).toBe(true);
  });

  it('keeps a target\'s own tabindex="-1" but removes the focus ring class on blur', () => {
    render(
      <>
        <SkipLinks />
        <main id="main-content" tabIndex={-1}>
          Main
        </main>
      </>
    );
    const main = screen.getByRole('main');

    fireEvent.click(screen.getByRole('link'));
    expect(main).toHaveFocus();
    expect(main).toHaveClass('tedi-skip-links__target');

    main.blur();
    expect(main).toHaveAttribute('tabindex', '-1');
    expect(main).not.toHaveClass('tedi-skip-links__target');
  });

  it('does nothing when the click was already handled', () => {
    render(
      <>
        <SkipLinks links={[{ href: '#main-content', children: 'Skip', onClick: (event) => event.preventDefault() }]} />
        <main id="main-content">Main</main>
      </>
    );

    fireEvent.click(screen.getByRole('link'));
    expect(screen.getByRole('main')).not.toHaveFocus();
  });

  it('finds a target whose id is percent-encoded in the href', () => {
    render(
      <>
        <SkipLinks links={[{ href: '#p%C3%B5hisisu', children: 'Skip' }]} />
        <main id="põhisisu">Main</main>
      </>
    );

    fireEvent.click(screen.getByRole('link'));
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('uses an id that is not valid percent-encoding as written', () => {
    render(
      <>
        <SkipLinks links={[{ href: '#100%', children: 'Skip' }]} />
        <main id="100%">Main</main>
      </>
    );

    fireEvent.click(screen.getByRole('link'));
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('ignores clicks that do not hit a link', () => {
    render(<SkipLinks />);

    expect(fireEvent.click(screen.getByRole('list'))).toBe(true);
  });
});
