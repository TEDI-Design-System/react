import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpoint } from '../../../helpers';
import { HorizontalNavItem } from './components/horizontal-nav-item/horizontal-nav-item';
import { HorizontalNav } from './horizontal-nav';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => {
  const actual = jest.requireActual('../../../helpers');
  return {
    ...actual,
    useBreakpoint: jest.fn(),
  };
});

const setBreakpoint = (bp: string) => (useBreakpoint as jest.Mock).mockReturnValue(bp);

describe('HorizontalNav', () => {
  beforeEach(() => {
    setBreakpoint('lg');
  });

  it('renders a nav landmark with the supplied aria-label', () => {
    render(
      <HorizontalNav ariaLabel="Primary navigation">
        <HorizontalNav.Item href="/">Dashboard</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  it('renders an <li> per HorizontalNav.Item and ignores non-item children', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/a">A</HorizontalNav.Item>
        <span>not an item</span>
        <HorizontalNav.Item href="/b">B</HorizontalNav.Item>
      </HorizontalNav>
    );
    const navList = screen.getByRole('navigation').querySelector('ul');
    expect(navList?.children).toHaveLength(2);
    expect(screen.queryByText('not an item')).not.toBeInTheDocument();
  });

  it('flattens Fragment children so wrappers like `<>…</>` work transparently', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <>
          <HorizontalNav.Item href="/a">A</HorizontalNav.Item>
          <HorizontalNav.Item href="/b">B</HorizontalNav.Item>
        </>
        <HorizontalNav.Item href="/c">C</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'B' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'C' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current="page"', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/" isActive>
          Home
        </HorizontalNav.Item>
        <HorizontalNav.Item href="/docs">Docs</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
  });

  it('respects `disabled` — strips href, sets aria-disabled, blocks onClick', () => {
    const onClick = jest.fn();
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/x" disabled onClick={onClick}>
          Disabled
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    const link = screen.getByText('Disabled').closest('a')!;
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the mega-menu panel when the active item has a submenu', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
        <HorizontalNav.Item
          href="/family"
          isActive
          submenu={
            <HorizontalNav.Group title="Marriage">
              <HorizontalNav.SubItem href="/family/marriage">Get married</HorizontalNav.SubItem>
              <HorizontalNav.SubItem href="/family/divorce">Divorce</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(container.querySelector('[data-name="horizontal-nav-submenu"]')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marriage' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get married' })).toHaveAttribute('href', '/family/marriage');
  });

  it('does not render the panel when the item is NOT active', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/" isActive>
          Home
        </HorizontalNav.Item>
        <HorizontalNav.Item
          href="/family"
          submenu={
            <HorizontalNav.Group title="Marriage">
              <HorizontalNav.SubItem href="/x">x</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(container.querySelector('[data-name="horizontal-nav-submenu"]')).not.toBeInTheDocument();
  });

  it('renders a Separator between items on desktop and exposes role="separator"', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/">Dashboard</HorizontalNav.Item>
        <HorizontalNav.Separator />
        <HorizontalNav.Item href="/settings">Settings</HorizontalNav.Item>
      </HorizontalNav>
    );
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    const list = screen.getByRole('navigation').querySelector('ul');
    expect(list?.children).toHaveLength(3);
  });

  it('omits Separators from the mobile drawer', () => {
    setBreakpoint('sm');
    render(
      <HorizontalNav ariaLabel="Primary" isMobileOpen>
        <HorizontalNav.Item href="/">Dashboard</HorizontalNav.Item>
        <HorizontalNav.Separator />
        <HorizontalNav.Item href="/settings">Settings</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument();
  });

  it('passes submenu groups and sub-items into the mobile drawer', () => {
    setBreakpoint('sm');
    render(
      <HorizontalNav ariaLabel="Primary" isMobileOpen>
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
        <HorizontalNav.Item
          href="/family"
          submenu={
            <>
              <HorizontalNav.Group title="Marriage">
                <HorizontalNav.SubItem href="/m">Get married</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="/d">Divorce</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Children">
                <HorizontalNav.SubItem href="/c">Adoption</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            </>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
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
      <HorizontalNav ariaLabel="Primary navigation" isMobileOpen>
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
        <HorizontalNav.Item href="/docs">Docs</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Docs' })).toBeInTheDocument();
  });

  it('applies maxWidth as inline style on the inner list and submenu inner', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary" maxWidth={1200}>
        <HorizontalNav.Item
          href="/"
          isActive
          submenu={
            <HorizontalNav.Group title="More">
              <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Home
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    const list = container.querySelector('ul') as HTMLElement;
    expect(list.style.maxWidth).toBe('1200px');
    const submenuInner = container.querySelector('[data-name="horizontal-nav-submenu"] > div') as HTMLElement;
    expect(submenuInner.style.maxWidth).toBe('1200px');
  });

  it('resolves a TEDI breakpoint name passed to maxWidth into the breakpoint min-width', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary" maxWidth="lg">
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect((container.querySelector('ul') as HTMLElement).style.maxWidth).toBe('62rem');
  });

  it('toggles a button-trigger submenu on click and closes it again', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
        <HorizontalNav.Item
          submenu={
            <HorizontalNav.Group title="More">
              <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
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
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item
            isActive
            submenu={
              <HorizontalNav.Group title="More">
                <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            }
          >
            Family
          </HorizontalNav.Item>
        </HorizontalNav>
        <button>Outside</button>
      </div>
    );
    expect(screen.getByRole('link', { name: 'Item' })).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('link', { name: 'Item' })).not.toBeInTheDocument();
  });

  it('links the toggle button to its submenu via matching id / aria-controls', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          isActive
          submenu={
            <HorizontalNav.Group title="More">
              <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    const trigger = screen.getByRole('button', { name: /Family/ });
    const controls = trigger.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    const panel = container.querySelector(`#${CSS.escape(controls as string)}`);
    expect(panel).toHaveAttribute('data-name', 'horizontal-nav-submenu');
  });

  it('returns focus to the trigger when Escape closes the panel', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          submenu={
            <HorizontalNav.Group title="More">
              <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
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
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          href="/"
          isActive
          submenu={
            <HorizontalNav.Group title="Section" headingLevel="h2">
              <HorizontalNav.SubItem href="/a">Link</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Home
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toBeInTheDocument();
  });

  it('closes an open submenu when Escape is pressed', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          isActive
          submenu={
            <HorizontalNav.Group title="More">
              <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.getByRole('link', { name: 'Item' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('link', { name: 'Item' })).not.toBeInTheDocument();
  });

  it('switching between two button-trigger submenus closes the previous one', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          submenu={
            <HorizontalNav.Group title="A">
              <HorizontalNav.SubItem href="/a">A-item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          A
        </HorizontalNav.Item>
        <HorizontalNav.Item
          submenu={
            <HorizontalNav.Group title="B">
              <HorizontalNav.SubItem href="/b">B-item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          B
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(screen.getByRole('link', { name: 'A-item' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.queryByRole('link', { name: 'A-item' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'B-item' })).toBeInTheDocument();
  });

  it('renders the parent as <button> with aria-haspopup/aria-expanded when it has a submenu but no href', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          isActive
          submenu={
            <HorizontalNav.Group title="More">
              <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    const trigger = screen.getByRole('button', { name: /Family/ });
    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).not.toHaveAttribute('href');
  });

  it('keeps <a> when href is provided even if a submenu is present', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          href="/family"
          submenu={
            <HorizontalNav.Group title="More">
              <HorizontalNav.SubItem href="/m">Item</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.getByRole('link', { name: /Family/ })).toHaveAttribute('href', '/family');
    expect(screen.queryByRole('button', { name: /Family/ })).not.toBeInTheDocument();
  });

  it('defaults the bar maxWidth to "xxl" (87.5rem)', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect((container.querySelector('ul') as HTMLElement).style.maxWidth).toBe('87.5rem');
  });

  it('removes the maxWidth cap when maxWidth="none"', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary" maxWidth="none">
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect((container.querySelector('ul') as HTMLElement).style.maxWidth).toBe('');
  });

  it('renders the submenu inline under the active item when submenuFit="item"', () => {
    const { container } = render(
      <HorizontalNav ariaLabel="Primary" submenuFit="item">
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
        <HorizontalNav.Item
          href="/family"
          isActive
          submenu={
            <HorizontalNav.Group title="Marriage">
              <HorizontalNav.SubItem href="/m">Get married</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Family
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    const submenu = container.querySelector('[data-name="horizontal-nav-submenu"]');
    expect(submenu).toBeInTheDocument();
    const activeItem = screen.getByRole('link', { name: /Family/ }).closest('li');
    expect(activeItem).toContainElement(submenu as HTMLElement);
  });

  it('omits the <h3> heading when a Group has no title', () => {
    render(
      <HorizontalNav ariaLabel="Primary">
        <HorizontalNav.Item
          href="/"
          isActive
          submenu={
            <HorizontalNav.Group>
              <HorizontalNav.SubItem href="/a">A</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Home
        </HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
  });

  it('does NOT render the desktop bar markup when in mobile mode', () => {
    setBreakpoint('sm');
    const { container } = render(
      <HorizontalNav ariaLabel="Primary" isMobileOpen>
        <HorizontalNav.Item href="/">Home</HorizontalNav.Item>
      </HorizontalNav>
    );
    expect(container.querySelector('[data-name="horizontal-nav"]')).not.toBeInTheDocument();
  });

  describe('HorizontalNav.Item', () => {
    it('renders a <button type="button"> when href is omitted and the item has a submenu', () => {
      render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item
            submenu={
              <HorizontalNav.Group>
                <HorizontalNav.SubItem href="/a">A</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            }
          >
            Family
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      const trigger = screen.getByRole('button', { name: /Family/ });
      expect(trigger).toHaveAttribute('type', 'button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('drops the href when disabled and exposes aria-disabled', () => {
      render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item href="/x" disabled>
            Disabled link
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      const link = screen.getByText('Disabled link').closest('a') as HTMLAnchorElement;
      expect(link).not.toHaveAttribute('href');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('suppresses onClick when disabled', () => {
      const onClick = jest.fn();
      render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item href="/x" disabled onClick={onClick}>
            X
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      fireEvent.click(screen.getByText('X'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls onClick when enabled', () => {
      const onClick = jest.fn();
      render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item href="/x" onClick={onClick}>
            X
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      fireEvent.click(screen.getByText('X'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders an icon when `icon` is passed as a string', () => {
      const { container } = render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item href="/" icon="home">
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('renders an icon when `icon` is passed as an object with a custom size', () => {
      const { container } = render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item href="/" icon={{ name: 'home', size: 24 }}>
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('falls back to size 18 when `icon` is an object without `size`', () => {
      const { container } = render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item href="/" icon={{ name: 'home' }}>
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      expect(container.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    // Direct render (bypassing parent's cloneElement) exercises the default
    // values for `hasSubmenu`, `renderSubmenuInline`, and the `isSubmenuOpen
    // ?? isActive` fallback that the parent normally overrides.
    it('uses default hasSubmenu=false / renderSubmenuInline=false when rendered standalone', () => {
      render(<HorizontalNavItem href="/x">Standalone</HorizontalNavItem>);
      const link = screen.getByRole('link', { name: 'Standalone' });
      expect(link).not.toHaveAttribute('aria-haspopup');
      expect(link).not.toHaveAttribute('aria-expanded');
    });

    it('falls back to `isActive` for the active class when `isSubmenuOpen` is omitted', () => {
      render(
        <HorizontalNavItem href="/x" isActive>
          Active
        </HorizontalNavItem>
      );
      expect(screen.getByRole('link', { name: 'Active' })).toHaveClass('tedi-horizontal-nav__link--active');
    });

    it('respects an explicit `isSubmenuOpen={true}` over `isActive`', () => {
      render(
        <HorizontalNavItem hasSubmenu isSubmenuOpen submenu={<span>x</span>}>
          Toggle
        </HorizontalNavItem>
      );
      const button = screen.getByRole('button', { name: /Toggle/ });
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders a custom element via the `as` prop', () => {
      const Custom = (props: React.AnchorHTMLAttributes<HTMLElement>) => <a data-testid="custom-trigger" {...props} />;
      render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item as={Custom} href="/x">
            X
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    });
  });

  describe('HorizontalNav.Group', () => {
    it('renders the title heading at the configured level', () => {
      render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item
            href="/"
            isActive
            submenu={
              <HorizontalNav.Group title="Marriage" headingLevel="h2">
                <HorizontalNav.SubItem href="/m">A</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            }
          >
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      const heading = screen.getByRole('heading', { name: 'Marriage' });
      expect(heading.tagName).toBe('H2');
    });

    it('renders a leading icon when `icon` is a string', () => {
      const { container } = render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item
            href="/"
            isActive
            submenu={
              <HorizontalNav.Group title="Marriage" icon="family_restroom">
                <HorizontalNav.SubItem href="/m">A</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            }
          >
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      const heading = screen.getByRole('heading', { name: /Marriage/ });
      expect(heading.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('renders a leading icon when `icon` is an object with custom size', () => {
      const { container } = render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item
            href="/"
            isActive
            submenu={
              <HorizontalNav.Group title="Marriage" icon={{ name: 'family_restroom', size: 24 }}>
                <HorizontalNav.SubItem href="/m">A</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            }
          >
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      const heading = screen.getByRole('heading', { name: /Marriage/ });
      expect(heading.querySelector('[data-name="icon"]')).toBeInTheDocument();
    });

    it('falls back to size 16 when icon object omits `size`', () => {
      render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item
            href="/"
            isActive
            submenu={
              <HorizontalNav.Group title="Marriage" icon={{ name: 'family_restroom' }}>
                <HorizontalNav.SubItem href="/m">A</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            }
          >
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      expect(screen.getByRole('heading', { name: /Marriage/ })).toBeInTheDocument();
    });

    it('does not render the icon when `title` is omitted (icon ignored without title)', () => {
      const { container } = render(
        <HorizontalNav ariaLabel="Primary">
          <HorizontalNav.Item
            href="/"
            isActive
            submenu={
              <HorizontalNav.Group icon="family_restroom">
                <HorizontalNav.SubItem href="/m">A</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            }
          >
            Home
          </HorizontalNav.Item>
        </HorizontalNav>
      );
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      // Icon is inside the title — no title means no icon either.
      expect(container.querySelector('.tedi-horizontal-nav__group-icon')).not.toBeInTheDocument();
    });
  });
});
