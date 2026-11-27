import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ElementType, useState } from 'react';

import { VISUAL_TEST_VIEWPORTS, VisualTestStory } from '../../../../../.storybook/visual-test-story';
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

const buttonStateArray = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
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
    <VerticalSpacing size={2}>
      {(['default', 'small'] as const).map((size) => (
        // Wrapped: a nested VerticalSpacing redefines the variable its own margin reads.
        <div key={size}>
          <VerticalSpacing size={0.5}>
            <Text color={titleColor} modifiers="bold">
              {size === 'default' ? 'Default' : 'Small'}
            </Text>
            {array.map((value) => (
              <Row key={value}>
                <Col md={2} className="flex align-items-center">
                  <Text color={titleColor}>{value}</Text>
                </Col>
                <Col className="flex flex-wrap align-items-center gap-3">
                  <Button
                    id={getId(value, size === 'small' ? 5 : 1)}
                    size={size}
                    {...buttonProps}
                    disabled={value === 'Disabled'}
                  >
                    Create
                  </Button>
                  <Button
                    id={getId(value, size === 'small' ? 6 : 2)}
                    size={size}
                    {...buttonProps}
                    iconRight="arrow_right_alt"
                    disabled={value === 'Disabled'}
                  >
                    Continue
                  </Button>
                  <Button
                    id={getId(value, size === 'small' ? 7 : 3)}
                    size={size}
                    {...buttonProps}
                    iconLeft="edit"
                    disabled={value === 'Disabled'}
                  >
                    Edit
                  </Button>
                  <Button
                    id={getId(value, size === 'small' ? 8 : 4)}
                    size={size}
                    {...buttonProps}
                    icon="arrow_right_alt"
                    disabled={value === 'Disabled'}
                    showTooltip
                  >
                    Icon Only
                  </Button>
                </Col>
              </Row>
            ))}
          </VerticalSpacing>
        </div>
      ))}
    </VerticalSpacing>
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
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
      focusVisible: '#Focus',
    },
  },
};

const LoadingOnClick = () => {
  const [isLoading, setIsLoading] = useState(false);

  const save = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <Button isLoading={isLoading} loadingLabel="Salvestamine" onClick={save}>
      Salvesta
    </Button>
  );
};

export const Loading: StoryObj<TemplateMultipleProps> = {
  render: (args, context) => (
    <VerticalSpacing size={4}>
      <div>{TemplateColumn(args, context)}</div>
      <Row>
        <Col md={2} className="flex align-items-center">
          <Text modifiers="bold">On click</Text>
        </Col>
        <Col>
          <LoadingOnClick />
        </Col>
      </Row>
    </VerticalSpacing>
  ),
  args: {
    array: ['Default', 'Focus'],
    isLoading: true,
  },
  parameters: {
    pseudo: {
      focusVisible: '#Focus',
    },
  },
};

/**
 * The extra small size is only available for icon-only buttons. It does not grow on mobile.
 */
export const ExtraSmallIconOnly: StoryObj<ButtonProps<ElementType>> = {
  render: () => (
    <div className="flex align-items-center gap-3">
      <Button size="extra-small" icon="close" showTooltip>
        Close
      </Button>
      <Button size="extra-small" icon="edit" visualType="secondary" showTooltip>
        Edit
      </Button>
      <Button size="extra-small" icon="more_vert" visualType="neutral" showTooltip>
        More
      </Button>
      <Button size="extra-small" icon="close" disabled showTooltip>
        Close
      </Button>
    </div>
  ),
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
  story: StoryObj<TemplateMultipleProps>;
}[] = [
  { label: 'Primary', idPrefix: 'vt-primary', story: Primary },
  {
    label: 'Primary inverted',
    idPrefix: 'vt-primary-inverted',
    inverted: true,
    story: PrimaryInverted,
  },
  { label: 'Secondary', idPrefix: 'vt-secondary', story: Secondary },
  {
    label: 'Secondary inverted',
    idPrefix: 'vt-secondary-inverted',
    inverted: true,
    story: SecondaryInverted,
  },
  { label: 'Neutral', idPrefix: 'vt-neutral', story: Neutral },
  {
    label: 'Neutral inverted',
    idPrefix: 'vt-neutral-inverted',
    inverted: true,
    story: NeutralInverted,
  },
  { label: 'Success', idPrefix: 'vt-success', story: Success },
  { label: 'Danger', idPrefix: 'vt-danger', story: Danger },
  {
    label: 'Danger neutral',
    idPrefix: 'vt-danger-neutral',
    story: DangerNeutral,
  },
  { label: 'Loading', idPrefix: 'vt-loading', story: Loading },
];

/** Chromatic snapshot for Button: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false, viewports: VISUAL_TEST_VIEWPORTS },
    pseudo: {
      hover: '[id^="vt-"][id*="-Hover-"]',
      active: '[id^="vt-"][id*="-Active-"]',
      focusVisible: '[id^="vt-"][id*="-Focus-"]',
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <VisualTestStory story={Default} />
      </VerticalSpacing>
      {visualTestVariants.map(({ label, idPrefix, inverted, story }) =>
        inverted ? (
          <Card key={idPrefix} background="brand-primary" borderless>
            <Card.Content>
              <VerticalSpacing size={0.5}>
                <Text modifiers="bold" color="white">
                  {label}
                </Text>
                <VisualTestStory story={{ ...story, args: { ...story.args, idPrefix } }} />
              </VerticalSpacing>
            </Card.Content>
          </Card>
        ) : (
          <VerticalSpacing key={idPrefix} size={0.5}>
            <Text modifiers="bold">{label}</Text>
            <VisualTestStory story={{ ...story, args: { ...story.args, idPrefix } }} />
          </VerticalSpacing>
        )
      )}
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Extra small icon only</Text>
        <VisualTestStory story={ExtraSmallIconOnly} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">No style</Text>
        <VisualTestStory story={{ render: NoStyleTemplate }} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Full width</Text>
        <VisualTestStory story={FullWidth} component={Button} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Responsive</Text>
        <VisualTestStory story={ResponsiveButton} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Long text</Text>
        <VisualTestStory story={LongTextButtonThatWrapsIntoMultipleLines} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Visual type link</Text>
        <VisualTestStory story={VisualTypeLink} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
