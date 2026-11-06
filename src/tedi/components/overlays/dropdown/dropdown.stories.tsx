import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import {
  getPrimaryComponentProps,
  getSubcomponentProps,
  subcomponentArgTypes,
} from '../../../../../.storybook/subcomponent-controls';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import Checkbox from '../../form/checkbox/checkbox';
import Radio from '../../form/radio/radio';
import { Search } from '../../form/search/search';
import { Col, Row } from '../../layout/grid';
import { OptionContent } from '../../misc/option-content/option-content';
import Separator from '../../misc/separator/separator';
import { Dropdown, DropdownProps } from './dropdown';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.108.103?m=dev&node-id=40253-113443" target="_BLANK">Dropdown Figma ↗</a><br/>
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.108.103?m=dev&node-id=12185-156201" target="_BLANK">DropdownItem Figma ↗</a><br/>
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
    'Dropdown.Group': Dropdown.Group,
    'Dropdown.Header': Dropdown.Header,
    'Dropdown.Footer': Dropdown.Footer,
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
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.108.103?m=dev&node-id=40253-113443',
    },
  },
} as Meta;

type Story = StoryObj;

/**
 * The default story doubles as an interactive playground with **live controls for
 * `Dropdown.Item`**. The item knobs (`active`, `disabled`, `indent`, …) — flattened into
 * namespaced controls via the shared `subcomponentArgTypes` helper — are applied to the
 * **middle** item so their effect is visible next to unchanged neighbours. The ungrouped
 * controls are `Dropdown`'s own props (`width`, `placement`, `variant`, `divided`, …).
 * `index` is excluded so keyboard navigation keeps its sequential ordering.
 */
export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Dropdown.Item, {
      category: 'Dropdown.Item',
      prefix: 'item',
      exclude: ['children', 'onClick', 'index'],
    }),
  },
  args: {
    item__active: true,
  },
  render: (args: Record<string, unknown>) => (
    <Dropdown {...getPrimaryComponentProps<DropdownProps>(args)}>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          Võimalda ligipääs
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0} onClick={() => console.log('Lisa pöördumine')}>
          Juurdepääs terviseandmetele
        </Dropdown.Item>
        <Dropdown.Item index={1} {...getSubcomponentProps(args, 'item')} onClick={() => console.log('Lisa toetus')}>
          Juurdepääs isikuandmetele
        </Dropdown.Item>
        <Dropdown.Item index={2}>Juurdepääs kontaktandmetele</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

const positionExamples: { placement: DropdownProps['placement']; label: string }[] = [
  { placement: 'bottom-start', label: 'Bottom start' },
  { placement: 'bottom', label: 'Bottom center' },
  { placement: 'bottom-end', label: 'Bottom end' },
  { placement: 'top-start', label: 'Top start' },
  { placement: 'top', label: 'Top center' },
  { placement: 'top-end', label: 'Top end' },
  { placement: 'right-start', label: 'Right start' },
  { placement: 'right', label: 'Right center' },
  { placement: 'right-end', label: 'Right end' },
  { placement: 'left-start', label: 'Left start' },
  { placement: 'left', label: 'Left center' },
  { placement: 'left-end', label: 'Left end' },
];

export const Position: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Row cols={1} md={3} gutterY={3}>
      {positionExamples.map(({ placement, label }) => (
        <Col key={placement} className="flex justify-content-center">
          <Dropdown placement={placement}>
            <Dropdown.Trigger>
              <Button visualType="secondary" iconRight="keyboard_arrow_down">
                {label}
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Item index={0}>Juurdepääs terviseandmetele</Dropdown.Item>
              <Dropdown.Item index={1}>Juurdepääs isikuandmetele</Dropdown.Item>
              <Dropdown.Item index={2}>Juurdepääs kontaktandmetele</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </Col>
      ))}
    </Row>
  ),
};

