import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import Link from '../../navigation/link/link';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { SideNav } from '../sidenav/sidenav';

/**
 * The standard application shell: header across the top, a full-height row holding the
 * SideNav column and the scrollable `<main>`, and a footer at the bottom.
 *
 * There is no `Layout` component — SideNav is deliberately decoupled and does not
 * position itself, so the shell below is the reference implementation.
 *
 * <a href="https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-sidenav--docs" target="_BLANK">SideNav ↗</a><br/>
 * <a href="https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-header--docs" target="_BLANK">Header ↗</a><br/>
 * <a href="https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-footer--docs" target="_BLANK">Footer ↗</a>
 */
const meta: Meta = {
  title: 'TEDI-Ready/Layout/Application shell',
  parameters: {
    a11y: {
      // TODO: [Application shell]: Review storybook a11y violations #818
      test: 'todo',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Rules that make the shell work — all three are load-bearing and none of them error when broken:',
          '',
          '- The outer wrapper is `display: flex; flex-direction: column; min-height: 100vh`.',
          '- The middle row is `display: flex; flex: 1; align-items: stretch` (stretch is the default — do not override it).',
          '- `SideNav` is `height: 100%`, so **its parent decides its height**. Any padding, `align-self: flex-start`, or `position: sticky` on the SideNav column produces white gaps above and below the nav.',
          '',
          'The nav column must not have a hardcoded width either: SideNav is `240px` on desktop (`--navigation-vertical-item-width-default`), widening to `400px` below `62rem` and `320px` below `48rem`. Let the column size to the nav.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { children: 'Töölaud', href: '#', icon: 'dashboard', isActive: true },
  { children: 'Juhtumid', href: '#', icon: 'folder' },
  { children: 'Aruanded', href: '#', icon: 'bar_chart' },
  { children: 'Seaded', href: '#', icon: 'settings' },
];

const languages = [
  { label: 'Eesti keel', locale: 'et' as const, isSelected: true, href: '#' },
  { label: 'English', locale: 'en' as const, href: '#' },
];

const MainContent = () => (
  <>
    <Heading element="h1">Töölaud</Heading>
    <Text color="secondary">
      Scroll this area — the header, the side navigation and the footer stay put, because only <code>&lt;main&gt;</code>{' '}
      owns the scroll.
    </Text>
    {Array.from({ length: 12 }).map((_, i) => (
      <Text key={i} element="p">
        Sisurida {i + 1}. Pellentesque mattis augue at mi tristique dignissim. Aliquam lobortis hendrerit augue, sit
        amet pellentesque nibh ultricies eu.
      </Text>
    ))}
  </>
);

const ShellFooter = () => (
  <Footer>
    <Footer.Body columns={2}>
      <Footer.Section icon="info" heading="Uuri lähemalt">
        <Link href="#" color="inverted">
          Meist
        </Link>
        <Link href="#" color="inverted">
          Uudised
        </Link>
      </Footer.Section>
      <Footer.Section icon="call" heading="Kontakt">
        <Text color="white">info@tehik.ee</Text>
      </Footer.Section>
    </Footer.Body>
    <Footer.Bottom>
      <Text color="white">© 2026 TEHIK</Text>
    </Footer.Bottom>
  </Footer>
);

/**
 * A shell wrapper that takes the SideNav column's style as a prop, so the broken
 * variants below differ from the correct one by exactly one declaration.
 */
const Shell = ({ navColumnStyle }: { navColumnStyle?: React.CSSProperties }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header toggle={<SideNav.Toggle menuOpen={navOpen} toggleMenu={() => setNavOpen(!navOpen)} />}>
        <Header.Logo logo={<Text modifiers="bold">Terviseportaal</Text>} />
        <Header.Actions>
          <Header.Language languages={languages} />
          <Header.Profile>
            <Text modifiers="bold">Mari Maasikas</Text>
            <Text color="secondary" modifiers="small">
              48001010000
            </Text>
            <Header.Logout href="#" />
          </Header.Profile>
        </Header.Actions>
      </Header>

      {/* The row: stretches between header and footer */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        {/* The SideNav column: no padding, no align-self, no sticky */}
        <div style={{ display: 'flex', ...navColumnStyle }}>
          <SideNav ariaLabel="Peamenüü" navItems={navItems} mobileBreakpoint="mobile" isMobileOpen={navOpen} />
        </div>

        {/* Main owns its own scrolling and padding; min-width:0 keeps wide content in check */}
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '1.5rem' }}>
          <MainContent />
        </main>
      </div>

      <ShellFooter />
    </div>
  );
};

/**
 * The correct shell. The side navigation runs the full height between the header and the
 * footer with no gaps, and only the main area scrolls.
 */
export const Default: Story = {
  render: () => <Shell />,
};

/**
 * **Broken — padded column.** Padding on the SideNav wrapper shows the page background as
 * a strip around the nav, so it no longer meets the header or the footer.
 */
export const BrokenPaddedColumn: Story = {
  name: 'Broken — padded column',
  render: () => <Shell navColumnStyle={{ padding: '1rem' }} />,
};

/**
 * **Broken — content-height column.** `align-self: flex-start` stops the column at its
 * content height, leaving a white gap from the end of the nav items down to the footer.
 */
export const BrokenContentHeightColumn: Story = {
  name: 'Broken — content-height column',
  render: () => <Shell navColumnStyle={{ alignSelf: 'flex-start' }} />,
};

/**
 * **Broken — sticky column.** A sticky wrapper detaches the nav from the row, so it
 * scrolls independently and leaves a gap at the bottom.
 */
export const BrokenStickyColumn: Story = {
  name: 'Broken — sticky column',
  render: () => <Shell navColumnStyle={{ position: 'sticky', top: 0, alignSelf: 'flex-start' }} />,
};
