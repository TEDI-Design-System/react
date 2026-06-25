import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { ButtonGroup } from '../../buttons/button-group/button-group';
import { CardContent } from '../../cards/card/card-content/card-content';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Ellipsis } from '../../misc/ellipsis/ellipsis';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { StatusIndicator } from '../../tags/status-indicator/status-indicator';
import { Tabs, TabsProps } from './tabs';
import { TabsContext } from './tabs-context';
import { TabsTrigger } from './tabs-trigger/tabs-trigger';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=3419-38773&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/9833df-tab" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'TEDI-Ready/Components/Navigation/Tabs',
  subcomponents: {
    'Tabs.List': Tabs.List,
    'Tabs.Trigger': Tabs.Trigger,
    'Tabs.Content': Tabs.Content,
  } as never,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=3419-38773&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const content = {
  healthTimeline:
    'Kronoloogiline ülevaade teie tervisesündmustest – visiidid, analüüsid ja diagnoosid on koondatud ühele ajateljele.',
  diseaseCourse: 'Diagnoositud haiguste ülevaade ja nende areng ajas koos ravi- ning jälgimismärkmetega.',
  medication: 'Teile välja kirjutatud ja väljastatud ravimite loetelu koos annuste ja manustamisperioodidega.',
  table: 'Andmed on kuvatud tabelina – sobib täpseks võrdluseks ja veergude kaupa sorteerimiseks.',
  grid: 'Andmed on kuvatud ruudustikuna – sobib visuaalseks sirvimiseks ja kiireks ülevaateks.',
  unreadMessages: 'Teil on uusi lugemata teateid tervishoiuteenuse osutajatelt. Avage teade üksikasjade nägemiseks.',
  declarations: 'Teie tahteavaldused, näiteks elundidoonorluse ja ravisoovide kohta.',
  proceduresInProgress: 'Hetkel töös olevad menetlused ja nende seis.',
  proceduresInPlanning: 'Menetlused, mis on planeeritud, kuid pole veel alanud.',
  calendar: 'Kalendrivaade teie eelseisvatest visiitidest ja tähtaegadest.',
};

const stateArray = ['Default', 'Hover', 'Active', 'Focus', 'Selected'];

interface TemplateStateProps extends TabsProps {
  array: typeof stateArray;
}

const noop = () => null;

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array } = args;

  return (
    <div className="state-example">
      {array.map((state, index) => {
        const triggerId = state === 'Selected' ? 'state-tab' : `${state}-tab`;
        const currentTab = state === 'Selected' ? 'state-tab' : '';

        return (
          <Row key={index} className="padding-14-16">
            <Col width={2} className="display-flex align-items-center">
              <Text modifiers="bold">{state}</Text>
            </Col>
            <Col className="display-flex align-items-center">
              <TabsContext.Provider value={{ currentTab, setCurrentTab: noop }}>
                <div role="tablist">
                  <TabsTrigger id={triggerId}>Terviseteekond</TabsTrigger>
                </div>
              </TabsContext.Provider>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tervise sakid">
        <Tabs.Trigger id="tab-1">Terviseteekond</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Haiguste kulg</Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Ravimite ajalugu</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.healthTimeline}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.diseaseCourse}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.medication}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Ikoonidega sakid">
        <Tabs.Trigger id="tab-1" icon="table_chart">
          Tabel
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2" icon="grid_on">
          Ruudustik
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.table}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.grid}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithStatusBadge: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Olekumärgisega sakid">
        <Tabs.Trigger id="tab-1">
          <Ellipsis lineClamp={1} popover={true}>
            Terviseteekond
          </Ellipsis>{' '}
          <StatusBadge color="brand">Esitatud</StatusBadge>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2">
          <span style={{ position: 'relative' }}>
            Lugemata teated&nbsp;
            <StatusIndicator type="danger" position="top-right" />
          </span>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Ravimite ajalugu</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.healthTimeline}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.unreadMessages}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.medication}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover-tab',
      active: '#Active-tab',
      focusVisible: '#Focus-tab',
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [currentTab, setCurrentTab] = useState('tab-1');

    return (
      <VerticalSpacing>
        <p>
          Current tab: <strong>{currentTab}</strong>
        </p>
        <Tabs value={currentTab} onChange={setCurrentTab}>
          <Tabs.List aria-label="Juhitavad sakid">
            <Tabs.Trigger id="tab-1">Terviseteekond</Tabs.Trigger>
            <Tabs.Trigger id="tab-2">Haiguste kulg</Tabs.Trigger>
            <Tabs.Trigger id="tab-3">Ravimite ajalugu</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab-1">
            <Text>{content.healthTimeline}</Text>
          </Tabs.Content>
          <Tabs.Content id="tab-2">
            <Text>{content.diseaseCourse}</Text>
          </Tabs.Content>
          <Tabs.Content id="tab-3">
            <Text>{content.medication}</Text>
          </Tabs.Content>
        </Tabs>
      </VerticalSpacing>
    );
  },
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Keelatud sakiga sakid">
        <Tabs.Trigger id="tab-1">Terviseteekond</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Haiguste kulg</Tabs.Trigger>
        <Tabs.Trigger id="tab-3" disabled>
          Ravimite ajalugu
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.healthTimeline}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.diseaseCourse}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{content.medication}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

