import { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { FloatingButton } from '../../buttons/floating-button/floating-button';
import { Card } from '../../cards/card/card';
import { HideAt } from '../../layout/hide-at/hide-at';
import { ShowAt } from '../../layout/show-at/show-at';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { StretchContent } from '../../misc/stretch-content/stretch-content';
import { Link } from '../../navigation/link/link';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { Carousel } from './carousel';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.20.28?node-id=26296-151359&m=dev" target="_blank">Figma ↗</a><br/>
 */
const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'TEDI-Ready/Content/Carousel',
  subcomponents: {
    'Carousel.Content': Carousel.Content,
    'Carousel.Navigation': Carousel.Navigation,
    'Carousel.Indicators': Carousel.Indicators,
  } as never,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.20.28?node-id=26296-151359&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const RESPONSIVE_SLIDES = { xs: 1, sm: 2, md: 2.5, lg: 3, xl: 3.5, xxl: 4 };

const DemoSlide = (): JSX.Element => (
  <Card>
    <Card.Content>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          minHeight: '8rem',
        }}
      >
        <Icon name="spa" size={36} color="tertiary" />
        <Text color="secondary" element="span">
          Asenda oma sisuga
        </Text>
      </div>
    </Card.Content>
  </Card>
);

const slides = (count: number): JSX.Element[] => Array.from({ length: count }, (_, i) => <DemoSlide key={i} />);

interface NewsItem {
  id: number;
  image: string;
  category: string;
  title: string;
  excerpt: string;
}

const NEWS: NewsItem[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/tedi-news-1/480/240',
    category: 'Tervis',
    title: 'Uued digiretsepti võimalused patsientidele',
    excerpt: 'Alates sügisest saab retsepte pikendada otse patsiendiportaalis ilma vastuvõtuta.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/tedi-news-2/480/240',
    category: 'Teenused',
    title: 'Perearstikeskused laiendavad lahtiolekuaegu',
    excerpt: 'Õhtused ja nädalavahetuse vastuvõtud muutuvad kättesaadavamaks kogu Eestis.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/tedi-news-3/480/240',
    category: 'Uuringud',
    title: 'Ennetav tervisekontroll annab varase hoiatuse',
    excerpt: 'Personaalsed soovitused aitavad märgata riske enne, kui need probleemiks muutuvad.',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/tedi-news-4/480/240',
    category: 'Vaktsineerimine',
    title: 'Sügisene gripihooaeg läheneb',
    excerpt: 'Vaktsineerima saab registreeruda nii perearsti kui ka apteegi kaudu.',
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/tedi-news-5/480/240',
    category: 'Tervis',
    title: 'Vaimse tervise tugi muutub paindlikumaks',
    excerpt: 'Kaugnõustamine võimaldab abi saada ka väljaspool suuremaid keskusi.',
  },
];

const NewsCard = ({ image, category, title, excerpt }: NewsItem): JSX.Element => (
  <Card padding={0}>
    <img
      src={image}
      alt=""
      style={{
        display: 'block',
        width: '100%',
        height: 140,
        objectFit: 'cover',
        borderTopLeftRadius: 'var(--card-radius-rounded)',
        borderTopRightRadius: 'var(--card-radius-rounded)',
      }}
    />
    <Card.Content padding={1}>
      <VerticalSpacing size={0.25}>
        <Text element="p" modifiers="small" color="brand">
          {category}
        </Text>
        <Text element="p" modifiers="bold">
          {title}
        </Text>
        <Text element="p" modifiers="small" color="secondary">
          {excerpt}
        </Text>
      </VerticalSpacing>
    </Card.Content>
  </Card>
);

interface HeroItem {
  id: number;
  image: string;
  title: string;
  text: string;
}

const HERO: HeroItem[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/tedi-hero-1/1200/480',
    title: 'Sinu terviseandmed ühes kohas',
    text: 'Vaata oma retsepte, saatekirju ja uuringute tulemusi mugavalt patsiendiportaalis.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/tedi-hero-2/1200/480',
    title: 'Broneeri vastuvõtt mõne klikiga',
    text: 'Leia sobiv aeg perearsti või eriarsti juurde ja kinnita see kohe.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/tedi-hero-3/1200/480',
    title: 'Ennetus algab teadlikkusest',
    text: 'Personaalsed soovitused aitavad sul oma tervise eest paremini hoolt kanda.',
  },
];

