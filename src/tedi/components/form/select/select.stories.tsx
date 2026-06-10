import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { OptionProps, OptionsOrGroups } from 'react-select';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Checkbox } from '../checkbox/checkbox';
import { AsyncSelectTemplate } from './examples/async';
import { EditableSelectTemplate } from './examples/editable';
import { MultipleHandledTemplate } from './examples/multiple-handled';
import Select, { IGroupedOptions, ISelectOption } from './select';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4589-107311&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/97a0a6-select" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'TEDI-Ready/Components/Form/Select',
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'tallinn', label: 'Tallinn' },
  { value: 'narva', label: 'Narva' },
  { value: 'tartu', label: 'Tartu', isDisabled: true },
  { value: 'elva', label: 'Elva' },
  { value: 'rakvere', label: 'Rakvere' },
  { value: 'haapsalu', label: 'Haapsalu' },
];

const groupedOptions: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> = [
  {
    label: 'American cities',
    options: [
      { value: 'new-york', label: 'New York' },
      { value: 'dallas', label: 'Dallas' },
    ],
  },
  {
    label: 'Estonian cities',
    options: [
      { value: 'tallinn', label: 'Tallinn' },
      { value: 'tartu', label: 'Tartu' },
    ],
  },
];

const TemplateSizes: StoryFn = (args) => (
  <Row>
    <Col lg={12} xs={12} className="example-list">
      <Row className="border-bottom padding-14-16">
        <Col lg={2} xs={12} className="display-flex align-items-center">
          <Text modifiers="bold">Default</Text>
        </Col>
        <Col lg={10} xs={12}>
          <Select label={args.label} id="select-size-default" {...args} />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col lg={2} xs={12} className="display-flex align-items-center">
          <Text modifiers="bold">Small</Text>
        </Col>
        <Col lg={10} xs={12}>
          <Select label={args.label} size="small" id="select-size-default" {...args} />
        </Col>
      </Row>
    </Col>
  </Row>
);

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: options[1],
    options: options,
  },
};

export const Sizes: StoryObj<typeof TemplateSizes> = {
  render: TemplateSizes,
  args: {
    label: 'Label',
    options: options,
  },
};

export const Type: Story = {
  args: {
    options: options,
    label: 'Label',
  },
  render: (args) => (
    <VerticalSpacing>
      <Select {...args} id="type-default" label="Default" />
      <Select
        {...args}
        id="type-hint"
        label="With hint"
        helper={{ text: 'Hint text', type: 'hint', position: 'left' }}
      />
    </VerticalSpacing>
  ),
};

