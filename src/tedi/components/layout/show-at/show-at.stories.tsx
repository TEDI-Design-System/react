import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { ShowAt } from './show-at';

const meta: Meta<typeof ShowAt> = {
  component: ShowAt,
  title: 'Tedi-Ready/Layout/ShowAt',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShowAt>;

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
        The colored box below is wrapped in ShowAt md. It is only visible at the md breakpoint and above. Resize the
        viewport below md to see it disappear.
      </Description>
      <ShowAt md>
        <Box>This content is only visible at md and above.</Box>
      </ShowAt>
    </div>
  ),
};

export const MultipleBreakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Description>
        The colored box below is wrapped in ShowAt sm lg. It is visible at sm and above, or at lg and above. It is
        hidden below sm (xs).
      </Description>
      <ShowAt sm lg>
        <Box>This content is visible at sm and above, or at lg and above.</Box>
      </ShowAt>
    </div>
  ),
};

const BreakpointOverviewTemplate: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <Description>
      Each colored box is visible at the specified breakpoint and above. Resize the viewport to see boxes disappear as
      you go below their threshold.
    </Description>
    <ShowAt xs>
      <Box color="#fde8e8">Visible at xs and above</Box>
    </ShowAt>
    <ShowAt sm>
      <Box color="#fef3e2">Visible at sm and above</Box>
    </ShowAt>
    <ShowAt md>
      <Box color="#fefce8">Visible at md and above</Box>
    </ShowAt>
    <ShowAt lg>
      <Box color="#e8fde8">Visible at lg and above</Box>
    </ShowAt>
    <ShowAt xl>
      <Box color="#e8f4fd">Visible at xl and above</Box>
    </ShowAt>
    <ShowAt xxl>
      <Box color="#f0e8fd">Visible at xxl and above</Box>
    </ShowAt>
  </div>
);

export const BreakpointOverview: Story = {
  render: BreakpointOverviewTemplate,
};
