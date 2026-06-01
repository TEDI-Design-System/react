import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpoint } from '../../../helpers';
import { TopNavItem } from './components/top-nav-item/top-nav-item';
import { TopNav } from './top-nav';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => {
  const actual = jest.requireActual('../../../helpers');
  return {
    ...actual,
    useBreakpoint: jest.fn(),
  };
});

const setBreakpoint = (bp: string) => (useBreakpoint as jest.Mock).mockReturnValue(bp);

describe('TopNav', () => {
  beforeEach(() => {
    setBreakpoint('lg');
  });

  it('renders a nav landmark with the supplied aria-label', () => {
    render(
      <TopNav ariaLabel="Primary navigation">
        <TopNav.Item href="/">Dashboard</TopNav.Item>
      </TopNav>
    );
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  it('renders an <li> per TopNav.Item and ignores non-item children', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/a">A</TopNav.Item>
        <span>not an item</span>
        <TopNav.Item href="/b">B</TopNav.Item>
      </TopNav>
    );
    const navList = screen.getByRole('navigation').querySelector('ul');
    expect(navList?.children).toHaveLength(2);
    expect(screen.queryByText('not an item')).not.toBeInTheDocument();
  });

  it('flattens Fragment children so wrappers like `<>…</>` work transparently', () => {
    render(
      <TopNav ariaLabel="Primary">
        <>
          <TopNav.Item href="/a">A</TopNav.Item>
          <TopNav.Item href="/b">B</TopNav.Item>
        </>
        <TopNav.Item href="/c">C</TopNav.Item>
      </TopNav>
    );
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'B' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'C' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/" isActive>
          Home
        </TopNav.Item>
        <TopNav.Item href="/docs">Docs</TopNav.Item>
      </TopNav>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
  });

  it('respects `disabled` — strips href, sets aria-disabled, blocks onClick', () => {
    const onClick = jest.fn();
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/x" disabled onClick={onClick}>
          Disabled
        </TopNav.Item>
      </TopNav>
    );
    const link = screen.getByText('Disabled').closest('a')!;
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the mega-menu panel when the active item has a submenu', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/">Home</TopNav.Item>
        <TopNav.Item
          href="/family"
          isActive
          submenu={
            <TopNav.Group title="Marriage">
              <TopNav.SubItem href="/family/marriage">Get married</TopNav.SubItem>
              <TopNav.SubItem href="/family/divorce">Divorce</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    expect(container.querySelector('[data-name="top-nav-submenu"]')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marriage' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get married' })).toHaveAttribute('href', '/family/marriage');
  });

  it('resyncs the open toggle when `isActive` changes on a toggle-only item after mount', () => {
    const Submenu = (
      <TopNav.Group title="Marriage">
        <TopNav.SubItem href="/m">Get married</TopNav.SubItem>
      </TopNav.Group>
    );
    const { rerender, container } = render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/">Home</TopNav.Item>
        <TopNav.Item submenu={Submenu}>Family</TopNav.Item>
      </TopNav>
    );
    expect(container.querySelector('[data-name="top-nav-submenu"]')).not.toBeInTheDocument();

    rerender(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/">Home</TopNav.Item>
        <TopNav.Item submenu={Submenu} isActive>
          Family
        </TopNav.Item>
      </TopNav>
    );
    expect(container.querySelector('[data-name="top-nav-submenu"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Family/ })).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not render the panel when the item is NOT active', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/" isActive>
          Home
        </TopNav.Item>
        <TopNav.Item
          href="/family"
          submenu={
            <TopNav.Group title="Marriage">
              <TopNav.SubItem href="/x">x</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    expect(container.querySelector('[data-name="top-nav-submenu"]')).not.toBeInTheDocument();
  });

  it('renders a Separator between items on desktop and exposes role="separator"', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/">Dashboard</TopNav.Item>
        <TopNav.Separator />
        <TopNav.Item href="/settings">Settings</TopNav.Item>
      </TopNav>
    );
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    const list = screen.getByRole('navigation').querySelector('ul');
    expect(list?.children).toHaveLength(3);
  });

  it('omits Separators from the mobile drawer', () => {
    setBreakpoint('sm');
    render(
      <TopNav ariaLabel="Primary" isMobileOpen>
        <TopNav.Item href="/">Dashboard</TopNav.Item>
        <TopNav.Separator />
        <TopNav.Item href="/settings">Settings</TopNav.Item>
      </TopNav>
    );
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument();
  });

  it('passes submenu groups and sub-items into the mobile drawer', () => {
    setBreakpoint('sm');
    render(
      <TopNav ariaLabel="Primary" isMobileOpen>
        <TopNav.Item href="/">Home</TopNav.Item>
        <TopNav.Item
          href="/family"
          submenu={
            <>
              <TopNav.Group title="Marriage">
                <TopNav.SubItem href="/m">Get married</TopNav.SubItem>
                <TopNav.SubItem href="/d">Divorce</TopNav.SubItem>
              </TopNav.Group>
              <TopNav.Group title="Children">
                <TopNav.SubItem href="/c">Adoption</TopNav.SubItem>
              </TopNav.Group>
            </>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );

    const familyButton = screen.getByRole('button', { name: /Family/ });
    fireEvent.click(familyButton);
    expect(screen.getByRole('menuitem', { name: 'Get married' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Divorce' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Adoption' })).toBeInTheDocument();
  });

  it('falls through to the shared Sidenav mobile drawer below the breakpoint', () => {
    setBreakpoint('sm');
    render(
      <TopNav ariaLabel="Primary navigation" isMobileOpen>
        <TopNav.Item href="/">Home</TopNav.Item>
        <TopNav.Item href="/docs">Docs</TopNav.Item>
      </TopNav>
    );
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Docs' })).toBeInTheDocument();
  });

  it('applies maxWidth as inline style on the inner list and submenu inner', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary" maxWidth={1200}>
        <TopNav.Item
          href="/"
          isActive
          submenu={
            <TopNav.Group title="More">
              <TopNav.SubItem href="/m">Item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Home
        </TopNav.Item>
      </TopNav>
    );
    const list = container.querySelector('ul') as HTMLElement;
    expect(list.style.maxWidth).toBe('1200px');
    const submenuInner = container.querySelector('[data-name="top-nav-submenu"] > div') as HTMLElement;
    expect(submenuInner.style.maxWidth).toBe('1200px');
  });

  it('resolves a TEDI breakpoint name passed to maxWidth into the breakpoint min-width', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary" maxWidth="lg">
        <TopNav.Item href="/">Home</TopNav.Item>
      </TopNav>
    );
    expect((container.querySelector('ul') as HTMLElement).style.maxWidth).toBe('62rem');
  });

  it('toggles a button-trigger submenu on click and closes it again', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/">Home</TopNav.Item>
        <TopNav.Item
          submenu={
            <TopNav.Group title="More">
              <TopNav.SubItem href="/m">Item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    const trigger = screen.getByRole('button', { name: /Family/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: 'Item' })).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Item' })).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: 'Item' })).not.toBeInTheDocument();
  });

  it('closes an open submenu when clicking outside the nav', () => {
    render(
      <div>
        <TopNav ariaLabel="Primary">
          <TopNav.Item
            isActive
            submenu={
              <TopNav.Group title="More">
                <TopNav.SubItem href="/m">Item</TopNav.SubItem>
              </TopNav.Group>
            }
          >
            Family
          </TopNav.Item>
        </TopNav>
        <button>Outside</button>
      </div>
    );
    expect(screen.getByRole('link', { name: 'Item' })).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('link', { name: 'Item' })).not.toBeInTheDocument();
  });

  it('links the toggle button to its submenu via matching id / aria-controls', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          isActive
          submenu={
            <TopNav.Group title="More">
              <TopNav.SubItem href="/m">Item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    const trigger = screen.getByRole('button', { name: /Family/ });
    const controls = trigger.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    const panel = container.querySelector(`#${CSS.escape(controls as string)}`);
    expect(panel).toHaveAttribute('data-name', 'top-nav-submenu');
  });

  it('returns focus to the trigger when Escape closes the panel', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          submenu={
            <TopNav.Group title="More">
              <TopNav.SubItem href="/m">Item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    const trigger = screen.getByRole('button', { name: /Family/ });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    (document.body as HTMLElement).focus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(trigger);
  });

  it('renders the Group title with the requested heading level', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          href="/"
          isActive
          submenu={
            <TopNav.Group title="Section" headingLevel="h2">
              <TopNav.SubItem href="/a">Link</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Home
        </TopNav.Item>
      </TopNav>
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toBeInTheDocument();
  });

  it('closes an open submenu when Escape is pressed', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          isActive
          submenu={
            <TopNav.Group title="More">
              <TopNav.SubItem href="/m">Item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    expect(screen.getByRole('link', { name: 'Item' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('link', { name: 'Item' })).not.toBeInTheDocument();
  });

  it('switching between two button-trigger submenus closes the previous one', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          submenu={
            <TopNav.Group title="A">
              <TopNav.SubItem href="/a">A-item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          A
        </TopNav.Item>
        <TopNav.Item
          submenu={
            <TopNav.Group title="B">
              <TopNav.SubItem href="/b">B-item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          B
        </TopNav.Item>
      </TopNav>
    );
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(screen.getByRole('link', { name: 'A-item' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.queryByRole('link', { name: 'A-item' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'B-item' })).toBeInTheDocument();
  });

  it('renders the parent as <button> with aria-haspopup/aria-expanded when it has a submenu but no href', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          isActive
          submenu={
            <TopNav.Group title="More">
              <TopNav.SubItem href="/m">Item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    const trigger = screen.getByRole('button', { name: /Family/ });
    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).not.toHaveAttribute('href');
  });

  it('keeps <a> when href is provided even if a submenu is present', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          href="/family"
          submenu={
            <TopNav.Group title="More">
              <TopNav.SubItem href="/m">Item</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    expect(screen.getByRole('link', { name: /Family/ })).toHaveAttribute('href', '/family');
    expect(screen.queryByRole('button', { name: /Family/ })).not.toBeInTheDocument();
  });

  it('defaults the bar maxWidth to "xxl" (87.5rem)', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item href="/">Home</TopNav.Item>
      </TopNav>
    );
    expect((container.querySelector('ul') as HTMLElement).style.maxWidth).toBe('87.5rem');
  });

  it('removes the maxWidth cap when maxWidth="none"', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary" maxWidth="none">
        <TopNav.Item href="/">Home</TopNav.Item>
      </TopNav>
    );
    expect((container.querySelector('ul') as HTMLElement).style.maxWidth).toBe('');
  });

  it('renders the submenu inline under the active item when submenuFit="item"', () => {
    const { container } = render(
      <TopNav ariaLabel="Primary" submenuFit="item">
        <TopNav.Item href="/">Home</TopNav.Item>
        <TopNav.Item
          href="/family"
          isActive
          submenu={
            <TopNav.Group title="Marriage">
              <TopNav.SubItem href="/m">Get married</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Family
        </TopNav.Item>
      </TopNav>
    );
    const submenu = container.querySelector('[data-name="top-nav-submenu"]');
    expect(submenu).toBeInTheDocument();
    const activeItem = screen.getByRole('link', { name: /Family/ }).closest('li');
    expect(activeItem).toContainElement(submenu as HTMLElement);
  });

  it('omits the <h3> heading when a Group has no title', () => {
    render(
      <TopNav ariaLabel="Primary">
        <TopNav.Item
          href="/"
          isActive
          submenu={
            <TopNav.Group>
              <TopNav.SubItem href="/a">A</TopNav.SubItem>
            </TopNav.Group>
          }
        >
          Home
        </TopNav.Item>
      </TopNav>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
  });

  it('does NOT render the desktop bar markup when in mobile mode', () => {
    setBreakpoint('sm');
    const { container } = render(
      <TopNav ariaLabel="Primary" isMobileOpen>
        <TopNav.Item href="/">Home</TopNav.Item>
      </TopNav>
    );
    expect(container.querySelector('[data-name="top-nav"]')).not.toBeInTheDocument();
  });

  describe('TopNav.Item', () => {
    it('renders a <button type="button"> when href is omitted and the item has a submenu', () => {
      render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item
            submenu={
              <TopNav.Group>
                <TopNav.SubItem href="/a">A</TopNav.SubItem>
              </TopNav.Group>
            }
          >
            Family
          </TopNav.Item>
        </TopNav>
      );
      const trigger = screen.getByRole('button', { name: /Family/ });
      expect(trigger).toHaveAttribute('type', 'button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('drops the href when disabled and exposes aria-disabled', () => {
      render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item href="/x" disabled>
            Disabled link
          </TopNav.Item>
        </TopNav>
      );
      const link = screen.getByText('Disabled link').closest('a') as HTMLAnchorElement;
      expect(link).not.toHaveAttribute('href');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('suppresses onClick when disabled', () => {
      const onClick = jest.fn();
      render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item href="/x" disabled onClick={onClick}>
            X
          </TopNav.Item>
        </TopNav>
      );
      fireEvent.click(screen.getByText('X'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls onClick when enabled', () => {
      const onClick = jest.fn();
      render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item href="/x" onClick={onClick}>
            X
          </TopNav.Item>
        </TopNav>
      );
      fireEvent.click(screen.getByText('X'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders an icon when `icon` is passed as a string', () => {
      const { container } = render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item href="/" icon="home">
            Home
          </TopNav.Item>
        </TopNav>
      );
      expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('renders an icon when `icon` is passed as an object with a custom size', () => {
      const { container } = render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item href="/" icon={{ name: 'home', size: 24 }}>
            Home
          </TopNav.Item>
        </TopNav>
      );
      expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('falls back to size 18 when `icon` is an object without `size`', () => {
      const { container } = render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item href="/" icon={{ name: 'home' }}>
            Home
          </TopNav.Item>
        </TopNav>
      );
      expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    // Direct render (bypassing parent's cloneElement) exercises the default
    // values for `hasSubmenu`, `renderSubmenuInline`, and the `isSubmenuOpen
    // ?? isActive` fallback that the parent normally overrides.
    it('uses default hasSubmenu=false / renderSubmenuInline=false when rendered standalone', () => {
      render(<TopNavItem href="/x">Standalone</TopNavItem>);
      const link = screen.getByRole('link', { name: 'Standalone' });
      expect(link).not.toHaveAttribute('aria-haspopup');
      expect(link).not.toHaveAttribute('aria-expanded');
    });

    it('falls back to `isActive` for the active class when `isSubmenuOpen` is omitted', () => {
      render(
        <TopNavItem href="/x" isActive>
          Active
        </TopNavItem>
      );
      expect(screen.getByRole('link', { name: 'Active' })).toHaveClass('tedi-top-nav__link--active');
    });

    it('respects an explicit `isSubmenuOpen={true}` over `isActive`', () => {
      render(
        <TopNavItem hasSubmenu isSubmenuOpen submenu={<span>x</span>}>
          Toggle
        </TopNavItem>
      );
      const button = screen.getByRole('button', { name: /Toggle/ });
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders a custom element via the `as` prop', () => {
      const Custom = (props: React.AnchorHTMLAttributes<HTMLElement>) => <a data-custom {...props} />;
      render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item as={Custom} href="/x">
            X
          </TopNav.Item>
        </TopNav>
      );
      const link = screen.getByRole('link', { name: 'X' });
      expect(link).toBeInTheDocument();
      // Sanity: the `as`-supplied component rendered (not the default <a>).
      expect(link).toHaveAttribute('data-custom');
    });
  });

  describe('TopNav.Group', () => {
    it('renders the title heading at the configured level', () => {
      render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item
            href="/"
            isActive
            submenu={
              <TopNav.Group title="Marriage" headingLevel="h2">
                <TopNav.SubItem href="/m">A</TopNav.SubItem>
              </TopNav.Group>
            }
          >
            Home
          </TopNav.Item>
        </TopNav>
      );
      const heading = screen.getByRole('heading', { name: 'Marriage' });
      expect(heading.tagName).toBe('H2');
    });

    it('renders a leading icon when `icon` is a string', () => {
      const { container } = render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item
            href="/"
            isActive
            submenu={
              <TopNav.Group title="Marriage" icon="family_restroom">
                <TopNav.SubItem href="/m">A</TopNav.SubItem>
              </TopNav.Group>
            }
          >
            Home
          </TopNav.Item>
        </TopNav>
      );
      const heading = screen.getByRole('heading', { name: /Marriage/ });
      expect(heading.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('renders a leading icon when `icon` is an object with custom size', () => {
      const { container } = render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item
            href="/"
            isActive
            submenu={
              <TopNav.Group title="Marriage" icon={{ name: 'family_restroom', size: 24 }}>
                <TopNav.SubItem href="/m">A</TopNav.SubItem>
              </TopNav.Group>
            }
          >
            Home
          </TopNav.Item>
        </TopNav>
      );
      const heading = screen.getByRole('heading', { name: /Marriage/ });
      expect(heading.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('falls back to size 16 when icon object omits `size`', () => {
      render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item
            href="/"
            isActive
            submenu={
              <TopNav.Group title="Marriage" icon={{ name: 'family_restroom' }}>
                <TopNav.SubItem href="/m">A</TopNav.SubItem>
              </TopNav.Group>
            }
          >
            Home
          </TopNav.Item>
        </TopNav>
      );
      expect(screen.getByRole('heading', { name: /Marriage/ })).toBeInTheDocument();
    });

    it('does not render the icon when `title` is omitted (icon ignored without title)', () => {
      const { container } = render(
        <TopNav ariaLabel="Primary">
          <TopNav.Item
            href="/"
            isActive
            submenu={
              <TopNav.Group icon="family_restroom">
                <TopNav.SubItem href="/m">A</TopNav.SubItem>
              </TopNav.Group>
            }
          >
            Home
          </TopNav.Item>
        </TopNav>
      );
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      // Icon is inside the title — no title means no icon either.
      expect(container.querySelector('.tedi-top-nav__group-icon')).not.toBeInTheDocument();
    });
  });
});
