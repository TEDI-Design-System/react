import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Label } from '../../content/label/label';
import { Col, Row } from '../../layout/grid';
import FormLabel from './form-label';

const meta: Meta<typeof FormLabel> = {
  component: FormLabel,
  title: 'TEDI-Ready/Components/Form/FormLabel',
  parameters: {
    status: {
      type: 'internalComponent',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormLabel>;

export const Default: Story = {
  args: {
    id: 'input-id-1',
    label: 'Label of input',
  },
};

const sizeArray = ['default', 'small'];

const SizeTemplate: StoryFn = () => {
  return (
    <div className="example-list">
      {sizeArray.map((size, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="flex w-50">
            <b>{size.charAt(0).toUpperCase() + size.slice(1)}</b>
          </Col>
          <Col className="flex gap-3">
            <Label isSmall={size === 'small'}>Label</Label>
            <Label isSmall={size === 'small'} isBold={true}>
              Label
            </Label>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Size = {
  render: SizeTemplate,
};

const StructureTemplate: StoryFn = () => {
  return (
    <Row cols={1} gap={3}>
      <Col>
        <Label>Active ingredient</Label>
      </Col>
      <Col>
        <Label required>Active ingredient</Label>
      </Col>
      <Col>
        <Label tooltip="Tooltip content">Active ingredient</Label>
      </Col>
      <Col>
        <Label required tooltip="Tooltip content">
          Active ingredient
        </Label>
      </Col>
    </Row>
  );
};

export const Structure = {
  render: StructureTemplate,
};

/**
 * By default a long label wraps onto multiple lines when the available width is
 * constrained, which can distort form layouts. Use `labelProps.modifiers` to control
 * the wrapping/breaking behavior — e.g. `'nowrap'` to keep it on a single line, or
 * `'break-word'` / `'break-all'` to control where it breaks.
 */
const WrappingTemplate: StoryFn = () => {
  const longLabel = 'This is an unusually long input label that would normally break across several lines';

  return (
    <Row cols={1} gap={5}>
      <Col style={{ maxWidth: 220, border: '1px dashed var(--general-border-primary)', padding: 8 }}>
        <b>Default (wraps)</b>
        <FormLabel id="wrap-default" label={longLabel} />
      </Col>
      <Col style={{ maxWidth: 220, border: '1px dashed var(--general-border-primary)', padding: 8 }}>
        <b>modifiers: &apos;nowrap&apos;</b>
        <FormLabel id="wrap-nowrap" label={longLabel} labelProps={{ modifiers: 'nowrap' }} />
      </Col>
      <Col style={{ maxWidth: 220, border: '1px dashed var(--general-border-primary)', padding: 8 }}>
        <b>modifiers: &apos;break-all&apos;</b>
        <FormLabel id="wrap-break-all" label={longLabel} labelProps={{ modifiers: 'break-all' }} />
      </Col>
    </Row>
  );
};

export const LabelWrapping = {
  render: WrappingTemplate,
};
