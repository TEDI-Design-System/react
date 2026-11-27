import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { VISUAL_TEST_VIEWPORTS, VisualTestStory } from '../../../../../.storybook/visual-test-story';
import { Text } from '../../base/typography/text/text';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Tooltip from '../../overlays/tooltip/tooltip';
import Ellipsis, { EllipsisProps } from './ellipsis';

/**
 * <a href="https://www.tedi.ee/1ee8444b7/p/87ef9b-ellipsis" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Ellipsis> = {
  component: Ellipsis,
  title: 'TEDI-Ready/Components/Helpers/Ellipsis',
  parameters: {
    status: {
      type: ['devComponent'],
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Ellipsis>;

const Template: StoryFn<EllipsisProps> = (args) => (
  <div style={{ maxWidth: 200 }}>
    <Ellipsis {...args} />
  </div>
);

export const Default: Story = {
  render: Template,

  args: {
    children: (
      <span>
        Any inline <b>content (even bold)</b>, that is too long for the wrapper
        <span className="text-small"> and dont fit in x number of rows</span>
      </span>
    ),
  },
};

/**
 * Resize the window to see that the ellipsis and tooltip appear only when content doesn't fit
 */
export const ResponsiveExample: Story = {
  args: {
    lineClamp: 1,
    children: (
      <span>
        Any inline <b>content (even bold)</b>, that is too long for the wrapper
        <span className="text-small"> and dont fit in x number of rows</span>
      </span>
    ),
  },
};

/**
 * With `position="start"` the text is truncated on a single line with a **leading**
 * ellipsis, keeping the end of the string visible. Useful for file paths, URLs or IDs
 * where the tail is the most distinguishing part. `lineClamp` does not apply here.
 */
export const LeadingStart: Story = {
  render: Template,
  args: {
    position: 'start',
    children: 'https://www.tedi.ee/some/very/long/path/to/a/specific-resource-identifier.pdf',
  },
};

/**
 * Example when tooltip is shown even when text doesn't ellipse.
 * Use this when you want to show tooltip always or with custom content
 */
export const ResponsiveWithCustomPopover: Story = {
  args: {
    lineClamp: 1,
    popover: false,
    children: (
      <Tooltip>
        <Tooltip.Trigger>
          <span>
            Any inline <b>content (even bold)</b>, that is too long for the wrapper
            <span className="text-small"> and dont fit in x number of rows</span>
          </span>
        </Tooltip.Trigger>
        <Tooltip.Content>Custom tooltip content, shown also when text doesn&apos;t Ellipse</Tooltip.Content>
      </Tooltip>
    ),
  },
};

/** Chromatic snapshot for Ellipsis: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false, viewports: VISUAL_TEST_VIEWPORTS } },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <VisualTestStory story={Default} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Leading start</Text>
        <VisualTestStory story={LeadingStart} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Responsive</Text>
        <VisualTestStory story={ResponsiveExample} component={Ellipsis} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Responsive with custom tooltip</Text>
        <VisualTestStory story={ResponsiveWithCustomPopover} component={Ellipsis} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
