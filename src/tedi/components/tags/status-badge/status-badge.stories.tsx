import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react/jsx-runtime';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Tooltip } from '../../overlays/tooltip';
import { StatusBadge, StatusBadgeColor, StatusBadgeProps, StatusBadgeSize, StatusBadgeStatus } from './status-badge';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2385-24154&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/764a67-status-badge" target="_BLANK">ZeroHeight ↗</a>
 */

const meta: Meta<typeof StatusBadge> = {
  component: StatusBadge,
  title: 'Tedi-Ready/Components/Tag/StatusBadge',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2385-24154&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

interface TemplateMultipleProps<Type = StatusBadgeProps['size']> extends StatusBadgeProps {
  array: Type[];
}

const colors: StatusBadgeColor[] = ['neutral', 'brand', 'accent', 'warning', 'danger', 'success'];
const variants: StatusBadgeProps['variant'][] = ['filled', 'filled-bordered', 'bordered'];
const statuses: StatusBadgeStatus[] = ['inactive', 'success', 'warning', 'danger'];
const sizeArray: StatusBadgeSize[] = ['default', 'large'];
const colorToIconMap: Record<StatusBadgeColor, string> = {
  neutral: 'edit',
  brand: 'send',
  accent: 'sync',
  success: 'check',
  danger: 'error',
  warning: 'warning',
  transparent: 'edit',
};

const statusToIconMap: Record<StatusBadgeStatus, string> = {
  inactive: 'edit',
  success: 'send',
  warning: 'sync',
  danger: 'error',
};

const Template: StoryFn<StatusBadgeProps> = (args) => <StatusBadge {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    color: 'neutral',
    variant: 'filled',
    children: 'Text',
  },
};

const TemplateAllCombos: StoryFn<StatusBadgeProps> = (args) => {
  return (
    <div className="badge-grid">
      <VerticalSpacing size={1}>
        {colors.map((color) => (
          <Row key={color} className="mb-2">
            <Col md={2} className="d-flex align-items-center">
              <strong>{color.charAt(0).toUpperCase() + color.slice(1)}</strong>
            </Col>
            {variants.map((variant) => (
              <Fragment key={variant}>
                <Col width="auto">
                  <StatusBadge {...args} color={color} variant={variant}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto">
                  <StatusBadge {...args} color={color} variant={variant} icon={colorToIconMap[color]}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto">
                  <StatusBadge {...args} color={color} variant={variant} icon={colorToIconMap[color]} />
                </Col>
              </Fragment>
            ))}
          </Row>
        ))}
      </VerticalSpacing>
    </div>
  );
};

const TemplateStatusGrid: StoryFn<StatusBadgeProps> = (args) => {
  return (
    <div className="badge-grid">
      <VerticalSpacing size={1}>
        {statuses.map((status) => (
          <Row key={status} className="mb-2">
            <Col md={2} className="d-flex align-items-center">
              <strong>{status?.charAt(0).toUpperCase() + (status as string).slice(1)}</strong>
            </Col>
            {variants.map((variant) => (
              <Fragment key={variant}>
                <Col width="auto">
                  <StatusBadge {...args} color="neutral" variant={variant} status={status}>
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto">
                  <StatusBadge
                    {...args}
                    color="neutral"
                    variant={variant}
                    icon={statusToIconMap[status]}
                    status={status}
                  >
                    Text
                  </StatusBadge>
                </Col>
                <Col width="auto">
                  <StatusBadge
                    {...args}
                    color="neutral"
                    variant={variant}
                    icon={statusToIconMap[status]}
                    status={status}
                  />
                </Col>
              </Fragment>
            ))}
          </Row>
        ))}
      </VerticalSpacing>
    </div>
  );
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={6}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col className="display-flex gap-2">
            <StatusBadge {...args} color="neutral" size={array[key]} />
            <StatusBadge {...args} color="neutral" size={array[key]} status="success" />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: sizeArray,
    children: 'Draft',
    color: 'neutral',
  },
};

export const Colors: Story = {
  render: TemplateAllCombos,
};

export const StatusIndicator: Story = {
  render: TemplateStatusGrid,
  args: {
    color: 'neutral',
  },
};

export const WithTooltip: StoryFn<StatusBadgeProps> = () => {
  return (
    <Tooltip placement="top">
      <Tooltip.Trigger>
        <StatusBadge color="warning" icon="warning" />
      </Tooltip.Trigger>
      <Tooltip.Content>
        Icon-only badges should always have a tooltip to provide context and ensure accessibility.
      </Tooltip.Content>
    </Tooltip>
  );
};
