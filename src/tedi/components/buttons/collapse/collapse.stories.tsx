import { Meta, StoryObj } from '@storybook/react-vite';

import { LabelProvider } from '../../../providers/label-provider';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Collapse from './collapse';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/9469bf-collapse" target="_BLANK">Zeroheight ↗</a>
 *
 * The toggle is a `CollapseButton`; clicking it (not the title) expands/collapses the content.
 */
const meta: Meta<typeof Collapse> = {
  component: Collapse,
  title: 'Tedi-ready/Components/Buttons/Collapse',
  parameters: {
    status: {
      type: [
        'devComponent',
        { name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' },
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&m=dev',
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  decorators: [
    // Estonian examples → surface the Estonian "Ava" / "Sulge" toggle labels by default.
    (Story) => (
      <LabelProvider locale="et">
        <Story />
      </LabelProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
  args: {
    id: 'collapse-default',
    openText: 'Näita rohkem',
    closeText: 'Näita vähem',
    title: (
      <Heading element="h5" color="secondary">
        Juhtumi üldandmed
      </Heading>
    ),
    children: (
      <VerticalSpacing>
        <Text color="secondary">Laste osalus</Text>
        <Text>Peretüli lapse osaluseta</Text>
      </VerticalSpacing>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    id: 'collapse-icon-only',
    iconOnly: true,
    toggleLabel: 'Näita detaile',
    children: <Text>Sisu ilma pealkirjata.</Text>,
  },
};

export const SecondaryArrow: Story = {
  args: {
    id: 'collapse-secondary',
    iconOnly: true,
    arrowType: 'secondary',
    toggleLabel: 'Näita detaile',
    children: <Text>Sisu.</Text>,
  },
};

export const Inverted: Story = {
  globals: { backgrounds: { value: 'brand' } },
  args: {
    id: 'collapse-inverted',
    inverted: true,
    openText: 'Näita rohkem',
    closeText: 'Näita vähem',
    children: (
      <Text color="white" element="span">
        Sisu tumedal taustal.
      </Text>
    ),
  },
};

export const WithoutUnderline: Story = {
  args: {
    ...Default.args,
    id: 'collapse-no-underline',
    underline: false,
  },
};

/** Clicking anywhere on the header row toggles (the chevron stays the keyboard / SR control). */
export const FullRowToggle: Story = {
  args: {
    ...Default.args,
    id: 'collapse-full-row',
    fullRowToggle: true,
  },
};

export const Nested: Story = {
  args: {
    id: 'parent-collapse',
    title: (
      <Heading element="h5" color="secondary">
        Ülemine plokk
      </Heading>
    ),
    children: (
      <VerticalSpacing>
        <Text>Ülemise ploki sisu enne alamplokki.</Text>
        <Collapse
          id="child-collapse"
          title={
            <Heading element="h6" color="secondary">
              Alamplokk
            </Heading>
          }
        >
          <Text>Pesastatud alamploki sisu.</Text>
        </Collapse>
      </VerticalSpacing>
    ),
  },
};
