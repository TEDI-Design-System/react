import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import Link from '../../navigation/link/link';
import { StatusBadge } from '../../tags/status-badge/status-badge';
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
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const LogoPlaceholder = () => {
  const isMobile = isBreakpointBelow(useBreakpoint(), 'md');
  return (
    <img
      src={isMobile ? 'sf_logod.jpg' : 'sf_logod_vertikaalne.jpg'}
      alt="EU structural funds logo"
      style={isMobile ? { width: '9rem', height: '5.25rem' } : { width: '3.75rem', height: '7rem' }}
    />
  );
};

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true" style={{ display: 'block' }}>
    <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true" style={{ display: 'block' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const ContactLinks = () => (
  <>
    <Link href="#" color="inverted">
      +372 555 5555
    </Link>
    <Link href="#" color="inverted">
      tedi@tehik.ee
    </Link>
    <Link href="#" color="inverted">
      Pärnu mnt. 132, 11317 Tallinn
    </Link>
  </>
);

const StandardSections = ({
  collapsible = false,
  firstOpen = false,
}: {
  collapsible?: boolean;
  firstOpen?: boolean;
}) => (
  <>
    <Footer.Section icon="info" heading="Uuri lähemalt" collapsible={collapsible} defaultOpen={firstOpen}>
      <Link href="#" color="inverted">
        Privaatsuspoliitika
      </Link>
      <Link href="#" color="inverted">
        Küpsised
      </Link>
      <Link href="#" color="inverted">
        Korduma kippuvad küsimused
      </Link>
      <Link href="#" color="inverted">
        Karjäärivõimalused
      </Link>
    </Footer.Section>
    <Footer.Section icon="share" heading="Sotsiaalmeedia ja uuendused" collapsible={collapsible}>
      <Link href="#" color="inverted">
        Uudiskirja tellimine
      </Link>
      <Link href="#" color="inverted">
        Jälgi meid Twitteris
      </Link>
      <Link href="#" color="inverted">
        Jälgi meid Facebookis
      </Link>
      <Link href="#" color="inverted">
        Liitu meie kogukonnaga
      </Link>
    </Footer.Section>
    <Footer.Section icon="call" heading="Kontakt" collapsible={collapsible}>
      <ContactLinks />
    </Footer.Section>
  </>
);

