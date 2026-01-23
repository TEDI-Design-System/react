import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../../layout/grid';
import { VerticalSpacing } from '../../../layout/vertical-spacing';
import { Text } from './text';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Tedi-Ready/Base/Typography/Text',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev',
    },
    status: {
      type: 'mobileViewDifference',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

const TemplateSubtitles: StoryFn = () => (
  <div className="example-list w-100">
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text color="primary" modifiers="subtitle">
          Subtitle
        </Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text color="primary" modifiers={['subtitle', 'small']}>
          Subtitle Small
        </Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text color="secondary" element="label">
          Label
        </Text>
      </Col>
    </Row>
    <Row className="padding-14-16">
      <Col>
        <Text element="label" modifiers="bold">
          Label bold
        </Text>
      </Col>
    </Row>
  </div>
);

const TemplateBodyText: StoryFn = () => (
  <div className="example-list w-100">
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text>Body Regular</Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text modifiers="bold">Body bold</Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text modifiers="italic">Body italic</Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text modifiers="small">Small</Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text modifiers={['small', 'bold']}>Small bold</Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text modifiers={['small', 'italic']}>Small italic</Text>
      </Col>
    </Row>
    <Row className="border-bottom padding-14-16">
      <Col>
        <Text modifiers={['extra-small']}>Extra small</Text>
      </Col>
    </Row>
    <Row className="padding-14-16">
      <Col>
        <Text modifiers={['extra-small', 'bold']}>Small bold</Text>
      </Col>
    </Row>
  </div>
);

const TemplateGeneralText: StoryFn = () => (
  <VerticalSpacing>
    <Row>
      <Col>
        <Text color="primary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="secondary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="tertiary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="brand">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row className="bg bg-primary">
      <Col>
        <Text color="white">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
  </VerticalSpacing>
);

const TemplateStatusText: StoryFn = () => (
  <VerticalSpacing>
    <Row>
      <Col>
        <Text color="success">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="warning">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="danger">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="info">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text color="neutral">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Text>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

export const BodyText: Story = {
  render: TemplateBodyText,
  name: 'Body',
};

export const Subtitles: Story = {
  render: TemplateSubtitles,
};

export const GeneralText: Story = {
  render: TemplateGeneralText,
  name: 'General text colors',
};

export const StatusText: Story = {
  render: TemplateStatusText,
  name: 'Status text colors',
};
