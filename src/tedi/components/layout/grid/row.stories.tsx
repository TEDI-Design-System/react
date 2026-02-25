import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col } from './col';
import { Row, RowProps } from './row';

/**
 * <a href="https://www.tedi.ee/1ee8444b7/p/24da19-grid" target="_BLANK">Zeroheight ↗</a><br/>
 * <a hreg="https://getbootstrap.com/docs/5.1/layout/grid" target="_BLANK">Boostrap docs ↗</a> <br/>
 * Row and Col components are inspired by Bootstrap V5 Grid System. <br/> You can use different Bootstrap grid classes
 * through component props.
 */

const meta: Meta<typeof Row> = {
  title: 'Tedi-Ready/Layout/Grid/Row',
  component: Row,
  subcomponents: { Col } as never,
  parameters: {
    status: { type: 'devComponent' },
  },
};

export default meta;
type Story = StoryObj<typeof Row>;

const Template: StoryFn<RowProps> = (args) => (
  <div>
    <Row className="example-row" {...args}>
      <Col className="example-box">Col-1</Col>
      <Col className="example-box">Col-2</Col>
      <Col className="example-box">Col-3</Col>
    </Row>

    <Row className="example-row" justifyContent="between" {...args}>
      <Col className="example-box" sm={2} lg={3}>
        Col-1
      </Col>
      <Col className="example-box" sm={2} lg={3}>
        Col-2
      </Col>
      <Col className="example-box" sm={2} lg={3}>
        Col-3
      </Col>
    </Row>

    <Row className="example-row" cols={1} md={2} lg={3} xl={{ justifyContent: 'around' }} {...args}>
      <Col className="example-box" xl={{ width: 3, order: 'last' }}>
        Col-1
      </Col>
      <Col className="example-box" xl={{ width: 3, order: 0 }}>
        Col-2
      </Col>
      <Col className="example-box" xl={{ width: 3, order: 'first' }}>
        Col-3
      </Col>
    </Row>
  </div>
);

export const Default: Story = { render: Template };
