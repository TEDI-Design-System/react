import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Alert from '../../notifications/alert/alert';
import Checkbox, { CheckboxGroup, CheckboxProps } from './checkbox';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4228-72934&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/796203-checkbox" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  subcomponents: { 'Checkbox.Group': CheckboxGroup },
  title: 'TEDI-Ready/Components/Form/ChoiceGroup/Checkbox',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} label="Text" value="default" />;
const sizesArray: Array<'default' | 'large'> = ['default', 'large'];

const TemplateSizes: StoryFn<CheckboxProps> = (args) => {
  return (
    <Row>
      <Col lg={6} md={12} className="example-list">
        {sizesArray.map((size, key) => (
          <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col lg={10} md={6} xs={8} className="display-flex align-items-center">
              <VerticalSpacing>
                <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
                {size === 'large' && (
                  <Alert type="warning">
                    <Text>Applied automatically on mobile screen sizes. </Text>
                    <Text modifiers="bold">Otherwise, prefer using default size.</Text>
                  </Alert>
                )}
              </VerticalSpacing>
            </Col>
            <Col lg={2} md={6} xs={4}>
              <Checkbox {...args} size={size} id={`checkbox-size-${size}`} />
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    id: 'default-check',
    name: 'default-check',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
};

export const States = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);

  return (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Default</Text>
            </Col>
            <Col>
              <Checkbox id="check-default" label="Text" name="check-default" value="check" />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Hover</Text>
            </Col>
            <Col>
              <Checkbox id="check-hover" label="Text" name="check-hover" value="check" hover />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Selected</Text>
            </Col>
            <Col>
              <Checkbox
                id="check-checked"
                label="Text"
                name="check-checked"
                value="check"
                checked={checked}
                onChange={(value, checked) => setChecked(checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled</Text>
            </Col>
            <Col>
              <Checkbox id="check-disabled" label="Text" name="check-disabled" value="check" disabled />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled selected</Text>
            </Col>
            <Col>
              <Checkbox
                id="check-disabled-checked"
                label="Text"
                name="check-disabled-checked"
                value="check"
                disabled
                checked={checked}
                onChange={(value, checked) => setChecked(checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Indeterminate</Text>
            </Col>
            <Col>
              <Checkbox
                id="check-indeterminate"
                label="Text"
                name="check-indeterminate"
                value="check"
                indeterminate={indeterminate}
                onChange={(value, checked) => {
                  setIndeterminate(false);
                  setChecked(checked);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Error</Text>
            </Col>
            <Col>
              <Checkbox
                id="check-invalid"
                label="Text"
                name="check-invalid"
                value="check"
                invalid
                helper={{ text: 'Feedback text', type: 'error' }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Required</Text>
            </Col>
            <Col>
              <Checkbox id="check-required" label="Text" name="check-required" value="check" required />
            </Col>
          </Row>
        </VerticalSpacing>
      </Col>
    </Row>
  );
};

export const HiddenLabel: Story = {
  render: Template,

  args: {
    id: 'hidden-label-check',
    name: 'hidden-label-check',
    hideLabel: true,
  },
};

export const WithHelper: Story = {
  render: Template,

  args: {
    id: 'extra-content-check',
    name: 'extra-content-check',
    helper: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
    },
  },
};

export const WithTooltip: Story = {
  render: (args) => (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Checkbox
            {...args}
            id="check-short-title-tooltip"
            label="Text"
            name="check-short-title-tooltip"
            value="check"
          />
          <Checkbox
            {...args}
            id="check-short-title-helper-tooltip"
            label="Text"
            name="check-short-title-helper-tooltip"
            value="check"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
          <Checkbox
            {...args}
            id="check-long-title-tooltip-helper"
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
            name="check-long-title-tooltip-helper"
            value="check"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
        </VerticalSpacing>
      </Col>
    </Row>
  ),

  args: {
    name: 'tooltip-check',
    tooltip: 'This is a tooltip',
  },
};

export const Controlled = () => {
  const [checked, setChecked] = React.useState<boolean>(true);

  return (
    <Checkbox
      id="controlled-check"
      label="Select me"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

export const CheckWithLongTitle = () => {
  return (
    <Row>
      <Col lg={6} md={12}>
        <Checkbox
          id="check-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="check-long-title"
          value="check"
        />
      </Col>
    </Row>
  );
};

/** Compose checkboxes inside `Checkbox.Group`, which owns the selected values. */
export const Group: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>(['cheese']);
    return (
      <Checkbox.Group label="Toppings" value={values} onChange={setValues} helper={{ text: 'Pick any.' }}>
        <Checkbox value="cheese" label="Cheese" />
        <Checkbox value="ham" label="Ham" />
        <Checkbox value="mushroom" label="Mushroom" />
      </Checkbox.Group>
    );
  },
};

/**
 * `indeterminateCheck` adds a "select all" checkbox: checked when all children are
 * selected, indeterminate when some are, unchecked when none — toggling it selects
 * or clears them all.
 */
export const WithSelectAll: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>(['sms']);
    return (
      <Checkbox.Group label="Notifications" indeterminateCheck value={values} onChange={setValues}>
        <Checkbox value="email" label="Email" />
        <Checkbox value="sms" label="SMS" />
        <Checkbox value="push" label="Push" />
      </Checkbox.Group>
    );
  },
};

/** `variant="card"` renders each checkbox as a card. `cardVariant` sets primary / secondary. */
export const Cards: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Checkbox.Group label="Primary" variant="card" cardVariant="primary" defaultValue={['a']}>
        <Checkbox value="a" label="Text" />
        <Checkbox value="b" label="Text" />
        <Checkbox value="c" label="Text" />
      </Checkbox.Group>
      <Checkbox.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue={['a']}>
        <Checkbox value="a" label="Text" />
        <Checkbox value="b" label="Text" />
        <Checkbox value="c" label="Text" />
      </Checkbox.Group>
    </VerticalSpacing>
  ),
};

/** Add a `description` for a two-line card. */
export const CardsWithDescription: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Checkbox.Group label="Primary" variant="card" cardVariant="primary" defaultValue={['a']}>
        <Checkbox value="a" label="Text" description="Description" />
        <Checkbox value="b" label="Text" description="Description" />
        <Checkbox value="c" label="Text" description="Description" />
      </Checkbox.Group>
      <Checkbox.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue={['a']}>
        <Checkbox value="a" label="Text" description="Description" />
        <Checkbox value="b" label="Text" description="Description" />
        <Checkbox value="c" label="Text" description="Description" />
      </Checkbox.Group>
    </VerticalSpacing>
  ),
};

/**
 * Add a leading `icon` (Material icon name), optionally with a `description`.
 */
export const CardsWithIcons: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Checkbox.Group label="Primary" variant="card" cardVariant="primary" defaultValue={['desktop']}>
        <Checkbox value="desktop" label="Text" icon="computer" />
        <Checkbox value="phone" label="Text" icon="smartphone" />
        <Checkbox value="tablet" label="Text" icon="tablet_mac" />
      </Checkbox.Group>
      <Checkbox.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue={['desktop']}>
        <Checkbox value="desktop" label="Text" description="Description" icon="computer" />
        <Checkbox value="phone" label="Text" description="Description" icon="smartphone" />
        <Checkbox value="tablet" label="Text" description="Description" icon="tablet_mac" />
      </Checkbox.Group>
    </VerticalSpacing>
  ),
};

/**
 * Group props are breakpoint-aware (mobile-first). Here it's cards by default and
 * regular checkboxes from `md` up — resize the canvas to see it switch.
 */
export const ResponsiveVariant: StoryObj = {
  render: () => (
    <Checkbox.Group
      label="Toppings"
      defaultValue={['cheese']}
      variant="card"
      cardVariant="secondary"
      md={{ variant: 'default', direction: 'column' }}
    >
      <Checkbox value="cheese" label="Cheese" />
      <Checkbox value="ham" label="Ham" />
      <Checkbox value="mushroom" label="Mushroom" />
    </Checkbox.Group>
  ),
};
