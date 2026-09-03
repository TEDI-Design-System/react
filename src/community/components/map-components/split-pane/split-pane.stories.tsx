import type { Meta, StoryObj } from '@storybook/react-vite';
import { JSX } from 'react';

import SplitPane, { SplitPaneProps } from './split-pane';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/TEDI-Map-Components-1.1.1?node-id=347-72394&t=UN6CIlRIfpadwwCZ-0" target="_BLANK">Figma ↗</a>
 *
 * `SplitPane` renders two panes separated by a draggable divider. Dragging the divider (mouse, touch,
 * or keyboard) reallocates the size ratio between the panes, clamped to 20–80%.
 */
const meta: Meta<typeof SplitPane> = {
  component: SplitPane,
  title: 'Community/Map components/SplitPane',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/TEDI-Map-Components-1.1.1?node-id=347-72394&t=UN6CIlRIfpadwwCZ-0',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplitPane>;

const demoPane = (label: string, background: string): JSX.Element => (
  <div style={{ display: 'grid', width: '100%', height: '100%', placeItems: 'center', background }}>{label}</div>
);

const Template = (args: SplitPaneProps): JSX.Element => (
  <div style={{ width: '100%', maxWidth: '800px', height: '400px' }}>
    <SplitPane {...args} />
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    direction: 'horizontal',
    first: demoPane('First', 'var(--tedi-primary-100)'),
    second: demoPane('Second', 'var(--tedi-primary-200)'),
  },
};

export const Vertical: Story = {
  render: Template,
  args: { ...Default.args, direction: 'vertical' },
};

export const WithHighlightedSide: Story = {
  render: Template,
  args: { ...Default.args, highlightedSide: 'first' },
};

export const WithCloseButton: Story = {
  render: Template,
  args: { ...Default.args, onClose: () => undefined },
};

export const CustomInitialRatio: Story = {
  render: Template,
  args: { ...Default.args, initialRatio: 70 },
};