const DeviceFrame = ({
  storyId,
  label,
  width,
  theme,
  fluid = false,
}: {
  storyId: string;
  label?: string;
  width: number;
  theme: string;
  fluid?: boolean;
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(320);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    let observer: ResizeObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const getFooter = () => iframe.contentDocument?.querySelector<HTMLElement>('[data-name="footer"]') ?? null;
    const measure = (footer: HTMLElement) => setHeight(footer.offsetHeight);

    let attempts = 0;
    const poll = () => {
      const footer = getFooter();
      if (footer) {
        const body = iframe.contentDocument?.body;
        if (body) body.style.margin = '0';
        measure(footer);
        observer = new ResizeObserver(() => measure(footer));
        observer.observe(footer);
      } else if (attempts++ < 100) {
        timer = setTimeout(poll, 50);
      }
    };
    poll();

    return () => {
      if (timer) clearTimeout(timer);
      observer?.disconnect();
    };
  }, [storyId, theme]);

  useEffect(() => {
    if (fluid) return undefined;
    const el = outerRef.current;
    if (!el) return undefined;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width, fluid]);

  if (fluid) {
    return (
      <div ref={outerRef} style={{ width: '100%', maxWidth: width }}>
        {label && (
          <Text element="h5" color="secondary">
            {label}
          </Text>
        )}
        <iframe
          ref={ref}
          title={label}
          scrolling="no"
          src={`iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`}
          style={{ display: 'block', width: '100%', height, border: 0, marginTop: '1rem' }}
        />
      </div>
    );
  }

  return (
    <div ref={outerRef} style={{ width, maxWidth: '100%', flexShrink: 0 }}>
      {label && (
        <Text element="h5" color="secondary">
          {label}
        </Text>
      )}
      <div style={{ height: height * scale, overflow: 'hidden', marginTop: '1rem' }}>
        <div style={{ width, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <iframe
            ref={ref}
            title={label}
            scrolling="no"
            src={`iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`}
            style={{ display: 'block', width: '100%', height, border: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

const DEVICE_FRAME_SOURCE_ID = 'tedi-ready-layout-footer--device-frame-source';
const DEVICE_FRAME_SOURCE_ACCORDIONS_ID = 'tedi-ready-layout-footer--device-frame-source-accordions';
const DEVICE_FRAME_SOURCE_ACCORDIONS_OPEN_ID = 'tedi-ready-layout-footer--device-frame-source-accordions-open';
const LOGO_BREAKPOINT_SOURCE_ID = 'tedi-ready-layout-footer--logo-breakpoint-source';

export const Default: Story = {
  render: () => (
    <Footer mobileBreakpoint="lg">
      <Footer.Body>
        <StandardSections />
      </Footer.Body>
      <Footer.Side placement="end">
        <LogoPlaceholder />
      </Footer.Side>
    </Footer>
  ),
};

export const DeviceSize: Story = {
  render: (_args, context) => {
    const theme = (context.globals.theme as string) ?? 'default';
    return (
      <VerticalSpacing size={1}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          <Text element="h4" color="primary">
            Desktop
          </Text>
          <DeviceFrame storyId={DEVICE_FRAME_SOURCE_ID} width={1138} theme={theme} fluid />
          <Text element="h4" color="primary">
            Tablet
          </Text>
          <DeviceFrame storyId={DEVICE_FRAME_SOURCE_ID} width={871} theme={theme} fluid />
          <Text element="h4" color="primary">
            Mobile
          </Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-start' }}>
            <DeviceFrame storyId={DEVICE_FRAME_SOURCE_ID} label="Default" width={360} theme={theme} />
            <DeviceFrame
              storyId={DEVICE_FRAME_SOURCE_ACCORDIONS_ID}
              label="Compact view, accordions"
              width={360}
              theme={theme}
            />
            <DeviceFrame
              storyId={DEVICE_FRAME_SOURCE_ACCORDIONS_OPEN_ID}
              label="Compact view, accordions (open)"
              width={360}
              theme={theme}
            />
          </div>
        </div>
      </VerticalSpacing>
    );
  },
};

const DeviceFrameFooter = ({ collapsible, firstOpen }: { collapsible?: boolean; firstOpen?: boolean }) => (
  <Footer mobileBreakpoint="md">
    <Footer.Body>
      <StandardSections collapsible={collapsible} firstOpen={firstOpen} />
    </Footer.Body>
    <Footer.Side placement="end">
      <LogoPlaceholder />
    </Footer.Side>
  </Footer>
);

const deviceFrameSourceParams = { docs: { disable: true }, layout: 'fullscreen' as const };

export const DeviceFrameSource: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: deviceFrameSourceParams,
  render: () => <DeviceFrameFooter />,
};

export const DeviceFrameSourceAccordions: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: deviceFrameSourceParams,
  render: () => <DeviceFrameFooter collapsible />,
};

export const DeviceFrameSourceAccordionsOpen: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: deviceFrameSourceParams,
  render: () => <DeviceFrameFooter collapsible firstOpen />,
};

export const LogoBreakpointSource: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: deviceFrameSourceParams,
  render: () => (
    <Footer mobileBreakpoint="lg">
      <Footer.Side placement="end" lg={{ placement: 'start' }}>
        <LogoPlaceholder />
      </Footer.Side>
      <Footer.Body>
        <StandardSections />
      </Footer.Body>
    </Footer>
  ),
};

/**
 * The logo always drops to the **bottom of the footer from tablet down** and only sits on the
 * side on desktop. Two props make that work together:
 * - `mobileBreakpoint="lg"` collapses the footer to its stacked layout at `md` and below
 *   (tablet + mobile), so the side slot lands below the sections.
 * - `placement="end"` keeps the logo last (the bottom slot) while stacked; a `lg` breakpoint
 *   override flips it to its desktop side — `lg={{ placement: 'start' }}` for a left logo, or no
 *   override at all to keep it on the right.
 *
 * `position` sets the vertical alignment within the side slot on desktop. Both `placement` and
 * `position` accept breakpoint props. The first example is shown in a resizable frame so you can
 * watch the logo move; the rest reflow with the window.
 */
export const LogoPosition: Story = {
  render: (_args, context) => {
    const theme = (context.globals.theme as string) ?? 'default';
    const Example = ({ label, children }: { label: string; children: React.ReactNode }) => (
      <VerticalSpacing size={0.5}>
        <Text element="h5" color="secondary">
          {label}
        </Text>
        {children}
      </VerticalSpacing>
    );

    return (
      <VerticalSpacing size={2}>
        <Example label="Responsive (breakpoint props) — logo on the left on desktop, drops to the bottom from tablet down. Resize to see.">
          <DeviceFrame storyId={LOGO_BREAKPOINT_SOURCE_ID} width={1138} theme={theme} fluid />
        </Example>

        <Example label="Right on desktop · bottom on tablet and mobile (placement=end, mobileBreakpoint=lg)">
          <Footer mobileBreakpoint="lg">
            <Footer.Body>
              <StandardSections />
            </Footer.Body>
            <Footer.Side placement="end">
              <LogoPlaceholder />
            </Footer.Side>
          </Footer>
        </Example>

        <Example label="Right, top-aligned on desktop · bottom on tablet and mobile (placement=end, position=start)">
          <Footer mobileBreakpoint="lg">
            <Footer.Body>
              <StandardSections />
            </Footer.Body>
            <Footer.Side placement="end" position="start">
              <LogoPlaceholder />
            </Footer.Side>
          </Footer>
        </Example>

        <Example label="Left on desktop · bottom on tablet and mobile (placement=end, lg={ placement: start })">
          <Footer mobileBreakpoint="lg">
            <Footer.Side placement="end" lg={{ placement: 'start' }}>
              <LogoPlaceholder />
            </Footer.Side>
            <Footer.Body>
              <StandardSections />
            </Footer.Body>
          </Footer>
        </Example>

        <Example label="Left, top-aligned on desktop · bottom on tablet and mobile (placement=end, position=start, lg={ placement: start })">
          <Footer mobileBreakpoint="lg">
            <Footer.Side placement="end" position="start" lg={{ placement: 'start' }}>
              <LogoPlaceholder />
            </Footer.Side>
            <Footer.Body>
              <StandardSections />
            </Footer.Body>
          </Footer>
        </Example>
      </VerticalSpacing>
    );
  },
};

export const WithBottomSection: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <Footer mobileBreakpoint="lg">
        <Footer.Body>
          <StandardSections />
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
        <Footer.Bottom>
          <Link href="#" color="inverted">
            Facebook
          </Link>
          <Link href="#" color="inverted">
            Instagram
          </Link>
          <Link href="#" color="inverted">
            LinkedIn
          </Link>
        </Footer.Bottom>
      </Footer>
      <Footer mobileBreakpoint="lg">
        <Footer.Body>
          <StandardSections />
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
        <Footer.Bottom separator>
          <Link href="#" color="inverted">
            Facebook
          </Link>
          <Link href="#" color="inverted">
            Instagram
          </Link>
          <Link href="#" color="inverted">
            LinkedIn
          </Link>
        </Footer.Bottom>
      </Footer>

      <Footer mobileBreakpoint="lg">
        <Footer.Body>
          <StandardSections />
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
        <Footer.Bottom>
          <StatusBadge color="success" variant="filled-bordered">
            TEDI poolt heaks kiidetud
          </StatusBadge>
        </Footer.Bottom>
      </Footer>
    </VerticalSpacing>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <Footer>
        <Footer.Body>
          <Footer.Section icon="call" heading="Kontakt">
            <ContactLinks />
          </Footer.Section>
          <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'center' }}>
            <Link href="#" color="inverted" aria-label="Facebook">
              <FacebookIcon />
            </Link>
            <Link href="#" color="inverted" aria-label="Instagram">
              <InstagramIcon />
            </Link>
          </div>
        </Footer.Body>
      </Footer>

      <Footer>
        <Footer.Body>
          <Footer.Section heading="Uuri lähemalt">
            <Link href="#" color="inverted">
              Privaatsuspoliitika
            </Link>
            <Link href="#" color="inverted">
              Küpsised
            </Link>
            <Link href="#" color="inverted">
              Korduma kippuvad küsimused
            </Link>
          </Footer.Section>
          <Footer.Section heading="Sotsiaalmeedia">
            <Link href="#" color="inverted">
              Jälgi meid Twitteris
            </Link>
            <Link href="#" color="inverted">
              Jälgi meid Facebookis
            </Link>
            <Link href="#" color="inverted">
              Liitu meie kogukonnaga
            </Link>
          </Footer.Section>
          <Footer.Section heading="Uudised">
            <Link href="#" color="inverted">
              Uudiskirja tellimine
            </Link>
          </Footer.Section>
          <Footer.Section icon="call" heading="Kontakt">
            <ContactLinks />
          </Footer.Section>
        </Footer.Body>
        <Footer.Bottom>
          <img src="TEHIK_logo.svg" alt="TEHIK" style={{ height: '2.5rem' }} />
        </Footer.Bottom>
      </Footer>

      <Footer>
        <Footer.Body>
          <div style={{ alignSelf: 'center' }}>
            <Footer.Section heading="Osale meie terviseuuringus">
              <Text element="p" modifiers="small" color="white">
                Liitu meie uuringuga ja avasta uut enda tervise kohta!
              </Text>
            </Footer.Section>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <img
              src="https://picsum.photos/seed/tedi-footer/128"
              alt=""
              style={{ flexShrink: 0, width: '4rem', height: '4rem', borderRadius: '50%', objectFit: 'cover' }}
            />
            <Footer.Section heading="Kontakt">
              <ContactLinks />
            </Footer.Section>
          </div>
        </Footer.Body>
      </Footer>
    </VerticalSpacing>
  ),
};