export const States: Story = {
  args: {
    options: options,
    label: 'Label',
  },
  render: (args) => (
    <VerticalSpacing>
      <Row>
        <Col lg={2} xs={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Default</Text>
        </Col>
        <Col>
          <Select {...args} id="example-default" />
        </Col>
      </Row>
      <Row>
        <Col lg={2} xs={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Hover</Text>
        </Col>
        <Col>
          <Select
            {...args}
            id="example-hover"
            classNames={{
              control: 'pseudo-hover',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={2} xs={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Focus</Text>
        </Col>
        <Col>
          <Select
            {...args}
            id="example-focus"
            classNames={{
              control: 'pseudo-focus',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={2} xs={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Active</Text>
        </Col>
        <Col>
          <Select
            {...args}
            id="example-active"
            classNames={{
              control: 'pseudo-active',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={2} xs={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col>
          <Select {...args} helper={{ text: 'Error text', type: 'error' }} id="example-error" />
        </Col>
      </Row>
      <Row>
        <Col lg={2} xs={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col>
          <Select {...args} helper={{ text: 'Valid text', type: 'valid' }} id="example-valid" />
        </Col>
      </Row>
      <Row>
        <Col lg={2} xs={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Disabled</Text>
        </Col>
        <Col>
          <Select {...args} disabled id="example-disabled" />
        </Col>
      </Row>
    </VerticalSpacing>
  ),
};

/**
 * Value states: no value, default, placeholder, multi-row multiselect, and
 * **single-row multiselect** with overflow `+N` counter (the `tagsDirection="row"` handling).
 */
const longTagOptions: ISelectOption[] = [
  { value: 'longer-text', label: 'Longer text' },
  { value: 'longer-text-on-one-row', label: 'Longer text on one row' },
  { value: 'third-option', label: 'Third option' },
  { value: 'fourth-option', label: 'Fourth option' },
  { value: 'fifth-option', label: 'Fifth option' },
];

const multiTagOptions: ISelectOption[] = Array.from({ length: 10 }, (_, i) => ({
  value: `tag-${i + 1}`,
  label: `Tag ${i + 1}`,
}));

interface ColorData {
  name: string;
  color: string;
}

const colorPickerOptions: ISelectOption<ColorData>[] = (
  [
    { name: 'Transparent', color: 'transparent' },
    { name: 'White', color: '#ffffff' },
    { name: 'Red', color: '#f42a25' },
    { name: 'Magenta', color: '#e81e63' },
    { name: 'Purple', color: '#b21f7e' },
    { name: 'Violet', color: '#673ab7' },
    { name: 'Indigo', color: '#3f51b5' },
    { name: 'Blue', color: '#3f88c5' },
    { name: 'Light blue', color: '#03a9f3' },
    { name: 'Cyan', color: '#00bcd3' },
    { name: 'Teal', color: '#009688' },
    { name: 'Green', color: '#4caf50' },
    { name: 'Light green', color: '#8bc24a' },
    { name: 'Lime', color: '#ccdb39' },
    { name: 'Yellow', color: '#f2d611' },
    { name: 'Amber', color: '#ffc107' },
    { name: 'Orange', color: '#ff9800' },
    { name: 'Deep orange', color: '#ff5722' },
    { name: 'Grey', color: '#9e9e9e' },
    { name: 'Blue grey', color: '#607d8b' },
    { name: 'Brown', color: '#795548' },
    { name: 'Black', color: '#0d0d0d' },
  ] satisfies ColorData[]
).map((c, i) => ({ value: String(i + 1), label: c.name, customData: c }));

const colorSwatchStyle = (data: ColorData): React.CSSProperties => ({
  width: '100%',
  height: '100%',
  borderRadius: 4,
  background:
    data.color === 'transparent'
      ? 'linear-gradient(to top right, #fff calc(50% - 1px), #e53935 calc(50% - 1px), #e53935 calc(50% + 1px), #fff calc(50% + 1px))'
      : data.color,
  border:
    data.color === 'transparent' || data.color === '#ffffff' ? '1px solid var(--form-input-border-default)' : 'none',
});

const triggerSwatchStyle = (data: ColorData): React.CSSProperties => ({
  ...colorSwatchStyle(data),
  width: 24,
  height: 24,
});

interface IconData {
  name: string;
  icon: string;
}

const iconPickerOptions: ISelectOption<IconData>[] = (
  [
    { name: 'Desktop', icon: 'computer' },
    { name: 'Phone', icon: 'smartphone' },
    { name: 'Tablet', icon: 'tablet_mac' },
    { name: 'Watch', icon: 'watch' },
    { name: 'TV', icon: 'tv' },
  ] satisfies IconData[]
).map((d, i) => ({ value: String(i + 1), label: d.name, customData: d }));

export const ValueType: Story = {
  render: () => (
    <VerticalSpacing>
      <Select id="value-no-value" label="No value" options={options} isClearable={false} />
      <Select id="value-default" label="Default" options={options} defaultValue={options[0]} isClearable />
      <Select
        id="value-placeholder"
        label="Placeholder"
        options={options}
        placeholder="Text value"
        isClearable={false}
      />
      <Select
        id="value-multiselect"
        label="Multiselect"
        options={multiTagOptions}
        defaultValue={multiTagOptions}
        multiple
        tagsDirection="stack"
        isTagRemovable
        isClearable
      />
      <Select
        id="value-multiselect-one-row"
        label="Multiselect one row"
        options={longTagOptions}
        defaultValue={longTagOptions}
        multiple
        tagsDirection="row"
        isTagRemovable
        isClearable
      />
      <div style={{ width: 100 }}>
        <Select
          id="value-color"
          label="Color"
          options={colorPickerOptions}
          defaultValue={colorPickerOptions[0]}
          dropdownType="grid"
          isClearable={false}
          isSearchable={false}
          renderValue={(option) => (
            <div
              role="img"
              aria-label={(option.customData as ColorData).name}
              style={triggerSwatchStyle(option.customData as ColorData)}
            />
          )}
          renderOption={(optionProps) => (
            <div
              role="img"
              aria-label={(optionProps.data.customData as ColorData).name}
              style={colorSwatchStyle(optionProps.data.customData as ColorData)}
            />
          )}
        />
      </div>
      <div style={{ width: 100 }}>
        <Select
          id="value-icon"
          label="Icon"
          options={iconPickerOptions}
          defaultValue={iconPickerOptions[0]}
          dropdownType="grid"
          isClearable={false}
          isSearchable={false}
          renderValue={(option) => {
            const data = option.customData as IconData;
            return <Icon name={data.icon} size={24} aria-label={data.name} />;
          }}
          renderOption={(optionProps) => {
            const data = optionProps.data.customData as IconData;
            return <Icon name={data.icon} size={18} aria-label={data.name} />;
          }}
        />
      </div>
    </VerticalSpacing>
  ),
};

const departmentOptions: ISelectOption[] = [
  'Emergency department',
  'Internal medicine',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Surgery',
  'Urology',
  'Dermatology',
  'Oncology',
  'Gastroenterology',
  'Pulmonology',
  'Nephrology',
  'Endocrinology',
  'Rheumatology',
  'Infectious diseases',
  'Hematology',
  'Allergy and immunology',
  'Geriatrics',
  'Neonatology',
  'Palliative care',
  'Physical medicine',
  'Anesthesiology',
  'Pathology',
  'Nuclear medicine',
  'Ophthalmology',
  'Otolaryngology',
  'Plastic surgery',
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, '-'), label }));

const groupedDepartments: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> = [
  {
    label: 'Emergency',
    options: [
      { value: 'emergency-department', label: 'Emergency department' },
      { value: 'urgent-care', label: 'Urgent care' },
    ],
  },
  {
    label: 'Internal',
    options: [
      { value: 'internal-medicine', label: 'Internal medicine' },
      { value: 'cardiology', label: 'Cardiology' },
      { value: 'neurology', label: 'Neurology' },
    ],
  },
  {
    label: 'Surgery',
    options: [
      { value: 'general-surgery', label: 'General surgery' },
      { value: 'orthopedic-surgery', label: 'Orthopedic surgery' },
      { value: 'neurosurgery', label: 'Neurosurgery' },
    ],
  },
];

interface DescriptionData {
  title: string;
  description: string;
}

const accessOptions: ISelectOption<DescriptionData>[] = [
  {
    value: '1',
    label: 'Access to health data',
    customData: { title: 'Access to health data', description: 'Doctors will be able to see your health data' },
  },
  {
    value: '2',
    label: 'Access to medications and health data',
    customData: {
      title: 'Access to medications and health data',
      description: 'Doctors will be able to see your medications and health data',
    },
  },
  {
    value: '3',
    label: 'Access to all',
    customData: { title: 'Access to all', description: 'Doctors will be able to see all your information' },
  },
];

const permissionOptions: ISelectOption<DescriptionData>[] = [
  {
    value: '1',
    label: 'Read permissions',
    customData: { title: 'Read permissions', description: 'Can view documents and files' },
  },
  {
    value: '2',
    label: 'Write permissions',
    customData: { title: 'Write permissions', description: 'Can create and edit documents' },
  },
  {
    value: '3',
    label: 'Admin permissions',
    customData: { title: 'Admin permissions', description: 'Full access to all features' },
  },
];

interface MetaData {
  name: string;
  slots: number;
}

const locationMetaOptions: ISelectOption<MetaData>[] = [
  { value: '1', label: 'Tallinn', customData: { name: 'Tallinn', slots: 3 } },
  { value: '2', label: 'Tartu', customData: { name: 'Tartu', slots: 4 } },
  { value: '3', label: 'Elva', customData: { name: 'Elva', slots: 7 } },
  { value: '4', label: 'Pärnu', customData: { name: 'Pärnu', slots: 2 } },
  { value: '5', label: 'Narva', customData: { name: 'Narva', slots: 5 } },
];

const renderDescriptionOption = (props: OptionProps<ISelectOption, boolean>) => {
  const { title, description } = props.data.customData as DescriptionData;
  return (
    <Row gutterY={2}>
      <Col>
        <Text>{title}</Text>
        <Text color="secondary" modifiers="small">
          {description}
        </Text>
      </Col>
    </Row>
  );
};

const renderDescriptionOptionWithCheckbox = (props: OptionProps<ISelectOption, boolean>) => {
  const { title, description } = props.data.customData as DescriptionData;
  return (
    <Row gutterY={2} gutterX={1} alignItems="start">
      <Col width="auto">
        <Checkbox
          id={props.data.value}
          label=""
          aria-hidden
          value={props.data.value}
          name={props.data.value}
          checked={props.isSelected}
          onChange={() => null}
          disabled={props.isDisabled}
        />
      </Col>
      <Col width="auto">
        <span className="sr-only">{props.label}</span>
        <Text>{title}</Text>
        <Text color="secondary" modifiers="small">
          {description}
        </Text>
      </Col>
    </Row>
  );
};

const renderHorizontalMetaOption = (props: OptionProps<ISelectOption, boolean>) => {
  const { name, slots } = props.data.customData as MetaData;
  return (
    <Row justifyContent="between" gutterY={0}>
      <Col width="auto">
        <Text>{name}</Text>
      </Col>
      <Col width="auto">
        <Text color="secondary" modifiers="small">
          {slots} timeslots available
        </Text>
      </Col>
    </Row>
  );
};

const selectAllOptions: ISelectOption[] = [
  { value: '1', label: 'Locations' },
  { value: '2', label: 'Doctors' },
  { value: '3', label: 'Hospitals' },
];

export const Examples: Story = {
  render: () => (
    <VerticalSpacing>
      <Select
        id="examples-select-all"
        label="Multiselect with Select All"
        placeholder="Select options..."
        options={selectAllOptions}
        multiple
        showSelectAll
        isClearable={false}
      />
      <Select
        id="examples-scrollable"
        label="Scrollable list"
        placeholder="Select department..."
        options={departmentOptions}
        isClearable={false}
        isSearchable={false}
      />
      <Select
        id="examples-searchable"
        label="Searchable select"
        placeholder="Search departments..."
        options={departmentOptions}
        isSearchable
        isClearable
      />
      <Select
        id="examples-searchable-multi"
        label="Searchable multiselect"
        placeholder="Search and select departments..."
        options={departmentOptions}
        isSearchable
        multiple
        isClearable
        isTagRemovable
      />
      <Select
        id="examples-grouped-single"
        label="Grouped single select"
        placeholder="Select department..."
        options={groupedDepartments}
        isClearable={false}
      />
      <Select
        id="examples-with-description"
        label="Options with descriptions"
        placeholder="Select access level..."
        options={accessOptions}
        renderOption={renderDescriptionOption}
        isClearable={false}
      />
      <Select
        id="examples-grouped-multi"
        label="Grouped multiselect"
        placeholder="Select departments..."
        options={groupedDepartments}
        multiple
        isClearable
        isTagRemovable
      />
      <Select
        id="examples-grouped-selectable"
        label="Grouped multiselect with selectable groups"
        placeholder="Select departments..."
        options={groupedDepartments}
        multiple
        selectableGroups
        isClearable
        isTagRemovable
      />
      <Select
        id="examples-grouped-select-all"
        label="Grouped multiselect with Select All"
        placeholder="Select departments..."
        options={groupedDepartments}
        multiple
        showSelectAll
        selectableGroups
        isClearable
        isTagRemovable
      />
      <Select
        id="examples-horizontal-meta"
        label="Options with horizontal meta"
        placeholder="Select location..."
        options={locationMetaOptions}
        renderOption={renderHorizontalMetaOption}
        isClearable={false}
      />
      <Select
        id="examples-radio"
        label="Single select with radio buttons"
        placeholder="Select access level..."
        options={accessOptions}
        showRadioButtons
        isClearable={false}
      />
      <Select
        id="examples-multi-custom"
        label="Multiselect with custom templates"
        placeholder="Select permissions..."
        options={permissionOptions}
        renderOption={renderDescriptionOptionWithCheckbox}
        multiple
        isClearable
        isTagRemovable
      />
    </VerticalSpacing>
  ),
};

/**
 * Demonstrates the controlled-value pattern: parent owns selection in
 * `useState`, passes `value` and `onChange`. Use this shape when selection
 * needs to be lifted (form integration, programmatic updates, etc.).
 */
export const MultipleHandled: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'multiple-handled-example',
    label: 'Multiple Select',
    multiple: true,
    isTagRemovable: true,
  },
};

/**
 * Demonstrates the `async` mode with a `loadOptions` callback that fetches
 * matches on demand instead of receiving a static `options` array. Use this
 * shape when the option list lives on the server, is too large to ship up
 * front, or needs to be filtered by the backend (typeahead search, remote
 * lookup, etc.).
 *
 * In this example `loadOptions` simulates a 1s network delay before resolving
 * with a locally filtered list of labelled options, and the user's input is
 * sanitised (non-word characters stripped) before it's used as the search
 * term — the sanitised value is shown above the select.
 */
export const AsyncSelect: Story = {
  render: AsyncSelectTemplate,
  args: {
    id: 'async-example',
    label: 'Async label',
    async: true,
  },
};

/**
 * Demonstrates a fully controlled combobox where the parent owns both the
 * selected `value` AND the visible `inputValue`. Use this shape when the
 * input text needs to be edited freely (rather than only filter the menu)
 * and stay in sync with the selected option — e.g. an editable autocomplete
 * field.
 *
 * Selecting an option from the menu overwrites the input text with that
 * option's label. Typing into the field updates `inputValue` only, leaving
 * the previously selected value intact until a new option is picked. The
 * underlying input is rendered visibly (`inputIsHidden={false}`).
 */
export const EditableSelect: Story = {
  render: EditableSelectTemplate,
  args: {
    id: 'editable-example',
    label: 'Editable label',
  },
};
