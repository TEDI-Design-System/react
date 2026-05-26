import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Affix } from '../../misc/affix/affix';
import { Col, Row } from '../grid';
import { SideNav } from '../sidenav/sidenav';
import { VerticalSpacing } from '../vertical-spacing';
import { HorizontalNav, HorizontalNavProps } from './horizontal-nav';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.46.70?node-id=31693-133265&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof HorizontalNav> = {
  component: HorizontalNav,
  title: 'TEDI-Ready/Layout/HorizontalNav',
  subcomponents: {
    'HorizontalNav.Item': HorizontalNav.Item,
    'HorizontalNav.Group': HorizontalNav.Group,
    'HorizontalNav.SubItem': HorizontalNav.SubItem,
    'HorizontalNav.Separator': HorizontalNav.Separator,
  },
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replaceAll('HorizontalNavItem', 'HorizontalNav.Item')
            .replaceAll('HorizontalNavGroup', 'HorizontalNav.Group')
            .replaceAll('HorizontalNavSubItem', 'HorizontalNav.SubItem')
            .replaceAll('HorizontalNavSeparator', 'HorizontalNav.Separator');
        },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.46.70?node-id=31693-133265&m=dev',
    },
  },
};
export default meta;

type Story = StoryObj<HorizontalNavProps>;

const Template: StoryFn<HorizontalNavProps> = (args) => <HorizontalNav {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <HorizontalNav.Item href="#">Avaleht</HorizontalNav.Item>
        <HorizontalNav.Item href="#" isActive>
          Perekond
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Hüvitised ja toetused</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Töö ja töösuhted</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Liiklus ja sõidukid</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Minu andmed</HorizontalNav.Item>
      </>
    ),
  },
};

export const WithIcons: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <HorizontalNav.Item href="#" icon="home" isActive>
          Avaleht
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#" icon="family_restroom">
          Perekond
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#" icon="payments">
          Hüvitised
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#" icon="work">
          Töö
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#" icon="folder_shared">
          Minu andmed
        </HorizontalNav.Item>
      </>
    ),
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <HorizontalNav.Item href="#" isActive>
          Avaleht
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#" disabled>
          Locked section
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Töö</HorizontalNav.Item>
      </>
    ),
  },
};

/**
 * Mega-menu panel — pass `HorizontalNav.Group` elements via the active
 * `HorizontalNav.Item`'s `submenu` prop.
 */
export const MegaMenu: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <HorizontalNav.Item href="#">Avaleht</HorizontalNav.Item>
        <HorizontalNav.Item
          href="#"
          isActive
          submenu={
            <>
              <HorizontalNav.Group title="Abielu">
                <HorizontalNav.SubItem href="#">Abiellumine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Abielu lahutamine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Kooselu registreerimine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Dokumendid">
                <HorizontalNav.SubItem href="#">Perekonnasündmuse tõend ja abieluvõimetõend</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Rahvastikuregistri väljavõte</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Teatis ja perekonnaseisundi kinnitatud koopia</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Lapse saamine">
                <HorizontalNav.SubItem href="#">Lapsendamine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Raseduse planeerimine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Viljatus ja kunstlik viljastamine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Sünnitus">
                <HorizontalNav.SubItem href="#">Ennetähtaegse lapse sünd ja toetused</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Erivajadusega lapse sünd</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Kodusünnitus</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Lapsest loobumine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Abi">
                <HorizontalNav.SubItem href="#">Kohaliku omavalitsuse sotsiaalabi</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Kohaliku omavalitsuse sünnitoetus</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Lasteaiakoht ja selle taotlemine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            </>
          }
        >
          Perekond
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Hüvitised ja toetused</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Töö ja töösuhted</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Liiklus ja sõidukid</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Minu andmed</HorizontalNav.Item>
      </>
    ),
  },
};

/**
 * Constrained inner width — set `maxWidth` to clamp the item bar (and the
 * full-width submenu) to a system-content body width while the blue `<nav>`
 * background still spans 100% of its container. The inner content centers
 * automatically.
 */
