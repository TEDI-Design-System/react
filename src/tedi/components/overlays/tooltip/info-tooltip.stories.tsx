import { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../../content/label/label';
import { InfoTooltip } from './info-tooltip';

/**
 * `InfoTooltip` is the standard "ⓘ + tooltip" pattern — an `InfoButton` that reveals a `Tooltip` on hover/focus.
 */
const meta: Meta<typeof InfoTooltip> = {
  component: InfoTooltip,
  title: 'TEDI-Ready/Components/Overlay/InfoTooltip',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoTooltip>;

export const Default: Story = {
  args: {
    children: 'Lisainfo väljal',
  },
};

/**
 * Typical usage — a trailing info affix next to a form label. `Label` renders
 * this exact pattern via its `tooltip` prop (it uses `InfoTooltip` internally and
 * places the trigger outside the `<label>`), so you rarely compose it by hand.
 */
export const InLabelRow: Story = {
  render: () => (
    <Label htmlFor="city" required tooltip="Sisestage linn, kus te praegu elate.">
      Linn
    </Label>
  ),
};
