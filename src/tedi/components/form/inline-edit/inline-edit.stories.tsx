import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Card, CardContent } from '../../content/card';
import { Label } from '../../content/label/label';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { StatusBadge, type StatusBadgeColor } from '../../tags/status-badge/status-badge';
import { Tag } from '../../tags/tag/tag';
import { ISelectOption, Select } from '../select/select';
import { TextField } from '../textfield/textfield';
import { InlineEdit } from './inline-edit';

const countryOptions: ISelectOption[] = [
  { value: 'ee', label: 'Eesti' },
  { value: 'fi', label: 'Soome' },
  { value: 'se', label: 'Rootsi' },
];

const statusOptions: ISelectOption[] = [
  { value: 'done', label: 'Teostatud' },
  { value: 'in-progress', label: 'Menetluses' },
  { value: 'submitted', label: 'Esitatud' },
  { value: 'rejected', label: 'Tagasi lükatud' },
];

const statusColor: Record<string, StatusBadgeColor> = {
  done: 'success',
  'in-progress': 'warning',
  submitted: 'brand',
  rejected: 'danger',
};

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
  disabled?: boolean;
  placeholder?: string;
  size?: 'default' | 'small';
  editIconAlign?: 'following' | 'aligned';
  fullWidth?: boolean;
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

