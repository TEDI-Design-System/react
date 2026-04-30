import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Dropdown } from '../../overlays/dropdown';
import { Field, FieldProps } from '../field/field';
import { FileUpload } from '../file-upload';
import { Search } from '../search/search';
import Select from '../select/select';
import InputGroup, { InputGroupProps } from './input-group';

/**
 * <p>InputGroup is a flexible wrapper that allows composing form controls with prefixes and suffixes.
 * It supports form elements e.g Field, Select, FileUpload, etc.</p>
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.68?node-id=4968-94396&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/18b6b5-input-group" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof InputGroup> = {
  title: 'TEDI-Ready/Components/Form/InputGroup',
  component: InputGroup,
  subcomponents: {
    'InputGroup.Prefix': InputGroup.Prefix,
    'InputGroup.Input': InputGroup.Input,
    'InputGroup.Suffix': InputGroup.Suffix,
  } as never,
};

export default meta;

type Story = StoryObj<InputGroupProps>;

export const StartStatic: Story = {
  args: {
    label: 'Address',
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Prefix>Street</InputGroup.Prefix>
      <InputGroup.Input>
        <Field id="start-static-1" />
      </InputGroup.Input>
    </InputGroup>
  ),
};

const COUNTRIES = [
  { code: 'EE', name: 'Estonia', dial: '372' },
  { code: 'LV', name: 'Latvia', dial: '371' },
  { code: 'LT', name: 'Lithuania', dial: '370' },
  { code: 'FI', name: 'Finland', dial: '358' },
];

const CURRENCIES = [
  { code: 'EUR', name: 'Euro' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'SEK', name: 'Swedish Krona' },
];

const ACCOUNTS = [
  { label: 'Checking · EE38 2200 2210 2014 5685', value: 'checking' },
  { label: 'Savings · EE96 2200 2210 2014 7283', value: 'savings' },
  { label: 'Investment · EE27 2200 2210 2014 8120', value: 'investment' },
];

const FILE_FORMATS = ['PDF', 'XLSX', 'DOCX', 'CSV', 'TXT'];

const SEARCH_CATEGORIES = ['All', 'Articles', 'People', 'Files', 'Projects'];

const PhonePrefixRow = () => {
  const [country, setCountry] = useState(COUNTRIES[0]);
  return (
    <Row>
      <Col lg={4} md={12}>
        <InputGroup label="Phone number" id="start-phone">
          <InputGroup.Prefix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  +{country.dial} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {COUNTRIES.map((c) => (
                  <Dropdown.Item key={c.code} active={c.code === country.code} onClick={() => setCountry(c)}>
                    {c.name} (+{c.dial})
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Prefix>
          <InputGroup.Input>
            <Field type="tel" />
          </InputGroup.Input>
        </InputGroup>
      </Col>
    </Row>
  );
};

const CurrencyPrefixSelectRow = () => {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  return (
    <Row>
      <Col lg={4} md={12}>
        <InputGroup label="Transfer from" id="start-transfer-from">
          <InputGroup.Prefix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  {currency.code} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {CURRENCIES.map((c) => (
                  <Dropdown.Item key={c.code} active={c.code === currency.code} onClick={() => setCurrency(c)}>
                    {c.name} ({c.code})
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Prefix>
          <InputGroup.Input>
            <Select isClearIndicatorVisible options={ACCOUNTS} />
          </InputGroup.Input>
        </InputGroup>
      </Col>
    </Row>
  );
};

const FileFormatPrefixRow = () => {
  const [format, setFormat] = useState(FILE_FORMATS[0]);
  return (
    <Row>
      <Col>
        <InputGroup label="Report" id="start-file-format">
          <InputGroup.Prefix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  {format} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {FILE_FORMATS.map((f) => (
                  <Dropdown.Item key={f} active={f === format} onClick={() => setFormat(f)}>
                    {f}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Prefix>
          <InputGroup.Input>
            <FileUpload name="start-file-upload" />
          </InputGroup.Input>
        </InputGroup>
      </Col>
    </Row>
  );
};

const SearchCategoryPrefixRow = () => {
  const [category, setCategory] = useState(SEARCH_CATEGORIES[0]);
  return (
    <Row>
      <Col>
        <InputGroup label="Search" id="start-search-category">
          <InputGroup.Prefix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  {category} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {SEARCH_CATEGORIES.map((c) => (
                  <Dropdown.Item key={c} active={c === category} onClick={() => setCategory(c)}>
                    {c}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Prefix>
          <InputGroup.Input>
            <Search name="start-search" />
          </InputGroup.Input>
        </InputGroup>
      </Col>
    </Row>
  );
};

export const StartDynamic: Story = {
  render: () => (
    <VerticalSpacing>
      <PhonePrefixRow />
      <CurrencyPrefixSelectRow />
      <FileFormatPrefixRow />
      <SearchCategoryPrefixRow />
    </VerticalSpacing>
  ),
};

export const EndStatic: Story = {
  args: {
    label: 'Cost',
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Input>
        <Field id="end-static-1" />
      </InputGroup.Input>
      <InputGroup.Suffix>EUR</InputGroup.Suffix>
    </InputGroup>
  ),
};

const TIMEZONES = [
  { code: 'UTC', label: 'UTC' },
  { code: 'EET', label: 'EET (UTC+2)' },
  { code: 'CET', label: 'CET (UTC+1)' },
  { code: 'EST', label: 'EST (UTC−5)' },
];

const MEETINGS = [
  { label: 'Weekly sync · Mon 09:00', value: 'weekly-sync' },
  { label: 'Product review · Wed 14:00', value: 'product-review' },
  { label: 'All-hands · Fri 11:00', value: 'all-hands' },
];

const CostUnitSuffixRow = () => {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  return (
    <Row>
      <Col lg={4} md={12}>
        <InputGroup label="Cost" id="end-cost-currency">
          <InputGroup.Input>
            <Field type="tel" />
          </InputGroup.Input>
          <InputGroup.Suffix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  {currency.code} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {CURRENCIES.map((c) => (
                  <Dropdown.Item key={c.code} active={c.code === currency.code} onClick={() => setCurrency(c)}>
                    {c.name} ({c.code})
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Suffix>
        </InputGroup>
      </Col>
    </Row>
  );
};

const TimezoneSuffixSelectRow = () => {
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  return (
    <Row>
      <Col lg={4} md={12}>
        <InputGroup label="Schedule" id="end-schedule-timezone">
          <InputGroup.Input>
            <Select isClearIndicatorVisible options={MEETINGS} />
          </InputGroup.Input>
          <InputGroup.Suffix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  {timezone.code} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {TIMEZONES.map((t) => (
                  <Dropdown.Item key={t.code} active={t.code === timezone.code} onClick={() => setTimezone(t)}>
                    {t.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Suffix>
        </InputGroup>
      </Col>
    </Row>
  );
};

const FileFormatSuffixRow = () => {
  const [format, setFormat] = useState(FILE_FORMATS[0]);
  return (
    <Row>
      <Col>
        <InputGroup label="Report" id="end-file-format">
          <InputGroup.Input>
            <FileUpload name="end-file-upload" />
          </InputGroup.Input>
          <InputGroup.Suffix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  {format} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {FILE_FORMATS.map((f) => (
                  <Dropdown.Item key={f} active={f === format} onClick={() => setFormat(f)}>
                    {f}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Suffix>
        </InputGroup>
      </Col>
    </Row>
  );
};

const SearchCategorySuffixRow = () => {
  const [category, setCategory] = useState(SEARCH_CATEGORIES[0]);
  return (
    <Row>
      <Col>
        <InputGroup label="Search" id="end-search-category">
          <InputGroup.Input>
            <Search name="end-search" />
          </InputGroup.Input>
          <InputGroup.Suffix>
            <Dropdown>
              <Dropdown.Trigger>
                <Button noStyle className="flex align-items-center">
                  {category} <Icon name="arrow_drop_down" color="inherit" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {SEARCH_CATEGORIES.map((c) => (
                  <Dropdown.Item key={c} active={c === category} onClick={() => setCategory(c)}>
                    {c}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </InputGroup.Suffix>
        </InputGroup>
      </Col>
    </Row>
  );
};

export const EndDynamic: Story = {
  render: () => (
    <VerticalSpacing>
      <CostUnitSuffixRow />
      <TimezoneSuffixSelectRow />
      <FileFormatSuffixRow />
      <SearchCategorySuffixRow />
    </VerticalSpacing>
  ),
};

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];

interface TemplateStateProps extends FieldProps {
  array: typeof stateArray;
}

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array } = args;

  return (
    <div className="state-example">
      {array.map((state, index) => (
        <Row key={index} className="padding-14-16">
          <Col width={2} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col>
            <InputGroup label="Label" id="state-example" disabled={state === 'Disabled'}>
              <InputGroup.Prefix>Street</InputGroup.Prefix>
              <InputGroup.Input>
                <Field id={state} />
              </InputGroup.Input>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup label="Label" id="state-example" disabled={state === 'Disabled'}>
              <InputGroup.Input>
                <Field id={state} />
              </InputGroup.Input>
              <InputGroup.Suffix>EUR</InputGroup.Suffix>
            </InputGroup>
          </Col>
        </Row>
      ))}
      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col>
          <InputGroup label="Label" id="state-example" helper={{ text: 'Feedback text', type: 'error' }}>
            <InputGroup.Prefix>Street</InputGroup.Prefix>
            <InputGroup.Input>
              <Field invalid />
            </InputGroup.Input>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup label="Label" id="state-example" helper={{ text: 'Feedback text', type: 'error' }}>
            <InputGroup.Input>
              <Field invalid />
            </InputGroup.Input>
            <InputGroup.Suffix>EUR</InputGroup.Suffix>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const WithButtonAddons: Story = {
  args: {
    label: 'Promo code',
    addons: false,
  },
  render: (args) => (
    <VerticalSpacing>
      <InputGroup {...args} id="input-group-button">
        <InputGroup.Input>
          <Field placeholder="Enter promo code" />
        </InputGroup.Input>
        <InputGroup.Suffix>
          <Button>Apply</Button>
        </InputGroup.Suffix>
      </InputGroup>
    </VerticalSpacing>
  ),
};
