import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import classNames from 'classnames';

import { VISUAL_TEST_VIEWPORTS, VisualTestStory } from '../../../../../.storybook/visual-test-story';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Heading } from '../typography/heading/heading';
import { Text } from '../typography/text/text';
import { Icon, IconProps } from './icon';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/28835d-icon" target="_blank">Zeroheight ↗</a><hr/>
 * <a href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_blank">Official Google Material Icons homepage icons ↗</a><br/>
 * <a href="https://www.figma.com/community/file/1014241558898418245/material-design-icons?searchSessionId=lvxhc4l5-a6" target="_blank">Material Icons Figma ↗</a><br/>
 * <a href="https://www.figma.com/community/plugin/740272380439725040/material-design-icons" target="_blank">Figma Material Symbols plugin ↗</a><hr/>
 *
 * Use a single icon `type` throughout your application. Each type is a separate font file, so import
 * `index-without-icons.css` together with only the style you use (e.g. `icons/outlined.css`) instead of
 * `index.css`. See [Get started](/docs/documentation-get-started--get-started) for details and the PWA precache note.
 */
const meta: Meta<typeof Icon> = {
  title: 'Tedi-Ready/Base/Icon',
  component: Icon,
  parameters: {
    chromatic: { disableSnapshot: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev',
    },
  },
};

export default meta;
type Story = StoryObj<TemplateMultipleProps>;

const sizeArray: IconProps['size'][] = [8, 12, 16, 18, 24, 36, 48];
const colorArray: IconProps['color'][] = [
  'primary',
  'secondary',
  'tertiary',
  'brand',
  'brand-dark',
  'success',
  'warning',
  'warning-dark',
  'danger',
  'white',
];

type IconPropsType = IconProps['size'] | IconProps['color'] | IconProps['type'] | IconProps['backgroundColor'];

interface MultipleProps<Type = IconPropsType> {
  array: Type[];
  property: keyof IconProps;
  items: {
    name: string;
    property: string;
    color: IconProps['color'];
    backgroundColor: IconProps['backgroundColor'];
    size: IconProps['size'];
  }[];
}

type TemplateMultipleProps = MultipleProps & IconProps;

