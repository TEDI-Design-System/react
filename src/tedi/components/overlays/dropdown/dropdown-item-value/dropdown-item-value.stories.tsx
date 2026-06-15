import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Icon } from '../../../base/icon/icon';
import { Select } from '../../../form/select/select';
import { DropdownContext, DropdownContextValue } from '../dropdown-context';
import { DropdownItem } from '../dropdown-item/dropdown-item';
import { DropdownItemValue } from './dropdown-item-value';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.56.78?node-id=9542-70948&m=dev" target="_blank">Figma ↗</a><br/>
 *
 * `DropdownItemValue` is the shared **content row** for dropdown / select items:
 * an optional selection indicator (checkbox / radio), an optional leading icon,
 * a `DropdownItemValue.Label` and an optional `DropdownItemValue.Meta`. It is
 * presentational — the interactive parent (`DropdownItem`, or a `Select` option)
 * owns selection, keyboard and per-state colours; the row's `Label` inherits the
 * parent's text colour.
 */
const meta: Meta<typeof DropdownItemValue> = {
  component: DropdownItemValue,
  title: 'TEDI-Ready/Components/Overlay/DropdownItemValue',
  subcomponents: {
    'DropdownItemValue.Label': DropdownItemValue.Label,
    'DropdownItemValue.Meta': DropdownItemValue.Meta,
  } as never,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.56.78?node-id=9542-70948&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownItemValue>;

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
 * Plain items, and a nested set indented by level.
 */
export const Default: Story = {
  render: () => (
    <Row>
      <Menu>
        {['Access to health data', 'Declaration of intent', 'Contacts'].map((text, i) => (
          <DropdownItem key={text} index={i} onClick={noop}>
            <DropdownItemValue>
              <DropdownItemValue.Label>{text}</DropdownItemValue.Label>
            </DropdownItemValue>
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
            <DropdownItemValue>
              <DropdownItemValue.Label>{level.text}</DropdownItemValue.Label>
            </DropdownItemValue>
          </DropdownItem>
        ))}
      </Menu>
    </Row>
  ),
};

/**
 * Multi-select checkboxes — hierarchical (parent + indented children) and flat.
 * Click to toggle.
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
        <DropdownItemValue type="checkbox" selected={checked.includes(text)} indeterminate={indeterminate}>
          <DropdownItemValue.Label>{text}</DropdownItemValue.Label>
        </DropdownItemValue>
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

/**
 * Single-select radios — click to select.
 */
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
            <DropdownItemValue type="radio" selected={selected === city}>
              <DropdownItemValue.Label>{city}</DropdownItemValue.Label>
            </DropdownItemValue>
          </DropdownItem>
        ))}
      </Menu>
    );
  },
};

/**
 * A trailing icon (navigation arrow, via `Meta`) or a leading icon (`icon` prop).
 */
export const WithIcon: Story = {
  render: () => (
    <Row>
      <Menu>
        {['Access to health data', 'Declaration of intent', 'Contacts'].map((text, i) => (
          <DropdownItem key={text} index={i} onClick={noop}>
            <DropdownItemValue>
              <DropdownItemValue.Label>{text}</DropdownItemValue.Label>
              <DropdownItemValue.Meta>
                <Icon name="arrow_forward" size={18} />
              </DropdownItemValue.Meta>
            </DropdownItemValue>
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
            <DropdownItemValue icon={icon}>
              <DropdownItemValue.Label>{text}</DropdownItemValue.Label>
            </DropdownItemValue>
          </DropdownItem>
        ))}
      </Menu>
    </Row>
  ),
};

/**
 * A stacked title + description (`layout="vertical"`), and a label with a
 * right-aligned `Meta`.
 */
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
              <DropdownItemValue layout="vertical">
                <DropdownItemValue.Label>{title}</DropdownItemValue.Label>
                <DropdownItemValue.Meta>{desc}</DropdownItemValue.Meta>
              </DropdownItemValue>
            </DropdownItem>
          ))}
        </Menu>

        <Menu width={320}>
          {cities.map(([city, meta], i) => (
            <DropdownItem key={city} index={i} onClick={noop}>
              <DropdownItemValue>
                <DropdownItemValue.Label>{city}</DropdownItemValue.Label>
                <DropdownItemValue.Meta>{meta}</DropdownItemValue.Meta>
              </DropdownItemValue>
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
          <DropdownItemValue>
            <DropdownItemValue.Label>{text}</DropdownItemValue.Label>
          </DropdownItemValue>
        </DropdownItem>
      ));

    return (
      <Row>
        <Menu variant="tree">
          <DropdownItem index={0} onClick={noop}>
            <DropdownItemValue>
              <DropdownItemValue.Label>Parent</DropdownItemValue.Label>
            </DropdownItemValue>
          </DropdownItem>
          {children(1)}
        </Menu>

        <Menu variant="tree">
          <DropdownItem index={0} indent={1} isParent onClick={noop}>
            <DropdownItemValue>
              <DropdownItemValue.Label>Parent</DropdownItemValue.Label>
            </DropdownItemValue>
          </DropdownItem>
          {children(1)}
        </Menu>
      </Row>
    );
  },
};

/**
 * Item states: default, active (selected) and disabled — hover live by hovering.
 * The `Label` follows the item's per-state text colour via `color: inherit`.
 */
export const States: Story = {
  render: () => (
    <Menu>
      <DropdownItem index={0} onClick={noop}>
        <DropdownItemValue>
          <DropdownItemValue.Label>Default (hover me)</DropdownItemValue.Label>
        </DropdownItemValue>
      </DropdownItem>
      <DropdownItem index={1} active onClick={noop}>
        <DropdownItemValue>
          <DropdownItemValue.Label>Active</DropdownItemValue.Label>
        </DropdownItemValue>
      </DropdownItem>
      <DropdownItem index={2} disabled onClick={noop}>
        <DropdownItemValue disabled>
          <DropdownItemValue.Label>Disabled</DropdownItemValue.Label>
        </DropdownItemValue>
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

/**
 * `Select` renders its option content through `DropdownItemValue` internally;
 * use `renderOption` only for richer content (here an icon + meta).
 */
export const InsideSelect: Story = {
  name: 'Inside select (renderOption)',
  render: () => (
    <Select
      id="city-select"
      label="Linn"
      placeholder="Vali linn"
      options={CITIES.map((city) => ({ value: city.id, label: city.name, customData: city }))}
      renderOption={(props) => (
        <DropdownItemValue icon="location_on">
          <DropdownItemValue.Label>{props.data.label}</DropdownItemValue.Label>
          <DropdownItemValue.Meta>{(props.data.customData as (typeof CITIES)[number]).county}</DropdownItemValue.Meta>
        </DropdownItemValue>
      )}
    />
  ),
};
