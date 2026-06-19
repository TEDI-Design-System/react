import { render, screen } from '@testing-library/react';

import { Timeline } from './timeline';

import '@testing-library/jest-dom';

jest.mock('../../../helpers/hooks/use-breakpoint', () => ({
  __esModule: true,
  ...jest.requireActual('../../../helpers/hooks/use-breakpoint'),
  useBreakpoint: () => 'lg',
  default: () => 'lg',
}));

const Tree = (props: { activeIndex?: number; variant?: 'default' | 'card' }) => (
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
});
