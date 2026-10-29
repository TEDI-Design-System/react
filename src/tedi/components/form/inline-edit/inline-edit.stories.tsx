import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import { Card, CardContent } from '../../content/card';
import { Label } from '../../content/label/label';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { StatusBadge, type StatusBadgeColor } from '../../tags/status-badge/status-badge';
import { Tag } from '../../tags/tag/tag';
import { Checkbox } from '../checkbox';
import { DateField } from '../date-field/date-field';
import { FeedbackTextProps } from '../feedback-text/feedback-text';
import { NumberField } from '../number-field/number-field';
import { Radio } from '../radio';
import { ISelectOption, Select } from '../select/select';
import { Textarea } from '../textarea/textarea';
import { TextField } from '../textfield/textfield';
import { InlineEdit } from './inline-edit';

const countryOptions: ISelectOption[] = [
  { value: 'ee', label: 'Eesti' },
  { value: 'fi', label: 'Soome' },
  { value: 'se', label: 'Rootsi' },
];

const typeOptions: ISelectOption[] = [
  { value: 'prototype', label: 'Prototüüp' },
  { value: 'design', label: 'Disain' },
  { value: 'concept', label: 'Kontseptsioon' },
];

const keywordOptions: ISelectOption[] = [
  { value: 'prototype', label: 'Prototüüp' },
  { value: 'figma', label: 'Figma' },
  { value: 'design', label: 'Disain' },
  { value: 'ui', label: 'Kasutajaliides' },
];

const olekOptions: ISelectOption[] = [
  { value: 'done', label: 'Lõpetatud' },
  { value: 'in-progress', label: 'Töös' },
  { value: 'planned', label: 'Planeeritud' },
];

const olekColor: Record<string, StatusBadgeColor> = {
  done: 'success',
  'in-progress': 'warning',
  planned: 'brand',
};

const addressOptions: ISelectOption[] = [
  { value: 'tallinn', label: 'Tulbi tn 6, Tallinn' },
  { value: 'tartu', label: 'Riia 12, Tartu' },
];

const FieldRow = ({ label, children }: { label: string; children: React.ReactNode }): JSX.Element => (
  <Row alignItems="start" gutter={2}>
    <Col width="auto">
      <Label style={{ display: 'block', width: '6.5rem', paddingTop: 'var(--tedi-dimensions-01)' }}>{label}</Label>
    </Col>
    <Col>{children}</Col>
  </Row>
);

