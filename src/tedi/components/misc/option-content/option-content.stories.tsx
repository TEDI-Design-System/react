import { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useRef, useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Col, Row as GridRow } from '../../layout/grid';
import { DropdownContext, DropdownContextValue } from '../../overlays/dropdown/dropdown-context';
import { DropdownItem } from '../../overlays/dropdown/dropdown-item/dropdown-item';
import { OptionContent } from './option-content';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.108.103?m=dev&node-id=12185-156201" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/0930a9-dropdown-item" target="_blank">Zeroheight ↗</a>
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
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.108.103?m=dev&node-id=12185-156201',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OptionContent>;

// "Show code" snippets. The stories render items in a stand-in `Menu` so they can be shown side by
// side; these show how the same items are used in a real dropdown.
const SOURCE = {
  items: `<Dropdown>
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Ava menüü
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item index={0}>
      <OptionContent>
        <OptionContent.Label>1st level</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={1} indent={1}>
      <OptionContent>
        <OptionContent.Label>2nd level</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={2} indent={2}>
      <OptionContent>
        <OptionContent.Label>3rd level</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={3} indent={3}>
      <OptionContent>
        <OptionContent.Label>4th level</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`,

  checkbox: `<Dropdown>
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Asukoht ({checkedCount})
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item
      index={0}
      closeOnSelect={false}
      onClick={toggleGroup}
    >
      <OptionContent type="checkbox" selected={allChecked} indeterminate={someChecked}>
        <OptionContent.Label>Asukohad</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    {cities.map((city, i) => (
      <Dropdown.Item
        key={city}
        index={i + 1}
        indent={1}
        closeOnSelect={false}
        onClick={() => toggle(city)}
      >
        <OptionContent type="checkbox" selected={isChecked(city)}>
          <OptionContent.Label>{city}</OptionContent.Label>
        </OptionContent>
      </Dropdown.Item>
    ))}
  </Dropdown.Content>
</Dropdown>`,

  radio: `<Dropdown>
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Linn: {selected}
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    {cities.map((city, i) => (
      <Dropdown.Item
        key={city}
        index={i}
        onClick={() => setSelected(city)}
      >
        <OptionContent type="radio" selected={selected === city}>
          <OptionContent.Label>{city}</OptionContent.Label>
        </OptionContent>
      </Dropdown.Item>
    ))}
  </Dropdown.Content>
</Dropdown>`,

  icon: `<Dropdown>
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Ava menüü
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item index={0}>
      <OptionContent icon="download">
        <OptionContent.Label>Laadi alla</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={1}>
      <OptionContent>
        <OptionContent.Label>Kontaktid</OptionContent.Label>
        <OptionContent.Meta>
          <Icon name="arrow_forward" size={16} color="secondary" />
        </OptionContent.Meta>
      </OptionContent>
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`,

  description: `<Dropdown>
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Ava menüü
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item index={0}>
      <OptionContent layout="vertical">
        <OptionContent.Label>Juurdepääs terviseandmetele</OptionContent.Label>
        <OptionContent.Meta>Arstid näevad sinu terviseandmeid</OptionContent.Meta>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={1}>
      <OptionContent>
        <OptionContent.Label>Tallinn</OptionContent.Label>
        <OptionContent.Meta>3 vaba aega saadaval</OptionContent.Meta>
      </OptionContent>
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`,

  tree: `<Dropdown variant="tree">
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Ava menüü
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item index={0} indent={1} isParent>
      <OptionContent>
        <OptionContent.Label>Parent</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={1} indent={1}>
      <OptionContent>
        <OptionContent.Label>Child 1</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`,

  states: `<Dropdown>
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Ava menüü
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item index={0} active>
      <OptionContent>
        <OptionContent.Label>Tekst</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={1} disabled>
      <OptionContent disabled>
        <OptionContent.Label>Tekst</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`,

  position: `<Dropdown>
  <Dropdown.Trigger>
    <Button visualType="secondary" iconRight="keyboard_arrow_down">
      Ava menüü
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item index={0}>
      <OptionContent>
        <OptionContent.Label>Top</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={1}>
      <OptionContent>
        <OptionContent.Label>Middle</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
    <Dropdown.Item index={2}>
      <OptionContent>
        <OptionContent.Label>Bottom</OptionContent.Label>
      </OptionContent>
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`,
};

