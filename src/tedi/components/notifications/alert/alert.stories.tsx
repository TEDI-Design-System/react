import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Link from '../../navigation/link/link';
import Alert, { AlertProps } from '../alert/alert';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4263-61880&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/63ede6-alert" target="_blank">Zeroheight ↗</a>
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
    chromatic: { disableSnapshot: true },
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

const sizeArray: AlertProps['size'][] = ['default', 'small'];

const TypesTemplate: StoryFn<AlertProps> = (args) => (
  <VerticalSpacing size={1}>
    {alertTypes.map(({ type, icon }) => (
      <Alert key={type} type={type} icon={icon} {...args}>
        This is a {type} alert.
      </Alert>
    ))}
  </VerticalSpacing>
);

interface TemplateMultipleProps<Type = AlertProps['size']> extends AlertProps {
  array: Type[];
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, ...alertProps } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={2}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col className="d-flex">
            <Alert key={alertProps.type} {...alertProps} size={array[key]}>
              Content description
            </Alert>
          </Col>
        </Row>
      ))}
    </div>
  );
};

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

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: sizeArray,
    type: 'info',
    children: 'Content description',
    onClose: () => null,
  },
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

/**
 * The `action` prop fills the right slot of the alert with any ReactNode —
 * here a CTA button that takes the user somewhere relevant.
 *
 * **Note:** when `action` is set, the default close button is ignored even if
 * `onClose` is also passed. The slot is single-purpose — if you need both a
 * CTA and a dismiss control, render both inside `action` (e.g. wrap them in
 * a flex `<div>` with a small gap).
 */
export const WithActionButton: Story = {
  args: {
    type: 'warning',
    icon: 'warning',
    children: 'Your account is missing a profile photo — add one so colleagues can recognise you in shared documents.',
    action: (
      <Button visualType="secondary" iconRight="arrow_forward">
        Open profile
      </Button>
    ),
  },
};

/** Chromatic snapshot for Alert: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <Alert {...Default.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Sizes</Text>
        <TemplateColumn array={sizeArray} type="info" onClose={() => null}>
          Content description
        </TemplateColumn>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Headless</Text>
        <Alert>Content description</Alert>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Global</Text>
        <WithAndWithoutHeading {...Global.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Without side borders</Text>
        <WithAndWithoutHeading {...WithoutSideBorders.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">With icon</Text>
        <WithAndWithoutHeading {...WithIcon.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">With close button</Text>
        <WithAndWithoutHeading {...WithCloseButton.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Alert types</Text>
        <TypesTemplate {...AlertTypes.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Without title, long text</Text>
        <Alert {...WithoutTitleLongText.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Without title, long text and closing button</Text>
        <Alert {...WithoutTitleLongTextAndClosingButton.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">With title, long text and closing button</Text>
        <Alert {...WithTitleLongTextAndClosingButton.args} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">With action button</Text>
        <Alert {...WithActionButton.args} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
