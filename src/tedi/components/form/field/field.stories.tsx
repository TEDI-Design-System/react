import { Meta, StoryObj } from '@storybook/react-vite';

import { Field } from './field';

const meta: Meta<typeof Field> = {
  component: Field,
  title: 'TEDI-Ready/Components/Form/Field',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    id: 'field-1',
  },
};
