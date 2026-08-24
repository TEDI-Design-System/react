import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Alert from '../../notifications/alert/alert';
import Radio, { RadioGroup, RadioProps } from '.';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4598-78103&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/93e423-radio" target="_BLANK">Zeroheight ↗</a>
 */
const meta: Meta<typeof Radio> = {
  component: Radio,
  subcomponents: { 'Radio.Group': RadioGroup },
  title: 'TEDI-Ready/Components/Form/ChoiceGroup/Radio',
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
type Story = StoryObj<typeof Radio>;

const Template: StoryFn<RadioProps> = (args) => <Radio {...args} label="Tekst" value="default" />;
const sizesArray: Array<'default' | 'large'> = ['default', 'large'];

const TemplateSizes: StoryFn<RadioProps> = (args) => {
  return (
    <Row>
      <Col lg={6} md={12} className="example-list">
        {sizesArray.map((size, key) => (
          <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col lg={10} md={6} xs={8} className="flex align-items-center">
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
              <Radio
                {...args}
                size={size}
                id={`radio-size-${size}`}
                label={`${size.charAt(0).toUpperCase() + size.slice(1)} size`}
                hideLabel
              />
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
    id: 'default-radio',
    name: 'default-radio',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
};

export const States = () => {
  return (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Default</Text>
            </Col>
            <Col>
              <Radio id="radio-default" label="Tekst" name="radio-default" value="radio" />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Hover</Text>
            </Col>
            <Col>
              <Radio id="radio-hover" label="Tekst" name="radio-hover" value="radio" hover />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Selected</Text>
            </Col>
            <Col>
              <Radio id="radio-checked" label="Tekst" name="radio-checked" value="radio" defaultChecked />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled</Text>
            </Col>
            <Col>
              <Radio id="radio-disabled" label="Tekst" name="radio-disabled" value="radio" disabled />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Disabled selected</Text>
            </Col>
            <Col>
              <Radio
                id="radio-disabled-checked"
                label="Tekst"
                name="radio-disabled-checked"
                value="radio"
                disabled
                defaultChecked
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Error</Text>
            </Col>
            <Col>
              <Radio
                id="radio-invalid"
                label="Tekst"
                name="radio-invalid"
                value="radio"
                invalid
                helper={{ text: 'Tagasiside tekst', type: 'error' }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Text modifiers="bold">Required</Text>
            </Col>
            <Col>
              <Radio id="radio-required" label="Tekst" name="radio-required" value="radio" required />
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
    id: 'hidden-label-radio',
    name: 'hidden-label-radio',
    hideLabel: true,
  },
};

export const WithHelper: Story = {
  render: Template,

  args: {
    id: 'extra-content-radio',
    name: 'extra-content-radio',
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
          <Radio
            {...args}
            id="radio-short-title-tooltip"
            label="Tekst"
            name="radio-short-title-tooltip"
            value="radio"
          />
          <Radio
            {...args}
            id="radio-short-title-helper-tooltip"
            label="Tekst"
            name="radio-short-title-helper-tooltip"
            value="radio"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
          <Radio
            {...args}
            id="radio-long-title-tooltip-helper"
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
            name="radio-long-title-tooltip-helper"
            value="radio"
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
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Radio
      id="controlled-check"
      label="Vali mind"
      name="controlled-check"
      value="controlled"
      checked={checked}
      onChange={(value, checked) => setChecked(checked)}
    />
  );
};

export const WithLongTitle = () => {
  return (
    <Row>
      <Col width={6}>
        <Radio
          id="radio-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="radio-long-title"
          value="radio"
        />
      </Col>
    </Row>
  );
};

/** Compose radios inside `Radio.Group`, which owns the selection and shared props. */
export const Group: StoryObj = {
  render: () => {
    const [value, setValue] = useState('kartul');
    return (
      <Radio.Group
        label="Tooraine"
        value={value}
        onChange={setValue}
        helper={{ text: 'Tegemist on veidi veidra valikuga kuid vähemalt ühe baaselemendi peab valima' }}
      >
        <Radio value="kartul" label="Kartul" />
        <Radio value="kapsas" label="Kapsas" />
        <Radio value="peet" label="Peet" />
      </Radio.Group>
    );
  },
};

/** `variant="card"` renders each radio as a card. `cardVariant` sets primary / secondary. */
export const Cards: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Radio.Group label="Primary" variant="card" cardVariant="primary" defaultValue="kartul">
        <Radio value="kartul" label="Kartul" />
        <Radio value="peet" label="Peet" />
        <Radio value="kapsas" label="Kapsas" />
      </Radio.Group>
      <Radio.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue="kartul">
        <Radio value="kartul" label="Kartul" />
        <Radio value="peet" label="Peet" />
        <Radio value="kapsas" label="Kapsas" />
      </Radio.Group>
    </VerticalSpacing>
  ),
};

/**
 * A card radio can also carry a `tooltip`. The info button opens the tooltip on
 * hover/focus; because the whole card is a `<label>`, clicking the info button
 * does not toggle the radio.
 */
export const CardsWithTooltip: StoryObj = {
  render: () => (
    <Radio.Group label="Primary" variant="card" cardVariant="primary" defaultValue="kartul">
      <Radio value="kartul" label="Kartul" tooltip="Tärkliserikas mugulköögivili." />
      <Radio value="peet" label="Peet" tooltip="Magusamaitseline juurvili." />
    </Radio.Group>
  ),
};

export const CardsWithDescription: StoryObj = {
  render: () => {
    const items = [
      {
        value: 'kartul',
        label: 'Kartul',
        description: 'Tärkliserikas mugulköögivili, mida kasutatakse laialt toiduks.',
      },
      {
        value: 'peet',
        label: 'Peet',
        description: 'Magusamaitseline juurvili, mida süüakse nii toorelt kui ka kuumtöödeldult.',
      },
      {
        value: 'kapsas',
        label: 'Kapsas',
        description: 'Lehtköögivili, mille tihedaid lehti kasutatakse mitmesugustes roogades.',
      },
    ];

    const cards = () => (
      <Row className="w-100" gutter={2}>
        {items.map((item) => (
          <Col key={item.value} xs={12} md={4}>
            <Radio value={item.value} label={item.label} description={item.description} className="w-100" />
          </Col>
        ))}
      </Row>
    );
    return (
      <VerticalSpacing size={1.5}>
        <Radio.Group label="Primary" variant="card" cardVariant="primary" defaultValue="kartul">
          {cards()}
        </Radio.Group>
        <Radio.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue="kartul">
          {cards()}
        </Radio.Group>
      </VerticalSpacing>
    );
  },
};

/**
 * Add a leading `icon` (Material icon name), optionally with a `description`.
 */
export const CardsWithIcons: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Radio.Group label="Primary" variant="card" cardVariant="primary" defaultValue="tram">
        <Radio value="tram" label="Trammiga" icon="tram" />
        <Radio value="walk" label="Jalgsi" icon="directions_walk" />
        <Radio value="car" label="Autoga" icon="directions_car" />
      </Radio.Group>
      <Radio.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue="tram">
        <Radio value="tram" label="Trammiga" description="Soovitatud variant, vähendab ummikuid" icon="tram" />
        <Radio value="walk" label="Jalgsi" description="Soovitatud variant, vähendab ummikuid" icon="directions_walk" />
        <Radio
          value="car"
          label="Autoga"
          description="Kui soovid kiiremini kohale jõuda, tekitab ummikuid"
          icon="directions_car"
        />
      </Radio.Group>
    </VerticalSpacing>
  ),
};

/** `layout="segmented"` joins the cards into one button-group surface (Figma "Grouped"). */
export const CardsSegmented: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Radio.Group label="Primary" variant="card" cardVariant="primary" layout="segmented" defaultValue="kodu">
        <Radio value="kodu" label="Kodu" />
        <Radio value="too" label="Töö" />
        <Radio value="muu" label="Muu" />
      </Radio.Group>
      <Radio.Group label="Secondary" variant="card" cardVariant="secondary" layout="segmented" defaultValue="kodu">
        <Radio value="kodu" label="Kodu" />
        <Radio value="too" label="Töö" />
        <Radio value="muu" label="Muu" />
      </Radio.Group>
    </VerticalSpacing>
  ),
};

/**
 * Group props are breakpoint-aware (mobile-first). Here it's cards by default and
 * regular radios from `md` up — resize the canvas to see it switch.
 */
export const ResponsiveVariant: StoryObj = {
  render: () => (
    <Radio.Group
      label="Tooraine"
      defaultValue="kartul"
      variant="card"
      cardVariant="secondary"
      md={{ variant: 'default', direction: 'column' }}
    >
      <Radio value="kartul" label="Kartul" />
      <Radio value="peet" label="Peet" />
      <Radio value="kapsas" label="Kapsas" />
    </Radio.Group>
  ),
};