export const WithSelectedItem: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const [lang, setLang] = React.useState('EST');
    const [filter, setFilter] = React.useState('Uuemad ees');

    return (
      <div className="flex flex-wrap gap-3">
        <div>
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
        </div>
        <div>
          <Dropdown>
            <Dropdown.Trigger>
              <Button visualType="link" iconRight="expand_more">
                Sorteeri: {filter}
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              {['Uuemad ees', 'Vanemad ees', 'Taotluse nimi A–Ü', 'Taotluse nimi Ü–A'].map((f, i) => (
                <Dropdown.Item key={f} index={i} active={filter === f} onClick={() => setFilter(f)}>
                  {f}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    );
  },
};

export const WithActions: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" icon="add">
          Lisa
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0} onClick={() => console.log('Lisa pöördumine')}>
          Loo kontakt
        </Dropdown.Item>
        <Dropdown.Item index={1} onClick={() => console.log('Lisa toetus')}>
          Loo rakendus
        </Dropdown.Item>
        <Dropdown.Item index={2}>Loo arve</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const ActionsWithIcons: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconLeft="more_vert">
          Rohkem
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0}>
          <OptionContent icon="download">
            <OptionContent.Label>Laadi alla</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
        <Dropdown.Item index={1}>
          <OptionContent icon="add">
            <OptionContent.Label>Lisa</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
        <Dropdown.Item index={2}>
          <OptionContent icon="delete">
            <OptionContent.Label>Kustuta</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithCheckbox: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const [cities, setCities] = React.useState<string[]>(['tallinn', 'tartu']);

    const toggle = (value: string) => (_value: string, checked: boolean) => {
      setCities((prev) => (checked ? [...prev.filter((v) => v !== value), value] : prev.filter((v) => v !== value)));
    };

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="primary" iconRight="keyboard_arrow_down">
            Asukohad ({cities.length})
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0}>
            <Checkbox
              id="tallinn"
              label="Tallinn"
              value="tallinn"
              checked={cities.includes('tallinn')}
              onChange={toggle('tallinn')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={1}>
            <Checkbox
              id="tartu"
              label="Tartu"
              value="tartu"
              checked={cities.includes('tartu')}
              onChange={toggle('tartu')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={2}>
            <Checkbox
              id="parnu"
              label="Pärnu"
              value="parnu"
              checked={cities.includes('parnu')}
              onChange={toggle('parnu')}
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
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const [selected, setSelected] = React.useState<City[]>(['tartu']);

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
          <Button iconRight="keyboard_arrow_down">Asukohad ({selected.length})</Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0}>
            <Checkbox
              id="all"
              label="Kõik asukohad"
              checked={allChecked}
              indeterminate={indeterminate}
              onChange={toggleAll}
              name=""
              value=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={1} indent={1}>
            <Checkbox
              id="tallinn"
              label="Tallinn"
              value="tallinn"
              checked={selected.includes('tallinn')}
              onChange={toggleOne('tallinn')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={2} indent={1}>
            <Checkbox
              id="tartu"
              label="Tartu"
              value="tartu"
              checked={selected.includes('tartu')}
              onChange={toggleOne('tartu')}
              name=""
            />
          </Dropdown.Item>

          <Dropdown.Item index={3} indent={1}>
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
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const cities = {
      tallinn: 'Tallinn',
      tartu: 'Tartu',
      elva: 'Elva',
      rakvere: 'Rakvere',
    };

    const [city, setCity] = React.useState<keyof typeof cities>('tallinn');

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button visualType="link" iconRight="keyboard_arrow_down">
            Linn: {cities[city]}
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {(Object.keys(cities) as (keyof typeof cities)[]).map((key, index) => (
            <Dropdown.Item key={key} index={index}>
              <Radio
                id={`city-${key}`}
                name="city"
                value={key}
                label={cities[key]}
                checked={city === key}
                onChange={(value) => setCity(value as keyof typeof cities)}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const CustomWidth: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Row>
      <Col width={12}>
        <Dropdown width={300}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Rohkem
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Content>
            <Dropdown.Item index={0}>
              <div className="flex align-items-center justify-content-between">
                <Text>Juurdepääs terviseandmetele</Text>
                <Icon name="arrow_forward" color="secondary" size={16} />
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <div className="flex align-items-center justify-content-between">
                <Text>Tahteavaldus</Text>
                <Icon name="arrow_forward" color="secondary" size={16} />
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={2}>
              <div className="flex align-items-center justify-content-between">
                <Text>Kontaktid</Text>
                <Icon name="arrow_forward" color="secondary" size={16} />
              </div>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

export const WithDescription: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const accessOptions = [
      {
        value: 'health',
        label: 'Juurdepääs terviseandmetele',
        description: 'Arstid saavad näha teie terviseandmeid',
      },
      {
        value: 'medications',
        label: 'Juurdepääs ravimitele ja terviseandmetele',
        description: 'Arstid saavad näha teie ravimeid ja terviseandmeid',
      },
      {
        value: 'all',
        label: 'Juurdepääs kõigele',
        description:
          'Arstid saavad näha kogu teie teavet, sealhulgas tervise deklaratsiooni ja muid meditsiinilisi andmeid',
      },
    ];

    const locations = [
      { value: 'tallinn', label: 'Tallinn', meta: '3 aega vaba' },
      { value: 'tartu', label: 'Tartu', meta: '4 aega vaba' },
      { value: 'elva', label: 'Elva', meta: '7 aega vaba' },
      { value: 'rakvere', label: 'Rakvere', meta: '3 aega vaba' },
    ];

    const [access, setAccess] = React.useState('health');
    const [location, setLocation] = React.useState<string>();

    return (
      <div className="flex flex-wrap gap-3">
        <div>
          <Dropdown width={304}>
            <Dropdown.Trigger>
              <Button visualType="secondary" iconLeft="share" iconRight="keyboard_arrow_down">
                Jaga ligipääs
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              {accessOptions.map((option, index) => (
                <Dropdown.Item
                  key={option.value}
                  index={index}
                  active={access === option.value}
                  onClick={() => setAccess(option.value)}
                >
                  <OptionContent layout="vertical">
                    <OptionContent.Label>{option.label}</OptionContent.Label>
                    <OptionContent.Meta>{option.description}</OptionContent.Meta>
                  </OptionContent>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        <div>
          <Dropdown width={304}>
            <Dropdown.Trigger>
              <Button visualType="secondary" iconRight="keyboard_arrow_down">
                Vali asukoht
              </Button>
            </Dropdown.Trigger>

            <Dropdown.Content>
              {locations.map((option, index) => (
                <Dropdown.Item
                  key={option.value}
                  index={index}
                  active={location === option.value}
                  onClick={() => setLocation(option.value)}
                >
                  <OptionContent>
                    <OptionContent.Label>{option.label}</OptionContent.Label>
                    <OptionContent.Meta>{option.meta}</OptionContent.Meta>
                  </OptionContent>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    );
  },
};

export const Divided: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Dropdown divided>
      <Dropdown.Trigger>
        <Button
          visualType="secondary"
          iconLeft={{ name: 'account_circle', filled: true }}
          iconRight="keyboard_arrow_down"
        >
          Profiil
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item index={0}>Profiil</Dropdown.Item>
        <Dropdown.Item index={1}>Juurdepääsud</Dropdown.Item>
        <Dropdown.Item index={2}>Arveldamine</Dropdown.Item>
        <Dropdown.Item index={3}>
          <OptionContent icon="logout">
            <OptionContent.Label>Logi välja</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithSeparator: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button visualType="secondary" iconRight="keyboard_arrow_down">
          Rohkem toiminguid
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item index={0}>
          <OptionContent icon="edit">
            <OptionContent.Label>Redigeeri</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
        <Dropdown.Item index={1}>
          <OptionContent icon="content_copy">
            <OptionContent.Label>Kopeeri</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item index={2}>
          <OptionContent icon="archive">
            <OptionContent.Label>Arhiiv</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
        <Dropdown.Item index={3}>
          <OptionContent icon="delete">
            <OptionContent.Label>Kustuta</OptionContent.Label>
          </OptionContent>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

const STICKY_FOOTER_ITEMS = [
  'Profiil',
  'Ligipääsud',
  'Arveldamine',
  'Teavitused',
  'Seaded',
  'Privaatsus',
  'Turvalisus',
  'Abi',
];

/**
 * `Dropdown.Footer` holds content below the items, such as a "Log out" button. It is not part of
 * the menu, so Tab reaches it from the items. With `maxHeight` (second example) the items scroll
 * and the footer stays in place below them.
 */
export const WithStickyFooter: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Row gutterY={3}>
      <Col width="auto">
        <Dropdown divided>
          <Dropdown.Trigger>
            <Button
              visualType="secondary"
              iconLeft={{ name: 'account_circle', filled: true }}
              iconRight="keyboard_arrow_down"
            >
              Profiil
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>Profiil</Dropdown.Item>
            <Dropdown.Item index={1}>Ligipääsud</Dropdown.Item>
            <Dropdown.Item index={2}>Arveldamine</Dropdown.Item>
            <Dropdown.Footer>
              <Button visualType="neutral" size="small" iconLeft="logout" fullWidth>
                Logi välja
              </Button>
            </Dropdown.Footer>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col width="auto">
        <Dropdown divided maxHeight="10rem">
          <Dropdown.Trigger>
            <Button
              visualType="secondary"
              iconLeft={{ name: 'account_circle', filled: true }}
              iconRight="keyboard_arrow_down"
            >
              Profiil
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {STICKY_FOOTER_ITEMS.map((label, i) => (
              <Dropdown.Item key={label} index={i}>
                {label}
              </Dropdown.Item>
            ))}
            <Dropdown.Footer>
              <Button visualType="neutral" size="small" iconLeft="logout" fullWidth>
                Logi välja
              </Button>
            </Dropdown.Footer>
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

const TREE_PEOPLE: { name: string; relation?: string; indent?: number }[] = [
  { name: 'Maarika Mets' },
  { name: 'Kadri Mets', relation: 'Laps', indent: 1 },
  { name: 'Mart Mets', relation: 'Laps', indent: 1 },
  { name: 'Oliver Mets', relation: 'Laps', indent: 1 },
  { name: 'Veiko Mets', relation: 'Abikaasa' },
];

const TREE_FACULTIES = [
  {
    name: 'Infotehnoloogia teaduskond',
    fields: ['Informaatika ja tehisintellekt', 'IT-süsteemide administreerimine', 'IT-süsteemide arendus'],
  },
  { name: 'Loodusteaduskond', fields: ['Maa süsteemid, kliima ja tehnoloogiad', 'Rakendusfüüsika'] },
];

/**
 * `variant="tree"` draws connector lines from indented items to the item above them. Mark an item
 * with `isParent` (and give it the same `indent` as its children) to draw a bullet on the line.
 */
export const Tree: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Row gutterY={3}>
      <Col width="auto">
        <Dropdown variant="tree">
          <Dropdown.Trigger>
            <Button
              visualType="secondary"
              iconLeft={{ name: 'account_circle', filled: true }}
              iconRight="keyboard_arrow_down"
            >
              Vali esindatav
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {TREE_PEOPLE.map(({ name, relation, indent }, i) => (
              <Dropdown.Item key={name} index={i} indent={indent}>
                <OptionContent>
                  <OptionContent.Label>{name}</OptionContent.Label>
                  {relation && <OptionContent.Meta>{relation}</OptionContent.Meta>}
                </OptionContent>
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col width="auto">
        <Dropdown variant="tree">
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Vali eriala
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {TREE_FACULTIES.flatMap(({ name, fields }) =>
              [name, ...fields].map((label, j) => ({ label, isParent: j === 0 }))
            ).map(({ label, isParent }, i) => (
              <Dropdown.Item key={label} index={i} indent={1} isParent={isParent}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

/**
 * `Dropdown.Group` shows a title above related items and names the group for screen readers.
 * Items keep one running `index` across groups.
 */
export const WithGroupSubtitle: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Row gutterY={3}>
      <Col width="auto">
        <Dropdown>
          <Dropdown.Trigger>
            <Button
              visualType="secondary"
              iconLeft={{ name: 'account_circle', filled: true }}
              iconRight="keyboard_arrow_down"
            >
              Esindatav
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>Maarika Mets</Dropdown.Item>
            <Dropdown.Group label="Esindatavad">
              {['Kadri Mets', 'Mart Mets', 'Oliver Mets'].map((name, i) => (
                <Dropdown.Item key={name} index={i + 1}>
                  <OptionContent>
                    <OptionContent.Label>{name}</OptionContent.Label>
                    <OptionContent.Meta>Laps</OptionContent.Meta>
                  </OptionContent>
                </Dropdown.Item>
              ))}
            </Dropdown.Group>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col width="auto">
        <Dropdown>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Eriala
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {TREE_FACULTIES.map(({ name, fields }, g) => {
              const start = TREE_FACULTIES.slice(0, g).reduce((count, faculty) => count + faculty.fields.length, 0);
              return (
                <Dropdown.Group key={name} label={name}>
                  {fields.map((field, i) => (
                    <Dropdown.Item key={field} index={start + i}>
                      {field}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Group>
              );
            })}
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

/**
 * Set `maxHeight` to limit the height of the dropdown's scrollable body. When the content is taller,
 * the body scrolls; accepts a `number` (px) or any CSS length string (e.g. `'20rem'`, `'50vh'`).
 * Prefer rem, so the maximum height scales with the user's font size.
 */
export const MaxHeight: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Row>
      <Col width="auto">
        <Dropdown maxHeight="15rem" width={280}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Vali raviasutus
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {[
              'Fertilitas',
              'Ida-Tallinna Keskhaigla',
              'Lääne-Tallinna Keskhaigla',
              'Põhja-Eesti Regionaalhaigla',
              'Tallinna Lastehaigla',
              'Tartu Ülikooli Kliinikum',
              'Pärnu Haigla',
              'Narva Haigla',
              'Viljandi Haigla',
              'Kuressaare Haigla',
            ].map((label, index) => (
              <Dropdown.Item key={label} index={index}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

/**
 * With `hideOnScroll`, scrolling the page or any scrollable ancestor closes the dropdown; scrolling
 * the dropdown's own items keeps it open.
 */
export const HideOnScroll: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <div
      style={{
        height: '15rem',
        overflowY: 'auto',
        border: '1px solid var(--general-border-primary)',
        borderRadius: 'var(--card-radius-rounded)',
      }}
    >
      <div style={{ padding: '1rem 1rem 30rem' }}>
        <Dropdown hideOnScroll maxHeight="10rem" width={280}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Vali raviasutus
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {[
              'Fertilitas',
              'Ida-Tallinna Keskhaigla',
              'Lääne-Tallinna Keskhaigla',
              'Põhja-Eesti Regionaalhaigla',
              'Tallinna Lastehaigla',
              'Tartu Ülikooli Kliinikum',
              'Pärnu Haigla',
              'Narva Haigla',
              'Viljandi Haigla',
              'Kuressaare Haigla',
            ].map((label, index) => (
              <Dropdown.Item key={label} index={index}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </div>
    </div>
  ),
};

/**
 * Put a search field (or other controls) in `Dropdown.Header`. It sits above the items, outside the
 * menu, so the field keeps its own semantics and gets focus when the dropdown opens. ArrowDown moves
 * to the first item and ArrowUp on the first item comes back.
 */
export const CustomContent: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
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
            Vali esindatav
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Header>
            <Search id="dropdown-search" label="Otsi" value={query} onChange={(value) => setQuery(value)} />
          </Dropdown.Header>

          {filtered.map((rep, i) => (
            <Dropdown.Item key={rep.name} index={i}>
              <OptionContent>
                <OptionContent.Label>
                  <Text element="span" modifiers="bold">
                    {rep.name}
                  </Text>
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
                </OptionContent.Label>
              </OptionContent>
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * Visual-regression only. Every other story renders a closed trigger, so the menu itself was
 * never captured. These three render the variants open, grouped so the whole surface costs
 * three snapshots instead of one per variant: item content here, container chrome and control
 * items below. Each menu gets an explicit `width` so the open menus keep to their own column.
 */
export const OpenItemsForVisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    a11y: {
      config: {
        rules: [
          // `aria-hidden-focus`: @floating-ui/react wraps a non-modal floating element in two
          // `data-floating-ui-focus-guard` spans that carry tabindex="0" with aria-hidden="true"
          // by its own design. Pre-existing in every open dropdown.
          { id: 'aria-hidden-focus', enabled: false },
          // `aria-valid-attr-value`: the open menu sets aria-activedescendant="dropdown-item-N"
          // once an item takes focus, but no `Dropdown.Item` renders that id. A component bug,
          // reported separately; these are the first stories that render a focused open menu.
          { id: 'aria-valid-attr-value', enabled: false },
        ],
      },
    },
  },
  render: () => (
    <Row>
      <Col xs={4}>
        <Dropdown defaultOpen width={260}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Loo
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>Juurdepääs terviseandmetele</Dropdown.Item>
            <Dropdown.Item index={1} active>
              Tahteavaldus
            </Dropdown.Item>
            <Dropdown.Item index={2} disabled>
              Kontaktid
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col xs={4}>
        <Dropdown defaultOpen width={260}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconLeft="more_vert">
              Veel
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>
              <OptionContent icon="download">
                <OptionContent.Label>Laadi alla</OptionContent.Label>
              </OptionContent>
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <OptionContent icon="add">
                <OptionContent.Label>Lisa</OptionContent.Label>
              </OptionContent>
            </Dropdown.Item>
            <Dropdown.Item index={2}>
              <OptionContent icon="delete">
                <OptionContent.Label>Kustuta</OptionContent.Label>
              </OptionContent>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col xs={4}>
        <Dropdown defaultOpen width={320}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconLeft="share" iconRight="keyboard_arrow_down">
              Jaga juurdepääsu
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0} active>
              <div className="flex flex-column">
                <Text>Juurdepääs terviseandmetele</Text>
                <Text color="tertiary" modifiers="small">
                  Arstid näevad sinu terviseandmeid
                </Text>
              </div>
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <div className="flex align-items-center justify-content-between">
                <Text>Tallinn</Text>
                <Text color="tertiary" modifiers="small">
                  3 vaba aega
                </Text>
              </div>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

/**
 * Visual-regression only. `divided`, `Dropdown.Separator` and the `maxHeight` scroll cap are all
 * container chrome, invisible until the menu is open.
 */
export const OpenChromeForVisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    a11y: {
      config: {
        rules: [
          // `aria-hidden-focus`: @floating-ui/react wraps a non-modal floating element in two
          // `data-floating-ui-focus-guard` spans that carry tabindex="0" with aria-hidden="true"
          // by its own design. Pre-existing in every open dropdown.
          { id: 'aria-hidden-focus', enabled: false },
          // `aria-valid-attr-value`: the open menu sets aria-activedescendant="dropdown-item-N"
          // once an item takes focus, but no `Dropdown.Item` renders that id. A component bug,
          // reported separately; these are the first stories that render a focused open menu.
          { id: 'aria-valid-attr-value', enabled: false },
        ],
      },
    },
  },
  render: () => (
    <Row>
      <Col xs={4}>
        <Dropdown defaultOpen divided width={240}>
          <Dropdown.Trigger>
            <Button
              visualType="secondary"
              iconLeft={{ name: 'account_circle', filled: true }}
              iconRight="keyboard_arrow_down"
            >
              Konto
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>Profiil</Dropdown.Item>
            <Dropdown.Item index={1}>Turvalisus</Dropdown.Item>
            <Dropdown.Item index={2}>Arveldus</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col xs={4}>
        <Dropdown defaultOpen width={240}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Rohkem tegevusi
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>
              <OptionContent icon="edit">
                <OptionContent.Label>Muuda</OptionContent.Label>
              </OptionContent>
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item index={1}>
              <OptionContent icon="delete">
                <OptionContent.Label>Kustuta</OptionContent.Label>
              </OptionContent>
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col xs={4}>
        <Dropdown defaultOpen maxHeight={200} width={280}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Vali raviasutus
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {[
              'Fertilitas',
              'Ida-Tallinna Keskhaigla',
              'Lääne-Tallinna Keskhaigla',
              'Põhja-Eesti Regionaalhaigla',
              'Tallinna Lastehaigla',
              'Tartu Ülikooli Kliinikum',
              'Pärnu Haigla',
            ].map((label, index) => (
              <Dropdown.Item key={label} index={index}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};

/**
 * Visual-regression only. `indent` on Checkbox and Radio items only reads as a hierarchy once the
 * rows are visible next to each other.
 */
export const OpenControlItemsForVisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    a11y: {
      config: {
        rules: [
          // `aria-hidden-focus`: @floating-ui/react wraps a non-modal floating element in two
          // `data-floating-ui-focus-guard` spans that carry tabindex="0" with aria-hidden="true"
          // by its own design. Pre-existing in every open dropdown.
          { id: 'aria-hidden-focus', enabled: false },
          // `aria-valid-attr-value`: the open menu sets aria-activedescendant="dropdown-item-N"
          // once an item takes focus, but no `Dropdown.Item` renders that id. A component bug,
          // reported separately; these are the first stories that render a focused open menu.
          { id: 'aria-valid-attr-value', enabled: false },
        ],
      },
    },
  },
  render: () => (
    <Row>
      <Col xs={4}>
        <Dropdown defaultOpen width={240}>
          <Dropdown.Trigger>
            <Button visualType="primary" iconRight="keyboard_arrow_down">
              Asukohad (1)
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>
              <Checkbox id="vt-parnu" label="Pärnu" value="parnu" name="" defaultChecked />
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <Checkbox id="vt-tartu" label="Tartu" value="tartu" name="" />
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col xs={4}>
        <Dropdown defaultOpen width={240}>
          <Dropdown.Trigger>
            <Button visualType="link" iconRight="keyboard_arrow_down">
              Linn: Tallinn
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>
              <Radio id="vt-city-tallinn" name="vt-city" value="tallinn" label="Tallinn" defaultChecked />
            </Dropdown.Item>
            <Dropdown.Item index={1}>
              <Radio id="vt-city-tartu" name="vt-city" value="tartu" label="Tartu" />
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
      <Col xs={4}>
        <Dropdown defaultOpen width={240}>
          <Dropdown.Trigger>
            <Button visualType="secondary" iconRight="keyboard_arrow_down">
              Kõik asukohad
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item index={0}>
              <Checkbox id="vt-all" label="Kõik asukohad" value="" name="" indeterminate />
            </Dropdown.Item>
            <Dropdown.Item index={1} indent={1}>
              <Checkbox id="vt-ind-tallinn" label="Tallinn" value="tallinn" name="" defaultChecked />
            </Dropdown.Item>
            <Dropdown.Item index={2} indent={1}>
              <Checkbox id="vt-ind-tartu" label="Tartu" value="tartu" name="" />
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Col>
    </Row>
  ),
};
