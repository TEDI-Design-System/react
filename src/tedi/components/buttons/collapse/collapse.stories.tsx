import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Collapse, { CollapseProps } from './collapse';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/546461-floating-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Collapse> = {
  component: Collapse,
  title: 'Tedi-ready/Components/Buttons/Collapse',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&m=dev',
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Default: Story = {};
const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus'];
type TemplateMultipleProps<Type = typeof buttonStateArray> = CollapseProps & {
  array: Type;
  hideSizes?: boolean;
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, hideSizes, ...collapseProps } = args;

  return (
    <>
      <VerticalSpacing size={0}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text modifiers="bold">Default</Text>
          </Col>
          {!hideSizes && (
            <Col className="text-bold">
              <Text modifiers="bold">Small</Text>
            </Col>
          )}
        </Row>
        <p>&nbsp;</p>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="display-flex align-items-start">
              <Text modifiers="bold">{value}</Text>
            </Col>
            <Col className="display-flex align-items-start gap-3">
              <Collapse {...collapseProps} id={value}>
                <>&nbsp;</>
              </Collapse>
              <Collapse {...collapseProps} id={value} open>
                <>&nbsp;</>
              </Collapse>
            </Col>
            {!hideSizes && (
              <Col className="display-flex align-items-start gap-3">
                <Collapse {...collapseProps} id={value} size="small">
                  <>&nbsp;</>
                </Collapse>
                <Collapse {...collapseProps} id={value} open size="small">
                  <>&nbsp;</>
                </Collapse>
              </Col>
            )}
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const WithText = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
  },
  parameters: {
    pseudo: {
      hover: '#Hover__trigger',
      active: '#Active__trigger',
      focusVisible: '#Focus__trigger',
    },
  },
};

export const IconOnly = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
    hideCollapseText: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover__trigger',
      active: '#Active__trigger',
      focusVisible: '#Focus__trigger',
    },
  },
};

export const SecondaryButton = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    arrowType: 'secondary',
    hideCollapseText: true,
    hideSizes: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover__trigger',
      active: '#Active__trigger',
      focusVisible: '#Focus__trigger',
    },
  },
};

export const TitleRow = {
  args: {
    id: 'collapse-1',
    openText: 'Näita rohkem',
    closeText: 'Näita vähem',
    title: (
      <Heading element="h5" color="secondary">
        Juhtumi üldandmed
      </Heading>
    ),
    children: (
      <VerticalSpacing>
        <div>
          <Text color="secondary">Laste osalus</Text>
          <p>peretüli lapse osaluseta</p>
        </div>
        <div>
          <Text color="secondary">Juhtumi liigid</Text>
          <p>peretüli (lapsega)</p>
        </div>
        <div>
          <Text color="secondary">Kannatanu seos vägivaldsega</Text>
          <p>tütar</p>
        </div>
      </VerticalSpacing>
    ),
  },
};

export const NestedCollapses: Story = {
  args: {
    id: 'parent-collapse',
    title: (
      <Heading element="h5" color="secondary">
        Parent Collapse
      </Heading>
    ),
    children: (
      <VerticalSpacing>
        <Text>Parent content above child collapse.</Text>
        <Collapse
          id="child-collapse"
          title={
            <Heading element="h6" color="secondary">
              Child Collapse
            </Heading>
          }
        >
          <VerticalSpacing>
            <Text>Child content above grandchild collapse.</Text>
            <Collapse
              id="grandchild-collapse"
              title={
                <Heading element="h6" color="brand">
                  Grandchild Collapse
                </Heading>
              }
            >
              <VerticalSpacing>
                <Text>This is nested inside the grandchild collapse.</Text>
                <p>Open and close me to compare with parent and child states.</p>
              </VerticalSpacing>
            </Collapse>

            <Text>Child content below grandchild collapse.</Text>
          </VerticalSpacing>
        </Collapse>

        <Text>Parent content below child collapse.</Text>
      </VerticalSpacing>
    ),
  },
};