const sourceParams = (code: string) => ({
  docs: { source: { language: 'tsx', code } },
});

const showcaseContext = (
  variant: 'default' | 'tree',
  nav?: Pick<DropdownContextValue, 'listItemsRef' | 'activeIndex' | 'setActiveIndex'>
): DropdownContextValue =>
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
    ...nav,
  } as unknown as DropdownContextValue);

const NAV_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End'];

/**
 * Stand-in for an open dropdown. Items with an `index` get a roving tab stop (the first one by default)
 * and arrow-key navigation, as in a real dropdown.
 */
const Menu = ({
  children,
  variant = 'default',
  width = 304,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'tree';
  width?: number;
}): JSX.Element => {
  const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!NAV_KEYS.includes(e.key)) return;
    const enabled = listItemsRef.current.flatMap((item, i) =>
      item && item.getAttribute('aria-disabled') !== 'true' && !item.disabled ? [i] : []
    );
    if (!enabled.length) return;
    e.preventDefault();
    const pos = enabled.indexOf(activeIndex ?? -1);
    const next =
      e.key === 'Home'
        ? enabled[0]
        : e.key === 'End'
        ? enabled[enabled.length - 1]
        : enabled[(pos + (e.key === 'ArrowDown' ? 1 : enabled.length - 1)) % enabled.length];
    setActiveIndex(next);
    listItemsRef.current[next]?.focus();
  };

  // Clicking an item moves the tab stop to it.
  const handleFocus = (e: React.FocusEvent) => {
    const index = listItemsRef.current.indexOf(e.target as HTMLButtonElement);
    if (index !== -1) setActiveIndex(index);
  };

  return (
    <DropdownContext.Provider value={showcaseContext(variant, { listItemsRef, activeIndex, setActiveIndex })}>
      <div
        role="menu"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: width,
          background: 'var(--general-surface-primary)',
          border: '1px solid var(--card-border-primary)',
          borderRadius: 'var(--card-radius-rounded)',
          boxShadow: '0 1px 5px 0 var(--general-effect-colors-elevation-dropdown-area-drop-shadow)',
        }}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const Row = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }): JSX.Element => (
  <div style={{ display: 'flex', gap, flexWrap: 'wrap', alignItems: 'flex-start' }}>{children}</div>
);

const noop = (): void => undefined;

/**
 * A single `OptionContent` row driven by the controls — switch `type`
 * (checkbox / radio), `layout`, `selected` and `disabled` to preview each
 * variant in isolation. In real usage it always lives inside an interactive
 * parent; here it is rendered standalone so the props are easy to explore.
 *
 * Used in [Dropdown](/docs/tedi-ready-components-overlay-dropdown--docs),
 * [Select](/docs/tedi-ready-components-form-select--docs),
 * [Search](/docs/tedi-ready-components-form-search--docs) and
 * [Popover](/docs/tedi-ready-components-overlay-popover--docs) — see their stories for
 * examples in context.
 */
export const Default: Story = {
  args: {
    type: 'default',
    layout: 'horizontal',
    selected: false,
    disabled: false,
  },
  render: (args) => (
    <GridRow>
      <Col xs={12} md={6} lg={4}>
        <OptionContent {...args}>
          <OptionContent.Label>Valik 1</OptionContent.Label>
        </OptionContent>
      </Col>
    </GridRow>
  ),
};

/**
 * Plain items, and a nested set indented by level.
 */
