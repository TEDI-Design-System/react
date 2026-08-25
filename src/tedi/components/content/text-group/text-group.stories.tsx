import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import InfoButton from '../../buttons/info-button/info-button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Link } from '../../navigation/link/link';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { Label } from '../label/label';
import { TextGroup, TextGroupProps } from './text-group';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/433820-text-group" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof TextGroup> = {
  component: TextGroup,
  title: 'Tedi-Ready/Content/TextGroup',
  subcomponents: { 'TextGroup.List': TextGroup.List } as never,
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
  argTypes: {
    labelAlign: {
      control: 'radio',
      options: ['left', 'right'],
      if: { arg: 'type', neq: 'vertical' },
      table: {
        disable: false,
      },
    },
    type: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextGroup>;

const TemplateWithLayouts: StoryFn<TextGroupProps> = (args) => {
  return (
    <VerticalSpacing size={1.5}>
      <TextGroup {...args} type="vertical" labelAlign="left" />
      <TextGroup {...args} type="horizontal" labelWidth="150px" />
      <TextGroup {...args} type="horizontal" labelWidth="150px" labelAlign="right" />
    </VerticalSpacing>
  );
};

const MultipleTextGroupsTemplate: StoryFn<TextGroupProps> = (args) => {
  const groups = [
    {
      labelWidth: '150px',
      items: [
        {
          label: 'Patsient',
          value: (
            <>
              <Icon name="person" size={18} color="tertiary" />
              <Text>Mari Maasikas</Text>
            </>
          ),
        },
        {
          label: 'Aadress',
          value: (
            <>
              <Icon name="location_on" size={16} color="tertiary" />
              <Text>Tulbi tn 4, Tallinn, 23562, Eesti</Text>
            </>
          ),
        },
      ],
    },
    {
      labelWidth: '180px',
      items: [
        {
          label: 'Vaktsiin',
          value: <Text>Mari Maasikas</Text>,
        },
        {
          label: 'Järgmine vaktsineerimine',
          value: <Text>Vaktsineerimine lõpetatud</Text>,
        },
      ],
    },
    {
      labelWidth: '200px',
      items: [
        {
          label: 'Tervishoiuteenuse osutaja',
          value: <Text>SA Põhja-Eesti Regionaalhaigla</Text>,
        },
        {
          label: 'Tervishoiutöötaja',
          value: <Text>Mart Mets</Text>,
        },
        {
          label: 'Dokumendi loomise aeg',
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

/**
 * Renders titled examples as a two-column list — the variant name on the left, the example(s) on the
 * right — with a divider between rows, so each variant is clearly separated.
 */
const ExampleRows = ({ rows }: { rows: { title: string; content: ReactNode }[] }): JSX.Element => (
  <Row>
    <Col className="example-list">
      {rows.map((row, key) => (
        <Row className={`${key === rows.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={12} md={3} className="flex align-items-center">
            <Text modifiers="bold">{row.title}</Text>
          </Col>
          <Col width={12} md={9}>
            {row.content}
          </Col>
        </Row>
      ))}
    </Col>
  </Row>
);

export const Default: Story = {
  args: {
    label: 'Ligipääsetavus',
    value: <Text>Arstile ja esindajale nähtav</Text>,
  },
};

/**
 * Position of the value relative to the label: stacked (`vertical`) or side by side
 * (`horizontal`) with the label aligned left or right.
 */
export const PositionType: Story = {
  name: 'Position',
  render: () => (
    <ExampleRows
      rows={[
        {
          title: 'Vertical',
          content: (
            <TextGroup type="vertical" label="Ligipääsetavus" value={<Text>Arstile ja esindajale nähtav</Text>} />
          ),
        },
        {
          title: 'Horizontal, label left',
          content: (
            <TextGroup
              type="horizontal"
              labelWidth="150px"
              label="Ligipääsetavus"
              value={<Text>Arstile ja esindajale nähtav</Text>}
            />
          ),
        },
        {
          title: 'Horizontal, label right',
          content: (
            <TextGroup
              type="horizontal"
              labelWidth="150px"
              labelAlign="right"
              label="Ligipääsetavus"
              value={<Text>Arstile ja esindajale nähtav</Text>}
            />
          ),
        },
      ]}
    />
  ),
};

/**
 * Both the label and the value can be regular or bold. Keep the weight consistent throughout the
 * project — pick one convention and stick to it.
 */
export const TextWeight: Story = {
  name: 'Text weight',
  render: () => (
    <ExampleRows
      rows={[
        {
          title: 'Regular label',
          content: <TextGroup label="Ligipääsetavus" value={<Text>Arstile ja esindajale nähtav</Text>} />,
        },
        {
          title: 'Bold label',
          content: (
            <TextGroup label={<Label isBold>Ligipääsetavus</Label>} value={<Text>Nähtav arstile ja esindajale</Text>} />
          ),
        },
        {
          title: 'Regular value',
          content: <TextGroup label="Ligipääsetavus" value={<Text>Nähtav arstile ja esindajale</Text>} />,
        },
        {
          title: 'Bold value',
          content: (
            <TextGroup label="Ligipääsetavus" value={<Text modifiers="bold">Nähtav arstile ja esindajale</Text>} />
          ),
        },
      ]}
    />
  ),
};

/**
 * The value can carry extra content beside the text: a link, a leading icon, or a status badge.
 * (For a trailing element like an info tooltip or a tag, see the **Has slot** story.)
 */
export const Types: Story = {
  name: 'Type',
  render: () => (
    <ExampleRows
      rows={[
        {
          title: 'Has link',
          content: (
            <VerticalSpacing size={1}>
              <TextGroup label="Ligipääsetavus" value={<Text>Nähtav arstile ja esindajale</Text>} />
              <TextGroup
                label="Ligipääsetavus"
                value={[
                  <Text key="v">Nähtav arstile ja esindajale</Text>,
                  <Link key="l" href="#">
                    Vaata dokumenti
                  </Link>,
                ]}
              />
              <TextGroup
                label="Ligipääsetavus"
                value={[
                  <Text key="v">Nähtav arstile ja esindajale</Text>,
                  <Link key="l" href="#">
                    dokument nr 4534
                  </Link>,
                ]}
              />
            </VerticalSpacing>
          ),
        },
        {
          title: 'Has icon',
          content: (
            <VerticalSpacing size={1}>
              <TextGroup
                label="Ligipääsetavus"
                value={[
                  <Icon key="i" name="lock" size={16} color="tertiary" />,
                  <Text key="v">Nähtav arstile ja esindajale</Text>,
                ]}
              />
              <TextGroup
                label="Patsient"
                value={[<Icon key="i" name="person" size={18} color="tertiary" />, <Text key="v">Mari Maasikas</Text>]}
              />
            </VerticalSpacing>
          ),
        },
        {
          title: 'Has status',
          content: (
            <TextGroup
              label="Ligipääs"
              value={
                <VerticalSpacing size={0.25}>
                  <Text>Arstile ja esindajale nähtav</Text>
                  <StatusBadge color="brand">Esitatud</StatusBadge>
                </VerticalSpacing>
              }
            />
          ),
        },
      ]}
    />
  ),
};

/**
 * The Figma "Has slot" variant is just a `value` that carries a trailing element — an info tooltip, a
 * `StatusBadge`, a `Tag`, etc. Because `value` accepts multiple nodes and the value row is a flex
 * container with a small gap, the extra element sits inline beside the text (which hugs its content).
 * No dedicated slot prop is needed — pass an array or a fragment as the `value`.
 */
export const HasSlot: Story = {
  name: 'Has slot',
  render: () => (
    <VerticalSpacing size={1}>
      <TextGroup
        label="Ligipääs"
        value={[
          <Text key="v">Arstile ja esindajale nähtav</Text>,
          <InfoButton key="s" aria-label="Lisainfo ligipääsu kohta" />,
        ]}
      />
      <TextGroup
        label="Nimi"
        value={[
          <Text key="v">Mari Maasikas</Text>,
          <StatusBadge key="s" color="success">
            Ligipääs lubatud
          </StatusBadge>,
        ]}
      />
    </VerticalSpacing>
  ),
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

/**
 * Override the label `type` and `labelWidth` per breakpoint. Below `sm` the label stacks above the
 * value; from `sm` up it sits beside the value, widening at `md` and `lg`. Resize the preview to see
 * the layout adapt.
 */
export const Responsive: Story = {
  render: () => {
    const rows = [
      { label: 'Patsient', value: 'Mari Maasikas' },
      { label: 'Aadress', value: 'Tulbi tn 4, Tallinn, 23562, Eesti' },
      { label: 'Vaktsiin', value: 'Mari Maasikas' },
      { label: 'Järgmine vaktsineerimine', value: 'Immuniseerimine lõpetatud' },
      { label: 'Tervishoiuteenuse osutaja', value: 'SA Põhja-Eesti Regionaalhaigla' },
      { label: 'Tervishoiutöötaja', value: 'Mart Mets' },
      { label: 'Dokumendi loomise aeg', value: '16.08.2023 14:51:48' },
    ];

    return (
      <VerticalSpacing size={0.25}>
        {rows.map((row, index) => (
          <TextGroup
            key={index}
            type="vertical"
            sm={{ type: 'horizontal', labelWidth: '120px' }}
            md={{ labelWidth: '200px' }}
            lg={{ labelWidth: '25%' }}
            label={row.label}
            value={<Text>{row.value}</Text>}
          />
        ))}
      </VerticalSpacing>
    );
  },
};

export const CustomLabel: Story = {
  render: () => (
    <VerticalSpacing>
      <TextGroup
        label={
          <Text modifiers="bold" color="secondary">
            Authorisations <InfoButton>More information</InfoButton>
          </Text>
        }
        value={<Text>Visible to doctor and representative</Text>}
      />
      <TextGroup
        label={
          <Text modifiers="bold" color="secondary">
            Status <StatusBadge color="success">Active</StatusBadge>
          </Text>
        }
        value={<Text>Some text regarding to status</Text>}
        type="horizontal"
      />
    </VerticalSpacing>
  ),
};

/**
 * `TextGroup.List` renders multiple label / value pairs inside a **single**
 * `<dl>` element instead of stacking N separate `<TextGroup>`s — so screen
 * readers announce them as one definition list rather than N fragments. Use
 * it whenever the rows describe the same entity (patient summary, document
 * metadata, …). Each row supports the same `labelAlign` / `labelWidth`
 * overrides as the single-pair component when you need per-row tweaks.
 */
export const WithList: Story = {
  render: () => (
    <ExampleRows
      rows={[
        {
          title: 'Vertical list (default)',
          content: (
            <TextGroup.List
              items={[
                { label: 'Patient', value: <Text>Mari Maasikas</Text> },
                { label: 'Address', value: <Text>Tulbi tn 4, Tallinn, 23562, Estonia</Text> },
                { label: 'Vaccine', value: <Text>COVID-19 mRNA</Text> },
                { label: 'Next vaccination', value: <Text>Immunization finished</Text> },
              ]}
            />
          ),
        },
        {
          title: 'Horizontal list with shared label column',
          content: (
            <TextGroup.List
              type="horizontal"
              labelWidth="220px"
              items={[
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
                { label: 'Healthcare provider', value: <Text>SA Põhja-Eesti Regionaalhaigla</Text> },
                { label: 'Healthcare specialist', value: <Text>Mart Mets</Text> },
                { label: 'Document creation time', value: <Text>16.08.2023 14:51:48</Text> },
              ]}
            />
          ),
        },
        {
          title: 'Per-row labelAlign / labelWidth overrides',
          content: (
            <TextGroup.List
              type="horizontal"
              labelWidth="160px"
              items={[
                { label: 'Item', value: <Text>USB-C charging cable</Text> },
                { label: 'Quantity', value: <Text>2</Text> },
                { label: 'Unit price', value: <Text>€ 12.50</Text>, labelAlign: 'right', labelWidth: '220px' },
                {
                  label: 'Total',
                  value: <Text modifiers="bold">€ 25.00</Text>,
                  labelAlign: 'right',
                  labelWidth: '220px',
                },
              ]}
            />
          ),
        },
      ]}
    />
  ),
};