const AlignExample = ({ align, idPrefix }: { align: 'following' | 'aligned'; idPrefix: string }): JSX.Element => (
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
                editIconAlign={align}
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
  disabled?: boolean;
  size?: 'default' | 'small';
  fullWidth?: boolean;
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
      {({ value, onChange, commit, size: editorSize }) => (
        <Select
          id={`${id}-input`}
          label="Riik"
          hideLabel
          size={editorSize === 'small' ? 'small' : undefined}
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
 * `InlineEdit` is an edit-in-place wrapper: it shows a value that becomes an inline-edit control when clicked. It is
 * control-agnostic — supply any TEDI form control through the `children` render function and wire it to the render props
 * (`value`, `onChange`, `commit`, `cancel`).
 *
 * See the <a href="?path=/docs/tedi-ready-components-form-inlineedit--documentation">Documentation</a> page for the full guide, supported form elements, and the `useInlineEdit` hook.
 *
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.75.92?node-id=5881-57032&m=dev" target="_BLANK">Figma ↗</a><br/>
 */
const meta: Meta<typeof InlineEdit> = {
  title: 'TEDI-Ready/Components/Form/InlineEdit',
  component: InlineEdit,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.75.92?node-id=5881-57033&m=dev',
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
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: '—' } },
    },
    size: {
      control: 'radio',
      options: ['default', 'small'],
      description: 'Size of the read trigger and editor.',
      table: { type: { summary: 'default | small' }, defaultValue: { summary: 'default' } },
    },
    editIconAlign: {
      control: 'radio',
      options: ['following', 'aligned'],
      description: 'Whether the edit icon follows the value or aligns to the trailing edge.',
      table: { type: { summary: 'following | aligned' }, defaultValue: { summary: 'following' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Renders the value as static text with no edit affordance.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Stretches the field to the full width of its container so controls (Select, Slider, inputs) fill the row.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    hideEditIcon: {
      control: 'boolean',
      description: 'Hides the edit (pencil) icon on the read trigger; the value stays clickable.',
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

/**
 * The minimal usage: the read view shows the value, clicking it opens the editor. Use the playground controls to try the props.
 */
export const Default: Story = {
  args: {
    label: 'Väärtus',
    placeholder: '—',
    size: 'default',
    editIconAlign: 'following',
    disabled: false,
    fullWidth: false,
    hideEditIcon: false,
  },
  render: function DefaultField(args) {
    const [value, setValue] = useState('Väärtus');
    return (
      <InlineEdit<string>
        label={args.label}
        placeholder={args.placeholder}
        size={args.size}
        editIconAlign={args.editIconAlign}
        disabled={args.disabled}
        fullWidth={args.fullWidth}
        hideEditIcon={args.hideEditIcon}
        value={value}
        onChange={setValue}
        renderValue={(v) => v || '—'}
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
    );
  },
};

/**
 * On narrow (mobile) layouts pair `InlineEdit` with `fullWidth` so the whole row is a comfortable tap target and the
 * value/edit icon span the available width. The playground controls apply to the field below.
 */
export const Mobile: Story = {
  args: {
    label: 'Nimi',
    placeholder: '—',
    fullWidth: true,
    size: 'default',
    editIconAlign: 'aligned',
    disabled: false,
    hideEditIcon: false,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: function MobileField(args) {
    const [name, setName] = useState('Väärtus');
    return (
      <InlineEdit<string>
        label={args.label}
        placeholder={args.placeholder}
        size={args.size}
        editIconAlign={args.editIconAlign}
        disabled={args.disabled}
        fullWidth={args.fullWidth}
        hideEditIcon={args.hideEditIcon}
        value={name}
        onChange={setName}
        renderValue={(v) => v || '—'}
      >
        {({ value, onChange, size: editorSize }) => (
          <TextField id="ie-mobile" label={args.label} hideLabel value={value} onChange={onChange} size={editorSize} />
        )}
      </InlineEdit>
    );
  },
};

const sizeArray: ('default' | 'small')[] = ['default', 'small'];

export const Sizes: Story = {
  render: () => (
    <div className="example-list">
      {sizeArray.map((size, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={size}>
          <Col className="flex align-items-center w-50 text-capitalize">{size}</Col>
          <Col className="flex align-items-center gap-3">
            <NameInline id={`ie-size-${size}-text`} size={size} />
            <CountryInline id={`ie-size-${size}-select`} size={size} />
          </Col>
        </Row>
      ))}
    </div>
  ),
};

export const TextFieldType: Story = {
  name: 'Text field',
  render: function TextFieldType() {
    const [name, setName] = useState('Mari Maasikas');
    return (
      <div style={{ maxWidth: '22rem' }}>
        <FieldRow label="Nimi">
          <InlineEdit<string> label="Nimi" value={name} onChange={setName} fullWidth renderValue={(v) => v || '—'}>
            {({ value, onChange }) => (
              <TextField id="type-name" label="Nimi" hideLabel value={value} onChange={onChange} />
            )}
          </InlineEdit>
        </FieldRow>
      </div>
    );
  },
};

export const SelectType: Story = {
  name: 'Select',
  render: function SelectType() {
    const [type, setType] = useState<ISelectOption | null>(typeOptions[0]);
    const [keywords, setKeywords] = useState<ISelectOption[]>(keywordOptions);
    const [olek, setOlek] = useState<ISelectOption | null>(olekOptions[0]);
    const [address, setAddress] = useState<ISelectOption | null>(null);

    return (
      <div style={{ maxWidth: '28rem' }}>
        <VerticalSpacing size={0.5}>
          <FieldRow label="Tüüp">
            <InlineEdit<ISelectOption | null>
              label="Tüüp"
              value={type}
              onChange={setType}
              fullWidth
              renderValue={(v) => (v ? (v.label as string) : '—')}
            >
              {({ value, onChange, commit }) => (
                <Select
                  id="type-select"
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

          <FieldRow label="Märksõnad">
            <InlineEdit<ISelectOption[]>
              label="Märksõnad"
              value={keywords}
              onChange={setKeywords}
              fullWidth
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
              fullWidth
              renderValue={(v) => (v ? <StatusBadge color={olekColor[v.value as string]}>{v.label}</StatusBadge> : '—')}
            >
              {({ value, onChange, commit }) => (
                <Select
                  id="olek-select"
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

          <FieldRow label="Aadress">
            <InlineEdit<ISelectOption | null>
              label="Aadress"
              value={address}
              onChange={setAddress}
              fullWidth
              placeholder="Sisesta aadress"
              renderValue={(v) => (v ? (v.label as string) : '')}
            >
              {({ value, onChange, commit }) => (
                <Select
                  id="address-select"
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

export const ReadOnly: Story = {
  name: 'Read-only',
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <VerticalSpacing size={0.5}>
        <FieldRow label="Kuupäev">
          <NameInline id="ro-date" label="Kuupäev" defaultValue="22.03.2026" disabled />
        </FieldRow>
        <FieldRow label="Kellaaeg">
          <NameInline id="ro-time" label="Kellaaeg" defaultValue="08:00" disabled />
        </FieldRow>
        <FieldRow label="Kohtade arv">
          <NameInline id="ro-seats" label="Kohtade arv" defaultValue="2" disabled />
        </FieldRow>
      </VerticalSpacing>
    </div>
  ),
};

export const EditIconAlignment: Story = {
  render: () => (
    <Row gutter={4}>
      <Col xs={12} md={6}>
        <VerticalSpacing size={0.5}>
          <Text modifiers="bold">Following</Text>
          <AlignExample align="following" idPrefix="ie-align-following" />
        </VerticalSpacing>
      </Col>
      <Col xs={12} md={6}>
        <VerticalSpacing size={0.5}>
          <Text modifiers="bold">Aligned</Text>
          <AlignExample align="aligned" idPrefix="ie-align-aligned" />
        </VerticalSpacing>
      </Col>
    </Row>
  ),
};

export const States: Story = {
  parameters: {
    pseudo: {
      hover: ['#ie-state-hover-text', '#ie-state-hover-select'],
      active: ['#ie-state-active-text', '#ie-state-active-select'],
      focusVisible: ['#ie-state-focus-text', '#ie-state-focus-select'],
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
  render: () => (
    <VerticalSpacing>
      <Row>
        <Col width={2}>&nbsp;</Col>
        <Col>
          <Text modifiers="bold">Text field</Text>
        </Col>
        <Col>
          <Text modifiers="bold">Select</Text>
        </Col>
      </Row>
      <Row>
        <Col width={2}>
          <Text modifiers="bold">Default</Text>
        </Col>
        <Col>
          <NameInline id="ie-state-default-text" fullWidth />
        </Col>
        <Col>
          <CountryInline id="ie-state-default-select" fullWidth />
        </Col>
      </Row>
      <Row>
        <Col width={2}>
          <Text modifiers="bold">Hover</Text>
        </Col>
        <Col>
          <NameInline id="ie-state-hover-text" fullWidth />
        </Col>
        <Col>
          <CountryInline id="ie-state-hover-select" fullWidth />
        </Col>
      </Row>
      <Row>
        <Col width={2}>
          <Text modifiers="bold">Active</Text>
        </Col>
        <Col>
          <NameInline id="ie-state-active-text" fullWidth />
        </Col>
        <Col>
          <CountryInline id="ie-state-active-select" fullWidth />
        </Col>
      </Row>
      <Row>
        <Col width={2}>
          <Text modifiers="bold">Focus</Text>
        </Col>
        <Col>
          <NameInline id="ie-state-focus-text" fullWidth />
        </Col>
        <Col>
          <CountryInline id="ie-state-focus-select" fullWidth />
        </Col>
      </Row>
    </VerticalSpacing>
  ),
};

/**
 * A realistic document-details card: right-aligned labels with values that turn into the matching control on click.
 * The edit icons align to the trailing edge (`fullWidth`), and the status row reads as a `StatusBadge` and edits via `Select`.
 */
export const Example: Story = {
  render: function DocumentDetails() {
    const [creator, setCreator] = useState('Mari Maasika');
    const [performer, setPerformer] = useState('Kalle Kullerkupp');
    const [signer, setSigner] = useState('Mart Tamm');
    const [status, setStatus] = useState<ISelectOption | null>(statusOptions[0]);

    const textRow = (label: string, id: string, value: string, onChange: (v: string) => void): JSX.Element => (
      <Row alignItems="center" gutter={2}>
        <Col xs={12} sm={4}>
          <Label style={{ display: 'block', textAlign: 'right' }}>{label}</Label>
        </Col>
        <Col xs={12} sm={8}>
          <InlineEdit<string>
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            editIconAlign="aligned"
            renderValue={(v) => v || '—'}
          >
            {({ value: draft, onChange: setDraft }) => (
              <TextField id={id} label={label} hideLabel value={draft} onChange={setDraft} />
            )}
          </InlineEdit>
        </Col>
      </Row>
    );

    return (
      <div style={{ maxWidth: '25rem' }}>
        <Card>
          <CardContent>
            <VerticalSpacing size={0.5}>
              {textRow('Looja', 'ctx-creator', creator, setCreator)}
              {textRow('Teostaja', 'ctx-performer', performer, setPerformer)}
              {textRow('Allkirjastaja', 'ctx-signer', signer, setSigner)}

              <Row alignItems="center" gutter={2}>
                <Col xs={12} sm={4}>
                  <Label style={{ display: 'block', textAlign: 'right' }}>Olek</Label>
                </Col>
                <Col xs={12} sm={8}>
                  <InlineEdit<ISelectOption | null>
                    label="Olek"
                    value={status}
                    onChange={setStatus}
                    fullWidth
                    editIconAlign="aligned"
                    renderValue={(v) =>
                      v ? <StatusBadge color={statusColor[v.value as string]}>{v.label}</StatusBadge> : '—'
                    }
                  >
                    {({ value, onChange, commit }) => (
                      <Select
                        id="ctx-status"
                        label="Olek"
                        hideLabel
                        options={statusOptions}
                        value={value}
                        onChange={(next) => {
                          onChange(next as ISelectOption | null);
                          commit();
                        }}
                      />
                    )}
                  </InlineEdit>
                </Col>
              </Row>
            </VerticalSpacing>
          </CardContent>
        </Card>
      </div>
    );
  },
};

/**
 * Editing is non-destructive until it is committed. Click the value, change it, then press `Escape` to discard the draft
 * and restore the last committed value - the read view snaps back untouched. Committing instead happens on click-away
 * (focus leaving the editor). The committed value shown below updates only on commit, never on cancel.
 */
export const CancelEdit: Story = {
  name: 'Cancel edit',
  render: function CancelEdit() {
    const [name, setName] = useState('Mari Maasikas');
    return (
      <div style={{ maxWidth: '22rem' }}>
        <VerticalSpacing size={0.5}>
          <FieldRow label="Nimi">
            <InlineEdit<string> label="Nimi" value={name} onChange={setName} fullWidth renderValue={(v) => v || '—'}>
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
