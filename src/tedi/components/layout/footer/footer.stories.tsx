import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';

import {
  getPrimaryComponentProps,
  getSubcomponentProps,
  subcomponentArgTypes,
} from '../../../../../.storybook/subcomponent-controls';
import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import Link from '../../navigation/link/link';
import { VerticalSpacing } from '../vertical-spacing';
import { Footer, FooterProps } from './footer';
import { FooterContext } from './footer-context';
import { FooterSectionProps } from './footer-section/footer-section';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY?node-id=6459-181755&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/512563-footer" target="_BLANK">Zeroheight ↗</a>
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
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY?node-id=6459-181755&m=dev',
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

const LogoPlaceholder = ({ compact = false }: { compact?: boolean }) => {
  const { mobileBreakpoint } = useContext(FooterContext);
  const horizontal = isBreakpointBelow(useBreakpoint(), mobileBreakpoint);

  const [width, height] = compact ? ['7rem', '2.5rem'] : horizontal ? ['9rem', '5.1875rem'] : ['4rem', '7rem'];

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        background: 'var(--general-surface-primary)',
      }}
    >
      <Text element="span" modifiers={['small', 'italic']} color="tertiary">
        Logo
      </Text>
    </span>
  );
};

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true" style={{ display: 'block' }}>
    <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true" style={{ display: 'block' }}>
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

type SectionOverrides = Partial<Pick<FooterSectionProps, 'collapsible' | 'defaultOpen' | 'iconBreakpoint'>>;

const StandardSections = ({
  contactIcon = 'call',
  firstOpen = false,
  ...sectionProps
}: SectionOverrides & { contactIcon?: string; firstOpen?: boolean }) => (
  <>
    <Footer.Section icon="info" heading="Uuri lähemalt" defaultOpen={firstOpen} {...sectionProps}>
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
    <Footer.Section icon="share" heading="Sotsiaalmeedia ja uuendused" {...sectionProps}>
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
    <Footer.Section icon={contactIcon} heading="Kontakt" {...sectionProps}>
      <ContactLinks />
    </Footer.Section>
  </>
);

const BottomLinks = () => (
  <>
    <Link href="#" color="inverted" underline={false}>
      Facebook
    </Link>
    <Link href="#" color="inverted" underline={false}>
      Instagram
    </Link>
    <Link href="#" color="inverted" underline={false}>
      LinkedIn
    </Link>
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
  const outerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(320);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    let observer: ResizeObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    const poll = () => {
      const footer = iframe.contentDocument?.querySelector<HTMLElement>('[data-name="footer"]');
      if (footer) {
        const body = iframe.contentDocument?.body;
        if (body) body.style.margin = '0';
        setHeight(footer.offsetHeight);
        observer = new ResizeObserver(() => setHeight(footer.offsetHeight));
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
    const el = outerRef.current;
    if (!el) return undefined;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={outerRef} style={{ flex: `0 1 ${width}px`, width: '100%', maxWidth: width, minWidth: 0 }}>
      {label && (
        <Text element="h5" color="secondary">
          {label}
        </Text>
      )}
      <div style={{ height: height * scale, marginTop: 'var(--layout-grid-gutters-16)', overflow: 'hidden' }}>
        <iframe
          ref={ref}
          title={label || `Jaluse eelvaade (${width} px)`}
          scrolling="no"
          src={`iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`}
          style={{
            display: 'block',
            width,
            height,
            border: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        />
      </div>
    </div>
  );
};

const DEVICE_FRAME_SOURCE_ID = 'tedi-ready-layout-footer--device-frame-source';
const DEVICE_FRAME_SOURCE_ACCORDIONS_ID = 'tedi-ready-layout-footer--device-frame-source-accordions';
const DEVICE_FRAME_SOURCE_ACCORDIONS_OPEN_ID = 'tedi-ready-layout-footer--device-frame-source-accordions-open';

export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Footer.Body, { category: 'Footer.Body', prefix: 'body', include: ['columns'] }),
    ...subcomponentArgTypes(Footer.Section, {
      category: 'Footer.Section',
      prefix: 'section',
      include: ['collapsible', 'defaultOpen', 'iconBreakpoint'],
    }),
    ...subcomponentArgTypes(Footer.Side, {
      category: 'Footer.Side',
      prefix: 'side',
      include: ['placement', 'position'],
    }),
  },
  args: {
    side__placement: 'end',
  },
  render: (args: Record<string, unknown>) => (
    <Footer {...getPrimaryComponentProps<FooterProps>(args)}>
      <Footer.Body {...getSubcomponentProps(args, 'body')}>
        <StandardSections {...getSubcomponentProps<SectionOverrides>(args, 'section')} />
      </Footer.Body>
      <Footer.Side {...getSubcomponentProps(args, 'side')}>
        <LogoPlaceholder />
      </Footer.Side>
    </Footer>
  ),
};

