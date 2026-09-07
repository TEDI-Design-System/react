import { Meta, StoryObj } from '@storybook/react-vite';
import { JSX, useState } from 'react';

import { Button, Card, Checkbox, Col, ISelectOption, Link, Row, Select, Text, TSelectValue } from '../../../../tedi';
import MapAccordion from '../map-accordion/map-accordion';
import { LeftPanel } from './left-panel';

const logo = (
  <img
    src="/logo.svg"
    alt="Maa- ja Ruumiamet logo"
    style={{ filter: 'brightness(0) saturate(100%) invert(100%)', height: '40px' }}
  />
);

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/TEDI-Map-Components-1.1.1?node-id=830-141920&m=dev" target="_BLANK">Figma ↗</a>
 */

const meta: Meta<typeof LeftPanel> = {
  component: LeftPanel,
  title: 'Community/Map components/LeftPanel',
  subcomponents: {
    'LeftPanel.Header': LeftPanel.Header,
    'LeftPanel.Content': LeftPanel.Content,
    'LeftPanel.Footer': LeftPanel.Footer,
  } as never,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    icon: logo,
  },
};

export default meta;
type Story = StoryObj<typeof LeftPanel>;

interface MapLayer {
  id: string;
  visible: boolean;
}

const MOCK_LAYERS: MapLayer[] = [
  { id: 'Katastripiirid', visible: true },
  { id: 'Aadressandmed', visible: false },
  { id: 'Ortofoto', visible: true },
];

const MANY_LAYERS: MapLayer[] = Array.from({ length: 50 }, (_, index) => ({
  id: `Kaardikiht ${index + 1}`,
  visible: index % 3 === 0,
}));

const MOCK_TOPICS: ISelectOption[] = [
  { value: 'yldkaart', label: 'Üldkaart' },
  { value: 'kataster', label: 'Kataster' },
  { value: 'planeeringud', label: 'Planeeringud' },
];

const TopicList = (): JSX.Element => {
  const [selected, setSelected] = useState<ISelectOption | null>(MOCK_TOPICS[0]);

  const handleChange = (value: TSelectValue): void => {
    if (!value || Array.isArray(value)) {
      return;
    }

    setSelected(value as ISelectOption);
  };

  return (
    <Card borderless>
      <Card.Content padding={0.5}>
        <Row gutterY={2}>
          <Col>
            <Select id="topic-list" label="Teemakaart" value={selected} options={MOCK_TOPICS} onChange={handleChange} />
          </Col>
        </Row>
      </Card.Content>
    </Card>
  );
};

const LayersContent = ({ initialLayers = MOCK_LAYERS }: { initialLayers?: MapLayer[] }): JSX.Element => {
  const [layers, setLayers] = useState<MapLayer[]>(initialLayers);

  const setLayerVisibility = (id: string, checked: boolean): void => {
    setLayers((prev) => prev.map((layer) => (layer.id === id ? { ...layer, visible: checked } : layer)));
  };

  return (
    <>
      <TopicList />
      <MapAccordion defaultOpenItem={['kihid']}>
        <MapAccordion.Item id="kihid">
          <MapAccordion.Header title="Kihid" />
          <MapAccordion.Content>
            {layers.map((layer) => (
              <div key={layer.id} data-layer-id={layer.id}>
                <Checkbox
                  id={layer.id}
                  label={layer.id}
                  name={layer.id}
                  value={layer.id}
                  checked={layer.visible}
                  onChange={(_value: string, checked: boolean) => {
                    setLayerVisibility(layer.id, checked);
                  }}
                />
              </div>
            ))}
          </MapAccordion.Content>
        </MapAccordion.Item>
      </MapAccordion>
    </>
  );
};

const sampleHeader = (
  <Button visualType="link" color="inverted" iconLeft="logout">
    Logi sisse
  </Button>
);

const sampleFooter = (
  <>
    <Row>
      <Col width="auto">
        <Text color="secondary" modifiers="small">
          Tehniline tugi
        </Text>
      </Col>
      <Col>
        <Link href="#" size="small">
          kaardirakendus@maaruum.ee
        </Link>
      </Col>
    </Row>
    <Row>
      <Col width="auto">
        <Text color="secondary" modifiers="small">
          Telefon
        </Text>
      </Col>
      <Col>
        <Link href="#" size="small">
          6 650 600
        </Link>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="secondary" modifiers="small">
          Maa- ja Ruumiamet. Kõik õigused kaitstud.
        </Text>
      </Col>
    </Row>
  </>
);

export const Default: Story = {
  render: (args) => (
    <LeftPanel {...args}>
      <LeftPanel.Header>{sampleHeader}</LeftPanel.Header>
      <LeftPanel.Content>
        <LayersContent />
      </LeftPanel.Content>
      <LeftPanel.Footer>{sampleFooter}</LeftPanel.Footer>
    </LeftPanel>
  ),
};

export const WithoutFooter: Story = {
  render: (args) => (
    <LeftPanel {...args}>
      <LeftPanel.Header>{sampleHeader}</LeftPanel.Header>
      <LeftPanel.Content>
        <LayersContent />
      </LeftPanel.Content>
    </LeftPanel>
  ),
};

export const FixedWidth: Story = {
  args: {
    resizable: false,
    width: 400,
  },
  render: (args) => (
    <LeftPanel {...args}>
      <LeftPanel.Header>{sampleHeader}</LeftPanel.Header>
      <LeftPanel.Content>
        <LayersContent />
      </LeftPanel.Content>
      <LeftPanel.Footer>{sampleFooter}</LeftPanel.Footer>
    </LeftPanel>
  ),
};

export const Scrollable: Story = {
  render: (args) => (
    <LeftPanel {...args}>
      <LeftPanel.Header>{sampleHeader}</LeftPanel.Header>
      <LeftPanel.Content>
        <LayersContent initialLayers={MANY_LAYERS} />
      </LeftPanel.Content>
      <LeftPanel.Footer>{sampleFooter}</LeftPanel.Footer>
    </LeftPanel>
  ),
};

export const NoIcon: Story = {
  args: {
    icon: undefined,
  },
  render: (args) => (
    <LeftPanel {...args}>
      <LeftPanel.Header>{sampleHeader}</LeftPanel.Header>
      <LeftPanel.Content>
        <LayersContent />
      </LeftPanel.Content>
      <LeftPanel.Footer>{sampleFooter}</LeftPanel.Footer>
    </LeftPanel>
  ),
};

const ControlledExternallyDemo = (): JSX.Element => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem' }}>
      <LeftPanel icon={logo} open={open} onOpenChange={setOpen} hideCloseButton hideOpenButton>
        <LeftPanel.Header>{sampleHeader}</LeftPanel.Header>
        <LeftPanel.Content>
          <LayersContent />
        </LeftPanel.Content>
        <LeftPanel.Footer>{sampleFooter}</LeftPanel.Footer>
      </LeftPanel>
      <Button onClick={() => setOpen((prev) => !prev)}>{open ? 'Peida paneel' : 'Näita paneeli'}</Button>
    </div>
  );
};

export const ControlledExternally: Story = {
  render: () => <ControlledExternallyDemo />,
};
