import { Meta, StoryObj } from '@storybook/react-vite';

import { VISUAL_TEST_VIEWPORTS, VisualTestStory } from '../../../../../.storybook/visual-test-story';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Card } from '../card';
import Collapse from './collapse';

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

/** Chromatic snapshot for Collapse: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false, viewports: VISUAL_TEST_VIEWPORTS } },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <VisualTestStory story={Default} component={Collapse} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon only</Text>
        <VisualTestStory story={IconOnly} component={Collapse} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Secondary arrow</Text>
        <VisualTestStory story={SecondaryArrow} component={Collapse} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Full row toggle</Text>
        <VisualTestStory story={FullRowToggle} component={Collapse} />
      </VerticalSpacing>
      <Card backgroundColor="brand-primary" borderless>
        <Card.Content>
          <VerticalSpacing size={0.5}>
            <Text modifiers="bold" color="white">
              Inverted
            </Text>
            <VisualTestStory story={Inverted} component={Collapse} />
          </VerticalSpacing>
        </Card.Content>
      </Card>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Without underline</Text>
        <VisualTestStory story={WithoutUnderline} component={Collapse} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Nested</Text>
        <VisualTestStory story={Nested} component={Collapse} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