export const ConstrainedInnerWidth: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    maxWidth: 'xl',
    children: (
      <>
        <HorizontalNav.Item href="#">Avaleht</HorizontalNav.Item>
        <HorizontalNav.Item
          href="#"
          isActive
          submenu={
            <>
              <HorizontalNav.Group title="Abielu">
                <HorizontalNav.SubItem href="#">Abiellumine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Abielu lahutamine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Dokumendid">
                <HorizontalNav.SubItem href="#">Lastega perede nõustamine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Lapsendamine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            </>
          }
        >
          Perekond
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Hüvitised ja toetused</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Töö ja töösuhted</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Minu andmed</HorizontalNav.Item>
      </>
    ),
  },
};

/**
 * Toggle-only parent — omit `href` on a `HorizontalNav.Item` that has a
 * `submenu`, and the trigger automatically renders as `<button>` with
 * `aria-haspopup="menu"` and `aria-expanded`. The submenu open/close state is
 * managed by `HorizontalNav` itself: clicking the parent toggles its panel,
 * clicking another parent switches to that one, and clicking outside the nav
 * or pressing `Escape` closes it. Pass `isActive` only if you also want the
 * panel open on mount and the parent visually marked as selected (e.g.
 * because the user is currently on a child route).
 */
export const ToggleOnlyParent: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <HorizontalNav.Item href="#">Avaleht</HorizontalNav.Item>
        <HorizontalNav.Item
          submenu={
            <>
              <HorizontalNav.Group title="Abielu">
                <HorizontalNav.SubItem href="#">Abiellumine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Abielu lahutamine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Dokumendid">
                <HorizontalNav.SubItem href="#">Lastega perede nõustamine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Lapsendamine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            </>
          }
        >
          Perekond
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Hüvitised ja toetused</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Töö ja töösuhted</HorizontalNav.Item>
      </>
    ),
  },
};

/**
 * Narrow mega-menu — set `submenuFit="item"` to align the panel under the
 * active item with content-driven width, instead of spanning the whole nav.
 * Groups still flow in a row; pass fewer groups for a tighter footprint.
 */
export const NarrowMegaMenu: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    submenuFit: 'item',
    children: (
      <>
        <HorizontalNav.Item href="#">Avaleht</HorizontalNav.Item>
        <HorizontalNav.Item
          href="#"
          isActive
          submenu={
            <>
              <HorizontalNav.Group title="Abielu">
                <HorizontalNav.SubItem href="#">Abiellumine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Abielu lahutamine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Kooselu registreerimine</HorizontalNav.SubItem>
              </HorizontalNav.Group>
              <HorizontalNav.Group title="Dokumendid">
                <HorizontalNav.SubItem href="#">Lastega perede nõustamine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Lapsendamine</HorizontalNav.SubItem>
                <HorizontalNav.SubItem href="#">Terviseprobleemiga laps</HorizontalNav.SubItem>
              </HorizontalNav.Group>
            </>
          }
        >
          Perekond
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Hüvitised ja toetused</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Töö ja töösuhted</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Liiklus ja sõidukid</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Minu andmed</HorizontalNav.Item>
      </>
    ),
  },
};

/**
 * Single-column submenu without a group title — omit `HorizontalNav.Group`'s
 * `title` to skip the `<h3>` heading. Combined with `submenuFit="item"` it
 * gives a compact menu aligned under the active item.
 */
export const NarrowSubmenuNoTitle: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    submenuFit: 'item',
    children: (
      <>
        <HorizontalNav.Item href="#">Avaleht</HorizontalNav.Item>
        <HorizontalNav.Item
          href="#"
          isActive
          submenu={
            <HorizontalNav.Group>
              <HorizontalNav.SubItem href="#">Abiellumine</HorizontalNav.SubItem>
              <HorizontalNav.SubItem href="#">Abielu lahutamine</HorizontalNav.SubItem>
              <HorizontalNav.SubItem href="#">Kooselu registreerimine</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          }
        >
          Perekond
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Hüvitised ja toetused</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Töö ja töösuhted</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Liiklus ja sõidukid</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Minu andmed</HorizontalNav.Item>
      </>
    ),
  },
};

