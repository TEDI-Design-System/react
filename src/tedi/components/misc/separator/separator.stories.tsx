import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Card, CardContent } from '../../cards/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Separator, { DotSize, SeparatorProps } from './separator';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=3518-32729&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/01debb-separator" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'TEDI-Ready/Components/Helpers/Separator',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=3518-32729&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

const spacingArray: SeparatorProps['spacing'][] = [0, 0.5, 1, 1.5, 2, 2.5];
const sizeArray: SeparatorProps['dotSize'][] = ['large', 'medium'];
type TemplateMultipleProps<Type = SeparatorProps['dotSize']> = SeparatorProps & {
  array: Type[];
  property: keyof SeparatorProps;
};
const Template: StoryFn<SeparatorProps> = (args) => <Separator {...args} />;

const SizesTemplate: StoryFn<TemplateMultipleProps> = (args) => {
  const { array } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={2}>
            <Text modifiers="bold">{value === 'large' ? 'Large' : 'Medium'}</Text>
          </Col>
          <Col className="d-flex" width="auto">
            <Separator
              variant="dotted"
              axis="vertical"
              color="accent"
              dotPosition="center"
              dotSize={value}
              dotStyle={undefined}
            />
          </Col>
          <Col className="d-flex" align="center">
            <Separator
              variant="dotted"
              axis="horizontal"
              color="accent"
              dotPosition="center"
              dotSize={value as DotSize}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const ColorsAndThickness: StoryFn<SeparatorProps> = (args) => (
  <Row>
    <Col>
      <Separator spacing={1} thickness={1} {...args} />
      <Separator spacing={1} thickness={2} {...args} />
    </Col>
  </Row>
);

const SpacingHorizontal: StoryFn<SeparatorProps> = (args) => (
  <Row>
    <Col>
      {spacingArray.map((spacing, index) => (
        <Separator key={index} spacing={spacing} {...args} />
      ))}
    </Col>
  </Row>
);

const SpacingVertical: StoryFn<SeparatorProps> = (args) => (
  <Row>
    {spacingArray.map((spacing, index) => (
      <Col width="auto" key={index}>
        <Separator spacing={spacing} {...args} />
      </Col>
    ))}
  </Row>
);

export const Default: Story = {
  render: Template,
  args: { spacing: 1 },
};

export const HorizontalSpacings: Story = {
  render: SpacingHorizontal,
  args: {
    axis: 'horizontal',
  },
};

export const HorizontalThickness: Story = {
  render: ColorsAndThickness,
};

export const Vertical: Story = {
  render: Template,
  args: { axis: 'vertical', height: 3 },
};

export const VerticalSpacings: Story = {
  render: SpacingVertical,
  args: {
    axis: 'vertical',
    height: 3,
    display: 'inline-block',
  },
};

export const VerticalThickness: Story = {
  render: ColorsAndThickness,
  args: { axis: 'vertical', height: 3, display: 'inline' },
};

export const DottedLineHorizontal: Story = {
  render: Template,
  args: { axis: 'horizontal', variant: 'dotted', color: 'accent', dotPosition: 'center' },
};

export const DottedLineVertical: Story = {
  render: Template,
  args: { axis: 'vertical', variant: 'dotted', color: 'accent', height: 5, dotPosition: 'center' },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: SizesTemplate,

  args: {
    property: 'dotSize',
    array: sizeArray,
  },
};

export const SpacingTopDefault: Story = {
  render: () => {
    return (
      <Row>
        <Col width="auto">
          <Separator axis="vertical" variant="dotted" height={2} dotPosition="center" color="accent" dotSize="large" />
        </Col>
        <Col width="auto">
          <Separator axis="vertical" variant="dotted" height={2} dotPosition="center" color="accent" dotSize="medium" />
        </Col>
      </Row>
    );
  },
};

export const SpacingTopSmall: Story = {
  render: () => {
    return (
      <Row>
        <Col width="auto">
          <Separator axis="vertical" variant="dotted" height={2} dotPosition={0.5} color="accent" dotSize="large" />
        </Col>
        <Col width="auto">
          <Separator axis="vertical" variant="dotted" height={2} dotPosition={0.75} color="accent" dotSize="medium" />
        </Col>
      </Row>
    );
  },
};

export const Position: Story = {
  render: () => {
    return (
      <>
        <Row>
          <Col width="auto">
            <VerticalSpacing>
              <Text>Start</Text>
              <Row className="text-center">
                <Col width="auto">
                  <div>
                    <Separator
                      axis="vertical"
                      variant="dotted"
                      height={2}
                      dotPosition="start"
                      color="accent"
                      dotSize="large"
                    />
                  </div>
                </Col>
                <Col width="auto">
                  <Separator
                    axis="vertical"
                    variant="dotted"
                    height={2}
                    dotPosition="start"
                    color="accent"
                    dotSize="medium"
                  />
                </Col>
              </Row>
            </VerticalSpacing>
          </Col>
          <Col width="auto">
            <VerticalSpacing>
              <Text>Center</Text>
              <Row className="text-center">
                <Col width="auto">
                  <Separator
                    axis="vertical"
                    variant="dotted"
                    height={1}
                    dotPosition="center"
                    color="accent"
                    dotSize="large"
                  />
                </Col>
                <Col width="auto">
                  <Separator
                    axis="vertical"
                    variant="dotted"
                    height={1}
                    dotPosition="center"
                    color="accent"
                    dotSize="medium"
                  />
                </Col>
              </Row>
            </VerticalSpacing>
          </Col>
          <Col width="auto">
            <VerticalSpacing>
              <Text>End</Text>
              <Row className="text-center">
                <Col width="auto">
                  <Separator
                    axis="vertical"
                    variant="dotted"
                    height={1}
                    dotPosition="end"
                    color="accent"
                    dotSize="large"
                  />
                </Col>
                <Col width="auto">
                  <Separator
                    axis="vertical"
                    variant="dotted"
                    height={1}
                    dotPosition="end"
                    color="accent"
                    dotSize="medium"
                  />
                </Col>
              </Row>
            </VerticalSpacing>
          </Col>
        </Row>
      </>
    );
  },
};

const TemplateVertical: StoryFn<SeparatorProps> = (args) => (
  <Card>
    <CardContent>
      <Row>
        <Col xs="auto" md={2}>
          <p className="text-right">12.12.2012</p>
        </Col>
        <Col width={12} lg="auto">
          <Separator {...args} />
        </Col>
        <Col>
          <div className="h6">Card content title</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem rem nisi quae? Rem, amet! Veritatis
            laboriosam consectetur ipsum quae. Amet voluptatibus quod eaque at nostrum id provident? Cum, maiores
            libero!
          </p>
        </Col>
      </Row>
    </CardContent>
  </Card>
);

export const DotFilled: Story = {
  render: () => {
    return (
      <>
        <Separator axis="horizontal" variant="dot-only" dotSize="large" dotStyle="filled" color="secondary" />
      </>
    );
  },
};

export const DotOutlined: Story = {
  render: () => {
    return (
      <>
        <Separator axis="horizontal" variant="dot-only" dotSize="large" dotStyle="outlined" color="secondary" />
      </>
    );
  },
};

const dotSizeToPxMap: Record<string, string> = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '15px',
};