/**
 * On wide viewports the footer content can grow uncomfortably far apart. `maxWidth` caps the inner
 * content (the column row **and** the bottom strip) to a fixed width and centers it, while the dark
 * backgrounds stay full-bleed. `Footer.Body`'s `columns` lays the sections out as a fixed grid of
 * equal-width tracks instead of the default content-sized `space-between` row — and it accepts
 * per-breakpoint overrides. The keys are **mobile-first** (a value applies at that breakpoint and
 * up), so raise the count as the viewport widens — `columns={2} lg={{ columns: 4 }}` shows 2 columns
 * from `sm`, then 4 from `lg`. Below the footer's `mobileBreakpoint` the body always stacks into a
 * single column regardless of `columns`.
 */
export const MaxWidthAndColumns: Story = {
  render: () => (
    <Footer maxWidth={1280}>
      <Footer.Body columns={2} lg={{ columns: 4 }}>
        <StandardSections />
        <Footer.Section icon="local_library" heading="Uudised">
          <Link href="#" color="inverted">
            Pressiteated
          </Link>
          <Link href="#" color="inverted">
            Blogi
          </Link>
        </Footer.Section>
      </Footer.Body>
      <Footer.Bottom separator>
        <Link href="#" color="inverted">
          Privaatsuspoliitika
        </Link>
        <Link href="#" color="inverted">
          Küpsised
        </Link>
        <Link href="#" color="inverted">
          Ligipääsetavus
        </Link>
      </Footer.Bottom>
    </Footer>
  ),
};
