import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Card, CardContent } from '../../content/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { ChoiceGroup, ChoiceGroupValue } from '../choice-group';
import { DateField } from '../date-field/date-field';
import { DateTimeField } from '../date-time-field/date-time-field';
import { NumberField } from '../number-field/number-field';
import { Search } from '../search/search';
import { ISelectOption, Select } from '../select/select';
import { Slider } from '../slider/slider';
import { Textarea } from '../textarea/textarea';
import { TextField } from '../textfield/textfield';
import { TimeField } from '../time-field/time-field';
import { TimePicker } from '../time-picker/time-picker';
import { Toggle } from '../toggle/toggle';
import { Editable } from './editable';

// Force zero-padded day and month (e.g. 22.03.2026) — the bare `et-EE` locale
// drops leading zeros on some platforms (22.3.2026).
const formatDate = (d?: Date): string =>
  d ? d.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—';
const formatDateTime = (d?: Date): string =>
  d
    ? d.toLocaleString('et-EE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

const FormRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactElement<{ fullWidth?: boolean }>;
}): JSX.Element => (
  // Top-align the label so it keeps its place when a field grows in edit mode
  // (e.g. the Textarea). The small top padding lines the label up with the read
  // value, which sits inside the trigger's vertical padding.
  <Row alignItems="start" gutter={2}>
    <Col xs={12} sm={4}>
      <Text element="div" color="secondary" modifiers="small" style={{ paddingTop: 'var(--tedi-dimensions-01)' }}>
        {label}
      </Text>
    </Col>
    <Col xs={12} sm={8}>
      {React.cloneElement(children, { fullWidth: true })}
    </Col>
  </Row>
);

const FormCard = ({ title, children }: { title: string; children: React.ReactNode }): JSX.Element => (
  <div style={{ maxWidth: '34rem' }}>
    <Card>
      <CardContent>
        <VerticalSpacing size={1}>
          <Heading element="h2" modifiers="h5">
            {title}
          </Heading>
          <VerticalSpacing size={0.75}>{children}</VerticalSpacing>
        </VerticalSpacing>
      </CardContent>
    </Card>
  </div>
);

/**
 * `Editable` is an edit-in-place wrapper: it shows a value that becomes an editable control when clicked. It is control-agnostic - supply any TEDI form
 * control through the `children` render function and wire it to the render props (`value`, `onChange`, `commit`, `cancel`).
 *
 * The wrapper owns the read <-> edit toggle, focus, and keyboard handling: clicking away (focus leaving the editor) commits, and `Escape` cancels. For state-only
 * usage without the built-in markup, use the `useEditable` hook.
 *
 * ### Supported TEDI-Ready controls
 *
 * Any controlled TEDI form control works as the editor. Ones that map directly
 * (wire the render props to the control's `value` / `onChange`):
 *
 * - **Text:** `TextField`, `TextArea`, `Search`
 * - **Numeric:** `NumberField`, `Slider`
 * - **Choice:** `Select` (single or `multiple`, commit on select), `ChoiceGroup`
 * - **Date & time:** `DateTimeField`, `TimeField`, `TimePicker`
 *
 * Controls whose value API differs need a one-line adapter inside the render
 * function:
 *
 * - **`DateField`** — uses `selected` / `onSelect`:
 *   `selected={value} onSelect={onChange}` (format the `Date` in `renderValue`).
 * - **`Toggle`** — uses `checked`:
 *   `checked={value} onChange={onChange}` (its `onChange` already gives a boolean).
 *
 * Not a fit: `FileUpload` / `FileDropzone` (file management, not a single editable value), and standalone `Checkbox` / `Radio`
 */
