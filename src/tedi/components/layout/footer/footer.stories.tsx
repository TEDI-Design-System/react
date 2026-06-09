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
}: {
  storyId: string;
  label?: string;
  width: number;
  theme: string;
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(320);

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

  return (
    <div style={{ flex: '0 0 auto' }}>
      {label && (
        <Text element="h5" color="secondary">
          {label}
        </Text>
      )}
      <div
        style={{
          width,
          overflow: 'hidden',
        }}
      >
        <iframe
          ref={ref}
          title={label}
          src={`iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`}
          style={{ display: 'block', width: '100%', height, border: 0, marginTop: '1rem' }}
        />
      </div>
    </div>
  );
};

const DEVICE_FRAME_SOURCE_ID = 'tedi-ready-layout-footer--device-frame-source';
const DEVICE_FRAME_SOURCE_ACCORDIONS_ID = 'tedi-ready-layout-footer--device-frame-source-accordions';
const DEVICE_FRAME_SOURCE_ACCORDIONS_OPEN_ID = 'tedi-ready-layout-footer--device-frame-source-accordions-open';

export const Default: Story = {
  render: () => (
    <Footer>
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
        {/* `minWidth: 0` lets the fixed-width device frames overflow into their own scroll
            containers instead of stretching the page when the canvas is narrower than the frame. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          <Text element="h4" color="primary">
            Desktop
          </Text>
          <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <DeviceFrame storyId={DEVICE_FRAME_SOURCE_ID} width={1138} theme={theme} />
          </div>
          <Text element="h4" color="primary">
            Tablet
          </Text>
          <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <DeviceFrame storyId={DEVICE_FRAME_SOURCE_ID} width={871} theme={theme} />
          </div>
          <Text element="h4" color="primary">
            Mobile
          </Text>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', maxWidth: '100%', overflowX: 'auto' }}>
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
  <Footer>
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

export const LogoPosition: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <Footer>
        <Footer.Body>
          <StandardSections />
        </Footer.Body>
        <Footer.Side placement="end">
          <LogoPlaceholder />
        </Footer.Side>
      </Footer>

      <Footer>
        <Footer.Body>
          <StandardSections />
        </Footer.Body>
        <Footer.Side placement="end" position="start">
          <LogoPlaceholder />
        </Footer.Side>
      </Footer>

      <Footer>
        <Footer.Side placement="start">
          <LogoPlaceholder />
        </Footer.Side>
        <Footer.Body>
          <StandardSections />
        </Footer.Body>
      </Footer>

      <Footer>
        <Footer.Side placement="start" position="start">
          <LogoPlaceholder />
        </Footer.Side>
        <Footer.Body>
          <StandardSections />
        </Footer.Body>
      </Footer>
    </VerticalSpacing>
  ),
};

export const WithBottomSection: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <Footer>
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
      <Footer>
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

      <Footer>
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
              <img src="custom_fb_logo.png" alt="" style={{ display: 'block', height: '40px' }} />
            </Link>
            <Link href="#" color="inverted" aria-label="Instagram">
              <img src="custom_instagram_logo.png" alt="" style={{ display: 'block', height: '40px' }} />
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
