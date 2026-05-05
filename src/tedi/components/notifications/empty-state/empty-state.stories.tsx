import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../buttons/button/button';
import { Card, CardContent } from '../../cards/card';
import { Link } from '../../navigation/link/link';
import type { EmptyStateProps } from './empty-state';
import { EmptyState } from './empty-state';

/**
 * EmptyState communicates that there is nothing to display — empty search
 * results, an unpopulated list, a freshly-created workspace — and optionally
 * guides the user toward the next step via action buttons or a link.
 *
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=2413-40492&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/6792c3-empty-state" target="_BLANK">Zeroheight ↗</a>
 */
const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'TEDI-Ready/Components/Helpers/EmptyState',
  argTypes: {
    icon: { control: false },
    heading: { control: false },
    actions: { control: false },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=2413-40492&m=dev',
    },
  },
};
export default meta;

type Story = StoryObj<EmptyStateProps>;

export const Default: Story = {
  args: {
    children: 'You have no data to display',
  },
};

export const WithPrimaryAction: Story = {
  args: {
    children: 'You have no data to display',
    actions: (
      <Button type="button" iconLeft="add">
        Create new
      </Button>
    ),
  },
};

export const WithSecondaryAction: Story = {
  args: {
    children: 'You have no data to display',
    actions: (
      <Button type="button" visualType="secondary" iconLeft="add">
        Create new
      </Button>
    ),
  },
};

export const WithLink: Story = {
  args: {
    children: 'You have no data to display',
    actions: (
      <Link href="#" iconRight="arrow_forward">
        Read more
      </Link>
    ),
  },
};

export const WithHeading: Story = {
  args: {
    icon: 'event_busy',
    heading: 'Choose new time',
    children: 'You have no data to display',
    actions: <Button type="button">Choose time</Button>,
  },
};

export const Minimal: Story = {
  args: {
    icon: null,
    children: 'You have no data to display',
  },
};

export const SmallPadding: Story = {
  args: {
    children: 'You have no data to display',
    size: 'small',
    actions: (
      <>
        <Button type="button" iconLeft="add">
          Create new
        </Button>
        <Button type="button" visualType="secondary" iconRight="arrow_forward">
          Read more
        </Button>
      </>
    ),
  },
};

export const Separate: Story = {
  args: {
    children: 'You have no data to display',
    type: 'separate',
  },
};

export const AttachedToComponent: Story = {
  render: () => (
    <div>
      <Card borderRadius={{ bottomLeft: false, bottomRight: false }}>
        <CardContent>Previous content</CardContent>
      </Card>
      <EmptyState type="attached">You have no data to display</EmptyState>
    </div>
  ),
};

export const InsideComponent: Story = {
  render: () => (
    <Card>
      <CardContent>
        <EmptyState type="inside">You have no data to display</EmptyState>
      </CardContent>
    </Card>
  ),
};

/**
 * Any ReactNode can be passed as `icon` — useful when you have a bespoke SVG
 * or illustration.
 */
export const CustomIcon: Story = {
  args: {
    children: 'No products in your cart',
    icon: { name: 'shopping_cart_off' },
  },
};