const meta: Meta<typeof Editable> = {
  title: 'TEDI-Ready/Components/Form/Editable',
  component: Editable,
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
      table: { type: { summary: '(editor: EditableEditor<T>) => ReactNode' } },
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
type Story = StoryObj<typeof Editable>;

export const Default: Story = {
  args: {
    label: 'Nimi',
    placeholder: '—',
    disabled: false,
    fullWidth: false,
    hideEditIcon: false,
  },
  render: function SingleField(args) {
    const [name, setName] = useState('Mari Maasikas');
    return (
      <Editable<string> {...args} value={name} onChange={setName} renderValue={(v) => v || '—'}>
        {({ value, onChange }) => (
          <TextField id="ef-name" label={args.label} hideLabel value={value} onChange={onChange} />
        )}
      </Editable>
    );
  },
};

const countryOptions: ISelectOption[] = [
  { value: 'ee', label: 'Eesti' },
  { value: 'fi', label: 'Soome' },
  { value: 'se', label: 'Rootsi' },
];

const roleItems = [
  { id: 'ef-role-dev', label: 'Arendaja', value: 'dev' },
  { id: 'ef-role-designer', label: 'Disainer', value: 'designer' },
  { id: 'ef-role-pm', label: 'Tootejuht', value: 'pm' },
];

const skillOptions: ISelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'scss', label: 'SCSS' },
  { value: 'node', label: 'Node.js' },
  { value: 'figma', label: 'Figma' },
];

/**
 * A realistic profile/account settings form. Each row shows its value and turns into the matching control on click. Covers `TextField`, `Textarea`
 * (empty -> placeholder), `ChoiceGroup`, `Select` (single and `multiple`) and `Toggle`.
 */