const DottedSizesTemplate: StoryFn<TemplateMultipleProps> = (args) => {
  const { array } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={2}>
            <Text>{value !== undefined ? dotSizeToPxMap[value] || value : '—'}</Text>
          </Col>
          <Col className="d-flex" width="auto">
            <Separator
              dotSize={value as DotSize}
              variant="dot-only"
              axis="horizontal"
              color="secondary"
              dotStyle="filled"
            />
          </Col>
          <Col className="d-flex" align="center">
            <Separator
              dotSize={value as DotSize}
              variant="dot-only"
              axis="horizontal"
              color="secondary"
              dotStyle="outlined"
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const DottedSizes: StoryObj<TemplateMultipleProps> = {
  render: DottedSizesTemplate,
  args: {
    property: 'dotSize',
    array: ['extra-small', 'small', 'medium', 'large'],
  },
};

const InlineSeparatorTemplate: StoryFn<SeparatorProps> = (args) => {
  const { dotPosition, ...safeArgs } = args;

  return (
    <>
      <Text>
        Lorem ipsum dolor sit, amet
        <Separator {...safeArgs} element="span" color="primary" spacing={0.5} />
        consectetur adipisicing elit.
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet
        <Separator {...safeArgs} element="span" color="secondary" spacing={1} />
        consectetur adipisicing elit.
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet
        <Separator {...safeArgs} element="span" color="accent" spacing={1.5} />
        consectetur adipisicing elit.
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet
        <Separator {...safeArgs} element="span" color="secondary" spacing={0.5} variant="dot-only" dotSize="small" />
        consectetur adipisicing elit.
      </Text>
    </>
  );
};

export const InlineSeparatorUsage: Story = {
  render: InlineSeparatorTemplate,
  args: { axis: 'vertical', display: 'inline' },
};

export const VerticalDottedCardExample: Story = {
  render: TemplateVertical,
  args: {
    axis: 'horizontal',
    variant: 'dotted',
    color: 'accent',
    spacing: 1,
    isStretched: true,
    dotPosition: 1.25,
    md: { axis: 'vertical' },
  },
};

export const VerticalDottedSmallCardExample: Story = {
  render: TemplateVertical,
  args: {
    axis: 'horizontal',
    spacing: 1,
    variant: 'dotted',
    dotSize: 'medium',
    color: 'accent',
    isStretched: true,
    dotPosition: 1.25,
    md: { axis: 'vertical' },
  },
};
