import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('leaves a link that opens in another tab to the browser', () => {
    render(
      <>
        <SkipLinks links={[{ href: '#main-content', children: 'Skip', target: '_blank' }]} />
        <main id="main-content">Main</main>
      </>
    );

    expect(fireEvent.click(screen.getByRole('link'))).toBe(true);
    expect(screen.getByRole('main')).not.toHaveFocus();
  });

  it('handles a link whose target is the current tab, in any letter case', () => {
    render(
      <>
        <SkipLinks links={[{ href: '#main-content', children: 'Skip', target: '_SELF' }]} />
        <main id="main-content">Main</main>
      </>
    );

    expect(fireEvent.click(screen.getByRole('link'))).toBe(false);
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it.each(['metaKey', 'ctrlKey', 'shiftKey', 'altKey'])('leaves a click with %s to the browser', (modifier) => {
    render(
      <>
        <SkipLinks />
        <main id="main-content">Main</main>
      </>
    );

    expect(fireEvent.click(screen.getByRole('link'), { [modifier]: true })).toBe(true);
    expect(screen.getByRole('main')).not.toHaveFocus();
  });

  it('prefers an id that matches the href as written over the decoded one', () => {
    render(
      <>
        <SkipLinks links={[{ href: '#p%C3%B5hisisu', children: 'Skip' }]} />
        <section id="p%C3%B5hisisu">As written</section>
        <main id="põhisisu">Decoded</main>
      </>
    );

    fireEvent.click(screen.getByRole('link'));
    expect(screen.getByText('As written')).toHaveFocus();
  });

  it('lets keyboard users skip the header and continue from the main content', async () => {
    const user = userEvent.setup();
    render(
      <>
        <SkipLinks />
        <header>
          <a href="#">Header link</a>
        </header>
        <main id="main-content">
          <a href="#">Link in main content</a>
        </main>
      </>
    );
    const main = screen.getByRole('main');

    await user.tab();
    expect(screen.getByRole('link', { name: 'skip-links.main-content' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(main).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('link', { name: 'Link in main content' })).toHaveFocus();
    expect(main).not.toHaveAttribute('tabindex');
    expect(main).not.toHaveClass('tedi-skip-links__target');
  });

  it('leaves a link alone when its id is not valid percent-encoding and nothing matches it', () => {
    render(<SkipLinks links={[{ href: '#50%', children: 'Skip' }]} />);

    expect(fireEvent.click(screen.getByRole('link'))).toBe(true);
  });

  it('keeps the focused link pointing at the same destination when the links reorder', () => {
    const main = { href: '#main-content', children: 'Skip to main content' };
    const search = { href: '#search', children: 'Skip to search' };
    const { rerender } = render(<SkipLinks links={[main, search]} />);

    screen.getByRole('link', { name: 'Skip to main content' }).focus();
    rerender(<SkipLinks links={[search, main]} />);

    expect(document.activeElement).toHaveAttribute('href', '#main-content');
  });

  it('renders links that share an href without key warnings', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <SkipLinks
        links={[
          { href: '#main-content', children: 'First' },
          { href: '#main-content', children: 'Second' },
          { href: '#main-content-1', children: 'Third' },
        ]}
      />
    );

    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('renders an entry without an href', () => {
    render(<SkipLinks links={[{ children: 'No destination' }, { href: '#main-content', children: 'Skip' }]} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