export const ProfileSettings: Story = {
  render: function ProfileForm() {
    const [name, setName] = useState('Mari Maasikas');
    const [email, setEmail] = useState('mari.maasikas@example.ee');
    const [role, setRole] = useState('dev');
    const [country, setCountry] = useState<ISelectOption | null>(countryOptions[0]);
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState<ISelectOption[]>([skillOptions[0], skillOptions[1]]);
    const [notifications, setNotifications] = useState(true);

    return (
      <FormCard title="Profiili seaded">
        <FormRow label="Nimi">
          <Editable<string> label="Nimi" value={name} onChange={setName} renderValue={(v) => v || '—'}>
            {({ value, onChange }) => (
              <TextField id="ps-name" label="Nimi" hideLabel value={value} onChange={onChange} />
            )}
          </Editable>
        </FormRow>

        <FormRow label="E-post">
          <Editable<string> label="E-post" value={email} onChange={setEmail} renderValue={(v) => v || '—'}>
            {({ value, onChange }) => (
              <TextField id="ps-email" label="E-post" hideLabel type="email" value={value} onChange={onChange} />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Roll">
          <Editable<string>
            label="Roll"
            value={role}
            onChange={setRole}
            renderValue={(v) => roleItems.find((item) => item.value === v)?.label ?? '—'}
          >
            {({ value, onChange, commit }) => (
              <ChoiceGroup
                id="ps-role"
                name="ps-role"
                label="Roll"
                hideLabel
                inputType="radio"
                items={roleItems}
                value={value}
                onChange={(next: ChoiceGroupValue) => {
                  onChange((next as string) ?? '');
                  commit();
                }}
              />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Riik">
          <Editable<ISelectOption | null>
            label="Riik"
            value={country}
            onChange={setCountry}
            renderValue={(v) => (v ? (v.label as string) : '—')}
          >
            {({ value, onChange, commit }) => (
              <Select
                id="ps-country"
                label="Riik"
                hideLabel
                options={countryOptions}
                value={value}
                onChange={(next) => {
                  onChange(next as ISelectOption | null);
                  commit();
                }}
              />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Tutvustus">
          <Editable<string>
            label="Tutvustus"
            value={bio}
            onChange={setBio}
            placeholder="Lisa tutvustus…"
            renderValue={(v) => v}
          >
            {({ value, onChange }) => (
              <Textarea id="ps-bio" label="Tutvustus" hideLabel value={value} onChange={onChange} />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Oskused">
          <Editable<ISelectOption[]>
            label="Oskused"
            value={skills}
            onChange={setSkills}
            renderValue={(v) => (v.length ? v.map((option) => option.label).join(', ') : '—')}
          >
            {({ value, onChange }) => (
              <Select
                id="ps-skills"
                label="Oskused"
                hideLabel
                multiple
                options={skillOptions}
                value={value}
                onChange={(next) => onChange((next as ISelectOption[] | null) ?? [])}
              />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Teavitused">
          <Editable<boolean>
            label="Teavitused"
            value={notifications}
            onChange={setNotifications}
            renderValue={(v) => (v ? 'Sees' : 'Väljas')}
          >
            {({ value, onChange, commit }) => (
              <Toggle
                id="ps-notify"
                label="Teavitused"
                hideLabel
                checked={value}
                onChange={(checked) => {
                  onChange(checked);
                  commit();
                }}
              />
            )}
          </Editable>
        </FormRow>
      </FormCard>
    );
  },
};

/**
 * A realistic booking form. Covers the date/time controls (`DateField`, `DateTimeField`, `TimeField`, `TimePicker`), `NumberField`, `Slider` and
 * `Search`. Popover pickers commit on change; the inline controls commit on blur.
 */
export const AppointmentBooking: Story = {
  render: function BookingForm() {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 2, 22));
    const [start, setStart] = useState('09:30');
    const [checkIn, setCheckIn] = useState<Date | undefined>(new Date(2026, 2, 22, 9, 15));
    const [reminder, setReminder] = useState('08:00');
    const [seats, setSeats] = useState<number | undefined>(2);
    const [capacity, setCapacity] = useState(60);
    const [location, setLocation] = useState('Tallinn, Lõõtsa 8');

    return (
      <FormCard title="Broneering">
        <FormRow label="Kuupäev">
          <Editable<Date | undefined> label="Kuupäev" value={date} onChange={setDate} renderValue={formatDate}>
            {({ value, onChange, commit }) => (
              <DateField
                id="bk-date"
                label="Kuupäev"
                mode="single"
                selected={value}
                onSelect={(next) => {
                  onChange(next as Date | undefined);
                  commit();
                }}
              />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Algusaeg">
          <Editable<string> label="Algusaeg" value={start} onChange={setStart} renderValue={(v) => v || '—'}>
            {({ value, onChange, commit }) => (
              <TimeField
                id="bk-start"
                label="Algusaeg"
                value={value}
                onChange={(next) => {
                  onChange(next);
                  commit();
                }}
              />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Saabumine">
          <Editable<Date | undefined>
            label="Saabumine"
            value={checkIn}
            onChange={setCheckIn}
            renderValue={formatDateTime}
          >
            {({ value, onChange, commit }) => (
              <DateTimeField
                id="bk-checkin"
                label="Saabumine"
                value={value}
                onChange={(next) => {
                  onChange(next as Date | undefined);
                  commit();
                }}
              />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Meeldetuletus">
          <Editable<string> label="Meeldetuletus" value={reminder} onChange={setReminder} renderValue={(v) => v || '—'}>
            {({ value, onChange }) => <TimePicker value={value} onChange={onChange} />}
          </Editable>
        </FormRow>

        <FormRow label="Kohtade arv">
          <Editable<number | undefined>
            label="Kohtade arv"
            value={seats}
            onChange={setSeats}
            renderValue={(v) => (v === undefined ? '—' : `${v}`)}
          >
            {({ value, onChange }) => (
              <NumberField id="bk-seats" label="Kohtade arv" hideLabel value={value} onChange={onChange} min={1} />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Täituvus">
          <Editable<number> label="Täituvus" value={capacity} onChange={setCapacity} renderValue={(v) => `${v}%`}>
            {({ value, onChange }) => (
              <Slider id="bk-capacity" label="Täituvus" hideLabel value={value} onChange={onChange} min={0} max={100} />
            )}
          </Editable>
        </FormRow>

        <FormRow label="Asukoht">
          <Editable<string> label="Asukoht" value={location} onChange={setLocation} renderValue={(v) => v || '—'}>
            {({ value, onChange }) => (
              <Search id="bk-location" label="Asukoht" hideLabel value={value} onChange={onChange} />
            )}
          </Editable>
        </FormRow>
      </FormCard>
    );
  },
};

/**
 * Disabled renders the value as plain, non-interactive text — the same as a
 * `TextGroup` value (ordinary body text, not dimmed, with no hover/edit affordance).
 */
export const Disabled: Story = {
  render: () => (
    <FormCard title="Ainult lugemiseks">
      <FormRow label="Nimi">
        <Editable<string> label="Nimi" value="Mari Maasikas" disabled renderValue={(v) => v}>
          {({ value, onChange }) => (
            <TextField id="ef-disabled" label="Nimi" hideLabel value={value} onChange={onChange} />
          )}
        </Editable>
      </FormRow>
    </FormCard>
  ),
};