export const Items: Story = {
  parameters: sourceParams(SOURCE.items),
  render: () => (
    <Row>
      <Menu>
        {['Juurdepääs terviseandmetele', 'Tahteavaldus', 'Kontaktid'].map((text, i) => (
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
const CHECKBOX_GROUPS = [
  { label: 'Asukohad', children: ['Tallinn', 'Tartu'] },
  { label: 'Arstid', children: ['Mari Allikas', 'Tõnu Liblikas'] },
  { label: 'Haiglad', children: ['PERH', 'ITK', 'Fertilitas'] },
];

const CHECKBOX_LEVELS = ['1st level', '2nd level', '3rd level', '4th level'];

/**
 * Checkbox items for multi-select: groups whose checkbox reflects their items (checked, or
 * indeterminate when only some are), a flat list, and a nested set indented by level.
 */
export const WithCheckbox: Story = {
  parameters: sourceParams(SOURCE.checkbox),
  render: function WithCheckboxExample() {
    const [checked, setChecked] = useState<string[]>(['Tartu']);
    const isChecked = (key: string) => checked.includes(key);
    const toggle = (key: string) =>
      setChecked((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));
    const setAll = (keys: string[], on: boolean) =>
      setChecked((current) =>
        on ? [...current, ...keys.filter((k) => !current.includes(k))] : current.filter((k) => !keys.includes(k))
      );

    const item = (
      key: string,
      label: string,
      index: number,
      {
        indent,
        selected = isChecked(key),
        indeterminate = false,
        onToggle = () => toggle(key),
      }: { indent?: number; selected?: boolean; indeterminate?: boolean; onToggle?: () => void } = {}
    ) => (
      <DropdownItem key={key} index={index} closeOnSelect={false} indent={indent} onClick={onToggle}>
        <OptionContent type="checkbox" selected={selected} indeterminate={indeterminate}>
          <OptionContent.Label>{label}</OptionContent.Label>
        </OptionContent>
      </DropdownItem>
    );

    return (
      <Row>
        <Menu>
          {CHECKBOX_GROUPS.flatMap(({ label, children }, g) => {
            const all = children.every(isChecked);
            const some = children.some(isChecked);
            const start = CHECKBOX_GROUPS.slice(0, g).reduce((n, group) => n + 1 + group.children.length, 0);
            return [
              item(label, label, start, {
                selected: all,
                indeterminate: some && !all,
                onToggle: () => setAll(children, !all),
              }),
              ...children.map((child, i) => item(child, child, start + 1 + i, { indent: 1 })),
            ];
          })}
        </Menu>

        <Menu>{CHECKBOX_GROUPS.map(({ label }, i) => item(`flat-${label}`, label, i))}</Menu>

        <Menu>
          {CHECKBOX_LEVELS.map((label, level) => item(`level-${level}`, label, level, { indent: level || undefined }))}
        </Menu>
      </Row>
    );
  },
};

export const WithRadio: Story = {
  parameters: sourceParams(SOURCE.radio),
  render: function WithRadioExample() {
    const [selected, setSelected] = useState('Tallinn');
    return (
      <Menu>
        {['Tallinn', 'Tartu', 'Elva', 'Rakvere'].map((city, i) => (
          <DropdownItem key={city} index={i} closeOnSelect={false} onClick={() => setSelected(city)}>
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
  parameters: sourceParams(SOURCE.icon),
  render: () => (
    <Row>
      <Menu>
        {['Juurdepääs terviseandmetele', 'Tahteavaldus', 'Kontaktid'].map((text, i) => (
          <DropdownItem key={text} index={i} onClick={noop}>
            <OptionContent>
              <OptionContent.Label>{text}</OptionContent.Label>
              <OptionContent.Meta>
                <Icon name="arrow_forward" size={16} />
              </OptionContent.Meta>
            </OptionContent>
          </DropdownItem>
        ))}
      </Menu>

      <Menu>
        {[
          ['Laadi alla', 'download'],
          ['Lisa', 'add'],
          ['Kustuta', 'delete'],
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
  parameters: sourceParams(SOURCE.description),
  render: function WithDescriptionExample() {
    const [active, setActive] = useState('Juurdepääs terviseandmetele');
    const access = [
      ['Juurdepääs terviseandmetele', 'Arstid näevad sinu terviseandmeid'],
      ['Juurdepääs ravimitele ja terviseandmetele', 'Arstid näevad sinu ravimeid ja terviseandmeid'],
      ['Juurdepääs kõigele', 'Arstid näevad kõiki sinu andmeid, sh terviseteatist ja muud meditsiinilist teavet'],
    ];
    const cities = [
      ['Tallinn', '3 vaba aega saadaval'],
      ['Tartu', '4 vaba aega saadaval'],
      ['Elva', '7 vaba aega saadaval'],
      ['Rakvere', '3 vaba aega saadaval'],
    ];

    return (
      <Row>
        <Menu>
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

        <Menu>
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
 * Tree variant — `Dropdown variant="tree"` draws connector lines for items that
 * have `indent`. Left: the parent is a plain top-level item, and the line starts
 * at its first child. Right: two groups where each parent also has `indent={1}`
 * and `isParent`, so it lines up with its children and the line starts from a
 * bullet on the parent.
 */
export const WithTree: Story = {
  parameters: sourceParams(SOURCE.tree),
  render: () => {
    const children = (start: number) =>
      ['Child 1', 'Child 2', 'Child 3'].map((text, i) => (
        <DropdownItem key={`${start}-${text}`} index={start + i} indent={1} onClick={noop}>
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
          {[0, 4].flatMap((start) => [
            <DropdownItem key={`parent-${start}`} index={start} indent={1} isParent onClick={noop}>
              <OptionContent>
                <OptionContent.Label>Parent</OptionContent.Label>
              </OptionContent>
            </DropdownItem>,
            ...children(start + 1),
          ])}
        </Menu>
      </Row>
    );
  },
};

const STATES = ['Default', 'Hover', 'Selected', 'Disabled', 'Focus'] as const;

const stateCells = [
  { id: 'label', content: <OptionContent.Label>Tekst</OptionContent.Label> },
  {
    id: 'icon',
    icon: 'download',
    content: <OptionContent.Label>Tekst</OptionContent.Label>,
  },
  {
    id: 'meta',
    content: (
      <>
        <OptionContent.Label>Tekst</OptionContent.Label>
        <OptionContent.Meta>Tekst</OptionContent.Meta>
      </>
    ),
  },
];

const POSITIONS = ['Top', 'Middle', 'Bottom'] as const;

/**
 * The top item rounds its top corners and the bottom item its bottom corners, following the
 * dropdown's rounded corners; items in between stay square. Shown with all items hovered.
 */
export const Position: Story = {
  parameters: {
    ...sourceParams(SOURCE.position),
    pseudo: {
      hover: ['#Position > *'],
    },
  },
  render: () => (
    <DropdownContext.Provider value={showcaseContext('default')}>
      <GridRow>
        <Col xs={12} md={6} lg={4}>
          <div id="Position" role="menu" aria-label="Näidis" className="flex flex-column gap-2">
            {POSITIONS.map((position) => (
              <DropdownItem key={position} onClick={noop}>
                <OptionContent>
                  <OptionContent.Label>{position}</OptionContent.Label>
                </OptionContent>
              </DropdownItem>
            ))}
          </div>
        </Col>
      </GridRow>
    </DropdownContext.Provider>
  ),
};

export const States: Story = {
  parameters: {
    ...sourceParams(SOURCE.states),
    pseudo: {
      hover: stateCells.map(({ id }) => `#Hover-${id} > *`),
      focusVisible: stateCells.map(({ id }) => `#Focus-${id} > *`),
    },
  },
  render: () => (
    <DropdownContext.Provider value={showcaseContext('default')}>
      <GridRow role="menu" aria-label="Näidis" cols={1} md={4} gutterX={3} gutterY={2} alignItems="center">
        {STATES.map((state) => (
          <Fragment key={state}>
            <Col>
              <strong>{state}</strong>
            </Col>
            {stateCells.map(({ id, icon, content }) => (
              // DropdownItem takes no `id`, so the pseudo-states selectors reach the item
              // through this wrapper (`#Hover-label > *`).
              <Col key={id} id={`${state}-${id}`} className="flex flex-column">
                <DropdownItem active={state === 'Selected'} disabled={state === 'Disabled'} onClick={noop}>
                  <OptionContent icon={icon} disabled={state === 'Disabled'}>
                    {content}
                  </OptionContent>
                </DropdownItem>
              </Col>
            ))}
          </Fragment>
        ))}
      </GridRow>
    </DropdownContext.Provider>
  ),
};
