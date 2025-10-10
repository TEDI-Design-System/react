import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { TextGroup, TextGroupProps } from './text-group';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/433820-text-group" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof TextGroup> = {
  component: TextGroup,
  title: 'Tedi-Ready/Content/TextGroup',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextGroup>;

const TemplateWithLayouts: StoryFn<TextGroupProps> = (args) => {
  return (
    <VerticalSpacing size={1}>
      <TextGroup type="vertical" {...args} />
      <TextGroup type="horizontal" labelWidth="150px" {...args} />
    </VerticalSpacing>
  );
};

const MultipleTextGroupsTemplate: StoryFn<TextGroupProps> = (args) => {
  const groups = [
    {
      labelWidth: '150px',
      items: [
        {
          label: 'Patient',
          value: (
            <>
              <Icon name="person" size={18} color="tertiary" />
              <Text>Mari Maasikas</Text>
            </>
          ),
        },
        {
          label: 'Address',
          value: (
            <>
              <Icon name="location_on" size={16} color="tertiary" />
              <Text>Tulbi tn 4, Tallinn, 23562, Estonia</Text>
            </>
          ),
        },
      ],
    },
    {
      labelWidth: '180px',
      items: [
        {
          label: 'Vaccine',
          value: <Text>Mari Maasikas</Text>,
        },
        {
          label: 'Next vaccination',
          value: <Text>Immunization finished</Text>,
        },
      ],
    },
    {
      labelWidth: '200px',
      items: [
        {
          label: 'Healthcare provider',
          value: <Text>SA Põhja-Eesti Regionaalhaigla</Text>,
        },
        {
          label: 'Healthcare specialist',
          value: <Text>Mart Mets</Text>,
        },
        {
          label: 'Document creation time',
          value: <Text>16.08.2023 14:51:48</Text>,
        },
      ],
    },
  ];

  return (
    <VerticalSpacing size={1}>
      {groups.map((group, groupIndex) => (
        <Row key={groupIndex}>
          <Col>
            {group.items.map((item, index) => (
              <TextGroup key={index} {...args} label={item.label} labelWidth={group.labelWidth} value={item.value} />
            ))}
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

const TemplateWithTypes: StoryFn<TextGroupProps> = (args) => {
  return (
    <Row>
      <Col>
        <VerticalSpacing size={1}>
          <TextGroup type="vertical" {...args} />
          <TextGroup
            {...args}
            type="vertical"
            value={
              <>
                <Icon name="lock" size={16} color="tertiary" />
                <Text>Visible to doctor and representative</Text>
              </>
            }
          />
          <TextGroup
            {...args}
            type="vertical"
            value={<Text modifiers="bold">Visible to doctor and representative</Text>}
          />
          <TextGroup
            label="Patient"
            value={
              <>
                <Icon name="person" size={18} color="tertiary" />
                <Text>Mari Maasikas</Text>
              </>
            }
            type="horizontal"
          />
        </VerticalSpacing>
      </Col>
    </Row>
  );
};

export const Default: Story = {
  render: TemplateWithLayouts,
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};

export const Types: Story = {
  render: TemplateWithTypes,
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};

export const PositionType: Story = {
  render: TemplateWithLayouts,
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};

export const HorizontalLabelLength: Story = {
  render: MultipleTextGroupsTemplate,
  args: {
    type: 'horizontal',
  },
};

export const LongTextValues: Story = {
  render: TemplateWithLayouts,
  args: {
    label: 'Accessibility',
    labelWidth: '150px',
    value: (
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar malesuada tellus, nec efficitur orci
        interdum vitae. Proin semper venenatis est, vel malesuada sapien ornare at. Vestibulum egestas in lectus non
        finibus. Donec rhoncus sapien vel justo elementum vestibulum. Vivamus euismod dui vel erat semper luctus. Nulla
        egestas purus elit, non fermentum sapien sagittis nec. Pellentesque ac sapien non justo vehicula porta.
      </Text>
    ),
  },
};
