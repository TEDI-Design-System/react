import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Heading } from '../../base/typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Col } from './col';
import { Row } from './row';

/**
 * <a href="https://www.tedi.ee/1ee8444b7/p/24da19-grid" target="_BLANK">Zeroheight ↗</a><br/>
 * <a hreg="https://getbootstrap.com/docs/5.1/layout/grid" target="_BLANK">Bootstrap docs ↗</a> <br/>
 * Row and Col components are inspired by Bootstrap V5 Grid System. <br/> You can use different Bootstrap grid classes
 * through component props.
 */

const meta: Meta<typeof Col> = {
  title: 'Tedi-Ready/Layout/Grid/Col',
  component: Col,
  subcomponents: { Row } as never,
  parameters: {
    status: { type: 'devComponent' },
  },
};

export default meta;
type Story = StoryObj<typeof Col>;

export const Default: StoryFn = () => (
  <VerticalSpacing size={2}>
    <VerticalSpacing size={0.5}>
      <Heading element="h4">Label/Value pairs</Heading>
      <Row>
        <Col>
          <dl>
            <Row>
              <Col element="dt" width={2}>
                <strong>Label</strong>
              </Col>
              <Col element="dd">Value</Col>
            </Row>
            <Row>
              <Col element="dt" width={2}>
                <strong>Label</strong>
              </Col>
              <Col element="dd">Value</Col>
            </Row>
          </dl>
        </Col>
      </Row>
    </VerticalSpacing>

    <VerticalSpacing size={0.5}>
      <Heading element="h4">Lists</Heading>
      <Row element="ul" direction="column">
        <Col>Item 1</Col>
        <Col>Item 2</Col>
      </Row>
    </VerticalSpacing>
  </VerticalSpacing>
);