export const WithSeparator: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    children: (
      <>
        <HorizontalNav.Item href="#" isActive>
          Töölaud
        </HorizontalNav.Item>
        <HorizontalNav.Item href="#">Minu taotlused</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Minu dokumendid</HorizontalNav.Item>
        <HorizontalNav.Item href="#">Koolitused</HorizontalNav.Item>
        <HorizontalNav.Separator />
        <HorizontalNav.Item href="#" icon="settings">
          Seaded
        </HorizontalNav.Item>
      </>
    ),
  },
};

const itemStateRows = ['Default', 'Hover', 'Active', 'Selected', 'Focus'] as const;
type ItemStateRow = (typeof itemStateRows)[number];

const itemColumns: Array<{ key: string; icon?: string; withSubmenu?: boolean }> = [
  { key: 'plain' },
  { key: 'with-icon', icon: 'home' },
  { key: 'with-submenu', icon: 'home', withSubmenu: true },
];

const itemStateClass = (state: ItemStateRow, column: string) =>
  `tedi-sb-horiz-nav-item--${state.toLowerCase()}-${column}`;

export const ItemStates: StoryObj = {
  render: () => (
    <VerticalSpacing size={0.5}>
      {itemStateRows.map((state) => (
        <Row key={state}>
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col className="display-flex align-items-center">
            <HorizontalNav ariaLabel={`Horizontal nav — ${state}`}>
              {itemColumns.map(({ key, icon, withSubmenu }) => (
                <HorizontalNav.Item
                  key={key}
                  href="#"
                  icon={icon}
                  isActive={state === 'Selected'}
                  className={itemStateClass(state, key)}
                  submenu={
                    withSubmenu ? (
                      <HorizontalNav.Group title="Section">
                        <HorizontalNav.SubItem href="#">Link</HorizontalNav.SubItem>
                      </HorizontalNav.Group>
                    ) : undefined
                  }
                >
                  Item
                </HorizontalNav.Item>
              ))}
            </HorizontalNav>
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  ),
  parameters: {
    pseudo: {
      hover: itemColumns.map(({ key }) => `.${itemStateClass('Hover', key)}`),
      active: itemColumns.map(({ key }) => `.${itemStateClass('Active', key)}`),
      focusVisible: itemColumns.map(({ key }) => `.${itemStateClass('Focus', key)}`),
    },
  },
};

const subItemStateClass = (state: ItemStateRow) => `tedi-sb-horiz-nav-subitem--${state.toLowerCase()}`;

export const SubItemStates: StoryObj = {
  render: () => (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--navigation-horizontal-submenu-background)',
      }}
    >
      <VerticalSpacing size={0.5}>
        {itemStateRows.map((state) => (
          <Row key={state}>
            <Col width={2} className="display-flex align-items-center">
              <Text modifiers="bold" color="white">
                {state}
              </Text>
            </Col>
            <Col>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, width: '240px' }}>
                <HorizontalNav.SubItem href="#" isActive={state === 'Selected'} className={subItemStateClass(state)}>
                  Placeholder link
                </HorizontalNav.SubItem>
              </ul>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </div>
  ),
  parameters: {
    pseudo: {
      hover: `.${subItemStateClass('Hover')}`,
      active: `.${subItemStateClass('Active')}`,
      focusVisible: `.${subItemStateClass('Focus')}`,
    },
  },
};

export const GroupVariants: StoryObj = {
  render: () => (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--navigation-horizontal-submenu-background)',
      }}
    >
      <VerticalSpacing size={1.5}>
        <Row>
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold" color="white">
              Default
            </Text>
          </Col>
          <Col>
            <HorizontalNav.Group title="Abielu">
              <HorizontalNav.SubItem href="#">Abiellumine</HorizontalNav.SubItem>
              <HorizontalNav.SubItem href="#">Abielu lahutamine</HorizontalNav.SubItem>
              <HorizontalNav.SubItem href="#">Kooselu registreerimine</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          </Col>
        </Row>
        <Row>
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold" color="white">
              With icon
            </Text>
          </Col>
          <Col>
            <HorizontalNav.Group title="Abielu" icon="favorite_border">
              <HorizontalNav.SubItem href="#">Abiellumine</HorizontalNav.SubItem>
              <HorizontalNav.SubItem href="#">Abielu lahutamine</HorizontalNav.SubItem>
              <HorizontalNav.SubItem href="#">Kooselu registreerimine</HorizontalNav.SubItem>
            </HorizontalNav.Group>
          </Col>
        </Row>
      </VerticalSpacing>
    </div>
  ),
};