const NameInline = (props: {
  id: string;
  label?: string;
  defaultValue?: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: 'default' | 'small';
  editIconPosition?: 'inline' | 'end';
  contentWidth?: boolean;
  defaultEditing?: boolean;
  invalid?: boolean;
  helper?: FeedbackTextProps | FeedbackTextProps[];
}): JSX.Element => {
  const { id, label = 'Nimi', defaultValue = 'Mari Maasikas', placeholder, ...rest } = props;
  return (
    <InlineEdit<string>
      label={label}
      id={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      renderValue={placeholder ? (v) => v : (v) => v || '—'}
      {...rest}
    >
      {({ value, onChange, size: editorSize }) => (
        <TextField id={`${id}-input`} label={label} hideLabel value={value} onChange={onChange} size={editorSize} />
      )}
    </InlineEdit>
  );
};

const alignFields: { label: string; value: string }[] = [
  { label: 'Kuupäev', value: '22.03.2026' },
  { label: 'Kellaaeg', value: '08:00' },
  { label: 'Kohtade arv', value: '2' },
  { label: 'Aadress', value: 'Tulbi tn 6, Tallinn' },
];

const AlignExample = ({ align, idPrefix }: { align: 'inline' | 'end'; idPrefix: string }): JSX.Element => (
  <Card>
    <CardContent>
      <VerticalSpacing size={0.25}>
        {alignFields.map((field, index) => (
          <Row key={field.label} alignItems="center" gutter={2}>
            <Col width="auto">
              <Label style={{ display: 'block', width: '6.5rem' }}>{field.label}</Label>
            </Col>
            <Col>
              <NameInline
                id={`${idPrefix}-${index}`}
                label={field.label}
                defaultValue={field.value}
                editIconPosition={align}
              />
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </CardContent>
  </Card>
);

const CountryInline = (props: {
  id: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'default' | 'small';
  contentWidth?: boolean;
  editIconPosition?: 'inline' | 'end';
  defaultEditing?: boolean;
  invalid?: boolean;
  helper?: FeedbackTextProps | FeedbackTextProps[];
}): JSX.Element => {
  const { id, ...rest } = props;
  return (
    <InlineEdit<ISelectOption | null>
      label="Riik"
      id={id}
      defaultValue={countryOptions[0]}
      renderValue={(v) => (v ? (v.label as string) : '—')}
      {...rest}
    >
      {({ value, onChange, commit }) => (
        <Select
          id={`${id}-input`}
          label="Riik"
          hideLabel
          size="small"
          options={countryOptions}
          value={value}
          onChange={(next) => {
            onChange(next as ISelectOption | null);
            commit();
          }}
        />
      )}
    </InlineEdit>
  );
};

/**
 * Displays a value as text with an edit icon. Activate it to edit the value in place.
 *
 * Supply any TEDI form control through the `children` render function and wire it to the render props (`value`,
 * `onChange`, `commit`, `cancel`).
 *
 * See <a href="?path=/docs/tedi-ready-components-form-inlineedit--render-props-hook">Render props & hook</a> for the
 * editor render props, committing on pick, and the headless `useInlineEdit` hook.
 *
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.106.103?node-id=65952-130950&m=dev" target="_BLANK">Figma ↗</a><br/>
 */
const meta: Meta<typeof InlineEdit> = {
  title: 'TEDI-Ready/Components/Form/InlineEdit',
  component: InlineEdit,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.106.103?node-id=65952-130950&m=dev',
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label for the field, announced on the read trigger.',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'Shown in the read view when the value is empty.',
      table: { type: { summary: 'ReactNode' } },
    },
    size: {
      control: 'radio',
      options: ['default', 'small'],
      description: 'Size of the read trigger and editor.',
      table: { type: { summary: 'default | small' }, defaultValue: { summary: 'default' } },
    },
    editIconPosition: {
      control: 'radio',
      options: ['end', 'inline'],
      description:
        'Whether the edit icon is pushed to the trailing edge or sits straight after the value. Hidden while the row is invalid.',
      table: { type: { summary: 'end | inline' }, defaultValue: { summary: 'end' } },
    },
    readOnly: {
      control: 'boolean',
      description:
        'Renders the value as plain text with no edit affordance, lined up with editable rows. For a block that is entirely read-only, use `TextGroup` instead.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'Disables editing while keeping the trigger and edit icon visible but greyed (for saving/pending or dependent fields). Differs from `readOnly`, which drops the edit affordance entirely.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    contentWidth: {
      control: 'boolean',
      description:
        'Sizes the row to its value rather than filling its container. The row then changes width when the editor opens, so it is reserved for a value edited inside running text.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    defaultEditing: {
      control: false,
      description: 'Starts in edit mode. An editor that starts open does not take focus.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    value: {
      control: false,
      description: 'Controlled committed value. Pair with `onChange`.',
      table: { type: { summary: 'T' } },
    },
    defaultValue: {
      control: false,
      description: 'Initial committed value for uncontrolled use. Ignored when `value` is set.',
      table: { type: { summary: 'T' } },
    },
    onChange: {
      control: false,
      description: 'Called with the draft when an edit is committed.',
      table: { type: { summary: '(value: T) => void' } },
    },
    renderValue: {
      control: false,
      description:
        'Renders the read view. Defaults to the value itself — use it to format a `Date` or map an option to its label.',
      table: { type: { summary: '(value: T) => ReactNode' } },
    },
    children: {
      control: false,
      description:
        'Render function returning any TEDI control wired to the editor render props (`value`, `onChange`, `commit`, `cancel`).',
      table: { type: { summary: '(editor: InlineEditEditor<T>) => ReactNode' } },
    },
    id: { control: false, description: 'id applied to the read trigger.', table: { type: { summary: 'string' } } },
    className: {
      control: false,
      description: 'Additional class on the root element.',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineEdit>;

export const Default: Story = {
  args: {
    label: 'Nimi',
    placeholder: 'Sisesta nimi',
    size: 'default',
    editIconPosition: 'end',
    readOnly: false,
    disabled: false,
    contentWidth: false,
  },
  render: function DefaultField(args) {
    const [value, setValue] = useState('Mari Maasikas');
    return (
      <div style={{ maxWidth: '218px' }}>
        <InlineEdit<string>
          label={args.label}
          placeholder={args.placeholder}
          size={args.size}
          editIconPosition={args.editIconPosition}
          readOnly={args.readOnly}
          disabled={args.disabled}
          contentWidth={args.contentWidth}
          value={value}
          onChange={setValue}
          renderValue={(v) => v}
        >
          {({ value: draft, onChange, size: editorSize }) => (
            <TextField
              id="default-value"
              label={args.label}
              hideLabel
              value={draft}
              onChange={onChange}
              size={editorSize}
            />
          )}
        </InlineEdit>
      </div>
    );
  },
};

const NamedRow = ({ name, children }: { name: string; children: React.ReactNode }): JSX.Element => (
  <Row alignItems="center" gutter={2}>
    <Col width="auto">
      <div style={{ width: '6.5rem' }}>
        <Text modifiers="bold">{name}</Text>
      </div>
    </Col>
    <Col>{children}</Col>
  </Row>
);

/**
 * The editor is any TEDI form control, wired to the render props. Give it its own accessible label — a visible label
 * linked by `id`, or `hideLabel`. `InlineEdit`'s `label` names only the read trigger.
 */
export const Type: Story = {
  render: function Type() {
    const [type, setType] = useState<ISelectOption | null>(typeOptions[0]);
    return (
      <VerticalSpacing size={0.5} style={{ maxWidth: '338px' }}>
        <NamedRow name="Text field">
          <NameInline id="ie-type-text" />
        </NamedRow>
        <NamedRow name="Select">
          <InlineEdit<ISelectOption | null>
            label="Tüüp"
            value={type}
            onChange={setType}
            renderValue={(v) => (v ? (v.label as string) : '—')}
          >
            {({ value, onChange, commit }) => (
              <Select
                id="ie-type-select"
                size="small"
                label="Tüüp"
                hideLabel
                options={typeOptions}
                value={value}
                onChange={(next) => {
                  onChange(next as ISelectOption | null);
                  commit();
                }}
              />
            )}
          </InlineEdit>
        </NamedRow>
      </VerticalSpacing>
    );
  },
};

const sizeArray: ('default' | 'small')[] = ['default', 'small'];

export const Sizes: Story = {
  render: () => (
    <VerticalSpacing size={0.5} style={{ maxWidth: '338px' }}>
      {sizeArray.map((size) => (
        <NamedRow key={size} name={size === 'default' ? 'Default' : 'Small'}>
          <NameInline id={`ie-size-${size}`} label="Kuupäev" defaultValue="22.03.2026" size={size} />
        </NamedRow>
      ))}
    </VerticalSpacing>
  ),
};

/**
 * The read view is plain text by default — or the placeholder while the value is empty. For values a string cannot
 * express, such as tags or a status badge, return them from `renderValue`.
 */
export const ValueType: Story = {
  name: 'Value type',
  render: function ValueType() {
    const [type, setType] = useState<ISelectOption | null>(typeOptions[0]);
    const [address, setAddress] = useState<ISelectOption | null>(null);
    const [keywords, setKeywords] = useState<ISelectOption[]>(keywordOptions);
    const [olek, setOlek] = useState<ISelectOption | null>(olekOptions[0]);

    return (
      <div style={{ maxWidth: '28rem' }}>
        <VerticalSpacing size={0.5}>
          <FieldRow label="Tüüp">
            <InlineEdit<ISelectOption | null>
              label="Tüüp"
              value={type}
              onChange={setType}
              renderValue={(v) => (v ? (v.label as string) : '—')}
            >
              {({ value, onChange, commit }) => (
                <Select
                  id="type-select"
                  size="small"
                  label="Tüüp"
                  hideLabel
                  options={typeOptions}
                  value={value}
                  onChange={(next) => {
                    onChange(next as ISelectOption | null);
                    commit();
                  }}
                />
              )}
            </InlineEdit>
          </FieldRow>
          <FieldRow label="Aadress">
            <InlineEdit<ISelectOption | null>
              label="Aadress"
              value={address}
              onChange={setAddress}
              placeholder="Sisesta aadress"
              renderValue={(v) => (v ? (v.label as string) : '')}
            >
              {({ value, onChange, commit }) => (
                <Select
                  id="address-select"
                  size="small"
                  label="Aadress"
                  hideLabel
                  options={addressOptions}
                  value={value}
                  onChange={(next) => {
                    onChange(next as ISelectOption | null);
                    commit();
                  }}
                />
              )}
            </InlineEdit>
          </FieldRow>
          <FieldRow label="Märksõnad">
            <InlineEdit<ISelectOption[]>
              label="Märksõnad"
              value={keywords}
              onChange={setKeywords}
              renderValue={(v) =>
                v.length ? (
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-05)' }}>
                    {v.map((option) => (
                      <Tag key={option.value as string} color="primary">
                        {option.label}
                      </Tag>
                    ))}
                  </span>
                ) : (
                  '—'
                )
              }
            >
              {({ value, onChange }) => (
                <Select
                  id="keywords-select"
                  size="small"
                  label="Märksõnad"
                  hideLabel
                  multiple
                  options={keywordOptions}
                  value={value}
                  onChange={(next) => onChange((next as ISelectOption[] | null) ?? [])}
                />
              )}
            </InlineEdit>
          </FieldRow>
          <FieldRow label="Olek">
            <InlineEdit<ISelectOption | null>
              label="Olek"
              value={olek}
              onChange={setOlek}
              renderValue={(v) => (v ? <StatusBadge color={olekColor[v.value as string]}>{v.label}</StatusBadge> : '—')}
            >
              {({ value, onChange, commit }) => (
                <Select
                  id="olek-select"
                  size="small"
                  label="Olek"
                  hideLabel
                  options={olekOptions}
                  value={value}
                  onChange={(next) => {
                    onChange(next as ISelectOption | null);
                    commit();
                  }}
                />
              )}
            </InlineEdit>
          </FieldRow>
        </VerticalSpacing>
      </div>
    );
  },
};

/**
 * The edit icon is what identifies the value as editable, so it is always shown. By default it sits at the row's
 * trailing edge, lining the icons up down a column; `inline` puts it straight after the value.
 */
export const EditIconPosition: Story = {
  render: () => (
    <Row gutter={4}>
      <Col xs={12} md={6}>
        <VerticalSpacing size={0.5}>
          <Text modifiers="bold">Inline</Text>
          <AlignExample align="inline" idPrefix="ie-align-inline" />
        </VerticalSpacing>
      </Col>
      <Col xs={12} md={6}>
        <VerticalSpacing size={0.5}>
          <Text modifiers="bold">End</Text>
          <AlignExample align="end" idPrefix="ie-align-end" />
        </VerticalSpacing>
      </Col>
    </Row>
  ),
};

/**
 * The row fills its container, so on narrow layouts the whole row is a comfortable tap target rather than just the
 * value. The playground controls apply to the field below.
 */
export const Responsiveness: Story = {
  args: {
    label: 'Nimi',
    placeholder: '—',
    size: 'default',
    editIconPosition: 'end',
    readOnly: false,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: function ResponsiveField(args) {
    const [name, setName] = useState('Mari Maasikas');
    return (
      <InlineEdit<string>
        label={args.label}
        placeholder={args.placeholder}
        size={args.size}
        editIconPosition={args.editIconPosition}
        readOnly={args.readOnly}
        contentWidth={args.contentWidth}
        value={name}
        onChange={setName}
        renderValue={(v) => v}
      >
        {({ value, onChange, size: editorSize }) => (
          <TextField id="ie-mobile" label={args.label} hideLabel value={value} onChange={onChange} size={editorSize} />
        )}
      </InlineEdit>
    );
  },
};

/**
 * Active is the open editor. An invalid row drops the edit icon. Read-only and Disabled have no Figma counterpart yet.
 */
export const States: Story = {
  parameters: {
    pseudo: {
      hover: ['#ie-state-hover-text', '#ie-state-hover-select'],
      focusVisible: ['#ie-state-focus-text', '#ie-state-focus-select'],
      focus: ['#ie-state-active-text-input', '#ie-state-active-cell [class*="select__control"]'],
    },
  },
  decorators: [
    function KeyboardIntent(Story) {
      React.useEffect(() => {
        const root = document.documentElement;
        const previous = root.getAttribute('data-whatintent');
        const forceKeyboard = () => {
          if (root.getAttribute('data-whatintent') !== 'keyboard') {
            root.setAttribute('data-whatintent', 'keyboard');
          }
        };
        forceKeyboard();
        const observer = new MutationObserver(forceKeyboard);
        observer.observe(root, { attributes: true, attributeFilter: ['data-whatintent'] });
        return () => {
          observer.disconnect();
          if (previous === null) root.removeAttribute('data-whatintent');
          else root.setAttribute('data-whatintent', previous);
        };
      }, []);
      return <Story />;
    },
  ],
  render: function States() {
    const breakpoint = useBreakpoint();
    const isMobile = isBreakpointBelow(breakpoint, 'md');

    const stateRows: {
      label: string;
      key: string;
      shared?: { readOnly?: boolean; disabled?: boolean; defaultEditing?: boolean };
      textProps?: { helper?: FeedbackTextProps };
      selectProps?: { helper?: FeedbackTextProps };
    }[] = [
      { label: 'Default', key: 'default' },
      { label: 'Hover', key: 'hover' },
      { label: 'Active', key: 'active', shared: { defaultEditing: true } },
      {
        label: 'Error',
        key: 'invalid',
        textProps: { helper: { text: 'Nimi sisaldab lubamatuid märke', type: 'error' } },
        selectProps: { helper: { text: 'Palun vali sobiv väärtus', type: 'error' } },
      },
      { label: 'Focus', key: 'focus' },
      { label: 'Read-only', key: 'readonly', shared: { readOnly: true } },
      { label: 'Disabled', key: 'disabled', shared: { disabled: true } },
    ];

    return (
      <VerticalSpacing style={{ maxWidth: '640px' }}>
        {!isMobile && (
          <Row>
            <Col md={2}>&nbsp;</Col>
            <Col md={5}>
              <Text modifiers="bold">Text field</Text>
            </Col>
            <Col md={5}>
              <Text modifiers="bold">Select</Text>
            </Col>
          </Row>
        )}
        {stateRows.map((row) => (
          <Row key={row.key} gutterY={2} md={{ gutterY: 0 }}>
            <Col xs={12} md={2}>
              <Text modifiers="bold">{row.label}</Text>
            </Col>
            <Col xs={12} md={5}>
              <NameInline id={`ie-state-${row.key}-text`} {...row.shared} {...row.textProps} />
            </Col>
            <Col xs={12} md={5}>
              <div id={`ie-state-${row.key}-cell`}>
                <CountryInline id={`ie-state-${row.key}-select`} {...row.shared} {...row.selectProps} />
              </div>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    );
  },
};

/**
 * `readOnly` renders the value as plain text with no edit affordance. It keeps an editable row's inset so it still lines
 * up when mixed in with editable ones, which is what it is for — the odd fixed value among the rest. When a whole block
 * is fixed, reach for <a href="./?path=/docs/tedi-ready-content-textgroup--docs" target="_top"><code>TextGroup</code></a>
 * instead.
 *
 * Differs from `disabled`, which keeps the greyed trigger and icon for transient states such as saving.
 */
export const ReadOnly: Story = {
  name: 'Read-only',
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <VerticalSpacing size={0.5}>
        <FieldRow label="Kuupäev">
          <NameInline id="ro-date" label="Kuupäev" defaultValue="22.03.2026" />
        </FieldRow>
        <FieldRow label="Kellaaeg">
          <NameInline id="ro-time" label="Kellaaeg" defaultValue="08:00" readOnly />
        </FieldRow>
        <FieldRow label="Kohtade arv">
          <NameInline id="ro-seats" label="Kohtade arv" defaultValue="2" />
        </FieldRow>
      </VerticalSpacing>
    </div>
  ),
};

/**
 * Editing is non-destructive until it is committed. Click the value, change it, then press `Escape` to discard the draft
 * and restore the last committed value - the read view snaps back untouched. Committing instead happens on `Enter`
 * (single-line controls) or on click-away (focus leaving the editor). The committed value shown below updates only on
 * commit, never on cancel.
 */
export const CancelEdit: Story = {
  name: 'Cancel edit',
  render: function CancelEdit() {
    const [name, setName] = useState('Mari Maasikas');
    return (
      <div style={{ maxWidth: '22rem' }}>
        <VerticalSpacing size={0.5}>
          <FieldRow label="Nimi">
            <InlineEdit<string> label="Nimi" value={name} onChange={setName} renderValue={(v) => v || '—'}>
              {({ value, onChange, size }) => (
                <TextField id="cancel-name" label="Nimi" hideLabel value={value} onChange={onChange} size={size} />
              )}
            </InlineEdit>
          </FieldRow>
        </VerticalSpacing>
      </div>
    );
  },
};

/**
 * `disabled` blocks editing while keeping the trigger and icon visible but greyed — for transient
 * states such as saving, or a field that depends on another. For a value that is never editable,
 * use `readOnly` (see the Read-only story) instead.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <VerticalSpacing size={0.5}>
        <FieldRow label="Kuupäev">
          <NameInline id="dis-date" label="Kuupäev" defaultValue="22.03.2026" disabled />
        </FieldRow>
        <FieldRow label="Kellaaeg">
          <NameInline id="dis-time" label="Kellaaeg" defaultValue="08:00" disabled />
        </FieldRow>
      </VerticalSpacing>
    </div>
  ),
};

/**
 * `invalid` gives the read trigger an error border and `aria-invalid`. A `helper` item with
 * `type: 'error'` sets it automatically and is linked to the trigger via `aria-describedby`.
 */
export const Invalid: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <VerticalSpacing size={0.5}>
        <FieldRow label="E-post">
          <NameInline
            id="inv-email"
            label="E-post"
            defaultValue="mari.maasikas"
            helper={{ text: 'Sisesta korrektne e-posti aadress', type: 'error' }}
          />
        </FieldRow>
      </VerticalSpacing>
    </div>
  ),
};

/**
 * With no value yet, the read view shows the `placeholder` (dimmed). There is no default — supply
 * `placeholder` for an "add a value" affordance. Clicking still opens the editor.
 */
export const Placeholder: Story = {
  render: function PlaceholderFields() {
    const [address, setAddress] = useState<ISelectOption | null>(null);
    return (
      <div style={{ maxWidth: '22rem' }}>
        <VerticalSpacing size={0.5}>
          <FieldRow label="Nimi">
            <NameInline id="ph-name" label="Nimi" defaultValue="" placeholder="Sisesta nimi" />
          </FieldRow>
          <FieldRow label="Aadress">
            <InlineEdit<ISelectOption | null>
              label="Aadress"
              value={address}
              onChange={setAddress}
              placeholder="Sisesta aadress"
              renderValue={(v) => (v ? (v.label as string) : '')}
            >
              {({ value, onChange, commit }) => (
                <Select
                  id="ph-address"
                  size="small"
                  label="Aadress"
                  hideLabel
                  options={addressOptions}
                  value={value}
                  onChange={(next) => {
                    onChange(next as ISelectOption | null);
                    commit();
                  }}
                />
              )}
            </InlineEdit>
          </FieldRow>
        </VerticalSpacing>
      </div>
    );
  },
};

/**
 * Use `InlineEdit` with these TEDI controls:
 *
 * - Text: `TextField`, `Textarea`, `Search`
 * - Numeric: `NumberField`, `Slider`
 * - Choice: `Select` (single or multiple), `Radio.Group`, `Checkbox.Group`
 * - Date and time: `DateField`, `TimeField`, `TimePicker`
 * - Boolean: `Toggle`
 *
 * The render prop hands each editor the draft `value`, an `onChange` to update it
 * and `commit`/`cancel`. Bind `renderValue` to the same source, formatted for the
 * read view, and give the editor its own accessible label — `InlineEdit`'s `label`
 * names only the read trigger. Enter commits, except in a textarea or an open
 * listbox, where it belongs to the control.
 *
 * For file management use `FileUpload` or `FileDropzone` separately; for checkbox and radio choices, use
 * `Checkbox.Group` / `Radio.Group` rather than a standalone `Checkbox` or `Radio`.
 */
export const SupportedControls: Story = {
  name: 'Supported controls',
  render: function SupportedControlsExample() {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 2, 22));
    const [seats, setSeats] = useState<number | undefined>(2);
    const [note, setNote] = useState('Palun helista enne saabumist');
    const [transport, setTransport] = useState('bus');
    const [extras, setExtras] = useState<string[]>(['breakfast']);

    const transportLabels: Record<string, string> = { bus: 'Buss', train: 'Rong' };
    const extrasLabels: Record<string, string> = { breakfast: 'Hommikusöök', parking: 'Parkimine' };

    return (
      <div style={{ maxWidth: '24rem' }}>
        <VerticalSpacing size={0.5}>
          <FieldRow label="Kuupäev">
            <InlineEdit<Date | undefined>
              label="Kuupäev"
              value={date}
              onChange={setDate}
              renderValue={(v) => (v ? v.toLocaleDateString('et-EE') : '—')}
            >
              {({ value, onChange }) => (
                <DateField
                  id="ie-supported-date"
                  label="Kuupäev"
                  inputProps={{ hideLabel: true }}
                  selected={value}
                  onSelect={(next) => onChange(next as Date | undefined)}
                />
              )}
            </InlineEdit>
          </FieldRow>

          <FieldRow label="Kohtade arv">
            <InlineEdit<number | undefined>
              label="Kohtade arv"
              value={seats}
              onChange={setSeats}
              renderValue={(v) => (v === undefined ? '—' : String(v))}
            >
              {({ value, onChange }) => (
                <NumberField id="ie-supported-seats" label="Kohtade arv" hideLabel value={value} onChange={onChange} />
              )}
            </InlineEdit>
          </FieldRow>

          <FieldRow label="Märkus">
            <InlineEdit<string> label="Märkus" value={note} onChange={setNote} renderValue={(v) => v || '—'}>
              {({ value, onChange }) => (
                <Textarea id="ie-supported-note" label="Märkus" hideLabel value={value} onChange={onChange} />
              )}
            </InlineEdit>
          </FieldRow>

          <FieldRow label="Transport">
            <InlineEdit<string>
              label="Transport"
              value={transport}
              onChange={setTransport}
              renderValue={(v) => transportLabels[v] ?? '—'}
            >
              {({ value, onChange }) => (
                <Radio.Group id="ie-supported-transport" label="Transport" hideLabel value={value} onChange={onChange}>
                  <Radio value="bus" label="Buss" />
                  <Radio value="train" label="Rong" />
                </Radio.Group>
              )}
            </InlineEdit>
          </FieldRow>

          <FieldRow label="Lisad">
            <InlineEdit<string[]>
              label="Lisad"
              value={extras}
              onChange={setExtras}
              renderValue={(v) => v.map((x) => extrasLabels[x]).join(', ') || '—'}
            >
              {({ value, onChange }) => (
                <Checkbox.Group id="ie-supported-extras" label="Lisad" hideLabel value={value} onChange={onChange}>
                  <Checkbox value="breakfast" label="Hommikusöök" />
                  <Checkbox value="parking" label="Parkimine" />
                </Checkbox.Group>
              )}
            </InlineEdit>
          </FieldRow>
        </VerticalSpacing>
      </div>
    );
  },
};
