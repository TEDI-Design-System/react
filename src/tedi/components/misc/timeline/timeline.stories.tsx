import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Collapse } from '../../buttons/collapse/collapse';
import { InfoButton } from '../../buttons/info-button/info-button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Separator from '../separator/separator';
import { Timeline } from './timeline';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.60.78?node-id=11335-186480&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/27208b-timeline" target="_blank">Zeroheight ↗</a>
 */
const meta: Meta<typeof Timeline> = {
  component: Timeline,
  subcomponents: {
    'Timeline.Item': Timeline.Item,
    'Timeline.Title': Timeline.Title,
    'Timeline.Description': Timeline.Description,
  } as never,
  title: 'TEDI-Ready/Components/Helpers/Timeline',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.60.78?node-id=11335-186480&m=dev',
    },
  },
  argTypes: {
    activeIndex: { control: 'number' },
    variant: { control: 'radio', options: ['default', 'card'] },
    cardPadding: { control: 'select', options: [0, 0.5, 0.75, 1, 1.5, 2, 2.5, 3] },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

/**
 * Shows a single item at each position in a timeline — start (line below), middle (line above
 * and below) and end (line above) — side by side, like the Figma spec's columns. `renderContent`
 * returns the item's `Timeline.Title` / `Timeline.Description` content for every column.
 */
const positions: { label: string; above: boolean; below: boolean }[] = [
  { label: 'Start', above: false, below: true },
  { label: 'Middle', above: true, below: true },
  { label: 'End', above: true, below: false },
];

const STUB_HEIGHT = 1.5;

const PositionShowcase = ({ renderContent }: { renderContent: () => ReactNode }): JSX.Element => (
  <Row>
    {positions.map(({ label, above, below }) => (
      <Col key={label} xs={12} sm={4}>
        <VerticalSpacing size={0.5}>
          <Text modifiers="bold">{label}</Text>
          <div style={{ display: 'flex', gap: 'var(--layout-grid-gutters-12)' }}>
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: above ? 0 : '6px' }}
            >
              {above && <Separator axis="vertical" color="accent" height={STUB_HEIGHT} />}
              <Separator variant="dot-only" color="accent" dotSize="medium" dotStyle="filled" />
              {below && <Separator axis="vertical" color="accent" height={STUB_HEIGHT} />}
            </div>
            <div
              style={
                {
                  '--timeline-text-min-height': '1.5rem',
                  paddingTop: above ? `calc(${STUB_HEIGHT}rem - 6px)` : 0,
                } as CSSProperties
              }
            >
              {renderContent()}
            </div>
          </div>
        </VerticalSpacing>
      </Col>
    ))}
  </Row>
);

export const Default: Story = {
  args: { activeIndex: 1 },
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item timings={['1990', '14. detsember']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Pärast taotluse esitamist võetakse see menetlusse.</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item timings={['1990', '15. detsember']}>
        <Timeline.Title>Menetlemine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 päeva.</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item timings={['1991', '15. jaanuar']}>
        <Timeline.Title>Otsus</Timeline.Title>
        <Timeline.Description>Otsus tehakse teatavaks.</Timeline.Description>
      </Timeline.Item>
    </Timeline>
  ),
};

export const Position: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--layout-grid-gutters-12)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {['Start', 'Middle', 'End'].map((label) => (
          <div key={label} style={{ flex: 1 }}>
            <Text modifiers="bold">{label}</Text>
          </div>
        ))}
      </div>
      <Timeline>
        <Timeline.Item timings={['1990', '14. detsember']}>
          <Timeline.Title>Taotluse esitamine</Timeline.Title>
          <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        </Timeline.Item>
        <Timeline.Item timings={['1990', '14. detsember']}>
          <Timeline.Title>Taotluse esitamine</Timeline.Title>
          <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        </Timeline.Item>
        <Timeline.Item timings={['1990', '14. detsember']}>
          <Timeline.Title>Taotluse esitamine</Timeline.Title>
          <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        </Timeline.Item>
      </Timeline>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => <PositionShowcase renderContent={() => <Timeline.Title>Taotluse esitamine</Timeline.Title>} />,
};

export const WithDescription: Story = {
  render: () => (
    <PositionShowcase
      renderContent={() => (
        <>
          <Timeline.Title>Taotluse esitamine</Timeline.Title>
          <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        </>
      )}
    />
  ),
};

export const WithInfoButton: Story = {
  render: () => (
    <PositionShowcase
      renderContent={() => (
        <>
          <Timeline.Title>
            Taotluse esitamine
            <InfoButton isSmall aria-label="Taotluse esitamine info" />
          </Timeline.Title>
          <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        </>
      )}
    />
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <PositionShowcase
      renderContent={() => <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>}
    />
  ),
};

