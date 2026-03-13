import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Text } from '../../base/typography/text/text';
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
    'Tabs.Dropdown': Tabs.Dropdown,
    'Tabs.Dropdown.Item': Tabs.Dropdown.Item,
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
                  <TabsTrigger id={triggerId}>Toimingud</TabsTrigger>
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
      <Tabs.List aria-label="Toimingud tabs">
        <Tabs.Trigger id="tab-1">Toimingud</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Dokumendid</Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Esindusõigused</Tabs.Trigger>
        <Tabs.Trigger id="tab-4">Kontaktisikud</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <p>Toimingud content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <p>Dokumendid content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <p>Esindusõigused content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-4">
        <p>Kontaktisikud content</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tabs with icons">
        <Tabs.Trigger id="tab-1" icon="person">
          Minu andmed
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2" icon="description">
          Dokumendid
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-3" icon="lock">
          Ligipääs
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-4" icon="settings">
          Seaded
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <p>Minu andmed content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <p>Dokumendid content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <p>Ligipääs content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-4">
        <p>Seaded content</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithStatusBadge: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tabs with status badge">
        <Tabs.Trigger id="tab-1">
          Toimingud <StatusBadge color="brand">Esitatud</StatusBadge>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-2">
          <span style={{ position: 'relative' }}>
            Lugemata teated&nbsp;
            <StatusIndicator type="danger" position="top-right" />
          </span>
        </Tabs.Trigger>
        <Tabs.Trigger id="tab-3">Esindusõigused</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <p>Toimingud content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <p>Lugemata teated content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <p>Esindusõigused content</p>
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
            <Tabs.Trigger id="tab-1">Toimingud</Tabs.Trigger>
            <Tabs.Trigger id="tab-2">Dokumendid</Tabs.Trigger>
            <Tabs.Trigger id="tab-3">Esindusõigused</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content id="tab-1">
            <p>Toimingud content</p>
          </Tabs.Content>
          <Tabs.Content id="tab-2">
            <p>Dokumendid content</p>
          </Tabs.Content>
          <Tabs.Content id="tab-3">
            <p>Esindusõigused content</p>
          </Tabs.Content>
        </Tabs>
      </VerticalSpacing>
    );
  },
};

export const WithDropdown: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tabs with dropdown">
        <Tabs.Trigger id="tab-1">Toimingud</Tabs.Trigger>
        <Tabs.Dropdown label="Esindusõigused">
          <Tabs.Dropdown.Item id="tab-3">Volitused</Tabs.Dropdown.Item>
          <Tabs.Dropdown.Item id="tab-4">Õigused</Tabs.Dropdown.Item>
          <Tabs.Dropdown.Item id="tab-5">Pääsud</Tabs.Dropdown.Item>
        </Tabs.Dropdown>
        <Tabs.Trigger id="tab-2">Dokumendid</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <p>Toimingud content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <p>Dokumendid content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <p>Volitused content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-4">
        <p>Õigused content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-5">
        <p>Pääsud content</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <Tabs.List aria-label="Tabs with disabled">
        <Tabs.Trigger id="tab-1">Toimingud</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Dokumendid</Tabs.Trigger>
        <Tabs.Trigger id="tab-3" disabled>
          Esindusõigused
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">
        <p>Toimingud content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-2">
        <p>Dokumendid content</p>
      </Tabs.Content>
      <Tabs.Content id="tab-3">
        <p>Esindusõigused content</p>
      </Tabs.Content>
    </Tabs>
  ),
};
