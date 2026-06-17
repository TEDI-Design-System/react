import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import Checkbox from '../../form/checkbox/checkbox';
import Radio from '../../form/radio/radio';
import { Search } from '../../form/search/search';
import { Col, Row } from '../../layout/grid';
import Separator from '../../misc/separator/separator';
import { Dropdown } from './dropdown';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.58?node-id=40253-113444&m=dev" target="_BLANK">Dropdown Figma ↗</a><br/>
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.58?node-id=2319-64439&m=dev" target="_BLANK">DropdownItem Figma ↗</a><br/>
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
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.35.54?node-id=12185-156201&t=xqukY4r7lJRpWTby-4',
    },
  },
} as Meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          Create
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
    const [filter, setFilter] = React.useState('Newest first');

    return (
      <Row>
        <Col width={2}>
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
        </Col>
        <Col width={3}>
          <Dropdown width={200}>
            <Dropdown.Trigger>
              <Button visualType="link" iconRight="expand_more">
                Sort: {filter}
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              {['Newest first', 'Oldest first', 'Application name A–Z', 'Application name Z–A'].map((f, i) => (
                <Dropdown.Item key={f} index={i} active={filter === f} onClick={() => setFilter(f)}>
                  {f}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </Col>
      </Row>
    );
  },
};

export const WithAction: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" icon="add">
          Add
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0} onClick={() => console.log('Lisa pöördumine')}>
          Create contact
        </Dropdown.Item>
        <Dropdown.Item index={1} onClick={() => console.log('Lisa toetus')}>
          Create application
        </Dropdown.Item>
        <Dropdown.Item index={2}>Create invoice</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconLeft="more_vert">
          More
        </Button>
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

