import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import Popover from '../../overlays/popover/popover';
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
 * Resize the window to see that the ellipsis and popover appear only when content doesn't fit
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
 * Example when popover is shown even when text doesn't ellipse.
 * Use this when you want to show popover always or with custom content
 */
export const ResponsiveWithCustomPopover: Story = {
  args: {
    lineClamp: 1,
    popover: false,
    children: (
      <Popover openWith="hover" focusManager={{ modal: false }}>
        <Popover.Trigger>
          <span>
            Any inline <b>content (even bold)</b>, that is too long for the wrapper
            <span className="text-small"> and dont fit in x number of rows</span>
          </span>
        </Popover.Trigger>
        <Popover.Content>Custom popover content, shown also when text doesn&apos;t Ellipse</Popover.Content>
      </Popover>
    ),
  },
};