export const OverflowBehavior: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <Text modifiers="bold">Dropdown (default)</Text>
      <div style={{ maxWidth: 400 }}>
        <Tabs defaultValue="more-1">
          <Tabs.List aria-label="Ületäituvad sakid rippmenüüga">
            <Tabs.Trigger id="more-1">Terviseteekond</Tabs.Trigger>
            <Tabs.Trigger id="more-2">Haiguste kulg</Tabs.Trigger>
            <Tabs.Trigger id="more-3">Ravimite ajalugu</Tabs.Trigger>
            <Tabs.Trigger id="more-4">Tahteavaldused</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="more-1">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.healthTimeline}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="more-2">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.diseaseCourse}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="more-3">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.medication}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="more-4">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.declarations}</Text>
            </CardContent>
          </Tabs.Content>
        </Tabs>
      </div>
      <Text modifiers="bold">Horizontal scroll</Text>
      <div style={{ maxWidth: 400 }}>
        <Tabs defaultValue="scroll-1">
          <Tabs.List aria-label="Ületäituvad sakid kerimisega" overflowMode="scroll">
            <Tabs.Trigger id="scroll-1">Terviseteekond</Tabs.Trigger>
            <Tabs.Trigger id="scroll-2">Haiguste kulg</Tabs.Trigger>
            <Tabs.Trigger id="scroll-3">Ravimite ajalugu</Tabs.Trigger>
            <Tabs.Trigger id="scroll-4">Tahteavaldused</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="scroll-1">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.healthTimeline}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="scroll-2">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.diseaseCourse}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="scroll-3">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.medication}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="scroll-4">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{content.declarations}</Text>
            </CardContent>
          </Tabs.Content>
        </Tabs>
      </div>
    </VerticalSpacing>
  ),
};

export const WithSubTabs: Story = {
  render: () => {
    const [activeSubTab, setActiveSubTab] = useState('work-accidents');

    const subTabLabels: Record<string, string> = {
      'work-accidents': 'Tööõnnetused',
      'occupational-diseases': 'Kutsehaigused',
      'work-related-illnesses': 'Tööga seotud haigused',
    };

    const subTabContent: Record<string, string> = {
      'work-accidents': 'Tööõnnetuste juhtumid ja nende menetluse seis.',
      'occupational-diseases': 'Kutsehaiguste kirjed ja diagnoosid.',
      'work-related-illnesses': 'Tööga seotud haiguste teated ja tulemused.',
    };

    return (
      <Tabs defaultValue="tab-3">
        <Tabs.List aria-label="Töötervishoiu ja -ohutuse sakid">
          <Tabs.Trigger id="tab-1">Käimasolevad menetlused</Tabs.Trigger>
          <Tabs.Trigger id="tab-2">Planeeritavad menetlused</Tabs.Trigger>
          <Tabs.Trigger id="tab-3">Õnnetused ja haigused</Tabs.Trigger>
          <Tabs.Trigger id="tab-4">Kalender</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content id="tab-1">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <Text>{content.proceduresInProgress}</Text>
          </CardContent>
        </Tabs.Content>
        <Tabs.Content id="tab-2">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <Text>{content.proceduresInPlanning}</Text>
          </CardContent>
        </Tabs.Content>
        <Tabs.Content id="tab-3">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <VerticalSpacing size={1.5}>
              <ButtonGroup
                type="secondary"
                ariaLabel="Õnnetuste ja haiguste alamnavigatsioon"
                enableMobileDropdown
                onSelectionChange={setActiveSubTab}
              >
                <Button id="work-accidents" isActive={activeSubTab === 'work-accidents'}>
                  Tööõnnetused
                </Button>
                <Button id="occupational-diseases" isActive={activeSubTab === 'occupational-diseases'}>
                  Kutsehaigused
                </Button>
                <Button id="work-related-illnesses" isActive={activeSubTab === 'work-related-illnesses'}>
                  Tööga seotud haigused
                </Button>
              </ButtonGroup>
              <Heading element="h2">{subTabLabels[activeSubTab]}</Heading>
              <Text>{subTabContent[activeSubTab]}</Text>
            </VerticalSpacing>
          </CardContent>
        </Tabs.Content>
        <Tabs.Content id="tab-4">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <Text>{content.calendar}</Text>
          </CardContent>
        </Tabs.Content>
      </Tabs>
    );
  },
};