export const WithCheckbox: Story = {
  render: () => {
    const [cities, setCities] = React.useState<string[]>([]);

    const toggle = (value: string) => (_value: string, checked: boolean) => {
      setCities((prev) => (checked ? [...prev.filter((v) => v !== value), value] : prev.filter((v) => v !== value)));
    };

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="primary" iconRight="keyboard_arrow_down">
            Locations ({cities.length})
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0} asChild>
            <Checkbox
              id="parnu"
              label="Pärnu"
              value="parnu"
              checked={cities.includes('parnu')}
              onChange={toggle('parnu')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={1} asChild>
            <Checkbox
              id="tartu"
              label="Tartu"
              value="tartu"
              checked={cities.includes('tartu')}
              onChange={toggle('tartu')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={2} asChild>
            <Checkbox
              id="tallinn"
              label="Tallinn"
              value="tallinn"
              checked={cities.includes('tallinn')}
              onChange={toggle('tallinn')}
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

    const toggleAll = (_: string, checked: boolean) => {
      setSelected(checked ? allCities : []);
    };

    const toggleOne = (value: City) => (_: string, checked: boolean) => {
      setSelected((prev) => (checked ? [...prev.filter((v) => v !== value), value] : prev.filter((v) => v !== value)));
    };

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="secondary" iconRight="keyboard_arrow_down">
            Locations ({selected.length})
          </Button>
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
              onChange={toggleOne('tallinn')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={2} asChild indent={1}>
            <Checkbox
              id="tartu"
              label="Tartu"
              value="tartu"
              checked={selected.includes('tartu')}
              onChange={toggleOne('tartu')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={3} asChild indent={1}>
            <Checkbox
              id="parnu"
              label="Pärnu"
              value="parnu"
              checked={selected.includes('parnu')}
              onChange={toggleOne('parnu')}
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
    const [city, setCity] = React.useState<'tallinn' | 'tartu' | 'parnu'>('tallinn');

    const cities = {
      tallinn: 'Tallinn',
      tartu: 'Tartu',
      parnu: 'Pärnu',
    };

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="link" iconRight="keyboard_arrow_down">
            City: {cities[city]}
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0} asChild>
            <Radio
              id="city-tallinn"
              name="city"
              value="tallinn"
              label="Tallinn"
              checked={city === 'tallinn'}
              onChange={(value) => setCity(value as City)}
            />
          </Dropdown.Item>

          <Dropdown.Item index={1} asChild>
            <Radio
              id="city-tartu"
              name="city"
              value="tartu"
              label="Tartu"
              checked={city === 'tartu'}
              onChange={(value) => setCity(value as City)}
            />
          </Dropdown.Item>

          <Dropdown.Item index={2} asChild>
            <Radio
              id="city-parnu"
              name="city"
              value="parnu"
              label="Pärnu"
              checked={city === 'parnu'}
              onChange={(value) => setCity(value as City)}
            />
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const CustomWidth: Story = {
  render: () => (
    <Row>
      <Col width={12}>
        <Dropdown width={300}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Actions
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Content>
            <Dropdown.Item index={0} active>
              <div className="flex align-items-center justify-content-between">
                <Text>Access to health data</Text>
                <Icon name="arrow_forward" color="inherit" size={16} />
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <div className="flex align-items-center justify-content-between">
                <Text>Declaration of intent</Text>
                <Icon name="arrow_forward" color="inherit" size={16} />
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={2}>
              <div className="flex align-items-center justify-content-between">
                <Text>Contacts</Text>
                <Icon name="arrow_forward" color="inherit" size={16} />
              </div>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Row>
      <Col width="auto">
        <Dropdown width={400}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconLeft="share" iconRight="keyboard_arrow_down">
              Share access
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Content>
            <Dropdown.Item index={0} active>
              <div className="flex flex-column">
                <Text>Access to health data</Text>
                <Text color="tertiary" modifiers="small">
                  Doctors will be able to see your health data
                </Text>
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <div className="flex flex-column">
                <Text>Access to medications and health data</Text>
                <Text color="tertiary" modifiers="small">
                  Doctors will be able to see your medications and health data
                </Text>
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={2}>
              <div className="flex flex-column">
                <Text>Access to all</Text>
                <Text color="tertiary" modifiers="small">
                  Doctors will be able to see all your information, including declaration of health and other medical
                  info
                </Text>
              </div>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown width={300}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Choose location
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Content>
            <Dropdown.Item index={0} active>
              <div className="flex align-items-center justify-content-between">
                <Text>Tallinn</Text>
                <Text color="tertiary" modifiers="small">
                  3 timeslots available
                </Text>
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <div className="flex align-items-center justify-content-between">
                <Text>Tartu</Text>
                <Text color="tertiary" modifiers="small">
                  4 timeslots available
                </Text>
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={2}>
              <div className="flex align-items-center justify-content-between">
                <Text>Elva</Text>
                <Text color="tertiary" modifiers="small">
                  7 timeslots available
                </Text>
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={3}>
              <div className="flex align-items-center justify-content-between">
                <Text>Rakvere</Text>
                <Text color="tertiary" modifiers="small">
                  3 timeslots available
                </Text>
              </div>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

export const Divided: Story = {
  render: () => (
    <Dropdown divided>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconLeft="account_circle" iconRight="keyboard_arrow_down">
          Account
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0}>Profile</Dropdown.Item>
        <Dropdown.Item index={1}>Security</Dropdown.Item>
        <Dropdown.Item index={2}>Billing</Dropdown.Item>
        <Dropdown.Item index={3}>
          <Text>
            <Icon name="logout" color="inherit" display="inline" /> Log out
          </Text>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithSeparatorAndOpensRight: Story = {
  render: () => (
    <Dropdown placement="right-start">
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          More actions
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item index={0}>
          <Text>
            <Icon name="edit" display="inline" color="inherit" /> Edit
          </Text>
        </Dropdown.Item>
        <Dropdown.Item index={1}>
          <Text>
            <Icon name="content_copy" display="inline" color="inherit" /> Duplicate
          </Text>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item index={2}>
          <Text>
            <Icon name="archive" display="inline" color="inherit" /> Archive
          </Text>
        </Dropdown.Item>
        <Dropdown.Item index={3}>
          <Text>
            <Icon name="delete" display="inline" color="inherit" /> Delete
          </Text>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const CustomContent: Story = {
  render: () => {
    const [query, setQuery] = React.useState('');

    const representatives = [
      { name: 'Lauri Lepp', code: '49504080254' },
      { name: 'Mart Mardivere', code: '39504080254' },
      { name: 'Madis Mets', code: '39504080254' },
      { name: 'Kalle Kaasik', code: '39504080254' },
      { name: 'Pille Porgand', code: '49504080254' },
      { name: 'Kert Kasemets', code: '39504080254' },
    ];

    const filtered =
      query.trim() === ''
        ? representatives
        : representatives.filter(
            (rep) => rep.name.toLowerCase().includes(query.toLowerCase()) || rep.code.includes(query)
          );

    return (
      <Dropdown width={300}>
        <Dropdown.Trigger>
          <Button visualType="link" iconRight="keyboard_arrow_down">
            Choose representative
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0} closeOnSelect={false} asChild>
            <Search id="dropdown-search" label="Otsi" value={query} onChange={(value) => setQuery(value)} />
          </Dropdown.Item>

          {filtered.map((rep, i) => {
            const index = i + 1;

            return (
              <Dropdown.Item key={rep.name} index={index}>
                <Text>
                  <strong>{rep.name}</strong>
                  <Separator
                    axis="vertical"
                    color="secondary"
                    display="inline"
                    dotSize="small"
                    element="span"
                    spacing={0.5}
                    variant="dot-only"
                  />
                  {rep.code}
                </Text>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const Tree: Story = {
  render: () => (
    <Row>
      <Col width="auto">
        <Dropdown variant="tree">
          <Dropdown.Trigger>
            <Button iconRight="keyboard_arrow_down">Open Tree Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item asChild>Parent</Dropdown.Item>
            <Dropdown.Item indent={1}>Child 1</Dropdown.Item>
            <Dropdown.Item indent={1}>Child 2</Dropdown.Item>
            <Dropdown.Item indent={1}>Child 3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col width="auto">
        <Dropdown variant="tree">
          <Dropdown.Trigger>
            <Button iconRight="keyboard_arrow_down">Open Tree Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item asChild indent={1} isParent>
              Parent
            </Dropdown.Item>
            <Dropdown.Item indent={1}>Child 1</Dropdown.Item>
            <Dropdown.Item indent={1}>Child 2</Dropdown.Item>
            <Dropdown.Item indent={1}>Child 3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};