/**
 * Below `mobileBreakpoint` the bar collapses into the shared Sidenav mobile
 * drawer. Control the drawer externally to pair it with a header hamburger.
 */
export const ControlledMobile: Story = {
  render: function ControlledMobile() {
    const [open, setOpen] = useState(false);
    return (
      <VerticalSpacing size={1}>
        <SideNav.Toggle menuOpen={open} toggleMenu={setOpen} />
        <HorizontalNav ariaLabel="Primary navigation" mobileBreakpoint="xxl" isMobileOpen={open} onMenuToggle={setOpen}>
          <HorizontalNav.Item href="#" isActive>
            Avaleht
          </HorizontalNav.Item>
          <HorizontalNav.Item href="#">Perekond</HorizontalNav.Item>
          <HorizontalNav.Item href="#">Hüvitised</HorizontalNav.Item>
        </HorizontalNav>
      </VerticalSpacing>
    );
  },
};

const stickyDemoNav = (
  <HorizontalNav ariaLabel="Primary navigation">
    <HorizontalNav.Item href="#" isActive>
      Avaleht
    </HorizontalNav.Item>
    <HorizontalNav.Item href="#">Perekond</HorizontalNav.Item>
    <HorizontalNav.Item href="#">Hüvitised ja toetused</HorizontalNav.Item>
    <HorizontalNav.Item href="#">Töö ja töösuhted</HorizontalNav.Item>
    <HorizontalNav.Item href="#">Minu andmed</HorizontalNav.Item>
  </HorizontalNav>
);

const stickyDemoFiller = (
  <VerticalSpacing size={1}>
    {Array.from({ length: 30 }).map((_, i) => (
      <Text key={i}>
        Scroll content row {i + 1}. Scroll the page to see how the nav above behaves with the chosen stickiness
        strategy.
      </Text>
    ))}
  </VerticalSpacing>
);

/**
 * Plain sticky — `HorizontalNav` has no built-in stickiness because it is a
 * layout concern. To pin the bar to the top while scrolling, wrap it in a
 * container with `position: sticky; top: 0` (or `top: <headerHeight>` if you
 * have a sticky header above it). This story wraps the nav in a sticky div.
 */
export const Sticky: StoryObj = {
  render: () => (
    <div style={{ height: '600px', overflowY: 'auto', border: '1px dashed var(--general-border-primary)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>{stickyDemoNav}</div>
      <div style={{ padding: '1.5rem' }}>{stickyDemoFiller}</div>
    </div>
  ),
};

/**
 * Sticky on scroll — use the existing `Affix` component to pin the nav after
 * the user scrolls past it. `Affix` (backed by `react-sticky-box`) measures
 * any registered header and offsets the sticky position accordingly.
 */
export const StickyOnScroll: StoryObj = {
  render: () => (
    <div style={{ height: '600px', overflowY: 'auto', border: '1px dashed var(--general-border-primary)' }}>
      <div style={{ padding: '1.5rem' }}>
        <Text>Scroll down — once the nav reaches the top of the viewport it sticks via `Affix`.</Text>
      </div>
      <Affix top={0}>{stickyDemoNav}</Affix>
      <div style={{ padding: '1.5rem' }}>{stickyDemoFiller}</div>
    </div>
  ),
};
