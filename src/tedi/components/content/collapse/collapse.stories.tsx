import { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Card } from '../card';
import Collapse, { CollapseProps } from './collapse';

const meta: Meta<typeof Collapse> = {
  component: Collapse,
  title: 'TEDI-Ready/Content/Collapse',
  parameters: {
    chromatic: { disableSnapshot: true },
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
  argTypes: {
    title: { control: false },
    children: { control: false },
  },
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

const storyArgs = (story: Story) => story.args as CollapseProps;

/** Chromatic snapshot for Collapse: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <Collapse {...storyArgs(Default)} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon only</Text>
        <Collapse {...storyArgs(IconOnly)} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Secondary arrow</Text>
        <Collapse {...storyArgs(SecondaryArrow)} />
      </VerticalSpacing>
      <Card background="brand-primary" borderless>
        <Card.Content>
          <VerticalSpacing size={0.5}>
            <Text modifiers="bold" color="white">
              Inverted
            </Text>
            <Collapse {...storyArgs(Inverted)} />
          </VerticalSpacing>
        </Card.Content>
      </Card>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Without underline</Text>
        <Collapse {...storyArgs(WithoutUnderline)} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Nested</Text>
        <Collapse {...storyArgs(Nested)} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
