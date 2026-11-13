import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { LabelProvider } from '../../../providers/label-provider';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Card } from '../../content/card';
import Separator from '../../misc/separator/separator';
import Breadcrumbs from '../../navigation/breadcrumbs/breadcrumbs';
import Link from '../../navigation/link/link';
import { Header } from '../header';
import { ShowAt } from '../show-at/show-at';
import { SideNav } from '../sidenav';
import { VerticalSpacing } from '../vertical-spacing';
import { SkipLinks } from './skip-links';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Ready-2.109.105?node-id=65487-242481&m=dev" target="_blank">Figma ↗</a><br/>
 * Links that let keyboard users bypass repeated content such as the header and navigation (WCAG 2.4.1 Bypass Blocks).
 * The links are hidden until one of them receives focus, then appear as a strip over the top of the page.
 *
 * Render `SkipLinks` as the first element on the page, before `Header`, and make sure every `href` points to an
 * element `id` that exists on the page.
 */
const meta: Meta<typeof SkipLinks> = {
  component: SkipLinks,
  title: 'TEDI-Ready/Layout/SkipLinks',
  argTypes: {
    links: {
      description:
        'Links to landmarks on the page; each `href` points to an element `id`. Without it, one link to `#main-content` is rendered.',
      control: 'object',
      table: {
        type: { summary: 'SkipLink[]' },
      },
    },
    className: {
      description: 'Additional class name.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Ready-2.109.105?node-id=65487-242481&m=dev',
    },
    layout: 'fullscreen',
    docs: { story: { height: '300px' } },
  },
  decorators: [
    (Story) => (
      <LabelProvider locale="et">
        <Story />
      </LabelProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SkipLinks>;

// Ids are unique per story, as the docs page renders every story in one document. The skip links sit
// inside the padded wrapper, so a click anywhere in it starts Tab before them.
export const Default: Story = {
  render: (args) => (
    <div style={{ padding: 'var(--layout-grid-gutters-16)' }}>
      <SkipLinks {...args} />
      <Text>Click the empty area at the bottom, press Tab, choose a skip link, then press Tab again.</Text>
      <main id="main-content">
        <Text>Main content</Text>
        <Link href="#">Link in main content</Link>
      </main>
      <footer id="footer">
        <Text>Footer</Text>
        <Link href="#">Link in footer</Link>
      </footer>
    </div>
  ),
};

export const MultipleLinks: Story = {
  render: (args) => (
    <div style={{ padding: 'var(--layout-grid-gutters-16)' }}>
      <SkipLinks {...args} />
      <Text>Click the empty area at the bottom, press Tab, choose a skip link, then press Tab again.</Text>
      <main id="multiple-links-main">
        <Text>Main content</Text>
        <Link href="#">Link in main content</Link>
      </main>
      <footer id="multiple-links-footer">
        <Text>Footer</Text>
        <Link href="#">Link in footer</Link>
      </footer>
    </div>
  ),
  args: {
    links: [
      { href: '#multiple-links-main', children: 'Liigu edasi põhisisu juurde' },
      { href: '#multiple-links-footer', children: 'Liigu edasi jaluse juurde' },
    ],
  },
};

export const UsageExample: Story = {
  render: function UsageExampleRender() {
    const [isOpen, setIsOpen] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobile = isBreakpointBelow(breakpoint, 'lg');

    const navItems = [
      { children: 'Minu töölaud', icon: 'dashboard', href: '#' },
      { children: 'Vastuvõtud ja saatekirjad', icon: 'calendar_today', href: '#' },
      { children: 'Retseptid ja meditsiiniseadmed', icon: 'medication', href: '#' },
      {
        children: 'Minu tervise ajalugu',
        icon: 'history',
        isDefaultOpen: true,
        subItems: [
          { children: 'Eelmised retseptid', href: '#' },
          { children: 'Haiguslugu', href: '#' },
        ],
      },
      { children: 'Hammaste tervis', icon: 'dentistry', href: '#' },
      { children: 'Vaktsineerimine', icon: 'vaccines', href: '#' },
      { children: 'Tervisetõendid ja -⁠deklaratsioonid', icon: 'assignment', href: '#' },
      { children: 'Töövõime', icon: 'business_center', href: '#' },
      { children: 'Raviarved', icon: 'credit_card', href: '#' },
      { children: 'Minu seaded', icon: 'settings', href: '#' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', ...((!isMobile || isOpen) && { height: '100vh' }) }}>
        <SkipLinks links={[{ href: '#usage-example-main', children: 'Liigu edasi põhisisu juurde' }]} />
        <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
          <Header.Logo
            logo={<img src="header-logo.svg" alt="Logo" />}
            logoDark={<img src="header-logo-white.svg" alt="Logo" />}
          />
          <Header.Actions>
            <ShowAt lg>
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Isikukood:
                  </Text>
                }
                representatives={[
                  { id: '1', name: 'Mari Maasikas', description: '49504080934', icon: { name: 'person' } },
                ]}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language
              languages={[
                { 'aria-label': 'Eesti keel', label: 'EST', locale: 'et' },
                { 'aria-label': 'English', label: 'ENG', locale: 'en' },
                { 'aria-label': 'Русский', label: 'RUS', locale: 'ru' },
              ]}
            />
            <Separator axis="vertical" />
            <Header.Profile>
              <Link underline={false} href="#">
                Minu andmed
              </Link>
              <Header.Logout size="default" href="#" />
            </Header.Profile>
          </Header.Actions>
        </Header>
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <SideNav ariaLabel="Peamenüü" linkAs="a" isMobileOpen={isOpen} navItems={navItems} />
          <main
            id="usage-example-main"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              padding: 'var(--layout-grid-gutters-24) var(--layout-grid-gutters-32)',
              backgroundColor: 'var(--general-surface-tertiary)',
            }}
          >
            <VerticalSpacing size={1} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Breadcrumbs>
                <Link href="#">Link</Link>
                <Link href="#">Link</Link>
                <span aria-current="page">Aktiivne link</span>
              </Breadcrumbs>
              <Heading>Pealkiri</Heading>
              <Text>Kirjeldus</Text>
              <div style={{ flex: 1, display: 'grid', gridTemplateRows: '1fr' }}>
                <Card>
                  <Card.Content>
                    <Text>
                      On a real page, the first Tab after load shows the skip link. Here, open the story in isolation
                      mode and press Tab, or click an empty part of the header and press Shift+Tab.
                    </Text>
                  </Card.Content>
                </Card>
              </div>
            </VerticalSpacing>
          </main>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      story: { height: '800px' },
      source: { type: 'code' },
    },
  },
};
