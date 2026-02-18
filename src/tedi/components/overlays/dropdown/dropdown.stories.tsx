import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import Checkbox from '../../form/checkbox/checkbox';
import Radio from '../../form/radio/radio';
import { Dropdown } from './dropdown';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.34.53?node-id=2319-64439&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/0930a9-dropdown-item" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'TEDI-Ready/Components/Overlay/Dropdown',
  component: Dropdown,
  subcomponents: {
    'Dropdown.Trigger': Dropdown.Trigger,
    'Dropdown.Content': Dropdown.Content,
    'Dropdown.Item': Dropdown.Item,
    'Dropdown.Separator': Dropdown.Separator,
  } as never,
} as Meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          Open dropdown
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0} onClick={() => console.log('Lisa pöördumine')}>
          Access to health data
        </Dropdown.Item>
        <Dropdown.Item index={1} onClick={() => console.log('Lisa toetus')}>
          Declaration of intent
        </Dropdown.Item>
        <Dropdown.Item index={2}>Contacts</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithActiveItem: Story = {
  render: () => {
    const [lang, setLang] = React.useState('ENG');

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="link" iconRight="expand_more">
            {lang}
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {['EST', 'ENG', 'RUS'].map((l, i) => (
            <Dropdown.Item key={l} index={i} active={lang === l} onClick={() => setLang(l)}>
              {l}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const WithCheckbox: Story = {
  render: () => {
    const [cities, setCities] = React.useState<string[]>([]);

    const toggle = (value: string, checked?: boolean) => {
      setCities((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
    };

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="secondary">Locations ({cities.length})</Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0} asChild>
            <Checkbox
              id="parnu"
              label="Pärnu"
              value="parnu"
              checked={cities.includes('parnu')}
              onChange={toggle}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={1} asChild>
            <Checkbox
              id="tartu"
              label="Tartu"
              value="tartu"
              checked={cities.includes('tartu')}
              onChange={toggle}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={2} asChild>
            <Checkbox
              id="tallinn"
              label="Tallinn"
              value="tallinn"
              checked={cities.includes('tallinn')}
              onChange={toggle}
              name=""
            />
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

type City = 'tallinn' | 'tartu' | 'parnu';
const allCities: City[] = ['tallinn', 'tartu', 'parnu'];

export const WithIndentedItems: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<City[]>([]);

    const allChecked = selected.length === allCities.length;
    const noneChecked = selected.length === 0;
    const indeterminate = !allChecked && !noneChecked;

    const toggleAll = (_: string, checked?: boolean) => {
      setSelected(checked ? allCities : []);
    };

    const toggleOne = (value: string, checked?: boolean) => {
      setSelected((prev) => (checked ? [...prev, value as City] : prev.filter((v) => v !== value)));
    };

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="secondary">Locations ({selected.length})</Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0} asChild>
            <Checkbox
              id="all"
              label="All locations"
              checked={allChecked}
              indeterminate={indeterminate}
              onChange={toggleAll}
              name=""
              value=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={1} asChild indent={1}>
            <Checkbox
              id="tallinn"
              label="Tallinn"
              value="tallinn"
              checked={selected.includes('tallinn')}
              onChange={toggleOne}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={2} asChild indent={1}>
            <Checkbox
              id="tartu"
              label="Tartu"
              value="tartu"
              checked={selected.includes('tartu')}
              onChange={toggleOne}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={3} asChild indent={1}>
            <Checkbox
              id="parnu"
              label="Pärnu"
              value="parnu"
              checked={selected.includes('parnu')}
              onChange={toggleOne}
              name=""
            />
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const WithRadio: Story = {
  render: () => {
    const [city, setCity] = React.useState<string>('tallinn');

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="secondary">Choose city: {city}</Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0} asChild>
            <Radio
              id="city-tallinn"
              name="city"
              value="tallinn"
              label="Tallinn"
              checked={city === 'tallinn'}
              onChange={(value) => setCity(value)}
            />
          </Dropdown.Item>

          <Dropdown.Item index={1} asChild>
            <Radio
              id="city-tartu"
              name="city"
              value="tartu"
              label="Tartu"
              checked={city === 'tartu'}
              onChange={(value) => setCity(value)}
            />
          </Dropdown.Item>

          <Dropdown.Item index={2} asChild>
            <Radio
              id="city-parnu"
              name="city"
              value="parnu"
              label="Pärnu"
              checked={city === 'parnu'}
              onChange={(value) => setCity(value)}
            />
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const WithIcon: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary">Actions</Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0}>
          <Text>
            <Icon name="download" color="inherit" display="inline" /> Download
          </Text>
        </Dropdown.Item>
        <Dropdown.Item index={1}>
          <Text>
            <Icon name="add" color="inherit" display="inline" /> Add
          </Text>
        </Dropdown.Item>
        <Dropdown.Item index={2}>
          <Text>
            <Icon name="delete" color="inherit" display="inline" /> Delete
          </Text>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const Divided: Story = {
  render: () => (
    <Dropdown divided>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          Account
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0}>Profile</Dropdown.Item>
        <Dropdown.Item index={1}>Security</Dropdown.Item>
        <Dropdown.Item index={2}>Billing</Dropdown.Item>
        <Dropdown.Item index={3}>Log out</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          More actions
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item index={0}>
          <Text>
            <Icon name="edit" display="inline" /> Edit
          </Text>
        </Dropdown.Item>
        <Dropdown.Item index={1}>
          <Text>
            <Icon name="content_copy" display="inline" /> Duplicate
          </Text>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item index={2}>
          <Text>
            <Icon name="archive" display="inline" /> Archive
          </Text>
        </Dropdown.Item>
        <Dropdown.Item index={3}>
          <Text>
            <Icon name="delete" display="inline" /> Delete
          </Text>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};
