import { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { FeedbackText, FeedbackTextProps } from './feedback-text';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.65.83?node-id=9165-62054&m=dev" target="_blank">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/67d4de-feedbacktext" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof FeedbackText> = {
  component: FeedbackText,
  title: 'TEDI-Ready/Components/Form/FeedbackText',
  parameters: {
    status: {
      type: ['devComponent'],
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackText>;

export const Helper: Story = {
  args: {
    text: 'I am a hint text',
  },
};

export const Error: Story = {
  args: {
    text: 'I am an error text',
    type: 'error',
  },
};

export const Valid: Story = {
  args: {
    text: 'I am a valid text',
    type: 'valid',
  },
};

export const PositionLeft: Story = {
  args: {
    text: 'I am a hint text',
    position: 'left',
  },
};

export const PositionRight: Story = {
  args: {
    text: 'I am a valid text',
    type: 'valid',
    position: 'right',
  },
};

const visualTestVariants: { label: string; props: FeedbackTextProps }[] = [
  { label: 'Helper', props: { text: 'I am a hint text' } },
  { label: 'Error', props: { text: 'I am an error text', type: 'error' } },
  { label: 'Valid', props: { text: 'I am a valid text', type: 'valid' } },
  { label: 'Position left', props: { text: 'I am a hint text', position: 'left' } },
  { label: 'Position right', props: { text: 'I am a valid text', type: 'valid', position: 'right' } },
];

/** Chromatic snapshot for FeedbackText: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VerticalSpacing>
      {visualTestVariants.map(({ label, props }) => (
        <Row key={label}>
          <Col lg={2} xs={12}>
            <Text modifiers="bold">{label}</Text>
          </Col>
          <Col>
            <FeedbackText {...props} />
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  ),
};
