import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { VerticalSpacing } from '../../layout/vertical-spacing';
import Link from '../../navigation/link/link';
import Alert, { AlertProps } from '../alert/alert';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4263-61880&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/63ede6-alert" target="_blank">Zeroheight ↗</a>
 */

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'TEDI-Ready/Components/Notifications/Alert',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4263-61880&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const alertTypes: { type: AlertProps['type']; icon: string }[] = [
  { type: 'info', icon: 'info' },
  { type: 'success', icon: 'check_circle' },
  { type: 'warning', icon: 'warning' },
  { type: 'danger', icon: 'error' },
];

const TypesTemplate: StoryFn<AlertProps> = (args) => (
  <VerticalSpacing size={1}>
    {alertTypes.map(({ type, icon }) => (
      <Alert key={type} type={type} icon={icon} {...args}>
        This is a {type} alert.
      </Alert>
    ))}
  </VerticalSpacing>
);

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;
export const Default: Story = {
  args: {
    title: 'Title',
    children: (
      <>
        Content description. <Link href="#">Inline link example</Link>
      </>
    ),
  },
};

const WithAndWithoutHeading: StoryFn<AlertProps> = (args) => {
  return (
    <VerticalSpacing size={1}>
      <Alert title="Title" {...args}>
        {args.children}
      </Alert>
      <Alert {...args}>{args.children}</Alert>
    </VerticalSpacing>
  );
};

export const Headless: Story = {
  render: Template,
  args: {
    children: 'Content description',
  },
};

export const Global: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: 'Content description',
    isGlobal: true,
  },
};

export const WithoutSideBorders: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: 'Content description',
    noSideBorders: true,
  },
};

export const WithIcon: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: 'Content description',
    icon: 'check_circle',
  },
};

export const WithCloseButton: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: 'Content description',
    onClose: () => null,
  },
};

export const AlertTypes: Story = {
  render: TypesTemplate,
  args: {
    children: 'Content description',
    onClose: () => null,
  },
};

export const WithoutTitleLongText: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in. Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus. Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo. Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.',
    type: 'warning',
    icon: 'warning',
  },
  render: (args) => {
    return <Alert {...args} />;
  },
};

export const WithoutTitleLongTextAndClosingButton: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in. Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus. Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo. Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.',
    type: 'info',
    icon: 'info',
    onClose: () => null,
  },
  render: (args) => {
    return <Alert {...args} />;
  },
};

export const WithTitleLongTextAndClosingButton: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in. Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus. Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo. Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.',
    type: 'danger',
    title: 'Title',
    icon: 'error',
    onClose: () => null,
  },
  render: (args) => {
    return <Alert {...args} />;
  },
};