const HeroSlide = ({ image, title, text }: HeroItem): JSX.Element => (
  <div style={{ position: 'relative', flex: 1, minHeight: 280, overflow: 'hidden', borderRadius: 8 }}>
    <img
      src={image}
      alt=""
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgb(0 0 0 / 65%), rgb(0 0 0 / 0%) 60%)',
      }}
    />
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 4,
        minHeight: 280,
        padding: '1.5rem',
      }}
    >
      <Text element="h3" modifiers="h2" color="white">
        {title}
      </Text>
      <Text color="white">{text}</Text>
    </div>
  </div>
);

interface MapItem {
  id: number;
  image: string;
  title: string;
  place: string;
}

const MAP_ITEMS: MapItem[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/tedi-map-1/320/200?grayscale',
    title: 'Ajalooline kaart 1939',
    place: 'Tallinn',
  },
  { id: 2, image: 'https://picsum.photos/seed/tedi-map-2/320/200?grayscale', title: 'Katastrikaart', place: 'Tartu' },
  { id: 3, image: 'https://picsum.photos/seed/tedi-map-3/320/200?grayscale', title: 'Reljeefikaart', place: 'Pärnu' },
  { id: 4, image: 'https://picsum.photos/seed/tedi-map-4/320/200?grayscale', title: 'Ortofoto 2024', place: 'Narva' },
  {
    id: 5,
    image: 'https://picsum.photos/seed/tedi-map-5/320/200?grayscale',
    title: 'Mullastiku kaart',
    place: 'Viljandi',
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/tedi-map-6/320/200?grayscale',
    title: 'Ajalooline kaart 1900',
    place: 'Rakvere',
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/tedi-map-7/320/200?grayscale',
    title: 'Hübriidkaart',
    place: 'Kuressaare',
  },
  { id: 8, image: 'https://picsum.photos/seed/tedi-map-8/320/200?grayscale', title: 'Põhikaart', place: 'Haapsalu' },
];

const MapCard = ({ image, title, place }: MapItem): JSX.Element => (
  <Card padding={0}>
    <img
      src={image}
      alt=""
      style={{
        display: 'block',
        width: '100%',
        height: 88,
        objectFit: 'cover',
        borderTopLeftRadius: 'var(--card-radius-rounded)',
        borderTopRightRadius: 'var(--card-radius-rounded)',
      }}
    />
    <Card.Content padding={0.75}>
      <Text element="p" modifiers={['small', 'bold']}>
        {title}
      </Text>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="location_on" size={16} color="secondary" />
        <Text element="span" modifiers="small" color="secondary">
          {place}
        </Text>
      </span>
    </Card.Content>
  </Card>
);

interface EventItem {
  id: number;
  image: string;
  badge: string;
  title: string;
  by: string;
}

const EVENTS: EventItem[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/tedi-event-1/600/360',
    badge: 'Tervisepäev',
    title: 'Kogukonna tervisepäev',
    by: 'Korraldab Tartu LV',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/tedi-event-2/600/360',
    badge: 'Sport',
    title: 'Autovaba päev',
    by: 'Korraldab Tallinn',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/tedi-event-3/600/360',
    badge: 'Ennetus',
    title: 'Vaktsineerimise nädal',
    by: 'Korraldab Terviseamet',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/tedi-event-4/600/360',
    badge: 'Perele',
    title: 'Perepäev pargis',
    by: 'Korraldab Pärnu LV',
  },
];

const EventCard = ({ image, badge, title, by }: EventItem): JSX.Element => (
  <div style={{ position: 'relative', flex: 1, minHeight: 180, overflow: 'hidden', borderRadius: 8 }}>
    <img
      src={image}
      alt=""
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgb(0 0 0 / 70%), rgb(0 0 0 / 0%) 65%)',
      }}
    />
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 180,
        padding: '1rem',
        gap: 8,
      }}
    >
      <div>
        <StatusBadge color="accent">{badge}</StatusBadge>
      </div>
      <div>
        <Text element="p" modifiers="bold" color="white">
          {title}
        </Text>
        <Text element="p" modifiers="small" color="white">
          {by}
        </Text>
      </div>
    </div>
  </div>
);

interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  text: string;
}

const SERVICES: ServiceItem[] = [
  { id: 1, icon: 'prescriptions', title: 'Retseptid', text: 'Vaata ja pikenda oma kehtivaid retsepte.' },
  { id: 2, icon: 'vaccines', title: 'Vaktsineerimised', text: 'Immuniseerimiskava ja varasemad vaktsiinid.' },
  { id: 3, icon: 'calendar_month', title: 'Vastuvõtud', text: 'Broneeri ja halda oma vastuvõtuaegu.' },
  { id: 4, icon: 'lab_panel', title: 'Uuringud', text: 'Laboritulemused ja saatekirjad ühes kohas.' },
];

const ServiceCard = ({ icon, title, text }: ServiceItem): JSX.Element => (
  <Card>
    <Card.Content style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <VerticalSpacing size={0.5}>
        <Icon name={icon} size={36} color="brand" />
        <Text element="p" modifiers="bold">
          {title}
        </Text>
        <Text element="p" modifiers="small" color="secondary">
          {text}
        </Text>
      </VerticalSpacing>
      <div style={{ marginTop: 'auto' }}>
        <Link href="#" iconRight="arrow_forward">
          Loe edasi
        </Link>
      </div>
    </Card.Content>
  </Card>
);

export const Default: Story = {
  render: () => (
    <Carousel>
      <Carousel.Header>
        <div>
          <Text element="h2" modifiers="h1">
            Pealkiri
          </Text>
        </div>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(5)}</Carousel.Content>
      <Carousel.Footer style={{ justifyContent: 'center' }}>
        <HideAt md>
          <Carousel.Indicators variant="numbers" />
        </HideAt>
        <ShowAt md>
          <Carousel.Indicators />
        </ShowAt>
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * Navigation arrows in the header, no bottom pagination.
 */
export const TopPaginationArrowsOnly: Story = {
  name: 'Top pagination - arrows only',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(5)}</Carousel.Content>
    </Carousel>
  ),
};

/**
 * Dots on the left, arrows on the right of the footer.
 */
export const SeparatedBottomPaginationHasDots: Story = {
  name: 'Separated bottom pagination - has dots',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(5)}</Carousel.Content>
      <Carousel.Footer>
        <HideAt md>
          <Carousel.Indicators variant="numbers" />
        </HideAt>
        <ShowAt md>
          <Carousel.Indicators />
        </ShowAt>
        <Carousel.Navigation />
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * A `current / total` counter on the left, arrows on the right.
 */
export const SeparatedBottomPaginationHasNumbers: Story = {
  name: 'Separated bottom pagination - has numbers',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(10)}</Carousel.Content>
      <Carousel.Footer>
        <Carousel.Indicators variant="numbers" />
        <Carousel.Navigation />
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * Centered dots with inline arrows (`withArrows`).
 */
export const CenteredBottomPaginationHasDots: Story = {
  name: 'Centered bottom pagination - has dots',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(6)}</Carousel.Content>
      <Carousel.Footer style={{ justifyContent: 'center' }}>
        <HideAt md>
          <Carousel.Indicators variant="numbers" withArrows />
        </HideAt>
        <ShowAt md>
          <Carousel.Indicators withArrows />
        </ShowAt>
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * Centered counter with inline arrows.
 */
export const CenteredBottomPaginationHasNumbers: Story = {
  name: 'Centered bottom pagination - has numbers',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(6)}</Carousel.Content>
      <Carousel.Footer style={{ justifyContent: 'center' }}>
        <Carousel.Indicators variant="numbers" withArrows />
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * Navigation in the header, centered dots in the footer.
 */
