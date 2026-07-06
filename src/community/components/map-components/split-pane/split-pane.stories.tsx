import type { Meta, StoryObj } from '@storybook/react-vite';
import { JSX } from 'react';

import SplitPane, { SplitPaneProps } from './split-pane';

/**
 * `SplitPane` renders two panes separated by a draggable divider. Dragging the divider (mouse, touch,
 * or keyboard) reallocates the size ratio between the panes, clamped to 20–80%.
 */
const meta: Meta<typeof SplitPane> = {
  component: SplitPane,
  title: 'Community/Map components/SplitPane',
};

export default meta;
type Story = StoryObj<typeof SplitPane>;

const demoPane = (label: string, background: string): JSX.Element => (
  <div style={{ display: 'grid', width: '100%', height: '100%', placeItems: 'center', background }}>{label}</div>
);

const Template = (args: SplitPaneProps): JSX.Element => (
  <div style={{ width: '800px', height: '400px' }}>
    <SplitPane {...args} />
  </div>
);

export const Horizontal: Story = {
  render: Template,
  args: {
    direction: 'horizontal',
    first: demoPane('First', 'var(--tedi-primary-100)'),
    second: demoPane('Second', 'var(--tedi-primary-200)'),
  },
};

export const Vertical: Story = {
  render: Template,
  args: { ...Horizontal.args, direction: 'vertical' },
};

export const WithHighlightedSide: Story = {
  render: Template,
  args: { ...Horizontal.args, highlightedSide: 'first' },
};

export const WithCloseButton: Story = {
  render: Template,
  args: { ...Horizontal.args, onClose: () => undefined },
};

export const CustomInitialRatio: Story = {
  render: Template,
  args: { ...Horizontal.args, initialRatio: 70 },
};
