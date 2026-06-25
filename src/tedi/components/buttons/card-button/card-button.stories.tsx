import { Meta, StoryObj } from '@storybook/react';
import { Fragment, ReactNode } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Card } from '../../cards/card/card';
import { TextGroup } from '../../content/text-group/text-group';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Separator } from '../../misc/separator/separator';
import { StretchContent } from '../../misc/stretch-content/stretch-content';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { CardButton } from './card-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.54.76?node-id=4620-85618&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/4191c7-card-button" target="_blank">Zeroheight ↗</a>
 *
 * `CardButton` is an interactive wrapper around a `Card`. It renders a `<button>` by default
 * (pass `as="a"` with `href` for navigation) and applies the hover, active, focus and disabled
 * states to the card and its blocks. Any card composition works inside it — keep it to one card
 * and avoid nested interactive elements.
 */
const meta: Meta<typeof CardButton> = {
  component: CardButton,
  title: 'TEDI-Ready/Components/Buttons/CardButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.54.76?node-id=4620-85618&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardButton>;

const rowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' } as const;

const ShortcutCard = ({ title, description }: { title: string; description: string }): JSX.Element => (
  <Card>
    <Card.Content>
      <div style={rowStyle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text element="span" modifiers="bold">
            {title}
          </Text>
          <Text element="span" modifiers="small" color="tertiary">
            {description}
          </Text>
        </div>
        <Icon name="arrow_right_alt" color="secondary" />
      </div>
    </Card.Content>
  </Card>
);

const IconCard = ({ icon, title, description }: { icon: string; title: string; description: string }): JSX.Element => (
  <Card>
    <Row gutter={0} style={{ flex: '1 0 auto' }}>
      <Col width="auto" style={{ display: 'flex' }}>
        <StretchContent>
          <Card borderRadius={{ right: false }} borderless>
            <Card.Content background="secondary">
              <Icon name={icon} color="secondary" />
            </Card.Content>
          </Card>
        </StretchContent>
      </Col>
      <Col width="auto" style={{ display: 'flex' }}>
        <Separator axis="vertical" />
      </Col>
      <Col style={{ display: 'flex' }}>
        <StretchContent>
          <Card borderRadius={{ left: false }} borderless>
            <Card.Content>
              <div style={rowStyle}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text element="span" modifiers="bold">
                    {title}
                  </Text>
                  <Text element="span" modifiers="small" color="tertiary">
                    {description}
                  </Text>
                </div>
                <Icon name="arrow_right_alt" color="secondary" />
              </div>
            </Card.Content>
          </Card>
        </StretchContent>
      </Col>
    </Row>
  </Card>
);

const BookingCard = ({
  lead,
  title,
  description,
  book,
  disabled,
}: {
  lead?: ReactNode;
  title: string;
  description?: string;
  book?: boolean;
  disabled?: boolean;
}): JSX.Element => (
  <Card>
    <Card.Content>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {lead}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Text element="span" modifiers="bold">
            {title}
          </Text>
          {description && (
            <Text element="span" modifiers="small" color="tertiary">
              {description}
            </Text>
          )}
        </div>
        {book ? (
          // The "Broneerima" call to action uses the neutral button-link colour
          // (brand in light mode, white in dark mode) — it can't be an actual `Button`,
          // since the whole card is already the clickable `CardButton`.
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: disabled ? 'var(--general-text-disabled)' : 'var(--button-main-neutral-text-default)',
            }}
          >
            <Text element="span">Broneerima</Text>
            <Icon name="arrow_right_alt" color="inherit" />
          </span>
        ) : (
          <Icon name="arrow_right_alt" color="secondary" />
        )}
      </div>
    </Card.Content>
  </Card>
);

export const Default: Story = {
  render: () => (
    <CardButton>
      <ShortcutCard title="Töövõime" description="Näiteks töövõimetuslehed, töövõime hindamine" />
    </CardButton>
  ),
};

export const CardRows: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <CardButton>
        <BookingCard
          lead={
            <Text element="span" modifiers="bold">
              8:30
            </Text>
          }
          title="Kardioloog"
          description="Valdkond"
          book
        />
      </CardButton>
      <CardButton>
        <BookingCard
          lead={
            <Text element="span" modifiers="bold">
              8:30
            </Text>
          }
          title="Kardioloog"
          book
        />
      </CardButton>
      <CardButton>
        <BookingCard
          lead={<Icon name="monitor_heart" color="secondary" />}
          title="Kardioloog"
          description="Valdkond"
          book
        />
      </CardButton>
      <CardButton>
        <BookingCard title="Kardioloog" description="Valdkond" book />
      </CardButton>
      <CardButton>
        <IconCard icon="monitor_heart" title="Kardioloog" description="Valdkond" />
      </CardButton>
      <CardButton>
        <Card>
          <Card.Content>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}
              >
                <Text element="span" modifiers="bold">
                  Kardioloog
                </Text>
                <StatusBadge color="success">Kindlustatud | Tervisekassa</StatusBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Text element="span" color="brand">
                  Broneerima
                </Text>
                <Icon name="arrow_right_alt" color="brand" />
              </div>
            </div>
          </Card.Content>
        </Card>
      </CardButton>
      <CardButton>
        <Card>
          <Card.Content>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Icon name="monitor_heart" color="secondary" />
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <Text element="span" modifiers="bold">
                  Perearst
                </Text>
                <Text element="span" modifiers="small" color="tertiary">
                  Dr. Mari Maasikas
                </Text>
              </div>
              <StatusBadge color="success">Aktiivne</StatusBadge>
              <Icon name="arrow_right_alt" color="secondary" />
            </div>
          </Card.Content>
        </Card>
      </CardButton>
      <CardButton>
        <BookingCard title="Üldandmed" />
      </CardButton>
      <CardButton>
        <Card>
          <Card.Content>
            <div style={rowStyle}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text element="span" modifiers="h4" color="brand">
                  Minu andmed
                </Text>
                <Text element="span" modifiers="small" color="tertiary">
                  Isikuandmed ja sinu perearstiga seotud info.
                </Text>
              </div>
              <Icon name="arrow_right_alt" color="secondary" />
            </div>
          </Card.Content>
        </Card>
      </CardButton>
    </VerticalSpacing>
  ),
};

