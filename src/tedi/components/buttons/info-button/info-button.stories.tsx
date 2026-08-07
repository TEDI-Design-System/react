import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import { Label } from '../../content/label/label';
import { TextGroup } from '../../content/text-group/text-group';
import { Col, Row } from '../../layout/grid';
import { HideAt } from '../../layout/hide-at/hide-at';
import { ShowAt } from '../../layout/show-at/show-at';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Separator from '../../misc/separator/separator';
import { Link } from '../../navigation/link/link';
import Popover from '../../overlays/popover/popover';
import Tooltip from '../../overlays/tooltip/tooltip';
import InfoButton from './info-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-72997&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/0341c9-info-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof InfoButton> = {
  component: InfoButton,
  title: 'Tedi-Ready/Components/Buttons/InfoButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-72997&m=dev',
    },
    controls: { include: ['isSmall', 'color', 'aria-label'] },
  },
  args: {
    'aria-label': 'Rohkem infot',
  },
};

export default meta;
type Story = StoryObj<typeof InfoButton>;

const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus'];

type TemplateMultipleProps = {
  array: typeof buttonStateArray;
  color?: 'default' | 'inverted';
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, color = 'default', ...buttonProps } = args;

  return (
    <VerticalSpacing>
      {array.map((state, index) => (
        <Row key={index}>
          <Col xs={4} md={1} className="display-flex align-items-center">
            <Text modifiers="bold" color={color === 'inverted' ? 'white' : 'primary'}>
              {state}
            </Text>
          </Col>
          <Col xs={2} md={1} className="text-center">
            <InfoButton color={color} {...buttonProps} aria-label={`Info button ${state}`} id={state} />
          </Col>
        </Row>
      ))}
    </VerticalSpacing>
  );
};

export const Default: Story = {};

export const States: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const Inverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'inverted',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

const labelStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--layout-grid-gutters-04)',
};

export const UsageWithTooltipAndPopover: Story = {
  name: 'Usage with tooltip and popover',
  parameters: { controls: { disable: true } },
  render: () => {
    const bloodGroup = (
      <TextGroup
        type="vertical"
        label={
          <span style={labelStyle}>
            <Label>Veregrupp</Label>
            <Tooltip>
              <Tooltip.Trigger>
                <InfoButton aria-label="Rohkem infot veregrupi kohta" />
              </Tooltip.Trigger>
              <Tooltip.Content>Veregrupp määratakse vereanalüüsiga ning see ei muutu elu jooksul.</Tooltip.Content>
            </Tooltip>
          </span>
        }
        value="AB-"
      />
    );

    const dentalBenefit = (
      <TextGroup
        type="vertical"
        label={
          <span style={labelStyle}>
            <Label>Hambaravihüvitise jääk</Label>
            <Popover>
              <Popover.Trigger>
                <InfoButton aria-label="Rohkem infot hüvitise kohta" />
              </Popover.Trigger>
              <Popover.Content width="medium">
                <VerticalSpacing size={0.5}>
                  <Text>
                    Hambaravihüvitist saab kasutada jooksva kalendriaasta jooksul. Kasutamata jääk järgmisesse aastasse
                    ei kandu.
                  </Text>
                  <div style={{ textAlign: 'right' }}>
                    <Link href="#" underline={false} iconRight="arrow_forward">
                      Loe rohkem
                    </Link>
                  </div>
                </VerticalSpacing>
              </Popover.Content>
            </Popover>
          </span>
        }
        value="24€"
      />
    );

    return (
      <>
        <ShowAt md>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {bloodGroup}
            <Separator axis="vertical" isStretched />
            {dentalBenefit}
          </div>
        </ShowAt>
        <HideAt md>
          <VerticalSpacing size={1}>
            {bloodGroup}
            {dentalBenefit}
          </VerticalSpacing>
        </HideAt>
      </>
    );
  },
};
