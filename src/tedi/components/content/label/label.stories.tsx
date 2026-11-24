import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { VisualTestStory } from '../../../../../.storybook/visual-test-story';
import { Text } from '../../base/typography/text/text';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Label, LabelProps } from './label';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.102.102?m=dev&node-id=5797-117046" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/64479c-label" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'TEDI-Ready/Content/Label',
  argTypes: {
    tooltip: { control: false },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=2137-19322&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const Default: Story = {
  render: Template,

  args: {
    children: 'Toimeaine',
  },
};

export const Required: Story = {
  render: Template,
  name: 'Required field',

  args: {
    children: 'Toimeaine',
    required: true,
  },
};

export const DefaultBold: Story = {
  render: Template,
  name: 'Bold',

  args: {
    children: 'Toimeaine',
    isBold: true,
  },
};

export const RequiredBold: Story = {
  render: Template,
  name: 'Bold Required field',

  args: {
    children: 'Toimeaine',
    required: true,
    isBold: true,
  },
};

export const InfoButtonStory: Story = {
  render: Template,

  args: {
    children: 'Toimeaine',
    required: true,
    tooltip: 'Lisainfo',
  },
};

export const DefaultSmall: Story = {
  render: Template,

  args: {
    children: 'Toimeaine',
    isSmall: true,
  },
};

export const DefaultSmallBold: Story = {
  render: Template,

  args: {
    children: 'Toimeaine',
    isBold: true,
    isSmall: true,
  },
};

const visualTestVariants: { label: string; story: Story }[] = [
  { label: 'Default', story: Default },
  { label: 'Required field', story: Required },
  { label: 'Bold', story: DefaultBold },
  { label: 'Bold required field', story: RequiredBold },
  { label: 'Info button', story: InfoButtonStory },
  { label: 'Small', story: DefaultSmall },
  { label: 'Small bold', story: DefaultSmallBold },
];

/** Chromatic snapshot for Label: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VerticalSpacing size={1}>
      {visualTestVariants.map(({ label, story }) => (
        <VerticalSpacing key={label} size={0.25}>
          <Text modifiers="bold">{label}</Text>
          <VisualTestStory story={story} />
        </VerticalSpacing>
      ))}
    </VerticalSpacing>
  ),
};
