import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { VisualTestStory } from '../../../../../.storybook/visual-test-story';
import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import TextField, { TextFieldProps } from './textfield';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37649&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/328d11-text-field" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'TEDI-Ready/Components/Form/TextField',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37649&m=dev',
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

interface TemplateStateProps extends TextFieldProps {
  array: typeof stateArray;
}

const sizeArray: TextFieldProps['size'][] = ['default', 'small'];

interface TemplateMultipleProps<Type = TextFieldProps['size']> extends TextFieldProps {
  array: Type[];
  property: keyof TextFieldProps;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, ...textFieldProps } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => (
        <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={12} sm={2}>
            <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
          </Col>
          <Col width={12} sm={10}>
            <VerticalSpacing>
              <TextField {...textFieldProps} id={`${textFieldProps.id}-${key}-1`} {...{ [property]: value }} />
              <TextField
                icon={{ name: 'person' }}
                {...textFieldProps}
                id={`${textFieldProps.id}-${key}-2`}
                {...{ [property]: value }}
              />
            </VerticalSpacing>
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array, ...textFieldProps } = args;

  return (
    <VerticalSpacing>
      {array.map((state, index) => (
        <Row key={index}>
          <Col lg={2} xs={12} className="flex align-items-center gap-3">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col>
            <TextField disabled={state === 'Disabled'} {...textFieldProps} id={state} />
          </Col>
        </Row>
      ))}
      <Row>
        <Col lg={2} xs={12} className="flex align-items-center gap-3">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col>
          <TextField
            {...textFieldProps}
            id="success-textfield"
            helper={{
              text: 'Feedback text',
              type: 'valid',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={2} xs={12} className="flex align-items-center gap-3">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col>
          <TextField
            {...textFieldProps}
            id="error-textfield"
            helper={{
              text: 'Feedback text',
              type: 'error',
            }}
          />
        </Col>
      </Row>
    </VerticalSpacing>
  );
};

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
  },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,

  args: {
    id: 'example-2',
    label: 'Label',
    property: 'size',
    value: 'Text value',
    array: sizeArray,
  },
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Label',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const WithHint: Story = {
  args: {
    ...Default.args,
    id: 'example-3',
    helper: {
      id: 'example-3-helper',
      text: 'Hint text',
      type: 'hint',
    },
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    id: 'example-4',
    input: { type: 'password' },
    value: '123456789',
  },
};

/**
 * A password field with a show/hide toggle. The trailing `icon` becomes a button via `onIconClick`;
 * clicking it swaps the input `type` between `password` and `text` and updates the icon. Give the
 * icon button an `aria-label` and `aria-pressed` (through `iconButtonProps`) so screen-reader users
 * know it toggles password visibility and its current state.
 */
export const PasswordWithToggle: Story = {
  render: function PasswordWithToggle() {
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState('SuperSecret123');

    return (
      <TextField
        id="example-password-toggle"
        label="Password"
        value={value}
        onChange={setValue}
        input={{ type: isVisible ? 'text' : 'password', autoComplete: 'current-password' }}
        icon={isVisible ? 'visibility_off' : 'visibility'}
        onIconClick={() => setIsVisible((prev) => !prev)}
        iconButtonProps={{
          'aria-label': 'Show password',
          'aria-pressed': isVisible,
        }}
      />
    );
  },
};

export const Placeholder: Story = {
  args: {
    ...Default.args,
    id: 'example-5',
    placeholder: 'Text value',
  },
};

/**
 * `showClearOnInteraction` reveals the clear (×) button only while the field is hovered or focused
 * (keyboard focus included), instead of whenever it has a value. Requires `isClearable`.
 */
export const ClearButtonOnInteraction: Story = {
  args: {
    id: 'example-clear-on-interaction',
    label: 'Label',
    defaultValue: 'Text value',
    isClearable: true,
    showClearOnInteraction: true,
  },
};

/** Chromatic snapshot for TextField: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <VisualTestStory story={Default} component={TextField} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Sizes</Text>
        <VisualTestStory story={Sizes} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">States</Text>
        <VisualTestStory story={States} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">With hint</Text>
        <VisualTestStory story={WithHint} component={TextField} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Password</Text>
        <VisualTestStory story={Password} component={TextField} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Password with toggle</Text>
        <VisualTestStory story={PasswordWithToggle} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Placeholder</Text>
        <VisualTestStory story={Placeholder} component={TextField} />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Clear button on interaction</Text>
        <VisualTestStory story={ClearButtonOnInteraction} component={TextField} />
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
