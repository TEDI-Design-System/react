import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { ProgressBar, ProgressBarProps } from './progress-bar';

const sizeArray: { label: string; small: boolean }[] = [
  { label: 'Default', small: false },
  { label: 'Small', small: true },
];

const SizesTemplate: StoryFn = () => (
  <div className="example-list">
    {sizeArray.map((row, index) => (
      <Row className={`${index === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={row.label}>
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">{row.label}</Text>
        </Col>
        <Col md={6} xs={12} className="d-flex">
          <ProgressBar
            value={60}
            small={row.small}
            ariaLabel="Upload progress"
            helper={{ text: 'This could take a few minutes.', type: 'hint' }}
          />
        </Col>
      </Row>
    ))}
  </div>
);

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=25616-189000&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'TEDI-Ready/Components/Helpers/ProgressBar',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=25616-189000&m=dev',
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const Template: StoryFn<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Default: Story = {
  render: Template,
  args: { value: 60, ariaLabel: 'Upload progress' },
};

export const Sizes: Story = {
  render: SizesTemplate,
};

export const WithLabelTop: Story = {
  render: Template,
  args: { value: 20, label: 'Upload progress', labelPosition: 'top' },
};

export const WithLabelHorizontal: Story = {
  render: Template,
  args: { value: 75, label: 'Upload progress', labelPosition: 'horizontal' },
};

export const Required: Story = {
  render: Template,
  args: { value: 30, label: 'Upload progress', required: true },
};

export const ValueBelow: Story = {
  render: Template,
  args: {
    value: 55,
    label: 'Upload progress',
    valuePosition: 'bottom',
  },
};

export const WithHint: Story = {
  render: Template,
  args: {
    value: 50,
    ariaLabel: 'Upload progress',
    helper: { text: 'Uploading', type: 'hint' },
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    value: 50,
    ariaLabel: 'Upload progress',
    helper: { text: 'Uploading failed. Try again', type: 'error' },
  },
};

export const ValueBelowWithHint: Story = {
  render: Template,
  args: {
    value: 55,
    ariaLabel: 'Upload progress',
    valuePosition: 'bottom',
    helper: { text: 'This could take few minutes.', type: 'hint' },
  },
};

export const CustomValueLabel: Story = {
  render: Template,
  args: {
    value: 20,
    label: 'Step',
    valueLabel: '1 / 5',
  },
};

export const ValueHidden: Story = {
  render: Template,
  args: {
    value: 60,
    ariaLabel: 'Upload progress',
    showValue: false,
  },
};

/**
 * Use `ProgressBar` as a busy / loader indicator by owning the `value` from
 * outside the component — there's no built-in indeterminate animation, but a
 * stateful consumer can drive the bar however it likes.
 */
export const Animated: Story = {
  render: function AnimatedStory() {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const id = window.setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 5));
      }, 300);
      return () => window.clearInterval(id);
    }, []);
    return <ProgressBar value={value} label="Live progress" />;
  },
};
