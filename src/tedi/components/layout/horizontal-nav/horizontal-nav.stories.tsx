import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { createContext, useContext, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Affix } from '../../misc/affix/affix';
import Separator from '../../misc/separator/separator';
import { Col, Row } from '../grid';
import { Representative } from '../header/components/header-role/header-role-representatives';
import { Header } from '../header/header';
import { HideAt } from '../hide-at/hide-at';
import { ShowAt } from '../show-at/show-at';
import { SideNav } from '../sidenav/sidenav';
import { VerticalSpacing } from '../vertical-spacing';
import { HorizontalNav, HorizontalNavProps } from './horizontal-nav';

const headerLanguages = [
  { 'aria-label': 'Estonian', label: 'EST', locale: 'et' as const },
  { 'aria-label': 'English', label: 'ENG', locale: 'en' as const },
  { 'aria-label': 'Russian', label: 'RUS', locale: 'ru' as const },
];

const headerRepresentatives: Representative[] = [
  { id: '1', name: 'Mari Maasikas', description: '49504080934', icon: { name: 'person', size: 24 } },
  { id: '2', name: 'Juulia Sarapuu', description: 'Peasekretär', icon: { name: 'supervised_user_circle', size: 24 } },
  { id: '3', name: 'Marta Sarapuu', description: 'Sekretär', icon: { name: 'supervised_user_circle', size: 24 } },
  { id: '4', name: 'Helgi Sarapuu', description: 'Jurist', icon: { name: 'supervised_user_circle', size: 24 } },
];

const headerLogo = <img src="header-logo.svg" alt="Logo" />;

/**
 * Shared mobile-drawer state between the meta-level Header (which renders the
 * hamburger in its `toggle` slot at smaller viewports) and every Template-
 * based `HorizontalNav` story. Stories rendered via `Template` automatically
 * read this context — so when the viewport shrinks below the nav's
 * `mobileBreakpoint`, clicking the header's hamburger opens the nav's drawer.
 */
const MobileNavStateContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

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
  decorators: [
    function MetaHeaderDecorator(Story, context) {
      const [open, setOpen] = useState(false);
      if (context.parameters?.noHeader) return <Story />;
      return (
        <MobileNavStateContext.Provider value={{ open, setOpen }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header
              toggle={
                <HideAt md>
                  <SideNav.Toggle menuOpen={open} toggleMenu={setOpen} showLabel label="Menüü" />
                </HideAt>
              }
            >
              <Header.Logo logo={headerLogo} href="#" />
              <Header.Center>{null}</Header.Center>
              <Header.Actions>
                <ShowAt lg>
                  <Header.Role representatives={headerRepresentatives} label="Isikukood:" />
                  <Separator axis="vertical" />
                </ShowAt>
                <Header.Language languages={headerLanguages} currentLanguage="EST" />
                <ShowAt lg>
                  <Separator axis="vertical" />
                  <Header.Profile label="Minu profiil">
                    <p style={{ margin: 0 }}>Profile menu content</p>
                  </Header.Profile>
                </ShowAt>
              </Header.Actions>
            </Header>
            <Story />
          </div>
        </MobileNavStateContext.Provider>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
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

const Template: StoryFn<HorizontalNavProps> = (args) => {
  const mobileState = useContext(MobileNavStateContext);
  const integratedProps =
    mobileState && args.isMobileOpen === undefined
      ? {
          isMobileOpen: mobileState.open,
          onMenuToggle: (open: boolean) => {
            mobileState.setOpen(open);
            args.onMenuToggle?.(open);
          },
        }
      : null;
  return <HorizontalNav {...args} {...integratedProps} />;
};

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

export const MenuOpen: Story = {
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
 * Overrides the default `maxWidth` (`'xxl'`) with a tighter `'lg'`.
 */
export const ConstrainedInnerWidth: Story = {
  render: Template,
  args: {
    ariaLabel: 'Primary navigation',
    maxWidth: 'lg',
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
 * Parent item with no `href` — renders as a `<button>` and uses the built-in
 * toggle / outside-click / Escape behavior.
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
 * `submenuFit="item"` aligns the panel directly under the active item with
 * content-driven width instead of spanning the whole nav.
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
 * `HorizontalNav.Group` without a `title` — the heading is omitted entirely.
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
            <HorizontalNav ariaLabel={`Horizontal nav — ${state}`} mobileBreakpoint="xs">
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
    noHeader: true,
    layout: 'padded',
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
    noHeader: true,
    layout: 'padded',
    pseudo: {
      hover: `.${subItemStateClass('Hover')}`,
      active: `.${subItemStateClass('Active')}`,
      focusVisible: `.${subItemStateClass('Focus')}`,
    },
  },
};

export const GroupVariants: StoryObj = {
  parameters: { noHeader: true, layout: 'padded' },
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
 * Forces mobile mode (`mobileBreakpoint="xxl"`) so the drawer + header toggle
 * interaction is visible on a desktop canvas without resizing.
 */
export const ControlledMobile: Story = {
  parameters: { noHeader: true },
  render: function ControlledMobile() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header toggle={<SideNav.Toggle menuOpen={open} toggleMenu={setOpen} showLabel label="Menüü" />}>
          <Header.Logo logo={headerLogo} href="#" />
          <Header.Center>{null}</Header.Center>
          <Header.Actions>
            <Header.Language languages={headerLanguages} currentLanguage="EST" />
          </Header.Actions>
        </Header>
        <HorizontalNav ariaLabel="Primary navigation" mobileBreakpoint="xxl" isMobileOpen={open} onMenuToggle={setOpen}>
          <HorizontalNav.Item href="#" isActive>
            Avaleht
          </HorizontalNav.Item>
          <HorizontalNav.Item href="#">Perekond</HorizontalNav.Item>
          <HorizontalNav.Item href="#">Hüvitised</HorizontalNav.Item>
        </HorizontalNav>
      </div>
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
 * Wrap the nav in a `position: sticky; top: 0` container to pin it.
 *
 * **Note:** below `mobileBreakpoint` the bar collapses into the mobile drawer,
 * so the sticky demo isn't meaningful on a mobile viewport — preview this on
 * desktop.
 */
export const Sticky: StoryObj = {
  parameters: { noHeader: true },
  render: () => (
    <div style={{ height: '600px', overflowY: 'auto', border: '1px dashed var(--general-border-primary)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>{stickyDemoNav}</div>
      <div style={{ padding: '1.5rem' }}>{stickyDemoFiller}</div>
    </div>
  ),
};

/**
 * Pin via `Affix` once the nav reaches the top of the viewport.
 *
 * **Note:** below `mobileBreakpoint` the bar collapses into the mobile drawer,
 * so the sticky demo isn't meaningful on a mobile viewport — preview this on
 * desktop.
 */
export const StickyOnScroll: StoryObj = {
  parameters: { noHeader: true },
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
