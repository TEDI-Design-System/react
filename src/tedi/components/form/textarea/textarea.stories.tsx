import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Textarea, { TextareaProps } from './textarea';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37618&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/25f281-text-area" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'TEDI-Ready/Components/Form/Textarea',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37618&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

interface TemplateStateProps extends TextareaProps {
  array: typeof stateArray;
}

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
            <Textarea disabled={state === 'Disabled'} {...textFieldProps} id={state} />
          </Col>
        </Row>
      ))}
      <Row>
        <Col lg={2} xs={12} className="flex align-items-center gap-3">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col>
          <Textarea
            {...textFieldProps}
            id="success-textarea"
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
          <Textarea
            {...textFieldProps}
            id="error-textarea"
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

const sizesArray: Array<'default' | 'small'> = ['default', 'small'];

const TemplateSizes: StoryFn<TextareaProps> = (args) => {
  return (
    <div className="example-list">
      {sizesArray.map((size, key) => (
        <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col width={12} sm={2}>
            <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
          </Col>
          <Col width={12} sm={10}>
            <Textarea {...args} size={size} id={`textarea-size-${size}`} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const TemplateTextValue: StoryFn<TextareaProps> = (args) => {
  const { value, ...props } = args;
  const [text, setText] = useState(value ?? '');
  return <Textarea value={text} onChange={(t) => setText(t)} {...props} />;
};

export const Default: Story = {
  args: {
    id: 'textarea-default',
    label: 'Label',
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
  args: {
    id: 'textarea-sizes',
    label: 'Label',
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
    id: 'textarea-with-hint',
    label: 'Label',
    helper: { text: 'Hint text' },
  },
};

export const HintTextAndCharacterCount: Story = {
  args: {
    id: 'textarea-hint-and-count',
    label: 'Label',
    characterLimit: 400,
    helper: [{ text: 'Hint text' }],
  },
};

export const OnlyCharacterCount: Story = {
  args: {
    id: 'textarea-only-count',
    label: 'Label',
    characterLimit: 400,
  },
};

export const TextValue: Story = {
  render: TemplateTextValue,
  args: {
    id: 'textarea-text-value',
    label: 'Label',
    value: 'Text value',
  },
};

export const Placeholder: Story = {
  args: {
    id: 'textarea-placeholder',
    label: 'Label',
    placeholder: 'Text value',
  },
};

export const DefaultValue: Story = {
  args: {
    id: 'textarea-default-value',
    label: 'Label',
    defaultValue: 'Text value',
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
    defaultValue:
      'Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid. Rebane toitub peamiselt närilistest. Ta on ettevaatlik ja oskab hästi põgeneda. Rebase urul on alati mitu väljapääsu. Urud on põhiliselt kutsikate kasvatamiseks. Ta kaevab urud ise või kohendab mägra urge.',
    isClearable: true,
    showClearOnInteraction: true,
  },
};

const heightExamples: (TextareaProps & { title: string })[] = [
  {
    title: 'Default (7.5rem)',
    id: 'sizing-default',
    placeholder: 'Rests at 7.5rem, drag to resize',
  },
  {
    title: 'Exact height (10rem)',
    id: 'sizing-exact',
    height: '10rem',
    placeholder: 'Rests at 10rem',
  },
  {
    title: 'Auto grow (defaults: minRows 3, no row limit)',
    id: 'sizing-auto-grow',
    autoGrow: true,
    placeholder: 'Type multiple lines to see it grow',
  },
  {
    title: 'Auto grow (minRows 3, maxRows 8)',
    id: 'sizing-auto-grow-bounded',
    autoGrow: true,
    maxRows: 8,
    placeholder: 'Grows up to eight rows, then scrolls',
  },
  {
    title: 'Auto grow, capped at 200px',
    id: 'sizing-auto-grow-capped',
    autoGrow: true,
    maxHeight: '200px',
    placeholder: 'Grows until 200px, then scrolls',
  },
];

const TemplateHeights: StoryFn<TextareaProps> = (args) => (
  <VerticalSpacing>
    {heightExamples.map(({ title, ...example }) => (
      <Row key={example.id}>
        <Col>
          <Text modifiers="bold">{title}</Text>
        </Col>
        <Col>
          <Textarea {...args} {...example} label="Label" />
        </Col>
      </Row>
    ))}
  </VerticalSpacing>
);

export const HeightExamples: Story = {
  render: TemplateHeights,
  parameters: {
    docs: {
      description: {
        story:
          'Without `autoGrow` the textarea rests at `height` (7.5rem by default) and can be dragged taller. With `autoGrow` it grows with its content from `minRows`, up to `maxRows` if set; leave `maxRows` unset for no row limit. `maxHeight` caps the height in both modes.',
      },
    },
  },
};
