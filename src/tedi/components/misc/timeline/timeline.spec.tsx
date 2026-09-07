import { render, screen } from '@testing-library/react';

import { Timeline } from './timeline';

import '@testing-library/jest-dom';

let mockBreakpoint = 'lg';
jest.mock('../../../helpers/hooks/use-breakpoint', () => ({
  __esModule: true,
  ...jest.requireActual('../../../helpers/hooks/use-breakpoint'),
  useBreakpoint: () => mockBreakpoint,
  default: () => mockBreakpoint,
}));

const Tree = (props: { activeIndex?: number; variant?: 'default' | 'card'; cardPadding?: number }) => (
  <Timeline {...props}>
    <Timeline.Item timings={['2020', 'Jaanuar']}>
      <Timeline.Title>First</Timeline.Title>
      <Timeline.Description>First description</Timeline.Description>
    </Timeline.Item>
    <Timeline.Item timings={['2022']}>
      <Timeline.Title>Second</Timeline.Title>
      <button type="button">Action</button>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Title>Third</Timeline.Title>
    </Timeline.Item>
  </Timeline>
);

describe('Timeline', () => {
  beforeEach(() => {
    mockBreakpoint = 'lg';
  });

  it('renders items with their titles, descriptions, timings and extra content', () => {
    render(<Tree activeIndex={1} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('First description')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Jaanuar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('marks the active item as current and renders a marker dot per item', () => {
    const { container } = render(<Tree activeIndex={1} />);
    // one large (current) marker
    expect(container.querySelectorAll('[class*="tedi-timeline__marker--large"]')).toHaveLength(1);
    // three markers total (one per item)
    expect(container.querySelectorAll('[class*="tedi-timeline__marker"]').length).toBeGreaterThanOrEqual(3);
  });

  it('draws a connecting line for every item except the last', () => {
    const { container } = render(<Tree activeIndex={0} />);
    // vertical separators connect items: 3 items → 2 lines
    expect(container.querySelectorAll('[class*="tedi-separator--vertical"]')).toHaveLength(2);
  });

  it('applies the card variant chrome', () => {
    const { container } = render(<Tree activeIndex={1} variant="card" />);
    expect(container.querySelector('[class*="tedi-timeline--card"]')).toBeInTheDocument();
  });

  it('defaults the title to secondary and the description to tertiary text colour', () => {
    render(<Tree activeIndex={0} />);
    expect(screen.getByText('First')).toHaveClass('tedi-text--secondary');
    expect(screen.getByText('First description')).toHaveClass('tedi-text--tertiary');
  });

  it('lets the title / description text colour be overridden via the color prop', () => {
    render(
      <Timeline activeIndex={0}>
        <Timeline.Item timings={['2020']}>
          <Timeline.Title color="primary">Coloured title</Timeline.Title>
          <Timeline.Description color="brand">Coloured description</Timeline.Description>
        </Timeline.Item>
      </Timeline>
    );
    expect(screen.getByText('Coloured title')).toHaveClass('tedi-text--primary');
    expect(screen.getByText('Coloured title')).not.toHaveClass('tedi-text--secondary');
    expect(screen.getByText('Coloured description')).toHaveClass('tedi-text--brand');
  });

  it('renders timingsBottom content', () => {
    render(
      <Timeline activeIndex={0}>
        <Timeline.Item timings={['2020']} timingsBottom={<span>Modified 2021</span>}>
          <Timeline.Title>Only</Timeline.Title>
        </Timeline.Item>
      </Timeline>
    );
    expect(screen.getByText('Modified 2021')).toBeInTheDocument();
  });

  it('renders timingsBottom after the item and flags has-bottom on mobile', () => {
    mockBreakpoint = 'sm';
    const { container } = render(
      <Timeline activeIndex={0}>
        <Timeline.Item timings={['2020']} timingsBottom={<span>Modified 2021</span>}>
          <Timeline.Title>Only</Timeline.Title>
        </Timeline.Item>
      </Timeline>
    );
    expect(screen.getByText('Modified 2021')).toBeInTheDocument();
    expect(container.querySelector('[class*="tedi-timeline__item--has-bottom"]')).toBeInTheDocument();
  });

  it('renders every item as future (no current marker) when activeIndex is omitted', () => {
    const { container } = render(<Tree />);
    expect(container.querySelector('[class*="tedi-timeline__marker--large"]')).not.toBeInTheDocument();
  });

  it('passes non-item children through untouched', () => {
    render(
      <Timeline activeIndex={0}>
        <p>Intro text</p>
        <Timeline.Item timings={['2020']}>
          <Timeline.Title>Only</Timeline.Title>
        </Timeline.Item>
      </Timeline>
    );
    expect(screen.getByText('Intro text')).toBeInTheDocument();
  });

  it('sets the card padding custom property when cardPadding is provided', () => {
    const { container } = render(<Tree activeIndex={1} variant="card" cardPadding={1} />);
    const root = container.querySelector('[class*="tedi-timeline--card"]');
    expect(root).toHaveStyle({ '--tedi-timeline-card-padding': '1rem' });
  });

  it('renders a standalone Timeline.Item with default state and isLast', () => {
    const { container } = render(
      <Timeline.Item timings={['2020']}>
        <Timeline.Title>Standalone</Timeline.Title>
      </Timeline.Item>
    );
    expect(screen.getByText('Standalone')).toBeInTheDocument();
    // default state is 'future', so no current (large) marker is rendered
    expect(container.querySelector('[class*="tedi-timeline__marker--large"]')).not.toBeInTheDocument();
  });
});
