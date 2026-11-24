import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { VisualTestStory } from '../../../../../.storybook/visual-test-story';
import { Text, TextProps } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Toggle, { ToggleProps } from './toggle';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.68?node-id=4536-77367&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/7083d0-toggle" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<ToggleProps> = {
  component: Toggle,
  title: 'TEDI-Ready/Components/Form/Toggle',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.68?node-id=4536-77367&m=dev',
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<ToggleProps>;

const sizeArray: readonly ['default', 'large'] = ['default', 'large'];
const stateArray = ['Default', 'Hover', 'Active', 'Focus', 'Disabled', 'Loading'];
interface TemplateMultipleProps<Type = string> extends ToggleProps {
  array: readonly Type[];
  titleColor?: TextProps['color'];
  size: ToggleProps['size'];
  property?: keyof ToggleProps;
  /** Gives each toggle a unique id, so `VisualTest` can render the template more than once. */
  idPrefix?: string;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, idPrefix } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={12} sm={2}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col width={12} sm={10} className="d-flex">
            <Toggle
              id={idPrefix ? `${idPrefix}${value}` : 'toggle-column-1'}
              label="Toggle"
              size={value as ToggleProps['size']}
              hideLabel
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateStates: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, idPrefix, ...toggleProps } = args;
  const toggleId = (state: string, index: number) => (idPrefix ? `${idPrefix}${state}-${index}` : state);

  return (
    <>
      <VerticalSpacing size={1}>
        {array.map((value, key) => (
          <Row key={key}>
            <Col lg={1} md={2} className="flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col width="auto" className="flex align-items-center gap-3">
              <Toggle
                {...toggleProps}
                label="Toggle"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                id={toggleId(value, 0)}
              />
              <Toggle
                {...toggleProps}
                label="Toggle"
                defaultChecked
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                id={toggleId(value, 1)}
              />
            </Col>
            <Col width="auto" className="flex align-items-center gap-3">
              <Toggle
                {...toggleProps}
                label="Toggle"
                size="large"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                id={toggleId(value, 2)}
              />
              <Toggle
                {...toggleProps}
                label="Toggle"
                defaultChecked
                size="large"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                id={toggleId(value, 3)}
              />
            </Col>
            <Col width="auto" className="flex align-items-center gap-3">
              <Toggle
                {...toggleProps}
                label="Toggle"
                size="large"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                id={toggleId(value, 4)}
                icon
              />
              <Toggle
                {...toggleProps}
                label="Toggle"
                defaultChecked
                size="large"
                disabled={value === 'Disabled'}
                isLoading={value === 'Loading'}
                id={toggleId(value, 5)}
                icon
              />
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const Default: Story = {
  args: {
    label: 'Toggle',
  },
};

export const Size: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: sizeArray,
  },
};

export const Type = () => {
  return (
    <Row>
      <Col width="auto">
        <Toggle id="toggle-1" defaultChecked label="Notifications" />
      </Col>
      <Col width="auto">
        <Toggle id="toggle-2" defaultChecked label="Notifications" tooltip="Tooltip content" />
      </Col>
      <Col width="auto">
        <Toggle id="toggle-3" defaultChecked label="Notifications" size="large" />
      </Col>
      <Col width="auto">
        <Toggle id="toggle-4" defaultChecked label="Notifications" size="large" icon />
      </Col>
    </Row>
  );
};

export const LabelPosition = () => {
  return (
    <Row>
      <Col width="auto">
        <VerticalSpacing>
          <Toggle id="toggle-label-1" defaultChecked label="Notifications" labelPosition="left" />
          <Toggle id="toggle-label-2" defaultChecked label="Notifications" labelPosition="right" />
        </VerticalSpacing>
      </Col>
    </Row>
  );
};

export const States = () => {
  return (
    <VerticalSpacing>
      <Row>
        <Col width="auto">
          <Toggle id="toggle-states-1" defaultChecked label="Open my personal data to doctors" />
        </Col>
        <Col width="auto">
          <Toggle id="toggle-states-2" label="Open my personal data to doctors" />
        </Col>
      </Row>
      <Row>
        <Col width="auto">
          <Toggle id="toggle-states-3" defaultChecked label="Open my personal data to doctors" type="outlined" />
        </Col>
        <Col width="auto">
          <Toggle id="toggle-states-4" label="Open my personal data to doctors" type="outlined" />
        </Col>
      </Row>
      <Row>
        <Col width="auto">
          <Toggle id="toggle-states-5" defaultChecked label="Open my personal data to doctors" color="colored" />
        </Col>
        <Col width="auto">
          <Toggle id="toggle-states-6" label="Open my personal data to doctors" color="colored" />
        </Col>
      </Row>
      <Row>
        <Col width="auto">
          <Toggle
            id="toggle-states-7"
            defaultChecked
            label="Open my personal data to doctors"
            color="colored"
            type="outlined"
          />
        </Col>
        <Col width="auto">
          <Toggle id="toggle-states-8" label="Open my personal data to doctors" color="colored" type="outlined" />
        </Col>
      </Row>
    </VerticalSpacing>
  );
};

export const Primary: StoryObj<TemplateMultipleProps> = {
  render: TemplateStates,
  args: {
    array: stateArray,
    hideLabel: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const PrimaryOutlined: StoryObj<TemplateMultipleProps> = {
  render: TemplateStates,
  args: {
    array: stateArray,
    type: 'outlined',
    hideLabel: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const Colored: StoryObj<TemplateMultipleProps> = {
  render: TemplateStates,
  args: {
    array: stateArray,
    color: 'colored',
    hideLabel: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const ColoredOutlined: StoryObj<TemplateMultipleProps> = {
  render: TemplateStates,
  args: {
    array: stateArray,
    color: 'colored',
    type: 'outlined',
    hideLabel: true,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const WithFeedbackText: Story = {
  args: {
    label: 'Label',
    helper: {
      text: 'Something went wrong',
      type: 'error',
    },
  },
};

const visualTestStateVariants: { label: string; idPrefix: string; story: StoryObj<TemplateMultipleProps> }[] = [
  { label: 'Primary', idPrefix: 'toggle-vt-primary-', story: Primary },
  { label: 'Primary outlined', idPrefix: 'toggle-vt-primary-outlined-', story: PrimaryOutlined },
  { label: 'Colored', idPrefix: 'toggle-vt-colored-', story: Colored },
  { label: 'Colored outlined', idPrefix: 'toggle-vt-colored-outlined-', story: ColoredOutlined },
];

const visualTestPseudoIds = (state: string) =>
  visualTestStateVariants.flatMap(({ idPrefix }) => [0, 1, 2, 3, 4, 5].map((index) => `#${idPrefix}${state}-${index}`));

/** Chromatic snapshot for Toggle: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: visualTestPseudoIds('Hover'),
      active: visualTestPseudoIds('Active'),
      focusVisible: visualTestPseudoIds('Focus'),
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <VisualTestStory story={Default} component={Toggle} props={{ id: 'toggle-vt-default' }} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Size</Text>
        <TemplateColumn {...(Size.args as TemplateMultipleProps)} idPrefix="toggle-vt-size-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Type</Text>
        <Type />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Label position</Text>
        <LabelPosition />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">States</Text>
        <States />
      </VerticalSpacing>
      {visualTestStateVariants.map(({ label, idPrefix, story }) => (
        <VerticalSpacing size={0.5} key={idPrefix}>
          <Text modifiers="bold">{label}</Text>
          <TemplateStates {...(story.args as TemplateMultipleProps)} idPrefix={idPrefix} />
        </VerticalSpacing>
      ))}
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">With feedback text</Text>
        <VisualTestStory story={WithFeedbackText} component={Toggle} props={{ id: 'toggle-vt-feedback' }} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