export const WithAction: Story = {
  args: { activeIndex: 1 },
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        <Collapse id="timeline-action-collapse" openText="Näita rohkem" closeText="Näita vähem">
          <Text element="span" modifiers="small" color="tertiary">
            Pärast otsuse teatavaks tegemist saab seda vajadusel vaidlustada.
          </Text>
        </Collapse>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        <Button size="small" style={{ width: 'fit-content' }}>
          Alusta taotlust
        </Button>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        <Button size="small" visualType="secondary" iconLeft="add" style={{ width: 'fit-content' }}>
          Lisa kaastaotleja
        </Button>
      </Timeline.Item>
    </Timeline>
  ),
};

export const WithDate: Story = {
  args: { activeIndex: 1 },
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item timings={['1990']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item timings={['1990']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item timings={['1990']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
      </Timeline.Item>
    </Timeline>
  ),
};

export const WithDateDescription: Story = {
  args: { activeIndex: 1 },
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item timings={['1990', '14. detsember']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item timings={['1990', '14. detsember']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item timings={['1990', '14. detsember']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
      </Timeline.Item>
    </Timeline>
  ),
};

/**
 * A richer real-world example with the interactive `activeIndex` control: a pension timeline with
 * multiple dates, a description and an inline action on the current step.
 */
export const Example: Story = {
  args: { activeIndex: 2 },
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item timings={['1990', '14. detsember']}>
        <Timeline.Title>Staaži kogumise algus (I sammas)</Timeline.Title>
      </Timeline.Item>
      <Timeline.Item timings={['2002', '04. oktoober']}>
        <Timeline.Title>II sambaga liitumine</Timeline.Title>
        <Timeline.Description>Aktiivne fond: LHV XL (loositud)</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item timings={['2007', '07. aprill']}>
        <Timeline.Title>Minimaalse staaži täitumine (I sammas)</Timeline.Title>
      </Timeline.Item>
      <Timeline.Item timings={['2021', '13. mai']}>
        <Timeline.Title>III sambaga liitumine</Timeline.Title>
      </Timeline.Item>
      <Timeline.Item timings={['2022', '14. juuni']}>
        <Timeline.Title>II sambast lahkumine</Timeline.Title>
      </Timeline.Item>
      <Timeline.Item timings={['2024', '16. detsember']}>
        <Timeline.Title>Taotluse esitamine</Timeline.Title>
        <Timeline.Description>Menetlemine võib võtta kuni 30 p</Timeline.Description>
        <Button size="small" style={{ width: 'fit-content' }}>
          Alusta taotlust
        </Button>
      </Timeline.Item>
      <Timeline.Item timings={['2032']}>
        <Timeline.Title>II sambaga uuesti liitumise võimalus</Timeline.Title>
      </Timeline.Item>
      <Timeline.Item timings={['2035']}>
        <Timeline.Title>Vanaduspensioniiga</Timeline.Title>
      </Timeline.Item>
    </Timeline>
  ),
};

/**
 * The `card` variant wraps the timeline in card chrome. `timingsBottom` pins a note to the
 * bottom of the timings column on desktop (and renders it after the content on mobile).
 */
export const TimelineCard: Story = {
  args: { activeIndex: 1, variant: 'card' },
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item
        timings={['11.01.2024 12:23', 'Kersti Ööviul']}
        timingsBottom={
          <Text element="span" modifiers="small" color="tertiary">
            Muudetud 08.02.2024 12:23
          </Text>
        }
      >
        <Timeline.Title>Suhtlus isikuga</Timeline.Title>
        <Collapse id="timeline-card-collapse-1" openText="Näita rohkem" closeText="Näita vähem" defaultOpen>
          <Text element="span" modifiers="small" color="secondary">
            Lisainfo: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Collapse>
      </Timeline.Item>
      <Timeline.Item
        timings={['08.02.2024 12:23', 'Kersti Ööviul']}
        timingsBottom={
          <Text element="span" modifiers="small" color="tertiary">
            Muudetud 12.03.2024 12:23
          </Text>
        }
      >
        <Timeline.Title>Suhtlus isikuga</Timeline.Title>
        <Collapse id="timeline-card-collapse-2" openText="Näita rohkem" closeText="Näita vähem">
          <Text element="span" modifiers="small" color="secondary">
            Lisainfo: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Collapse>
      </Timeline.Item>
      <Timeline.Item timings={['12.05.2024 12:23', 'Kersti Ööviul']}>
        <Timeline.Title>Suhtlus isikuga</Timeline.Title>
        <Collapse id="timeline-card-collapse-3" openText="Näita rohkem" closeText="Näita vähem">
          <Text element="span" modifiers="small" color="secondary">
            Lisainfo: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Collapse>
      </Timeline.Item>
    </Timeline>
  ),
};
