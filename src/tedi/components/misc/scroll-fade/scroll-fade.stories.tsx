import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import ScrollFade from './scroll-fade';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=10758-111142&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/32b155-scroll-fade" target="_BLANK">Zeroheight ↗</a>
 **/

const meta: Meta<typeof ScrollFade> = {
  component: ScrollFade,
  title: 'TEDI-Ready/Components/Helpers/ScrollFade',
  parameters: {
    status: {
      type: ['devComponent'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=10758-111142&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollFade>;

const Template: StoryFn<typeof ScrollFade> = (args) => (
  <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
    <ScrollFade {...args} />
  </div>
);

const ScrollbarTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <Text modifiers="bold">Default Scrollbar</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} scrollBar="default" />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Custom Scrollbar</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} scrollBar="custom" />
      </div>
    </Col>
  </Row>
);

const DynamicContentTemplate: StoryFn<typeof ScrollFade> = (args) => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Button onClick={() => setItems((prev) => [...prev, prev.length + 1])}>Add item</Button>
        <Button visualType="secondary" onClick={() => setItems((prev) => prev.slice(0, -1))}>
          Remove item
        </Button>
      </div>
      <div style={{ maxWidth: '200px', maxHeight: '150px' }}>
        <ScrollFade {...args}>
          {items.map((item) => (
            <p key={item} style={{ margin: 0, padding: '8px 0' }}>
              Item {item}
            </p>
          ))}
        </ScrollFade>
      </div>
    </>
  );
};

const FadeSizeTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <Text modifiers="bold">No Fade (0%)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={0} />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Small Fade (10%)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={10} />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Large Fade (20%)</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadeSize={20} />
      </div>
    </Col>
  </Row>
);

const FadePositionTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <Text modifiers="bold">Top</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadePosition="top" />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Bottom</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadePosition="bottom" />
      </div>
    </Col>
    <Col xs={3}>
      <Text modifiers="bold">Both</Text>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '200px' }}>
        <ScrollFade {...args} fadePosition="both" />
      </div>
    </Col>
  </Row>
);

const NoFadeWithoutScrollbarTemplate: StoryFn<typeof ScrollFade> = (args) => (
  <Row>
    <Col xs={3}>
      <div style={{ marginTop: '16px', maxWidth: '200px', maxHeight: '400px' }}>
        <ScrollFade {...args} />
      </div>
    </Col>
  </Row>
);

export const Default: Story = {
  render: Template,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    scrollBar: 'custom',
    fadeSize: 20,
    fadePosition: 'both',
  },
};

export const Scrollbar: Story = {
  render: ScrollbarTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

export const FadeSize: Story = {
  render: FadeSizeTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

export const FadePosition: Story = {
  render: FadePositionTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

export const NoFadeWithoutScrollbar: Story = {
  render: NoFadeWithoutScrollbarTemplate,
  args: {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
};

export const DynamicContent: Story = {
  render: DynamicContentTemplate,
  args: {
    children: null,
  },
};
