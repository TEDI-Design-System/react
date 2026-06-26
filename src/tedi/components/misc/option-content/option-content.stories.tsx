import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Button } from '../../buttons/button/button';
import { Search } from '../../form/search/search';
import { Select } from '../../form/select/select';
import { Toggle } from '../../form/toggle/toggle';
import { Dropdown } from '../../overlays/dropdown/dropdown';
import { DropdownContext, DropdownContextValue } from '../../overlays/dropdown/dropdown-context';
import { DropdownItem } from '../../overlays/dropdown/dropdown-item/dropdown-item';
import { Popover } from '../../overlays/popover/popover';
import Separator from '../separator/separator';
import { OptionContent } from './option-content';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.56.78?node-id=9542-70948&m=dev" target="_blank">Figma ↗</a><br/>
 *
 * `OptionContent` is a reusable **content template** — the inner layout shared by
 * dropdown and select options. It is *not* an item itself and is never interactive:
 * it has no `role`, `onClick` or focus handling, and it does not appear in any
 * listbox/menu. Drop it *inside* an interactive parent — a `DropdownItem`, or a
 * `Select` option — which owns the role, selection, keyboard handling and per-state
 * colours.
 *
 * It arranges an optional selection indicator (checkbox / radio), an optional leading
 * icon, a primary `OptionContent.Label` and an optional secondary `OptionContent.Meta`
 * into one consistently-spaced row, so every option across the design system looks the
 * same regardless of which control renders it. The `Label` inherits the parent's text
 * colour, so the active / disabled states defined by the parent flow through unchanged.
 */
const meta: Meta<typeof OptionContent> = {
  component: OptionContent,
  title: 'TEDI-Ready/Components/Helpers/OptionContent',
  subcomponents: {
    'OptionContent.Label': OptionContent.Label,
    'OptionContent.Meta': OptionContent.Meta,
  } as never,
  parameters: {
    status: {
      type: [{ name: 'devComponent' }],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.56.78?node-id=9542-70948&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OptionContent>;

const showcaseContext = (variant: 'default' | 'tree'): DropdownContextValue =>
  ({
    open: true,
    setOpen: () => undefined,
    refs: {},
    getReferenceProps: () => ({}),
    getFloatingProps: () => ({}),
    getItemProps: (props?: Record<string, unknown>) => props ?? {},
    listItemsRef: { current: [] },
    activeIndex: null,
    setActiveIndex: () => undefined,
    content: null,
    setContent: () => undefined,
    divided: false,
    variant,
  } as unknown as DropdownContextValue);

const Menu = ({
  children,
  variant = 'default',
  width = 280,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'tree';
  width?: number;
}): JSX.Element => (
  <DropdownContext.Provider value={showcaseContext(variant)}>
    <div
      role="menu"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        background: 'var(--general-surface-primary)',
        border: '1px solid var(--card-border-primary)',
        borderRadius: 'var(--card-radius-rounded)',
      }}
    >
      {children}
    </div>
  </DropdownContext.Provider>
);

const Row = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }): JSX.Element => (
  <div style={{ display: 'flex', gap, flexWrap: 'wrap', alignItems: 'flex-start' }}>{children}</div>
);

const noop = (): void => undefined;

/**
 * A single `OptionContent` row driven by the controls — switch `type`
 * (checkbox / radio), `layout`, `selected` and `disabled` to preview each
 * variant in isolation. In real usage it always lives inside an interactive
 * parent; here it is rendered standalone so the props are easy to explore.
 */
export const Default: Story = {
  args: {
    type: 'default',
    layout: 'horizontal',
    selected: false,
    disabled: false,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <OptionContent {...args}>
        <OptionContent.Label>Option 1</OptionContent.Label>
      </OptionContent>
    </div>
  ),
};

/**
 * Plain items, and a nested set indented by level.
 */