export const CardShortcut: Story = {
  render: () => (
    <Row cols={1} md={{ cols: 2 }} gutter={3}>
      <Col>
        <CardButton>
          <ShortcutCard title="Töövõime" description="Näiteks töövõimetuslehed, töövõime hindamine" />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <ShortcutCard
            title="Esindusõigus Terviseportaalis"
            description="Võimaldab jagada ligipääsu sinu terviseandmetele"
          />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <ShortcutCard title="Mootorsõiduki juhiloa tõend" description="Kehtib kuni 28.05.2024" />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <ShortcutCard title="Minu hammaste tervis" description="Ülevaade sinu vastuvõttudest" />
        </CardButton>
      </Col>
    </Row>
  ),
};

export const WithIconCard: Story = {
  render: () => (
    <Row cols={1} lg={{ cols: 3 }} gutter={3}>
      <Col>
        <CardButton>
          <IconCard icon="euro_symbol" title="Isiku toetused" description="Toetused mis on isikule ette nähtud" />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <IconCard icon="checklist" title="Isiku hindamised" description="Hindamised toetuste saamiseks" />
        </CardButton>
      </Col>
      <Col>
        <CardButton>
          <IconCard icon="contract" title="Isiku teenused" description="Teenused mis on võimaldatud peale hindamist" />
        </CardButton>
      </Col>
    </Row>
  ),
};

const STATE_ROWS = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'] as const;

export const States: Story = {
  parameters: {
    pseudo: {
      hover: '[data-pseudo="Hover"]',
      active: '[data-pseudo="Active"]',
      focusVisible: '[data-pseudo="Focus"]',
    },
  },
  render: () => {
    const breakpoint = useBreakpoint();
    const isMobile = isBreakpointBelow(breakpoint, 'md');

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr 1fr',
          gap: isMobile ? '0.5rem' : '1rem',
          alignItems: 'center',
        }}
      >
        {STATE_ROWS.map((state) => (
          <Fragment key={state}>
            <Text modifiers="bold" color="primary">
              {state}
            </Text>
            <CardButton data-pseudo={state} disabled={state === 'Disabled'}>
              <BookingCard title="Kardioloog" description="Valdkond" book disabled={state === 'Disabled'} />
            </CardButton>
            <CardButton data-pseudo={state} disabled={state === 'Disabled'}>
              <IconCard icon="monitor_heart" title="Kardioloog" description="Valdkond" />
            </CardButton>
          </Fragment>
        ))}
      </div>
    );
  },
};

/**
 * Use an anchor host when the card navigates to another page or route. Only the button host
 * supports the disabled state.
 */
export const AsLink: Story = {
  render: () => (
    <CardButton as="a" href="#">
      <ShortcutCard title="Töövõime" description="Näiteks töövõimetuslehed, töövõime hindamine" />
    </CardButton>
  ),
};

/**
 * Any card composition works inside the wrapper — rows, icon cells, separators, badges and text
 * groups. Avoid nested interactive elements.
 */
export const ComplexCard: Story = {
  render: () => (
    <CardButton>
      <Card>
        <Row gutter={0}>
          <Col width="auto" style={{ display: 'flex' }}>
            <StretchContent>
              <Card borderRadius={{ right: false, bottom: false }} borderless>
                <Card.Content background="secondary">
                  <Icon name="prescriptions" color="secondary" />
                </Card.Content>
              </Card>
            </StretchContent>
          </Col>
          <Col width="auto" style={{ display: 'flex' }}>
            <Separator axis="vertical" />
          </Col>
          <Col>
            <Card borderRadius={{ left: false, bottom: false }} borderless>
              <Card.Content>
                <div style={{ ...rowStyle, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text element="span" modifiers="bold">
                      Amlodipiin 50mg
                    </Text>
                    <Text element="span" modifiers="small" color="tertiary">
                      Amlodipin-rathiopharm 50mg
                    </Text>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <StatusBadge color="success" variant="bordered">
                      Kehtiv
                    </StatusBadge>
                    <Text element="span" modifiers="small" color="tertiary">
                      Kehtiv kuni 12.05.2024
                    </Text>
                    <Icon name="arrow_right_alt" color="secondary" />
                  </div>
                </div>
              </Card.Content>
            </Card>
          </Col>
        </Row>
        <Separator />
        <Card.Content>
          <Row cols={1} md={{ cols: 3 }} gutter={2}>
            <Col>
              <TextGroup type="vertical" label="Toimeaine" value="Amlodipiin" />
            </Col>
            <Col>
              <TextGroup type="vertical" label="Kogus" value="30 tk" />
            </Col>
            <Col>
              <TextGroup type="vertical" label="Välja ostmata" value="5 / 6 retsepti" />
            </Col>
          </Row>
        </Card.Content>
      </Card>
    </CardButton>
  ),
};