export const CombinationsTopNavigationBottomDots: Story = {
  name: 'Combinations - top navigation, bottom dots',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES}>{slides(6)}</Carousel.Content>
      <Carousel.Footer style={{ justifyContent: 'center' }}>
        <HideAt md>
          <Carousel.Indicators variant="numbers" />
        </HideAt>
        <ShowAt md>
          <Carousel.Indicators />
        </ShowAt>
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * A single slide per view (the default) in a constrained width.
 */
export const CenteredHasDots: Story = {
  name: 'Centered - has dots',
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Carousel>
        <Carousel.Header>
          <Text element="h2" modifiers="h1">
            Pealkiri
          </Text>
        </Carousel.Header>
        <Carousel.Content>{slides(3)}</Carousel.Content>
        <Carousel.Footer style={{ justifyContent: 'center' }}>
          <HideAt md>
            <Carousel.Indicators variant="numbers" withArrows />
          </HideAt>
          <ShowAt md>
            <Carousel.Indicators withArrows />
          </ShowAt>
        </Carousel.Footer>
      </Carousel>
    </div>
  ),
};

/**
 * A single slide per view in a constrained width with a centered `N / M` counter
 * and inline arrows (`variant="numbers"`).
 */
export const CenteredHasNumbers: Story = {
  name: 'Centered - has numbers',
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Carousel>
        <Carousel.Header>
          <Text element="h2" modifiers="h1">
            Pealkiri
          </Text>
        </Carousel.Header>
        <Carousel.Content>{slides(10)}</Carousel.Content>
        <Carousel.Footer style={{ justifyContent: 'center' }}>
          <Carousel.Indicators variant="numbers" withArrows />
        </Carousel.Footer>
      </Carousel>
    </div>
  ),
};

/**
 * Faded edges (`fade`) hint at off-screen slides.
 */
export const Faded: Story = {
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={RESPONSIVE_SLIDES} fade>
        {slides(6)}
      </Carousel.Content>
    </Carousel>
  ),
};

/**
 * `fade="both"` forces both edges to fade regardless of slide count — here with
 * ~4 slides per view, `centered` so the active slide sits in the middle and an
 * equal peek fades in on either side. (`fade` alone fades only the trailing edge
 * once there is more than one slide per view.)
 */
export const FadedBothSides: Story = {
  name: 'Faded - both sides',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={{ xs: 1.3, sm: 2.4, lg: 4.4 }} centered fade="both">
        {slides(8)}
      </Carousel.Content>
    </Carousel>
  ),
};

/**
 * Fractional `slidesPerView` lets the next slide "peek" in from the edge — a
 * common mobile pattern that signals there is more to swipe. Here
 * `slidesPerView={{ xs: 1.15, sm: 2.25, lg: 3.25 }}`.
 */