export const Items: Story = {
  render: () => (
    <Row>
      <Menu>
        {['Access to health data', 'Declaration of intent', 'Contacts'].map((text, i) => (
          <DropdownItem key={text} index={i} onClick={noop}>
            <OptionContent>
              <OptionContent.Label>{text}</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>

      <Menu>
        {[
          { text: '1st level' },
          { text: '2nd level', indent: 1 },
          { text: '3rd level', indent: 2 },
          { text: '3rd level', indent: 2 },
          { text: '4th level', indent: 3 },
        ].map((level, i) => (
          <DropdownItem key={i} index={i} indent={level.indent} onClick={noop}>
            <OptionContent>
              <OptionContent.Label>{level.text}</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>
    </Row>
  ),
};

/**
 * Multi-select checkboxes — hierarchical (parent + indented children) and flat.
 */
export const WithCheckbox: Story = {
  render: function WithCheckboxExample() {
    const [checked, setChecked] = useState<string[]>(['Tartu', 'Locations']);
    const toggle = (key: string) =>
      setChecked((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));

    const item = (text: string, indent?: number, indeterminate?: boolean) => (
      <DropdownItem
        role="menuitemcheckbox"
        aria-checked={checked.includes(text)}
        closeOnSelect={false}
        indent={indent}
        onClick={() => toggle(text)}
      >
        <OptionContent type="checkbox" selected={checked.includes(text)} indeterminate={indeterminate}>
          <OptionContent.Label>{text}</OptionContent.Label>
        </OptionContent>
      </DropdownItem>
    );

    return (
      <Row>
        <Menu>
          {item('Locations', undefined, !checked.includes('Tallinn'))}
          {item('Tallinn', 1)}
          {item('Tartu', 1)}
          {item('Doctors')}
          {item('Mari Allikas', 1)}
          {item('Tõnu Liblikas', 1)}
        </Menu>

        <Menu>
          {item('Hospitals')}
          {item('Pharmacies')}
          {item('Laboratories')}
        </Menu>
      </Row>
    );
  },
};

export const WithRadio: Story = {
  render: function WithRadioExample() {
    const [selected, setSelected] = useState('Tallinn');
    return (
      <Menu>
        {['Tallinn', 'Tartu', 'Elva', 'Rakvere'].map((city, i) => (
          <DropdownItem
            key={city}
            index={i}
            role="menuitemradio"
            aria-checked={selected === city}
            closeOnSelect={false}
            onClick={() => setSelected(city)}
          >
            <OptionContent type="radio" selected={selected === city}>
              <OptionContent.Label>{city}</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>
    );
  },
};

export const WithIcon: Story = {
  render: () => (
    <Row>
      <Menu>
        {['Access to health data', 'Declaration of intent', 'Contacts'].map((text, i) => (
          <DropdownItem key={text} index={i} onClick={noop}>
            <OptionContent>
              <OptionContent.Label>{text}</OptionContent.Label>
              <OptionContent.Meta>
                <Icon name="arrow_forward" size={18} />
              </OptionContent.Meta>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>

      <Menu>
        {[
          ['Download', 'download'],
          ['Add', 'add'],
          ['Delete', 'delete'],
        ].map(([text, icon], i) => (
          <DropdownItem key={text} index={i} onClick={noop}>
            <OptionContent icon={icon}>
              <OptionContent.Label>{text}</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>
    </Row>
  ),
};

export const WithDescription: Story = {
  render: function WithDescriptionExample() {
    const [active, setActive] = useState('Access to health data');
    const access = [
      ['Access to health data', 'Doctors will be able to see your health data'],
      ['Access to medications and health data', 'Doctors will be able to see your medications and health data'],
      ['Access to all', 'Doctors will be able to see all your information'],
    ];
    const cities = [
      ['Tallinn', '3 timeslots available'],
      ['Tartu', '4 timeslots available'],
      ['Elva', '7 timeslots available'],
      ['Rakvere', '3 timeslots available'],
    ];

    return (
      <Row>
        <Menu width={320}>
          {access.map(([title, desc], i) => (
            <DropdownItem
              key={title}
              index={i}
              active={active === title}
              closeOnSelect={false}
              onClick={() => setActive(title)}
            >
              <OptionContent layout="vertical">
                <OptionContent.Label>{title}</OptionContent.Label>
                <OptionContent.Meta>{desc}</OptionContent.Meta>
              </OptionContent>
            </DropdownItem>
          ))}
        </Menu>

        <Menu width={320}>
          {cities.map(([city, meta], i) => (
            <DropdownItem key={city} index={i} onClick={noop}>
              <OptionContent>
                <OptionContent.Label>{city}</OptionContent.Label>
                <OptionContent.Meta>{meta}</OptionContent.Meta>
              </OptionContent>
            </DropdownItem>
          ))}
        </Menu>
      </Row>
    );
  },
};

/**
 * Tree variant — a parent with indented children (connector lines come from
 * `Dropdown variant="tree"` + `DropdownItem` `indent` / `isParent`). Left: the
 * parent sits at the top level; right: the parent is indented onto the bullet
 * (`indent={1} isParent`), so the connector branches from the parent itself.
 */
export const WithTree: Story = {
  render: () => {
    const children = (start: number) =>
      ['Child 1', 'Child 2', 'Child 3'].map((text, i) => (
        <DropdownItem key={text} index={start + i} indent={1} onClick={noop}>
          <OptionContent>
            <OptionContent.Label>{text}</OptionContent.Label>
          </OptionContent>
        </DropdownItem>
      ));

    return (
      <Row>
        <Menu variant="tree">
          <DropdownItem index={0} onClick={noop}>
            <OptionContent>
              <OptionContent.Label>Parent</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
          {children(1)}
        </Menu>

        <Menu variant="tree">
          <DropdownItem index={0} indent={1} isParent onClick={noop}>
            <OptionContent>
              <OptionContent.Label>Parent</OptionContent.Label>
            </OptionContent>
          </DropdownItem>
          {children(1)}
        </Menu>
      </Row>
    );
  },
};

export const States: Story = {
  render: () => (
    <Menu>
      <DropdownItem index={0} onClick={noop}>
        <OptionContent>
          <OptionContent.Label>Default (hover me)</OptionContent.Label>
        </OptionContent>
      </DropdownItem>
      <DropdownItem index={1} active onClick={noop}>
        <OptionContent>
          <OptionContent.Label>Active</OptionContent.Label>
        </OptionContent>
      </DropdownItem>
      <DropdownItem index={2} disabled onClick={noop}>
        <OptionContent disabled>
          <OptionContent.Label>Disabled</OptionContent.Label>
        </OptionContent>
      </DropdownItem>
    </Menu>
  ),
};

const CITIES = [
  { id: 'tln', name: 'Tallinn', county: 'Harjumaa' },
  { id: 'trt', name: 'Tartu', county: 'Tartumaa' },
  { id: 'prn', name: 'Pärnu', county: 'Pärnumaa' },
  { id: 'nrv', name: 'Narva', county: 'Ida-Virumaa' },
];

export const InsideSelect: Story = {
  name: 'Inside select (renderOption)',
  render: () => (
    <Select
      id="city-select"
      label="Linn"
      placeholder="Vali linn"
      options={CITIES.map((city) => ({ value: city.id, label: city.name, customData: city }))}
      renderOption={(props) => (
        <OptionContent icon="location_on">
          <OptionContent.Label>{props.data.label}</OptionContent.Label>
          <OptionContent.Meta>{(props.data.customData as (typeof CITIES)[number]).county}</OptionContent.Meta>
        </OptionContent>
      )}
    />
  ),
};

export const InsideDropdown: Story = {
  name: 'Inside a dropdown',
  render: function InsideDropdownExample() {
    const [checked, setChecked] = useState<string[]>(['Hospitals']);
    const toggle = (key: string) =>
      setChecked((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));
    const options = ['Hospitals', 'Pharmacies', 'Laboratories', 'Family doctors'];

    return (
      <Dropdown width={260}>
        <Dropdown.Trigger>
          <Button visualType="secondary" iconRight="keyboard_arrow_down">
            Filter providers
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {options.map((option, i) => (
            <Dropdown.Item
              key={option}
              index={i}
              role="menuitemcheckbox"
              aria-checked={checked.includes(option)}
              closeOnSelect={false}
              onClick={() => toggle(option)}
            >
              <OptionContent type="checkbox" selected={checked.includes(option)}>
                <OptionContent.Label>{option}</OptionContent.Label>
              </OptionContent>
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const InsideSearch: Story = {
  name: 'Inside search (in a dropdown)',
  render: function InsideSearchExample() {
    const [value, setValue] = useState('Ta');
    const [open, setOpen] = useState(true);
    const matches = CITIES.filter((city) => city.name.toLowerCase().includes(value.toLowerCase()));

    return (
      <Dropdown open={open && matches.length > 0} onOpenChange={setOpen} width="trigger">
        <Dropdown.Trigger>
          <div>
            <Search id="option-content-search" label="Otsi linna" value={value} onChange={setValue} />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {matches.map((city, i) => (
            <Dropdown.Item key={city.id} index={i} onClick={() => setValue(city.name)}>
              <OptionContent icon="location_on">
                <OptionContent.Label>{city.name}</OptionContent.Label>
                <OptionContent.Meta>{city.county}</OptionContent.Meta>
              </OptionContent>
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const InsidePopover: Story = {
  name: 'Inside a popover',
  render: function InsidePopoverExample() {
    const [darkMode, setDarkMode] = useState(false);
    const navItems = ['Minu profiil', 'Esindatavad', 'Kontaktid'];

    return (
      <Popover>
        <Popover.Trigger>
          <Button visualType="secondary" iconRight="keyboard_arrow_down">
            Minu profiil
          </Button>
        </Popover.Trigger>

        <Popover.Content width="none">
          {/* `DropdownItem` needs a `DropdownContext`; the popover supplies a static one so the
              rows get the dropdown hover / active styling that `OptionContent` inherits. */}
          <DropdownContext.Provider value={showcaseContext('default')}>
            <div role="menu" style={{ display: 'flex', flexDirection: 'column', minWidth: 220 }}>
              {navItems.map((label, index) => (
                <DropdownItem key={label} index={index} role="menuitem" onClick={noop}>
                  <OptionContent>
                    <OptionContent.Label>{label}</OptionContent.Label>
                  </OptionContent>
                </DropdownItem>
              ))}

              <Separator />

              <div style={{ padding: 'var(--dropdown-item-padding-y) var(--dropdown-item-padding-x)' }}>
                <Toggle id="option-content-dark-mode" label="Tume režiim" checked={darkMode} onChange={setDarkMode} />
              </div>

              <Separator />

              <DropdownItem index={navItems.length} role="menuitem" onClick={noop}>
                <OptionContent icon={{ name: 'logout', size: 16 }}>
                  <OptionContent.Label>Logi välja</OptionContent.Label>
                </OptionContent>
              </DropdownItem>
            </div>
          </DropdownContext.Provider>
        </Popover.Content>
      </Popover>
    );
  },
};
