import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import Link from '../../navigation/link/link';
import { VerticalSpacing } from '../vertical-spacing';
import { Footer } from './footer';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=6541-67240&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/24148f-footer" target="_BLANK">Zeroheight ↗</a>
 */
const meta: Meta<typeof Footer> = {
  component: Footer,
  subcomponents: {
    'Footer.Side': Footer.Side,
    'Footer.Body': Footer.Body,
    'Footer.Section': Footer.Section,
    'Footer.Bottom': Footer.Bottom,
  } as never,
  title: 'TEDI-Ready/Layout/Footer',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=6541-67240&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const LogoPlaceholder = ({ width = 88, height = 40 }: { width?: number; height?: number }) => (
  <div
    style={{
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--general-surface-primary)',
      color: 'var(--general-text-primary)',
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    Logo
  </div>
);

const SectionLinks = ({ count = 4 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <Link key={i} href="#" color="inverted">
        Link
      </Link>
    ))}
  </>
);

const Caption = ({ children }: { children: React.ReactNode }) => (
  <Text element="h3" modifiers="h5" color="primary">
    {children}
  </Text>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <Text element="p" modifiers="small" color="secondary">
    {children}
  </Text>
);

export const Default: Story = {
  render: () => (
    <Footer>
      <Footer.Body>
        <Footer.Section icon="info" heading="Heading">
          <SectionLinks />
        </Footer.Section>
        <Footer.Section icon="help" heading="Heading">
          <SectionLinks />
        </Footer.Section>
        <Footer.Section icon="support" heading="Heading">
          <SectionLinks />
        </Footer.Section>
      </Footer.Body>
      <Footer.Side placement="end">
        <LogoPlaceholder />
      </Footer.Side>
    </Footer>
  ),
};

export const DeviceSize: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <div style={{ padding: '16px' }}>
        <Caption>Desktop / Tablet / Mobile (default)</Caption>
        <Note>
          Same footer at any viewport — resize to see the layout adapt. Icons auto-hide below `lg`; sections stack below
          `sm`.
        </Note>
      </div>
      <Footer>
        <Footer.Body>
          <Footer.Section icon="info" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="help" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="support" heading="Heading">
            <SectionLinks />
          </Footer.Section>
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
      </Footer>

      <div style={{ padding: '0 16px' }}>
        <Caption>Mobile — Compact view, accordions</Caption>
        <Note>
          `collapsible` sections become accordions below `sm`. On wider viewports the prop is a no-op so this looks
          identical to the default footer.
        </Note>
      </div>
      <Footer>
        <Footer.Body>
          <Footer.Section icon="info" heading="Heading" collapsible>
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="help" heading="Heading" collapsible>
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="support" heading="Heading" collapsible>
            <SectionLinks />
          </Footer.Section>
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
      </Footer>

      <div style={{ padding: '0 16px' }}>
        <Caption>Mobile — Compact view, accordions (open)</Caption>
        <Note>First accordion section pre-opened via `defaultOpen`.</Note>
      </div>
      <Footer>
        <Footer.Body>
          <Footer.Section icon="info" heading="Heading" collapsible defaultOpen>
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="help" heading="Heading" collapsible>
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="support" heading="Heading" collapsible>
            <SectionLinks />
          </Footer.Section>
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
      </Footer>
    </VerticalSpacing>
  ),
};

export const LogoPosition: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <div style={{ padding: '16px' }}>
        <Caption>Right — centered (default)</Caption>
        <Note>`Footer.Side placement=&quot;end&quot;` with default `position=&quot;center&quot;`.</Note>
      </div>
      <Footer>
        <Footer.Body>
          <Footer.Section icon="info" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="help" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="support" heading="Heading">
            <SectionLinks />
          </Footer.Section>
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
      </Footer>

      <div style={{ padding: '0 16px' }}>
        <Caption>Right — top edge</Caption>
        <Note>
          `Footer.Side placement=&quot;end&quot; position=&quot;start&quot;` pins the logo to the top of the footer.
        </Note>
      </div>
      <Footer>
        <Footer.Body>
          <Footer.Section icon="info" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="help" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="support" heading="Heading">
            <SectionLinks />
          </Footer.Section>
        </Footer.Body>
        <Footer.Side placement="end" position="start">
          <LogoPlaceholder />
        </Footer.Side>
      </Footer>

      <div style={{ padding: '0 16px' }}>
        <Caption>Left — centered (default)</Caption>
        <Note>`Footer.Side placement=&quot;start&quot;` with default `position=&quot;center&quot;`.</Note>
      </div>
      <Footer>
        <Footer.Side placement="start">
          <LogoPlaceholder />
        </Footer.Side>
        <Footer.Body>
          <Footer.Section icon="info" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="help" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="support" heading="Heading">
            <SectionLinks />
          </Footer.Section>
        </Footer.Body>
      </Footer>

      <div style={{ padding: '0 16px' }}>
        <Caption>Left — top edge</Caption>
        <Note>
          `Footer.Side placement=&quot;start&quot; position=&quot;start&quot;` pins the logo to the top of the footer.
        </Note>
      </div>
      <Footer>
        <Footer.Side placement="start" position="start">
          <LogoPlaceholder />
        </Footer.Side>
        <Footer.Body>
          <Footer.Section icon="info" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="help" heading="Heading">
            <SectionLinks />
          </Footer.Section>
          <Footer.Section icon="support" heading="Heading">
            <SectionLinks />
          </Footer.Section>
        </Footer.Body>
      </Footer>
    </VerticalSpacing>
  ),
};

/**
 * Optional strip rendered below the main row, intended for legal / utility links.
 * Items are spaced via flex `gap`; on narrow viewports they wrap to multiple lines.
 */
export const WithBottomSection: Story = {
  render: () => (
    <Footer>
      <Footer.Body>
        <Footer.Section icon="info" heading="Heading">
          <SectionLinks />
        </Footer.Section>
        <Footer.Section icon="help" heading="Heading">
          <SectionLinks />
        </Footer.Section>
        <Footer.Section icon="support" heading="Heading">
          <SectionLinks />
        </Footer.Section>
      </Footer.Body>
      <Footer.Side placement="end">
        <LogoPlaceholder />
      </Footer.Side>
      <Footer.Bottom>
        <Link href="#" color="inverted">
          Link
        </Link>
        <Link href="#" color="inverted">
          Link
        </Link>
        <Link href="#" color="inverted">
          Link
        </Link>
        <Link href="#" color="inverted">
          Link
        </Link>
        <Link href="#" color="inverted">
          Link
        </Link>
      </Footer.Bottom>
    </Footer>
  ),
};