export const Peeking: Story = {
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={{ xs: 1.15, sm: 2.25, lg: 3.25 }}>{slides(8)}</Carousel.Content>
      <Carousel.Footer style={{ justifyContent: 'center' }}>
        <HideAt md>
          <Carousel.Indicators variant="numbers" />
        </HideAt>
        <ShowAt md>
          <Carousel.Indicators />
        </ShowAt>
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * `centered` keeps the active slide in the middle and reveals an equal peek of
 * the previous *and* next slide on both edges. Pair it with a fractional
 * `slidesPerView` and keep `loop` on (so there are neighbours on both sides).
 */
export const PeekingBothSides: Story = {
  name: 'Peeking - both sides (centered)',
  render: () => (
    <Carousel>
      <Carousel.Header>
        <Text element="h2" modifiers="h1">
          Pealkiri
        </Text>
        <Carousel.Navigation />
      </Carousel.Header>
      <Carousel.Content slidesPerView={{ xs: 1.3, sm: 2.4, lg: 3.4 }} centered>
        {slides(8)}
      </Carousel.Content>
      <Carousel.Footer style={{ justifyContent: 'center' }}>
        <HideAt md>
          <Carousel.Indicators variant="numbers" />
        </HideAt>
        <ShowAt md>
          <Carousel.Indicators />
        </ShowAt>
      </Carousel.Footer>
    </Carousel>
  ),
};

/**
 * A finite, bounded carousel (`loop={false}`) of small map-selection cards with
 * edge-mounted overlay arrows. Here the arrows are rendered as `FloatingButton`s
 * via `Carousel.Navigation`'s `renderButton` prop (`position="static"` lets the
 * overlay container place them). Many compact items are shown at once; navigation
 * stops at the first / last slide and the arrows disable at the bounds.
 */
export const BoundedOverlayNavigation: Story = {
  name: 'Bounded - overlay arrows (no loop)',
  render: () => (
    <Carousel>
      <Carousel.Content slidesPerView={{ xs: 2, sm: 3, md: 4, lg: 6 }} gap={8} loop={false}>
        {MAP_ITEMS.map((item) => (
          <MapCard key={item.id} {...item} />
        ))}
      </Carousel.Content>
      <Carousel.Navigation
        overlay
        renderButton={({ buttonProps }) => <FloatingButton {...buttonProps} position="static" visualType="secondary" />}
      />
    </Carousel>
  ),
};

/**
 * Real-world compositions. Slides are arbitrary content — `Carousel.Content`
 * renders each direct child as a slide, so any node works:
 *
 * - **News** (Uudised) — multi-up `Card` slides (image, category, title, excerpt).
 * - **Events** (Sündmused) — image cards with an overlaid badge and title.
 * - **Services** (Teenused) — icon + title + description + a "read more" link;
 *   each card is wrapped in `StretchContent` so every card fills the slide and
 *   they all share the tallest card's height.
 * - **Hero** — a single full-width banner per view (`slidesPerView={1}`).
 */
export const Examples: Story = {
  render: () => (
    <VerticalSpacing size={4}>
      <Carousel>
        <Carousel.Header>
          <Text element="h2" modifiers="h1">
            Uudised
          </Text>
          <Carousel.Navigation />
        </Carousel.Header>
        <Carousel.Content slidesPerView={{ xs: 1, sm: 2, lg: 3 }}>
          {NEWS.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </Carousel.Content>
        <Carousel.Footer style={{ justifyContent: 'center' }}>
          <HideAt md>
            <Carousel.Indicators variant="numbers" />
          </HideAt>
          <ShowAt md>
            <Carousel.Indicators />
          </ShowAt>
        </Carousel.Footer>
      </Carousel>

      <Carousel>
        <Carousel.Header>
          <Text element="h2" modifiers="h1">
            Sündmused
          </Text>
          <Carousel.Navigation />
        </Carousel.Header>
        <Carousel.Content slidesPerView={{ xs: 1.2, sm: 2, md: 3 }}>
          {EVENTS.map((item) => (
            <EventCard key={item.id} {...item} />
          ))}
        </Carousel.Content>
        <Carousel.Footer style={{ justifyContent: 'center' }}>
          <Carousel.Indicators variant="numbers" />
        </Carousel.Footer>
      </Carousel>

      <Carousel>
        <Carousel.Header>
          <Text element="h2" modifiers="h1">
            Teenused
          </Text>
          <Carousel.Navigation />
        </Carousel.Header>
        <Carousel.Content slidesPerView={{ xs: 1, sm: 2, lg: 4 }}>
          {SERVICES.map((item) => (
            <StretchContent key={item.id}>
              <ServiceCard {...item} />
            </StretchContent>
          ))}
        </Carousel.Content>
        <Carousel.Footer style={{ justifyContent: 'center' }}>
          <HideAt md>
            <Carousel.Indicators variant="numbers" />
          </HideAt>
          <ShowAt md>
            <Carousel.Indicators />
          </ShowAt>
        </Carousel.Footer>
      </Carousel>

      <Carousel>
        <Carousel.Content slidesPerView={1}>
          {HERO.map((item) => (
            <HeroSlide key={item.id} {...item} />
          ))}
        </Carousel.Content>
        <Carousel.Footer style={{ justifyContent: 'center' }}>
          <HideAt md>
            <Carousel.Indicators variant="numbers" withArrows />
          </HideAt>
          <ShowAt md>
            <Carousel.Indicators withArrows />
          </ShowAt>
        </Carousel.Footer>
      </Carousel>
    </VerticalSpacing>
  ),
};
