import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

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

const visualTestVariants: { label: string; props: Omit<LabelProps, 'children'> }[] = [
  { label: 'Default', props: {} },
  { label: 'Required field', props: { required: true } },
  { label: 'Bold', props: { isBold: true } },
  { label: 'Bold required field', props: { required: true, isBold: true } },
  { label: 'Info button', props: { required: true, tooltip: 'Lisainfo' } },
  { label: 'Small', props: { isSmall: true } },
  { label: 'Small bold', props: { isBold: true, isSmall: true } },
];

/** Chromatic snapshot for Label: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VerticalSpacing size={1}>
      {visualTestVariants.map(({ label, props }) => (
        <VerticalSpacing key={label} size={0.25}>
          <Text modifiers="bold">{label}</Text>
          <Label {...props}>Toimeaine</Label>
        </VerticalSpacing>
      ))}
    </VerticalSpacing>
  ),
};
