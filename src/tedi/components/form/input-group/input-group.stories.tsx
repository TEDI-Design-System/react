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
 * It supports any form elements e.g Field, Select, FileUpload, etc.</p>
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.68?node-id=4968-94396&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/18b6b5-input-group" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof InputGroup> = {
  component: InputGroup,
  title: 'TEDI-Ready/Components/Form/InputGroup',
};

export default meta;
type Story = StoryObj<InputGroupProps>;

export const StartStatic: Story = {
  args: {
    label: 'Address',
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Prefix>
        <Text>Street</Text>
      </InputGroup.Prefix>
      <InputGroup.Input>
        <Field id="start-static-1" />
      </InputGroup.Input>
    </InputGroup>
  ),
};

export const StartDynamic: Story = {
  render: () => {
    const [country, setCountry] = useState('EE');

    const countries = [
      { code: 'EE', name: 'Estonia' },
      { code: 'LV', name: 'Latvia' },
      { code: 'LT', name: 'Lithuania' },
      { code: 'FI', name: 'Finland' },
    ];

    const current = countries.find((c) => c.code === country)!;

    return (
      <VerticalSpacing>
        <Row>
          <Col width={4}>
            <InputGroup label="Phone number" id="phone-with-country">
              <InputGroup.Prefix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      +{current.code === 'EE' ? '372' : '371'} <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {countries.map((c) => (
                      <Dropdown.Item key={c.code} active={c.code === country} onClick={() => setCountry(c.code)}>
                        {c.name} (+{c.code === 'EE' ? '372' : '371'})
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Prefix>
              <InputGroup.Input>
                <Field id="input-group-tel-example-1" type="tel" />
              </InputGroup.Input>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col width={4}>
            <InputGroup label="Label" id="prefix-select">
              <InputGroup.Prefix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      Prefix <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {countries.map((c) => (
                      <Dropdown.Item key={c.code} active={c.code === country} onClick={() => setCountry(c.code)}>
                        {c.name} (+{c.code === 'EE' ? '372' : '371'})
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Prefix>
              <InputGroup.Input>
                <Select
                  id="select-example-1"
                  label="lorem ipsum"
                  hideLabel
                  isClearIndicatorVisible
                  options={[
                    { label: 'lorem', value: 'lorem' },
                    { label: 'ipsum', value: 'ipsum' },
                    { label: 'dolor', value: 'dolor' },
                  ]}
                />
              </InputGroup.Input>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup label="File" id="prefix-select">
              <InputGroup.Prefix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      PDF <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item>PDF</Dropdown.Item>
                    <Dropdown.Item>XLS</Dropdown.Item>
                    <Dropdown.Item>TXT</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Prefix>
              <InputGroup.Input>
                <FileUpload hideLabel label="File upload" name="file-upload" id="file-upload" />
              </InputGroup.Input>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup label="Search" id="prefix-search">
              <InputGroup.Prefix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      Category <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item>Lorem</Dropdown.Item>
                    <Dropdown.Item>Ipsum</Dropdown.Item>
                    <Dropdown.Item>Dolor</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Prefix>
              <InputGroup.Input>
                <Search hideLabel label="Search" name="search" id="seach-prefix" />
              </InputGroup.Input>
            </InputGroup>
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
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
      <InputGroup.Suffix>
        <Text>EUR</Text>
      </InputGroup.Suffix>
    </InputGroup>
  ),
};

export const EndDynamic: Story = {
  render: () => {
    const [selectedUnit, setSelectedUnit] = useState('EUR');

    const units = ['EUR', 'USD', 'GBP', 'SEK'];

    return (
      <VerticalSpacing>
        <Row>
          <Col width={4}>
            <InputGroup label="Cost" id="cost-with-selection">
              <InputGroup.Input>
                <Field id="input-group-tel-example-1" type="tel" />
              </InputGroup.Input>
              <InputGroup.Suffix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      {selectedUnit} <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {units.map((unit) => (
                      <Dropdown.Item key={unit} active={unit === selectedUnit} onClick={() => setSelectedUnit(unit)}>
                        {unit}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Suffix>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col width={4}>
            <InputGroup label="Label" id="prefix-select">
              <InputGroup.Input>
                <Select
                  id="select-example-1"
                  label="lorem ipsum"
                  hideLabel
                  isClearIndicatorVisible
                  options={[
                    { label: 'lorem', value: 'lorem' },
                    { label: 'ipsum', value: 'ipsum' },
                    { label: 'dolor', value: 'dolor' },
                  ]}
                />
              </InputGroup.Input>
              <InputGroup.Suffix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      Prefix <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item>Lorem</Dropdown.Item>
                    <Dropdown.Item>Ipsum</Dropdown.Item>
                    <Dropdown.Item>Dolor</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Suffix>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup label="File" id="prefix-select">
              <InputGroup.Input>
                <FileUpload hideLabel label="File upload" name="file-upload" id="file-upload" />
              </InputGroup.Input>
              <InputGroup.Suffix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      PDF <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item>PDF</Dropdown.Item>
                    <Dropdown.Item>XLS</Dropdown.Item>
                    <Dropdown.Item>TXT</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Suffix>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup label="Search" id="prefix-search">
              <InputGroup.Input>
                <Search hideLabel label="Search" name="search" id="seach-prefix" />
              </InputGroup.Input>
              <InputGroup.Suffix>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button noStyle className="flex align-items-center">
                      Category <Icon name="arrow_drop_down" color="inherit" />
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item>Lorem</Dropdown.Item>
                    <Dropdown.Item>Ipsum</Dropdown.Item>
                    <Dropdown.Item>Dolor</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </InputGroup.Suffix>
            </InputGroup>
          </Col>
        </Row>
      </VerticalSpacing>
    );
  },
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
              <InputGroup.Prefix>
                <Text>Street</Text>
              </InputGroup.Prefix>
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
              <InputGroup.Suffix>
                <Text>EUR</Text>
              </InputGroup.Suffix>
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
            <InputGroup.Prefix>
              <Text>Street</Text>
            </InputGroup.Prefix>
            <InputGroup.Input>
              <Field id="Error" invalid />
            </InputGroup.Input>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup label="Label" id="state-example" helper={{ text: 'Feedback text', type: 'error' }}>
            <InputGroup.Input>
              <Field id="Error" invalid />
            </InputGroup.Input>
            <InputGroup.Suffix>
              <Text>EUR</Text>
            </InputGroup.Suffix>
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

export const WithButtonSuffix: Story = {
  args: {
    label: 'Promo code',
    addons: false,
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Input>
        <Field id="input-group-button" placeholder="Enter promo code" />
      </InputGroup.Input>
      <InputGroup.Suffix>
        <Button>Apply</Button>
      </InputGroup.Suffix>
    </InputGroup>
  ),
};
