import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { ButtonGroup } from '../../buttons/button-group/button-group';
import { CardContent } from '../../cards/card/card-content/card-content';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
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

const contentText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis odio, iaculis quis sodales at, placerat vitae risus. Integer hendrerit ex eget nisl euismod pharetra.';

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
                  <TabsTrigger id={triggerId}>Health timeline</TabsTrigger>
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
      <Tabs.List aria-label="Health tabs">
        <Tabs.Trigger id="tab-1">Health timeline</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Course of diseases</Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Medication history</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tabs with icons">
        <Tabs.Trigger id="tab-1" icon="table_chart">
          Table
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2" icon="grid_on">
          Grid
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithStatusBadge: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tabs with status badge">
        <Tabs.Trigger id="tab-1">
          Health timeline <StatusBadge color="brand">Submitted</StatusBadge>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2">
          <span style={{ position: 'relative' }}>
            Unread messages&nbsp;
            <StatusIndicator type="danger" position="top-right" />
          </span>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Medication history</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
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
          <Tabs.List aria-label="Controlled tabs">
            <Tabs.Trigger id="tab-1">Health timeline</Tabs.Trigger>
            <Tabs.Trigger id="tab-2">Course of diseases</Tabs.Trigger>
            <Tabs.Trigger id="tab-3">Medication history</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab-1">
            <Text>{contentText}</Text>
          </Tabs.Content>
          <Tabs.Content id="tab-2">
            <Text>{contentText}</Text>
          </Tabs.Content>
          <Tabs.Content id="tab-3">
            <Text>{contentText}</Text>
          </Tabs.Content>
        </Tabs>
      </VerticalSpacing>
    );
  },
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tabs with disabled">
        <Tabs.Trigger id="tab-1">Health timeline</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Course of diseases</Tabs.Trigger>
        <Tabs.Trigger id="tab-3" disabled>
          Medication history
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
        </CardContent>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
          <Text>{contentText}</Text>
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
          <Tabs.List aria-label="Overflow tabs with dropdown">
            <Tabs.Trigger id="more-1">Health timeline</Tabs.Trigger>
            <Tabs.Trigger id="more-2">Course of diseases</Tabs.Trigger>
            <Tabs.Trigger id="more-3">Medication history</Tabs.Trigger>
            <Tabs.Trigger id="more-4">Declarations of intent</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="more-1">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="more-2">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="more-3">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="more-4">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
            </CardContent>
          </Tabs.Content>
        </Tabs>
      </div>
      <Text modifiers="bold">Horizontal scroll</Text>
      <div style={{ maxWidth: 400 }}>
        <Tabs defaultValue="scroll-1">
          <Tabs.List aria-label="Overflow tabs with scroll" overflowMode="scroll">
            <Tabs.Trigger id="scroll-1">Health timeline</Tabs.Trigger>
            <Tabs.Trigger id="scroll-2">Course of diseases</Tabs.Trigger>
            <Tabs.Trigger id="scroll-3">Medication history</Tabs.Trigger>
            <Tabs.Trigger id="scroll-4">Declarations of intent</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="scroll-1">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="scroll-2">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="scroll-3">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
            </CardContent>
          </Tabs.Content>
          <Tabs.Content id="scroll-4">
            <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
              <Text>{contentText}</Text>
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

    const subTabContent: Record<string, string> = {
      'work-accidents': 'Displaying work accident cases and their review statuses.',
      'occupational-diseases': 'Displaying occupational disease records and diagnoses.',
      'work-related-illnesses': 'Displaying work-related illness reports and outcomes.',
    };

    return (
      <Tabs defaultValue="tab-3">
        <Tabs.List aria-label="Health and safety tabs">
          <Tabs.Trigger id="tab-1">Procedures in Progress</Tabs.Trigger>
          <Tabs.Trigger id="tab-2">Procedures in Planning</Tabs.Trigger>
          <Tabs.Trigger id="tab-3">Accidents and Illnesses</Tabs.Trigger>
          <Tabs.Trigger id="tab-4">Calendar</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content id="tab-1">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <Text>{contentText}</Text>
          </CardContent>
        </Tabs.Content>
        <Tabs.Content id="tab-2">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <Text>{contentText}</Text>
          </CardContent>
        </Tabs.Content>
        <Tabs.Content id="tab-3">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <VerticalSpacing size={1.5}>
              <ButtonGroup
                type="secondary"
                ariaLabel="Accidents and illnesses sub-navigation"
                onSelectionChange={setActiveSubTab}
              >
                <Button id="work-accidents" isActive={activeSubTab === 'work-accidents'}>
                  Work Accidents
                </Button>
                <Button id="occupational-diseases" isActive={activeSubTab === 'occupational-diseases'}>
                  Occupational Diseases
                </Button>
                <Button id="work-related-illnesses" isActive={activeSubTab === 'work-related-illnesses'}>
                  Work-related Illnesses
                </Button>
              </ButtonGroup>
              <Heading element="h2">{activeSubTab.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</Heading>
              <Text>{subTabContent[activeSubTab]}</Text>
            </VerticalSpacing>
          </CardContent>
        </Tabs.Content>
        <Tabs.Content id="tab-4">
          <CardContent padding={{ vertical: 1.5, horizontal: 1 }}>
            <Text>{contentText}</Text>
          </CardContent>
        </Tabs.Content>
      </Tabs>
    );
  },
};
