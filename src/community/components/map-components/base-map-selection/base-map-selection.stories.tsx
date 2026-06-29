import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Col, Row, Text, TextProps, VerticalSpacing } from '../../../../tedi';
import BaseMapOption, { BaseMapOptionProps } from './base-map-option';
import BaseMapSelection, { BaseMapSelectionProps } from './base-map-selection';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=179-24836&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/50746f-basemap-selection" target="_BLANK">ZeroHeight ↗</a>
 */
const meta: Meta<typeof BaseMapSelection> = {
  component: BaseMapSelection,
  title: 'Community/Map components/BaseMapSelection',
  subcomponents: {
    'BaseMapSelection.Option': BaseMapOption,
  } as never,
  parameters: {
    docs: {
      source: {
        transform: (code: string) => code.replaceAll('BaseMapOption', 'BaseMapSelection.Option'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseMapSelection>;

const MAP_IMG = 'https://snazzy-maps-cdn.azureedge.net/assets/72543-assassins-creed-iv.png';
const HISTORICAL_IMG = 'https://snazzy-maps-cdn.azureedge.net/assets/8097-wy.png';

const MAPS = [
  { id: 'streets', title: 'Kaart', src: MAP_IMG },
  { id: 'satellite', title: 'Satelliit', src: HISTORICAL_IMG },
  { id: 'hybrid', title: 'Hübriid', src: MAP_IMG },
];

const PlaygroundTemplate: StoryFn<BaseMapSelectionProps> = (args) => {
  const [active, setActive] = useState(MAPS[0].id);
  const [transparency, setTransparency] = useState(0);
  const activeMap = MAPS.find((map) => map.id === active) ?? MAPS[0];

  return (
    <BaseMapSelection
      {...args}
      title={activeMap.title}
      content={<img src={activeMap.src} alt={activeMap.title} />}
      transparency={transparency}
      onTransparencyChange={setTransparency}
    >
      {MAPS.map((map) => (
        <BaseMapSelection.Option
          key={map.id}
          id={map.id}
          type="selection"
          title={map.title}
          selected={map.id === active}
          onSelect={() => setActive(map.id)}
          content={<img src={map.src} alt={map.title} />}
        />
      ))}
    </BaseMapSelection>
  );
};

export const Default: Story = {
  render: PlaygroundTemplate,
  args: {
    id: 'basemap',
    title: 'Aluskaardid',
    showTransparency: false,
  },
};

export const WithTransparency: Story = {
  ...Default,
  args: {
    ...Default.args,
    showTransparency: true,
    transparencyLabel: 'Läbipaistvus',
  },
};

export const Multiple: Story = {
  ...Default,
  args: {
    ...Default.args,
    multiple: true,
  },
};

const optionStateArray = ['Default', 'Hover', 'Focus', 'Selected'];
type OptionTemplateProps<Type = typeof optionStateArray> = BaseMapOptionProps & {
  array: Type;
  titleColor: TextProps['color'];
};

const OptionStatesTemplate: StoryFn<OptionTemplateProps> = (args) => {
  const { array, titleColor } = args;

  return (
    <VerticalSpacing size={0.5}>
      {array.map((value, key) => (
        <Row key={key}>
          <Col md={2} className="display-flex align-items-center">
            <Text color={titleColor} modifiers="bold">
              {value}
            </Text>
          </Col>
          <Col className="display-flex align-items-center gap-3">
            <BaseMapOption {...args} selected={value === 'Selected'} id={value} />
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

/**
 * `BaseMapSelection.Option` cards. These are the items rendered inside the popover.
 * Also usable on their own (e.g. inside a `Carousel`).
 */
export const OptionStates: StoryObj<OptionTemplateProps> = {
  render: OptionStatesTemplate,
  args: {
    array: ['Default', 'Hover', 'Focus', 'Selected'],
    type: 'selection',
    title: 'Aluskaart',
    content: <img src={MAP_IMG} alt="Base map" />,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const OptionButton: StoryObj<OptionTemplateProps> = {
  render: OptionStatesTemplate,
  args: {
    array: ['Default', 'Hover', 'Focus'],
    type: 'button',
    title: 'Aluskaart',
    content: <img src={MAP_IMG} alt="Base map" />,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const OptionStack: StoryObj<OptionTemplateProps> = {
  render: OptionStatesTemplate,
  args: {
    array: ['Default', 'Hover', 'Focus'],
    type: 'button',
    title: 'Aluskaart',
    content: <img src={MAP_IMG} alt="Base map" />,
    multiple: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const OptionHistorical: StoryObj<OptionTemplateProps> = {
  render: OptionStatesTemplate,
  args: {
    array: ['Default', 'Hover', 'Focus', 'Selected'],
    type: 'historical',
    title: 'Ajalooline kaart',
    content: <img src={HISTORICAL_IMG} alt="Historical map" />,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};
