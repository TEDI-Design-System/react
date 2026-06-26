import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import { HideAt } from './hide-at';

const meta: Meta<typeof HideAt> = {
  component: HideAt,
  title: 'TEDI-Ready/Layout/HideAt',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HideAt>;

const Box = ({ children, color = '#e8f4fd' }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      padding: '1rem',
      borderRadius: '0.25rem',
      border: '1px solid #b3d9f2',
      backgroundColor: color,
    }}
  >
    <Text>{children}</Text>
  </div>
);

const Description = ({ children }: { children: React.ReactNode }) => (
  <Text modifiers="small" color="secondary">
    {children}
  </Text>
);

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Description>
        The colored box below is wrapped in HideAt md. It is hidden at the md breakpoint and above. Resize the viewport
        below md to see it appear.
      </Description>
      <HideAt md>
        <Box>This content is hidden at md and above.</Box>
      </HideAt>
    </div>
  ),
};

export const MultipleBreakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Description>
        The colored box below is wrapped in HideAt sm lg. It is hidden at sm and above, and also at lg and above. It is
        only visible below sm (xs).
      </Description>
      <HideAt sm lg>
        <Box>This content is hidden at sm and above, and also at lg and above.</Box>
      </HideAt>
    </div>
  ),
};

const BreakpointOverviewTemplate: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <Description>
      Each colored box is hidden at the specified breakpoint and above. Resize the viewport to see boxes appear as you
      go below their threshold.
    </Description>
    <HideAt xs>
      <Box color="#fde8e8">Hidden at xs and above</Box>
    </HideAt>
    <HideAt sm>
      <Box color="#fef3e2">Hidden at sm and above</Box>
    </HideAt>
    <HideAt md>
      <Box color="#fefce8">Hidden at md and above</Box>
    </HideAt>
    <HideAt lg>
      <Box color="#e8fde8">Hidden at lg and above</Box>
    </HideAt>
    <HideAt xl>
      <Box color="#e8f4fd">Hidden at xl and above</Box>
    </HideAt>
    <HideAt xxl>
      <Box color="#f0e8fd">Hidden at xxl and above</Box>
    </HideAt>
  </div>
);

export const BreakpointOverview: Story = {
  render: BreakpointOverviewTemplate,
};