const TemplateRow: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <>
      <Row>
        <Col>Outlined</Col>
      </Row>
      <Row alignItems="center">
        {array.map((value, key) => (
          <Col md="auto" key={key}>
            <div className={classNames({ 'bg bg-primary': value === 'white' })}>
              <Icon {...iconProps} {...{ [property]: value }} />
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>Filled</Col>
      </Row>
      <Row alignItems="center">
        {array.map((value, key) => (
          <Col md="auto" key={key}>
            <div className={classNames({ 'bg bg-primary': value === 'white' })}>
              <Icon {...iconProps} {...{ [property]: value }} filled={true} />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...iconProps } = args;

  return (
    <div className="example-list w-50">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="w-50 flex">
            {value?.toString()}&nbsp;{value === 24 && <small className="example-text--secondary">default</small>}
          </Col>
          <Col className="flex">
            <Icon {...iconProps} {...{ [property]: value }} />
            &nbsp;
            <Icon {...iconProps} {...{ [property]: value }} filled={true} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateColumnWithMultipleVariants: StoryFn<TemplateMultipleProps> = (args) => {
  const { items } = args;

  return (
    <div className="example-list w-50">
      {items.map((item, key) => (
        <Row
          justifyContent="start"
          className={`${key === items.length - 1 ? '' : 'border-bottom'} padding-14-16`}
          key={key}
        >
          <Col className="w-50 flex">
            {item.size?.toString()}&nbsp;
            {item.size === 24 && <small className="example-text--secondary">default</small>}
          </Col>
          <Col className="flex">
            <Icon {...{ size: item.size, backgroundColor: item.backgroundColor, name: item.name, color: item.color }} />
            &nbsp;
            <Icon
              {...{ size: item.size, backgroundColor: item.backgroundColor, name: item.name, color: item.color }}
              filled={true}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateColumnWithBackgroundCircleVarians: StoryFn<TemplateMultipleProps> = () => {
  return (
    <Row alignItems="center">
      <Col width="auto">
        <Row alignItems="center">
          <Col width="auto">
            <Icon name="Vaccines" backgroundColor="brand-primary" color="white" />
          </Col>
          <Col width="auto">
            <Icon name="Info" backgroundColor="brand-primary" color="white" size={16} />
          </Col>
          <Col width="auto">
            <Icon name="Vaccines" backgroundColor="brand-secondary" color="brand" />
          </Col>
          <Col width="auto">
            <Icon name="Info" backgroundColor="brand-secondary" color="brand" size={16} />
          </Col>
        </Row>
      </Col>
      <Col width="auto">
        <Row alignItems="center" className="bg bg-primary">
          <Col width="auto">
            <Icon name="Vaccines" backgroundColor="primary" color="brand" />
          </Col>
          <Col width="auto">
            <Icon name="Info" backgroundColor="primary" color="brand" size={16} />
          </Col>
          <Col width="auto">
            <Icon name="Vaccines" backgroundColor="secondary" color="white" />
          </Col>
          <Col width="auto">
            <Icon name="Info" backgroundColor="secondary" color="white" size={16} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Template: StoryFn<IconProps> = (args) => <Icon {...args} />;

export const Default: Story = {
  render: Template,

  args: {
    name: 'account_circle',
  },
};

export const Sizes: Story = {
  name: 'Icon Size',
  render: TemplateColumn,

  args: {
    name: 'account_circle',
    property: 'size',
    color: 'primary',
    array: sizeArray,
  },
};

export const SizesWithBackground: Story = {
  name: 'Icon size inside background',
  render: TemplateColumnWithMultipleVariants,
  args: {
    items: [
      {
        name: 'info',
        property: 'size',
        color: 'brand',
        backgroundColor: 'brand-secondary',
        size: 16,
      },
      {
        name: 'vaccines',
        property: 'size',
        color: 'brand',
        backgroundColor: 'brand-secondary',
        size: 24,
      },
    ],
  },
};

export const Colors: Story = {
  render: TemplateRow,
  name: 'Icon colors',

  args: {
    name: 'account_circle',
    property: 'color',
    array: colorArray,
    size: 48,
  },
};

export const Backgrounds: Story = {
  render: TemplateColumnWithBackgroundCircleVarians,
  name: 'Icon background colors',
};

const UsedInsideTextTemplate = (args: { name: IconProps['name'] }) => {
  return (
    <VerticalSpacing size={0.25}>
      <Heading element="h1">
        <Icon name={args.name} display="inline" />
        This is level 1 heading with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </Heading>
      <Heading element="h2">
        <Icon name={args.name} display="inline" />
        This is level 2 heading with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </Heading>
      <Heading element="h3">
        <Icon name={args.name} display="inline" />
        This is level 3 heading with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </Heading>
      <Heading element="h4">
        <Icon name={args.name} display="inline" />
        This is level 4 heading with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </Heading>
      <Heading element="h5">
        <Icon name={args.name} display="inline" />
        This is level 5 heading with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </Heading>
      <Heading element="h6">
        <Icon name={args.name} display="inline" />
        This is level 6 heading with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </Heading>
      <p>
        <Icon name={args.name} display="inline" />
        This is paragraph text with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </p>
      <small>
        <Icon name={args.name} display="inline" />
        This is small text with inline <Icon color="brand" name={args.name} display="inline" /> icon
      </small>
    </VerticalSpacing>
  );
};

export const UsedInsideText: Story = {
  render: UsedInsideTextTemplate,
  args: {
    name: 'account_circle',
  },
};

/** Chromatic snapshot for Icon: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false, viewports: VISUAL_TEST_VIEWPORTS } },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <VisualTestStory story={Default} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon size</Text>
        <VisualTestStory story={Sizes} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon size inside background</Text>
        <VisualTestStory story={SizesWithBackground} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon colors</Text>
        <VisualTestStory story={Colors} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon background colors</Text>
        <VisualTestStory story={Backgrounds} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Used inside text</Text>
        <VisualTestStory story={UsedInsideText} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