export const DeviceSize: Story = {
  parameters: { controls: { disable: true } },
  render: (_args, context) => {
    const theme = (context.globals.theme as string) ?? 'default';
    return (
      <VerticalSpacing size={1.5}>
        <Text element="h4">Desktop</Text>
        <DeviceFrame storyId={DEVICE_FRAME_SOURCE_ID} width={1138} theme={theme} />
        <Text element="h4">Tablet</Text>
        <DeviceFrame storyId={DEVICE_FRAME_SOURCE_ID} width={871} theme={theme} />
        <Text element="h4">Mobile</Text>
        <div className="flex flex-wrap align-items-start gap-3">
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

const LogoFooter = ({ children }: { children: ReactNode }) => (
  <Footer>
    {children}
    <Footer.Body>
      <StandardSections contactIcon="location_on" />
    </Footer.Body>
  </Footer>
);

export const LogoPosition: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <section aria-label="Logo position examples">
      <VerticalSpacing size={1.5}>
        <Text element="h4">Right</Text>
        <LogoFooter>
          <Footer.Side placement="end">
            <LogoPlaceholder />
          </Footer.Side>
        </LogoFooter>
        <LogoFooter>
          <Footer.Side placement="end" position="start">
            <LogoPlaceholder />
          </Footer.Side>
        </LogoFooter>
        <Text element="h4">Left</Text>
        <LogoFooter>
          <Footer.Side placement="start">
            <LogoPlaceholder />
          </Footer.Side>
        </LogoFooter>
        <LogoFooter>
          <Footer.Side placement="start" position="start">
            <LogoPlaceholder />
          </Footer.Side>
        </LogoFooter>
      </VerticalSpacing>
    </section>
  ),
};

const BottomSections = () => (
  <>
    <Footer.Section icon="info" heading="Uuri lähemalt">
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
    <Footer.Section icon="location_on" heading="Kontakt">
      <ContactLinks />
    </Footer.Section>
  </>
);

export const WithBottomSection: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <section aria-label="Footer bottom section examples">
      <VerticalSpacing size={1}>
        <Footer>
          <Footer.Body>
            <BottomSections />
          </Footer.Body>
          <Footer.Side placement="end">
            <LogoPlaceholder />
          </Footer.Side>
          <Footer.Bottom>
            <BottomLinks />
          </Footer.Bottom>
        </Footer>
        <Footer>
          <Footer.Body>
            <BottomSections />
          </Footer.Body>
          <Footer.Side placement="end">
            <LogoPlaceholder />
          </Footer.Side>
          <Footer.Bottom separator>
            <BottomLinks />
          </Footer.Bottom>
        </Footer>
      </VerticalSpacing>
    </section>
  ),
};

export const CustomContent: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <section aria-label="Footer custom content examples">
      <VerticalSpacing size={1.5}>
        <Footer>
          <Footer.Body>
            <Footer.Section icon="call" heading="Kontakt">
              <ContactLinks />
            </Footer.Section>
            <div className="flex align-self-center gap-3">
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
            <div style={{ flex: 'none' }}>
              <Footer.Section icon="call" heading="Kontakt">
                <ContactLinks />
              </Footer.Section>
            </div>
          </Footer.Body>
          <Footer.Bottom>
            <LogoPlaceholder compact />
          </Footer.Bottom>
        </Footer>

        <Footer>
          <Footer.Body>
            <Footer.Section heading="Osale meie terviseuuringus" className="align-self-center">
              <Text element="p" color="white">
                Liitu meie uuringuga ja avasta uut enda tervise kohta!
              </Text>
            </Footer.Section>
            <div className="flex align-items-start">
              <img
                src="https://picsum.photos/seed/tedi-footer/152"
                alt=""
                style={{ flexShrink: 0, width: '4.75rem', height: '4.75rem', objectFit: 'cover', borderRadius: '50%' }}
              />
              <Footer.Section heading="Kontakt">
                <ContactLinks />
              </Footer.Section>
            </div>
          </Footer.Body>
        </Footer>
      </VerticalSpacing>
    </section>
  ),
};

/**
 * The logo sits on the left from `lg` up and drops below the sections when the footer stacks; resize the window to see it move.
 */
export const WithResponsivePlacement: Story = {
  parameters: { controls: { disable: true } },
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
 * `columns` lays sections out as equal grid tracks with mobile-first breakpoint overrides, and `maxWidth` caps the
 * content while the backgrounds stay full-bleed.
 */
export const MaxWidthAndColumns: Story = {
  parameters: { controls: { disable: true } },
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
        <Link href="#" color="inverted" underline={false}>
          Privaatsuspoliitika
        </Link>
        <Link href="#" color="inverted" underline={false}>
          Küpsised
        </Link>
        <Link href="#" color="inverted" underline={false}>
          Ligipääsetavus
        </Link>
      </Footer.Bottom>
    </Footer>
  ),
};
