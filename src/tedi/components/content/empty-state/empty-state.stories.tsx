import type { Meta, StoryObj } from '@storybook/react-vite';

import { VISUAL_TEST_VIEWPORTS, VisualTestStory } from '../../../../../.storybook/visual-test-story';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Card, CardContent } from '../../content/card';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Link } from '../../navigation/link/link';
import type { EmptyStateProps } from './empty-state';
import { EmptyState } from './empty-state';

/**
 * EmptyState communicates that there is nothing to display — empty search
 * results, an unpopulated list, a freshly-created workspace — and optionally
 * guides the user toward the next step via action buttons or a link.
 *
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.65.81?node-id=2413-40492&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/6792c3-empty-state" target="_BLANK">Zeroheight ↗</a>
 */
const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'TEDI-Ready/Content/EmptyState',
  argTypes: {
    heading: { control: false },
    actions: { control: false },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.65.81?node-id=2413-40492&m=dev',
    },
  },
};
export default meta;

type Story = StoryObj<EmptyStateProps>;

export const Default: Story = {
  args: {
    children: 'Andmed puuduvad',
  },
};

export const WithPrimaryAction: Story = {
  args: {
    children: 'Andmed puuduvad',
    actions: (
      <Button type="button" iconLeft="add">
        Loo uus
      </Button>
    ),
  },
};

export const WithSecondaryAction: Story = {
  args: {
    children: 'Andmed puuduvad',
    actions: (
      <Button type="button" visualType="secondary" iconLeft="add">
        Loo uus
      </Button>
    ),
  },
};

export const WithLink: Story = {
  args: {
    children: 'Andmed puuduvad',
    actions: (
      <Link href="#" iconRight="arrow_forward">
        Loe rohkem
      </Link>
    ),
  },
};

export const WithHeading: Story = {
  args: {
    icon: 'event_busy',
    heading: 'Broneeri aeg',
    children: 'Andmed puuduvad',
    actions: <Button type="button">Vali aeg</Button>,
  },
};

export const Minimal: Story = {
  args: {
    icon: null,
    children: 'Andmed puuduvad',
  },
};

export const SmallPadding: Story = {
  args: {
    children: 'Andmed puuduvad',
    size: 'small',
    actions: (
      <>
        <Button type="button" iconLeft="add">
          Loo uus
        </Button>
        <Button type="button" visualType="secondary" iconRight="arrow_forward">
          Loe rohkem
        </Button>
      </>
    ),
  },
};

export const Separate: Story = {
  args: {
    children: 'Andmed puuduvad',
    type: 'separate',
  },
};

const AttachedToComponentTemplate = () => (
  <div>
    <Card borderRadius={{ bottomLeft: false, bottomRight: false }}>
      <CardContent>Previous content</CardContent>
    </Card>
    <EmptyState type="attached">Andmed puuduvad</EmptyState>
  </div>
);

export const AttachedToComponent: Story = {
  render: AttachedToComponentTemplate,
};

const InsideComponentTemplate = () => (
  <Card>
    <CardContent>
      <EmptyState type="inside">Andmed puuduvad</EmptyState>
    </CardContent>
  </Card>
);

export const InsideComponent: Story = {
  render: InsideComponentTemplate,
};

export const CustomIcon: Story = {
  args: {
    children: 'Ostukorvis pole tooteid',
    icon: { name: 'shopping_cart_off' },
  },
};

export const DifferentIconColor: Story = {
  args: {
    children: 'Andmed puuduvad',
    icon: { name: 'spa', color: 'tertiary' },
  },
};

const visualTestVariants: { label: string; story: Story }[] = [
  { label: 'Default', story: Default },
  { label: 'With primary action', story: WithPrimaryAction },
  { label: 'With secondary action', story: WithSecondaryAction },
  { label: 'With link', story: WithLink },
  { label: 'With heading', story: WithHeading },
  { label: 'Minimal', story: Minimal },
  { label: 'Small padding', story: SmallPadding },
  { label: 'Separate', story: Separate },
  { label: 'Attached to component', story: AttachedToComponent },
  { label: 'Inside component', story: InsideComponent },
  { label: 'Custom icon', story: CustomIcon },
  { label: 'Different icon color', story: DifferentIconColor },
];

/** Chromatic snapshot for EmptyState: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false, viewports: VISUAL_TEST_VIEWPORTS } },
  render: () => (
    <VerticalSpacing size={2}>
      {visualTestVariants.map(({ label, story }) => (
        <VerticalSpacing key={label} size={0.5}>
          <Text modifiers="bold">{label}</Text>
          <VisualTestStory story={story} component={EmptyState} />
        </VerticalSpacing>
      ))}
    </VerticalSpacing>
  ),
};
