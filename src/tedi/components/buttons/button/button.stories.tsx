import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ElementType } from 'react';

import { Text, TextProps } from '../../base/typography/text/text';
import { Card } from '../../content/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Alert from '../../notifications/alert/alert';
import { Button, ButtonProps } from './button';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=136-29124&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/10984a-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'TEDI-Ready/Components/Buttons/Button',
  parameters: {
    chromatic: { disableSnapshot: true },
    a11y: {
      config: {
        // TODO: [Button]: Review storybook a11y violations #843
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=136-19706&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const buttonStateArray = ['Default', 'Hover', 'Active', 'Loading', 'Disabled'];
const Template: StoryFn<ButtonProps<ElementType>> = (args) => <Button {...args} />;

export const Default: Story = {
  render: Template,
  argTypes: {
    as: {
      control: false,
      table: {
        type: { summary: 'ElementType' },
      },
    },
  },
  args: {
    children: 'Button',
  },
};

type TemplateMultipleProps<Type = typeof buttonStateArray> = Omit<ButtonProps<'button'>, 'children'> & {
  array: Type;
  titleColor?: TextProps['color'];
  idPrefix?: string;
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, idPrefix, ...buttonProps } = args;
  const getId = (value: string, index: number) => (idPrefix ? `${idPrefix}-${value}-${index}` : value);

  return (
    <>
      <VerticalSpacing size={0.5}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text color={titleColor} modifiers="bold">
              Default
            </Text>
          </Col>
          <Col className="text-bold">
            <Text color={titleColor} modifiers="bold">
              Small
            </Text>
          </Col>
        </Row>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col className="flex align-items-center gap-3">
              <Button
                id={getId(value, 1)}
                {...buttonProps}
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
              >
                Create
              </Button>
              <Button
                id={getId(value, 2)}
                {...buttonProps}
                iconRight="arrow_right_alt"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
              >
                Continue
              </Button>
              <Button
                id={getId(value, 3)}
                {...buttonProps}
                iconLeft="edit"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
              >
                Edit
              </Button>
              <Button
                id={getId(value, 4)}
                {...buttonProps}
                icon="arrow_right_alt"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                showTooltip
              >
                Icon Only
              </Button>
            </Col>
            <Col className="flex align-items-center gap-3">
              <Button
                id={getId(value, 5)}
                size="small"
                {...buttonProps}
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
              >
                Create
              </Button>
              <Button
                id={getId(value, 6)}
                size="small"
                {...buttonProps}
                iconRight="arrow_right_alt"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
              >
                Continue
              </Button>
              <Button
                id={getId(value, 7)}
                size="small"
                {...buttonProps}
                iconLeft="edit"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
              >
                Edit
              </Button>
              <Button
                id={getId(value, 8)}
                size="small"
                {...buttonProps}
                icon="arrow_right_alt"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                showTooltip
              >
                Icon Only
              </Button>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const Primary: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const PrimaryInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'primary',
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

export const Secondary: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'secondary',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const SecondaryInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'secondary',
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

export const Neutral: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'neutral',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const NeutralInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    visualType: 'neutral',
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

export const Success: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'success',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const Danger: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'danger',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const DangerNeutral: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: buttonStateArray,
    color: 'danger',
    visualType: 'neutral',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const NoStyleTemplate: StoryFn<ButtonProps> = (args) => {
  return (
    <Button {...args} noStyle={true}>
      Button without styles
    </Button>
  );
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Button',
  },
};

const ResponsiveTemplate: StoryFn<ButtonProps<ElementType>> = (args) => (
  <Row>
    <Col lg="auto">
      <Button {...args} lg={{ color: 'default' }} sm={{ color: 'success', visualType: 'primary' }}>
        Button - Success (sm)
      </Button>
    </Col>
    <Col lg="auto">
      <Button
        {...args}
        lg={{ color: 'default', visualType: 'primary' }}
        md={{ color: 'danger', visualType: 'neutral' }}
        sm={{ color: 'danger', visualType: 'primary' }}
      >
        Button - Danger neutral (md)
      </Button>
    </Col>
  </Row>
);

export const ResponsiveButton: Story = {
  render: ResponsiveTemplate,
  args: {
    children: 'Responsive Button',
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

const LongTextTemplate: StoryFn<ButtonProps> = (args) => (
  <VerticalSpacing>
    <Row>
      <Col md={6}>
        <Alert type="warning">Please avoid long text. This is fallback for emergencies — use only with caution.</Alert>
      </Col>
    </Row>
    <Row>
      <Col md={4} width={12}>
        <Button>{args.children}</Button>
      </Col>
      <Col md={4} width={12}>
        <Button iconLeft="edit">{args.children}</Button>
      </Col>
      <Col md={3} width={12}>
        <Button>{args.children}</Button>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const LongTextButtonThatWrapsIntoMultipleLines: Story = {
  args: {
    children: 'This is a very long button text that should wrap into multiple lines',
  },
  render: LongTextTemplate,
};

const VisualTypeLinkTemplate = () => (
  <VerticalSpacing>
    <Row gap={3}>
      <Col width="auto">
        <Button visualType="link">Add file</Button>
      </Col>
      <Col width="auto">
        <Button visualType="link" iconLeft="add">
          Add file
        </Button>
      </Col>
      <Col width="auto">
        <Button visualType="link" iconRight="add">
          Add file
        </Button>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const VisualTypeLink: StoryObj<TemplateMultipleProps> = {
  render: VisualTypeLinkTemplate,
};

const visualTestVariants: {
  label: string;
  idPrefix: string;
  inverted?: boolean;
  props: Pick<ButtonProps<'button'>, 'visualType' | 'color'>;
}[] = [
  { label: 'Primary', idPrefix: 'vt-primary', props: { visualType: 'primary' } },
  {
    label: 'Primary inverted',
    idPrefix: 'vt-primary-inverted',
    inverted: true,
    props: { visualType: 'primary', color: 'inverted' },
  },
  { label: 'Secondary', idPrefix: 'vt-secondary', props: { visualType: 'secondary' } },
  {
    label: 'Secondary inverted',
    idPrefix: 'vt-secondary-inverted',
    inverted: true,
    props: { visualType: 'secondary', color: 'inverted' },
  },
  { label: 'Neutral', idPrefix: 'vt-neutral', props: { visualType: 'neutral' } },
  {
    label: 'Neutral inverted',
    idPrefix: 'vt-neutral-inverted',
    inverted: true,
    props: { visualType: 'neutral', color: 'inverted' },
  },
  { label: 'Success', idPrefix: 'vt-success', props: { color: 'success' } },
  { label: 'Danger', idPrefix: 'vt-danger', props: { color: 'danger' } },
  { label: 'Danger neutral', idPrefix: 'vt-danger-neutral', props: { color: 'danger', visualType: 'neutral' } },
];

/** Chromatic snapshot for Button: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: '[id^="vt-"][id*="-Hover-"]',
      active: '[id^="vt-"][id*="-Active-"]',
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <Button>Button</Button>
      </VerticalSpacing>
      {visualTestVariants.map(({ label, idPrefix, inverted, props }) =>
        inverted ? (
          <Card key={idPrefix} background="brand-primary" borderless>
            <Card.Content>
              <VerticalSpacing size={0.5}>
                <Text modifiers="bold" color="white">
                  {label}
                </Text>
                <TemplateColumn array={buttonStateArray} titleColor="white" idPrefix={idPrefix} {...props} />
              </VerticalSpacing>
            </Card.Content>
          </Card>
        ) : (
          <VerticalSpacing key={idPrefix} size={0.5}>
            <Text modifiers="bold">{label}</Text>
            <TemplateColumn array={buttonStateArray} idPrefix={idPrefix} {...props} />
          </VerticalSpacing>
        )
      )}
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">No style</Text>
        <NoStyleTemplate>Button without styles</NoStyleTemplate>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Full width</Text>
        <Button fullWidth>Button</Button>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Long text</Text>
        <LongTextTemplate>This is a very long button text that should wrap into multiple lines</LongTextTemplate>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Visual type link</Text>
        <VisualTypeLinkTemplate />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
