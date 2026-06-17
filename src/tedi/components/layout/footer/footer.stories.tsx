import type { Meta, StoryObj } from '@storybook/react';
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
              <img src="custom_fb_logo.png" alt="" style={{ display: 'block', height: '25px' }} />
            </Link>
            <Link href="#" color="inverted" aria-label="Instagram">
              <img src="custom_instagram_logo.png" alt="" style={{ display: 'block', height: '25px' }} />
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
              src="placeholder_image.png"
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
